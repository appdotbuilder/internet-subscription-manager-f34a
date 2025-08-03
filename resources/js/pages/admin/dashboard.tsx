import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Stats {
    total_packages: number;
    total_members: number;
    active_subscriptions: number;
    total_revenue: number;
}

interface Subscription {
    id: number;
    member: {
        full_name: string;
        email: string;
    };
    package: {
        name: string;
        speed: string;
        price: number;
    };
    status: string;
    start_date: string;
    end_date: string;
}

interface Transaction {
    id: number;
    member: {
        full_name: string;
    };
    subscription: {
        package: {
            name: string;
        };
    };
    amount: number;
    status: string;
    transaction_date: string;
}

interface Props {
    stats: Stats;
    recent_subscriptions: Subscription[];
    recent_transactions: Transaction[];
    [key: string]: unknown;
}

export default function AdminDashboard({ stats, recent_subscriptions, recent_transactions }: Props) {
    return (
        <>
            <Head title="Admin Dashboard" />
            
            <AppShell>
                <div className="p-6 space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">👨‍💼 Admin Dashboard</h1>
                            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your internet service.</p>
                        </div>
                        
                        <div className="flex space-x-3">
                            <Link href="/admin/packages/create">
                                <Button>📦 Add Package</Button>
                            </Link>
                            <Link href="/admin/members/create">
                                <Button variant="outline">👤 Add Member</Button>
                            </Link>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Packages</p>
                                    <p className="text-3xl font-bold text-gray-900">{stats.total_packages}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <span className="text-2xl">📦</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Members</p>
                                    <p className="text-3xl font-bold text-gray-900">{stats.total_members}</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <span className="text-2xl">👥</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Active Subscriptions</p>
                                    <p className="text-3xl font-bold text-gray-900">{stats.active_subscriptions}</p>
                                </div>
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <span className="text-2xl">⚡</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                                    <p className="text-3xl font-bold text-gray-900">₱{stats.total_revenue.toLocaleString()}</p>
                                </div>
                                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                    <span className="text-2xl">💰</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Subscriptions */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-gray-900">🔄 Recent Subscriptions</h2>
                                    <Link href="/admin/subscriptions">
                                        <Button variant="outline" size="sm">View All</Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {recent_subscriptions.map((subscription) => (
                                        <div key={subscription.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{subscription.member.full_name}</h3>
                                                <p className="text-sm text-gray-600">{subscription.package.name}</p>
                                                <p className="text-xs text-gray-500">{subscription.start_date} - {subscription.end_date}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                    subscription.status === 'active' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {subscription.status}
                                                </span>
                                                <p className="text-sm font-semibold text-gray-900 mt-1">₱{subscription.package.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recent Transactions */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-gray-900">💳 Recent Transactions</h2>
                                    <Link href="/admin/transactions">
                                        <Button variant="outline" size="sm">View All</Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {recent_transactions.map((transaction) => (
                                        <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{transaction.member.full_name}</h3>
                                                <p className="text-sm text-gray-600">{transaction.subscription.package.name}</p>
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
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">⚡ Quick Actions</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Link href="/admin/packages">
                                <Button variant="outline" className="w-full">
                                    📦 Manage Packages
                                </Button>
                            </Link>
                            <Link href="/admin/members">
                                <Button variant="outline" className="w-full">
                                    👥 Manage Members
                                </Button>
                            </Link>
                            <Link href="/admin/subscriptions">
                                <Button variant="outline" className="w-full">
                                    🔄 View Subscriptions
                                </Button>
                            </Link>
                            <Link href="/admin/transactions">
                                <Button variant="outline" className="w-full">
                                    💳 View Transactions
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </AppShell>
        </>
    );
}