"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Star, ShoppingCart, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface LaptopData {
  id: number
  name: string
  brand: string
  price: string
  originalPrice?: string
  image: string
  rating: number
  reviews: number
  badge: string
  specs: string[]
  inStock: boolean
  description?: string
}

export default function LaptopsPage() {
  const [laptops, setLaptops] = useState<LaptopData[]>([
    {
      id: 1,
      name: "MacBook Air M2",
      brand: "Apple",
      price: "ZMW 18,500",
      originalPrice: "ZMW 20,000",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.9,
      reviews: 124,
      badge: "Best Seller",
      specs: ["13.6-inch Display", "8GB RAM", "256GB SSD", "M2 Chip"],
      inStock: true,
    },
    {
      id: 2,
      name: "ThinkPad X1 Carbon",
      brand: "Lenovo",
      price: "ZMW 15,200",
      originalPrice: "ZMW 16,800",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.7,
      reviews: 89,
      badge: "Professional",
      specs: ["14-inch Display", "16GB RAM", "512GB SSD", "Intel i7"],
      inStock: true,
    },
    {
      id: 3,
      name: "XPS 13 Plus",
      brand: "Dell",
      price: "ZMW 16,900",
      originalPrice: "ZMW 18,500",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.8,
      reviews: 156,
      badge: "Premium",
      specs: ["13.4-inch Display", "16GB RAM", "1TB SSD", "Intel i7"],
      inStock: true,
    },
    {
      id: 4,
      name: "Surface Laptop 5",
      brand: "Microsoft",
      price: "ZMW 14,300",
      originalPrice: "ZMW 15,800",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.6,
      reviews: 73,
      badge: "New Arrival",
      specs: ["13.5-inch Display", "8GB RAM", "256GB SSD", "Intel i5"],
      inStock: true,
    },
    {
      id: 5,
      name: "MacBook Pro 14",
      brand: "Apple",
      price: "ZMW 25,900",
      originalPrice: "ZMW 28,000",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.9,
      reviews: 201,
      badge: "Premium",
      specs: ["14-inch Display", "16GB RAM", "512GB SSD", "M2 Pro"],
      inStock: true,
    },
    {
      id: 6,
      name: "HP Spectre x360",
      brand: "HP",
      price: "ZMW 17,800",
      originalPrice: "ZMW 19,500",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.5,
      reviews: 92,
      badge: "2-in-1",
      specs: ["13.5-inch Touch", "16GB RAM", "1TB SSD", "Intel i7"],
      inStock: false,
    },
  ])

  const [filteredLaptops, setFilteredLaptops] = useState<LaptopData[]>(laptops)
  const [selectedBrand, setSelectedBrand] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const brands = ["All", ...new Set(laptops.map((laptop) => laptop.brand))]

  // Load laptops from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("swift-vibe-laptops")
    if (saved) {
      try {
        const savedLaptops = JSON.parse(saved)
        setLaptops(savedLaptops)
        setFilteredLaptops(savedLaptops)
      } catch (error) {
        console.error("Failed to load saved laptops:", error)
      }
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
                  className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={laptop.image || "/placeholder.svg"}
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
                    {!laptop.inStock && <Badge className="absolute top-3 right-3 bg-red-500">Out of Stock</Badge>}
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
                      {laptop.specs.map((spec, index) => (
                        <li key={index}>• {spec}</li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-lg font-bold text-gray-900">{laptop.price}</span>
                        {laptop.originalPrice && (
                          <span className="ml-2 text-sm text-gray-500 line-through">{laptop.originalPrice}</span>
                        )}
                      </div>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90" size="sm" disabled={!laptop.inStock}>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {laptop.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
