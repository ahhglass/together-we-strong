<script lang="ts">
	import { aboutMeta, aboutSections } from '$lib/site/about';
	import { siteConfig } from '$lib/site/config';
</script>

<svelte:head>
	<title>О проекте — {siteConfig.name}</title>
	<meta
		name="description"
		content="«{siteConfig.name}» — добровольная площадка для размещения сборов. Мы не принимаем пожертвования на свои счета."
	/>
</svelte:head>

<article class="container py-[clamp(2rem,6vw,3.5rem)] text-pretty">
	<header class="border-b border-nav/15 pb-6">
		<p class="text-base font-bold tracking-wide text-footer-muted uppercase">О проекте</p>
		<h1 class="mt-2 text-xl font-extrabold text-nav sm:text-2xl">{aboutMeta.title}</h1>
		<p class="mt-4 text-lg leading-relaxed text-nav/85">{aboutMeta.intro}</p>
	</header>

	<div class="mt-8 space-y-8">
		{#each aboutSections as section}
			<section>
				<h2 class="text-xl font-extrabold text-nav">{section.title}</h2>
				<div class="mt-3 space-y-3">
					{#each section.paragraphs as paragraph}
						<p class="text-lg leading-relaxed text-nav/85">{paragraph}</p>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</article>
