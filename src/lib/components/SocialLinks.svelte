<script lang="ts">
	import { siteConfig, socialIconSrc } from '$lib/site/config';

	let {
		size = 'md',
		class: className = ''
	}: {
		size?: 'sm' | 'md';
		class?: string;
	} = $props();

	const iconSize = $derived(size === 'sm' ? 16 : 24);
	const iconClass = $derived(size === 'sm' ? 'size-4' : 'size-6');
</script>

<ul class={['space-y-2.5', className]}>
	{#each siteConfig.footer.socialLinks as social}
		<li>
			<a
				href={social.href}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 text-lg text-footer-muted transition-colors hover:text-nav"
			>
				{#if size === 'md'}
					<span class="flex size-5 items-center justify-center">
						<img
							src={socialIconSrc[social.icon]}
							alt=""
							width={iconSize}
							height={iconSize}
							class={iconClass}
							loading="lazy"
							decoding="async"
						/>
					</span>
				{:else}
					<img
						src={socialIconSrc[social.icon]}
						alt=""
						width={iconSize}
						height={iconSize}
						class={iconClass}
						loading="lazy"
						decoding="async"
					/>
				{/if}
				{social.label}
			</a>
		</li>
	{/each}
</ul>
