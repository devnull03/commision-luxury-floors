<script lang="ts">
	import { PUBLIC_COMPANY_NAME, PUBLIC_DOMAIN } from '$env/static/public';
	import Logo from './icons/logo.svelte';

	const menuItems = [
		{ label: 'OUR STORY', route: '/our-story' },
		{ label: 'SERVICES', route: '/services' },
		{ label: 'TERMS AND CONDITIONS', route: '/terms-and-conditions' },
		{ label: 'GALLERY', route: '/gallery' },
		{ label: 'FREE QUOTES', route: '/free-quotes' }
	];
</script>

<footer class="flex h-[70vh] flex-col items-center gap-8 bg-black px-[6%] pb-4 pt-16 text-white">
	<div
		class="flex w-full flex-row justify-between text-[#FFFFFF99] *:*:underline *:*:transition-all *:*:duration-300 *:*:ease-in-out hover:*:*:text-white"
	>
		<!-- TODO: add social links -->
		<div class="">
			<a href="">Book A Call</a>
		</div>
		<div class="flex gap-8">
			<a href="">Instagram</a>
			<a href="">TikTok</a>
		</div>
	</div>

	<div class="foot-logo aspect-square h-[40vh] overflow-hidden">
		<Logo />
	</div>

	<div
		class="flex w-full flex-row justify-around gap-4 *:transition-all *:duration-300 *:ease-in-out"
	>
		{#each menuItems as item, i}
			<a
				href={item.route}
				class="whitespace-normal break-keep font-[Cantarell] text-lg font-bold text-white hover:text-[#FFFFFF99]"
			>
				{item.label}
			</a>
		{/each}
	</div>

	<div class="w-full text-center font-[Cantarell] text-sm text-[#FFFFFF99]">
		<p>{PUBLIC_DOMAIN}</p>
		<p>
			Copyright © 2024 - 2028 {PUBLIC_COMPANY_NAME}. All rights reserved.
		</p>
	</div>
</footer>

<style type="postcss">
	.foot-logo {
		filter: invert(67%) sepia(9%) saturate(1858%) hue-rotate(3deg) brightness(200%) contrast(88%);
	}
</style>
