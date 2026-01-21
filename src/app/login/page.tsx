"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Chrome, ArrowRight, Shield, Users, Scale } from "lucide-react";

import { signInWithGoogle } from "@/app/actions/auth";

export default function LoginPage() {
    const handleGoogleSignIn = async () => {
        await signInWithGoogle();
    };

    return (
        <div className="min-h-screen flex">
            {/* Mesh Background */}
            <div className="mesh-background" />

            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative p-12 flex-col justify-between">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-16">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">VisaIQ</span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Navigate Your
                            <br />
                            <span className="gradient-text">Australian Visa</span>
                            <br />
                            Journey
                        </h1>
                        <p className="text-xl text-slate-400 max-w-md">
                            Real-time tracking, expert guidance, and intelligent document management.
                        </p>
                    </motion.div>
                </div>

                {/* Features List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="relative z-10 space-y-4"
                >
                    {[
                        { icon: Shield, text: "Secure document vault with encryption" },
                        { icon: Users, text: "Connect with verified immigration lawyers" },
                        { icon: Scale, text: "Real-time processing time tracker" },
                    ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3 text-slate-300">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                <item.icon className="w-5 h-5 text-indigo-400" />
                            </div>
                            <span>{item.text}</span>
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
                    <div className="glass-card p-8">
                        {/* Mobile Logo */}
                        <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">VisaIQ</span>
                        </div>

                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
                            <p className="text-slate-400">Sign in to continue your visa journey</p>
                        </div>

                        {/* Google Sign In Button */}
                        <button
                            onClick={handleGoogleSignIn}
                            className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-white hover:bg-slate-100 transition group mb-6"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="text-slate-800 font-medium">Continue with Google</span>
                        </button>

                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-[#0a0a1a] text-slate-500">or</span>
                            </div>
                        </div>

                        {/* Email Input (placeholder) */}
                        <div className="space-y-4 mb-6">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none transition"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none transition"
                            />
                        </div>

                        <button className="w-full glass-button py-4 mb-6">
                            Sign In
                        </button>

                        <p className="text-center text-sm text-slate-400">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 transition">
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
                            className="glass p-4 rounded-2xl hover:bg-white/10 transition group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                    <Scale className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-white font-medium text-sm">Lawyer?</p>
                                    <p className="text-xs text-slate-400">Join as expert</p>
                                </div>
                            </div>
                        </Link>
                        <Link
                            href="/admin/dashboard"
                            className="glass p-4 rounded-2xl hover:bg-white/10 transition group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-rose-400" />
                                </div>
                                <div>
                                    <p className="text-white font-medium text-sm">Admin?</p>
                                    <p className="text-xs text-slate-400">Manage platform</p>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
