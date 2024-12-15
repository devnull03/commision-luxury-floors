<script lang="ts">
    import { PUBLIC_COMPANY_NAME } from "$env/static/public";
    import Footer from "$lib/Footer.svelte";
    import Header from "$lib/Header.svelte";
    import "../app.css";
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
</script>

<svelte:head>
    <title>{PUBLIC_COMPANY_NAME}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Alatsi&family=Cantarell:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        rel="stylesheet"
    />
</svelte:head>

<div class="h-screen flex flex-col justify-between">
    <Header />
    <main class="">
        {@render children?.()}
    </main>
    <Footer />
</div>
