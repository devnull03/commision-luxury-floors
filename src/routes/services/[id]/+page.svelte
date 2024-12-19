<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { serviceData } from '$lib/stores.svelte';
	import * as Carousel from '$lib/components/ui/carousel';

	let selectedServiceData = $derived(serviceData[$page.params.id] || {});
	$inspect(selectedServiceData);

	$effect(() => {
		if (!selectedServiceData) {
			goto('/services');
		}
	});
</script>

<main class="mt-16 *:p-32">
	<!-- Carousel -->
	<section class="flex flex-col gap-20 bg-black text-center text-4xl text-white">
		<h1 class="font-[Cantarell]">
			Why {$page.params.id
				.split('-')
				.map((x) => x[0].toUpperCase() + x.slice(1))
				.join(' ')}s?
		</h1>

		<!-- TODO: create carousel -->

		<h2 class="font-[Alatsi] text-2xl font-semibold">{selectedServiceData.caption}</h2>
	</section>

	<!-- Applications -->
	<section class="font-[Cantarell]">
		<h3 class="mb-16 text-center text-2xl font-semibold">Applications</h3>
		<div class="grid w-full grid-cols-3 grid-rows-2">
			{#each selectedServiceData.applications as application, idx}
				<figure class="flex aspect-square flex-col items-center justify-center gap-4">
					<img src="/{$page.params.id}/applications/{idx}.png" alt="" class="w-[15vw]" />
					<figcaption class="text-sm">{application}</figcaption>
				</figure>
			{/each}
		</div>
	</section>

	<!-- Description -->
	<section class="bg-black font-[Cantarell] leading-8 text-white">
		{@html selectedServiceData.description}
	</section>

	<!-- Materials -->
	<section>
		<img src="/{$page.params.id}/pallet/mats.png" alt="" class="mb-4" />

		<div class=""></div>
	</section>
</main>
