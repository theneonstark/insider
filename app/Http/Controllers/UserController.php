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
            return response()->json(['status' => 'ERR', 'message' => 'Your account is deactivated, please contact administrator']);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password, 'status' => true])) {

            // Log session
            \App\Models\LogSession::create([
                'user_id' => $user->id,
                'ip_address' => $request->ip(),
                'user_agent' => $_SERVER['HTTP_USER_AGENT'],
                'gps_location' => $request->gps_location,
                'ip_location' => $request->ip_location,
                'device_id' => $request->device_id
            ]);

            session(['loginid' => $user->id]);

            // ✅ Role-based redirect
            if ($user->role === 'admin') {
                $redirectUrl = '/admin/dashboard';
            } else {
                $redirectUrl = '/dashboard';
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Login Successfully',
                'redirect' => $redirectUrl
            ]);
        } else {
            return response()->json(['status' => 'ERR', 'message' => 'Something went wrong, Please contact Administrator']);
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


    public function logout(Request $request)
    {
        Auth::guard()->logout();
        $request->session()->invalidate();
        return Inertia::location('/');
    }
}
