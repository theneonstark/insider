import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PaymentModal = ({ isOpen, onClose, tier }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Payment Successful!",
        description: `You've successfully subscribed to ${tier.title}`,
      });
      setIsProcessing(false);
      onClose();
    }, 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!tier) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Complete Your Payment
          </DialogTitle>
          <DialogDescription>
            Subscribe to {tier.title} for {tier.price}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Cardholder Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              placeholder="4242 4242 4242 4242"
              maxLength="19"
              value={formData.cardNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                name="expiry"
                placeholder="MM/YY"
                maxLength="5"
                value={formData.expiry}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                name="cvc"
                placeholder="123"
                maxLength="3"
                value={formData.cvc}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-md">
            <Lock className="w-4 h-4" />
            <span>Your payment information is secure and encrypted</span>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isProcessing}
              className="flex-1"
            >
              {isProcessing ? "Processing..." : `Pay ${tier.price}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;