// Gera os arquivos do kit da marca (PNG dos logos, poses da Mola, tokens, prints e zip).
// Uso: node brand/scripts/make-logo.mjs && node brand/scripts/build.mjs && node brand/scripts/make-kit.mjs
// Também gera os prints (06) e as folhas de contato chamando shots.mjs e sheet.mjs.
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync, cpSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const R = (p) => fileURLToPath(new URL(p, import.meta.url));
const KIT = R('../kit/');
const dir = (p) => { mkdirSync(KIT + p, { recursive: true }); return KIT + p; };

// Pastas geradas: limpas a cada execução para não sobrar arquivo antigo no zip
for (const p of ['01-brand-book', '02-logo/png', '03-mascote-mola', '06-prints-de-referencia', '07-codigo-fonte']) rmSync(KIT + p, { recursive: true, force: true });

const browser = await chromium.launch();

// 1. Logos em PNG transparente (alta resolução)
const logoDir = KIT + '02-logo/';
const pngDir = dir('02-logo/png');
for (const f of readdirSync(logoDir).filter((f) => f.endsWith('.svg'))) {
  const svg = readFileSync(logoDir + f, 'utf8');
  const vb = svg.match(/viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/);
  if (!vb) throw new Error(`${f}: viewBox precisa ser "0 0 largura altura"`);
  const [, w, h] = vb;
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

// 2. Mola: SVG e PNG por pose, folha de personagem
const molaJs = readFileSync(R('../src/mola.js'), 'utf8');
const mDir = dir('03-mascote-mola');
const pDir = dir('03-mascote-mola/png');
const combos = [['feliz', 'parado'], ['feliz', 'acenando'], ['sorriso', 'apontando'], ['sorriso', 'mostrando'], ['sorriso', 'pronto'], ['concentrado', 'mostrando'], ['duvida', 'pensando'], ['surpreso', 'parado'], ['comemorando', 'comemorando']];
{
  const page = await browser.newPage({ viewport: { width: 760, height: 800 }, deviceScaleFactor: 3 });
  await page.setContent(`<body style="margin:0;background:transparent"><div id="m" style="width:760px"></div><script>${molaJs}</script></body>`);
  for (const [e, p] of combos) {
    const svg = await page.evaluate(([e, p]) => {
      const m = document.getElementById('m'); m.innerHTML = '';
      const api = window.Mola.create(m, { expr: e, pose: p, idle: false, clickable: false });
      const s = api.svg, bb = s.querySelector('.ml-rig').getBBox(), pad = 10;
      s.setAttribute('viewBox', [bb.x - pad, bb.y - pad, bb.width + pad * 2, bb.height + pad * 2].map((v) => +v.toFixed(1)).join(' '));
      s.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      return s.outerHTML;
    }, [e, p]);
    writeFileSync(`${mDir}/mola-${e}-${p}.svg`, svg);
    await (await page.$('#m svg')).screenshot({ path: `${pDir}/mola-${e}-${p}.png`, omitBackground: true });
  }
  await page.close();
}
{
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  const cg = readFileSync(R('../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-700-normal.woff2')).toString('base64');
  const qs = readFileSync(R('../../node_modules/@fontsource/questrial/files/questrial-latin-400-normal.woff2')).toString('base64');
  await page.setContent(`<style>@font-face{font-family:CG;font-weight:700;src:url(data:font/woff2;base64,${cg}) format('woff2')}@font-face{font-family:QS;src:url(data:font/woff2;base64,${qs}) format('woff2')}</style><body style="margin:0;padding:40px;background:radial-gradient(80% 90% at 30% 20%,#ffffff,#e3e3e3);font:16px/1.2 QS,sans-serif;color:#4a5866"><h1 style="margin:0 0 20px;color:#002b63;font:700 48px CG,Georgia,serif;text-transform:uppercase">Mola · folha de personagem</h1><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px">${combos.map((c, i) => `<div style="text-align:center"><div id="c${i}"></div>${c[0]} · ${c[1]}</div>`).join('')}</div><script>${molaJs}</script><script>${JSON.stringify(combos)}.forEach((c,i)=>Mola.create(document.getElementById('c'+i),{expr:c[0],pose:c[1],idle:false}))</script></body>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${mDir}/folha-de-personagem.png`, fullPage: true });
  await page.close();
}
copyFileSync(R('../src/mola.js'), `${mDir}/mola-animada.js`);

// 3. Tokens
const tDir = dir('04-tokens');
const css = readFileSync(R('../src/page.css'), 'utf8');
const rootVars = css.match(/:root \{([\s\S]*?)\}/)[1];
writeFileSync(`${tDir}/tokens-mc.css`, `/* M&C Desentupidora · identidade oficial · tokens de cor, forma, fonte e movimento */\n:root {${rootVars}}\n`);
const lum = (hex) => { const c = [1, 3, 5].map((i) => { const v = parseInt(hex.substr(i, 2), 16) / 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const ratio = (a, b) => { const x = lum(a), y = lum(b); return +((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)).toFixed(2); };
const palette = { azul: '#004BA9', laranja: '#F2680C', cinza: '#E3E3E3', azulEscuro: '#002B63', fundoEscuro: '#001A3D', tinta: '#0B1F3F', laranjaTexto: '#9A3D00', laranjaClaro: '#FF8A3D', aco: '#4A5866', branco: '#FFFFFF', whatsapp: '#1D9E52' };
const pairs = [['branco', 'azul'], ['branco', 'azulEscuro'], ['laranja', 'fundoEscuro'], ['laranjaClaro', 'azulEscuro'], ['tinta', 'laranja'], ['tinta', 'cinza'], ['azul', 'cinza'], ['aco', 'cinza'], ['laranjaTexto', 'cinza'], ['branco', 'whatsapp'], ['branco', 'laranja'], ['laranja', 'azul']]
  .map(([fg, bg]) => { const r = ratio(palette[fg], palette[bg]); return { texto: fg, fundo: bg, contraste: r, nivel: r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? 'AA texto grande' : 'reprova' }; });
writeFileSync(`${tDir}/tokens-base-contraste-testado.json`, JSON.stringify({ marca: 'M&C Desentupidora', versao: 'Identidade oficial v2', oficiais: ['#004BA9', '#F2680C', '#E3E3E3'], cores: palette, contraste: pairs, forma: { raio: '6px', divisor: 'traço laranja tracejado #F2680C' }, fontes: { titulos: 'Koela (oficial) / Cormorant Garamond 600/700 na web, caixa alta', texto: 'Century Gothic (oficial) / Questrial 400 na web', apoio: 'Julius Sans One 400' }, movimento: { curva: 'cubic-bezier(.2, 0, 0, 1)', duracoes_ms: [150, 250, 400] } }, null, 2));

// 4. Fotos / imagem de compartilhamento
const fDir = dir('05-fotos');
copyFileSync(R('../../public/og.png'), `${fDir}/og-mc-desentupidora.png`);
writeFileSync(`${fDir}/LEIA-ME.md`, '# Fotos\n\nAinda não há fotos reais da M&C. Quando tiver, coloque aqui: técnico uniformizado, caminhão adesivado, máquina rotativa, hidrojateamento e serviço resolvido. Fotos reais valem mais do que banco de imagens para a confiança do cliente.\n');
await browser.close();

// 5. Brand book, código-fonte e prints
copyFileSync(R('../site/index.html'), dir('01-brand-book') + '/mc-brand-book.html');
const cDir = dir('07-codigo-fonte');
for (const f of ['page.html', 'page.css', 'page.js', 'mola.js']) copyFileSync(R('../src/' + f), `${cDir}/${f}`);
for (const f of ['build.mjs', 'make-logo.mjs', 'make-kit.mjs', 'shots.mjs', 'sheet.mjs', 'check-layout.mjs']) copyFileSync(R('./' + f), `${cDir}/${f}`);
writeFileSync(`${cDir}/LEIA-ME.md`, '# Código-fonte\n\nOs scripts rodam a partir do repositório do site (pasta `brand/scripts/`), onde estão `node_modules`, `brand/src` e `src/data/site.ts`. Aqui ficam só como referência.\n\nOrdem: `make-logo.mjs` → `build.mjs` → `make-kit.mjs` (gera prints, PNGs, tokens e o zip). `check-layout.mjs` confere sobreposições e overflow.\n');

// Prints de referência (15 seções, desktop e celular) e folhas de contato
const shotsTmp = tmpdir() + '/mc-prints';
rmSync(shotsTmp, { recursive: true, force: true });
execFileSync('node', [R('./shots.mjs'), shotsTmp], { stdio: 'inherit' });
const prDir = dir('06-prints-de-referencia');
for (const f of readdirSync(shotsTmp).filter((f) => f.endsWith('.png'))) copyFileSync(`${shotsTmp}/${f}`, `${prDir}/${f}`);
execFileSync('node', [R('./sheet.mjs'), shotsTmp, 'desk', `${prDir}/folha-desktop.jpg`, '3', '1600']);
execFileSync('node', [R('./sheet.mjs'), shotsTmp, 'mob', `${prDir}/folha-celular.jpg`, '8', '1600']);

// 6. Zip
const zip = R('../site/downloads/kit-marca-mc-desentupidora.zip');
rmSync(zip, { force: true });
const stage = tmpdir() + '/mc-zip';
rmSync(stage, { recursive: true, force: true });
cpSync(KIT, `${stage}/MC-Desentupidora-Kit-da-Marca`, { recursive: true });
try {
  execFileSync('zip', ['-qr', zip, 'MC-Desentupidora-Kit-da-Marca'], { cwd: stage });
} finally {
  rmSync(stage, { recursive: true, force: true });
}
console.log('kit ok');
