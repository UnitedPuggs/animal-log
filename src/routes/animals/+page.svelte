<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { pb } from '$lib/pocketbase.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { getDayOfWeek, timeSince } from '$lib/dates.js';

	let { data } = $props();

	let animals = $state([]);
	let feedings = $state([]);
	let upcoming = $state(0);

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
			{#each animals as animal}
				<div
					class="flex flex-col border-2 border-black bg-white shadow p-2 rounded-md transition-all hover:scale-95 h-fit"
				>
					<a href="/animals/{animal.id}" class="flex flex-col">
						<p class="text-lg font-semibold">{animal.name} the {animal.description}</p>
						<span>Last fed {timeSince(new Date(animal.lastFed))}</span>
						<span class="text-sm text-gray-400 my-1">Feed Days</span>
						<hr class="mb-2" />
						<section class="flex gap-1 flex-wrap">
							{#each animal.dates as date}
								<span
									class="text-sm font-semibold text-white bg-sky-500 w-12 px-2 py-1 rounded-full text-center"
									>{date.substring(0, 3)}</span
								>
							{/each}
						</section>
					</a>
					<a
						href="/animals/add-food?animal={animal.name}"
						class="flex w-full mx-auto items-center justify-center pt-4"
					>
						<span class="rounded-full border-2 border-black px-2 py-1 font-semibold">Feed Now</span>
					</a>
				</div>
			{/each}
		</div>
	{/if}
</div>
