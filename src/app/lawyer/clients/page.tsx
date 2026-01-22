"use client";
import Link from "next/link";

import { motion } from "framer-motion";
import {
    Sparkles,
    Bell,
    User,
    Search,
    ChevronRight,
} from "lucide-react";

// Mock clients data
const clients = [
    {
        id: 1,
        name: "Sarah Chen",
        avatar: "SC",
        visa: "482",
        visaName: "Temporary Skill Shortage",
        status: "Active",
        consultationType: "Full Takeover",
        documentsUploaded: 12,
        documentsRequired: 16,
        lastContact: "2 hours ago",
        nextAction: "Review skills assessment",
    },
    {
        id: 2,
        name: "Michael Park",
        avatar: "MP",
        visa: "186",
        visaName: "Employer Nomination Scheme",
        status: "Active",
        consultationType: "60 min Call",
        documentsUploaded: 8,
        documentsRequired: 18,
        lastContact: "1 day ago",
        nextAction: "Schedule follow-up call",
    },
    {
        id: 3,
        name: "Emma Wilson",
        avatar: "EW",
        visa: "820",
        visaName: "Partner Visa (Onshore)",
        status: "Pending Review",
        consultationType: "30 min Call",
        documentsUploaded: 5,
        documentsRequired: 22,
        lastContact: "3 days ago",
        nextAction: "Request relationship evidence",
    },
    {
        id: 4,
        name: "David Kumar",
        avatar: "DK",
        visa: "189",
        visaName: "Skilled Independent",
        status: "Completed",
        consultationType: "Full Takeover",
        documentsUploaded: 20,
        documentsRequired: 20,
        lastContact: "1 week ago",
        nextAction: "Awaiting grant",
    },
];

export default function LawyerClients() {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active": return "bg-emerald-500/20 text-emerald-400";
            case "Pending Review": return "bg-amber-500/20 text-amber-400";
            case "Completed": return "bg-indigo-500/20 text-indigo-400";
            default: return "bg-slate-500/20 text-slate-400";
        }
    };

    return (
        <div className="min-h-screen">
            {/* Mesh Background */}
            <div className="mesh-background" />

            {/* Navigation */}
            <nav className="nav-sticky fixed top-0 left-0 right-0 z-50 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">YourVisaSite</span>
                        <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-medium">
                            LAWYER
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/lawyer/dashboard" className="nav-link text-sm font-medium">Dashboard</Link>
                        <Link href="/lawyer/clients" className="nav-link text-sm font-medium text-white">My Clients</Link>
                        <Link href="/lawyer/marketing" className="nav-link text-sm font-medium">Marketing</Link>
                        <Link href="#" className="nav-link text-sm font-medium">Settings</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 rounded-xl card hover:bg-white/10 transition">
                            <Bell className="w-5 h-5 text-slate-300" />
                        </button>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
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
                        className="flex items-center justify-between mb-8"
                    >
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">My Clients</h1>
                            <p className="text-slate-400">Manage your active and past consultations</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl card">
                                <span className="text-2xl font-bold text-white">{clients.filter(c => c.status === "Active").length}</span>
                                <span className="text-sm text-slate-400">Active</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Search & Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="card p-4 mb-6"
                    >
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search clients..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none transition"
                                />
                            </div>
                            <div className="flex gap-2">
                                {["All", "Active", "Pending", "Completed"].map((status) => (
                                    <button
                                        key={status}
                                        className="px-4 py-2 rounded-xl text-sm font-medium bg-white/5 text-slate-400 hover:bg-white/10 transition"
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Clients List */}
                    <div className="space-y-4">
                        {clients.map((client, index) => (
                            <motion.a
                                key={client.id}
                                href={`/lawyer/clients/${client.id}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                                className="card p-6 block hover:bg-white/5 transition"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                            <span className="text-lg font-bold text-white">{client.avatar}</span>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-lg font-semibold text-white">{client.name}</h3>
                                                <span className={`px-2 py-0.5 rounded-lg text-xs font-medium ${getStatusColor(client.status)}`}>
                                                    {client.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-400">
                                                Subclass {client.visa} - {client.visaName}
                                            </p>
                                            <p className="text-xs text-slate-500 mt-1">{client.consultationType}</p>
                                        </div>
                                    </div>

                                    <div className="hidden md:flex items-center gap-8">
                                        <div className="text-center">
                                            <p className="text-sm text-white font-medium">
                                                {client.documentsUploaded}/{client.documentsRequired}
                                            </p>
                                            <p className="text-xs text-slate-500">Documents</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm text-slate-300">{client.lastContact}</p>
                                            <p className="text-xs text-slate-500">Last Contact</p>
                                        </div>
                                        <div className="text-right max-w-[200px]">
                                            <p className="text-sm text-amber-400">{client.nextAction}</p>
                                            <p className="text-xs text-slate-500">Next Action</p>
                                        </div>
                                    </div>

                                    <ChevronRight className="w-5 h-5 text-slate-500" />
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
