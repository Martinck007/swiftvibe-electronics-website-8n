"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function PromotionalBanner() {
  return (
    <div className="bg-gradient-to-r from-yellow-100 to-orange-100 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Sale text */}
          <div className="space-y-6">
            <div>
              <h2 className="text-6xl md:text-8xl font-bold text-secondary mb-2">Sale</h2>
              <div className="flex items-baseline">
                <span className="text-6xl md:text-8xl font-bold text-secondary">ZMW</span>
                <span className="text-8xl md:text-9xl font-bold text-secondary ml-2">3000</span>
              </div>
              <p className="text-lg text-gray-700 mt-4">off select laptops</p>
            </div>
            <div className="space-y-3">
              <p className="text-gray-600">Limited time offer on premium laptops</p>
              <Link href="/laptops">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Shop Sale Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side - Product images */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="MacBook Pro"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-900">MacBook Pro M2</h3>
                  <p className="text-secondary font-bold">ZMW 15,500</p>
                  <p className="text-sm text-gray-500 line-through">ZMW 18,500</p>
                </div>
              </div>
            </div>
            <div className="space-y-6 mt-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="Dell XPS"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-900">Dell XPS 13</h3>
                  <p className="text-secondary font-bold">ZMW 13,900</p>
                  <p className="text-sm text-gray-500 line-through">ZMW 16,900</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
