"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { LaptopAdmin } from "@/components/laptop-admin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Laptop, Shield, Users, Package, Lock, Loader2 } from "lucide-react"

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

export default function AdminPage() {
  const [laptops, setLaptops] = useState<LaptopData[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Admin password (in production, this should be environment variable)
  const ADMIN_PASSWORD = "SwiftVibe2024Admin!"

  useEffect(() => {
    // Check if admin is already authenticated
    const adminAuth = localStorage.getItem("swift-vibe-admin-auth")
    if (adminAuth === "authenticated") {
      setIsAuthenticated(true)
      loadLaptops()
    }
  }, [])

  const loadLaptops = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/laptops")
      if (response.ok) {
        const laptopsData = await response.json()
        setLaptops(laptopsData)
      } else {
        console.error("Failed to load laptops")
      }
    } catch (error) {
      console.error("Error loading laptops:", error)
    } finally {
      setLoading(false)
      setIsLoaded(true)
    }
  }

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem("swift-vibe-admin-auth", "authenticated")
      loadLaptops()
      setError("")
    } else {
      setError("Invalid admin password")
    }
  }

  const handleAdminLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("swift-vibe-admin-auth")
    setAdminPassword("")
  }

  const handleLaptopsUpdate = (updatedLaptops: LaptopData[]) => {
    setLaptops(updatedLaptops)
  }

  const stats = [
    { icon: Package, label: "Total Laptops", value: laptops.length.toString() },
    { icon: Laptop, label: "In Stock", value: laptops.filter((l) => l.in_stock).length.toString() },
    { icon: Users, label: "Brands", value: new Set(laptops.map((l) => l.brand)).size.toString() },
    { icon: Shield, label: "Admin Access", value: "Active" },
  ]

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Image
              src="/images/swift-vibe-logo.png"
              alt="Swift-Vibe Electronics"
              width={200}
              height={67}
              className="h-12 w-auto mx-auto mb-4"
            />
            <CardTitle className="flex items-center justify-center gap-2">
              <Lock className="h-5 w-5" />
              Admin Access Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-password">Admin Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="Enter admin password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" className="w-full">
                Access Admin Dashboard
              </Button>
            </form>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Demo Password:</strong> SwiftVibe2024Admin!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b">
        <div className="container px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/images/swift-vibe-logo.png"
                alt="Swift-Vibe Electronics"
                width={200}
                height={67}
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Swift-Vibe Electronics Management</p>
              </div>
            </div>
            <Button onClick={handleAdminLogout} variant="outline">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container px-4 py-8 sm:px-6 lg:px-8">
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
            <LaptopAdmin laptops={laptops} onLaptopsUpdate={handleLaptopsUpdate} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
