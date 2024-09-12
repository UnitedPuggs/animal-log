<script>
    export let data;
</script>

<svelte:head>
    <title>Animal Log</title>
</svelte:head>
<!--
    Maybe turn this into a login page if users aren't already logged in?
-->
<div class="flex flex-col justify-center items-center">
    <hgroup class="text-center">
        <h1 class="text-2xl">Welcome to Animal Log!</h1>
        <p>here for all your animal logging needs</p>
    </hgroup>
    <div class="rounded-xl shadow p-2 border w-full lg:w-96 mt-4">
        <div class="flex flex-col p-6 space-y-1">
            <h3 class="font-semibold text-2xl">Login here</h3>
            <hr class="border border-black">
            <p class="text-sm">Choose one of the sign-in options</p>
        </div>
        <form method="post">
            <div class="p-6 pt-0 flex justify-center items-center gap-4">
            {#each data.providers as provider}
                <button formaction="?/{provider.name}" class="border border-black p-2 rounded-md hover:opacity-80 active:scale-95">{ provider.displayName }</button>
            {/each}
            </div>
        </form>
        <div class="relative">
            <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t"></span>
            </div>
            <div class="relative flex justify-center text-xs uppercase">
                <span style="background-color: beige;" class="px-1">or continue with</span>
            </div>
        </div>
        <form method="post" action="?/login">
            <div class="flex flex-col">
                <label for="username">Username</label>
                <input type="text" name="username" class="rounded-md shadow border p-1" placeholder="Your username here" readonly />
                <label for="password">Password</label>
                <input type="password" name="password" class="rounded-md shadow border p-1" placeholder="Your password here" readonly />
            </div>
        </form>
    </div>
</div>
