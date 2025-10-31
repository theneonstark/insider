import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, Eye, Star, Award, Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardSidebar from "@/components/DashboardSidebar";
import ProfileViewModal from "@/components/ProfileViewModal";
import EditProfileModal from "@/components/EditProfileModal";
import DashboardBanner from "@/components/DashboardBanner";
import LandingPageEditor from "@/components/LandingPageEditor";
import MembershipCard from "@/components/MembershipCard";
import PaymentModal from "@/components/PaymentModal";
import profileAmy from "@/assets/profile-amy.jpg";
import { usePage } from "@inertiajs/react";
import { membershipPlans } from "@/lib/apis";

const Dashboard = (userData) => {
  const { props } = usePage();
  const user = props.auth?.user;
  console.log(userData?.user?.tier_name);
  

  const [activeSection, setActiveSection] = useState("dashboard");
  const [viewProfileOpen, setViewProfileOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [plans, setPlans] = useState([]);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);

  const [userProfile, setUserProfile] = useState({
    name: user?.name || "Guest User",
    email: user?.email || "guest@example.com",
    phone: user?.phone || "",
    businessType: user?.business_type || "",
    state: user?.state || "",
    dob: user?.dob || "",
    bio: user?.bio || "",
    tier: userData?.user?.tier_name || null,
    views: user?.views || 0,
    featured: user?.featured || 0,
    image: profileAmy
  });

  // Parse JSON string from API
  const parseFeatures = (featureStr) => {
    if (!featureStr || typeof featureStr !== "string") return [];
    try {
      const parsed = JSON.parse(featureStr);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn("Failed to parse features:", featureStr);
      return [];
    }
  };

  // Fetch membership plans from API — NO FALLBACK
  useEffect(() => {
    const fetchMembership = async () => {
      try {
        const res = await membershipPlans();
        const rawPlans = res?.data?.data || [];

        const transformedPlans = rawPlans.map(plan => ({
          id: plan.id,
          title: plan.tier_name,
          price: `$${plan.price} / year`,
          features: parseFeatures(plan.feature),
          highlighted: plan.highlighted === 1 || plan.highlighted === "1"
        }));

        console.log("API Membership Plans:", transformedPlans);
        setPlans(transformedPlans);
      } catch (err) {
        console.error("Failed to fetch membership plans:", err);
        setPlans([]); // Empty on error
      }
    };

    fetchMembership();
  }, []);

  const handleSaveProfile = (updatedProfile) => {
    setUserProfile(updatedProfile);
  };

  const handleJoinTier = (tier) => {
    setSelectedTier(tier);
    setPaymentModalOpen(true);
  };

  const handleViewIncrement = () => {
    setUserProfile(prev => ({ ...prev, views: (prev.views || 0)}));
  };

  const getCurrentPlan = () => {
    return plans.find(plan => plan.title === userProfile.tier);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Current Tier</CardTitle>
                  <Star className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userProfile.tier || "No Plan"}</div>
                  <p className="text-xs text-muted-foreground">
                    {userProfile.tier ? "Active member" : "Choose a plan"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
                  <Eye className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userProfile.views || 0}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Messages</CardTitle>
                  <MessageCircle className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">3 unread</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Featured</CardTitle>
                  <Award className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userProfile.featured ? "Yes" : "No"}</div>
                  <p className="text-xs text-muted-foreground">
                    {userProfile.featured ? "Active this month" : "Upgrade to get featured"}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button onClick={() => setViewProfileOpen(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  View My Profile
                </Button>
                <Button variant="outline" onClick={() => setActiveSection("profile")}>
                  Edit Profile
                </Button>
                <Button variant="outline" onClick={() => setActiveSection("chat")}>
                  Check Messages
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case "profile":
        return (
          <Card>
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
              <CardDescription>View and edit your business information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label>Full Name</Label>
                  <p className="text-lg font-semibold">{userProfile.name}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="text-lg">{userProfile.email}</p>
                </div>
                <div>
                  <Label>Business Type</Label>
                  <p className="text-lg">{userProfile.businessType || "Not set"}</p>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button onClick={() => setEditProfileOpen(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Edit Profile
                </Button>
                <Button variant="outline" onClick={() => setViewProfileOpen(true)}>
                  Preview Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case "membership":
        return (
          <div className="space-y-6">
            {!userProfile.tier ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Choose Your Membership Plan</CardTitle>
                    <CardDescription>Select a plan to unlock exclusive features</CardDescription>
                  </CardHeader>
                </Card>

                {/* Show loading or plans */}
                {plans.length > 0 ? (
                  <div className="grid md:grid-cols-3 gap-6">
                    {plans.map((tier) => (
                      <MembershipCard
                        key={tier.id}
                        title={tier.title}
                        price={tier.price}
                        features={tier.features}
                        highlighted={tier.highlighted}
                        onJoin={() => handleJoinTier(tier)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading membership plans...</p>
                  </div>
                )}
              </>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Your Membership</CardTitle>
                  <CardDescription>Manage your subscription and benefits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{userProfile.tier}</h3>
                      <Badge className="bg-primary text-primary-foreground">Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {getCurrentPlan()?.price || "N/A"}
                    </p>
                    <ul className="space-y-2 text-sm">
                      {getCurrentPlan()?.features?.length > 0 ? (
                        getCurrentPlan().features.map((feature, idx) => (
                          <li key={idx}>Check {feature}</li>
                        ))
                      ) : (
                        <li className="text-muted-foreground">No features listed</li>
                      )}
                    </ul>
                  </div>
                  <div className="flex gap-3">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Upgrade Plan
                    </Button>
                    <Button variant="outline">Manage Subscription</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case "editor":
        return <LandingPageEditor />;

      case "chat":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>Connect with other members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold mb-3">Conversations</h3>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80">
                      <div className="font-medium">Member {i}</div>
                      <div className="text-sm text-muted-foreground">Last message...</div>
                    </div>
                  ))}
                </div>
                <div className="md:col-span-2 p-6 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Select a conversation to view messages</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case "featured":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Featured Status</CardTitle>
              <CardDescription>Your featured member benefits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-accent rounded-lg text-center">
                <Award className="w-16 h-16 mx-auto mb-4 text-accent-foreground" />
                <h3 className="font-semibold text-xl mb-2">
                  {userProfile.tier ? "You're Featured!" : "Upgrade to Get Featured!"}
                </h3>
                <p className="text-sm mb-4">
                  {userProfile.tier
                    ? "Your profile is highlighted across the platform"
                    : "Get priority placement and visibility"}
                </p>
                {userProfile.tier && <Badge className="bg-accent-foreground text-accent">Active</Badge>}
              </div>
            </CardContent>
          </Card>
        );

      case "settings":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences and security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Account Information</h3>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={userProfile.email} />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold">Change Password</h3>
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" placeholder="Enter current password" />
                </div>
                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" placeholder="Enter new password" />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Update Password
                </Button>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold">Notifications</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <div className="flex-1 flex flex-col">
        <header className="bg-card border-b border-[#F3D6E3] sticky top-0 z-10">
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
                <AvatarImage src={userProfile.image} alt={userProfile.name} />
                <AvatarFallback>{userProfile.name?.[0] || "G"}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-4 bg-muted/30">
          <DashboardBanner
            icon="🎉"
            title="Join Our Community of Women"
            description="Connect with amazing women entrepreneurs and grow together"
            ctaText="Learn More"
            ctaLink="#"
            gradient="linear-gradient(135deg, #FFE9F2 0%, #FFF3F6 100%)"
          />
          <DashboardBanner
            icon="🍽️"
            title="Join Our Luncheon Near You"
            description="Network with local women leaders at our exclusive events"
            ctaText="Find Events"
            ctaLink="#"
            gradient="linear-gradient(135deg, #FFF3F6 0%, #E7C8FF 100%)"
          />
        </div>

        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-3xl font-heading mb-6">
            {activeSection === "dashboard" && "Welcome Back!"}
            {activeSection === "profile" && "My Profile"}
            {activeSection === "membership" && "Membership Plans"}
            {activeSection === "editor" && "Landing Page Editor"}
            {activeSection === "chat" && "Chat"}
            {activeSection === "featured" && "Featured"}
            {activeSection === "settings" && "Settings"}
          </h1>
          {renderContent()}
        </main>
      </div>

      <ProfileViewModal
        profile={userProfile}
        open={viewProfileOpen}
        onOpenChange={setViewProfileOpen}
        onEdit={() => {
          setViewProfileOpen(false);
          setEditProfileOpen(true);
        }}
        onViewIncrement={handleViewIncrement}
      />

      <EditProfileModal
        profile={userProfile}
        open={editProfileOpen}
        onOpenChange={setEditProfileOpen}
        onSave={handleSaveProfile}
      />

      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        tier={selectedTier}
      />
    </div>
  );
};

export default Dashboard;