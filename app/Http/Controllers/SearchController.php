<?php

namespace App\Http\Controllers;

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
        $name = $request->input('name');
        $location = $request->input('location');
        $industry = $request->input('industry');

        // 🧠 Base query
        $query = \App\Models\User::query();

        // 🔍 Filter by name (partial match)
        if (!empty($name)) {
            $query->where('name', 'like', '%' . $name . '%');
        }

        // 📍 Filter by location (state or region)
        if (!empty($location)) {
            $query->whereHas('region', function ($q) use ($location) {
                $q->where('regionName', 'like', '%' . $location . '%');
            })
                ->orWhere('state', 'like', '%' . $location . '%'); // fallback if region relation not used
        }

        // 🏭 Filter by industry
        if (!empty($industry)) {
            $query->whereHas('industry', function ($q) use ($industry) {
                $q->where('industryName', 'like', '%' . $industry . '%');
            })
                ->orWhere('business_type', 'like', '%' . $industry . '%'); // fallback if column directly on user
        }

        // 🧾 Fetch results
        $results = $query->where('status', 1) // optional: only active users
            ->select('id', 'name', 'email', 'state', 'business_type', 'image')
            ->latest()
            ->get();

        // 🎯 Response
        if ($results->isEmpty()) {
            return response()->json([
                'status' => false,
                'message' => 'No results found',
                'data' => [],
            ], 200);
        }

        return response()->json([
            'status' => true,
            'message' => 'Results found',
            'count' => $results->count(),
            'data' => $results,
        ], 200);
    }
}
