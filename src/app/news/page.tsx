"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Sparkles,
    PlayCircle,
    BookOpen,
    MessageCircle,
    Share2,
    ThumbsUp,
    Search,
    Filter,
    Shield,
    TrendingUp,
} from "lucide-react";

export default function NewsPage() {
    const [activeTab, setActiveTab] = useState<"all" | "videos" | "articles">("all");

    // Mock Data
    const trendingVideos = [
        {
            id: 1,
            title: "Partner Visa Changes 2026: What You Need to Know",
            lawyer: "Sarah Jenkins",
            views: "12k",
            thumbnail: "https://images.unsplash.com/photo-1541571477-9403ec482c3c?auto=format&fit=crop&q=80&w=600",
            duration: "12:45",
        },
        {
            id: 2,
            title: "Top 5 Mistakes in Skilled Visa Applications",
            lawyer: "David Chen",
            views: "8.5k",
            thumbnail: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&q=80&w=600",
            duration: "08:30",
        },
        {
            id: 3,
            title: "Student Visa Work Rights Updated",
            lawyer: "Emily Wilson",
            views: "15k",
            thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600",
            duration: "05:15",
        },
    ];

    const articles = [
        {
            id: 1,
            title: "New GTI Sector Requirements Announced",
            excerpt: "The Department has released new guidelines for the Global Talent Independent program, specifically affecting the digitech sector...",
            author: "Michael Ross",
            role: "Principal Lawyer",
            date: "2 hours ago",
            likes: 124,
            comments: 45,
            tag: "GTI",
            verified: true,
        },
        {
            id: 2,
            title: "Processing Times Update: 482 Visas",
            excerpt: "We are seeing a significant reduction in processing times for accredited sponsors under the TSS subclass...",
            author: "Jessica Li",
            role: "Migration Agent",
            date: "5 hours ago",
            likes: 89,
            comments: 23,
            tag: "Work Visas",
            verified: true,
        },
        {
            id: 3,
            title: "State Nominations Opening Soon for NSW",
            excerpt: "Prepare your documents now. NSW is expected to open their skilled migration program next week with updated lists...",
            author: "VisaIQ Team",
            role: "Official Update",
            date: "1 day ago",
            likes: 256,
            comments: 89,
            tag: "State Nom",
            verified: true,
        },
    ];

    return (
        <div className="min-h-screen">
            <div className="mesh-background" />

            {/* Navigation (Simplified for this page) */}
            <nav className="nav-glass fixed top-0 left-0 right-0 z-50 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">VisaIQ News</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="/user/dashboard" className="nav-link text-sm font-medium">Dashboard</a>
                        <a href="/user/visas" className="nav-link text-sm font-medium">Visas</a>
                        <a href="/tracker" className="nav-link text-sm font-medium">Tracker</a>
                    </div>
                </div>
            </nav>

            <main className="pt-28 pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div className="mb-12 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold text-white mb-4"
                        >
                            Immigration <span className="gradient-text">Insights</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-400 max-w-2xl mx-auto"
                        >
                            Stay updated with the latest Australian visa news, policy changes, and expert analysis from verified lawyers.
                        </motion.p>
                    </div>

                    {/* Trending Videos Carousel */}
                    <section className="mb-16">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-amber-500" />
                                Trending Analysis
                            </h2>
                            <button className="text-sm text-indigo-400 hover:text-indigo-300">View All Videos</button>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {trendingVideos.map((video, index) => (
                                <motion.div
                                    key={video.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group cursor-pointer"
                                >
                                    <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition">
                                                <PlayCircle className="w-6 h-6 text-white ml-0.5" />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md text-xs text-white">
                                            {video.duration}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white leading-tight mb-2 group-hover:text-indigo-400 transition">
                                        {video.title}
                                    </h3>
                                    <div className="flex items-center justify-between text-sm text-slate-400">
                                        <span>{video.lawyer}</span>
                                        <span>{video.views} views</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* News Feed */}
                    <section>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                            <div className="flex gap-2">
                                {(["all", "videos", "articles"] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition ${activeTab === tab
                                                ? "bg-indigo-500 text-white"
                                                : "glass text-slate-400 hover:bg-white/10"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search topics..."
                                    className="glass-input pl-10 py-2 w-full md:w-64"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {articles.map((article, index) => (
                                <motion.div
                                    key={article.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + (index * 0.1) }}
                                    className="glass-card p-6 flex flex-col md:flex-row gap-6 hover:border-indigo-500/30 transition group"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-2 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-medium">
                                                {article.tag}
                                            </span>
                                            <span className="text-xs text-slate-500">• {article.date}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition">
                                            {article.title}
                                        </h3>
                                        <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                                            {article.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-xs text-white font-bold">
                                                    {article.author[0]}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-sm font-medium text-white">{article.author}</span>
                                                        {article.verified && <Shield className="w-3 h-3 text-emerald-400" />}
                                                    </div>
                                                    <span className="text-xs text-slate-500">{article.role}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 text-slate-400">
                                                <button className="flex items-center gap-1.5 text-xs hover:text-white transition">
                                                    <ThumbsUp className="w-4 h-4" />
                                                    {article.likes}
                                                </button>
                                                <button className="flex items-center gap-1.5 text-xs hover:text-white transition">
                                                    <MessageCircle className="w-4 h-4" />
                                                    {article.comments}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
