<script>
  import { ArrowLeft, MapPin, Clock, Phone, Share2, QrCode } from 'lucide-svelte';
  import QRCodeGenerator from './QRCodeGenerator.svelte';
  
  let { shop, onBack } = $props();
  let showQR = $state(false);
  
  function openWhatsApp() {
    const message = encodeURIComponent(`Hi! I found your shop "${shop.name}" on Bulawayo Shop Map. I'm interested in your products.`);
    const url = `https://wa.me/${shop.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`;
    window.open(url, '_blank');
  }
  
  function shareShop() {
    if (navigator.share) {
      navigator.share({
        title: shop.name,
        text: `Check out ${shop.name} at ${shop.building}`,
        url: window.location.href
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Shop link copied to clipboard!');
    }
  }
</script>

<div class="min-h-screen bg-white">
  <!-- Header -->
  <header class="sticky top-0 bg-white border-b border-gray-200 z-10">
    <div class="max-w-md mx-auto px-4 py-3">
      <div class="flex items-center justify-between">
        <button 
          onclick={onBack}
          class="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft class="w-5 h-5" />
          <span>Back</span>
        </button>
        <div class="flex items-center gap-3">
          <button 
            onclick={() => showQR = !showQR}
            class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
          >
            <QrCode class="w-5 h-5" />
          </button>
          <button 
            onclick={shareShop}
            class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
          >
            <Share2 class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </header>

  <main class="max-w-md mx-auto">
    <!-- Shop Images -->
    {#if shop.images && shop.images.length > 0}
      <div class="aspect-video bg-gray-200">
        <img 
          src={shop.images[0] || "/placeholder.svg"} 
          alt={shop.name}
          class="w-full h-full object-cover"
        />
      </div>
    {/if}

    <div class="p-4">
      <!-- Shop Info -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">{shop.name}</h1>
        <div class="flex items-center gap-2 text-gray-600 mb-2">
          <MapPin class="w-5 h-5" />
          <div>
            <p class="font-medium">{shop.building}</p>
            <p class="text-sm">{shop.floor} • Shop {shop.shop_number}</p>
          </div>
        </div>
        {#if shop.description}
          <p class="text-gray-700 mt-3">{shop.description}</p>
        {/if}
      </div>

      <!-- Weekly Special -->
      {#if shop.weekly_special}
        <div class="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg p-4 mb-6 text-white">
          <h3 class="font-semibold mb-1">🎉 This Week's Special</h3>
          <p>{shop.weekly_special}</p>
        </div>
      {/if}

      <!-- Popular Items -->
      {#if shop.popular_items && shop.popular_items.length > 0}
        <div class="mb-6">
          <h3 class="font-semibold text-gray-900 mb-3">Popular Items</h3>
          <div class="grid grid-cols-2 gap-2">
            {#each shop.popular_items as item}
              <div class="bg-gray-50 rounded-lg p-3 text-center">
                <p class="text-sm font-medium text-gray-900">{item}</p>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Operating Hours -->
      <div class="mb-6">
        <h3 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Clock class="w-5 h-5" />
          Operating Hours
        </h3>
        <div class="bg-gray-50 rounded-lg p-3">
          <p class="text-gray-700">{shop.operating_hours}</p>
        </div>
      </div>

      <!-- QR Code -->
      {#if showQR}
        <div class="mb-6">
          <QRCodeGenerator shopData={shop} />
        </div>
      {/if}

      <!-- Contact Actions -->
      <div class="space-y-3">
        <button 
          onclick={openWhatsApp}
          class="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <Phone class="w-5 h-5" />
          Chat on WhatsApp
        </button>
        
        <div class="text-center text-sm text-gray-500">
          <p>Click to start a conversation with {shop.name}</p>
        </div>
      </div>
    </div>
  </main>
</div>
