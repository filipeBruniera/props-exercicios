# M&C Fluxo · direção criativa (v1)

## Ideia
Desentupir é fazer a água voltar a correr. A marca inteira se organiza em torno do **fluxo**: uma linha de cano que atravessa as seções e, quando algo é resolvido, se enche de água azul correndo. O amarelo é o sinal de ação, como a sinalização de obra; o marinho é a frota e a confiança.

## Três elementos
1. **A etiqueta**: paralelogramo amarelo inclinado -8°, pensado como o adesivo do caminhão (conceito: a frota ainda não tem adesivo). Vira selo, botão, card de orçamento, aviso de status e, no fim, a faixa zebrada.
2. **O fluxo**: linha de cano marinho com tracejado azul que corre (stroke-dashoffset). Liga seções, mostra progresso e marca o "resolvido".
3. **O Pingo**: a gota d'água de capacete. Leveza para dicas e comemorações, nunca para preço ou prazo.

## Esqueleto do brand book
abertura com celular vivo (atendimento no WhatsApp) e entrada do Pingo → manifesto em tipo que acende com a rolagem → construção do logo → etiqueta em movimento (morph) → cor com contraste calculado → tipografia → mascote rigado → componentes → produto (painel do plantão + 4 telas) → números reais → jornada do cliente pinada → comunicação em galeria horizontal → princípios de movimento → comparativo sem/com M&C → CTA e rodapé.

## Regras técnicas
- Página única, independente: fontes, GSAP 3.12.5 e ScrollTrigger embutidos (funciona offline).
- Sem JS ou com prefers-reduced-motion: a página fica completa e parada.
- Curva única cubic-bezier(.2, 0, 0, 1); durações 150 / 250 / 400 ms.
- Valores de painel, orçamento e prazo sempre com a tag "exemplo".
