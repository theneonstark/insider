import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { router, usePage } from "@inertiajs/react";
import { acceptConnectionRequest, fetchConnectionStatus, sendConnectionRequest } from "@/lib/apis";

const FriendViewModal = ({ data, open, onOpenChange, onEdit, onViewIncrement }) => {
    console.log(data);
    
  const { props } = usePage();
  const user = props?.auth?.user;
  const role = props?.auth?.user?.role;

  const [connectionStatus, setConnectionStatus] = useState("none");
  const [connectionId, setConnectionId] = useState(null);
  const [views, setViews] = useState(parseInt(data?.views) || 0);


  useEffect(() => {
    if (open && data) {
      setViews(prev => prev + 1);   // UI instantly updates
      // onViewIncrement();           // backend increment
    }
  }, [open]);

  

  // Load connection status when modal opens
  useEffect(() => {
    if (open && data) {
      loadConnectionStatus();
    }
  }, [open]);


  const loadConnectionStatus = async () => {
    try {
      const res = await fetchConnectionStatus(data.id);
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
      await sendConnectionRequest(user, data.id);
      toast.success("Connection Request Sent!");
      loadConnectionStatus(); // reload new status
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error!");
    }
  };


  // Dynamic Button
  const renderConnectButton = () => {
    if (!user) {
      return (
        <Button onClick={() => router.visit("/login")}>
          Let's Connect
        </Button>
      );
    }

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


  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">data Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">

          {/* data Picture */}
          {data.image && (
            <div className="flex justify-center">
              <img
                src={role === "admin" ? `../${data.image}` : `${data.image}`}
                alt={data.name}
                className="w-32 h-32 rounded-full object-cover shadow-[var(--shadow-card)]"
              />
            </div>
          )}

          {/* Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Name</label>
              <p className="text-lg font-semibold">{data.name}</p>
            </div>

            {data.businessType && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Business Type</label>
                <p className="text-lg">{data.businessType}</p>
              </div>
            )}

            {data.region?.regionName && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">State</label>
                <p className="text-lg">{data.region.regionName}</p>
              </div>
            )}

            {data.dob && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                <p className="text-lg">{data.dob}</p>
              </div>
            )}
          </div>


          {/* Membership */}
          <div className="flex items-center gap-4 pt-4 border-t">
            <div className="flex flex-col items-center">
              <label className="text-sm font-medium text-muted-foreground">Membership Tier</label>
              <Badge className="mt-1 p-1 bg-primary text-primary-foreground">
                {data?.tier}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              <div>
                <label className="text-sm font-medium text-muted-foreground">data Views</label>
                <p className="text-lg font-semibold">{views}</p>
              </div>
            </div>
          </div>


          {/* Actions */}
          <div className="flex gap-3 pt-4">

            {role !== "admin" && onEdit && (
              <Button
                onClick={onEdit}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Edit data
              </Button>
            )}

            {renderConnectButton()}  {/* FIXED BUTTON */}

            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>

          </div>
        </div>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
};

export default FriendViewModal;