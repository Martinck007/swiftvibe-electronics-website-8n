"use client"

import { ArrowRight, Laptop, Recycle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-stone-50 to-stone-100">
      <div className="container px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-16">
            <Image
              src="/images/swift-vibe-logo.png"
              alt="Swift-Vibe Electronics"
              width={600}
              height={200}
              className="h-40 sm:h-48 lg:h-56 w-auto mx-auto mb-8"
              priority
            />
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-2">Swift-Vibe Electronics</h2>
              <p className="text-lg sm:text-xl text-secondary font-semibold">Zambia's Premier Technology Destination</p>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Premium Laptops for
            <span className="text-secondary"> Modern Zambia</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
            Discover cutting-edge technology with Swift-Vibe Electronics. From brand new laptops to refurbished gems,
            we're your trusted partner in digital transformation.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/laptops">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-4">
                Shop Laptops
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/swap">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Explore Trade-in
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mx-auto mt-20 max-w-6xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Link href="/laptops" className="group">
              <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-lg transition-all">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Laptop className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg group-hover:text-primary transition-colors">
                      Premium Laptops
                    </h3>
                    <p className="text-sm text-gray-600">Latest models & brands</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/swap" className="group">
              <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-lg transition-all">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                    <RefreshCw className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg group-hover:text-secondary transition-colors">
                      Swap & Top-up
                    </h3>
                    <p className="text-sm text-gray-600">Upgrade seamlessly</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/recycle" className="group">
              <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-lg transition-all">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                    <Recycle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg group-hover:text-green-600 transition-colors">
                      Eco-Friendly
                    </h3>
                    <p className="text-sm text-gray-600">Recycle & repair</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
