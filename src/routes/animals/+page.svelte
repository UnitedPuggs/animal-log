<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { pb } from '$lib/pocketbase.js';
	import * as Card from '$lib/components/ui/card/index.js';

	let { data } = $props();

	let animals = $state([]);
	let feedings = $state([]);
	let upcomings = $state([]);

	const NOW = new Date();

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

		// GET UPCOMING DATES FOR ALL ANIMALS
		let queue = [];

		animals.forEach((animal) => {
			queue.push(
				findUpcomingFeedings(animal.dates).then((dates) => {
					return dates.map((date) => ({
						animal: animal.name,
						date: new Date(date)
					}));
				})
			);
		});

		const UPCOMING_FEEDS_ARR = await Promise.all(queue);
		const UPCOMING_FEEDS = UPCOMING_FEEDS_ARR.flat();

		UPCOMING_FEEDS.sort((a, b) => a.date - b.date);

		feedings = feedings.items;
		upcomings = UPCOMING_FEEDS;
	});

	function dateDiff(startDate) {
		const START_DATE = new Date(startDate);
		const TIME_DIFF = Math.abs(NOW - START_DATE);
		const DATE_DIFF = Math.ceil(TIME_DIFF / (1000 * 60 * 60 * 24));
		return DATE_DIFF - 1;
	}

	function convertDate(dateStr) {
		const TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const DATE = new Date(dateStr);
		const CONVERTED = `${DATE.toLocaleDateString('en-US', { timeZone: TZ })}`;
		return CONVERTED;
	}

	async function findUpcomingFeedings(dates) {
		const TODAY = new Date();
		const CURR_DAY_IDX = TODAY.getDay();

		const DAY_IDX = {
			Sunday: 0,
			Monday: 1,
			Tuesday: 2,
			Wednesday: 3,
			Thursday: 4,
			Friday: 5,
			Saturday: 6
		};

		const TARGET_IDX = dates.map((day) => DAY_IDX[day]);

		return TARGET_IDX.map((target) => {
			const DATE_DIFF = (target - CURR_DAY_IDX + 7) % 7 || 7;
			let nextDate = new Date();
			nextDate.setDate(TODAY.getDate() + DATE_DIFF);
			return nextDate.toISOString();
		});
	}
</script>

<svelte:head>
	<title>Your Animals</title>
</svelte:head>

<div class="flex flex-col gap-2">
	<h1 class="font-semibold text-3xl">Good day, {$page.data.user.name.split(' ')[0]}! 🌞</h1>
	{#if upcomings.length > 0}
		<!-- this is wrong because we don't do distinct per animal -->
		<span class="text-gray-500"><em>{upcomings.length} animals need feeding today.</em></span>
	{/if}
	{#if animals.length > 0}
		<div class="flex flex-col gap-2">
			{#each animals as animal}
				<div
					class="flex flex-col border-2 border-black bg-white shadow p-2 rounded-md transition-all hover:scale-95 h-fit"
				>
					<a href="/animals/{animal.id}">
						<p class="text-lg font-semibold">{animal.name} the {animal.description}</p>
						<span class="text-sm text-gray-400 my-1">Feed Days</span>
						<hr class="mb-2" />
						<section class="flex gap-1 flex-wrap">
							{#each animal.dates as date}
								<span class="text-sm text-white bg-sky-400 w-fit px-2 py-1 rounded-full"
									>{date}</span
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
