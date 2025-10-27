<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

class AdminController
{
    public function users(){
        $users = \App\Models\User::all();

        return response()->json([
            'message' => 'All users fetched successfully',
            'data' => $users
        ], 200);
    }
}
