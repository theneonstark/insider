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
import { userdata } from "@/lib/apis";
import toast, { Toaster } from "react-hot-toast";
import AddUserModal from "@/components/AddUserModal";

const Admin = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [viewProfileOpen, setViewProfileOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [users, setUsers] = useState([]);

  const stats = [
    { title: "Total Users", value: users.length.toString(), icon: Users, change: "+12%" },
    { title: "Monthly Revenue", value: "$8,450", icon: DollarSign, change: "+8%" },
    { title: "Featured Members", value: users.filter(u => u.featured).length.toString(), icon: Award, change: "+4%" },
    { title: "Active Ads", value: "2", icon: BarChart3, change: "0%" }
  ];

  const fetchUsers = async () => {
    try {
      const response = await userdata(); // call API
      console.log(response.data); // check payload
      setUsers(response.data); // set users from backend
    } catch (err) {
      console.error("Something went wrong while fetching:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); // run once on mount

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
                  <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
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
                {users.filter(u => u.featured).map((user, index) => (
                  <div key={index} className="p-4 bg-accent rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.tier} • {user.views} views</p>
                    </div>
                    <Button size="sm" variant="outline">Remove</Button>
                  </div>
                ))}
              </div>
              <Button className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                Add Featured Member
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
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">She Shine ($25/mo)</span>
                    <span className="text-xl font-bold">$3,250</span>
                  </div>
                  <p className="text-sm text-muted-foreground">130 active members</p>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">She Sparkle ($50/mo)</span>
                    <span className="text-xl font-bold">$4,200</span>
                  </div>
                  <p className="text-sm text-muted-foreground">84 active members</p>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Premium Elite ($200/yr)</span>
                    <span className="text-xl font-bold">$1,000</span>
                  </div>
                  <p className="text-sm text-muted-foreground">5 active members (monthly avg)</p>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">Total Monthly Revenue</span>
                    <span className="text-2xl font-bold text-primary">$8,450</span>
                  </div>
                </div>
              </div>
              
              <Button className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
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
              <div>
                <Label htmlFor="platform-name">Platform Name</Label>
                <Input id="platform-name" defaultValue="Insiders Index" />
              </div>
              <div>
                <Label htmlFor="support-email">Support Email</Label>
                <Input id="support-email" type="email" defaultValue="support@insidersindex.com" />
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Save Settings
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
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