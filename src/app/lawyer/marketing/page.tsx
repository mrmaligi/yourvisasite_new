"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Sparkles,
    LayoutDashboard,
    Users,
    FileText,
    Video,
    Plus,
    BarChart2,
    Edit3,
    Trash2,
    Eye,
    ThumbsUp,
    MessageCircle,
    Globe,
    Search,
} from "lucide-react";
import { getNewsArticles, createNewsArticle, deleteNewsArticle } from "@/app/actions/news";
import { useEffect } from "react";


export default function LawyerMarketingPage() {
    const [activeTab, setActiveTab] = useState<"articles" | "videos">("articles");
    const [articles, setArticles] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const data = await getNewsArticles();
                setArticles(data.filter(item => item.type === 'article').map(item => ({
                    id: item.id,
                    title: item.title,
                    views: 0, // Placeholder
                    likes: 0, // Placeholder
                    date: new Date(item.published_at).toLocaleDateString(),
                    status: 'Published'
                })));
            } catch (error) {
                console.error('Failed to fetch articles', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchArticles();
    }, []);

    // Mock video data
    const videos = [
        { id: 1, title: "Client Success Story: Student to PR", views: 2500, likes: 120, date: "15 Jan 2026", platform: "YouTube" },
        { id: 2, title: "Weekly Migration News Round-up", views: 1800, likes: 95, date: "10 Jan 2026", platform: "YouTube" },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a12]">
            <div className="mesh-background" />

            {/* Sidebar Navigation */}
            <aside className="fixed left-0 top-0 bottom-0 w-64 glass border-r border-white/5 z-40 hidden lg:flex flex-col">
                <div className="p-6 flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold text-white">LawyerPortal</span>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <a href="/lawyer/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition">
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </a>
                    <a href="/lawyer/clients" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition">
                        <Users className="w-5 h-5" />
                        My Clients
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-500/10 text-indigo-400 font-medium">
                        <BarChart2 className="w-5 h-5" />
                        Marketing Hub
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-64 p-8 pt-24 lg:pt-8 min-h-screen">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Marketing Hub</h1>
                        <p className="text-slate-400">Manage your content and grow your audience.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="glass-button flex items-center gap-2">
                            <Plus className="w-5 h-5" />
                            Create Article
                        </button>
                        <button className="glass-button-secondary flex items-center gap-2">
                            <Video className="w-5 h-5" />
                            Add Video
                        </button>
                    </div>
                </header>

                {/* Analytics Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-xl bg-indigo-500/10">
                                <Eye className="w-6 h-6 text-indigo-400" />
                            </div>
                            <span className="text-emerald-400 text-sm font-medium">+12%</span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-1">45.2k</h3>
                        <p className="text-slate-400 text-sm">Total Content Views</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-xl bg-purple-500/10">
                                <Users className="w-6 h-6 text-purple-400" />
                            </div>
                            <span className="text-emerald-400 text-sm font-medium">+5%</span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-1">1,240</h3>
                        <p className="text-slate-400 text-sm">Profile Visits</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-xl bg-amber-500/10">
                                <MessageCircle className="w-6 h-6 text-amber-400" />
                            </div>
                            <span className="text-emerald-400 text-sm font-medium">+28%</span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-1">85</h3>
                        <p className="text-slate-400 text-sm">Inquiries Generated</p>
                    </motion.div>
                </div>

                {/* Content Management */}
                <div className="glass-card p-6 min-h-[500px]">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex gap-4 border-b border-white/10">
                            <button
                                onClick={() => setActiveTab("articles")}
                                className={`pb-3 px-2 text-sm font-medium transition ${activeTab === "articles"
                                    ? "text-white border-b-2 border-indigo-500"
                                    : "text-slate-400 hover:text-white"
                                    }`}
                            >
                                Articles ({articles.length})
                            </button>
                            <button
                                onClick={() => setActiveTab("videos")}
                                className={`pb-3 px-2 text-sm font-medium transition ${activeTab === "videos"
                                    ? "text-white border-b-2 border-indigo-500"
                                    : "text-slate-400 hover:text-white"
                                    }`}
                            >
                                Videos ({videos.length})
                            </button>
                        </div>

                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search content..."
                                className="glass-input py-2 pl-9 text-sm"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-slate-400 text-sm border-b border-white/10">
                                    <th className="py-4 px-4 font-medium">Title</th>
                                    <th className="py-4 px-4 font-medium">Date</th>
                                    <th className="py-4 px-4 font-medium">Performance</th>
                                    <th className="py-4 px-4 font-medium">Status</th>
                                    <th className="py-4 px-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {activeTab === "articles" ? (
                                    articles.map((item) => (
                                        <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition group">
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded bg-indigo-500/10">
                                                        <FileText className="w-4 h-4 text-indigo-400" />
                                                    </div>
                                                    <span className="font-medium text-white">{item.title}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-slate-400">{item.date}</td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-4 text-slate-400">
                                                    <div className="flex items-center gap-1">
                                                        <Eye className="w-3 h-3" /> {item.views}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <ThumbsUp className="w-3 h-3" /> {item.likes}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className={`px-2 py-1 rounded-md text-xs font-medium ${item.status === "Published"
                                                    ? "bg-emerald-500/20 text-emerald-400"
                                                    : "bg-slate-500/20 text-slate-400"
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                                                    <button className="p-2 rounded hover:bg-white/10" title="Edit">
                                                        <Edit3 className="w-4 h-4 text-indigo-400" />
                                                    </button>
                                                    <button className="p-2 rounded hover:bg-white/10" title="Delete">
                                                        <Trash2 className="w-4 h-4 text-red-400" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    videos.map((item) => (
                                        <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition group">
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded bg-purple-500/10">
                                                        <Video className="w-4 h-4 text-purple-400" />
                                                    </div>
                                                    <span className="font-medium text-white">{item.title}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-slate-400">{item.date}</td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-4 text-slate-400">
                                                    <div className="flex items-center gap-1">
                                                        <Eye className="w-3 h-3" /> {item.views}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <ThumbsUp className="w-3 h-3" /> {item.likes}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="px-2 py-1 rounded-md text-xs font-medium bg-red-500/20 text-red-400">
                                                    {item.platform}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                                                    <button className="p-2 rounded hover:bg-white/10" title="View">
                                                        <Globe className="w-4 h-4 text-indigo-400" />
                                                    </button>
                                                    <button className="p-2 rounded hover:bg-white/10" title="Delete">
                                                        <Trash2 className="w-4 h-4 text-red-400" />
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
