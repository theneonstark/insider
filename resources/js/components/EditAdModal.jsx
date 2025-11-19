import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Upload, X } from "lucide-react";
import toast from "react-hot-toast";
import { updateAdStatus } from "@/lib/apis";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const EditAdModal = ({ ad, open, onOpenChange, onSave }) => {
  const fileInputRef = useRef(null);

  const [imagePreview, setImagePreview] = useState(null);
  const [removeOldImage, setRemoveOldImage] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    link: "",
    image: null,
    active: true
  });

  // Load ad data when modal opens
  useEffect(() => {
    if (ad) {
      setFormData({
        title: ad.title || "",
        link: ad.link || "",
        image: null, // file not pre-filled
        active: ad.active ?? true
      });

      setImagePreview(null); // no local preview yet
      setRemoveOldImage(false); // allow DB image to show
    }
  }, [ad]);

  const handleSave = () => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    const updated = new FormData();
    updated.append("title", formData.title);
    updated.append("link", formData.link);
    updated.append("active", formData.active ? 1 : 0);

    // If new file selected → send file
    if (formData.image instanceof File) {
      updated.append("image", formData.image);
    }

    // If old image was removed → tell backend
    if (removeOldImage) {
      updated.append("remove_image", 1);
    }

    onSave(ad.id, updated);
    onOpenChange(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle new uploaded image
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large");
      return;
    }

    setFormData(prev => ({ ...prev, image: file }));
    setImagePreview(URL.createObjectURL(file)); // local preview
    setRemoveOldImage(true); // hide old DB image
  };

  // Cross Button
  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, image: null }));
    setRemoveOldImage(true); // DO NOT show DB image

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleStatusToggle = async (checked) => {
  setFormData(prev => ({ ...prev, active: checked }));

  try {
    const res = await updateAdStatus(ad.id, { active: checked ? 1 : 0 });
    
    if (res.data.status) {
      toast.success("Status updated");
    } else {
      toast.error("Failed to update");
    }
  } catch (err) {
    console.error(err);
    toast.error("Error updating status");
  }
};


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Advertisement</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="ad-title">Ad Title</Label>
            <Input
              id="ad-title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter ad title"
            />
          </div>

          {/* Link */}
          <div className="space-y-2">
            <Label htmlFor="ad-link">Link URL</Label>
            <Input
              id="ad-link"
              value={formData.link}
              onChange={(e) => handleInputChange("link", e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ad-state">State</Label>
              <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="new-york">New York</SelectItem>
                  <SelectItem value="los-angeles">Los Angeles</SelectItem>
                  <SelectItem value="chicago">Chicago</SelectItem>
                  <SelectItem value="houston">Houston</SelectItem>
                  <SelectItem value="california">California</SelectItem>
                  <SelectItem value="texas">Texas</SelectItem>
                  <SelectItem value="florida">Florida</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ad-industry">Industry</Label>
              <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="creative">Creative Services</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>
        </div>

          {/* Image */}
          <div className="space-y-2">
            <Label>Ad Image</Label>

            <div className="space-y-3">
              {(imagePreview || (!removeOldImage && ad?.image)) ? (
                <div className="relative rounded-lg overflow-hidden border border-border">
                  <img
                    src={
                      imagePreview
                        ? imagePreview
                        : !removeOldImage && ad?.image
                          ? `../${ad.image}`
                          : null
                    }
                    alt="Ad preview"
                    className="w-full h-48 object-cover"
                  />

                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload image</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          {/* Active Switch */}
          <div className="flex items-center gap-2">
            <Switch 
            id="ad-active"
            checked={formData.active}
            onCheckedChange={handleStatusToggle}
            />

            <Label htmlFor="ad-active">Active</Label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} className="flex-1">
              Save Changes
            </Button>

            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditAdModal;