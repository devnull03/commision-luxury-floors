<script lang="ts">
    import Instagram from "./icons/Instagram.svelte";
    import PhoneCall from "./icons/PhoneCall.svelte";
    import { Button } from "$lib/components/ui/button";
    import { gsap } from "gsap";
    import { onMount } from "svelte";
    import { scrollThreshold } from "$lib/animations.store";

    let tweens: gsap.core.Tween[] = [];
    let initScroll = $state(0);

    const handleScroll = () => {
        if (window.scrollY < $scrollThreshold) {
            tweens.forEach((tween) => {
                tween.play();
            });
        } else {
            tweens.forEach((tween) => {
                tween.reverse();
            });
        }
    };

    onMount(() => {});
</script>

<svelte:window onscroll={handleScroll} bind:scrollY={initScroll} />

<nav class="">
    <div
        class="top-0 fixed h-24 w-full z-50 flex flex-row justify-between px-[16%] {initScroll <
        5
            ? 'bg-transparent'
            : 'bg-white'} transition-all duration-500 ease-in-out"
    >
        <div
            class="pl-20 flex items-center text-2xl font-[Cantarell] {initScroll <
            5
                ? 'text-transparent'
                : 'text-[#00000080]'}"
            id="header-logo-area"
        >
            Luxry Floors
        </div>

        <div class="flex flex-row justify-evenly gap-8 items-center">
            <a
                href="https://instagram.com"
                class="text-xs font-semibold uppercase"
            >
                <Instagram color={initScroll < $scrollThreshold ? "white" : "black"} />
            </a>
            <a href="tel:+1234567890" class="text-xs font-semibold uppercase">
                <PhoneCall color={initScroll < $scrollThreshold ? "white" : "black"} />
            </a>

            <Button variant={initScroll < $scrollThreshold ? "secondary" : "default"}
                >Get Quote</Button
            >
        </div>
    </div>
</nav>
