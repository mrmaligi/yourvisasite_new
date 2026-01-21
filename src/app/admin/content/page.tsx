"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    Shield,
    FileText,
    Edit3,
    Plus,
    Save,
    Trash2,
    CheckCircle,
    Layout,
    Globe,
    Layers,
    Search,
} from "lucide-react";

export default function ContentManagementPage() {
    const [activeTab, setActiveTab] = useState<"visas" | "requirements">("visas");

    // Mock Data
    const visaCategories = [
        { id: "186", name: "Employer Nomination Scheme", subclass: "186", category: "Work", status: "Active" },
        { id: "482", name: "Temporary Skill Shortage", subclass: "482", category: "Work", status: "Active" },
        { id: "820", name: "Partner Visa (Onshore)", subclass: "820", category: "Family", status: "Active" },
    ];

    const requirements = [
        { id: 1, name: "Identity Documents", visa: "All", items: 4 },
        { id: 2, name: "GTI Talent Evidence", visa: "858", items: 6 },
        { id: 3, name: "Sponsor Obligations", visa: "482", items: 8 },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a12]">
            <div className="mesh-background" />

            {/* Sidebar (Simplified Admin) */}
            <aside className="fixed left-0 top-0 bottom-0 w-64 glass border-r border-white/5 z-40 hidden lg:flex flex-col">
                <div className="p-6 flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold text-white">AdminPanel</span>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    <a href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition">
                        <Shield className="w-5 h-5" />
                        Dashboard
                    </a>
                    <a href="/admin/lawyers" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition">
                        <Briefcase className="w-5 h-5" />
                        Verifications
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-500/10 text-indigo-400 font-medium">
                        <Layout className="w-5 h-5" />
                        Content
                    </a>
                </nav>
            </aside>

            <main className="lg:ml-64 p-8 pt-24 lg:pt-8 min-h-screen">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Content Management</h1>
                        <p className="text-slate-400">Manage visa categories and document requirements.</p>
                    </div>
                    <button className="glass-button flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Add New Visa
                    </button>
                </header>

                <div className="glass-card p-6 min-h-[500px]">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex gap-4 border-b border-white/10">
                            <button
                                onClick={() => setActiveTab("visas")}
                                className={`pb-3 px-2 text-sm font-medium transition ${activeTab === "visas"
                                        ? "text-white border-b-2 border-indigo-500"
                                        : "text-slate-400 hover:text-white"
                                    }`}
                            >
                                Visa Categories
                            </button>
                            <button
                                onClick={() => setActiveTab("requirements")}
                                className={`pb-3 px-2 text-sm font-medium transition ${activeTab === "requirements"
                                        ? "text-white border-b-2 border-indigo-500"
                                        : "text-slate-400 hover:text-white"
                                    }`}
                            >
                                Document Checklists
                            </button>
                        </div>

                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="glass-input py-2 pl-9 text-sm"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-slate-400 text-sm border-b border-white/10">
                                    <th className="py-4 px-4 font-medium">Name</th>
                                    <th className="py-4 px-4 font-medium">Subclass</th>
                                    <th className="py-4 px-4 font-medium">Category</th>
                                    <th className="py-4 px-4 font-medium">Status</th>
                                    <th className="py-4 px-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {activeTab === "visas" ? (
                                    visaCategories.map((item) => (
                                        <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition group">
                                            <td className="py-4 px-4 font-medium text-white">{item.name}</td>
                                            <td className="py-4 px-4 text-slate-300">{item.subclass}</td>
                                            <td className="py-4 px-4 text-slate-400">{item.category}</td>
                                            <td className="py-4 px-4">
                                                <span className="px-2 py-1 rounded-md text-xs font-medium bg-emerald-500/20 text-emerald-400">
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                                                    <button className="p-2 rounded hover:bg-white/10 text-indigo-400" title="Edit">
                                                        <Edit3 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    requirements.map((item) => (
                                        <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition group">
                                            <td className="py-4 px-4 font-medium text-white">{item.name}</td>
                                            <td className="py-4 px-4 text-slate-300">{item.visa === "All" ? "Global Requirement" : `Subclass ${item.visa}`}</td>
                                            <td className="py-4 px-4 text-slate-400">{item.items} checklist items</td>
                                            <td className="py-4 px-4">
                                                <span className="px-2 py-1 rounded-md text-xs font-medium bg-indigo-500/20 text-indigo-400">
                                                    Premium
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                                                    <button className="p-2 rounded hover:bg-white/10 text-indigo-400" title="Edit Checklist">
                                                        <Layers className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Icon component needed for simplified sidebar hook (not existing)
function Briefcase({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
    )
}
