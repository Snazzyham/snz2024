import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('writing');
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export const GET: APIRoute = ({ props }) => {
  const { post } = props as { post: Awaited<ReturnType<typeof getCollection<'writing'>>>[number] };
  const { title, date, description } = post.data;

  const markdown = `# ${title}

**Published:** ${date.toISOString().slice(0, 10)}
${description ? `\n> ${description}\n` : ''}
---

${post.body ?? ''}
`;

  return new Response(markdown, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
  });
};
