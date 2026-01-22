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
    Shield,
    CheckCircle,
    XCircle,
    ChevronRight,
    AlertTriangle,
    Database,
    Eye,
    Edit,
    Plus,
    LogOut,
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

export default function AdminDashboard() {
    const [stats, setStats] = useState({ totalUsers: 0, verifiedLawyers: 0, pendingLawyers: 0, trackerEntries: 0 });
    const [pendingLawyersState, setPendingLawyersState] = useState<unknown[]>(pendingLawyers);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsData, lawyersData] = await Promise.all([
                    getAdminStats(),
                    getPendingLawyers()
                ]);
                setStats(statsData);
                if (lawyersData && lawyersData.length > 0) {
                     setPendingLawyersState(lawyersData.slice(0, 3).map((item: { id: string; profiles: { full_name: string; created_at: string }; bio: string }) => ({
                        id: item.id,
                        name: item.profiles.full_name || 'Unknown',
                        firm: item.bio || 'N/A',
                        license: 'LAW-' + item.id.slice(0, 8),
                        submittedAt: new Date(item.profiles.created_at).toLocaleDateString(),
                        specialty: 'Migration'
                    })));
                }
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
        setPendingLawyersState(lawyersData.slice(0, 3).map((item: { id: string; profiles: { full_name: string; created_at: string }; bio: string }) => ({
            id: item.id,
            name: item.profiles.full_name || 'Unknown',
            firm: item.bio || 'N/A',
            license: 'LAW-' + item.id.slice(0, 8),
            submittedAt: new Date(item.profiles.created_at).toLocaleDateString(),
            specialty: 'Migration'
        })));
    };

    const platformStats = [
        { label: "Total Users", value: stats.totalUsers.toString(), change: "+Active", icon: Users, color: "bg-indigo-50 text-indigo-600" },
        { label: "Active Lawyers", value: stats.verifiedLawyers.toString(), change: `+${stats.pendingLawyers} pending`, icon: Shield, color: "bg-emerald-50 text-emerald-600" },
        { label: "Premium Sales", value: "$0", change: "Not tracked", icon: DollarSign, color: "bg-amber-50 text-amber-600" },
        { label: "Tracker Entries", value: stats.trackerEntries.toString(), change: "Total", icon: TrendingUp, color: "bg-cyan-50 text-cyan-600" },
    ];

    return (

        <div className="min-h-screen bg-slate-50">

            {/* Navigation */}
            <nav className="nav-sticky px-6 py-4 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-rose-600 flex items-center justify-center text-white shadow-md">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 font-serif">YourVisaSite</span>
                        <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200">
                            ADMIN
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/admin/dashboard" className="nav-link text-sm font-medium text-rose-600">
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
                        <button className="relative p-2 rounded-lg hover:bg-slate-100 transition">
                            <Bell className="w-5 h-5 text-slate-600" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
                        </button>
                        <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center border border-rose-200">
                            <User className="w-5 h-5 text-rose-600" />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="py-10 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 font-serif">
                                    Admin Command Center
                                </h1>
                                <p className="text-slate-500">
                                    Platform overview and management
                                </p>
                            </div>
                            <div className="hidden md:flex items-center gap-3">
                                <button
                                    onClick={() => signOut()}
                                    className="px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition font-medium text-sm flex items-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                                <button className="btn-secondary flex items-center gap-2 text-sm py-2 px-4 bg-white">
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
                        {/* Left Column */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-2 space-y-6"
                        >
                            {/* Lawyer Verification Queue */}
                            <div className="card p-6 bg-white border-slate-200">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                                            <AlertTriangle className="w-5 h-5 text-amber-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold text-slate-900 font-serif">Verification Queue</h2>
                                            <p className="text-sm text-slate-500 font-medium">{pendingLawyersState.length} lawyers pending approval</p>
                                        </div>
                                    </div>
                                    <Link href="#" className="flex items-center gap-1 text-sm text-rose-600 hover:text-rose-800 transition font-medium">
                                        View All <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {pendingLawyersState.map((lawyer, index) => (
                                        <motion.div
                                            key={lawyer.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + index * 0.1 }}
                                            className="p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                                                        <Shield className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-slate-900 font-bold">{lawyer.name}</h3>
                                                        <p className="text-sm text-slate-500 font-medium">{lawyer.firm}</p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-xs text-slate-500">License: {lawyer.license}</span>
                                                            <span className="text-xs text-slate-400">•</span>
                                                            <span className="text-xs text-slate-500">{lawyer.specialty}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <span className="text-xs text-slate-400 font-medium">{lawyer.submittedAt}</span>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => handleApprove(lawyer.id)}
                                                            className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition border border-emerald-100"
                                                            title="Approve"
                                                        >
                                                            <CheckCircle className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition border border-red-100" title="Reject">
                                                            <XCircle className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition" title="View Details">
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Visa Category Management */}
                            <div className="card p-6 bg-white border-slate-200">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold text-slate-900 font-serif">Visa Categories</h2>
                                            <p className="text-sm text-slate-500 font-medium">Manage premium content</p>
                                        </div>
                                    </div>
                                    <button className="btn-primary flex items-center gap-2 text-sm py-2 px-4 shadow-sm">
                                        <Plus className="w-4 h-4" />
                                        Add Visa
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-slate-100">
                                                <th className="text-left py-3 px-2 text-sm text-slate-500 font-semibold">Subclass</th>
                                                <th className="text-left py-3 px-2 text-sm text-slate-500 font-semibold">Name</th>
                                                <th className="text-left py-3 px-2 text-sm text-slate-500 font-semibold">Premium</th>
                                                <th className="text-left py-3 px-2 text-sm text-slate-500 font-semibold">Updated</th>
                                                <th className="text-right py-3 px-2 text-sm text-slate-500 font-semibold">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {visaCategories.map((visa) => (
                                                <tr key={visa.subclass} className="border-b border-slate-50 hover:bg-slate-50 transition">
                                                    <td className="py-3 px-2">
                                                        <span className="font-mono text-slate-900 font-medium">{visa.subclass}</span>
                                                    </td>
                                                    <td className="py-3 px-2 text-slate-700 text-sm font-medium">{visa.name}</td>
                                                    <td className="py-3 px-2">
                                                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${visa.premiumActive
                                                            ? "bg-emerald-100 text-emerald-700"
                                                            : "bg-slate-100 text-slate-500"
                                                            }`}>
                                                            {visa.premiumActive ? "Active" : "Inactive"}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-2 text-sm text-slate-500">{visa.lastUpdated}</td>
                                                    <td className="py-3 px-2 text-right">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <button className="p-1.5 rounded-lg hover:bg-slate-100 transition text-slate-500 hover:text-indigo-600">
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                            <button className="p-1.5 rounded-lg hover:bg-slate-100 transition text-slate-500 hover:text-indigo-600">
                                                                <Eye className="w-4 h-4" />
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
                            <div className="card p-6 bg-white border-slate-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                                        <DollarSign className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 font-serif">Global Pricing</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-slate-500 font-medium">Premium Visa Access</span>
                                            <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">Edit</button>
                                        </div>
                                        <p className="text-2xl font-bold text-slate-900">$49 <span className="text-sm font-normal text-slate-500">per visa</span></p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-slate-500 font-medium">Platform Commission</span>
                                            <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">Edit</button>
                                        </div>
                                        <p className="text-2xl font-bold text-slate-900">15% <span className="text-sm font-normal text-slate-500">of lawyer fees</span></p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="card p-6 bg-white border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4 font-serif">Storage Usage</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-slate-500 font-medium">Documents</span>
                                            <span className="text-sm text-slate-900 font-semibold">45.2 GB</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                                            <div className="w-[45%] h-full rounded-full bg-indigo-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-slate-500 font-medium">User Data</span>
                                            <span className="text-sm text-slate-900 font-semibold">12.8 GB</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                                            <div className="w-[25%] h-full rounded-full bg-emerald-500" />
                                        </div>
                                    </div>
                                    <div className="pt-3 border-t border-slate-100">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-900 font-bold">Total Used</span>
                                            <span className="text-indigo-600 font-medium">58 GB / 100 GB</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Activity Feed */}
                            <div className="card p-6 bg-white border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4 font-serif">Recent Activity</h3>
                                <div className="space-y-3">
                                    {[
                                        { action: "New lawyer registration", time: "5 min ago", type: "info" },
                                        { action: "Premium purchase - Subclass 482", time: "12 min ago", type: "success" },
                                        { action: "Lawyer verification approved", time: "1 hour ago", type: "success" },
                                        { action: "Content update - Subclass 186", time: "2 hours ago", type: "info" },
                                    ].map((activity, index) => (
                                        <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition">
                                            <div className={`w-2 h-2 rounded-full ${activity.type === "success" ? "bg-emerald-500" : "bg-indigo-500"
                                                }`} />
                                            <div className="flex-1">
                                                <p className="text-sm text-slate-700 font-medium">{activity.action}</p>
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
