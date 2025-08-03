import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
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

export default function CreateSubscription({ packages }: Props) {
    const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
    const [processing, setProcessing] = useState(false);

    // Get package from URL params if available
    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const packageId = urlParams.get('package');
        if (packageId) {
            setSelectedPackage(parseInt(packageId));
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!selectedPackage) {
            alert('Please select a package');
            return;
        }

        setProcessing(true);

        router.post('/user/subscribe', {
            package_id: selectedPackage
        }, {
            onFinish: () => setProcessing(false),
        });
    };

    const selected = packages.find(pkg => pkg.id === selectedPackage);

    return (
        <>
            <Head title="Subscribe to Internet Package" />
            
            <AppShell>
                <div className="p-6 space-y-6">
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">⚡ Subscribe to Internet Package</h1>
                        <p className="text-gray-600 mt-1">Choose your internet plan and get connected today!</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Package Selection */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">📦 Select Your Package</h2>
                                
                                <div className="space-y-4">
                                    {packages.map((pkg) => (
                                        <div
                                            key={pkg.id}
                                            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                                                selectedPackage === pkg.id
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                            onClick={() => setSelectedPackage(pkg.id)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className={`w-4 h-4 rounded-full border-2 mr-4 ${
                                                        selectedPackage === pkg.id
                                                            ? 'bg-blue-500 border-blue-500'
                                                            : 'border-gray-300'
                                                    }`}>
                                                        {selectedPackage === pkg.id && (
                                                            <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900">{pkg.name}</h3>
                                                        <p className="text-gray-600">{pkg.speed} • {pkg.active_duration} days</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold text-blue-600">₱{pkg.price.toLocaleString()}</p>
                                                    <p className="text-sm text-gray-500">per month</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">📋 Order Summary</h2>
                                
                                {selected ? (
                                    <div className="space-y-4">
                                        <div className="border-b border-gray-100 pb-4">
                                            <h3 className="font-semibold text-gray-900">{selected.name}</h3>
                                            <p className="text-gray-600">{selected.speed}</p>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Package Price:</span>
                                                <span className="font-semibold">₱{selected.price.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Duration:</span>
                                                <span className="font-semibold">{selected.active_duration} days</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Setup Fee:</span>
                                                <span className="font-semibold text-green-600">FREE</span>
                                            </div>
                                        </div>
                                        
                                        <div className="border-t border-gray-100 pt-4">
                                            <div className="flex justify-between text-lg">
                                                <span className="font-semibold">Total:</span>
                                                <span className="font-bold text-blue-600">₱{selected.price.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-4 mt-6">
                                            <h4 className="font-semibold text-gray-900 mb-2">📅 Subscription Details</h4>
                                            <ul className="text-sm text-gray-600 space-y-1">
                                                <li>• Start Date: Today ({new Date().toLocaleDateString()})</li>
                                                <li>• End Date: {new Date(Date.now() + (selected.active_duration * 24 * 60 * 60 * 1000)).toLocaleDateString()}</li>
                                                <li>• Status: Active immediately</li>
                                                <li>• Payment: Due now</li>
                                            </ul>
                                        </div>

                                        <form onSubmit={handleSubmit}>
                                            <Button
                                                type="submit"
                                                className="w-full mt-6"
                                                disabled={processing}
                                            >
                                                {processing ? 'Processing...' : '🚀 Subscribe Now'}
                                            </Button>
                                        </form>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <span className="text-2xl">📦</span>
                                        </div>
                                        <p className="text-gray-600">Select a package to see the order summary</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="font-semibold text-gray-900 mb-3">📋 Terms & Conditions</h3>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• By subscribing, you agree to our terms of service and privacy policy</li>
                            <li>• Subscription will automatically start today and end after 30 days</li>
                            <li>• Payment is due immediately upon subscription</li>
                            <li>• Installation will be scheduled within 1-2 business days</li>
                            <li>• 24/7 customer support is included with all plans</li>
                            <li>• You can upgrade or cancel your subscription at any time</li>
                        </ul>
                    </div>
                </div>
            </AppShell>
        </>
    );
}