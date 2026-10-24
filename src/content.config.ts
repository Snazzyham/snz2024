import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob, type Loader } from 'astro/loaders';

const seoSchema = z.object({
  title: z.string().min(5).max(120).optional(),
  description: z.string().min(15).max(160).optional(),
  image: z
    .object({
      src: z.string(),
      alt: z.string().optional()
    })
    .optional(),
  pageType: z.enum(['website', 'article']).default('website')
});

const pages = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    seo: seoSchema.optional()
  })
});

// Drop `draft: true` posts from production builds (pages, RSS, llms.txt, .md routes); `astro dev` keeps them.
const withoutDrafts = (loader: Loader): Loader => ({
  ...loader,
  load: async (context) => {
    await loader.load(context);
    if (import.meta.env.DEV) return;
    for (const [id, entry] of context.store.entries()) {
      if (entry.data.draft === true) context.store.delete(id);
    }
  }
});

const writing = defineCollection({
  loader: withoutDrafts(glob({ pattern: '**/[^_]*.md', base: './src/content/writing' })),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      description: z.string().optional(),
      seoTitle: z.string().optional(),
      image: image().optional(),
      draft: z.boolean().default(false)
    })
});

const work = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/work' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      listingTitle: z.string(),
      blurb: z.string(),
      client: z.string(),
      order: z.number(),
      tooling: z.boolean().optional(),
      featured: z.boolean().optional(),
      url: z.string().url().optional(),
      site: z.string().url().optional(),
      demo: z.string().url().optional(),
      logo: image().optional(),
      hero: image().optional(),
      awards: z.array(z.object({ title: z.string(), url: z.string() })).optional(),
      videos: z.array(z.string()).optional(),
      photos: z.array(image()).optional(),
      external: z.array(z.object({ name: z.string(), url: z.string() })).optional()
    })
});

const site = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/site' }),
  schema: ({ image }) =>
    z
      .object({
        name: z.string().optional(),
        subhead: z.string().optional(),
        title: z.string().optional(),
        buttonText: z.string().optional(),
        buttonPath: z.string().optional(),
        casesTitle: z.string().optional(),
        otherTitle: z.string().optional(),
        other: z
          .array(
            z.object({
              title: z.string(),
              description: z.string().optional(),
              url: z.string(),
              internal: z.boolean().optional()
            })
          )
          .optional(),
        categories: z
          .array(
            z.object({
              title: z.string(),
              items: z.array(
                z.object({
                  title: z.string(),
                  since: z.string().optional(),
                  image: image().optional(),
                  description: z.string().optional()
                })
              )
            })
          )
          .optional()
      })
      .passthrough()
});

export const collections = { pages, writing, work, site };
