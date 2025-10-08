<script>
	import { page } from '$app/stores';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	let { data } = $props();

	let open = $state(false);

	function close() {
		open = false;
	}

	function copyLink() {
		navigator.clipboard.writeText(`${window.location.origin}/animals/share/${$page.data.user.id}`);
		alert(`Copied ${window.location.origin}/animals/share/${$page.data.user.id} to clipboard!`);
	}
</script>

<nav class="px-1 py-4 bg-green-100 border-t border-gray-400">
	<div class="flex justify-evenly py-2 px-1 font-semibold">
		{#if $page.data?.user}
			<a href="/">Home</a>
			<a href="/animals/add-animal">Animals</a>
			<a href="/animals/add-food">Log</a>
			<a href="/animals/inventory">Inventory</a>
			<button onclick={copyLink}>Share</button>
		{/if}
	</div>
</nav>
