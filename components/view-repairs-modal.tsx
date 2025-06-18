"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wrench, Clock, CheckCircle, AlertCircle, Package } from "lucide-react"

interface ViewRepairsModalProps {
  children: React.ReactNode
}

export function ViewRepairsModal({ children }: ViewRepairsModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const repairServices = [
    {
      id: 1,
      category: "Screen Repairs",
      icon: Package,
      services: [
        { name: "LCD Screen Replacement", price: "ZMW 300 - 600", time: "2-3 days", difficulty: "Medium" },
        { name: "Touch Screen Repair", price: "ZMW 400 - 800", time: "3-4 days", difficulty: "High" },
        { name: "Screen Hinge Repair", price: "ZMW 150 - 300", time: "1-2 days", difficulty: "Low" },
      ],
    },
    {
      id: 2,
      category: "Hardware Repairs",
      icon: Wrench,
      services: [
        { name: "Keyboard Replacement", price: "ZMW 150 - 300", time: "1-2 days", difficulty: "Low" },
        { name: "Battery Replacement", price: "ZMW 200 - 400", time: "1 day", difficulty: "Low" },
        { name: "Hard Drive Replacement", price: "ZMW 250 - 500", time: "1-2 days", difficulty: "Medium" },
        { name: "RAM Upgrade", price: "ZMW 300 - 600", time: "1 day", difficulty: "Low" },
        { name: "Motherboard Repair", price: "ZMW 500 - 1200", time: "5-7 days", difficulty: "High" },
      ],
    },
    {
      id: 3,
      category: "Software Services",
      icon: CheckCircle,
      services: [
        { name: "OS Installation", price: "ZMW 100 - 150", time: "2-4 hours", difficulty: "Low" },
        { name: "Virus Removal", price: "ZMW 100 - 200", time: "2-6 hours", difficulty: "Medium" },
        { name: "Data Recovery", price: "ZMW 200 - 600", time: "2-5 days", difficulty: "High" },
        { name: "System Optimization", price: "ZMW 80 - 120", time: "1-2 hours", difficulty: "Low" },
      ],
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Low":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "High":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleBookRepair = (serviceName: string) => {
    alert(
      `Booking repair for: ${serviceName}\n\nPlease call +260 775523495 or visit our store to schedule your repair appointment.`,
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Wrench className="h-5 w-5 text-primary" />
            <span>Our Repair Services</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900">Free Diagnostics</h3>
                <p className="text-sm text-blue-800">
                  We provide free diagnostic assessment for all laptops. Bring your device to our store for a complete
                  evaluation.
                </p>
              </div>
            </div>
          </div>

          {repairServices.map((category) => (
            <Card key={category.id} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.category}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.services.map((service, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">{service.name}</h4>
                        <Badge className={getDifficultyColor(service.difficulty)}>{service.difficulty}</Badge>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span className="font-medium">Price:</span>
                          <span className="text-secondary font-semibold">{service.price}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{service.time}</span>
                        </div>
                      </div>

                      <Button size="sm" className="w-full" onClick={() => handleBookRepair(service.name)}>
                        Book This Repair
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">Our Repair Guarantee</h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• 90-day warranty on all repairs</li>
              <li>• Certified technicians with 5+ years experience</li>
              <li>• Genuine parts when available, quality alternatives otherwise</li>
              <li>• Free pickup and delivery for repairs over ZMW 500</li>
            </ul>
          </div>

          <div className="flex justify-center space-x-4">
            <Button className="bg-primary hover:bg-primary/90">Visit Our Store</Button>
            <Button variant="outline">Call +260 775523495</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
