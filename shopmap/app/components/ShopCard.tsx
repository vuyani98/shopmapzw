"use client"

import type React from "react"
import { MapPin, Star, Heart, Phone } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface ShopCardProps {
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
  onClick: () => void
  viewMode?: "grid" | "list"
}

export default function ShopCard({ shop, onClick, viewMode = "grid" }: ShopCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  function getCategoryColor(category: string) {
    const colors: Record<string, string> = {
      clothing: "bg-pink-50 text-pink-700 border-pink-200",
      electronics: "bg-blue-50 text-blue-700 border-blue-200",
      food: "bg-orange-50 text-orange-700 border-orange-200",
      beauty: "bg-purple-50 text-purple-700 border-purple-200",
      accessories: "bg-green-50 text-green-700 border-green-200",
      services: "bg-indigo-50 text-indigo-700 border-indigo-200",
      other: "bg-gray-50 text-gray-700 border-gray-200",
    }
    return colors[category] || colors.other
  }

  function handleLike(e: React.MouseEvent) {
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  function handleWhatsApp(e: React.MouseEvent) {
    e.stopPropagation()
    const message = encodeURIComponent(
      `Hi! I'm interested in ${shop.featured_product || "your products"} at ${shop.name}`,
    )
    window.open(`https://wa.me/${shop.whatsapp.replace(/[^0-9]/g, "")}?text=${message}`, "_blank")
  }

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-xl shadow-sm hover-lift cursor-pointer border border-gray-100" onClick={onClick}>
        <div className="flex p-6">
          {/* Image */}
          <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={shop.images?.[0] || "/icons8-placeholder-96.png?height=200&width=200"}
              alt={shop.name}
              fill
              className="object-cover"
              sizes="128px"
            />
            <button
              onClick={handleLike}
              className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
            >
              <Heart className={`w-3 h-3 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 ml-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{shop.name}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>
                    {shop.building} • {shop.floor}
                  </span>
                </div>
              </div>
              {shop.rating && (
                <div className="flex items-center text-sm">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{shop.rating}</span>
                  <span className="text-gray-500 ml-1">({shop.reviews_count})</span>
                </div>
              )}
            </div>

            <p className="text-gray-600 text-sm line-clamp-2 mb-3">{shop.description}</p>

            {shop.price_range && <p className="text-lg font-bold text-gray-900 mb-3">{shop.price_range}</p>}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(shop.category)}`}>
                  {shop.category}
                </span>
                <div className="flex items-center text-xs text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1 status-online"></div>
                  Open
                </div>
              </div>
              <button
                onClick={handleWhatsApp}
                className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Chat</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="bg-white rounded-xl shadow-sm hover-lift cursor-pointer border border-gray-100 overflow-hidden"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-100">
        <Image
          src={shop.images?.[0] || "/icons8-placeholder-96.png?height=300&width=300"}
          alt={shop.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Overlay Actions */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={handleLike}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </button>
        </div>

        {/* Status Indicator */}
        <div className="absolute top-3 left-3 flex items-center space-x-2">
          <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1 status-online"></div>
            <span className="text-xs font-medium text-green-700">Open</span>
          </div>
        </div>

        {/* Special Offer */}
        {shop.weekly_special && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-2 rounded-lg">
              🎉 {shop.weekly_special}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight">{shop.name}</h3>
          {shop.rating && (
            <div className="flex items-center text-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="font-medium">{shop.rating}</span>
            </div>
          )}
        </div>

        {/* Featured Product */}
        {shop.featured_product && <p className="text-sm text-gray-600 mb-2 font-medium">{shop.featured_product}</p>}

        {/* Price */}
        {shop.price_range && <p className="text-lg font-bold text-gray-900 mb-3">{shop.price_range}</p>}

        {/* Location */}
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{shop.building}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{shop.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(shop.category)}`}>
            {shop.category}
          </span>
          <button
            onClick={handleWhatsApp}
            className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Chat</span>
          </button>
        </div>
      </div>
    </div>
  )
}
