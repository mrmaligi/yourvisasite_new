"use client";

import { motion } from "framer-motion";
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
    Globe,
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
        source: "YourVisaSite Analysis",
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

        <div className="min-h-screen bg-slate-50">

            {/* Navigation */}
            <nav className="nav-sticky px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-900 flex items-center justify-center text-white">
                            <Globe className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-serif font-bold text-slate-900">YourVisaSite</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/user/dashboard" className="nav-link text-sm font-medium text-indigo-700">
                            Dashboard
                        </Link>
                        <Link href="/user/visas" className="nav-link text-sm font-medium">
                            Visas
                        </Link>
                        <Link href="/tracker" className="nav-link text-sm font-medium">
                            Tracker
                        </Link>
                        <Link href="/lawyers" className="nav-link text-sm font-medium">
                            Lawyers
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 rounded-lg hover:bg-slate-100 transition">
                            <Bell className="w-5 h-5 text-slate-600" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                        </button>
                        <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center border border-indigo-200">
                            <User className="w-5 h-5 text-indigo-700" />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="py-10 px-6">
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
                                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 font-serif">
                                    Welcome back, <span className="text-indigo-700">{stats.userName}</span>
                                </h1>

                                <p className="text-slate-600">
                                    Your visa journey at a glance
                                </p>
                            </div>
                            <div className="hidden md:flex items-center gap-3">
                                <button className="btn-secondary text-sm">
                                    <Search className="w-4 h-4" />
                                    Search Visas
                                </button>
                                <button className="btn-primary text-sm">
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
                            <div className="card p-6 bg-white">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                                            <TrendingUp className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold text-slate-900 font-serif">Live Visa Tracker</h2>
                                            <p className="text-sm text-slate-500">Real-time processing times</p>
                                        </div>
                                    </div>
                                    <Link href="/tracker" className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 transition font-medium">
                                        View All <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {trackerData.map((visa, index) => (
                                        <motion.div
                                            key={visa.subclass}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + index * 0.1 }}
                                            className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50 transition cursor-pointer group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-indigo-100 transition">
                                                    <span className="text-lg font-bold text-slate-700 group-hover:text-indigo-700">{visa.subclass}</span>
                                                </div>
                                                <div>
                                                    <h3 className="text-slate-900 font-medium group-hover:text-indigo-700 transition">
                                                        Subclass {visa.subclass}
                                                    </h3>
                                                    <p className="text-sm text-slate-500">{visa.name}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-2 justify-end">
                                                    <Clock className="w-4 h-4 text-slate-400" />
                                                    <span className="text-slate-700 font-semibold">{visa.avgDays} days</span>
                                                </div>
                                                <span className={`text-sm font-medium ${visa.trend === "up" ? "text-emerald-600" :
                                                    visa.trend === "down" ? "text-red-500" : "text-slate-400"
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
                            <div className="card p-6 bg-indigo-900 text-white border-none shadow-lg">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm">
                                            <Phone className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white font-serif">Quick Consult</h3>
                                            <p className="text-sm text-indigo-200">Talk to an expert</p>
                                        </div>
                                    </div>
                                    <p className="text-indigo-100 mb-6 text-sm leading-relaxed">
                                        Get instant advice from verified immigration lawyers starting from $200/hr.
                                    </p>
                                    <button className="w-full bg-white text-indigo-900 font-bold py-3 rounded-lg hover:bg-indigo-50 transition shadow-sm">
                                        Book Now
                                    </button>
                                </div>
                            </div>

                            {/* My Documents Widget */}
                            <div className="card p-6 bg-white">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 font-serif">My Documents</h3>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-400" />
                                </div>
                                <div className="flex items-center justify-between text-sm mb-4">
                                    <span className="text-slate-500">Documents uploaded</span>
                                    <span className="text-slate-900 font-bold">{stats.documentsCount} files</span>
                                </div>

                                <div className="flex gap-2">
                                    <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                                        <div className="w-3/4 h-full rounded-full bg-emerald-500" />
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 mt-2">75% complete for Subclass 482</p>
                            </div>

                            {/* Calendar Widget */}
                            <div className="card p-6 bg-white">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 font-serif">Upcoming</h3>
                                </div>
                                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-slate-900 text-sm font-semibold">Medical Exam</span>
                                        <span className="text-xs text-amber-600 font-medium">In 3 days</span>
                                    </div>
                                    <p className="text-xs text-slate-500">Panel Clinic Melbourne</p>
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
                            className="card p-6 bg-white"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center">
                                        <BarChart3 className="w-5 h-5 text-rose-600" />
                                    </div>
                                    <h2 className="text-lg font-bold text-slate-900 font-serif">Latest News</h2>
                                </div>
                                <Link href="#" className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 transition font-medium">
                                    View All <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {newsItems.map((news, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                        className="p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition cursor-pointer group"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <span className="inline-block px-2 py-1 rounded-md bg-indigo-50 text-indigo-600 text-xs font-semibold mb-2">
                                                    {news.category}
                                                </span>
                                                <h3 className="text-slate-900 font-semibold group-hover:text-indigo-700 transition">
                                                    {news.title}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
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
                            className="card p-6 bg-white"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                                        <Youtube className="w-5 h-5 text-red-600" />
                                    </div>
                                    <h2 className="text-lg font-bold text-slate-900 font-serif">Expert Videos</h2>
                                </div>
                                <Link href="#" className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 transition font-medium">
                                    View All <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {youtubeVideos.map((video, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                        className="flex gap-4 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition cursor-pointer group"
                                    >
                                        <div className="w-28 h-16 rounded-lg bg-slate-200 flex items-center justify-center relative overflow-hidden flex-shrink-0">
                                            <div className="absolute inset-0 bg-slate-300" />
                                            <div className="relative z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                                                <Play className="w-4 h-4 text-red-600 ml-0.5" />
                                            </div>
                                            <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 rounded text-[10px] text-white">
                                                {video.duration}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-slate-900 font-semibold text-sm group-hover:text-indigo-700 transition truncate">
                                                {video.title}
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-1 font-medium">{video.channel}</p>
                                            <p className="text-xs text-slate-400 mt-0.5">{video.views}</p>
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
