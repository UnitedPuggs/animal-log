<script>
    export let data;
</script>

<svelte:head>
    <title>Your Animals</title>
</svelte:head>

<div class="flex flex-col justify-center items-center">
    <section class="flex gap-2">
        <a href="/animals/add-animal" class="border-2 border-black rounded-lg p-2 font-bold bg-white box-shadow transition-all duration-200 hover:no-shadow hover:translate-x-1 hover:scale-95">Add Animal</a>
        <a href="/animals/add-food" class="border-2 border-black rounded-lg p-2 font-bold bg-white box-shadow transition-all duration-200 hover:no-shadow hover:translate-x-1 hover:scale-95" data-sveltekit-preload-data="tap">Add Feeding</a>
        <a href="/animals/inventory" class="border-2 border-black rounded-lg p-2 font-bold bg-white box-shadow transition-all duration-200 hover:no-shadow hover:translate-x-1 hover:scale-95">Inventory</a>
    </section>
    {#await data.records}
        <span>Loading your animals...</span>
    {:then records}
        {#if records.length > 0}
            <h3 class="font-bold text-2xl mt-8">Your Animals</h3>
            <section class="flex flex-wrap gap-3 justify-center border-2 p-4 border-black rounded-xl shadow bg-pink-50">
                {#each records as record}
                    <div 
                    class="flex flex-col border-2 border-black
                    bg-white box-shadow p-2 rounded-md 
                    transition-all duration-300 hover:translate-x-1 hover:no-shadow hover:scale-95 
                    lg:w-52 w-60 h-fit">
                        <span><strong>{record.name}</strong> the <strong>{record.description}</strong></span>
                        <span class="text-sm text-gray-400 my-1">Feed Days</span>
                        <hr class="mb-2"/>
                        <section class="flex gap-1 flex-wrap">
                            {#each record.dates as date}
                                <span class="text-sm text-white bg-gray-500 w-fit px-2 py-1 rounded-full">{date}</span>
                            {/each}
                        </section>
                    </div>
                {/each}
            </section>
        {/if}
    {:catch error}
        <span>Error loading your animals: {error.message}</span>
    {/await}
</div>