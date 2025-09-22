import { supabase } from './supabase';
import { Category, MenuItem, Product, ModifierGroup, Modifier, CategoryModifierGroup, SelectedModifier, Order, OrderItem, OrderSummary } from './types';

export const categoryQueries = {
  // Lấy tất cả danh mục đang hoạt động
  async getActiveCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories');
    }

    return data || [];
  },

  // Lấy danh mục theo ID
  async getCategoryById(id: string): Promise<Category | null> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching category:', error);
      return null;
    }

    return data;
  }
};

// Queries cho Products (tên mới của MenuItems)
export const productQueries = {
  // Lấy tất cả sản phẩm đang có sẵn
  async getAvailableProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('is_available', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }

    return data || [];
  },

  // Lấy sản phẩm theo danh mục
  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('category_id', categoryId)
      .eq('is_available', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching products by category:', error);
      throw new Error('Failed to fetch products by category');
    }

    return data || [];
  },

  // Lấy sản phẩm theo ID
  async getProductById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return null;
    }

    return data;
  },

  // Tìm kiếm sản phẩm
  async searchProducts(query: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('is_available', true)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error searching products:', error);
      throw new Error('Failed to search products');
    }

    return data || [];
  }
};

// Alias để backward compatibility - tạo object riêng để tránh vấn đề reference
export const menuItemQueries = {
  getAvailableMenuItems: productQueries.getAvailableProducts,
  getMenuItemsByCategory: productQueries.getProductsByCategory,
  getMenuItemById: productQueries.getProductById,
  searchMenuItems: productQueries.searchProducts
};

// Queries cho hệ thống Modifier
export const modifierQueries = {
  // Lấy tất cả nhóm modifier đang hoạt động
  async getActiveModifierGroups(): Promise<ModifierGroup[]> {
    const { data, error } = await supabase
      .from('modifier_groups')
      .select(`
        *,
        modifiers:modifiers(*)
      `)
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching modifier groups:', error);
      throw new Error('Failed to fetch modifier groups');
    }

    return data || [];
  },

  // Lấy các nhóm modifier cho một danh mục cụ thể
  async getModifierGroupsByCategory(categoryId: string): Promise<CategoryModifierGroup[]> {
    const { data, error } = await supabase
      .from('category_modifier_groups')
      .select(`
        *,
        modifier_group:modifier_groups(
          *,
          modifiers:modifiers(*)
        )
      `)
      .eq('category_id', categoryId)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching modifier groups by category:', error);
      throw new Error('Failed to fetch modifier groups by category');
    }

    return data || [];
  },

  // Lấy tất cả modifier của một nhóm
  async getModifiersByGroup(modifierGroupId: string): Promise<Modifier[]> {
    const { data, error } = await supabase
      .from('modifiers')
      .select('*')
      .eq('modifier_group_id', modifierGroupId)
      .eq('is_available', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching modifiers by group:', error);
      throw new Error('Failed to fetch modifiers by group');
    }

    return data || [];
  },

  // Tính giá cuối cùng của sản phẩm với modifiers
  async calculateProductPrice(productId: string, modifierIds: string[]): Promise<number> {
    const { data, error } = await supabase
      .rpc('calculate_product_price', {
        product_id: productId,
        modifier_ids: modifierIds
      });

    if (error) {
      console.error('Error calculating product price:', error);
      throw new Error('Failed to calculate product price');
    }

    return data || 0;
  }
};

// Queries cho Orders
export const orderQueries = {
  // Tạo Hóa đơn mới
  async createOrder(orderSummary: OrderSummary): Promise<Order> {
    // Map orderType từ OrderSummary sang database format
    const orderTypeMap = {
      'tai-quan': 'dine_in',
      'mang-di': 'takeaway', 
      'giao-hang': 'delivery'
    } as const;

    // Tạo order number
    const orderNumber = `ORD${Date.now()}`;

    // Tạo order record
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        order_type: orderTypeMap[orderSummary.orderType],
        status: 'completed', // Đã hoàn thành vì đã thanh toán
        subtotal: orderSummary.subtotal,
        discount_amount: orderSummary.discount,
        tax_amount: 0, // Chưa có thuế
        total_amount: orderSummary.total,
        payment_status: 'paid',
        payment_method: 'cash',
        notes: 'Thanh toán tiền mặt'
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      throw new Error('Failed to create order');
    }

    // Tạo order items
    if (orderSummary.items.length > 0) {
      const orderItems = orderSummary.items.map(item => ({
        order_id: orderData.id,
        menu_item_id: item.menu_item_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.total_price,
        special_instructions: item.special_instructions || null
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Error creating order items:', itemsError);
        // Rollback order creation
        await supabase.from('orders').delete().eq('id', orderData.id);
        throw new Error('Failed to create order items');
      }
    }

    return orderData;
  },

  // Lấy Hóa đơn theo ID
  async getOrderById(id: string): Promise<Order | null> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items:order_items(
          *,
          menu_item:menu_items(*)
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching order:', error);
      return null;
    }

    return data;
  },

  // Lấy tất cả hóa đơn 
  async getAllOrders(): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items:order_items(
          *,
          menu_item:menu_items(*)
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      throw new Error('Failed to fetch orders');
    }

    return data || [];
  },

  // Cập nhật trạng thái hóa đơn 
  async updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating order status:', error);
      throw new Error('Failed to update order status');
    }

    return data;
  },

  // Cập nhật trạng thái thanh toán
  async updatePaymentStatus(id: string, paymentStatus: Order['payment_status'], paymentMethod?: Order['payment_method']): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .update({ 
        payment_status: paymentStatus,
        payment_method: paymentMethod,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating payment status:', error);
      throw new Error('Failed to update payment status');
    }

    return data;
  }
};
