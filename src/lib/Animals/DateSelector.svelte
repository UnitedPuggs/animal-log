<script>
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let checkedDays = [false, false, false, false, false, false, false];
</script>

<div class="border border-black rounded-lg p-2 w-full">
    <div class="flex">
        {#each days as day}
            <button type="button" class="w-full px-2 py-1 {day == "Sun" ? "rounded-l-lg" : "rounded-none"} {day == "Sat" ? "rounded-r-lg" : "rounded-none"} {checkedDays[days.indexOf(day)] ? "bg-sky-900" : "bg-sky-400"} text-white cursor-pointer" on:click={() => checkedDays[days.indexOf(day)] = !checkedDays[days.indexOf(day)]}>
                <input type="checkbox" class="hidden" on:click={() => checkedDays[days.indexOf(day)] = !checkedDays[days.indexOf(day)]} id="check-{day}" bind:checked={checkedDays[days.indexOf(day)]}>
                <label for="check-{day}" class="cursor-pointer"
                >
                {day}
                </label>
            </button>
        {/each}
    </div>
</div>