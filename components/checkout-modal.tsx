"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
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
  /*  Optional – if you already have a signed-in user you can
      pass their basic data so the form starts pre-filled          */
  currentUser?: {
    firstName?: string
    lastName?: string
    email?: string
  } | null
}

export function CheckoutModal({ isOpen, onClose, cartItems, onOrderComplete, currentUser = null }: CheckoutModalProps) {
  const [step, setStep] = useState(1) // 1: details, 2: payment, 3: confirmation
  const [paymentMethod, setPaymentMethod] = useState<"" | "card" | "mobile">("")

  const [orderData, setOrderData] = useState({
    // customer details
    firstName: currentUser?.firstName ?? "",
    lastName: currentUser?.lastName ?? "",
    email: currentUser?.email ?? "",
    phone: "",
    // address
    address: "",
    city: "Lusaka",
    area: "",
    // card
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    // mobile money
    mobileNumber: "",
    mobileProvider: "",
    // misc
    notes: "",
  })

  /* ---------- helpers ---------- */

  const getTotalPrice = () => cartItems.reduce((t, i) => t + Number(i.price.replace(/[^\d]/g, "")) * i.quantity, 0)

  const handleChange = (field: string, v: string) => setOrderData((p) => ({ ...p, [field]: v }))

  const nextStep = () => {
    if (step === 1) {
      // very light validation
      const { firstName, lastName, email, phone, address } = orderData
      if (!firstName || !lastName || !email || !phone || !address) {
        alert("Please fill in all required fields.")
        return
      }
      setStep(2)
    } else if (step === 2) {
      if (!paymentMethod) {
        alert("Select a payment method.")
        return
      }
      if (
        paymentMethod === "card" &&
        (!orderData.cardNumber || !orderData.expiryDate || !orderData.cvv || !orderData.cardName)
      ) {
        alert("Please complete card information.")
        return
      }
      if (paymentMethod === "mobile" && (!orderData.mobileNumber || !orderData.mobileProvider)) {
        alert("Provide mobile-money details.")
        return
      }
      processPayment()
    }
  }

  const processPayment = () => {
    // fake delay
    setTimeout(() => {
      setStep(3)
      // finish & reset after short pause
      setTimeout(() => {
        onOrderComplete()
        resetForm()
        onClose()
      }, 3000)
    }, 1500)
  }

  const resetForm = () => {
    setStep(1)
    setPaymentMethod("")
    setOrderData({
      firstName: currentUser?.firstName ?? "",
      lastName: currentUser?.lastName ?? "",
      email: currentUser?.email ?? "",
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

  /* ---------- render ---------- */

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Checkout <Badge variant="secondary">Step {step} of 3</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* order summary */}
          <aside className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image || "/placeholder.svg?height=48&width=48&query=laptop"}
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
                  <div className="flex justify-between">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-lg">ZMW {getTotalPrice().toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* main panel */}
          <section className="lg:col-span-2 space-y-6">
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Customer &amp; Delivery Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* first name */}
                    <div className="relative">
                      <label className="block text-sm font-medium mb-1">First Name *</label>
                      <User className="absolute left-3 top-9 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="John"
                        value={orderData.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    {/* last name */}
                    <div>
                      <label className="block text-sm font-medium mb-1">Last Name *</label>
                      <Input
                        placeholder="Doe"
                        value={orderData.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                      />
                    </div>

                    {/* email */}
                    <div className="relative">
                      <label className="block text-sm font-medium mb-1">Email *</label>
                      <Mail className="absolute left-3 top-9 h-4 w-4 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={orderData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    {/* phone */}
                    <div className="relative">
                      <label className="block text-sm font-medium mb-1">Phone *</label>
                      <Phone className="absolute left-3 top-9 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="+260 ..."
                        value={orderData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* address */}
                  <div className="relative">
                    <label className="block text-sm font-medium mb-1">Delivery Address *</label>
                    <MapPin className="absolute left-3 top-9 h-4 w-4 text-gray-400" />
                    <Textarea
                      placeholder="Full address including street & landmarks"
                      value={orderData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* city + area */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">City</label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={orderData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
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
                        placeholder="Kabulonga, Roma ..."
                        value={orderData.area}
                        onChange={(e) => handleChange("area", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* notes */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Order Notes (optional)</label>
                    <Textarea
                      placeholder="Special instructions for delivery..."
                      value={orderData.notes}
                      onChange={(e) => handleChange("notes", e.target.value)}
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
                  {/* select method */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* card */}
                    <Card
                      className={`cursor-pointer transition-all ${
                        paymentMethod === "card" ? "ring-2 ring-primary bg-primary/5" : "hover:shadow-md"
                      }`}
                      onClick={() => setPaymentMethod("card")}
                    >
                      <CardContent className="p-4 flex items-center gap-3">
                        <CreditCard className="h-8 w-8 text-primary" />
                        <div>
                          <h3 className="font-medium">Credit/Debit Card</h3>
                          <p className="text-sm text-gray-600">Visa, Mastercard</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* mobile */}
                    <Card
                      className={`cursor-pointer transition-all ${
                        paymentMethod === "mobile" ? "ring-2 ring-primary bg-primary/5" : "hover:shadow-md"
                      }`}
                      onClick={() => setPaymentMethod("mobile")}
                    >
                      <CardContent className="p-4 flex items-center gap-3">
                        <Smartphone className="h-8 w-8 text-green-600" />
                        <div>
                          <h3 className="font-medium">Mobile Money</h3>
                          <p className="text-sm text-gray-600">Airtel Money, MTN MoMo</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* card form */}
                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <h3 className="font-medium">Card Details</h3>
                      <Input
                        placeholder="Card Number *"
                        value={orderData.cardNumber}
                        onChange={(e) => handleChange("cardNumber", e.target.value)}
                        maxLength={19}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="MM/YY *"
                          value={orderData.expiryDate}
                          onChange={(e) => handleChange("expiryDate", e.target.value)}
                          maxLength={5}
                        />
                        <Input
                          placeholder="CVV *"
                          value={orderData.cvv}
                          onChange={(e) => handleChange("cvv", e.target.value)}
                          maxLength={4}
                        />
                      </div>
                      <Input
                        placeholder="Cardholder Name *"
                        value={orderData.cardName}
                        onChange={(e) => handleChange("cardName", e.target.value)}
                      />
                    </div>
                  )}

                  {/* mobile money form */}
                  {paymentMethod === "mobile" && (
                    <div className="space-y-4">
                      <h3 className="font-medium">Mobile Money Details</h3>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={orderData.mobileProvider}
                        onChange={(e) => handleChange("mobileProvider", e.target.value)}
                      >
                        <option value="">Select Provider *</option>
                        <option value="airtel">Airtel Money</option>
                        <option value="mtn">MTN MoMo</option>
                      </select>
                      <Input
                        placeholder="Mobile Number *"
                        value={orderData.mobileNumber}
                        onChange={(e) => handleChange("mobileNumber", e.target.value)}
                      />
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                        You’ll receive a payment prompt on your mobile to complete the transaction.
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
                  <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for your purchase. We’ll reach out soon with delivery details.
                  </p>
                  <p className="text-sm text-gray-500">
                    Order Total: <strong>ZMW {getTotalPrice().toLocaleString()}</strong>
                  </p>
                </CardContent>
              </Card>
            )}

            {/* navigation buttons */}
            <div className="flex justify-between">
              {step > 1 && step < 3 && (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              )}
              {step < 3 && (
                <Button className="ml-auto" onClick={nextStep}>
                  {step === 1 ? "Continue to Payment" : "Complete Order"}
                </Button>
              )}
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
