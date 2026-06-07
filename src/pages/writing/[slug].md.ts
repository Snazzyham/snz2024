import type { APIRoute } from 'astro';
import type { PrismicItem, BlogPost } from '../../data/site-config';
import * as prismic from '@prismicio/client';
import { getBlogPosts } from '../../prismic';
import { richTextToMarkdown } from '../../utils/prismic-to-markdown';

export async function getStaticPaths() {
  const posts = (await getBlogPosts(false)) as PrismicItem[];
  return posts.map((post) => ({
    params: { slug: post?.slugs ? post.slugs[0] : '404' },
    props: { post }
  }));
}

export const GET: APIRoute = ({ props }) => {
  const { post } = props as { post: PrismicItem };
  const data = post.data as BlogPost;
  const title = prismic.asText(data.title);
  const body = richTextToMarkdown(data.body);

  const markdown = `# ${title}

**Published:** ${data.date}
${post.first_publication_date !== post.last_publication_date ? `  \n**Updated:** ${post.last_publication_date}` : ''}
${data.seo_description ? `\n> ${data.seo_description}\n` : ''}
---

${body}
`;

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8'
    }
  });
};
