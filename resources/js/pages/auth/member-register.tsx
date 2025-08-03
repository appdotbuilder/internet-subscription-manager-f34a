import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Props {
    errors?: Record<string, string>;
    [key: string]: unknown;
}

export default function MemberRegister({ errors = {} }: Props) {
    const [data, setData] = useState({
        full_name: '',
        address: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        password_confirmation: '',
    });
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        router.post('/register', data, {
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <>
            <Head title="Register - Internet Subscription Management" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex items-center space-x-2 mb-6">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">📡</span>
                            </div>
                            <h1 className="text-xl font-bold text-gray-900">NetManager</h1>
                        </Link>
                        <h2 className="text-2xl font-bold text-gray-900">Create Account 🚀</h2>
                        <p className="text-gray-600 mt-2">Join thousands of satisfied customers</p>
                    </div>

                    {/* Registration Form */}
                    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="full_name">Full Name</Label>
                                <Input
                                    id="full_name"
                                    type="text"
                                    value={data.full_name}
                                    onChange={(e) => setData({ ...data, full_name: e.target.value })}
                                    className="mt-1"
                                    placeholder="Enter your full name"
                                    required
                                />
                                {errors.full_name && (
                                    <p className="text-red-600 text-sm mt-1">{errors.full_name}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="address">Address</Label>
                                <Textarea
                                    id="address"
                                    value={data.address}
                                    onChange={(e) => setData({ ...data, address: e.target.value })}
                                    className="mt-1"
                                    placeholder="Enter your complete address"
                                    rows={2}
                                    required
                                />
                                {errors.address && (
                                    <p className="text-red-600 text-sm mt-1">{errors.address}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={data.phone}
                                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                                    className="mt-1"
                                    placeholder="Enter your phone number"
                                    required
                                />
                                {errors.phone && (
                                    <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                    className="mt-1"
                                    placeholder="Enter your email address"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    value={data.username}
                                    onChange={(e) => setData({ ...data, username: e.target.value })}
                                    className="mt-1"
                                    placeholder="Choose a username"
                                    required
                                />
                                {errors.username && (
                                    <p className="text-red-600 text-sm mt-1">{errors.username}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                    className="mt-1"
                                    placeholder="Create a password"
                                    required
                                />
                                {errors.password && (
                                    <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="password_confirmation">Confirm Password</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData({ ...data, password_confirmation: e.target.value })}
                                    className="mt-1"
                                    placeholder="Confirm your password"
                                    required
                                />
                                {errors.password_confirmation && (
                                    <p className="text-red-600 text-sm mt-1">{errors.password_confirmation}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                {processing ? 'Creating Account...' : 'Create Account 🎉'}
                            </Button>
                        </form>

                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <p className="text-center text-gray-600">
                                Already have an account?{' '}
                                <Link
                                    href="/login"
                                    className="text-blue-600 hover:text-blue-800 font-semibold"
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-6">
                        <Link
                            href="/"
                            className="text-gray-600 hover:text-gray-800 text-sm"
                        >
                            ← Back to home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}