<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { pb } from '$lib/pocketbase.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { getDayOfWeek, timeSince } from '$lib/dates.js';
	import { invalidateAll } from '$app/navigation';

	let { data } = $props();

	let animals = $state([]);
	let tasks = $state([]);
	let feedings = $state([]);
	let upcoming = $state(0);
	let lastFeeds = $state({});
	let today = new Date().toLocaleString('en-US', {
		weekday: 'long',
		month: 'long',
		day: 'numeric'
	});

	async function getLastFeed(id) {
		const record = await pb.collection('feedings').getFirstListItem(`animal='${id}'`, {
			sort: '-fed'
		});
		return record;
	}

	async function repeatLastFeed(id) {
		const lastFeed = await getLastFeed(id);
		const data = {
			food: lastFeed.food,
			animal: id,
			fed: new Date()
		};

		const addFeed = await pb.collection('feedings').create(data);
		const updateLastFed = await pb.collection('animals').update(`${id}`, { lastFed: new Date() });
	}

	onMount(async () => {
		const user = $page.data.user.id;

		animals = await pb.collection('animals').getFullList({
			filter: `owner="${user}"`
		});

		feedings = await pb.collection('feedings').getFullList({
			filter: `animal.owner.id="${user}"`,
			sort: 'fed'
		});

		// Not the best way to do this. Possible improvement --> create view of unique animals of last food

		feedings.forEach((feeding) => {
			lastFeeds[feeding.animal] = feeding.food.toLowerCase();
		});

		const needsFeedToday = await pb.collection('animals').getFullList({
			filter: `dates~"${getDayOfWeek(new Date())}"`
		});

		upcoming = needsFeedToday.length;
	});
</script>

<svelte:head>
	<title>Your Animals</title>
</svelte:head>

<div class="flex flex-col gap-1">
	<h1 class="font-semibold text-2xl font-lora">Good day, {$page.data.user.name.split(' ')[0]}.</h1>
	<span class="font-dm">{today}</span>
	{#if upcoming > 0}
		<!-- this is wrong because we don't do distinct per animal -->
		<span class="bg-amber-100 text-amber-900 p-2 border-l-4 border-amber-400"
			>• {upcoming} {upcoming > 1 ? 'animals need' : 'animal needs'} feeding today.</span
		>
	{/if}
	{#if animals.length > 0}
		<div class="flex flex-col gap-2 mt-5">
			<h2 class="text-sm font-dm text-gray-500 font-bold">YOUR ANIMALS</h2>
			{#each animals as animal}
				<div
					class="flex flex-col gap-1 border border-black shadow p-2 rounded-md transition-all h-fit"
				>
					<a href="/animals/{animal.id}" class="flex flex-col gap-1">
						<div class="flex flex-row">
							<div class="p-4 bg-green-200 mr-2 rounded-lg">
								<!-- icons here? -->
								tbd
							</div>
							<div class="flex flex-col">
								<p class="text-xl font-semibold font-lora">{animal.name}</p>
								<span class="text-sm text-gray-500 font-dm">{animal.description}</span>
							</div>
						</div>
						{#if lastFeeds[animal.id]}
							<span class="font-dm"
								>Last fed <span
									class="font-semibold text-sm border bg-gray-100 rounded-full px-2 font-mono"
									>{lastFeeds[animal.id]}</span
								>
								{timeSince(new Date(animal.lastFed))}</span
							>
						{:else}
							<span class="font-dm text-gray-400">No feeds logged</span>
						{/if}
						<section class="flex gap-1 flex-wrap">
							{#each animal.dates as date}
								<span
									class="text-sm font-semibold p-2 rounded-md w-10 text-center border-2 opacity-80
								{getDayOfWeek(new Date()).substring(0, 3) == date.substring(0, 3)
										? 'bg-teal-500 border-teal-600'
										: 'bg-lime-400 border-lime-500'}"
								>
									{date.substring(0, 2)}
								</span>
							{/each}
						</section>
					</a>
					<div class="flex flex-row w-full justify-stretch gap-2 mt-2">
						<a
							href="/animals/add-food?animal={animal.name}"
							class="w-full transition-all active:scale-90"
						>
							<button type="button" class="rounded-md border-2 px-2 py-1 font-semibold w-full"
								>Add Feed +</button
							>
						</a>
						{#if lastFeeds[animal.id]?.length > 0}
							<button
								type="button"
								class="rounded-md border-2 px-2 py-1 font-semibold transition-all active:scale-90 w-full"
								onclick={async () => repeatLastFeed(animal.id)}>Repeat Last ↻</button
							>
						{/if}
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
