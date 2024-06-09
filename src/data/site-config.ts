import type { RichTextField, ImageField, LinkField } from "@prismicio/client";

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
	data: HomepageData | BlogPost | CaseStudy | PortfolioPageData | FavData;
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

export type BlogPost = {
	title: RichTextField;
	date: string;
	body: RichTextField;
};

export type CaseStudy = {
	title: RichTextField;
	listing_title: string;
	listing_blurb: string;
	client: string;
	client_logo: ImageField;
	has_hero: Boolean;
	primary: string;
	secondary: string;
	hero_image: ImageField;
	body_content: RichTextField;
	has_awards: Boolean;
	awards: AwardGroupItem[];
	videos: AssetGroupItem[];
	photos: AssetGroupItem[];
	has_external_media: Boolean;
	external_media: any[];
};

export type PortfolioPageData = {
	title: RichTextField;
	case_study_title: string;
	portfolio_items_title: string;
	portfolio_items: PortfolioItem[];
};

type PortfolioItem = {
	key: string;
	desc: string;
	value: string;
	internal: Boolean;
};

export type FavData = {
	title: RichTextField;
	page_description: RichTextField;
	category_1_title: string;
	category_2_title: string;
	category_3_title: string;
	category_1_items: FavItem[];
	category_2_items: FavItem[];
	category_3_items: FavItem[];
};

export type FavItem = {
	item_title: string;
	item_description: RichTextField;
	since: string;
	item_image: ImageField;
};

type AwardGroupItem = {
	a_title: string;
	link: string;
};

type AssetGroupItem = {
	content: any;
	name: string;
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
	title: "Soham Adwani - Product Consultant",
	subtitle: "Product Consultant, Web Developer, Operations Specialist",
	description:
		"I'm a Product Consultant focusing on helping my clients scale and get to market in the most efficient way possible",
	image: {
		src: "https://images.prismic.io/snazzyham/265fecdf-3ff9-48c5-82e0-77f889c029e6_IMG_0053.JPG?auto=compress,format",
		alt: "Soham Adwani - Product Consultant",
	},
	headerNavLinks: [
		{
			text: "Home",
			href: "/",
		},
		{
			text: "Portfolio",
			href: "/portfolio",
		},
		{
			text: "Writing",
			href: "/writing",
		},
		{
			text: "Favourites",
			href: "/favourites",
		},
	],
	footerNavLinks: [
		{
			text: "Contact",
			href: "/contact",
		},
		{
			text: "Otterdev",
			href: "https://otterdev.io",
		},
	],
	socialLinks: [
		{
			text: "Github",
			href: "https://github.com/Snazzyham",
		},
		{
			text: "Book a Call",
			href: "https://timesync.novocall.co/soham/otterdev-discuss",
		},
	],
	postsPerPage: 8,
	projectsPerPage: 8,
};

export default siteConfig;
