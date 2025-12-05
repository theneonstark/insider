<?php

namespace App\Http\Controllers;

use App\Mail\OtpMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Inertia\Inertia;

class PasswordResetController
{
    public function showEmailForm()
    {
        return Inertia::render('ForgotPassword');
    }

    public function sendOtp(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();
        if (!$user) return back()->withErrors(['email' => 'Email not registered']);

        $otp = rand(100000, 999999);

        session([
            'reset_email' => $request->email,
            'reset_otp'   => $otp
        ]);

        Mail::to($request->email)->send(new OtpMail($otp));

        return redirect('/forgot-password/verify')->with('success', 'OTP sent to your email.');
    }

    public function showOtpForm()
    {
        return Inertia::render('VerifyOtp');
    }

    public function verifyOtp(Request $request)
    {
        $request->validate(['otp' => 'required']);

        if ($request->otp != session('reset_otp')) {
            return back()->withErrors(['otp' => 'Invalid OTP']);
        }

        return redirect('/forgot-password/reset');
    }

    public function showResetForm()
    {
        return Inertia::render('Auth/ResetPassword');
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'password' => 'required|confirmed|min:6',
        ]);

        $user = User::where('email', session('reset_email'))->first();
        $user->password = Hash::make($request->password);
        $user->save();

        session()->forget(['reset_email', 'reset_otp']);

        return redirect('/login')->with('success', 'Password reset successfully!');
    }
}
