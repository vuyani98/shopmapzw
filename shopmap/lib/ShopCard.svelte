<script>
  import { MapPin, Clock, Phone, Tag } from 'lucide-svelte';
  
  let { shop, onClick } = $props();
  
  function getCategoryColor(category) {
    const colors = {
      clothing: 'bg-pink-100 text-pink-800',
      electronics: 'bg-blue-100 text-blue-800',
      food: 'bg-orange-100 text-orange-800',
      beauty: 'bg-purple-100 text-purple-800',
      accessories: 'bg-green-100 text-green-800',
      services: 'bg-indigo-100 text-indigo-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.other;
  }
</script>

<div 
  class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
  onclick={onClick}
  role="button"
  tabindex="0"
  onkeydown={(e) => e.key === 'Enter' && onClick()}
>
  <!-- Shop Header -->
  <div class="flex justify-between items-start mb-3">
    <div class="flex-1">
      <h3 class="font-semibold text-gray-900 text-lg">{shop.name}</h3>
      <div class="flex items-center gap-1 text-sm text-gray-600 mt-1">
        <MapPin class="w-4 h-4" />
        <span>{shop.building}</span>
      </div>
    </div>
    <span class="px-2 py-1 rounded-full text-xs font-medium {getCategoryColor(shop.category)}">
      {shop.category}
    </span>
  </div>

  <!-- Location Details -->
  <div class="text-sm text-gray-600 mb-3">
    <p>{shop.floor} • Shop {shop.shop_number}</p>
  </div>

  <!-- Popular Items -->
  {#if shop.popular_items && shop.popular_items.length > 0}
    <div class="mb-3">
      <div class="flex flex-wrap gap-1">
        {#each shop.popular_items.slice(0, 3) as item}
          <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
            {item}
          </span>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Weekly Special -->
  {#if shop.weekly_special}
    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mb-3">
      <div class="flex items-center gap-1">
        <Tag class="w-4 h-4 text-yellow-600" />
        <span class="text-sm font-medium text-yellow-800">This Week:</span>
      </div>
      <p class="text-sm text-yellow-700 mt-1">{shop.weekly_special}</p>
    </div>
  {/if}

  <!-- Quick Actions -->
  <div class="flex items-center justify-between pt-3 border-t border-gray-100">
    <div class="flex items-center gap-1 text-sm text-gray-600">
      <Clock class="w-4 h-4" />
      <span>Open today</span>
    </div>
    <div class="flex items-center gap-1 text-green-600">
      <Phone class="w-4 h-4" />
      <span class="text-sm font-medium">WhatsApp</span>
    </div>
  </div>
</div>
