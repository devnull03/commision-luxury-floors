<script lang="ts">
	import { PUBLIC_COMPANY_NAME } from '$env/static/public';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { services } from '$lib/stores.svelte';

	let dialogOpen = $state(false);
	let dialogImageSrc = $state('');
</script>

<svelte:head>
	<title>Portfolio | {PUBLIC_COMPANY_NAME}</title>
</svelte:head>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content>
		<ScrollArea class="max-h-[80vh]">
			<img src={dialogImageSrc} alt="" />
		</ScrollArea>
	</Dialog.Content>
</Dialog.Root>

{#snippet sectionFigure(gridCtrl: string, section: string, idx: number)}
	<Tooltip.Root openDelay={300}>
		<Tooltip.Trigger
			onclick={() => {
				dialogOpen = true;
				dialogImageSrc = `/${section}/portfolio/${idx}.jpg`;
			}}
			class="overflow-hidden object-cover {gridCtrl}"
		>
			<img
				loading="lazy"
				src="/{section}/portfolio/{idx}.jpg"
				alt=""
				class="h-full w-full object-cover transition-all duration-500 ease-in-out hover:scale-110"
			/>
		</Tooltip.Trigger>

		<Tooltip.Content>
			<span>Click to expand</span>
		</Tooltip.Content>
	</Tooltip.Root>
{/snippet}

<main class="lg:mt-16 mt-28 flex h-full flex-col gap-12 lg:gap-16 p-[6vw] font-[Cantarell]">
	<h1 class="text-center text-3xl font-semibold">Portfolio</h1>

	{#each services as section}
		{@const sectionTitle = section.replaceAll('-', ' ')}
		<section class="">
			<h5 class="mb-4 flex items-baseline justify-between text-xl">
				{sectionTitle[0].toUpperCase() + sectionTitle.slice(1)}
				<a
					href="/services/{section}"
					class="text-xs italic transition-all duration-300 ease-in-out hover:border-b hover:border-b-black"
					>Read more...</a
				>
			</h5>

			<div class="grid h-[130vh] grid-cols-7 grid-rows-3 gap-1 lg:gap-8 overflow-clip">
				{@render sectionFigure('col-span-5', section, 0)}
				{@render sectionFigure('col-span-2', section, 1)}
				{@render sectionFigure('col-span-2', section, 2)}
				{@render sectionFigure('lg:col-span-2 col-span-5', section, 3)}
				{@render sectionFigure('lg:col-span-3 col-span-7', section, 4)}
				{@render sectionFigure('col-span-2', section, 5)}
				{@render sectionFigure('col-span-5', section, 6)}
			</div>
		</section>
	{/each}
</main>
