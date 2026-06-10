<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { routes, siteConfig } from '$lib/site/config';

	let { status, error }: { status: number; error: App.Error | null } = $props();

	const isNotFound = $derived(status === 404);
	const title = $derived(isNotFound ? 'Страница не найдена' : 'Ой, что-то пошло не так');
	const message = $derived(
		isNotFound
			? 'Такой страницы нет или она была перемещена.'
			: (error?.message ??
					'Так как сайт еще в разработке, мы работаем над его улучшением. Попробуйте обновить страницу или вернуться на главную.')
	);
</script>

<svelte:head>
	<title>{status} — {siteConfig.name}</title>
</svelte:head>

<section
	class="container mx-auto flex w-full max-w-2xl flex-col items-center py-[clamp(2rem,8vw,4rem)] text-center"
>
	<p class="eyebrow">{status}</p>
	<h1 class="page-title">{title}</h1>
	<p class="text-body mt-3 text-pretty">{message}</p>
	<div class="mt-6">
		<Button href={routes.home}>На главную</Button>
	</div>
</section>
