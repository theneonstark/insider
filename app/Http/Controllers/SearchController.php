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

            // 🧠 Check if any filter is applied
            $hasFilters = $request->filled('name') || $request->filled('location') || $request->filled('industry');

            if ($hasFilters) {
                // Agar filter hai to saare matching results laao
                $users = $query->get();
            } else {
                // Agar filter nahi hai to 3 random users laao
                $users = $query->inRandomOrder()->take(3)->get();
            }

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
