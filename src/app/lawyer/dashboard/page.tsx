"use client";

import { motion } from "framer-motion";
import {
    Sparkles,
    Bell,
    User,
    Users,
    DollarSign,
    TrendingUp,
    FileText,
    MessageSquare,
    Calendar,
    Clock,
    Star,
    ChevronRight,
    ArrowUpRight,
    BarChart3,
    Settings,
    Phone,
    Video,
    Eye,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import Link from "next/link";

// Mock data for lawyer's clients
const clients = [
    {
        id: 1,
        name: "Sarah Chen",
        visa: "482",
        status: "In Progress",
        lastContact: "2 hours ago",
        documentsComplete: 75,
        nextAction: "Skills Assessment Review"
    },
    {
        id: 2,
        name: "Raj Patel",
        visa: "186",
        status: "Documents Pending",
        lastContact: "1 day ago",
        documentsComplete: 45,
        nextAction: "Employment Reference Letters"
    },
    {
        id: 3,
        name: "Maria Garcia",
        visa: "820",
        status: "Submitted",
        lastContact: "3 days ago",
        documentsComplete: 100,
        nextAction: "Awaiting Decision"
    },
];

// Mock upcoming consultations
const upcomingConsultations = [
    { client: "John Smith", time: "Today, 2:00 PM", duration: "30 min", type: "Video" },
    { client: "Emily Brown", time: "Tomorrow, 10:00 AM", duration: "60 min", type: "Phone" },
    { client: "Alex Wong", time: "Jan 22, 3:30 PM", duration: "30 min", type: "Video" },
];

// Mock tracker updates
const trackerUpdates = [
    { subclass: "482", days: 42, change: -5, date: "Jan 18" },
    { subclass: "186", days: 175, change: -8, date: "Jan 17" },
    { subclass: "189", days: 360, change: 0, date: "Jan 15" },
];

export default function LawyerDashboard() {
    return (
        <div className="min-h-screen">
            {/* Mesh Background */}
            <div className="mesh-background" />

            {/* Navigation */}
            <nav className="nav-glass fixed top-0 left-0 right-0 z-50 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">VisaIQ</span>
                        <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-medium">
                            LAWYER
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/lawyer/dashboard" className="nav-link text-sm font-medium text-white">
                            Dashboard
                        </Link>
                        <Link href="/lawyer/clients" className="nav-link text-sm font-medium">
                            My Clients
                        </Link>
                        <Link href="/lawyer/marketing" className="nav-link text-sm font-medium">
                            Marketing
                        </Link>
                        <Link href="/lawyer/settings" className="nav-link text-sm font-medium">
                            Settings
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 rounded-xl glass hover:bg-white/10 transition">
                            <Bell className="w-5 h-5 text-slate-300" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full" />
                        </button>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-28 pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Welcome Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    Welcome, <span className="text-emerald-400">Emily</span>
                                </h1>
                                <p className="text-slate-400">
                                    Here&apos;s what&apos;s happening with your practice today
                                </p>
                            </div>
                            <div className="hidden md:flex items-center gap-3">
                                <button className="glass-button-secondary flex items-center gap-2 text-sm py-3 px-5">
                                    <Settings className="w-4 h-4" />
                                    Settings
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
                    >
                        {[
                            { label: "Active Clients", value: "12", icon: Users, change: "+2 this month", color: "from-emerald-500 to-teal-500" },
                            { label: "Total Earnings", value: "$8,450", icon: DollarSign, change: "+$1,200 this week", color: "from-amber-500 to-orange-500" },
                            { label: "Consultations", value: "28", icon: Video, change: "This month", color: "from-indigo-500 to-purple-500" },
                            { label: "Avg Rating", value: "4.9", icon: Star, change: "From 45 reviews", color: "from-rose-500 to-pink-500" },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + index * 0.05 }}
                                className="glass-card p-5"
                            >
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                                    <stat.icon className="w-5 h-5 text-white" />
                                </div>
                                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                                <p className="text-sm text-slate-400">{stat.label}</p>
                                <p className="text-xs text-emerald-400 mt-2">{stat.change}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Left Column - Clients */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-2"
                        >
                            <div className="glass-card p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                                            <Users className="w-5 h-5 text-emerald-400" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-semibold text-white">My Clients</h2>
                                            <p className="text-sm text-slate-400">Active cases</p>
                                        </div>
                                    </div>
                                    <a href="#" className="flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300 transition">
                                        View All <ChevronRight className="w-4 h-4" />
                                    </a>
                                </div>

                                <div className="space-y-4">
                                    {clients.map((client, index) => (
                                        <motion.div
                                            key={client.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + index * 0.1 }}
                                            className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition cursor-pointer group"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                                                        <span className="text-sm font-medium text-white">
                                                            {client.name.split(" ").map(n => n[0]).join("")}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-white font-medium group-hover:text-emerald-300 transition">
                                                            {client.name}
                                                        </h3>
                                                        <p className="text-sm text-slate-400">Subclass {client.visa}</p>
                                                    </div>
                                                </div>
                                                <span className={`px-3 py-1 rounded-lg text-xs font-medium ${client.status === "Submitted"
                                                    ? "bg-emerald-500/20 text-emerald-400"
                                                    : client.status === "Documents Pending"
                                                        ? "bg-amber-500/20 text-amber-400"
                                                        : "bg-indigo-500/20 text-indigo-400"
                                                    }`}>
                                                    {client.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs text-slate-500 mb-1">Next Action</p>
                                                    <p className="text-sm text-slate-300">{client.nextAction}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs text-slate-500 mb-1">Documents</p>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-16 h-2 rounded-full bg-white/10">
                                                            <div
                                                                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                                                                style={{ width: `${client.documentsComplete}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-xs text-emerald-400">{client.documentsComplete}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Pricing Settings */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="glass-card p-6 mt-6"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                                            <DollarSign className="w-5 h-5 text-amber-400" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-semibold text-white">Pricing Settings</h2>
                                            <p className="text-sm text-slate-400">Your consultation rates</p>
                                        </div>
                                    </div>
                                    <button className="glass-button-secondary text-sm py-2 px-4">
                                        Edit Rates
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="p-4 rounded-xl bg-white/5">
                                        <p className="text-sm text-slate-400 mb-1">30 min call</p>
                                        <p className="text-xl font-bold text-white">$150</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5">
                                        <p className="text-sm text-slate-400 mb-1">60 min call</p>
                                        <p className="text-xl font-bold text-white">$280</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5">
                                        <p className="text-sm text-slate-400 mb-1">Full takeover</p>
                                        <p className="text-xl font-bold text-white">$2,500+</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right Column */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-6"
                        >
                            {/* Upcoming Consultations */}
                            <div className="glass-card p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">Upcoming Calls</h3>
                                </div>
                                <div className="space-y-3">
                                    {upcomingConsultations.map((consult, index) => (
                                        <div key={index} className="p-3 rounded-xl bg-white/5">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-white font-medium text-sm">{consult.client}</span>
                                                <span className="flex items-center gap-1 text-xs text-slate-400">
                                                    {consult.type === "Video" ? <Video className="w-3 h-3" /> : <Phone className="w-3 h-3" />}
                                                    {consult.type}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-slate-400">
                                                <span>{consult.time}</span>
                                                <span>{consult.duration}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tracker Updates */}
                            <div className="glass-card p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                                            <TrendingUp className="w-5 h-5 text-cyan-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-white">Tracker Updates</h3>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-400 mb-4">
                                    Your updates carry verified weight in the public tracker.
                                </p>
                                <div className="space-y-3">
                                    {trackerUpdates.map((update, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                                            <div className="flex items-center gap-3">
                                                <div className="verified-badge w-10 h-10 rounded-xl flex items-center justify-center">
                                                    <span className="text-sm font-bold text-white">{update.subclass}</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-white">{update.days} days</p>
                                                    <p className="text-xs text-slate-400">{update.date}</p>
                                                </div>
                                            </div>
                                            <span className={`text-sm font-medium ${update.change < 0 ? "text-emerald-400" : update.change > 0 ? "text-red-400" : "text-slate-400"
                                                }`}>
                                                {update.change > 0 ? `+${update.change}` : update.change} days
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full glass-button-secondary text-sm py-3 mt-4">
                                    Submit Update
                                </button>
                            </div>

                            {/* Quick Actions */}
                            <div className="glass-card p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                                <div className="space-y-2">
                                    <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition group">
                                        <span className="flex items-center gap-3 text-sm text-slate-300">
                                            <MessageSquare className="w-4 h-4" />
                                            Post News Update
                                        </span>
                                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition" />
                                    </button>
                                    <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition group">
                                        <span className="flex items-center gap-3 text-sm text-slate-300">
                                            <BarChart3 className="w-4 h-4" />
                                            View Analytics
                                        </span>
                                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition" />
                                    </button>
                                    <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition group">
                                        <span className="flex items-center gap-3 text-sm text-slate-300">
                                            <FileText className="w-4 h-4" />
                                            Marketing Hub
                                        </span>
                                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
