<script>
    import DateSelector from '$lib/Animals/DateSelector.svelte';
    import { enhance } from '$app/forms';

    let formLoading = false;
</script>

<svelte:head>
    <title>Add a New Animal</title>
</svelte:head>

{#if formLoading}
    <div id="loading" class="text-center">Adding your animal</div>
{/if}
<div class="flex justify-center items-center">
    <section class="flex flex-col rounded-xl shadow p-2 border border-black bg-white w-full lg:w-96 mt-4">
        <h3 class="font-semibold text-2xl text-center">Add your animal</h3>
        <hr class="border border-black my-2">
        <form method="post" action="?/add" class="flex flex-col gap-1 justify-center" use:enhance={() => {
            formLoading = true;
        }}>
            <label for="name" class="font-semibold">Animal Name*</label>
            <input name="name" type="text" placeholder="Animal's name here" class="rounded-md shadow border border-black p-1 {formLoading ? "bg-gray-300" : "bg-white"}" required disabled={formLoading}/>
            <label for="description" class="font-semibold">Animal type*</label>
            <input name="description" type="text" placeholder="Type of animal here" class="rounded-md shadow border border-black p-1 {formLoading ? "bg-gray-300" : "bg-white"}" required disabled={formLoading} />
            <label for="" class="font-semibold">Feed Days*</label>
            <DateSelector loading={formLoading} />
            <button class="border-2 border-black font-semibold rounded-lg w-26 mx-auto p-1 bg-white box-shadow transition-all duration-200 hover:no-shadow hover:translate-x-1 hover:scale-95" disabled={formLoading}>Add Animal</button>
        </form>
    </section>
</div>