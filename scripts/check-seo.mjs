// Verificação de SEO on-page do build (rode depois de `npm run build`).
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => {
  const p = join(d, f);
  if (statSync(p).isDirectory()) walk(p);
  else if (p.endsWith('.html') && !p.endsWith('404.html')) files.push(p);
});
walk(dist);

const errors = [];
const titles = new Map();
const descs = new Map();
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const rel = f.replace(dist, '/');
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (!title) errors.push(`${rel}: sem <title>`);
  if (title.length > 65) errors.push(`${rel}: title com ${title.length} caracteres`);
  if (desc.length < 70 || desc.length > 165) errors.push(`${rel}: description com ${desc.length} caracteres`);
  if (h1s !== 1) errors.push(`${rel}: ${h1s} <h1>`);
  if (!/<link rel="canonical" href="https:\/\//.test(html)) errors.push(`${rel}: sem canonical absoluto`);
  if (/[–—]/.test(html.replace(/<script[\s\S]*?<\/script>/g, ''))) errors.push(`${rel}: contém travessão (em/en dash)`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { errors.push(`${rel}: JSON-LD inválido (${e.message})`); }
  }
  for (const m of html.matchAll(/<img [^>]*>/g)) if (!/\salt(=|[\s>])/.test(m[0])) errors.push(`${rel}: <img> sem alt`);
  titles.set(title, [...(titles.get(title) || []), rel]);
  descs.set(desc, [...(descs.get(desc) || []), rel]);
}
for (const [t, ps] of titles) if (ps.length > 1) errors.push(`title duplicado "${t}": ${ps.join(', ')}`);
for (const [d, ps] of descs) if (ps.length > 1) errors.push(`description duplicada: ${ps.join(', ')}`);

for (const f of ['robots.txt', 'llms.txt', 'llms-full.txt', 'sitemap-index.xml', 'og.png', 'logo.png']) {
  try { statSync(join(dist, f)); } catch { errors.push(`faltando dist/${f}`); }
}
const sitemap = readFileSync(join(dist, 'sitemap-0.xml'), 'utf8');
const locs = (sitemap.match(/<loc>/g) || []).length;
if (locs !== files.length) errors.push(`sitemap tem ${locs} URLs, mas há ${files.length} páginas`);

console.log(`${files.length} páginas verificadas, ${locs} URLs no sitemap.`);
const siteSrc = readFileSync(new URL('../src/data/site.ts', import.meta.url), 'utf8');
if (/90000-0000|5512900000000/.test(siteSrc)) {
  const msg = 'Telefone/WhatsApp ainda são PLACEHOLDER em src/data/site.ts. Troque antes de divulgar o site.';
  if (process.env.STRICT_PLACEHOLDER) errors.push(msg);
  else console.warn('\x1b[33mAVISO: ' + msg + '\x1b[0m');
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('SEO on-page: OK');
