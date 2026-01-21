<script>
	import '../app.css';
	import Navbar from '$lib/Navbar.svelte';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<!--
<Navbar />
-->
<div class="flex flex-col min-h-screen text-black">
	<main class="p-4">
		{@render children?.()}
	</main>
	<Navbar />
</div>
