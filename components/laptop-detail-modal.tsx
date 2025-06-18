"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ImageGallery } from "./image-gallery"
import { Star, ShoppingCart, Heart, Share2, Check } from "lucide-react"

interface Laptop {
  id: number
  name: string
  brand: string
  price: string
  originalPrice?: string
  images?: string[]
  rating: number
  reviews: number
  badge: string
  specs: string[]
  inStock: boolean
  description?: string
}

interface LaptopDetailModalProps {
  laptop: Laptop | null
  isOpen: boolean
  onClose: () => void
}

// Add to cart function
const addToCart = (laptop: Laptop) => {
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
const addToWishlist = (laptop: Laptop) => {
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
const shareProduct = async (laptop: Laptop) => {
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

export function LaptopDetailModal({ laptop, isOpen, onClose }: LaptopDetailModalProps) {
  const [selectedTab, setSelectedTab] = useState("specs")
  const [inWishlist, setInWishlist] = useState(false)

  // Check wishlist status when laptop changes
  useState(() => {
    if (laptop) {
      setInWishlist(isInWishlist(laptop.id))
    }
  })

  if (!laptop) return null

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(laptop.id)
      setInWishlist(false)
      alert(`${laptop.name} removed from wishlist!`)
    } else {
      const added = addToWishlist(laptop)
      if (added) {
        setInWishlist(true)
      }
    }
  }

  const tabs = [
    { id: "specs", label: "Specifications" },
    { id: "description", label: "Description" },
    { id: "reviews", label: "Reviews" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{laptop.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            <ImageGallery
              images={laptop.images || ["/placeholder.svg"]}
              alt={laptop.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge
                  className={`${
                    laptop.badge === "Best Seller"
                      ? "bg-secondary"
                      : laptop.badge === "Premium"
                        ? "bg-primary"
                        : "bg-green-500"
                  }`}
                >
                  {laptop.badge}
                </Badge>
                {!laptop.inStock && <Badge className="bg-red-500">Out of Stock</Badge>}
              </div>

              <p className="text-lg text-gray-600 mb-2">{laptop.brand}</p>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-lg font-medium">{laptop.rating}</span>
                </div>
                <span className="ml-2 text-gray-500">({laptop.reviews} reviews)</span>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">{laptop.price}</span>
                {laptop.originalPrice && (
                  <span className="ml-3 text-xl text-gray-500 line-through">{laptop.originalPrice}</span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
                disabled={!laptop.inStock}
                onClick={() => addToCart(laptop)}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {laptop.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>

              <div className="flex space-x-2">
                <Button
                  variant={inWishlist ? "default" : "outline"}
                  className={`flex-1 ${inWishlist ? "bg-red-500 hover:bg-red-600 text-white" : ""}`}
                  onClick={handleWishlistToggle}
                >
                  {inWishlist ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      In Wishlist
                    </>
                  ) : (
                    <>
                      <Heart className="mr-2 h-4 w-4" />
                      Add to Wishlist
                    </>
                  )}
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => shareProduct(laptop)}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Quick Specs */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Key Specifications</h3>
                <ul className="space-y-2">
                  {laptop.specs.slice(0, 4).map((spec, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="mt-8">
          <div className="border-b">
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setSelectedTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="py-6">
            {selectedTab === "specs" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {laptop.specs.map((spec, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            )}

            {selectedTab === "description" && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {laptop.description ||
                    `The ${laptop.name} from ${laptop.brand} represents the perfect blend of performance, portability, and style. 
                    Designed for professionals and enthusiasts alike, this laptop delivers exceptional computing power in a sleek, 
                    modern package. Whether you're working on complex projects, streaming content, or staying productive on the go, 
                    this device offers the reliability and performance you need.`}
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">What's in the Box</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>{laptop.name}</li>
                  <li>Power Adapter</li>
                  <li>Quick Start Guide</li>
                  <li>Warranty Information</li>
                </ul>
              </div>
            )}

            {selectedTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{laptop.rating}</div>
                    <div className="flex items-center justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(laptop.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">{laptop.reviews} reviews</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Sample reviews */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="font-medium">John D.</span>
                        <span className="text-sm text-gray-500">Verified Purchase</span>
                      </div>
                      <p className="text-gray-700">
                        Excellent laptop! Great performance and build quality. Highly recommended for professional use.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          <Star className="h-4 w-4 text-gray-300" />
                        </div>
                        <span className="font-medium">Sarah M.</span>
                        <span className="text-sm text-gray-500">Verified Purchase</span>
                      </div>
                      <p className="text-gray-700">
                        Good value for money. Fast delivery and excellent customer service from Swift-Vibe Electronics.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
