import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Package {
    id: number;
    name: string;
    speed: string;
    price: number;
}

interface Subscription {
    id: number;
    package: Package;
    start_date: string;
    end_date: string;
    status: string;
}

interface Transaction {
    id: number;
    subscription: {
        package: Package;
    };
    amount: number;
    status: string;
    transaction_date: string;
}

interface Stats {
    transaction_count: number;
    total_spent: number;
}

interface Props {
    active_subscription: Subscription | null;
    stats: Stats;
    recent_transactions: Transaction[];
    [key: string]: unknown;
}

export default function UserDashboard({ active_subscription, stats, recent_transactions }: Props) {
    return (
        <>
            <Head title="User Dashboard" />
            
            <AppShell>
                <div className="p-6 space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">👤 My Dashboard</h1>
                            <p className="text-gray-600 mt-1">Manage your internet subscriptions and view your activity.</p>
                        </div>
                        
                        <div className="flex space-x-3">
                            <Link href="/user/packages">
                                <Button>🛍️ Browse Packages</Button>
                            </Link>
                            {!active_subscription && (
                                <Link href="/user/subscribe">
                                    <Button variant="outline">⚡ Subscribe Now</Button>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Current Subscription */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">📡 Current Subscription</h2>
                        
                        {active_subscription ? (
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">{active_subscription.package.name}</h3>
                                        <p className="text-lg text-gray-600">{active_subscription.package.speed}</p>
                                        <p className="text-3xl font-bold text-blue-600 mt-2">₱{active_subscription.package.price}/month</p>
                                    </div>
                                    <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                                        {active_subscription.status}
                                    </span>
                                </div>
                                
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Start Date</p>
                                            <p className="font-semibold">{active_subscription.start_date}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">End Date</p>
                                            <p className="font-semibold">{active_subscription.end_date}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📡</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Subscription</h3>
                                <p className="text-gray-600 mb-4">You don't have an active internet subscription yet.</p>
                                <Link href="/user/packages">
                                    <Button>🛍️ Browse Available Packages</Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                                    <p className="text-3xl font-bold text-gray-900">{stats.transaction_count}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <span className="text-2xl">💳</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Spent</p>
                                    <p className="text-3xl font-bold text-gray-900">₱{stats.total_spent.toLocaleString()}</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <span className="text-2xl">💰</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold text-gray-900">💳 Recent Transactions</h2>
                                <Link href="/user/transactions">
                                    <Button variant="outline" size="sm">View All</Button>
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {recent_transactions.length > 0 ? (
                                <div className="space-y-4">
                                    {recent_transactions.map((transaction) => (
                                        <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{transaction.subscription.package.name}</h3>
                                                <p className="text-sm text-gray-600">{transaction.subscription.package.speed}</p>
                                                <p className="text-xs text-gray-500">{transaction.transaction_date}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                    transaction.status === 'completed' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : transaction.status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {transaction.status}
                                                </span>
                                                <p className="text-sm font-semibold text-gray-900 mt-1">₱{transaction.amount}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">💳</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Transactions Yet</h3>
                                    <p className="text-gray-600">Your transaction history will appear here.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">⚡ Quick Actions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Link href="/user/packages">
                                <Button variant="outline" className="w-full">
                                    🛍️ Browse Packages
                                </Button>
                            </Link>
                            <Link href="/user/transactions">
                                <Button variant="outline" className="w-full">
                                    💳 View Transactions
                                </Button>
                            </Link>
                            {!active_subscription && (
                                <Link href="/user/subscribe">
                                    <Button className="w-full">
                                        ⚡ Subscribe Now
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </AppShell>
        </>
    );
}