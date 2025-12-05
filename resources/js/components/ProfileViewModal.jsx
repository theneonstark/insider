import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { router, usePage } from "@inertiajs/react";
import { acceptConnectionRequest, fetchConnectionStatus, sendConnectionRequest } from "@/lib/apis";

const ProfileViewModal = ({ profile, open, onOpenChange, onEdit, onViewIncrement }) => {

  const { props } = usePage();
  const user = props?.auth?.user;
  const role = props?.auth?.user?.role;

  const [connectionStatus, setConnectionStatus] = useState("none");
  const [connectionId, setConnectionId] = useState(null);



const [views, setViews] = useState(Number(profile?.views || 0));

useEffect(() => {
  setViews(Number(profile?.views || 0));
}, [profile, open]);

  

  // Load connection status when modal opens
  useEffect(() => {
    if (open && profile) {
      loadConnectionStatus();
    }
  }, [open]);


  const loadConnectionStatus = async () => {
    try {
      const res = await fetchConnectionStatus(profile.id);
      setConnectionStatus(res.data.status);
      setConnectionId(res.data.connection_id);
    } catch (err) {
      console.log(err);
    }
  };


  const handleConnect = async () => {
    if (!user) {
      return router.visit("/login");
    }

    try {
      await sendConnectionRequest(user, profile.id);
      toast.success("Connection Request Sent!");
      loadConnectionStatus(); // reload new status
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error!");
    }
  };


  // Dynamic Button
  const renderConnectButton = () => {

    // 🌐 Non-logged users → show button directing to login
    if (!user) {
      return (
        <Button onClick={() => router.visit("/login")}>
          Let's Connect
        </Button>
      );
    }

    // Logged-in users (not self)
    if (connectionStatus === "accepted") {
      return (
        <Button disabled className="bg-green-600 text-white">
          Connected
        </Button>
      );
    }

    if (connectionStatus === "sent") {
      return (
        <Button disabled className="bg-yellow-500 text-white">
          Request Sent
        </Button>
      );
    }

    if (connectionStatus === "received") {
      return (
        <Button
          onClick={async () => {
            await acceptConnectionRequest(connectionId);
            toast.success("Request Accepted!");
            loadConnectionStatus();
          }}
          className="bg-blue-600 text-white"
        >
          Accept Request
        </Button>
      );
    }

    return (
      <Button onClick={handleConnect}>
        Let's Connect
      </Button>
    );
  };



  if (!profile) return null;

  return (
   <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-3xl rounded-2xl p-0 overflow-hidden shadow-2xl border border-border bg-background">
      
      {/* HEADER BANNER */}
      <div className="w-full h-40 bg-gradient-to-r from-primary/80 to-pink-500/80 flex items-end px-6 py-4">
        <DialogTitle className="text-3xl font-bold text-white drop-shadow-lg">
          {profile?.name}
        </DialogTitle>
      </div>

      <div className="px-8 py-6 space-y-10">

        {/* PROFILE IMAGE + STATS */}
        <div className="flex flex-col items-center -mt-20">
          <img
            src={role === "admin" ? `../${profile.image}` : profile.image}
            alt={profile.name}
            className="w-36 h-36 rounded-full object-cover ring-4 ring-white shadow-xl"
          />

          <div className="flex items-center gap-3 mt-4">
            <Badge className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full shadow">
              {profile?.tier?.tier_name || "Member"}
            </Badge>

            <div className="flex items-center bg-muted px-3 py-1 rounded-full shadow-sm border">
              <Eye className="w-4 h-4 text-primary mr-1" />
              <span className="font-semibold">{views}</span>
            </div>
          </div>
        </div>

        {/* INFO GRID */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Full Name</p>
            <p className="text-lg font-semibold">{profile.name}</p>
          </div>

          {profile?.businessType && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Business Type</p>
              <p className="text-lg">{profile.businessType}</p>
            </div>
          )}

          {profile?.region?.regionName && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">State</p>
              <p className="text-lg">{profile.region.regionName}</p>
            </div>
          )}

          {profile?.dob && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Date of Birth</p>
              <p className="text-lg">{profile.dob}</p>
            </div>
          )}

          {profile?.bio && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Date of Birth</p>
              <p className="text-lg">{profile.bio || "User not set the bio"}</p>
            </div>
          )}
        </div>

        {/* CONNECTION + ACTIONS */}
        <div className="flex flex-wrap justify-between gap-3 pt-6 border-t">
          
          <div className="flex gap-3">
            {role !== "admin" && onEdit && (
              <Button
                onClick={onEdit}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md px-6"
              >
                Edit Profile
              </Button>
            )}

            {/* CONNECT BUTTON */}
            {renderConnectButton && (
              <div className="shadow-md">{renderConnectButton()}</div>
            )}
          </div>

          <Button
            variant="outline"
            className="px-6 shadow-sm"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>

      </div>

      <Toaster />
    </DialogContent>
  </Dialog>

  );
};

export default ProfileViewModal;