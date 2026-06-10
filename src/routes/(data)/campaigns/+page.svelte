<script lang="ts">
	import ActiveCampaignsBoard from '$lib/components/ActiveCampaignsBoard.svelte';
	import CampaignListStatus from '$lib/components/CampaignListStatus.svelte';
	import { siteConfig } from '$lib/site/config';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Активные сборы — {siteConfig.name}</title>
	<meta
		name="description"
		content="Актуальные сборы участников проекта «{siteConfig.name}». Следите за прогрессом и выбирайте, кому помочь."
	/>
</svelte:head>

<article class="container py-[clamp(2rem,6vw,3.5rem)] text-pretty">
	<header class="border-b border-nav/15 pb-6">
		<p class="text-base font-bold tracking-wide text-footer-muted uppercase">Сборы</p>
		<h1 class="mt-2 text-xl font-extrabold text-nav sm:text-2xl">Активные сборы</h1>
		{#if data.source === 'csv'}
			<p class="mt-3 text-lg leading-relaxed text-footer-muted">
				Здесь опубликованы сборы участников проекта. Суммы и статус обновляются по мере поступления
				информации. На главной показывается первый незавершённый сбор из списка.
			</p>
		{/if}
	</header>

	<div class="mt-8">
		{#if data.source === 'unavailable'}
			<CampaignListStatus variant="pending" embedded />
		{:else}
			<ActiveCampaignsBoard groups={data.groups} featuredId={data.featuredId} />
		{/if}
	</div>
</article>
