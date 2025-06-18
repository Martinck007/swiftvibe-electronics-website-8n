"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, Search, ShoppingCart, User, X, Settings, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { CheckoutModal } from "./checkout-modal"

interface CartItem {
  id: number
  name: string
  brand: string
  price: string
  quantity: number
  image?: string
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const navigation = [
    { name: "Laptops", href: "/laptops" },
    { name: "Swap & Top-up", href: "/swap" },
    { name: "Repair with us", href: "/repair" },
    { name: "Recycle with us", href: "/recycle" },
    { name: "About", href: "/about" },
  ]

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("swift-vibe-cart")
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to load cart:", error)
      }
    }

    // Listen for cart updates from other components
    const handleCartUpdate = (event: CustomEvent) => {
      setCartItems(event.detail)
    }

    window.addEventListener("cartUpdated" as any, handleCartUpdate)
    return () => window.removeEventListener("cartUpdated" as any, handleCartUpdate)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("swift-vibe-cart", JSON.stringify(cartItems))
  }, [cartItems])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to laptops page with search query
      window.location.href = `/laptops?search=${encodeURIComponent(searchQuery)}`
      setSearchQuery("")
    }
  }

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    if (userEmail && userPassword) {
      setIsSignedIn(true)
      alert(`Welcome back, ${userEmail}!`)
      setUserEmail("")
      setUserPassword("")
    }
  }

  const handleSignOut = () => {
    setIsSignedIn(false)
    alert("You have been signed out.")
  }

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedCart)
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
      return
    }

    const updatedCart = cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    setCartItems(updatedCart)
  }

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => {
        const price = Number.parseInt(item.price.replace(/[^\d]/g, ""))
        return total + price * item.quantity
      }, 0)
      .toLocaleString()
  }

  const handleGoogleSignIn = () => {
    // Simulate Google OAuth
    setIsSignedIn(true)
    setUserEmail("user@gmail.com")
    alert("Successfully signed in with Google!")
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    if (userEmail && userPassword) {
      setIsSignedIn(true)
      alert(`Account created successfully! Welcome, ${userEmail}!`)
      setUserEmail("")
      setUserPassword("")
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-24 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-4">
            <Image
              src="/images/swift-vibe-logo.png"
              alt="Swift-Vibe Electronics"
              width={300}
              height={100}
              className="h-16 w-auto"
              priority
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-primary">Swift-Vibe Electronics</h1>
              <p className="text-sm text-gray-600">Premium Technology Solutions</p>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Admin Link */}
          <Link href="/admin">
            <Button variant="ghost" size="icon" title="Admin Dashboard">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>

          {/* Search */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Search Products</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSearch} className="space-y-4">
                <Input
                  placeholder="Search for laptops, brands, models..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" className="w-full">
                  Search
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          {/* User Account */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{isSignedIn ? "Account" : "Sign In"}</DialogTitle>
              </DialogHeader>
              {isSignedIn ? (
                <div className="space-y-4">
                  <p>Welcome back, {userEmail || "User"}!</p>
                  <Link href="/admin">
                    <Button variant="outline" className="w-full mb-2">
                      <Settings className="mr-2 h-4 w-4" />
                      Admin Dashboard
                    </Button>
                  </Link>
                  <Button onClick={handleSignOut} variant="outline" className="w-full">
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      required
                    />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                      required
                    />
                    <Button type="submit" className="w-full">
                      Sign In
                    </Button>
                  </form>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Or</span>
                    </div>
                  </div>

                  <Button onClick={handleGoogleSignIn} variant="outline" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Continue with Google
                  </Button>

                  <form onSubmit={handleSignUp} className="space-y-4 pt-4 border-t">
                    <p className="text-sm text-center text-gray-600">Don't have an account?</p>
                    <Input
                      type="email"
                      placeholder="Email for new account"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      required
                    />
                    <Input
                      type="password"
                      placeholder="Create password"
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                      required
                    />
                    <Button type="submit" variant="outline" className="w-full">
                      Create Account
                    </Button>
                  </form>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Shopping Cart */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Shopping Cart</h2>
                  <Badge variant="secondary">{cartItems.length} items</Badge>
                </div>

                <div className="flex-1 overflow-auto space-y-4">
                  {cartItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                  ) : (
                    cartItems.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            {item.image && (
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                            )}
                            <div className="flex-1">
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-gray-600">{item.brand}</p>
                              <p className="text-sm font-semibold text-primary">{item.price}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                -
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </Button>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>

                {cartItems.length > 0 && (
                  <div className="border-t pt-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total: ZMW {getTotalPrice()}</span>
                    </div>
                    <Button className="w-full" onClick={() => setIsCheckoutOpen(true)}>
                      Proceed to Checkout
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col space-y-4 mt-8">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-primary">Swift-Vibe Electronics</h2>
                <p className="text-sm text-gray-600">Premium Technology Solutions</p>
              </div>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <Link
                href="/admin"
                className="text-lg font-medium text-gray-700 hover:text-primary transition-colors flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="mr-2 h-5 w-5" />
                Admin Dashboard
              </Link>

              <div className="flex items-center space-x-4 pt-4 border-t">
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItems.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cartItems.reduce((total, item) => total + item.quantity, 0)}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderComplete={() => setCartItems([])}
      />
    </header>
  )
}
