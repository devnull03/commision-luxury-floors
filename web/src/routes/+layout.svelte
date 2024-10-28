<script>
    import { PUBLIC_COMPANY_NAME } from "$env/static/public";
    import Footer from "$lib/Footer.svelte";
    import Header from "$lib/Header.svelte";
    import "../app.css";
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
        <slot />
    </main>
    <Footer />
</div>
