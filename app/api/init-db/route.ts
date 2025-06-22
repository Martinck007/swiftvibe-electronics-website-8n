import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST() {
  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          first_name VARCHAR(100) NOT NULL,
          last_name VARCHAR(100) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create laptops table
    await sql`
      CREATE TABLE IF NOT EXISTS laptops (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          brand VARCHAR(100) NOT NULL,
          price VARCHAR(50) NOT NULL,
          original_price VARCHAR(50),
          images TEXT[] DEFAULT '{}',
          rating DECIMAL(2,1) DEFAULT 4.5,
          reviews INTEGER DEFAULT 0,
          badge VARCHAR(50) DEFAULT 'New',
          specs TEXT[] DEFAULT '{}',
          in_stock BOOLEAN DEFAULT true,
          description TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create orders table
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id),
          total_amount DECIMAL(10,2) NOT NULL,
          status VARCHAR(50) DEFAULT 'pending',
          shipping_address TEXT NOT NULL,
          payment_method VARCHAR(50) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create order_items table
    await sql`
      CREATE TABLE IF NOT EXISTS order_items (
          id SERIAL PRIMARY KEY,
          order_id INTEGER REFERENCES orders(id),
          laptop_id INTEGER REFERENCES laptops(id),
          quantity INTEGER NOT NULL,
          price VARCHAR(50) NOT NULL
      )
    `

    // Create wishlist table
    await sql`
      CREATE TABLE IF NOT EXISTS wishlist (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id),
          laptop_id INTEGER REFERENCES laptops(id),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_id, laptop_id)
      )
    `

    // Check if laptops already exist
    const { rows: existingLaptops } = await sql`SELECT COUNT(*) as count FROM laptops`

    if (existingLaptops[0].count === "0") {
      // Insert default laptops
      await sql`
        INSERT INTO laptops (name, brand, price, original_price, images, rating, reviews, badge, specs, in_stock, description) VALUES
        ('MacBook Air M2', 'Apple', 'ZMW 18,500', 'ZMW 20,000', 
         ARRAY['/placeholder.svg?height=300&width=400&text=MacBook+Air+M2'], 
         4.9, 124, 'Best Seller', 
         ARRAY['13.6-inch Display', '8GB RAM', '256GB SSD', 'M2 Chip'], 
         true, 'The new MacBook Air M2 delivers incredible performance and battery life in an ultra-thin design.'),

        ('ThinkPad X1 Carbon', 'Lenovo', 'ZMW 15,200', 'ZMW 16,800', 
         ARRAY['/placeholder.svg?height=300&width=400&text=ThinkPad+X1'], 
         4.7, 89, 'Professional', 
         ARRAY['14-inch Display', '16GB RAM', '512GB SSD', 'Intel i7'], 
         true, 'Premium business laptop with legendary ThinkPad durability and performance.'),

        ('XPS 13 Plus', 'Dell', 'ZMW 16,800', 'ZMW 18,200', 
         ARRAY['/placeholder.svg?height=300&width=400&text=Dell+XPS+13'], 
         4.6, 156, 'Premium', 
         ARRAY['13.4-inch OLED', '16GB RAM', '512GB SSD', 'Intel i7'], 
         true, 'Stunning OLED display and premium design make this Dell XPS a standout choice.'),

        ('Surface Laptop 5', 'Microsoft', 'ZMW 14,500', 'ZMW 15,800', 
         ARRAY['/placeholder.svg?height=300&width=400&text=Surface+Laptop'], 
         4.5, 203, 'Popular', 
         ARRAY['13.5-inch Touch', '8GB RAM', '256GB SSD', 'Intel i5'], 
         true, 'Perfect balance of style, performance, and portability with Windows 11.'),

        ('ZenBook 14', 'ASUS', 'ZMW 12,300', 'ZMW 13,500', 
         ARRAY['/placeholder.svg?height=300&width=400&text=ASUS+ZenBook'], 
         4.4, 178, 'Value', 
         ARRAY['14-inch FHD', '8GB RAM', '512GB SSD', 'AMD Ryzen 7'], 
         true, 'Exceptional value with premium features and all-day battery life.'),

        ('Pavilion 15', 'HP', 'ZMW 9,800', 'ZMW 11,200', 
         ARRAY['/placeholder.svg?height=300&width=400&text=HP+Pavilion'], 
         4.2, 267, 'Budget', 
         ARRAY['15.6-inch FHD', '8GB RAM', '256GB SSD', 'Intel i5'], 
         true, 'Affordable laptop perfect for students and everyday computing needs.')
      `
    }

    return NextResponse.json({
      message: "Database initialized successfully",
      tablesCreated: ["users", "laptops", "orders", "order_items", "wishlist"],
      defaultLaptopsAdded: existingLaptops[0].count === "0",
    })
  } catch (error) {
    console.error("Database initialization error:", error)
    return NextResponse.json({ error: "Failed to initialize database", details: error }, { status: 500 })
  }
}
