<?php

namespace App\Http\Controllers\Admin;

use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DataController
{
    public function revenue()
    {
        try {
            // ✅ Step 1: Filter only successful payments
            $payments = \App\Models\Payment::where('status', 'succeeded');

            // ✅ Step 2: Total revenue till now
            $totalRevenue = $payments->sum('amount');

            // ✅ Step 3: Current month revenue
            $currentMonthRevenue = \App\Models\Payment::where('status', 'succeeded')
                ->whereMonth('created_at', now()->month)
                ->whereYear('created_at', now()->year)
                ->sum('amount');

            // ✅ Step 4: Last month revenue
            $lastMonthRevenue = \App\Models\Payment::where('status', 'succeeded')
                ->whereMonth('created_at', now()->subMonth()->month)
                ->whereYear('created_at', now()->subMonth()->year)
                ->sum('amount');

            // ✅ Step 5: Month-over-month change percentage
            $revenueChange = $lastMonthRevenue > 0
                ? (($currentMonthRevenue - $lastMonthRevenue) / $lastMonthRevenue) * 100
                : 0;

            return response()->json([
                'status' => true,
                'data' => [
                    'total_revenue' => round($totalRevenue, 2),
                    'current_month_revenue' => round($currentMonthRevenue, 2),
                    'last_month_revenue' => round($lastMonthRevenue, 2),
                    'revenue_change_percent' => round($revenueChange, 2),
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Error calculating revenue',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function revenueByTier()
    {
        try {
            // Group payments by plan_title and sum their amounts
            $data = Payment::select(
                'plan_title',
                DB::raw('COUNT(*) as total_members'),
                DB::raw('SUM(amount) as total_revenue')
            )
                ->where('status', 'succeeded')
                ->groupBy('plan_title')
                ->get();

            $totalRevenue = $data->sum('total_revenue');

            return response()->json([
                'status' => true,
                'data' => $data,
                'total' => $totalRevenue
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Error fetching revenue by tier',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
