#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const start = html.indexOf('function capitalizeFirst');
const js = html.slice(start);

const re = /(['"`])((?:\\.|(?!\1)[^\\])*[\u0400-\u04FF](?:\\.|(?!\1)[^\\])*)\1/g;
const found = new Set();
let m;
while ((m = re.exec(js))) found.add(m[2]);

const ui = vm.runInNewContext(`${fs.readFileSync(path.join(root, 'js/ui-i18n.js'), 'utf8')}; UI_I18N;`, {});
const matched = [];
const unmatched = [];
for (const s of [...found].sort((a, b) => b.length - a.length)) {
  let hit = null;
  for (const k of Object.keys(ui.ru)) {
    if (ui.ru[k] === s) {
      hit = ui.en[k];
      break;
    }
  }
  if (hit && hit !== s) matched.push({ ru: s, en: hit });
  else unmatched.push(s);
}

const out = { total: found.size, matched: matched.length, unmatched: unmatched.length, pairs: matched, unmatched };
fs.writeFileSync(path.join(__dirname, '_ru-unmatched.json'), JSON.stringify(out, null, 2), 'utf8');
console.log(`total ${out.total} matched ${out.matched} unmatched ${out.unmatched}`);
