# M & C Desentupidora - Ubatuba/SP

Site institucional e de captação da **M & C Desentupidora**, desentupidora 24h em Ubatuba-SP.
Construído com [Astro](https://astro.build) (HTML estático, zero JavaScript no cliente), focado em
SEO local e conversão por WhatsApp e telefone.

## Antes de publicar: troque os placeholders

Todos os dados da empresa ficam em **um único arquivo**: [`src/data/site.ts`](src/data/site.ts).
Procure por `PLACEHOLDER` e preencha:

| Campo | O que colocar |
| --- | --- |
| `phoneDigits` / `phoneDisplay` | Telefone real (ex.: `5512991234567` / `(12) 99123-4567`) |
| `whatsappDigits` | Número do WhatsApp com DDI 55 + DDD 12 |
| `url` | Domínio final (também usado no sitemap, canonical, robots e llms.txt) |
| `email`, `legalName`, `cnpj` | Dados reais da empresa |
| `address.street` | Endereço comercial, se houver (pode ficar vazio para empresa de área de atendimento) |
| `geo` | Coordenadas da base da empresa |
| `googleBusinessUrl`, `sameAs` | Link do Perfil da Empresa no Google e redes sociais |

Depois de trocar o telefone, rode `node scripts/make-images.mjs` para atualizar a imagem de
compartilhamento (`public/og.png`).

> O nome, endereço e telefone (NAP) precisam ser **idênticos** em todo lugar: site, Google
> Business Profile, Instagram, Facebook e diretórios. Isso é um dos fatores mais fortes de SEO local.

## Desenvolvimento

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # gera ./dist
npm run preview    # serve ./dist
npm run check:seo  # valida titles, descriptions, H1, canonical, JSON-LD e sitemap (após o build)
```

## Estrutura

```
src/
  data/site.ts        dados da empresa (fonte única)
  data/servicos.ts    conteúdo das 8 páginas de serviço
  data/bairros.ts     conteúdo das 13 páginas de bairro
  data/schema.ts      Schema.org (Plumber/LocalBusiness, Service, FAQPage, BreadcrumbList)
  pages/              rotas (home, /servicos/*, /bairros/*, /sobre, /contato)
  pages/robots.txt.ts robots.txt gerado (libera buscadores e robôs de IA)
  pages/llms.txt.ts   llms.txt e llms-full.txt para assistentes de IA
public/               favicon, logo e imagem OG
```

Para adicionar um serviço ou bairro, acrescente um item em `servicos.ts` ou `bairros.ts`: a página,
o sitemap, os links internos, o Schema e o llms.txt são gerados automaticamente. Escreva um texto
**único** para cada bairro (conteúdo duplicado em massa é penalizado pelo Google).

## Deploy

Pronto para Vercel (`vercel.json` com URLs limpas e headers de segurança) ou Netlify / Cloudflare
Pages (build `npm run build`, pasta `dist`).

Veja o [**SEO-CHECKLIST.md**](SEO-CHECKLIST.md) com os passos fora do código para chegar ao
primeiro lugar no Google.
