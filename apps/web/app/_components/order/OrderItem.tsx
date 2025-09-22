"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, Minus } from "lucide-react";
import { OrderItem as OrderItemType, MenuItem } from "@go-pos/database";
import { formatPrice } from "@go-pos/shared";

interface OrderItemProps {
  item: OrderItemType;
  menuItem?: MenuItem;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

function OrderItem({ item, menuItem, onQuantityChange, onRemove }: OrderItemProps) {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      onQuantityChange(item.id, newQuantity);
    } else {
      onRemove(item.id);
    }
  };

  return (
    <div className="w-full flex items-center gap-3 py-2">
      <div className="flex gap-3 flex-1 min-w-0">
        <div
          className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0 bg-gray-600"
          style={{ 
            backgroundImage: menuItem?.image_url ? `url(${menuItem.image_url})` : 'none' 
          }}
        />
        <div className="flex flex-col min-w-0 flex-1">
          <div className="font-medium text-white text-sm truncate">
            {menuItem?.name || 'Unknown Item'}
          </div>
          <div className="font-normal text-gray-400 text-xs truncate">
            {item.special_instructions || menuItem?.description || ''}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="w-6 h-6 rounded-full bg-[#1f1d2b] hover:bg-[#2a2f3e] text-white p-0"
          onClick={() => handleQuantityChange(item.quantity - 1)}
        >
          <Minus className="w-3 h-3" />
        </Button>
        <div className="w-8 h-8 bg-[#ea7b69] rounded-lg flex items-center justify-center">
          <div className="font-medium text-white text-sm">
            {item.quantity}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="w-6 h-6 rounded-full bg-[#1f1d2b] hover:bg-[#2a2f3e] text-white p-0"
          onClick={() => handleQuantityChange(item.quantity + 1)}
        >
          <Plus className="w-3 h-3" />
        </Button>
      </div>

      <div className="w-16 font-medium text-[#ea7b69] text-sm text-right flex-shrink-0">
        {formatPrice(item.total_price)}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="w-6 h-6 opacity-60 hover:opacity-100 p-0 flex-shrink-0"
        onClick={() => onRemove(item.id)}
      >
        <Trash2 className="w-4 h-4 text-white" />
      </Button>
    </div>
  );
}

export default OrderItem;