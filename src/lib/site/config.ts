export const routes = {
	home: '/',
	campaigns: '/campaigns',
	contacts: '/contacts',
	offer: '/offer'
} as const;

export type PageId = 'index' | 'campaigns' | 'contacts' | 'offer' | '';

export function pageIdFromPath(pathname: string): PageId {
	if (pathname === '/') return 'index';
	if (pathname.startsWith('/campaigns')) return 'campaigns';
	if (pathname.startsWith('/contacts')) return 'contacts';
	if (pathname.startsWith('/offer')) return 'offer';
	return '';
}

export const navMenu = [
	{
		title: 'Навигация',
		links: [
			{ label: 'Главная', href: routes.home, pageId: 'index' as const },
			{ label: 'Активные сборы', href: routes.campaigns, pageId: 'campaigns' as const }
		]
	},
	{
		title: 'Информация',
		links: [
			{ label: 'Контакты', href: routes.contacts, pageId: 'contacts' as const },
			{ label: 'Правила пожертвований', href: routes.offer, pageId: 'offer' as const }
		]
	}
] as const;

export const socialIconSrc = {
	vk: '/image/brand/vk.svg',
	telegram: '/image/brand/telegram.svg',
	max: '/image/brand/max.svg'
} as const;

export const siteConfig = {
	name: 'Вместе мы сила',
	shareText: 'Поддержите сбор «Вместе мы сила» — вместе мы можем больше.',
	organizerName: '«Вместе мы сила»',
	contactEmail: 'help@together-we-strong.ru',
	donationRulesUrl: routes.offer,
	copyrightStartYear: 2026,
	watermark: 'ВМЕСТЕ МЫ СИЛА',
	footer: {
		mission: 'Каждый из нас может помочь кому-то, кто в этом нуждается. Каждое пожертвование — шаг к чужой надежде.',
		navLinks: navMenu.flatMap((section) =>
			section.links.map(({ label, href }) => ({ label, href }))
		),
		socialLinks: [
			{ label: 'ВКонтакте', href: 'https://vk.com', icon: 'vk' },
			{ label: 'Макс', href: 'https://max.ru', icon: 'max' },
			{ label: 'Telegram', href: 'https://t.me', icon: 'telegram' }
		]
	}
} as const;

export const contactsPage = {
	title: 'Контакты',
	intro:
		'По вопросам сборов, пожертвований и сотрудничества напишите нам — ответим в ближайшее рабочее время.'
} as const;

export const contactChannels = [
	{
		label: 'Email',
		value: siteConfig.contactEmail,
		href: `mailto:${siteConfig.contactEmail}`
	},
	{
		label: 'Организатор',
		value: siteConfig.organizerName,
		href: undefined
	}
] as const;

export type SocialIcon = (typeof siteConfig.footer.socialLinks)[number]['icon'];
