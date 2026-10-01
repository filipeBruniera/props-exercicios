# M&C Desentupidora · Kit da marca "Fluxo" (v1)

Este kit traz todos os elementos do brand book vivo da M&C Desentupidora, prontos para criar peças novas no mesmo padrão (no Claude Design em claude.ai/design, no Canva, no Figma ou com um designer).

## Como começar
1. Abra `01-brand-book/mc-fluxo-brand-book.html` no navegador e role até o fim. É a referência viva: movimento, mascote, componentes e telas. Funciona sem internet (fontes e scripts estão dentro do arquivo).
2. Para criar peças novas no Claude Design, anexe:
   - `02-logo/png/` (logos em PNG transparente)
   - `03-mascote-pingo/png/` (as poses que for usar) e `03-mascote-pingo/folha-de-personagem.png`
   - `04-tokens/tokens-mc-fluxo.css`
   - 3 a 5 prints de `06-prints-de-referencia/`
   - `08-textos-da-marca/BRIEF-DA-MARCA.md`
3. Cole o prompt-base do fim deste arquivo e descreva a peça.

## O que tem em cada pasta
| Pasta | Conteúdo |
|---|---|
| `01-brand-book/` | O brand book completo em um único HTML. |
| `02-logo/` | Logo em SVG com letras em curva: horizontal (fundo escuro e claro), vertical, branco, preto, símbolo, símbolo branco, favicon. `png/` traz tudo em PNG transparente de alta resolução, mais ícones de app. |
| `03-mascote-pingo/` | O Pingo em 9 combinações de expressão e pose, em SVG e PNG transparente (alta resolução), a folha de personagem e o `pingo-animado.js` (rig: piscar, olhar, pular, comemorar). O rig desenha o Pingo sozinho, mas para animar precisa do GSAP 3 carregado na página (`gsap.min.js`); sem ele, o mascote aparece parado. |
| `04-tokens/` | `tokens-mc-fluxo.css` (cores, forma, fontes, movimento) e `tokens-base-contraste-testado.json` (paleta com contraste WCAG calculado). |
| `05-fotos/` | Imagem de compartilhamento. Fotos reais da equipe ainda precisam ser feitas. |
| `06-prints-de-referencia/` | Prints de cada seção, em desktop e celular, e folhas de contato. |
| `07-codigo-fonte/` | Fontes da página e scripts de geração (logo, kit, prints, verificação de layout). Os scripts rodam a partir do repositório do site. |
| `08-textos-da-marca/` | Brief da marca e direção criativa. |

## Regras da marca (resumo)
- **Símbolo:** etiqueta amarela #FFC400 inclinada -8°, "M&C" em Barlow Condensed 800 asfalto #0D1B2A, gota azul #3B8CFF caindo no canto superior direito. Use os arquivos oficiais; não redigite nem redesenhe.
- **Cores:** marinho #0B2545 (base), amarelo #FFC400 (ação), azul água #3B8CFF (só para água/fluxo), asfalto #0D1B2A, gelo #F3F5F7.
- **Amarelo:** nunca como texto sobre fundo claro. No claro, vira fundo de botão ou etiqueta com texto asfalto.
- **Fontes:** Barlow Condensed (títulos, caixa alta), Barlow (texto), JetBrains Mono (números). Todas gratuitas (Google Fonts).
- **Forma:** etiqueta inclinada, cantos de no máximo 4 px, faixa zebrada amarelo/asfalto como divisor.
- **Mascote Pingo:** não trocar as cores, não tirar o capacete, não deformar. Usar em dicas e comemorações, nunca em preço ou prazo.
- **Números:** valores de orçamento, prazo e painel são sempre marcados como exemplo.
- **Pendente:** telefone (12) 90000-0000 e domínio são provisórios. Confirme antes de publicar qualquer peça.

## Prompt-base para o Claude Design
```
Use o kit anexo da M&C Desentupidora (brand book "Fluxo") como sistema visual obrigatório.
- Logo e símbolo: use os PNG/SVG anexos, sem redesenhar nem redigitar.
- Cores e fontes: siga tokens-mc-fluxo.css (marinho #0B2545 de base, amarelo #FFC400 só para ação, azul água #3B8CFF só para água; Barlow Condensed em caixa alta para títulos, Barlow para texto, JetBrains Mono para números).
- Forma: etiqueta inclinada -8°, cantos de no máximo 4 px, faixa zebrada amarelo/asfalto como divisor.
- Mascote Pingo: use as poses anexas quando fizer sentido; não altere cores nem proporções.
- Tom: português do Brasil, direto e tranquilizador, para quem está com um entupimento em Ubatuba. Plantão 24 horas, sem quebra-quebra, preço combinado antes.
- Telefone sempre visível. Valores de preço/prazo sempre marcados como exemplo.
Peça que quero agora: [ex.: 3 posts 1080×1350 sobre limpeza de fossa antes da temporada; story 1080×1920 "Plantão 24h"; adesivo do caminhão]
```
