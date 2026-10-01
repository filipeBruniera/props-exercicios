// Gera os SVGs oficiais da marca M&C com letras convertidas em curvas (Barlow Condensed 800).
// Uso: node brand/scripts/make-logo.mjs
import opentype from 'opentype.js';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';

const fontPath = (w) => new URL(`../../node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-${w}-normal.woff`, import.meta.url).pathname;
const load = (w) => { const b = readFileSync(fontPath(w)); return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)); };
const f800 = load(800);
const f700 = load(700);

export const C = { navy: '#0b2545', ink: '#0d1b2a', yellow: '#ffc400', water: '#3b8cff', white: '#ffffff' };

const path = (font, text, x, y, size, letterSpacing = 0) => {
  let d = '';
  let cx = x;
  for (const ch of text) {
    const g = font.charToGlyph(ch);
    d += g.getPath(cx, y, size).toPathData(2);
    cx += (g.advanceWidth / font.unitsPerEm) * size + letterSpacing;
  }
  return { d, width: cx - x - letterSpacing };
};

// Símbolo: etiqueta inclinada -8° (gesto da marca) + "M&C" + gota d'água caindo.
function symbol({ sticker = C.yellow, letters = C.ink, drop = C.water, x = 0, y = 0 } = {}) {
  const W = 132, H = 84, skew = Math.tan((8 * Math.PI) / 180) * H; // ~11.8
  const p = `M${x + skew},${y} H${x + W} L${x + W - skew},${y + H} H${x} Z`;
  const t = path(f800, 'M&C', 0, 0, 68);
  const tx = x + (W - t.width) / 2 + 1, ty = y + 64;
  const txt = path(f800, 'M&C', tx, ty, 68);
  const dropD = `M${x + W + 6},${y - 22} c0,0 -9,11 -9,17 a9,9 0 0 0 18,0 c0,-6 -9,-17 -9,-17z`;
  return {
    svg: `<path d="${p}" fill="${sticker}" rx="4"/><path d="${txt.d}" fill="${letters}" transform="skewX(-8) translate(${(y + 64) * Math.tan((8 * Math.PI) / 180)} 0)"/>${drop ? `<path d="${dropD}" fill="${drop}"/>` : ''}`,
    W, H,
  };
}

function horizontal({ word = C.white, sub = C.yellow, sticker = C.yellow, letters = C.ink, drop = C.water } = {}) {
  const s = symbol({ sticker, letters, drop, x: 0, y: 26 });
  const w1 = path(f800, 'DESENTUPIDORA', 156, 76, 58, 0.5);
  const w2 = path(f700, 'UBATUBA  24 HORAS', 158, 104, 24, 4.2);
  const width = Math.ceil(156 + Math.max(w1.width, w2.width) + 4);
  return { svg: `${s.svg}<path d="${w1.d}" fill="${word}"/><path d="${w2.d}" fill="${sub}"/>`, width, height: 118 };
}

const wrap = (inner, w, h, title, vb = `0 0 ${w} ${h}`) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${w}" height="${h}" role="img" aria-label="${title}"><title>${title}</title>${inner}</svg>\n`;

const out = new URL('../kit/02-logo/', import.meta.url).pathname;
mkdirSync(out, { recursive: true });

const sym = symbol({ x: 4, y: 30 });
writeFileSync(out + 'simbolo-mc.svg', wrap(sym.svg, 160, 120, 'M&C Desentupidora'));
const symMono = symbol({ x: 4, y: 30, sticker: C.white, letters: C.navy, drop: C.white });
writeFileSync(out + 'simbolo-mc-branco.svg', wrap(symMono.svg, 160, 120, 'M&C Desentupidora'));

const hDark = horizontal();
writeFileSync(out + 'logo-mc-horizontal.svg', wrap(hDark.svg, hDark.width, hDark.height, 'M&C Desentupidora Ubatuba 24 horas', `0 0 ${hDark.width} ${hDark.height}`));
const hLight = horizontal({ word: C.ink, sub: C.navy });
writeFileSync(out + 'logo-mc-horizontal-fundo-claro.svg', wrap(hLight.svg, hLight.width, hLight.height, 'M&C Desentupidora Ubatuba 24 horas'));
const hWhite = horizontal({ word: C.white, sub: C.white, sticker: C.white, letters: C.navy, drop: C.white });
writeFileSync(out + 'logo-mc-branco.svg', wrap(hWhite.svg, hWhite.width, hWhite.height, 'M&C Desentupidora Ubatuba 24 horas'));
const hInk = horizontal({ word: C.ink, sub: C.ink, sticker: C.ink, letters: C.white, drop: C.ink });
writeFileSync(out + 'logo-mc-preto.svg', wrap(hInk.svg, hInk.width, hInk.height, 'M&C Desentupidora Ubatuba 24 horas'));

// Vertical (para redes sociais e uniforme)
const vs = symbol({ x: (300 - 132) / 2, y: 40 });
const v1 = path(f800, 'DESENTUPIDORA', 0, 0, 44, 0.5);
const v2 = path(f700, 'UBATUBA  24 HORAS', 0, 0, 20, 4);
const v1d = path(f800, 'DESENTUPIDORA', (300 - v1.width) / 2, 188, 44, 0.5);
const v2d = path(f700, 'UBATUBA  24 HORAS', (300 - v2.width) / 2, 216, 20, 4);
writeFileSync(out + 'logo-mc-vertical.svg', wrap(`${vs.svg}<path d="${v1d.d}" fill="${C.white}"/><path d="${v2d.d}" fill="${C.yellow}"/>`, 300, 240, 'M&C Desentupidora'));

// Favicon: símbolo em quadro marinho
const fav = symbol({ x: 22, y: 44 });
writeFileSync(out + 'favicon.svg', wrap(`<rect width="176" height="176" rx="22" fill="${C.navy}"/>${fav.svg}`, 176, 176, 'M&C'));
console.log('logos ok', hDark.width);
