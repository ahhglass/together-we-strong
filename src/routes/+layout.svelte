<script lang="ts">
	import { page } from '$app/state';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '$lib/styles/base.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	const isHome = $derived(page.url.pathname === '/');
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&display=swap"
	/>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar />
<main class="page-content" class:page-content--flush={isHome}>
	{@render children()}
</main>
<Footer />
