/**
 * Fonte única de dados da empresa (NAP: Nome, Endereço, Telefone).
 * Tudo no site (páginas, Schema.org, llms.txt, robots.txt) lê daqui.
 *
 * TODO antes de publicar: troque os valores marcados com "PLACEHOLDER"
 * pelos dados reais. O NAP precisa ser IDÊNTICO ao do Perfil da Empresa
 * no Google (Google Business Profile) para o SEO local funcionar.
 */
export const site = {
  name: 'M & C Desentupidora',
  legalName: 'M & C Desentupidora', // PLACEHOLDER: razão social
  shortName: 'M & C',
  url: 'https://www.mcdesentupidoraubatuba.com.br', // PLACEHOLDER: domínio final
  city: 'Ubatuba',
  state: 'SP',
  stateName: 'São Paulo',
  region: 'Litoral Norte de São Paulo',

  // PLACEHOLDER: telefone e WhatsApp reais (somente dígitos com DDI 55 + DDD 12)
  phoneDigits: '5512900000000',
  phoneDisplay: '(12) 90000-0000',
  whatsappDigits: '5512900000000',
  whatsappMessage: 'Olá, M & C! Preciso de um orçamento de desentupimento em Ubatuba.',

  email: 'contato@mcdesentupidoraubatuba.com.br', // PLACEHOLDER

  // Empresa de área de atendimento: o endereço completo é opcional.
  // Se tiver endereço comercial, preencha street e postalCode exato.
  address: {
    street: '', // PLACEHOLDER: ex. "Rua Exemplo, 123 - Centro"
    locality: 'Ubatuba',
    region: 'SP',
    postalCode: '11680-000',
    country: 'BR',
  },
  geo: { lat: -23.4336, lng: -45.0838 }, // centro de Ubatuba; ajuste para a base real
  hours: 'Atendimento 24 horas, todos os dias, inclusive feriados',
  cnpj: '', // PLACEHOLDER: opcional, reforça confiança
  foundingYear: '', // PLACEHOLDER: ex. "2015"
  googleBusinessUrl: '', // PLACEHOLDER: link do Perfil da Empresa no Google
  sameAs: [] as string[], // PLACEHOLDER: Instagram, Facebook, etc.
  lastUpdated: '2026-10-01',
};

export const telHref = `tel:+${site.phoneDigits}`;

export function waHref(message: string = site.whatsappMessage) {
  return `https://wa.me/${site.whatsappDigits}?text=${encodeURIComponent(message)}`;
}

export const absUrl = (path: string) => new URL(path, site.url).toString();
