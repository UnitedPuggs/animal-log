<script>
	import { pb } from '$lib/pocketbase.js';
    import DateSelector from '$lib/Animals/DateSelector.svelte';
</script>

<svelte:head>
    <title>Add a New Animal</title>
</svelte:head>

<div class="flex justify-center items-center">
    <section class="flex flex-col rounded-xl shadow p-2 border border-black bg-white w-full lg:w-96 mt-4">
        <h3 class="font-semibold text-2xl text-center">Add your animal</h3>
        <hr class="border border-black my-2">
        <form on:submit={() => alert("submitted")} class="flex flex-col gap-1 justify-center">
            <label for="name" class="font-semibold">Animal Name*</label>
            <input name="name" type="text" placeholder="Animal's name here" class="rounded-md shadow border border-black p-1" required/>
            <label for="description" class="font-semibold">Animal type*</label>
            <input name="description" type="text" placeholder="something" class="rounded-md shadow border border-black p-1" required />
            <label for="" class="font-semibold">Feed Days*</label>
            <DateSelector />
            <!-- component for day selection? -->
            <button class="border-2 border-black font-semibold rounded-lg w-26 mx-auto p-1 bg-white shadow transition-all hover:scale-95">Add Animal</button>
        </form>
    </section>
</div>