"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, Search, ShoppingCart, UserIcon, X, Mail, Heart, LogOut, UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { CheckoutModal } from "./checkout-modal"
import { WishlistModal } from "./wishlist-modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"

interface CartItem {
  id: number
  name: string
  brand: string
  price: string
  quantity: number
  image?: string
}

interface UserSession {
  id: string
  email: string
  firstName: string
  lastName: string
  dateJoined: string
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [wishlistCount, setWishlistCount] = useState(0)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  // Auth form states
  const [signInEmail, setSignInEmail] = useState("")
  const [signInPassword, setSignInPassword] = useState("")
  const [signUpEmail, setSignUpEmail] = useState("")
  const [signUpPassword, setSignUpPassword] = useState("")
  const [signUpFirstName, setSignUpFirstName] = useState("")
  const [signUpLastName, setSignUpLastName] = useState("")
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("")

  const navigation = [
    { name: "Laptops", href: "/laptops" },
    { name: "Swap & Top-up", href: "/swap" },
    { name: "Repair with us", href: "/repair" },
    { name: "Recycle with us", href: "/recycle" },
    { name: "About", href: "/about" },
  ]

  // Load user session and cart data on mount
  useEffect(() => {
    const loadData = () => {
      // Load user session
      const savedUser = localStorage.getItem("swift-vibe-user")
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser)
          setCurrentUser(user)
          setIsSignedIn(true)
        } catch (error) {
          console.error("Failed to load user session:", error)
          localStorage.removeItem("swift-vibe-user")
        }
      }

      // Load cart
      const savedCart = localStorage.getItem("swift-vibe-cart")
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart))
        } catch (error) {
          console.error("Failed to load cart:", error)
        }
      }

      // Load wishlist count
      const savedWishlist = localStorage.getItem("swift-vibe-wishlist")
      if (savedWishlist) {
        try {
          const wishlist = JSON.parse(savedWishlist)
          setWishlistCount(wishlist.length)
        } catch (error) {
          console.error("Failed to load wishlist:", error)
        }
      }
    }

    loadData()

    // Listen for cart updates
    const handleCartUpdate = (event: CustomEvent) => {
      setCartItems(event.detail)
    }

    // Listen for wishlist updates
    const handleWishlistUpdate = (event: CustomEvent) => {
      setWishlistCount(event.detail.length)
    }

    window.addEventListener("cartUpdated" as any, handleCartUpdate)
    window.addEventListener("wishlistUpdated" as any, handleWishlistUpdate)

    return () => {
      window.removeEventListener("cartUpdated" as any, handleCartUpdate)
      window.removeEventListener("wishlistUpdated" as any, handleWishlistUpdate)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("swift-vibe-cart", JSON.stringify(cartItems))
    // Dispatch update event
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: cartItems }))
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

    if (!signInEmail || !signInPassword) {
      alert("Please fill in all fields")
      return
    }

    // Get registered users
    const registeredUsers = JSON.parse(localStorage.getItem("swift-vibe-users") || "[]")

    // Find user
    const user = registeredUsers.find((u: any) => u.email === signInEmail && u.password === signInPassword)

    if (user) {
      const userSession = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        dateJoined: user.dateJoined,
      }

      setCurrentUser(userSession)
      setIsSignedIn(true)
      localStorage.setItem("swift-vibe-user", JSON.stringify(userSession))

      alert(`Welcome back, ${user.firstName}!`)
      setIsAuthOpen(false)

      // Clear form
      setSignInEmail("")
      setSignInPassword("")
    } else {
      alert("Invalid email or password")
    }
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()

    if (!signUpEmail || !signUpPassword || !signUpFirstName || !signUpLastName || !signUpConfirmPassword) {
      alert("Please fill in all fields")
      return
    }

    if (signUpPassword !== signUpConfirmPassword) {
      alert("Passwords do not match")
      return
    }

    if (signUpPassword.length < 6) {
      alert("Password must be at least 6 characters long")
      return
    }

    // Get existing users
    const existingUsers = JSON.parse(localStorage.getItem("swift-vibe-users") || "[]")

    // Check if email already exists
    if (existingUsers.some((u: any) => u.email === signUpEmail)) {
      alert("An account with this email already exists")
      return
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email: signUpEmail,
      password: signUpPassword,
      firstName: signUpFirstName,
      lastName: signUpLastName,
      dateJoined: new Date().toISOString(),
    }

    // Save user
    existingUsers.push(newUser)
    localStorage.setItem("swift-vibe-users", JSON.stringify(existingUsers))

    // Create session
    const userSession = {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      dateJoined: newUser.dateJoined,
    }

    setCurrentUser(userSession)
    setIsSignedIn(true)
    localStorage.setItem("swift-vibe-user", JSON.stringify(userSession))

    alert(`Account created successfully! Welcome, ${newUser.firstName}!`)
    setIsAuthOpen(false)

    // Clear form
    setSignUpEmail("")
    setSignUpPassword("")
    setSignUpFirstName("")
    setSignUpLastName("")
    setSignUpConfirmPassword("")
  }

  const handleSignOut = () => {
    setIsSignedIn(false)
    setCurrentUser(null)
    localStorage.removeItem("swift-vibe-user")
    alert("You have been signed out.")
  }

  const handleGoogleSignIn = () => {
    // Simulate Google OAuth
    const googleUser = {
      id: "google_" + Date.now(),
      email: "user@gmail.com",
      firstName: "Google",
      lastName: "User",
      dateJoined: new Date().toISOString(),
    }

    setCurrentUser(googleUser)
    setIsSignedIn(true)
    localStorage.setItem("swift-vibe-user", JSON.stringify(googleUser))
    alert("Successfully signed in with Google!")
    setIsAuthOpen(false)
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

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const handleCheckout = () => {
    if (!isSignedIn) {
      alert("Please sign in to proceed with checkout")
      setIsAuthOpen(true)
      return
    }
    setIsCartOpen(false) // Close cart sheet
    setIsCheckoutOpen(true) // Open checkout modal
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

          {/* Wishlist */}
          <WishlistModal>
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                  {wishlistCount}
                </Badge>
              )}
            </Button>
          </WishlistModal>

          {/* User Account */}
          <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <UserIcon className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{isSignedIn ? "My Account" : "Sign In to Your Account"}</DialogTitle>
              </DialogHeader>
              {isSignedIn ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <UserCircle className="h-12 w-12 text-gray-400" />
                    <div>
                      <p className="font-medium">
                        {currentUser?.firstName} {currentUser?.lastName}
                      </p>
                      <p className="text-sm text-gray-600">{currentUser?.email}</p>
                      <p className="text-xs text-gray-500">
                        Member since{" "}
                        {currentUser?.dateJoined ? new Date(currentUser.dateJoined).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                  </div>
                  <Button onClick={handleSignOut} variant="outline" className="w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Tabs defaultValue="signin" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>

                  <TabsContent value="signin" className="space-y-4">
                    <form onSubmit={handleSignIn} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signin-email">Email</Label>
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="Enter your email"
                          value={signInEmail}
                          onChange={(e) => setSignInEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signin-password">Password</Label>
                        <Input
                          id="signin-password"
                          type="password"
                          placeholder="Enter your password"
                          value={signInPassword}
                          onChange={(e) => setSignInPassword(e.target.value)}
                          required
                        />
                      </div>
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
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-4">
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="signup-firstname">First Name</Label>
                          <Input
                            id="signup-firstname"
                            placeholder="First name"
                            value={signUpFirstName}
                            onChange={(e) => setSignUpFirstName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-lastname">Last Name</Label>
                          <Input
                            id="signup-lastname"
                            placeholder="Last name"
                            value={signUpLastName}
                            onChange={(e) => setSignUpLastName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="Enter your email"
                          value={signUpEmail}
                          onChange={(e) => setSignUpEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="Create a password (min 6 characters)"
                          value={signUpPassword}
                          onChange={(e) => setSignUpPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-confirm">Confirm Password</Label>
                        <Input
                          id="signup-confirm"
                          type="password"
                          placeholder="Confirm your password"
                          value={signUpConfirmPassword}
                          onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Create Account
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              )}
            </DialogContent>
          </Dialog>

          {/* Shopping Cart */}
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {getTotalItems()}
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
                    <div className="text-center py-8">
                      <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Your cart is empty</p>
                      <Button className="mt-4" onClick={() => setIsCartOpen(false)}>
                        Continue Shopping
                      </Button>
                    </div>
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
                    <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleCheckout}>
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

              <div className="flex items-center space-x-4 pt-4 border-t">
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                      {wishlistCount}
                    </Badge>
                  )}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsAuthOpen(true)}>
                  <UserIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderComplete={() => setCartItems([])}
        currentUser={currentUser}
      />
    </header>
  )
}
