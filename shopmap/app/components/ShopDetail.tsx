"use client"

import { useState } from "react"
import { ArrowLeft, MapPin, Clock, Phone, Share2, QrCode, Star, Heart } from "lucide-react"
import QRCodeGenerator from "./QRCodeGenerator"
import Image from "next/image"

interface ShopDetailProps {
  shop: {
    id: number
    name: string
    building: string
    floor: string
    shop_number: string
    category: string
    description: string
    whatsapp: string
    operating_hours: string
    weekly_special?: string
    images?: string[]
    popular_items?: string[]
    rating?: number
    reviews_count?: number
    featured_product?: string
    price_range?: string
  }
  onBack: () => void
}

export default function ShopDetail({ shop, onBack }: ShopDetailProps) {
  const [showQR, setShowQR] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  function openWhatsApp() {
    const message = encodeURIComponent(
      `Hi! I found your shop "${shop.name}" on Bulawayo Marketplace. I'm interested in your products.`,
    )
    const url = `https://wa.me/${shop.whatsapp.replace(/[^0-9]/g, "")}?text=${message}`
    window.open(url, "_blank")
  }

  function shareShop() {
    if (navigator.share) {
      navigator.share({
        title: shop.name,
        text: `Check out ${shop.name} at ${shop.building} on Bulawayo Marketplace`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Shop link copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to shops</span>
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
              </button>
              <button
                onClick={() => setShowQR(!showQR)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              >
                <QrCode className="w-5 h-5" />
              </button>
              <button
                onClick={shareShop}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        {/* Hero Image Section */}
        <div className="relative">
          {shop.images && shop.images.length > 0 && (
            <div className="aspect-[16/9] md:aspect-[21/9] bg-gray-200 overflow-hidden">
              <Image
                src={shop.images[0] || "/icons8-placeholder-96.png?height=400&width=800"}
                alt={shop.name}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          )}

          {/* Floating Info Card */}
          <div className="absolute bottom-6 left-6 right-6 md:left-8 md:right-auto md:max-w-md">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{shop.name}</h1>
                  {shop.rating && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-900">{shop.rating}</span>
                      </div>
                      <span className="text-gray-600">({shop.reviews_count} reviews)</span>
                    </div>
                  )}
                </div>
              </div>

              {shop.price_range && (
                <div className="mb-3">
                  <span className="text-2xl font-bold text-orange-600">{shop.price_range}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="w-5 h-5" />
                <div>
                  <p className="font-medium text-gray-900">{shop.building}</p>
                  <p className="text-sm">
                    {shop.floor} • Shop {shop.shop_number}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-8">
          {/* Weekly Special */}
          {shop.weekly_special && (
            <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl p-6 mb-8 text-white">
              <h3 className="font-bold text-xl mb-2">🎉 This Week&apos;s Special Offer</h3>
              <p className="text-lg opacity-95">{shop.weekly_special}</p>
            </div>
          )}

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About this shop</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{shop.description}</p>
          </div>

          {/* Popular Items */}
          {shop.popular_items && shop.popular_items.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Items</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {shop.popular_items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <span className="text-2xl">🛍️</span>
                    </div>
                    <p className="font-medium text-gray-900">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Operating Hours */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Operating Hours
            </h3>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 text-lg">{shop.operating_hours}</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-700 font-medium">Open today</span>
              </div>
            </div>
          </div>

          {/* QR Code */}
          {showQR && (
            <div className="mb-8">
              <QRCodeGenerator shopData={shop} />
            </div>
          )}

          {/* Contact Actions */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Get in touch</h3>
            <div className="space-y-4">
              <button
                onClick={openWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-colors text-lg"
              >
                <Phone className="w-6 h-6" />
                Chat on WhatsApp
              </button>

              <div className="text-center">
                <p className="text-gray-600">
                  Click to start a conversation with <span className="font-medium">{shop.name}</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">Usually responds within a few hours</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
