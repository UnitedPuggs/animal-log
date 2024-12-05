<script>
    let { data } = $props();

    function convertDate(dateStr) {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const DATE = new Date(dateStr);
        const CONVERTED = `${DATE.toLocaleDateString('en-US', { timeZone: tz })} @ ${DATE.toLocaleTimeString('en-US', { timeZone: tz, minute: '2-digit', hour: '2-digit' })}`
        return CONVERTED;
    }   
</script>

<svelte:head>
    <title>{data.name}'s page!</title>
</svelte:head>

{#await data.feedings}
    <span>Loading feedings...</span>
{:then feedings}
    {#if feedings.length > 0}
        <div class="flex flex-col border-2 border-black rounded-xl bg-white p-2 shadow lg:w-auto w-80">
            <h3 class="font-bold text-2xl text-center pb-2">{data.name}'s Feedings</h3>
            <hr class="border-black pb-2"/>
            <section class="grid lg:grid-cols-4 grid-cols-3 gap-1">
                {#each feedings as food}
                    <div class="border border-black rounded-lg px-2 py-1 font-semibold">
                        {food.food} fed on {convertDate(food.created)}
                    </div>
                {/each}
            </section>
        </div>
    {:else}
        <div class="flex flex-col justify-center items-center gap-1">
            <h5 class="font-bold text-3xl">NO FEEDINGS TO SHOW</h5>
            <a href="/animals/add-food?animal={data.name}" class="border-2 border-black rounded-lg p-2 font-bold bg-white transition-all duration-200 hover:scale-95">Add Feeding</a>
        </div>
    {/if}
{/await}