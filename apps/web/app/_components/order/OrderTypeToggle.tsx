"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface OrderTypeToggleProps {
  value: 'tai-quan' | 'mang-di' | 'giao-hang';
  onChange: (value: 'tai-quan' | 'mang-di' | 'giao-hang') => void;
}

export default function OrderTypeToggle({ value, onChange }: OrderTypeToggleProps) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(newValue) => onChange(newValue as 'tai-quan' | 'mang-di' | 'giao-hang')}
      className="w-full flex flex-wrap justify-start gap-2"
    >
      <ToggleGroupItem
        value="tai-quan"
        className={`w-20 sm:w-24 h-8 sm:h-10 rounded-full border ${
          value === 'tai-quan' 
            ? 'bg-[#ea7b69] text-white border-[#ea7b69]' 
            : 'border-[#e4e7eb] bg-transparent text-[#ea7b69] hover:bg-[#ea7b69] hover:text-white hover:border-[#ea7b69]'
        }`}
      >
        <div className="font-medium text-xs sm:text-sm text-center">
          Tại quán
        </div>
      </ToggleGroupItem>

      <ToggleGroupItem
        value="mang-di"
        className={`w-20 sm:w-24 h-8 sm:h-10 rounded-full border ${
          value === 'mang-di' 
            ? 'bg-[#ea7b69] text-white border-[#ea7b69]' 
            : 'border-[#e4e7eb] bg-transparent text-[#ea7b69] hover:bg-[#ea7b69] hover:text-white hover:border-[#ea7b69]'
        }`}
      >
        <div className="font-medium text-xs sm:text-sm text-center">
          Mang đi
        </div>
      </ToggleGroupItem>

      <ToggleGroupItem
        value="giao-hang"
        className={`w-20 sm:w-24 h-8 sm:h-10 rounded-full border ${
          value === 'giao-hang' 
            ? 'bg-[#ea7b69] text-white border-[#ea7b69]' 
            : 'border-[#e4e7eb] bg-transparent text-[#ea7b69] hover:bg-[#ea7b69] hover:text-white hover:border-[#ea7b69]'
        }`}
      >
        <div className="font-medium text-xs sm:text-sm text-center">
          Giao hàng
        </div>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
