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
      filter: (page) => !page.includes('/post/')
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  redirects: {
    '/post/[slug]': '/writing/[slug]'
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Roslindale Text',
      cssVariable: '--font-roslindale-text',
      options: {
        variants: [
          {
            src: ['./src/fonts/roslindale/text-regular.woff2'],
            weight: '400',
            style: 'normal'
          },
          {
            src: ['./src/fonts/roslindale/text-italic.woff2'],
            weight: '400',
            style: 'italic'
          },
          {
            src: ['./src/fonts/roslindale/text-medium.woff2'],
            weight: '500',
            style: 'normal'
          },
          {
            src: ['./src/fonts/roslindale/text-medium-italic.woff2'],
            weight: '500',
            style: 'italic'
          },
          {
            src: ['./src/fonts/roslindale/text-semibold.woff2'],
            weight: '600',
            style: 'normal'
          },
          {
            src: ['./src/fonts/roslindale/text-semibold-italic.woff2'],
            weight: '600',
            style: 'italic'
          },
          {
            src: ['./src/fonts/roslindale/text-bold.woff2'],
            weight: '700',
            style: 'normal'
          },
          {
            src: ['./src/fonts/roslindale/text-bold-italic.woff2'],
            weight: '700',
            style: 'italic'
          }
        ]
      }
    },
    {
      provider: fontProviders.local(),
      name: 'Roslindale Display',
      cssVariable: '--font-roslindale-display',
      options: {
        variants: [
          {
            src: ['./src/fonts/roslindale/display-black.woff2'],
            weight: '900',
            style: 'normal'
          }
        ]
      }
    },
    {
      provider: fontProviders.local(),
      name: 'Public Sans',
      cssVariable: '--font-public-sans',
      options: {
        variants: [
          {
            src: ['./src/fonts/public-sans/public-sans-400-normal.woff2'],
            weight: '400',
            style: 'normal'
          },
          {
            src: ['./src/fonts/public-sans/public-sans-400-italic.woff2'],
            weight: '400',
            style: 'italic'
          },
          {
            src: ['./src/fonts/public-sans/public-sans-500-normal.woff2'],
            weight: '500',
            style: 'normal'
          },
          {
            src: ['./src/fonts/public-sans/public-sans-500-italic.woff2'],
            weight: '500',
            style: 'italic'
          },
          {
            src: ['./src/fonts/public-sans/public-sans-600-normal.woff2'],
            weight: '600',
            style: 'normal'
          },
          {
            src: ['./src/fonts/public-sans/public-sans-600-italic.woff2'],
            weight: '600',
            style: 'italic'
          },
          {
            src: ['./src/fonts/public-sans/public-sans-700-normal.woff2'],
            weight: '700',
            style: 'normal'
          },
          {
            src: ['./src/fonts/public-sans/public-sans-700-italic.woff2'],
            weight: '700',
            style: 'italic'
          }
        ]
      }
    }
  ]
});
