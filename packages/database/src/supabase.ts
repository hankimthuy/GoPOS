import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          image_url: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          image_url?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          image_url?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          english_name: string | null;
          description: string | null;
          base_price: number;
          price: number;
          image_url: string | null;
          category_id: string;
          is_available: boolean;
          is_hot_option_available: boolean;
          stock_quantity: number | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          english_name?: string | null;
          description?: string | null;
          base_price: number;
          price: number;
          image_url?: string | null;
          category_id: string;
          is_available?: boolean;
          is_hot_option_available?: boolean;
          stock_quantity?: number | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          english_name?: string | null;
          description?: string | null;
          base_price?: number;
          price?: number;
          image_url?: string | null;
          category_id?: string;
          is_available?: boolean;
          is_hot_option_available?: boolean;
          stock_quantity?: number | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      modifier_groups: {
        Row: {
          id: string;
          name: string;
          selection_type: 'single' | 'multiple';
          is_required: boolean;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          selection_type: 'single' | 'multiple';
          is_required?: boolean;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          selection_type?: 'single' | 'multiple';
          is_required?: boolean;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      modifiers: {
        Row: {
          id: string;
          modifier_group_id: string;
          name: string;
          price_change: number;
          is_available: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          modifier_group_id: string;
          name: string;
          price_change?: number;
          is_available?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          modifier_group_id?: string;
          name?: string;
          price_change?: number;
          is_available?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      category_modifier_groups: {
        Row: {
          category_id: string;
          modifier_group_id: string;
          is_required: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          category_id: string;
          modifier_group_id: string;
          is_required?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          category_id?: string;
          modifier_group_id?: string;
          is_required?: boolean;
          sort_order?: number;
          created_at?: string;
        };
      };

      menu_items: {
        Row: {
          id: string;
          name: string;
          english_name: string | null;
          description: string | null;
          base_price: number;
          price: number;
          image_url: string | null;
          category_id: string;
          is_available: boolean;
          is_hot_option_available: boolean;
          stock_quantity: number | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          english_name?: string | null;
          description?: string | null;
          base_price: number;
          price: number;
          image_url?: string | null;
          category_id: string;
          is_available?: boolean;
          is_hot_option_available?: boolean;
          stock_quantity?: number | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          english_name?: string | null;
          description?: string | null;
          base_price?: number;
          price?: number;
          image_url?: string | null;
          category_id?: string;
          is_available?: boolean;
          is_hot_option_available?: boolean;
          stock_quantity?: number | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
