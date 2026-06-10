<script lang="ts">
	import CampaignListStatus from '$lib/components/CampaignListStatus.svelte';
	import DonationCampaign from '$lib/components/DonationCampaign.svelte';
	import { siteConfig } from '$lib/site/config';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{siteConfig.name} — поддержите активный сбор</title>
	<meta
		name="description"
		content="Активный сбор на сайте «{siteConfig.name}». Узнайте историю, следите за прогрессом и помогите вместе с нами."
	/>
</svelte:head>

{#if data.source === 'unavailable'}
	<CampaignListStatus variant="pending" />
{:else if data.campaign}
	{#key data.campaign.id}
		<DonationCampaign campaign={data.campaign} />
	{/key}
{:else}
	<CampaignListStatus variant="completed" />
{/if}
