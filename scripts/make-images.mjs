// Gera public/og.png (1200x630) e public/logo.png (512x512, logo circular) na identidade oficial.
// Uso: node scripts/sync-marca.mjs && node scripts/make-images.mjs  (requer Playwright com Chromium)
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const font = (pkg, file) => readFileSync(new URL(`../node_modules/@fontsource/${pkg}/files/${file}`, import.meta.url)).toString('base64');
const css = `@font-face{font-family:CG;font-weight:700;src:url(data:font/woff2;base64,${font('cormorant-garamond', 'cormorant-garamond-latin-700-normal.woff2')})}
@font-face{font-family:JS;src:url(data:font/woff2;base64,${font('julius-sans-one', 'julius-sans-one-latin-400-normal.woff2')})}
body{margin:0;font-family:CG,Georgia,serif;text-transform:uppercase;font-variant-numeric:lining-nums}
.stripe{height:6px;background:repeating-linear-gradient(90deg,#f2680c 0 30px,transparent 30px 48px)}`;
const svg = (f) => `data:image/svg+xml;base64,${readFileSync(new URL(`../src/assets/marca/${f}`, import.meta.url)).toString('base64')}`;
const phone = readFileSync(new URL('../src/data/site.ts', import.meta.url), 'utf8').match(/phoneDisplay: '([^']+)'/)[1];

const og = `<html><head><style>${css}</style></head><body style="width:1200px;height:630px;background:radial-gradient(70% 80% at 85% 30%,#0b55b8,#002252 60%,#001a3d);color:#fff;display:flex;align-items:center;gap:56px;padding:0 72px;box-sizing:border-box;position:relative">
<div style="flex:none;width:360px;height:360px;border-radius:50%;background:#fff;display:grid;place-items:center"><img src="${svg('logo-mc-circular.svg')}" style="width:334px"></div>
<div><div style="font:17px JS,sans-serif;letter-spacing:4px;color:#ff8a3d">Plantão 24 horas</div>
<div style="font-size:74px;font-weight:700;line-height:.98;margin:14px 0 22px">Desentupidora<br>em Ubatuba</div>
<div style="font-size:58px;font-weight:700;color:#f2680c">${phone}</div></div>
<div class="stripe" style="position:absolute;left:0;right:0;bottom:28px"></div></body></html>`;
const logo = `<html><body style="margin:0;width:512px;height:512px;background:#fff;display:grid;place-items:center"><img src="${svg('logo-mc-circular.svg')}" style="width:480px"></body></html>`;

const browser = await chromium.launch();
for (const [html, w, h, out] of [[og, 1200, 630, 'public/og.png'], [logo, 512, 512, 'public/logo.png']]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);
  await page.screenshot({ path: out });
  await page.close();
}
await browser.close();
console.log('ok');
