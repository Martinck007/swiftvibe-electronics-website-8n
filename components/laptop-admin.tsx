"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MultiImageUpload } from "./multi-image-upload"
import { ImageGallery } from "./image-gallery"
import { Plus, Edit, Trash2, Save, X, Star, Loader2 } from "lucide-react"

interface Laptop {
  id: number
  name: string
  brand: string
  price: string
  original_price?: string
  images: string[]
  rating: number
  reviews: number
  badge: string
  specs: string[]
  in_stock: boolean
  description?: string
}

interface LaptopAdminProps {
  laptops: Laptop[]
  onLaptopsUpdate: (laptops: Laptop[]) => void
}

export function LaptopAdmin({ laptops, onLaptopsUpdate }: LaptopAdminProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [editingLaptop, setEditingLaptop] = useState<Laptop | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<Laptop>>({
    name: "",
    brand: "",
    price: "",
    original_price: "",
    images: [],
    rating: 4.5,
    reviews: 0,
    badge: "New",
    specs: [],
    in_stock: true,
    description: "",
  })

  const brands = ["Apple", "Dell", "HP", "Lenovo", "Microsoft", "Asus", "Acer", "Other"]
  const badges = ["New", "Best Seller", "Premium", "Refurbished", "Sale", "Professional"]

  const handleInputChange = (field: keyof Laptop, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSpecsChange = (specs: string) => {
    const specsArray = specs.split("\n").filter((spec) => spec.trim() !== "")
    setFormData((prev) => ({ ...prev, specs: specsArray }))
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.brand || !formData.price) {
      alert("Please fill in all required fields")
      return
    }

    setLoading(true)

    try {
      const laptopData = {
        name: formData.name!,
        brand: formData.brand!,
        price: formData.price!,
        original_price: formData.original_price || null,
        images:
          formData.images && formData.images.length > 0 ? formData.images : ["/placeholder.svg?height=300&width=400"],
        rating: formData.rating || 4.5,
        reviews: formData.reviews || 0,
        badge: formData.badge || "New",
        specs: formData.specs || [],
        in_stock: formData.in_stock !== false,
        description: formData.description || null,
      }

      let response
      if (editingLaptop) {
        // Update existing laptop
        response = await fetch(`/api/laptops/${editingLaptop.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(laptopData),
        })
      } else {
        // Create new laptop
        response = await fetch("/api/laptops", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(laptopData),
        })
      }

      if (!response.ok) {
        throw new Error("Failed to save laptop")
      }

      // Refresh laptops list
      const laptopsResponse = await fetch("/api/laptops")
      const updatedLaptops = await laptopsResponse.json()
      onLaptopsUpdate(updatedLaptops)

      alert(editingLaptop ? "Laptop updated successfully!" : "Laptop added successfully!")
      resetForm()
      setIsOpen(false)
    } catch (error) {
      console.error("Error saving laptop:", error)
      alert("Failed to save laptop. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (laptop: Laptop) => {
    setEditingLaptop(laptop)
    setFormData({
      ...laptop,
      specs: laptop.specs || [],
    })
    setIsOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this laptop?")) {
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`/api/laptops/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete laptop")
      }

      // Refresh laptops list
      const laptopsResponse = await fetch("/api/laptops")
      const updatedLaptops = await laptopsResponse.json()
      onLaptopsUpdate(updatedLaptops)

      alert("Laptop deleted successfully!")
    } catch (error) {
      console.error("Error deleting laptop:", error)
      alert("Failed to delete laptop. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setEditingLaptop(null)
    setFormData({
      name: "",
      brand: "",
      price: "",
      original_price: "",
      images: [],
      rating: 4.5,
      reviews: 0,
      badge: "New",
      specs: [],
      in_stock: true,
      description: "",
    })
  }

  const handleClose = () => {
    resetForm()
    setIsOpen(false)
  }

  const getPrimaryImage = (laptop: Laptop) => {
    if (laptop.images && laptop.images.length > 0) {
      return laptop.images[0]
    }
    return "/placeholder.svg?height=300&width=400"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Manage Laptops ({laptops.length})</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90" disabled={loading}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Laptop
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingLaptop ? "Edit Laptop" : "Add New Laptop"}</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Multiple Images Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Laptop Images (Up to 4 photos)</label>
                <MultiImageUpload
                  currentImages={formData.images || []}
                  onImagesUpdate={(images) => handleInputChange("images", images)}
                  maxImages={4}
                />
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Laptop Name *</label>
                  <Input
                    placeholder="e.g., MacBook Air M2"
                    value={formData.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand *</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={formData.brand || ""}
                    onChange={(e) => handleInputChange("brand", e.target.value)}
                  >
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                  <Input
                    placeholder="ZMW 15,000"
                    value={formData.price || ""}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (Optional)</label>
                  <Input
                    placeholder="ZMW 18,000"
                    value={formData.original_price || ""}
                    onChange={(e) => handleInputChange("original_price", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={formData.badge || "New"}
                    onChange={(e) => handleInputChange("badge", e.target.value)}
                  >
                    {badges.map((badge) => (
                      <option key={badge} value={badge}>
                        {badge}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData.rating || 4.5}
                    onChange={(e) => handleInputChange("rating", Number.parseFloat(e.target.value))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reviews Count</label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.reviews || 0}
                    onChange={(e) => handleInputChange("reviews", Number.parseInt(e.target.value))}
                  />
                </div>
              </div>

              {/* Specifications */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specifications (one per line) *</label>
                <Textarea
                  placeholder="13.6-inch Display&#10;8GB RAM&#10;256GB SSD&#10;M2 Chip"
                  value={formData.specs?.join("\n") || ""}
                  onChange={(e) => handleSpecsChange(e.target.value)}
                  className="min-h-[100px]"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter each specification on a new line (e.g., "13.6-inch Display", "8GB RAM", etc.)
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                <Textarea
                  placeholder="Additional details about this laptop..."
                  value={formData.description || ""}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={formData.in_stock !== false}
                  onChange={(e) => handleInputChange("in_stock", e.target.checked)}
                />
                <label htmlFor="inStock" className="text-sm font-medium text-gray-700">
                  In Stock
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <Button onClick={handleSubmit} className="flex-1 bg-primary hover:bg-primary/90" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  {editingLaptop ? "Update Laptop" : "Add Laptop"}
                </Button>
                <Button variant="outline" onClick={handleClose} disabled={loading}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Laptops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {laptops.map((laptop) => (
          <Card key={laptop.id} className="overflow-hidden">
            <div className="relative">
              <ImageGallery
                images={laptop.images || [getPrimaryImage(laptop)]}
                alt={laptop.name}
                className="w-full h-48 object-cover"
              />
              <Badge className="absolute top-2 left-2">{laptop.badge}</Badge>
              {laptop.images && laptop.images.length > 1 && (
                <Badge className="absolute top-2 right-2 bg-blue-500">+{laptop.images.length - 1} more</Badge>
              )}
              {!laptop.in_stock && <Badge className="absolute bottom-2 right-2 bg-red-500">Out of Stock</Badge>}
            </div>
            <CardContent className="p-4">
              <div className="mb-2">
                <p className="text-sm text-gray-500">{laptop.brand}</p>
                <h3 className="font-semibold text-gray-900">{laptop.name}</h3>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-sm text-gray-600">{laptop.rating}</span>
                <span className="ml-1 text-sm text-gray-500">({laptop.reviews})</span>
              </div>

              {/* Specifications */}
              {laptop.specs && laptop.specs.length > 0 && (
                <div className="mb-3">
                  <ul className="text-xs text-gray-600 space-y-1">
                    {laptop.specs.slice(0, 3).map((spec, index) => (
                      <li key={index}>• {spec}</li>
                    ))}
                    {laptop.specs.length > 3 && (
                      <li className="text-gray-500">• +{laptop.specs.length - 3} more specs</li>
                    )}
                  </ul>
                </div>
              )}

              {/* Price */}
              <div className="mb-3">
                <span className="text-lg font-bold text-primary">{laptop.price}</span>
                {laptop.original_price && (
                  <span className="ml-2 text-sm text-gray-500 line-through">{laptop.original_price}</span>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(laptop)}
                  className="flex-1"
                  disabled={loading}
                >
                  <Edit className="mr-1 h-3 w-3" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(laptop.id)} disabled={loading}>
                  {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {laptops.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No laptops added yet. Click "Add New Laptop" to get started.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
