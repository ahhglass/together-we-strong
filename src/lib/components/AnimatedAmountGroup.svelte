<script lang="ts">
	import { onMount } from 'svelte';
	import { NumberFlowGroup } from '@number-flow/svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted}
	<NumberFlowGroup>{@render children()}</NumberFlowGroup>
{:else}
	{@render children()}
{/if}
