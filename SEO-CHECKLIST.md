# Checklist de SEO local: rumo ao 1º lugar em "desentupidora em Ubatuba"

O site já sai com a parte técnica pronta. Mas, para buscas locais, o Google pesa **muito** o que
acontece fora do site. Siga a ordem abaixo.

## Já feito no código

- [x] Title, description, canonical e H1 únicos por página (validados por `npm run check:seo`)
- [x] 8 páginas de serviço + 13 páginas de bairro com texto próprio, linkadas entre si
- [x] Schema.org: `Plumber`/`LocalBusiness` (NAP, 24h, área atendida), `Service`, `FAQPage`, `BreadcrumbList`, `WebSite`
- [x] `sitemap-index.xml`, `robots.txt` (libera Google, Bing e robôs de IA) e `llms.txt` / `llms-full.txt`
- [x] HTML estático, sem JavaScript no cliente: Lighthouse 100 em Performance, Acessibilidade, Boas práticas e SEO
- [x] Meta tags de geolocalização, Open Graph e imagem de compartilhamento
- [x] WhatsApp e telefone clicáveis em todas as páginas

## Semana 1: fundação (o que mais pesa)

1. **Trocar os placeholders** em `src/data/site.ts` (telefone, WhatsApp, domínio, e-mail).
2. **Registrar o domínio** (sugestão: `mcdesentupidoraubatuba.com.br`) e publicar (Vercel ou Netlify).
3. **Google Business Profile** (Perfil da Empresa no Google). É o fator nº 1 do "mapa" do Google.
   - Categoria principal: *Serviço de desentupimento* (ou "Desentupidora"); secundárias: *Encanador*, *Serviço de limpeza de fossa séptica*.
   - Marque como **empresa de área de atendimento** e adicione Ubatuba e os bairros.
   - Horário: aberto 24 horas. Link do site: o domínio. Telefone: o mesmo do site.
   - Cadastre cada serviço com descrição. Suba **fotos reais** (equipe, caminhão, equipamento, serviços).
   - Coloque o link do perfil em `googleBusinessUrl` no `site.ts`.
4. **Google Search Console**: verifique o domínio e envie `https://SEU-DOMINIO/sitemap-index.xml`.
5. **Bing Webmaster Tools**: importe do Search Console (alimenta o Copilot e o ChatGPT).

## Semanas 2 a 4: autoridade local

6. **Avaliações reais no Google**: peça a todo cliente satisfeito, com link direto, logo após o serviço.
   Responda a todas. Frequência constante vale mais que quantidade de uma vez. Nunca compre avaliações.
7. **Citações NAP idênticas** (mesmo nome, telefone e cidade): Apple Maps (Business Connect), Bing Places,
   Facebook, Instagram, Waze, GuiaMais, Apontador, TeleListas, Solutudo, Encontra Ubatuba e similares.
8. **Fotos reais no site**: adicione fotos da equipe e do caminhão na home e na página Sobre
   (há um comentário `TODO` em `src/pages/sobre.astro`). Isso reforça E-E-A-T.
9. **Links locais**: parcerias com imobiliárias, administradoras de condomínio, associações de
   pousadas e restaurantes de Ubatuba, que podem citar a M & C nos seus sites.

## Contínuo

10. Publique no Perfil da Empresa no Google toda semana (antes e depois, dicas, temporada).
11. Antes de cada temporada (novembro), atualize textos de prevenção e a data `lastUpdated` em `site.ts`.
12. Monitore no Search Console as buscas que trazem cliques e crie conteúdo para as que aparecem sem página dedicada.
13. Teste mensalmente no ChatGPT, Perplexity e Google: "desentupidora em Ubatuba", "limpeza de fossa Ubatuba",
    "desentupidora 24h Maranduba". Anote quem aparece e em que posição.

## O que NÃO fazer

- Não criar dezenas de páginas de bairro com texto copiado trocando só o nome (penalização por conteúdo em massa).
- Não usar um telefone no site e outro no Google: o NAP precisa bater.
- Não inventar avaliações, números ou selos. O Google e as IAs penalizam informação falsa.
