<?php
// app/Http/Controllers/StripeWebhookController.php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Stripe\Webhook;
use Stripe\Exception\SignatureVerificationException;

class StripeWebhookController
{
    public function __invoke(Request $request)
    {
        // 1. Stripe secret key
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));

        // 2. Webhook secret (from .env)
        $endpointSecret = env('STRIPE_WEBHOOK_SECRET');

        // 3. Payload aur signature
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');

        try {
            // 4. Verify webhook
            $event = Webhook::constructEvent($payload, $sigHeader, $endpointSecret);
        } catch (SignatureVerificationException $e) {
            \Log::error('Webhook signature failed: ' . $e->getMessage());
            return response('Invalid signature', 400);
        } catch (\Exception $e) {
            \Log::error('Webhook error: ' . $e->getMessage());
            return response('Error', 400);
        }

        // 5. Sirf success event handle karo
        // StripeWebhookController.php → __invoke method ke andar

if ($event->type === 'payment_intent.succeeded') {
    $pi = $event->data->object;

    $userId = $pi->metadata->user_id ?? null;
    $tierId = $pi->metadata->tier_id ?? null;

    if (!$userId || !$tierId) {
        \Log::warning('Missing user_id or tier_id in metadata', ['pi_id' => $pi->id]);
        return response('Missing metadata', 400);
    }

    // 1. Payment save
    Payment::updateOrCreate(
        ['payment_intent_id' => $pi->id],
        [
            'user_id' => $userId,
            'plan_title' => $pi->metadata->plan_title ?? 'Unknown',
            'tier_id' => $tierId,
            'amount' => $pi->amount_received / 100,
            'currency' => strtoupper($pi->currency),
            'status' => 'succeeded',
            'stripe_data' => $pi->toArray(),
        ]
    );

    // 2. User ka tier update kar
    $user = \App\Models\User::find($userId);
    if ($user) {
        $user->tier_id = $tierId;
        $user->save();
        \Log::info('User tier updated', ['user_id' => $userId, 'tier_id' => $tierId]);
    } else {
        \Log::error('User not found for tier update', ['user_id' => $userId]);
    }
}

        // 6. Stripe ko batao: "Received!"
        return response('Webhook received', 200);
    }
}