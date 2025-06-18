"use client"

import Image from "next/image"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"

const defaultProducts = [
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

export function FeaturedProducts() {
  const [laptops, setLaptops] = useState(defaultProducts)

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

    loadLaptops()

    // Listen for storage changes
    const handleStorageChange = () => {
      loadLaptops()
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  // Get the primary image for display
  const getPrimaryImage = (product: any) => {
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
              className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300"
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

                <Button className="w-full bg-primary hover:bg-primary/90" size="sm">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
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
    </section>
  )
}
