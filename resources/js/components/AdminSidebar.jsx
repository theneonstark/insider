import { 
  Home, Megaphone, Users, Star, BarChart, Edit, 
  Settings, LogOut, X,
  AppWindow
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";

const AdminSidebar = ({ activeSection, onSectionChange, mobile = false, onClose }) => {
  const menuItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "ads", label: "Ads Management", icon: Megaphone },
    { id: "users", label: "User Listings", icon: Users },
    { id: "featured", label: "Featured Members", icon: Star },
    { id: "revenue", label: "Revenue Tracking", icon: BarChart },
    // { id: "editor", label: "Profile Editor", icon: Edit },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside
      className={`
        w-[270px] min-h-screen bg-[#FFF1F4] border-r border-[#F2C1D3]
        flex flex-col relative
        ${mobile ? "shadow-2xl" : ""}
      `}
    >
      {/* ---------- MOBILE CLOSE BUTTON ---------- */}
      {mobile && (
        <button
          onClick={onClose}
          className="
            absolute right-3 top-3 z-50 
            p-2 rounded-md
            bg-white/80 backdrop-blur-md
            hover:bg-white transition
          "
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* ---------- TITLE ---------- */}
      <div className="p-6">
        <h2 className="text-xl font-heading text-foreground">Admin Panel</h2>
      </div>
      
      {/* ---------- NAVIGATION ---------- */}
      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                onSectionChange(item.id);
                if (mobile && onClose) onClose();
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                ${isActive 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-[#6B6B6B] hover:bg-primary/10"
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      {/* ---------- LOGOUT ---------- */}
      <div className="p-4 border-t border-[#F2C1D3]">
        <Link href="/auth/logout">
          <Button
            variant="ghost"
            className="
              w-full justify-start gap-3 
              text-[#6B6B6B] hover:bg-primary/10
            "
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;