"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Sparkles,
    ChevronRight,
    Briefcase,
    GraduationCap,
    Heart,
    Globe,
    Users,
    Shield,
    Clock,
    Star,
    ArrowRight,
    Bell,
    User,
    Filter,
    X,
} from "lucide-react";
import { getVisas } from "@/app/actions/visas";


// Visa categories data
const categories = [
    { id: "work", name: "Work & Skilled", icon: Briefcase, count: 42, color: "from-blue-500 to-cyan-500" },
    { id: "student", name: "Student", icon: GraduationCap, count: 8, color: "from-purple-500 to-pink-500" },
    { id: "family", name: "Family & Partner", icon: Heart, count: 15, color: "from-rose-500 to-red-500" },
    { id: "visitor", name: "Visitor & Tourist", icon: Globe, count: 12, color: "from-teal-500 to-emerald-500" },
    { id: "humanitarian", name: "Humanitarian", icon: Users, count: 18, color: "from-amber-500 to-orange-500" },
    { id: "other", name: "Other Visas", icon: Shield, count: 25, color: "from-indigo-500 to-violet-500" },
];

// Initial static categories (kept as config)


export default function VisaSearch() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [visas, setVisas] = useState<any[]>([]);

    useState(() => {
        getVisas().then(data => {
            if (data) {
                setVisas(data.map(v => ({
                    ...v,
                    name: v.title, // Map title to name
                    popular: ['482', '189', '190'].includes(v.subclass),
                    processingTime: 30 // Placeholder
                })));
            }
        });
    });

    // Filter visas based on search and category
    const filteredVisas = visas.filter((visa) => {

        const matchesSearch =
            searchQuery === "" ||
            visa.subclass.includes(searchQuery) ||
            visa.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || visa.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Get search suggestions
    const suggestions = searchQuery.length > 0
        ? visas

            .filter(
                (visa) =>
                    visa.subclass.includes(searchQuery) ||
                    visa.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .slice(0, 5)
        : [];

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
                        <a href="/user/dashboard" className="nav-link text-sm font-medium">
                            Dashboard
                        </a>
                        <a href="/user/visas" className="nav-link text-sm font-medium text-white">
                            Visas
                        </a>
                        <a href="/tracker" className="nav-link text-sm font-medium">
                            Tracker
                        </a>
                        <a href="#" className="nav-link text-sm font-medium">
                            Lawyers
                        </a>
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
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Find Your <span className="gradient-text">Perfect Visa</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Search over 200+ Australian visa categories with intelligent subclass prediction
                        </p>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="max-w-3xl mx-auto mb-12"
                    >
                        <div className="relative">
                            <div className="glass-card p-2 flex items-center gap-3">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by visa name or subclass number (e.g., 482, skilled, student)"
                                        className="w-full bg-transparent border-none outline-none pl-12 pr-4 py-4 text-white placeholder:text-slate-500"
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            setShowSuggestions(true);
                                        }}
                                        onFocus={() => setShowSuggestions(true)}
                                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                    />
                                </div>
                                <button className="glass-button flex items-center gap-2 py-3 px-6">
                                    <Search className="w-4 h-4" />
                                    Search
                                </button>
                            </div>

                            {/* Search Suggestions Dropdown */}
                            <AnimatePresence>
                                {showSuggestions && suggestions.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute top-full left-0 right-0 mt-2 glass-card p-2 z-50"
                                    >
                                        {suggestions.map((visa) => (
                                            <div
                                                key={visa.subclass}
                                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 cursor-pointer transition"
                                                onClick={() => {
                                                    setSearchQuery(visa.name);
                                                    setShowSuggestions(false);
                                                }}
                                            >
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600/30 to-purple-600/30 flex items-center justify-center">
                                                    <span className="text-sm font-bold text-white">{visa.subclass}</span>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-white font-medium">Subclass {visa.subclass}</h4>
                                                    <p className="text-sm text-slate-400">{visa.name}</p>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-slate-400" />
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Category Pills */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap items-center justify-center gap-3 mb-12"
                    >
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition ${!selectedCategory
                                ? "bg-indigo-500 text-white"
                                : "glass text-slate-300 hover:bg-white/10"
                                }`}
                        >
                            All Visas
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition ${selectedCategory === category.id
                                    ? "bg-indigo-500 text-white"
                                    : "glass text-slate-300 hover:bg-white/10"
                                    }`}
                            >
                                <category.icon className="w-4 h-4" />
                                {category.name}
                            </button>
                        ))}
                    </motion.div>

                    {/* Category Cards (when no filter) */}
                    {!selectedCategory && !searchQuery && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                        >
                            {categories.map((category, index) => (
                                <motion.div
                                    key={category.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className="glass-card p-6 cursor-pointer group"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div
                                            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            <category.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                                            <p className="text-sm text-slate-400">{category.count} visas</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-indigo-400 text-sm font-medium">
                                        View All <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* Popular Visas / Search Results */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">
                                {searchQuery ? "Search Results" : selectedCategory ? "Filtered Visas" : "Popular Visas"}
                            </h2>
                            {(searchQuery || selectedCategory) && (
                                <button
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSelectedCategory(null);
                                    }}
                                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
                                >
                                    <X className="w-4 h-4" />
                                    Clear Filters
                                </button>
                            )}
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredVisas
                                .filter((v) => searchQuery || selectedCategory || v.popular)
                                .map((visa, index) => (
                                    <motion.a
                                        key={visa.subclass}
                                        href={`/user/visas/${visa.subclass}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                        className="glass-card p-5 group"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600/30 to-purple-600/30 flex items-center justify-center">
                                                <span className="text-lg font-bold text-white">{visa.subclass}</span>
                                            </div>
                                            {visa.popular && (
                                                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/20 text-amber-400 text-xs font-medium">
                                                    <Star className="w-3 h-3" />
                                                    Popular
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="text-white font-semibold mb-2 group-hover:text-indigo-300 transition">
                                            Subclass {visa.subclass}
                                        </h3>
                                        <p className="text-sm text-slate-400 mb-4">{visa.name}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                                <Clock className="w-4 h-4" />
                                                ~{visa.processingTime} days
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </motion.a>
                                ))}
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
