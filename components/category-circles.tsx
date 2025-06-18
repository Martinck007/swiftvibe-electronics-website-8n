"use client"

import type React from "react"

import Link from "next/link"
import { Laptop, Monitor, Smartphone, Tablet } from "lucide-react"

interface CategoryItem {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  color: string
}

const categories: CategoryItem[] = [
  {
    id: "gaming",
    name: "Gaming Laptops",
    icon: Laptop,
    href: "/laptops?category=gaming",
    color: "bg-purple-100",
  },
  {
    id: "2in1",
    name: "2-in-1 Laptops",
    icon: Tablet,
    href: "/laptops?category=2in1",
    color: "bg-blue-100",
  },
  {
    id: "chromebook",
    name: "Chromebook Laptops",
    icon: Monitor,
    href: "/laptops?category=chromebook",
    color: "bg-green-100",
  },
  {
    id: "windows",
    name: "Windows Laptops",
    icon: Smartphone,
    href: "/laptops?category=windows",
    color: "bg-orange-100",
  },
]

export function CategoryCircles() {
  return (
    <div className="py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
        {categories.map((category) => (
          <Link key={category.id} href={category.href} className="group">
            <div className="flex flex-col items-center space-y-4">
              <div
                className={`w-32 h-32 rounded-full ${category.color} flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-lg`}
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                  <category.icon className="h-10 w-10 text-gray-700" />
                </div>
              </div>
              <h3 className="text-center font-medium text-gray-900 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
