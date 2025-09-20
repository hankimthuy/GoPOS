import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface HeaderProps {
  title: string;
  date: string;
  onSearch: (query: string) => void;
}

export default function Header({ title, date, onSearch }: HeaderProps) {
  return (
    <header className="w-full relative mt-6 bg-transparent">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="font-extrabold text-white text-xl sm:text-2xl lg:text-3xl">
            {title}
          </h1>
          <p className="font-normal text-gray-400 text-sm sm:text-base">
            {date}
          </p>
        </div>

        <div className="w-full sm:w-80 h-12 flex bg-[#242836] rounded-xl overflow-hidden">
          <div className="flex items-center pl-4">
            <Search className="w-5 h-5 text-[#a9a9a9]" />
          </div>
          <Input
            className="flex-1 bg-transparent border-none text-[#a9a9a9] placeholder:text-[#a9a9a9] focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Tìm kiếm đồ uống..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
}
