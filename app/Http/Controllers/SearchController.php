<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController
{
    public function index()
    {
        return Inertia::render('Search');
    }

    public function search(Request $request)
    {
        try {
            // 🧠 Base query: exclude admins
            $query = User::query()->where('role', '!=', 'admin');

            // 🧠 Optional filters
            if ($request->filled('name')) {
                $query->where('name', 'like', '%' . $request->name . '%');
            }

            if ($request->filled('location')) {
                $query->where('location', 'like', '%' . $request->location . '%');
            }

            if ($request->filled('industry')) {
                $query->where('industry', 'like', '%' . $request->industry . '%');
            }

            // 🧠 Fetch results
            $users = $query->get();

            return response()->json([
                'status' => true,
                'count' => $users->count(),
                'data' => $users
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Error fetching users',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
