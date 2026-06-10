<script lang="ts">
	import { page } from '$app/state';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { SileoToaster } from '$lib/toast';
	import '$lib/styles/base.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	const isHome = $derived(page.url.pathname === '/');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar />
<main class="page-content" class:page-content--flush={isHome}>
	{@render children()}
</main>
<Footer />
<SileoToaster />
