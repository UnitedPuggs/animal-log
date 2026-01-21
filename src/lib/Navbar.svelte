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

<nav class="px-1 py-4 bg-green-100 border-t border-gray-400 sticky bottom-0 mt-auto mb-0">
	<div class="flex justify-evenly py-2 px-1 font-semibold text-center">
		{#if $page.data?.user}
			<a
				href="/"
				class="font-bold border-2 border-black p-2 rounded-lg bg-white w-20 active:scale-85 transition-all"
				>Home</a
			>
			<a
				href="/animals/add-animal"
				class="font-bold border-2 border-black p-2 rounded-lg bg-white w-20 active:scale-85 transition-all"
				>Animals</a
			>
			<a
				href="/animals/add-food"
				class="font-bold border-2 border-black p-2 rounded-lg bg-white w-20 active:scale-85 transition-all"
				>Feed</a
			>
			<a
				href="/animals/add-food/scan"
				class="font-bold border-2 border-black p-2 rounded-lg bg-white w-20 active:scale-85 transition-all"
				>Scan</a
			>
			<!--<a href="/animals/inventory">Inventory</a>-->
			<!--<button onclick={copyLink}>Share</button>-->
		{/if}
	</div>
</nav>
