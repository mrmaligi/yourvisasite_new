"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Globe, Shield, Users, Scale, AlertCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");

    const handleGoogleSignIn = async () => {
        const supabase = createClient();

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-50">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between bg-indigo-900">
                <div>
                    <div className="flex items-center gap-3 mb-16">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-indigo-900">
                            <Globe className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-serif font-bold text-white">YourVisaSite</span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                            Navigate Your <br />
                            Australian Visa <br />
                            Journey
                        </h1>
                        <p className="text-xl text-indigo-200 max-w-md">
                            Real-time tracking, expert guidance, and intelligent document management.
                        </p>
                    </motion.div>
                </div>

                {/* Features List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-6"
                >
                    {[
                        { icon: Shield, text: "Secure document vault with encryption" },
                        { icon: Users, text: "Connect with verified immigration lawyers" },
                        { icon: Scale, text: "Real-time processing time tracker" },
                    ].map((item, index) => (
                        <div key={index} className="flex items-center gap-4 text-indigo-100">
                            <div className="w-12 h-12 rounded-xl bg-indigo-800 flex items-center justify-center">
                                <item.icon className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-lg">{item.text}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="w-full max-w-md"
                >
                    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-200">
                        {/* Mobile Logo */}
                        <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
                            <div className="w-10 h-10 rounded-lg bg-indigo-900 flex items-center justify-center text-white">
                                <Globe className="w-5 h-5" />
                            </div>
                            <span className="text-xl font-serif font-bold text-slate-900">YourVisaSite</span>
                        </div>

                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2 font-serif">Welcome Back</h2>
                            <p className="text-slate-600">Sign in to continue your visa journey</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 border border-red-200 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                <div className="text-sm">
                                    <span className="font-semibold block mb-1">Authentication Error</span>
                                    {decodeURIComponent(error)}
                                </div>
                            </div>
                        )}

                        {/* Google Sign In Button */}
                        <button
                            onClick={handleGoogleSignIn}
                            className="w-full flex items-center justify-center gap-3 p-3 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors mb-6"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="text-slate-700 font-medium">Continue with Google</span>
                        </button>

                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-slate-500">or</span>
                            </div>
                        </div>

                        {/* Email Input (placeholder) */}
                        <div className="space-y-4 mb-6">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="input-field"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="input-field"
                            />
                        </div>

                        <button className="btn-primary w-full py-3 mb-6 shadow-md hover:shadow-lg">
                            Sign In
                        </button>

                        <p className="text-center text-sm text-slate-500">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="text-indigo-600 font-medium hover:text-indigo-800 transition">
                                Sign up
                            </Link>
                        </p>
                    </div>

                    {/* Role Hints */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-6 grid grid-cols-2 gap-4"
                    >
                        <Link
                            href="/lawyer/signup"
                            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-100 transition">
                                    <Scale className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-slate-900 font-bold text-sm">Lawyer?</p>
                                    <p className="text-xs text-slate-500">Join as expert</p>
                                </div>
                            </div>
                        </Link>
                        <Link
                            href="/admin/dashboard"
                            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-rose-500 hover:shadow-md transition group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-100 transition">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-slate-900 font-bold text-sm">Admin?</p>
                                    <p className="text-xs text-slate-500">Manage platform</p>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>
    );
}
