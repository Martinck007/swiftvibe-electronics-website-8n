"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingCart, X, Share2 } from "lucide-react"

interface WishlistItem {
  id: number
  name: string
  brand: string
  price: string
  image: string
  dateAdded: string
}

interface WishlistModalProps {
  children: React.ReactNode
}

export function WishlistModal({ children }: WishlistModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])

  // Load wishlist from localStorage
  useEffect(() => {
    const loadWishlist = () => {
      const saved = localStorage.getItem("swift-vibe-wishlist")
      if (saved) {
        try {
          setWishlistItems(JSON.parse(saved))
        } catch (error) {
          console.error("Failed to load wishlist:", error)
        }
      }
    }

    loadWishlist()

    // Listen for wishlist updates
    const handleWishlistUpdate = (event: CustomEvent) => {
      setWishlistItems(event.detail)
    }

    window.addEventListener("wishlistUpdated" as any, handleWishlistUpdate)
    return () => window.removeEventListener("wishlistUpdated" as any, handleWishlistUpdate)
  }, [])

  const removeFromWishlist = (id: number) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id)
    setWishlistItems(updatedWishlist)
    localStorage.setItem("swift-vibe-wishlist", JSON.stringify(updatedWishlist))

    // Dispatch update event
    window.dispatchEvent(new CustomEvent("wishlistUpdated", { detail: updatedWishlist }))
  }

  const addToCart = (item: WishlistItem) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      brand: item.brand,
      price: item.price,
      quantity: 1,
      image: item.image,
    }

    // Get existing cart
    const existingCart = JSON.parse(localStorage.getItem("swift-vibe-cart") || "[]")

    // Check if item already exists
    const existingItemIndex = existingCart.findIndex((cartItem: any) => cartItem.id === item.id)

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

    alert(`${item.name} added to cart!`)
  }

  const shareItem = async (item: WishlistItem) => {
    const shareData = {
      title: `${item.name} - Swift-Vibe Electronics`,
      text: `Check out this ${item.brand} ${item.name} for ${item.price} at Swift-Vibe Electronics!`,
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-red-500" />
            <span>My Wishlist ({wishlistItems.length})</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-500 mb-4">Save items you love to your wishlist</p>
              <Button onClick={() => setIsOpen(false)}>Continue Shopping</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {wishlistItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="flex">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-24 h-24 object-cover" />
                    <CardContent className="flex-1 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm text-gray-500">{item.brand}</p>
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-lg font-bold text-primary">{item.price}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromWishlist(item.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-primary hover:bg-primary/90"
                          onClick={() => addToCart(item)}
                        >
                          <ShoppingCart className="mr-1 h-3 w-3" />
                          Add to Cart
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => shareItem(item)}>
                          <Share2 className="h-3 w-3" />
                        </Button>
                      </div>

                      <p className="text-xs text-gray-500 mt-2">
                        Added {new Date(item.dateAdded).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {wishlistItems.length > 0 && (
          <div className="flex justify-between items-center pt-4 border-t">
            <p className="text-sm text-gray-500">{wishlistItems.length} items in wishlist</p>
            <Button onClick={() => setIsOpen(false)}>Continue Shopping</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
