"use client"

import { useState, useEffect, useCallback } from "react"
import ShopCard from "./components/ShopCard"
import ShopDetail from "./components/ShopDetail"
import SearchBar from "./components/SearchBar"
import CategoryFilter from "./components/CategoryFilter"
import { supabase } from "./lib/supabase"
import { MapPin, Search, Filter, Grid3X3, List } from "lucide-react"

interface Shop {
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

export default function HomePage() {
  const [shops, setShops] = useState<Shop[]>([])
  const [filteredShops, setFilteredShops] = useState<Shop[]>([])
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const categories = ["all", "clothing", "electronics", "food", "beauty", "accessories", "services", "other"]

  const filterShops = useCallback(() => {
    const filtered = shops.filter((shop) => {
      const matchesSearch =
        shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "all" || shop.category === selectedCategory

      return matchesSearch && matchesCategory
    })
    setFilteredShops(filtered)
  }, [shops, searchQuery, selectedCategory])

  useEffect(() => {
    loadShops()
  }, [])

  useEffect(() => {
    filterShops()
  }, [filterShops])

  async function loadShops() {
    if (!supabase) {
      const demo = getDemoShops()
      setShops(demo)
      setFilteredShops(demo)
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.from("shops").select("*").order("name")
      if (error) throw error
      setShops(data || [])
      setFilteredShops(data || [])
    } catch (error) {
      console.error("Error loading shops:", error)
      const demoShops = getDemoShops()
      setShops(demoShops)
      setFilteredShops(demoShops)
    } finally {
      setLoading(false)
    }
  }

  function getDemoShops(): Shop[] {
    return [
      {
        id: 1,
        name: "Trendy Threads",
        building: "Ascot Shopping Centre",
        floor: "Ground Floor",
        shop_number: "G12",
        category: "clothing",
        description: "Modern African-inspired fashion with contemporary designs",
        whatsapp: "+263771234567",
        operating_hours: "Mon-Sat: 8:00-18:00, Sun: 10:00-16:00",
        weekly_special: "20% off all dresses this week",
        images: ["/clothing.png?height=400&width=400"],
        popular_items: ["Ankara Dresses", "Traditional Wraps", "Modern Blazers"],
        rating: 4.8,
        reviews_count: 127,
        featured_product: "Ankara Print Dress",
        price_range: "$15 - $45",
      },
      {
        id: 2,
        name: "TechHub Electronics",
        building: "Parkade Centre",
        floor: "1st Floor",
        shop_number: "F15",
        category: "electronics",
        description: "Latest electronics and professional repair services",
        whatsapp: "+263772345678",
        operating_hours: "Mon-Fri: 8:30-17:30, Sat: 9:00-15:00",
        weekly_special: "Free screen protector with phone purchase",
        images: ["/electronics.png?height=400&width=400"],
        popular_items: ["Samsung Galaxy", "iPhone Cases", "Wireless Chargers"],
        rating: 4.6,
        reviews_count: 89,
        featured_product: "Samsung Galaxy A54",
        price_range: "$50 - $400",
      },
      {
        id: 3,
        name: "Mama's Kitchen",
        building: "City Centre Complex",
        floor: "Ground Floor",
        shop_number: "G08",
        category: "food",
        description: "Authentic Zimbabwean cuisine made with traditional recipes",
        whatsapp: "+263773456789",
        operating_hours: "Mon-Sat: 7:00-19:00",
        weekly_special: "Buy 2 meals, get 1 free drink",
        images: ["/food.png?height=400&width=400"],
        popular_items: ["Sadza & Beef Stew", "Chicken & Rice", "Matemba Special"],
        rating: 4.9,
        reviews_count: 203,
        featured_product: "Traditional Sadza Platter",
        price_range: "$3 - $12",
      },
      {
        id: 4,
        name: "Glow Beauty Salon",
        building: "Ascot Shopping Centre",
        floor: "1st Floor",
        shop_number: "F22",
        category: "beauty",
        description: "Professional beauty treatments and natural hair care",
        whatsapp: "+263774567890",
        operating_hours: "Tue-Sat: 9:00-17:00",
        weekly_special: "Manicure + Pedicure combo $15",
        images: ["/beauty.png?height=400&width=400"],
        popular_items: ["Natural Hair Braiding", "Gel Manicures", "Facial Treatments"],
        rating: 4.7,
        reviews_count: 156,
        featured_product: "Full Beauty Package",
        price_range: "$8 - $35",
      },
      {
        id: 5,
        name: "Shoe Palace",
        building: "Parkade Centre",
        floor: "Ground Floor",
        shop_number: "G25",
        category: "accessories",
        description: "Premium footwear collection for every occasion",
        whatsapp: "+263775678901",
        operating_hours: "Mon-Sat: 8:00-18:00, Sun: 10:00-15:00",
        weekly_special: "Buy 2 pairs, get 30% off second pair",
        images: ["/shoes.png?height=400&width=400"],
        popular_items: ["Designer Sneakers", "Formal Leather Shoes", "Summer Sandals"],
        rating: 4.5,
        reviews_count: 94,
        featured_product: "Premium Leather Boots",
        price_range: "$20 - $80",
      },
      {
        id: 6,
        name: "Artisan Crafts",
        building: "TM Hypermarket Complex",
        floor: "1st Floor",
        shop_number: "F12",
        category: "accessories",
        description: "Handmade crafts and traditional Zimbabwean art pieces",
        whatsapp: "+263776543210",
        operating_hours: "Mon-Sat: 9:00-17:00",
        weekly_special: "Free gift wrapping on all purchases",
        images: ["/accessories.png?height=400&width=400"],
        popular_items: ["Stone Sculptures", "Woven Baskets", "Wooden Carvings"],
        rating: 4.9,
        reviews_count: 78,
        featured_product: "Shona Stone Sculpture",
        price_range: "$5 - $150",
      },
    ]
  }

  function selectShop(shop: Shop) {
    setSelectedShop(shop)
  }

  function goBack() {
    setSelectedShop(null)
  }

  return (
    <div className="min-h-screen bg-primary-light">
      {/* Dark Header */}
      <header className="bg-primary-dark border-b border-accent-blue sticky top-0 z-50 glass-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 tech-gradient rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-primary-light">Bulawayo</h1>
                <p className="text-xs text-primary-light opacity-75 -mt-1">Shop Directory</p>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-primary-black rounded-lg p-1 deskTopBtn">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-accent-blue text-white shadow-sm"
                      : "text-primary-light hover:text-accent-blue"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-accent-blue text-white shadow-sm"
                      : "text-primary-light hover:text-accent-blue"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden p-2 text-primary-light hover:text-accent-blue hover:bg-primary-black rounded-lg transition-colors"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Search Section */}
          <div className="pb-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          {/* Category Filter */}
          <div className={`pb-4 ${showFilters ? "block" : "hidden md:block"}`}>
            <CategoryFilter categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
          </div>
        </div>
      </header>

      {selectedShop ? (
        <ShopDetail shop={selectedShop} onBack={goBack} />
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-primary-dark">
                {selectedCategory === "all"
                  ? "All Shops"
                  : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}
              </h2>
              <p className="text-primary-dark opacity-75 mt-1">
                {filteredShops.length} shop{filteredShops.length !== 1 ? "s" : ""} found
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div
              className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}
            >
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-t-xl"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredShops.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Search className="w-8 h-8 text-accent-blue" />
              </div>
              <h3 className="text-xl font-semibold text-primary-dark mb-2">No shops found</h3>
              <p className="text-primary-dark opacity-75 max-w-md mx-auto mb-8">
                We couldn&apos;t find any shops matching your criteria. Try adjusting your search or filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                }}
                className="btn-modern"
              >
                Show All Shops
              </button>
            </div>
          ) : (
            /* Shop Grid */
            <div
              className={`grid gap-6 animate-fade-in ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1 max-w-4xl mx-auto"
              }`}
            >
              {filteredShops.map((shop) => (
                <ShopCard key={shop.id} shop={shop} onClick={() => selectShop(shop)} viewMode={viewMode} />
              ))}
            </div>
          )}
        </main>
      )}
    </div>
  )
}
