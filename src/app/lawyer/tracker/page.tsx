"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    Bell,
    User,
    Clock,
    TrendingUp,
    TrendingDown,
    Calendar,
    Plus,
    CheckCircle,
    XCircle,
    MinusCircle,
    Send,
    Info,
    ChevronDown,
    Award,
} from "lucide-react";

// Visa categories for tracker
const visaCategories = [
    { subclass: "482", name: "Temporary Skill Shortage" },
    { subclass: "186", name: "Employer Nomination Scheme" },
    { subclass: "189", name: "Skilled Independent" },
    { subclass: "190", name: "Skilled Nominated" },
    { subclass: "491", name: "Skilled Work Regional" },
    { subclass: "820", name: "Partner Visa (Onshore)" },
    { subclass: "500", name: "Student Visa" },
    { subclass: "485", name: "Temporary Graduate" },
];

// Mock previous submissions
const previousSubmissions = [
    {
        id: 1,
        subclass: "482",
        processingDays: 42,
        outcome: "approved",
        applicationDate: "Oct 15, 2025",
        decisionDate: "Nov 26, 2025",
        submittedAt: "Nov 28, 2025",
        verified: true,
        impact: "+15 data points",
    },
    {
        id: 2,
        subclass: "186",
        processingDays: 175,
        outcome: "approved",
        applicationDate: "Jun 1, 2025",
        decisionDate: "Nov 23, 2025",
        submittedAt: "Nov 25, 2025",
        verified: true,
        impact: "+12 data points",
    },
    {
        id: 3,
        subclass: "189",
        processingDays: 360,
        outcome: "approved",
        applicationDate: "Jan 2, 2025",
        decisionDate: "Dec 28, 2025",
        submittedAt: "Jan 2, 2026",
        verified: true,
        impact: "+20 data points",
    },
    {
        id: 4,
        subclass: "820",
        processingDays: 730,
        outcome: "approved",
        applicationDate: "Jan 15, 2024",
        decisionDate: "Jan 15, 2026",
        submittedAt: "Jan 17, 2026",
        verified: false,
        impact: "Pending verification",
    },
];

type OutcomeType = "approved" | "refused" | "withdrawn";

export default function LawyerTracker() {
    const [selectedVisa, setSelectedVisa] = useState("");
    const [processingDays, setProcessingDays] = useState("");
    const [outcome, setOutcome] = useState<OutcomeType>("approved");
    const [applicationDate, setApplicationDate] = useState("");
    const [decisionDate, setDecisionDate] = useState("");
    const [notes, setNotes] = useState("");
    const [showForm, setShowForm] = useState(false);

    const totalContributions = previousSubmissions.length;
    const verifiedContributions = previousSubmissions.filter((s) => s.verified).length;

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
                        <a href="/lawyer/tracker" className="nav-link text-sm font-medium text-white">Tracker</a>
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
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">Tracker Updates</h1>
                                <p className="text-slate-400">Submit verified processing time data to help the community</p>
                            </div>
                            <button
                                onClick={() => setShowForm(!showForm)}
                                className="glass-button flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                New Entry
                            </button>
                        </div>
                    </motion.div>

                    {/* Contribution Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-3 gap-4 mb-8"
                    >
                        <div className="glass-card p-5">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-slate-400 text-sm">Total Contributions</p>
                                <TrendingUp className="w-5 h-5 text-indigo-400" />
                            </div>
                            <p className="text-3xl font-bold text-white">{totalContributions}</p>
                        </div>
                        <div className="glass-card p-5">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-slate-400 text-sm">Verified</p>
                                <CheckCircle className="w-5 h-5 text-emerald-400" />
                            </div>
                            <p className="text-3xl font-bold text-emerald-400">{verifiedContributions}</p>
                        </div>
                        <div className="glass-card p-5">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-slate-400 text-sm">Contribution Rank</p>
                                <Award className="w-5 h-5 text-amber-400" />
                            </div>
                            <p className="text-3xl font-bold text-amber-400">Gold</p>
                        </div>
                    </motion.div>

                    {/* Info Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-5 mb-8 bg-indigo-500/10 border border-indigo-500/20"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                                <Info className="w-5 h-5 text-indigo-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-medium mb-2">Your contributions matter</h3>
                                <p className="text-sm text-slate-400">
                                    As a verified lawyer, your processing time data carries higher weight in our algorithm.
                                    Your submissions help thousands of applicants set realistic expectations.
                                    Please ensure all data is accurate and based on actual case outcomes.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* New Entry Form */}
                    <AnimatePresence>
                        {showForm && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden mb-8"
                            >
                                <div className="glass-card p-6">
                                    <h2 className="text-lg font-semibold text-white mb-6">Submit New Processing Time</h2>

                                    <div className="space-y-4">
                                        {/* Visa Selection */}
                                        <div>
                                            <label className="text-sm text-slate-400 mb-2 block">Visa Subclass</label>
                                            <select
                                                value={selectedVisa}
                                                onChange={(e) => setSelectedVisa(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition appearance-none"
                                            >
                                                <option value="" className="bg-slate-800">Select visa subclass...</option>
                                                {visaCategories.map((visa) => (
                                                    <option key={visa.subclass} value={visa.subclass} className="bg-slate-800">
                                                        {visa.subclass} - {visa.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Dates */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm text-slate-400 mb-2 block">Application Date</label>
                                                <input
                                                    type="date"
                                                    value={applicationDate}
                                                    onChange={(e) => setApplicationDate(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm text-slate-400 mb-2 block">Decision Date</label>
                                                <input
                                                    type="date"
                                                    value={decisionDate}
                                                    onChange={(e) => setDecisionDate(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition"
                                                />
                                            </div>
                                        </div>

                                        {/* Processing Days (auto-calculated) */}
                                        <div>
                                            <label className="text-sm text-slate-400 mb-2 block">Processing Days</label>
                                            <div className="relative">
                                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    type="number"
                                                    value={processingDays}
                                                    onChange={(e) => setProcessingDays(e.target.value)}
                                                    placeholder="Auto-calculated from dates"
                                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none transition"
                                                />
                                            </div>
                                        </div>

                                        {/* Outcome */}
                                        <div>
                                            <label className="text-sm text-slate-400 mb-2 block">Outcome</label>
                                            <div className="grid grid-cols-3 gap-3">
                                                {([
                                                    { id: "approved", label: "Approved", icon: CheckCircle, color: "emerald" },
                                                    { id: "refused", label: "Refused", icon: XCircle, color: "red" },
                                                    { id: "withdrawn", label: "Withdrawn", icon: MinusCircle, color: "slate" },
                                                ] as const).map((opt) => (
                                                    <button
                                                        key={opt.id}
                                                        onClick={() => setOutcome(opt.id)}
                                                        className={`p-3 rounded-xl border transition flex items-center justify-center gap-2 ${outcome === opt.id
                                                                ? `bg-${opt.color}-500/20 border-${opt.color}-500/50 text-${opt.color}-400`
                                                                : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                                                            }`}
                                                    >
                                                        <opt.icon className="w-5 h-5" />
                                                        {opt.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Notes */}
                                        <div>
                                            <label className="text-sm text-slate-400 mb-2 block">Notes (Optional)</label>
                                            <textarea
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                                placeholder="Any additional context (e.g., priority processing, stream type)..."
                                                rows={3}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none transition resize-none"
                                            />
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-3 pt-2">
                                            <button
                                                onClick={() => setShowForm(false)}
                                                className="flex-1 py-3 rounded-xl glass hover:bg-white/10 text-slate-300 transition"
                                            >
                                                Cancel
                                            </button>
                                            <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:opacity-90 transition flex items-center justify-center gap-2">
                                                <Send className="w-4 h-4" />
                                                Submit Entry
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Previous Submissions */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-lg font-semibold text-white mb-4">Your Submissions</h2>
                        <div className="space-y-3">
                            {previousSubmissions.map((submission, index) => (
                                <motion.div
                                    key={submission.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + index * 0.05 }}
                                    className="glass-card p-5"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                                <span className="text-lg font-bold text-white">{submission.subclass}</span>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-white font-medium">
                                                        {submission.processingDays} days
                                                    </span>
                                                    <span className={`px-2 py-0.5 rounded-lg text-xs flex items-center gap-1 ${submission.outcome === "approved"
                                                            ? "bg-emerald-500/20 text-emerald-400"
                                                            : submission.outcome === "refused"
                                                                ? "bg-red-500/20 text-red-400"
                                                                : "bg-slate-500/20 text-slate-400"
                                                        }`}>
                                                        {submission.outcome === "approved" && <CheckCircle className="w-3 h-3" />}
                                                        {submission.outcome === "refused" && <XCircle className="w-3 h-3" />}
                                                        {submission.outcome === "withdrawn" && <MinusCircle className="w-3 h-3" />}
                                                        {submission.outcome}
                                                    </span>
                                                    {submission.verified ? (
                                                        <span className="px-2 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs flex items-center gap-1">
                                                            <CheckCircle className="w-3 h-3" />
                                                            Verified
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-400 text-xs">
                                                            Pending
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-slate-500">
                                                    {submission.applicationDate} → {submission.decisionDate}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-emerald-400">{submission.impact}</p>
                                            <p className="text-xs text-slate-500">Submitted {submission.submittedAt}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
