import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

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
    tier: "She Shine"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newUser = {
      ...formData,
      views: 0,
      featured: false,
      status: "Active",
      image: null
    };

    onAddUser(newUser);
    
    toast({
      title: "User Added",
      description: `${formData.name} has been successfully added.`,
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      businessType: "",
      state: "",
      dob: "",
      bio: "",
      tier: "She Shine"
    });
    
    onOpenChange(false);
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
            
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={(e) => handleChange("dob", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="businessType">Business Type</Label>
              <Input
                id="businessType"
                value={formData.businessType}
                onChange={(e) => handleChange("businessType", e.target.value)}
                placeholder="e.g., Marketing Expert"
              />
            </div>
            
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value)}
                placeholder="e.g., California"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="tier">Membership Tier *</Label>
            <Select value={formData.tier} onValueChange={(value) => handleChange("tier", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="She Shine">She Shine</SelectItem>
                <SelectItem value="She Sparkle">She Sparkle</SelectItem>
                <SelectItem value="Premium Elite">Premium Elite</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              placeholder="Brief description about the user..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add User
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;