<script lang="ts">
	import { onMount } from 'svelte';

	onMount(async () => {
		const mountEl = document.createElement('div');
		mountEl.id = 'sileo-toaster-root';
		document.body.appendChild(mountEl);

		const [{ createRoot }, React, { Toaster }] = await Promise.all([
			import('react-dom/client'),
			import('react'),
			import('sileo')
		]);

		const root = createRoot(mountEl);
		root.render(
			React.createElement(Toaster, {
				position: 'top-center',
				offset: 16,
				theme: 'light',
				options: {
					fill: '#f0f7ff',
					roundness: 16,
					duration: 2500,
					styles: {
						title: 'text-[#1B3A6A]!',
						description: 'text-[#1B3A6A]/75!',
						badge: 'bg-[#1B3A6A]/10!',
						button: 'bg-[#1B3A6A]/10! hover:bg-[#1B3A6A]/15!'
					}
				}
			})
		);

		return () => {
			root.unmount();
			mountEl.remove();
		};
	});
</script>
