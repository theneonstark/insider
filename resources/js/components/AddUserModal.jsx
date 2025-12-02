import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Data, addUser } from "@/lib/apis"; // ⬅ addUser API here

const AddUserModal = ({ open, onOpenChange, onAddUser }) => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessType: "",
    state: "",
    dob: "",
    bio: "",
    tier: "1", // default
    businessId: "",
    stateId: ""
  });

  const [dropdownData, setDropdownData] = useState({ industry: [], region: [] });
  const [loading, setLoading] = useState(false);

  // 🟢 Fetch dropdown
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
          toast.error("Unable to load dropdown data");
        }
      } catch (error) {
        toast.error("Error loading dropdown");
      }
    };
    fetchDropdownData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      dob: formData.dob,
      businessType: formData.businessType,
      industry_id: formData.businessId || null,
      region_id: formData.stateId || null,
      state: formData.state,
      tier: formData.tier,
      // bio: formData.bio,
    };

    try {
      const response = await addUser(payload);

      if (response.data.status === true) {
        toast({
          title: "User Added",
          description: `${formData.name} added successfully.`,
        });

        onAddUser(response.data.data); // return new user to parent list

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          businessType: "",
          state: "",
          dob: "",
          // bio: "",
          tier: "1",
          businessId: "",
          stateId: "",
        });

        onOpenChange(false);
      } else {
        toast.error(response.data.message || "Failed to add user");
      }
    } catch (err) {
      toast.error("Error adding user");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name + Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Full Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Email *</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Phone + DOB */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Phone</Label>
              <Input
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>

            <div>
              <Label>Date of Birth</Label>
              <Input
                type="date"
                value={formData.dob}
                onChange={(e) => handleChange("dob", e.target.value)}
              />
            </div>
          </div>

          {/* Industry + Region */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Industry</Label>
              <Select
                value={formData.businessId ? formData.businessId.toString() : ""}
                onValueChange={(value) => handleChange("businessId", parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="-- Select Industry --" />
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

            <div>
              <Label>State</Label>
              <Select
                value={formData.stateId ? formData.stateId.toString() : ""}
                onValueChange={(value) => handleChange("stateId", parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="-- Select State --" />
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
          </div>

          {/* Membership Tier */}
          <div>
            <Label>Membership Tier *</Label>
            <Select
              value={formData.tier}
              onValueChange={(value) => handleChange("tier", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Twinkle</SelectItem>
                <SelectItem value="2">Sparkle</SelectItem>
                <SelectItem value="3">Shine</SelectItem>
                <SelectItem value="4">Shine Plus</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bio */}
          {/* <div>
            <Label>Bio</Label>
            <Textarea
              value={formData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              rows={3}
            />
          </div> */}

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add User"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;