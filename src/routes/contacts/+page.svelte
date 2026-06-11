<script lang="ts">
	import SocialLinks from '$lib/components/SocialLinks.svelte';
	import { contactChannels, contactsPage, siteConfig } from '$lib/site/config';
</script>

<svelte:head>
	<title>Контакты — {siteConfig.name}</title>
	<meta
		name="description"
		content="Контакты фонда «{siteConfig.name}»: email, соцсети и реквизиты организатора."
	/>
</svelte:head>

<article class="container page-article">
	<header class="page-header">
		<p class="eyebrow">Связь</p>
		<h1 class="page-title">{contactsPage.title}</h1>
		<p class="mt-3 text-lg text-footer-muted">{contactsPage.intro}</p>
	</header>

	<div class="mt-8 space-y-6">
		<dl class="space-y-4">
			{#each contactChannels as channel}
				<div class="card px-4 py-4 sm:px-5">
					<dt class="eyebrow">
						{channel.label}
					</dt>
					<dd class="mt-1 text-lg font-semibold text-nav">
						{#if channel.href}
							<a
								href={channel.href}
								class="underline decoration-nav/25 underline-offset-2 transition-colors hover:text-button"
							>
								{channel.value}
							</a>
						{:else}
							{channel.value}
						{/if}
					</dd>
				</div>
			{/each}
		</dl>

		<section aria-labelledby="contacts-social-title">
			<h2 id="contacts-social-title" class="text-lg font-extrabold text-nav">Социальные сети</h2>
			<SocialLinks size="sm" class="mt-4" />
		</section>
	</div>
</article>
