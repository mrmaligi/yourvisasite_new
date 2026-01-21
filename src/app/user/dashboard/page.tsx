"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Bell,
    Search,
    Phone,
    FileText,
    Youtube,
    TrendingUp,
    Clock,
    User,
    ChevronRight,
    ExternalLink,
    Calendar,
    Settings,
    Sparkles,
    ArrowUpRight,
    Play,
    BarChart3,
} from "lucide-react";
import { getDashboardStats } from "@/app/actions/dashboard";
import { useEffect, useState } from "react";


// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const stagger = {
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

// Mock data for visa tracker
const trackerData = [
    { subclass: "482", name: "Temporary Skill Shortage", avgDays: 45, trend: "up", change: "-5 days" },
    { subclass: "186", name: "Employer Nomination", avgDays: 180, trend: "down", change: "+12 days" },
    { subclass: "189", name: "Skilled Independent", avgDays: 365, trend: "stable", change: "stable" },
    { subclass: "820", name: "Partner Visa", avgDays: 730, trend: "up", change: "-30 days" },
];

// Mock data for news feed
const newsItems = [
    {
        title: "New Priority Processing for Healthcare Workers",
        category: "Policy Update",
        time: "2 hours ago",
        source: "Immigration Dept",
    },
    {
        title: "Subclass 482 Processing Times Improving",
        category: "Processing Times",
        time: "5 hours ago",
        source: "VisaIQ Analysis",
    },
    {
        title: "Changes to Skills Assessment Requirements",
        category: "Requirements",
        time: "1 day ago",
        source: "VETASSESS",
    },
];

// Mock data for YouTube videos
const youtubeVideos = [
    {
        title: "Partner Visa 2026: Complete Guide",
        channel: "Visa Lawyer AU",
        views: "12K views",
        duration: "24:15",
        thumbnail: "🎬",
    },
    {
        title: "482 to 186 Pathway Explained",
        channel: "Immigration Expert",
        views: "8.5K views",
        duration: "18:32",
        thumbnail: "🎬",
    },
    {
        title: "Points Test Calculator Update",
        channel: "Oz Migration",
        views: "5.2K views",
        duration: "12:48",
        thumbnail: "🎬",
    },
];

export default function UserDashboard() {
    const [stats, setStats] = useState({ userName: "User", documentsCount: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            const data = await getDashboardStats();
            if (data) setStats(data);
        };
        fetchStats();
    }, []);

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
                        <a href="/user/dashboard" className="nav-link text-sm font-medium text-white">
                            Dashboard
                        </a>
                        <a href="/user/visas" className="nav-link text-sm font-medium">
                            Visas
                        </a>
                        <a href="/tracker" className="nav-link text-sm font-medium">
                            Tracker
                        </a>
                        <Link href="/lawyers" className="nav-link text-sm font-medium">
                            Lawyers
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 rounded-xl glass hover:bg-white/10 transition">
                            <Bell className="w-5 h-5 text-slate-300" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full" />
                        </button>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-28 pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Welcome Header */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                        className="mb-10"
                    >
                        <motion.div variants={fadeInUp} className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    Welcome back, <span className="gradient-text">{stats.userName}</span>
                                </h1>

                                <p className="text-slate-400">
                                    Your visa journey at a glance
                                </p>
                            </div>
                            <div className="hidden md:flex items-center gap-3">
                                <button className="glass-button-secondary flex items-center gap-2 text-sm py-3 px-5">
                                    <Search className="w-4 h-4" />
                                    Search Visas
                                </button>
                                <button className="glass-button flex items-center gap-2 text-sm py-3 px-5">
                                    <Phone className="w-4 h-4" />
                                    Quick Call
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Dashboard Grid */}
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Left Column - Tracker Widget */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="lg:col-span-2"
                        >
                            <div className="glass-card p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                                            <TrendingUp className="w-5 h-5 text-cyan-400" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-semibold text-white">Live Visa Tracker</h2>
                                            <p className="text-sm text-slate-400">Real-time processing times</p>
                                        </div>
                                    </div>
                                    <a href="/tracker" className="flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 transition">
                                        View All <ChevronRight className="w-4 h-4" />
                                    </a>
                                </div>

                                <div className="space-y-4">
                                    {trackerData.map((visa, index) => (
                                        <motion.div
                                            key={visa.subclass}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + index * 0.1 }}
                                            className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition cursor-pointer group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600/30 to-purple-600/30 flex items-center justify-center">
                                                    <span className="text-lg font-bold text-white">{visa.subclass}</span>
                                                </div>
                                                <div>
                                                    <h3 className="text-white font-medium group-hover:text-indigo-300 transition">
                                                        Subclass {visa.subclass}
                                                    </h3>
                                                    <p className="text-sm text-slate-400">{visa.name}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-slate-400" />
                                                    <span className="text-white font-semibold">{visa.avgDays} days</span>
                                                </div>
                                                <span className={`text-sm ${visa.trend === "up" ? "text-green-400" :
                                                    visa.trend === "down" ? "text-red-400" : "text-slate-400"
                                                    }`}>
                                                    {visa.change}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column - Quick Actions & Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="space-y-6"
                        >
                            {/* Quick Call Widget */}
                            <div className="glass-card p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-full blur-2xl" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center glow-pulse">
                                            <Phone className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">Quick Consult</h3>
                                            <p className="text-sm text-slate-400">Talk to an expert</p>
                                        </div>
                                    </div>
                                    <p className="text-slate-300 mb-4 text-sm">
                                        Get instant advice from verified immigration lawyers starting from $200/hr.
                                    </p>
                                    <button className="w-full glass-button text-sm py-3">
                                        Book Now
                                    </button>
                                </div>
                            </div>

                            {/* My Documents Widget */}
                            <div className="glass-card p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-emerald-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-white">My Documents</h3>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-400" />
                                </div>
                                <div className="flex items-center justify-between text-sm mb-4">
                                    <span className="text-slate-400">Documents uploaded</span>
                                    <span className="text-white font-medium">{stats.documentsCount} files</span>
                                </div>

                                <div className="flex gap-2">
                                    <div className="flex-1 h-2 rounded-full bg-white/10">
                                        <div className="w-3/4 h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-500" />
                                    </div>
                                </div>
                                <p className="text-xs text-slate-400 mt-2">75% complete for Subclass 482</p>
                            </div>

                            {/* Calendar Widget */}
                            <div className="glass-card p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-orange-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">Upcoming</h3>
                                </div>
                                <div className="p-3 rounded-xl bg-white/5">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-white text-sm font-medium">Medical Exam</span>
                                        <span className="text-xs text-orange-400">In 3 days</span>
                                    </div>
                                    <p className="text-xs text-slate-400">Panel Clinic Melbourne</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Row - News & YouTube */}
                    <div className="grid lg:grid-cols-2 gap-6 mt-6">
                        {/* News Feed */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="glass-card p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center">
                                        <BarChart3 className="w-5 h-5 text-rose-400" />
                                    </div>
                                    <h2 className="text-lg font-semibold text-white">Latest News</h2>
                                </div>
                                <a href="#" className="flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 transition">
                                    View All <ChevronRight className="w-4 h-4" />
                                </a>
                            </div>

                            <div className="space-y-4">
                                {newsItems.map((news, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                        className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition cursor-pointer group"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <span className="inline-block px-2 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-medium mb-2">
                                                    {news.category}
                                                </span>
                                                <h3 className="text-white font-medium group-hover:text-indigo-300 transition">
                                                    {news.title}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                                                    <span>{news.source}</span>
                                                    <span>•</span>
                                                    <span>{news.time}</span>
                                                </div>
                                            </div>
                                            <ExternalLink className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* YouTube Feed */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="glass-card p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-rose-500/20 flex items-center justify-center">
                                        <Youtube className="w-5 h-5 text-red-400" />
                                    </div>
                                    <h2 className="text-lg font-semibold text-white">Expert Videos</h2>
                                </div>
                                <a href="#" className="flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 transition">
                                    View All <ChevronRight className="w-4 h-4" />
                                </a>
                            </div>

                            <div className="space-y-4">
                                {youtubeVideos.map((video, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                        className="flex gap-4 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition cursor-pointer group"
                                    >
                                        <div className="w-28 h-16 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center relative overflow-hidden flex-shrink-0">
                                            <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-pink-600/20" />
                                            <div className="w-8 h-8 rounded-full bg-red-600/80 flex items-center justify-center">
                                                <Play className="w-4 h-4 text-white ml-0.5" />
                                            </div>
                                            <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 rounded text-xs text-white">
                                                {video.duration}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-white font-medium text-sm group-hover:text-indigo-300 transition truncate">
                                                {video.title}
                                            </h3>
                                            <p className="text-xs text-slate-400 mt-1">{video.channel}</p>
                                            <p className="text-xs text-slate-500 mt-0.5">{video.views}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
