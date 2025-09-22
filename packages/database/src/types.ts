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

export interface Product {
  id: string;
  name: string;
  english_name?: string;
  description?: string;
  base_price: number;
  price: number;
  image_url?: string;
  category_id: string;
  is_available: boolean;
  is_hot_option_available: boolean;
  stock_quantity?: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface MenuItem extends Product {}

export interface ModifierGroup {
  id: string;
  name: string;
  selection_type: 'single' | 'multiple';
  is_required: boolean;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  modifiers?: Modifier[];
}

export interface Modifier {
  id: string;
  modifier_group_id: string;
  name: string;
  price_change: number;
  is_available: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  modifier_group?: ModifierGroup;
}

export interface CategoryModifierGroup {
  category_id: string;
  modifier_group_id: string;
  is_required: boolean;
  sort_order: number;
  created_at: string;
  category?: Category;
  modifier_group?: ModifierGroup;
}

export interface SelectedModifier {
  modifier_id: string;
  modifier_name: string;
  price_change: number;
  modifier_group_id: string;
  modifier_group_name: string;
}

export interface OrderItem {
  id: string;
  menu_item_id: string;
  product_id?: string; 
  quantity: number;
  unit_price: number;
  total_price: number;
  special_instructions?: string;
  selected_modifiers?: SelectedModifier[]; 
  created_at: string;
  menu_item?: MenuItem;
  product?: Product; 
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

export interface OrderSummary {
  orderId: string | null;
  orderType: 'tai-quan' | 'mang-di' | 'giao-hang';
  items: OrderItem[];
  discount: number;
  subtotal: number;
  total: number;
}
