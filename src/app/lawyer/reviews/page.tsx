"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    Bell,
    User,
    Star,
    MessageSquare,
    ThumbsUp,
    Flag,
    Filter,
    Search,
    TrendingUp,
    Send,
    X,
    ChevronDown,
} from "lucide-react";

// Mock reviews data
const reviewsData = [
    {
        id: 1,
        clientName: "John D.",
        clientAvatar: "JD",
        rating: 5,
        date: "Jan 18, 2026",
        visaType: "482",
        comment: "Emily was incredibly helpful with my 482 visa application. She explained everything clearly and responded to all my questions promptly. Highly recommend!",
        reply: null,
        featured: true,
    },
    {
        id: 2,
        clientName: "Sarah M.",
        clientAvatar: "SM",
        rating: 5,
        date: "Jan 15, 2026",
        visaType: "186",
        comment: "Professional and knowledgeable. Made the complex 186 process feel manageable. Worth every dollar.",
        reply: "Thank you Sarah! It was a pleasure helping you with your permanent residency journey.",
        featured: false,
    },
    {
        id: 3,
        clientName: "Michael C.",
        clientAvatar: "MC",
        rating: 4,
        date: "Jan 10, 2026",
        visaType: "189",
        comment: "Very professional and knowledgeable. Good advice overall, though wish the initial consultation was a bit longer.",
        reply: null,
        featured: false,
    },
    {
        id: 4,
        clientName: "Priya R.",
        clientAvatar: "PR",
        rating: 5,
        date: "Jan 5, 2026",
        visaType: "482",
        comment: "Exceptional service! Emily went above and beyond to ensure my application was perfect. The attention to detail is outstanding.",
        reply: "Thank you Priya! I'm so glad everything worked out for you.",
        featured: true,
    },
    {
        id: 5,
        clientName: "Alex K.",
        clientAvatar: "AK",
        rating: 3,
        date: "Dec 28, 2025",
        visaType: "190",
        comment: "Good knowledge but communication could be improved. Took a while to get responses sometimes.",
        reply: null,
        featured: false,
    },
];

type FilterType = "all" | "5" | "4" | "3" | "2" | "1";

export default function LawyerReviews() {
    const [filter, setFilter] = useState<FilterType>("all");
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [replyText, setReplyText] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredReviews = reviewsData.filter((review) => {
        if (filter !== "all" && review.rating !== parseInt(filter)) return false;
        if (searchQuery && !review.comment.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const averageRating = (reviewsData.reduce((acc, r) => acc + r.rating, 0) / reviewsData.length).toFixed(1);
    const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
        rating,
        count: reviewsData.filter((r) => r.rating === rating).length,
        percentage: (reviewsData.filter((r) => r.rating === rating).length / reviewsData.length) * 100,
    }));

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
                        <span className="px-2 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs font-medium">LAWYER</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="/lawyer/dashboard" className="nav-link text-sm font-medium">Dashboard</a>
                        <a href="/lawyer/clients" className="nav-link text-sm font-medium">Clients</a>
                        <a href="/lawyer/reviews" className="nav-link text-sm font-medium text-white">Reviews</a>
                        <a href="/lawyer/settings" className="nav-link text-sm font-medium">Settings</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 rounded-xl glass hover:bg-white/10 transition">
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
                        <h1 className="text-3xl font-bold text-white mb-2">Reviews</h1>
                        <p className="text-slate-400">Manage and respond to client reviews</p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid md:grid-cols-3 gap-4 mb-8"
                    >
                        <div className="glass-card p-6">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-slate-400">Average Rating</p>
                                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                                </div>
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-4xl font-bold text-white">{averageRating}</span>
                                <span className="text-slate-500 mb-1">/ 5.0</span>
                            </div>
                            <div className="flex items-center gap-1 mt-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-4 h-4 ${star <= Math.round(parseFloat(averageRating))
                                                ? "text-amber-400 fill-amber-400"
                                                : "text-slate-600"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="glass-card p-6">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-slate-400">Total Reviews</p>
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                                    <MessageSquare className="w-5 h-5 text-indigo-400" />
                                </div>
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-4xl font-bold text-white">{reviewsData.length}</span>
                            </div>
                            <div className="flex items-center gap-1 mt-2 text-sm text-emerald-400">
                                <TrendingUp className="w-4 h-4" />
                                +3 this month
                            </div>
                        </div>

                        <div className="glass-card p-6">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-slate-400">Response Rate</p>
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                    <ThumbsUp className="w-5 h-5 text-emerald-400" />
                                </div>
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-4xl font-bold text-white">
                                    {Math.round((reviewsData.filter((r) => r.reply).length / reviewsData.length) * 100)}%
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 mt-2">
                                {reviewsData.filter((r) => r.reply).length} of {reviewsData.length} replied
                            </p>
                        </div>
                    </motion.div>

                    {/* Rating Distribution */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-6 mb-8"
                    >
                        <h2 className="text-lg font-semibold text-white mb-4">Rating Distribution</h2>
                        <div className="space-y-3">
                            {ratingDistribution.map((item) => (
                                <div key={item.rating} className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 w-16">
                                        <span className="text-white font-medium">{item.rating}</span>
                                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                    </div>
                                    <div className="flex-1 h-3 rounded-full bg-white/10 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.percentage}%` }}
                                            transition={{ delay: 0.3, duration: 0.5 }}
                                            className={`h-full ${item.rating >= 4 ? "bg-emerald-500" : item.rating === 3 ? "bg-amber-500" : "bg-red-500"
                                                }`}
                                        />
                                    </div>
                                    <span className="text-slate-400 text-sm w-8">{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Filters and Search */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap items-center gap-4 mb-6"
                    >
                        <div className="flex-1 relative min-w-[200px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search reviews..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 glass rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                            />
                        </div>
                        <div className="flex gap-2">
                            {(["all", "5", "4", "3", "2", "1"] as FilterType[]).map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition ${filter === f
                                            ? "bg-indigo-500/20 text-white border border-indigo-500/30"
                                            : "glass text-slate-400 hover:text-white"
                                        }`}
                                >
                                    {f === "all" ? "All" : (
                                        <span className="flex items-center gap-1">
                                            {f} <Star className="w-3 h-3 fill-current" />
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Reviews List */}
                    <div className="space-y-4">
                        {filteredReviews.map((review, index) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + index * 0.05 }}
                                className="glass-card p-6"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center">
                                            <span className="text-lg font-bold text-white">{review.clientAvatar}</span>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="text-white font-medium">{review.clientName}</p>
                                                {review.featured && (
                                                    <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-400 text-xs">Featured</span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="flex">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star
                                                            key={star}
                                                            className={`w-4 h-4 ${star <= review.rating
                                                                    ? "text-amber-400 fill-amber-400"
                                                                    : "text-slate-600"
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-slate-500 text-sm">• {review.date}</span>
                                                <span className="px-2 py-0.5 rounded-lg bg-white/10 text-slate-400 text-xs">{review.visaType}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            className={`p-2 rounded-lg transition ${review.featured
                                                    ? "bg-amber-500/20 text-amber-400"
                                                    : "hover:bg-white/10 text-slate-400"
                                                }`}
                                            title={review.featured ? "Remove from featured" : "Feature this review"}
                                        >
                                            <Star className={`w-4 h-4 ${review.featured ? "fill-current" : ""}`} />
                                        </button>
                                        <button className="p-2 rounded-lg hover:bg-white/10 text-slate-400 transition" title="Report">
                                            <Flag className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <p className="text-slate-300 mb-4">{review.comment}</p>

                                {/* Existing Reply */}
                                {review.reply && (
                                    <div className="ml-6 p-4 rounded-xl bg-indigo-500/10 border-l-2 border-indigo-500">
                                        <p className="text-sm text-slate-400 mb-1">Your reply:</p>
                                        <p className="text-slate-300">{review.reply}</p>
                                    </div>
                                )}

                                {/* Reply Form */}
                                {!review.reply && (
                                    <AnimatePresence>
                                        {replyingTo === review.id ? (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="mt-4 overflow-hidden"
                                            >
                                                <div className="flex gap-3">
                                                    <input
                                                        type="text"
                                                        placeholder="Write a reply..."
                                                        value={replyText}
                                                        onChange={(e) => setReplyText(e.target.value)}
                                                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                                                    />
                                                    <button
                                                        onClick={() => {
                                                            setReplyingTo(null);
                                                            setReplyText("");
                                                        }}
                                                        className="p-3 rounded-xl hover:bg-white/10 text-slate-400 transition"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                    <button className="px-4 py-3 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition flex items-center gap-2">
                                                        <Send className="w-4 h-4" />
                                                        Reply
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <button
                                                onClick={() => setReplyingTo(review.id)}
                                                className="mt-4 text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-2 transition"
                                            >
                                                <MessageSquare className="w-4 h-4" />
                                                Reply to this review
                                            </button>
                                        )}
                                    </AnimatePresence>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredReviews.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-16"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                                <MessageSquare className="w-8 h-8 text-slate-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">No reviews found</h3>
                            <p className="text-slate-400">Try adjusting your filters or search query</p>
                        </motion.div>
                    )}
                </div>
            </main>
        </div>
    );
}
