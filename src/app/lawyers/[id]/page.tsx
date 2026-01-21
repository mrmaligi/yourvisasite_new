"use client";

import { use } from "react";
import { motion } from "framer-motion";
import {
    Sparkles,
    Bell,
    User,
    ArrowLeft,
    Star,
    Shield,
    Clock,
    Phone,
    Video,
    MessageSquare,
    Calendar,
    CheckCircle,
    MapPin,
    Globe,
    Award,
} from "lucide-react";

// Mock lawyer data
const lawyerData: Record<string, {
    id: number;
    name: string;
    firm: string;
    avatar: string;
    rating: number;
    reviews: number;
    specialties: string[];
    hourlyRate: number;
    halfHourRate: number;
    fullTakeover: number;
    experience: string;
    verified: true;
    bio: string;
    location: string;
    languages: string[];
    successRate: string;
    casesHandled: number;
}> = {
    "1": {
        id: 1,
        name: "Emily Richardson",
        firm: "Richardson Immigration Law",
        avatar: "ER",
        rating: 4.9,
        reviews: 127,
        specialties: ["Skilled Migration", "482", "186", "189", "190", "491"],
        hourlyRate: 280,
        halfHourRate: 150,
        fullTakeover: 3500,
        experience: "15 years",
        verified: true,
        bio: "Emily Richardson is a registered migration agent with over 15 years of experience specializing in employer-sponsored visas and skilled migration pathways. She has helped thousands of clients successfully navigate the Australian immigration system.",
        location: "Melbourne, VIC",
        languages: ["English", "Mandarin"],
        successRate: "98%",
        casesHandled: 2400,
    },
};

// Mock reviews
const reviews = [
    { name: "David K.", rating: 5, date: "2 weeks ago", comment: "Emily was incredibly helpful with my 482 visa. She explained everything clearly and made the process stress-free." },
    { name: "Sarah L.", rating: 5, date: "1 month ago", comment: "Highly recommend! Got my 186 approved faster than expected thanks to Emily's expertise." },
    { name: "Michael C.", rating: 4, date: "2 months ago", comment: "Very professional and knowledgeable. Worth every dollar." },
];

export default function LawyerProfile({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const lawyer = lawyerData[resolvedParams.id] || lawyerData["1"];

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
                        <a href="/user/dashboard" className="nav-link text-sm font-medium">Dashboard</a>
                        <a href="/user/visas" className="nav-link text-sm font-medium">Visas</a>
                        <a href="/user/consult" className="nav-link text-sm font-medium text-white">Consult</a>
                        <a href="/tracker" className="nav-link text-sm font-medium">Tracker</a>
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
                <div className="max-w-5xl mx-auto">
                    {/* Back Button */}
                    <motion.a
                        href="/lawyers"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition mb-8"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Lawyers
                    </motion.a>

                    {/* Profile Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-8 mb-6"
                    >
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                                <span className="text-3xl font-bold text-white">{lawyer.avatar}</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-2xl font-bold text-white">{lawyer.name}</h1>
                                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/20">
                                        <Shield className="w-4 h-4 text-emerald-400" />
                                        <span className="text-xs text-emerald-400 font-medium">Verified</span>
                                    </div>
                                </div>
                                <p className="text-slate-400 mb-3">{lawyer.firm}</p>
                                <div className="flex flex-wrap items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                        <span className="text-white font-medium">{lawyer.rating}</span>
                                        <span className="text-slate-500">({lawyer.reviews} reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-slate-400">
                                        <MapPin className="w-4 h-4" />
                                        {lawyer.location}
                                    </div>
                                    <div className="flex items-center gap-1 text-slate-400">
                                        <Globe className="w-4 h-4" />
                                        {lawyer.languages.join(", ")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Left Column - Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="lg:col-span-2 space-y-6"
                        >
                            {/* About */}
                            <div className="glass-card p-6">
                                <h2 className="text-lg font-semibold text-white mb-4">About</h2>
                                <p className="text-slate-300 leading-relaxed">{lawyer.bio}</p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { label: "Success Rate", value: lawyer.successRate, icon: CheckCircle },
                                    { label: "Cases Handled", value: lawyer.casesHandled.toLocaleString(), icon: Award },
                                    { label: "Experience", value: lawyer.experience, icon: Clock },
                                ].map((stat) => (
                                    <div key={stat.label} className="glass-card p-4 text-center">
                                        <stat.icon className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
                                        <p className="text-xl font-bold text-white">{stat.value}</p>
                                        <p className="text-xs text-slate-400">{stat.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Specialties */}
                            <div className="glass-card p-6">
                                <h2 className="text-lg font-semibold text-white mb-4">Specialties</h2>
                                <div className="flex flex-wrap gap-2">
                                    {lawyer.specialties.map((specialty) => (
                                        <span
                                            key={specialty}
                                            className="px-3 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-sm"
                                        >
                                            {specialty}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Reviews */}
                            <div className="glass-card p-6">
                                <h2 className="text-lg font-semibold text-white mb-4">Client Reviews</h2>
                                <div className="space-y-4">
                                    {reviews.map((review, index) => (
                                        <div key={index} className="p-4 rounded-xl bg-white/5">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-white font-medium">{review.name}</span>
                                                    <div className="flex items-center gap-0.5">
                                                        {[...Array(review.rating)].map((_, i) => (
                                                            <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                                                        ))}
                                                    </div>
                                                </div>
                                                <span className="text-xs text-slate-500">{review.date}</span>
                                            </div>
                                            <p className="text-sm text-slate-300">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column - Booking */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6"
                        >
                            {/* Booking Card */}
                            <div className="glass-card p-6 sticky top-28">
                                <h2 className="text-lg font-semibold text-white mb-4">Book Consultation</h2>

                                <div className="space-y-3 mb-6">
                                    <button className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 transition text-left group">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Phone className="w-5 h-5 text-indigo-400" />
                                                <div>
                                                    <p className="text-white font-medium">30 min call</p>
                                                    <p className="text-xs text-slate-400">Quick consultation</p>
                                                </div>
                                            </div>
                                            <span className="text-xl font-bold text-white">${lawyer.halfHourRate}</span>
                                        </div>
                                    </button>

                                    <button className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 transition text-left group">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Video className="w-5 h-5 text-indigo-400" />
                                                <div>
                                                    <p className="text-white font-medium">60 min call</p>
                                                    <p className="text-xs text-slate-400">Detailed review</p>
                                                </div>
                                            </div>
                                            <span className="text-xl font-bold text-white">${lawyer.hourlyRate}</span>
                                        </div>
                                    </button>

                                    <button className="w-full p-4 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 hover:bg-indigo-500/30 transition text-left group">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Award className="w-5 h-5 text-indigo-400" />
                                                <div>
                                                    <p className="text-white font-medium">Full Case Takeover</p>
                                                    <p className="text-xs text-slate-400">Complete management</p>
                                                </div>
                                            </div>
                                            <span className="text-xl font-bold text-white">${lawyer.fullTakeover}+</span>
                                        </div>
                                    </button>
                                </div>

                                <button
                                    onClick={() => window.location.href = `/user/book/${lawyer.id}`}
                                    className="w-full glass-button py-4"
                                >
                                    <Calendar className="w-5 h-5 inline mr-2" />
                                    Select Time Slot
                                </button>

                                <p className="text-xs text-slate-500 text-center mt-4">
                                    Your uploaded documents will be shared with the lawyer upon booking.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
