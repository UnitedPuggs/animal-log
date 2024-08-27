<script>
    import "../app.css";
    import Navbar from "$lib/Navbar.svelte"
</script>

<Navbar />
<main class="text-black p-4">
    <slot />
</main>