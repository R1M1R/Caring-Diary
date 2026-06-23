/**
 * @file i18n.js
 * @description Locale engine — English (default) and Russian UI.
 */
'use strict';

/** @typedef {'ru'|'en'} AppLocale */

const SUPPORTED_LOCALES = Object.freeze(['ru', 'en']);

const AppI18n = {
  /** @type {AppLocale} */
  _locale: 'en',

  /** @returns {AppLocale} */
  getLocale() {
    return this._locale;
  },

  /** @param {AppLocale} locale */
  setLocale(locale) {
    if (!SUPPORTED_LOCALES.includes(locale)) return;
    this._locale = locale;
    AppStorage.set(STORAGE_KEYS.LANGUAGE, locale);
    document.documentElement.lang = locale;
    document.title = this.t('meta.title');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', this.t('meta.description'));
    this.bindContentGlobals();
    this.applyDom();
    if (typeof refreshLocaleUI === 'function') refreshLocaleUI();
  },

  init() {
    const saved = AppStorage.getString(STORAGE_KEYS.LANGUAGE, 'en');
    this._locale = SUPPORTED_LOCALES.includes(saved) ? /** @type {AppLocale} */ (saved) : 'en';
    document.documentElement.lang = this._locale;
    document.title = this.t('meta.title');
    this.bindContentGlobals();
    this.applyDom();
  },

  /**
   * @param {string} key — dot path in UI_I18N
   * @param {Record<string, string|number>} [vars]
   * @returns {string}
   */
  /** Capitalize first letter (e.g. dear one → Dear one). */
  capitalizeFirst(str) {
    if (!str || typeof str !== 'string') return str;
    const s = str.trim();
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
  },

  /** Ensure each sentence starts with a capital letter. */
  capitalizeSentences(str) {
    if (!str || typeof str !== 'string') return str;
    const s = this.capitalizeFirst(str);
    return s.replace(/([.!?…]\s+)([a-zа-яё])/g, (_, punct, ch) => punct + ch.toUpperCase());
  },

  t(key, vars) {
    const pack = UI_I18N[this._locale] || UI_I18N.ru;
    let text = pack[key] ?? UI_I18N.ru[key] ?? key;
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      });
    }
    return text;
  },

  /** Russian day pluralization; English uses short form. */
  pluralDays(count) {
    const n = Math.abs(Number(count)) || 0;
    if (this._locale === 'en') return `${n} ${this.t('days.short').replace(/^d\.$/, 'd')}`;
    const mod10 = n % 10;
    const mod100 = n % 100;
    let word = this.t('days.many');
    if (mod100 >= 11 && mod100 <= 14) word = this.t('days.many');
    else if (mod10 === 1) word = this.t('days.one');
    else if (mod10 >= 2 && mod10 <= 4) word = this.t('days.few');
    return `${n} ${word}`;
  },

  /** Hero chip suffix after week number (e.g. «& 3 дн.»). */
  heroDaysSuffix(dayR) {
    if (this._locale === 'en') return `& ${dayR} d.`;
    return `& ${dayR} ${this.t('days.short')}`;
  },

  /** Medication count plural (ru); English uses "dose(s)". */
  pluralMedCount(count) {
    const n = Math.abs(Number(count)) || 0;
    if (this._locale === 'en') return n === 1 ? 'dose' : 'doses';
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod100 >= 11 && mod100 <= 14) return this.t('medCount.many');
    if (mod10 === 1) return this.t('medCount.one');
    if (mod10 >= 2 && mod10 <= 4) return this.t('medCount.few');
    return this.t('medCount.many');
  },

  /** WHO weight-gain corridor labels for BMI category. */
  getWhoGain(category) {
    const map = {
      underweight: { label: 'bmi.underweightFull', range: 'bmi.rangeUnder', rate: 'bmi.rateUnder', rateNum: 0.51 },
      normal: { label: 'bmi.normalFull', range: 'bmi.rangeNormal', rate: 'bmi.rateNormal', rateNum: 0.42 },
      overweight: { label: 'bmi.overweightFull', range: 'bmi.rangeOver', rate: 'bmi.rateOver', rateNum: 0.28 },
      obese: { label: 'bmi.obeseFull', range: 'bmi.rangeObese', rate: 'bmi.rateObese', rateNum: 0.22 },
    };
    const m = map[category] || map.normal;
    return {
      label: this.t(m.label),
      range: this.t(m.range),
      wkRate: this.t(m.rate),
      rateNum: m.rateNum,
    };
  },

  /** Sync APP_CONTENT globals used by inline logic. */
  bindContentGlobals() {
    const c = APP_CONTENT[this._locale] || APP_CONTENT.ru;
    window.petNames = c.petNames;
    window.heroG = c.heroG;
    window.timeMsgs = c.timeMsgs;
    window.babyMsgs = c.babyMsgs;
    window.quotes = c.quotes;
    window.letters = c.letters;
    window.coupons = c.coupons;
    window.DEFAULT_MEDS = c.DEFAULT_MEDS;
    window.moodR = c.moodR;
    window.careTips = c.careTips;
  },

  /** Update static DOM nodes marked with data-i18n / data-i18n-placeholder. */
  applyDom() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key) el.textContent = this.t(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) el.setAttribute('placeholder', this.t(key));
    });
    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const key = el.getAttribute('data-i18n-title');
      if (key) el.setAttribute('title', this.t(key));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria');
      if (key) el.setAttribute('aria-label', this.t(key));
    });
    const byId = {
      spTitle: 'splash.title',
      spName: 'splash.tagline',
      setupWelcome: 'setup.welcome',
      setupDesc: 'setup.description',
      setupStartBtn: 'setup.startBtn',
      cdTitle: 'hero.countdownTitle',
      cdLblD: 'hero.countdownDays',
      cdLblH: 'hero.countdownHours',
      cdLblM: 'hero.countdownMinutes',
      ringLbl: 'hero.weeksLabel',
      fetusCompareTitle: 'hero.fetusCompareTitle',
      careTipTitle: 'hero.careTipTitle',
      bodyChangesTitle: 'hero.bodyChangesTitle',
      bodyChangesSub: 'hero.bodyChangesDefaultSub',
      lettersTitle: 'hero.lettersTitle',
      lettersSub: 'hero.lettersSub',
      couponTitle: 'hero.couponTitle',
      couponSub: 'hero.couponSub',
      couponBtn: 'hero.couponBtn',
      moodTitle: 'hero.moodTitle',
      moodSub: 'hero.moodSub',
      faqTitle: 'hero.faqTitle',
      faqSub: 'hero.faqSub',
      breathingTitle: 'hero.breathingTitle',
      breathingSub: 'hero.breathingSub',
      brTit: 'hero.breathingStart',
      brTxt: 'hero.breathingReady',
      waterTitle: 'hero.waterTitle',
      waterSub: 'hero.waterSub',
      ultrasoundTitle: 'hero.ultrasoundTitle',
      ultrasoundSub: 'hero.ultrasoundSub',
      photoPlaceholderLbl: 'hero.ultrasoundAdd',
      kickTitle: 'hero.kicksTitle',
      kickSub: 'hero.kicksSub',
      medsPageTitle: 'meds.pageTitle',
      medsPageDesc: 'meds.pageDesc',
      medAddBtn: 'meds.addBtn',
      medDoneLbl: 'meds.doneToday',
      finBtn: 'meds.finishDay',
      finMsg: 'meds.finishMsg',
      diaryTitle: 'meds.diaryTitle',
      diaryDesc: 'meds.diaryDesc',
      diarySaveBtn: 'meds.diarySave',
      reportTitle: 'meds.reportTitle',
      reportDesc: 'meds.reportDesc',
      reportGenBtn: 'meds.reportBtn',
      reportCopyBtn: 'meds.reportCopy',
      bagPageTitle: 'bag.pageTitle',
      bagPageDesc: 'bag.pageDesc',
      genderCardTitle: 'gender.cardTitle',
      genderCardDesc: 'gender.cardDesc',
      settingsLangTitle: 'settings.langTitle',
      settingsNameLbl: 'settings.nameLabel',
      settingsPartnerLbl: 'settings.partnerLabel',
      settingsNotifDesc: 'settings.notificationsDesc',
      settingsHeightLbl: 'settings.heightLabel',
      settingsHeightUnit: 'settings.heightUnit',
      settingsHeightSave: 'settings.heightSave',
      settingsPhoneLbl: 'settings.phoneLabel',
      settingsSaveBtn: 'settings.saveBtn',
      settingsEddLbl: 'settings.eddLabel',
      settingsEddUpdate: 'settings.eddUpdate',
      settingsClearBtn: 'settings.clearData',
      settingsFooter: 'settings.footer',
      couponModalLbl: 'coupon.modalLabel',
      couponScreenshotHint: 'coupon.screenshotHint',
      couponExpiry: 'coupon.expiry',
      medFormSave: 'medForm.save',
      medDelBtn: 'medForm.delete',
      journalPageTitle: 'journal.pageTitle',
      journalPageDesc: 'journal.pageDesc',
      journalMoodTitle: 'journal.moodHistoryTitle',
      journalMoodSub: 'journal.moodHistorySub',
      journalWeightTitle: 'journal.weightTitle',
      journalWeightSub: 'journal.weightSub',
      journalWeightUnit: 'journal.weightUnit',
      journalWeightSave: 'journal.weightSave',
      journalGalleryTitle: 'journal.galleryTitle',
      journalGallerySub: 'journal.gallerySub',
      bmiTitle: 'journal.bmiTitle',
      bmiLblUnder: 'journal.bmiUnder',
      bmiLblNormal: 'journal.bmiNormal',
      bmiLblOver: 'journal.bmiOver',
      bmiLblObese: 'journal.bmiObese',
      settingsPageTitle: 'settings.pageTitle',
      settingsDarkThemeLbl: 'settings.darkTheme',
      settingsNotifLbl: 'settings.notifications',
      settingsNotifBtn: 'settings.notificationsEnable',
      setupLangLbl: 'setup.langTitle',
      medMoSub: 'medForm.subtitle',
      medNameLbl: 'medForm.nameLabel',
      medDoseLbl: 'medForm.doseLabel',
      medTimeLbl: 'medForm.timeLabel',
      medIconLbl: 'medForm.iconLabel',
      medDetLbl: 'medForm.noteLabel',
      medEndLbl: 'medForm.endLabel',
      medPauseLbl: 'medForm.pauseLabel',
      galAddBtn: 'gallery.addPhoto',
      galDelBtn: 'gallery.deletePhoto',
      annivTitle: 'anniv.title',
      annivSub: 'anniv.defaultSub',
      heroTitle: 'hero.defaultTitle',
      qTxt: 'hero.quoteLoading',
      babyT: 'hero.babyDefault',
      tmText: 'hero.tmsgLoading',
      medMoTitle: 'medForm.new',
      qNoteSig: 'hero.quoteSignature',
      qNoteTap: 'hero.quoteTapHint',
      babyAuthor: 'hero.babyAuthor',
      heroUntilLbl: 'hero.untilMeeting',
      heroDaysUnit: 'hero.daysLabel',
      letterBtnAnxiety: 'letter.anxiety',
      letterBtnTired: 'letter.tired',
      letterBtnSad: 'letter.sad',
      letterBtnLove: 'letter.love',
      letterBtnGames: 'letter.games',
      gBtnNLbl: 'gender.secret',
      gBtnGLbl: 'gender.girl',
      gBtnBLbl: 'gender.boy',
      lSign: 'letter.signDefault',
      tmsgFrom: 'hero.tmsgDefaultFrom',
      tmsgTap: 'hero.tmsgTap',
    };
    Object.entries(byId).forEach(([id, key]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = this.t(key);
    });
    const phById = {
      userNameIn: 'setup.namePlaceholder',
      settingsNameIn: 'settings.namePlaceholder',
      partnerNameIn: 'settings.partnerPlaceholder',
      phoneIn: 'settings.phonePlaceholder',
      diaryT: 'meds.diaryPlaceholder',
      medNameIn: 'medForm.namePlaceholder',
      medDoseIn: 'medForm.dosePlaceholder',
      medIconIn: 'medForm.iconPlaceholder',
      medDetIn: 'medForm.notePlaceholder',
    };
    Object.entries(phById).forEach(([id, key]) => {
      const el = document.getElementById(id);
      if (el) el.setAttribute('placeholder', this.t(key));
    });
    const langRu = document.getElementById('langBtnRu');
    const langEn = document.getElementById('langBtnEn');
    if (langRu) {
      langRu.textContent = this.t('settings.langRu');
      langRu.classList.toggle('active', this._locale === 'ru');
    }
    if (langEn) {
      langEn.textContent = this.t('settings.langEn');
      langEn.classList.toggle('active', this._locale === 'en');
    }
    const setupRu = document.getElementById('setupLangRu');
    const setupEn = document.getElementById('setupLangEn');
    if (setupRu) setupRu.classList.toggle('active', this._locale === 'ru');
    if (setupEn) setupEn.classList.toggle('active', this._locale === 'en');
    const bmiBtn = document.getElementById('bmiToggleBtn');
    const bmiSection = document.getElementById('bmiSection');
    if (bmiBtn && bmiSection) {
      const open = bmiSection.style.display !== 'none';
      bmiBtn.textContent = this.t(open ? 'journal.bmiToggleHide' : 'journal.bmiToggleShow');
    }
    const navKeys = ['nav.home', 'nav.care', 'nav.journal', 'nav.bag', 'nav.settings'];
    document.querySelectorAll('#nav .nb .nav-lbl').forEach((el, i) => {
      if (navKeys[i]) el.textContent = this.t(navKeys[i]);
    });
    if (typeof updateCallButton === 'function') updateCallButton();
  },

  /**
   * Locale-aware date formatting.
   * @param {Date} date
   * @param {Intl.DateTimeFormatOptions} [opts]
   */
  formatDate(date, opts) {
    const locale = this._locale === 'en' ? 'en-US' : 'ru-RU';
    return date.toLocaleDateString(locale, opts);
  },

  formatTime(date, opts) {
    const locale = this._locale === 'en' ? 'en-US' : 'ru-RU';
    return date.toLocaleTimeString(locale, opts);
  },
};

/** Switch locale from settings UI. */
function setAppLanguage(locale) {
  H?.();
  AppI18n.setLocale(locale);
  toast(AppI18n.t('settings.langSaved'));
}
