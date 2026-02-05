"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    Search,
    Star,
    Shield,
    Clock,
    Phone,
    ChevronRight,
    MapPin,
    Award,
    Users,
    Globe,
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

function LawyersDirectoryContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("q") || searchParams.get("specialty") || "";

    const [searchQuery, setSearchQuery] = useState(initialQuery);
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
        <div className="min-h-screen bg-slate-50">

            {/* Navigation */}
            <nav className="nav-sticky px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-900 flex items-center justify-center text-white">
                            <Globe className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-serif font-bold text-slate-900">VisaIQ</span>
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
                        <Link href="/lawyers" className="nav-link text-sm font-medium text-indigo-700">
                            Lawyers
                        </Link>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href="/login" className="btn-secondary text-sm py-2 px-4">
                            Sign In
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-10"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-serif">
                            Find an <span className="text-indigo-700">Immigration Lawyer</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-6">
                            Connect with verified immigration lawyers for expert guidance on your visa journey
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
                                <Shield className="w-4 h-4 text-emerald-600" />
                                <span className="text-sm text-slate-600 font-medium">All lawyers verified</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
                                <Users className="w-4 h-4 text-indigo-600" />
                                <span className="text-sm text-slate-600 font-medium">{lawyersData.length}+ experts available</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Search & Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="card p-4 mb-8 bg-white"
                    >
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name, firm, or visa subclass..."
                                    className="input-field pl-12"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Specialty Filter */}
                            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                                {specialtyOptions.map((specialty) => (
                                    <button
                                        key={specialty}
                                        onClick={() => setSelectedSpecialty(specialty)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${selectedSpecialty === specialty
                                            ? "bg-indigo-900 text-white"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
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
                                className="card p-6 bg-white hover:border-indigo-200 hover:shadow-md transition cursor-pointer group"
                            >
                                <div className="flex gap-4">
                                    {/* Avatar */}
                                    <div className="w-16 h-16 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xl font-bold text-indigo-900">{lawyer.avatar}</span>
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition truncate font-serif">
                                                {lawyer.name}
                                            </h3>
                                            {lawyer.verified && (
                                                <Shield className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-600 truncate font-medium">{lawyer.title}</p>
                                        <p className="text-xs text-slate-500 truncate">{lawyer.firm}</p>

                                        {/* Location & Rating */}
                                        <div className="flex items-center gap-4 mt-3 text-sm">
                                            <span className="flex items-center gap-1 text-slate-500">
                                                <MapPin className="w-3 h-3" />
                                                {lawyer.location}
                                            </span>
                                            <span className="flex items-center gap-1 text-amber-500 font-semibold">
                                                <Star className="w-3 h-3 fill-current" />
                                                {lawyer.rating} ({lawyer.reviews})
                                            </span>
                                        </div>

                                        {/* Specialties */}
                                        <div className="flex flex-wrap gap-1 mt-3">
                                            {lawyer.specialties.slice(0, 4).map((subclass) => (
                                                <span
                                                    key={subclass}
                                                    className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100"
                                                >
                                                    {subclass}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price & CTA */}
                                    <div className="flex flex-col items-end justify-between">
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-slate-900">${lawyer.hourlyRate}</p>
                                            <p className="text-xs text-slate-500">per hour</p>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                router.push(`/user/book/${lawyer.id}`);
                                            }}
                                            className="btn-primary text-sm py-2 px-4 flex items-center gap-1"
                                        >
                                            <Phone className="w-3 h-3" />
                                            Book
                                        </button>
                                    </div>
                                </div>

                                {/* Stats Row */}
                                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
                                    <span className="flex items-center gap-1">
                                        <Award className="w-3 h-3 text-emerald-600" />
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
                        className="mt-12 card p-8 text-center bg-white shadow-md border-indigo-100"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 mb-3 font-serif">Are you an immigration lawyer?</h2>
                        <p className="text-slate-600 mb-6 max-w-xl mx-auto">
                            Join our platform to connect with thousands of visa applicants looking for expert guidance.
                        </p>
                        <button
                            onClick={() => router.push("/lawyer/signup")}
                            className="btn-primary flex items-center gap-2 mx-auto"
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

export default function LawyersDirectory() {
    return (
        <Suspense fallback={<div>Loading directory...</div>}>
            <LawyersDirectoryContent />
        </Suspense>
    );
}
