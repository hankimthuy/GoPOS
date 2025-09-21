"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export type SortOption = 
  | 'default'
  | 'name-asc'
  | 'name-desc'
  | 'price-asc'
  | 'price-desc'
  | 'popular'
  | 'newest'
  | 'rating';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions = [
  { value: 'default' as const, label: 'Mặc định' },
  { value: 'name-asc' as const, label: 'Tên A-Z' },
  { value: 'name-desc' as const, label: 'Tên Z-A' },
  { value: 'price-asc' as const, label: 'Giá thấp → cao' },
  { value: 'price-desc' as const, label: 'Giá cao → thấp' },
  { value: 'popular' as const, label: 'Bán chạy nhất' },
  { value: 'newest' as const, label: 'Mới nhất' },
  { value: 'rating' as const, label: 'Đánh giá cao' },
];

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = sortOptions.find(option => option.value === value) || sortOptions[0];

  const handleOptionClick = (optionValue: SortOption) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-32 h-10 bg-[#242836] rounded-lg flex items-center justify-between px-3 text-white text-sm font-medium hover:bg-[#2a2e3e] transition-colors"
      >
        <span className="truncate">{selectedOption.label}</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute top-full left-0 mt-1 w-48 bg-[#242836] rounded-lg shadow-lg border border-[#3a3f4f] z-20">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-[#2a2e3e] transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  value === option.value 
                    ? 'text-[#ea7b69] bg-[#2a2e3e]' 
                    : 'text-white'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
