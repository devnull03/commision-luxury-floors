<script lang="ts">
    import { onMount } from "svelte";
    import { gsap } from "gsap";
    import Logo from "$lib/icons/logo.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import { scrollThreshold } from "$lib/animations.store";

    let initScroll = $state(0);
    let logoSize = 100;
    let tweenInstance: gsap.core.Tween;
//     let $scrollThreshold = 10;

    const handleScroll = () => {
        // console.log(initScroll);

        if (initScroll < $scrollThreshold) {
            tweenInstance.reverse();
        } else {
            tweenInstance.play();
        }
    };

    const whyPoints = [
        {
            title: "Resistant To Stains And Wear",
            desc: "Long-lasting protection that keeps surfaces looking new",
        },
        {
            title: "Glossy And Seamless Finish",
            desc: "Achieve a flawless look that enhances any space",
        },
        {
            title: "Custom Design And Color",
            desc: "Achieve a flawless look that enhances any space",
        },
        {
            title: "Eco-friendly Options",
            desc: "Sustainable options for healthier and greener environment",
        },
    ];

    const knowMorePoints = [
        {
            title: "Residential Flooring",
            desc: "For homes, featuring modern, stylish designs.",
        },
        {
            title: "Custom Design",
            desc: "High-traffic durability combined with luxury aesthetics",
        },
        {
            title: "Commercial Flooring",
            desc: "Bespoke patterns, metallic finishes for unique spaces",
        },
    ];

    onMount(() => {
        tweenInstance = gsap.to("#logo", {
            duration: 0.3,

            width: "4rem",
            height: "4rem",

            top: "1rem",
            left: "16%",
            filter: "invert(1)",
            webkitFilter: "invert(1)",

            ease: "power2.inOut",
            paused: initScroll < $scrollThreshold,
        });
    });
</script>

<svelte:window onscroll={handleScroll} bind:scrollY={initScroll} />

<main class="w-screen flex flex-col items-center gap-8 pb-16">
    <div id="logo" class="h-[50vh] w-[50vh] fixed top-[12vh] z-50">
        <Logo />
    </div>

    <div class="relative flex flex-row justify-evenly gap-0 w-full h-[80vh]">
        {#each Array(4) as _, i}
            <img
                src="/floor{i + 1}.png"
                class="w-1/4 object-cover object-left"
                alt=""
            />
        {/each}

        <div class="absolute bottom-16 flex flex-col items-center gap-8">
            <p class=" text-white text-xl leading-8 text-center font-[Alatsi]">
                Premium, seamless, and durable floors for modern homes <br /> and
                commercial spaces.
            </p>

            <Button variant="secondary">Explore Designs</Button>
        </div>
    </div>

    <div
        class="px-[16%] py-16 flex flex-col gap-16 w-full items-center font-[Alatsi]"
    >
        <h1 class="text-2xl leading-10">Why Epoxy Flooring ?</h1>
        <div
            class="w-full grid grid-flow-row-dense grid-rows-2 grid-cols-4 gap-16"
        >
            <div class="col-span-2 row-span-2 overflow-hidden">
                <img
                    src="/tiles.jpeg"
                    alt=""
                    class="object-cover h-full hover:scale-110 transition-all ease-in-out duration-500"
                />
            </div>

            {#each whyPoints as point, i}
                <div class="flex flex-row items-center font-[Alatsi] gap-2">
                    <span class="text-[9rem] leading-[50%]">{i + 1}</span>
                    <span>
                        {point.title} <br />
                        <span class="font-[Cantarell]">{point.desc}</span>
                    </span>
                </div>
            {/each}
        </div>
    </div>

    <div class="px-[16%] py-16 w-full grid grid-cols-3 gap-10">
        {#each knowMorePoints as point, i}
            <div class="flex flex-col items-center gap-4 text-center">
                <div class="overflow-hidden rounded-sm">
                    <img
                        src="/more{i + 1}.jpeg"
                        class="object-cover aspect-square hover:scale-110 transition-all ease-in-out duration-500"
                        alt=""
                    />
                </div>

                <span class="font-[Alatsi] text-xl"> {point.title}</span>
                <span class="font-[Cantarell] text-[#00000099]"
                    >{point.desc}</span
                >
            </div>
        {/each}
    </div>
</main>
