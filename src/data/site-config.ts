export type Image = {
  src: string;
  alt?: string;
  caption?: string;
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
  title: 'Soham Adwani - Product Consultant',
  subtitle: 'Product Consultant, Web Developer, Operations Specialist',
  description:
    "I'm a Product Consultant focusing on helping my clients scale and get to market in the most efficient way possible",
  headerNavLinks: [
    { text: 'Work', href: '/work' },
    { text: 'Writing', href: '/writing' },
    { text: 'Favourites', href: '/favourites' },
    { text: 'Contact', href: '/contact' }
  ],
  footerNavLinks: [],
  socialLinks: [
    {
      text: 'Github',
      href: 'https://github.com/Snazzyham'
    },
    {
      text: 'Book a Call',
      href: 'https://calendar.app.google/W5EZnqFQEZhZ99zU9'
    }
  ],
  postsPerPage: 8,
  projectsPerPage: 8
};

export default siteConfig;
