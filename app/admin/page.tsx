"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LaptopAdmin } from "@/components/laptop-admin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Laptop, Shield, Users, Package } from "lucide-react"

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

export default function AdminPage() {
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
  ])

  // Save to localStorage whenever laptops change
  useEffect(() => {
    localStorage.setItem("swift-vibe-laptops", JSON.stringify(laptops))
  }, [laptops])

  // Load from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("swift-vibe-laptops")
    if (saved) {
      try {
        setLaptops(JSON.parse(saved))
      } catch (error) {
        console.error("Failed to load saved laptops:", error)
      }
    }
  }, [])

  const stats = [
    { icon: Package, label: "Total Laptops", value: laptops.length.toString() },
    { icon: Laptop, label: "In Stock", value: laptops.filter((l) => l.inStock).length.toString() },
    { icon: Users, label: "Brands", value: new Set(laptops.map((l) => l.brand)).size.toString() },
    { icon: Shield, label: "Admin Access", value: "Active" },
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="container px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your Swift-Vibe Electronics laptop inventory</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Laptop Management */}
        <Card>
          <CardHeader>
            <CardTitle>Laptop Inventory Management</CardTitle>
          </CardHeader>
          <CardContent>
            <LaptopAdmin laptops={laptops} onLaptopsUpdate={setLaptops} />
          </CardContent>
        </Card>
      </div>

      <Footer />
    </main>
  )
}
