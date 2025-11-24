import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { usePage } from "@inertiajs/react";

const ProfileViewModal = ({ profile, open, onOpenChange, onEdit, onViewIncrement }) => {
  const { props } = usePage();
  
  const role = props?.auth?.user?.role
  
   useEffect(() => {
    if (open && profile && onViewIncrement) {
      // Increment view counter when modal fully opens
      onViewIncrement();
    }
  }, [open, profile, onViewIncrement]);

  if (!profile) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">Profile Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Profile Picture */}
          {profile.image && (
            <div className="flex justify-center">
              <img 
                src={role === "admin"
                      ? `../${profile.image}`
                      : `${profile.image}`
                    }
                alt={profile.name}
                className="w-32 h-32 rounded-full object-cover shadow-[var(--shadow-card)]"
              />
            </div>
          )}
          
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Name</label>
              <p className="text-lg font-semibold">{profile.name}</p>
            </div>
            
            {/* <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-lg">{profile.email}</p>
            </div> */}
            
            {/* {profile.phone && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                <p className="text-lg">{profile.phone}</p>
              </div>
            )} */}
            
            {profile.businessType && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Business Type</label>
                <p className="text-lg">{profile.businessType}</p>
              </div>
            )}
            
            {profile.state && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">State</label>
                <p className="text-lg">{profile.state}</p>
              </div>
            )}
            
            {profile.dob && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                <p className="text-lg">{profile.dob}</p>
              </div>
            )}
          </div>
          
          {/* Bio */}
          {profile.bio && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">Bio</label>
              <p className="text-base mt-2 leading-relaxed">{profile.bio}</p>
            </div>
          )}
          
          {/* Membership & Views */}
          <div className="flex items-center gap-4 pt-4 border-t">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Membership Tier</label>
              <Badge className="mt-1 bg-primary text-primary-foreground">{profile.tier}</Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              <div>
                <label className="text-sm font-medium text-muted-foreground">Profile Views</label>
                <p className="text-lg font-semibold">{profile.views}</p>
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
                  Edit Profile
                </Button>
              )}
            <Button 
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
      <Toaster/>
    </Dialog>
  );
};

export default ProfileViewModal;