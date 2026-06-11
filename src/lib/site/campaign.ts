import type { CampaignParticipant, CampaignSpendingItem } from './active-campaigns';

export interface CampaignPayment {
	cardNumber: string;
	bank: string;
	recipient: string;
}

export interface Campaign {
	id: string;
	personName: string;
	heroLines: string[];
	title: string;
	story: string;
	spending: CampaignSpendingItem[];
	reporting: string[];
	goal: number;
	collected: number;
	location?: string;
	updatedAt: string;
	payment: CampaignPayment;
}

export interface CampaignTab {
	id: 'story' | 'help' | 'spending' | 'reporting';
	label: string;
}

const campaignContent = {
	title: 'Помощь на лечение и реабилитацию',
	story:
		'Семье нужна поддержка на лекарства, обследования и реабилитацию. Каждое пожертвование приближает к восстановлению — вместе мы можем помочь.',
	spending: [
		{
			title: 'Лекарства и препараты',
			description:
				'Препараты по назначению врача, поддерживающая терапия и сопутствующие медикаменты на ближайшие месяцы лечения.'
		},
		{
			title: 'Обследования и анализы',
			description:
				'КТ, МРТ, лабораторные исследования и консультации специалистов для контроля динамики и корректировки лечения.'
		},
		{
			title: 'Реабилитация',
			description:
				'Восстановительные процедуры, физиотерапия и занятия, которые помогают вернуться к привычной жизни после основного курса.'
		},
		{
			title: 'Бытовые расходы семьи',
			description:
				'Проезд на процедуры, питание и необходимые покупки, пока семья сосредоточена на лечении и уходе.'
		}
	],
	reporting: [
		'Все поступившие средства учитываются отдельно по каждому сбору. Мы фиксируем сумму, дату и назначение перевода.',
		'Отчёты публикуем на сайте после ключевых этапов: закупка лекарств, прохождение обследований, завершение курса реабилитации. В отчёте указываем, сколько собрано и на что потрачено.',
		'Если у вас остались вопросы о прозрачности сбора, напишите нам — ответим в течение рабочего дня. Подробные условия приёма пожертвований описаны в правилах оферты.'
	],
	location: 'Москва',
	payment: {
		cardNumber: '2200 7007 1234 5678',
		bank: 'Сбербанк',
		recipient: ''
	}
} as const;

export function formatUpdatedAt(date: Date = new Date()): string {
	return date.toLocaleDateString('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
}

export function heroLinesFromName(name: string): string[] {
	const parts = name.trim().split(/\s+/);
	if (parts.length >= 2) return ['Поможем', parts[0], parts.slice(1).join(' ')];
	return ['Поможем', name];
}

export function buildCampaignForParticipant(
	participant: CampaignParticipant & { collected: number },
	fallbackUpdatedAt?: string | null
): Campaign {
	const fallbackStory = `Мы собираем средства для ${participant.name}. ${campaignContent.story}`;

	return {
		id: participant.id,
		personName: participant.name,
		heroLines: heroLinesFromName(participant.name),
		title: participant.title ?? campaignContent.title,
		story: participant.story ?? fallbackStory,
		spending:
			participant.spending && participant.spending.length > 0
				? [...participant.spending]
				: [...campaignContent.spending],
		reporting: [...campaignContent.reporting],
		goal: participant.goal,
		collected: participant.collected,
		location: participant.location ?? campaignContent.location,
		updatedAt: participant.updatedAt ?? fallbackUpdatedAt ?? formatUpdatedAt(),
		payment: {
			cardNumber: participant.cardNumber ?? campaignContent.payment.cardNumber,
			bank: participant.bank ?? campaignContent.payment.bank,
			recipient: participant.name
		}
	};
}

export const campaignTabs: CampaignTab[] = [
	{ id: 'story', label: 'История' },
	{ id: 'help', label: 'Как помочь' },
	{ id: 'spending', label: 'На что пойдут средства' },
	{ id: 'reporting', label: 'Отчётность' }
];

export const rubleNumberFormat = {
	style: 'currency',
	currency: 'RUB',
	maximumFractionDigits: 0
} satisfies Intl.NumberFormatOptions;

export function formatRubles(amount: number): string {
	return new Intl.NumberFormat('ru-RU', rubleNumberFormat).format(amount);
}

export function campaignProgress(collected: number, goal: number): number {
	if (goal <= 0) return 0;
	return Math.min(100, Math.round((collected / goal) * 100));
}
