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
  'js/app-core.js', 'js/ui-i18n.js', 'js/week-data-en.js', 'js/app-content.js',
  'js/i18n.js', 'js/clinical-content.js', 'sw.js',
];

jsFiles.forEach((f) => {
  check(`syntax ${f}`, () => {
    new vm.Script(fs.readFileSync(path.join(root, f), 'utf8'), { filename: f });
  });
});

const store = {};
const sandbox = {
  console,
  localStorage: {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
  },
  document: {
    documentElement: { lang: 'en', classList: { add() {}, remove() {}, toggle() {} } },
    title: '', querySelector: () => null, querySelectorAll: () => [],
    getElementById: () => null,
  },
  window: {}, navigator: { vibrate: () => {} }, Intl, Date, Math, JSON,
  setInterval: () => 0, clearInterval: () => {}, setTimeout: () => 0, clearTimeout: () => {},
  refreshLocaleUI: () => {}, toast: () => {}, H: () => {},
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
const ctx = vm.createContext(sandbox);
jsFiles.filter((f) => f.startsWith('js/')).forEach((f) => {
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
});
const exp = (n) => vm.runInContext(`typeof ${n} !== 'undefined' ? ${n} : undefined`, ctx);

check('default locale EN', () => {
  if (exp('AppI18n')._locale !== 'en') throw new Error('expected en default');
});

check('EN week data 1-40', () => {
  const data = exp('getWeekData')();
  for (let w = 1; w <= 40; w++) {
    if (!data[w]?.f?.length) throw new Error(`week ${w}`);
  }
});

check('i18n key parity', () => {
  const UI = exp('UI_I18N');
  const ru = Object.keys(UI.ru);
  const en = Object.keys(UI.en);
  if (ru.length !== en.length) throw new Error(`${ru.length} vs ${en.length}`);
});

console.log(JSON.stringify({ passed: ok.length, failed: errors.length, errors }, null, 2));
process.exit(errors.length ? 1 : 0);
