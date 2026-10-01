import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './src/data/site.ts';

export default defineConfig({
  site: site.url,
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      changefreq: 'monthly',
      lastmod: new Date(site.lastUpdated),
      serialize(item) {
        const path = new URL(item.url).pathname;
        if (path === '/' || path === '') item.priority = 1.0;
        else if (path.startsWith('/servicos/')) item.priority = 0.9;
        else if (path.startsWith('/bairros/')) item.priority = 0.8;
        else item.priority = 0.6;
        return item;
      },
    }),
  ],
});
