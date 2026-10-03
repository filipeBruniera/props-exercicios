# M&C Desentupidora · brand book e kit da marca (identidade oficial)

Brand book vivo da M&C Desentupidora (uma página única, animada) e o kit de arquivos da marca.

- `site/` é o que vai ao ar: `index.html` (brand book independente) e `downloads/kit-marca-mc-desentupidora.zip`.
- `kit/` é o conteúdo do zip: logos, mascote Mola, tokens, prints, código-fonte e textos.
- `src/` tem as fontes da página: `page.html`, `page.css`, `page.js` e `mola.js` (rig da mascote).
- `scripts/` gera tudo.

## Regerar
```bash
node brand/scripts/make-logo.mjs   # SVGs oficiais (letras em curva)
node brand/scripts/build.mjs       # brand/site/index.html
node brand/scripts/shots.mjs /tmp/prints   # prints (opcional, para kit/06)
node brand/scripts/make-kit.mjs    # PNGs, poses da Mola, tokens e zip
```
Telefone, WhatsApp, e-mail e site vêm de `src/data/site.ts` (o mesmo arquivo do site). Troque lá e rode os scripts de novo.

## Publicar
Projeto estático: na Vercel, Root Directory `brand/site`, sem comando de build.
