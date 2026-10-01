export type Bairro = {
  slug: string;
  nome: string;
  /** Preposição correta em português: "no Centro", "na Enseada", "em Picinguaba" */
  prep: 'no' | 'na' | 'nas' | 'em';
  regiao: 'Região Sul' | 'Região Central' | 'Região Norte';
  intro: string;
  contexto: string;
  servicos: string[];
  vizinhos: string[];
};

export const bairros: Bairro[] = [
  {
    slug: 'centro',
    nome: 'Centro',
    prep: 'no',
    regiao: 'Região Central',
    intro:
      'No Centro de Ubatuba a M & C atende lojas, restaurantes, consultórios, prédios e casas antigas, 24 horas por dia.',
    contexto:
      'O comércio do Centro concentra cozinhas com uso intenso e redes de esgoto mais antigas. Pias de restaurante e caixas de gordura cheias são os chamados mais comuns, junto com colunas de prédio entupidas. Sempre que possível atendemos comércios fora do horário de movimento.',
    servicos: ['limpeza-de-caixa-de-gordura', 'desentupimento-de-esgoto', 'desentupimento-de-pia'],
    vizinhos: ['itagua', 'pereque-acu', 'praia-grande'],
  },
  {
    slug: 'itagua',
    nome: 'Itaguá',
    prep: 'no',
    regiao: 'Região Central',
    intro:
      'No Itaguá atendemos a orla de restaurantes e quiosques, pousadas, prédios e as casas das ruas internas do bairro.',
    contexto:
      'Com tantas cozinhas comerciais perto da orla, a gordura é a principal causa de entupimento no Itaguá. Areia trazida da praia também acaba nos ralos de área externa e chuveirões. Hidrojateamento preventivo antes da temporada evita parar a cozinha no pico de movimento.',
    servicos: ['limpeza-de-caixa-de-gordura', 'hidrojateamento', 'desentupimento-de-ralo'],
    vizinhos: ['centro', 'praia-grande', 'pereque-acu'],
  },
  {
    slug: 'pereque-acu',
    nome: 'Perequê-Açu',
    prep: 'no',
    regiao: 'Região Central',
    intro:
      'No Perequê-Açu a M & C atende casas, sobrados e pequenos prédios residenciais, com desentupimento 24 horas.',
    contexto:
      'Bairro residencial próximo ao Centro, o Perequê-Açu tem muitas casas de moradores fixos. Vaso sanitário, ralo de box e caixa de inspeção do quintal estão entre os atendimentos mais frequentes, principalmente depois de chuvas fortes.',
    servicos: ['desentupimento-de-vaso-sanitario', 'desentupimento-de-ralo', 'desentupimento-de-esgoto'],
    vizinhos: ['centro', 'itagua', 'itamambuca'],
  },
  {
    slug: 'praia-grande',
    nome: 'Praia Grande',
    prep: 'na',
    regiao: 'Região Central',
    intro:
      'Na Praia Grande atendemos prédios, condomínios, pousadas e casas de temporada, com desentupimento a qualquer hora.',
    contexto:
      'A Praia Grande recebe muitos visitantes na temporada, e os imóveis passam de vazios a lotados em poucos dias. É comum o esgoto travar justamente no feriado. Fazemos desentupimento de coluna de prédio, ralos com areia e manutenção preventiva para administradoras de imóveis.',
    servicos: ['desentupimento-de-esgoto', 'desentupimento-de-ralo', 'hidrojateamento'],
    vizinhos: ['toninhas', 'itagua', 'centro'],
  },
  {
    slug: 'toninhas',
    nome: 'Toninhas',
    prep: 'nas',
    regiao: 'Região Sul',
    intro:
      'Nas Toninhas a M & C atende casas de veraneio, condomínios e pousadas, 24 horas por dia.',
    contexto:
      'As Toninhas reúnem casas de veraneio e condomínios horizontais. Quando os imóveis ficam fechados por meses, a gordura seca no cano e entope no primeiro uso. Também atendemos fossas em imóveis que ainda não estão ligados à rede.',
    servicos: ['desentupimento-de-pia', 'limpeza-de-fossa', 'desentupimento-de-vaso-sanitario'],
    vizinhos: ['praia-grande', 'enseada', 'centro'],
  },
  {
    slug: 'enseada',
    nome: 'Enseada',
    prep: 'na',
    regiao: 'Região Sul',
    intro:
      'Na Enseada atendemos condomínios, casas de temporada e pousadas, 24 horas, inclusive em feriados prolongados.',
    contexto:
      'A Enseada tem grande número de casas de veraneio e condomínios fechados. Programamos limpeza de fossa e de caixa de gordura antes do verão, e atendemos emergências de vaso e esgoto quando a casa está cheia de hóspedes.',
    servicos: ['limpeza-de-fossa', 'desentupimento-de-vaso-sanitario', 'limpeza-de-caixa-de-gordura'],
    vizinhos: ['toninhas', 'pereque-mirim', 'saco-da-ribeira'],
  },
  {
    slug: 'pereque-mirim',
    nome: 'Perequê-Mirim',
    prep: 'no',
    regiao: 'Região Sul',
    intro:
      'No Perequê-Mirim a M & C atende residências, comércios de bairro e condomínios com desentupimento e limpeza de fossa.',
    contexto:
      'Bairro com muitas famílias que moram em Ubatuba o ano todo, o Perequê-Mirim tem casas com quintal amplo e redes longas até a rua ou a fossa. Desentupimento de rede com máquina rotativa e esgotamento de fossa são os serviços mais pedidos.',
    servicos: ['desentupimento-de-esgoto', 'limpeza-de-fossa', 'desentupimento-de-ralo'],
    vizinhos: ['enseada', 'saco-da-ribeira', 'lazaro'],
  },
  {
    slug: 'saco-da-ribeira',
    nome: 'Saco da Ribeira',
    prep: 'no',
    regiao: 'Região Sul',
    intro:
      'No Saco da Ribeira atendemos marinas, restaurantes, pousadas e casas, com equipe disponível 24 horas.',
    contexto:
      'Com marinas e restaurantes de frutos do mar, o Saco da Ribeira tem cozinhas comerciais que geram muita gordura. Limpeza periódica de caixa de gordura e hidrojateamento evitam que a rede trave em dia de movimento.',
    servicos: ['limpeza-de-caixa-de-gordura', 'hidrojateamento', 'desentupimento-de-pia'],
    vizinhos: ['lazaro', 'enseada', 'pereque-mirim'],
  },
  {
    slug: 'lazaro',
    nome: 'Lázaro',
    prep: 'no',
    regiao: 'Região Sul',
    intro:
      'No Lázaro e na Praia Domingas Dias a M & C atende condomínios, casas de alto padrão e pousadas.',
    contexto:
      'A região do Lázaro tem muitos condomínios com rede interna própria e imóveis que dependem de fossa séptica. Fazemos manutenção preventiva para administradores de condomínio e atendimento emergencial para proprietários e caseiros.',
    servicos: ['limpeza-de-fossa', 'desentupimento-de-esgoto', 'hidrojateamento'],
    vizinhos: ['saco-da-ribeira', 'pereque-mirim', 'maranduba'],
  },
  {
    slug: 'maranduba',
    nome: 'Maranduba',
    prep: 'na',
    regiao: 'Região Sul',
    intro:
      'Na Maranduba atendemos casas, comércios e pousadas do bairro e das praias vizinhas, como Lagoinha e Sapê.',
    contexto:
      'A Maranduba é um dos bairros mais populosos do sul de Ubatuba, com comércio próprio e muitas casas de temporada. Há imóveis com fossa e sumidouro e terrenos baixos que encharcam com a chuva, o que aumenta o retorno de esgoto. Avaliamos fossa e rede juntas para resolver a causa.',
    servicos: ['limpeza-de-fossa', 'desentupimento-de-esgoto', 'desentupimento-de-vaso-sanitario'],
    vizinhos: ['sertao-da-quina', 'lazaro', 'pereque-mirim'],
  },
  {
    slug: 'sertao-da-quina',
    nome: 'Sertão da Quina',
    prep: 'no',
    regiao: 'Região Sul',
    intro:
      'No Sertão da Quina a M & C atende residências e chácaras, com limpeza de fossa e desentupimento de rede.',
    contexto:
      'Afastado da orla, o Sertão da Quina tem terrenos maiores e muitas casas com fossa séptica e sumidouro. Redes longas entre a casa e a fossa pedem equipamento com cabo comprido. Levamos o equipamento adequado já na primeira visita.',
    servicos: ['limpeza-de-fossa', 'desentupimento-de-esgoto', 'desentupimento-de-vaso-sanitario'],
    vizinhos: ['maranduba', 'lazaro', 'pereque-mirim'],
  },
  {
    slug: 'itamambuca',
    nome: 'Itamambuca',
    prep: 'em',
    regiao: 'Região Norte',
    intro:
      'Em Itamambuca atendemos condomínios, pousadas e casas de praia, 24 horas, inclusive em feriados.',
    contexto:
      'Itamambuca reúne condomínios, pousadas e casas de temporada perto da praia e do rio. Areia nos ralos externos e fossas que lotam no verão são as situações mais comuns. Programamos limpeza antes da temporada e atendemos emergências durante ela.',
    servicos: ['limpeza-de-fossa', 'desentupimento-de-ralo', 'desentupimento-de-vaso-sanitario'],
    vizinhos: ['pereque-acu', 'picinguaba', 'centro'],
  },
  {
    slug: 'picinguaba',
    nome: 'Picinguaba',
    prep: 'em',
    regiao: 'Região Norte',
    intro:
      'Em Picinguaba e nas praias do norte, como Ubatumirim, Félix e Prumirim, a M & C atende casas, pousadas e comércios.',
    contexto:
      'No extremo norte de Ubatuba, perto da divisa com Paraty, muitos imóveis ficam em áreas de preservação e dependem de fossa séptica. Fazemos limpeza de fossa e desentupimento com cuidado redobrado para não contaminar o solo e os rios da região.',
    servicos: ['limpeza-de-fossa', 'desentupimento-de-esgoto', 'desentupimento-de-pia'],
    vizinhos: ['itamambuca', 'pereque-acu', 'centro'],
  },
];

export const outrasLocalidades = [
  'Estufa I e II',
  'Ipiranguinha',
  'Silop',
  'Barra Seca',
  'Tenório',
  'Praia Vermelha',
  'Sapê',
  'Lagoinha',
  'Praia Dura',
  'Félix',
  'Prumirim',
  'Ubatumirim',
  'Puruba',
];

export const noBairro = (b: Bairro) => `${b.prep} ${b.nome}`;

export const getBairro = (slug: string) => bairros.find((b) => b.slug === slug);
