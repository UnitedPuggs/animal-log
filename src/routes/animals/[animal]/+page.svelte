<script>
    export let data;

    console.log(data);
    const name = data.record[0].expand.animal.name;

    function convertDate(dateStr) {
        const date = new Date(dateStr).toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
        return date;
    }   
</script>

<svelte:head>
    <title>{name}'s page!</title>
</svelte:head>

<div class="border-2 border-black rounded-xl bg-white p-2 shadow">
    <h3 class="font-bold text-2xl text-center pb-2">{name}'s Feedings</h3>
    <hr class="border-black pb-2"/>
    <section class="flex flex-wrap gap-2">
        {#each data.record as food}
            <div class="border border-black rounded-xl px-2 py-1 font-semibold">
                {food.food} fed on {convertDate(food.created)}
            </div>
        {/each}
    </section>
</div>