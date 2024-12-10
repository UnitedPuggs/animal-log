<script>
    import { page } from "$app/stores";
    import { pb } from "$lib/pocketbase";
    import { goto, invalidateAll } from "$app/navigation";
    
    let { data } = $props();

    function convertDate(dateStr) {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const DATE = new Date(dateStr);
        const CONVERTED = `${DATE.toLocaleDateString('en-US', { timeZone: tz })} @ ${DATE.toLocaleTimeString('en-US', { timeZone: tz, minute: '2-digit', hour: '2-digit' })}`
        return CONVERTED;
    }
    
    function openRemove() {
        document.getElementById('delete-animal').showModal();
    }
    
    function closeRemove() {
        document.getElementById('delete-animal').close();
    }

    async function removeFeeding(id) {
        await pb.collection('feedings').delete(`${id}`);
        invalidateAll();
    }

    async function deleteAnimal() {
        await pb.collection('animals').delete(`${$page.params.animal}`);
        goto('/animals');
    }
</script>

<svelte:head>
    <title>{data.name}'s page!</title>
</svelte:head>

<div class="flex flex-col">
    <!--- MODAL FOR REMOVING ANIMAL -->
    <dialog id="delete-animal" class="rounded-xl">
        <div class="flex flex-col p-6">
            <span class="text-xl font-bold">Are you absolutely sure?</span>
            <p class="text-gray-400 w-72 lg:w-96">This action cannot be undone. This will permanently remove your animals and associated feedings from our servers.</p>
            <section class="flex justify-center gap-2 mt-4">
                <button 
                class="border-2 border-black rounded-lg p-2 font-bold bg-white transition-all duration-200 hover:scale-95"
                onclick={ deleteAnimal }
                >
                Continue
                </button>
                <button 
                class="border-2 rounded-lg px-4 py-2 text-gray-500 bg-white transition-all duration-200 hover:scale-95"
                onclick={ closeRemove }
                >
                Cancel
                </button>
            </section>
        </div>
    </dialog>
    <!-------------------------------->
    <section class="flex justify-center gap-2 my-2">
        <a
        href="{$page.params.animal}/edit"
        class="border-2 border-black rounded-lg p-2 font-bold bg-white transition-all duration-200 hover:scale-95"
        >
        edit animal
        </a>
        <button
        class="border-2 border-black rounded-lg p-2 font-bold bg-white transition-all duration-200 hover:scale-95"
        onclick={ openRemove }
        >
        remove animal
        </button>
    </section>
{#await data.feedings}
    <span>Loading feedings...</span>
{:then feedings}
    {#if feedings.length > 0}
        <div class="flex flex-col border-2 border-black rounded-xl bg-white p-2 shadow lg:w-auto w-80">
            <h3 class="font-bold text-2xl text-center pb-2">{data.name}'s Feedings</h3>
            <hr class="border-black pb-2"/>
            <section class="flex flex-row gap-1">
                {#each feedings as food}
                    <div class="flex gap-1 border border-black rounded-lg px-2 py-1 font-semibold lg:w-72">
                        <section>
                            <span>{food.food} fed on {convertDate(food.fed)}</span>
                        </section>
                        <section class="flex border-l border-black">
                            <button onclick={ () => removeFeeding(food.id) } class="px-1">🚫</button>
                        </section>
                    </div>
                {/each}
            </section>
        </div>
    {:else}
        <div class="flex flex-col justify-center items-center gap-1">
            <h5 class="font-bold text-2xl">NO FEEDINGS TO SHOW</h5>
            <a href="/animals/add-food?animal={data.name}" class="border-2 border-black rounded-lg p-2 font-bold bg-white transition-all duration-200 hover:scale-95">Add Feeding</a>
        </div>
    {/if}
{/await}
</div>