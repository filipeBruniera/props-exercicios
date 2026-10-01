// Prints do brand book em várias posições de rolagem (desktop e mobile).
// Uso: node brand/scripts/shots.mjs <pasta-de-saida>
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
const out = process.argv[2]; mkdirSync(out, { recursive: true });
const url = 'file://' + new URL('../site/index.html', import.meta.url).pathname;
const b = await chromium.launch();
for (const [w, h, tag] of [[1440, 900, 'desk'], [390, 844, 'mob']]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto(url); await p.waitForTimeout(3500);
  const ids = ['topo', 'manifesto', 'marca', 'etiqueta', 'cor', 'tipo', 'mascote', 'componentes', 'produto', 'numeros', 'jornada', 'comunicacao', 'movimento', 'comparativo', 'cta'];
  for (const [i, id] of ids.entries()) {
    const y = await p.evaluate((id) => { const el = document.getElementById(id); return el.getBoundingClientRect().top + window.scrollY; }, id);
    await p.evaluate((y) => window.scrollTo(0, y), y + (['manifesto', 'marca', 'etiqueta', 'jornada', 'comunicacao'].includes(id) ? h * 0.9 : 0));
    await p.waitForTimeout(900);
    await p.screenshot({ path: `${out}/${tag}-${String(i).padStart(2, '0')}-${id}.png` });
  }
  const ov = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  console.log(tag, 'overflowX', ov, 'errors', errs.slice(0, 5));
  await p.close();
}
await b.close();
