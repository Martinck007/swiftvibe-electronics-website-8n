import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function GET() {
  try {
    // Test database connection
    const { rows } = await sql`SELECT NOW() as current_time`

    // Check if tables exist
    const { rows: tables } = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `

    // Count laptops
    const { rows: laptopCount } = await sql`
      SELECT COUNT(*) as count FROM laptops
    `

    return NextResponse.json({
      status: "connected",
      currentTime: rows[0].current_time,
      tables: tables.map((t) => t.table_name),
      laptopCount: laptopCount[0].count,
    })
  } catch (error) {
    console.error("Database connection error:", error)
    return NextResponse.json(
      {
        status: "disconnected",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
