// Gera public/og.png (1200x630) e public/logo.png (512x512) na identidade da marca.
// Uso: npm run build && node scripts/make-images.mjs  (requer Playwright com Chromium)
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const font = (f) => readFileSync(new URL(`../node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-${f}-normal.woff2`, import.meta.url)).toString('base64');
const css = `@font-face{font-family:BC;font-weight:800;src:url(data:font/woff2;base64,${font(800)})}
@font-face{font-family:BC;font-weight:700;src:url(data:font/woff2;base64,${font(700)})}
body{margin:0;font-family:BC,sans-serif;text-transform:uppercase}
.mark{display:inline-block;background:#ffc400;color:#141000;font-weight:800;transform:skewX(-8deg);border-radius:4px}
.stripe{height:28px;background:repeating-linear-gradient(-45deg,#ffc400 0 22px,#0d1b2a 22px 44px)}`;
const phone = readFileSync(new URL('../src/data/site.ts', import.meta.url), 'utf8').match(/phoneDisplay: '([^']+)'/)[1];

const og = `<html><head><style>${css}</style></head><body style="width:1200px;height:630px;background:#0b2545;color:#fff;display:flex;flex-direction:column;justify-content:space-between">
<div style="padding:56px 72px 0;display:flex;align-items:center;gap:20px"><span class="mark" style="font-size:52px;padding:8px 16px 4px">M&amp;C</span><span style="font-size:40px;font-weight:800;line-height:.9">Desentupidora<br><span style="color:#ffc400;font-size:22px;letter-spacing:4px">Ubatuba 24h</span></span></div>
<div style="padding:0 72px"><div style="font-size:112px;font-weight:800;line-height:.9">Desentupidora<br>em Ubatuba</div>
<div style="font-size:64px;font-weight:800;color:#ffc400;margin-top:18px">${phone} &nbsp;|&nbsp; 24 horas</div></div>
<div class="stripe"></div></body></html>`;
const logo = `<html><head><style>${css}</style></head><body style="width:512px;height:512px;background:#0b2545;display:grid;place-items:center"><span class="mark" style="font-size:190px;padding:24px 40px 6px">M&amp;C</span></body></html>`;

const browser = await chromium.launch();
for (const [html, w, h, out] of [[og, 1200, 630, 'public/og.png'], [logo, 512, 512, 'public/logo.png']]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: out });
  await page.close();
}
await browser.close();
console.log('ok');
