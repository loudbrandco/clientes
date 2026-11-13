import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { FUNDACION_URL } from '../../shared/sites.mjs';

// Sitio B — theadventurerscf.org (organización, programas, donaciones e impacto)
export default defineConfig({
  site: FUNDACION_URL,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap({ filter: (p) => !p.includes('/gracias') })],
  vite: { server: { fs: { allow: ['../..'] } } },
});
