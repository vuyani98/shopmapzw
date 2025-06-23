<script>
  import { onMount } from 'svelte';
  
  let { shopData } = $props();
  let qrCodeUrl = $state('');
  
  onMount(() => {
    generateQRCode();
  });
  
  function generateQRCode() {
    // Create shop profile URL (in a real app, this would be your domain)
    const shopUrl = `https://bulawayo-shops.vercel.app/shop/${shopData.id}`;
    
    // Using QR Server API for demo (in production, use a proper QR library)
    qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shopUrl)}`;
  }
  
  function downloadQR() {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `${shopData.name}-qr-code.png`;
    link.click();
  }
</script>

<div class="bg-gray-50 rounded-lg p-4 text-center">
  <h3 class="font-semibold text-gray-900 mb-3">Shop QR Code</h3>
  
  {#if qrCodeUrl}
    <div class="bg-white p-4 rounded-lg inline-block mb-4">
      <img 
        src={qrCodeUrl || "/placeholder.svg"} 
        alt="QR Code for {shopData.name}"
        class="w-48 h-48 mx-auto"
      />
    </div>
    
    <p class="text-sm text-gray-600 mb-4">
      Customers can scan this code to view your shop profile
    </p>
    
    <button 
      onclick={downloadQR}
      class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
    >
      Download QR Code
    </button>
  {:else}
    <div class="w-48 h-48 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
      <span class="text-gray-500">Generating QR Code...</span>
    </div>
  {/if}
</div>
