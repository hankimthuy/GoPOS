"use client";

import { Category, categoryQueries, MenuItem, menuItemQueries, OrderSummary, orderQueries } from "@go-pos/database";
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
import { ToastContainer, useToast } from "../ui/Toast";

const Sidebar = dynamic(() => import("./Sidebar"), { ssr: false });

const navigationIcons = [
  { icon: Home, isActive: false, label: "Trang chủ" },
  { icon: User, isActive: true, label: "Người dùng" },
  { icon: ShoppingBag, isActive: false, label: "Sản phẩm" },
  { icon: CreditCard, isActive: false, label: "Thanh toán" },
  { icon: Settings, isActive: false, label: "Cài đặt" },
];

// Demo menu items data - separate from order
const demoMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Cà phê sữa",
    description: "Cà phê sữa đá thơm ngon",
    base_price: 45000,
    price: 45000,
    image_url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop&crop=center",
    category_id: "1",
    is_available: true,
    is_hot_option_available: true,
    stock_quantity: 50,
    sort_order: 1,
    created_at: "2023-11-20T10:00:00.000Z",
    updated_at: "2023-11-20T10:00:00.000Z"
  },
  {
    id: "2",
    name: "Cappuccino",
    description: "Cappuccino Ý đậm đà",
    base_price: 55000,
    price: 55000,
    image_url: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&h=200&fit=crop&crop=center",
    category_id: "1",
    is_available: true,
    is_hot_option_available: true,
    stock_quantity: 30,
    sort_order: 2,
    created_at: "2023-11-20T10:00:00.000Z",
    updated_at: "2023-11-20T10:00:00.000Z"
  }
];

// Clean order data - only order-specific information
const initialOrder: OrderSummary = {
  orderId: null,
  orderType: "tai-quan",
  items: [],
  discount: 0,
  subtotal: 0,
  total: 0,
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
  const [menuItemQuantities, setMenuItemQuantities] = useState<Record<string, number>>({});
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  // Toast management
  const { toasts, showSuccess, showError, removeToast } = useToast();

  // Helper function to get menu item by ID
  const getMenuItemById = (id: string): MenuItem | undefined => {
    // First check demo data, then real data from database
    const demoItem = demoMenuItems.find(item => item.id === id);
    if (demoItem) return demoItem;
    return menuItems.find(item => item.id === id);
  };

  // Format current date to Vietnamese format using date-fns
  const formatVietnameseDate = (date: Date): string => {
    return format(date, "EEEE, d 'tháng' M, yyyy", { locale: vi });
  };

  // Set client flag to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    setCurrentDate(formatVietnameseDate(new Date()));
  }, []);

  // Calculate subtotal and total when order items change
  useEffect(() => {
    const subtotal = order.items.reduce((sum, item) => sum + item.total_price, 0);
    const total = subtotal - order.discount;
    
    setOrder(prev => ({
      ...prev,
      subtotal,
      total
    }));
  }, [order.items, order.discount]);

  // Sync order items to menu item quantities on mount
  useEffect(() => {
    const quantities: Record<string, number> = {};
    order.items.forEach(item => {
      quantities[item.menu_item_id] = item.quantity;
    });
    setMenuItemQuantities(quantities);
  }, []); // Only run on mount

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
        
        // Set first category as active and filter items by that category
        if (categoriesData.length > 0) {
          const firstCategory = categoriesData[0];
          setCategories(prev => 
            prev.map((cat, index) => ({ ...cat, active: index === 0 }))
          );
          
          // Filter menu items by first category
          const filteredItems = menuItemsData.filter(item => item.category_id === firstCategory.id);
          setFilteredMenuItems(filteredItems);
        } else {
          setFilteredMenuItems(menuItemsData);
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

  const handleMenuItemQuantityChange = (item: MenuItem, quantity: number) => {
    setMenuItemQuantities(prev => ({
      ...prev,
      [item.id]: quantity
    }));

    // Update order items
    if (quantity === 0) {
      // Remove item from order
      setOrder(prev => ({
        ...prev,
        items: prev.items.filter(orderItem => orderItem.menu_item_id !== item.id)
      }));
    } else {
      // Add or update item in order
      setOrder(prev => {
        const existingItemIndex = prev.items.findIndex(orderItem => orderItem.menu_item_id === item.id);
        
        if (existingItemIndex >= 0) {
          // Update existing item
          const updatedItems = [...prev.items];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity,
            total_price: item.price * quantity
          };
          return {
            ...prev,
            items: updatedItems
          };
        } else {
          // Add new item
          const newOrderItem = {
            id: `temp_${item.id}_${Date.now()}`, // Temporary ID
            menu_item_id: item.id,
            quantity,
            unit_price: item.price,
            total_price: item.price * quantity,
            special_instructions: '',
            created_at: new Date().toISOString()
          };
          return {
            ...prev,
            items: [...prev.items, newOrderItem]
          };
        }
      });
    }
  };

  const handleOrderTypeChange = (type: 'tai-quan' | 'mang-di' | 'giao-hang') => {
    setOrder(prev => ({ ...prev, orderType: type }));
  };

  const handleItemQuantityChange = (itemId: string, quantity: number) => {
    // Find the menu item ID from the order item
    const orderItem = order.items.find(item => item.id === itemId);
    const menuItemId = orderItem?.menu_item_id;
    
    // Update order items
    setOrder(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === itemId ? { ...item, quantity, total_price: item.unit_price * quantity } : item
      )
    }));
    
    // Update menu item quantities to sync with order
    if (menuItemId) {
      setMenuItemQuantities(prev => ({
        ...prev,
        [menuItemId]: quantity
      }));
    }
  };

  const handleItemRemove = (itemId: string) => {
    // Find the menu item ID from the order item
    const orderItem = order.items.find(item => item.id === itemId);
    const menuItemId = orderItem?.menu_item_id;
    
    // Update order items
    setOrder(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
    
    // Update menu item quantities to sync with order
    if (menuItemId) {
      setMenuItemQuantities(prev => ({
        ...prev,
        [menuItemId]: 0
      }));
    }
  };

  const handleCheckout = async () => {
    if (order.items.length === 0) {
      showError("Lỗi", "Không có món nào trong hóa đơn ");
      return;
    }

    if (isProcessingPayment) {
      return;
    }

    try {
      setIsProcessingPayment(true);
      
      // Lưu Hóa đơn vào database (order_number sẽ được tạo tự động)
      const savedOrder = await orderQueries.createOrder(order);
      
      // Hiển thị thông báo thành công
      showSuccess(
        "Thanh toán thành công!", 
        `Hóa đơn #${savedOrder.order_number} đã được thanh toán (Tiền mặt) với tổng số tiền ${order.total.toLocaleString('vi-VN')}₫`
      );

      // Cập nhật orderId với order_number từ database trước khi xóa
      setOrder(prevOrder => ({
        ...prevOrder,
        orderId: savedOrder.order_number
      }));

      // Delay một chút để user thấy order number, sau đó xóa bảng kê
      setTimeout(() => {
        setOrder(initialOrder);
        setMenuItemQuantities({});
      }, 2000);
      
    } catch (error) {
      console.error('Error processing payment:', error);
      showError("Lỗi thanh toán", "Không thể xử lý thanh toán. Vui lòng thử lại.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleNavigationChange = (index: number) => {
    // TODO: Implement navigation functionality
    console.log("Navigate to:", index);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[linear-gradient(0deg,rgba(31,29,43,1)_0%,rgba(31,29,43,1)_100%),linear-gradient(0deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_100%)]">
      {/* Toast Container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
      
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
            date={isClient ? currentDate : 'Đang tải...'}
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
              onQuantityChange={handleMenuItemQuantityChange}
              itemQuantities={menuItemQuantities}
            />
          )}
        </div>

        {/* Order Summary - Responsive width */}
        <div className="w-full lg:w-96 xl:w-[400px] mt-6 lg:mt-0">
          <OrderSummaryComponent
            order={order}
            getMenuItemById={getMenuItemById}
            onOrderTypeChange={handleOrderTypeChange}
            onItemQuantityChange={handleItemQuantityChange}
            onItemRemove={handleItemRemove}
            onCheckout={handleCheckout}
            isProcessingPayment={isProcessingPayment}
          />
        </div>
      </div>
    </div>
  );
}
