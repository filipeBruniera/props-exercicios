// Monta brand/site/index.html: página única e independente (fontes, GSAP, logos e ícones embutidos).
// Uso: node brand/scripts/build.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const R = (p) => new URL(p, import.meta.url).pathname;
const read = (p) => readFileSync(R(p), 'utf8');
const nm = (p) => R(`../../node_modules/${p}`);

// Dados da empresa (fonte única: src/data/site.ts do site)
const siteTs = read('../../src/data/site.ts');
const pick = (k) => siteTs.match(new RegExp(`${k}: '([^']*)'`))[1];
const phone = pick('phoneDisplay');
const wa = `https://wa.me/${pick('whatsappDigits')}?text=${encodeURIComponent(pick('whatsappMessage'))}`;
const email = pick('email');
const siteUrl = pick('url');

// Logos
const logo = (f) => read(`../kit/02-logo/${f}`).replace(/<title>.*?<\/title>/, '').replace(/ width="\d+" height="\d+"/, '').replace('<svg ', '<svg aria-hidden="true" focusable="false" ').trim();
const L = {
  LOGO_H: logo('logo-mc-horizontal.svg'),
  LOGO_HL: logo('logo-mc-horizontal-fundo-claro.svg'),
  LOGO_W: logo('logo-mc-branco.svg'),
  LOGO_K: logo('logo-mc-preto.svg'),
  LOGO_V: logo('logo-mc-vertical.svg'),
  SYM: logo('simbolo-mc.svg'),
};
// Símbolo animado (construção): etiqueta em traço, preenchimento, letras e gota separados
const symSrc = read('../kit/02-logo/simbolo-mc.svg');
const paths = [...symSrc.matchAll(/<path d="([^"]+)"([^>]*)\/>/g)];
const [sticker, letters, drop] = paths;
L.SYM_ANIM = `<svg viewBox="0 0 160 120" aria-label="Construção do símbolo M&C" role="img">
<path id="symStroke" d="${sticker[1]}" fill="none" stroke="#ffc400" stroke-width="2"/>
<path id="symFill" d="${sticker[1]}" fill="#ffc400"/>
<g id="symLetters"><path d="${letters[1]}"${letters[2]}/></g>
<path id="symDrop" d="${drop[1]}"${drop[2]}/></svg>`;

// Ícones Phosphor
const icon = (w, n) => {
  const f = w === 'fill' ? `${n}-fill.svg` : `${n}-bold.svg`;
  return readFileSync(nm(`@phosphor-icons/core/assets/${w}/${f}`), 'utf8').replace('<svg ', '<svg aria-hidden="true" focusable="false" width="22" height="22" ');
};

let html = read('../src/page.html')
  .replace(/<!--(LOGO_H|LOGO_HL|LOGO_W|LOGO_K|LOGO_V|SYM_ANIM|SYM)-->/g, (_, k) => L[k])
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
  ff('Barlow Condensed', 'barlow-condensed', 'barlow-condensed-latin-700-normal.woff2', 700),
  ff('Barlow Condensed', 'barlow-condensed', 'barlow-condensed-latin-800-normal.woff2', 800),
  ff('Barlow', 'barlow', 'barlow-latin-400-normal.woff2', 400),
  ff('Barlow', 'barlow', 'barlow-latin-600-normal.woff2', 600),
  ff('Barlow', 'barlow', 'barlow-latin-700-normal.woff2', 700),
  ff('JetBrains Mono', 'jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff2', 400),
  ff('JetBrains Mono', 'jetbrains-mono', 'jetbrains-mono-latin-600-normal.woff2', 600),
].join('\n');

const gsap = readFileSync(nm('gsap/dist/gsap.min.js'), 'utf8');
const st = readFileSync(nm('gsap/dist/ScrollTrigger.min.js'), 'utf8');
const fav = `data:image/svg+xml;base64,${Buffer.from(read('../kit/02-logo/favicon.svg')).toString('base64')}`;

const doc = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>M&amp;C Fluxo · Brand book</title>
<meta name="description" content="Brand book vivo da M&C Desentupidora, Ubatuba-SP: marca, cor, tipografia, mascote Pingo, componentes, produto, comunicação e movimento.">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#040d1c">
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
${read('../src/pingo.js')}
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
