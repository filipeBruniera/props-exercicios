import { site, absUrl } from './site';
import { bairros, outrasLocalidades } from './bairros';
import { servicos, type Faq, type Servico } from './servicos';

type JsonLd = Record<string, unknown>;

export const BUSINESS_ID = `${site.url}/#empresa`;
const WEBSITE_ID = `${site.url}/#site`;

const areaServed = (): JsonLd[] => [
  {
    '@type': 'City',
    name: 'Ubatuba',
    containedInPlace: { '@type': 'State', name: site.stateName },
    sameAs: 'https://pt.wikipedia.org/wiki/Ubatuba',
  },
  ...bairros.map((b) => ({ '@type': 'Place', name: `${b.nome}, Ubatuba - SP` })),
  ...outrasLocalidades.map((n) => ({ '@type': 'Place', name: `${n}, Ubatuba - SP` })),
];

export function businessSchema(): JsonLd {
  const address: JsonLd = {
    '@type': 'PostalAddress',
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  };
  if (site.address.street) address.streetAddress = site.address.street;

  const business: JsonLd = {
    '@type': ['Plumber', 'LocalBusiness'],
    '@id': BUSINESS_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: absUrl('/logo.png'),
    image: absUrl('/og.png'),
    description:
      'Desentupidora em Ubatuba-SP com atendimento 24 horas: desentupimento de pia, vaso sanitário, ralo e esgoto, limpeza de caixa de gordura e fossa, hidrojateamento e detecção de vazamento.',
    telephone: `+${site.phoneDigits}`,
    email: site.email,
    address,
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: areaServed(),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    knowsLanguage: 'pt-BR',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+${site.whatsappDigits}`,
      contactType: 'customer service',
      areaServed: 'BR',
      availableLanguage: 'Portuguese',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de desentupimento em Ubatuba',
      itemListElement: servicos.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.nome, url: absUrl(`/servicos/${s.slug}`) },
      })),
    },
  };
  if (site.sameAs.length) business.sameAs = site.sameAs;
  if (site.googleBusinessUrl) business.hasMap = site.googleBusinessUrl;
  if (site.cnpj) business.taxID = site.cnpj;
  if (site.foundingYear) business.foundingDate = site.foundingYear;
  return business;
}

export function websiteSchema(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: site.url,
    name: site.name,
    inLanguage: 'pt-BR',
    publisher: { '@id': BUSINESS_ID },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absUrl(it.path),
    })),
  };
}

export function faqSchema(faqs: Faq[]): JsonLd {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function serviceSchema(s: Servico, area?: string): JsonLd {
  return {
    '@type': 'Service',
    name: area ? `${s.nome} em ${area}, Ubatuba` : `${s.nome} em Ubatuba`,
    serviceType: s.nome,
    description: s.intro,
    provider: { '@id': BUSINESS_ID },
    areaServed: { '@type': 'City', name: 'Ubatuba' },
    url: absUrl(`/servicos/${s.slug}`),
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: { '@type': 'ContactPoint', telephone: `+${site.phoneDigits}` },
    },
  };
}

export function webPageSchema(path: string, name: string, description: string): JsonLd {
  return {
    '@type': 'WebPage',
    '@id': `${absUrl(path)}#pagina`,
    url: absUrl(path),
    name,
    description,
    inLanguage: 'pt-BR',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': BUSINESS_ID },
    dateModified: site.lastUpdated,
  };
}
