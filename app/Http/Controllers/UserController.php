<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\Package;
use App\Models\Subscription;
use App\Models\Transaction;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display the user dashboard.
     */
    public function index()
    {
        // For now, use a default member or redirect to login if not implemented
        $member = Member::first();
        if (!$member) {
            return redirect()->route('member.login');
        }
        
        $active_subscription = $member->subscriptions()
            ->with('package')
            ->where('status', 'active')
            ->first();
            
        $transaction_count = $member->transactions()->count();
        $total_spent = $member->transactions()->where('status', 'completed')->sum('amount');
        
        $recent_transactions = $member->transactions()
            ->with('subscription.package')
            ->latest()
            ->take(5)
            ->get();
        
        return Inertia::render('user/dashboard', [
            'active_subscription' => $active_subscription,
            'stats' => [
                'transaction_count' => $transaction_count,
                'total_spent' => $total_spent,
            ],
            'recent_transactions' => $recent_transactions,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $packages = Package::all();
        
        return Inertia::render('user/packages', [
            'packages' => $packages
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id = null)
    {
        // For now, use a default member or redirect to login if not implemented
        $member = Member::first();
        if (!$member) {
            return redirect()->route('member.login');
        }
        
        $transactions = $member->transactions()
            ->with('subscription.package')
            ->latest()
            ->paginate(10);
        
        return Inertia::render('user/transactions', [
            'transactions' => $transactions
        ]);
    }
}