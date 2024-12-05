<script>
    let { data } = $props();

    function convertDate(dateStr) {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const DATE = new Date(dateStr);
        const CONVERTED = `${DATE.toLocaleDateString('en-US', { timeZone: tz })}`
        return CONVERTED;
    }   
</script>

<svelte:head>
    <title>Your Animals</title>
</svelte:head>

<div class="flex lg:flex-row flex-col gap-2 justify-center items-center">
    {#await data.animals}
        <span>Loading your animals...</span>
    {:then animals}
        {#if animals.length > 0}
            <div class="flex flex-col">
                <h3 class="font-bold text-2xl mt-8 text-center">Your Animals:</h3>
                <p class="text-gray-400 text-sm text-center">Click on an animal to see their feedings!</p>
                <section class="grid grid-cols-1 lg:grid-cols-4 gap-3 border-2 p-4 border-black rounded-xl shadow bg-pink-50">
                    {#each animals as animal}
                        <a href="/animals/{animal.id}">
                        <div 
                        class="flex flex-col border-2 border-black
                        bg-white box-shadow p-2 rounded-md 
                        transition-all duration-300 hover:translate-x-1 hover:no-shadow hover:scale-95 
                        lg:w-52 w-60 h-fit">
                            <span><strong>{animal.name}</strong> the <strong>{animal.description}</strong></span>
                            <span class="text-sm text-gray-400 my-1">Feed Days</span>
                            <hr class="mb-2"/>
                            <section class="flex gap-1 flex-wrap">
                                {#each animal.dates as date}
                                    <span class="text-sm text-white bg-gray-500 w-fit px-2 py-1 rounded-full">{date}</span>
                                {/each}
                            </section>
                        </div>
                        </a>
                    {/each}
                </section>
            </div>
        {/if}
    {:catch error}
        <span>Error loading your animals: {error.message}</span>
    {/await}
    {#await data.feedings}
    <span>Loading feedings...</span>
    {:then feedings}
        <div class="flex flex-col">
            <h3 class="font-bold text-2xl mt-8 text-center min-h-0">Recent Feedings</h3>
            <section class="grid grid-cols-1 gap-3 border-2 p-4 border-black rounded-xl shadow bg-pink-50">
                {#each feedings as feeding}
                    <div 
                    class="flex flex-col border-2 border-black
                    bg-white box-shadow p-2 rounded-md 
                    lg:w-52 w-60 h-fit"
                    >
                    <span class="text-center">{feeding.expand.animal.name} fed on {convertDate(feeding.fed)}</span>
                    </div>
                {/each}
            </section>
        </div>
    {/await}
</div>