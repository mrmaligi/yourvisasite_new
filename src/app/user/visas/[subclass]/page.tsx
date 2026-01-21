"use client";

import { use } from "react";
import { motion } from "framer-motion";
import {
    Sparkles,
    Bell,
    User,
    ArrowLeft,
    Clock,
    ExternalLink,
    Lock,
    Shield,
    FileText,
    CheckCircle,
    Info,
    ChevronRight,
    Star,
    TrendingUp,
    Users,
    DollarSign,
    HelpCircle,
    Phone,
} from "lucide-react";

// Mock visa data - in real app this comes from database
const visaDetails: Record<string, {
    subclass: string;
    name: string;
    category: string;
    summary: string;
    processingTime: string;
    cost: string;
    validityPeriod: string;
    eligibilityPoints: string[];
    keyRequirements: string[];
    officialUrl: string;
}> = {
    "482": {
        subclass: "482",
        name: "Temporary Skill Shortage",
        category: "Work & Skilled",
        summary: "The Temporary Skill Shortage (TSS) visa allows employers to address labour shortages by bringing in skilled workers where employers cannot source an appropriately skilled Australian worker.",
        processingTime: "25% in 18 days, 50% in 29 days, 75% in 51 days, 90% in 4 months",
        cost: "AUD $1,455 - $2,970",
        validityPeriod: "2-4 years depending on stream",
        eligibilityPoints: [
            "Have an occupation on the relevant skilled occupation list",
            "Have the relevant skills and experience for the occupation",
            "Meet English language requirements",
            "Be nominated by an approved sponsor"
        ],
        keyRequirements: [
            "Skills assessment (if required for your occupation)",
            "English test results (IELTS, PTE, etc.)",
            "Evidence of work experience",
            "Health and character requirements",
            "Employer nomination"
        ],
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-skill-shortage-482"
    },
    "186": {
        subclass: "186",
        name: "Employer Nomination Scheme",
        category: "Work & Skilled",
        summary: "The Employer Nomination Scheme (subclass 186) visa is for skilled workers who are nominated by an Australian employer. This visa lets you live and work in Australia as a permanent resident.",
        processingTime: "25% in 3 months, 50% in 6 months, 75% in 10 months, 90% in 13 months",
        cost: "AUD $4,640",
        validityPeriod: "Permanent",
        eligibilityPoints: [
            "Be nominated by an approved Australian employer",
            "Have the skills and qualifications for the nominated position",
            "Meet age requirements (under 45 in most cases)",
            "Meet English language requirements"
        ],
        keyRequirements: [
            "Skills assessment",
            "English test results",
            "Evidence of employment history",
            "Health and character checks",
            "Employer nomination approval"
        ],
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/employer-nomination-scheme-186"
    },
    "189": {
        subclass: "189",
        name: "Skilled Independent",
        category: "Work & Skilled",
        summary: "The Skilled Independent visa (subclass 189) is a points-tested permanent residence visa for skilled workers who are not sponsored by an employer, state or territory, or family member.",
        processingTime: "25% in 6 months, 50% in 12 months, 75% in 17 months, 90% in 22 months",
        cost: "AUD $4,640",
        validityPeriod: "Permanent",
        eligibilityPoints: [
            "Score at least 65 points on the points test",
            "Have an occupation on the skilled occupation list",
            "Be under 45 years of age",
            "Have competent English"
        ],
        keyRequirements: [
            "Skills assessment from relevant authority",
            "English test results",
            "Expression of Interest (EOI) submission",
            "Invitation to apply",
            "Health and character requirements"
        ],
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189"
    },
};

// Default details for visas not in our mock data
const defaultDetails = {
    subclass: "",
    name: "Visa Details",
    category: "General",
    summary: "This visa category is part of Australia's immigration program. Unlock premium access for detailed application guidance.",
    processingTime: "Varies",
    cost: "Contact Department",
    validityPeriod: "Varies",
    eligibilityPoints: ["Requirements vary based on individual circumstances"],
    keyRequirements: ["Please refer to official documentation"],
    officialUrl: "https://immi.homeaffairs.gov.au"
};

export default function VisaDetailPage({ params }: { params: Promise<{ subclass: string }> }) {
    const resolvedParams = use(params);
    const visa = visaDetails[resolvedParams.subclass] || { ...defaultDetails, subclass: resolvedParams.subclass, name: `Subclass ${resolvedParams.subclass}` };

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
                        <a href="/user/visas" className="nav-link text-sm font-medium text-white">Visas</a>
                        <a href="/tracker" className="nav-link text-sm font-medium">Tracker</a>
                        <a href="#" className="nav-link text-sm font-medium">Lawyers</a>
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
                        href="/user/visas"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition mb-8"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Visas
                    </motion.a>

                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-8 mb-6"
                    >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                            <div className="flex items-start gap-5">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl font-bold text-white">{visa.subclass}</span>
                                </div>
                                <div>
                                    <span className="inline-block px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-medium mb-3">
                                        {visa.category}
                                    </span>
                                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                        Subclass {visa.subclass}
                                    </h1>
                                    <p className="text-lg text-slate-300">{visa.name}</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <a
                                    href={visa.officialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass-button-secondary flex items-center gap-2 text-sm py-3 px-5 justify-center"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Official Page
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
                    >
                        {[
                            { label: "Processing Time", value: visa.processingTime.split(",")[0], icon: Clock, color: "from-cyan-500 to-blue-500" },
                            { label: "Application Cost", value: visa.cost.split(" ")[0] + " " + visa.cost.split(" ")[1], icon: DollarSign, color: "from-emerald-500 to-green-500" },
                            { label: "Validity", value: visa.validityPeriod, icon: Shield, color: "from-purple-500 to-pink-500" },
                            { label: "Visa Type", value: visa.category.split(" ")[0], icon: FileText, color: "from-orange-500 to-amber-500" },
                        ].map((stat, index) => (
                            <div key={stat.label} className="glass-card p-5">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20 flex items-center justify-center mb-3`}>
                                    <stat.icon className="w-5 h-5 text-white" />
                                </div>
                                <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
                                <p className="text-white font-semibold text-sm">{stat.value}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Summary Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-6 mb-6"
                    >
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Info className="w-5 h-5 text-indigo-400" />
                            Overview
                        </h2>
                        <p className="text-slate-300 leading-relaxed">{visa.summary}</p>
                    </motion.div>

                    {/* Eligibility & Requirements Grid */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {/* Eligibility */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="glass-card p-6"
                        >
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-emerald-400" />
                                Eligibility Criteria
                            </h2>
                            <ul className="space-y-3">
                                {visa.eligibilityPoints.map((point, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                                        </div>
                                        <span className="text-slate-300 text-sm">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Requirements */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="glass-card p-6"
                        >
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-cyan-400" />
                                Key Requirements
                            </h2>
                            <ul className="space-y-3">
                                {visa.keyRequirements.map((req, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-xs text-cyan-400 font-medium">{index + 1}</span>
                                        </div>
                                        <span className="text-slate-300 text-sm">{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Premium Unlock Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="glass-card p-8 relative overflow-hidden"
                    >
                        {/* Background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-cyan-600/10" />
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-full blur-3xl" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center glow-pulse">
                                    <Lock className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Unlock Premium Access</h2>
                                    <p className="text-sm text-slate-400">Get comprehensive application guidance</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h3 className="text-white font-medium mb-3">Premium includes:</h3>
                                    <ul className="space-y-2">
                                        {[
                                            "Step-by-step application walkthrough",
                                            "Document checklist with examples",
                                            "Secure document vault storage",
                                            "Common mistakes to avoid",
                                            "Processing time predictions",
                                            "Direct lawyer consultation access"
                                        ].map((item, index) => (
                                            <li key={index} className="flex items-center gap-2 text-sm text-slate-300">
                                                <Star className="w-4 h-4 text-amber-400" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="text-center md:text-right">
                                    <div className="inline-block p-6 rounded-2xl bg-white/5 border border-white/10">
                                        <p className="text-sm text-slate-400 mb-1">One-time payment</p>
                                        <p className="text-4xl font-bold text-white mb-1">$49</p>
                                        <p className="text-sm text-slate-400 mb-4">AUD</p>
                                        <a
                                            href={`/user/visas/${visa.subclass}/premium`}
                                            className="glass-button w-full flex items-center justify-center gap-2"
                                        >
                                            <Lock className="w-4 h-4" />
                                            Unlock Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Consult CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-6 glass-card p-6"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                    <Phone className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">Need Expert Advice?</h3>
                                    <p className="text-sm text-slate-400">Consult with a verified immigration lawyer</p>
                                </div>
                            </div>
                            <button className="glass-button-secondary flex items-center gap-2 text-sm py-3 px-6">
                                <Phone className="w-4 h-4" />
                                Book Consultation
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
