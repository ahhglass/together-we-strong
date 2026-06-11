<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		description,
		image,
		wide = false,
		children
	}: {
		title: string;
		description: string;
		image?: string;
		wide?: boolean;
		children?: Snippet;
	} = $props();
</script>

<article
	class="contacts-card"
	class:contacts-card--wide={wide}
	class:contacts-card--narrow={!wide}
>
	<div class="contacts-card__body">
		<div class="contacts-card__media" class:contacts-card__media--empty={!image}>
			{#if image}
				<img
					class="contacts-card__image"
					src={image}
					alt=""
					loading="lazy"
					decoding="async"
					style:shape-outside={`url("${image}")`}
					style:shape-margin="0.35rem"
				/>
			{:else}
				<div class="contacts-card__placeholder" aria-hidden="true"></div>
			{/if}
		</div>

		<h2 class="contacts-card__title">{title}</h2>
		<p class="contacts-card__text">{description}</p>

		{#if children}
			<div class="contacts-card__extra">
				{@render children()}
			</div>
		{/if}
	</div>
</article>
