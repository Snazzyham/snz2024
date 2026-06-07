import type { APIRoute } from 'astro';
import type { PrismicItem, CaseStudy } from '../../data/site-config';
import * as prismic from '@prismicio/client';
import { getCases, getSingleCase } from '../../prismic';
import { richTextToMarkdown } from '../../utils/prismic-to-markdown';

export async function getStaticPaths() {
  const cases = (await getCases()) as PrismicItem[];
  return cases.map((item) => ({
    params: { slug: item.uid }
  }));
}

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;
  const caseFile = await getSingleCase(slug || '404');
  const content = caseFile.data as CaseStudy;
  const title = prismic.asText(content.title);
  const body = richTextToMarkdown(content.body_content);

  let markdown = `# ${title}

**Client:** ${content.client}
${content.listing_blurb ? `\n> ${content.listing_blurb}\n` : ''}
---

${body}
`;

  if (content.has_awards && content.awards.length > 0) {
    markdown += `\n## Awards and Recognition\n\n`;
    markdown += content.awards.map((a) => `- [${a.a_title}](${a.link})`).join('\n');
    markdown += '\n';
  }

  if (content.has_external_media && content.external_media.length > 0) {
    markdown += `\n## In The Media\n\n`;
    markdown += content.external_media
      .map((m) => `- [${m.publication}](${m.url})`)
      .join('\n');
    markdown += '\n';
  }

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8'
    }
  });
};
