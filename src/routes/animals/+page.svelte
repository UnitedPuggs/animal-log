<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { pb } from "$lib/pocketbase.js";
    let { data } = $props();

    let animals = $state([]);
    let feedings = $state([]);

    console.log($page)

    onMount(async() => {
        const user = $page.data.user.id;

        animals = await pb.collection("animals").getFullList({
            filter: `owner="${user}"`
        });

        feedings = await pb.collection("feedings").getList(1, 10, {
            filter: `animal.owner.id="${user}"`,
            expand: 'animal.owner',
            sort: '-created'
        });

        feedings = feedings.items;
    });

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

<div class="flex lg:flex-row flex-col gap-2 justify-center items-center lg:items-start">
    {#if animals.length > 0}
        <div class="flex flex-col top-0">
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
    {:else}
        <div class="flex flex-col justify-center items-center gap-1">
            <h5 class="font-bold text-2xl">NO ANIMALS TO SHOW</h5>
            <p class="text-sm text-gray-400">Get started below 😊</p>
            <a href="/animals/add-animal" class="border-2 border-black rounded-lg p-2 font-bold bg-white transition-all duration-200 hover:scale-95">Add Animal</a>
        </div>
    {/if}
    {#if feedings.length > 0}
        <div class="flex flex-col top-0">
            <h3 class="font-bold text-2xl mt-8 text-center max-h-32 overflow-y-auto">Recent Feedings:</h3>
            <p class="text-gray-400 text-sm text-center">Here are your latest feedings</p>
            <section class="grid grid-cols-1 gap-3 border-2 p-4 border-black rounded-xl shadow bg-pink-50">
                {#each feedings as feeding}
                    <div 
                    class="flex flex-col border-2 border-black
                    bg-white box-shadow p-2 rounded-md 
                    lg:w-56 w-60 h-fit"
                    >
                    <span class="text-center">{feeding.expand.animal.name} fed on {convertDate(feeding.fed)}</span>
                    </div>
                {/each}
            </section>
        </div>
    {/if}
</div>