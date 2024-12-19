<script lang="ts">
	import { PUBLIC_COMPANY_NAME } from '$env/static/public';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	const sectionImageCount = 7;
	const sections = [
		'metalic-epoxy-floors',
		'flake-epoxy-floors',
		'epoxy-countertops',
		'texture-deck',
		'concrete-walls'
	];

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
				dialogImageSrc = `/portfolio/${section}/${idx}.jpg`;
			}}
			class="overflow-hidden object-cover {gridCtrl}"
		>
			<img
				src="/portfolio/{section}/{idx}.jpg"
				alt=""
				class="h-full w-full object-cover transition-all duration-500 ease-in-out hover:scale-110"
			/>
		</Tooltip.Trigger>

		<Tooltip.Content>
			<span>Click to expand</span>
		</Tooltip.Content>
	</Tooltip.Root>
{/snippet}

<main class="mt-24 flex h-full flex-col gap-16 p-[6vw] font-[Cantarell]">
	<h1 class="text-center text-3xl font-semibold">Portfolio</h1>

	{#each sections as section}
		{@const sectionTitle = section.replaceAll('-', ' ')}
		<section class="">
			<h5 class="mb-4 text-lg">
				{sectionTitle[0].toUpperCase() + sectionTitle.slice(1)}
			</h5>

			<div class="grid h-[130vh] grid-cols-7 grid-rows-3 gap-8 overflow-clip">
				{@render sectionFigure('col-span-5', section, 0)}
				{@render sectionFigure('col-span-2', section, 1)}
				{@render sectionFigure('col-span-2', section, 2)}
				{@render sectionFigure('col-span-2', section, 3)}
				{@render sectionFigure('col-span-3', section, 4)}
				{@render sectionFigure('col-span-2', section, 5)}
				{@render sectionFigure('col-span-5', section, 6)}
			</div>
		</section>
	{/each}
</main>
