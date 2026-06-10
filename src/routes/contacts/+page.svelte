<script lang="ts">
	import { contactChannels, contactsPage, siteConfig, socialIconSrc } from '$lib/site/config';
</script>

<svelte:head>
	<title>Контакты — {siteConfig.name}</title>
	<meta
		name="description"
		content="Контакты фонда «{siteConfig.name}»: email, соцсети и реквизиты организатора."
	/>
</svelte:head>

<article class="container py-[clamp(2rem,6vw,3.5rem)] text-pretty">
	<header class="border-b border-nav/15 pb-6">
		<p class="text-base font-bold tracking-wide text-footer-muted uppercase">Связь</p>
		<h1 class="mt-2 text-xl font-extrabold text-nav sm:text-2xl">{contactsPage.title}</h1>
		<p class="mt-3 text-lg text-footer-muted">{contactsPage.intro}</p>
	</header>

	<div class="mt-8 space-y-6">
		<dl class="space-y-4">
			{#each contactChannels as channel}
				<div class="rounded-[1.05rem] bg-footer px-4 py-4 sm:px-5">
					<dt class="text-base font-bold tracking-wide text-footer-muted uppercase">
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
			<ul class="mt-4 space-y-2.5">
				{#each siteConfig.footer.socialLinks as social}
					<li>
						<a
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-2 text-lg text-footer-muted transition-colors hover:text-nav"
						>
							<img
								src={socialIconSrc[social.icon]}
								alt=""
								width="16"
								height="16"
								class="size-4"
								loading="lazy"
								decoding="async"
							/>
							{social.label}
						</a>
					</li>
				{/each}
			</ul>
		</section>
	</div>
</article>
