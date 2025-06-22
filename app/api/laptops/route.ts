import { type NextRequest, NextResponse } from "next/server"
import { getAllLaptops, createLaptop } from "@/lib/db"

export async function GET() {
  try {
    const laptops = await getAllLaptops()
    return NextResponse.json(laptops)
  } catch (error) {
    console.error("Error in GET /api/laptops:", error)
    return NextResponse.json({ error: "Failed to fetch laptops" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.brand || !body.price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const laptop = await createLaptop({
      name: body.name,
      brand: body.brand,
      price: body.price,
      original_price: body.original_price,
      images: body.images || ["/placeholder.svg?height=300&width=400"],
      rating: body.rating || 4.5,
      reviews: body.reviews || 0,
      badge: body.badge || "New",
      specs: body.specs || [],
      in_stock: body.in_stock !== false,
      description: body.description,
    })

    if (!laptop) {
      return NextResponse.json({ error: "Failed to create laptop" }, { status: 500 })
    }

    return NextResponse.json(laptop, { status: 201 })
  } catch (error) {
    console.error("Error in POST /api/laptops:", error)
    return NextResponse.json({ error: "Failed to create laptop" }, { status: 500 })
  }
}
