<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import NumberFlow from '@number-flow/svelte';
	import { formatRubles, rubleNumberFormat } from '$lib/site/campaign';

	let {
		value,
		format = rubleNumberFormat,
		locales = 'ru-RU',
		suffix,
		animateOnMount = false,
		class: className = ''
	}: {
		value: number;
		format?: Intl.NumberFormatOptions;
		locales?: Intl.LocalesArgument;
		suffix?: string;
		animateOnMount?: boolean;
		class?: string;
	} = $props();

	const shouldAnimateOnMount = untrack(() => animateOnMount);
	const initialValue = untrack(() => value);

	let display = $state(shouldAnimateOnMount ? 0 : initialValue);
	let allowUpdates = $state(!shouldAnimateOnMount);
	let mounted = $state(false);

	onMount(() => {
		mounted = true;

		if (!shouldAnimateOnMount) return;

		requestAnimationFrame(() => {
			display = value;
			allowUpdates = true;
		});
	});

	$effect(() => {
		if (allowUpdates) display = value;
	});

	function fallbackText(amount: number): string {
		if (format.style === 'currency' && format.currency === 'RUB') {
			return formatRubles(amount);
		}

		const formatted = new Intl.NumberFormat(locales, format).format(amount);
		return suffix ? `${formatted}${suffix}` : formatted;
	}
</script>

{#if mounted}
	<NumberFlow
		value={display}
		{format}
		{locales}
		{suffix}
		class={['animated-amount tabular-nums', className]}
	/>
{:else}
	<span class={className}>{fallbackText(display)}</span>
{/if}
