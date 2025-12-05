<?php

use App\Http\Controllers\AdController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DataController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ConnectionController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\StripeWebhookController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Welcome');
});
Route::get('login', [UserController::class, 'loginpage'])->middleware('guest');
Route::get('signup', [UserController::class, 'signup'])->name('signup');
Route::post('/register', [UserController::class, 'register']);
Route::get('/region', [HomeController::class, 'data']);
Route::get('/allUser', [UserController::class, 'allUsers']);

Route::group(['prefix' => 'auth'], function () {
    Route::post('check', [UserController::class, 'login'])->name('authCheck');
    Route::get('/logout', [UserController::class, 'logout'])->name('logout');
    Route::post('reset', [UserController::class, 'passwordReset'])->name('authReset');
    Route::post('/update', [HomeController::class, 'updateProfile']);
    Route::post('/passwordChange', [HomeController::class, 'updatePassword']);
});

Route::get('/allUsers', [SearchController::class, 'allUsers']);

Route::group(['prefix' => 'search'], function () {
    Route::get('/', [SearchController::class, 'index']);
    Route::post('/filter', [SearchController::class, 'search']);
});

Route::group(['prefix' => 'data'], function () {
    Route::get('twinkle', [SearchController::class, 'twinkleUser']);
    Route::get('sparkle', [SearchController::class, 'sparkleUser']);
    Route::get('shine', [SearchController::class, 'shineUser']);
    Route::get('shinePlus', [SearchController::class, 'shinePlanUser']);
});

Route::group(['prefix' => 'membership'], function () {
    Route::get('/plans', [MemberController::class, 'index']);
});

Route::post('/increase-view', [HomeController::class, 'increaseView']);

Route::get('/forgot-password', [PasswordResetController::class, 'showEmailForm']);
Route::post('/forgot-password/send-otp', [PasswordResetController::class, 'sendOtp']);

Route::get('/forgot-password/verify', [PasswordResetController::class, 'showOtpForm']);
Route::post('/forgot-password/verify', [PasswordResetController::class, 'verifyOtp']);

Route::get('/forgot-password/reset', [PasswordResetController::class, 'showResetForm']);
Route::post('/forgot-password/reset', [PasswordResetController::class, 'resetPassword']);

Route::group(['middleware'=>'auth'], function () {


    Route::get('/dashboard', [HomeController::class, 'index']);
    Route::post('/updatelandingpage', [HomeController::class, 'updateLandingPage']);
    Route::get('/getLandingPage', [HomeController::class, 'getLandingPage']);
    
    
    Route::post('/featured', [HomeController::class, 'featureActive']);

    Route::get('/checkout', [PaymentController::class, 'index'])->name('checkout');
    Route::post('/create-payment-intent', [PaymentController::class, 'createPaymentIntent']);
    // Route::post('/webhook/stripe', StripeWebhookController::class)
    //  ->name('webhook.stripe');

    Route::group(['prefix' => 'profile'], function () {
        Route::get('/{id}', [HomeController::class, 'userProfile']);
    });

    Route::group(['prefix' => 'admin'], function () {
        Route::get('/dashboard', [DashboardController::class, 'index']);
        Route::get('/userdata', [AdminController::class, 'users']);
        Route::post('/usersUpdateAndAdd', [DashboardController::class, 'usersData']);
        Route::get('/revenue', [DataController::class, 'revenue']);
        Route::get('/revenue-tier', [DataController::class, 'revenueByTier']);
        Route::group(['prefix' => 'feature'], function () {
            Route::post('/add', [AdminController::class, 'featureAdd']);
            Route::post('/remove', [AdminController::class, 'featureRemove']);
        });
        Route::post('/setting/update', [AdminController::class, 'settingUpdate']);
        Route::post('ads/create', [AdController::class, 'adminStore']);
        Route::post('/add/user', [AdminController::class, 'addUser']);
    });
    
    Route::group(['prefix' => 'ads'], function () {
        Route::get('/your', [AdController::class, 'fetchAd']);
        Route::post('/create', [AdController::class, 'store']);
        Route::post('/{id}', [AdController::class, 'update']);
        Route::delete('/{id}', [AdController::class, 'destroy']);
        Route::post('/{id}/status', [AdController::class, 'updateStatus']);
    });

    Route::post('/connect', [ConnectionController::class, 'connect']);
    Route::post('/connect/accept', [ConnectionController::class, 'accept']);
    Route::post('/connect/remove', [ConnectionController::class, 'remove']);

    Route::get('/connections', [ConnectionController::class, 'myConnections']);
    Route::get('/connection/status/{id}', [ConnectionController::class, 'connectionStatus']);
    Route::get('/connections/pending', [ConnectionController::class, 'pendingRequests']);

    // Send message
    Route::post('/chat/send', [ChatController::class, 'sendMessage']);
    Route::get('/chat/{userId}', [ChatController::class, 'getChat']);
    Route::get('/chat/list', [ChatController::class, 'chatList']);
});
Route::get('/ads/data', [AdController::class, 'index']);
