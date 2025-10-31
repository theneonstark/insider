// resources/js/components/PaymentModal.jsx
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast"; // ← Sirf toast import kar

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const PaymentForm = ({ tier, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [cardComplete, setCardComplete] = useState(false);

  useEffect(() => {
    if (!clientSecret && tier?.price) {
      const amountInCents = Math.round(parseFloat(tier.price.replace(/[^0-9.-]+/g, "")) * 100);

      fetch("/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content,
        },
        body: JSON.stringify({ 
          amount: amountInCents,
          plan_title: tier.title, // ← DB ke liye
          tier_id: tier.id,  // ← YEH ADD KAR (Important!)
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            setError("Invalid response from server");
          }
        })
        .catch(() => {
          setError("Network error");
          toast.error("Failed to initialize payment. Try again.");
        });
    }
  }, [tier, clientSecret]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret || !cardComplete) return;

    setIsProcessing(true);
    setError(null);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    });

    if (error) {
      setError(error.message);
      toast.error(error.message || "Payment failed");
    } else {
      toast.success(`Subscribed to ${tier.title} for ${tier.price}! 🎉`);
      onClose();
    }
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Card Details</Label>
        <div className="p-3 border rounded-md bg-white">
          <CardElement
            onChange={(e) => {
              setCardComplete(e.complete);
              setError(e.error?.message || null);
            }}
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#1f2937",
                  "::placeholder": { color: "#9ca3af" },
                },
              },
            }}
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-md">
        <Lock className="w-4 h-4" />
        <span>Your payment information is secure and encrypted</span>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose} disabled={isProcessing} className="flex-1">
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isProcessing || !stripe || !elements || !clientSecret || !cardComplete}
          className="flex-1"
        >
          {isProcessing ? "Processing..." : `Pay ${tier.price}`}
        </Button>
      </div>
    </form>
  );
};

const PaymentModal = ({ isOpen, onClose, tier }) => {
  if (!tier) return null;

  return (
    <>
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
          <Elements stripe={stripePromise}>
            <PaymentForm tier={tier} onClose={onClose} />
          </Elements>
        </DialogContent>
      </Dialog>

      {/* Toaster - App.jsx ya Layout mein daal sakta hai */}
      {/* <Toaster position="top-right" /> */}
    </>
  );
};

export default PaymentModal;