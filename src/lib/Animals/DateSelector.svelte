<script>
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let checkedDays = [false, false, false, false, false, false, false];
</script>

<div class="border border-black rounded-lg p-2 w-full">
    <div class="flex">
        {#each days as day}
            <button 
            type="button" 
            class="
            w-full px-2 py-1 {day == "Sunday" ? "rounded-l-lg" : "rounded-none"} 
            {day == "Saturday" ? "rounded-r-lg" : "rounded-none"} 
            {checkedDays[days.indexOf(day)] ? "bg-sky-900" : "bg-sky-400"} text-white cursor-pointer transition-all duration-200 {!checkedDays[days.indexOf(day)] ? "feed-box-shadow" : "no-feed-shadow"}"
            on:click={() => checkedDays[days.indexOf(day)] = !checkedDays[days.indexOf(day)]}
            >
                <input 
                type="checkbox" 
                name="{day}" 
                class="hidden" 
                on:click={() => checkedDays[days.indexOf(day)] = !checkedDays[days.indexOf(day)]} id="check-{day}" 
                bind:checked={checkedDays[days.indexOf(day)]}
                >
                <label for="check-{day}" class="cursor-pointer"
                >
                {day.substring(0, 3)}
                </label>
            </button>
        {/each}
    </div>
</div>