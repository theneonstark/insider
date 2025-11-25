import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { CreateAds } from "@/lib/apis";  // ⬅ API to create ad + get clientSecret

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

// ---------------------------------------------
// STRIPE PAYMENT FORM
// ---------------------------------------------
const StripeCardForm = ({ amount, clientSecret, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePay = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Ad payment successful!");
      onSuccess();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handlePay} className="space-y-4 mt-4">
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

      <Button disabled={loading} className="w-full">
        {loading ? "Processing..." : `Pay $${amount}`}
      </Button>
    </form>
  );
};

// ---------------------------------------------
// MAIN AD PAYMENT MODAL (STEP 1 → STEP 2)
// ---------------------------------------------
const AdPaymentModal = ({ open, onOpenChange, adForm }) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(0);
  const [clientSecret, setClientSecret] = useState("");

  const closeModal = () => {
    setStep(1);
    setAmount(0);
    setClientSecret("");
    onOpenChange(false);
  };

  // Step 1 → Calculate payable amount & request clientSecret
  const handleProceed = async () => {
    const start = new Date(adForm.start_date);
    const end = new Date(adForm.end_date);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const payable = days * 1; // $1 per day
    setAmount(payable);

    try {
      const form = new FormData();
      Object.entries(adForm).forEach(([key, val]) => {
        if (val !== null && val !== undefined) form.append(key, val);
      });

      const res = await CreateAds(form);

      if (!res.data.clientSecret) {
        toast.error("Unable to initialize payment!");
        return;
      }

      setClientSecret(res.data.clientSecret);
      setStep(2);
    } catch (error) {
      console.log(error);
      toast.error("Payment initialization failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? "Confirm Ad Payment" : `Pay $${amount}`}
          </DialogTitle>
        </DialogHeader>

        {/* STEP 1 → SHOW SUMMARY */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-sm">
              You will be charged <b>$1 per day</b> for your selected date range.
            </p>

            <Button onClick={handleProceed} className="w-full">
              Proceed to Pay
            </Button>

            <Button variant="outline" className="w-full" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        )}

        {/* STEP 2 → STRIPE PAYMENT */}
        {step === 2 && (
          <Elements stripe={stripePromise}>
            <StripeCardForm
              amount={amount}
              clientSecret={clientSecret}
              onSuccess={closeModal}
            />
          </Elements>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdPaymentModal;