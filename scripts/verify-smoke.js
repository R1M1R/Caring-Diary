/**
 * Smoke checks for Caring Diary static modules (no browser required).
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const errors = [];
const ok = [];

function check(name, fn) {
  try {
    fn();
    ok.push(name);
  } catch (e) {
    errors.push(`${name}: ${e.message}`);
  }
}

const jsFiles = [
  'js/app-core.js',
  'js/ui-i18n.js',
  'js/week-data-en.js',
  'js/app-content.js',
  'js/i18n.js',
  'js/smart-tips-ru.js',
  'js/body-changes-ru.js',
  'js/clinical-content.js',
  'sw.js',
];

jsFiles.forEach((f) => {
  check(`syntax ${f}`, () => {
    const code = fs.readFileSync(path.join(root, f), 'utf8');
    new vm.Script(code, { filename: f });
  });
});

check('sw assets exist', () => {
  const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
  const m = sw.match(/const ASSETS = \[([\s\S]*?)\];/);
  if (!m) throw new Error('ASSETS not found');
  const assets = [...m[1].matchAll(/'\.\/([^']+)'/g)].map((x) => x[1]);
  assets.forEach((rel) => {
    const fp = path.join(root, rel === '' ? 'index.html' : rel);
    if (!fs.existsSync(fp)) throw new Error(`missing ${rel || './'}`);
  });
});

const store = {};
const sandbox = {
  console,
  localStorage: {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
    clear: () => { Object.keys(store).forEach((k) => delete store[k]); },
  },
  document: {
    documentElement: { lang: 'ru', classList: { add() {}, remove() {}, toggle() {} } },
    title: '',
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
  },
  window: {},
  navigator: { vibrate: () => {} },
  Intl,
  Date,
  Math,
  JSON,
  setInterval: () => 0,
  clearInterval: () => {},
  setTimeout: () => 0,
  clearTimeout: () => {},
  refreshLocaleUI: () => {},
  toast: () => {},
  H: () => {},
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;

const ctx = vm.createContext(sandbox);
const load = (f) => vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });

jsFiles.filter((f) => f.startsWith('js/')).forEach(load);

function exp(name) {
  return vm.runInContext(`typeof ${name} !== 'undefined' ? ${name} : undefined`, ctx);
}

const AppI18n = exp('AppI18n');
const UI_I18N = exp('UI_I18N');
const getSmartTipsRu = exp('getSmartTipsRu');
const getLocalizedSmartTips = exp('getLocalizedSmartTips');
const getWeekBodyChangesRu = exp('getWeekBodyChangesRu');
const getWeekData = exp('getWeekData');

check('RU smart tips weeks 1-40', () => {
  for (let w = 1; w <= 40; w++) {
    const tips = getSmartTipsRu(w);
    if (!Array.isArray(tips)) throw new Error(`week ${w} not array`);
  }
});

check('EN smart tips weeks 1-40', () => {
  AppI18n._locale = 'en';
  for (let w = 1; w <= 40; w++) {
    const tips = getLocalizedSmartTips(w);
    if (!Array.isArray(tips)) throw new Error(`week ${w} not array`);
    if (w >= 4 && !tips.length) throw new Error(`week ${w} empty EN tips`);
  }
});

check('RU body changes 16-40', () => {
  const map = getWeekBodyChangesRu();
  for (let w = 16; w <= 40; w++) {
    if (!map[w]?.items?.length) throw new Error(`week ${w} missing`);
  }
});

check('EN week data 1-40', () => {
  AppI18n._locale = 'en';
  const data = getWeekData();
  for (let w = 1; w <= 40; w++) {
    if (!data[w]?.f?.length) throw new Error(`week ${w} missing EN facts`);
  }
});

check('UI i18n key parity', () => {
  const ru = Object.keys(UI_I18N.ru);
  const en = Object.keys(UI_I18N.en);
  const missingEn = ru.filter((k) => !en.includes(k));
  const missingRu = en.filter((k) => !ru.includes(k));
  if (missingEn.length) throw new Error(`EN missing: ${missingEn.slice(0, 5).join(', ')} (${missingEn.length})`);
  if (missingRu.length) throw new Error(`RU missing: ${missingRu.slice(0, 5).join(', ')} (${missingRu.length})`);
});

check('AppI18n applyDom ids defined in HTML', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const i18n = fs.readFileSync(path.join(root, 'js/i18n.js'), 'utf8');
  const ids = [...i18n.matchAll(/^\s+(\w+): '/gm)].map((m) => m[1]);
  const byIdBlock = i18n.slice(i18n.indexOf('const byId ='), i18n.indexOf('const phById'));
  const byIdIds = [...byIdBlock.matchAll(/^\s+(\w+):/gm)].map((m) => m[1]);
  const phBlock = i18n.slice(i18n.indexOf('const phById'), i18n.indexOf('const langRu'));
  const phIds = [...phBlock.matchAll(/^\s+(\w+):/gm)].map((m) => m[1]);
  [...byIdIds, ...phIds].forEach((id) => {
    if (!html.includes(`id="${id}"`)) throw new Error(`HTML missing id="${id}"`);
  });
});

console.log(JSON.stringify({ passed: ok.length, failed: errors.length, errors }, null, 2));
process.exit(errors.length ? 1 : 0);
