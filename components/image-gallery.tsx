"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface ImageGalleryProps {
  images: string[]
  alt: string
  className?: string
}

export function ImageGallery({ images, alt, className }: ImageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openGallery = (index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (!images || images.length === 0) {
    return <img src="/placeholder.svg?height=300&width=400" alt={alt} className={className} />
  }

  return (
    <>
      {/* Main Image */}
      <div className="relative cursor-pointer" onClick={() => openGallery(0)}>
        <img src={images[0] || "/placeholder.svg"} alt={alt} className={className} />
        {images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
            +{images.length - 1} more
          </div>
        )}
      </div>

      {/* Thumbnail Strip for Multiple Images */}
      {images.length > 1 && (
        <div className="flex space-x-2 mt-2">
          {images.slice(0, 4).map((image, index) => (
            <img
              key={index}
              src={image || "/placeholder.svg"}
              alt={`${alt} ${index + 1}`}
              className="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-75 transition-opacity"
              onClick={() => openGallery(index)}
            />
          ))}
          {images.length > 4 && (
            <div
              className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
              onClick={() => openGallery(4)}
            >
              <span className="text-xs text-gray-600">+{images.length - 4}</span>
            </div>
          )}
        </div>
      )}

      {/* Full Screen Gallery Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="relative">
              <img
                src={images[currentIndex] || "/placeholder.svg"}
                alt={`${alt} ${currentIndex + 1}`}
                className="w-full h-auto max-h-[80vh] object-contain"
              />

              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded text-sm">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="flex justify-center space-x-2 p-4 bg-gray-100">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`${alt} ${index + 1}`}
                    className={`w-12 h-12 object-cover rounded cursor-pointer transition-all ${
                      index === currentIndex ? "ring-2 ring-primary" : "opacity-60 hover:opacity-100"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
