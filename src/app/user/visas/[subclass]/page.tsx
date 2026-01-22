"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
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
    DollarSign,
    Phone,
    Globe,
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
        <div className="min-h-screen bg-slate-50">

            {/* Navigation */}
            <nav className="nav-sticky px-6 py-4 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-900 flex items-center justify-center text-white">
                            <Globe className="w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 font-serif">YourVisaSite</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/user/dashboard" className="nav-link text-sm font-medium">Dashboard</Link>
                        <Link href="/user/visas" className="nav-link text-sm font-medium text-indigo-700">Visas</Link>
                        <Link href="/tracker" className="nav-link text-sm font-medium">Tracker</Link>
                        <Link href="/lawyers" className="nav-link text-sm font-medium">Lawyers</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 rounded-lg hover:bg-slate-100 transition">
                            <Bell className="w-5 h-5 text-slate-600" />
                        </button>
                        <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center border border-indigo-200">
                            <User className="w-5 h-5 text-indigo-700" />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="py-10 px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Back Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-8"
                    >
                        <Link
                            href="/user/visas"
                            className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-700 transition font-medium"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Visas
                        </Link>
                    </motion.div>

                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card p-8 mb-6 bg-white border-slate-200"
                    >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                            <div className="flex items-start gap-5">
                                <div className="w-20 h-20 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl font-bold text-indigo-900">{visa.subclass}</span>
                                </div>
                                <div>
                                    <span className="inline-block px-3 py-1 rounded-md bg-indigo-100 text-indigo-700 text-xs font-bold mb-3 border border-indigo-200">
                                        {visa.category}
                                    </span>
                                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 font-serif">
                                        Subclass {visa.subclass}
                                    </h1>
                                    <p className="text-lg text-slate-600 font-medium">{visa.name}</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Link
                                    href={visa.officialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary flex items-center gap-2 text-sm py-3 px-5 justify-center bg-white"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Official Page
                                </Link>
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
                            { label: "Processing Time", value: visa.processingTime.split(",")[0], icon: Clock, color: "bg-cyan-50 text-cyan-600" },
                            { label: "Application Cost", value: visa.cost.split(" ")[0] + " " + visa.cost.split(" ")[1], icon: DollarSign, color: "bg-emerald-50 text-emerald-600" },
                            { label: "Validity", value: visa.validityPeriod, icon: Shield, color: "bg-purple-50 text-purple-600" },
                            { label: "Visa Type", value: visa.category.split(" ")[0], icon: FileText, color: "bg-amber-50 text-amber-600" },
                        ].map((stat) => (
                            <div key={stat.label} className="card p-5 bg-white border-slate-200">
                                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <p className="text-sm text-slate-500 mb-1 font-medium">{stat.label}</p>
                                <p className="text-slate-900 font-bold text-sm">{stat.value}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Summary Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="card p-6 mb-6 bg-white border-slate-200"
                    >
                        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 font-serif">
                            <Info className="w-5 h-5 text-indigo-600" />
                            Overview
                        </h2>
                        <p className="text-slate-600 leading-relaxed font-medium">{visa.summary}</p>
                    </motion.div>

                    {/* Eligibility & Requirements Grid */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {/* Eligibility */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="card p-6 bg-white border-slate-200"
                        >
                            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 font-serif">
                                <CheckCircle className="w-5 h-5 text-emerald-600" />
                                Eligibility Criteria
                            </h2>
                            <ul className="space-y-3">
                                {visa.eligibilityPoints.map((point, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                                        </div>
                                        <span className="text-slate-600 text-sm font-medium">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Requirements */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="card p-6 bg-white border-slate-200"
                        >
                            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 font-serif">
                                <FileText className="w-5 h-5 text-cyan-600" />
                                Key Requirements
                            </h2>
                            <ul className="space-y-3">
                                {visa.keyRequirements.map((req, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-cyan-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-xs text-cyan-600 font-bold">{i + 1}</span>
                                        </div>
                                        <span className="text-slate-600 text-sm font-medium">{req}</span>
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
                        className="card p-8 relative overflow-hidden bg-indigo-900 border-none shadow-xl"
                    >
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-800 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg">
                                    <Lock className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white font-serif">Unlock Premium Access</h2>
                                    <p className="text-sm text-indigo-200 font-medium">Get comprehensive application guidance</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h3 className="text-white font-bold mb-3">Premium includes:</h3>
                                    <ul className="space-y-2">
                                        {[
                                            "Step-by-step application walkthrough",
                                            "Document checklist with examples",
                                            "Secure document vault storage",
                                            "Common mistakes to avoid",
                                            "Processing time predictions",
                                            "Direct lawyer consultation access"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-indigo-100 font-medium">
                                                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="text-center md:text-right">
                                    <div className="inline-block p-6 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
                                        <p className="text-sm text-indigo-200 mb-1 font-medium">One-time payment</p>
                                        <p className="text-4xl font-bold text-white mb-1">$49</p>
                                        <p className="text-sm text-indigo-200 mb-4">AUD</p>
                                        <Link
                                            href={`/user/visas/${visa.subclass}/premium`}
                                            className="w-full bg-white text-indigo-900 font-bold py-3 px-6 rounded-lg hover:bg-indigo-50 transition flex items-center justify-center gap-2"
                                        >
                                            <Lock className="w-4 h-4" />
                                            Unlock Now
                                        </Link>
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
                        className="mt-6 card p-6 bg-white border-slate-200"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                                    <Phone className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="text-slate-900 font-bold font-serif">Need Expert Advice?</h3>
                                    <p className="text-sm text-slate-500 font-medium">Consult with a verified immigration lawyer</p>
                                </div>
                            </div>
                            <button className="btn-secondary flex items-center gap-2 text-sm py-3 px-6 bg-white">
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
