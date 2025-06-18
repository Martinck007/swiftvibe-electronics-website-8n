"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, ImageIcon } from "lucide-react"

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void
  currentImage?: string
  className?: string
}

export function ImageUpload({ onImageUpload, currentImage, className }: ImageUploadProps) {
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

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      alert("File size must be less than 5MB")
      return
    }

    setUploading(true)

    try {
      // Convert file to base64 for demo purposes
      // In a real app, you'd upload to a cloud service like Cloudinary, AWS S3, etc.
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onImageUpload(result)
        setUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error("Upload failed:", error)
      alert("Upload failed. Please try again.")
      setUploading(false)
    }
  }

  const removeImage = () => {
    onImageUpload("")
  }

  return (
    <div className={className}>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleChange} className="hidden" />

      {currentImage ? (
        <Card className="relative">
          <CardContent className="p-4">
            <div className="relative">
              <img
                src={currentImage || "/placeholder.svg"}
                alt="Uploaded laptop"
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button variant="destructive" size="icon" className="absolute top-2 right-2" onClick={removeImage}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card
          className={`border-2 border-dashed transition-colors ${
            dragActive ? "border-primary bg-primary/5" : "border-gray-300"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <CardContent className="p-8">
            <div className="text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="mb-4">
                <p className="text-lg font-medium text-gray-900 mb-2">
                  {uploading ? "Uploading..." : "Upload laptop image"}
                </p>
                <p className="text-sm text-gray-600">Drag and drop an image here, or click to select</p>
              </div>
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="bg-primary hover:bg-primary/90"
              >
                <Upload className="mr-2 h-4 w-4" />
                {uploading ? "Uploading..." : "Choose Image"}
              </Button>
              <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 5MB</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
