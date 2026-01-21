"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import {
    Sparkles,
    Calendar,
    Clock,
    CreditCard,
    Star,
    Shield,
    CheckCircle,
    ArrowLeft,
    Video,
    Phone,
    MessageSquare,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

export default function BookLawyerPage({ params }: { params: Promise<{ lawyerId: string }> }) {
    const resolvedParams = use(params);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [consultationType, setConsultationType] = useState<"video" | "phone">("video");

    // Mock lawyer data
    const lawyer = {
        id: resolvedParams.lawyerId,
        name: "Sarah Jenkins",
        title: "Senior Immigration Lawyer",
        specialty: "Skilled & Work Visas",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        rate: 200,
        rating: 4.9,
        reviews: 124,
        verified: true,
    };

    // Calendar generation (simplified for UI demo)
    const today = new Date();
    const dates = Array.from({ length: 14 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i + 1);
        return date;
    });

    const timeSlots = [
        "09:00 AM", "10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM", "04:30 PM"
    ];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(amount);
    };

    return (
        <div className="min-h-screen">
            <div className="mesh-background" />

            <nav className="nav-glass fixed top-0 left-0 right-0 z-50 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">VisaIQ</span>
                    </div>
                </div>
            </nav>

            <main className="pt-28 pb-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.a
                        href={`/lawyers/${lawyer.id}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition mb-8"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Lawyer Profile
                    </motion.a>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column: Booking Options */}
                        <div className="lg:col-span-2 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-card p-8"
                            >
                                <h1 className="text-3xl font-bold text-white mb-2">Book a Consultation</h1>
                                <p className="text-slate-400 mb-8">Select a date and time for your session with {lawyer.name}</p>

                                {/* Consultation Type */}
                                <div className="grid md:grid-cols-2 gap-4 mb-8">
                                    <button
                                        onClick={() => setConsultationType("video")}
                                        className={`p-4 rounded-2xl border transition-all flex items-center gap-4 ${consultationType === "video"
                                            ? "bg-indigo-500/20 border-indigo-500/50"
                                            : "bg-white/5 border-white/10 hover:bg-white/10"
                                            }`}
                                    >
                                        <div className={`p-3 rounded-xl ${consultationType === "video" ? "bg-indigo-500" : "bg-white/10"}`}>
                                            <Video className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-white font-medium">Video Call</h3>
                                            <p className="text-sm text-slate-400">Google Meet / Zoom</p>
                                        </div>
                                        {consultationType === "video" && <CheckCircle className="w-6 h-6 text-indigo-400 ml-auto" />}
                                    </button>

                                    <button
                                        onClick={() => setConsultationType("phone")}
                                        className={`p-4 rounded-2xl border transition-all flex items-center gap-4 ${consultationType === "phone"
                                            ? "bg-indigo-500/20 border-indigo-500/50"
                                            : "bg-white/5 border-white/10 hover:bg-white/10"
                                            }`}
                                    >
                                        <div className={`p-3 rounded-xl ${consultationType === "phone" ? "bg-indigo-500" : "bg-white/10"}`}>
                                            <Phone className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-white font-medium">Phone Call</h3>
                                            <p className="text-sm text-slate-400">Direct mobile number</p>
                                        </div>
                                        {consultationType === "phone" && <CheckCircle className="w-6 h-6 text-indigo-400 ml-auto" />}
                                    </button>
                                </div>

                                {/* Date Selection */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-indigo-400" />
                                        Select Date
                                    </h3>
                                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                        {dates.map((date, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setSelectedDate(date)}
                                                className={`flex-shrink-0 w-20 p-4 rounded-2xl border transition-all text-center ${selectedDate?.toDateString() === date.toDateString()
                                                    ? "bg-indigo-500/20 border-indigo-500/50 text-white"
                                                    : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                                                    }`}
                                            >
                                                <div className="text-xs font-medium uppercase mb-1">
                                                    {date.toLocaleDateString("en-US", { weekday: "short" })}
                                                </div>
                                                <div className="text-xl font-bold">
                                                    {date.getDate()}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Time Selection */}
                                <div className="mb-8 h-40"> {/* Fixed height to prevent layout shift */}
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-indigo-400" />
                                        Select Time
                                    </h3>
                                    {selectedDate ? (
                                        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                                            {timeSlots.map((time, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setSelectedTime(time)}
                                                    className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${selectedTime === time
                                                        ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                                                        : "bg-white/5 text-slate-300 hover:bg-white/10"
                                                        }`}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center h-24 rounded-2xl bg-white/5 text-slate-500 text-sm">
                                            Please select a date first
                                        </div>
                                    )}
                                </div>

                                {/* Notes */}
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <MessageSquare className="w-5 h-5 text-indigo-400" />
                                        Topic (Optional)
                                    </h3>
                                    <textarea
                                        placeholder="Briefly describe what you'd like to discuss..."
                                        className="w-full h-32 glass-input resize-none"
                                    />
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column: Order Summary */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="glass-card p-6 sticky top-28"
                            >
                                {/* Lawyer Mini Profile */}
                                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                                    <img
                                        src={lawyer.image}
                                        alt={lawyer.name}
                                        className="w-16 h-16 rounded-2xl bg-indigo-500/20"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-white">{lawyer.name}</h3>
                                        <p className="text-sm text-slate-400">{lawyer.title}</p>
                                        <div className="flex items-center gap-1 mt-1 text-xs text-amber-400">
                                            <Star className="w-3 h-3 fill-amber-400" />
                                            <span>{lawyer.rating} ({lawyer.reviews})</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Summary Details */}
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">Rate</span>
                                        <span className="text-white">{formatCurrency(lawyer.rate)}/hr</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">Duration</span>
                                        <span className="text-white">60 Minutes</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">Date</span>
                                        <span className="text-white">
                                            {selectedDate ? selectedDate.toLocaleDateString() : "-"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">Time</span>
                                        <span className="text-white">{selectedTime || "-"}</span>
                                    </div>
                                </div>

                                <div className="border-t border-b border-white/10 py-4 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold text-white">Total</span>
                                        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                                            {formatCurrency(lawyer.rate)}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    className={`w-full glass-button flex items-center justify-center gap-2 group ${!selectedDate || !selectedTime ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                    disabled={!selectedDate || !selectedTime}
                                >
                                    <span>Proceed to Payment</span>
                                    <CreditCard className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>

                                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                                    <Shield className="w-3 h-3" />
                                    <span>Secure processing via Stripe</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
