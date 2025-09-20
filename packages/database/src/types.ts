export interface Category {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  category_id: string;
  is_available: boolean;
  stock_quantity?: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface OrderItem {
  id: string;
  menu_item_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  special_instructions?: string;
  created_at: string;
  menu_item?: MenuItem;
}

export interface Order {
  id: string;
  order_number: string;
  order_type: 'dine_in' | 'takeaway' | 'delivery';
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  customer_name?: string;
  customer_phone?: string;
  customer_address?: string;
  subtotal: number;
  discount_amount: number;
  tax_amount: number;
  total_amount: number;
  payment_status: 'pending' | 'paid' | 'refunded';
  payment_method?: 'cash' | 'card' | 'digital_wallet';
  notes?: string;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

// OrderSummary interface for UI state management
export interface OrderSummary {
  orderId: string;
  orderType: 'tai-quan' | 'mang-di' | 'giao-hang';
  items: OrderItem[];
  discount: number;
  subtotal: number;
  total: number;
}
