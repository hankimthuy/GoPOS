"use client";

import { CreditCard, Home, Settings, ShoppingBag, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Category, MenuItem, OrderSummary } from "@go-pos/database";
import { formatPrice } from "@go-pos/shared";
import { categoryQueries, menuItemQueries } from "@go-pos/database";
import Sidebar from "./Sidebar";
import Header from "./Header";
import CategoryNav from "../menu/CategoryNav";
import MenuGrid from "../menu/MenuGrid";
import OrderSummaryComponent from "../order/OrderSummary";

const navigationIcons = [
  { icon: Home, isActive: false, label: "Trang chủ" },
  { icon: User, isActive: true, label: "Người dùng" },
  { icon: ShoppingBag, isActive: false, label: "Sản phẩm" },
  { icon: CreditCard, isActive: false, label: "Thanh toán" },
  { icon: Settings, isActive: false, label: "Cài đặt" },
];

// Initial data will be loaded from Supabase

const initialOrder: OrderSummary = {
  orderId: "34562",
  orderType: "tai-quan",
  items: [
    {
      id: "1",
      menu_item_id: "1",
      quantity: 2,
      unit_price: 45000,
      total_price: 90000,
      special_instructions: "Size M, Đá ít",
      created_at: new Date().toISOString(),
    },
    {
      id: "2", 
      menu_item_id: "2",
      quantity: 1,
      unit_price: 55000,
      total_price: 55000,
      special_instructions: "Size L",
      created_at: new Date().toISOString(),
    },
  ],
  discount: 0,
  subtotal: 145000,
  total: 145000,
};

interface CategoryWithActive extends Category {
  active: boolean;
}

export default function MainLayout() {
  const [categories, setCategories] = useState<CategoryWithActive[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState<MenuItem[]>([]);
  const [order, setOrder] = useState<OrderSummary>(initialOrder);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data from Supabase on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Load categories and menu items in parallel
        const [categoriesData, menuItemsData] = await Promise.all([
          categoryQueries.getActiveCategories(),
          menuItemQueries.getAvailableMenuItems()
        ]);
        
        setCategories(categoriesData.map(cat => ({ ...cat, active: false })));
        setMenuItems(menuItemsData);
        setFilteredMenuItems(menuItemsData);
        
        // Set first category as active
        if (categoriesData.length > 0) {
          setCategories(prev => 
            prev.map((cat, index) => ({ ...cat, active: index === 0 }))
          );
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Không thể tải dữ liệu. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    setCategories(prev => 
      prev.map(cat => ({
        ...cat,
        active: cat.id === categoryId
      }))
    );
    
    // Filter menu items by category
    if (categoryId === 'all') {
      setFilteredMenuItems(menuItems);
    } else {
      const filtered = menuItems.filter(item => item.category_id === categoryId);
      setFilteredMenuItems(filtered);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredMenuItems(menuItems);
      return;
    }
    
    try {
      const searchResults = await menuItemQueries.searchMenuItems(query);
      setFilteredMenuItems(searchResults);
    } catch (err) {
      console.error('Error searching menu items:', err);
      setError('Không thể tìm kiếm. Vui lòng thử lại.');
    }
  };

  const handleMenuItemClick = (item: MenuItem) => {
    // TODO: Implement add to order functionality
    console.log("Add to order:", item);
  };

  const handleOrderTypeChange = (type: 'tai-quan' | 'mang-di' | 'giao-hang') => {
    setOrder(prev => ({ ...prev, orderType: type }));
  };

  const handleItemQuantityChange = (itemId: string, quantity: number) => {
    setOrder(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === itemId ? { ...item, quantity, total_price: item.unit_price * quantity } : item
      )
    }));
  };

  const handleItemRemove = (itemId: string) => {
    setOrder(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  const handleCheckout = () => {
    // TODO: Implement checkout functionality
    console.log("Checkout:", order);
  };

  const handleNavigationChange = (index: number) => {
    // TODO: Implement navigation functionality
    console.log("Navigate to:", index);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[linear-gradient(0deg,rgba(31,29,43,1)_0%,rgba(31,29,43,1)_100%),linear-gradient(0deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_100%)]">
      {/* Mobile: Hidden sidebar, Desktop/Tablet: Fixed sidebar */}
      <div className="hidden lg:block">
        <Sidebar 
          navigationItems={navigationIcons}
          onNavigationChange={handleNavigationChange}
        />
      </div>

      <div className="flex flex-col lg:flex-row w-full max-w-[1400px] mx-auto">
        {/* Main Content Area */}
        <div className="w-full flex flex-col px-4 lg:px-6">
          <Header 
            title="GoPOS Cafe"
            date="Thứ hai, 20 tháng 11, 2023"
            onSearch={handleSearch}
          />

          <CategoryNav 
            categories={categories}
            onCategoryChange={handleCategoryChange}
          />

          <div className="w-full mt-6 flex justify-between items-center">
            <div className="font-bold text-white text-lg lg:text-xl">
              Chọn Món
            </div>
            <div className="w-32 h-10 bg-[#242836] rounded-lg" />
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-white">Đang tải thực đơn...</div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-red-400">{error}</div>
            </div>
          ) : (
            <MenuGrid 
              items={filteredMenuItems}
              onItemClick={handleMenuItemClick}
            />
          )}
        </div>

        {/* Order Summary - Responsive width */}
        <div className="w-full lg:w-96 xl:w-[400px] mt-6 lg:mt-0">
          <OrderSummaryComponent
            order={order}
            onOrderTypeChange={handleOrderTypeChange}
            onItemQuantityChange={handleItemQuantityChange}
            onItemRemove={handleItemRemove}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
}
