"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Sparkles,
    Search,
    TrendingUp,
    TrendingDown,
    Minus,
    Clock,
    CheckCircle,
    XCircle,
    Shield,
    Filter,
    ChevronDown,
    Info,
    Plus,
} from "lucide-react";
import { getTrackerData } from "@/app/actions/tracker";
import { useEffect } from "react";


// Mock tracker data
const trackerEntries = [
    {
        subclass: "482",
        name: "Temporary Skill Shortage",
        category: "Work",
        avgDays: 45,
        percentiles: { p25: 18, p50: 29, p75: 51, p90: 120 },
        trend: "improving",
        trendChange: -5,
        totalReports: 1245,
        lawyerVerified: true,
        lastUpdate: "2 hours ago"
    },
    {
        subclass: "186",
        name: "Employer Nomination Scheme",
        category: "Work",
        avgDays: 180,
        percentiles: { p25: 90, p50: 180, p75: 300, p90: 390 },
        trend: "worsening",
        trendChange: 12,
        totalReports: 892,
        lawyerVerified: true,
        lastUpdate: "5 hours ago"
    },
    {
        subclass: "189",
        name: "Skilled Independent",
        category: "Work",
        avgDays: 365,
        percentiles: { p25: 180, p50: 365, p75: 510, p90: 660 },
        trend: "stable",
        trendChange: 0,
        totalReports: 2156,
        lawyerVerified: true,
        lastUpdate: "1 day ago"
    },
    {
        subclass: "190",
        name: "Skilled Nominated",
        category: "Work",
        avgDays: 270,
        percentiles: { p25: 120, p50: 270, p75: 420, p90: 540 },
        trend: "improving",
        trendChange: -15,
        totalReports: 1034,
        lawyerVerified: false,
        lastUpdate: "3 hours ago"
    },
    {
        subclass: "500",
        name: "Student Visa",
        category: "Student",
        avgDays: 30,
        percentiles: { p25: 7, p50: 21, p75: 45, p90: 60 },
        trend: "stable",
        trendChange: 0,
        totalReports: 3421,
        lawyerVerified: true,
        lastUpdate: "30 min ago"
    },
    {
        subclass: "820",
        name: "Partner Visa (Onshore)",
        category: "Family",
        avgDays: 730,
        percentiles: { p25: 540, p50: 730, p75: 900, p90: 1095 },
        trend: "improving",
        trendChange: -30,
        totalReports: 1876,
        lawyerVerified: true,
        lastUpdate: "4 hours ago"
    },
    {
        subclass: "600",
        name: "Visitor Visa",
        category: "Visitor",
        avgDays: 20,
        percentiles: { p25: 5, p50: 14, p75: 30, p90: 45 },
        trend: "improving",
        trendChange: -2,
        totalReports: 5234,
        lawyerVerified: false,
        lastUpdate: "1 hour ago"
    },
    {
        subclass: "417",
        name: "Working Holiday",
        category: "Visitor",
        avgDays: 14,
        percentiles: { p25: 3, p50: 7, p75: 14, p90: 21 },
        trend: "stable",
        trendChange: 0,
        totalReports: 2890,
        lawyerVerified: true,
        lastUpdate: "6 hours ago"
    },
];

const categories = ["All", "Work", "Student", "Family", "Visitor"];

export default function PublicTracker() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("subclass");
    const [trackerEntries, setTrackerEntries] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTrackerData();
            // Map database data to UI format
            const formatted = data.map((item: any) => ({
                subclass: item.visa_subclass,
                name: `Visa ${item.visa_subclass}`, // Placeholder
                category: "Work", // Placeholder
                avgDays: parseInt(item.processing_time) || 0,
                percentiles: { p25: 0, p50: 0, p75: 0, p90: 0 }, // Placeholder
                trend: "stable",
                trendChange: 0,
                totalReports: 1,
                lawyerVerified: item.is_lawyer_verified || false,
                lastUpdate: new Date(item.created_at).toLocaleDateString()
            }));
            setTrackerEntries(formatted);
        };
        fetchData();
    }, []);


    const filteredEntries = trackerEntries
        .filter((entry) => {
            const matchesSearch =
                searchQuery === "" ||
                entry.subclass.includes(searchQuery) ||
                entry.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All" || entry.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortBy === "subclass") return a.subclass.localeCompare(b.subclass);
            if (sortBy === "processing") return a.avgDays - b.avgDays;
            if (sortBy === "reports") return b.totalReports - a.totalReports;
            return 0;
        });

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case "improving": return TrendingDown;
            case "worsening": return TrendingUp;
            default: return Minus;
        }
    };

    const getTrendColor = (trend: string) => {
        switch (trend) {
            case "improving": return "text-emerald-400";
            case "worsening": return "text-red-400";
            default: return "text-slate-400";
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
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">VisaIQ</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="/" className="nav-link text-sm font-medium">
                            Home
                        </a>
                        <a href="/user/visas" className="nav-link text-sm font-medium">
                            Visas
                        </a>
                        <a href="/tracker" className="nav-link text-sm font-medium text-white">
                            Tracker
                        </a>
                        <Link href="/lawyers" className="nav-link text-sm font-medium">
                            Lawyers
                        </Link>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="glass-button-secondary text-sm py-2.5 px-5">
                            Sign In
                        </button>
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
                        className="text-center mb-10"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Visa <span className="gradient-text">Processing Tracker</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-6">
                            Real-time processing times crowdsourced from applicants and verified lawyers
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
                                <div className="w-3 h-3 rounded-full bg-emerald-400 verified-badge" />
                                <span className="text-sm text-slate-300">Lawyer Verified</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
                                <span className="text-sm text-slate-400">{trackerEntries.reduce((sum, e) => sum + e.totalReports, 0).toLocaleString()} total reports</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Search & Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card p-4 mb-8"
                    >
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search by visa name or subclass..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none transition"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="flex gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition ${selectedCategory === category
                                            ? "bg-indigo-500 text-white"
                                            : "bg-white/5 text-slate-400 hover:bg-white/10"
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Info Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-6 flex items-start gap-3"
                    >
                        <Info className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm text-indigo-200">
                                <strong>How it works:</strong> Processing times are crowdsourced from applicants who report their
                                submission and decision dates. Entries with the <span className="text-emerald-400">verified badge</span> have
                                been confirmed by registered immigration lawyers.
                            </p>
                        </div>
                    </motion.div>

                    {/* Tracker Results */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        {filteredEntries.map((entry, index) => {
                            const TrendIcon = getTrendIcon(entry.trend);
                            return (
                                <motion.div
                                    key={entry.subclass}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    className={`glass-card p-6 ${entry.lawyerVerified ? "verified-badge" : ""}`}
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                        {/* Left - Visa Info */}
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600/30 to-purple-600/30 flex items-center justify-center">
                                                <span className="text-xl font-bold text-white">{entry.subclass}</span>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-lg font-semibold text-white">Subclass {entry.subclass}</h3>
                                                    {entry.lawyerVerified && (
                                                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-500/20">
                                                            <Shield className="w-3 h-3 text-emerald-400" />
                                                            <span className="text-xs text-emerald-400 font-medium">Verified</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="text-slate-400">{entry.name}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs text-slate-500">{entry.totalReports.toLocaleString()} reports</span>
                                                    <span className="text-xs text-slate-600">•</span>
                                                    <span className="text-xs text-slate-500">Updated {entry.lastUpdate}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Center - Processing Times */}
                                        <div className="flex items-center gap-6">
                                            <div className="text-center">
                                                <p className="text-3xl font-bold text-white">{entry.avgDays}</p>
                                                <p className="text-xs text-slate-400">avg days</p>
                                            </div>
                                            <div className="hidden md:flex items-center gap-4 text-center">
                                                <div className="px-3 py-2 rounded-xl bg-white/5">
                                                    <p className="text-sm text-white font-medium">{entry.percentiles.p25}d</p>
                                                    <p className="text-xs text-slate-500">25%</p>
                                                </div>
                                                <div className="px-3 py-2 rounded-xl bg-white/5">
                                                    <p className="text-sm text-white font-medium">{entry.percentiles.p50}d</p>
                                                    <p className="text-xs text-slate-500">50%</p>
                                                </div>
                                                <div className="px-3 py-2 rounded-xl bg-white/5">
                                                    <p className="text-sm text-white font-medium">{entry.percentiles.p75}d</p>
                                                    <p className="text-xs text-slate-500">75%</p>
                                                </div>
                                                <div className="px-3 py-2 rounded-xl bg-white/5">
                                                    <p className="text-sm text-white font-medium">{entry.percentiles.p90}d</p>
                                                    <p className="text-xs text-slate-500">90%</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right - Trend */}
                                        <div className="flex items-center gap-4">
                                            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${entry.trend === "improving" ? "bg-emerald-500/10" :
                                                entry.trend === "worsening" ? "bg-red-500/10" : "bg-white/5"
                                                }`}>
                                                <TrendIcon className={`w-5 h-5 ${getTrendColor(entry.trend)}`} />
                                                <div>
                                                    <p className={`text-sm font-medium ${getTrendColor(entry.trend)}`}>
                                                        {entry.trend === "improving" ? `${Math.abs(entry.trendChange)} days faster` :
                                                            entry.trend === "worsening" ? `${entry.trendChange} days slower` :
                                                                "Stable"}
                                                    </p>
                                                    <p className="text-xs text-slate-500">vs last month</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Submit CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-10 glass-card p-8 text-center"
                    >
                        <h2 className="text-2xl font-bold text-white mb-3">Help others by sharing your experience</h2>
                        <p className="text-slate-400 mb-6 max-w-xl mx-auto">
                            Submit your visa processing times to help fellow applicants make informed decisions.
                        </p>
                        <button className="glass-button flex items-center gap-2 mx-auto">
                            <Plus className="w-5 h-5" />
                            Submit Your Processing Time
                        </button>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
