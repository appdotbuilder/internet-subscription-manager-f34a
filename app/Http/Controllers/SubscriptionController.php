<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSubscriptionRequest;
use App\Models\Member;
use App\Models\Package;
use App\Models\Subscription;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $subscriptions = Subscription::with(['member', 'package'])
            ->when($request->status, function ($query, $status) {
                return $query->where('status', $status);
            })
            ->latest()
            ->paginate(10);
        
        // Update expired subscriptions
        foreach ($subscriptions as $subscription) {
            $subscription->updateStatus();
        }
        
        return Inertia::render('admin/subscriptions/index', [
            'subscriptions' => $subscriptions,
            'filters' => $request->only(['status'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('user/subscriptions/create', [
            'packages' => Package::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSubscriptionRequest $request)
    {
        $package = Package::findOrFail($request->validated()['package_id']);
        
        // For now, use a default member or redirect to login if not implemented
        $member = Member::first();
        if (!$member) {
            return redirect()->route('member.login');
        }
        
        // Create subscription
        $subscription = Subscription::create([
            'member_id' => $member->id,
            'package_id' => $package->id,
            'start_date' => Carbon::today(),
            'end_date' => Carbon::today()->addDays($package->active_duration),
            'status' => 'active',
        ]);
        
        // Create transaction
        Transaction::create([
            'member_id' => $member->id,
            'subscription_id' => $subscription->id,
            'transaction_date' => Carbon::today(),
            'amount' => $package->price,
            'status' => 'completed',
        ]);

        return redirect()->route('user.dashboard')
            ->with('success', 'Subscription created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Subscription $subscription)
    {
        $subscription->load(['member', 'package', 'transactions']);
        
        return Inertia::render('admin/subscriptions/show', [
            'subscription' => $subscription
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Subscription $subscription)
    {
        return Inertia::render('admin/subscriptions/edit', [
            'subscription' => $subscription,
            'packages' => Package::all(),
            'members' => Member::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Subscription $subscription)
    {
        $request->validate([
            'status' => 'required|in:active,expired',
        ]);
        
        $subscription->update($request->only('status'));

        return redirect()->route('subscriptions.index')
            ->with('success', 'Subscription updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subscription $subscription)
    {
        $subscription->delete();

        return redirect()->route('subscriptions.index')
            ->with('success', 'Subscription deleted successfully.');
    }
}