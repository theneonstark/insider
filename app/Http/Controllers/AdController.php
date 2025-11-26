<?php

namespace App\Http\Controllers;

use App\Models\Ad;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;
use Stripe\Stripe;

class AdController extends Controller
{
    // Get All Ads
    public function index()
    {
        $ads = Ad::with(['user', 'region', 'industry'])->get();
        return response()->json(['status' => true, 'data' => $ads]);
    }

    // Create Ad
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'region_id' => 'nullable|exists:regions,regionId',
            'industry_id' => 'nullable|exists:industries,industryId',
            'title' => 'required|string|max:255',
            'link' => 'nullable|string',
            'image' => 'nullable|image',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'active' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        // ⭐ 1. SAVE IMAGE PERMANENTLY (NOT TEMP)
        $imagePath = null;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('ads'), $fileName);

            $imagePath = 'ads/' . $fileName;
        }

        // ⭐ 2. CALCULATE AMOUNT ($1/day)
        $days = Carbon::parse($request->start_date)->diffInDays(Carbon::parse($request->end_date)) + 1;
        $amount = $days * 100; // in cents

        Stripe::setApiKey(env('STRIPE_SECRET'));

        // ⭐ 3. CREATE STRIPE INTENT (NO AD YET)
        $intent = \Stripe\PaymentIntent::create([
            'amount' => $amount,
            'currency' => 'usd',
            'description' => "Ad Payment for {$days} days",
            'metadata' => [
                'payment_type' => 'ad',
                'user_id' => $request->user_id,
                'title' => $request->title,
                'link' => $request->link,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'region_id' => $request->region_id,
                'industry_id' => $request->industry_id,
                'image' => $imagePath, // ⭐ FINAL PATH GOES HERE
            ]
        ]);

        return response()->json([
            'status' => true,
            'clientSecret' => $intent->client_secret,
            'public_key' => env('STRIPE_KEY')
        ]);
    }

    public function adminStore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'region_id' => 'nullable|exists:regions,regionId',
            'industry_id' => 'nullable|exists:industries,industryId',
            'title' => 'required|string|max:255',
            'link' => 'nullable|string',
            'image' => 'nullable|image',
            'active' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // ----------- ⭐ SAVE IMAGE ----------
        $imagePath = null;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('ads'), $fileName);
            $imagePath = 'ads/' . $fileName;
        }

        // ----------- ⭐ INSERT INTO DATABASE ----------
        $ad = \App\Models\Ad::create([
            'user_id' => $request->user_id,
            'region_id' => $request->region_id,
            'industry_id' => $request->industry_id,
            'title' => $request->title,
            'link' => $request->link,
            'image' => $imagePath,
            'active' => $request->active ?? 0,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Ad created successfully!',
            'data' => $ad
        ], 201);
    }

    // Update Ad
    public function update(Request $request, $id)
    {
        $ad = Ad::find($id);
        if (!$ad) {
            return response()->json(['status' => false, 'message' => 'Ad not found']);
        }

        $validator = Validator::make($request->all(), [
            'region_id' => 'nullable|exists:regions,regionId',
            'industry_id' => 'nullable|exists:industries,industryId',
            'title' => 'string|max:255',
            'link' => 'nullable|string',
            'image' => 'nullable|image',
            'active' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $data = $request->except('image');

        // 🟢 Image Upload (Replace old image)
        if ($request->hasFile('image')) {

            // Remove old image if exists
            if ($ad->image && file_exists(public_path($ad->image))) {
                unlink(public_path($ad->image));
            }

            $file = $request->file('image');
            $fileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();

            $file->move(public_path('ads'), $fileName);

            $data['image'] = 'ads/' . $fileName;
        }

        $ad->update($data);

        return response()->json([
            'status' => true,
            'message' => 'Ad updated successfully',
            'data' => $ad
        ]);
    }

    // Delete Ad
    public function destroy($id)
    {
        $ad = Ad::find($id);
        if (!$ad) {
            return response()->json(['status' => false, 'message' => 'Ad not found']);
        }

        $ad->delete();

        return response()->json(['status' => true, 'message' => 'Ad removed successfully']);
    }

    // Update Ad Status
    public function updateStatus(Request $request, $id)
    {
        $ad = Ad::find($id);
        if (!$ad) {
            return response()->json(['status' => false, 'message' => 'Ad not found']);
        }

        $ad->active = $request->active ? 1 : 0;
        $ad->save();

        return response()->json(['status' => true, 'message' => 'Status updated', 'data' => $ad]);
    }

    public function fetchAd()
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        // 🟢 Admin → All ads
        if ($user->role === 'admin') {
            $ads = \App\Models\Ad::orderBy('id', 'desc')->get();

            return response()->json([
                'status' => true,
                'data' => $ads
            ]);
        }

        // 🟢 Normal User → Only own ads
        $ads = \App\Models\Ad::where('user_id', $user->id)
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([
            'status' => true,
            'data' => $ads
        ]);
    }
}
