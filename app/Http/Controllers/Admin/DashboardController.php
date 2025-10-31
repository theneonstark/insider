<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class DashboardController
{
    public function index(Request $post, $section = null)
    {
        return Inertia::render('Admin');
    }

    public function data()
    {
        // Count total users
        $totalUsers = User::count();

        // Return as JSON response
        return response()->json([
            'total_users' => $totalUsers
        ]);
    }

    public function usersData(Request $request)
    {
        switch ($request->method()) {
            // 🟢 Fetch all users
            case 'GET':
                $users = User::all();
                return response()->json([
                    'success' => true,
                    'message' => 'Users fetched successfully',
                    'data' => $users
                ]);

                // 🟡 Add new user
            case 'POST':
                $validated = $request->validate([
                    'name' => 'required|string|max:255',
                    'email' => 'required|email|unique:users',
                    'password' => 'required|min:6'
                ]);

                $user = \App\Models\User::create([
                    'name' => $validated['name'],
                    'email' => $validated['email'],
                    'password' => bcrypt($validated['password'])
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'User created successfully',
                    'data' => $user
                ]);

                // 🔵 Update existing user
            case 'PUT':
            case 'PATCH':
                $validated = $request->validate([
                    'id' => 'required|exists:users,id',
                    'name' => 'nullable|string|max:255',
                    'email' => 'nullable|email|unique:users,email,' . $request->id,
                    'password' => 'nullable|min:6'
                ]);

                $user = \App\Models\User::find($validated['id']);
                if (!$user) {
                    return response()->json([
                        'success' => false,
                        'message' => 'User not found'
                    ], 404);
                }

                $user->update(array_filter([
                    'name' => $validated['name'] ?? null,
                    'email' => $validated['email'] ?? null,
                    'password' => isset($validated['password']) ? bcrypt($validated['password']) : null,
                ]));

                return response()->json([
                    'success' => true,
                    'message' => 'User updated successfully',
                    'data' => $user
                ]);

            default:
                return response()->json([
                    'success' => false,
                    'message' => 'Unsupported request method'
                ], 405);
        }
    }

    public function userUpdate(Request $request) {

        // Get payload data object (or fallback to all)
        $data = $request->has('data') ? $request->input('data') : $request->all();

        // Require id in the payload
        $id = $data['id'] ?? null;
        if (!$id) {
            return response()->json(['error' => 'User id is required in data.id'], 400);
        }

        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Normalize possible field names: businessType vs business_type
        if (array_key_exists('businessType', $data) && !array_key_exists('business_type', $data)) {
            $data['business_type'] = $data['businessType'];
        }

        // Validation rules (use sometimes so admin can update partial fields)
        $validator = Validator::make($data, [
            'name' => 'sometimes|required|string|max:255',
            'email' => [
                'sometimes',
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'password' => 'nullable|string|min:6',
            'phone' => 'nullable|string|max:20',
            'business_type' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'dob' => 'nullable|date',
            'bio' => 'nullable|string|max:1000',
            'image' => 'nullable|url|max:255',
            'status' => 'nullable|boolean',
            'role' => 'nullable|string|max:50',
            'tier_id' => 'nullable|numeric|exists:tiers,id' // optional if you have tiers table
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'messages' => $validator->errors(),
            ], 422);
        }

        try {
            // Update only provided fields
            $updatable = [
                'name' => 'name',
                'email' => 'email',
                'phone' => 'phone',
                'business_type' => 'business_type',
                'state' => 'state',
                'dob' => 'dob',
                'bio' => 'bio',
                'image' => 'image',
                'status' => 'status',
                'role' => 'role',
                'tier_id' => 'tier_id',
            ];

            foreach ($updatable as $key => $column) {
                if (array_key_exists($key, $data)) {
                    $user->{$column} = $data[$key];
                }
            }

            // If password provided, hash it
            if (!empty($data['password'])) {
                $user->password = Hash::make($data['password']);
            }

            $user->save();

            return response()->json([
                'message' => 'User updated successfully',
                'data' => $user,
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Admin update user failed: ' . $e->getMessage());
            return response()->json([
                'error' => 'Operation failed',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
