import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { updateProfile } from "@/lib/apis";

const EditProfileModal = ({ profile, open, onOpenChange, onSave }) => {
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  useEffect(() => {
    if (profile) {
      setFormData({ ...profile });
    }
  }, [profile]);

  if (!formData) return null;

  const handleSave = async () => {
  setIsLoading(true);

  try {
    const response = await updateProfile(formData);
    // Axios already gives you the data
    if (response.status === 200) {
      onSave(formData); // Update local state if needed
      toast.success(response.data.message || "Profile updated successfully", {
        duration: 2000,
      });
      onOpenChange(false); // Close modal
    } else {
      throw new Error("Failed to update profile");
    }

  } catch (error) {
    console.error("Error updating profile:", error);
    toast.error("Failed to update profile. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">Edit Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone || ""}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="businessType">Business Type</Label>
            <Input
              id="businessType"
              value={formData.businessType || ""}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={formData.state || ""}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              value={formData.dob || ""}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              rows={4}
              value={formData.bio || ""}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell us about yourself and your business..."
            />
          </div>

          <div>
            <Label htmlFor="profilePic">Profile Picture URL</Label>
            <Input
              id="profilePic"
              value={formData.image || ""}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSave}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading} // Disable cancel button while loading
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
};

export default EditProfileModal;