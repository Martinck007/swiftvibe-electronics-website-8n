"use client"

import { Leaf, Recycle, Award, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SchedulePickupModal } from "./schedule-pickup-modal"
import { ViewRepairsModal } from "./view-repairs-modal"
import { GetInvolvedModal } from "./get-involved-modal"

export function RecycleSection() {
  const stats = [
    { icon: Recycle, value: "2,500+", label: "Devices Recycled" },
    { icon: Leaf, value: "15 Tons", label: "E-waste Diverted" },
    { icon: Award, value: "98%", label: "Customer Satisfaction" },
    { icon: Users, value: "1,200+", label: "Happy Customers" },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Sustainable Electronics</h2>
          <p className="mt-4 text-lg text-gray-600">
            Leading Zambia's green technology revolution through responsible recycling and refurbishment
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex justify-center mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                    <stat.icon className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* E-waste Collection */}
          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <Recycle className="h-16 w-16 text-white" />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">E-waste Collection</h3>
              <p className="text-gray-600 mb-4">
                We collect old electronics from homes and businesses across Zambia. Free pickup service available for
                bulk collections.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4">
                <li>• Laptops & Portable Computers</li>
                <li>• Laptop Chargers & Adapters</li>
                <li>• Laptop Batteries & Components</li>
                <li>• Laptop Accessories</li>
              </ul>
              <SchedulePickupModal>
                <Button variant="outline" className="w-full">
                  Schedule Pickup
                </Button>
              </SchedulePickupModal>
            </CardContent>
          </Card>

          {/* Refurbishment */}
          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <Award className="h-16 w-16 text-white" />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Repair</h3>
              <p className="text-gray-600 mb-4">
                Our certified technicians repair laptops to like-new condition, extending their lifespan and reducing
                waste.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4">
                <li>• Complete Hardware Testing</li>
                <li>• Software Optimization</li>
                <li>• Quality Assurance</li>
                <li>• 6-Month Warranty</li>
              </ul>
              <ViewRepairsModal>
                <Button variant="outline" className="w-full">
                  View Repairs
                </Button>
              </ViewRepairsModal>
            </CardContent>
          </Card>

          {/* Environmental Impact */}
          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center">
              <Leaf className="h-16 w-16 text-white" />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Environmental Impact</h3>
              <p className="text-gray-600 mb-4">
                Every device we recycle or refurbish helps reduce electronic waste and conserves precious natural
                resources.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4">
                <li>• Reduces Landfill Waste</li>
                <li>• Conserves Raw Materials</li>
                <li>• Prevents Toxic Pollution</li>
                <li>• Supports Circular Economy</li>
              </ul>
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <div className="bg-green-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Green Initiative</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Partner with Swift-Vibe Electronics to create a sustainable future. Together, we can make a difference for
              Zambia's environment.
            </p>
            <GetInvolvedModal>
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Get Involved Today
              </Button>
            </GetInvolvedModal>
          </div>
        </div>
      </div>
    </section>
  )
}
