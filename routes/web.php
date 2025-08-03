<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\MemberAuthController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page - Internet Subscription Management
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('welcome');

// Member Authentication
Route::get('/login', [MemberAuthController::class, 'create'])->name('member.login');
Route::post('/login', [MemberAuthController::class, 'store']);
Route::get('/register', [MemberAuthController::class, 'show'])->name('member.register');
Route::post('/register', [MemberAuthController::class, 'update']);
Route::post('/logout', [MemberAuthController::class, 'destroy'])->name('member.logout');

// Admin Routes  
Route::prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    
    // Package Management
    Route::resource('packages', PackageController::class);
    
    // Member Management
    Route::resource('members', MemberController::class);
    
    // Subscription Management
    Route::resource('subscriptions', SubscriptionController::class)->except(['create', 'store']);
    
    // Transaction Management
    Route::resource('transactions', TransactionController::class)->except(['create', 'store']);
});

// User Routes
Route::prefix('user')->group(function () {
    Route::get('/dashboard', [UserController::class, 'index'])->name('user.dashboard');
    Route::get('/packages', [UserController::class, 'create'])->name('user.packages');
    Route::get('/transactions', [UserController::class, 'show'])->name('user.transactions');
    
    // Subscription Creation
    Route::get('/subscribe', [SubscriptionController::class, 'create'])->name('user.subscribe');
    Route::post('/subscribe', [SubscriptionController::class, 'store'])->name('subscriptions.store');
});

// Default Laravel routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
