"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Star, ShoppingCart, Filter, Search, Heart, Share2, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { LaptopDetailModal } from "@/components/laptop-detail-modal"
import { useSearchParams } from "next/navigation"

interface LaptopData {
  id: number
  name: string
  brand: string
  price: string
  original_price?: string
  images: string[]
  rating: number
  reviews: number
  badge: string
  specs: string[]
  in_stock: boolean
  description?: string
}

// Add to cart function
const addToCart = (laptop: LaptopData) => {
  const cartItem = {
    id: laptop.id,
    name: laptop.name,
    brand: laptop.brand,
    price: laptop.price,
    quantity: 1,
    image: laptop.images?.[0] || "/placeholder.svg",
  }

  // Get existing cart
  const existingCart = JSON.parse(localStorage.getItem("swift-vibe-cart") || "[]")

  // Check if item already exists
  const existingItemIndex = existingCart.findIndex((item: any) => item.id === laptop.id)

  if (existingItemIndex >= 0) {
    // Update quantity
    existingCart[existingItemIndex].quantity += 1
  } else {
    // Add new item
    existingCart.push(cartItem)
  }

  // Save to localStorage
  localStorage.setItem("swift-vibe-cart", JSON.stringify(existingCart))

  // Dispatch custom event to update header
  window.dispatchEvent(new CustomEvent("cartUpdated", { detail: existingCart }))

  alert(`${laptop.name} added to cart!`)
}

// Wishlist functions
const addToWishlist = (laptop: LaptopData) => {
  const wishlistItem = {
    id: laptop.id,
    name: laptop.name,
    brand: laptop.brand,
    price: laptop.price,
    image: laptop.images?.[0] || "/placeholder.svg",
    dateAdded: new Date().toISOString(),
  }

  // Get existing wishlist
  const existingWishlist = JSON.parse(localStorage.getItem("swift-vibe-wishlist") || "[]")

  // Check if item already exists
  const existingItemIndex = existingWishlist.findIndex((item: any) => item.id === laptop.id)

  if (existingItemIndex >= 0) {
    alert(`${laptop.name} is already in your wishlist!`)
    return false
  } else {
    // Add new item
    existingWishlist.push(wishlistItem)
    localStorage.setItem("swift-vibe-wishlist", JSON.stringify(existingWishlist))

    // Dispatch custom event to update wishlist
    window.dispatchEvent(new CustomEvent("wishlistUpdated", { detail: existingWishlist }))

    alert(`${laptop.name} added to wishlist!`)
    return true
  }
}

const removeFromWishlist = (laptopId: number) => {
  const existingWishlist = JSON.parse(localStorage.getItem("swift-vibe-wishlist") || "[]")
  const updatedWishlist = existingWishlist.filter((item: any) => item.id !== laptopId)

  localStorage.setItem("swift-vibe-wishlist", JSON.stringify(updatedWishlist))
  window.dispatchEvent(new CustomEvent("wishlistUpdated", { detail: updatedWishlist }))

  return true
}

const isInWishlist = (laptopId: number) => {
  const existingWishlist = JSON.parse(localStorage.getItem("swift-vibe-wishlist") || "[]")
  return existingWishlist.some((item: any) => item.id === laptopId)
}

// Share function
const shareProduct = async (laptop: LaptopData) => {
  const shareData = {
    title: `${laptop.name} - Swift-Vibe Electronics`,
    text: `Check out this ${laptop.brand} ${laptop.name} for ${laptop.price} at Swift-Vibe Electronics!`,
    url: window.location.href,
  }

  try {
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData)
    } else {
      // Fallback: Copy to clipboard
      const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`
      await navigator.clipboard.writeText(shareText)
      alert("Product link copied to clipboard!")
    }
  } catch (error) {
    // Final fallback: Manual copy
    const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`
    const textArea = document.createElement("textarea")
    textArea.value = shareText
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand("copy")
    document.body.removeChild(textArea)
    alert("Product link copied to clipboard!")
  }
}

export default function LaptopsPage() {
  const searchParams = useSearchParams()
  const [laptops, setLaptops] = useState<LaptopData[]>([])
  const [filteredLaptops, setFilteredLaptops] = useState<LaptopData[]>([])
  const [selectedBrand, setSelectedBrand] = useState("All")
  const [searchQuery, setSearchQuery] = useState(searchParams?.get("search") || "")
  const [selectedLaptop, setSelectedLaptop] = useState<LaptopData | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [wishlistItems, setWishlistItems] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  const brands = ["All", ...new Set(laptops.map((laptop) => laptop.brand))]

  // Load laptops from API
  useEffect(() => {
    const loadLaptops = async () => {
      try {
        const response = await fetch("/api/laptops")
        if (response.ok) {
          const laptopsData = await response.json()
          setLaptops(laptopsData)
          setFilteredLaptops(laptopsData)
        } else {
          console.error("Failed to load laptops")
        }
      } catch (error) {
        console.error("Error loading laptops:", error)
      } finally {
        setLoading(false)
      }
    }

    const loadWishlist = () => {
      const saved = localStorage.getItem("swift-vibe-wishlist")
      if (saved) {
        try {
          const wishlist = JSON.parse(saved)
          setWishlistItems(wishlist.map((item: any) => item.id))
        } catch (error) {
          console.error("Failed to load wishlist:", error)
        }
      }
    }

    loadLaptops()
    loadWishlist()

    const handleWishlistUpdate = (event: CustomEvent) => {
      setWishlistItems(event.detail.map((item: any) => item.id))
    }

    window.addEventListener("wishlistUpdated" as any, handleWishlistUpdate)

    return () => {
      window.removeEventListener("wishlistUpdated" as any, handleWishlistUpdate)
    }
  }, [])

  // Filter laptops based on brand and search
  useEffect(() => {
    let filtered = laptops

    if (selectedBrand !== "All") {
      filtered = filtered.filter((laptop) => laptop.brand === selectedBrand)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (laptop) =>
          laptop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          laptop.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          laptop.specs.some((spec) => spec.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    setFilteredLaptops(filtered)
  }, [laptops, selectedBrand, searchQuery])

  const handleLaptopClick = (laptop: LaptopData) => {
    setSelectedLaptop(laptop)
    setIsDetailOpen(true)
  }

  const handleAddToCart = (e: React.MouseEvent, laptop: LaptopData) => {
    e.stopPropagation() // Prevent opening detail modal
    addToCart(laptop)
  }

  const handleWishlistToggle = (e: React.MouseEvent, laptop: LaptopData) => {
    e.stopPropagation() // Prevent opening detail modal

    if (wishlistItems.includes(laptop.id)) {
      removeFromWishlist(laptop.id)
      alert(`${laptop.name} removed from wishlist!`)
    } else {
      addToWishlist(laptop)
    }
  }

  const handleShare = (e: React.MouseEvent, laptop: LaptopData) => {
    e.stopPropagation() // Prevent opening detail modal
    shareProduct(laptop)
  }

  const getPrimaryImage = (laptop: LaptopData) => {
    if (laptop.images && laptop.images.length > 0) {
      return laptop.images[0]
    }
    return "/placeholder.svg?height=300&width=400"
  }

  if (loading) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center py-16">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p>Loading laptops...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-stone-50 to-stone-100 py-16">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Image
              src="/images/swift-vibe-logo.png"
              alt="Swift-Vibe Electronics"
              width={300}
              height={100}
              className="h-16 w-auto mx-auto mb-6"
              priority
            />
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
              Premium <span className="text-secondary">Laptops</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our curated collection of high-performance laptops from the world's leading brands
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search laptops..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              {brands.map((brand) => (
                <Button
                  key={brand}
                  variant={brand === selectedBrand ? "default" : "outline"}
                  size="sm"
                  className={brand === selectedBrand ? "bg-primary hover:bg-primary/90" : ""}
                  onClick={() => setSelectedBrand(brand)}
                >
                  {brand}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Laptops Grid */}
      <section className="py-16 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          {filteredLaptops.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No laptops found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedBrand("All")
                  setSearchQuery("")
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredLaptops.map((laptop) => (
                <Card
                  key={laptop.id}
                  className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => handleLaptopClick(laptop)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={getPrimaryImage(laptop) || "/placeholder.svg"}
                      alt={laptop.name}
                      className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge
                      className={`absolute top-3 left-3 ${
                        laptop.badge === "Best Seller"
                          ? "bg-secondary hover:bg-secondary/90"
                          : laptop.badge === "Premium"
                            ? "bg-primary hover:bg-primary/90"
                            : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {laptop.badge}
                    </Badge>
                    {!laptop.in_stock && <Badge className="absolute top-3 right-3 bg-red-500">Out of Stock</Badge>}
                    {laptop.images && laptop.images.length > 1 && (
                      <Badge className="absolute bottom-3 left-3 bg-blue-500">+{laptop.images.length - 1} more</Badge>
                    )}

                    {/* Action buttons overlay */}
                    <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 bg-white/90 hover:bg-white"
                        onClick={(e) => handleWishlistToggle(e, laptop)}
                      >
                        {wishlistItems.includes(laptop.id) ? (
                          <Check className="h-4 w-4 text-red-500" />
                        ) : (
                          <Heart className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 bg-white/90 hover:bg-white"
                        onClick={(e) => handleShare(e, laptop)}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="mb-2">
                      <p className="text-sm text-gray-500">{laptop.brand}</p>
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                        {laptop.name}
                      </h3>
                    </div>

                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm text-gray-600">{laptop.rating}</span>
                      </div>
                      <span className="ml-2 text-sm text-gray-500">({laptop.reviews})</span>
                    </div>

                    <ul className="text-xs text-gray-600 mb-3 space-y-1">
                      {laptop.specs.slice(0, 3).map((spec, index) => (
                        <li key={index}>• {spec}</li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-lg font-bold text-gray-900">{laptop.price}</span>
                        {laptop.original_price && (
                          <span className="ml-2 text-sm text-gray-500 line-through">{laptop.original_price}</span>
                        )}
                      </div>
                    </div>

                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      size="sm"
                      disabled={!laptop.in_stock}
                      onClick={(e) => handleAddToCart(e, laptop)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {laptop.in_stock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Laptop Detail Modal */}
      <LaptopDetailModal laptop={selectedLaptop} isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} />

      <Footer />
    </main>
  )
}
