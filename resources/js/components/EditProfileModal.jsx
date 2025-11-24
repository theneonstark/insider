import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { updateProfile, Data } from "@/lib/apis";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const EditProfileModal = ({ profile, open, onOpenChange, onSave }) => {
  const [formData, setFormData] = useState(null);
  const [dropdownData, setDropdownData] = useState({ industry: [], region: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownLoading, setIsDropdownLoading] = useState(true);
  const [preview, setPreview] = useState(null);

  // 🟢 Load profile into form state
  useEffect(() => {
    if (profile) {
      setFormData({ ...profile });
      if (typeof profile.image === "string" && profile.image.trim() !== "") {
        setPreview(profile.image);
      } else {
        setPreview(null);
      }
    }
  }, [profile]);

  // 🧹 Clean up blob URL on unmount
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // 🟢 Fetch dropdown data (industry + region)
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const response = await Data();
        if (response.status === 200 && response.data.status === true) {
          setDropdownData({
            industry: response.data.industry || [],
            region: response.data.region || [],
          });
        } else {
          toast.error("Failed to load dropdown data.");
        }
      } catch (error) {
        console.error("Dropdown fetch error:", error);
        toast.error("Unable to load dropdowns.");
      } finally {
        setIsDropdownLoading(false);
      }
    };
    fetchDropdownData();
  }, []);

  if (!formData) return null;

  // 🟢 Handle image upload preview safely
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🟢 Handle Save — auto FormData switch
  const handleSave = async () => {
    setIsLoading(true);
    try {
      let dataToSend = formData;
      let isFileUpload = false;

      // detect if image is a File
      if (formData.image instanceof File) {
        const fd = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          fd.append(key, value ?? "");
        });
        dataToSend = fd;
        isFileUpload = true;
      }

      const response = await updateProfile(dataToSend, isFileUpload);

      if (response.status === 200) {
        onSave(formData);
        toast.success(response.data.message || "Profile updated successfully", { duration: 2000 });
        onOpenChange(false);
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

        {isDropdownLoading ? (
          <div className="text-center py-6">Loading dropdown data...</div>
        ) : (
          <div className="space-y-4 py-4">
            {/* Name */}
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value.trimStart() })}
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value.trimStart() })}
              />
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone || ""}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            {/* Industry */}
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Select
                value={formData.businessId ? formData.businessId.toString() : ""}
                onValueChange={(value) => setFormData({ ...formData, businessId: parseInt(value) })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      dropdownData.industry.find((i) => i.industryId === formData.businessId)
                        ?.industryName || "-- Select Industry --"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {dropdownData.industry.map((item) => (
                    <SelectItem key={item.industryId} value={item.industryId.toString()}>
                      {item.industryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Region */}
            <div>
              <Label htmlFor="region">State</Label>
              <Select
                value={formData.stateId ? formData.stateId.toString() : ""}
                onValueChange={(value) => setFormData({ ...formData, stateId: parseInt(value) })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      dropdownData.region.find((r) => r.regionId === formData.stateId)?.regionName ||
                      "-- Select State --"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {dropdownData.region.map((item) => (
                    <SelectItem key={item.regionId} value={item.regionId.toString()}>
                      {item.regionName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* DOB */}
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={formData.dob || ""}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              />
            </div>

            {/* Bio */}
            {/* <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                rows={4}
                value={formData.bio || ""}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell us about yourself and your business in 250 words or less."
              />
            </div> */}

            {/* Profile Picture */}
            <div className="flex flex-col items-start gap-3">
              <Label htmlFor="image">Profile Picture</Label>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Avatar Preview */}
                <div className="relative">
                  <img
                    src={
                      preview
                        ? preview
                        : typeof formData.image === "string"
                        ? formData.image
                        : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    }
                    alt="Profile"
                    className="h-28 w-28 rounded-full object-cover border shadow-sm"
                  />
                  {preview && (
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, image: null });
                        setPreview(null);
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full text-xs px-1.5 py-0.5 hover:bg-red-600"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Upload Button */}
                <div>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("image").click()}
                  >
                    {preview ? "Change Photo" : "Upload Photo"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSave}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
              <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
      <Toaster />
    </Dialog>
  );
};

export default EditProfileModal;