"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    CreditCard,
    Lock,
    ShieldCheck,
    CheckCircle,
    ArrowLeft,
    Loader2,
} from "lucide-react";

export default function PaymentPage({ params }: { params: Promise<{ type: string }> }) {
    const resolvedParams = use(params);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Mock Product Data
    const product = resolvedParams.type === "premium"
        ? {
            name: "VisaIQ Premium Access",
            description: "Unlock full document checklists, examples, and expert guides for your visa application.",
            price: 49.00,
            features: ["Complete Document Vault", "Sample Declarations", "Priority Support", "Application Templates"]
        }
        : {
            name: "Lawyer Consultation",
            description: "60-minute video consultation with Sarah Jenkins.",
            price: 200.00,
            features: ["Document Review", "Strategy Session", "Q&A", "Follow-up Email"]
        };

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="mesh-background" />
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass-card p-8 max-w-md w-full text-center"
                >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
                    <p className="text-slate-400 mb-8">
                        Thank you for your purchase. You now have full access to {product.name}.
                    </p>
                    <button
                        onClick={() => window.location.href = "/user/dashboard"}
                        className="glass-button w-full"
                    >
                        Go to Dashboard
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="mesh-background" />

            <nav className="nav-glass fixed top-0 left-0 right-0 z-50 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">Secure Checkout</span>
                    </div>
                </div>
            </nav>

            <main className="pt-28 pb-16 px-6">
                <div className="max-w-5xl mx-auto">
                    <a href="#" onClick={() => window.history.back()} className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition mb-8">
                        <ArrowLeft className="w-5 h-5" />
                        Cancel and Go Back
                    </a>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Order Summary */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
                            <div className="glass-card p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />

                                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                                <p className="text-slate-400 mb-6">{product.description}</p>

                                <ul className="space-y-3 mb-8">
                                    {product.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                            <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                                <CheckCircle className="w-3 h-3 text-emerald-400" />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div className="border-t border-white/10 pt-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-slate-400">Subtotal</span>
                                        <span className="text-white">${product.price.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-slate-400">GST (10%)</span>
                                        <span className="text-white">${(product.price * 0.1).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xl font-bold">
                                        <span className="text-white">Total</span>
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                                            ${(product.price * 1.1).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Payment Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h2 className="text-2xl font-bold text-white mb-6">Payment Details</h2>
                            <div className="glass-card p-8">
                                <form onSubmit={handlePayment} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-2">Cardholder Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full glass-input"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-2">Card Number</label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <input
                                                type="text"
                                                placeholder="0000 0000 0000 0000"
                                                className="w-full glass-input pl-12"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-400 mb-2">Expiry Date</label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="w-full glass-input"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-400 mb-2">CVC</label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input
                                                    type="text"
                                                    placeholder="123"
                                                    className="w-full glass-input pl-11"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="w-full glass-button py-4 mt-4 flex items-center justify-center gap-2 group"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                Pay ${(product.price * 1.1).toFixed(2)}
                                                <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition" />
                                            </>
                                        )}
                                    </button>

                                    <div className="text-center">
                                        <p className="text-xs text-slate-500 mt-4 flex items-center justify-center gap-2">
                                            <Lock className="w-3 h-3" />
                                            Your payment information is encrypted and secure.
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
