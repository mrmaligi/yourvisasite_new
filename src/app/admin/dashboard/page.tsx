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
    Settings,
    Shield,
    CheckCircle,
    XCircle,
    Clock,
    ChevronRight,
    AlertTriangle,
    Database,
    BarChart3,
    Eye,
    Edit,
    Plus,
} from "lucide-react";
import Link from "next/link";
import { getAdminStats, getPendingLawyers, approveLawyer } from "@/app/actions/admin";
import { useState, useEffect } from "react";
import { signOut } from "@/app/actions/auth";


// Mock data for pending lawyer verifications
const pendingLawyers = [
    {
        id: 1,
        name: "Dr. James Wilson",
        firm: "Wilson Immigration Law",
        license: "LAW-2024-89721",
        submittedAt: "2 hours ago",
        specialty: "Skilled Migration"
    },
    {
        id: 2,
        name: "Sarah Mitchell",
        firm: "Global Visa Solutions",
        license: "LAW-2024-89845",
        submittedAt: "1 day ago",
        specialty: "Family Visas"
    },
    {
        id: 3,
        name: "Robert Chen",
        firm: "Chen & Partners",
        license: "LAW-2024-89923",
        submittedAt: "3 days ago",
        specialty: "Business Visas"
    },
];

// Mock visa categories for management
const visaCategories = [
    { subclass: "482", name: "Temporary Skill Shortage", premiumActive: true, lastUpdated: "Jan 15" },
    { subclass: "186", name: "Employer Nomination Scheme", premiumActive: true, lastUpdated: "Jan 14" },
    { subclass: "189", name: "Skilled Independent", premiumActive: true, lastUpdated: "Jan 12" },
    { subclass: "500", name: "Student Visa", premiumActive: false, lastUpdated: "Dec 28" },
    { subclass: "820", name: "Partner Visa (Onshore)", premiumActive: true, lastUpdated: "Jan 10" },
];

// Platform stats
const platformStats = [
    { label: "Total Users", value: "12,450", change: "+324 this week", icon: Users, color: "from-indigo-500 to-purple-500" },
    { label: "Active Lawyers", value: "156", change: "+8 pending", icon: Shield, color: "from-emerald-500 to-teal-500" },
    { label: "Premium Sales", value: "$45,200", change: "+$5,800 this month", icon: DollarSign, color: "from-amber-500 to-orange-500" },
    { label: "Tracker Entries", value: "8,920", change: "+450 this week", icon: TrendingUp, color: "from-cyan-500 to-blue-500" },
];

export default function AdminDashboard() {
    const [stats, setStats] = useState({ totalUsers: 0, verifiedLawyers: 0, pendingLawyers: 0, trackerEntries: 0 });
    const [pendingLawyers, setPendingLawyers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsData, lawyersData] = await Promise.all([
                    getAdminStats(),
                    getPendingLawyers()
                ]);
                setStats(statsData);
                setPendingLawyers(lawyersData.slice(0, 3).map((item: any) => ({
                    id: item.id,
                    name: item.profiles.full_name || 'Unknown',
                    firm: item.bio || 'N/A',
                    license: 'LAW-' + item.id.slice(0, 8),
                    submittedAt: new Date(item.profiles.created_at).toLocaleDateString(),
                    specialty: 'Migration'
                })));
            } catch (error) {
                console.error('Failed to fetch admin data', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleApprove = async (id: string) => {
        await approveLawyer(id);
        // Refresh data
        const lawyersData = await getPendingLawyers();
        setPendingLawyers(lawyersData.slice(0, 3).map((item: any) => ({
            id: item.id,
            name: item.profiles.full_name || 'Unknown',
            firm: item.bio || 'N/A',
            license: 'LAW-' + item.id.slice(0, 8),
            submittedAt: new Date(item.profiles.created_at).toLocaleDateString(),
            specialty: 'Migration'
        })));
    };

    const platformStats = [
        { label: "Total Users", value: stats.totalUsers.toString(), change: "+Active", icon: Users, color: "from-indigo-500 to-purple-500" },
        { label: "Active Lawyers", value: stats.verifiedLawyers.toString(), change: `+${stats.pendingLawyers} pending`, icon: Shield, color: "from-emerald-500 to-teal-500" },
        { label: "Premium Sales", value: "$0", change: "Not tracked", icon: DollarSign, color: "from-amber-500 to-orange-500" },
        { label: "Tracker Entries", value: stats.trackerEntries.toString(), change: "Total", icon: TrendingUp, color: "from-cyan-500 to-blue-500" },
    ];

    return (

        <div className="min-h-screen">
            {/* Mesh Background */}
            <div className="mesh-background" />

            {/* Navigation */}
            <nav className="nav-glass fixed top-0 left-0 right-0 z-50 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">VisaIQ</span>
                        <span className="px-2 py-1 rounded-lg bg-rose-500/20 text-rose-400 text-xs font-medium">
                            ADMIN
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/admin/dashboard" className="nav-link text-sm font-medium text-white">
                            Dashboard
                        </Link>
                        <Link href="/admin/users" className="nav-link text-sm font-medium">
                            Users
                        </Link>
                        <Link href="/admin/lawyers" className="nav-link text-sm font-medium">
                            Lawyers
                        </Link>
                        <Link href="/admin/content" className="nav-link text-sm font-medium">
                            Visas
                        </Link>
                        <Link href="/admin/pricing" className="nav-link text-sm font-medium">
                            Settings
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 rounded-xl glass hover:bg-white/10 transition">
                            <Bell className="w-5 h-5 text-slate-300" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
                        </button>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-28 pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    Admin Command Center
                                </h1>
                                <p className="text-slate-400">
                                    Platform overview and management
                                </p>
                            </div>
                            <div className="hidden md:flex items-center gap-3">
                                <button
                                    onClick={() => signOut()}
                                    className="px-6 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition font-medium text-sm"
                                >
                                    Sign Out
                                </button>
                                <button className="glass-button-secondary flex items-center gap-2 text-sm py-3 px-5">
                                    <Database className="w-4 h-4" />
                                    Export Data
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
                        {platformStats.map((stat, index) => (
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
                        {/* Left Column */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-2 space-y-6"
                        >
                            {/* Lawyer Verification Queue */}
                            <div className="glass-card p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                                            <AlertTriangle className="w-5 h-5 text-amber-400" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-semibold text-white">Verification Queue</h2>
                                            <p className="text-sm text-slate-400">{pendingLawyers.length} lawyers pending approval</p>
                                        </div>
                                    </div>
                                    <a href="#" className="flex items-center gap-1 text-sm text-rose-400 hover:text-rose-300 transition">
                                        View All <ChevronRight className="w-4 h-4" />
                                    </a>
                                </div>

                                <div className="space-y-4">
                                    {pendingLawyers.map((lawyer, index) => (
                                        <motion.div
                                            key={lawyer.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + index * 0.1 }}
                                            className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                                                        <Shield className="w-6 h-6 text-slate-300" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-white font-medium">{lawyer.name}</h3>
                                                        <p className="text-sm text-slate-400">{lawyer.firm}</p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-xs text-slate-500">License: {lawyer.license}</span>
                                                            <span className="text-xs text-slate-600">•</span>
                                                            <span className="text-xs text-slate-500">{lawyer.specialty}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <span className="text-xs text-slate-500">{lawyer.submittedAt}</span>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => handleApprove(lawyer.id)}
                                                            className="p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 transition"
                                                        >
                                                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                                                        </button>
                                                        <button className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition">
                                                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                                                        </button>
                                                        <button className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition">
                                                            <XCircle className="w-4 h-4 text-red-400" />
                                                        </button>
                                                        <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
                                                            <Eye className="w-4 h-4 text-slate-400" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Visa Category Management */}
                            <div className="glass-card p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-indigo-400" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-semibold text-white">Visa Categories</h2>
                                            <p className="text-sm text-slate-400">Manage premium content</p>
                                        </div>
                                    </div>
                                    <button className="glass-button flex items-center gap-2 text-sm py-2 px-4">
                                        <Plus className="w-4 h-4" />
                                        Add Visa
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="text-left py-3 px-2 text-sm text-slate-400 font-medium">Subclass</th>
                                                <th className="text-left py-3 px-2 text-sm text-slate-400 font-medium">Name</th>
                                                <th className="text-left py-3 px-2 text-sm text-slate-400 font-medium">Premium</th>
                                                <th className="text-left py-3 px-2 text-sm text-slate-400 font-medium">Updated</th>
                                                <th className="text-right py-3 px-2 text-sm text-slate-400 font-medium">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {visaCategories.map((visa) => (
                                                <tr key={visa.subclass} className="border-b border-white/5 hover:bg-white/5">
                                                    <td className="py-3 px-2">
                                                        <span className="font-mono text-white">{visa.subclass}</span>
                                                    </td>
                                                    <td className="py-3 px-2 text-slate-300 text-sm">{visa.name}</td>
                                                    <td className="py-3 px-2">
                                                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${visa.premiumActive
                                                            ? "bg-emerald-500/20 text-emerald-400"
                                                            : "bg-slate-500/20 text-slate-400"
                                                            }`}>
                                                            {visa.premiumActive ? "Active" : "Inactive"}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-2 text-sm text-slate-500">{visa.lastUpdated}</td>
                                                    <td className="py-3 px-2 text-right">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <button className="p-1.5 rounded-lg hover:bg-white/10 transition">
                                                                <Edit className="w-4 h-4 text-slate-400" />
                                                            </button>
                                                            <button className="p-1.5 rounded-lg hover:bg-white/10 transition">
                                                                <Eye className="w-4 h-4 text-slate-400" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-6"
                        >
                            {/* Global Pricing */}
                            <div className="glass-card p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                                        <DollarSign className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">Global Pricing</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-xl bg-white/5">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-slate-400">Premium Visa Access</span>
                                            <button className="text-xs text-indigo-400 hover:text-indigo-300">Edit</button>
                                        </div>
                                        <p className="text-2xl font-bold text-white">$49 <span className="text-sm font-normal text-slate-400">per visa</span></p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-slate-400">Platform Commission</span>
                                            <button className="text-xs text-indigo-400 hover:text-indigo-300">Edit</button>
                                        </div>
                                        <p className="text-2xl font-bold text-white">15% <span className="text-sm font-normal text-slate-400">of lawyer fees</span></p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="glass-card p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Storage Usage</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-slate-400">Documents</span>
                                            <span className="text-sm text-white">45.2 GB</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-white/10">
                                            <div className="w-[45%] h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-slate-400">User Data</span>
                                            <span className="text-sm text-white">12.8 GB</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-white/10">
                                            <div className="w-[25%] h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
                                        </div>
                                    </div>
                                    <div className="pt-3 border-t border-white/10">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-white font-medium">Total Used</span>
                                            <span className="text-indigo-400">58 GB / 100 GB</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Activity Feed */}
                            <div className="glass-card p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                                <div className="space-y-3">
                                    {[
                                        { action: "New lawyer registration", time: "5 min ago", type: "info" },
                                        { action: "Premium purchase - Subclass 482", time: "12 min ago", type: "success" },
                                        { action: "Lawyer verification approved", time: "1 hour ago", type: "success" },
                                        { action: "Content update - Subclass 186", time: "2 hours ago", type: "info" },
                                    ].map((activity, index) => (
                                        <div key={index} className="flex items-center gap-3 p-2 rounded-xl">
                                            <div className={`w-2 h-2 rounded-full ${activity.type === "success" ? "bg-emerald-400" : "bg-indigo-400"
                                                }`} />
                                            <div className="flex-1">
                                                <p className="text-sm text-slate-300">{activity.action}</p>
                                                <p className="text-xs text-slate-500">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
