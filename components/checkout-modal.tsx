"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Smartphone, MapPin, User, Mail, Phone, CheckCircle } from "lucide-react"

interface CartItem {
  id: number
  name: string
  price: string
  quantity: number
  image?: string
}

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  onOrderComplete: () => void
}

export function CheckoutModal({ isOpen, onClose, cartItems, onOrderComplete }: CheckoutModalProps) {
  const [step, setStep] = useState(1) // 1: Details, 2: Payment, 3: Confirmation
  const [paymentMethod, setPaymentMethod] = useState("")
  const [orderData, setOrderData] = useState({
    // Customer Details
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Delivery Address
    address: "",
    city: "Lusaka",
    area: "",

    // Payment Details
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",

    // Mobile Money
    mobileNumber: "",
    mobileProvider: "",

    // Order Notes
    notes: "",
  })

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = Number.parseInt(item.price.replace(/[^\d]/g, ""))
      return total + price * item.quantity
    }, 0)
  }

  const handleInputChange = (field: string, value: string) => {
    setOrderData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    if (step === 1) {
      // Validate customer details
      if (!orderData.firstName || !orderData.lastName || !orderData.email || !orderData.phone || !orderData.address) {
        alert("Please fill in all required fields")
        return
      }
      setStep(2)
    } else if (step === 2) {
      // Validate payment details
      if (!paymentMethod) {
        alert("Please select a payment method")
        return
      }

      if (paymentMethod === "card") {
        if (!orderData.cardNumber || !orderData.expiryDate || !orderData.cvv || !orderData.cardName) {
          alert("Please fill in all card details")
          return
        }
      } else if (paymentMethod === "mobile") {
        if (!orderData.mobileNumber || !orderData.mobileProvider) {
          alert("Please fill in mobile money details")
          return
        }
      }

      // Process payment (simulate)
      processPayment()
    }
  }

  const processPayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setStep(3)
      // Clear cart after successful order
      setTimeout(() => {
        onOrderComplete()
        resetForm()
        onClose()
      }, 3000)
    }, 2000)
  }

  const resetForm = () => {
    setStep(1)
    setPaymentMethod("")
    setOrderData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "Lusaka",
      area: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
      mobileNumber: "",
      mobileProvider: "",
      notes: "",
    })
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>Checkout</span>
            <Badge variant="secondary">Step {step} of 3</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Summary - Always visible */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-sm">{item.price}</p>
                  </div>
                ))}

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-lg">ZMW {getTotalPrice().toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Customer & Delivery Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">First Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="John"
                          value={orderData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Last Name *</label>
                      <Input
                        placeholder="Doe"
                        value={orderData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          value={orderData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Phone *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="+260 XXX XXX XXX"
                          value={orderData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Delivery Address *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Textarea
                        placeholder="Full address including street, area, and landmarks"
                        value={orderData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">City</label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={orderData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                      >
                        <option value="Lusaka">Lusaka</option>
                        <option value="Kitwe">Kitwe</option>
                        <option value="Ndola">Ndola</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Area/Suburb</label>
                      <Input
                        placeholder="e.g., Kabulonga, Roma"
                        value={orderData.area}
                        onChange={(e) => handleInputChange("area", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Order Notes (Optional)</label>
                    <Textarea
                      placeholder="Any special instructions for delivery..."
                      value={orderData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card
                      className={`cursor-pointer transition-all ${paymentMethod === "card" ? "ring-2 ring-primary bg-primary/5" : "hover:shadow-md"}`}
                      onClick={() => setPaymentMethod("card")}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-8 w-8 text-primary" />
                          <div>
                            <h3 className="font-medium">Credit/Debit Card</h3>
                            <p className="text-sm text-gray-600">Visa, Mastercard</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card
                      className={`cursor-pointer transition-all ${paymentMethod === "mobile" ? "ring-2 ring-primary bg-primary/5" : "hover:shadow-md"}`}
                      onClick={() => setPaymentMethod("mobile")}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-8 w-8 text-green-600" />
                          <div>
                            <h3 className="font-medium">Mobile Money</h3>
                            <p className="text-sm text-gray-600">Airtel Money, MTN MoMo</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Card Payment Form */}
                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <h3 className="font-medium">Card Details</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Card Number *</label>
                          <Input
                            placeholder="1234 5678 9012 3456"
                            value={orderData.cardNumber}
                            onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                            maxLength={19}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Expiry Date *</label>
                            <Input
                              placeholder="MM/YY"
                              value={orderData.expiryDate}
                              onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                              maxLength={5}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-1">CVV *</label>
                            <Input
                              placeholder="123"
                              value={orderData.cvv}
                              onChange={(e) => handleInputChange("cvv", e.target.value)}
                              maxLength={4}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Cardholder Name *</label>
                          <Input
                            placeholder="John Doe"
                            value={orderData.cardName}
                            onChange={(e) => handleInputChange("cardName", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mobile Money Form */}
                  {paymentMethod === "mobile" && (
                    <div className="space-y-4">
                      <h3 className="font-medium">Mobile Money Details</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Mobile Provider *</label>
                          <select
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={orderData.mobileProvider}
                            onChange={(e) => handleInputChange("mobileProvider", e.target.value)}
                          >
                            <option value="">Select Provider</option>
                            <option value="airtel">Airtel Money</option>
                            <option value="mtn">MTN MoMo</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Mobile Number *</label>
                          <Input
                            placeholder="+260 XXX XXX XXX"
                            value={orderData.mobileNumber}
                            onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-800">
                          <strong>Instructions:</strong> You will receive a payment prompt on your mobile device to
                          complete the transaction.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for your purchase. Your order has been successfully placed and will be processed shortly.
                  </p>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <h3 className="font-medium text-green-900 mb-2">What happens next?</h3>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• You'll receive an order confirmation email</li>
                      <li>• We'll contact you within 24 hours to confirm delivery</li>
                      <li>• Your order will be delivered within 2-3 business days</li>
                      <li>• Payment will be processed upon delivery confirmation</li>
                    </ul>
                  </div>

                  <p className="text-sm text-gray-500">
                    Order Total: <strong>ZMW {getTotalPrice().toLocaleString()}</strong>
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between mt-6">
              {step > 1 && step < 3 && (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              )}

              {step < 3 && (
                <Button onClick={handleNextStep} className="ml-auto bg-primary hover:bg-primary/90">
                  {step === 1 ? "Continue to Payment" : "Complete Order"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
