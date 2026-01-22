"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
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
    X,
} from "lucide-react";
import { getVisas } from "@/app/actions/visas";


// Visa categories data
const categories = [
    { id: "work", name: "Work & Skilled", icon: Briefcase, count: 42, color: "bg-blue-50 text-blue-600" },
    { id: "student", name: "Student", icon: GraduationCap, count: 8, color: "bg-purple-50 text-purple-600" },
    { id: "family", name: "Family & Partner", icon: Heart, count: 15, color: "bg-rose-50 text-rose-600" },
    { id: "visitor", name: "Visitor & Tourist", icon: Globe, count: 12, color: "bg-teal-50 text-teal-600" },
    { id: "humanitarian", name: "Humanitarian", icon: Users, count: 18, color: "bg-amber-50 text-amber-600" },
    { id: "other", name: "Other Visas", icon: Shield, count: 25, color: "bg-indigo-50 text-indigo-600" },
];

interface Visa {
    subclass: string;
    title: string;
    category: string;
    name: string;
    popular: boolean;
    processingTime: number;
}

export default function VisaSearch() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [visas, setVisas] = useState<Visa[]>([]);

    useEffect(() => {
        getVisas().then(data => {
            if (data) {
                setVisas(data.map((v: { subclass: string; title: string; category: string }) => ({
                    ...v,
                    name: v.title, // Map title to name
                    popular: ['482', '189', '190'].includes(v.subclass),
                    processingTime: 30 // Placeholder
                })));
            }
        });
    }, []);

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
        <div className="min-h-screen bg-slate-50">

            {/* Navigation */}
            <nav className="nav-sticky px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-900 flex items-center justify-center text-white">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 font-serif">YourVisaSite</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/user/dashboard" className="nav-link text-sm font-medium">
                            Dashboard
                        </Link>
                        <Link href="/user/visas" className="nav-link text-sm font-medium text-indigo-700">
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
            <main className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-serif">
                            Find Your <span className="text-indigo-700">Perfect Visa</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
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
                            <div className="card p-2 flex items-center gap-3 bg-white border-slate-200 shadow-md">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by visa name or subclass number (e.g., 482, skilled, student)"
                                        className="w-full bg-transparent border-none outline-none pl-12 pr-4 py-3 text-slate-900 placeholder:text-slate-400"
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            setShowSuggestions(true);
                                        }}
                                        onFocus={() => setShowSuggestions(true)}
                                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                    />
                                </div>
                                <button className="btn-primary flex items-center gap-2 py-3 px-6 shadow-sm">
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
                                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50"
                                    >
                                        {suggestions.map((visa) => (
                                            <div
                                                key={visa.subclass}
                                                className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition"
                                                onClick={() => {
                                                    setSearchQuery(visa.name);
                                                    setShowSuggestions(false);
                                                }}
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                                                    <span className="text-sm font-bold text-indigo-700">{visa.subclass}</span>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-slate-900 font-bold text-sm">Subclass {visa.subclass}</h4>
                                                    <p className="text-sm text-slate-500 font-medium">{visa.name}</p>
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
                            className={`px-5 py-2.5 rounded-full text-sm font-bold transition shadow-sm ${!selectedCategory
                                ? "bg-indigo-900 text-white"
                                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                                }`}
                        >
                            All Visas
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition shadow-sm ${selectedCategory === category.id
                                    ? "bg-indigo-900 text-white"
                                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
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
                                    className="card p-6 cursor-pointer group bg-white hover:border-indigo-200 hover:shadow-md transition"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div
                                            className={`w-14 h-14 rounded-xl ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}
                                        >
                                            <category.icon className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 font-serif">{category.name}</h3>
                                            <p className="text-sm text-slate-500 font-medium">{category.count} visas</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-indigo-600 text-sm font-bold group-hover:text-indigo-800 transition">
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
                            <h2 className="text-2xl font-bold text-slate-900 font-serif">
                                {searchQuery ? "Search Results" : selectedCategory ? "Filtered Visas" : "Popular Visas"}
                            </h2>
                            {(searchQuery || selectedCategory) && (
                                <button
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSelectedCategory(null);
                                    }}
                                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition font-medium"
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
                                    <Link
                                        key={visa.subclass}
                                        href={`/user/visas/${visa.subclass}`}
                                        passHref
                                        legacyBehavior
                                    >
                                        <motion.a
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 * index }}
                                            className="card p-5 group block bg-white hover:border-indigo-200 hover:shadow-md transition cursor-pointer"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center">
                                                    <span className="text-lg font-bold text-indigo-700">{visa.subclass}</span>
                                                </div>
                                                {visa.popular && (
                                                    <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-amber-50 text-amber-600 text-xs font-bold border border-amber-100">
                                                        <Star className="w-3 h-3" />
                                                        Popular
                                                    </div>
                                                )}
                                            </div>
                                            <h3 className="text-slate-900 font-bold mb-2 group-hover:text-indigo-700 transition font-serif">
                                                Subclass {visa.subclass}
                                            </h3>
                                            <p className="text-sm text-slate-500 font-medium mb-4">{visa.name}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                                                    <Clock className="w-4 h-4" />
                                                    ~{visa.processingTime} days
                                                </div>
                                                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </motion.a>
                                    </Link>
                                ))}
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
