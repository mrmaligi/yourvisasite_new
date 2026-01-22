"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Sparkles,
    Bell,
    User,
    Bookmark,
    Search,
    Filter,
    Star,
    Clock,
    FileText,
    Youtube,
    Trash2,
    ExternalLink,
    ChevronRight,
    FolderPlus,
} from "lucide-react";

// Mock bookmarked data
const bookmarkedVisas = [
    {
        subclass: "482",
        name: "Temporary Skill Shortage",
        savedAt: "2 days ago",
        processingTime: "42 days",
        category: "Work",
    },
    {
        subclass: "186",
        name: "Employer Nomination Scheme",
        savedAt: "1 week ago",
        processingTime: "175 days",
        category: "Work",
    },
    {
        subclass: "820",
        name: "Partner Visa (Onshore)",
        savedAt: "2 weeks ago",
        processingTime: "730 days",
        category: "Family",
    },
];

const bookmarkedLawyers = [
    {
        id: 1,
        name: "Emily Richardson",
        firm: "Richardson Immigration Law",
        avatar: "ER",
        rating: 4.9,
        specialties: ["482", "186", "189"],
        savedAt: "3 days ago",
    },
    {
        id: 2,
        name: "James Park",
        firm: "Park Migration",
        avatar: "JP",
        rating: 4.8,
        specialties: ["Partner", "820", "801"],
        savedAt: "1 week ago",
    },
];

const bookmarkedArticles = [
    {
        title: "New Priority Processing for Healthcare Workers",
        source: "Immigration Dept",
        savedAt: "1 day ago",
        type: "news",
    },
    {
        title: "Complete Guide to 482 Visa Application",
        source: "YourVisaSite Guide",
        savedAt: "4 days ago",
        type: "guide",
    },
    {
        title: "Partner Visa Changes 2026 Explained",
        channel: "Migration Expert",
        savedAt: "1 week ago",
        type: "video",
    },
];

type TabType = "all" | "visas" | "lawyers" | "articles";

export default function UserBookmarks() {
    const [activeTab, setActiveTab] = useState<TabType>("all");
    const [searchQuery, setSearchQuery] = useState("");

    const tabs = [
        { id: "all" as TabType, label: "All", count: bookmarkedVisas.length + bookmarkedLawyers.length + bookmarkedArticles.length },
        { id: "visas" as TabType, label: "Visas", count: bookmarkedVisas.length },
        { id: "lawyers" as TabType, label: "Lawyers", count: bookmarkedLawyers.length },
        { id: "articles" as TabType, label: "Articles", count: bookmarkedArticles.length },
    ];

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
                        <Link href="/user/applications" className="nav-link text-sm font-medium">Applications</Link>
                        <Link href="/user/bookmarks" className="nav-link text-sm font-medium text-white">Bookmarks</Link>
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
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">Bookmarks</h1>
                                <p className="text-slate-400">Your saved visas, lawyers, and articles</p>
                            </div>
                            <button className="btn-primary flex items-center gap-2">
                                <FolderPlus className="w-4 h-4" />
                                New Collection
                            </button>
                        </div>

                        {/* Search and Filter */}
                        <div className="flex items-center gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search bookmarks..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 input-field rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                                />
                            </div>
                            <button className="p-3 card rounded-xl hover:bg-white/10 transition">
                                <Filter className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex gap-2 mb-6 overflow-x-auto pb-2"
                    >
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition flex items-center gap-2 ${activeTab === tab.id
                                        ? "bg-indigo-500/20 text-white border border-indigo-500/30"
                                        : "card text-slate-400 hover:text-white"
                                    }`}
                            >
                                {tab.label}
                                <span className={`px-2 py-0.5 rounded-md text-xs ${activeTab === tab.id ? "bg-indigo-500/30" : "bg-white/10"
                                    }`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </motion.div>

                    {/* Bookmarked Visas */}
                    {(activeTab === "all" || activeTab === "visas") && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-8"
                        >
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-indigo-400" />
                                Saved Visas
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {bookmarkedVisas.map((visa) => (
                                    <motion.div
                                        key={visa.subclass}
                                        whileHover={{ scale: 1.02 }}
                                        className="card p-5 group"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                                    <span className="text-lg font-bold text-white">{visa.subclass}</span>
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{visa.name}</p>
                                                    <p className="text-sm text-slate-500">{visa.category}</p>
                                                </div>
                                            </div>
                                            <button className="p-2 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition opacity-0 group-hover:opacity-100">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-1 text-slate-400">
                                                <Clock className="w-4 h-4" />
                                                <span>~{visa.processingTime}</span>
                                            </div>
                                            <span className="text-slate-500">Saved {visa.savedAt}</span>
                                        </div>
                                        <Link
                                            href={`/user/visas/${visa.subclass}`}
                                            className="mt-3 w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-white flex items-center justify-center gap-2 transition"
                                        >
                                            View Details
                                            <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Bookmarked Lawyers */}
                    {(activeTab === "all" || activeTab === "lawyers") && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mb-8"
                        >
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-cyan-400" />
                                Saved Lawyers
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {bookmarkedLawyers.map((lawyer) => (
                                    <motion.div
                                        key={lawyer.id}
                                        whileHover={{ scale: 1.02 }}
                                        className="card p-5 group"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                                    <span className="text-lg font-bold text-white">{lawyer.avatar}</span>
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{lawyer.name}</p>
                                                    <p className="text-sm text-slate-500">{lawyer.firm}</p>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                                        <span className="text-amber-400 text-sm font-medium">{lawyer.rating}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="p-2 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition opacity-0 group-hover:opacity-100">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="mt-3 flex items-center gap-2 flex-wrap">
                                            {lawyer.specialties.map((specialty) => (
                                                <span
                                                    key={specialty}
                                                    className="px-2 py-1 rounded-lg bg-white/10 text-xs text-slate-300"
                                                >
                                                    {specialty}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="mt-3 flex items-center gap-2">
                                            <Link
                                                href={`/lawyers/${lawyer.id}`}
                                                className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-white flex items-center justify-center gap-2 transition"
                                            >
                                                View Profile
                                            </Link>
                                            <Link
                                                href={`/user/book/${lawyer.id}`}
                                                className="flex-1 py-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-sm text-indigo-300 flex items-center justify-center gap-2 transition"
                                            >
                                                Book Call
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Bookmarked Articles */}
                    {(activeTab === "all" || activeTab === "articles") && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Bookmark className="w-5 h-5 text-purple-400" />
                                Saved Articles & Videos
                            </h2>
                            <div className="space-y-3">
                                {bookmarkedArticles.map((article, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.01 }}
                                        className="card p-4 flex items-center justify-between group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${article.type === "video"
                                                    ? "bg-red-500/20"
                                                    : article.type === "guide"
                                                        ? "bg-emerald-500/20"
                                                        : "bg-blue-500/20"
                                                }`}>
                                                {article.type === "video" ? (
                                                    <Youtube className="w-5 h-5 text-red-400" />
                                                ) : (
                                                    <FileText className={`w-5 h-5 ${article.type === "guide" ? "text-emerald-400" : "text-blue-400"
                                                        }`} />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{article.title}</p>
                                                <p className="text-sm text-slate-500">
                                                    {article.source || article.channel} • Saved {article.savedAt}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition opacity-0 group-hover:opacity-100">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition">
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Empty State */}
                    {activeTab !== "all" && (
                        (activeTab === "visas" && bookmarkedVisas.length === 0) ||
                        (activeTab === "lawyers" && bookmarkedLawyers.length === 0) ||
                        (activeTab === "articles" && bookmarkedArticles.length === 0)
                    ) && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-16"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                                    <Bookmark className="w-8 h-8 text-slate-500" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">No bookmarks yet</h3>
                                <p className="text-slate-400 mb-6">Start saving visas, lawyers, and articles to access them here</p>
                                <Link href="/user/visas" className="btn-primary inline-flex">
                                    Explore Visas
                                </Link>
                            </motion.div>
                        )}
                </div>
            </main>
        </div>
    );
}
