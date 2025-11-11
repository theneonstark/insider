import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Users, DollarSign, Award, BarChart3, Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import AdminSidebar from "@/components/AdminSidebar";
import ProfileViewModal from "@/components/ProfileViewModal";
import EditProfileModal from "@/components/EditProfileModal";
import { addFeature, removeFeature, revenueByTier, revenueData, updateAdminSettings, userdata } from "@/lib/apis";
import toast, { Toaster } from "react-hot-toast";
import AddUserModal from "@/components/AddUserModal";
import { usePage } from "@inertiajs/react";

const Admin = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [viewProfileOpen, setViewProfileOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tiers, setTiers] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);
  const [revenue, setRevenue] = useState({
  total_revenue: 0,
  current_month_revenue: 0,
  last_month_revenue: 0,
  revenue_change_percent: 0,
});
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [saving, setSaving] = useState(false);
  const { props } = usePage();
  const admin = props.auth?.user; // ✅ Admin data from Inertia props
  
  // 🧠 Refill data when props change (hot reload / navigation)
  useEffect(() => {
    if (admin) {
      setFormData({ name: admin.name, email: admin.email });
    }
  }, [admin]);

  const fetchUsers = async () => {
    try {
      const response = await userdata(); // call API
      setUsers(response.data); // set users from backend
    } catch (err) {
      console.error("Something went wrong while fetching:", err);
    }
  };

  const fetchRevenue = async () => {
  try {
    const res = await revenueData();
    if (res.data.status) {
      setRevenue(res.data.data);
    }
  } catch (error) {
    console.error("Error fetching revenue:", error);
  }
};


  useEffect(() => {
    fetchUsers();
    fetchRevenue();
  }, []); // run once on mount

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const res = await revenueByTier();
        if (res.data.status) {
          setTiers(res.data.data);
          setTotalRevenue(res.data.total);
        }
      } catch (error) {
        console.error("Error fetching revenue:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRevenueData();
  }, []);

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setViewProfileOpen(true);
  };

  const handleViewIncrement = () => {
    if (selectedUser) {
      setUsers(prev => prev.map(u => 
        u.email === selectedUser.email ? { ...u, views: u.views} : u
      ));
      setSelectedUser((prev) => ({ ...prev, views: prev.views}));
    }
  };

  const handleSaveProfile = (updatedProfile) => {
    setUsers(prev => prev.map(u => 
      u.email === selectedUser.email ? updatedProfile : u
    ));
    setSelectedUser(updatedProfile);
  };

  const handleStatusChange = async (id, status) => {
    // await axios.post(`/update-status/${id}`, { status });
    toast.success(`User status updated to ${status ? "Active" : "Inactive"}`);
  };

  const handleAddUser = (newUser) => {
    setUsers(prev => [...prev, newUser]);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Revenue Tracking</CardTitle>
          <CardDescription>Loading revenue data...</CardDescription>
        </CardHeader>
      </Card>
    );
  }


  const stats = [
  { title: "Total Users", value: users.length.toString(), icon: Users, change: "+12%" },
  { 
    title: "Monthly Revenue", 
    value: `$${revenue.current_month_revenue}`, 
    icon: DollarSign, 
    change: `${revenue.revenue_change_percent > 0 ? "+" : ""}${revenue.revenue_change_percent}%`
  },
  { title: "Featured Members", value: users.filter(u => u.featured).length.toString(), icon: Award, change: "+4%" },
  { title: "Active Ads", value: "2", icon: BarChart3, change: "0%" }
];

// 🧾 CSV Export Function
  const handleExportCSV = () => {
    if (tiers.length === 0) return;

    const headers = ["Plan Title", "Total Members", "Total Revenue"];
    const rows = tiers.map((tier) => [
      tier.plan_title,
      tier.total_members,
      `$${parseFloat(tier.total_revenue).toFixed(2)}`
    ]);

    // Add total row
    rows.push(["Total", "", `$${parseFloat(totalRevenue).toFixed(2)}`]);

    // Convert to CSV string
    const csvContent =
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    // Create Blob for download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `revenue-report-${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRemove = async (userId) => {
    setLoadingId(userId);
    try {
      const res = await removeFeature(userId);
      if (res.data.status) {
        toast.success(res.data.message);
        setUsers(prev => prev.map(u => (u.id === userId ? { ...u, featured: 0 } : u)));
      }
    } catch {
      toast.error("Failed to remove feature");
    } finally {
      setLoadingId(null);
    }
  };

  const handleAdd = async () => {
    const notFeatured = users.filter(u => !u.featured);
    if (notFeatured.length === 0) return toast.error("No available users to feature.");

    const randomUser = notFeatured[Math.floor(Math.random() * notFeatured.length)];
    setLoadingId(randomUser.id);

    try {
      const res = await addFeature(randomUser.id);
      if (res.data.status) {
        toast.success(`${randomUser.name} added to featured!`);
        setUsers(prev => prev.map(u => (u.id === randomUser.id ? { ...u, featured: 1 } : u)));
      }
    } catch {
      toast.error("Failed to add featured user");
    } finally {
      setLoadingId(null);
    }
  };

  // 🧠 Handle submit
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await updateAdminSettings(formData);
      if (res.data.status) {
        toast.success("Settings updated successfully!");
      } else {
        toast.error(res.data.message || "Update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while saving settings");
    }
  };


  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="animate-fade-in">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        );

      case "users":
        return (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage all registered users</CardDescription>
              </div>
              <Button onClick={() => setAddUserOpen(true)}>
                Add User
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.tier_id}</TableCell>
                      <TableCell>{user.views}</TableCell>
                      <TableCell>{user.featured ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <Switch
                          checked={user.status === 1}
                          onCheckedChange={(val) => handleStatusChange(user.id, val)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewProfile(user)}
                          >
                            View
                          </Button>
                          {/* <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedUser(user);
                              setEditProfileOpen(true);
                            }}
                          >
                            Edit
                          </Button> */}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );

      case "ads":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Ads Management</CardTitle>
              <CardDescription>Create and manage promotional ads</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="ad-title">Ad Title</Label>
                  <Input id="ad-title" placeholder="Join our community of women" />
                </div>
                <div>
                  <Label htmlFor="ad-link">CTA Link</Label>
                  <Input id="ad-link" placeholder="https://..." />
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="ad-active" />
                  <Label htmlFor="ad-active">Active</Label>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Save Ad
                </Button>
              </div>
              
              <div className="pt-6 border-t">
                <h3 className="font-semibold mb-4">Current Ads</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-muted rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-medium">Join our community of women</p>
                      <p className="text-sm text-muted-foreground">Active</p>
                    </div>
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>
                  <div className="p-4 bg-muted rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-medium">Join our luncheon near you</p>
                      <p className="text-sm text-muted-foreground">Active</p>
                    </div>
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case "featured":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Featured Members</CardTitle>
              <CardDescription>Manage featured member placements</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Select members to feature in the homepage carousel
              </p>

              <div className="space-y-3">
                {users.filter(u => u.featured).length > 0 ? (
                  users
                    .filter(u => u.featured)
                    .map((user) => (
                      <div key={user.id} className="p-4 bg-accent rounded-lg flex items-center justify-between">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.tier || "Member"} • {user.views || 0} views
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRemove(user.id)}
                          disabled={loadingId === user.id}
                        >
                          {loadingId === user.id ? "Removing..." : "Remove"}
                        </Button>
                      </div>
                    ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">No featured members yet</p>
                )}
              </div>

              <Button
                onClick={handleAdd}
                disabled={loadingId !== null}
                className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {loadingId !== null ? "Adding..." : "Add Featured Member"}
              </Button>
            </CardContent>
          </Card>
        );

      case "revenue":
        return (
           <Card>
            <CardHeader>
              <CardTitle>Revenue Tracking</CardTitle>
              <CardDescription>View revenue breakdown by tier</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tiers.map((tier, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">
                        {tier.plan_title}{" "}
                        {tier.plan_title === "Twinkle"
                          ? "($100/yr)"
                          : tier.plan_title === "Sparkle"
                          ? "($50/yr)"
                          : "($25/yr)"}
                      </span>
                      <span className="text-xl font-bold">
                        ${parseFloat(tier.total_revenue).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {tier.total_members} active members
                    </p>
                  </div>
                ))}

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">Total Monthly Revenue</span>
                    <span className="text-2xl font-bold text-primary">
                      ${parseFloat(totalRevenue).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleExportCSV}
                className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Export CSV
              </Button>
            </CardContent>
          </Card>
          );

      case "editor":
        return (
          <Card>
            <CardHeader>
              <CardTitle>User Profile Editor</CardTitle>
              <CardDescription>Edit user profiles and business information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Select User</Label>
                <Input placeholder="Search users..." />
              </div>
              <div className="p-8 bg-muted rounded-lg text-center">
                <p className="text-muted-foreground">Select a user to edit their profile</p>
              </div>
            </CardContent>
          </Card>
        );

      case "settings":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Admin Settings</CardTitle>
              <CardDescription>Manage platform settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <Label htmlFor="platform-name">Admin Name</Label>
                  <Input
                    id="platform-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="support-email">Admin Email</Label>
                  <Input
                    id="support-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {saving ? "Saving..." : "Save Settings"}
                </Button>
              </form>
            </CardContent>
          </Card>
        );

      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>Welcome, {admin?.name || "Admin"}</CardDescription>
            </CardHeader>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-[#F2C1D3] sticky top-0 z-10">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1 max-w-md">
              <Search className="w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search..." className="border-none bg-muted" />
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Avatar>
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-3xl font-heading mb-6">
            {activeSection === "overview" && "Admin Dashboard"}
            {activeSection === "ads" && "Ads Management"}
            {activeSection === "users" && "User Listings"}
            {activeSection === "featured" && "Featured Members"}
            {activeSection === "revenue" && "Revenue Tracking"}
            {activeSection === "editor" && "Profile Editor"}
            {activeSection === "settings" && "Settings"}
          </h1>
          
          {renderContent()}
        </main>
      </div>

      <ProfileViewModal
        profile={selectedUser}
        open={viewProfileOpen}
        onOpenChange={setViewProfileOpen}
        onEdit={() => {
          setViewProfileOpen(false);
          setEditProfileOpen(true);
        }}
        onViewIncrement={handleViewIncrement}
      />

      <EditProfileModal
        profile={selectedUser}
        open={editProfileOpen}
        onOpenChange={setEditProfileOpen}
        onSave={handleSaveProfile}
      />

      <AddUserModal
        open={addUserOpen}
        onOpenChange={setAddUserOpen}
        onAddUser={handleAddUser}
      />
      <Toaster/>
    </div>
  );
};

export default Admin;