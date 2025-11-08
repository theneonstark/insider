<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class DeactivateExpiredFeatured extends Command
{
    protected $signature = 'feature:deactivate-expired';
    protected $description = 'Deactivate all expired featured users';

    public function handle()
    {
        $count = User::where('featured', 1)
            ->where('featured_valid', '<', now())
            ->update(['featured' => 0]);

        $this->info("Deactivated {$count} expired featured users.");
        return 0;
    }
}

