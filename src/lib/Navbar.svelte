<script>
  import { page } from '$app/stores';
  import { Home, PawPrint, UtensilsCrossed, QrCode, Activity } from 'lucide-svelte';

  const links = [
    { href: '/animals', label: 'Home', icon: Home },
    { href: '/animals/add-animal', label: 'Animals', icon: PawPrint },
    { href: '/animals/tasks', label: 'Tasks', icon: Activity},
    { href: '/animals/add-food', label: 'Feed', icon: UtensilsCrossed },
    { href: '/animals/add-food/scan', label: 'Scan', icon: QrCode },
  ];
</script>

{#if $page.data?.user}
<nav class="sticky bottom-0 mt-auto bg-white border-t border-gray-200 px-2 py-2">
  <div class="flex justify-evenly">
    {#each links as link}
      <a
        href={link.href}
        class="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all active:scale-95
          {$page.url.pathname === link.href ? 'text-green-700' : 'text-gray-400 hover:text-gray-600'}"
      >
        <svelte:component this={link.icon} size={22} strokeWidth={$page.url.pathname === link.href ? 2.5 : 1.75} />
        <span class="text-xs font-medium">{link.label}</span>
      </a>
    {/each}
  </div>
</nav>
{/if}