"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MenuItem } from "@go-pos/database";
import { formatPrice } from "@go-pos/shared";

interface MenuItemCardProps {
  item: MenuItem;
  onClick: (item: MenuItem) => void;
}

export default function MenuItemCard({ item, onClick }: MenuItemCardProps) {
  return (
    <Card
      className="bg-[#242836] border-none rounded-2xl cursor-pointer hover:bg-[#2a2f3e] transition-colors"
      onClick={() => onClick(item)}
    >
      <CardContent className="flex flex-col items-center p-4 sm:p-6">
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cover bg-center bg-no-repeat bg-gray-600"
          style={{ 
            backgroundImage: item.image_url ? `url(${item.image_url})` : 'none' 
          }}
        />
        <div className="w-full mt-3 sm:mt-4 text-center font-medium text-white text-sm sm:text-base">
          {item.name}
        </div>
        <div className="w-full mt-1 sm:mt-2 text-center font-bold text-[#ea7b69] text-sm sm:text-base">
          {formatPrice(item.price)}
        </div>
        <div className="w-full mt-1 sm:mt-2 text-center font-normal text-gray-400 text-xs sm:text-sm">
          {item.stock_quantity ? `Còn ${item.stock_quantity} ly` : 'Có sẵn'}
        </div>
        {item.description && (
          <div className="w-full mt-1 text-center font-normal text-gray-500 text-xs">
            {item.description}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
