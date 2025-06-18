"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Users, Building, Heart, Mail, Phone } from "lucide-react"

interface GetInvolvedModalProps {
  children: React.ReactNode
}

export function GetInvolvedModal({ children }: GetInvolvedModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    involvement: "",
    message: "",
  })
  const [isOpen, setIsOpen] = useState(false)

  const involvementOptions = [
    {
      id: "individual",
      title: "Individual Volunteer",
      icon: Heart,
      description: "Help us collect and sort e-waste in your community",
    },
    {
      id: "business",
      title: "Business Partnership",
      icon: Building,
      description: "Partner with us for corporate e-waste management",
    },
    {
      id: "community",
      title: "Community Leader",
      icon: Users,
      description: "Organize e-waste collection drives in your area",
    },
    {
      id: "educator",
      title: "Environmental Educator",
      icon: Leaf,
      description: "Help spread awareness about e-waste recycling",
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.involvement) {
      alert("Please fill in all required fields")
      return
    }

    // Simulate form submission
    alert(
      `Thank you for your interest in joining our green initiative!\n\nWe've received your application for: ${involvementOptions.find((opt) => opt.id === formData.involvement)?.title}\n\nOur team will contact you within 48 hours at ${formData.email} to discuss next steps.`,
    )

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      organization: "",
      involvement: "",
      message: "",
    })

    setIsOpen(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Leaf className="h-5 w-5 text-green-600" />
            <span>Join Our Green Initiative</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">Make a Difference with Swift-Vibe Electronics</h3>
            <p className="text-sm text-green-800">
              Join our mission to create a sustainable future for Zambia through responsible e-waste management and
              environmental education.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <Input
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="+260 XXX XXX XXX"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organization (Optional)</label>
                <Input
                  placeholder="Company, school, or organization"
                  value={formData.organization}
                  onChange={(e) => handleInputChange("organization", e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How would you like to get involved? *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {involvementOptions.map((option) => (
                  <Card
                    key={option.id}
                    className={`cursor-pointer transition-all ${
                      formData.involvement === option.id ? "ring-2 ring-primary bg-primary/5" : "hover:shadow-md"
                    }`}
                    onClick={() => handleInputChange("involvement", option.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                          <option.icon className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">{option.title}</h4>
                          <p className="text-xs text-gray-600 mt-1">{option.description}</p>
                        </div>
                        <input
                          type="radio"
                          name="involvement"
                          value={option.id}
                          checked={formData.involvement === option.id}
                          onChange={(e) => handleInputChange("involvement", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tell us more about your interest</label>
              <Textarea
                placeholder="Share your ideas, experience, or questions about joining our green initiative..."
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• We'll review your application within 48 hours</li>
                <li>• Our team will contact you to discuss opportunities</li>
                <li>• We'll provide training and resources to get you started</li>
                <li>• Join our community of environmental champions!</li>
              </ul>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                Join the Initiative
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
