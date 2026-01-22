"use client";
import Link from "next/link";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Shield,
    Upload,
    CheckCircle,
    ArrowRight,
    Briefcase,
    User,
    Mail,
    Phone,
    MapPin,
    Loader2,
    Globe,
    Check,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function LawyerSignupPage() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleGoogleSignIn = async () => {
        const supabase = createClient();

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
                queryParams: {
                    user_type: 'lawyer' // Pass metadata to handling callback if needed later
                }
            },
        });

        if (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsComplete(true);
        }, 2000);
    };

    if (isComplete) {
        return (
            <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">
                <div className="hidden lg:flex flex-col justify-center p-16 relative bg-emerald-900">
                    <div className="mb-8 max-w-lg">
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-6 text-emerald-900 shadow-lg">
                            <Globe className="w-6 h-6" />
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-4 font-serif">Welcome to YourVisaSite</h1>
                        <p className="text-xl text-emerald-100">Your application is under review.</p>
                    </div>
                </div>

                <div className="flex items-center justify-center p-6 lg:p-16">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="card p-8 max-w-md w-full text-center bg-white border-slate-200 shadow-xl"
                    >
                        <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6 border border-emerald-100">
                            <CheckCircle className="w-10 h-10 text-emerald-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2 font-serif">Application Submitted!</h2>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            Thank you for applying to join YourVisaSite. Our team will review your credentials and verify your MARN registration. You will receive an email update within 24-48 hours.
                        </p>
                        <Link href="/" className="btn-primary w-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-700">
                            Return Home
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">
            {/* Left Content */}
            <div className="hidden lg:flex flex-col justify-between p-16 relative bg-emerald-900">
                <div>
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mb-6 text-emerald-900 shadow-md">
                        <Globe className="w-5 h-5" />
                    </div>
                    <h1 className="text-5xl font-bold text-white mb-6 leading-tight font-serif">
                        Grow your practice with <br />
                        <span className="text-emerald-300">intelligent tools.</span>
                    </h1>
                    <p className="text-xl text-emerald-100 max-w-lg mb-8">
                        Join Australia&apos;s fastest-growing visa platform. Access verified leads, streamlined document management, and automated workflow tools.
                    </p>

                    <div className="space-y-4">
                        {[
                            "Direct access to qualified leads",
                            "Secure document vault for every client",
                            "Automated status updates & tracking",
                            "Community authority & verified badge"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-emerald-50">
                                <div className="w-6 h-6 rounded-full bg-emerald-800 flex items-center justify-center border border-emerald-700">
                                    <Check className="w-3 h-3 text-emerald-300" />
                                </div>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-4 text-emerald-200 text-sm">
                    <Link href="#" className="hover:text-white transition underline">Terms of Service</Link>
                    <Link href="#" className="hover:text-white transition underline">Privacy Policy</Link>
                </div>
            </div>

            {/* Right Form */}
            <div className="flex items-center justify-center p-6 lg:p-16 bg-white lg:bg-slate-50">
                <div className="w-full max-w-md bg-white lg:p-10 lg:rounded-2xl lg:shadow-xl lg:border lg:border-slate-200">
                    <div className="lg:hidden mb-8">
                        <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center mb-4 text-white">
                            <Globe className="w-5 h-5" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 font-serif">Join YourVisaSite</h1>
                    </div>

                    <div className="mb-8 flex items-center gap-2 text-sm font-medium">
                        <span className={`flex items-center justify-center w-6 h-6 rounded-full ${step >= 1 ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500"}`}>1</span>
                        <span className={step >= 1 ? "text-slate-900" : "text-slate-500"}>Personal</span>
                        <div className="w-8 h-px bg-slate-200" />
                        <span className={`flex items-center justify-center w-6 h-6 rounded-full ${step >= 2 ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500"}`}>2</span>
                        <span className={step >= 2 ? "text-slate-900" : "text-slate-500"}>Professional</span>
                    </div>

                    {step === 1 && (
                        <div className="mb-8">
                            {/* Google Sign In Button */}
                            <button
                                onClick={handleGoogleSignIn}
                                className="w-full flex items-center justify-center gap-3 p-3 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors mb-6 shadow-sm"
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
                                    <span className="px-4 bg-white text-slate-500">or sign up with email</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); setStep(2); }}>
                        <AnimatePresence mode="wait">
                            {step === 1 ? (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">First Name</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input type="text" className="input-field pl-10" placeholder="Jane" required />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Last Name</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input type="text" className="input-field pl-10" placeholder="Doe" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input type="email" className="input-field pl-10" placeholder="jane@lawfirm.com" required />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input type="tel" className="input-field pl-10" placeholder="+61 400 000 000" required />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Create Password</label>
                                        <input type="password" className="input-field" placeholder="••••••••" required />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn-primary w-full mt-6 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 shadow-md"
                                    >
                                        Continue <ArrowRight className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">MARN (Migration Agent Registration Number)</label>
                                        <div className="relative">
                                            <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input type="text" className="input-field pl-10" placeholder="1234567" required />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Firm Name</label>
                                        <div className="relative">
                                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input type="text" className="input-field pl-10" placeholder="Doe & Associates" required />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Office Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input type="text" className="input-field pl-10" placeholder="Melbourne, VIC" required />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Credentials</label>
                                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition cursor-pointer hover:border-emerald-400">
                                            <Upload className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                                            <p className="text-sm text-slate-900 font-medium">Click to upload documents</p>
                                            <p className="text-xs text-slate-500 mt-1">Practicing Certificate, Insurance, etc.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 mt-6">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="px-6 btn-secondary"
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="flex-1 btn-primary flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 shadow-md"
                                        >
                                            {isSubmitting ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                "Submit Application"
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </div>
        </div>
    );
}
