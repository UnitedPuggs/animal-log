<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { pb } from '$lib/pocketbase.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { getDayOfWeek, timeSince } from '$lib/dates.js';

	let { data } = $props();

	let animals = $state([]);
	let tasks = $state([]);
	let feedings = $state([]);
	let upcoming = $state(0);

	async function getLastFeed(animal) {
		const record = await pb.collection('feedings').getFirstListItem(`animal='${animal}'`, {
			sort: '-fed'
		});
		console.log(record);
		return record;
	}

	async function repeatLastFeed(animal) {
		const lastFeed = await getLastFeed(animal)
		const data = {
			"food": lastFeed.food,
			"animal": animal,
			"fed": new Date(),
		}
		const record = await pb.collection('feedings').create(data);
	}

	onMount(async () => {
		const user = $page.data.user.id;

		animals = await pb.collection('animals').getFullList({
			filter: `owner="${user}"`
		});

		feedings = await pb.collection('feedings').getList(1, 10, {
			filter: `animal.owner.id="${user}"`,
			expand: 'animal.owner',
			sort: '-created'
		});

		const needsFeedToday = await pb.collection('animals').getFullList({
			filter: `dates~"${getDayOfWeek(new Date())}"`
		});

		feedings = feedings.items;
		upcoming = needsFeedToday.length;
	});
</script>

<svelte:head>
	<title>Your Animals</title>
</svelte:head>

<div class="flex flex-col gap-2">
	<h1 class="font-semibold text-3xl">Good day, {$page.data.user.name.split(' ')[0]}! 🌞</h1>
	{#if upcoming > 0}
		<!-- this is wrong because we don't do distinct per animal -->
		<span class="text-gray-500"
			><em>{upcoming} {upcoming > 1 ? 'animals need' : 'animal needs'} feeding today.</em></span
		>
	{/if}
	{#if animals.length > 0}
		<div class="flex flex-col gap-2">
			<h2 class="text-xl font-bold">Animals</h2>
			{#each animals as animal}
				<div
					class="flex flex-col gap-1 border-2 border-black bg-white shadow p-2 rounded-md transition-all hover:scale-95 h-fit"
				>
					<a href="/animals/{animal.id}" class="flex flex-col">
						<p class="text-lg font-semibold">{animal.name} the {animal.description}</p>
						{#await getLastFeed(animal.id)}
							<span>Loading last feed...</span>
						{:then lastFeed}
							<span>Last fed <u>{lastFeed.food.toLowerCase()}</u> {timeSince(new Date(animal.lastFed))}</span>
						{/await}
						<span class="text-sm text-gray-500 my-1">Feed Days</span>
						<hr class="mb-2" />
						<section class="flex gap-1 flex-wrap">
							{#each animal.dates as date}
								<span
									class="text-sm font-semibold px-2 py-1 rounded-md bg-blue-300 shadow w-12 text-center
								{getDayOfWeek(new Date()).substring(0, 3) == date.substring(0, 3)
										? 'border-2 border-rose-500 scale-110'
										: ''}"
								>
									{date.substring(0, 3)}
								</span>
							{/each}
						</section>
					</a>
					<div class="flex flex-row w-full justify-center gap-2 mt-2">
						<a href="/animals/add-food?animal={animal.name}">
							<button type="button" class="rounded-md border-2 border-black px-2 py-1 font-semibold">Add Feed +</button>
						</a>
						<button type="button" class="rounded-md border-2 border-black px-2 py-1 font-semibold" onclick={async () => repeatLastFeed(animal.id) }>Repeat Last ↻</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
	<!--
	<div>
		<h2 class="text-xl font-bold">Tasks</h2>
	</div>
	-->
</div>
