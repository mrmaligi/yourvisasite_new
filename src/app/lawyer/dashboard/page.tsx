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
    Star,
    ChevronRight,
    BarChart3,
    Settings,
    Phone,
    Video,
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
        <div className="min-h-screen bg-slate-50">

            {/* Navigation */}
            <nav className="nav-sticky px-6 py-4 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-md">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 font-serif">YourVisaSite</span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200">
                            LAWYER
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/lawyer/dashboard" className="nav-link text-sm font-medium text-emerald-600">
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
                        <button className="relative p-2 rounded-lg hover:bg-slate-100 transition">
                            <Bell className="w-5 h-5 text-slate-600" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full" />
                        </button>
                        <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center border border-emerald-200">
                            <User className="w-5 h-5 text-emerald-600" />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="py-10 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Welcome Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 font-serif">
                                    Welcome, <span className="text-emerald-600">Emily</span>
                                </h1>
                                <p className="text-slate-500">
                                    Here&apos;s what&apos;s happening with your practice today
                                </p>
                            </div>
                            <div className="hidden md:flex items-center gap-3">
                                <button className="btn-secondary flex items-center gap-2 text-sm py-2 px-4 bg-white">
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
                            { label: "Active Clients", value: "12", icon: Users, change: "+2 this month", color: "bg-emerald-50 text-emerald-600" },
                            { label: "Total Earnings", value: "$8,450", icon: DollarSign, change: "+$1,200 this week", color: "bg-amber-50 text-amber-600" },
                            { label: "Consultations", value: "28", icon: Video, change: "This month", color: "bg-indigo-50 text-indigo-600" },
                            { label: "Avg Rating", value: "4.9", icon: Star, change: "From 45 reviews", color: "bg-rose-50 text-rose-600" },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + index * 0.05 }}
                                className="card p-5 bg-white border-slate-200"
                            >
                                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
                                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                                <p className="text-xs text-emerald-600 font-semibold mt-2">{stat.change}</p>
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
                            <div className="card p-6 bg-white border-slate-200">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                                            <Users className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold text-slate-900 font-serif">My Clients</h2>
                                            <p className="text-sm text-slate-500 font-medium">Active cases</p>
                                        </div>
                                    </div>
                                    <Link href="#" className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-800 transition font-medium">
                                        View All <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {clients.map((client, index) => (
                                        <motion.div
                                            key={client.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + index * 0.1 }}
                                            className="p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition cursor-pointer group"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200">
                                                        <span className="text-sm">
                                                            {client.name.split(" ").map(n => n[0]).join("")}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-slate-900 font-bold group-hover:text-emerald-600 transition">
                                                            {client.name}
                                                        </h3>
                                                        <p className="text-sm text-slate-500 font-medium">Subclass {client.visa}</p>
                                                    </div>
                                                </div>
                                                <span className={`px-3 py-1 rounded-md text-xs font-bold ${client.status === "Submitted"
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : client.status === "Documents Pending"
                                                        ? "bg-amber-100 text-amber-700"
                                                        : "bg-indigo-100 text-indigo-700"
                                                    }`}>
                                                    {client.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs text-slate-400 font-semibold mb-1 uppercase tracking-wide">Next Action</p>
                                                    <p className="text-sm text-slate-700 font-medium">{client.nextAction}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs text-slate-400 font-semibold mb-1 uppercase tracking-wide">Documents</p>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-16 h-2 rounded-full bg-slate-100 overflow-hidden">
                                                            <div
                                                                className="h-full rounded-full bg-emerald-500"
                                                                style={{ width: `${client.documentsComplete}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-xs text-emerald-600 font-bold">{client.documentsComplete}%</span>
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
                                className="card p-6 mt-6 bg-white border-slate-200"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                                            <DollarSign className="w-5 h-5 text-amber-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold text-slate-900 font-serif">Pricing Settings</h2>
                                            <p className="text-sm text-slate-500 font-medium">Your consultation rates</p>
                                        </div>
                                    </div>
                                    <button className="btn-secondary text-sm py-2 px-4 bg-white">
                                        Edit Rates
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <p className="text-sm text-slate-500 font-medium mb-1">30 min call</p>
                                        <p className="text-xl font-bold text-slate-900">$150</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <p className="text-sm text-slate-500 font-medium mb-1">60 min call</p>
                                        <p className="text-xl font-bold text-slate-900">$280</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <p className="text-sm text-slate-500 font-medium mb-1">Full takeover</p>
                                        <p className="text-xl font-bold text-slate-900">$2,500+</p>
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
                            <div className="card p-6 bg-white border-slate-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 font-serif">Upcoming Calls</h3>
                                </div>
                                <div className="space-y-3">
                                    {upcomingConsultations.map((consult, index) => (
                                        <div key={index} className="p-3 rounded-xl border border-slate-100 bg-slate-50">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-slate-900 font-bold text-sm">{consult.client}</span>
                                                <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                                                    {consult.type === "Video" ? <Video className="w-3 h-3" /> : <Phone className="w-3 h-3" />}
                                                    {consult.type}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                                                <span>{consult.time}</span>
                                                <span>{consult.duration}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tracker Updates */}
                            <div className="card p-6 bg-white border-slate-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center">
                                            <TrendingUp className="w-5 h-5 text-cyan-600" />
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 font-serif">Tracker Updates</h3>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 font-medium mb-4">
                                    Your updates carry verified weight in the public tracker.
                                </p>
                                <div className="space-y-3">
                                    {trackerUpdates.map((update, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                                                    <span className="text-sm font-bold text-indigo-700">{update.subclass}</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-slate-900 font-bold">{update.days} days</p>
                                                    <p className="text-xs text-slate-500">{update.date}</p>
                                                </div>
                                            </div>
                                            <span className={`text-sm font-bold ${update.change < 0 ? "text-emerald-600" : update.change > 0 ? "text-red-500" : "text-slate-400"
                                                }`}>
                                                {update.change > 0 ? `+${update.change}` : update.change} days
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full btn-secondary text-sm py-2 mt-4 bg-white">
                                    Submit Update
                                </button>
                            </div>

                            {/* Quick Actions */}
                            <div className="card p-6 bg-white border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4 font-serif">Quick Actions</h3>
                                <div className="space-y-2">
                                    <button className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition group">
                                        <span className="flex items-center gap-3 text-sm text-slate-600 font-medium group-hover:text-indigo-700">
                                            <MessageSquare className="w-4 h-4" />
                                            Post News Update
                                        </span>
                                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-700 transition" />
                                    </button>
                                    <button className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition group">
                                        <span className="flex items-center gap-3 text-sm text-slate-600 font-medium group-hover:text-indigo-700">
                                            <BarChart3 className="w-4 h-4" />
                                            View Analytics
                                        </span>
                                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-700 transition" />
                                    </button>
                                    <button className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition group">
                                        <span className="flex items-center gap-3 text-sm text-slate-600 font-medium group-hover:text-indigo-700">
                                            <FileText className="w-4 h-4" />
                                            Marketing Hub
                                        </span>
                                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-700 transition" />
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
