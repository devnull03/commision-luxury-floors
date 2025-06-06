<script lang="ts">
	import '../app.css';
	import { fade } from 'svelte/transition';
	import { PUBLIC_COMPANY_NAME } from '$env/static/public';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { CaretUp } from 'svelte-radix';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let scrollY = $state(0);
	let { children }: Props = $props();
</script>

<svelte:head>
	<title>{PUBLIC_COMPANY_NAME}</title>

	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<link rel="shortcut icon" href="/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<meta name="apple-mobile-web-app-title" content="Luxury Floors" />
	<link rel="manifest" href="/site.webmanifest" />

	<meta name="description" content="High-end flooring solutions for your home or business." />
	<meta
		name="keywords"
		content="luxury floors, premium flooring, interior design, home improvement"
	/>
	<meta property="og:title" content="Luxury Floors" />
	<meta
		property="og:description"
		content="High-end flooring solutions for your home or business."
	/>
	<meta property="og:image" content="/favicon-96x96.png" />
	<meta property="og:url" content="https://www.luxuryfloors.ca" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Luxury Floors" />
	<meta
		name="twitter:description"
		content="High-end flooring solutions for your home or business."
	/>
	<meta name="twitter:image" content="/favicon-96x96.png" />
	<meta name="author" content="Luxury Floors Inc." />
	<meta name="geo.placename" content="British Columbia, Canada" />
	<meta name="geo.region" content="CA-BC" />
	
	<!-- SEO: Robots and Sitemap -->
	<link rel="sitemap" type="application/xml" href="/sitemap.xml" />
</svelte:head>

<svelte:window bind:scrollY />

<Toaster />

<!-- {#key load} -->
<div class="flex h-screen flex-col justify-between">
	<Header />
	<main class="">
		{@render children?.()}
	</main>
	<Footer />
</div>
<!-- {/key} -->

{#if scrollY !== 0}
	<button
		transition:fade
		class="group fixed bottom-6 right-6 z-[999] rounded-full bg-[#C7A865] object-cover p-4 shadow-lg transition-all duration-500 hover:-translate-y-1"
		aria-label="Scroll to top"
		onclick={() => {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}}
	>
		<CaretUp color="white" class="scale-125 transition-all duration-500 group-hover:scale-110" />
	</button>
{/if}

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
<link
	href="https://fonts.googleapis.com/css2?family=Alatsi&family=Cantarell:ital,wght@0,400;0,700;1,400;1,700&display=swap"
	rel="stylesheet"
/>
