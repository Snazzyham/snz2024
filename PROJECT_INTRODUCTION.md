# PROJECT INTRODUCTION: snazzyham.com

## Overview

This is the personal website of **Soham Adwani**, a Product Consultant. It's a heavily customized version of the "Dante" Astro theme, built with Astro 6.x and Prismic CMS for content management.

**Live URL**: https://snazzyham.com

## Tech Stack

- **Framework**: Astro 6.0.5
- **CMS**: Prismic (snazzyham repository)
- **Styling**: Tailwind CSS v4 with @tailwindcss/typography
- **Fonts**: Roslindale (display + text) and Public Sans (locally hosted)
- **Language**: TypeScript (strict mode)
- **Package Manager**: pnpm
- **Node Version**: 25.8.1 (via Volta)

## Architecture

### How Astro + Prismic Work Together

1. **Content Fetching**: `src/prismic.ts` contains all Prismic client methods

   - Uses `@prismicio/client` to connect to the `snazzyham` repository
   - Requires `API_KEY` environment variable for authentication
   - Fetches content at build time (SSG)

2. **Data Flow**:

   ```
   Prismic CMS → src/prismic.ts → Page Components → Rendered HTML
   ```

3. **Type Safety**: All Prismic data is typed in `src/data/site-config.ts`
   - Types: `PrismicItem`, `BlogPost`, `CaseStudy`, `PortfolioPageData`, `FavData`, `HomepageData`
   - Use type assertions when accessing Prismic data: `item.data as BlogPost`

## Content Model (Prismic)

### Custom Types in Prismic

1. **blog_post** - Blog/writing entries

   - Fields: `title`, `date`, `body` (RichText), `seo_title`, `seo_description`, `seo_image`
   - Route: `/writing/[slug]`

2. **case_study** - Portfolio case studies

   - Fields: `title`, `listing_title`, `listing_blurb`, `client`, `client_logo`, `primary`, `secondary`, `hero_image`, `body_content`, `has_awards`, `awards`, `videos`, `photos`, `has_external_media`, `external_media`
   - Route: `/case/[slug]`

3. **home** - Homepage content

   - Fields: `title`, `about` (RichText), `hero_image`, `button_path`, `button_text`
   - Route: `/`

4. **portfolio_page** - Portfolio listing page

   - Fields: `title`, `case_study_title`, `portfolio_items_title`, `portfolio_items` (group)
   - Route: `/portfolio`

5. **favorites** - Favourites page
   - Fields: `title`, `page_description`, `category_1_title`, `category_1_items`, `category_2_title`, `category_2_items`, `category_3_title`, `category_3_items`
   - Route: `/favourites`

### Local Content

- **Pages Collection**: `src/content/pages/` (Markdown files)
  - Schema: `title`, `seo` (optional)
  - Example: `contact.md` → `/contact`
  - Route: `/[slug]` (catch-all)

## Routing & Pages

### Static Routes

| Route         | File                                | Purpose                                                |
| ------------- | ----------------------------------- | ------------------------------------------------------ |
| `/`           | `src/pages/index.astro`             | Homepage with hero, case studies preview, blog preview |
| `/portfolio`  | `src/pages/portfolio.astro`         | Full portfolio listing                                 |
| `/writing`    | `src/pages/writing/[...page].astro` | Blog archive with pagination                           |
| `/favourites` | `src/pages/favourites.astro`        | Personal favourites (podcasts, movies, etc.)           |
| `/contact`    | `src/pages/[...slug].astro`         | Contact page (from local markdown)                     |

### Dynamic Routes

| Route                | File                             | Data Source                         |
| -------------------- | -------------------------------- | ----------------------------------- |
| `/writing/[slug]`    | `src/pages/writing/[slug].astro` | Prismic `blog_post`                 |
| `/writing/[slug].md` | `src/pages/writing/[slug].md.ts` | Prismic `blog_post` (Markdown)      |
| `/case/[slug]`       | `src/pages/case/[slug].astro`    | Prismic `case_study`                |
| `/case/[slug].md`    | `src/pages/case/[slug].md.ts`    | Prismic `case_study` (Markdown)     |
| `/[slug]`            | `src/pages/[...slug].astro`      | Local markdown pages                |
| `/[slug].md`         | `src/pages/[...slug].md.ts`      | Local markdown pages (raw Markdown) |
| `/llms.txt`          | `src/pages/llms.txt.ts`          | All Prismic content                 |

### Redirects

- `/post/[slug]` → `/writing/[slug]` (legacy URL support)

## Components

### Layout Components

- **BaseLayout.astro** - Main layout wrapper
  - Props: `title`, `description`, `image`, `pageType`, `showHeader`, `colorOverwrite`, `primary`, `secondary`
  - Includes: Nav, Header (optional), Footer, BaseHead
  - Enables view transitions

### UI Components

- **Nav.astro** - Navigation bar with mobile menu and theme toggle
- **Header.astro** - Site header with logo/title
- **Footer.astro** - Footer with links and social icons
- **Hero.astro** - Homepage hero section (fetches from Prismic `home`)
- **Button.astro** - Polymorphic button (renders as `<a>` or `<button>`)
- **IconButton.astro** - Icon-only button for pagination
- **Pagination.astro** - Blog pagination controls
- **ThemeToggle.astro** - Dark/light mode toggle
- **Lightbox.astro** - Image lightbox for case study photos (vanilla JS, keyboard navigation)

### Content Preview Components

- **PostPreview.astro** - Blog post preview card
  - Props: `post` (BlogPost), `slug` (string[]), `class`, `headingLevel`
- **CasePreview.astro** - Case study preview card
  - Props: `client`, `clientLogo`, `title`, `blurb`, `primary`, `secondary`, `slug`
- **FavouritePreview.astro** - Favourites category section
  - Props: `title`, `items` (FavItem[])

### Meta Components

- **BaseHead.astro** - HTML head with SEO meta tags, Open Graph, Twitter cards
- **FormattedDate.astro** - Date formatting component
- **Subscribe.astro** - Newsletter subscription form (not currently used)

### Icon Components

- **ArrowLeft.astro**, **ArrowRight.astro** - SVG arrow icons

## Styling System

### Tailwind CSS v4

- Configured via Vite plugin (no `tailwind.config.js`)
- Typography plugin for prose styling
- Custom theme in `src/styles/global.css`

### Theme Variables

CSS custom properties for theming (light/dark mode):

**Light Mode**:

- `--theme-text-main`: 54 49 45 (Warm Roasted Coffee)
- `--theme-bg-main`: 242 238 224 (Sun-bleached Paper)
- `--theme-bg-muted`: 228 222 204 (Aged Linen)
- `--theme-accent-main`: 103 115 71 (Rich Moss Green)

**Dark Mode**:

- `--theme-text-main`: 242 238 227 (Soft Cream)
- `--theme-bg-main`: 27 36 27 (Deep Forest Green)
- `--theme-bg-muted`: 42 52 42 (Dark Moss)
- `--theme-accent-main`: 221 161 94 (Earthy Gold)

### Custom Utility Classes

- `.text-main` - Main text color
- `.bg-main` - Main background color
- `.bg-muted` - Muted background color
- `.border-main` - Main border color
- `.accent-main` - Accent color

### Font System

- **Roslindale Display**: Headings (900 weight)
- **Roslindale Text**: Body text (400-700 weights, regular/italic)
- **Public Sans**: Fallback sans-serif

Font families:

- `--font-sans`: Roslindale Text + Public Sans
- `--font-heading`: Roslindale Display + Roslindale Text

### Special Effects

- **Film Grain Overlay**: `.grain-overlay` - Subtle noise texture
- **Vintage Filter**: `.vintage-filter` - Sepia/grayscale effect on images
- **Prose Styling**: `.prose-dante` - Custom typography for rich text content

## Data Flow Examples

### Fetching Blog Posts

```typescript
// In page component
import { getBlogPosts } from '../prismic';
import type { PrismicItem, BlogPost } from '../data/site-config';

const posts = (await getBlogPosts(true)) as PrismicItem[];
const post = posts[0];
const blogData = post.data as BlogPost;
```

### Fetching Single Case Study

```typescript
import { getSingleCase } from '../prismic';
import type { CaseStudy } from '../data/site-config';

const caseFile = await getSingleCase(slug);
const content = caseFile.data as CaseStudy;
```

### Rendering Rich Text

```typescript
import * as prismic from '@prismicio/client';

<div set:html={prismic.asHTML(content.body)} />
```

## Configuration

### Environment Variables

Create `.env` file (see `sample.env`):

```
PUBLIC_API_ENDPOINT=''  # Not currently used
API_KEY=''              # Prismic API access token
```

### Site Configuration

Edit `src/data/site-config.ts`:

- Site metadata (title, description, image)
- Navigation links (header, footer)
- Social links
- Pagination settings

### Astro Configuration

`astro.config.mjs`:

- Site URL: https://snazzyham.com
- Integrations: MDX, Sitemap (excludes `/post/` routes)
- Redirects: `/post/[slug]` → `/writing/[slug]`
- Fonts: Local font provider for Roslindale and Public Sans

## Development Commands

```bash
# Install dependencies
pnpm install

# Start dev server (localhost:4321)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Astro CLI commands
pnpm astro <command>
```

## Key Files Reference

| File                               | Purpose                                          |
| ---------------------------------- | ------------------------------------------------ |
| `src/prismic.ts`                   | Prismic client and data fetching methods         |
| `src/data/site-config.ts`          | Site configuration and TypeScript types          |
| `src/layouts/BaseLayout.astro`     | Main layout wrapper                              |
| `src/styles/global.css`            | Global styles, theme variables, custom utilities |
| `src/components/BaseHead.astro`    | SEO meta tags and head content                   |
| `src/content.config.ts`            | Content collection schema (local markdown)       |
| `src/utils/prismic-to-markdown.ts` | Prismic Rich Text → Markdown conversion          |
| `src/pages/llms.txt.ts`            | Dynamic llms.txt generation at build time        |
| `astro.config.mjs`                 | Astro configuration                              |
| `sample.env`                       | Environment variable template                    |
| `public/robots.txt`                | Robots.txt with llms.txt reference               |

## Important Patterns

### Type Assertions

Always cast Prismic data to the appropriate type:

```typescript
const data = item.data as BlogPost;
```

### Conditional Rendering

Check for content existence before rendering:

```typescript
{content.hero_image.url && <img src={content.hero_image.url} />}
```

### Rich Text Rendering

Use `prismic.asHTML()` for rich text fields:

```typescript
<div set:html={prismic.asHTML(content.body)} />
```

### Plain Text from Rich Text

Use `prismic.asText()` to extract plain text:

```typescript
const plainText = prismic.asText(content.title);
```

## Analytics

- **GoatCounter**: `snz.goatcounter.com`
- **Umami**: Website ID `c384605a-32bc-4215-b312-15e75f7a854d`

Both are loaded in `src/components/BaseHead.astro`.

## SEO Features

- Canonical URLs with trailing slash normalization
- Open Graph meta tags
- Twitter Card meta tags
- Dynamic OG images (via dynamic-og-image-generator.vercel.app)
- RSS feed (`/rss.xml`)
- Sitemap (`/sitemap-0.xml`)
- llms.txt (`/llms.txt`) for AI/LLM consumption
- robots.txt (`/robots.txt`) referencing llms.txt
- Markdown endpoints (`.md`) for all content pages

## LLM & AI Support

The site provides machine-readable content for AI/LLM agents to improve GEO (Generative Engine Optimization).

### llms.txt

- **Route**: `/llms.txt`
- **File**: `src/pages/llms.txt.ts`
- Generated dynamically at build time from Prismic data
- Contains site overview, full sitemap with descriptions, and instructions for AI agents
- Referenced in `public/robots.txt` for crawler discovery

### Markdown Endpoints

Every content page has a corresponding Markdown version by appending `.md` to the URL path:

| HTML URL           | Markdown URL         |
| ------------------ | -------------------- |
| `/writing/[slug]/` | `/writing/[slug].md` |
| `/case/[slug]/`    | `/case/[slug].md`    |
| `/contact/`        | `/contact.md`        |

- **Blog posts**: `src/pages/writing/[slug].md.ts` — converts Prismic Rich Text to Markdown via `turndown`
- **Case studies**: `src/pages/case/[slug].md.ts` — includes awards and media references
- **Local pages**: `src/pages/[...slug].md.ts` — serves raw Markdown from content collection
- **Utility**: `src/utils/prismic-to-markdown.ts` — shared `richTextToMarkdown()` and `htmlToMarkdown()` helpers using `turndown`
- **Dependency**: `turndown` (+ `@types/turndown`) for HTML→Markdown conversion
- **Content-Type**: `text/markdown; charset=utf-8`

### robots.txt

- **File**: `public/robots.txt`
- Allows all crawlers, references sitemap and llms.txt

## Notes for Development

1. **No Client-Side Framework**: This is a static site with minimal JavaScript
2. **View Transitions**: Enabled for smooth page transitions
3. **Image Optimization**: Images are served from Prismic CDN with auto-compression
4. **Dark Mode**: Persisted in localStorage, applied via `.dark` class on `<html>`
5. **Mobile Menu**: Custom implementation in Nav.astro with accessibility features
6. **Pagination**: Uses Astro's built-in pagination for blog archive
7. **Catch-All Routes**: `/[...slug].astro` handles local markdown pages
8. **Lightbox**: Case study photos use a lightweight vanilla JS lightbox (click to open, arrow keys/Escape, click outside to close)

## External Links

- **Otterdev**: https://otterdev.io (Soham's consultancy)
- **GitHub**: https://github.com/Snazzyham
- **Booking**: https://calendar.app.google/W5EZnqFQEZhZ99zU9
