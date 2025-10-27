<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Userbank;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController
{
    public function index(Request $post, $section = null)
    {
        return Inertia::render('Dashboard');
    }
}
