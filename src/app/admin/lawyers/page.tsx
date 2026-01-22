"use client";
import Link from "next/link";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Sparkles,
    Bell,
    User,
    Search,
    CheckCircle,
    XCircle,
    Eye,
    Download,
} from "lucide-react";
import { useEffect } from "react";
import { getAllLawyers } from "@/app/actions/admin";


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
const mockLawyers = [
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
    const [allLawyersState, setAllLawyersState] = useState<Lawyer[]>(mockLawyers);

    useEffect(() => {
        const fetchLawyers = async () => {
            const data = await getAllLawyers();
            if (data) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setAllLawyersState(data.map((item: any) => ({
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
            }
        };
        fetchLawyers();
    }, []);


    const filteredLawyers = allLawyersState.filter((lawyer) => {
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
            case "verified": return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case "pending": return "bg-amber-100 text-amber-700 border-amber-200";
            case "suspended": return "bg-red-100 text-red-700 border-red-200";
            default: return "bg-slate-100 text-slate-500 border-slate-200";
        }
    };

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
                        <Link href="/admin/dashboard" className="nav-link text-sm font-medium">Dashboard</Link>
                        <Link href="/admin/lawyers" className="nav-link text-sm font-medium text-rose-600">Lawyers</Link>
                        <Link href="/admin/content" className="nav-link text-sm font-medium">Content</Link>
                        <Link href="#" className="nav-link text-sm font-medium">Settings</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 rounded-lg hover:bg-slate-100 transition">
                            <Bell className="w-5 h-5 text-slate-600" />
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
                        className="flex items-center justify-between mb-8"
                    >
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 mb-2 font-serif">Lawyer Management</h1>
                            <p className="text-slate-500">Verify and manage registered immigration lawyers</p>
                        </div>
                        <button className="btn-secondary flex items-center gap-2 text-sm bg-white">
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
                            { label: "Verified", value: allLawyersState.filter(l => l.status === "verified").length, color: "emerald" },
                            { label: "Pending", value: allLawyersState.filter(l => l.status === "pending").length, color: "amber" },
                            { label: "Suspended", value: allLawyersState.filter(l => l.status === "suspended").length, color: "red" },
                            { label: "Total", value: allLawyersState.length, color: "indigo" },
                        ].map((stat) => (
                            <div key={stat.label} className="card p-4 text-center bg-white border-slate-200">
                                <p className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</p>
                                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Search & Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="card p-4 mb-6 bg-white border-slate-200"
                    >
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name, firm, or MARN..."
                                    className="input-field pl-12"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2">
                                {["all", "verified", "pending", "suspended"].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setStatusFilter(status)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition ${statusFilter === status
                                            ? "bg-rose-600 text-white shadow-sm"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
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
                        className="card overflow-hidden bg-white border-slate-200"
                    >
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-100">
                                    <th className="text-left py-4 px-6 text-sm text-slate-500 font-semibold">Lawyer</th>
                                    <th className="text-left py-4 px-4 text-sm text-slate-500 font-semibold">MARN</th>
                                    <th className="text-left py-4 px-4 text-sm text-slate-500 font-semibold">Status</th>
                                    <th className="text-left py-4 px-4 text-sm text-slate-500 font-semibold">Joined</th>
                                    <th className="text-left py-4 px-4 text-sm text-slate-500 font-semibold">Clients</th>
                                    <th className="text-left py-4 px-4 text-sm text-slate-500 font-semibold">Rating</th>
                                    <th className="text-right py-4 px-6 text-sm text-slate-500 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLawyers.map((lawyer) => (
                                    <tr key={lawyer.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0 text-indigo-700 font-bold border border-indigo-100">
                                                    <span className="text-sm">
                                                        {lawyer.name.split(" ").map((n: string) => n[0]).join("")}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-slate-900 font-bold">{lawyer.name}</p>
                                                    <p className="text-xs text-slate-500 font-medium">{lawyer.firm}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="font-mono text-sm text-slate-600">{lawyer.marn}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`px-2 py-1 rounded-md text-xs font-bold capitalize border ${getStatusStyle(lawyer.status)}`}>
                                                {lawyer.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-slate-500 font-medium">{lawyer.joinedDate}</td>
                                        <td className="py-4 px-4 text-sm text-slate-900 font-semibold">{lawyer.clients}</td>
                                        <td className="py-4 px-4 text-sm text-slate-900 font-semibold">
                                            {lawyer.rating > 0 ? lawyer.rating : "-"}
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {lawyer.status === "pending" && (
                                                    <>
                                                        <button className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition border border-emerald-100">
                                                            <CheckCircle className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition border border-red-100">
                                                            <XCircle className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}
                                                <button className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition">
                                                    <Eye className="w-4 h-4" />
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
