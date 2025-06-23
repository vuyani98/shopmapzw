<script>
  import { Search, X } from 'lucide-svelte';
  
  let { value = '' } = $props();
  
  function clearSearch() {
    value = '';
  }
</script>

<div class="relative">
  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <Search class="h-5 w-5 text-gray-400" />
  </div>
  <input
    type="text"
    bind:value
    placeholder="Search shops, buildings, or categories..."
    class="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
  />
  {#if value}
    <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
      <button
        onclick={clearSearch}
        class="text-gray-400 hover:text-gray-600"
      >
        <X class="h-5 w-5" />
      </button>
    </div>
  {/if}
</div>
