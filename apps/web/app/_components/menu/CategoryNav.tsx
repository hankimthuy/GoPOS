"use client";

import { Button } from "@/components/ui/button";
import { Category } from "@go-pos/database";

interface CategoryWithActive extends Category {
  active: boolean;
}

interface CategoryNavProps {
  categories: CategoryWithActive[];
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryNav({ categories, onCategoryChange }: CategoryNavProps) {
  return (
    <div className="w-full mt-6 flex flex-wrap gap-2 sm:gap-3">
      {categories.map((category) => {
        const baseClasses = "h-auto px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium transition-colors";
        const activeClasses = "bg-[#ea7b69] text-white hover:bg-[#ea7b69]/90";
        const inactiveClasses = "bg-transparent border border-[#e4e7eb] text-[#ea7b69] category-chip-inactive";
        
        return (
          <Button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`${baseClasses} ${category.active ? activeClasses : inactiveClasses}`}
          >
            {category.name}
          </Button>
        );
      })}
    </div>
  );
}
