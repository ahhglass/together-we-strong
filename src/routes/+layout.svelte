<script lang="ts">
	import { page } from '$app/state';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { siteConfig } from '$lib/site/config';
	import '$lib/styles/base.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	const isHome = $derived(page.url.pathname === '/');
	const siteOrigin = $derived(
		page.url.origin && !page.url.origin.includes('sveltekit-prerender')
			? page.url.origin
			: siteConfig.siteUrl
	);
	const ogImage = $derived(`${siteOrigin}${siteConfig.ogImagePath}`);
	const ogUrl = $derived(`${siteOrigin}${page.url.pathname}`);
</script>

<svelte:head>
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="ru_RU" />
	<meta property="og:site_name" content={siteConfig.name} />
	<meta property="og:title" content={siteConfig.name} />
	<meta property="og:description" content={siteConfig.shareText} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:url" content={ogUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={ogImage} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&display=swap"
	/>
	<link rel="icon" href={favicon} />
</svelte:head>

<a href="#main-content" class="skip-link">Перейти к содержимому</a>
<Navbar />
<main id="main-content" class="page-content" class:page-content--flush={isHome} tabindex="-1">
	{@render children()}
</main>
<Footer />
