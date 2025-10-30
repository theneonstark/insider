<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;
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
}
