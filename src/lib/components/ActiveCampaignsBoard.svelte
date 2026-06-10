<script lang="ts">
	import type { CampaignGroup } from '$lib/site/active-campaigns';
	import AnimatedAmount from '$lib/components/AnimatedAmount.svelte';
	import AnimatedAmountGroup from '$lib/components/AnimatedAmountGroup.svelte';

	let {
		groups,
		featuredId = null
	}: {
		groups: CampaignGroup[];
		featuredId?: string | null;
	} = $props();

	const totals = $derived.by(() => {
		let completed = 0;
		let collected = 0;
		let goal = 0;
		let total = 0;

		for (const group of groups) {
			for (const participant of group.participants) {
				total += 1;
				goal += participant.goal;
				collected += participant.collected;
				if (participant.completed) completed += 1;
			}
		}

		return { completed, collected, goal, total };
	});
</script>

<div class="campaigns-board">
	<p class="campaigns-board__summary text-base text-footer-muted">
		<AnimatedAmountGroup>
			Собрано полностью:
			<span class="font-bold text-nav">
				<AnimatedAmount value={totals.completed} format={{ maximumFractionDigits: 0 }} animateOnMount />
			</span>
			из {totals.total} · всего
			<span class="font-bold text-nav">
				<AnimatedAmount value={totals.collected} animateOnMount />
			</span>
			из <AnimatedAmount value={totals.goal} animateOnMount />
		</AnimatedAmountGroup>
	</p>

	<div class="campaigns-board__grid">
		{#each groups as group (group.id)}
			<section class="campaigns-board__group" aria-labelledby="group-{group.id}">
				<h2 id="group-{group.id}" class="campaigns-board__group-title">{group.title}</h2>
				<ul class="campaigns-board__list" aria-label={group.title}>
					{#each group.participants as participant (participant.id)}
						{@const isFeatured = featuredId === participant.id}
						<li
							class="campaigns-board__item"
							class:campaigns-board__item--done={participant.completed}
							class:campaigns-board__item--featured={isFeatured}
						>
							<span
								class="campaigns-board__status"
								class:campaigns-board__status--done={participant.completed}
								aria-hidden="true"
							>
								{participant.completed ? '✓' : '○'}
							</span>
							<div class="campaigns-board__label">
								<span class="campaigns-board__name">{participant.name}</span>
								{#if isFeatured}
									<span class="campaigns-board__badge">На главной</span>
								{/if}
							</div>
							<div class="campaigns-board__amount">
								<AnimatedAmountGroup>
									<span class="campaigns-board__collected">
										<AnimatedAmount value={participant.collected} animateOnMount />
									</span>
									<span class="campaigns-board__goal">
										/ <AnimatedAmount value={participant.goal} />
									</span>
								</AnimatedAmountGroup>
							</div>
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>
</div>
