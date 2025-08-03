import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
    errors?: Record<string, string>;
    [key: string]: unknown;
}

export default function MemberLogin({ errors = {} }: Props) {
    const [data, setData] = useState({
        username: '',
        password: '',
    });
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        router.post('/login', data, {
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <>
            <Head title="Login - Internet Subscription Management" />
            
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
                        <h2 className="text-2xl font-bold text-gray-900">Welcome Back! 👋</h2>
                        <p className="text-gray-600 mt-2">Sign in to your account</p>
                    </div>

                    {/* Login Form */}
                    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    value={data.username}
                                    onChange={(e) => setData({ ...data, username: e.target.value })}
                                    className="mt-1"
                                    placeholder="Enter your username"
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
                                    placeholder="Enter your password"
                                    required
                                />
                                {errors.password && (
                                    <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                {processing ? 'Signing in...' : 'Sign In 🚀'}
                            </Button>
                        </form>

                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <p className="text-center text-gray-600">
                                Don't have an account?{' '}
                                <Link
                                    href="/register"
                                    className="text-blue-600 hover:text-blue-800 font-semibold"
                                >
                                    Register here
                                </Link>
                            </p>
                        </div>

                        {/* Demo Credentials */}
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">Demo Credentials:</h3>
                            <div className="space-y-2 text-sm">
                                <div className="bg-red-50 p-2 rounded">
                                    <strong className="text-red-600">Admin:</strong> username: admin, password: password
                                </div>
                                <div className="bg-blue-50 p-2 rounded">
                                    <strong className="text-blue-600">User:</strong> username: user, password: password
                                </div>
                            </div>
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