"use client";
import Link from "next/link";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Sparkles,
    Bell,
    User,
    DollarSign,
    Percent,
    Tag,
    TrendingUp,
    Plus,
    Edit,
    Trash2,
    Save,
    Clock,
    CheckCircle,
    Copy,
} from "lucide-react";

// Mock discount codes
const discountCodes = [
    { code: "LAUNCH2026", discount: 20, type: "percentage", uses: 156, maxUses: 500, expires: "Feb 28, 2026", active: true },
    { code: "PARTNER50", discount: 50, type: "percentage", uses: 23, maxUses: 100, expires: "Mar 31, 2026", active: true },
    { code: "FLAT10", discount: 10, type: "fixed", uses: 89, maxUses: null, expires: null, active: true },
    { code: "BETA2025", discount: 30, type: "percentage", uses: 500, maxUses: 500, expires: "Dec 31, 2025", active: false },
];

// Revenue data
const revenueStats = [
    { label: "Today", value: "$1,247", change: "+12%" },
    { label: "This Week", value: "$8,920", change: "+8%" },
    { label: "This Month", value: "$34,560", change: "+15%" },
    { label: "Total", value: "$245,890", change: "" },
];

export default function AdminPricing() {
    const [premiumPrice, setPremiumPrice] = useState(49);
    const [commissionRate, setCommissionRate] = useState(15);
    const [showNewCode, setShowNewCode] = useState(false);
    const [newCode, setNewCode] = useState({ code: "", discount: "", type: "percentage", maxUses: "", expires: "" });

    return (
        <div className="min-h-screen">
            {/* Mesh Background */}
            <div className="mesh-background" />

            {/* Navigation */}
            <nav className="nav-sticky fixed top-0 left-0 right-0 z-50 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">YourVisaSite</span>
                        <span className="px-2 py-1 rounded-lg bg-red-500/20 text-red-400 text-xs font-medium">ADMIN</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/admin/dashboard" className="nav-link text-sm font-medium">Dashboard</Link>
                        <Link href="/admin/users" className="nav-link text-sm font-medium">Users</Link>
                        <Link href="/admin/lawyers" className="nav-link text-sm font-medium">Lawyers</Link>
                        <Link href="/admin/pricing" className="nav-link text-sm font-medium text-white">Pricing</Link>
                        <Link href="/admin/content" className="nav-link text-sm font-medium">Content</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 rounded-xl card hover:bg-white/10 transition">
                            <Bell className="w-5 h-5 text-slate-300" />
                        </button>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-28 pb-16 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl font-bold text-white mb-2">Pricing Configuration</h1>
                        <p className="text-slate-400">Manage platform pricing, commissions, and discount codes</p>
                    </motion.div>

                    {/* Revenue Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-4 gap-4 mb-8"
                    >
                        {revenueStats.map((stat) => (
                            <div key={stat.label} className="card p-5">
                                <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
                                <div className="flex items-end justify-between">
                                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                                    {stat.change && (
                                        <span className="text-sm text-emerald-400 flex items-center gap-1">
                                            <TrendingUp className="w-4 h-4" />
                                            {stat.change}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Premium Visa Pricing */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="card p-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                                    <DollarSign className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Premium Visa Access</h2>
                                    <p className="text-sm text-slate-400">Price per visa unlock</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="text-sm text-slate-400 mb-2 block">Price (AUD)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-slate-400">$</span>
                                    <input
                                        type="number"
                                        value={premiumPrice}
                                        onChange={(e) => setPremiumPrice(Number(e.target.value))}
                                        className="w-full pl-12 pr-4 py-4 text-3xl font-bold bg-white/5 border border-white/10 rounded-xl text-white focus:border-indigo-500 focus:outline-none transition"
                                    />
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-white/5 mb-4">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-400">Revenue per sale</span>
                                    <span className="text-white">${(premiumPrice * (100 - commissionRate) / 100).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Platform fee</span>
                                    <span className="text-white">${(premiumPrice * commissionRate / 100).toFixed(2)}</span>
                                </div>
                            </div>

                            <button className="w-full py-3 rounded-xl bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition flex items-center justify-center gap-2">
                                <Save className="w-4 h-4" />
                                Save Price
                            </button>
                        </motion.div>

                        {/* Commission Rate */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="card p-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                    <Percent className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Commission Rate</h2>
                                    <p className="text-sm text-slate-400">Platform fee on lawyer consultations</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="text-sm text-slate-400 mb-2 block">Rate (%)</label>
                                <div className="relative">
                                    <input
                                        type="range"
                                        min="5"
                                        max="30"
                                        value={commissionRate}
                                        onChange={(e) => setCommissionRate(Number(e.target.value))}
                                        className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
                                    />
                                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                                        <span>5%</span>
                                        <span>15%</span>
                                        <span>30%</span>
                                    </div>
                                </div>
                                <div className="text-center mt-4">
                                    <span className="text-4xl font-bold text-white">{commissionRate}%</span>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-white/5 mb-4">
                                <p className="text-sm text-slate-400 mb-2">Example: $280 consultation</p>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Lawyer receives</span>
                                    <span className="text-emerald-400 font-medium">${(280 * (100 - commissionRate) / 100).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Platform fee</span>
                                    <span className="text-white">${(280 * commissionRate / 100).toFixed(2)}</span>
                                </div>
                            </div>

                            <button className="w-full py-3 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition flex items-center justify-center gap-2">
                                <Save className="w-4 h-4" />
                                Save Rate
                            </button>
                        </motion.div>
                    </div>

                    {/* Discount Codes */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                    <Tag className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Discount Codes</h2>
                                    <p className="text-sm text-slate-400">Manage promotional codes</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowNewCode(!showNewCode)}
                                className="btn-primary flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                New Code
                            </button>
                        </div>

                        {/* New Code Form */}
                        {showNewCode && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                className="card p-6 mb-4 overflow-hidden"
                            >
                                <h3 className="text-white font-medium mb-4">Create New Discount Code</h3>
                                <div className="grid grid-cols-5 gap-4">
                                    <input
                                        type="text"
                                        placeholder="CODE"
                                        value={newCode.code}
                                        onChange={(e) => setNewCode({ ...newCode, code: e.target.value.toUpperCase() })}
                                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none uppercase"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Discount"
                                        value={newCode.discount}
                                        onChange={(e) => setNewCode({ ...newCode, discount: e.target.value })}
                                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                                    />
                                    <select
                                        value={newCode.type}
                                        onChange={(e) => setNewCode({ ...newCode, type: e.target.value })}
                                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-indigo-500 focus:outline-none appearance-none"
                                    >
                                        <option value="percentage" className="bg-slate-800">Percentage</option>
                                        <option value="fixed" className="bg-slate-800">Fixed ($)</option>
                                    </select>
                                    <input
                                        type="number"
                                        placeholder="Max Uses"
                                        value={newCode.maxUses}
                                        onChange={(e) => setNewCode({ ...newCode, maxUses: e.target.value })}
                                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                                    />
                                    <button className="px-4 py-3 rounded-xl bg-purple-500 text-white font-medium hover:bg-purple-600 transition">
                                        Create
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Codes List */}
                        <div className="card overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="text-left text-sm text-slate-400 font-medium p-4">Code</th>
                                        <th className="text-left text-sm text-slate-400 font-medium p-4">Discount</th>
                                        <th className="text-left text-sm text-slate-400 font-medium p-4">Uses</th>
                                        <th className="text-left text-sm text-slate-400 font-medium p-4">Expires</th>
                                        <th className="text-left text-sm text-slate-400 font-medium p-4">Status</th>
                                        <th className="text-right text-sm text-slate-400 font-medium p-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {discountCodes.map((code) => (
                                        <tr key={code.code} className="border-b border-white/5 hover:bg-white/5 transition">
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-white font-mono font-medium">{code.code}</span>
                                                    <button className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition">
                                                        <Copy className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="text-white">
                                                    {code.type === "percentage" ? `${code.discount}%` : `$${code.discount}`}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className="text-slate-300">
                                                    {code.uses}{code.maxUses ? ` / ${code.maxUses}` : ""}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className="text-slate-400 flex items-center gap-1">
                                                    {code.expires ? (
                                                        <>
                                                            <Clock className="w-4 h-4" />
                                                            {code.expires}
                                                        </>
                                                    ) : (
                                                        "Never"
                                                    )}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-lg text-xs flex items-center gap-1 w-fit ${code.active
                                                        ? "bg-emerald-500/20 text-emerald-400"
                                                        : "bg-slate-500/20 text-slate-400"
                                                    }`}>
                                                    {code.active ? <CheckCircle className="w-3 h-3" /> : null}
                                                    {code.active ? "Active" : "Expired"}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
