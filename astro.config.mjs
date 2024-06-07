import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://snazzyham.com',
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      applyBaseStyles: false
    })
  ],
  redirects: {
    '/post/[...slug]': '/writing/[...slug]'
  }
});
