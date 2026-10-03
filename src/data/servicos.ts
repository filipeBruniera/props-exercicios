export type Faq = { q: string; a: string };

export type Servico = {
  slug: string;
  nome: string;
  /** Rótulo curto para listas (ex.: "Pia") */
  curto: string;
  icon: string;
  title: string;
  description: string;
  h1: string;
  resumo: string;
  intro: string;
  sinais: string[];
  processo: { titulo: string; texto: string }[];
  prevencao: string[];
  faq: Faq[];
};

export const servicos: Servico[] = [
  {
    slug: 'desentupimento-de-pia',
    nome: 'Desentupimento de pia',
    curto: 'Pia de cozinha e banheiro',
    icon: 'cooking-pot',
    title: 'Desentupimento de Pia em Ubatuba 24h | M & C Desentupidora',
    description:
      'Pia de cozinha ou banheiro entupida em Ubatuba? A M & C desentope sem quebrar, com máquina rotativa e hidrojateamento. Atendimento 24h pelo WhatsApp.',
    h1: 'Desentupimento de pia em Ubatuba',
    resumo: 'Cozinha, banheiro e tanque. Sem quebrar azulejo.',
    intro:
      'Desentupimento de pia é a remoção da gordura, restos de comida e sabão que se acumulam no sifão e no ramal de esgoto. Em Ubatuba, a M & C atende cozinhas de casas, pousadas e restaurantes 24 horas, usando cabo rotativo e hidrojateamento para limpar o cano sem quebrar parede nem piso.',
    sinais: [
      'Água demorando para descer ou parada na cuba',
      'Cheiro forte de esgoto ou gordura vindo do ralo',
      'Barulho de borbulha quando a água escoa',
      'Água voltando no tanque ou no ralo da área de serviço',
    ],
    processo: [
      { titulo: 'Diagnóstico', texto: 'Verificamos sifão, ramal e caixa de gordura para achar o ponto exato da obstrução.' },
      { titulo: 'Desobstrução', texto: 'Usamos cabo rotativo com ponteira adequada ao diâmetro do cano. Sem soda cáustica.' },
      { titulo: 'Limpeza da tubulação', texto: 'Quando há gordura endurecida, aplicamos hidrojateamento para limpar a parede interna do cano.' },
      { titulo: 'Teste e orientação', texto: 'Testamos o escoamento com água corrente e mostramos o que evitar para não entupir de novo.' },
    ],
    prevencao: [
      'Não jogue óleo de fritura na pia. Guarde em garrafa PET e leve a um ponto de coleta.',
      'Use ralo com peneira para segurar restos de comida.',
      'Limpe a caixa de gordura periodicamente, principalmente em pousadas e restaurantes.',
    ],
    faq: [
      { q: 'Precisa quebrar a parede para desentupir a pia?', a: 'Na grande maioria dos casos, não. Com cabo rotativo e hidrojateamento acessamos o cano pelo próprio ralo ou pelo sifão, sem quebra.' },
      { q: 'Soda cáustica resolve pia entupida?', a: 'Não recomendamos. A soda pode endurecer a gordura, danificar canos de PVC antigos e causar queimaduras. A desobstrução mecânica é mais segura e duradoura.' },
      { q: 'Vocês atendem pia de restaurante e pousada?', a: 'Sim. Atendemos cozinhas comerciais em Ubatuba, inclusive fora do horário de funcionamento para não atrapalhar o serviço.' },
    ],
  },
  {
    slug: 'desentupimento-de-vaso-sanitario',
    nome: 'Desentupimento de vaso sanitário',
    curto: 'Vaso sanitário',
    icon: 'toilet',
    title: 'Desentupimento de Vaso Sanitário em Ubatuba 24h | M & C',
    description:
      'Vaso sanitário entupido ou transbordando em Ubatuba? Desentupimento de privada 24h sem remover a louça na maioria dos casos. Chame a M & C no WhatsApp.',
    h1: 'Desentupimento de vaso sanitário em Ubatuba',
    resumo: 'Privada entupida resolvida sem tirar a louça.',
    intro:
      'Desentupir vaso sanitário é remover o objeto ou o acúmulo que trava a curva do vaso ou o ramal até a caixa de inspeção. A M & C atende privadas entupidas em Ubatuba 24 horas, com equipamento próprio para vaso, na maioria das vezes sem precisar remover a louça do piso.',
    sinais: [
      'Água sobe quando você dá descarga',
      'Descarga fraca ou água descendo devagar',
      'Gorgolejo no vaso quando outro ralo da casa é usado',
      'Mau cheiro constante no banheiro',
    ],
    processo: [
      { titulo: 'Identificação', texto: 'Descobrimos se a obstrução está no vaso, no ramal ou na caixa de inspeção.' },
      { titulo: 'Desobstrução do vaso', texto: 'Usamos sonda própria para louça, com cuidado para não danificar o vaso.' },
      { titulo: 'Rede e caixa', texto: 'Se o problema é na rede, desobstruímos o trecho até a caixa de inspeção ou a fossa.' },
      { titulo: 'Teste de descarga', texto: 'Damos várias descargas seguidas para confirmar que o fluxo está normal.' },
    ],
    prevencao: [
      'Papel higiênico, só o necessário. Lenço umedecido, absorvente e fio dental vão no lixo.',
      'Em casas com fossa, use papel de boa dissolução.',
      'Se a casa ficou fechada fora de temporada, dê algumas descargas antes de receber hóspedes.',
    ],
    faq: [
      { q: 'Vocês precisam tirar o vaso do lugar?', a: 'Raramente. Só removemos a louça quando há objeto preso que não sai pela sonda, e sempre avisamos antes.' },
      { q: 'O vaso entope toda vez que chove. Por quê?', a: 'Em Ubatuba isso costuma indicar rede de esgoto recebendo água de chuva ou fossa cheia. Avaliamos a rede e a fossa para resolver a causa.' },
      { q: 'Atendem de madrugada?', a: 'Sim. O atendimento é 24 horas, todos os dias, inclusive feriados e alta temporada.' },
    ],
  },
  {
    slug: 'desentupimento-de-ralo',
    nome: 'Desentupimento de ralo',
    curto: 'Ralo e caixa sifonada',
    icon: 'shower',
    title: 'Desentupimento de Ralo em Ubatuba 24h | M & C',
    description:
      'Ralo de box, área de serviço ou quintal entupido em Ubatuba? Removemos cabelo, areia de praia e sabão acumulado. Atendimento 24h com a M & C.',
    h1: 'Desentupimento de ralo em Ubatuba',
    resumo: 'Box, área de serviço e quintal. Inclusive areia de praia.',
    intro:
      'Desentupimento de ralo é a limpeza do ralo e da caixa sifonada onde cabelo, sabão e, no litoral, areia de praia se acumulam. Em Ubatuba a areia é a causa mais comum de ralo de box e de chuveirão entupido. A M & C remove o material e limpa a tubulação até a saída.',
    sinais: [
      'Água acumulando no box durante o banho',
      'Ralo do quintal transbordando em dia de chuva',
      'Cheiro de esgoto subindo pelo ralo',
      'Areia ou lodo visível dentro da caixa sifonada',
    ],
    processo: [
      { titulo: 'Abertura da caixa sifonada', texto: 'Retiramos a grelha e o material acumulado na caixa.' },
      { titulo: 'Desobstrução do ramal', texto: 'Passamos cabo rotativo do ralo até a caixa de inspeção.' },
      { titulo: 'Lavagem', texto: 'Hidrojateamento leve para retirar areia e lodo da tubulação.' },
      { titulo: 'Conferência', texto: 'Testamos o escoamento e verificamos o fecho hídrico contra mau cheiro.' },
    ],
    prevencao: [
      'Use chuveirão externo para tirar a areia antes de entrar em casa.',
      'Instale grelha com tela fina nos ralos de box.',
      'Limpe a caixa sifonada a cada poucos meses.',
    ],
    faq: [
      { q: 'Areia de praia entope mesmo o ralo?', a: 'Sim. A areia é pesada e se deposita nas curvas do cano. Com o tempo forma um bloco que só sai com cabo rotativo ou hidrojateamento.' },
      { q: 'O ralo está com cheiro, mas não está entupido. Vocês resolvem?', a: 'Sim. Normalmente é fecho hídrico seco ou caixa sifonada sem vedação. Verificamos e corrigimos.' },
      { q: 'Quanto tempo leva?', a: 'Um ralo comum costuma ser resolvido em uma única visita. O prazo exato depende do ponto da obstrução.' },
    ],
  },
  {
    slug: 'desentupimento-de-esgoto',
    nome: 'Desentupimento de esgoto',
    curto: 'Rede de esgoto',
    icon: 'pipe',
    title: 'Desentupimento de Esgoto em Ubatuba 24h | M & C',
    description:
      'Esgoto entupido ou voltando em Ubatuba? Desentupimento de rede, caixa de inspeção e coluna de prédio 24h. Equipamento rotativo e hidrojateamento. M & C.',
    h1: 'Desentupimento de esgoto em Ubatuba',
    resumo: 'Rede, caixa de inspeção, coluna de prédio e condomínio.',
    intro:
      'Desentupimento de esgoto é a desobstrução da rede principal que liga os banheiros e a cozinha à rede pública ou à fossa. A M & C atende casas, condomínios, prédios e comércios em Ubatuba 24 horas, com máquina rotativa para redes longas e hidrojateamento para gordura e raízes.',
    sinais: [
      'Esgoto voltando pelo ralo mais baixo da casa',
      'Caixa de inspeção transbordando no quintal',
      'Vários pontos da casa entupidos ao mesmo tempo',
      'Mau cheiro forte no terreno',
    ],
    processo: [
      { titulo: 'Localização', texto: 'Abrimos as caixas de inspeção para encontrar o trecho obstruído.' },
      { titulo: 'Desobstrução', texto: 'Máquina rotativa com cabo longo, adequada a redes de 100 mm ou mais.' },
      { titulo: 'Hidrojateamento', texto: 'Jato de alta pressão remove gordura, areia e raízes da parede do tubo.' },
      { titulo: 'Relatório', texto: 'Explicamos a causa e indicamos se há cano quebrado, desnível ou raiz que precise de reparo.' },
    ],
    prevencao: [
      'Mantenha as caixas de inspeção acessíveis e tampadas.',
      'Evite plantar árvores de raiz agressiva perto da rede de esgoto.',
      'Em condomínio, faça limpeza preventiva da rede antes da temporada.',
    ],
    faq: [
      { q: 'Esgoto voltando pelo ralo é emergência?', a: 'Sim. Há risco de contaminação e danos ao piso. Chame pelo WhatsApp que priorizamos o atendimento.' },
      { q: 'Atendem condomínios e prédios?', a: 'Sim. Fazemos desentupimento de coluna, rede coletiva e manutenção preventiva para condomínios em Ubatuba.' },
      { q: 'A culpa é da rede da Sabesp?', a: 'Às vezes o problema está na rede pública. Verificamos a rede interna do imóvel até o limite da calçada e informamos se o problema está do lado de fora.' },
    ],
  },
  {
    slug: 'limpeza-de-caixa-de-gordura',
    nome: 'Limpeza de caixa de gordura',
    curto: 'Caixa de gordura',
    icon: 'drop',
    title: 'Limpeza de Caixa de Gordura em Ubatuba | M & C',
    description:
      'Limpeza e desentupimento de caixa de gordura em Ubatuba para casas, pousadas e restaurantes. Retirada correta dos resíduos. Agende com a M & C.',
    h1: 'Limpeza de caixa de gordura em Ubatuba',
    resumo: 'Casas, pousadas e restaurantes. Manutenção periódica.',
    intro:
      'A caixa de gordura separa o óleo e a gordura da água da cozinha antes que cheguem à rede de esgoto. Quando enche, a pia entope e o quintal cheira mal. A M & C faz a limpeza completa da caixa de gordura em Ubatuba, com retirada dos resíduos e desobstrução das entradas e saídas.',
    sinais: [
      'Pia da cozinha lenta mesmo depois de desentupida',
      'Cheiro de gordura rançosa no quintal',
      'Tampa da caixa com gordura vazando',
      'Moscas e baratas perto da caixa',
    ],
    processo: [
      { titulo: 'Abertura', texto: 'Abrimos a caixa e avaliamos o volume de gordura acumulada.' },
      { titulo: 'Retirada', texto: 'Removemos a camada de gordura e o lodo do fundo.' },
      { titulo: 'Desobstrução', texto: 'Limpamos o tubo de entrada da cozinha e o de saída para a rede.' },
      { titulo: 'Fechamento', texto: 'Conferimos a vedação da tampa e indicamos a frequência ideal de limpeza.' },
    ],
    prevencao: [
      'Restaurantes e pousadas costumam precisar de limpeza mais frequente do que residências.',
      'Raspe pratos e panelas no lixo antes de lavar.',
      'Nunca descarte óleo usado na pia.',
    ],
    faq: [
      { q: 'De quanto em quanto tempo limpar a caixa de gordura?', a: 'Depende do uso. Em casa costuma ser algumas vezes por ano. Em restaurante pode ser mensal. Avaliamos e indicamos a frequência certa para o seu caso.' },
      { q: 'Minha casa não tem caixa de gordura. É obrigatório?', a: 'É altamente recomendado. Sem ela a gordura vai direto para a rede ou para a fossa e causa entupimentos frequentes. Podemos orientar a instalação.' },
      { q: 'Vocês fazem contrato de manutenção?', a: 'Sim, para comércios, pousadas e condomínios. Fale conosco pelo WhatsApp.' },
    ],
  },
  {
    slug: 'limpeza-de-fossa',
    nome: 'Limpeza de fossa',
    curto: 'Fossa séptica',
    icon: 'truck',
    title: 'Limpeza de Fossa Séptica em Ubatuba | M & C',
    description:
      'Limpeza e esgotamento de fossa séptica e sumidouro em Ubatuba, inclusive em bairros sem rede de esgoto. Orientação de manutenção. Agende com a M & C.',
    h1: 'Limpeza de fossa em Ubatuba',
    resumo: 'Fossa séptica, filtro e sumidouro em bairros sem rede.',
    intro:
      'Limpeza de fossa é a retirada do lodo acumulado na fossa séptica para que ela volte a tratar o esgoto da casa. Muitos bairros e praias de Ubatuba ainda dependem de fossa e sumidouro. A M & C faz o esgotamento, a limpeza e a orientação de manutenção, com destinação adequada do resíduo.',
    sinais: [
      'Vasos e ralos lentos em toda a casa',
      'Cheiro forte perto da tampa da fossa',
      'Terreno úmido ou afundando em volta da fossa',
      'Esgoto voltando depois de chuva forte',
    ],
    processo: [
      { titulo: 'Avaliação', texto: 'Localizamos a fossa e o sumidouro e verificamos o nível de lodo.' },
      { titulo: 'Esgotamento', texto: 'Retiramos o conteúdo com caminhão de sucção.' },
      { titulo: 'Desobstrução', texto: 'Limpamos a entrada da casa até a fossa e a ligação com o sumidouro.' },
      { titulo: 'Orientação', texto: 'Indicamos o intervalo de limpeza conforme o número de moradores e o uso da casa.' },
    ],
    prevencao: [
      'Casa de temporada lota no verão: programe a limpeza antes de dezembro.',
      'Não jogue gordura, produtos químicos fortes ou lenço umedecido no vaso.',
      'Mantenha a tampa da fossa localizada e acessível.',
    ],
    faq: [
      { q: 'Como saber se a fossa está cheia?', a: 'Os sinais mais comuns são ralos lentos em toda a casa, cheiro forte perto da tampa e terreno úmido em volta. Uma avaliação confirma.' },
      { q: 'Meu bairro não tem rede de esgoto. Vocês atendem?', a: 'Sim. Atendemos bairros e praias de Ubatuba que dependem de fossa, do sul ao norte do município.' },
      { q: 'Para onde vai o resíduo?', a: 'O resíduo é transportado e descartado em local licenciado para receber esse material.' },
    ],
  },
  {
    slug: 'hidrojateamento',
    nome: 'Hidrojateamento',
    curto: 'Hidrojateamento',
    icon: 'drop-half',
    title: 'Hidrojateamento em Ubatuba | Limpeza de Tubulação | M & C',
    description:
      'Hidrojateamento de alta pressão em Ubatuba para limpar tubulações, redes de esgoto, galerias e caixas. Remove gordura, areia e raízes. M & C Desentupidora.',
    h1: 'Hidrojateamento em Ubatuba',
    resumo: 'Água em alta pressão para gordura, areia e raízes.',
    intro:
      'Hidrojateamento é a limpeza da tubulação com jato de água em alta pressão, que raspa a gordura, a areia e as raízes presas na parede do cano. É indicado quando o entupimento volta com frequência. A M & C usa hidrojateamento em Ubatuba para redes de casas, condomínios, comércios e galerias pluviais.',
    sinais: [
      'O mesmo ralo entope várias vezes no ano',
      'Rede com muita gordura de cozinha comercial',
      'Areia acumulada em galerias e calhas',
      'Raízes invadindo a tubulação',
    ],
    processo: [
      { titulo: 'Inspeção', texto: 'Avaliamos o diâmetro e o material do cano para ajustar a pressão.' },
      { titulo: 'Jateamento', texto: 'O bico avança pela tubulação raspando as paredes em 360 graus.' },
      { titulo: 'Retirada do resíduo', texto: 'Recolhemos o material solto nas caixas de inspeção.' },
      { titulo: 'Teste', texto: 'Conferimos o escoamento ao final.' },
    ],
    prevencao: [
      'Restaurantes e condomínios se beneficiam de hidrojateamento preventivo periódico.',
      'Limpe calhas e grelhas de águas pluviais antes da época de chuvas.',
    ],
    faq: [
      { q: 'Hidrojateamento danifica o cano?', a: 'Não, quando a pressão é ajustada ao tipo e à idade da tubulação. Fazemos essa avaliação antes de começar.' },
      { q: 'Qual a diferença para o desentupimento comum?', a: 'O cabo rotativo abre passagem. O hidrojateamento limpa a parede inteira do cano, o que reduz a chance de o entupimento voltar.' },
      { q: 'Serve para galeria de água de chuva?', a: 'Sim. É muito usado para retirar areia e folhas de galerias pluviais no litoral.' },
    ],
  },
  {
    slug: 'deteccao-de-vazamento',
    nome: 'Detecção de vazamento',
    curto: 'Caça vazamento',
    icon: 'magnifying-glass',
    title: 'Caça Vazamento em Ubatuba | Detecção de Vazamento | M & C',
    description:
      'Conta de água alta ou parede úmida em Ubatuba? Detecção de vazamentos em tubulações de água com mínima quebra. Agende com a M & C Desentupidora.',
    h1: 'Detecção de vazamento em Ubatuba',
    resumo: 'Conta de água alta ou parede úmida. Mínima quebra.',
    intro:
      'Detecção de vazamento, também chamada de caça vazamento, é a localização do ponto exato onde a tubulação de água está perdendo água, antes de qualquer quebra. A M & C atende em Ubatuba casas, apartamentos e comércios com conta de água alta, paredes úmidas ou pisos com manchas.',
    sinais: [
      'Conta de água subindo sem mudança de consumo',
      'Hidrômetro girando com todas as torneiras fechadas',
      'Mancha, bolor ou tinta estufando na parede',
      'Barulho de água correndo dentro da parede',
    ],
    processo: [
      { titulo: 'Teste do hidrômetro', texto: 'Confirmamos se há vazamento com todos os pontos fechados.' },
      { titulo: 'Setorização', texto: 'Isolamos trechos da rede para reduzir a área de busca.' },
      { titulo: 'Localização', texto: 'Usamos equipamentos de detecção para apontar o local do vazamento.' },
      { titulo: 'Indicação do reparo', texto: 'Marcamos o ponto exato para que a quebra seja a menor possível.' },
    ],
    prevencao: [
      'Confira o hidrômetro de vez em quando com tudo fechado.',
      'Casas de temporada: feche o registro geral quando ficarem vazias.',
    ],
    faq: [
      { q: 'Precisa quebrar a casa toda para achar o vazamento?', a: 'Não. O objetivo da detecção é justamente encontrar o ponto exato e quebrar só o necessário.' },
      { q: 'Vazamento pode estar no quintal?', a: 'Sim. Vazamentos no ramal entre o hidrômetro e a casa são comuns e também são localizados.' },
      { q: 'Vocês fazem o reparo também?', a: 'Fale conosco pelo WhatsApp. Informamos na visita se o reparo é feito pela nossa equipe ou indicamos o profissional adequado.' },
    ],
  },
];

export const getServico = (slug: string) => servicos.find((s) => s.slug === slug);
