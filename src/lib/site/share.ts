import { browser } from '$app/environment';
import { siteConfig } from '$lib/site/config';

export type ShareResult = 'shared' | 'copied' | 'failed' | 'cancelled';

export async function sharePage(): Promise<ShareResult> {
	if (!browser) return 'failed';

	const url = window.location.href;
	const { name, shareText } = siteConfig;

	if (navigator.share) {
		try {
			await navigator.share({ title: name, text: shareText, url });
			return 'shared';
		} catch (error) {
			if (error instanceof DOMException && error.name === 'AbortError') return 'cancelled';
		}
	}

	try {
		await navigator.clipboard.writeText(`${shareText}\n${url}`);
		return 'copied';
	} catch {
		return 'failed';
	}
}
