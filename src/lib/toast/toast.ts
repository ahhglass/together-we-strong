import { browser } from '$app/environment';
import type { SileoOptions } from 'sileo';

export type ToastVariant = 'success' | 'error';

async function notify(variant: ToastVariant, title: string, description?: string) {
	if (!browser) return;

	const { sileo } = await import('sileo');
	const options: SileoOptions = { title, description };

	if (variant === 'error') {
		sileo.error(options);
		return;
	}

	sileo.success(options);
}

export const toast = {
	success(title: string, description?: string) {
		return notify('success', title, description);
	},
	error(title: string, description?: string) {
		return notify('error', title, description);
	},
	show(title: string, variant: ToastVariant = 'success', description?: string) {
		return notify(variant, title, description);
	}
};
