"use client"

import type React from "react"

import Image from "next/image"
import { Star, ShoppingCart, Heart, Share2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { LaptopDetailModal } from "./laptop-detail-modal"

interface Laptop {
  id: number
  name: string
  brand: string
  price: string
  originalPrice?: string
  image?: string
  images?: string[]
  rating: number
  reviews: number
  badge: string
  specs: string[]
  inStock: boolean
  description?: string
}

const defaultProducts: Laptop[] = [
  {
    id: 1,
    name: "MacBook Air M2",
    brand: "Apple",
    price: "ZMW 18,500",
    originalPrice: "ZMW 20,000",
    images: ["/placeholder.svg?height=300&width=400"],
    rating: 4.9,
    reviews: 124,
    badge: "Best Seller",
    specs: ["13.6-inch Display", "8GB RAM", "256GB SSD"],
    inStock: true,
  },
  {
    id: 2,
    name: "ThinkPad X1 Carbon",
    brand: "Lenovo",
    price: "ZMW 15,200",
    originalPrice: "ZMW 16,800",
    images: ["/placeholder.svg?height=300&width=400"],
    rating: 4.7,
    reviews: 89,
    badge: "Professional",
    specs: ["14-inch Display", "16GB RAM", "512GB SSD"],
    inStock: true,
  },
  {
    id: 3,
    name: "XPS 13 Plus",
    brand: "Dell",
    price: "ZMW 16,900",
    originalPrice: "ZMW 18,500",
    images: ["/placeholder.svg?height=300&width=400"],
    rating: 4.8,
    reviews: 156,
    badge: "Premium",
    specs: ["13.4-inch Display", "16GB RAM", "1TB SSD"],
    inStock: true,
  },
  {
    id: 4,
    name: "Surface Laptop 5",
    brand: "Microsoft",
    price: "ZMW 14,300",
    originalPrice: "ZMW 15,800",
    images: ["/placeholder.svg?height=300&width=400"],
    rating: 4.6,
    reviews: 73,
    badge: "Refurbished",
    specs: ["13.5-inch Display", "8GB RAM", "256GB SSD"],
    inStock: true,
  },
]

// Add to cart function
const addToCart = (laptop: Laptop) => {
  const cartItem = {
    id: laptop.id,
    name: laptop.name,
    brand: laptop.brand,
    price: laptop.price,
    quantity: 1,
    image: laptop.images?.[0] || laptop.image || "/placeholder.svg",
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
const addToWishlist = (laptop: Laptop) => {
  const wishlistItem = {
    id: laptop.id,
    name: laptop.name,
    brand: laptop.brand,
    price: laptop.price,
    image: laptop.images?.[0] || laptop.image || "/placeholder.svg",
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
const shareProduct = async (laptop: Laptop) => {
  const shareData = {
    title: `${laptop.name} - Swift-Vibe Electronics`,
    text: `Check out this ${laptop.brand} ${laptop.name} for ${laptop.price} at Swift-Vibe Electronics!`,
    url: window.location.origin,
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

export function FeaturedProducts() {
  const [laptops, setLaptops] = useState<Laptop[]>(defaultProducts)
  const [selectedLaptop, setSelectedLaptop] = useState<Laptop | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [wishlistItems, setWishlistItems] = useState<number[]>([])

  // Load laptops from localStorage and listen for changes
  useEffect(() => {
    const loadLaptops = () => {
      const saved = localStorage.getItem("swift-vibe-laptops")
      if (saved) {
        try {
          const savedLaptops = JSON.parse(saved)
          // Take first 4 laptops for featured section
          setLaptops(savedLaptops.slice(0, 4))
        } catch (error) {
          console.error("Failed to load saved laptops:", error)
        }
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

    // Listen for storage changes
    const handleStorageChange = () => {
      loadLaptops()
    }

    const handleWishlistUpdate = (event: CustomEvent) => {
      setWishlistItems(event.detail.map((item: any) => item.id))
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("wishlistUpdated" as any, handleWishlistUpdate)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("wishlistUpdated" as any, handleWishlistUpdate)
    }
  }, [])

  const handleLaptopClick = (laptop: Laptop) => {
    setSelectedLaptop(laptop)
    setIsDetailOpen(true)
  }

  const handleAddToCart = (e: React.MouseEvent, laptop: Laptop) => {
    e.stopPropagation() // Prevent opening detail modal
    addToCart(laptop)
  }

  const handleWishlistToggle = (e: React.MouseEvent, laptop: Laptop) => {
    e.stopPropagation() // Prevent opening detail modal

    if (wishlistItems.includes(laptop.id)) {
      removeFromWishlist(laptop.id)
      alert(`${laptop.name} removed from wishlist!`)
    } else {
      addToWishlist(laptop)
    }
  }

  const handleShare = (e: React.MouseEvent, laptop: Laptop) => {
    e.stopPropagation() // Prevent opening detail modal
    shareProduct(laptop)
  }

  // Get the primary image for display
  const getPrimaryImage = (product: Laptop) => {
    if (product.images && product.images.length > 0) {
      return product.images[0]
    }
    if (product.image) {
      return product.image
    }
    return "/placeholder.svg?height=300&width=400"
  }

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Featured Laptops</h2>
          <p className="mt-4 text-lg text-gray-600">Handpicked premium laptops for every need and budget</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {laptops.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => handleLaptopClick(product)}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={getPrimaryImage(product) || "/placeholder.svg"}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge
                  className={`absolute top-3 left-3 ${
                    product.badge === "Refurbished"
                      ? "bg-green-500"
                      : product.badge === "Best Seller"
                        ? "bg-secondary hover:bg-secondary/90"
                        : "bg-primary hover:bg-primary/90"
                  }`}
                >
                  {product.badge}
                </Badge>
                {product.images && product.images.length > 1 && (
                  <Badge className="absolute top-3 right-3 bg-blue-500">+{product.images.length - 1} more</Badge>
                )}
                {!product.inStock && <Badge className="absolute bottom-3 right-3 bg-red-500">Out of Stock</Badge>}

                {/* Action buttons overlay */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 bg-white/90 hover:bg-white"
                    onClick={(e) => handleWishlistToggle(e, product)}
                  >
                    {wishlistItems.includes(product.id) ? (
                      <Check className="h-4 w-4 text-red-500" />
                    ) : (
                      <Heart className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 bg-white/90 hover:bg-white"
                    onClick={(e) => handleShare(e, product)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="mb-2">
                  <p className="text-sm text-gray-500">{product.brand}</p>
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <span className="ml-2 text-sm text-gray-500">({product.reviews})</span>
                </div>

                {/* Specifications */}
                {product.specs && product.specs.length > 0 && (
                  <ul className="text-xs text-gray-600 mb-3 space-y-1">
                    {product.specs.slice(0, 3).map((spec: string, index: number) => (
                      <li key={index}>• {spec}</li>
                    ))}
                  </ul>
                )}

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-lg font-bold text-gray-900">{product.price}</span>
                    {product.originalPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  size="sm"
                  disabled={!product.inStock}
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Laptops
          </Button>
        </div>
      </div>

      {/* Laptop Detail Modal */}
      <LaptopDetailModal laptop={selectedLaptop} isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} />
    </section>
  )
}
