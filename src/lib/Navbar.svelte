<script>
    import { page } from "$app/stores";
    import * as Sheet from "$lib/components/ui/sheet/index.js";
    let { data } = $props();

    let open = $state(false);

    function close() {
        open = false;
    }

    function copyLink() {
        navigator.clipboard.writeText(`${window.location.origin}/animals/share/${$page.data.user.id}`);
        alert(`Copied ${window.location.origin}/animals/share/${$page.data.user.id} to clipboard!`);
    }
</script>

<nav class="p-1 bg-green-100 border-b border-black">
    <div class="flex justify-between py-2 px-1">
        <a href="/" class="text-2xl font-bold">THE ANIMAL LOG</a>
        {#if $page.data?.user}
            <Sheet.Root bind:open>
                <Sheet.Trigger>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                    </svg>
                </Sheet.Trigger>
                <Sheet.Content side="right">
                    <Sheet.Header>
                        <Sheet.Description>Do your animal logging here</Sheet.Description>
                    </Sheet.Header>
                    <div class="flex flex-col gap-2 mt-2">
                        <a 
                        href="/"
                        class="font-bold underline text-lg hover:no-underline w-fit"
                        onclick={() => close()}
                        >
                            Home
                        </a>
                        <a 
                        href="/animals/add-animal" 
                        class="border-2 border-black rounded-lg p-2 font-bold bg-white transition-all duration-200 hover:scale-95"
                        onclick={() => close()}
                        >
                        Add Animal
                        </a>
                        <a 
                        href="/animals/add-food" 
                        class="border-2 border-black rounded-lg p-2 font-bold bg-white transition-all duration-200 hover:scale-95"
                        onclick={() => close()}
                        >
                        Add Feeding
                        </a>
                        <a 
                        href="/animals/inventory" 
                        class="border-2 border-black rounded-lg p-2 font-bold bg-white transition-all duration-200 hover:scale-95"
                        onclick={() => close()}
                        >
                        Inventory
                        </a>
                        <button 
                        class="border-2 border-black rounded-xl p-2 font-bold bg-white transition-all duration-200 hover:scale-95"
                        onclick={copyLink}
                        >
                            Share your Log!
                        </button>
                    </div>
                </Sheet.Content>
            </Sheet.Root>
        {/if}
    </div>
</nav>