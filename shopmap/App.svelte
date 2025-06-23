<script>
  import { onMount } from 'svelte';
  import ShopCard from './lib/components/ShopCard.svelte';
  import ShopDetail from './lib/components/ShopDetail.svelte';
  import SearchBar from './lib/components/SearchBar.svelte';
  import CategoryFilter from './lib/components/CategoryFilter.svelte';
  import { supabase } from './lib/supabase.js';
  import { Phone, MapPin, Search } from 'lucide-svelte';

  let shops = $state([]);
  let filteredShops = $state([]);
  let selectedShop = $state(null);
  let searchQuery = $state('');
  let selectedCategory = $state('all');
  let loading = $state(true);

  const categories = [
    'all',
    'clothing',
    'electronics',
    'food',
    'beauty',
    'accessories',
    'services',
    'other'
  ];

  onMount(async () => {
    await loadShops();
  });

  async function loadShops() {
    try {
      const { data, error } = await supabase
        .from('shops')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      shops = data || [];
      filteredShops = shops;
    } catch (error) {
      console.error('Error loading shops:', error);
      // Fallback to demo data
      shops = getDemoShops();
      filteredShops = shops;
    } finally {
      loading = false;
    }
  }

  function getDemoShops() {
    return [
      {
        id: 1,
        name: "Trendy Threads",
        building: "Ascot Shopping Centre",
        floor: "Ground Floor",
        shop_number: "G12",
        category: "clothing",
        description: "Latest fashion trends for men and women",
        whatsapp: "+263771234567",
        operating_hours: "Mon-Sat: 8:00-18:00, Sun: 10:00-16:00",
        weekly_special: "20% off all dresses this week!",
        images: ["/placeholder.svg?height=200&width=300"],
        popular_items: ["Dresses", "Jeans", "T-shirts"]
      },
      {
        id: 2,
        name: "TechHub Electronics",
        building: "Parkade Centre",
        floor: "1st Floor",
        shop_number: "F15",
        category: "electronics",
        description: "Mobile phones, accessories and repairs",
        whatsapp: "+263772345678",
        operating_hours: "Mon-Fri: 8:30-17:30, Sat: 9:00-15:00",
        weekly_special: "Free screen protector with every phone purchase",
        images: ["/placeholder.svg?height=200&width=300"],
        popular_items: ["Samsung phones", "iPhone accessories", "Chargers"]
      },
      {
        id: 3,
        name: "Mama's Kitchen",
        building: "City Centre Complex",
        floor: "Ground Floor",
        shop_number: "G08",
        category: "food",
        description: "Traditional Zimbabwean cuisine and takeaways",
        whatsapp: "+263773456789",
        operating_hours: "Mon-Sat: 7:00-19:00",
        weekly_special: "Buy 2 sadza meals, get 1 free drink",
        images: ["/placeholder.svg?height=200&width=300"],
        popular_items: ["Sadza & Beef", "Chicken & Rice", "Matemba"]
      },
      {
        id: 4,
        name: "Glow Beauty Salon",
        building: "Ascot Shopping Centre",
        floor: "1st Floor",
        shop_number: "F22",
        category: "beauty",
        description: "Hair styling, nails, and beauty treatments",
        whatsapp: "+263774567890",
        operating_hours: "Tue-Sat: 9:00-17:00",
        weekly_special: "Manicure + Pedicure combo for $15",
        images: ["/placeholder.svg?height=200&width=300"],
        popular_items: ["Hair braiding", "Gel nails", "Facials"]
      },
      {
        id: 5,
        name: "Shoe Palace",
        building: "Parkade Centre",
        floor: "Ground Floor",
        shop_number: "G25",
        category: "accessories",
        description: "Quality footwear for the whole family",
        whatsapp: "+263775678901",
        operating_hours: "Mon-Sat: 8:00-18:00, Sun: 10:00-15:00",
        weekly_special: "Buy 2 pairs, get 30% off the second pair",
        images: ["/placeholder.svg?height=200&width=300"],
        popular_items: ["Sneakers", "Formal shoes", "Sandals"]
      }
    ];
  }

  function filterShops() {
    filteredShops = shops.filter(shop => {
      const matchesSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           shop.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           shop.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || shop.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }

  $effect(() => {
    filterShops();
  });

  function selectShop(shop) {
    selectedShop = shop;
  }

  function goBack() {
    selectedShop = null;
  }
</script>

<div class="min-h-screen bg-gray-50">
  <!-- Header -->
  <header class="bg-white shadow-sm border-b sticky top-0 z-40">
    <div class="max-w-md mx-auto px-4 py-3">
      <div class="flex items-center gap-3">
        <MapPin class="w-6 h-6 text-blue-600" />
        <div>
          <h1 class="text-lg font-bold text-gray-900">Bulawayo Shop Map</h1>
          <p class="text-xs text-gray-600">Discover hidden shops in the city</p>
        </div>
      </div>
    </div>
  </header>

  {#if selectedShop}
    <ShopDetail shop={selectedShop} onBack={goBack} />
  {:else}
    <main class="max-w-md mx-auto px-4 py-4">
      <!-- Search and Filter -->
      <div class="space-y-3 mb-6">
        <SearchBar bind:value={searchQuery} />
        <CategoryFilter 
          categories={categories} 
          bind:selected={selectedCategory} 
        />
      </div>

      <!-- Shop Count -->
      <div class="mb-4">
        <p class="text-sm text-gray-600">
          {filteredShops.length} shop{filteredShops.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <!-- Loading State -->
      {#if loading}
        <div class="space-y-4">
          {#each Array(5) as _}
            <div class="bg-white rounded-lg p-4 shadow-sm animate-pulse">
              <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div class="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div class="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          {/each}
        </div>
      {:else if filteredShops.length === 0}
        <!-- Empty State -->
        <div class="text-center py-12">
          <Search class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">No shops found</h3>
          <p class="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      {:else}
        <!-- Shop List -->
        <div class="space-y-4">
          {#each filteredShops as shop (shop.id)}
            <ShopCard {shop} onClick={() => selectShop(shop)} />
          {/each}
        </div>
      {/if}

      <!-- Footer -->
      <footer class="mt-12 py-6 text-center text-sm text-gray-500">
        <p>Helping Bulawayo businesses connect with customers</p>
        <p class="mt-1">Built with ❤️ for local entrepreneurs</p>
      </footer>
    </main>
  {/if}
</div>
