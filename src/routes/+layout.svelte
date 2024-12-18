<script lang="ts">
	import { PUBLIC_COMPANY_NAME } from '$env/static/public';
	import Footer from '$lib/Footer.svelte';
	import Header from '$lib/Header.svelte';
	import { fade } from 'svelte/transition';
	import '../app.css';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let scrollY = $state(0);
	let { children }: Props = $props();
</script>

<svelte:head>
	<title>{PUBLIC_COMPANY_NAME}</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Alatsi&family=Cantarell:ital,wght@0,400;0,700;1,400;1,700&display=swap"
		rel="stylesheet"
	/>
	<script src="https://kit.fontawesome.com/30f055fc02.js" crossorigin="anonymous"></script>
</svelte:head>

<svelte:window bind:scrollY />

<div class="flex h-screen flex-col justify-between">
	<Header />
	<main class="">
		{@render children?.()}
	</main>
	<Footer />
</div>

{#if scrollY !== 0}
	<button
		transition:fade
		class="group fixed bottom-6 right-6 z-[999] rounded-full bg-[#C7A865] object-cover py-0.5 shadow-lg transition-all duration-500 hover:-translate-y-1"
		aria-label="yuh"
		onclick={() => {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}}
	>
		<span
			class="fa fa-angle-left rotate-90 px-5 py-4 text-white transition-all duration-500 group-hover:scale-110"
		></span>
	</button>
{/if}
