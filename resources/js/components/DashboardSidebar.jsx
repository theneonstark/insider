// import { Link, useLocation } from "react-router-dom";
import { Home, User, CreditCard, Layout, MessageSquare, Star, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";

const DashboardSidebar = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "profile", label: "My Profile", icon: User },
    { id: "membership", label: "Membership Plans", icon: CreditCard },
    { id: "editor", label: "Landing Page Editor", icon: Layout },
    { id: "chat", label: "Chat", icon: MessageSquare },
    { id: "featured", label: "Featured", icon: Star },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-[260px] min-h-screen bg-[#FFF1F4] border-r border-[#F3D6E3] flex flex-col">
      <div className="p-6">
        <h2 className="text-xl font-heading text-foreground">My Dashboard</h2>
      </div>
      
      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-[#5A5A5A] hover:bg-primary/10"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-[#F3D6E3]">
        <Link href="/auth/logout">
          <Button variant="ghost" className="w-full justify-start gap-3 text-[#5A5A5A] hover:bg-primary/10">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </Link>
      </div>
    </aside>
  );
};

export default DashboardSidebar;