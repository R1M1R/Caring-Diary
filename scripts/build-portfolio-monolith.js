#!/usr/bin/env node
/**
 * Transform Vercel v18 monolith (_vercel_source.html) into English portfolio index.html
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, '_vercel_source.html');
const OUT = path.join(ROOT, 'index.html');

function evalInContext(file, expr) {
  const code = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const sandbox = { console, AppI18n: { getLocale: () => 'en', t: (k) => k } };
  return vm.runInNewContext(`${code}\n;${expr}`, sandbox);
}

function replaceConst(html, name, newCode) {
  const marker = `const ${name}=`;
  const start = html.indexOf(marker);
  if (start === -1) throw new Error(`const ${name} not found`);
  let i = html.indexOf('=', start) + 1;
  while (html[i] === ' ') i++;
  const open = html[i];
  if (open !== '{' && open !== '[') {
    const end = html.indexOf('\n', start);
    return html.slice(0, start) + newCode.trim() + '\n' + html.slice(end + 1);
  }
  const close = open === '{' ? '}' : ']';
  let depth = 0;
  let j = i;
  for (; j < html.length; j++) {
    const c = html[j];
    if (c === open) depth++;
    else if (c === close) {
      depth--;
      if (depth === 0) {
        j++;
        break;
      }
    }
  }
  while (html[j] === ' ') j++;
  if (html[j] === ';') j++;
  return html.slice(0, start) + newCode.trim() + html.slice(j);
}

function replaceFunction(html, name, newCode) {
  const re = new RegExp(`function ${name}\\([^)]*\\)\\{`, 'm');
  const m = html.match(re);
  if (!m) throw new Error(`function ${name} not found`);
  const start = m.index;
  let i = start + m[0].length - 1;
  let depth = 0;
  for (; i < html.length; i++) {
    const c = html[i];
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) {
        i++;
        break;
      }
    }
  }
  return html.slice(0, start) + newCode.trim() + html.slice(i);
}

function serializeHeroG(heroG) {
  let s = 'const heroG={\n';
  for (const [period, fns] of Object.entries(heroG)) {
    s += `  ${period}:[\n${fns.map((f) => `    ${f.toString()}`).join(',\n')}\n  ],\n`;
  }
  return `${s.slice(0, -2)}\n};\n`;
}

function serializeObj(name, obj, indent = 0) {
  const pad = ' '.repeat(indent);
  if (Array.isArray(obj)) {
    const items = obj.map((v) => `${pad}  ${JSON.stringify(v)}`).join(',\n');
    return `${pad}${JSON.stringify(obj).startsWith('[') ? '' : ''}[${items ? `\n${items}\n${pad}]` : ']'}`.replace(/^\[(\n)/, '[\n').replace(/\]$/, `${pad}]`);
  }
  return `const ${name}=${JSON.stringify(obj, null, 2)};\n`;
}

function buildI18nMap() {
  const ui = evalInContext('js/ui-i18n.js', 'UI_I18N');
  const ru = ui.ru;
  const en = ui.en;
  const map = [];
  for (const key of Object.keys(ru)) {
    if (en[key] && ru[key] !== en[key]) map.push([ru[key], en[key]]);
  }
  map.sort((a, b) => b[0].length - a[0].length);
  return map.filter(([from]) => {
    if (!from || from.length < 6) return false;
    if (from.length < 10 && !/[\s,.!?;:—–\-<>«»()]/.test(from)) return false;
    return true;
  });
}

function buildDefaultBagEn(ui) {
  const t = (k) => ui.en[k];
  return [
    { isC: true, t: t('bag.cat.documents') },
    { id: 'd1', t: t('bag.item.d1'), done: false },
    { id: 'd2', t: t('bag.item.d2'), done: false },
    { id: 'd3', t: t('bag.item.d3'), done: false },
    { id: 'd4', t: t('bag.item.d4'), done: false },
    { id: 'd5', t: t('bag.item.d5'), done: false },
    { isC: true, t: t('bag.cat.momLabor') },
    { id: 'm1', t: t('bag.item.m1'), done: false },
    { id: 'm2', t: t('bag.item.m2'), done: false },
    { id: 'm3', t: t('bag.item.m3'), done: false },
    { id: 'm4', t: t('bag.item.m4'), done: false },
    { id: 'm5', t: t('bag.item.m5'), done: false },
    { id: 'm6', t: t('bag.item.m6'), done: false },
    { isC: true, t: t('bag.cat.momPost') },
    { id: 'p1', t: t('bag.item.p1'), done: false },
    { id: 'p2', t: t('bag.item.p2'), done: false },
    { id: 'p3', t: t('bag.item.p3'), done: false },
    { id: 'p4', t: t('bag.item.p4'), done: false },
    { id: 'p5', t: t('bag.item.p5'), done: false },
    { isC: true, t: t('bag.cat.baby') },
    { id: 'b1', t: t('bag.item.b1'), done: false },
    { id: 'b2', t: t('bag.item.b2'), done: false },
    { id: 'b3', t: t('bag.item.b3'), done: false },
    { id: 'b4', t: t('bag.item.b4'), done: false },
    { isC: true, t: t('bag.cat.discharge') },
    { id: 'o1', t: t('bag.item.o1'), done: false },
    { id: 'o2', t: t('bag.item.o2'), done: false },
    { id: 'o3', t: t('bag.item.o3'), done: false },
    { isC: true, t: t('bag.cat.org') },
    { id: 'r1', t: t('bag.item.r1'), done: false },
    { id: 'r2', t: t('bag.item.r2'), done: false },
    { id: 'r3', t: t('bag.item.r3'), done: false },
    { id: 'r4', t: t('bag.item.r4'), done: false },
  ];
}

const V18_HTML = {
  'Для Индиры': 'Caring Diary',
  'от любящего мужа Эмира 🤍': 'Your companion on the journey to motherhood 🤍',
  'Привет, родная!': 'Welcome!',
  'Я сделал этот дневник специально для тебя и нашего малыша. Введи предполагаемую дату родов (ПДР).': 'A personal pregnancy diary with trackers, weekly facts, and daily support. Enter your estimated due date (EDD).',
  'Начать наш путь ✨': 'Begin your journey ✨',
  'С нашей годовщиной!': 'A Special Day!',
  'Я люблю тебя и нашего малыша бесконечно ❤️': 'You do something incredible every day ❤️',
  'Для любимой': 'Caring for you',
  'Дни подряд и всего завершённых дней': 'Streak and total completed days',
  'недель &amp;': 'weeks &amp;',
  'недель &': 'weeks &',
  'дн.': 'd.',
  'До встречи': 'Until we meet',
  'дней': 'days',
  'Сводка на сегодня': 'Today summary',
  'препараты': 'meds',
  'вода': 'water',
  'настроение': 'mood',
  'фото': 'photos',
  'Препараты на сегодня': 'Today\'s medications',
  '💊 Сегодня принять': '💊 Take today',
  'Все препараты →': 'All medications →',
  'Следующая задача': 'Next task',
  'Перейти': 'Go',
  'Следующий визит': 'Next appointment',
  'Следующий визит к врачу': 'Next provider visit',
  'Ближайшее': 'Up next',
  'Быстрые переходы': 'Quick links',
  '💊 Забота': '💊 Care',
  '📓 Дневник': '📓 Journal',
  '🌬️ Дыхание': '🌬️ Breathe',
  '💧 Вода': '💧 Water',
  '💌 Письма': '💌 Letters',
  '🌟 Идеальный день заботы — ты молодец!': '🌟 Perfect care day — well done!',
  'Сводка за неделю': 'Weekly summary',
  'Твоя неделя': 'Your week',
  'Поделиться сводкой': 'Share summary',
  'Индекс заботы за 7 дней': 'Care index — last 7 days',
  'Индекс заботы — нажми для пояснения': 'Care index — tap for details',
  'индекс': 'index',
  '— нед.': '— wk',
  'Прогресс беременности': 'Pregnancy progress',
  'Путь к малышу': 'Journey to baby',
  'I трим. · 1–13': 'I trim. · 1–13',
  '✨ До встречи с малышом': '✨ Countdown to baby',
  'часов': 'hours',
  'минут': 'minutes',
  'Послание от мужа': 'A message of support',
  'Загружаю любовь...': 'Loading love...',
  'тапни — следующее ↻': 'tap — next message ↻',
  'недель': 'weeks',
  '0 дней': '0 days',
  'Размер: --': 'Size: --',
  '— г': '— g',
  '— см': '— cm',
  'Малыш сейчас как...': 'Baby is about the size of...',
  'ладошка': 'a hand',
  'манго': 'mango',
  'Тапни — другая цитата': 'Tap for another quote',
  'Загружаю мою любовь...': 'Loading a little love...',
  '— Эмир 🤍': '— with love 🤍',
  'тапни для новой цитаты ↻': 'tap for a new quote ↻',
  'Забота от Эмира': 'Tip of the Day',
  'малыш пишет 💕 · тапни чтобы сменить': 'baby writes 💕 · tap to change',
  '🌸 Твоё тело сейчас': '🌸 Your Body Right Now',
  'Что происходит с мамой на этой неделе': 'What\'s happening for you this week',
  '💌 Поддержка и душа': '💌 Support Letters',
  '💌 Письма от меня': '💌 Support Letters',
  'Выбери что чувствуешь сейчас — я написал это специально для тебя': 'Choose how you feel — warm words are here for you',
  'Мне тревожно': 'I\'m anxious',
  'Я устала': 'I\'m tired',
  'Мне грустно': 'I feel sad',
  'Скучаю': 'Need support',
  'Хочу поиграть вместе': 'Need a distraction',
  '🎟️ Чековая книжка': '🎟️ Coupon book',
  'Вытяни купон и отправь мне скриншот!': 'Draw a coupon and share it with someone close!',
  'Вытянуть купон ✨': 'Draw a coupon ✨',
  '🫂 Спокойствие и забота о себе': '🫂 Peace of Mind',
  '✨ Как ты себя чувствуешь?': '✨ How are you feeling?',
  'Отметь настроение — я хочу знать 💕': 'Log your mood — I want to know 💕',
  'Выбери настроение': 'Choose mood',
  'Хорошее настроение': 'Happy mood',
  'Романтичное настроение': 'Loving mood',
  'Устала': 'Tired',
  'Тошнит': 'Nauseous',
  'Сияю': 'Glowing',
  '🫂 Спокойствие мамы': '🫂 Peace of Mind',
  'Ответы на частые вопросы': 'Answers to common questions',
  '🌬️ Подышим вместе?': '🌬️ Breathe with me?',
  'Снимает тревогу и успокаивает пульс': 'Eases anxiety and steadies your pulse',
  'Начать': 'Start',
  'Нажми на круг, когда будешь готова': 'Tap the circle when you\'re ready',
  '💧 Здоровье и связь': '💧 Hydration',
  '💧 Водичка': '💧 Hydration',
  'Пей за двоих, родная! Норма: 8 стаканов в день': 'Stay hydrated for two! Goal: 8 glasses per day',
  '📸 Наше чудо': '📸 Ultrasound Photo',
  'Сохрани здесь наше любимое фото УЗИ — приложение автоматически сожмёт его для телефона': 'Save your favorite ultrasound image here — the app compresses it for your phone',
  'Добавить фото УЗИ': 'Add photo',
  'Нажми — выбери из галереи': 'Tap to choose from gallery',
  'Наш малыш': 'Ultrasound',
  '👣 Шевеления малыша': '👣 Baby kicks',
  'Клинический метод: 10+ движений за 2 часа. Начни сессию перед подсчётом.': 'Count those kicks! Norm: 10+ movements in 2 hours. Start a session before counting.',
  'Нажми «Начать» перед подсчётом': 'Tap Start before counting',
  '▶ Начать 2-часовую сессию': '▶ Start 2-hour session',
  'Отметить шевеление': 'Log kick',
  '📞 Позвонить любимому': '📞 Emergency call',
  'Я всегда на связи 24/7 ❤️': 'Add a number in settings',
  'План заботы': 'Care Plan',
  'Отмечай приём, добавляй и редактируй препараты — всё сохраняется на телефоне 💊': 'Track doses, add and edit medications — everything stays on your phone 💊',
  '＋ Добавить препарат': '＋ Add medication',
  'Следующий приём:': 'Next dose:',
  'Выполнено сегодня': 'Completed today',
  'Приём препаратов · 7 дней': 'Medication adherence · 7 days',
  '🌟 Завершить день!': '🌟 Finish the day!',
  'Умничка! Я так тобой горжусь ❤️': 'Well done! I\'m so proud of you ❤️',
  'Письмо малышу 📝': 'Letter to Baby 📝',
  'Запиши свои мысли. Потом будет так здорово это перечитать вместе!': 'Write your thoughts. You\'ll love reading these together later!',
  'Сегодня ты так сильно пинался, когда папа гладил животик...': 'Today I felt so many kicks when I rested my hand on my belly...',
  'Сохранить в сердце 💖': 'Save to heart 💖',
  'Отчёт для врача 📋': 'Provider Report 📋',
  'Сформируй сводку приёма препаратов и самочувствия — удобно показать врачу!': 'Build a summary of medications and wellbeing — easy to share at appointments!',
  '📊 Сформировать отчёт': '📊 Generate report',
  '📋 Скопировать': '📋 Copy to clipboard',
  '📤 Сводка': '📤 Summary',
  'Индекс заботы': 'Care index',
  'Up next событие': 'Up next event',
  'Ближайшее событие': 'Upcoming event',
  '💾 Скачать .txt': '💾 Download .txt',
  '🖨️ Печать / PDF': '🖨️ Print / PDF',
  'Дневник': 'Journal',
  'История настроений, вес, записи и наш животик по неделям': 'Mood history, weight, entries, and bump photos by week',
  '✅ Подготовка к визиту': '✅ Visit prep',
  'Отметь что уже готово — не забудешь ничего важного': 'Check off what\'s ready — don\'t forget anything important',
  '📓 Записи по дням': '📓 Daily entries',
  'Мысли, события и воспоминания — с датой и неделей беременности': 'Thoughts, events, and memories — with date and pregnancy week',
  '🔍 Искать в записях…': '🔍 Search entries…',
  'Поиск по дневнику': 'Search journal',
  '🖨️ Экспорт дневника': '🖨️ Export journal',
  'Сегодня малыш так сильно пинался, когда папа гладил животик…': 'Today baby kicked so much when I rested my hand on my belly…',
  'Сохранить запись 💖': 'Save entry 💖',
  '🗓️ Визиты к врачу': '🗓️ Provider visits',
  'Скрининг, УЗИ, анализы — отмечай и не пропусти': 'Screenings, ultrasounds, labs — track and don\'t miss any',
  'Скрининг, УЗИ…': 'Screening, ultrasound…',
  '🩺 Самочувствие сегодня': '🩺 How you feel today',
  'Отметь симптомы и давление — попадёт в отчёт для врача': 'Log symptoms and blood pressure — included in your provider report',
  'Верхнее давление': 'Systolic',
  'Нижнее давление': 'Diastolic',
  'мм рт.ст.': 'mmHg',
  'Записать': 'Log',
  'Давление ещё не записывали сегодня': 'No blood pressure logged today',
  'Симптомы · 7 дней': 'Symptoms · 7 days',
  'Давление · 7 дней': 'Blood pressure · 7 days',
  '⏱️ Таймер схваток': '⏱️ Contraction timer',
  'На случай родов — отмечай каждую схватку, приложение посчитает интервал': 'For labor — log each contraction; the app calculates intervals',
  'за сессию': 'this session',
  'интервал': 'interval',
  'средний': 'average',
  '💗 Была схватка': '💗 Had a contraction',
  'Завершить сессию': 'End session',
  '⚠️ Схватки частые и регулярные — позвони врачу или мне прямо сейчас!': '⚠️ Contractions are frequent and regular — call your provider or emergency contact now!',
  '📊 История настроений': '📊 Mood History',
  'Последние 14 дней': 'Last 14 days',
  '⚖️ Весовой трекер': '⚖️ Weight Tracker',
  'Следим за прибавкой вместе — это важно!': 'Tracking gain together — it matters!',
  'кг': 'kg',
  '📊 Показать коридор ВОЗ': '📊 Show WHO range',
  'ИМТ до беременности': 'Pre-pregnancy BMI',
  'Недовес': 'Underweight',
  'Норма': 'Normal',
  'Избыток': 'Overweight',
  'Ожирение': 'Obese',
  'Сохрани первый вес для расчёта ИМТ 📊': 'Log your first weight to calculate BMI 📊',
  '📷 Животик по неделям': '📷 Bump by Week',
  'Фото с 19 по 40 неделю — одно на каждую неделю беременности': 'Tap a cell to add a photo. Gallery from weeks 19–40! Current week highlighted ✨',
  'Нажми на квадрат с номером недели ниже': 'Tap a week cell below',
  'Выбери «Снять животик» или «Выбрать из галереи»': 'Choose Take photo or Choose from gallery',
  '📷 Добавить фото ·': '📷 Add photo ·',
  'текущая неделя': 'current week',
  'Сетка недель 19–40': 'Week grid 19–40',
  '🎞️ Путь животика': '🎞️ Bump timeline',
  '↔ Сравнить недели': '↔ Compare weeks',
  'Сумка в роддом': 'Hospital Bag',
  'Отмечай, редактируй список и добавляй свои вещи — всё сохраняется на телефоне!': 'Check off, edit, and add items — everything stays on your phone!',
  '＋ Добавить вещь': '＋ Add item',
  '＋ Раздел': '＋ Section',
  '🔍 Найти вещь в списке…': '🔍 Search bag…',
  'Поиск по сумке': 'Search bag',
  '📦 Прогресс сборки': '📦 Packing progress',
  '0 из 0 готово': '0 of 0 ready',
  'Настройки': 'Settings',
  '✨ Приложение готово': '✨ App ready',
  'Все основные функции на месте — пользуйся каждый день, данные хранятся на телефоне': 'All core features are here — use daily; data stays on your phone',
  '👶 Пол малыша': '👶 Baby\'s Sex',
  'После скрининга 25 марта укажи здесь пол малыша — приложение изменит цвета и подстроит некоторые факты!': 'After your anatomy scan, set baby\'s sex — the app will adjust the theme and some facts.',
  'Пока тайна': 'Still a surprise',
  'Девочка': 'Girl',
  'Мальчик': 'Boy',
  '📸 Память для фото': '📸 Photo storage',
  'По умолчанию храним только лёгкие превью (~100 КБ) — оригиналы остаются в галерее iPhone. Так все 22 недели животика помещаются без проблем.': 'By default we store light previews (~100 KB) — originals stay in your phone gallery.',
  'Полные копии в приложении': 'Full copies in app',
  'Рекомендуется: превью в приложении, оригинал в галерее.': 'Recommended: preview in app, original in gallery.',
  'Загрузка…': 'Loading…',
  'Оптимизировать все фото ✨': 'Optimize all photos ✨',
  'Удалить все фото': 'Delete all photos',
  '📱 Установка на iPhone': '📱 Install on iPhone',
  'Проверяем режим приложения…': 'Checking app mode…',
  'Проверить обновления приложения': 'Check for app updates',
  'Тёмная тема 🌙': 'Dark theme 🌙',
  'Уведомления 🔔': 'Notifications 🔔',
  'Включить': 'Enable',
  'Напомню о препаратах — разреши уведомления. На iPhone напоминания приходят, когда приложение открыто или недавно использовалось.': 'Allow notifications — the app will remind you about scheduled medications on time.',
  'На iPhone напоминания работают, когда приложение установлено на экран «Домой» и периодически открывается.': 'On iPhone, reminders work best when the app is installed on the Home Screen and opened regularly.',
  'Твой рост (для расчёта ИМТ):': 'Your height (for BMI):',
  'см': 'cm',
  'Сохранить': 'Save',
  'Мой номер телефона:': 'Emergency contact phone:',
  'Сохранить номер': 'Save settings',
  'Изменить дату родов (ПДР):': 'Change due date (EDD):',
  'Обновить дату': 'Update date',
  '🛡️ Твои данные на телефоне': '🛡️ Your data on device',
  'Фото, лекарства, отметки и сумка хранятся только здесь. Обновление приложения их не стирает — но сделай резервную копию на всякий случай.': 'Photos, meds, logs, and bag list stay on this device. App updates won\'t erase them — but back up just in case.',
  '💾 Резервная копия': '💾 Backup',
  'Сохрани все записи и фото в файл — можно перенести на новый телефон или восстановить после сброса.': 'Save all entries and photos to a file — transfer to a new phone or restore after reset.',
  '💡 Давно не делала резервную копию — сохрани файл на всякий случай!': '💡 Haven\'t backed up in a while — save a file just in case!',
  'Скачать резервную копию': 'Download backup',
  'Восстановить из файла': 'Restore from file',
  'Очистить все данные': 'Clear all data',
  'Для Индиры · v18': 'Caring Diary · portfolio',
  'Позвонить Эмиру': 'Call emergency contact',
  'Позвонить': 'Call',
  '+7 (999) 123-45-67': '+1 (555) 123-4567',
  '+7 (999) 123-45-67 / +996 777 123 456': '+1 (555) 123-4567',
  '+1 (555) 123-4567 / +996 777 123 456': '+1 (555) 123-4567',
  '<em>🥺</em>I\'m anxious': '<em>🥺</em>I feel anxious',
  '<em>😫</em>I\'m tired': '<em>😫</em>I\'m exhausted',
  'Навигация приложения': 'App navigation',
  'Главная': 'Home',
  'Забота и препараты': 'Care and medications',
  'Сумка в роддом': 'Hospital bag',
  '— Твой любящий муж ❤️': '— With love 🤍',
  'Купон на:': 'Coupon for:',
  'Сделай скриншот и отправь мне ❤️': 'Take a screenshot and show someone you love ❤️',
  'Срок годности: бесконечен.': 'Expiration: never.',
  'Закрыть': 'Close',
  'Неделя сохранена ✨': 'Week saved ✨',
  'Снять животик 📷': 'Take bump photo 📷',
  'Выбрать из галереи 🖼️': 'Choose from gallery 🖼️',
  'Превью в приложении · оригинал остаётся в галерее телефона 📱': 'Preview in app · original stays in phone gallery 📱',
  'Удалить фото': 'Delete photo',
  'Фото на весь экран': 'Full-screen photo',
  'Фото животика': 'Bump photo',
  '↔ Сравнение животика': '↔ Compare bump photos',
  'Первая неделя': 'First week',
  'Вторая неделя': 'Second week',
  'Неделя B': 'Week B',
  'Неделя A': 'Week A',
  'Ползунок сравнения': 'Compare slider',
  'Нужно минимум <b>2 фото</b> в разных неделях — тогда можно сравнить «до и после».': 'You need at least <b>2 photos</b> from different weeks to compare before and after.',
  'Сначала добавь снимки в сетку недель в дневнике.': 'Add photos in the week grid in Journal first.',
  '📷 Добавить фото': '📷 Add photo',
  'Новый препарат': 'New medication',
  'Время, доза и подсказки — как тебе удобно': 'Time, dose, and notes — your way',
  'Название': 'Name',
  'Например: Элевит 2': 'e.g. Prenatal vitamins',
  'Доза': 'Dose',
  '1 табл. / 1 капс.': '1 tab. / 1 cap.',
  'Время приёма': 'Time',
  'Иконка': 'Icon',
  'Подсказка (необязательно)': 'Notes (optional)',
  'Как принимать, с чем запивать...': 'How to take, what to avoid...',
  'Конец курса (необязательно)': 'End date (optional)',
  'Временно на паузе': 'Temporarily paused',
  'Сохранить 💊': 'Save 💊',
  'Удалить препарат': 'Delete medication',
  'Новая вещь': 'New item',
  'Название сохранится в твоём списке': 'Name will be saved to your list',
  'Например: Тапочки резиновые': 'e.g. Washable slippers',
  'Сохранить 👜': 'Save 👜',
  'Удалить': 'Delete',
  '📱 Офлайн — всё работает': '📱 Offline — everything works',
  'Свайп между вкладками': 'Swipe between tabs',
  'Проведи пальцем влево или вправо — так быстрее переключаться между Главной, Заботой и Дневником': 'Swipe left or right to switch between Home, Care, and Journal faster',
  'Проведи пальцем влево или вправо — так быстрее переключаться между Главной, Заботой и Journalом': 'Swipe left or right to switch between Home, Care, and Journal faster',
  'Сжимаем photos…': 'Compressing photo…',
  'Понятно ✨': 'Got it ✨',
  'Сжимаем фото…': 'Compressing photo…',
  'Это займёт пару секунд — так приложение не перегрузит память': 'This takes a few seconds — so the app won\'t overload memory',
  'Наверх': 'Back to top',
  'Сохранено ✨': 'Saved ✨',
  'Тапни для полного экрана': 'Tap for full screen',
};

const JS_STRING_PATCHES = [
  ['ru-RU', 'en-US'],
  ['const SCREENING_DATE=\'2026-03-25\'; // скрининг назначен\n\n', ''],
  ['toast("Дата родов обновлена! ✨")', 'toast("Due date updated! ✨")'],
  ['toast("Ещё одно послание от мужа 💌")', 'toast("Another support message 💌")'],
  ['toast(g===\'g\'?"Это девочка! 🎀 Тема обновлена":"Это мальчик! 🩵 Тема обновлена")', 'toast(g===\'g\'?"It\'s a girl! 🎀 Theme updated":"It\'s a boy! 🩵 Theme updated")'],
  ['const msgs={g:"Записала! 🎀 Тема сменилась на розово-лиловую для нашей принцессы!",b:"Записала! 🩵 Тема сменилась на небесно-голубую для нашего богатыря!",n:"Хорошо, пока тайна! Нейтральная тема 🤍"}',
   'const msgs={g:"Saved! 🎀 Theme switched to pink and lilac!",b:"Saved! 🩵 Theme switched to sky blue!",n:"Still a surprise! Neutral theme 🤍"}'],
  ['document.getElementById(\'sizeT\').textContent=\'Размер: \'+wd.s', 'document.getElementById(\'sizeT\').textContent=\'Size: \'+wd.s'],
  ['document.getElementById(\'cdBadge\').textContent=dL>0?\'До встречи: \'+dL+\' дн.\':\'Скоро! 🎉\'',
   'document.getElementById(\'cdBadge\').textContent=dL>0?\'Until meeting: \'+dL+\' d.\':\'Almost here! 🎉\''],
  ['document.getElementById(\'heroWD\').textContent=\'и \'+dayR+\' дн.\'',
   'document.getElementById(\'heroWD\').textContent=\'& \'+dayR+\' d.\''],
  ['const dl=[\'день\',\'дня\',\'дней\']', 'const dl=[\'day\',\'days\',\'days\']'],
  ['document.getElementById(\'wkDays\').textContent=\'и \'+dayR+\' \'+', 'document.getElementById(\'wkDays\').textContent=\'& \'+dayR+\' \'+'],
  ['const triLabel=tri===1?\'I триместр · 1–13 нед\':tri===2?\'II триместр · 14–27 нед\':\'III триместр · 28–40 нед\'',
   'const triLabel=tri===1?\'I trimester · weeks 1–13\':tri===2?\'II trimester · weeks 14–27\':\'III trimester · weeks 28–40\''],
  ['const tips=[\'Норма: минимум 10 движений за 2 часа активности малыша\',\'Малыш активнее после еды, вечером и ночью\',\'Если менее 10 за 2 часа в дневное время — звони врачу!\',\'Каждый пиночек — это малыш говорит "привет, мама!" 💕\']',
   'const tips=[\'Norm: at least 10 movements in 2 hours of activity\',\'Baby is often more active after meals, in the evening, and at night\',\'Fewer than 10 in 2 hours while awake — call your provider!\',\'Every kick is baby saying hello! 💕\']'],
  ['const fSubs={t1:\'Вопросы 1-го триместра (недели 1-13)\',t2:\'Вопросы 2-го триместра (недели 14-27)\',t3:\'Вопросы 3-го триместра (недели 28-40)\'}',
   'const fSubs={t1:\'First trimester questions (weeks 1–13)\',t2:\'Second trimester questions (weeks 14–27)\',t3:\'Third trimester questions (weeks 28–40)\'}'],
  ['document.getElementById(\'faqSub\').textContent=fSubs[faqK]+\' — неделя \'+week',
   'document.getElementById(\'faqSub\').textContent=fSubs[faqK]+\' — week \'+week'],
  ['const sources=[\'ACOG\',\'ВОЗ\',\'Langman\\\'s Embryology\',\'Sadler 2019\',\'FIGO\']',
   'const sources=[\'ACOG\',\'WHO\',\'Langman\\\'s Embryology\',\'Sadler 2019\',\'FIGO\']'],
  ['${isG?\'Медицинская литература\':sources[curFact%sources.length]}',
   '${isG?\'Medical literature\':sources[curFact%sources.length]}'],
  ['${gv===\'g\'?\'🎀 Для девочки\':\'🩵 Для мальчика\'}',
   '${gv===\'g\'?\'🎀 For a girl\':\'🩵 For a boy\'}'],
  ['const subs={t1:\'1-й триместр: адаптация организма\',t2:\'2-й триместр: расцвет беременности\',t3:\'3-й триместр: финальный этап\'}',
   'const subs={t1:\'First trimester: body adapts\',t2:\'Second trimester: pregnancy glow\',t3:\'Third trimester: final stretch\'}'],
  ['sub=subs[tri]+\' (неделя \'+week+\')\'', 'sub=subs[tri]+\' (week \'+week+\')\''],
  ['if(md===\'03-03\'){document.getElementById(\'annexBanner\').style.display=\'block\';setTimeout(()=>confetti({particleCount:350,spread:130,origin:{y:.5},colors:[\'#FFD700\',\'#E8325A\',\'#C44DFF\',\'#fff\']}),700)}',
   'if(md===\'03-08\'){document.getElementById(\'annexBanner\').style.display=\'block\';setTimeout(()=>confetti({particleCount:350,spread:130,origin:{y:.5},colors:[\'#FFD700\',\'#E8325A\',\'#C44DFF\',\'#fff\']}),700)}'],
  ['toast(\'Твои записи и настройки сохранены ✓\')', 'toast(\'Your entries and settings were preserved ✓\')'],
  ['return \'Файл не выбран\'', 'return \'No file selected\''],
  ['return \'Не удалось открыть фото. Попробуй другое или снимок через «Снять животик»\'',
   'return \'Could not open photo. Try another or use Take bump photo\''],
  ['return \'HEIC не открылся — выбери JPEG/PNG или снимок через «Снять животик»\'',
   'return \'HEIC failed — choose JPEG/PNG or use Take bump photo 📷\''],
  ['return \'Не удалось сжать фото — попробуй ещё раз или выбери другое\'',
   'return \'Could not compress photo — try again or choose another\''],
  ['Для Индиры', 'Caring Diary'],
  ['«Для Индиры»', 'Caring Diary'],
  ['Дневник — Для Индиры', 'Journal — Caring Diary'],
  ['Отчёт для врача — Для Индиры', 'Provider Report — Caring Diary'],
  ['Моя неделя — Для Индиры', 'My week — Caring Diary'],
  [' · Для Индиры', ' · Caring Diary'],
  ['ДНЕВНИК БЕРЕМЕННОСТИ — Для Индиры', 'PREGNANCY JOURNAL — Caring Diary'],
  ['ОТЧЁТ ДЛЯ ВРАЧА — Для Индиры', 'PROVIDER REPORT — Caring Diary'],
  ['Сформировано приложением «Для Индиры»', 'Generated by Caring Diary app'],
  ['Дневник беременности', 'Pregnancy journal'],
  ["showImgCompressOverlay('Сжимаем фото…')", "showImgCompressOverlay('Compressing photo…')"],
  ["showImgCompressOverlay('Сжимаем фото УЗИ…')", "showImgCompressOverlay('Compressing ultrasound…')"],
  ["a.download='dlya-indiry-backup-'", "a.download='caring-diary-backup-'"],
  ["a.download='otchet-vrach-'", "a.download='provider-report-'"],
];

const SCRUB = [
  /Эмир/gi, /Индир[аы]?/gi, /жаным/gi, /алтыным/gi, /жанымка/gi,
  /Бишкек/gi, /Чок[аи]/gi, /Ёжик/gi, /пердушк/gi, /бусинк/gi,
  /25 марта/gi, /25 мар/gi, /Tatar/gi, /татар/gi, /сынок/gi, /богатыр/gi,
];

const EXTRA_PATCHES = require('./v18-extra-patches');
const JS_BLOCKS = require('./v18-en-js-blocks');

function stripCyrillicFromComments(html) {
  return html
    .replace(/\/\*[\s\S]*?\*\//g, (c) => (/[\u0400-\u04FF]/.test(c) ? c.replace(/[\u0400-\u04FF]/g, '') : c))
    .replace(/<!--[\s\S]*?-->/g, (c) => (/[\u0400-\u04FF]/.test(c) ? '' : c))
    .replace(/^\/\/[^\n]*[\u0400-\u04FF][^\n]*/gm, (line) => line.replace(/[\u0400-\u04FF]/g, ''));
}

function countUserCyrillic(html) {
  let h = html.replace(/function migratePortfolioEn\(\)[\s\S]*?localStorage\.setItem\('portfolioEnV2','1'\);\s*\}/, '');
  h = h.replace(/\\u[0-9a-fA-F]{4}/g, '');
  h = h.replace(/\/\*[\s\S]*?\*\//g, '').replace(/<!--[\s\S]*?-->/g, '');
  const m = h.match(/[\u0400-\u04FF]/g);
  return m ? m.length : 0;
}

function reportRemainingRu(html) {
  const re = /(['"`])([^\1]*[\u0400-\u04FF][^\1]*)\1/g;
  const found = new Set();
  let m;
  while ((m = re.exec(html))) found.add(m[2].slice(0, 120));
  return [...found].sort((a, b) => b.length - a.length).slice(0, 40);
}
function cleanupMangledComments(html) {
  const fixes = [
    ['/* ══ SOFT PALETTE OVERRIDE — , ,  ══ */', '/* SOFT PALETTE OVERRIDE — warm, soft theme */'],
    ['  /*   — ,  */', '  /* warmer accent tones */'],
    ['// ══ IMAGE COMPRESSION (Canvas —   FileReader/base64  ) ══', '// IMAGE COMPRESSION (Canvas — lightweight preview pipeline)'],
    ['//   npm: npm install browser-image-compression', '// optional npm: browser-image-compression'],
    ['// ══ PHOTO STORAGE (IndexedDB —  localStorage,   ) ══', '// PHOTO STORAGE (IndexedDB — not localStorage)'],
    ['// : ACOG, , Moore', '// Sources: ACOG, WHO, Moore'],
    ['// FAQ — ,', '// FAQ — by trimester'],
    ['// DEFAULT MEDS (seed —   localStorage   )', '// DEFAULT MEDS (seed — copied to localStorage on first run)'],
    ['// .     ( )', '// Gender-specific supplemental facts'],
    ['// ══ BMI & WHO WEIGHT CORRIDOR ══\n//      (2022 update)', '// BMI & WHO WEIGHT CORRIDOR (2022 guidance)'],
    ['// ══ SWIPE GESTURE —    ══', '// SWIPE GESTURE — tab navigation'],
    ['//   Подпись под кнопкой', '// Label under take button'],
    ['// Label under button', '// Label under take button'],
    ['/*  —  - ♀️ */', '/* Girl theme — pink palette */'],
    ['/*  — -    ♂️ */', '/* Boy theme — blue palette */'],
  ];
  let out = html;
  for (const [from, to] of fixes) out = out.split(from).join(to);
  return out;
}

function jsMigrateKey(s) {
  let out = '"';
  for (const ch of s) {
    const code = ch.charCodeAt(0);
    if (code >= 0x0400 && code <= 0x04ff) out += '\\u' + code.toString(16).padStart(4, '0');
    else if (ch === '"') out += '\\"';
    else if (ch === '\\') out += '\\\\';
    else if (ch === '\n') out += '\\n';
    else out += ch;
  }
  return out + '"';
}

function serializeMigrateMap(map) {
  return (
    '{' +
    Object.entries(map)
      .map(([k, v]) => `${jsMigrateKey(k)}:${jsMigrateKey(v)}`)
      .join(',') +
    '}'
  );
}

function buildPortfolioMigrate(ui) {
  const map = {};
  for (const k of Object.keys(ui.ru)) {
    const ru = ui.ru[k];
    const en = ui.en[k];
    if (ru && en && ru !== en && /[\u0400-\u04FF]/.test(ru) && !/[\u0400-\u04FF]/.test(en)) map[ru] = en;
  }
  Object.assign(map, {
    'УЗИ 2 триместра (20 нед.)': '2nd trimester ultrasound (20 wk.)',
    'Глюкозный тест (24 нед.)': 'Glucose test (24 wk.)',
    'Консультация 3 триместра': '3rd trimester visit',
    'УЗИ перед родами (36 нед.)': 'Pre-birth ultrasound (36 wk.)',
    'Скрининг 25 марта': 'Anatomy scan',
    'Скрининг, УЗИ…': 'Screening, ultrasound…',
    'Элевит 2': 'Prenatal Vitamins',
    'Железо': 'Iron Supplementation',
    'Омега-3 DHA': 'Omega-3 DHA',
    'Обсуди с врачом на следующем приёме': 'Discuss with your provider at your next visit',
    '2-й триместр: расцвет беременности': 'Second trimester: pregnancy glow',
    '1-й триместр: адаптация организма': 'First trimester: body adapts',
    '3-й триместр: финальный этап': 'Third trimester: final stretch',
    'Это девочка! 🎀 Тема обновлена': "It's a girl! 🎀 Theme updated",
    'Это мальчик! 🩵 Тема обновлена': "It's a boy! 🩵 Theme updated",
    'Рост сохранён для расчёта ИМТ!': 'Height saved for BMI calculation!',
    '👩‍⚕️ Для мамы (после родов)': '👩‍⚕️ For mom (postpartum)',
    'Укажи рост от 140 до 210 см': 'Enter height between 140 and 210 cm',
    '─── ПРЕПАРАТЫ СЕГОДНЯ ───': '─── MEDICATIONS TODAY ───',
    'Сначала укажи дату родов!': 'Enter your due date first!',
    '📊 Показать коридор ВОЗ': '📊 Show WHO range',
    '👩 Для мамы (в родзал)': '👩 For mom (labor)',
    'Норма (ИМТ 18.5–24.9)': 'Normal (BMI 18.5–24.9)',
    'Избыток (ИМТ 25–29.9)': 'Overweight (BMI 25–29.9)',
    '📊 Скрыть коридор ВОЗ': '📊 Hide WHO range',
    'Недовес (ИМТ <18.5)': 'Underweight (BMI <18.5)',
    'Ожирение (ИМТ ≥30)': 'Obese (BMI ≥30)',
    ' (норма ≥10 за 2ч)': ' (norm ≥10 in 2h)',
    'В норме по ВОЗ 🤍': 'Within WHO range 🤍',
    '─── НА ПАУЗЕ ───': '─── PAUSED ───',
    'Скопировано! 📋': 'Copied! 📋',
    'Сумка в роддом': 'Hospital bag',
    'Расписание на ': 'Schedule for ',
    'Не определён': 'Not set',
    'Пол малыша: ': 'Fetal sex: ',
    'дней заботы': 'days of care',
    'Шевеления': 'Baby kicks',
    ' (неделя ': ' (week ',
    ' · через ': ' · in ',
    'День 🌤️': 'Day 🌤️',
    'Вечер 🌆': 'Evening 🌆',
    '(выпито)': '(taken)',
    'малышка': 'baby',
  });
  return `function migratePortfolioEn(){
  if(localStorage.getItem('portfolioEnV2')==='1')return;
  const M=${serializeMigrateMap(map)};
  try{
    const appts=loadAppts();
    let ch=false;
    appts.forEach(a=>{if(M[a.title]){a.title=M[a.title];ch=true;}});
    if(ch)saveAppts(appts);
  }catch(e){}
  try{
    const raw=localStorage.getItem('bagList'+V);
    if(raw){
      const bag=JSON.parse(raw);
      if(Array.isArray(bag)){
        let ch=false;
        bag.forEach(it=>{if(it.t&&M[it.t]){it.t=M[it.t];ch=true;}});
        if(ch)localStorage.setItem('bagList'+V,JSON.stringify(bag));
      }
    }
  }catch(e){}
  try{
    const raw=localStorage.getItem('medReg'+V);
    if(raw){
      const arr=JSON.parse(raw);
      if(Array.isArray(arr)){
        let ch=false;
        arr.forEach(m=>{
          if(m.name&&M[m.name]){m.name=M[m.name];ch=true;}
          if(m.dose&&M[m.dose]){m.dose=M[m.dose];ch=true;}
        });
        if(ch)localStorage.setItem('medReg'+V,JSON.stringify(arr));
      }
    }
  }catch(e){}
  localStorage.setItem('portfolioEnV2','1');
}`;
}

function applyPostBuildAssets(root) {
  const swPath = path.join(root, 'sw.js');
  let sw = fs.readFileSync(swPath, 'utf8');
  sw = sw.replace(/care-diary-portfolio-v\d+/g, 'care-diary-portfolio-v3');
  fs.writeFileSync(swPath, sw, 'utf8');
}

function fixJsStringLiterals(html) {
  return html
    .replace(/innerHTML='Today · <b>don't miss it!<\/b>'/g, "innerHTML='Today · <b>do not miss it!</b>'")
    .replace(/you'll love reading this later/g, 'you will love reading this later')
    .replace(/we'll remind you on Home/g, 'we will remind you on Home')
    .replace(/I'll track trends/g, 'I will track trends');
}

function applyI18nToScript(script, map) {
  let out = script;
  for (const [from, to] of map) {
    if (!from || !out.includes(from)) continue;
    const safeTo = to.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    out = out.split(from).join(safeTo);
  }
  return out;
}

function applyReplacements(html, map) {
  let out = html;
  for (const [from, to] of map) {
    if (from && out.includes(from)) out = out.split(from).join(to);
  }
  return out;
}

function main() {
  if (!fs.existsSync(SRC)) {
    console.error('Missing _vercel_source.html — download from Vercel first.');
    process.exit(1);
  }

  let html = fs.readFileSync(SRC, 'utf8');

  const en = evalInContext('js/app-content.js', 'APP_CONTENT.en');
  const ui = evalInContext('js/ui-i18n.js', 'UI_I18N');
  const wkDataEn = evalInContext('js/week-data-en.js', 'wkDataEn');
  const faqsEn = evalInContext('js/clinical-content.js', 'faqsEn');
  const getSmartTipsEnSrc = evalInContext('js/clinical-content.js', 'getSmartTipsEn.toString()').replace('function getSmartTipsEn', 'function getSmartTips');
  const genderMsgsEn = evalInContext('js/clinical-content.js', 'genderMsgsEn');
  const genderFactsEn = evalInContext('js/clinical-content.js', 'genderFactsEn');
  const bodyChangesEn = evalInContext('js/clinical-content.js', 'bodyChangesEn');
  const fetusCompareEn = evalInContext('js/clinical-content.js', 'fetusCompareEn');
  const defaultBagEn = buildDefaultBagEn(ui);

  // Head / meta
  html = html.replace(/<html lang="ru">/, '<html lang="en">');
  html = html.replace(/<title>[^<]*<\/title>/, `<title>Caring Diary 🤍</title>`);
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    '<meta name="description" content="Your pregnancy companion — daily trackers, evidence-based facts, and gentle support">',
  );
  html = html.replace(
    /<meta name="apple-mobile-web-app-title" content="[^"]*">/,
    '<meta name="apple-mobile-web-app-title" content="Care Diary">',
  );
  html = html.replace(
    '</head>',
    `<link rel="canonical" href="https://r1m1r.github.io/Caring-Diary/">
<meta property="og:title" content="Caring Diary 🤍">
<meta property="og:description" content="Pregnancy PWA — trackers, weekly facts, medications, journal, hospital bag">
<meta property="og:type" content="website">
<meta property="og:url" content="https://r1m1r.github.io/Caring-Diary/">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="Caring Diary 🤍">
<meta name="twitter:description" content="English-first pregnancy companion PWA — portfolio demo">
</head>`,
  );

  // JS content blocks
  html = replaceConst(html, 'petNames', `const petNames=${JSON.stringify(en.petNames)};\n`);
  html = replaceConst(html, 'heroG', serializeHeroG(en.heroG));
  html = replaceConst(html, 'timeMsgs', `const timeMsgs=${JSON.stringify(en.timeMsgs, null, 2)};\n`);
  html = replaceConst(html, 'babyMsgs', `const babyMsgs=${JSON.stringify(en.babyMsgs, null, 2)};\n`);
  html = replaceConst(html, 'quotes', `const quotes=${JSON.stringify(en.quotes, null, 2)};\n`);
  html = replaceConst(html, 'letters', `const letters=${JSON.stringify(en.letters, null, 2)};\n`);
  html = replaceConst(html, 'coupons', `const coupons=${JSON.stringify(en.coupons, null, 2)};\n`);
  html = replaceConst(html, 'wkData', `const wkData=${JSON.stringify(wkDataEn, null, 2)};\n`);
  html = replaceConst(html, 'bodyChanges', `const bodyChanges=${JSON.stringify(bodyChangesEn, null, 2)};\n`);
  html = replaceConst(html, 'weekBodyChanges', 'const weekBodyChanges={};\n');
  html = html.replace(
    /\/\/ SMART TIPS[\s\S]*?\/\/ FAQ —/,
    `// SMART TIPS — evidence-based weekly guidance\n${getSmartTipsEnSrc};\n\n// FAQ —`,
  );
  html = replaceConst(html, 'faqs', `const faqs=${JSON.stringify(faqsEn, null, 2)};\n`);
  html = replaceConst(html, 'defaultBag', `const defaultBag=${JSON.stringify(defaultBagEn, null, 2)};\n`);
  html = replaceConst(html, 'moodR', `const moodR=${JSON.stringify(en.moodR, null, 2)};\n`);
  html = replaceConst(html, 'DEFAULT_MEDS', `const DEFAULT_MEDS=${JSON.stringify(en.DEFAULT_MEDS, null, 2)};\n`);
  html = replaceConst(html, 'careTips', `const careTips=${JSON.stringify(en.careTips, null, 2)};\n`);
  html = replaceConst(html, 'genderMsgs', `const genderMsgs=${JSON.stringify(genderMsgsEn, null, 2)};\n`);
  html = replaceConst(html, 'genderFacts', `const genderFacts=${JSON.stringify(genderFactsEn, null, 2)};\n`);
  html = replaceConst(html, 'fetusCompare', `const fetusCompare=${JSON.stringify(fetusCompareEn, null, 2)};\n`);

  // Capitalization helpers
  const capHelpers = `
function capitalizeFirst(s){if(!s||typeof s!=='string')return s;return s.charAt(0).toUpperCase()+s.slice(1);}
function capitalizeSentences(s){if(!s||typeof s!=='string')return s;return s.replace(/(^|[.!?]\\s+)([a-z])/g,(m,p,c)=>p+c.toUpperCase());}
`;
  html = html.replace('<script>\nconst V="_v16";', `<script>\n${capHelpers}\nconst V="_v16";`);

  // Hero title capitalization
  html = html.replace(
    "document.getElementById('heroTitle').textContent=gArr[Math.floor(Date.now()/86400000)%gArr.length](n);",
    "document.getElementById('heroTitle').textContent=capitalizeSentences(gArr[Math.floor(Date.now()/86400000)%gArr.length](n));",
  );
  html = html.replace(
    "document.getElementById('tmText').textContent=s.msgs[tmIdx[p]%s.msgs.length];",
    "document.getElementById('tmText').textContent=capitalizeSentences(s.msgs[tmIdx[p]%s.msgs.length]);",
  );
  html = html.replace(
    "document.getElementById('qTxt').textContent=quotes[window._qIdx];",
    "document.getElementById('qTxt').textContent=capitalizeSentences(quotes[window._qIdx]);",
  );

  // HTML string patches (body + modals — skip main app script bundle)
  const mainScriptStart = html.indexOf('function capitalizeFirst(s)');
  const mainScriptTag = html.lastIndexOf('<script>', mainScriptStart);
  const htmlPart = html.slice(0, mainScriptTag);
  const scriptPart = html.slice(mainScriptTag);
  let newHtmlPart = applyReplacements(htmlPart, Object.entries(V18_HTML).sort((a, b) => b[0].length - a[0].length));
  html = newHtmlPart + scriptPart;

  for (const [from, to] of JS_STRING_PATCHES) {
    html = html.split(from).join(to);
  }

  for (const [from, to] of JS_BLOCKS) {
    if (html.includes(from)) html = html.split(from).join(to);
  }

  for (const [from, to] of EXTRA_PATCHES) {
    if (from && html.includes(from)) html = html.split(from).join(to);
  }

  const i18nMap = buildI18nMap();
  const scriptAnchor = html.indexOf('function capitalizeFirst(s)');
  const scriptTag = html.lastIndexOf('<script>', scriptAnchor);
  html = applyReplacements(html.slice(0, scriptTag), i18nMap) + applyI18nToScript(html.slice(scriptTag), i18nMap);

  // Fix gender toast if i18n left unescaped apostrophes in single-quoted ternary
  html = html.replace(
    /toast\(g==='g'\?'It's a girl! 🎀 Theme updated':'It's a boy! 🩵 Theme updated'\)/g,
    'toast(g===\'g\'?"It\'s a girl! 🎀 Theme updated":"It\'s a boy! 🩵 Theme updated")',
  );

  for (const re of SCRUB) {
    html = html.replace(re, '');
  }

  html = stripCyrillicFromComments(html);
  html = cleanupMangledComments(html);
  html = fixJsStringLiterals(html);

  for (const [from, to] of EXTRA_PATCHES) {
    if (from && html.includes(from)) html = html.split(from).join(to);
  }

  html = html.replace(/\u0412\u0441\u0435\u0433\u043e completed days:/g, 'Total completed days:');

  html = html.replace(
    /  const daysSc=Math\.ceil\(\(new Date\(SCREENING_DATE\+'T12:00:00'\)-new Date\(\)\)\/86400000\);\s*if\(daysSc>=-1&&daysSc<=14\)\{\s*candidates\.push\(\{date:SCREENING_DATE,title:'[^']*',ico:'🔬',days:daysSc\}\);\s*\}\s*/g,
    '',
  );
  html = html.replace(
    /const appts=\[\{id:Date\.now\(\),date:SCREENING_DATE,title:'[^']*',done:false\}\];/,
    'const appts=[];',
  );

  // Clean stale personal comments
  html = html.replace(/\/\/ HERO GREETINGS —[^\n]*\n/, '// HERO GREETINGS — warm daily titles\n');
  html = html.replace(/\/\/ TIME MESSAGES —[^\n]*\n/, '// TIME MESSAGES — supportive daily messages\n');
  html = html.replace(/\/\/ BABY MESSAGES —[^\n]*\n/, '// BABY MESSAGES — from baby\n');
  html = html.replace(/\/\/ BAG —[^\n]*\n/, '// BAG — hospital checklist\n');
  html = html.replace(/\/\/ CARE TIPS —[^\n]*\n/, '// CARE TIPS — time-of-day self-care\n');

  // stip-txt word break fix
  html = html.replace(
    /\.stip-txt\{[^}]+\}/,
    '.stip-txt{font-size:12px;font-weight:700;color:var(--t2);line-height:1.55;word-break:normal;overflow-wrap:break-word;hyphens:none}',
  );

  const migrateFn = buildPortfolioMigrate(ui);
  html = html.replace('function init(){', `${migrateFn}\nfunction init(){`);
  html = html.replace(
    'const migrated=migrateLegacyStorage();',
    'migratePortfolioEn();\n  const migrated=migrateLegacyStorage();',
  );
  html = html.replace(
    "if(md==='03-08'){document.getElementById('annexBanner').style.display='block';setTimeout(()=>confetti({particleCount:350,spread:130,origin:{y:.5},colors:['#FFD700','#E8325A','#C44DFF','#fff']}),700)}",
    "if(md==='03-08'){const b=document.getElementById('annexBanner');b.style.display='block';const bt=b.querySelectorAll('div');if(bt[1])bt[1].textContent=\"Happy International Women's Day!\";if(bt[2])bt[2].textContent='You are amazing — take care of yourself and your baby 💐';setTimeout(()=>confetti({particleCount:350,spread:130,origin:{y:.5},colors:['#FFD700','#E8325A','#C44DFF','#fff']}),700)}",
  );

  html = html.replace(/\bfunction dtRu\(/g, 'function fmtShortDate(');
  html = html.replace(/\bdtRu\(/g, 'fmtShortDate(');

  const cyrLeft = countUserCyrillic(html);
  if (cyrLeft > 0) {
    console.warn(`Warning: ${cyrLeft} Cyrillic chars remain in user-visible output`);
    reportRemainingRu(html).slice(0, 15).forEach((s) => console.warn('  ·', s));
  }

  fs.writeFileSync(OUT, html, 'utf8');
  applyPostBuildAssets(ROOT);
  const lines = html.split('\n').length;
  const sizeKb = (Buffer.byteLength(html) / 1024).toFixed(0);
  console.log(`Wrote ${OUT} (${lines} lines, ${sizeKb} KB)`);
}

main();
