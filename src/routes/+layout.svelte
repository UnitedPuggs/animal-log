<script>
    import "../app.css";
    import Navbar from "$lib/Navbar.svelte"
    /**
     * @typedef {Object} Props
     * @property {import('svelte').Snippet} [children]
     */

    /** @type {Props} */
    let { children } = $props();
</script>

<Navbar />
<main class="text-black p-4">
    {@render children?.()}
</main>