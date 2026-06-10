<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { siteConfig, socialIconSrc } from '$lib/site/config';

	const year = new Date().getFullYear();
	const { footer } = siteConfig;
</script>

<footer class="pb-[var(--page-offset-bottom)]">
	<div class="container">
		<div
			class="relative overflow-hidden rounded-[1.05rem] bg-footer px-[clamp(1.25rem,4vw,2.5rem)] py-[clamp(1.5rem,4vw,2.5rem)]"
		>
			<p
				class="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center select-none"
				aria-hidden="true"
			>
				<span
					class="block translate-y-[0%] whitespace-nowrap text-[clamp(2.75rem,13vw,6.5rem)] font-extrabold uppercase leading-none tracking-tight text-nav/7"
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
						<ul class="mt-4 space-y-2.5">
							{#each footer.socialLinks as social}
								<li>
									<a
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										class="inline-flex items-center gap-2 text-lg text-footer-muted transition-colors hover:text-nav"
									>
										<span class="flex size-5 items-center justify-center">
											<img
												src={socialIconSrc[social.icon]}
												alt=""
												width="24"
												height="24"
												class="size-6"
												loading="lazy"
												decoding="async"
											/>
										</span>
										{social.label}
									</a>
								</li>
							{/each}
						</ul>

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
