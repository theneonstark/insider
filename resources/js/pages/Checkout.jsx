import React, { useEffect, useState } from 'react';
import { usePage, Head } from '@inertiajs/react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Stripe instance
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  // Step 1: Create PaymentIntent on mount
 useEffect(() => {
    fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
      },
      body: JSON.stringify({ amount }), // amount in paise
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch(() => setError('Failed to initialize payment'));
  }, [amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
    } else if (paymentIntent.status === 'succeeded') {
      alert('Payment Successful! 🎉');
      // Optional: redirect or update UI
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Pay ₹{amount / 100}</h2>

      <div className="mb-4 p-3 border rounded">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' },
              },
            },
          }}
        />
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <button
        type="submit"
        disabled={!stripe || processing || !clientSecret}
        className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
      >
        {processing ? 'Processing...' : `Pay ₹${amount / 100}`}
      </button>
    </form>
  );
};

export default function Checkout() {
  const { stripeKey, amount } = usePage().props;

  return (
    <>
      <Head title="Checkout" />
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Secure Checkout</h1>

          <Elements stripe={stripePromise}>
            <CheckoutForm amount={amount} />
          </Elements>
        </div>
      </div>
    </>
  );
}