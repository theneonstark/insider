<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MemberController
{
    public function index()
    {
        $tiers = Tier::all(); // no ASC/DESC
        return response()->json(['data' => $tiers], 200);
    }
}
