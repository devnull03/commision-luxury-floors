<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { serviceData } from '$lib/stores.svelte';
	import * as Carousel from '$lib/components/ui/carousel';
	import * as Card from '$lib/components/ui/card';
	import { type CarouselAPI } from '$lib/components/ui/carousel/context';
	import { Button } from '$lib/components/ui/button';
	import Autoplay from 'embla-carousel-autoplay';
	import { fade, slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	let selectedServiceData = $derived(serviceData[$page.params.id]);

	let carouselAPI: CarouselAPI | undefined = $state();
	let currentSlide = $state(0);
	let carouselCaptions = [
		'Vibrant Colors',
		'Infinite Creation',
		'Easy to Install',
		'UV Stable',
		'2-Day Application',
		'Can Be Polished'
	];

	$effect(() => {
		if (carouselAPI) {
			carouselAPI.on('select', () => {
				if (carouselAPI) currentSlide = carouselAPI.selectedScrollSnap();
			});
		}
	});

	$effect(() => {
		if (!selectedServiceData) {
			goto('/?services');
		}
	});
</script>

<main class="mt-16 *:p-32">
	<!-- Carousel -->
	<section class="flex flex-col bg-black text-center text-4xl text-white">
		<h1 class="mb-16 font-[Cantarell]">
			Why {$page.params.id
				.split('-')
				.map((x) => x[0].toUpperCase() + x.slice(1))
				.join(' ')}?
		</h1>

		<Carousel.Root
			plugins={[Autoplay({ delay: 2000 })]}
			class="-mx-32 mb-8 select-none"
			bind:api={carouselAPI}
		>
			<Carousel.Content class="ml-[25vw] max-w-[50vw] pr-1">
				{#each Array(6) as _, idx}
					<Carousel.Item
						onclick={() => carouselAPI?.scrollTo(idx)}
						class="cursor-pointer pl-1 {currentSlide === idx ||
							'scale-90'} transition-all duration-300 ease-in-out"
					>
						<Card.Root class="overflow-hidden !border-black">
							<Card.Content class="aspect-16/9 overflow-hidden object-cover p-0">
								<img
									src="/{$page.params.id}/carousel/{idx}.jpg"
									alt=""
									class="aspect-16/9 max-h-[50vh] w-full scale-125 rounded-2xl object-cover object-center"
								/></Card.Content
							>
						</Card.Root>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
		</Carousel.Root>

		{#key currentSlide}
			<h2 transition:slide={{ duration: 1000 }} class="font-[Alatsi] text-2xl font-semibold">
				{carouselCaptions[currentSlide]}
			</h2>
		{/key}
	</section>

	<!-- Applications -->
	<section class="font-[Cantarell]">
		<h3 class="mb-16 text-center text-2xl font-semibold">Applications</h3>
		<div class="grid w-full grid-cols-3 grid-rows-2">
			{#each selectedServiceData.applications as application, idx}
				<figure class="flex aspect-square flex-col items-center justify-center gap-4">
					<img src="/{$page.params.id}/applications/{idx}.png" alt="" class="w-[10vw]" />
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

		<div class="flex flex-col items-center gap-6 rounded-3xl bg-black py-20">
			<div class="mx-auto flex">
				<div class="flex w-1/2 flex-row-reverse justify-center gap-0 *:-mr-[10%]">
					{#each Array(4) as _, idx}
						<img src="/{$page.params.id}/pallet/{idx}.png" alt="" class="aspect-square w-1/4" />
					{/each}
				</div>

				<div class="pl-8 text-2xl font-semibold text-white">
					<ul class="flex h-full list-inside list-disc flex-col justify-center">
						{#each selectedServiceData.colorChartPoints as point}
							<li>{point}</li>
						{/each}
					</ul>
				</div>
			</div>

			<Button variant="secondary" class="w-min">Download Color Chart</Button>
		</div>
	</section>
</main>
