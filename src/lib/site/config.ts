export const UI_FEEDBACK_MS = 2500;

export const routes = {
	home: '/',
	campaigns: '/campaigns',
	about: '/about',
	contacts: '/contacts',
	offer: '/offer'
} as const;

export type PageId = 'index' | 'campaigns' | 'about' | 'contacts' | 'offer' | '';

export function pageIdFromPath(pathname: string): PageId {
	if (pathname === '/') return 'index';
	if (pathname.startsWith('/campaigns')) return 'campaigns';
	if (pathname.startsWith('/about')) return 'about';
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
			{ label: 'О проекте', href: routes.about, pageId: 'about' as const },
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
	siteUrl: 'https://together-we-strong.ru',
	ogImagePath: '/image/Hero.avif',
	shareText: 'Поддержите сбор «Вместе мы сила» — вместе мы можем больше.',
	organizerName: '«Вместе мы сила»',
	contactEmail: 'help@together-we-strong.ru',
	copyrightStartYear: 2026,
	watermark: 'ВМЕСТЕ МЫ СИЛА',
	footer: {
		mission:
			'Добровольная площадка для тех, кому нужна поддержка. Мы не собираем средства на свои счета — только помогаем рассказать о сборе и принять помощь напрямую.',
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
		'Чтобы попасть в список сборов или задать вопрос по проекту, напишите нам в социальных сетях — это основной и самый быстрый способ связи.',
	applicationNote:
		'Мы рассматриваем каждую заявку вручную. Публикация на сайте — после проверки материалов и согласования с вами.',
	/** image — опциональный путь к иллюстрации, например `/image/contacts/social.webp` */
	cards: [
		{
			id: 'social',
			title: 'Социальные сети',
			image: '/image/contacts/send.png',
			description:
				'Для связи и заявки на включение в список сборов напишите нам в мессенджерах и соцсетях — мы читаем сообщения там в первую очередь.'
		},
		{
			id: 'story',
			title: 'Ваша история',
			image: '/image/contacts/story.png',
			description:
				'Кратко расскажите, что случилось, кому нужна помощь и на что пойдут собранные средства.'
		},
		{
			id: 'proof',
			title: 'Подтверждающие материалы',
			image: '/image/contacts/proof.png',
			description:
				'Приложите скриншоты или документы о сложной ситуации. По возможности — без лишних персональных данных в открытом доступе.'
		},
		{
			id: 'details',
			title: 'Сумма и реквизиты',
			image: '/image/contacts/details.png',
			description:
				'Укажите цель сбора, реквизиты для перевода и город, если это важно для истории.'
		},
		{
			id: 'email',
			title: 'Email - Ваша почта',
			image: '/image/contacts/email.png',
			description:
				'По организационным вопросам, жалобам и сотрудничеству — ответим в ближайшее рабочее время.'
		}
	]
} as const;

export const contactChannels = [
	{
		label: 'Email',
		value: siteConfig.contactEmail,
		href: `mailto:${siteConfig.contactEmail}`
	}
] as const;
