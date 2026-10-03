# M&C Desentupidora · Kit da marca (identidade oficial, v2)

Este kit traz a identidade oficial da M&C Desentupidora (cores, fontes e logo da prancha do cliente), com a logo redesenhada em vetor e a mascote Mola, prontos para criar peças novas no mesmo padrão (no Claude Design em claude.ai/design, no Canva, no Figma ou com um designer).

## Como começar
1. Abra `01-brand-book/mc-brand-book.html` no navegador e role até o fim. É a referência viva: logo, cores, fontes, mascote, componentes e telas. Funciona sem internet (fontes e scripts estão dentro do arquivo).
2. Para criar peças novas no Claude Design, anexe:
   - `02-logo/png/` (logos em PNG transparente)
   - `03-mascote-mola/png/` (as poses que for usar) e `03-mascote-mola/folha-de-personagem.png`
   - `04-tokens/tokens-mc.css`
   - 3 a 5 prints de `06-prints-de-referencia/`
   - `08-textos-da-marca/BRIEF-DA-MARCA.md` e `IDENTIDADE.md`
3. Cole o prompt-base do fim deste arquivo e descreva a peça.

## O que tem em cada pasta
| Pasta | Conteúdo |
|---|---|
| `01-brand-book/` | O brand book completo em um único HTML. |
| `02-logo/` | Logo em SVG com letras em curva: circular (colorida, branca e uma cor), horizontal (fundo escuro e claro, branca e uma cor), símbolo, símbolo branco e favicon. `png/` traz tudo em PNG transparente de alta resolução, mais ícones de app. |
| `03-mascote-mola/` | A Mola em 9 combinações de expressão e pose, em SVG e PNG transparente (alta resolução), a folha de personagem e o `mola-animada.js` (rig: piscar, olhar, girar o aro, andar, pular, comemorar). O rig desenha a Mola sozinho, mas para animar precisa do GSAP 3 carregado na página (`gsap.min.js`); sem ele, a mascote aparece parada. |
| `04-tokens/` | `tokens-mc.css` (cores, forma, fontes, movimento) e `tokens-base-contraste-testado.json` (paleta com contraste WCAG calculado). |
| `05-fotos/` | Imagem de compartilhamento. Fotos reais da equipe ainda precisam ser feitas. |
| `06-prints-de-referencia/` | Prints de cada seção, em desktop e celular, e folhas de contato. |
| `07-codigo-fonte/` | Fontes da página e scripts de geração (logo, kit, prints, verificação de layout). Os scripts rodam a partir do repositório do site. |
| `08-textos-da-marca/` | Brief da marca e identidade oficial. |

## Regras da marca (resumo)
- **Logo:** use os arquivos oficiais; não redigite nem redesenhe. A circular é a principal; a horizontal vai em cabeçalhos; o símbolo em avatar e favicon.
- **Cores oficiais:** azul #004BA9, laranja #F2680C, cinza #E3E3E3. Apoio: azul-escuro #002B63, tinta #0B1F3F, laranja texto #9A3D00.
- **Laranja:** nunca como texto sobre o azul. Sobre laranja, texto tinta #0B1F3F.
- **Fontes:** oficiais Koela, Century Gothic e Julius Sans One. Na web: Cormorant Garamond (títulos, caixa alta), Questrial (texto), Julius Sans One (apoio). Todas as da web são gratuitas.
- **Forma:** cantos suaves de 6 px, círculos que ecoam a logo, traço laranja tracejado como divisor.
- **Mascote Mola:** não trocar as cores, não tirar o aro laranja, não deformar. Usar em dicas e comemorações, nunca em preço ou prazo.
- **Números:** valores de orçamento, prazo e painel são sempre marcados como exemplo.
- **Pendente:** telefone (12) 90000-0000 e domínio são provisórios. Confirme antes de publicar qualquer peça.

## Prompt-base para o Claude Design
```
Use o kit anexo da M&C Desentupidora (identidade oficial) como sistema visual obrigatório.
- Logo e símbolo: use os PNG/SVG anexos, sem redesenhar nem redigitar.
- Cores e fontes: siga tokens-mc.css (azul #004BA9 de base, laranja #F2680C só para ação e nunca como texto sobre o azul, cinza #E3E3E3 de fundo claro; Cormorant Garamond em caixa alta para títulos, Questrial para texto, Julius Sans One para rótulos).
- Forma: cantos suaves, círculos, traço laranja tracejado como divisor.
- Mascote Mola (a máquina desentupidora com rosto): use as poses anexas quando fizer sentido; não altere cores nem proporções.
- Tom: português do Brasil, direto e tranquilizador, para quem está com um entupimento em Ubatuba. Plantão 24 horas, sem quebra-quebra, preço combinado antes.
- Telefone sempre visível. Valores de preço/prazo sempre marcados como exemplo.
Peça que quero agora: [ex.: 3 posts 1080×1350 sobre limpeza de fossa antes da temporada; story 1080×1920 "Plantão 24h"; adesivo do carro]
```
