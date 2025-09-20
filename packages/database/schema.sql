-- GoPOS Database Schema
-- This file contains the SQL schema for the GoPOS application

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menu items table
CREATE TABLE menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    is_available BOOLEAN DEFAULT true,
    stock_quantity INTEGER,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(20) UNIQUE NOT NULL,
    order_type VARCHAR(20) NOT NULL CHECK (order_type IN ('dine_in', 'takeaway', 'delivery')),
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'preparing', 'ready', 'completed', 'cancelled')),
    customer_name VARCHAR(100),
    customer_phone VARCHAR(20),
    customer_address TEXT,
    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
    discount_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    payment_status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
    payment_method VARCHAR(20) CHECK (payment_method IN ('cash', 'card', 'digital_wallet')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id UUID NOT NULL REFERENCES menu_items(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    special_instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_categories_active ON categories(is_active);
CREATE INDEX idx_categories_sort ON categories(sort_order);
CREATE INDEX idx_menu_items_category ON menu_items(category_id);
CREATE INDEX idx_menu_items_available ON menu_items(is_available);
CREATE INDEX idx_menu_items_sort ON menu_items(sort_order);
CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at);
CREATE INDEX idx_order_items_order ON order_items(order_id);

-- Insert sample data
INSERT INTO categories (name, description, sort_order) VALUES
('Cà phê', 'Các loại cà phê truyền thống và hiện đại', 1),
('Trà sữa', 'Trà sữa các vị và topping', 2),
('Matcha', 'Các món từ matcha nguyên chất', 3),
('Nước ép', 'Nước ép trái cây tươi', 4),
('Bánh ngọt', 'Bánh kem và bánh ngọt', 5);

-- Insert sample menu items
INSERT INTO menu_items (name, description, price, category_id, stock_quantity, sort_order) VALUES
-- Cà phê
('Cà phê đen', 'Cà phê đen truyền thống', 25000, (SELECT id FROM categories WHERE name = 'Cà phê'), 50, 1),
('Cà phê sữa', 'Cà phê sữa đá', 30000, (SELECT id FROM categories WHERE name = 'Cà phê'), 50, 2),
('Cappuccino', 'Cappuccino Ý', 45000, (SELECT id FROM categories WHERE name = 'Cà phê'), 30, 3),
('Latte', 'Cà phê latte', 50000, (SELECT id FROM categories WHERE name = 'Cà phê'), 30, 4),

-- Trà sữa
('Trà sữa trân châu', 'Trà sữa với trân châu đen', 35000, (SELECT id FROM categories WHERE name = 'Trà sữa'), 40, 1),
('Trà sữa thái', 'Trà sữa thái đặc biệt', 40000, (SELECT id FROM categories WHERE name = 'Trà sữa'), 40, 2),
('Trà sữa matcha', 'Trà sữa vị matcha', 45000, (SELECT id FROM categories WHERE name = 'Trà sữa'), 35, 3),

-- Matcha
('Matcha Latte', 'Matcha latte nguyên chất', 50000, (SELECT id FROM categories WHERE name = 'Matcha'), 25, 1),
('Matcha Frappuccino', 'Matcha đá xay', 55000, (SELECT id FROM categories WHERE name = 'Matcha'), 25, 2),
('Matcha Smoothie', 'Sinh tố matcha', 48000, (SELECT id FROM categories WHERE name = 'Matcha'), 20, 3),

-- Nước ép
('Nước cam', 'Nước cam tươi', 30000, (SELECT id FROM categories WHERE name = 'Nước ép'), 20, 1),
('Nước táo', 'Nước táo tươi', 35000, (SELECT id FROM categories WHERE name = 'Nước ép'), 20, 2),
('Nước dưa hấu', 'Nước dưa hấu tươi', 25000, (SELECT id FROM categories WHERE name = 'Nước ép'), 15, 3),

-- Bánh ngọt
('Bánh kem sô cô la', 'Bánh kem sô cô la', 65000, (SELECT id FROM categories WHERE name = 'Bánh ngọt'), 10, 1),
('Bánh kem dâu', 'Bánh kem dâu tươi', 60000, (SELECT id FROM categories WHERE name = 'Bánh ngọt'), 10, 2),
('Bánh kem matcha', 'Bánh kem vị matcha', 70000, (SELECT id FROM categories WHERE name = 'Bánh ngọt'), 8, 3);
