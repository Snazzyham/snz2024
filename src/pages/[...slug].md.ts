import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const pages = await getCollection('pages');
  return pages.map((page) => ({
    params: { slug: page.id },
    props: { page }
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { page } = props as { page: any };
  const { title, seo } = page.data;
  const body = page.body || '';
  const description = seo?.description ? `\n> ${seo.description}\n` : '';

  const markdown = `# ${title}
${description}
---

${body}
`;

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8'
    }
  });
};
