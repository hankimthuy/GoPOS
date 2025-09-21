"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MenuItem } from "@go-pos/database";
import { formatPrice } from "@go-pos/shared";
import {
  Coffee,
  Cake,
  IceCream,
  Pizza,
  Sandwich,
  Utensils,
  Wine,
  Cookie,
} from "lucide-react";

interface MenuItemCardProps {
  item: MenuItem;
  onClick: (item: MenuItem) => void;
}

// Function to get icon based on category name
const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase();
  
  if (name.includes('cà phê') || name.includes('coffee') || name.includes('đồ uống')) {
    return Coffee;
  } else if (name.includes('bánh') || name.includes('cake') || name.includes('cookie')) {
    return Cake;
  } else if (name.includes('kem') || name.includes('ice cream') || name.includes('dessert')) {
    return IceCream;
  } else if (name.includes('pizza') || name.includes('pasta')) {
    return Pizza;
  } else if (name.includes('burger') || name.includes('sandwich') || name.includes('món chính')) {
    return Sandwich;
  } else if (name.includes('rượu') || name.includes('wine') || name.includes('cocktail')) {
    return Wine;
  } else if (name.includes('ăn vặt') || name.includes('snack')) {
    return Cookie;
  } else {
    return Utensils; // Default icon
  }
};

export default function MenuItemCard({ item, onClick }: MenuItemCardProps) {
  return (
    <Card
      className="bg-[#242836] border-none rounded-2xl cursor-pointer hover:bg-[#2a2f3e] transition-colors"
      onClick={() => onClick(item)}
    >
      <CardContent className="flex flex-col items-center p-4 sm:p-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#ea7b69] to-[#d65a4a] flex items-center justify-center shadow-lg">
          {item.image_url ? (
            <div
              className="w-full h-full rounded-full bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url(${item.image_url})` 
              }}
            />
          ) : (
            (() => {
              const IconComponent = getCategoryIcon(item.category?.name || '');
              return <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white" />;
            })()
          )}
        </div>
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
