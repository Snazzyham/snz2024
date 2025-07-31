import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://snazzyham.com',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/post/')
    }),
    tailwind({
      applyBaseStyles: false
    })
  ],
  redirects: {
    '/post/[slug]': '/writing/[slug]'
  }
});
