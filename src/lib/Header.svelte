<script lang="ts">
	import Instagram from './icons/Instagram.svelte';
	import PhoneCall from './icons/PhoneCall.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';
	import { scrollThreshold } from '$lib/animations.store';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Title } from './components/ui/card';
	import { Slider } from './components/ui/slider';
	import { Input } from './components/ui/input';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Logo from './icons/logo.svelte';

	let initScroll = $state(0);
	let isLandingPage = $derived($page.route.id === '/');

	let quoteArea = $state([0]);
	let quoteEpoxyType = $state<'Metalic' | 'Flake'>('Metalic');
	let quoteTotal = $derived(() => {
		// TODO: add quote formula
		let epoxyMultiplier = quoteEpoxyType === 'Metalic' ? 10 : 5;
		return quoteArea[0] * epoxyMultiplier;
	});

	onMount(() => {});
</script>

<svelte:window bind:scrollY={initScroll} />

<nav class="">
	{#if !isLandingPage}
		<div class="fixed left-[6%] top-4 z-[999] aspect-square h-16 w-16 invert">
			<Logo />
		</div>
	{/if}

	<div
		class="fixed top-0 z-50 flex h-24 w-full flex-row justify-between px-[6%] {initScroll <
			$scrollThreshold && isLandingPage
			? 'bg-transparent'
			: 'bg-white'} transition-all duration-500 ease-in-out"
	>
		<button
			class="flex items-center pl-20 font-[Cantarell] text-2xl {initScroll < $scrollThreshold &&
			isLandingPage
				? 'text-transparent'
				: 'text-[#00000080]'}"
			id="header-logo-area"
			onclick={() => goto('/')}
		>
			Luxry Floors
		</button>

		<div class="flex flex-row items-center justify-evenly gap-8">
			<a href="https://instagram.com" class="text-xs font-semibold uppercase">
				<Instagram color={initScroll < $scrollThreshold && isLandingPage ? 'white' : 'black'} />
			</a>
			<a href="tel:+1234567890" class="text-xs font-semibold uppercase">
				<PhoneCall color={initScroll < $scrollThreshold && isLandingPage ? 'white' : 'black'} />
			</a>

			<Dialog.Root>
				<Dialog.Trigger
					class={buttonVariants({
						variant: initScroll < $scrollThreshold && isLandingPage ? 'secondary' : 'default'
					})}
				>
					Get Quote
				</Dialog.Trigger>
				<Dialog.Content class="max-w-[60vw]">
					<Dialog.Header>
						<Dialog.Title class="text-center text-2xl font-semibold">Quote</Dialog.Title>
					</Dialog.Header>

					<div class="flex w-full items-center justify-evenly">
						<!-- quote calculator -->
						<div class="grid h-full w-1/2 grid-cols-2 grid-rows-6 gap-4 font-semibold lg:p-8">
							<h6 class="col-span-2 flex items-end">Type of Epoxy</h6>

							<Button
								variant={quoteEpoxyType === 'Metalic' ? 'default' : 'secondary'}
								onclick={() => (quoteEpoxyType = 'Metalic')}>Metalic</Button
							>
							<Button
								variant={quoteEpoxyType === 'Flake' ? 'default' : 'secondary'}
								onclick={() => (quoteEpoxyType = 'Flake')}>Flake</Button
							>

							<h6 class="col-span-2 flex items-end">Area of the Floor</h6>

							<Slider class="col-span-2" bind:value={quoteArea} max={5000} />

							&nbsp;

							<span class="flex items-center justify-center">{quoteArea} sqft</span>

							<span class="col-span-2 {buttonVariants({ variant: 'default' })}"
								>Total Estimate: ${quoteTotal()}</span
							>
						</div>

						<!-- divider -->
						<div class=" h-[60%] w-0.5 rounded-lg bg-black">&nbsp;</div>

						<!-- custom quote -->
						<div class="flex h-full w-1/2 flex-col items-center justify-center gap-4 *:max-w-[70%]">
							<!-- TODO: add staticforms functionality -->
							<h6 class="flex items-end text-lg font-semibold">Custom Design</h6>
							<Input type="text" placeholder="Name" />
							<Input type="email" placeholder="Email" />
							<Button class="px-8">Submit</Button>
						</div>
					</div>
				</Dialog.Content>
			</Dialog.Root>
		</div>
	</div>
</nav>
