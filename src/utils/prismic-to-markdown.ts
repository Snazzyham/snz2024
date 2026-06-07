import TurndownService from 'turndown';
import * as prismic from '@prismicio/client';
import type { RichTextField } from '@prismicio/client';

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-'
});

export function richTextToMarkdown(field: RichTextField): string {
  const html = prismic.asHTML(field);
  if (!html) return '';
  return turndown.turndown(html);
}

export function htmlToMarkdown(html: string): string {
  if (!html) return '';
  return turndown.turndown(html);
}
