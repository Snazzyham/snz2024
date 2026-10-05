import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://snazzyham.com',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/post/'),
      // public/bench/index.html is a static file, so Astro does not list it on its own.
      customPages: ['https://snazzyham.com/bench/']
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  // Animated GIFs in old posts exceed sharp's default pixel limit (it counts every frame).
  image: {
    service: { entrypoint: 'astro/assets/services/sharp', config: { limitInputPixels: false } }
  },
  redirects: {
    '/post/[slug]': '/writing/[slug]',
    '/portfolio': '/work',
    '/case/[slug]': '/work/[slug]'
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Inter Tight',
      cssVariable: '--astro-font-display',
      weights: [500, 600, 700],
      styles: ['normal']
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Newsreader',
      cssVariable: '--astro-font-serif',
      weights: [400, 500, 600],
      styles: ['normal', 'italic']
    }
  ]
});
