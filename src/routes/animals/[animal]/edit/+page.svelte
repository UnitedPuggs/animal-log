<script>
    import DateSelector from '$lib/Animals/DateSelector.svelte';
    import { enhance } from '$app/forms';
    import { onMount } from 'svelte';
    import { pb } from '$lib/pocketbase';
    import { page } from '$app/stores';

    let animal = $state('');
    let description = $state('');
    let feedDays = $state([]);

    onMount(async() => {
        const response = await pb.collection('animals').getOne(`${$page.params.animal}`);

        animal = response.name;
        description = response.description;
        feedDays = response.dates;
    });

    let formLoading = $state(false);
</script>

<svelte:head>
    <title>Add a New Animal</title>
</svelte:head>

<div class="flex justify-center items-center">
    <section class="flex flex-col rounded-xl shadow p-2 border border-black bg-white w-full lg:w-96 mt-4">
        <h3 class="font-semibold text-2xl text-center">Edit your animal</h3>
        <hr class="border border-black my-2">
        <form method="post" action="?/edit" class="flex flex-col gap-1 justify-center" use:enhance={() => {
            formLoading = true;
        }}>
            <label for="name" class="font-semibold">Animal Name*</label>
            <input name="name" value={animal} type="text" placeholder="Animal's name here" class="rounded-md shadow border border-black p-1 bg-gray-300 cursor-not-allowed" disabled />
            <label for="description" class="font-semibold">Animal type*</label>
            <input name="description" value={description} type="text" placeholder="Type of animal here" class="rounded-md shadow border border-black p-1 {formLoading ? "bg-gray-300" : "bg-white"}" required disabled={formLoading} />
            <label for="" class="font-semibold">Feed Days*</label>
            <DateSelector loading={formLoading} selectedDays={feedDays} />
            <button class="border-2 border-black font-semibold rounded-lg w-26 mx-auto p-1 bg-white box-shadow transition-all duration-200 hover:no-shadow hover:translate-x-1 hover:scale-95" disabled={formLoading}>Update Animal</button>
        </form>
    </section>
</div>