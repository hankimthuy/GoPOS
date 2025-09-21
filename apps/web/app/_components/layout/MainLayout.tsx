"use client";

import { Category, categoryQueries, MenuItem, menuItemQueries, OrderSummary } from "@go-pos/database";
import { CreditCard, Home, Settings, ShoppingBag, User } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import CategoryNav from "../menu/CategoryNav";
import MenuGrid from "../menu/MenuGrid";
import SortDropdown, { SortOption } from "../menu/SortDropdown";
import OrderSummaryComponent from "../order/OrderSummary";
import Header from "./Header";

const Sidebar = dynamic(() => import("./Sidebar"), { ssr: false });

const navigationIcons = [
  { icon: Home, isActive: false, label: "Trang chủ" },
  { icon: User, isActive: true, label: "Người dùng" },
  { icon: ShoppingBag, isActive: false, label: "Sản phẩm" },
  { icon: CreditCard, isActive: false, label: "Thanh toán" },
  { icon: Settings, isActive: false, label: "Cài đặt" },
];

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
      created_at: "2023-11-20T10:00:00.000Z",
    },
    {
      id: "2", 
      menu_item_id: "2",
      quantity: 1,
      unit_price: 55000,
      total_price: 55000,
      special_instructions: "Size L",
      created_at: "2023-11-20T10:00:00.000Z",
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
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  // Format current date to Vietnamese format using date-fns
  const formatVietnameseDate = (date: Date): string => {
    return format(date, "EEEE, d 'tháng' M, yyyy", { locale: vi });
  };

  // Set client flag to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    setCurrentDate(formatVietnameseDate(new Date()));
  }, []);

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
    console.log('Category changed to:', categoryId);
    setCategories(prev => {
      const updated = prev.map(cat => ({
        ...cat,
        active: cat.id === categoryId
      }));
      console.log('Updated categories:', updated);
      return updated;
    });
    
    // Filter menu items by category and apply sorting
    let filtered: MenuItem[];
    if (categoryId === 'all') {
      filtered = menuItems;
    } else {
      filtered = menuItems.filter(item => item.category_id === categoryId);
    }
    
    const sortedItems = sortMenuItems(filtered, sortBy);
    setFilteredMenuItems(sortedItems);
  };

  // Sort menu items based on selected option
  const sortMenuItems = (items: MenuItem[], sortOption: SortOption): MenuItem[] => {
    const sortedItems = [...items];
    
    switch (sortOption) {
      case 'name-asc':
        return sortedItems.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
      case 'name-desc':
        return sortedItems.sort((a, b) => b.name.localeCompare(a.name, 'vi'));
      case 'price-asc':
        return sortedItems.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sortedItems.sort((a, b) => b.price - a.price);
      case 'popular':
        // Sort by sort_order (lower number = more popular)
        return sortedItems.sort((a, b) => a.sort_order - b.sort_order);
      case 'newest':
        // Sort by creation date (newest first)
        return sortedItems.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case 'rating':
        // Sort by name as fallback since rating field doesn't exist
        return sortedItems.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
      case 'default':
      default:
        return sortedItems;
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      const sortedItems = sortMenuItems(menuItems, sortBy);
      setFilteredMenuItems(sortedItems);
      return;
    }
    
    try {
      const searchResults = await menuItemQueries.searchMenuItems(query);
      const sortedResults = sortMenuItems(searchResults, sortBy);
      setFilteredMenuItems(sortedResults);
    } catch (err) {
      console.error('Error searching menu items:', err);
      setError('Không thể tìm kiếm. Vui lòng thử lại.');
    }
  };

  const handleSortChange = (sortOption: SortOption) => {
    setSortBy(sortOption);
    const sortedItems = sortMenuItems(filteredMenuItems, sortOption);
    setFilteredMenuItems(sortedItems);
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
            date={isClient ? currentDate : '...'}
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
            <SortDropdown 
              value={sortBy}
              onChange={handleSortChange}
            />
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
