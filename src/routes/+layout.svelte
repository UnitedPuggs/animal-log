<script>
    import "../app.css";
    import Navbar from "$lib/Navbar.svelte"
    export let data;
</script>

<Navbar {data}/>
<main class="text-black p-4">
    <slot />
</main>