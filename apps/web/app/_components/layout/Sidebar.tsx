import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface NavigationItem {
  icon: React.ComponentType<{ size?: number }>;
  isActive: boolean;
  label: string;
}

interface SidebarProps {
  navigationItems: NavigationItem[];
  onNavigationChange: (index: number) => void;
}

export default function Sidebar({ navigationItems, onNavigationChange }: SidebarProps) {
  return (
    <aside className="w-20 min-h-screen flex flex-col gap-6 bg-[#242836]">
      <div className="flex justify-center mt-6">
        <Avatar className="w-12 h-12 bg-[#ea7b69]">
          <AvatarFallback className="bg-[#ea7b69] text-white font-extrabold text-[17.4px]">
            GP
          </AvatarFallback>
        </Avatar>
      </div>

      <nav className="flex flex-col gap-4 px-4">
        {navigationItems.map((item, index) => (
          <button
            key={index}
            onClick={() => onNavigationChange(index)}
            className={`w-12 h-12 flex items-center justify-center rounded-lg transition-colors ${
              item.isActive
                ? "bg-[#ea7b69] text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
            title={item.label}
          >
            <item.icon size={20} />
          </button>
        ))}
      </nav>
    </aside>
  );
}
