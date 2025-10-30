<?php

namespace App\Http\Controllers;

use App\Models\Tier;
use Illuminate\Http\Request;

class MemberController
{
    public function index()
    {
        $tiers = Tier::all(); // no ASC/DESC
        return response()->json(['data' => $tiers], 200);
    }
}
