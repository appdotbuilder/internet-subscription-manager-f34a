import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    return (
        <>
            <Head title="Internet Subscription Management" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                {/* Header */}
                <header className="px-6 py-4">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">📡</span>
                            </div>
                            <h1 className="text-xl font-bold text-gray-900">NetManager</h1>
                        </div>
                        
                        <div className="flex space-x-4">
                            <Link href="/login">
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link href="/register">
                                <Button>Get Started</Button>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="px-6 py-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            📡 Internet Subscription Management
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Complete solution for managing internet packages, customer subscriptions, 
                            and billing transactions. Perfect for ISPs and network administrators.
                        </p>
                        
                        <div className="flex justify-center space-x-4 mb-12">
                            <Link href="/register">
                                <Button size="lg" className="px-8 py-4 text-lg font-semibold">
                                    🚀 Start Managing Subscriptions
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold">
                                    👤 Admin Login
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="px-6 py-16 bg-white/50">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            🎯 Key Features
                        </h2>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Admin Features */}
                            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">👨‍💼</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Admin Dashboard</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>📦 Manage internet packages</li>
                                    <li>👥 Customer management</li>
                                    <li>📊 View all subscriptions</li>
                                    <li>💰 Transaction monitoring</li>
                                </ul>
                            </div>

                            {/* Package Management */}
                            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">📦</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Package Management</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>⚡ Speed configurations</li>
                                    <li>💲 Flexible pricing</li>
                                    <li>📅 30-day duration</li>
                                    <li>📈 Usage analytics</li>
                                </ul>
                            </div>

                            {/* User Features */}
                            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">👤</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">User Experience</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>🛍️ Browse packages</li>
                                    <li>🔄 Easy subscription</li>
                                    <li>📄 Transaction history</li>
                                    <li>📱 Mobile-friendly</li>
                                </ul>
                            </div>

                            {/* Automation */}
                            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">🤖</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Smart Automation</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>📅 Auto start dates</li>
                                    <li>⏰ Auto expiration</li>
                                    <li>💳 Auto billing</li>
                                    <li>📧 Status updates</li>
                                </ul>
                            </div>

                            {/* Security */}
                            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">🔒</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Secure & Reliable</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>🛡️ Role-based access</li>
                                    <li>🔐 Encrypted data</li>
                                    <li>📊 Audit trails</li>
                                    <li>🚀 High performance</li>
                                </ul>
                            </div>

                            {/* Reporting */}
                            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Analytics & Reports</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>📈 Revenue tracking</li>
                                    <li>👥 Customer insights</li>
                                    <li>📋 Subscription reports</li>
                                    <li>💡 Business intelligence</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Demo Section */}
                <section className="px-6 py-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">
                            🎮 Try the Demo
                        </h2>
                        
                        <div className="bg-gray-50 rounded-xl p-8 mb-8">
                            <h3 className="text-xl font-semibold mb-4">Demo Credentials</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-lg p-4">
                                    <h4 className="font-semibold text-red-600 mb-2">👨‍💼 Admin Access</h4>
                                    <p><strong>Username:</strong> admin</p>
                                    <p><strong>Password:</strong> password</p>
                                </div>
                                <div className="bg-white rounded-lg p-4">
                                    <h4 className="font-semibold text-blue-600 mb-2">👤 User Access</h4>
                                    <p><strong>Username:</strong> user</p>
                                    <p><strong>Password:</strong> password</p>
                                </div>
                            </div>
                        </div>

                        <Link href="/login">
                            <Button size="lg" className="px-8 py-4 text-lg font-semibold">
                                🚀 Try Demo Now
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Sample Packages Preview */}
                <section className="px-6 py-16 bg-gray-50">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            💡 Sample Internet Packages
                        </h2>
                        
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-semibold mb-2">Basic Home</h3>
                                <p className="text-3xl font-bold text-blue-600 mb-2">₱299<span className="text-sm text-gray-500">/month</span></p>
                                <p className="text-gray-600 mb-4">10 Mbps • 30 days</p>
                                <p className="text-sm text-gray-500">Perfect for browsing and light streaming</p>
                            </div>
                            
                            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-500">
                                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm inline-block mb-2">Popular</div>
                                <h3 className="text-xl font-semibold mb-2">Premium Home</h3>
                                <p className="text-3xl font-bold text-blue-600 mb-2">₱799<span className="text-sm text-gray-500">/month</span></p>
                                <p className="text-gray-600 mb-4">50 Mbps • 30 days</p>
                                <p className="text-sm text-gray-500">Great for families and home offices</p>
                            </div>
                            
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
                                <p className="text-3xl font-bold text-blue-600 mb-2">₱4,999<span className="text-sm text-gray-500">/month</span></p>
                                <p className="text-gray-600 mb-4">1 Gbps • 30 days</p>
                                <p className="text-sm text-gray-500">Ultra-fast for businesses</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer CTA */}
                <footer className="px-6 py-16 bg-blue-600 text-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Ready to Manage Your Internet Business? 🚀
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Join thousands of ISPs using our platform to streamline their operations
                        </p>
                        
                        <div className="flex justify-center space-x-4">
                            <Link href="/register">
                                <Button size="lg" variant="secondary" className="px-8 py-4 text-lg font-semibold">
                                    Get Started Free
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold border-white text-white hover:bg-white hover:text-blue-600">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}