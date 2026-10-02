// Gera os SVGs oficiais da marca M&C (identidade do cliente), com todas as letras convertidas em curvas.
// Logo circular: "DESENTUPIDORA - M&C UBATUBA" em arco, máquina desentupidora no centro e o slogan embaixo.
// Uso: node brand/scripts/make-logo.mjs
import opentype from 'opentype.js';
import { mkdirSync, writeFileSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const R = (p) => fileURLToPath(new URL(p, import.meta.url));
const load = (pkg, file) => { const b = readFileSync(R(`../../node_modules/@fontsource/${pkg}/files/${file}`)); return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)); };
const serif = load('cormorant-garamond', 'cormorant-garamond-latin-700-normal.woff');
const sans = load('questrial', 'questrial-latin-400-normal.woff');
const label = load('julius-sans-one', 'julius-sans-one-latin-400-normal.woff');

// Cores oficiais (prancha do cliente) + tons de apoio para o desenho da máquina
export const C = { blue: '#004BA9', deep: '#002B63', orange: '#F2680C', gray: '#E3E3E3', white: '#FFFFFF', metal: '#F4F6F8', metal2: '#D3DAE2', metal3: '#9AA8B8' };

const n = (v) => +v.toFixed(2);

// Texto reto em curva
function line(font, text, x, y, size, spacing = 0) {
  let d = '', cx = x;
  for (const ch of text) {
    const g = font.charToGlyph(ch);
    d += g.getPath(cx, y, size).toPathData(2);
    cx += (g.advanceWidth / font.unitsPerEm) * size + spacing;
  }
  return { d, width: cx - x - spacing };
}
const lineWidth = (font, text, size, spacing = 0) => line(font, text, 0, 0, size, spacing).width;

// Texto em arco, cada letra rotacionada sobre o círculo (centro cx,cy; raio r).
// top = letras no alto, de pé para fora; bottom = letras embaixo, de pé para o centro.
function arc(font, text, { cx, cy, r, size, spacing = 0, side = 'top', span = 0 }) {
  if (span) size = (((span * Math.PI) / 180) * r - spacing * ([...text].length - 1)) * 100 / lineWidth(font, text, 100); // ajusta o tamanho para ocupar o arco
  const adv = [...text].map((ch) => (font.charToGlyph(ch).advanceWidth / font.unitsPerEm) * size + spacing);
  const total = adv.reduce((a, b) => a + b, 0) - spacing;
  let s = -total / 2, d = '';
  [...text].forEach((ch, i) => {
    const g = font.charToGlyph(ch), w = adv[i] - spacing;
    const mid = s + w / 2, a = mid / r; // ângulo em radianos a partir do topo (ou da base)
    const px = side === 'top' ? cx + r * Math.sin(a) : cx + r * Math.sin(a);
    const py = side === 'top' ? cy - r * Math.cos(a) : cy + r * Math.cos(a);
    const rot = side === 'top' ? a : -a;
    const cos = Math.cos(rot), sin = Math.sin(rot);
    const p = g.getPath(-w / 2, 0, size);
    p.commands.forEach((c) => {
      for (const [kx, ky] of [['x', 'y'], ['x1', 'y1'], ['x2', 'y2']]) {
        if (c[kx] === undefined) continue;
        const x = c[kx], y = c[ky];
        c[kx] = px + x * cos - y * sin;
        c[ky] = py + x * sin + y * cos;
      }
    });
    d += p.toPathData(2);
    s += adv[i];
  });
  return d;
}

// Máquina desentupidora rotativa (vista 3/4, virada para a esquerda), na caixa 0 0 300 270.
// Colorida: azul, laranja e metal. Monocromática (mono = cor): silhueta vazada por máscara,
// os contornos viram recortes, então funciona sobre qualquer fundo.
let maskId = 0;
function machineParts(k) {
  // k(role) devolve a cor de cada papel: line, blue, orange, metal, metal2, white, hub, tire, rib, shine
  const tube = (d, w = 13) => `<path d="${d}" fill="none" stroke="${k('tube')}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>` +
    (k('tubeIn') ? `<path d="${d}" fill="none" stroke="${k('tubeIn')}" stroke-width="${w - 7}" stroke-linecap="round" stroke-linejoin="round"/>` : '');
  const wheel = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${k('tire')}" stroke="${k('line')}" stroke-width="3"/>` +
    (k('tread') ? `<circle cx="${x}" cy="${y}" r="${r - 4}" fill="none" stroke="${k('tread')}" stroke-width="2" stroke-dasharray="3 4"/>` : '') +
    `<circle cx="${x}" cy="${y}" r="${n(r * 0.62)}" fill="${k('orange')}" stroke="${k('line')}" stroke-width="3"/>` +
    `<circle cx="${x}" cy="${y}" r="${n(r * 0.26)}" fill="${k('hub')}"/>`;
  return [
    wheel(196, 226, 26),
    tube('M150,214 L206,40 Q214,18 236,24 Q256,30 250,52 L196,226'),
    tube('M44,236 L150,214 L232,238'),
    `<rect x="32" y="230" width="22" height="16" rx="6" fill="${k('orange')}" stroke="${k('line')}" stroke-width="3"/>`,
    // motor atrás do tambor, com aletas e tampa laranja
    `<rect x="146" y="88" width="64" height="60" rx="12" fill="${k('blue')}" stroke="${k('line')}" stroke-width="5"/>`,
    ...[100, 113, 126, 139].map((y) => `<path d="M180,${y} H202" stroke="${k('rib')}" stroke-width="3.5" stroke-linecap="round"/>`),
    `<rect x="170" y="70" width="22" height="20" rx="5" fill="${k('orange')}" stroke="${k('line')}" stroke-width="3"/>`,
    // corpo do tambor (cilindro) e face
    `<path d="M92,70 L142,76 A38,64 0 0 1 142,204 L92,210 Z" fill="${k('metal2')}" stroke="${k('line')}" stroke-width="5" stroke-linejoin="round"/>`,
    `<path d="M118,74 V208" stroke="${k('rib')}" stroke-width="3"/>`,
    `<ellipse cx="92" cy="140" rx="56" ry="70" fill="${k('metal')}" stroke="${k('line')}" stroke-width="5"/>`,
    `<ellipse cx="92" cy="140" rx="44" ry="56" fill="${k('white')}" stroke="${k('ring')}" stroke-width="3"/>`,
    `<ellipse cx="92" cy="140" rx="27" ry="34" fill="${k('orange')}" stroke="${k('line')}" stroke-width="4"/>`,
    `<ellipse cx="92" cy="140" rx="12" ry="15" fill="${k('hub')}"/>`,
    // cabo-mola saindo do centro, com ponteira de metal
    `<path d="M88,148 C72,178 48,186 28,198" fill="none" stroke="${k('cable')}" stroke-width="11" stroke-linecap="round"/>`,
    k('coil') ? `<path d="M88,148 C72,178 48,186 28,198" fill="none" stroke="${k('coil')}" stroke-width="7" stroke-dasharray="2.5 3.5"/>` : '',
    `<rect x="8" y="188" width="24" height="16" rx="5" transform="rotate(-28 20 196)" fill="${k('metal2')}" stroke="${k('line')}" stroke-width="3"/>`,
    wheel(232, 232, 34),
    k('shine') ? `<path d="M56,96 Q62,82 76,76" fill="none" stroke="${k('shine')}" stroke-width="5" stroke-linecap="round"/>` : '',
  ].join('');
}
const COLOR = { line: C.deep, tube: C.deep, tubeIn: C.blue, blue: C.blue, orange: C.orange, metal: C.metal, metal2: C.metal2, white: C.white, ring: C.metal3, hub: C.deep, tire: C.deep, tread: C.blue, rib: C.metal2, cable: C.deep, coil: C.metal, shine: C.white };
// Na máscara: branco = aparece, preto = recorte
const MASK = { line: '#000', tube: '#fff', tubeIn: null, blue: '#fff', orange: '#fff', metal: '#fff', metal2: '#fff', white: '#fff', ring: '#000', hub: '#000', tire: '#fff', tread: null, rib: '#000', cable: '#fff', coil: '#000', shine: null };
function machine({ mono = null } = {}) {
  if (!mono) return machineParts((r) => COLOR[r]);
  const id = 'mq' + ++maskId;
  return `<mask id="${id}" maskUnits="userSpaceOnUse" x="-10" y="0" width="290" height="280"><rect x="-10" y="0" width="290" height="280" fill="#000"/>${machineParts((r) => MASK[r])}</mask><rect x="-10" y="0" width="290" height="280" fill="${mono}" mask="url(#${id})"/>`;
}

// Logo circular (principal). 400 x 400.
function circular({ text = C.deep, slogan = C.orange, rule = C.orange, mono = null } = {}) {
  const cx = 200, cy = 200;
  const top = arc(serif, 'DESENTUPIDORA - M&C UBATUBA', { cx, cy, r: 150, spacing: 0.5, side: 'top', span: 176 });
  const bottom = arc(sans, 'Solução em desentupimento para residências e comércios', { cx, cy, r: 168, spacing: 0.3, side: 'bottom', span: 164 });
  // traços laranja nas laterais, entre os dois textos
  const tick = (a1, a2) => { const p = (a) => [n(cx + 168 * Math.cos(a)), n(cy + 168 * Math.sin(a))]; const [x1, y1] = p(a1), [x2, y2] = p(a2); return `M${x1},${y1} A168,168 0 0 1 ${x2},${y2}`; };
  const rad = (deg) => (deg * Math.PI) / 180;
  const ticks = `<path data-p="ticks" d="${tick(rad(0), rad(10))} ${tick(rad(170), rad(180))}" fill="none" stroke="${rule}" stroke-width="5" stroke-linecap="round"/>`;
  // data-p marca cada parte (o brand book usa para animar a construção)
  return `<path data-p="top" d="${top}" fill="${text}" stroke="${text}" stroke-width="1" stroke-linejoin="round"/>${ticks}<path data-p="slogan" d="${bottom}" fill="${slogan}" stroke="${slogan}" stroke-width=".6" stroke-linejoin="round"/><g data-p="machine" transform="translate(90 92) scale(.84)">${machine({ mono })}</g>`;
}

// Símbolo: a máquina dentro de um círculo
function symbol({ bg = C.white, ring = C.blue, mono = null } = {}) {
  return `<circle cx="160" cy="160" r="152" fill="${bg}" stroke="${ring}" stroke-width="10"/><g transform="translate(26 44) scale(.9)">${machine({ mono })}</g>`;
}

// Horizontal: símbolo + "M&C" + "DESENTUPIDORA · UBATUBA"
function horizontal({ word = C.white, sub = C.orange, bg = C.white, ring = C.orange, mono = null } = {}) {
  const H = 120, s = H / 320;
  const big = line(serif, 'M&C', 0, 0, 74);
  const small = line(label, 'DESENTUPIDORA · UBATUBA', 0, 0, 19, 2.6);
  const x = H + 18;
  const w1 = line(serif, 'M&C', x - 2, 70, 74);
  const w2 = line(label, 'DESENTUPIDORA · UBATUBA', x, 102, 19, 2.6);
  const width = Math.ceil(x + Math.max(big.width, small.width) + 6);
  return { svg: `<g transform="scale(${s})">${symbol({ bg, ring, mono })}</g><path d="${w1.d}" fill="${word}"/><path d="${w2.d}" fill="${sub}"/>`, width, height: H };
}

const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const wrap = (inner, w, h, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(title)}"><title>${esc(title)}</title>${inner}</svg>\n`;

const out = R('../kit/02-logo/');
mkdirSync(out, { recursive: true });
for (const f of readdirSync(out).filter((f) => f.endsWith('.svg'))) rmSync(out + f);

const NAME = 'M&C Desentupidora Ubatuba';
writeFileSync(out + 'logo-mc-circular.svg', wrap(circular(), 400, 400, NAME));
writeFileSync(out + 'logo-mc-circular-branco.svg', wrap(circular({ text: C.white, slogan: C.white, rule: C.orange, mono: C.white }), 400, 400, NAME));
writeFileSync(out + 'logo-mc-circular-preto.svg', wrap(circular({ text: C.deep, slogan: C.deep, rule: C.deep, mono: C.deep }), 400, 400, NAME));

writeFileSync(out + 'simbolo-mc.svg', wrap(symbol(), 320, 320, NAME));
writeFileSync(out + 'simbolo-mc-branco.svg', wrap(symbol({ bg: 'none', ring: C.white, mono: C.white }), 320, 320, NAME));

const h = horizontal();
writeFileSync(out + 'logo-mc-horizontal.svg', wrap(h.svg, h.width, h.height, NAME));
const hl = horizontal({ word: C.deep, sub: '#B34700', ring: C.blue });
writeFileSync(out + 'logo-mc-horizontal-fundo-claro.svg', wrap(hl.svg, hl.width, hl.height, NAME));
const hw = horizontal({ word: C.white, sub: C.white, bg: 'none', ring: C.white, mono: C.white });
writeFileSync(out + 'logo-mc-branco.svg', wrap(hw.svg, hw.width, hw.height, NAME));
const hk = horizontal({ word: C.deep, sub: C.deep, bg: 'none', ring: C.deep, mono: C.deep });
writeFileSync(out + 'logo-mc-preto.svg', wrap(hk.svg, hk.width, hk.height, NAME));

// Favicon: face do tambor (anel laranja + centro) em círculo azul, legível a 16 px
writeFileSync(out + 'favicon.svg', wrap(`<rect width="64" height="64" rx="14" fill="${C.blue}"/><circle cx="32" cy="32" r="22" fill="${C.white}"/><circle cx="32" cy="32" r="13" fill="${C.orange}"/><circle cx="32" cy="32" r="6" fill="${C.deep}"/>`, 64, 64, 'M&C'));
console.log('logos ok', h.width);
