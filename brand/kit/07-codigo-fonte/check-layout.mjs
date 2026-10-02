// Verificação de layout do brand book: rola a página inteira devagar (dispara todas as animações)
// e procura blocos sobrepostos, transforms presos e boca vazia no mascote.
// Uso: node brand/scripts/check-layout.mjs [largura] [altura]
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
const [w = 1557, h = 884] = process.argv.slice(2).map(Number);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: w, height: h } });
const errs = []; p.on('pageerror', (e) => errs.push(e.message));
await p.goto(new URL('../site/index.html', import.meta.url).href); await p.waitForTimeout(2500);
const max = await p.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < max; y += 300) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(40); }
await p.waitForTimeout(1500);
const r = await p.evaluate(() => {
  const SEL = '.sw, .pair, .rule, .ver, .clear, .dont, .fam, .play, .pose, .cp, .kpi, .panel, .phones figure, .num, .jr-step, .mv, .vs > div, .anat li, .build li, .dodont > div, .float-card, .scale .row, .foot > div';
  const els = [...document.querySelectorAll(SEL)].filter((e) => !e.closest('#comunicacao'));
  const over = [];
  for (let i = 0; i < els.length; i++) for (let j = i + 1; j < els.length; j++) {
    const a = els[i], c = els[j];
    if (a.contains(c) || c.contains(a)) continue;
    if (a.classList.contains('float-card') || c.classList.contains('float-card')) continue;
    const A = a.getBoundingClientRect(), C = c.getBoundingClientRect();
    const ox = Math.min(A.right, C.right) - Math.max(A.left, C.left), oy = Math.min(A.bottom, C.bottom) - Math.max(A.top, C.top);
    if (ox > 4 && oy > 4) over.push(a.className + ' x ' + c.className + ' (' + Math.round(ox) + 'x' + Math.round(oy) + ')');
  }
  const stuck = [...document.querySelectorAll('main *')].filter((e) => { const t = e.style.transform; return t && /translate\(0px, [1-9]/.test(t) && !e.closest('.mola') && !e.closest('#hs'); }).map((e) => e.className + ' ' + e.style.transform).slice(0, 10);
  const hidden = [...document.querySelectorAll(SEL)].filter((e) => getComputedStyle(e).visibility === 'hidden' || +getComputedStyle(e).opacity < .5).map((e) => e.className).slice(0, 10);
  const mouths = [...document.querySelectorAll('.ml-face > path:nth-of-type(3)')].filter((m) => m.getAttribute('stroke') !== '#002B63').length;
  const ovx = document.documentElement.scrollWidth > innerWidth + 1;
  return { over: over.slice(0, 15), overCount: over.length, stuck, hidden, mouthsSemTraco: mouths, overflowX: ovx };
});
console.log(w + 'x' + h, JSON.stringify(r, null, 1), 'errors:', errs);
await b.close();
