<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy } from 'svelte';
	import Button from '$lib/components/Button.svelte';
	import type { CampaignPayment } from '$lib/site/campaign';

	const COPY_FEEDBACK_MS = 2500;

	let {
		open = $bindable(false),
		payment
	}: {
		open?: boolean;
		payment: CampaignPayment;
	} = $props();

	let copied = $state(false);
	let copyTimeout: ReturnType<typeof setTimeout> | undefined;

	const cardNumberPlain = $derived(payment.cardNumber.replace(/\s/g, ''));

	function resetCopyState() {
		copied = false;
		clearTimeout(copyTimeout);
		copyTimeout = undefined;
	}

	function showCopiedFeedback() {
		copied = true;
		clearTimeout(copyTimeout);
		copyTimeout = setTimeout(() => {
			copied = false;
		}, COPY_FEEDBACK_MS);
	}

	function copyWithFallback(value: string) {
		const input = document.createElement('input');
		input.value = value;
		document.body.appendChild(input);
		input.select();
		document.execCommand('copy');
		document.body.removeChild(input);
	}

	function copyCardNumber() {
		navigator.clipboard.writeText(cardNumberPlain).then(
			() => showCopiedFeedback(),
			() => {
				try {
					copyWithFallback(cardNumberPlain);
					showCopiedFeedback();
				} catch {
					/* номер виден в UI — пользователь может скопировать вручную */
				}
			}
		);
	}

	function close() {
		open = false;
		resetCopyState();
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') close();
	}

	$effect(() => {
		if (!open) resetCopyState();
	});

	$effect(() => {
		if (!browser) return;

		document.body.classList.toggle('modal-open', open);

		return () => {
			document.body.classList.remove('modal-open');
		};
	});

	onDestroy(() => {
		if (browser) document.body.classList.remove('modal-open');
		resetCopyState();
	});
</script>

<svelte:window onkeydown={onKeydown} />

{#if open}
	<div class="donation-modal fixed inset-0 z-[var(--z-modal)] flex items-center justify-center overflow-hidden p-4">
		<button
			type="button"
			class="absolute inset-0 bg-nav/40 backdrop-blur-[2px]"
			aria-label="Закрыть окно"
			onclick={close}
			ontouchmove={(e) => e.preventDefault()}
		></button>

		<div
			role="dialog"
			aria-modal="true"
			aria-labelledby="donation-modal-title"
			class="donation-modal__panel relative w-full max-w-lg rounded-[1.05rem] bg-surface p-6 text-nav shadow-xl"
		>
			<h2 id="donation-modal-title" class="text-lg font-extrabold sm:text-xl">Перевод на карту</h2>
			<p class="mt-2 text-lg text-footer-muted">
				Скопируйте номер карты и переведите любую сумму через приложение банка.
			</p>

			<div class="mt-5 space-y-4">
				<div>
					<p class="text-base font-bold tracking-wide text-footer-muted uppercase">Получатель</p>
					<p class="mt-1 text-lg font-semibold">{payment.recipient}</p>
				</div>

				<div>
					<p class="text-base font-bold tracking-wide text-footer-muted uppercase">Банк</p>
					<p class="mt-1 text-lg font-semibold">{payment.bank}</p>
				</div>

				<div>
					<p class="text-base font-bold tracking-wide text-footer-muted uppercase">Номер карты</p>
					<button
						type="button"
						class="donation-modal__copy mt-2 flex w-full cursor-pointer items-center justify-between rounded-[1.05rem] bg-footer px-4 py-3 text-lg font-bold transition-colors hover:bg-footer/80"
						class:donation-modal__copy--done={copied}
						aria-label={copied ? 'Номер карты скопирован' : 'Скопировать номер карты'}
						onclick={copyCardNumber}
					>
						{copied ? 'Скопировано' : payment.cardNumber}
					</button>
				</div>
			</div>

			<div class="mt-6 flex justify-end">
				<Button variant="outline" size="sm" onclick={close}>Закрыть</Button>
			</div>
		</div>
	</div>
{/if}

<style>
	.donation-modal {
		overscroll-behavior: none;
	}

	.donation-modal__panel {
		max-height: min(90dvh, calc(100% - 2rem));
		overflow-y: auto;
		overscroll-behavior-y: contain;
	}

	.donation-modal__copy {
		letter-spacing: 0.04em;
		white-space: nowrap;
	}

	.donation-modal__copy--done {
		color: var(--color-button);
	}
</style>
