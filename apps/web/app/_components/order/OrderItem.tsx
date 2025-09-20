"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { OrderItem as OrderItemType } from "@go-pos/database";
import { formatPrice } from "@go-pos/shared";

interface OrderItemProps {
  item: OrderItemType;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

export default function OrderItem({ item, onQuantityChange, onRemove }: OrderItemProps) {
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
            backgroundImage: item.menu_item?.image_url ? `url(${item.menu_item.image_url})` : 'none' 
          }}
        />
        <div className="flex flex-col min-w-0 flex-1">
          <div className="font-medium text-white text-sm truncate">
            {item.menu_item?.name || 'Unknown Item'}
          </div>
          <div className="font-normal text-gray-400 text-xs truncate">
            {item.special_instructions || item.menu_item?.description || ''}
          </div>
        </div>
      </div>

      <Card className="w-8 h-8 bg-[#1f1d2b] rounded-lg border-0 flex-shrink-0">
        <CardContent className="p-0 flex items-center justify-center h-full">
          <div className="font-normal text-white text-sm">
            {item.quantity}
          </div>
        </CardContent>
      </Card>

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
