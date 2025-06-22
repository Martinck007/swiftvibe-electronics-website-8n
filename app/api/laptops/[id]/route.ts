import { type NextRequest, NextResponse } from "next/server"
import { getLaptopById, updateLaptop, deleteLaptop } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const laptop = await getLaptopById(id)

    if (!laptop) {
      return NextResponse.json({ error: "Laptop not found" }, { status: 404 })
    }

    return NextResponse.json(laptop)
  } catch (error) {
    console.error("Error in GET /api/laptops/[id]:", error)
    return NextResponse.json({ error: "Failed to fetch laptop" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()

    const laptop = await updateLaptop(id, body)

    if (!laptop) {
      return NextResponse.json({ error: "Failed to update laptop" }, { status: 500 })
    }

    return NextResponse.json(laptop)
  } catch (error) {
    console.error("Error in PUT /api/laptops/[id]:", error)
    return NextResponse.json({ error: "Failed to update laptop" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const success = await deleteLaptop(id)

    if (!success) {
      return NextResponse.json({ error: "Failed to delete laptop" }, { status: 500 })
    }

    return NextResponse.json({ message: "Laptop deleted successfully" })
  } catch (error) {
    console.error("Error in DELETE /api/laptops/[id]:", error)
    return NextResponse.json({ error: "Failed to delete laptop" }, { status: 500 })
  }
}
