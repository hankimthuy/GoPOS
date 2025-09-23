import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Package, 
  ClipboardList, 
  UtensilsCrossed, 
  Calendar 
} from "lucide-react";

interface NavigationItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  isActive: boolean;
  label: string;
}

interface SidebarProps {
  navigationItems?: NavigationItem[];
  currentPage?: string;
  onNavigationChange: (index: number) => void;
}

// Default navigation items matching the image
const defaultNavigationItems: NavigationItem[] = [
  { icon: LayoutDashboard, isActive: false, label: "Dashboard" },
  { icon: BookOpen, isActive: false, label: "Menu" },
  { icon: Users, isActive: false, label: "Staff" },
  { icon: Package, isActive: false, label: "Inventory" },
  { icon: ClipboardList, isActive: false, label: "Reports" },
  { icon: UtensilsCrossed, isActive: false, label: "Order/Table" },
  { icon: Calendar, isActive: false, label: "Reservation" },
];

export default function Sidebar({ 
  navigationItems = defaultNavigationItems, 
  currentPage = 'menu',
  onNavigationChange 
}: SidebarProps) {
  // Map page names to indices
  const pageToIndex: Record<string, number> = {
    'dashboard': 0,
    'menu': 1,
    'staff': 2,
    'inventory': 3,
    'reports': 4,
    'order': 5,
    'reservation': 6,
  };

  // Update active state based on current page
  const activeIndex = pageToIndex[currentPage] ?? 1;
  const itemsWithActiveState = navigationItems.map((item, index) => ({
    ...item,
    isActive: index === activeIndex
  }));
  return (
    <aside className="w-20 min-h-screen flex flex-col bg-[#242836]">
      {/* Logo Section */}
      <div className="flex justify-center mt-6 mb-8">
        <Avatar className="w-12 h-12 bg-[#ea7b69]">
          <AvatarFallback className="bg-[#ea7b69] text-white font-extrabold text-[17.4px]">
            GP
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col px-4 gap-2 space-y-1">
        {itemsWithActiveState.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Navigation Button */}
            <button
              onClick={() => onNavigationChange(index)}
              className={`w-12 h-12 flex items-center justify-center rounded-lg transition-colors mb-2 ${
                item.isActive
                  ? "bg-[#ea7b69] text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
              title={item.label}
            >
              <item.icon size={20} />
            </button>
            
            {/* Label */}
            <span className="text-xs text-center leading-tight text-white">
              {item.label}
            </span>
          </div>
        ))}
      </nav>
    </aside>
  );
}
