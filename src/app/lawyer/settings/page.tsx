"use client";
import Link from "next/link";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Sparkles,
    Bell,
    User,
    DollarSign,
    Calendar,
    Save,
    CreditCard,
    Building,
    Check,
    ChevronRight,
} from "lucide-react";
import { signOut } from "@/app/actions/auth";

// Toggle component
function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
    return (
        <button
            onClick={onChange}
            className={`relative w-12 h-6 rounded-full transition-colors ${enabled ? "bg-indigo-500" : "bg-slate-600"
                }`}
        >
            <motion.div
                animate={{ x: enabled ? 24 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 w-4 h-4 rounded-full bg-white"
            />
        </button>
    );
}

// Visa categories for pricing
const visaCategories = [
    { id: "skilled", name: "Skilled Migration", subclasses: "189, 190, 491", multiplier: 1.0 },
    { id: "employer", name: "Employer Sponsored", subclasses: "482, 186, 494", multiplier: 1.2 },
    { id: "partner", name: "Partner & Family", subclasses: "820, 801, 309", multiplier: 1.5 },
    { id: "business", name: "Business & Investor", subclasses: "188, 132", multiplier: 2.0 },
    { id: "student", name: "Student Visas", subclasses: "500, 485", multiplier: 0.8 },
];

export default function LawyerSettings() {
    const [hourlyRate, setHourlyRate] = useState(280);
    const [halfHourAuto, setHalfHourAuto] = useState(true);
    const [halfHourRate, setHalfHourRate] = useState(150);
    const [takeoverBase, setTakeoverBase] = useState(5000);
    const [notifications, setNotifications] = useState({
        newBooking: true,
        clientMessage: true,
        reviewNotification: true,
        marketingUpdates: false,
    });
    const [availability, setAvailability] = useState({
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
    });

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
                        <span className="px-2 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs font-medium">LAWYER</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/lawyer/dashboard" className="nav-link text-sm font-medium">Dashboard</Link>
                        <Link href="/lawyer/clients" className="nav-link text-sm font-medium">Clients</Link>
                        <Link href="/lawyer/marketing" className="nav-link text-sm font-medium">Marketing</Link>
                        <Link href="/lawyer/settings" className="nav-link text-sm font-medium text-white">Settings</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 rounded-xl card hover:bg-white/10 transition">
                            <Bell className="w-5 h-5 text-slate-300" />
                        </button>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-28 pb-16 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl font-bold text-white mb-2">Settings & Pricing</h1>
                        <p className="text-slate-400">Manage your profile, pricing, and business settings</p>
                    </motion.div>

                    <div className="space-y-6">
                        {/* Profile Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="card p-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                                    <Building className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Professional Profile</h2>
                                    <p className="text-sm text-slate-400">Your public-facing information</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm text-slate-400 mb-2 block">Full Name</label>
                                        <input
                                            type="text"
                                            defaultValue="Emily Richardson"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-slate-400 mb-2 block">Firm Name</label>
                                        <input
                                            type="text"
                                            defaultValue="Richardson Immigration Law"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm text-slate-400 mb-2 block">MARN Number</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                defaultValue="1234567"
                                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition"
                                            />
                                            <span className="px-3 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm flex items-center gap-1">
                                                <Check className="w-4 h-4" />
                                                Verified
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-slate-400 mb-2 block">Experience</label>
                                        <input
                                            type="text"
                                            defaultValue="15 years"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm text-slate-400 mb-2 block">Bio</label>
                                    <textarea
                                        defaultValue="Specialising in skilled migration with over 15 years of experience helping professionals achieve their Australian dream."
                                        rows={3}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition resize-none"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Pricing Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="card p-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                    <DollarSign className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Pricing Policy</h2>
                                    <p className="text-sm text-slate-400">Set your consultation rates</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* Base Rates */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm text-slate-400 mb-2 block">Hourly Rate (AUD)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                            <input
                                                type="number"
                                                value={hourlyRate}
                                                onChange={(e) => setHourlyRate(Number(e.target.value))}
                                                className="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-indigo-500 focus:outline-none transition"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-slate-400 mb-2 flex items-center justify-between">
                                            <span>30-Minute Rate</span>
                                            <label className="flex items-center gap-2 text-xs">
                                                <input
                                                    type="checkbox"
                                                    checked={halfHourAuto}
                                                    onChange={() => setHalfHourAuto(!halfHourAuto)}
                                                    className="rounded"
                                                />
                                                Auto (55%)
                                            </label>
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                            <input
                                                type="number"
                                                value={halfHourAuto ? Math.round(hourlyRate * 0.55) : halfHourRate}
                                                onChange={(e) => setHalfHourRate(Number(e.target.value))}
                                                disabled={halfHourAuto}
                                                className="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-indigo-500 focus:outline-none transition disabled:opacity-50"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Full Case Takeover */}
                                <div>
                                    <label className="text-sm text-slate-400 mb-2 block">Full Case Takeover Base Price</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                        <input
                                            type="number"
                                            value={takeoverBase}
                                            onChange={(e) => setTakeoverBase(Number(e.target.value))}
                                            className="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-indigo-500 focus:outline-none transition"
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">This is the starting price for full case management. Final price is negotiated with client.</p>
                                </div>

                                {/* Per-Visa Multipliers */}
                                <div>
                                    <label className="text-sm text-slate-400 mb-3 block">Visa Category Multipliers</label>
                                    <div className="space-y-2">
                                        {visaCategories.map((category) => (
                                            <div
                                                key={category.id}
                                                className="flex items-center justify-between p-3 rounded-xl bg-white/5"
                                            >
                                                <div>
                                                    <p className="text-white font-medium">{category.name}</p>
                                                    <p className="text-xs text-slate-500">{category.subclasses}</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-slate-400 text-sm">
                                                        ${Math.round(hourlyRate * category.multiplier)}/hr
                                                    </span>
                                                    <input
                                                        type="number"
                                                        step="0.1"
                                                        defaultValue={category.multiplier}
                                                        className="w-20 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-center focus:border-indigo-500 focus:outline-none transition"
                                                    />
                                                    <span className="text-slate-500 text-sm">x</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Availability Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="card p-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Availability</h2>
                                    <p className="text-sm text-slate-400">Set your working days</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-2">
                                {Object.entries(availability).map(([day, enabled]) => (
                                    <button
                                        key={day}
                                        onClick={() => setAvailability({ ...availability, [day]: !enabled })}
                                        className={`p-3 rounded-xl text-center transition ${enabled
                                                ? "bg-indigo-500/20 border border-indigo-500/30 text-white"
                                                : "bg-white/5 border border-white/10 text-slate-500"
                                            }`}
                                    >
                                        <p className="text-xs font-medium capitalize">{day.slice(0, 3)}</p>
                                        {enabled && <Check className="w-4 h-4 mx-auto mt-1 text-indigo-400" />}
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Notifications Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="card p-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                                    <Bell className="w-5 h-5 text-cyan-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Notifications</h2>
                                    <p className="text-sm text-slate-400">Manage your alerts</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { key: "newBooking", label: "New Booking", desc: "When a client books a consultation" },
                                    { key: "clientMessage", label: "Client Messages", desc: "When a client sends you a message" },
                                    { key: "reviewNotification", label: "New Reviews", desc: "When a client leaves a review" },
                                    { key: "marketingUpdates", label: "Marketing Updates", desc: "Tips and platform news" },
                                ].map((item) => (
                                    <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                                        <div>
                                            <p className="text-white font-medium">{item.label}</p>
                                            <p className="text-sm text-slate-500">{item.desc}</p>
                                        </div>
                                        <Toggle
                                            enabled={notifications[item.key as keyof typeof notifications]}
                                            onChange={() =>
                                                setNotifications({
                                                    ...notifications,
                                                    [item.key]: !notifications[item.key as keyof typeof notifications],
                                                })
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Payout Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="card p-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                                    <CreditCard className="w-5 h-5 text-amber-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Payout Settings</h2>
                                    <p className="text-sm text-slate-400">Where you receive payments</p>
                                </div>
                            </div>

                            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition group">
                                <div className="flex items-center gap-3">
                                    <CreditCard className="w-5 h-5 text-slate-400" />
                                    <div className="text-left">
                                        <p className="text-white font-medium">Bank Account</p>
                                        <p className="text-sm text-slate-500">****4567 • Commonwealth Bank</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs flex items-center gap-1">
                                        <Check className="w-3 h-3" />
                                        Connected
                                    </span>
                                    <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition" />
                                </div>
                            </button>
                        </motion.div>

                        {/* Sign Out & Save */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex justify-between items-center"
                        >
                            <button
                                onClick={() => signOut()}
                                className="px-6 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition font-medium"
                            >
                                Sign Out
                            </button>
                            <button className="btn-primary flex items-center gap-2">
                                <Save className="w-4 h-4" />
                                Save Changes
                            </button>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
