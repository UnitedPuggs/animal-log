<nav class="p-1 bg-lime-300">
    <div class="flex flex-col justify-center items-center gap-2 text-lg">
        <a href="/" class="hover:opacity-85 active:scale-90 w-20"><img src="../assets/logo.png" alt="logo"></a>
        <!-- add a logical branch to check for an account and THEN render animals-->
        <!-- do I even really need this if it's just the one page we're really looking at?
        {#if data.user?.email}
            <a href="/animals" class="hover:opacity-85 active:scale-90 border-2 rounded-lg border-black p-1 font-bold bg-white">Animals</a>
        {/if}
        -->
    </div>
</nav>