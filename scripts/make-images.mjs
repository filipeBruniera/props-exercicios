// Gera public/og.png (1200x630) e public/logo.png (512x512) a partir de HTML.
// Uso: node scripts/make-images.mjs  (requer Playwright com Chromium)
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const font = 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif';
const mark = (s) => `<svg width="${s}" height="${s}" viewBox="0 0 36 36"><rect width="36" height="36" rx="10" fill="#c2410c"/><path d="M9 25V11l9 9 9-9v14" fill="none" stroke="#fff8f3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const siteSrc = readFileSync(new URL('../src/data/site.ts', import.meta.url), 'utf8');
const phone = siteSrc.match(/phoneDisplay: '([^']+)'/)[1];

const og = `<html><body style="margin:0;width:1200px;height:630px;background:#10262e;color:#eaf1f2;font-family:${font};display:flex;flex-direction:column;justify-content:space-between;padding:72px;box-sizing:border-box">
<div style="display:flex;align-items:center;gap:18px;font-size:34px"><span>${mark(64)}</span><b>M &amp; C</b>&nbsp;Desentupidora</div>
<div><div style="font-size:84px;font-weight:750;letter-spacing:-2px;line-height:1.02">Desentupidora em Ubatuba<br><span style="color:#f07a3e">24 horas.</span></div>
<div style="font-size:32px;color:#a9bec3;margin-top:24px">Pia, vaso, esgoto, caixa de gordura e fossa &nbsp;|&nbsp; ${phone}</div></div></body></html>`;
const logo = `<html><body style="margin:0;width:512px;height:512px;background:#c2410c;display:grid;place-items:center">${mark(512)}</body></html>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
for (const [html, w, h, out] of [[og, 1200, 630, 'public/og.png'], [logo, 512, 512, 'public/logo.png']]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.setContent(html);
  await page.screenshot({ path: out });
  await page.close();
}
await browser.close();
console.log('ok');
