import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { servicos } from '../data/servicos';
import { bairros, outrasLocalidades, noBairro } from '../data/bairros';

// Padrão llms.txt (https://llmstxt.org): resumo do negócio para assistentes de IA.
export const GET: APIRoute = () => {
  const body = `# ${site.name}

> ${site.name} é uma desentupidora em Ubatuba, ${site.state} (${site.region}), com atendimento 24 horas, todos os dias. Faz desentupimento de pia, vaso sanitário, ralo e rede de esgoto, limpeza de caixa de gordura e de fossa séptica, hidrojateamento e detecção de vazamento para casas, pousadas, restaurantes e condomínios em todos os bairros de Ubatuba.

- Telefone e WhatsApp: ${site.phoneDisplay} (+${site.phoneDigits})
- E-mail: ${site.email}
- Horário: ${site.hours}
- Área atendida: todo o município de Ubatuba-SP, do Sertão da Quina e Maranduba (sul) a Picinguaba (norte)
- Orçamento: valor combinado depois do diagnóstico e antes de iniciar o serviço
- Método: máquina rotativa, hidrojateamento e caminhão de sucção, sem produtos químicos e sem quebra desnecessária
- Última atualização: ${site.lastUpdated}

## Serviços

${servicos.map((s) => `- [${s.nome} em Ubatuba](${site.url}/servicos/${s.slug}): ${s.resumo}`).join('\n')}

## Bairros atendidos

${bairros.map((b) => `- [Desentupidora ${noBairro(b)}](${site.url}/bairros/${b.slug}): ${b.regiao}`).join('\n')}
- Outras localidades: ${outrasLocalidades.join(', ')}

## Páginas principais

- [Início](${site.url}/): visão geral e perguntas frequentes
- [Todos os serviços](${site.url}/servicos)
- [Bairros atendidos](${site.url}/bairros)
- [Sobre a empresa](${site.url}/sobre)
- [Contato](${site.url}/contato)

## Optional

- [Versão completa para IAs](${site.url}/llms-full.txt): todo o conteúdo dos serviços, incluindo perguntas frequentes
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
