import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { servicos } from '../data/servicos';
import { bairros, noBairro } from '../data/bairros';
import { faqHome } from '../data/faq';

export const GET: APIRoute = () => {
  const svc = servicos
    .map(
      (s) => `## ${s.h1}

URL: ${site.url}/servicos/${s.slug}

${s.intro}

Sinais de que você precisa:
${s.sinais.map((x) => `- ${x}`).join('\n')}

Como a M & C faz:
${s.processo.map((p) => `- ${p.titulo}: ${p.texto}`).join('\n')}

Prevenção:
${s.prevencao.map((x) => `- ${x}`).join('\n')}

Perguntas frequentes:
${s.faq.map((f) => `- P: ${f.q}\n  R: ${f.a}`).join('\n')}
`,
    )
    .join('\n');

  const bai = bairros
    .map((b) => `## Desentupidora ${noBairro(b)}, Ubatuba (${b.regiao})\n\nURL: ${site.url}/bairros/${b.slug}\n\n${b.intro} ${b.contexto}\n`)
    .join('\n');

  const body = `# ${site.name}: conteúdo completo

> Desentupidora em Ubatuba-SP com atendimento 24 horas. Telefone/WhatsApp ${site.phoneDisplay}. ${site.hours}. Atualizado em ${site.lastUpdated}.

## Perguntas frequentes gerais

${faqHome.map((f) => `- P: ${f.q}\n  R: ${f.a}`).join('\n')}

${svc}
${bai}`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
