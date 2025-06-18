"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, ImageIcon, Plus } from "lucide-react"

interface MultiImageUploadProps {
  onImagesUpdate: (images: string[]) => void
  currentImages?: string[]
  maxImages?: number
  className?: string
}

export function MultiImageUpload({
  onImagesUpdate,
  currentImages = [],
  maxImages = 4,
  className,
}: MultiImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = async (files: File[]) => {
    const remainingSlots = maxImages - currentImages.length
    const filesToProcess = files.slice(0, remainingSlots)

    if (filesToProcess.length === 0) {
      alert(`Maximum ${maxImages} images allowed`)
      return
    }

    // Validate file types
    const invalidFiles = filesToProcess.filter((file) => !file.type.startsWith("image/"))
    if (invalidFiles.length > 0) {
      alert("Please upload only image files")
      return
    }

    // Validate file sizes
    const oversizedFiles = filesToProcess.filter((file) => file.size > 5 * 1024 * 1024)
    if (oversizedFiles.length > 0) {
      alert("File size must be less than 5MB")
      return
    }

    setUploading(true)

    try {
      const newImages: string[] = []

      for (const file of filesToProcess) {
        const reader = new FileReader()
        const imageUrl = await new Promise<string>((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string)
          reader.readAsDataURL(file)
        })
        newImages.push(imageUrl)
      }

      onImagesUpdate([...currentImages, ...newImages])
    } catch (error) {
      console.error("Upload failed:", error)
      alert("Upload failed. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index: number) => {
    const updatedImages = currentImages.filter((_, i) => i !== index)
    onImagesUpdate(updatedImages)
  }

  const canAddMore = currentImages.length < maxImages

  return (
    <div className={className}>
      <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleChange} className="hidden" />

      <div className="space-y-4">
        {/* Current Images Grid */}
        {currentImages.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {currentImages.map((image, index) => (
              <Card key={index} className="relative">
                <CardContent className="p-2">
                  <div className="relative">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Laptop image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                    <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      {index + 1}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Upload Area */}
        {canAddMore && (
          <Card
            className={`border-2 border-dashed transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-gray-300"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <CardContent className="p-6">
              <div className="text-center">
                <ImageIcon className="mx-auto h-8 w-8 text-gray-400 mb-3" />
                <div className="mb-3">
                  <p className="font-medium text-gray-900 mb-1">
                    {uploading ? "Uploading..." : `Add ${currentImages.length === 0 ? "laptop images" : "more images"}`}
                  </p>
                  <p className="text-sm text-gray-600">
                    {currentImages.length}/{maxImages} images • Drag and drop or click to select
                  </p>
                </div>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {uploading ? "Uploading..." : "Add Images"}
                </Button>
                <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 5MB each</p>
              </div>
            </CardContent>
          </Card>
        )}

        {!canAddMore && <p className="text-sm text-gray-500 text-center">Maximum {maxImages} images reached</p>}
      </div>
    </div>
  )
}
