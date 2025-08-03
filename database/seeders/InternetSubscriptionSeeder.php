<?php

namespace Database\Seeders;

use App\Models\Member;
use App\Models\Package;
use App\Models\Subscription;
use App\Models\Transaction;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class InternetSubscriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = Member::create([
            'full_name' => 'System Administrator',
            'address' => '123 Admin Street, Tech City',
            'phone' => '+1-555-0001',
            'email' => 'admin@internetprovider.com',
            'username' => 'admin',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Create test user
        $user = Member::create([
            'full_name' => 'John Doe',
            'address' => '456 User Avenue, Customer City',
            'phone' => '+1-555-0002',
            'email' => 'user@example.com',
            'username' => 'user',
            'password' => Hash::make('password'),
            'role' => 'user',
        ]);

        // Create internet packages
        $packages = [
            [
                'name' => 'Basic Home 10 Mbps',
                'speed' => '10 Mbps',
                'price' => 299.00,
                'active_duration' => 30,
            ],
            [
                'name' => 'Standard Home 25 Mbps',
                'speed' => '25 Mbps',
                'price' => 499.00,
                'active_duration' => 30,
            ],
            [
                'name' => 'Premium Home 50 Mbps',
                'speed' => '50 Mbps',
                'price' => 799.00,
                'active_duration' => 30,
            ],
            [
                'name' => 'Ultra Home 100 Mbps',
                'speed' => '100 Mbps',
                'price' => 1299.00,
                'active_duration' => 30,
            ],
            [
                'name' => 'Business 200 Mbps',
                'speed' => '200 Mbps',
                'price' => 1999.00,
                'active_duration' => 30,
            ],
            [
                'name' => 'Enterprise 1 Gbps',
                'speed' => '1 Gbps',
                'price' => 4999.00,
                'active_duration' => 30,
            ],
        ];

        foreach ($packages as $packageData) {
            Package::create($packageData);
        }

        // Create additional members
        Member::factory()->count(15)->create();

        // Create some packages
        Package::factory()->count(5)->create();

        // Create subscriptions with transactions
        $packages = Package::all();
        $members = Member::users()->get();

        foreach ($members->take(10) as $member) {
            $package = $packages->random();
            
            $subscription = Subscription::factory()
                ->for($member)
                ->for($package)
                ->active()
                ->create();

            // Create transaction for the subscription
            Transaction::factory()
                ->for($member)
                ->for($subscription)
                ->completed()
                ->create([
                    'amount' => $package->price,
                    'transaction_date' => $subscription->start_date,
                ]);
        }

        // Create some expired subscriptions
        foreach ($members->skip(10)->take(5) as $member) {
            $package = $packages->random();
            
            $subscription = Subscription::factory()
                ->for($member)
                ->for($package)
                ->expired()
                ->create();

            // Create transaction for the subscription
            Transaction::factory()
                ->for($member)
                ->for($subscription)
                ->completed()
                ->create([
                    'amount' => $package->price,
                    'transaction_date' => $subscription->start_date,
                ]);
        }

        // Create some additional random transactions
        Transaction::factory()->count(20)->create();
    }
}