<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController
{
    public function index(Request $post, $section = null)
    {
        return Inertia::render('Admin');
    }
}
