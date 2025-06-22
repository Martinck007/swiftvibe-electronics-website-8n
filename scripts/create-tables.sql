-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create laptops table
CREATE TABLE IF NOT EXISTS laptops (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  price VARCHAR(50) NOT NULL,
  original_price VARCHAR(50),
  images TEXT[], -- Array of image URLs
  rating DECIMAL(2,1) DEFAULT 4.5,
  reviews INTEGER DEFAULT 0,
  badge VARCHAR(50) DEFAULT 'New',
  specs TEXT[], -- Array of specifications
  in_stock BOOLEAN DEFAULT true,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  shipping_address TEXT NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  laptop_id INTEGER REFERENCES laptops(id),
  quantity INTEGER NOT NULL,
  price VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create wishlist table
CREATE TABLE IF NOT EXISTS wishlist (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  laptop_id INTEGER REFERENCES laptops(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, laptop_id)
);

-- Insert default laptops
INSERT INTO laptops (name, brand, price, original_price, images, rating, reviews, badge, specs, in_stock, description) VALUES
('MacBook Air M2', 'Apple', 'ZMW 18,500', 'ZMW 20,000', ARRAY['/placeholder.svg?height=300&width=400'], 4.9, 124, 'Best Seller', ARRAY['13.6-inch Display', '8GB RAM', '256GB SSD', 'M2 Chip'], true, 'The MacBook Air M2 represents the perfect blend of performance, portability, and style.'),
('ThinkPad X1 Carbon', 'Lenovo', 'ZMW 15,200', 'ZMW 16,800', ARRAY['/placeholder.svg?height=300&width=400'], 4.7, 89, 'Professional', ARRAY['14-inch Display', '16GB RAM', '512GB SSD', 'Intel i7'], true, 'Professional-grade laptop designed for business users.'),
('XPS 13 Plus', 'Dell', 'ZMW 16,900', 'ZMW 18,500', ARRAY['/placeholder.svg?height=300&width=400'], 4.8, 156, 'Premium', ARRAY['13.4-inch Display', '16GB RAM', '1TB SSD'], true, 'Premium ultrabook with cutting-edge design.'),
('Surface Laptop 5', 'Microsoft', 'ZMW 14,300', 'ZMW 15,800', ARRAY['/placeholder.svg?height=300&width=400'], 4.6, 73, 'Refurbished', ARRAY['13.5-inch Display', '8GB RAM', '256GB SSD'], true, 'Refurbished Microsoft Surface Laptop in excellent condition.')
ON CONFLICT DO NOTHING;
