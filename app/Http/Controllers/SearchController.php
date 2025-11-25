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

    public function allUsers()
    {
        $now = now();

        // Eager load relations: tier, industry, region
        $baseQuery = \App\Models\User::with(['industry', 'region']);

        // 1️⃣ Featured Users
        $featuredUsers = $baseQuery->clone()
            ->where('featured', 1)
            ->where('featured_valid', '>', $now)
            ->orderBy('featured_valid', 'desc')
            ->take(3)
            ->get();

        $remainingSlots = 3 - $featuredUsers->count();

        // 2️⃣ Normal Users (shuffle)
        $normalUsers = collect();
        if ($remainingSlots > 0) {
            $normalUsers = $baseQuery->clone()
                ->where(function ($q) use ($now) {
                    $q->where('featured', 0)
                        ->orWhere('featured_valid', '<=', $now)
                        ->orWhereNull('featured_valid');
                })
                ->inRandomOrder()
                ->take($remainingSlots)
                ->get();
        }

        // 3️⃣ Merge
        $users = $featuredUsers->merge($normalUsers);

        return response()->json([
            'status' => true,
            'message' => 'Users fetched successfully',
            'data' => $users
        ]);
    }


    public function sparkleUser()
    {
        $users = User::where('tier_id', 2)->get()->shuffle();

        return response()->json([
            'success' => true,
            'message' => 'Sparkle users fetched successfully',
            'data' => $users,
        ]);
    }

    public function shineUser()
    {
        $users = User::where('tier_id', 3)->get()->shuffle();

        return response()->json([
            'success' => true,
            'message' => 'Shine users fetched successfully',
            'data' => $users,
        ]);
    }

    public function shinePlanUser()
    {
        $users = User::where('tier_id', 4)->get()->shuffle();

        return response()->json([
            'success' => true,
            'message' => 'Shine users fetched successfully',
            'data' => $users,
        ]);
    }
}
