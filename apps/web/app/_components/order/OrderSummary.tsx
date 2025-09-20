import { Button } from "@/components/ui/button";
import { OrderSummary as OrderSummaryType } from "@go-pos/database";
import OrderTypeToggle from "./OrderTypeToggle";
import OrderItem from "./OrderItem";

interface OrderSummaryProps {
  order: OrderSummaryType;
  onOrderTypeChange: (type: 'tai-quan' | 'mang-di' | 'giao-hang') => void;
  onItemQuantityChange: (itemId: string, quantity: number) => void;
  onItemRemove: (itemId: string) => void;
  onCheckout: () => void;
}

export default function OrderSummary({ 
  order, 
  onOrderTypeChange, 
  onItemQuantityChange, 
  onItemRemove, 
  onCheckout 
}: OrderSummaryProps) {
  return (
    <div className="w-full lg:w-96 xl:w-[400px] min-h-[600px] lg:h-[810px] flex flex-col bg-[#242836] rounded-t-2xl lg:rounded-none">
      <div className="px-4 lg:px-6 h-auto mt-6 flex-col gap-4 flex">
        <div className="font-bold text-white text-lg lg:text-xl">
          Đơn hàng #{order.orderId}
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

        <Button 
          className="w-full h-12 lg:h-14 mt-6 bg-[#ea7b69] rounded-xl hover:bg-[#d66b59]"
          onClick={onCheckout}
        >
          <div className="font-bold text-white text-sm lg:text-base text-center">
            Tiến hành Thanh toán
          </div>
        </Button>
      </div>
    </div>
  );
}
