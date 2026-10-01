// Gera os arquivos do kit da marca (PNG dos logos, poses do Pingo, tokens, prints e zip).
// Uso: node brand/scripts/make-logo.mjs && node brand/scripts/build.mjs && node brand/scripts/make-kit.mjs
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync, cpSync, rmSync } from 'node:fs';
import { execSync } from 'node:child_process';

const R = (p) => new URL(p, import.meta.url).pathname;
const KIT = R('../kit/');
const dir = (p) => { mkdirSync(KIT + p, { recursive: true }); return KIT + p; };

const browser = await chromium.launch();

// 1. Logos em PNG transparente (alta resolução)
const logoDir = KIT + '02-logo/';
const pngDir = dir('02-logo/png');
for (const f of readdirSync(logoDir).filter((f) => f.endsWith('.svg'))) {
  const svg = readFileSync(logoDir + f, 'utf8');
  const [, w, h] = svg.match(/viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/);
  const scale = Math.min(2400 / w, 1600 / h);
  const page = await browser.newPage({ viewport: { width: Math.round(w * scale), height: Math.round(h * scale) } });
  await page.setContent(`<body style="margin:0;background:transparent">${svg.replace(/width="\d+" height="\d+"/, 'width="100%" height="100%"')}</body>`);
  await page.screenshot({ path: pngDir + '/' + f.replace('.svg', '.png'), omitBackground: true });
  await page.close();
}
for (const [size, name] of [[512, 'icon-512.png'], [180, 'apple-touch-icon.png'], [48, 'favicon-48.png']]) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  await page.setContent(`<body style="margin:0">${readFileSync(logoDir + 'favicon.svg', 'utf8').replace(/width="\d+" height="\d+"/, `width="${size}" height="${size}"`)}</body>`);
  await page.screenshot({ path: logoDir + name, omitBackground: true });
  await page.close();
}

// 2. Pingo: SVG e PNG por pose, folha de personagem
const pingoJs = readFileSync(R('../src/pingo.js'), 'utf8');
const mDir = dir('03-mascote-pingo');
const pDir = dir('03-mascote-pingo/png');
const combos = [['feliz', 'parado'], ['feliz', 'acenando'], ['sorriso', 'apontando'], ['sorriso', 'mostrando'], ['sorriso', 'pronto'], ['concentrado', 'mostrando'], ['duvida', 'pensando'], ['surpreso', 'parado'], ['comemorando', 'comemorando']];
{
  const page = await browser.newPage({ viewport: { width: 760, height: 800 } });
  await page.setContent(`<body style="margin:0;background:transparent"><div id="m" style="width:760px"></div><script>${pingoJs}</script></body>`);
  for (const [e, p] of combos) {
    const svg = await page.evaluate(([e, p]) => {
      const m = document.getElementById('m'); m.innerHTML = '';
      const api = window.Pingo.create(m, { expr: e, pose: p, idle: false, clickable: false });
      api.svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      return api.svg.outerHTML;
    }, [e, p]);
    writeFileSync(`${mDir}/pingo-${e}-${p}.svg`, svg);
    await (await page.$('#m svg')).screenshot({ path: `${pDir}/pingo-${e}-${p}.png`, omitBackground: true });
  }
  await page.close();
}
{
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  await page.setContent(`<body style="margin:0;padding:40px;background:radial-gradient(80% 90% at 30% 20%,#13315c,#040d1c);font:16px/1.2 sans-serif;color:#9fb3cc"><h1 style="margin:0 0 20px;color:#fff;font:800 44px 'Arial Narrow',sans-serif;text-transform:uppercase">Pingo · folha de personagem</h1><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px">${combos.map((c, i) => `<div style="text-align:center"><div id="c${i}"></div>${c[0]} · ${c[1]}</div>`).join('')}</div><script>${pingoJs}</script><script>${JSON.stringify(combos)}.forEach((c,i)=>Pingo.create(document.getElementById('c'+i),{expr:c[0],pose:c[1],idle:false}))</script></body>`);
  await page.screenshot({ path: `${mDir}/folha-de-personagem.png`, fullPage: true });
  await page.close();
}
copyFileSync(R('../src/pingo.js'), `${mDir}/pingo-animado.js`);

// 3. Tokens
const tDir = dir('04-tokens');
const css = readFileSync(R('../src/page.css'), 'utf8');
const rootVars = css.match(/:root \{([\s\S]*?)\}/)[1];
writeFileSync(`${tDir}/tokens-mc-fluxo.css`, `/* M&C Fluxo · tokens de cor, forma, fonte e movimento */\n:root {${rootVars}}\n`);
const lum = (hex) => { const c = [1, 3, 5].map((i) => { const v = parseInt(hex.substr(i, 2), 16) / 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const ratio = (a, b) => { const x = lum(a), y = lum(b); return +((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)).toFixed(2); };
const palette = { marinho: '#0B2545', marinho2: '#13315C', marinho3: '#1D3F6E', amarelo: '#FFC400', amareloTexto: '#7A5600', aguaAzul: '#3B8CFF', agua2: '#7CC0FF', asfalto: '#0D1B2A', textoNoAmarelo: '#141000', gelo: '#F3F5F7', aco: '#4A5866', branco: '#FFFFFF', whatsapp: '#1D9E52' };
const pairs = [['branco', 'marinho'], ['amarelo', 'marinho'], ['textoNoAmarelo', 'amarelo'], ['asfalto', 'gelo'], ['marinho', 'gelo'], ['aco', 'gelo'], ['amareloTexto', 'gelo'], ['branco', 'aguaAzul'], ['branco', 'whatsapp'], ['amarelo', 'gelo']]
  .map(([fg, bg]) => { const r = ratio(palette[fg], palette[bg]); return { texto: fg, fundo: bg, contraste: r, nivel: r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? 'AA texto grande' : 'reprova' }; });
writeFileSync(`${tDir}/tokens-base-contraste-testado.json`, JSON.stringify({ marca: 'M&C Desentupidora', versao: 'Fluxo v1', cores: palette, contraste: pairs, forma: { etiqueta: 'skewX(-8deg)', raio: '4px', faixa: 'repeating-linear-gradient(-45deg, #FFC400 0 14px, #0D1B2A 14px 28px)' }, fontes: { titulos: 'Barlow Condensed 700/800, caixa alta', texto: 'Barlow 400/600/700', dados: 'JetBrains Mono 400/600' }, movimento: { curva: 'cubic-bezier(.2, 0, 0, 1)', duracoes_ms: [150, 250, 400] } }, null, 2));

// 4. Fotos / imagem de compartilhamento
const fDir = dir('05-fotos');
copyFileSync(R('../../public/og.png'), `${fDir}/og-mc-desentupidora.png`);
writeFileSync(`${fDir}/LEIA-ME.md`, '# Fotos\n\nAinda não há fotos reais da M&C. Quando tiver, coloque aqui: técnico uniformizado, caminhão adesivado, máquina rotativa, hidrojateamento e serviço resolvido. Fotos reais valem mais do que banco de imagens para a confiança do cliente.\n');
await browser.close();

// 5. Brand book, código-fonte e prints
cpSync(R('../site/index.html'), KIT + '01-brand-book/mc-fluxo-brand-book.html');
const cDir = dir('07-codigo-fonte');
for (const f of ['page.html', 'page.css', 'page.js', 'pingo.js']) copyFileSync(R('../src/' + f), `${cDir}/${f}`);
for (const f of ['build.mjs', 'make-logo.mjs', 'make-kit.mjs', 'shots.mjs', 'sheet.mjs']) copyFileSync(R('./' + f), `${cDir}/${f}`);

// 6. Zip
const zip = R('../site/downloads/kit-marca-mc-desentupidora.zip');
rmSync(zip, { force: true });
execSync(`cd "${R('../')}" && rm -rf .zipstage && mkdir .zipstage && cp -r kit .zipstage/MC-Desentupidora-Fluxo-Kit-da-Marca && cd .zipstage && zip -qr "${zip}" MC-Desentupidora-Fluxo-Kit-da-Marca && cd .. && rm -rf .zipstage`);
console.log('kit ok');
