"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import {
    Sparkles,
    ArrowLeft,
    FileText,
    FolderOpen,
    Download,
    Eye,
    MessageSquare,
    CheckCircle,
    Clock,
    AlertCircle,
    ChevronDown,
    ChevronRight,
    Send,
    Shield,
} from "lucide-react";

export default function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [activeTab, setActiveTab] = useState<"documents" | "notes" | "timeline">("documents");
    const [expandedFolder, setExpandedFolder] = useState<string | null>("identity");

    // Mock Client Data
    const client = {
        id: resolvedParams.id,
        name: "Michael Chen",
        visa: "Subclass 186 (Employer Nomination)",
        status: "Documents Review",
        progress: 65,
        folders: [
            {
                id: "identity",
                name: "Identity Documents",
                count: 3,
                completed: true,
                documents: [
                    { name: "Passport Bio Page", status: "verified", date: "2 days ago" },
                    { name: "Birth Certificate", status: "review_needed", date: "1 day ago" },
                    { name: "National ID", status: "verified", date: "2 days ago" },
                ]
            },
            {
                id: "employment",
                name: "Employment Evidence",
                count: 4,
                completed: false,
                documents: [
                    { name: "Employment Contract", status: "verified", date: "3 days ago" },
                    { name: "Payslips (6 months)", status: "pending", date: "-" },
                ]
            }
        ]
    };

    return (
        <div className="min-h-screen bg-[#0a0a12]">
            <div className="mesh-background" />

            {/* Sidebar (Simplified Lawyer) */}
            <aside className="fixed left-0 top-0 bottom-0 w-64 glass border-r border-white/5 z-40 hidden lg:flex flex-col">
                <div className="p-6 flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold text-white">LawyerPortal</span>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    <a href="/lawyer/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition">
                        <Shield className="w-5 h-5" />
                        Dashboard
                    </a>
                    <a href="/lawyer/clients" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-500/10 text-indigo-400 font-medium">
                        <FolderOpen className="w-5 h-5" />
                        My Clients
                    </a>
                </nav>
            </aside>

            <main className="lg:ml-64 p-8 pt-24 lg:pt-8 min-h-screen">
                <a href="/lawyer/clients" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition mb-8">
                    <ArrowLeft className="w-5 h-5" />
                    Back to Client List
                </a>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">{client.name}</h1>
                        <div className="flex items-center gap-3 text-slate-400 text-sm">
                            <span className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-400 font-medium">
                                {client.visa}
                            </span>
                            <span>• Last active 2 hours ago</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="glass-button-secondary flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            Message
                        </button>
                        <button className="glass-button flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Mark Review Complete
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Progress Overview */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card p-6"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-white">Application Completeness</h3>
                                <span className="text-indigo-400 font-bold">{client.progress}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${client.progress}%` }} />
                            </div>
                        </motion.div>

                        {/* Document Vault View */}
                        <div className="glass-card p-6 min-h-[500px]">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <FolderOpen className="w-5 h-5 text-indigo-400" />
                                Document Vault
                            </h2>

                            <div className="space-y-4">
                                {client.folders.map((folder, index) => (
                                    <div key={folder.id} className="border border-white/5 rounded-2xl overflow-hidden">
                                        <button
                                            onClick={() => setExpandedFolder(expandedFolder === folder.id ? null : folder.id)}
                                            className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition"
                                        >
                                            <div className="flex items-center gap-3">
                                                {folder.completed ? (
                                                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                                                ) : (
                                                    <Clock className="w-5 h-5 text-amber-400" />
                                                )}
                                                <span className="font-medium text-white">{folder.name}</span>
                                                <span className="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded-full">
                                                    {folder.count} files
                                                </span>
                                            </div>
                                            {expandedFolder === folder.id ? (
                                                <ChevronDown className="w-5 h-5 text-slate-400" />
                                            ) : (
                                                <ChevronRight className="w-5 h-5 text-slate-400" />
                                            )}
                                        </button>

                                        {expandedFolder === folder.id && (
                                            <div className="bg-black/20 p-2 space-y-1">
                                                {folder.documents.map((doc, i) => (
                                                    <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 group transition">
                                                        <div className="flex items-center gap-3">
                                                            <FileText className="w-4 h-4 text-slate-400" />
                                                            <div>
                                                                <p className="text-sm text-slate-200">{doc.name}</p>
                                                                <p className="text-xs text-slate-500">{doc.date}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            {doc.status === "review_needed" && (
                                                                <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded">
                                                                    Review Needed
                                                                </span>
                                                            )}
                                                            <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition">
                                                                <button className="p-1.5 rounded hover:bg-white/10" title="View">
                                                                    <Eye className="w-4 h-4 text-indigo-400" />
                                                                </button>
                                                                <button className="p-1.5 rounded hover:bg-white/10" title="Download">
                                                                    <Download className="w-4 h-4 text-slate-400" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Notes & Quick Actions */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass-card p-6"
                        >
                            <h3 className="font-semibold text-white mb-4">Case Notes</h3>
                            <div className="h-64 overflow-y-auto space-y-4 mb-4 pr-2">
                                <div className="bg-white/5 p-3 rounded-xl">
                                    <p className="text-xs text-slate-500 mb-1">Yesterday, 2:30 PM</p>
                                    <p className="text-sm text-slate-300">Requested clearer copy of birth certificate. Original scan was blurry.</p>
                                </div>
                                <div className="bg-white/5 p-3 rounded-xl">
                                    <p className="text-xs text-slate-500 mb-1">15 Jan, 10:00 AM</p>
                                    <p className="text-sm text-slate-300">Initial consultation completed. Client is eligible for 186 Direct Entry stream.</p>
                                </div>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Add a note..."
                                    className="w-full glass-input pr-10 text-sm"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition">
                                    <Send className="w-3 h-3 text-white" />
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="glass-card p-6"
                        >
                            <h3 className="font-semibold text-white mb-4">Next Steps</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <input type="checkbox" className="rounded border-slate-600 bg-transparent text-indigo-500 focus:ring-offset-0" />
                                    <span>Verify employment history</span>
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <input type="checkbox" className="rounded border-slate-600 bg-transparent text-indigo-500 focus:ring-offset-0" />
                                    <span>Check character statutory declaration</span>
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <input type="checkbox" className="rounded border-slate-600 bg-transparent text-indigo-500 focus:ring-offset-0" />
                                    <span>Draft application submission letter</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
