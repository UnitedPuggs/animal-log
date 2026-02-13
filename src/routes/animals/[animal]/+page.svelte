<script>
	import { page } from '$app/stores';
	import { pb } from '$lib/pocketbase';
	import { goto, invalidateAll } from '$app/navigation';

	let { data } = $props();

	function convertDate(dateStr) {
		const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const DATE = new Date(dateStr);
		const CONVERTED = DATE.toLocaleDateString('en-US', { timeZone: tz });
		return CONVERTED;
	}

	function openRemove() {
		document.getElementById('delete-animal').showModal();
	}

	function closeRemove() {
		document.getElementById('delete-animal').close();
	}

	async function removeFeeding(id) {
		const lastFedRecord = await pb.collection('feedings').getFirstListItem(`animal='${$page.params.animal}'`, {
			sort: '-fed'			
		});
		await pb.collection('feedings').delete(`${id}`);

		// if the record is NOT the latest then we don't care
		if (lastFedRecord.id === id) {
			const newLastFed = await pb.collection('feedings').getFirstListItem(`animal='${$page.params.animal}'`, {
			sort: '-fed'			
			});
			const updateFed = await pb.collection('animals').update(`${$page.params.animal}`, {lastFed: newLastFed.fed})
		}

		invalidateAll();
	}

	async function deleteAnimal() {
		await pb.collection('animals').delete(`${$page.params.animal}`);
		goto('/animals');
	}
</script>

<svelte:head>
	<title>{data.name}'s Info</title>
</svelte:head>

<div class="flex flex-col justify-center items-center">
	<!--- MODAL FOR REMOVING ANIMAL -->
	<dialog id="delete-animal" class="rounded-xl m-auto">
		<div class="flex flex-col p-6">
			<span class="text-xl font-bold">Are you absolutely sure?</span>
			<p class="text-gray-400 w-72 lg:w-96">
				This action cannot be undone. This will permanently remove your animals and associated
				feedings from our servers.
			</p>
			<section class="flex justify-center gap-2 mt-4">
				<button
					class="border-2 border-black rounded-lg p-2 font-bold bg-white transition-all duration-200 hover:scale-95"
					onclick={deleteAnimal}
				>
					Continue
				</button>
				<button
					class="border-2 rounded-lg px-4 py-2 text-gray-500 bg-white transition-all duration-200 hover:scale-95"
					onclick={closeRemove}
				>
					Cancel
				</button>
			</section>
		</div>
	</dialog>
	<!-------------------------------->
	<section class="flex justify-center gap-1 my-2">
		<a
			href="add-food?animal={data.name}"
			class="border-2 border-black rounded-lg p-2 font-bold bg-white transition-all duration-200 hover:scale-95 w-20 text-center"
		>
			Feed
		</a>
		<a
			href="{$page.params.animal}/edit"
			class="border-2 border-black rounded-lg p-2 font-bold bg-white transition-all duration-200 hover:scale-95 w-20 text-center"
		>
			Edit
		</a>
		<button
			class="border-2 border-black rounded-lg p-2 font-bold bg-white transition-all duration-200 hover:scale-95 w-20 text-center"
			onclick={openRemove}
		>
			Remove
		</button>
	</section>
	{#await data.feedings}
		<span>Loading feedings...</span>
	{:then feedings}
		{#if feedings.length > 0}
			<div
				class="flex flex-col border-2 border-black rounded-xl bg-white p-2 shadow lg:w-auto w-80"
			>
				<h3 class="font-bold text-2xl text-center pb-2">{data.name}'s Feedings</h3>
				<hr class="border-black pb-2" />
				<section class="flex flex-col gap-1">
					{#each feedings as food}
						<div
							class="flex gap-1 justify-between border border-black rounded-lg px-2 py-1 font-semibold lg:w-72 h-14 lg:h-auto"
						>
							<section>
								<span>{food.food} fed on {convertDate(food.fed)}</span>
							</section>
							<section class="flex border-l border-black">
								<button onclick={() => removeFeeding(food.id)} class="px-1 text-lg">🗑️</button>
							</section>
						</div>
					{/each}
				</section>
			</div>
		{:else}
			<div class="flex flex-col justify-center items-center gap-1">
				<h5 class="font-bold text-2xl">NO FEEDINGS TO SHOW</h5>
				<a
					href="/animals/add-food?animal={data.name}"
					class="border-2 border-black rounded-lg p-2 font-bold bg-white transition-all duration-200 hover:scale-95"
					>Add Feeding</a
				>
			</div>
		{/if}
	{/await}
</div>
