<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import Button from '$lib/components/Button.svelte';
	import { navMenu, pageIdFromPath, routes, type PageId } from '$lib/site/config';
	import { sharePage } from '$lib/site/share';

	type NavStatus = 'closed' | 'open' | 'closing';

	const NAV_SCROLL_THRESHOLD = 48;

	let navStatus = $state<NavStatus>('closed');
	let scrolled = $state(false);
	let panelEl = $state<HTMLDivElement | null>(null);

	const activePage = $derived(pageIdFromPath(page.url.pathname));
	const isOpen = $derived(navStatus === 'open');
	const isClosing = $derived(navStatus === 'closing');

	function openNav() {
		navStatus = 'open';
	}

	function finishClose() {
		navStatus = 'closed';
	}

	function closeNav() {
		if (navStatus !== 'open') return;

		navStatus = 'closing';

		const onPanelTransitionEnd = (e: TransitionEvent) => {
			if (e.target !== panelEl || e.propertyName !== 'max-height') return;
			panelEl?.removeEventListener('transitionend', onPanelTransitionEnd);
			finishClose();
		};

		panelEl?.addEventListener('transitionend', onPanelTransitionEnd);
		window.setTimeout(finishClose, 650);
	}

	function toggleNav() {
		if (navStatus === 'open') closeNav();
		else if (navStatus !== 'closing') openNav();
	}

	function isActive(id: PageId) {
		return activePage === id;
	}

	async function share() {
		await sharePage();
		closeNav();
	}

	onMount(() => {
		const onScroll = () => {
			scrolled = window.scrollY > NAV_SCROLL_THRESHOLD;
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();

		const onKeydown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeNav();
		};
		document.addEventListener('keydown', onKeydown);

		return () => {
			window.removeEventListener('scroll', onScroll);
			document.removeEventListener('keydown', onKeydown);
			document.body.classList.remove('nav-open');
		};
	});

	$effect(() => {
		document.body.classList.toggle('nav-open', navStatus === 'open');
	});
</script>

<nav
	class="site-nav"
	id="site-nav"
	data-nav-status={navStatus}
	data-scrolled={scrolled ? 'true' : 'false'}
	aria-label="Главная навигация"
>
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="site-nav__backdrop"
		role="presentation"
		aria-hidden="true"
		onclick={closeNav}
	></div>

	<div class="site-nav__bar">
		<div class="site-nav__width">
			<div class="site-nav__shell">
				<div class="site-nav__outline" aria-hidden="true"></div>
				<div class="site-nav__bg" aria-hidden="true"></div>

				<div class="site-nav__top">
					<Button
						type="button"
						class="site-nav__menu-btn"
						ariaLabel="Меню"
						ariaExpanded={isOpen || isClosing}
						ariaControls="site-nav-panel"
						onclick={toggleNav}
					>
						<span class="site-nav__burger" aria-hidden="true"><span></span><span></span></span>
						<span class="site-nav__menu-label">Меню</span>
					</Button>

					<a href={routes.home} class="site-nav__brand">Вместе мы сила</a>

					<div class="site-nav__actions site-nav__actions--bar">
						<Button type="button" onclick={share}>Поделиться</Button>
					</div>
				</div>

				<div class="site-nav__panel" id="site-nav-panel" bind:this={panelEl}>
					<div class="site-nav__panel-inner">
						<div class="site-nav__panel-actions">
							<Button type="button" onclick={share}>Поделиться</Button>
						</div>
						{#each navMenu as section}
							<div>
								<span class="site-nav__eyebrow">{section.title}</span>
								<ul class="site-nav__links">
									{#each section.links as link}
										<li>
											<a
												href={link.href}
												class:is-active={isActive(link.pageId)}
												onclick={closeNav}>{link.label}</a
											>
										</li>
									{/each}
								</ul>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</nav>
