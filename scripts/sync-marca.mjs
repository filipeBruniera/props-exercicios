// Copia os arquivos oficiais do kit da marca (brand/kit) para o site.
// Rode depois de regenerar o kit: node scripts/sync-marca.mjs
import { copyFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const R = (p) => fileURLToPath(new URL(p, import.meta.url));
const KIT = R('../brand/kit/');

const logos = R('../src/assets/marca/');
rmSync(logos, { recursive: true, force: true });
mkdirSync(logos, { recursive: true });
for (const f of ['logo-mc-horizontal.svg', 'logo-mc-horizontal-fundo-claro.svg', 'logo-mc-circular.svg', 'logo-mc-circular-branco.svg', 'simbolo-mc.svg']) copyFileSync(KIT + '02-logo/' + f, logos + f);

rmSync(R('../src/assets/pingo/'), { recursive: true, force: true }); // mascote antigo
const mascote = R('../src/assets/mascote/');
rmSync(mascote, { recursive: true, force: true });
mkdirSync(mascote, { recursive: true });
for (const f of readdirSync(KIT + '03-mascote-mola').filter((f) => f.endsWith('.svg'))) copyFileSync(KIT + '03-mascote-mola/' + f, mascote + f.replace(/^mola-/, ''));

// Ícones da aba e de app
copyFileSync(KIT + '02-logo/favicon.svg', R('../public/favicon.svg'));
copyFileSync(KIT + '02-logo/apple-touch-icon.png', R('../public/apple-touch-icon.png'));
// public/logo.png (logo circular para o schema) e public/og.png saem de scripts/make-images.mjs
console.log('marca sincronizada');
