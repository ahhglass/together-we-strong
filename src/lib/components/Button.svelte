<script lang="ts">
	import type { Snippet } from 'svelte';

	export type ButtonVariant = 'default' | 'outline' | 'nav' | 'cta';
	export type ButtonSize = 'md' | 'sm';

	let {
		href,
		variant = 'default',
		size = 'md',
		type = 'button',
		disabled = false,
		active = false,
		class: className = '',
		ariaExpanded,
		ariaControls,
		ariaLabel,
		onclick,
		children
	}: {
		href?: string;
		variant?: ButtonVariant;
		size?: ButtonSize;
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		active?: boolean;
		class?: string;
		ariaExpanded?: boolean;
		ariaControls?: string;
		ariaLabel?: string;
		onclick?: (event: MouseEvent) => void;
		children: Snippet;
	} = $props();
</script>

{#if href}
	<a
		class={['button', className]}
		class:button--outline={variant === 'outline'}
		class:button--nav={variant === 'nav'}
		class:button--cta={variant === 'cta'}
		class:button--sm={size === 'sm'}
		class:button--active={active}
		{href}
		aria-current={active ? 'page' : undefined}
		aria-expanded={ariaExpanded}
		aria-controls={ariaControls}
		aria-label={ariaLabel}
		aria-disabled={disabled ? 'true' : undefined}
		tabindex={disabled ? -1 : undefined}
		{onclick}
	>
		{@render children()}
	</a>
{:else}
	<button
		class={['button', className]}
		class:button--outline={variant === 'outline'}
		class:button--nav={variant === 'nav'}
		class:button--cta={variant === 'cta'}
		class:button--sm={size === 'sm'}
		class:button--active={active}
		{type}
		{disabled}
		aria-expanded={ariaExpanded}
		aria-controls={ariaControls}
		aria-label={ariaLabel}
		{onclick}
	>
		{@render children()}
	</button>
{/if}
