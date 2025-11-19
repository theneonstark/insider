import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, Eye, Star, Award, Bell, Search, Upload, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardSidebar from "@/components/DashboardSidebar";
import ProfileViewModal from "@/components/ProfileViewModal";
import EditProfileModal from "@/components/EditProfileModal";
import DashboardBanner from "@/components/DashboardBanner";
import LandingPageEditor from "@/components/LandingPageEditor";
import MembershipCard from "@/components/MembershipCard";
import PaymentModal from "@/components/PaymentModal";
import FeatureActivationModal from "@/components/FeatureActivationModal";
import { usePage } from "@inertiajs/react";
import { CreateAds, Data, getAds, membershipPlans, updatePassword } from "@/lib/apis";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import EditAdModal from "@/components/EditAdModal";
import { Switch } from "@/components/ui/switch";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Dashboard = (userData) => {
  // Mock data for all running ads (admin + user ads)
  const { props } = usePage();
  const user = props.auth?.user;
  

  const [activeSection, setActiveSection] = useState("dashboard");
  const [viewProfileOpen, setViewProfileOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [plans, setPlans] = useState([]);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);
  const [activationModalOpen, setActivationModalOpen] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const planOrder = ["Twinkle", "Sparkle", "Shine"];

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editAdOpen, setEditAdOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [newAdImage, setNewAdImage] = useState(null);
  const [newAdImagePreview, setNewAdImagePreview] = useState(null);
  const [runningAds, setRunningAds] = useState([]);
  const [states, setStates] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [formData, setFormData] = useState({
    state: "",
    industry: ""
  });
  const [adTitle, setAdTitle] = useState("");
  const [adLink, setAdLink] = useState("");
  const [adActive, setAdActive] = useState(false);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await Data();  // returns { region: [...], industry: [...] }

        if (res.data.status) {
          setStates(res.data.region || []);
          setIndustries(res.data.industry || []);
        }

      } catch (err) {
        console.log("Failed to load filters", err);
      }
    };

    fetchFilters();
  }, []);

  const getUpgradeOptions = () => {
  if (!userProfile?.tier || userProfile.tier.toLowerCase() === "free") {
    return plans; // show all plans if free or none
  }

  const currentIndex = planOrder.findIndex(
    (p) => p.toLowerCase() === userProfile.tier.toLowerCase()
  );

  // Show only higher tiers
  return plans.filter((plan) => {
    const planIndex = planOrder.findIndex(
      (p) => p.toLowerCase() === plan.title.toLowerCase()
    );
    return planIndex > currentIndex;
  });
};

const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const res = await updatePassword({
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      });

      if (res.data.status) {
        toast.success(res.data.message || "Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(res.data.message || "Failed to update password");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  const [userProfile, setUserProfile] = useState({
    name: user?.name || "Guest User",
    email: user?.email || "guest@example.com",
    phone: user?.phone || "",
    businessId: user?.business_type  || "",
    businessType: userData?.user?.business_type  || "",
    stateId: user?.state || "",
    state: userData?.user?.state || "",
    dob: user?.dob || "",
    bio: user?.bio || "",
    tier: userData?.user?.tier_name || null,
    views: user?.views || 0,
    featured: user?.featured,
    featured_valid: user?.featured_valid,
    image: user?.image
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

  const fetchRunningAds = async () => {
    try {
      const res = await getAds();

      if (res.data.status) {
        setRunningAds(res.data.data);  // all ads from backend
      }

    } catch (error) {
      console.log("Failed to fetch running ads", error);
    }
  };

  useEffect(() => {
    fetchRunningAds();
  }, []);
  

  const [ads, setAds] = useState([
    { 
      id: 1, 
      title: "My Business Promotion", 
      description: "Promote my services",
      link: "https://example.com",
      active: true,
      image: null
    }
  ]);

  const handleEditAd = (ad) => {
    setSelectedAd(ad);
    setEditAdOpen(true);
  };

  const handleSaveAd = (updatedAd) => {
    setAds(prev => prev.map(a => 
      a.id === updatedAd.id ? updatedAd : a
    ));
  };

  const handleNewAdImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setNewAdImage(file); // <-- send FILE to backend

      const url = URL.createObjectURL(file);
      setNewAdImagePreview(url);
    }
  };

  const handleRemoveNewAdImage = () => {
    setNewAdImagePreview(null);
    setNewAdImage(null);
  };

  const handleCreateAd = async () => {
    const form = new FormData();
    form.append("user_id", user.id);
    form.append("title", adTitle);
    form.append("link", adLink);
    form.append("active", adActive ? 1 : 0);

    if (formData.state) form.append("region_id", formData.state);
    if (formData.industry) form.append("industry_id", formData.industry);

    if (newAdImage) {
      form.append("image", newAdImage);  
    }

    try {
      const res = await CreateAds(form);

      if (res.data.status) {
        toast.success("Ad created!");

        fetchRunningAds();

        setAdTitle("");
        setAdLink("");
        setNewAdImage(null);
        setNewAdImagePreview(null);
        setAdActive(false);
        setFormData({ state: "", industry: "" });
      }

    } catch (err) {
      console.log(err);
      toast.error("Ad creation failed");
    }
  };


  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
                    {userProfile.featured ? (
                      (() => {
                        const date = new Date(userProfile.featured_valid);
                        const formattedDate = date.toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        });

                        const today = new Date();
                        const diffTime = date - today;
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                        return (
                          <span>
                            Expires on <strong>{formattedDate}</strong>
                            {diffDays > 0
                              ? ` · ${diffDays} day${diffDays > 1 ? "s" : ""} left`
                              : " · Expired"}
                          </span>
                        );
                      })()
                    ) : (
                      "Upgrade to get featured"
                    )}
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
                  <Label>Industry</Label>
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
            {!userProfile.tier || userProfile.tier.toLowerCase() === "free plan" ? (
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
                        <li key={idx}>✔ {feature}</li>
                      ))
                    ) : (
                      <li className="text-muted-foreground">No features listed</li>
                    )}
                  </ul>
                </div>
                <div className="flex gap-3">
                  {getUpgradeOptions().length > 0 ? (
                    <>
                      <Button
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={() => setShowUpgrade(true)}
                      >
                        Upgrade Plan
                      </Button>

                      {/* Upgrade Modal */}
                      <Dialog open={showUpgrade} onOpenChange={setShowUpgrade}>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-heading text-center">
                              Upgrade Your Plan
                            </DialogTitle>
                            <p className="text-sm text-muted-foreground text-center">
                              You’re currently on <strong>{userProfile.tier}</strong> plan — select a higher tier to unlock more benefits.
                            </p>
                          </DialogHeader>

                          <div className="grid md:grid-cols-3 gap-6 mt-6">
                            {getUpgradeOptions().map((tier) => (
                              <MembershipCard
                                key={tier.id}
                                title={tier.title}
                                price={tier.price}
                                features={tier.features}
                                highlighted={tier.highlighted}
                                onJoin={() => {
                                  handleJoinTier(tier);
                                  setShowUpgrade(false); // close modal after joining
                                }}
                              />
                            ))}
                          </div>

                          <div className="pt-6 flex justify-center">
                            <Button variant="outline" onClick={() => setShowUpgrade(false)}>
                              Close
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </>
                  ) : (
                    <Button disabled className="opacity-60 cursor-not-allowed">
                      You’re already on the highest plan
                    </Button>
                  )}

                  {/* <Button variant="outline">Manage Subscription</Button> */}
                </div>
              </CardContent>
            </Card>
          )}
          </div>
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
                  <Input 
                    id="ad-title"
                    placeholder="Promote your business"
                    value={adTitle}
                    onChange={(e) => setAdTitle(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="ad-description">Ad Description</Label>
                  <Textarea id="ad-description" placeholder="Describe your ad..." />
                </div>

                <div>
                  <Label htmlFor="ad-link">CTA Link</Label>
                  <Input 
                    id="ad-link"
                    placeholder="https://..."
                    value={adLink}
                    onChange={(e) => setAdLink(e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ad-state">State</Label>
                    <Select 
                      value={formData.state} 
                      onValueChange={(value) => handleInputChange("state", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {states.map((s) => (
                          <SelectItem key={s.regionId} value={s.regionId.toString()}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ad-industry">Industry</Label>
                    <Select 
                      value={formData.industry} 
                      onValueChange={(value) => handleInputChange("industry", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Industry" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {industries.map((i) => (
                          <SelectItem key={i.industryId} value={i.industryId.toString()}>
                            {i.industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Ad Image</Label>
                  <div className="space-y-3">
                    {newAdImagePreview ? (
                      <div className="relative rounded-lg overflow-hidden border border-border">
                        <img 
                          src={newAdImagePreview} 
                          alt="Ad preview" 
                          className="w-full h-48 object-cover"
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setNewAdImage(null);
                            setNewAdImagePreview(null);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div 
                        className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                        onClick={() => document.getElementById('new-ad-image')?.click()}
                      >
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Click to upload image</p>
                      </div>
                    )}
                    <input
                      id="new-ad-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleNewAdImageUpload}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch 
                    id="ad-active"
                    checked={adActive}
                    onCheckedChange={setAdActive}
                  />
                  <Label htmlFor="ad-active">Active</Label>
                </div>

                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={handleCreateAd}
                >
                  Save Ad
                </Button>
              </div>

              
              <div className="pt-6 border-t">
                <h3 className="font-semibold mb-4">Your Ads</h3>
                <div className="space-y-3">
                  {ads.map((ad) => (
                    <div key={ad.id} className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                      {ad.image && (
                        <img 
                          src={ad.image} 
                          alt={ad.title} 
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold">{ad.title}</h4>
                        <p className="text-sm text-muted-foreground">{ad.description}</p>
                      </div>
                      <Badge variant={ad.active ? "default" : "secondary"}>
                        {ad.active ? "Active" : "Inactive"}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditAd(ad)}
                      >
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
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
                {Boolean(userProfile.featured)
                  ? "You're Featured!"
                  : "Upgrade to Get Featured!"}
              </h3>

              <p className="text-sm mb-4">
                {userProfile.featured
                  ? "Your profile is highlighted across the platform"
                  : "Get priority placement and visibility"}
              </p>

              {/* ✅ Button changes dynamically */}
              <Button
                onClick={() => !Boolean(userProfile.featured) && setActivationModalOpen(true)}
                className={`${
                  Boolean(userProfile.featured)
                    ? "bg-green-600 hover:bg-green-700 cursor-default"
                    : "bg-primary hover:bg-primary/90"
                } text-primary-foreground`}
                disabled={Boolean(userProfile.featured)}
              >
                {Boolean(userProfile.featured) ? "Activated" : "Activate"}
              </Button>

              {/* ✅ Expiry Info (only if featured active) */}
              {userProfile.featured && userProfile.featured_valid && (
                (() => {
                  const date = new Date(userProfile.featured_valid);
                  const formattedDate = date.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  });
                  const today = new Date();
                  const diffTime = date - today;
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                  return (
                    <p
                      className={`text-sm mt-3 ${
                        diffDays <= 0
                          ? "text-red-500"
                          : diffDays <= 3
                          ? "text-yellow-500"
                          : "text-muted-foreground"
                      }`}
                    >
                      Expires on <strong>{formattedDate}</strong>
                      {diffDays > 0
                        ? ` · ${diffDays} day${diffDays > 1 ? "s" : ""} left`
                        : " · Expired"}
                    </p>
                  );
                })()
              )}
            </div>
          </CardContent>
        </Card>
      );

      case "settings":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences and security
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* 🧾 Account Info */}
              <div className="space-y-4">
                <h3 className="font-semibold">Account Information</h3>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={userProfile.email}
                    disabled
                  />
                </div>
              </div>

              {/* 🔒 Change Password */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold">Change Password</h3>

                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <Button
                  onClick={handlePasswordChange}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update Password"}
                </Button>
              </div>

              {/* 🔔 Notifications Section (unchanged) */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold">Notifications</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive updates via email
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
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
          {/* <DashboardBanner
            icon="🎉"
            title="Become an Insider"
            description="Be visible to future clients by creating a profile in our directory."
            ctaText="Learn More"
            ctaLink="#"
            gradient="linear-gradient(135deg, #FFE9F2 0%, #FFF3F6 100%)"
          />
          <DashboardBanner
            icon="🍽️"
            title="Find an in-person event near you"
            description="Connect with other women in business at an upcoming event"
            ctaText="Find Events"
            ctaLink="#"
            gradient="linear-gradient(135deg, #FFF3F6 0%, #E7C8FF 100%)"
          /> */}

          <Card>
            <CardHeader>
              <CardTitle>Active Campaigns</CardTitle>
              <CardDescription>View all running ads in a carousel</CardDescription>
            </CardHeader>

            <CardContent>
              <Carousel className="w-full">
                <CarouselContent className="-ml-2">
                  {runningAds.filter(ad => ad.active).map((ad) => (
                    <CarouselItem key={ad.id} className="pl-2 md:basis-1/2 lg:basis-1/3">
                      <Card className="p-4 border border-border/60 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col gap-4">

                          {/* IMAGE */}
                          {ad.image && (
                            <div className="w-full h-40 rounded-lg overflow-hidden bg-muted border">
                              <img
                                src={ad.image}
                                alt={ad.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}

                          {/* TEXT CONTENT */}
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-foreground truncate">{ad.title}</h3>

                              <Badge variant={ad.createdBy === "admin" ? "default" : "secondary"}>
                                {ad.createdBy === "admin" ? "Platform" : "User"}
                              </Badge>
                            </div>

                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                              {ad.description}
                            </p>

                            {/* TAGS */}
                            <div className="flex gap-2 flex-wrap mb-2">
                              {ad.state && (
                                <Badge variant="outline" className="text-xs">{ad.state}</Badge>
                              )}
                              {ad.industry && (
                                <Badge variant="outline" className="text-xs">{ad.industry}</Badge>
                              )}
                            </div>

                            {/* LINK */}
                            {ad.link && (
                              <a
                                href={ad.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline inline-block"
                              >
                                Learn More →
                              </a>
                            )}
                          </div>
                        </div>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Navigation Buttons */}
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>

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

      <FeatureActivationModal 
        open={activationModalOpen} 
        onOpenChange={setActivationModalOpen}
      />

      <EditAdModal
        ad={selectedAd}
        open={editAdOpen}
        onOpenChange={setEditAdOpen}
        onSave={handleSaveAd}
      />
    </div>
  );
};

export default Dashboard;