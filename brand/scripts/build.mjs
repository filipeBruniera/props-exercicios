// Monta brand/site/index.html: página única e independente (fontes, GSAP, logos e ícones embutidos).
// Uso: node brand/scripts/build.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const R = (p) => fileURLToPath(new URL(p, import.meta.url));
const read = (p) => readFileSync(R(p), 'utf8');
const nm = (p) => R(`../../node_modules/${p}`);

// Dados da empresa (fonte única: src/data/site.ts do site)
const siteTs = read('../../src/data/site.ts');
const pick = (k) => siteTs.match(new RegExp(`${k}: '([^']*)'`))[1];
const phone = pick('phoneDisplay');
const wa = `https://wa.me/${pick('whatsappDigits')}?text=${encodeURIComponent(pick('whatsappMessage'))}`;
const email = pick('email');
const siteUrl = pick('url');

// Logos (ids de máscara renomeados por cópia, para não repetir id na página)
let copy = 0;
const logo = (f) => { const k = ++copy; return read(`../kit/02-logo/${f}`).replace(/<title>.*?<\/title>/, '').replace(/ width="\d+" height="\d+"/, '').replace('<svg ', '<svg aria-hidden="true" focusable="false" ').replace(/(id="|url\(#)(mq\d+)/g, `$1$2c${k}`).trim(); };
const L = {
  LOGO_C: logo('logo-mc-circular.svg'),
  LOGO_CW: logo('logo-mc-circular-branco.svg'),
  LOGO_H: logo('logo-mc-horizontal.svg'),
  LOGO_HL: logo('logo-mc-horizontal-fundo-claro.svg'),
  LOGO_W: logo('logo-mc-branco.svg'),
  LOGO_K: logo('logo-mc-preto.svg'),
  SYM: logo('simbolo-mc.svg'),
};
// Logo animado (construção): círculo-guia em traço, máquina, nome em arco, traços e slogan
L.SYM_ANIM = logo('logo-mc-circular.svg')
  .replace('<svg aria-hidden="true" focusable="false" ', '<svg role="img" aria-label="Construção da logo M&amp;C" ')
  .replace(/data-p="(\w+)"/g, (_, p) => `id="sym${p[0].toUpperCase()}${p.slice(1)}"`)
  .replace(/(<svg[^>]*>)/, '$1<circle id="symStroke" cx="200" cy="200" r="190" fill="none" stroke="#f2680c" stroke-width="2" stroke-dasharray="4 6"/>');

// Ícones Phosphor
const icon = (w, n) => {
  const f = w === 'fill' ? `${n}-fill.svg` : `${n}-bold.svg`;
  return readFileSync(nm(`@phosphor-icons/core/assets/${w}/${f}`), 'utf8').replace('<svg ', '<svg aria-hidden="true" focusable="false" width="22" height="22" ');
};

let html = read('../src/page.html')
  .replace(/<!--(LOGO_CW|LOGO_C|LOGO_HL|LOGO_H|LOGO_W|LOGO_K|SYM_ANIM|SYM)-->/g, (_, k) => L[k])
  .replace(/<!--I:([a-z-]+)-->/g, (_, n) => icon('bold', n))
  .replace(/<!--IF:([a-z-]+)-->/g, (_, n) => icon('fill', n))
  .replaceAll('{{PHONE}}', phone)
  .replaceAll('{{WA}}', wa)
  .replaceAll('{{EMAIL}}', email)
  .replaceAll('{{SITE}}', siteUrl)
  .replaceAll('{{SITE_SHORT}}', siteUrl.replace(/^https?:\/\//, ''))
  .replaceAll('{{DATE}}', new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }));

// Fontes embutidas
const ff = (family, pkg, file, weight) =>
  `@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};font-display:swap;src:url(data:font/woff2;base64,${readFileSync(nm(`@fontsource/${pkg}/files/${file}`)).toString('base64')}) format('woff2')}`;
const fonts = [
  ff('Cormorant Garamond', 'cormorant-garamond', 'cormorant-garamond-latin-600-normal.woff2', 600),
  ff('Cormorant Garamond', 'cormorant-garamond', 'cormorant-garamond-latin-700-normal.woff2', 700),
  ff('Questrial', 'questrial', 'questrial-latin-400-normal.woff2', 400),
  ff('Julius Sans One', 'julius-sans-one', 'julius-sans-one-latin-400-normal.woff2', 400),
].join('\n');

const gsap = readFileSync(nm('gsap/dist/gsap.min.js'), 'utf8');
const st = readFileSync(nm('gsap/dist/ScrollTrigger.min.js'), 'utf8');
const fav = `data:image/svg+xml;base64,${Buffer.from(read('../kit/02-logo/favicon.svg')).toString('base64')}`;

const doc = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>M&amp;C · Brand book</title>
<meta name="description" content="Brand book vivo da M&C Desentupidora, Ubatuba-SP: marca, cor, tipografia, mascote Mola, componentes, produto, comunicação e movimento.">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#001a3d">
<link rel="icon" href="${fav}">
<style>
${fonts}
${read('../src/page.css')}
</style>
</head>
<body>
${html}
<script>${gsap}</script>
<script>${st}</script>
<script>
${read('../src/mola.js')}
</script>
<script>
${read('../src/page.js')}
</script>
</body>
</html>
`;

mkdirSync(R('../site/downloads'), { recursive: true });
writeFileSync(R('../site/index.html'), doc);
// Versão sem scripts (confere que a página fica completa sem JS)
writeFileSync(R('../site/.preview-nojs.html'), doc.replace(/<script>[\s\S]*?<\/script>/g, ''));
console.log('brand book ok', Math.round(doc.length / 1024), 'KB');
