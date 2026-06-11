<script lang="ts">
	import SocialLinks from '$lib/components/SocialLinks.svelte';
	import { siteConfig } from '$lib/site/config';

	const year = new Date().getFullYear();
	const { footer } = siteConfig;
</script>

<footer class="pb-[var(--page-offset-bottom)]">
	<div class="container">
		<div
			class="card relative overflow-hidden px-[clamp(1.25rem,4vw,2.5rem)] py-[clamp(1.5rem,4vw,2.5rem)]"
		>
			<p
				class="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex w-full justify-center overflow-hidden px-2 select-none sm:px-4"
				aria-hidden="true"
			>
				<span
					class="block w-full max-w-full origin-bottom text-center whitespace-nowrap text-[clamp(1.125rem,7.5vw,6.5rem)] font-extrabold uppercase leading-none tracking-tight text-nav/7 max-sm:tracking-tighter"
				>
					{siteConfig.watermark}
				</span>
			</p>

			<div class="relative z-10 pb-[clamp(2rem,6vw,3.5rem)]">
				<div class="grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
					<div class="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
						<div>
							<h2 class="text-pretty text-lg font-extrabold text-nav">
								{siteConfig.name}
							</h2>
							<p class="mt-2 text-pretty text-lg leading-relaxed text-footer-muted">
								{footer.mission}
							</p>
						</div>
					</div>

					<div>
						<h3 class="text-lg font-extrabold text-nav">Навигация</h3>
						<ul class="mt-4 space-y-2.5">
							{#each footer.navLinks as link}
								<li>
									<a
										href={link.href}
										class="text-lg text-footer-muted transition-colors hover:text-nav"
									>
										{link.label}
									</a>
								</li>
							{/each}
						</ul>
					</div>

					<div>
						<h3 class="text-lg font-extrabold text-nav">Социальные сети</h3>
						<SocialLinks size="md" class="mt-4" />

						<a
							href="mailto:{siteConfig.contactEmail}"
							class="mt-4 inline-block text-lg text-footer-muted underline decoration-footer-muted/40 underline-offset-2 transition-colors hover:text-nav"
						>
							{siteConfig.contactEmail}
						</a>
					</div>
				</div>

				<div class="mt-8 border-t border-footer-muted/20 pt-6 text-center">
					<p class="text-base text-footer-muted">
						© {siteConfig.copyrightStartYear}{year > siteConfig.copyrightStartYear
							? `–${year}`
							: ''}
						{siteConfig.organizerName}. Все права защищены.
					</p>
				</div>
			</div>
		</div>
	</div>
</footer>
