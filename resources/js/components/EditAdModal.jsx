import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Upload, X } from "lucide-react";
import toast from "react-hot-toast";
import { updateAdStatus, Data, updateAd } from "@/lib/apis";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const EditAdModal = ({ ad, open, onOpenChange }) => {
  const fileInputRef = useRef(null);

  const [states, setStates] = useState([]);
  const [industries, setIndustries] = useState([]);

  const [imagePreview, setImagePreview] = useState(null);
  const [removeOldImage, setRemoveOldImage] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    link: "",
    state: "",
    industry: "",
    start_date: "",
    end_date: "",
    image: null,
    active: true,
  });

  // Load State + Industry
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await Data();
        if (res.data.status) {
          setStates(res.data.region || []);
          setIndustries(res.data.industry || []);
        }
      } catch {
        console.log("Failed to load filters");
      }
    };

    fetchFilters();
  }, []);

  // Load selected ad data
  useEffect(() => {
    if (ad) {
      setFormData({
        title: ad.title || "",
        link: ad.link || "",
        state: ad.region_id ? String(ad.region_id) : "",        // FIXED
        industry: ad.industry_id ? String(ad.industry_id) : "", // FIXED
        start_date: ad.start_date || "",
        end_date: ad.end_date || "",
        image: null,
        active: Number(ad.active) === 1,
      });

      setImagePreview(null);
      setRemoveOldImage(false);
    }
  }, [ad]);


  // Save Ad
  const handleSave = () => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    const updated = new FormData();
    updated.append("title", formData.title);
    updated.append("link", formData.link);
    updated.append("region_id", formData.state);
    updated.append("industry_id", formData.industry);
    updated.append("start_date", formData.start_date);
    updated.append("end_date", formData.end_date);
    updated.append("active", formData.active ? 1 : 0);

    if (formData.image instanceof File) {
      updated.append("image", formData.image);
    }

    if (removeOldImage) {
      updated.append("remove_image", 1);
    }

    updateAd(ad.id, updated)
      .then((res) => {
        if (res.data.status) {
          toast.success("Ad updated successfully!");
          window.location.reload();
        } else {
          toast.error("Failed to update ad");
        }
        onOpenChange(false);
      })
      .catch(() => toast.error("Error updating ad"));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large");
      return;
    }

    setFormData((prev) => ({ ...prev, image: file }));
    setImagePreview(URL.createObjectURL(file));
    setRemoveOldImage(true);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: null }));
    setRemoveOldImage(true);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleStatusToggle = async (checked) => {
    setFormData((prev) => ({ ...prev, active: checked }));

    try {
      const res = await updateAdStatus(ad.id, { active: checked ? 1 : 0 });
      if (res.data.status) toast.success("Status updated");
      else toast.error("Failed to update");
    } catch {
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
            <Label>Ad Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter ad title"
            />
          </div>

          {/* Link */}
          <div className="space-y-2">
            <Label>Link URL</Label>
            <Input
              value={formData.link}
              onChange={(e) => handleInputChange("link", e.target.value)}
              placeholder="https://..."
            />
          </div>

          {/* State + Industry */}
          <div className="grid md:grid-cols-2 gap-4">

            {/* State */}
            <div className="space-y-2">
              <Label>State</Label>
              <Select
                value={formData.state || ""}
                onValueChange={(value) => handleInputChange("state", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>

                <SelectContent>
                  {states.map((s) => (
                    <SelectItem key={s.regionId} value={s.regionId.toString()}>
                      {s.regionName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Industry */}
            <div className="space-y-2">
              <Label>Industry</Label>
              <Select
                value={formData.industry || ""}
                onValueChange={(value) => handleInputChange("industry", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>

                <SelectContent>
                  {industries.map((i) => (
                    <SelectItem key={i.industryId} value={i.industryId.toString()}>
                      {i.industryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

          </div>

          {/* Start + End Dates */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                type="date"
                value={formData.start_date}
                onChange={(e) => handleInputChange("start_date", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                type="date"
                value={formData.end_date}
                onChange={(e) => handleInputChange("end_date", e.target.value)}
              />
            </div>
          </div>

          {/* Image */}
          <div className="space-y-2">
            <Label>Ad Image</Label>

            <div className="space-y-3">
              {(imagePreview || (!removeOldImage && ad?.image)) ? (
                <div className="relative rounded-lg overflow-hidden border">
                  <img
                    src={imagePreview || `../${ad.image}`}
                    alt="Ad preview"
                    className="w-full h-48 object-cover"
                  />

                  <Button
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
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload image</p>
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

          {/* Status */}
          <div className="flex items-center gap-2">
            <Switch
              checked={formData.active}
              onCheckedChange={handleStatusToggle}
            />
            <Label>Active</Label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button className="flex-1" onClick={handleSave}>Save Changes</Button>
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>Cancel</Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditAdModal;