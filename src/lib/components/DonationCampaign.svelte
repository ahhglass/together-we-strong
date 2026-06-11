<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import AnimatedAmount from '$lib/components/AnimatedAmount.svelte';
	import AnimatedAmountGroup from '$lib/components/AnimatedAmountGroup.svelte';
	import DonationModal from '$lib/components/DonationModal.svelte';
	import { routes } from '$lib/site/config';
	import {
		campaignProgress,
		campaignTabs,
		type Campaign,
		type CampaignTab
	} from '$lib/site/campaign';

	let { campaign }: { campaign: Campaign } = $props();

	const progress = $derived(campaignProgress(campaign.collected, campaign.goal));
	const remaining = $derived(Math.max(0, campaign.goal - campaign.collected));

	let barWidth = $state(0);
	let activeTab = $state<CampaignTab['id']>('story');
	let modalOpen = $state(false);

	$effect(() => {
		const frame = requestAnimationFrame(() => {
			barWidth = progress;
		});

		return () => cancelAnimationFrame(frame);
	});

	function selectTab(id: CampaignTab['id']) {
		activeTab = id;
	}

	function onTabKeydown(event: KeyboardEvent, index: number) {
		const last = campaignTabs.length - 1;
		let next = index;

		if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1;
		else if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
		else if (event.key === 'Home') next = 0;
		else if (event.key === 'End') next = last;
		else return;

		event.preventDefault();
		selectTab(campaignTabs[next].id);
		document.getElementById(`tab-${campaignTabs[next].id}`)?.focus();
	}

	function openDonationModal() {
		modalOpen = true;
	}
</script>

<section class="campaign-hero text-primary" aria-labelledby="campaign-title">
	<div class="campaign-hero__grid">
		<div class="campaign-hero__content">
			<p class="eyebrow eyebrow--light">Активный сбор</p>

			<h1
				id="campaign-title"
				class="mt-3 text-[clamp(2.5rem,11vw,4.75rem)] leading-[0.95] font-extrabold tracking-tight"
			>
				{#each campaign.heroLines as line}
					<span class="block">{line}</span>
				{/each}
			</h1>

			<p class="mt-4 max-w-xl text-pretty text-lg text-primary/90">
				{campaign.title}
				{#if campaign.location}
					<span class="text-primary/70"> · {campaign.location}</span>
				{/if}
			</p>

			<div class="mt-4 max-w-md">
				<AnimatedAmountGroup>
					<div class="flex items-end justify-between gap-4">
						<div>
							<p class="eyebrow eyebrow--light">Собрано</p>
							<p class="mt-1 text-3xl font-extrabold sm:text-4xl">
								<AnimatedAmount value={campaign.collected} animateOnMount />
							</p>
						</div>
						<div class="text-right">
							<p class="eyebrow eyebrow--light">Цель</p>
							<p class="mt-1 text-3xl font-extrabold sm:text-4xl">
								<AnimatedAmount value={campaign.goal} />
							</p>
						</div>
					</div>

					<div
						class="campaign-hero__progress mt-4 overflow-hidden rounded-full"
						role="progressbar"
						aria-valuenow={campaign.collected}
						aria-valuemin={0}
						aria-valuemax={campaign.goal}
						aria-label="Прогресс сбора"
					>
						<div
							class="campaign-hero__progress-fill h-full rounded-full transition-[width] duration-700 ease-out"
							style:width="{barWidth}%"
						></div>
					</div>

					<p class="mt-3 text-base text-primary/85">
						<span class="font-bold">
							<AnimatedAmount value={progress} format={{ maximumFractionDigits: 0 }} suffix="%" />
						</span>
						<span class="text-primary/70">
							· осталось <AnimatedAmount value={remaining} />
						</span>
					</p>
				</AnimatedAmountGroup>
			</div>

			<div class="mt-8">
				<Button variant="cta" onclick={openDonationModal}>Помочь</Button>
			</div>
		</div>

		<figure class="campaign-hero__media">
			<div class="campaign-hero__image-wrap">
				<img
					class="campaign-hero__image"
					src="/image/Hero.avif"
					alt="Люди вместе поддерживают друг друга"
					width="960"
					height="720"
					loading="eager"
					fetchpriority="high"
					decoding="async"
				/>
			</div>
		</figure>
	</div>
</section>

<section id="donate" class="container py-[clamp(2.5rem,7vw,4rem)]">
	<h2 class="text-[clamp(1.75rem,5vw,2.75rem)] leading-tight font-extrabold text-nav">
		История и помощь
	</h2>

	<div class="mt-8 grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-5">
		<div class="campaign-tabs" role="tablist" aria-label="Разделы сбора">
			{#each campaignTabs as tab, index}
				<button
					id="tab-{tab.id}"
					type="button"
					role="tab"
					class="campaign-tab"
					class:campaign-tab--active={activeTab === tab.id}
					aria-selected={activeTab === tab.id}
					aria-controls="campaign-tabpanel"
					tabindex={activeTab === tab.id ? 0 : -1}
					onclick={() => selectTab(tab.id)}
					onkeydown={(e) => onTabKeydown(e, index)}
				>
					<span>{tab.label}</span>
					{#if activeTab === tab.id}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
						>
							<path d="m9 18 6-6-6-6" />
						</svg>
					{/if}
				</button>
			{/each}
		</div>

		<div
			id="campaign-tabpanel"
			class="campaign-panel"
			role="tabpanel"
			aria-labelledby={`tab-${activeTab}`}
		>
			{#if activeTab === 'story'}
				<p class="campaign-panel__text text-pretty">
					{campaign.story}
				</p>
			{:else if activeTab === 'help'}
				<p class="campaign-panel__text text-pretty">
					Переведите любую сумму на карту получателя. Все пожертвования добровольные и направляются
					на цели сбора. Перед переводом ознакомьтесь с
					<a
						href={routes.offer}
						class="link-accent"
					>
						правилами пожертвований
					</a>.
				</p>
				<div class="mt-6">
					<Button onclick={openDonationModal}>Перевести</Button>
				</div>
			{:else if activeTab === 'spending'}
				<ul class="campaign-panel__list">
					{#each campaign.spending as item}
						<li class="campaign-panel__list-item">
							<p class="campaign-panel__text">{item.title}</p>
							<p class="campaign-panel__detail text-pretty">{item.description}</p>
						</li>
					{/each}
				</ul>
			{:else}
				<div class="space-y-4">
					{#each campaign.reporting as paragraph}
						<p class="campaign-panel__text text-pretty">{paragraph}</p>
					{/each}
					<p class="campaign-panel__text text-pretty">
						<a
							href={routes.offer}
							class="link-accent"
						>
							Правила пожертвований
						</a>
					</p>
				</div>
			{/if}
		</div>
	</div>

	<p class="mt-6 text-base text-footer-muted">Обновлено {campaign.updatedAt}</p>
</section>

<DonationModal bind:open={modalOpen} payment={campaign.payment} />
