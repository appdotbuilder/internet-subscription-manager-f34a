import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Package {
    id: number;
    name: string;
    speed: string;
    price: number;
    active_duration: number;
}

interface Props {
    packages: Package[];
    [key: string]: unknown;
}

export default function UserPackages({ packages }: Props) {
    return (
        <>
            <Head title="Internet Packages" />
            
            <AppShell>
                <div className="p-6 space-y-6">
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🛍️ Available Internet Packages</h1>
                        <p className="text-gray-600 mt-1">Choose the perfect internet plan for your needs.</p>
                    </div>

                    {/* Packages Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {packages.map((pkg, index) => (
                            <div 
                                key={pkg.id} 
                                className={`bg-white rounded-xl shadow-lg border-2 p-6 relative ${
                                    index === 1 ? 'border-blue-500 transform scale-105' : 'border-gray-100'
                                }`}
                            >
                                {index === 1 && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                            🔥 Most Popular
                                        </span>
                                    </div>
                                )}
                                
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                                    <div className="text-4xl font-bold text-blue-600 mb-2">
                                        ₱{pkg.price.toLocaleString()}
                                        <span className="text-lg text-gray-500">/month</span>
                                    </div>
                                    <p className="text-lg text-gray-600 mb-6">{pkg.speed}</p>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center text-gray-600">
                                        <span className="text-green-500 mr-2">✓</span>
                                        Speed: {pkg.speed}
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <span className="text-green-500 mr-2">✓</span>
                                        Duration: {pkg.active_duration} days
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <span className="text-green-500 mr-2">✓</span>
                                        24/7 Customer Support
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <span className="text-green-500 mr-2">✓</span>
                                        Unlimited Data
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <span className="text-green-500 mr-2">✓</span>
                                        Free Installation
                                    </div>
                                </div>

                                <Link href={`/user/subscribe?package=${pkg.id}`}>
                                    <Button 
                                        className={`w-full ${
                                            index === 1 
                                                ? 'bg-blue-600 hover:bg-blue-700' 
                                                : ''
                                        }`}
                                    >
                                        ⚡ Subscribe Now
                                    </Button>
                                </Link>

                                <div className="text-center mt-3">
                                    <p className="text-xs text-gray-500">
                                        Perfect for {
                                            pkg.speed.includes('10') ? 'basic browsing and email' :
                                            pkg.speed.includes('25') ? 'HD streaming and video calls' :
                                            pkg.speed.includes('50') ? 'multiple devices and gaming' :
                                            pkg.speed.includes('100') ? 'heavy usage and work from home' :
                                            pkg.speed.includes('200') ? 'small businesses' :
                                            'enterprises and large businesses'
                                        }
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Features Comparison */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">📊 All Plans Include</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl">🌐</span>
                                </div>
                                <h3 className="font-semibold text-gray-900">Unlimited Data</h3>
                                <p className="text-sm text-gray-600 mt-1">No data caps or throttling</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl">🛡️</span>
                                </div>
                                <h3 className="font-semibold text-gray-900">Security</h3>
                                <p className="text-sm text-gray-600 mt-1">Advanced firewall protection</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl">📞</span>
                                </div>
                                <h3 className="font-semibold text-gray-900">24/7 Support</h3>
                                <p className="text-sm text-gray-600 mt-1">Round-the-clock assistance</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl">🔧</span>
                                </div>
                                <h3 className="font-semibold text-gray-900">Free Setup</h3>
                                <p className="text-sm text-gray-600 mt-1">Professional installation</p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">❓ Frequently Asked Questions</h2>
                        
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">How long does installation take?</h3>
                                <p className="text-gray-600">Usually 1-2 business days after subscription confirmation.</p>
                            </div>
                            
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Can I upgrade my plan later?</h3>
                                <p className="text-gray-600">Yes! Contact our support team to upgrade your plan anytime.</p>
                            </div>
                            
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
                                <p className="text-gray-600">We accept all major credit cards, bank transfers, and digital wallets.</p>
                            </div>
                            
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Is there a contract period?</h3>
                                <p className="text-gray-600">All plans are month-to-month with 30-day billing cycles.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </AppShell>
        </>
    );
}