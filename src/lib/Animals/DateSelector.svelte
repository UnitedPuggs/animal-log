<script>
	let { loading, selectedDays } = $props();

	let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	let checkedDays = $state([false, false, false, false, false, false, false]);

	$effect(() => {
		const checked = days.reduce((acc, day) => {
			acc[day] = selectedDays?.includes(day);
			return acc;
		}, {});

		checkedDays = Object.values(checked);
	});
</script>

<div class="border border-black rounded-lg p-2 w-full">
	<div class="flex">
		{#each days as day}
			<button
				type="button"
				class="
            w-full px-2 py-1
            {day == 'Sunday' ? 'rounded-l-lg' : 'rounded-none'} 
            {day == 'Saturday' ? 'rounded-r-lg' : 'rounded-none'} 
            {checkedDays[days.indexOf(day)]
					? 'bg-blue-900'
					: 'bg-blue-400'} text-white cursor-pointer transition-all duration-200"
				onclick={() => {
					if (!loading) checkedDays[days.indexOf(day)] = !checkedDays[days.indexOf(day)];
				}}
			>
				<input
					type="checkbox"
					name={day}
					class="hidden"
					onclick={() => (checkedDays[days.indexOf(day)] = !checkedDays[days.indexOf(day)])}
					id="check-{day}"
					bind:checked={checkedDays[days.indexOf(day)]}
					disabled={loading}
				/>
				<label for="check-{day}" class="cursor-pointer">
					{day.substring(0, 3)}
				</label>
			</button>
		{/each}
	</div>
</div>
