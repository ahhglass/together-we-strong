<script lang="ts">
	import { siteConfig } from '$lib/site/config';
	import { offerMeta, offerSections } from '$lib/site/offer';
</script>

<svelte:head>
	<title>Правила пожертвований — {siteConfig.name}</title>
	<meta
		name="description"
		content="Публичная оферта о приёме добровольных пожертвований на сайте «{siteConfig.name}»."
	/>
</svelte:head>

<article class="container text-pretty">
	<header class="border-b border-nav/15 pb-6">
		<p class="text-base font-bold tracking-wide text-footer-muted uppercase">
			Правила пожертвований
		</p>
		<h1 class="mt-2 text-xl font-extrabold text-nav sm:text-2xl">
			{offerMeta.title}
		</h1>
		<p class="mt-3 text-base text-footer-muted">
			Редакция от {offerMeta.updatedAt}
		</p>
		<p class="mt-4 text-lg leading-relaxed text-nav/85">
			{offerMeta.intro}
		</p>
	</header>

	<div class="mt-8 space-y-8">
		{#each offerSections as section}
			<section>
				<h2 class="text-lg font-extrabold text-nav">{section.title}</h2>

				{#if section.paragraphs.length}
					<div class="mt-3 space-y-3">
						{#each section.paragraphs as paragraph}
							<p class="text-lg leading-relaxed text-nav/85">
								{paragraph}
							</p>
						{/each}
					</div>
				{/if}

				{#if section.list?.length}
					<ul class="mt-3 list-disc space-y-2 pl-5 text-lg leading-relaxed text-nav/85">
						{#each section.list as item}
							<li>{item}</li>
						{/each}
					</ul>
				{/if}
			</section>
		{/each}
	</div>

	<footer class="mt-10 rounded-[1.05rem] bg-footer px-4 py-4 text-base text-footer-muted sm:px-5">
		По всем вопросам, связанным с пожертвованиями и настоящей офертой, обращайтесь:
		<a
			href="mailto:{siteConfig.contactEmail}"
			class="ml-1 font-semibold text-nav underline decoration-nav/30 underline-offset-2"
		>
			{siteConfig.contactEmail}
		</a>
	</footer>
</article>
