<?php

namespace App\Http\Controllers;

use App\Models\Ad;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;

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
            'active' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $data = $request->except('image');

        // 🟢 Image Upload (No Symlink — Save in public/ads)
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();

            // Save directly to public/ads
            $file->move(public_path('ads'), $fileName);

            // Save path in DB
            $data['image'] = 'ads/' . $fileName;
        }

        $ad = Ad::create($data);

        return response()->json([
            'status' => true,
            'message' => 'Ad created successfully',
            'data' => $ad
        ]);
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
}
