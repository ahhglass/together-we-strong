<script lang="ts">
	import { afterNavigate, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { CAMPAIGN_DATA_KEY, CAMPAIGN_REFRESH_MS } from '$lib/site/config';

	let { children } = $props();

	function usesCampaignData(pathname: string) {
		return pathname === '/' || pathname.startsWith('/campaigns');
	}

	afterNavigate(({ from, to }) => {
		if (!from) return;

		if (usesCampaignData(from.url.pathname) || usesCampaignData(to.url.pathname)) {
			invalidate(CAMPAIGN_DATA_KEY);
		}
	});

	onMount(() => {
		const id = setInterval(() => invalidate(CAMPAIGN_DATA_KEY), CAMPAIGN_REFRESH_MS);
		return () => clearInterval(id);
	});
</script>

{@render children()}
