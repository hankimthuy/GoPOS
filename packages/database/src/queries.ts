import { supabase } from './supabase';
import { Category, MenuItem, Product, ModifierGroup, Modifier, CategoryModifierGroup, SelectedModifier } from './types';

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
