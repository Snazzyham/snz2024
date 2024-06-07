import type { RichTextField, ImageField } from '@prismicio/client';

export type Image = {
    src: string;
    alt?: string;
    caption?: string;
};

export type PrismicData = {
    page: number;
    results_per_page: number;
    results_size: number;
    total_results_size: number;
    next_page: null | any;
    prev_page: null | any;
    results: PrismicItem[];
    version: string;
    license: string;
};

export type PrismicItem = {
    id: string;
    uid: any;
    url: any;
    type: string;
    href: string;
    tags: string[];
    first_publication_date: string;
    last_publication_date: string;
    slugs?: string[];
    linked_documents: any;
    lang: string;
    alternate_languages: any;
    data: HomepageData;
};

export type HomepageData = {
    name: string;
    subhead: string;
    title: string;
    about: RichTextField;
    hero_image: ImageField;
    button_path: string;
    button_text: string;
};

export type Link = {
    text: string;
    href: string;
};

export type Subscribe = {
    title?: string;
    text?: string;
    formUrl: string;
};

export type SiteConfig = {
    logo?: Image;
    title: string;
    subtitle?: string;
    description: string;
    image?: Image;
    headerNavLinks?: Link[];
    footerNavLinks?: Link[];
    socialLinks?: Link[];
    subscribe?: Subscribe;
    postsPerPage?: number;
    projectsPerPage?: number;
};

const siteConfig: SiteConfig = {
    title: 'Soham Adwani',
    subtitle: 'Web Developer, Strategist, Ops Guy',
    description: 'Astro.js and Tailwind CSS theme for blog and portfolio by justgoodui.com',
    image: {
        src: '/dante-preview.jpg',
        alt: 'Dante - Astro.js and Tailwind CSS theme'
    },
    headerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        {
            text: 'Projects',
            href: '/projects'
        },
        {
            text: 'Blog',
            href: '/blog'
        }
    ],
    footerNavLinks: [
        {
            text: 'About',
            href: '/about'
        },
        {
            text: 'Contact',
            href: '/contact'
        },
        {
            text: 'Terms',
            href: '/terms'
        }
    ],
    socialLinks: [
        {
            text: 'Dribbble',
            href: 'https://dribbble.com/'
        },
        {
            text: 'Instagram',
            href: 'https://instagram.com/'
        },
        {
            text: 'X/Twitter',
            href: 'https://twitter.com/'
        }
    ],
    subscribe: {
        title: 'Subscribe to Dante Newsletter',
        text: 'One update per week. All the latest posts directly in your inbox.',
        formUrl: '#'
    },
    postsPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;
