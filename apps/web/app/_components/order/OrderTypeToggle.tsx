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
        className="w-20 sm:w-24 h-8 sm:h-10 bg-[#ea7b69] rounded-full data-[state=on]:bg-[#ea7b69] data-[state=on]:text-white hover:bg-[#ea7b69] border-0"
      >
        <div className="font-medium text-xs sm:text-sm text-center">
          Tại quán
        </div>
      </ToggleGroupItem>

      <ToggleGroupItem
        value="mang-di"
        className="w-20 sm:w-24 h-8 sm:h-10 rounded-full border border-[#e4e7eb] bg-transparent data-[state=on]:bg-[#ea7b69] data-[state=on]:text-white hover:bg-[#ea7b69] hover:text-white"
      >
        <div className="font-medium text-[#ea7b69] text-xs sm:text-sm text-center">
          Mang đi
        </div>
      </ToggleGroupItem>

      <ToggleGroupItem
        value="giao-hang"
        className="w-20 sm:w-24 h-8 sm:h-10 rounded-full border border-[#e4e7eb] bg-transparent data-[state=on]:bg-[#ea7b69] data-[state=on]:text-white hover:bg-[#ea7b69] hover:text-white"
      >
        <div className="font-medium text-[#ea7b69] text-xs sm:text-sm text-center">
          Giao hàng
        </div>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
