// JSON-LD (schema.org) builders. Every page emits one @graph containing the
// site-wide Person + WebSite nodes plus whatever page-specific nodes it passes in.
// Only describe what is visible on the page.

export const SITE = 'https://snazzyham.com';
export const abs = (path: string) => new URL(path, SITE).toString();

export const PERSON_ID = `${SITE}/#person`;
export const WEBSITE_ID = `${SITE}/#website`;

export type Node = Record<string, unknown>;

export const person: Node = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Soham Adwani',
  alternateName: 'Snazzyham',
  url: `${SITE}/`,
  jobTitle: 'Product Consultant',
  worksFor: { '@type': 'Organization', name: 'Otterdev', url: 'https://otterdev.io' },
  sameAs: ['https://github.com/Snazzyham']
};

export const website: Node = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: 'Soham Adwani',
  url: `${SITE}/`,
  inLanguage: 'en',
  publisher: { '@id': PERSON_ID }
};

export const author = { '@id': PERSON_ID };

/** Breadcrumb trail; Home is prepended automatically. */
export function breadcrumbs(trail: { name: string; path: string }[]): Node {
  const items = [{ name: 'Home', path: '/' }, ...trail];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path)
    }))
  };
}

/** A web page node tied to the site. */
export function webPage(type: string, path: string, name: string, description?: string, extra: Node = {}): Node {
  const url = abs(path);
  return {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    ...(description ? { description } : {}),
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: 'en',
    ...extra
  };
}

export function itemList(items: { name: string; path?: string; url?: string }[]): Node {
  return {
    '@type': 'ItemList',
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      ...(it.path || it.url ? { url: it.url ?? abs(it.path!) } : {})
    }))
  };
}

/** Serialise a graph for a <script type="application/ld+json">; escapes `<` so content can't close the tag. */
export function toJsonLd(nodes: Node[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': [person, website, ...nodes] }).replace(
    /</g,
    '\\u003c'
  );
}
