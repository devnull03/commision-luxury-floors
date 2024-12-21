<script lang="ts">
	import Instagram from '../icons/Instagram.svelte';
	import PhoneCall from '../icons/PhoneCall.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';
	import { scrollThreshold } from '$lib/animations.store';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Title } from './ui/card';
	import { Slider } from './ui/slider';
	import { Input } from './ui/input';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Logo from '../icons/logo.svelte';
	import { isMobile, quoteDialogOpen } from '$lib/stores.svelte';
	import { slide } from 'svelte/transition';

	let initScroll = $state(0);
	let isLandingPage = $derived($page.route.id === '/');

	let quoteArea = $state([0]);
	let quoteEpoxyType = $state<'Metalic' | 'Flake'>('Metalic');
	let quoteTotal = $derived(() => {
		let epoxyMultiplier = quoteEpoxyType === 'Metalic' ? 10 : 5;
		return quoteArea[0] * epoxyMultiplier;
	});

	let mobileNavButtonWidth: number = $state(0);
	let mobileNavOpen = $state(false);

	$effect(() => {
		$isMobile = mobileNavButtonWidth !== 0;
	});

	let colorState = $derived(!$isMobile ? initScroll < $scrollThreshold && isLandingPage : false);

	onMount(() => {});
</script>

<svelte:window bind:scrollY={initScroll} />

<nav class="realtive">
	{#if !isLandingPage}
		<div class="fixed left-[6%] top-4 z-[55] aspect-square h-16 w-16 invert">
			<Logo />
		</div>
	{/if}

	<div
		class="fixed top-0 z-50 flex h-24 w-full flex-row justify-between border-b px-[6%] {initScroll <
			$scrollThreshold && isLandingPage
			? 'border-transparent bg-transparent'
			: 'bg-white'} border-black transition-all duration-500 ease-in-out"
	>
		<button
			class="flex items-center pl-20 font-[Cantarell] text-xl lg:text-2xl {initScroll <
				$scrollThreshold && isLandingPage
				? 'text-transparent'
				: 'text-[#00000080]'}"
			id="header-logo-area"
			onclick={() => goto('/')}
		>
			Luxry Floors
		</button>

		<button
			class="absolute right-4 top-0 px-8 py-10 md:hidden lg:hidden {initScroll < $scrollThreshold &&
			isLandingPage
				? 'text-white'
				: 'text-black'}"
			bind:clientWidth={mobileNavButtonWidth}
			onclick={() => (mobileNavOpen = !mobileNavOpen)}
		>
			{#if mobileNavOpen}
				<span class="fa fa-times scale-150"></span>
			{:else}
				<span class="fa fa-bars scale-150"></span>
			{/if}
		</button>

		{#if !$isMobile || mobileNavOpen}
			<div
				transition:slide
				class="absolute top-24 z-[999] -mx-[6%] flex w-screen flex-col items-center justify-evenly gap-8 border-b border-black bg-white py-4 lg:relative lg:top-0 lg:mx-0 lg:w-auto lg:flex-row lg:border-transparent lg:bg-transparent lg:py-0"
			>
				<a href="/?services" class="{colorState ? 'text-white' : 'text-black'} font-semibold"
					>Services</a
				>

				<a href="https://instagram.com" class="text-xs font-semibold uppercase">
					<Instagram color={colorState ? 'white' : 'black'} />
				</a>
				<a href="tel:+1234567890" class="text-xs font-semibold uppercase">
					<PhoneCall color={colorState ? 'white' : 'black'} />
				</a>

				<Button
					onclick={() => ($quoteDialogOpen = true)}
					variant={colorState ? 'secondary' : 'default'}>Get Quote</Button
				>
			</div>
		{/if}
	</div>
</nav>

<Dialog.Root bind:open={$quoteDialogOpen}>
	<Dialog.Content class="lg:max-w-[60vw]">
		<Dialog.Header>
			<Dialog.Title class="text-center text-2xl font-semibold">Quote</Dialog.Title>
		</Dialog.Header>

		<div class="flex w-full flex-col items-center justify-evenly lg:flex-row">
			<!-- quote calculator -->
			<div class="grid h-full w-full grid-cols-2 grid-rows-6 gap-4 p-8 font-semibold lg:w-1/2">
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
					>From: ${quoteTotal()}</span
				>
			</div>

			<!-- divider -->
			<div class="h-0.5 w-[60%] rounded-lg bg-black lg:h-[60%] lg:w-0.5">&nbsp;</div>

			<!-- custom quote -->
			<div
				class="flex h-full w-full flex-col items-center justify-center gap-4 *:max-w-[70%] lg:w-1/2"
			>
				<!-- TODO: add staticforms functionality -->
				<h6 class="flex items-end text-lg font-semibold">Custom Design</h6>
				<Input type="text" placeholder="Name" />
				<Input type="phone" placeholder="Phone" />
				<Input type="email" placeholder="Email" />
				<Button class="px-8">Submit</Button>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
