<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use App\Models\User; // 🟢 Import User Model
use Illuminate\Support\Facades\Schema; // optional but good practice

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Optional default for MySQL index length
        Schema::defaultStringLength(191);

        // 🟢 Auto deactivate expired featured users
        try {
            User::where('featured', 1)
                ->where('featured_valid', '<', now())
                ->update(['featured' => 0]);
        } catch (\Exception $e) {
            \Log::error('Failed to deactivate expired featured users: ' . $e->getMessage());
        }

        // ⚙️ Keep your Vite config intact
        Vite::prefetch(concurrency: 3);
    }
}
