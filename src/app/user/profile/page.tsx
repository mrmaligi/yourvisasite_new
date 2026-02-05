"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Sparkles,
    Bell,
    User,
    Shield,
    CreditCard,
    FileText,
    LogOut,
    Edit,
    Camera,
    Check,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";
import { signOut } from "@/app/actions/auth";

export default function UserProfile() {
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
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/user/dashboard" className="nav-link text-sm font-medium">Dashboard</Link>
                        <Link href="/user/visas" className="nav-link text-sm font-medium">Visas</Link>
                        <Link href="/user/applications" className="nav-link text-sm font-medium">Applications</Link>
                        <Link href="/user/profile" className="nav-link text-sm font-medium text-white">Profile</Link>
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
                        <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
                        <p className="text-slate-400">Manage your account and preferences</p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="space-y-4"
                        >
                            {[
                                { icon: User, label: "Profile", active: true },
                                { icon: Shield, label: "Security", active: false },
                                { icon: CreditCard, label: "Billing", active: false },
                                { icon: Bell, label: "Notifications", active: false },
                                { icon: FileText, label: "Documents", active: false },
                            ].map((item) => (
                                <button
                                    key={item.label}
                                    className={`w-full p-4 rounded-xl text-left flex items-center gap-3 transition ${item.active
                                            ? "bg-indigo-500/20 border border-indigo-500/30 text-white"
                                            : "card hover:bg-white/10 text-slate-400"
                                        }`}
                                >
                                    <item.icon className={`w-5 h-5 ${item.active ? "text-indigo-400" : ""}`} />
                                    {item.label}
                                </button>
                            ))}
                            <button
                                onClick={() => signOut()}
                                className="w-full p-4 rounded-xl text-left flex items-center gap-3 card hover:bg-red-500/10 text-red-400 transition"
                            >
                                <LogOut className="w-5 h-5" />
                                Sign Out
                            </button>
                        </motion.div>

                        {/* Main Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-2 space-y-6"
                        >
                            {/* Profile Photo */}
                            <div className="card p-6">
                                <h2 className="text-lg font-semibold text-white mb-4">Profile Photo</h2>
                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                            <span className="text-3xl font-bold text-white">JD</span>
                                        </div>
                                        <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center hover:bg-indigo-600 transition">
                                            <Camera className="w-4 h-4 text-white" />
                                        </button>
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">John Doe</p>
                                        <p className="text-sm text-slate-400">john.doe@gmail.com</p>
                                        <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                                            <Check className="w-3 h-3" />
                                            Verified with Google
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Personal Info */}
                            <div className="card p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-white">Personal Information</h2>
                                    <button className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs text-slate-500 mb-1 block">First Name</label>
                                            <input
                                                type="text"
                                                defaultValue="John"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-500 mb-1 block">Last Name</label>
                                            <input
                                                type="text"
                                                defaultValue="Doe"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-500 mb-1 block">Email</label>
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-5 h-5 text-slate-500" />
                                            <input
                                                type="email"
                                                defaultValue="john.doe@gmail.com"
                                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-500 mb-1 block">Phone</label>
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-5 h-5 text-slate-500" />
                                            <input
                                                type="tel"
                                                defaultValue="+61 412 345 678"
                                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-500 mb-1 block">Location</label>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-5 h-5 text-slate-500" />
                                            <input
                                                type="text"
                                                defaultValue="Melbourne, VIC, Australia"
                                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Premium Status */}
                            <div className="card p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-lg font-semibold text-white mb-1">Premium Access</h2>
                                        <p className="text-sm text-slate-400">You have purchased access to 2 visas</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="px-2 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs">482</span>
                                            <span className="px-2 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs">186</span>
                                        </div>
                                    </div>
                                    <Link href="/user/visas" className="btn-primary text-sm">
                                        Add More
                                    </Link>
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-end">
                                <button className="btn-primary">
                                    Save Changes
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
