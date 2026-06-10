<script lang="ts">
	let {
		variant,
		embedded = false
	}: {
		variant: 'pending' | 'completed';
		embedded?: boolean;
	} = $props();

	const copy = $derived(
		variant === 'pending'
			? {
					title: 'Список участников готовится',
					text: 'В данный момент составляется список и набор участников для сбора. Зайдите позже — скоро здесь появятся актуальные данные.'
				}
			: {
					title: 'Все сборы завершены',
					text: 'Спасибо всем, кто помог! Следите за новостями — скоро появятся новые инициативы.'
				}
	);
</script>

<section
	class="text-center text-pretty"
	class:container={!embedded}
	class:pt-[var(--page-offset-top)]={!embedded}
	class:pb-[clamp(3rem,8vw,5rem)]={!embedded}
	class:py-4={embedded}
>
	<h1 class="text-2xl font-extrabold text-nav sm:text-3xl">{copy.title}</h1>
	<p class="mt-4 text-lg text-footer-muted">{copy.text}</p>
</section>
