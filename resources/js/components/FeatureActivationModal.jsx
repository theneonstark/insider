import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { getFeatured } from "@/lib/apis";

const FeatureActivationModal = ({ open, onOpenChange }) => {
  const [days, setDays] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!days || days <= 0) {
    toast.error("Please enter a valid number of days");
    return;
  }

  try {
    const res = await getFeatured({ days: parseInt(days) });

    if (res.data.status) {
      toast.success(res.data.message || "Feature activated successfully!");
      setDays("");
      onOpenChange(false);
    } else {
      toast.error(res.data.message || "Failed to activate feature");
    }
  } catch (error) {
    toast.error("Something went wrong while activating the feature.");
    console.error(error);
  }
};


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Activate Feature</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="days">Number of Days</Label>
            <Input
              id="days"
              type="number"
              placeholder="Enter number of days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              min="1"
            />
          </div>
          <div className="flex gap-3">
            <Button type="submit" className="flex-1">
              Activate
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureActivationModal;