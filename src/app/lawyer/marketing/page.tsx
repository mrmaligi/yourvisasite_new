"use client";
import Link from "next/link";

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
import { useEffect } from "react";
import { getNewsArticles } from "@/app/actions/news";


export default function LawyerMarketingPage() {
    const [activeTab, setActiveTab] = useState<"articles" | "videos">("articles");
    const [articles, setArticles] = useState<unknown[]>([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const data = await getNewsArticles();
                if (data) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    setArticles(data.filter((item: any) => item.type === 'article').map((item: any) => ({
                        id: item.id,
                        title: item.title,
                        views: 0, // Placeholder
                        likes: 0, // Placeholder
                        date: new Date(item.published_at).toLocaleDateString(),
                        status: 'Published'
                    })));
                }
            } catch (error) {
                console.error('Failed to fetch articles', error);
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
        <div className="min-h-screen bg-slate-50">

            {/* Sidebar Navigation */}
            <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-slate-200 z-40 hidden lg:flex flex-col shadow-sm">
                <div className="p-6 flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold text-slate-900 font-serif">LawyerPortal</span>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <Link href="/lawyer/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition">
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </Link>
                    <Link href="/lawyer/clients" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition">
                        <Users className="w-5 h-5" />
                        My Clients
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 text-emerald-700 font-medium">
                        <BarChart2 className="w-5 h-5" />
                        Marketing Hub
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-64 p-8 pt-24 lg:pt-8 min-h-screen">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2 font-serif">Marketing Hub</h1>
                        <p className="text-slate-500">Manage your content and grow your audience.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="btn-primary flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 shadow-sm">
                            <Plus className="w-5 h-5" />
                            Create Article
                        </button>
                        <button className="btn-secondary flex items-center gap-2 bg-white">
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
                        className="card p-6 bg-white border-slate-200"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-xl bg-indigo-50">
                                <Eye className="w-6 h-6 text-indigo-600" />
                            </div>
                            <span className="text-emerald-600 text-sm font-bold">+12%</span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-1">45.2k</h3>
                        <p className="text-slate-500 text-sm font-medium">Total Content Views</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="card p-6 bg-white border-slate-200"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-xl bg-purple-50">
                                <Users className="w-6 h-6 text-purple-600" />
                            </div>
                            <span className="text-emerald-600 text-sm font-bold">+5%</span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-1">1,240</h3>
                        <p className="text-slate-500 text-sm font-medium">Profile Visits</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="card p-6 bg-white border-slate-200"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-xl bg-amber-50">
                                <MessageCircle className="w-6 h-6 text-amber-600" />
                            </div>
                            <span className="text-emerald-600 text-sm font-bold">+28%</span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-1">85</h3>
                        <p className="text-slate-500 text-sm font-medium">Inquiries Generated</p>
                    </motion.div>
                </div>

                {/* Content Management */}
                <div className="card p-6 min-h-[500px] bg-white border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex gap-4 border-b border-slate-100">
                            <button
                                onClick={() => setActiveTab("articles")}
                                className={`pb-3 px-2 text-sm font-medium transition ${activeTab === "articles"
                                    ? "text-emerald-700 border-b-2 border-emerald-600 font-bold"
                                    : "text-slate-500 hover:text-slate-800"
                                    }`}
                            >
                                Articles ({articles.length})
                            </button>
                            <button
                                onClick={() => setActiveTab("videos")}
                                className={`pb-3 px-2 text-sm font-medium transition ${activeTab === "videos"
                                    ? "text-emerald-700 border-b-2 border-emerald-600 font-bold"
                                    : "text-slate-500 hover:text-slate-800"
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
                                className="input-field py-2 pl-9 text-sm"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-slate-500 text-sm border-b border-slate-100 font-semibold">
                                    <th className="py-4 px-4">Title</th>
                                    <th className="py-4 px-4">Date</th>
                                    <th className="py-4 px-4">Performance</th>
                                    <th className="py-4 px-4">Status</th>
                                    <th className="py-4 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {activeTab === "articles" ? (
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    articles.map((item: any) => (
                                        <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50 transition group">
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded bg-indigo-50">
                                                        <FileText className="w-4 h-4 text-indigo-600" />
                                                    </div>
                                                    <span className="font-bold text-slate-900">{item.title}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-slate-500 font-medium">{item.date}</td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-4 text-slate-500">
                                                    <div className="flex items-center gap-1">
                                                        <Eye className="w-3 h-3" /> {item.views}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <ThumbsUp className="w-3 h-3" /> {item.likes}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className={`px-2 py-1 rounded-md text-xs font-bold ${item.status === "Published"
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : "bg-slate-100 text-slate-500"
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                                                    <button className="p-2 rounded hover:bg-slate-100 text-slate-500 hover:text-indigo-600" title="Edit">
                                                        <Edit3 className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 rounded hover:bg-red-50 text-slate-500 hover:text-red-500" title="Delete">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    videos.map((item) => (
                                        <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50 transition group">
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded bg-purple-50">
                                                        <Video className="w-4 h-4 text-purple-600" />
                                                    </div>
                                                    <span className="font-bold text-slate-900">{item.title}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-slate-500 font-medium">{item.date}</td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-4 text-slate-500">
                                                    <div className="flex items-center gap-1">
                                                        <Eye className="w-3 h-3" /> {item.views}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <ThumbsUp className="w-3 h-3" /> {item.likes}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="px-2 py-1 rounded-md text-xs font-bold bg-red-100 text-red-600">
                                                    {item.platform}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                                                    <button className="p-2 rounded hover:bg-slate-100 text-slate-500 hover:text-indigo-600" title="View">
                                                        <Globe className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 rounded hover:bg-red-50 text-slate-500 hover:text-red-500" title="Delete">
                                                        <Trash2 className="w-4 h-4" />
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
