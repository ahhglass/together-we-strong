import { browser } from '$app/environment';
import { siteConfig } from '$lib/site/config';
import { toast } from '$lib/toast';

export async function sharePage() {
	if (!browser) return;

	const url = window.location.href;
	const { name, shareText } = siteConfig;

	if (navigator.share) {
		try {
			await navigator.share({ title: name, text: shareText, url });
			return;
		} catch (error) {
			if (error instanceof DOMException && error.name === 'AbortError') return;
		}
	}

	try {
		await navigator.clipboard.writeText(`${shareText}\n${url}`);
		toast.success('Ссылка скопирована', 'Вставьте её в мессенджер или соцсеть');
	} catch {
		toast.error('Не удалось поделиться', 'Скопируйте адрес страницы вручную');
	}
}
