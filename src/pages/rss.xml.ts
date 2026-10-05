import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const posts = (await getCollection('writing')).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );
  return rss({
    title: 'Soham Adwani — Writing',
    description: 'Personal essays on technology, design, watches, productivity and culture.',
    site: context.site ?? 'https://snazzyham.com',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description:
        post.data.description ??
        (post.body ?? '').replace(/[#*_>`\[\]]|\([^)]*\)|<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 160),
      link: `/writing/${post.id}/`
    }))
  });
}
