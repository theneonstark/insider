<?php

namespace App\Http\Controllers;

use App\Models\Industry;
use App\Models\Offer;
use App\Models\Region;
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

        $industryName = DB::table('industries')
            ->where('industryId', $user->business_type)
            ->value('industryName');

        $regionName = DB::table('regions')
            ->where('regionId', $user->state)
            ->value('regionName');

        $authUser = [
            'id'             => $user->id,
            'name'           => $user->name,
            'email'          => $user->email,
            'phone'          => $user->phone,
            'business_type'  => $industryName ?? Null,
            'dob'            => $user->dob,                    // Auto formatted
            'state'          => $regionName ?? Null,
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

    public function data()
    {
        $regionData = Region::all();
        $industryData = Industry::all();
        return response()->json(['status' => true, 'region' => $regionData, 'industry' => $industryData]);
    }

    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'error' => 'Unauthenticated',
            ], 401);
        }

        // Handle JSON or FormData
        $data = $request->has('data') ? $request->input('data') : $request->all();

        // Validate inputs
        $validator = Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20',
            'businessId' => 'nullable|int|max:100',
            'stateId' => 'nullable|int|max:100',
            'dob' => 'nullable|date',
            'bio' => 'nullable|string|max:1000',
            'image' => 'nullable|file|mimes:jpg,jpeg,png', // file validation
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'messages' => $validator->errors(),
            ], 422);
        }

        try {
            $imagePath = $user->image; // default existing image

            // 🟢 Handle image upload if file is present
            if ($request->hasFile('image')) {
                $file = $request->file('image');

                // Create a unique filename
                $fileName = 'profile_' . time() . '.' . $file->getClientOriginalExtension();

                // Store the file in storage/app/public/profile_images/
                $path = $file->storeAs('profile_images', $fileName, 'public');

                // Convert storage path to accessible URL or relative path
                $imagePath = 'storage/profile_images/' . $fileName;
            }

            // 🟢 Update or Create user record
            $updatedUser = \App\Models\User::updateOrCreate(
                ['id' => $user->id],
                [
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'phone' => $data['phone'] ?? null,
                    'business_type' => $data['businessId'] ?? null,
                    'state' => $data['stateId'] ?? null,
                    'dob' => $data['dob'] ?? null,
                    'bio' => $data['bio'] ?? null,
                    'image' => $imagePath, // save uploaded file path
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

    public function featureActive(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized access',
            ], 401);
        }

        // 🧠 Validate user input
        $validated = $request->validate([
            'days' => 'required|integer|min:1|max:365', // limit max 1 year
        ]);

        try {
            // If already active & still valid → block reactivation
            if ($user->featured && $user->featured_valid && now()->lt($user->featured_valid)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Feature is already active until ' . $user->featured_valid->format('d M Y H:i'),
                ], 400);
            }

            // ⏳ Calculate new expiry
            $expiry = now()->addDays($validated['days']);

            // 🟢 Update user table
            $user->update([
                'featured' => 1,
                'featured_valid' => $expiry,
            ]);

            return response()->json([
                'status' => true,
                'message' => "Feature activated for {$validated['days']} days",
                'featured_valid_until' => $expiry->format('Y-m-d H:i:s'),
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Feature activation failed: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Failed to activate feature',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function updatePassword(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized access',
            ], 401);
        }

        // 🧠 Validate input
        $validated = $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:8|confirmed', // must have new_password_confirmation field
        ]);

        // 🧩 Check current password
        if (!\Hash::check($validated['current_password'], $user->password)) {
            return response()->json([
                'status' => false,
                'message' => 'Current password is incorrect',
            ], 400);
        }

        // 🟢 Update password
        $user->password = \Hash::make($validated['new_password']);
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Password updated successfully',
        ], 200);
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


    public function increaseView(Request $request)
    {
        try {
            // 🧠 Validate input
            $request->validate([
                'id' => 'required|integer|exists:users,id'
            ]);

            // 🧠 Find user by ID
            $user = User::findOrFail($request->id);

            // 🧠 Increment view count
            $user->views = $user->views + 1;
            $user->save();

            return response()->json([
                'status' => true,
                'message' => 'View increased successfully',
                'views' => $user->views
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to increase view',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function userProfile(Request $request, $id)
    {
        // agar user_id param se aaye to use karo, warna URL wala $id
        $userId = $request->input('user_id') ?? $id;

        // id match karke user + related data fetch karo
        $user = User::with(['services', 'testimonials', 'offers'])->find($userId);

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found'
            ], 404);
        }

        // return inertia page with all related data
        return Inertia::render('Profile', [
            'data' => $user
        ]);
    }
}
