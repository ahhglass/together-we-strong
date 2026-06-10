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

<article class="container page-article">
	<header class="page-header">
		<p class="eyebrow">О проекте</p>
		<h1 class="page-title">{aboutMeta.title}</h1>
		<p class="text-body mt-4">{aboutMeta.intro}</p>
	</header>

	<div class="mt-8 space-y-8">
		{#each aboutSections as section}
			<section>
				<h2 class="text-xl font-extrabold text-nav">{section.title}</h2>
				<div class="mt-3 space-y-3">
					{#each section.paragraphs as paragraph}
						<p class="text-body">{paragraph}</p>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</article>
