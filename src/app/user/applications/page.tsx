"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Sparkles,
    Bell,
    User,
    FileText,
    ChevronRight,
    Plus,
    Eye,
    Upload,
    DollarSign,
} from "lucide-react";

// Mock user applications
const applications = [
    {
        id: 1,
        subclass: "482",
        name: "Temporary Skill Shortage",
        status: "In Progress",
        documentsUploaded: 12,
        documentsRequired: 16,
        lastUpdated: "2 hours ago",
        paid: true,
        nextStep: "Upload Skills Assessment",
    },
    {
        id: 2,
        subclass: "186",
        name: "Employer Nomination Scheme",
        status: "Documents Pending",
        documentsUploaded: 5,
        documentsRequired: 18,
        lastUpdated: "3 days ago",
        paid: true,
        nextStep: "Complete Employment References",
    },
    {
        id: 3,
        subclass: "820",
        name: "Partner Visa (Onshore)",
        status: "Not Started",
        documentsUploaded: 0,
        documentsRequired: 22,
        lastUpdated: "1 week ago",
        paid: false,
        nextStep: "Unlock Premium Access",
    },
];

export default function MyApplications() {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "In Progress": return "bg-indigo-500/20 text-indigo-400";
            case "Documents Pending": return "bg-amber-500/20 text-amber-400";
            case "Not Started": return "bg-slate-500/20 text-slate-400";
            case "Submitted": return "bg-emerald-500/20 text-emerald-400";
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
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">YourVisaSite</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/user/dashboard" className="nav-link text-sm font-medium">Dashboard</Link>
                        <Link href="/user/visas" className="nav-link text-sm font-medium">Visas</Link>
                        <Link href="/user/applications" className="nav-link text-sm font-medium text-white">My Applications</Link>
                        <Link href="/tracker" className="nav-link text-sm font-medium">Tracker</Link>
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
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between mb-8"
                    >
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">My Applications</h1>
                            <p className="text-slate-400">Track and manage your visa applications</p>
                        </div>
                        <Link
                            href="/user/visas"
                            className="btn-primary flex items-center gap-2 text-sm"
                        >
                            <Plus className="w-4 h-4" />
                            Start New Application
                        </Link>
                    </motion.div>

                    {/* Applications List */}
                    <div className="space-y-4">
                        {applications.map((app, index) => (
                            <motion.div
                                key={app.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="card p-6"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                    {/* Left - Visa Info */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600/30 to-purple-600/30 flex items-center justify-center">
                                            <span className="text-xl font-bold text-white">{app.subclass}</span>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-lg font-semibold text-white">Subclass {app.subclass}</h3>
                                                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(app.status)}`}>
                                                    {app.status}
                                                </span>
                                            </div>
                                            <p className="text-slate-400">{app.name}</p>
                                            <p className="text-xs text-slate-500 mt-1">Last updated {app.lastUpdated}</p>
                                        </div>
                                    </div>

                                    {/* Center - Progress */}
                                    <div className="flex items-center gap-6">
                                        <div>
                                            <p className="text-xs text-slate-500 mb-1">Documents</p>
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 h-2 rounded-full bg-white/10">
                                                    <div
                                                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                                        style={{ width: `${(app.documentsUploaded / app.documentsRequired) * 100}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs text-slate-400">
                                                    {app.documentsUploaded}/{app.documentsRequired}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="hidden md:block">
                                            <p className="text-xs text-slate-500 mb-1">Next Step</p>
                                            <p className="text-sm text-white">{app.nextStep}</p>
                                        </div>
                                    </div>

                                    {/* Right - Actions */}
                                    <div className="flex items-center gap-2">
                                        {app.paid ? (
                                            <Link
                                                href={`/user/visas/${app.subclass}/premium`}
                                                className="btn-primary flex items-center gap-2 text-sm py-2 px-4"
                                            >
                                                <Upload className="w-4 h-4" />
                                                Continue
                                            </Link>
                                        ) : (
                                            <Link
                                                href={`/user/visas/${app.subclass}`}
                                                className="btn-primary flex items-center gap-2 text-sm py-2 px-4"
                                            >
                                                <DollarSign className="w-4 h-4" />
                                                Unlock $49
                                            </Link>
                                        )}
                                        <button className="p-2 rounded-xl card hover:bg-white/10 transition">
                                            <Eye className="w-5 h-5 text-slate-400" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Empty State CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 card p-8 text-center"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-8 h-8 text-indigo-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Looking for a different visa?</h3>
                        <p className="text-slate-400 mb-6 max-w-md mx-auto">
                            Browse our complete catalogue of Australian visas with intelligent search and filtering.
                        </p>
                        <Link href="/user/visas" className="btn-primary inline-flex items-center gap-2">
                            Browse All Visas
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
