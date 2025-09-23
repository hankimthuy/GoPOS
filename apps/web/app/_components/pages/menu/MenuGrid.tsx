import { MenuItem } from "@go-pos/database";
import MenuItemCard from "./MenuItemCard";

interface MenuGridProps {
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
  onQuantityChange?: (item: MenuItem, quantity: number) => void;
  itemQuantities?: Record<string, number>;
}

export default function MenuGrid({ items, onItemClick, onQuantityChange, itemQuantities }: MenuGridProps) {
  return (
    <div className="w-full mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 items-stretch">
        {items.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            quantity={itemQuantities?.[item.id] || 0}
            onClick={onItemClick}
            onQuantityChange={onQuantityChange}
          />
        ))}
      </div>
    </div>
  );
}
