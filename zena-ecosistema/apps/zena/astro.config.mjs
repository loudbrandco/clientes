import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { ZENA_URL } from '../../shared/sites.mjs';

// Sitio A — zenaayoub.com (marca personal y universo editorial)
export default defineConfig({
  site: ZENA_URL,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap()],
  vite: { server: { fs: { allow: ['../..'] } } },
});
