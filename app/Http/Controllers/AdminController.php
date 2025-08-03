<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\Package;
use App\Models\Subscription;
use App\Models\Transaction;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        $stats = [
            'total_packages' => Package::count(),
            'total_members' => Member::users()->count(),
            'active_subscriptions' => Subscription::active()->count(),
            'total_revenue' => Transaction::completed()->sum('amount'),
        ];
        
        $recent_subscriptions = Subscription::with(['member', 'package'])
            ->latest()
            ->take(5)
            ->get();
            
        $recent_transactions = Transaction::with(['member', 'subscription.package'])
            ->latest()
            ->take(5)
            ->get();
        
        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recent_subscriptions' => $recent_subscriptions,
            'recent_transactions' => $recent_transactions,
        ]);
    }
}