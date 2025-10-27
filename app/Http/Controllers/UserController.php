<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class UserController
{
    public function loginpage(Request $get)
    {        
        return Inertia::render('Login');
    }
    
    public function login(Request $request)
    {

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['status' => 'warning', 'message' => "Contact to Administrator"]);
        }

        if (!Auth::validate(['email' => $request->email, 'password' => $request->password])) {
            return response()->json(['status' => 'ERR', 'message' => 'Username or password is incorrect']);
        }

        if (!Auth::validate(['email' => $request->email, 'password' => $request->password, 'status' => true])) {
            return response()->json(['status' => 'ERR', 'message' => 'Your account currently de-activated, please contact administrator']);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password, 'status' => true])) {
            \App\Models\LogSession::create([
                'user_id' => $user->id,
                'ip_address'=> $request->ip(),
                'user_agent'=>$_SERVER['HTTP_USER_AGENT'],
                'gps_location'=> $request->gps_location,
                'ip_location'=>$request->ip_location,
                'device_id'=>$request->device_id
            ]);
            session(['loginid' => $user->id]);
            return response()->json(['status' => 'success', 'message' => 'Login Successfully', 'redirect' => '/admin/dashboard']);
            return redirect('/dashboard');
        }else{
            return response()->json(['status'=>'ERR','message'=>'Something went wrong, Please contact Administrator']);
        }
    }

    public function signup()
    {
        return Inertia::render('Signup');
    }

     public function register(Request $request)
    {
        $request->validate([
            'fullName' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'phone' => 'required|string|max:15',
            'businessType' => 'required|string',
            'dob' => 'required|date',
            'password' => 'required|string|min:6',
        ]);

        User::create([
            'name' => $request->fullName,
            'email' => $request->email,
            'phone' => $request->phone,
            'business_type' => $request->businessType,
            'dob' => $request->dob,
            'password' => Hash::make($request->password),
        ]);

        return redirect('/');
    }

    public function updateProfile(Request $request)
{
    $user = Auth::user();

    if (!$user) {
        return response()->json([
            'error' => 'Unauthenticated',
        ], 401);
    }

    // Determine the actual data (in case it's nested under 'data')
    $data = $request->has('data') ? $request->input('data') : $request->all();

    // Validate incoming request
    $validator = Validator::make($data, [
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255|unique:users,email,' . $user->id,
        'phone' => 'nullable|string|max:20',
        'businessType' => 'nullable|string|max:100',
        'state' => 'nullable|string|max:100',
        'dob' => 'nullable|date',
        'bio' => 'nullable|string|max:1000',
        'image' => 'nullable|url|max:255',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'error' => 'Validation failed',
            'messages' => $validator->errors(),
        ], 422);
    }

    try {
        // Update user profile
        $user->update([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'business_type' => $data['businessType'] ?? null,
            'state' => $data['state'] ?? null,
            'dob' => $data['dob'] ?? null,
            'bio' => $data['bio'] ?? null,
            'image' => $data['image'] ?? null,
        ]);

        return response()->json([
            'message' => 'Profile updated successfully',
            'data' => $user,
        ], 200);

    } catch (\Exception $e) {
        \Log::error('Profile update failed: ' . $e->getMessage());
        return response()->json([
            'error' => 'Failed to update profile',
            'message' => $e->getMessage(),
        ], 500);
    }
}


    public function logout(Request $request)
    {
        Auth::guard()->logout();
        $request->session()->invalidate();
        return Inertia::location('/');
    }
}
