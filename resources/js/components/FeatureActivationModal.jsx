import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { getFeatured } from "@/lib/apis"; // ⬅ WAPAS ADD

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

// ----------------------------------
// STRIPE PAYMENT FORM
// ----------------------------------
const StripeCardForm = ({ days, clientSecret, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setProcessing(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(`Payment successful! Feature will activate shortly.`);
      onClose();
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <Label>Card Details</Label>

      <div className="border p-3 rounded-md bg-white">
        <CardElement
          options={{
            style: {
              base: { fontSize: "16px", "::placeholder": { color: "#9ca3af" } },
            },
          }}
        />
      </div>

      <Button disabled={processing} className="w-full">
        {processing ? "Processing..." : `Pay $${days}`}
      </Button>
    </form>
  );
};

// ----------------------------------
// MAIN MODAL WITH BOTH STEPS
// ----------------------------------
const FeatureActivationModal = ({ open, onOpenChange }) => {
  const [days, setDays] = useState("");
  const [step, setStep] = useState(1);
  const [clientSecret, setClientSecret] = useState("");

  const handleNext = async (e) => {
    e.preventDefault();

    if (!days || Number(days) <= 0) {
      toast.error("Please enter valid number of days");
      return;
    }

    // CALL YOUR API getFeatured()
    try {
      const res = await getFeatured({ days: Number(days) });

      if (!res.data.clientSecret) {
        toast.error("Failed to initialize payment");
        return;
      }

      setClientSecret(res.data.clientSecret);
      setStep(2); // Go to Payment Step
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };

  const closeAll = () => {
    setDays("");
    setClientSecret("");
    setStep(1);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={closeAll}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? "Activate Feature" : `Pay for ${days} Days`}
          </DialogTitle>
        </DialogHeader>

        {/* STEP 1 → INPUT DAYS */}
        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-4">
            <Label htmlFor="days">Number of Days</Label>
            <Input
              id="days"
              type="number"
              placeholder="Enter number of days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              min="1"
            />

            <div className="flex gap-3">
              <Button className="flex-1" type="submit">
                Continue
              </Button>
              <Button className="flex-1" type="button" variant="outline" onClick={closeAll}>
                Cancel
              </Button>
            </div>
          </form>
        )}

        {/* STEP 2 → STRIPE PAYMENT */}
        {step === 2 && (
          <Elements stripe={stripePromise}>
            <StripeCardForm
              days={Number(days)}
              clientSecret={clientSecret}
              onClose={closeAll}
            />
          </Elements>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FeatureActivationModal;