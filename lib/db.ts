import { sql } from "@vercel/postgres"

export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  created_at: string
}

export interface Laptop {
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
  created_at: string
  updated_at: string
}

export interface Order {
  id: number
  user_id: number
  total_amount: number
  status: string
  shipping_address: string
  payment_method: string
  created_at: string
}

// Laptop functions
export async function getAllLaptops(): Promise<Laptop[]> {
  try {
    const { rows } = await sql`SELECT * FROM laptops ORDER BY created_at DESC`
    return rows as Laptop[]
  } catch (error) {
    console.error("Error fetching laptops:", error)
    return []
  }
}

export async function getLaptopById(id: number): Promise<Laptop | null> {
  try {
    const { rows } = await sql`SELECT * FROM laptops WHERE id = ${id}`
    return (rows[0] as Laptop) || null
  } catch (error) {
    console.error("Error fetching laptop:", error)
    return null
  }
}

export async function createLaptop(laptop: Omit<Laptop, "id" | "created_at" | "updated_at">): Promise<Laptop | null> {
  try {
    const { rows } = await sql`
      INSERT INTO laptops (name, brand, price, original_price, images, rating, reviews, badge, specs, in_stock, description)
      VALUES (${laptop.name}, ${laptop.brand}, ${laptop.price}, ${laptop.original_price || null}, 
              ${laptop.images}, ${laptop.rating}, ${laptop.reviews}, ${laptop.badge}, 
              ${laptop.specs}, ${laptop.in_stock}, ${laptop.description || null})
      RETURNING *
    `
    return rows[0] as Laptop
  } catch (error) {
    console.error("Error creating laptop:", error)
    return null
  }
}

export async function updateLaptop(id: number, laptop: Partial<Laptop>): Promise<Laptop | null> {
  try {
    const { rows } = await sql`
      UPDATE laptops 
      SET name = COALESCE(${laptop.name}, name),
          brand = COALESCE(${laptop.brand}, brand),
          price = COALESCE(${laptop.price}, price),
          original_price = COALESCE(${laptop.original_price}, original_price),
          images = COALESCE(${laptop.images || null}, images),
          rating = COALESCE(${laptop.rating}, rating),
          reviews = COALESCE(${laptop.reviews}, reviews),
          badge = COALESCE(${laptop.badge}, badge),
          specs = COALESCE(${laptop.specs || null}, specs),
          in_stock = COALESCE(${laptop.in_stock}, in_stock),
          description = COALESCE(${laptop.description}, description),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `
    return (rows[0] as Laptop) || null
  } catch (error) {
    console.error("Error updating laptop:", error)
    return null
  }
}

export async function deleteLaptop(id: number): Promise<boolean> {
  try {
    await sql`DELETE FROM laptops WHERE id = ${id}`
    return true
  } catch (error) {
    console.error("Error deleting laptop:", error)
    return false
  }
}

// User functions
export async function createUser(user: {
  email: string
  password_hash: string
  first_name: string
  last_name: string
}): Promise<User | null> {
  try {
    const { rows } = await sql`
      INSERT INTO users (email, password_hash, first_name, last_name)
      VALUES (${user.email}, ${user.password_hash}, ${user.first_name}, ${user.last_name})
      RETURNING id, email, first_name, last_name, created_at
    `
    return rows[0] as User
  } catch (error) {
    console.error("Error creating user:", error)
    return null
  }
}

export async function getUserByEmail(email: string): Promise<(User & { password_hash: string }) | null> {
  try {
    const { rows } = await sql`SELECT * FROM users WHERE email = ${email}`
    return (rows[0] as User & { password_hash: string }) || null
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}

// Wishlist functions
export async function getUserWishlist(userId: number): Promise<Laptop[]> {
  try {
    const { rows } = await sql`
      SELECT l.* FROM laptops l
      JOIN wishlist w ON l.id = w.laptop_id
      WHERE w.user_id = ${userId}
      ORDER BY w.created_at DESC
    `
    return rows as Laptop[]
  } catch (error) {
    console.error("Error fetching wishlist:", error)
    return []
  }
}

export async function addToWishlist(userId: number, laptopId: number): Promise<boolean> {
  try {
    await sql`
      INSERT INTO wishlist (user_id, laptop_id)
      VALUES (${userId}, ${laptopId})
      ON CONFLICT (user_id, laptop_id) DO NOTHING
    `
    return true
  } catch (error) {
    console.error("Error adding to wishlist:", error)
    return false
  }
}

export async function removeFromWishlist(userId: number, laptopId: number): Promise<boolean> {
  try {
    await sql`DELETE FROM wishlist WHERE user_id = ${userId} AND laptop_id = ${laptopId}`
    return true
  } catch (error) {
    console.error("Error removing from wishlist:", error)
    return false
  }
}
