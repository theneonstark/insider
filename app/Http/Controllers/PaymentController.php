<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\PaymentIntent;
use Stripe\Stripe;

class PaymentController
{
    public function __construct()
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));
    }

    // Checkout page render (Inertia)
    // public function index()
    // {
    //     return Inertia::render('Checkout', [
    //         'stripeKey' => env('STRIPE_KEY'),
    //         'amount' => 2000000, // ₹20.00 (in paise)
    //     ]);
    // }

    // API to create PaymentIntent
    // PaymentController.php - createPaymentIntent
    public function createPaymentIntent(Request $request)
    {

        $request->validate([
            'amount' => 'required|integer|min:50',
            'plan_title' => 'required|string',
            'tier_id' => 'required|integer|exists:tiers,id', // ← YEH ADD KAR
        ]);

        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));

        $intent = \Stripe\PaymentIntent::create([
            'amount' => $request->amount,
            'currency' => 'usd',
            'payment_method_types' => ['card'],
            'metadata' => [
                'plan_title' => $request->plan_title,
                'tier_id' => $request->tier_id,     // ← YEH ADD KAR
                'user_id' => auth()->id(),
            ],
        ]);

        return response()->json(['clientSecret' => $intent->client_secret]);
    }
}
