import { Button } from "@/components/ui/button";
import { OrderSummary as OrderSummaryType, MenuItem } from "@go-pos/database";
import OrderTypeToggle from "./OrderTypeToggle";
import OrderItem from "./OrderItem";

interface OrderSummaryProps {
  order: OrderSummaryType;
  getMenuItemById: (id: string) => MenuItem | undefined;
  onOrderTypeChange: (type: 'tai-quan' | 'mang-di' | 'giao-hang') => void;
  onItemQuantityChange: (itemId: string, quantity: number) => void;
  onItemRemove: (itemId: string) => void;
  onCheckout: () => void;
  isProcessingPayment?: boolean;
}

export default function OrderSummary({ 
  order, 
  getMenuItemById,
  onOrderTypeChange, 
  onItemQuantityChange, 
  onItemRemove, 
  onCheckout,
  isProcessingPayment = false
}: OrderSummaryProps) {
  return (
    <div className="w-full lg:w-96 xl:w-[400px] min-h-[100%] lg:h-[810px] flex flex-col bg-[#242836] rounded-t-2xl lg:rounded-none">
      <div className="px-4 lg:px-6 h-auto mt-6 flex-col gap-4 flex">
        <div className="font-bold text-white text-lg lg:text-xl">
          Hóa đơn #{order.orderId || 'Tạm tính'}
        </div>

        <OrderTypeToggle
          value={order.orderType}
          onChange={onOrderTypeChange}
        />
      </div>

      <div className="px-4 lg:px-6 w-full h-auto mt-6 flex border-b border-gray-700">
        <div className="w-20 font-normal text-gray-400 text-sm">
          Món
        </div>
        <div className="w-12 ml-auto font-normal text-gray-400 text-sm">
          SL
        </div>
        <div className="w-16 ml-4 font-normal text-gray-400 text-sm">
          Giá
        </div>
      </div>

      <div className="px-4 lg:px-6 h-auto mt-4 flex-col gap-4 flex flex-1 overflow-y-auto">
        {order.items.map((item) => (
          <OrderItem
            key={item.id}
            item={item}
            menuItem={getMenuItemById(item.menu_item_id)}
            onQuantityChange={onItemQuantityChange}
            onRemove={onItemRemove}
          />
        ))}
      </div>

      <div className="px-4 lg:px-6 h-auto mt-6 flex-col border-t border-gray-700 w-full flex">
        <div className="w-full mt-4 flex justify-between">
          <div className="font-normal text-gray-400 text-sm">
            Giảm giá
          </div>
          <div className="font-normal text-white text-sm">
            {order.discount.toLocaleString('vi-VN')}₫
          </div>
        </div>

        <div className="w-full mt-3 flex justify-between">
          <div className="font-normal text-gray-400 text-base">
            Tạm tính
          </div>
          <div className="font-bold text-white text-base">
            {order.subtotal.toLocaleString('vi-VN')}₫
          </div>
        </div>

        <div className="w-full mt-3 flex justify-between border-t border-gray-600 pt-3">
          <div className="font-bold text-white text-lg">
            Tổng cộng
          </div>
          <div className="font-bold text-white text-lg">
            {order.total.toLocaleString('vi-VN')}₫
          </div>
        </div>

        <Button 
          className="w-full h-12 lg:h-14 mt-6 mb-6 bg-[#ea7b69] rounded-xl hover:bg-[#d66b59] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onCheckout}
          disabled={order.items.length === 0 || isProcessingPayment}
        >
          <div className="font-bold text-white text-sm lg:text-base text-center">
            {isProcessingPayment ? "Đang xử lý..." : "Tiến hành Thanh toán"}
          </div>
        </Button>
      </div>
    </div>
  );
}
