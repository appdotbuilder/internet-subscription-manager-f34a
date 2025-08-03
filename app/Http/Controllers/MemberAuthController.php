<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class MemberAuthController extends Controller
{
    /**
     * Show the form for creating a new session.
     */
    public function create()
    {
        return Inertia::render('auth/member-login');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $member = Member::where('username', $request->username)->first();

        if ($member && Hash::check($request->password, $member->password)) {
            // For now, just redirect based on role without actual authentication
            if ($member->role === 'admin') {
                return redirect()->route('admin.dashboard');
            } else {
                return redirect()->route('user.dashboard');
            }
        }

        return back()->withErrors([
            'username' => 'The provided credentials do not match our records.',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        // For now, just redirect without actual logout
        return redirect()->route('welcome');
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        return Inertia::render('auth/member-register');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|unique:members,email',
            'username' => 'required|string|max:255|unique:members,username',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $member = Member::create([
            'full_name' => $request->full_name,
            'address' => $request->address,
            'phone' => $request->phone,
            'email' => $request->email,
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'role' => 'user',
        ]);

        // For now, just redirect without actual authentication
        return redirect()->route('user.dashboard');
    }
}