import { Link } from "@inertiajs/react";
import { Home, Megaphone, Users, Star, BarChart, Edit, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminSidebar = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "ads", label: "Ads Management", icon: Megaphone },
    { id: "users", label: "User Listings", icon: Users },
    { id: "featured", label: "Featured Members", icon: Star },
    { id: "revenue", label: "Revenue Tracking", icon: BarChart },
    { id: "editor", label: "Profile Editor", icon: Edit },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-[270px] min-h-screen bg-[#FFF1F4] border-r border-[#F2C1D3] flex flex-col">
      <div className="p-6">
        <h2 className="text-xl font-heading text-foreground">Admin Panel</h2>
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
                  : "text-[#6B6B6B] hover:bg-primary/10"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-[#F2C1D3]">
        <Link href="/auth/logout">
          <Button variant="ghost" className="w-full justify-start gap-3 text-[#6B6B6B] hover:bg-primary/10">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;