import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const cases = await getCollection('work');
  return cases.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}

export const GET: APIRoute = ({ props }) => {
  const { entry } = props as { entry: Awaited<ReturnType<typeof getCollection<'work'>>>[number] };
  const d = entry.data;

  let markdown = `# ${d.title}

**Client:** ${d.client}
${d.blurb ? `\n> ${d.blurb}\n` : ''}
---

${entry.body ?? ''}
`;

  if (d.awards && d.awards.length > 0) {
    markdown += `\n## Awards and Recognition\n\n`;
    markdown += d.awards.map((a) => `- [${a.title}](${a.url})`).join('\n');
    markdown += '\n';
  }

  if (d.external && d.external.length > 0) {
    markdown += `\n## In The Media\n\n`;
    markdown += d.external.map((m) => `- [${m.name}](${m.url})`).join('\n');
    markdown += '\n';
  }

  return new Response(markdown, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
  });
};
