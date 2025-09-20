import { supabase } from './supabase';
import { Category, MenuItem } from './types';

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

export const menuItemQueries = {
  // Lấy tất cả món ăn đang có sẵn
  async getAvailableMenuItems(): Promise<MenuItem[]> {
    const { data, error } = await supabase
      .from('menu_items')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('is_available', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching menu items:', error);
      throw new Error('Failed to fetch menu items');
    }

    return data || [];
  },

  // Lấy món ăn theo danh mục
  async getMenuItemsByCategory(categoryId: string): Promise<MenuItem[]> {
    const { data, error } = await supabase
      .from('menu_items')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('category_id', categoryId)
      .eq('is_available', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching menu items by category:', error);
      throw new Error('Failed to fetch menu items by category');
    }

    return data || [];
  },

  // Lấy món ăn theo ID
  async getMenuItemById(id: string): Promise<MenuItem | null> {
    const { data, error } = await supabase
      .from('menu_items')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching menu item:', error);
      return null;
    }

    return data;
  },

  // Tìm kiếm món ăn
  async searchMenuItems(query: string): Promise<MenuItem[]> {
    const { data, error } = await supabase
      .from('menu_items')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('is_available', true)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error searching menu items:', error);
      throw new Error('Failed to search menu items');
    }

    return data || [];
  }
};
