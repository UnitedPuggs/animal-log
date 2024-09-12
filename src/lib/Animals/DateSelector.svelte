<script>
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let checkedDays = [false, false, false, false, false, false, false];
</script>

<div class="border border-black rounded-lg p-2 w-fit">
    <div class="flex">
        {#each days as day}
            <input type="checkbox" class="hidden" on:click={() => checkedDays[days.indexOf(day)] = !checkedDays[days.indexOf(day)]} id="check-{day}" bind:checked={checkedDays[days.indexOf(day)]}>
            <label for="check-{day}" class="bg-sky-400 px-2 py-1 text-white {day == "Sun" ? "rounded-l-lg" : ""} {day == "Sat" ? "rounded-r-lg" : ""} {checkedDays[days.indexOf(day)] ? "bg-sky-900" : ""}"
            >
            {day}
            </label>
        {/each}
    </div>
</div>