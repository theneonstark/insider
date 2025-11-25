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

                $userId = $pi->metadata->user_id ?? null;
                $title = $pi->metadata->title ?? null;
                $startDate = $pi->metadata->start_date ?? null;
                $endDate = $pi->metadata->end_date ?? null;

                $regionId = $pi->metadata->region_id ?? null;
                $industryId = $pi->metadata->industry_id ?? null;
                $imageName = $pi->metadata->image ?? null; // image already saved earlier

                if (!$userId || !$title || !$startDate || !$endDate) {
                    \Log::error("Missing ad metadata", [
                        'pi_id' => $pi->id,
                        'meta' => $pi->metadata
                    ]);
                    return response('Missing ad metadata', 400);
                }

                // 🟢 Save payment in Payments Table
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

                // 🟢 Finally CREATE AD in ads table
                \App\Models\Ad::create([
                    'user_id' => $userId,
                    'title' => $title,
                    'start_date' => $startDate,
                    'end_date' => $endDate,
                    'active' => 1,
                    'region_id' => $regionId ?: null,
                    'industry_id' => $industryId ?: null,
                    'image' => $imageName ?: null,
                ]);

                \Log::info("Ad created after payment success", [
                    'user_id' => $userId,
                    'title' => $title,
                    'start_date' => $startDate,
                    'end_date' => $endDate,
                ]);
            }
        }

        return response('Webhook received', 200);
    }
}
