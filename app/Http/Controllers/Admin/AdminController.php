<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController
{
    public function users()
    {
        $users = \App\Models\User::all();

        return response()->json([
            'message' => 'All users fetched successfully',
            'data' => $users
        ], 200);
    }

    public function featureAdd(Request $request)
    {
        try {
            $request->validate([
                'user_id' => 'required|integer|exists:users,id',
            ]);

            $user = User::find($request->user_id);

            if ($user->featured == 1) {
                return response()->json([
                    'status' => false,
                    'message' => 'User is already featured.'
                ], 400);
            }

            $user->update([
                'featured' => 1,
                'featured_valid' => now()->addDays(30), // optional expiry
            ]);

            return response()->json([
                'status' => true,
                'message' => 'User added to featured successfully.',
                'data' => $user
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Error adding featured user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function featureRemove(Request $request)
    {
        try {
            // 🧠 Validate incoming request
            $request->validate([
                'user_id' => 'required|integer|exists:users,id',
            ]);

            // 🧠 Find the user
            $user = User::find($request->user_id);

            // 🧠 If already not featured
            if ($user->featured == 0) {
                return response()->json([
                    'status' => false,
                    'message' => 'User is not featured.'
                ], 400);
            }

            // 🧠 Update feature status
            $user->update([
                'featured' => 0,
                'featured_valid' => null, // optional: reset feature expiry date
            ]);

            return response()->json([
                'status' => true,
                'message' => 'User removed from featured successfully.',
                'data' => $user
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Error removing featured user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function settingUpdate(Request $request)
    {
        try {
            // 🧠 Step 1: Validation
            $validated = $request->validate([
                'name'  => 'required|string|max:255',
                'email' => 'required|email|max:255|unique:users,email,' . Auth::id(),
            ]);

            // 🧠 Step 2: Get logged-in admin
            $admin = Auth::user();

            // 🧠 Step 3: Update only name & email
            $admin->update([
                'name'  => $validated['name'],
                'email' => $validated['email'],
            ]);

            // 🧠 Step 4: Response
            return response()->json([
                'status'  => true,
                'message' => 'Settings updated successfully!',
                'data'    => $admin
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status'  => false,
                'message' => 'Error updating settings',
                'error'   => $e->getMessage()
            ], 500);
        }
    }
}
