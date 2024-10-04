<script>
    export let data;

    let selected; 
</script>

<svelte:head>
    <title>Add a feeding</title>
</svelte:head>

<div class="flex justify-center items-center">
    <section class="flex flex-col rounded-xl shadow p-2 border border-black bg-white w-full lg:w-96 mt-4">
        <h3 class="font-semibold text-2xl text-center">Add a feeding</h3>
        <hr class="border border-black my-2">
        <form class="flex flex-col gap-1 justify-center" method="post" action="?/add">
            <label for="" class="font-semibold">Animal*</label>
            <select class="border border-black rounded-md px-2 py-1 shadow" name="animal" bind:value={selected}>
                {#await data.record}
                    <option disabled hidden selected>Loading...</option>
                {:then record}
                    {#each record as animal}
                        {#if animal.name == data.animal}
                            <option value={animal.id} selected>{animal.name}</option>
                        {:else}
                            <option value={animal.id}>{animal.name}</option>
                        {/if}
                    {/each}
                {/await}
            </select>
            <label for="food" class="font-semibold">Food*</label>
            <input type="text" name="food" class="border border-black rounded-md px-2 py-1 shadow" placeholder="What did you feed {typeof(selected?.name) !== "undefined" ? selected?.name : "your animal"}?" />
            <button class="border-2 border-black font-semibold rounded-lg w-26 mx-auto p-1 bg-white box-shadow transition-all duration-200 hover:no-shadow hover:translate-x-1 hover:scale-95">Add Food</button>
        </form>
    </section>
</div>