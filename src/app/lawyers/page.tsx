"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Sparkles,
    Search,
    Star,
    Shield,
    Clock,
    Phone,
    MessageSquare,
    ChevronRight,
    Filter,
    MapPin,
    Award,
    Users,
    DollarSign,
} from "lucide-react";

// Mock lawyers data
const lawyersData = [
    {
        id: "emily-richardson",
        name: "Emily Richardson",
        title: "Principal Migration Agent",
        firm: "Richardson Migration Law",
        location: "Sydney, NSW",
        rating: 4.9,
        reviews: 127,
        specialties: ["482", "186", "189", "190"],
        hourlyRate: 250,
        verified: true,
        yearsExperience: 12,
        successRate: 98,
        avatar: "ER",
    },
    {
        id: "james-chen",
        name: "James Chen",
        title: "Senior Immigration Lawyer",
        firm: "Chen & Associates",
        location: "Melbourne, VIC",
        rating: 4.8,
        reviews: 94,
        specialties: ["820", "801", "309", "100"],
        hourlyRate: 200,
        verified: true,
        yearsExperience: 8,
        successRate: 96,
        avatar: "JC",
    },
    {
        id: "sarah-mitchell",
        name: "Sarah Mitchell",
        title: "Migration Agent",
        firm: "Global Visa Solutions",
        location: "Brisbane, QLD",
        rating: 4.7,
        reviews: 68,
        specialties: ["500", "485", "482"],
        hourlyRate: 180,
        verified: true,
        yearsExperience: 6,
        successRate: 94,
        avatar: "SM",
    },
    {
        id: "michael-torres",
        name: "Michael Torres",
        title: "Immigration Specialist",
        firm: "Torres Legal",
        location: "Perth, WA",
        rating: 4.9,
        reviews: 156,
        specialties: ["189", "190", "491", "494"],
        hourlyRate: 220,
        verified: true,
        yearsExperience: 15,
        successRate: 99,
        avatar: "MT",
    },
    {
        id: "anna-kowalski",
        name: "Anna Kowalski",
        title: "Partner Visa Specialist",
        firm: "Heart Migration",
        location: "Adelaide, SA",
        rating: 4.6,
        reviews: 42,
        specialties: ["820", "801", "300"],
        hourlyRate: 175,
        verified: true,
        yearsExperience: 5,
        successRate: 92,
        avatar: "AK",
    },
];

const specialtyOptions = ["All Visas", "Skilled Work", "Partner/Family", "Student", "Business"];

export default function LawyersDirectory() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSpecialty, setSelectedSpecialty] = useState("All Visas");

    const filteredLawyers = lawyersData.filter((lawyer) => {
        const matchesSearch =
            searchQuery === "" ||
            lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lawyer.firm.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lawyer.specialties.some((s) => s.includes(searchQuery));
        return matchesSearch;
    });

    return (
        <div className="min-h-screen">
            {/* Mesh Background */}
            <div className="mesh-background" />

            {/* Navigation */}
            <nav className="nav-glass fixed top-0 left-0 right-0 z-50 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">VisaIQ</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/user/dashboard" className="nav-link text-sm font-medium">
                            Dashboard
                        </Link>
                        <Link href="/user/visas" className="nav-link text-sm font-medium">
                            Visas
                        </Link>
                        <Link href="/tracker" className="nav-link text-sm font-medium">
                            Tracker
                        </Link>
                        <Link href="/lawyers" className="nav-link text-sm font-medium text-white">
                            Lawyers
                        </Link>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href="/login" className="glass-button-secondary text-sm py-2.5 px-5">
                            Sign In
                        </Link>
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
                            Find an <span className="gradient-text">Immigration Lawyer</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-6">
                            Connect with verified immigration lawyers for expert guidance on your visa journey
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
                                <Shield className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm text-slate-300">All lawyers verified</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
                                <Users className="w-4 h-4 text-indigo-400" />
                                <span className="text-sm text-slate-400">{lawyersData.length}+ experts available</span>
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
                                    placeholder="Search by name, firm, or visa subclass..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none transition"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Specialty Filter */}
                            <div className="flex gap-2">
                                {specialtyOptions.map((specialty) => (
                                    <button
                                        key={specialty}
                                        onClick={() => setSelectedSpecialty(specialty)}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition whitespace-nowrap ${selectedSpecialty === specialty
                                            ? "bg-indigo-500 text-white"
                                            : "bg-white/5 text-slate-400 hover:bg-white/10"
                                            }`}
                                    >
                                        {specialty}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Lawyers Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {filteredLawyers.map((lawyer, index) => (
                            <motion.div
                                key={lawyer.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                                onClick={() => router.push(`/lawyers/${lawyer.id}`)}
                                className="glass-card p-6 hover:bg-white/5 transition cursor-pointer group"
                            >
                                <div className="flex gap-4">
                                    {/* Avatar */}
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xl font-bold text-white">{lawyer.avatar}</span>
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition truncate">
                                                {lawyer.name}
                                            </h3>
                                            {lawyer.verified && (
                                                <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-400 truncate">{lawyer.title}</p>
                                        <p className="text-xs text-slate-500 truncate">{lawyer.firm}</p>

                                        {/* Location & Rating */}
                                        <div className="flex items-center gap-4 mt-3 text-sm">
                                            <span className="flex items-center gap-1 text-slate-400">
                                                <MapPin className="w-3 h-3" />
                                                {lawyer.location}
                                            </span>
                                            <span className="flex items-center gap-1 text-amber-400">
                                                <Star className="w-3 h-3 fill-current" />
                                                {lawyer.rating} ({lawyer.reviews})
                                            </span>
                                        </div>

                                        {/* Specialties */}
                                        <div className="flex flex-wrap gap-1 mt-3">
                                            {lawyer.specialties.slice(0, 4).map((subclass) => (
                                                <span
                                                    key={subclass}
                                                    className="px-2 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs"
                                                >
                                                    {subclass}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price & CTA */}
                                    <div className="flex flex-col items-end justify-between">
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-white">${lawyer.hourlyRate}</p>
                                            <p className="text-xs text-slate-500">per hour</p>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                router.push(`/user/book/${lawyer.id}`);
                                            }}
                                            className="glass-button text-sm py-2 px-4 flex items-center gap-1"
                                        >
                                            <Phone className="w-3 h-3" />
                                            Book
                                        </button>
                                    </div>
                                </div>

                                {/* Stats Row */}
                                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/5 text-xs text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <Award className="w-3 h-3 text-emerald-400" />
                                        {lawyer.successRate}% success rate
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {lawyer.yearsExperience} years experience
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 glass-card p-8 text-center"
                    >
                        <h2 className="text-2xl font-bold text-white mb-3">Are you an immigration lawyer?</h2>
                        <p className="text-slate-400 mb-6 max-w-xl mx-auto">
                            Join our platform to connect with thousands of visa applicants looking for expert guidance.
                        </p>
                        <button
                            onClick={() => router.push("/lawyer/signup")}
                            className="glass-button flex items-center gap-2 mx-auto"
                        >
                            Join as a Lawyer
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
