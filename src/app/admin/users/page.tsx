"use client";
import Link from "next/link";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Sparkles,
    Bell,
    User,
    Search,
    Eye,
    Ban,
    Download,
    DollarSign,
    Calendar,
} from "lucide-react";

// Mock users data
const allUsers = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@gmail.com",
        joined: "Jan 2, 2026",
        premiumVisas: ["482", "186"],
        totalSpent: 98,
        status: "Active",
        lastActive: "2 hours ago",
    },
    {
        id: 2,
        name: "Sarah Chen",
        email: "sarah.chen@email.com",
        joined: "Jan 5, 2026",
        premiumVisas: ["482"],
        totalSpent: 49,
        status: "Active",
        lastActive: "1 day ago",
    },
    {
        id: 3,
        name: "Michael Park",
        email: "mpark@company.com",
        joined: "Dec 15, 2025",
        premiumVisas: ["186", "189", "190"],
        totalSpent: 147,
        status: "Active",
        lastActive: "3 days ago",
    },
    {
        id: 4,
        name: "Emma Wilson",
        email: "emma.w@gmail.com",
        joined: "Nov 20, 2025",
        premiumVisas: ["820"],
        totalSpent: 49,
        status: "Inactive",
        lastActive: "2 weeks ago",
    },
    {
        id: 5,
        name: "David Kumar",
        email: "dkumar@tech.com",
        joined: "Oct 1, 2025",
        premiumVisas: ["189", "491"],
        totalSpent: 98,
        status: "Suspended",
        lastActive: "1 month ago",
    },
];

export default function AdminUsers() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredUsers = allUsers.filter(
        (user) =>
            searchQuery === "" ||
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active": return "bg-emerald-500/20 text-emerald-400";
            case "Inactive": return "bg-slate-500/20 text-slate-400";
            case "Suspended": return "bg-red-500/20 text-red-400";
            default: return "bg-slate-500/20 text-slate-400";
        }
    };

    const totalRevenue = allUsers.reduce((sum, u) => sum + u.totalSpent, 0);

    return (
        <div className="min-h-screen">
            {/* Mesh Background */}
            <div className="mesh-background" />

            {/* Navigation */}
            <nav className="nav-sticky fixed top-0 left-0 right-0 z-50 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">YourVisaSite</span>
                        <span className="px-2 py-1 rounded-lg bg-rose-500/20 text-rose-400 text-xs font-medium">
                            ADMIN
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/admin/dashboard" className="nav-link text-sm font-medium">Dashboard</Link>
                        <Link href="/admin/lawyers" className="nav-link text-sm font-medium">Lawyers</Link>
                        <Link href="/admin/users" className="nav-link text-sm font-medium text-white">Users</Link>
                        <Link href="/admin/content" className="nav-link text-sm font-medium">Content</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 rounded-xl card hover:bg-white/10 transition">
                            <Bell className="w-5 h-5 text-slate-300" />
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
                        className="flex items-center justify-between mb-8"
                    >
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
                            <p className="text-slate-400">View and manage platform users</p>
                        </div>
                        <button className="btn-secondary flex items-center gap-2 text-sm">
                            <Download className="w-4 h-4" />
                            Export Users
                        </button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-4 gap-4 mb-8"
                    >
                        {[
                            { label: "Total Users", value: allUsers.length, icon: User, color: "indigo" },
                            { label: "Active", value: allUsers.filter(u => u.status === "Active").length, icon: User, color: "emerald" },
                            { label: "Premium Revenue", value: `$${totalRevenue}`, icon: DollarSign, color: "amber" },
                            { label: "This Month", value: allUsers.filter(u => u.joined.includes("Jan")).length, icon: Calendar, color: "cyan" },
                        ].map((stat) => (
                            <div key={stat.label} className="card p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                                </div>
                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                                <p className="text-sm text-slate-400">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Search */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="card p-4 mb-6"
                    >
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-slate-500 focus:border-rose-500 focus:outline-none transition"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </motion.div>

                    {/* Users Table */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="card overflow-hidden"
                    >
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-4 px-6 text-sm text-slate-400 font-medium">User</th>
                                    <th className="text-left py-4 px-4 text-sm text-slate-400 font-medium">Status</th>
                                    <th className="text-left py-4 px-4 text-sm text-slate-400 font-medium">Joined</th>
                                    <th className="text-left py-4 px-4 text-sm text-slate-400 font-medium">Premium Visas</th>
                                    <th className="text-left py-4 px-4 text-sm text-slate-400 font-medium">Spent</th>
                                    <th className="text-left py-4 px-4 text-sm text-slate-400 font-medium">Last Active</th>
                                    <th className="text-right py-4 px-6 text-sm text-slate-400 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-sm font-bold text-white">
                                                        {user.name.split(" ").map(n => n[0]).join("")}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{user.name}</p>
                                                    <p className="text-xs text-slate-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(user.status)}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-slate-400">{user.joined}</td>
                                        <td className="py-4 px-4">
                                            <div className="flex gap-1">
                                                {user.premiumVisas.map((visa) => (
                                                    <span key={visa} className="px-2 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs">
                                                        {visa}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-white font-medium">${user.totalSpent}</td>
                                        <td className="py-4 px-4 text-sm text-slate-500">{user.lastActive}</td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
                                                    <Eye className="w-4 h-4 text-slate-400" />
                                                </button>
                                                <button className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition">
                                                    <Ban className="w-4 h-4 text-red-400" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
