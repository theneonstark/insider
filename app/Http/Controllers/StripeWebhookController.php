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
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));

        $endpointSecret = env('STRIPE_WEBHOOK_SECRET');
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');

        try {
            $event = Webhook::constructEvent($payload, $sigHeader, $endpointSecret);
        } catch (SignatureVerificationException $e) {
            \Log::error('Webhook signature failed: ' . $e->getMessage());
            return response('Invalid signature', 400);
        } catch (\Exception $e) {
            \Log::error('Webhook error: ' . $e->getMessage());
            return response('Error', 400);
        }

        // -----------------------------------------------------------
        // ONLY HANDLE SUCCESS EVENT
        // -----------------------------------------------------------
        if ($event->type === 'payment_intent.succeeded') {

            $pi = $event->data->object;
            $paymentType = $pi->metadata->payment_type ?? null;

            // **************************************
            // MEMBERSHIP PAYMENT (EXISTING CODE)
            // **************************************
            if ($paymentType === "membership") {

                $userId = $pi->metadata->user_id ?? null;
                $tierId = $pi->metadata->tier_id ?? null;

                if (!$userId || !$tierId) {
                    \Log::warning('Missing membership metadata', ['pi_id' => $pi->id]);
                    return response('Missing metadata', 400);
                }

                // Save payment
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

                // Update user tier
                $user = \App\Models\User::find($userId);
                if ($user) {
                    $user->tier_id = $tierId;
                    $user->save();
                    \Log::info('User tier updated', ['user_id' => $userId, 'tier_id' => $tierId]);
                } else {
                    \Log::error('User not found', ['user_id' => $userId]);
                }
            }

            // **************************************
            // FEATURE PAYMENT (NEW CODE)
            // **************************************
            if ($paymentType === "feature") {

                $userId = $pi->metadata->user_id ?? null;
                $days = intval($pi->metadata->days ?? 0);
                $planTitle = $pi->metadata->plan_title ?? "Feature Purchase";

                if (!$userId || $days <= 0) {
                    \Log::warning('Missing feature metadata', ['pi_id' => $pi->id]);
                    return response('Missing feature metadata', 400);
                }

                // Save payment in SAME TABLE
                Payment::updateOrCreate(
                    ['payment_intent_id' => $pi->id],
                    [
                        'user_id' => $userId,
                        'plan_title' => $planTitle, // Example: Feature for 5 days
                        'tier_id' => null, // Feature has no tier
                        'amount' => $pi->amount_received / 100,
                        'currency' => strtoupper($pi->currency),
                        'status' => 'succeeded',
                        'stripe_data' => $pi->toArray(),
                    ]
                );

                // Extend feature activation
                $user = \App\Models\User::find($userId);

                if ($user) {
                    $start = ($user->featured_valid && $user->featured_valid > now())
                        ? $user->featured_valid
                        : now();
                    $user->featured = 1;
                    $user->featured_valid = $start->copy()->addDays($days);
                    $user->save();

                    \Log::info("Feature activated", [
                        'user_id' => $userId,
                        'days' => $days,
                        'valid_until' => $user->featured_valid
                    ]);
                } else {
                    \Log::error('User not found for feature', ['user_id' => $userId]);
                }
            }

            // **************************************
            // AD PAYMENT CALLBACK
            // **************************************
            if ($paymentType === "ad") {

                $meta = $pi->metadata;

                $userId = $meta->user_id ?? null;
                $title = $meta->title ?? null;
                $start = $meta->start_date ?? null;
                $end = $meta->end_date ?? null;
                $region = $meta->region_id ?? null;
                $industry = $meta->industry_id ?? null;
                $image = $meta->image ?? null;

                if (!$userId || !$title || !$start || !$end) {
                    \Log::error("Ad metadata missing", $meta->toArray());
                    return response('Missing metadata', 400);
                }

                // Save payment
                Payment::updateOrCreate(
                    ['payment_intent_id' => $pi->id],
                    [
                        'user_id' => $userId,
                        'plan_title' => "Advertisement Payment",
                        'tier_id' => null,
                        'amount' => $pi->amount_received / 100,
                        'currency' => strtoupper($pi->currency),
                        'status' => 'succeeded',
                        'stripe_data' => $pi->toArray(),
                    ]
                );

                // ⭐ FINALLY CREATE AD
                \App\Models\Ad::create([
                    'user_id'    => $userId,
                    'title'      => $title,
                    'link'       => $meta->link ?? null,
                    'start_date' => $start,
                    'end_date'   => $end,
                    'region_id'  => $region ?: null,
                    'industry_id' => $industry ?: null,
                    'image'      => $image ?: null,
                    'active'     => 1
                ]);

                \Log::info("Ad Created Successfully via Callback", [
                    'user_id' => $userId,
                    'title' => $title,
                    'image' => $image
                ]);
            }
        }

        return response('Webhook received', 200);
    }
}
