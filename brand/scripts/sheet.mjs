// Junta prints numa folha de contato. Uso: node brand/scripts/sheet.mjs <pasta> <prefixo> <saida> [colunas] [largura]
import { chromium } from 'playwright';
import { readdirSync, readFileSync } from 'node:fs';
const [dir, prefix, out, cols = 3, w = 1600] = process.argv.slice(2);
const files = readdirSync(dir).filter((f) => f.startsWith(prefix) && f.endsWith('.png')).sort();
const imgs = files.map((f) => `<img src="data:image/png;base64,${readFileSync(dir + '/' + f).toString('base64')}">`).join('');
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +w, height: 800 } });
await p.setContent(`<body style="margin:0;background:#222;display:grid;grid-template-columns:repeat(${cols},1fr);gap:6px;padding:6px">${imgs}<style>img{width:100%;display:block}</style></body>`);
await p.screenshot({ path: out, fullPage: true, type: 'jpeg', quality: 80 }); await b.close();
