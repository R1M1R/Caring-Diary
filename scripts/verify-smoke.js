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

const indexPath = path.join(root, 'index.html');
const index = fs.readFileSync(indexPath, 'utf8');

check('index.html exists and is monolith', () => {
  if (index.length < 300000) throw new Error('index.html too small — expected v18 monolith');
  if (index.includes('js/app-core.js')) throw new Error('modular shell detected');
  if (!index.includes('const V="_v16"')) throw new Error('missing v18 app bundle marker');
});

check('no cyrillic in user strings', () => {
  const stripped = index.replace(/\/\*[\s\S]*?\*\//g, '').replace(/<!--[\s\S]*?-->/g, '');
  const cyr = stripped.match(/[\u0400-\u04FF]/g);
  if (cyr && cyr.length > 0) throw new Error(`${cyr.length} Cyrillic chars remain outside comments`);
});

check('English portfolio branding', () => {
  if (!index.includes('<html lang="en">')) throw new Error('lang not en');
  if (!index.includes('Caring Diary')) throw new Error('title missing');
  if (index.includes('Для Индиры')) throw new Error('personal title remains');
  if (index.includes('Эмир')) throw new Error('personal name remains');
});

check('v18 dashboard features', () => {
  const required = ['today-dash', 'kickCard', 'contr-card', 'visitPrepCard', 'weekWellness', 'backup-btn'];
  required.forEach((id) => {
    if (!index.includes(id)) throw new Error(`missing ${id}`);
  });
});

check('EN content blocks', () => {
  if (!index.includes('"Dear one"')) throw new Error('EN petNames missing');
  if (!index.includes('function getSmartTips(w)')) throw new Error('getSmartTips missing');
  if (index.includes('SCREENING_DATE')) throw new Error('SCREENING_DATE still referenced');
});

check('syntax index.html inline script', () => {
  const start = index.indexOf('function capitalizeFirst(s)');
  const end = index.lastIndexOf('</script>');
  if (start < 0 || end < 0) throw new Error('script bounds');
  const script = index.slice(start, end);
  new vm.Script(script, { filename: 'index.html' });
});

['sw.js'].forEach((f) => {
  check(`syntax ${f}`, () => {
    new vm.Script(fs.readFileSync(path.join(root, f), 'utf8'), { filename: f });
  });
});

check('manifest english', () => {
  const m = JSON.parse(fs.readFileSync(path.join(root, 'manifest.webmanifest'), 'utf8'));
  if (m.lang !== 'en') throw new Error('manifest lang');
  if (!/Caring Diary/i.test(m.name)) throw new Error('manifest name');
});

check('service worker cache version', () => {
  const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
  if (!sw.includes('care-diary-portfolio-v3')) throw new Error('SW cache name');
});

console.log(JSON.stringify({ passed: ok.length, failed: errors.length, errors }, null, 2));
process.exit(errors.length ? 1 : 0);
