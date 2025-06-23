<script>
  let { categories, selected } = $props();
  
  function getCategoryIcon(category) {
    const icons = {
      all: '🏪',
      clothing: '👕',
      electronics: '📱',
      food: '🍽️',
      beauty: '💄',
      accessories: '👜',
      services: '🔧',
      other: '📦'
    };
    return icons[category] || icons.other;
  }
  
  function getCategoryLabel(category) {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }
</script>

<div class="flex gap-2 overflow-x-auto pb-2">
  {#each categories as category}
    <button
      onclick={() => selected = category}
      class="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
        {selected === category 
          ? 'bg-blue-500 text-white' 
          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}"
    >
      <span>{getCategoryIcon(category)}</span>
      <span>{getCategoryLabel(category)}</span>
    </button>
  {/each}
</div>
