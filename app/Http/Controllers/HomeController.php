<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use App\Models\Service;
use App\Models\Testimonial;
use App\Models\Tier;
use App\Models\User;
use App\Models\Userbank;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class HomeController
{
public function index(Request $request)
{
    $user = $request->user();

    if (!$user) {
        return redirect()->route('login');
    }

    $tierName = DB::table('tiers')
        ->where('id', $user->tier_id)
        ->value('tier_name');

    $authUser = [
        'id'             => $user->id,
        'name'           => $user->name,
        'email'          => $user->email,
        'phone'          => $user->phone,
        'business_type'  => $user->business_type,
        'dob'            => $user->dob,                    // Auto formatted
        'state'          => $user->state,
        'bio'            => $user->bio,
        'tier_id'        => $user->tier_id,
        'tier_name'      => $tierName ?? 'Free Plan',
        'views'          => $user->views,
        'image'          => $user->image ? asset('storage/' . $user->image) : null,
        'about'          => $user->about,
        'featured'       => $user->featured,              // boolean
        'featured_valid' => $user->featured_valid,        // Auto formatted
        'status'         => $user->status ? 'Active' : 'Inactive',
        'created_at'     => $user->created_at,            // Auto formatted
        'updated_at'     => $user->updated_at,            // Auto formatted
    ];

    return Inertia::render('Dashboard', [
        'user' => $authUser,
    ]);
}

    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'error' => 'Unauthenticated',
            ], 401);
        }

        // Get request data
        $data = $request->has('data') ? $request->input('data') : $request->all();

        // Validate
        $validator = Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id, // allow same user email
            'phone' => 'nullable|string|max:20',
            'businessType' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'dob' => 'nullable|date',
            'bio' => 'nullable|string|max:1000',
            'image' => 'nullable|url|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'messages' => $validator->errors(),
            ], 422);
        }

        try {
            // Update or Create user record
            $updatedUser = \App\Models\User::updateOrCreate(
                ['id' => $user->id], // condition
                [
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'phone' => $data['phone'] ?? null,
                    'business_type' => $data['businessType'] ?? null,
                    'state' => $data['state'] ?? null,
                    'dob' => $data['dob'] ?? null,
                    'bio' => $data['bio'] ?? null,
                    'image' => $data['image'] ?? null,
                ]
            );

            return response()->json([
                'message' => 'Profile updated successfully',
                'data' => $updatedUser,
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Profile update failed: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to update profile',
                'message' => $e->getMessage(),
            ], 500);
        }
    }


    public function updateLandingPage(Request $request)
    {
        $payload = $request->all();

        if (!is_array($payload) || empty($payload)) {
            return response()->json(['error' => 'Invalid payload format'], 400);
        }

        $user = Auth::user();

        foreach ($payload as $section) {
            $type = $section['type'] ?? null;
            $data = $section['data'] ?? null;

            if (!$type || !$data) continue;

            switch ($type) {
                // ----------------------- ABOUT -----------------------
                case 'about':
                    $validated = validator($data, [
                        'headline' => 'required|string|max:255',
                        'bio' => 'required|string',
                        'tagline' => 'nullable|string|max:255',
                    ])->validate();

                    $user->update([
                        'about' => json_encode($validated),
                    ]);
                    break;

                // ----------------------- SERVICE -----------------------
                case 'service':
                    if (!is_array($data)) continue 2;

                    foreach ($data as $serviceData) {
                        $validated = validator($serviceData, [
                            'title' => 'required|string|max:255',
                            'description' => 'required|string',
                            'price' => 'nullable|string|max:255',
                        ])->validate();

                        \App\Models\Service::updateOrCreate(
                            ['id' => $serviceData['id'] ?? null],
                            [
                                'user_id' => $user->id,
                                'title' => $validated['title'],
                                'description' => $validated['description'],
                                'price' => $validated['price'] ?? null,
                            ]
                        );
                    }
                    break;

                // ----------------------- TESTIMONIAL -----------------------
                case 'testimonial':
                    if (!is_array($data)) continue 2;

                    foreach ($data as $testData) {
                        $validated = validator($testData, [
                            'name' => 'required|string|max:255',
                            'role' => 'nullable|string|max:255',
                            'content' => 'required|string',
                            'rating' => 'nullable|numeric|min:1|max:5',
                        ])->validate();

                        \App\Models\Testimonial::updateOrCreate(
                            ['id' => $testData['id'] ?? null],
                            [
                                'user_id' => $user->id,
                                'name' => $validated['name'],
                                'designation' => $validated['role'] ?? null,
                                'message' => $validated['content'],
                                'rating' => $validated['rating'] ?? 5,
                            ]
                        );
                    }
                    break;

                // ----------------------- OFFER -----------------------
                case 'offer':
                    if (!is_array($data)) continue 2;

                    foreach ($data as $offerData) {
                        $validated = validator($offerData, [
                            'title' => 'required|string|max:255',
                            'description' => 'nullable|string',
                            'validUntil' => 'nullable|date',
                        ])->validate();

                        \App\Models\Offer::updateOrCreate(
                            ['id' => $offerData['id'] ?? null],
                            [
                                'user_id' => $user->id,
                                'title' => $validated['title'],
                                'description' => $validated['description'] ?? null,
                                'valid_until' => $validated['validUntil'] ?? null,
                            ]
                        );
                    }
                    break;

                // ----------------------- DEFAULT -----------------------
                default:
                    continue 2;
            }
        }

        // ✅ After updating, fetch the latest data
        $responseData = [
            'about' => json_decode($user->fresh()->about),
            'services' => \App\Models\Service::where('user_id', $user->id)->get(),
            'testimonials' => \App\Models\Testimonial::where('user_id', $user->id)->get(),
            'offers' => \App\Models\Offer::where('user_id', $user->id)->get(),
        ];

        return response()->json([
            'message' => 'Landing page updated successfully',
            'data' => $responseData
        ], 200);
    }

    public function getLandingPage()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $responseData = [
            'about' => json_decode($user->about),
            'services' => \App\Models\Service::where('user_id', $user->id)->get(),
            'testimonials' => \App\Models\Testimonial::where('user_id', $user->id)->get(),
            'offers' => \App\Models\Offer::where('user_id', $user->id)->get(),
        ];

        return response()->json([
            'message' => 'Landing page data fetched successfully',
            'data' => $responseData,
        ], 200);
    }

    public function MembershipPlans() {}
}
