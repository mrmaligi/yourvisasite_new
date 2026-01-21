"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Sparkles,
    Bell,
    User,
    Search,
    Shield,
    CheckCircle,
    XCircle,
    Clock,
    Eye,
    MoreVertical,
    ChevronDown,
    Filter,
    Download,
} from "lucide-react";
import { getAllLawyers, approveLawyer, rejectLawyer } from "@/app/actions/admin";
import { useEffect } from "react";


interface Lawyer {
    id: string | number;
    name: string;
    firm: string;
    email: string;
    marn: string;
    status: string;
    joinedDate: string;
    clients: number;
    rating: number;
    specialties: string[];
}

// Mock lawyers data
const allLawyers = [
    {
        id: 1,
        name: "Emily Richardson",
        firm: "Richardson Immigration Law",
        email: "emily@richardsonlaw.com.au",
        marn: "1234567",
        status: "verified",
        joinedDate: "Jan 2024",
        clients: 45,
        rating: 4.9,
        specialties: ["482", "186", "189"],
    },
    {
        id: 2,
        name: "James Chen",
        firm: "Chen & Partners",
        email: "james@chenpartners.com.au",
        marn: "2345678",
        status: "verified",
        joinedDate: "Mar 2024",
        clients: 32,
        rating: 4.8,
        specialties: ["820", "801", "309"],
    },
    {
        id: 3,
        name: "Dr. James Wilson",
        firm: "Wilson Immigration Law",
        email: "jwilson@wilsonlaw.com.au",
        marn: "3456789",
        status: "pending",
        joinedDate: "Jan 2026",
        clients: 0,
        rating: 0,
        specialties: ["Skilled Migration"],
    },
    {
        id: 4,
        name: "Sarah Mitchell",
        firm: "Global Visa Solutions",
        email: "sarah@globalvisa.com.au",
        marn: "4567890",
        status: "pending",
        joinedDate: "Jan 2026",
        clients: 0,
        rating: 0,
        specialties: ["Family Visas"],
    },
    {
        id: 5,
        name: "Michael Torres",
        firm: "Torres Migration Services",
        email: "mtorres@torresms.com.au",
        marn: "5678901",
        status: "suspended",
        joinedDate: "Jun 2023",
        clients: 89,
        rating: 4.7,
        specialties: ["188", "132"],
    },
];

export default function AdminLawyers() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedLawyer, setSelectedLawyer] = useState<number | null>(null);
    const [allLawyers, setAllLawyers] = useState<Lawyer[]>([]);

    useEffect(() => {
        const fetchLawyers = async () => {
            const data = await getAllLawyers();
            setAllLawyers(data.map((item: any) => ({
                id: item.id,
                name: item.profiles.full_name || 'Unknown',
                firm: item.bio || 'N/A',
                email: item.profiles.email,
                marn: 'LAW-' + item.id.slice(0, 8),
                status: item.is_verified ? 'verified' : 'pending',
                joinedDate: new Date(item.profiles.created_at).toLocaleDateString(),
                clients: 0, // Placeholder
                rating: 0, // Placeholder
                specialties: item.specializations || []
            })));
        };
        fetchLawyers();
    }, []);


    const filteredLawyers = allLawyers.filter((lawyer) => {
        const matchesSearch =
            searchQuery === "" ||
            lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lawyer.firm.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lawyer.marn.includes(searchQuery);
        const matchesStatus = statusFilter === "all" || lawyer.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "verified": return "bg-emerald-500/20 text-emerald-400";
            case "pending": return "bg-amber-500/20 text-amber-400";
            case "suspended": return "bg-red-500/20 text-red-400";
            default: return "bg-slate-500/20 text-slate-400";
        }
    };

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
                        <a href="/admin/dashboard" className="nav-link text-sm font-medium">Dashboard</a>
                        <a href="/admin/lawyers" className="nav-link text-sm font-medium text-white">Lawyers</a>
                        <a href="/admin/content" className="nav-link text-sm font-medium">Content</a>
                        <a href="#" className="nav-link text-sm font-medium">Settings</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 rounded-xl glass hover:bg-white/10 transition">
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
                            <h1 className="text-3xl font-bold text-white mb-2">Lawyer Management</h1>
                            <p className="text-slate-400">Verify and manage registered immigration lawyers</p>
                        </div>
                        <button className="glass-button-secondary flex items-center gap-2 text-sm">
                            <Download className="w-4 h-4" />
                            Export List
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
                            { label: "Verified", value: allLawyers.filter(l => l.status === "verified").length, color: "emerald" },
                            { label: "Pending", value: allLawyers.filter(l => l.status === "pending").length, color: "amber" },
                            { label: "Suspended", value: allLawyers.filter(l => l.status === "suspended").length, color: "red" },
                            { label: "Total", value: allLawyers.length, color: "indigo" },
                        ].map((stat) => (
                            <div key={stat.label} className="glass-card p-4 text-center">
                                <p className={`text-2xl font-bold text-${stat.color}-400`}>{stat.value}</p>
                                <p className="text-sm text-slate-400">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Search & Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="glass-card p-4 mb-6"
                    >
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name, firm, or MARN..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-slate-500 focus:border-rose-500 focus:outline-none transition"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2">
                                {["all", "verified", "pending", "suspended"].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setStatusFilter(status)}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition ${statusFilter === status
                                            ? "bg-rose-500 text-white"
                                            : "bg-white/5 text-slate-400 hover:bg-white/10"
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Lawyers Table */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card overflow-hidden"
                    >
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-4 px-6 text-sm text-slate-400 font-medium">Lawyer</th>
                                    <th className="text-left py-4 px-4 text-sm text-slate-400 font-medium">MARN</th>
                                    <th className="text-left py-4 px-4 text-sm text-slate-400 font-medium">Status</th>
                                    <th className="text-left py-4 px-4 text-sm text-slate-400 font-medium">Joined</th>
                                    <th className="text-left py-4 px-4 text-sm text-slate-400 font-medium">Clients</th>
                                    <th className="text-left py-4 px-4 text-sm text-slate-400 font-medium">Rating</th>
                                    <th className="text-right py-4 px-6 text-sm text-slate-400 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLawyers.map((lawyer) => (
                                    <tr key={lawyer.id} className="border-b border-white/5 hover:bg-white/5">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-sm font-bold text-white">
                                                        {lawyer.name.split(" ").map((n: string) => n[0]).join("")}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{lawyer.name}</p>
                                                    <p className="text-xs text-slate-500">{lawyer.firm}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="font-mono text-sm text-slate-300">{lawyer.marn}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${getStatusStyle(lawyer.status)}`}>
                                                {lawyer.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-slate-400">{lawyer.joinedDate}</td>
                                        <td className="py-4 px-4 text-sm text-white">{lawyer.clients}</td>
                                        <td className="py-4 px-4 text-sm text-white">
                                            {lawyer.rating > 0 ? lawyer.rating : "-"}
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {lawyer.status === "pending" && (
                                                    <>
                                                        <button className="p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 transition">
                                                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                                                        </button>
                                                        <button className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition">
                                                            <XCircle className="w-4 h-4 text-red-400" />
                                                        </button>
                                                    </>
                                                )}
                                                <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
                                                    <Eye className="w-4 h-4 text-slate-400" />
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
