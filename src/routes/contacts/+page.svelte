<script lang="ts">
	import ContactInfoCard from '$lib/components/ContactInfoCard.svelte';
	import SocialLinks from '$lib/components/SocialLinks.svelte';
	import { contactChannels, contactsPage, siteConfig } from '$lib/site/config';

	const [wideCards, narrowCards] = $derived([
		contactsPage.cards.slice(0, 2),
		contactsPage.cards.slice(2)
	]);

	function cardImage(card: (typeof contactsPage.cards)[number]) {
		return 'image' in card ? card.image : undefined;
	}
</script>

<svelte:head>
	<title>Контакты — {siteConfig.name}</title>
	<meta
		name="description"
		content="Как связаться с «{siteConfig.name}» и подать заявку на включение в список сборов: соцсети, что написать и какие материалы приложить."
	/>
</svelte:head>

<article class="container container--wide page-article">
	<header class="page-header">
		<p class="eyebrow">Связь</p>
		<h1 class="page-title">{contactsPage.title}</h1>
		<p class="text-body mt-3">{contactsPage.intro}</p>
	</header>

	<div class="contacts-grid mt-8">
		{#each wideCards as card (card.id)}
			<ContactInfoCard
				title={card.title}
				description={card.description}
				image={cardImage(card)}
				wide
			>
				{#if card.id === 'social'}
					<SocialLinks size="sm" />
				{/if}
			</ContactInfoCard>
		{/each}

		{#each narrowCards as card (card.id)}
			<ContactInfoCard title={card.title} description={card.description} image={cardImage(card)}>
				{#if card.id === 'email'}
					<a
						href={contactChannels[0].href}
						class="text-base font-semibold text-nav underline decoration-nav/25 underline-offset-2 transition-colors hover:text-button"
					>
						{contactChannels[0].value}
					</a>
				{/if}
			</ContactInfoCard>
		{/each}
	</div>

	<p class="text-body mt-8">{contactsPage.applicationNote}</p>
</article>
