import type { APIRoute } from 'astro';
import type { PrismicItem, BlogPost, CaseStudy } from '../data/site-config';
import * as prismic from '@prismicio/client';
import { getBlogPosts, getCases } from '../prismic';

const SITE_URL = 'https://snazzyham.com';

export const GET: APIRoute = async () => {
  const blogPosts = (await getBlogPosts(false)) as PrismicItem[];
  const caseStudies = (await getCases()) as PrismicItem[];

  const lines: string[] = [];

  lines.push('# Soham Adwani - snazzyham.com');
  lines.push('');
  lines.push(
    '> Personal website of Soham Adwani, a Product & Operations Consultant and Managing Partner at Otterdev.'
  );
  lines.push('');
  lines.push('## About Soham Adwani');
  lines.push('');
  lines.push(
    'Soham Adwani is a Product & Operations Consultant based in Melbourne, Australia. He started his career on the operations side of tech consulting, then spent over 5 years at GOODSTUPH (https://goodstuph.org) — a creative agency where he helped bring ideas to life across digital campaigns and interactive experiences. After a stint in the Blockchain and Gaming space at Chillchat (https://chillchat.com/), he returned to consulting as a Managing Partner at Otterdev (https://otterdev.io).'
  );
  lines.push('');
  lines.push(
    'At Otterdev, Soham and his team are a Product Consultancy dedicated to helping clients launch and scale through exceptional user experiences and strategic technology decisions. They work with companies to build new versions of SaaS products, redesign user flows, create brand identities, and optimize growth for established products.'
  );
  lines.push('');
  lines.push(
    'Soham has worked with brands including Netflix, Lego, HBO, BMW, and Porsche. His work has received recognition from the Clio Awards, The Webby Awards, Citra Pariwara, and Gong.'
  );
  lines.push('');
  lines.push(
    'This website serves as his personal workspace — featuring a blog with personal insights on technology, design, productivity and culture; a portfolio of case studies from client work; and curated favourites across podcasts, movies, and TV.'
  );
  lines.push('');
  lines.push('## About This Site');
  lines.push('');
  lines.push(
    'A static site built with Astro 6.x and powered by Prismic CMS. The site is a heavily customized version of the "Dante" Astro theme, styled with Tailwind CSS v4, and uses locally hosted Roslindale and Public Sans fonts. It contains blog posts, portfolio case studies, and personal favourites. All content is available in both HTML and machine-readable Markdown formats.'
  );
  lines.push('');
  lines.push('## Accessing Markdown Versions');
  lines.push('');
  lines.push(
    'Every page on this site has a corresponding Markdown version available by appending `.md` to the URL path. This is the recommended format for AI/LLM consumption:'
  );
  lines.push('');
  lines.push('```');
  lines.push('HTML:     https://snazzyham.com/writing/my-post/');
  lines.push('Markdown: https://snazzyham.com/writing/my-post.md');
  lines.push('```');
  lines.push('');
  lines.push('## Main Pages');
  lines.push('');
  lines.push(
    `- [Homepage](${SITE_URL}/) - Overview, featured case studies, and recent blog posts`
  );
  lines.push(
    `- [Portfolio](${SITE_URL}/portfolio/) - Complete portfolio listing with case studies and projects`
  );
  lines.push(`- [Writing](${SITE_URL}/writing/) - Blog archive with all journal entries`);
  lines.push(
    `- [Favourites](${SITE_URL}/favourites/) - Curated podcasts, movies, and TV shows`
  );
  lines.push(`- [Contact](${SITE_URL}/contact/) - Contact information and availability`);
  lines.push('');

  if (caseStudies.length > 0) {
    lines.push('## Case Studies');
    lines.push('');
    lines.push('Portfolio case studies showcasing client work and projects:');
    lines.push('');
    for (const item of caseStudies) {
      const data = item.data as CaseStudy;
      const title = prismic.asText(data.title);
      const url = `${SITE_URL}/case/${item.uid}/`;
      const mdUrl = `${SITE_URL}/case/${item.uid}.md`;
      const blurb = data.listing_blurb || '';
      lines.push(`- [${title}](${url}) ([markdown](${mdUrl})) - ${blurb}`);
    }
    lines.push('');
  }

  if (blogPosts.length > 0) {
    lines.push('## Blog Posts');
    lines.push('');
    lines.push(
      'Personal journal entries covering technology, design, productivity, and more:'
    );
    lines.push('');
    for (const post of blogPosts) {
      const data = post.data as BlogPost;
      const title = prismic.asText(data.title);
      const slug = post.slugs?.[0] || '';
      const url = `${SITE_URL}/writing/${slug}/`;
      const mdUrl = `${SITE_URL}/writing/${slug}.md`;
      const date = data.date || '';
      const desc = data.seo_description || prismic.asText(data.body).slice(0, 120);
      lines.push(`- [${title}](${url}) ([markdown](${mdUrl})) - ${date}: ${desc}`);
    }
    lines.push('');
  }

  lines.push('## Additional Information');
  lines.push('');
  lines.push('- **RSS Feed**: https://snazzyham.com/rss.xml');
  lines.push('- **Sitemap**: https://snazzyham.com/sitemap-index.xml');
  lines.push('- **Consultancy**: https://otterdev.io');
  lines.push('- **GitHub**: https://github.com/Snazzyham');
  lines.push('');
  lines.push('## Usage Notes for AI/LLM Agents');
  lines.push('');
  lines.push('- Prefer the `.md` URLs when scraping content for better parsing');
  lines.push('- Blog posts are sorted by date (newest first) on the /writing/ page');
  lines.push('- Case studies include client information, awards, and media references');
  lines.push('- All content is copyright Soham Adwani');
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
};
