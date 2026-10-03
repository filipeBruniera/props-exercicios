# M&C Desentupidora · identidade oficial

A identidade vem da prancha e da logo do cliente. Este kit redesenha a logo em vetor e organiza cores, fontes e mascote para o site e para peças novas.

## Logo
- **Circular (principal):** "DESENTUPIDORA - M&C UBATUBA" em arco no alto, a máquina desentupidora rotativa no centro, traços laranja nas laterais e "Solução em desentupimento para residências e comércios" em laranja embaixo.
- **Horizontal:** símbolo (a máquina dentro do círculo) + "M&C" + "DESENTUPIDORA · UBATUBA". Para cabeçalho de site, assinatura de e-mail e rodapé de post.
- **Símbolo:** só a máquina no círculo. Avatar, ícone de app e favicon (o favicon simplifica a face do tambor para ler a 16 px).
- Versões: colorida, negativa (branca) e uma cor (azul-escuro). Letras em curva: nunca redigitar com fonte.
- O desenho foi redesenhado em SVG a partir do JPG do cliente, com traço mais limpo. Se o designer original tiver o arquivo vetorial, compare e ajuste.

## Cores (prancha oficial)
| Cor | Hex | Uso |
|---|---|---|
| Azul M&C | #004BA9 | Principal: marca, fundos de destaque, títulos no claro |
| Laranja M&C | #F2680C | Ação: botões, selos, telefone, detalhes da máquina |
| Cinza M&C | #E3E3E3 | Fundo claro |
| Azul-escuro (apoio) | #002B63 | Fundos escuros, contornos, texto forte |
| Tinta (apoio) | #0B1F3F | Texto; texto sobre laranja |
| Laranja texto (apoio) | #9A3D00 | Laranja quando for texto sobre fundo claro |

Regras de contraste: laranja nunca como texto sobre o azul #004BA9 (2,6:1). Sobre laranja, texto tinta #0B1F3F (5,3:1); branco só em título grande. Branco sobre azul #004BA9 passa com folga (8,1:1).

## Fontes
| Papel | Oficial | Na web (grátis) |
|---|---|---|
| Títulos | Koela | Cormorant Garamond 600/700, caixa alta |
| Texto | Century Gothic | Questrial 400 |
| Apoio | Julius Sans One | Julius Sans One 400 (a mesma) |

Koela e Century Gothic são pagas. Se o cliente tiver a licença para web, troque nos tokens (`--display` e `--body`).

**Regra de legibilidade:** a serifa de título (Koela/Cormorant) só de 28 px para cima (h1, h2, números grandes): abaixo disso os traços finos somem. Botões, menu, selos, h3 e títulos de card usam a Questrial em caixa alta, com espaçamento de 0,05 em (token `--ui`). Julius Sans One nunca abaixo de 12 px.

## Mascote: Mola
A máquina desentupidora da logo, com vida. A face do tambor é o rosto (aro laranja em volta), o cabo-mola faz os braços, as luvas são laranja, o motor azul tem tampa laranja com uma molinha em espiral no topo (o "topete") e a roda do carrinho gira quando ela anda. Nome provisório: "Mola", por causa do cabo da máquina.

### Regras de desenho (v2, a partir de boas práticas de mascote)
1. **Silhueta primeiro.** Pintada de preto, a Mola tem de continuar reconhecível: tambor redondo, molinha no topo, alça e braços para fora do corpo. Teste sempre em uma cor só.
2. **Contorno branco de adesivo.** Todas as poses têm contorno branco grosso, que separa a Mola de qualquer fundo (branco, cinza, azul ou laranja). Não remover.
3. **Pouco detalhe.** 4 parafusos, 2 aletas, uma roda. Detalhe a mais vira borrão em tamanho pequeno.
4. **Versão pequena.** Abaixo de 96 px, usar a pose "rosto" (só o tambor com rosto e aro): avatar, ícone, foto de perfil do WhatsApp.
5. **Olhos e boca carregam a personalidade.** Olhos grandes com dois brilhos, sobrancelha marcada, boca sempre com traço (nunca sem boca).
6. **Gesto claro.** Um gesto por peça (acenar, apontar, mostrar, comemorar), com leve inclinação de até 4° para dar energia.

### Uso
- Usar em dicas de prevenção, passo a passo do atendimento e comemoração de serviço resolvido.
- Não usar em anúncio de preço ou prazo. Não trocar cores, não deformar, não tirar o aro laranja nem o contorno branco.

## Forma
- Cantos suaves (6 px), círculos (números de passo, ícones) que ecoam a logo.
- Divisor: traço laranja tracejado, como na prancha.
- Botão principal laranja com texto tinta; secundário azul com texto branco; WhatsApp verde.

## Movimento
Uma curva só, `cubic-bezier(.2, 0, 0, 1)`, e três durações (150, 250 e 400 ms). Tudo respeita "menos movimento" no aparelho.
