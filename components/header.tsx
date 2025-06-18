"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, Search, ShoppingCart, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "MacBook Air M2", price: "ZMW 18,500", quantity: 1 },
    { id: 2, name: "ThinkPad X1 Carbon", price: "ZMW 15,200", quantity: 1 },
  ])
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")

  const navigation = [
    { name: "Laptops", href: "/laptops" },
    { name: "Swap & Top-up", href: "/swap" },
    { name: "Repair with us", href: "/repair" },
    { name: "Recycle with us", href: "/recycle" },
    { name: "About", href: "/about" },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Simulate search functionality
      alert(`Searching for: ${searchQuery}`)
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
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => {
        const price = Number.parseInt(item.price.replace(/[^\d]/g, ""))
        return total + price * item.quantity
      }, 0)
      .toLocaleString()
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
                  <p>Welcome back!</p>
                  <Button onClick={handleSignOut} variant="outline" className="w-full">
                    Sign Out
                  </Button>
                </div>
              ) : (
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
                  <p className="text-sm text-gray-600 text-center">
                    Don't have an account?{" "}
                    <Button variant="link" className="p-0">
                      Sign up
                    </Button>
                  </p>
                </form>
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
                    {cartItems.length}
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
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-gray-600">{item.price}</p>
                              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
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
                    <Button className="w-full">Proceed to Checkout</Button>
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
                      {cartItems.length}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
