// Copia os arquivos oficiais do kit da marca (brand/kit) para o site.
// Rode depois de regenerar o kit: node scripts/sync-marca.mjs
import { copyFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const R = (p) => fileURLToPath(new URL(p, import.meta.url));
const KIT = R('../brand/kit/');

const logos = R('../src/assets/marca/');
rmSync(logos, { recursive: true, force: true });
mkdirSync(logos, { recursive: true });
for (const f of ['logo-mc-horizontal.svg', 'logo-mc-horizontal-fundo-claro.svg', 'simbolo-mc.svg']) copyFileSync(KIT + '02-logo/' + f, logos + f);

const pingo = R('../src/assets/pingo/');
rmSync(pingo, { recursive: true, force: true });
mkdirSync(pingo, { recursive: true });
for (const f of readdirSync(KIT + '03-mascote-pingo').filter((f) => f.endsWith('.svg'))) copyFileSync(KIT + '03-mascote-pingo/' + f, pingo + f.replace(/^pingo-/, ''));

// Ícones da aba e de app
copyFileSync(KIT + '02-logo/favicon.svg', R('../public/favicon.svg'));
copyFileSync(KIT + '02-logo/apple-touch-icon.png', R('../public/apple-touch-icon.png'));
copyFileSync(KIT + '02-logo/icon-512.png', R('../public/logo.png'));
console.log('marca sincronizada');
