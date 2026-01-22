"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Sparkles,
    Bell,
    User,
    Search,
    Star,
    Video,
    Shield,
} from "lucide-react";

// Mock lawyers data
const lawyers = [
    {
        id: 1,
        name: "Emily Richardson",
        firm: "Richardson Immigration Law",
        avatar: "ER",
        rating: 4.9,
        reviews: 127,
        specialties: ["Skilled Migration", "482", "186", "189"],
        hourlyRate: 280,
        halfHourRate: 150,
        experience: "15 years",
        verified: true,
        available: true,
        bio: "Specializing in employer-sponsored visas and skilled migration pathways.",
    },
    {
        id: 2,
        name: "James Chen",
        firm: "Chen & Partners",
        avatar: "JC",
        rating: 4.8,
        reviews: 89,
        specialties: ["Partner Visas", "820", "801", "309"],
        hourlyRate: 250,
        halfHourRate: 130,
        experience: "12 years",
        verified: true,
        available: true,
        bio: "Expert in family and partner visa applications with high success rate.",
    },
    {
        id: 3,
        name: "Sarah Mitchell",
        firm: "Global Visa Solutions",
        avatar: "SM",
        rating: 4.7,
        reviews: 64,
        specialties: ["Student Visas", "500", "485", "Graduate"],
        hourlyRate: 200,
        halfHourRate: 110,
        experience: "8 years",
        verified: true,
        available: false,
        bio: "Helping international students navigate Australian education pathways.",
    },
    {
        id: 4,
        name: "Michael Torres",
        firm: "Torres Migration Services",
        avatar: "MT",
        rating: 4.9,
        reviews: 156,
        specialties: ["Business Visas", "188", "132", "Investor"],
        hourlyRate: 350,
        halfHourRate: 180,
        experience: "20 years",
        verified: true,
        available: true,
        bio: "Leading expert in business and investor visa categories.",
    },
];

export default function LawyerConsult() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

    const specialties = ["All", "Skilled Migration", "Partner Visas", "Student Visas", "Business Visas"];

    const filteredLawyers = lawyers.filter((lawyer) => {
        const matchesSearch =
            searchQuery === "" ||
            lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lawyer.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesSpecialty =
            !selectedSpecialty ||
            selectedSpecialty === "All" ||
            lawyer.specialties.some((s) => s.includes(selectedSpecialty));
        return matchesSearch && matchesSpecialty;
    });

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
                        <Link href="/user/dashboard" className="nav-link text-sm font-medium">Dashboard</Link>
                        <Link href="/user/visas" className="nav-link text-sm font-medium">Visas</Link>
                        <Link href="/user/consult" className="nav-link text-sm font-medium text-white">Consult</Link>
                        <Link href="/tracker" className="nav-link text-sm font-medium">Tracker</Link>
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
                        className="text-center mb-10"
                    >
                        <h1 className="text-4xl font-bold text-white mb-4">
                            Consult with <span className="gradient-text">Expert Lawyers</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Connect with verified immigration lawyers for personalized guidance on your visa application.
                        </p>
                    </motion.div>

                    {/* Search & Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card p-4 mb-8"
                    >
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search by lawyer name or visa type..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none transition"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2">
                                {specialties.map((specialty) => (
                                    <button
                                        key={specialty}
                                        onClick={() => setSelectedSpecialty(specialty === "All" ? null : specialty)}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition whitespace-nowrap ${(selectedSpecialty === specialty) || (specialty === "All" && !selectedSpecialty)
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
                                className={`glass-card p-6 ${lawyer.verified ? "verified-badge" : ""}`}
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                                        <span className="text-lg font-bold text-white">{lawyer.avatar}</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-lg font-semibold text-white">{lawyer.name}</h3>
                                            {lawyer.verified && (
                                                <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-500/20">
                                                    <Shield className="w-3 h-3 text-emerald-400" />
                                                    <span className="text-xs text-emerald-400">Verified</span>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-400">{lawyer.firm}</p>
                                        <div className="flex items-center gap-3 mt-2">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                                <span className="text-sm text-white">{lawyer.rating}</span>
                                                <span className="text-xs text-slate-500">({lawyer.reviews})</span>
                                            </div>
                                            <span className="text-xs text-slate-500">•</span>
                                            <span className="text-xs text-slate-400">{lawyer.experience}</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-sm text-slate-300 mb-4">{lawyer.bio}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {lawyer.specialties.map((specialty) => (
                                        <span
                                            key={specialty}
                                            className="px-2 py-1 rounded-lg bg-white/5 text-xs text-slate-300"
                                        >
                                            {specialty}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <p className="text-xs text-slate-500">30 min</p>
                                            <p className="text-lg font-bold text-white">${lawyer.halfHourRate}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">60 min</p>
                                            <p className="text-lg font-bold text-white">${lawyer.hourlyRate}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/lawyers/${lawyer.id}`}
                                            className="glass-button-secondary flex items-center gap-2 text-sm py-2 px-4"
                                        >
                                            View Profile
                                        </Link>
                                        <button
                                            disabled={!lawyer.available}
                                            className={`flex items-center gap-2 text-sm py-2 px-4 rounded-xl transition ${lawyer.available
                                                    ? "glass-button"
                                                    : "bg-white/5 text-slate-500 cursor-not-allowed"
                                                }`}
                                        >
                                            <Video className="w-4 h-4" />
                                            Book
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
