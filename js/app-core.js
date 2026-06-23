/**
 * @file app-core.js
 * @description Core infrastructure for the Maternal Care PWA —
 * centralized LocalStorage access and reactive state for daily trackers.
 * UI strings remain Russian; all code identifiers are English.
 */

'use strict';

/** Application data version suffix — keeps LocalStorage keys stable across releases. */
const APP_VERSION_SUFFIX = '_v16';

/** @deprecated Legacy alias used in inline handlers — prefer APP_VERSION_SUFFIX. */
const V = APP_VERSION_SUFFIX;

/**
 * Canonical LocalStorage key registry.
 * Never rename values — active users rely on these keys.
 */
const STORAGE_KEYS = Object.freeze({
  EDD: 'eddDate',
  THEME: 'theme',
  DIARY: 'diaryEntry',
  HUSBAND_PHONE: 'husbandPhone',
  USER_NAME: 'userName',
  PARTNER_NAME: 'partnerName',
  LANGUAGE: 'appLang',
  BABY_GENDER: 'babyGender',
  HEIGHT_CM: 'heightCm',
  UZI_PHOTO: 'uziPh',
  TASKS: `tasks${APP_VERSION_SUFFIX}`,
  WATER: `water${APP_VERSION_SUFFIX}`,
  MOOD: `mood${APP_VERSION_SUFFIX}`,
  MOOD_HISTORY: `moodH${APP_VERSION_SUFFIX}`,
  WEIGHT_HISTORY: `wtH${APP_VERSION_SUFFIX}`,
  MED_REGISTRY: `medReg${APP_VERSION_SUFFIX}`,
  GALLERY_PHOTOS: `galPh${APP_VERSION_SUFFIX}`,
  HOSPITAL_BAG: `bagList${APP_VERSION_SUFFIX}`,
  KICK_COUNT: `kickCount${APP_VERSION_SUFFIX}`,
  STREAK: `streak${APP_VERSION_SUFFIX}`,
  FINISHED_DAY: `finished${APP_VERSION_SUFFIX}`,
  LAST_DATE: `lastD${APP_VERSION_SUFFIX}`,
  notificationPrefix: (medId) => `ntf_${medId}${APP_VERSION_SUFFIX}`,
});

/** Keys removed by resetAll — app-scoped only, never localStorage.clear(). */
const APP_RESET_KEYS = Object.freeze([
  STORAGE_KEYS.EDD,
  STORAGE_KEYS.THEME,
  STORAGE_KEYS.DIARY,
  STORAGE_KEYS.HUSBAND_PHONE,
  STORAGE_KEYS.USER_NAME,
  STORAGE_KEYS.PARTNER_NAME,
  STORAGE_KEYS.LANGUAGE,
  STORAGE_KEYS.BABY_GENDER,
  STORAGE_KEYS.HEIGHT_CM,
  STORAGE_KEYS.UZI_PHOTO,
]);

/**
 * Safe LocalStorage wrapper with JSON parse/stringify and quota handling.
 */
const AppStorage = {
  /**
   * @param {string} key
   * @param {*} [fallback=null]
   * @returns {*}
   */
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return fallback;
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  },

  /**
   * @param {string} key
   * @param {string} [fallback='']
   * @returns {string}
   */
  getString(key, fallback = '') {
    const value = localStorage.getItem(key);
    return value === null ? fallback : value;
  },

  /**
   * @param {string} key
   * @param {*} value
   * @returns {boolean} false when quota exceeded
   */
  set(key, value) {
    try {
      localStorage.setItem(
        key,
        typeof value === 'string' ? value : JSON.stringify(value)
      );
      return true;
    } catch {
      return false;
    }
  },

  /**
   * @param {string} key
   */
  remove(key) {
    localStorage.removeItem(key);
  },

  /** Removes only keys belonging to this application. */
  clearAppData() {
    const toDelete = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        key &&
        (key.includes(APP_VERSION_SUFFIX) || APP_RESET_KEYS.includes(key))
      ) {
        toDelete.push(key);
      }
    }
    toDelete.forEach((key) => localStorage.removeItem(key));
  },
};

/**
 * Daily hydration tracker — 8-glass goal, persisted as slot indices.
 */
const WaterTracker = {
  DAILY_GOAL: 8,

  /** @returns {number[]} Active glass slot indices (0–7). */
  getSlots() {
    const slots = AppStorage.get(STORAGE_KEYS.WATER, []);
    return Array.isArray(slots) ? slots : [];
  },

  /** @returns {number} Count of glasses logged today. */
  getCount() {
    return this.getSlots().length;
  },

  /**
   * Toggle a glass slot on/off.
   * @param {number} slotIndex
   * @returns {number[]} Updated slots
   */
  toggleSlot(slotIndex) {
    let slots = this.getSlots();
    if (slots.includes(slotIndex)) {
      slots = slots.filter((index) => index !== slotIndex);
    } else {
      slots = [...slots, slotIndex];
    }
    AppStorage.set(STORAGE_KEYS.WATER, slots);
    return slots;
  },

  /** Reset at day boundary (called from checkDailyReset). */
  resetDaily() {
    AppStorage.set(STORAGE_KEYS.WATER, []);
  },
};

/**
 * Medication registry and daily intake completion state.
 */
const MedicationTracker = {
  /** @returns {object[]} All medications from registry. */
  getRegistry() {
    return MedicationTracker._loadRegistry();
  },

  /** @returns {Record<string, boolean>} Today's completion map (medId → taken). */
  getDailyTasks() {
    const tasks = AppStorage.get(STORAGE_KEYS.TASKS, {});
    return typeof tasks === 'object' && !Array.isArray(tasks) ? tasks : {};
  },

  /**
   * @param {string} medicationId
   * @returns {boolean} New completion state
   */
  toggleIntake(medicationId) {
    const tasks = this.getDailyTasks();
    tasks[medicationId] = !tasks[medicationId];
    AppStorage.set(STORAGE_KEYS.TASKS, tasks);
    return tasks[medicationId];
  },

  /**
   * @param {Date} [now=new Date()]
   * @returns {{ active: object[], expired: object[], paused: object[] }}
   */
  getScheduleGroups(now = new Date()) {
    const all = this.getRegistry();
    const active = all
      .filter((med) => this.isCourseActive(med, now))
      .sort((a, b) => (a.time || '00:00').localeCompare(b.time || '00:00'));
    const expired = all
      .filter((med) => !this.isCourseActive(med, now) && !med.paused)
      .sort((a, b) => (a.time || '00:00').localeCompare(b.time || '00:00'));
    const paused = all.filter((med) => med.paused);
    return { active, expired, paused };
  },

  /**
   * @param {object} medication
   * @param {Date} now
   * @returns {boolean}
   */
  isCourseActive(medication, now) {
    if (medication.paused) return false;
    if (medication.end && new Date(`${medication.end}T23:59:59`) < now) {
      return false;
    }
    return true;
  },

  /**
   * Persist full medication list.
   * @param {object[]} medications
   * @returns {boolean}
   */
  saveRegistry(medications) {
    return AppStorage.set(STORAGE_KEYS.MED_REGISTRY, medications);
  },

  /** @private — seeds DEFAULT_MEDS on first run (defined in main bundle). */
  _loadRegistry() {
    if (typeof loadMedicationRegistry === 'function') {
      return loadMedicationRegistry();
    }
    if (typeof loadMedRegistry === 'function') {
      return loadMedRegistry();
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.MED_REGISTRY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      }
    } catch {
      /* fall through to seed */
    }
    return [];
  },

  resetDailyTasks() {
    AppStorage.set(STORAGE_KEYS.TASKS, {});
  },
};

/**
 * Daily mood emoji + rolling 14-day history.
 */
const MoodTracker = {
  /** @returns {string} Today's mood emoji or empty string. */
  getToday() {
    return AppStorage.getString(STORAGE_KEYS.MOOD);
  },

  /** @param {string} emoji */
  saveToday(emoji) {
    AppStorage.set(STORAGE_KEYS.MOOD, emoji);
  },

  /** @returns {Record<string, string>} date → emoji */
  getHistory() {
    const history = AppStorage.get(STORAGE_KEYS.MOOD_HISTORY, {});
    return typeof history === 'object' && !Array.isArray(history) ? history : {};
  },

  /**
   * Append today's mood and trim to last 14 entries.
   * @param {string} emoji
   */
  saveHistoryEntry(emoji) {
    const today = new Date().toISOString().split('T')[0];
    const history = { ...this.getHistory(), [today]: emoji };
    const keys = Object.keys(history).sort().slice(-14);
    const trimmed = {};
    keys.forEach((key) => { trimmed[key] = history[key]; });
    AppStorage.set(STORAGE_KEYS.MOOD_HISTORY, trimmed);
  },

  resetDaily() {
    AppStorage.set(STORAGE_KEYS.MOOD, '');
  },
};

/**
 * Fetal kick counter — resets daily at midnight.
 */
const KickCounter = {
  /** @returns {number} */
  getCount() {
    return parseInt(AppStorage.getString(STORAGE_KEYS.KICK_COUNT, '0'), 10) || 0;
  },

  /** @returns {number} New count after increment */
  increment() {
    const next = this.getCount() + 1;
    AppStorage.set(STORAGE_KEYS.KICK_COUNT, next.toString());
    return next;
  },

  resetDaily() {
    AppStorage.set(STORAGE_KEYS.KICK_COUNT, '0');
  },
};

/**
 * Weight log — date-keyed entries (kg), kept across days.
 */
const WeightTracker = {
  /** @returns {Record<string, number>} */
  getHistory() {
    const history = AppStorage.get(STORAGE_KEYS.WEIGHT_HISTORY, {});
    return typeof history === 'object' && !Array.isArray(history) ? history : {};
  },

  /**
   * @param {number} weightKg
   * @returns {boolean}
   */
  saveEntry(weightKg) {
    const today = new Date().toISOString().split('T')[0];
    const history = { ...this.getHistory(), [today]: weightKg };
    return AppStorage.set(STORAGE_KEYS.WEIGHT_HISTORY, history);
  },
};

/**
 * Hospital bag checklist — array of { t, done?, isC? }.
 */
const HospitalBagStore = {
  /** @returns {object[]} */
  getList() {
    const list = AppStorage.get(STORAGE_KEYS.HOSPITAL_BAG, null);
    return Array.isArray(list) ? list : null;
  },

  /** @param {object[]} items @returns {boolean} */
  saveList(items) {
    return AppStorage.set(STORAGE_KEYS.HOSPITAL_BAG, items);
  },
};

/**
 * Ultrasound gallery — week number → compressed base64 JPEG.
 */
const GalleryStore = {
  /** @returns {Record<number, string>} */
  getPhotos() {
    const photos = AppStorage.get(STORAGE_KEYS.GALLERY_PHOTOS, {});
    return typeof photos === 'object' && !Array.isArray(photos) ? photos : {};
  },

  /** @param {Record<number, string>} photos @returns {boolean} */
  savePhotos(photos) {
    return AppStorage.set(STORAGE_KEYS.GALLERY_PHOTOS, photos);
  },
};

/**
 * Optional display names — setup on first launch, editable in Settings.
 */
const UserProfile = {
  getDisplayName() {
    const fallback = AppI18n?.getLocale?.() === 'en' ? 'Dear one' : 'Дорогая';
    return AppStorage.getString(STORAGE_KEYS.USER_NAME) || fallback;
  },
  getPartnerName() {
    const fallback = AppI18n?.getLocale?.() === 'en' ? 'Loved one' : 'Близкий человек';
    return AppStorage.getString(STORAGE_KEYS.PARTNER_NAME) || fallback;
  },
  setDisplayName(name) {
    AppStorage.set(STORAGE_KEYS.USER_NAME, (name || '').trim());
  },
  setPartnerName(name) {
    AppStorage.set(STORAGE_KEYS.PARTNER_NAME, (name || '').trim());
  },
};

/**
 * Runs at app init when the calendar day changes.
 * Resets daily trackers without touching long-term history.
 */
function checkDailyReset() {
  const today = new Date().toDateString();
  if (AppStorage.getString(STORAGE_KEYS.LAST_DATE) === today) return;

  if (
    AppStorage.getString(STORAGE_KEYS.FINISHED_DAY) !== 'true' &&
    AppStorage.getString(STORAGE_KEYS.LAST_DATE)
  ) {
    AppStorage.set(STORAGE_KEYS.STREAK, '0');
  }

  MedicationTracker.resetDailyTasks();
  WaterTracker.resetDaily();
  MoodTracker.resetDaily();
  KickCounter.resetDaily();
  AppStorage.set(STORAGE_KEYS.FINISHED_DAY, 'false');
  AppStorage.set(STORAGE_KEYS.LAST_DATE, today);
}

/** Legacy alias — existing inline code calls checkReset(). */
const checkReset = checkDailyReset;

/**
 * Convert "HH:MM" to minutes since midnight.
 * @param {string} timeString
 * @returns {number}
 */
function minutesFromTimeString(timeString) {
  const [hours, minutes] = (timeString || '00:00').split(':').map(Number);
  return hours * 60 + (minutes || 0);
}

/** @deprecated Alias for minutesFromTimeString */
const minsFromTime = minutesFromTimeString;

/**
 * Calculate gestational week from expected due date (EDD).
 * @param {string} edd ISO date string
 * @returns {{ week: number, dayR: number, days: number }}
 */
function calculateGestationalWeek(edd) {
  const dueDate = new Date(edd);
  if (!edd || Number.isNaN(dueDate.getTime())) {
    return { week: 1, dayR: 0, days: 0 };
  }
  const conceptionDate = new Date(dueDate.getTime() - 280 * 86400000);
  const days = Math.floor((Date.now() - conceptionDate) / 86400000);
  return {
    week: Math.min(40, Math.max(1, Math.floor(days / 7))),
    dayR: days % 7,
    days,
  };
}

/** @deprecated Alias */
const calcW = calculateGestationalWeek;

/**
 * Trigger short haptic feedback on supported devices.
 */
function triggerHaptic() {
  if (navigator.vibrate) navigator.vibrate(9);
}

/** @deprecated Alias */
const H = triggerHaptic;
