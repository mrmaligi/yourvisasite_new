"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    Sparkles,
    Bell,
    User,
    ArrowLeft,
    FolderOpen,
    FileText,
    Upload,
    CheckCircle,
    HelpCircle,
    AlertCircle,
    X,
    Plus,
    Download,
    Eye,
    ChevronRight,
    Phone,
    Shield,
    Clock,
    Star,
    Check,
} from "lucide-react";

// Document folder structure
const documentFolders = [
    {
        id: "identity",
        name: "Identity Documents",
        icon: "🪪",
        description: "Passport, birth certificate, national ID",
        required: true,
        documents: [
            { name: "Passport Bio Page", status: "uploaded", helpText: "Clear scan of your passport bio page" },
            { name: "Birth Certificate", status: "required", helpText: "Certified copy or official translation" },
            { name: "National ID", status: "optional", helpText: "If applicable in your country" },
        ],
    },
    {
        id: "character",
        name: "Character Documents",
        icon: "📋",
        description: "Police clearances, statutory declarations",
        required: true,
        documents: [
            { name: "Police Clearance Certificate", status: "required", helpText: "From each country lived 12+ months" },
            { name: "Character Statement", status: "required", helpText: "Form 80 or equivalent" },
            { name: "Reference Letters", status: "optional", helpText: "Professional or personal references" },
        ],
    },
    {
        id: "health",
        name: "Health Documents",
        icon: "🏥",
        description: "Medical examinations, health declarations",
        required: true,
        documents: [
            { name: "Medical Examination", status: "pending", helpText: "From approved panel physician" },
            { name: "Chest X-Ray", status: "pending", helpText: "If required based on country" },
            { name: "Health Insurance", status: "optional", helpText: "Proof of OSHC or equivalent" },
        ],
    },
    {
        id: "employment",
        name: "Employment Evidence",
        icon: "💼",
        description: "Work history, employer letters, contracts",
        required: true,
        documents: [
            { name: "Employment Reference Letters", status: "required", helpText: "From current and previous employers" },
            { name: "Payslips", status: "required", helpText: "Last 6-12 months" },
            { name: "Tax Returns", status: "optional", helpText: "For self-employed applicants" },
            { name: "Current Contract", status: "required", helpText: "With Australian sponsor" },
        ],
    },
    {
        id: "skills",
        name: "Skills Assessment",
        icon: "🎓",
        description: "Qualifications, assessments, certifications",
        required: true,
        documents: [
            { name: "Skills Assessment Outcome", status: "uploaded", helpText: "From relevant assessing authority" },
            { name: "Educational Certificates", status: "uploaded", helpText: "Degrees, diplomas, transcripts" },
            { name: "Professional Certifications", status: "optional", helpText: "Industry-specific licenses" },
        ],
    },
    {
        id: "english",
        name: "English Proficiency",
        icon: "📝",
        description: "IELTS, PTE, TOEFL results",
        required: true,
        documents: [
            { name: "English Test Results", status: "uploaded", helpText: "IELTS, PTE Academic, or equivalent" },
            { name: "Study Evidence", status: "optional", helpText: "If claiming English medium instruction" },
        ],
    },
];

// Application steps checklist
const applicationSteps = [
    { step: 1, title: "Create ImmiAccount", completed: true },
    { step: 2, title: "Complete Online Form", completed: true },
    { step: 3, title: "Upload Documents", completed: false, current: true },
    { step: 4, title: "Pay Application Fee", completed: false },
    { step: 5, title: "Complete Biometrics", completed: false },
    { step: 6, title: "Attend Interview (if required)", completed: false },
    { step: 7, title: "Await Decision", completed: false },
];

export default function PremiumVisaPage({ params }: { params: Promise<{ subclass: string }> }) {
    const resolvedParams = use(params);
    const [activeFolder, setActiveFolder] = useState<string | null>(null);
    const [showHelpModal, setShowHelpModal] = useState<{ title: string; content: string } | null>(null);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "uploaded": return "bg-emerald-500/20 text-emerald-400";
            case "required": return "bg-red-500/20 text-red-400";
            case "pending": return "bg-amber-500/20 text-amber-400";
            case "optional": return "bg-slate-500/20 text-slate-400";
            default: return "bg-slate-500/20 text-slate-400";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "uploaded": return CheckCircle;
            case "required": return AlertCircle;
            case "pending": return Clock;
            default: return HelpCircle;
        }
    };

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
                        <Link href="/user/visas" className="nav-link text-sm font-medium text-white">Visas</Link>
                        <Link href="/tracker" className="nav-link text-sm font-medium">Tracker</Link>
                        <Link href="#" className="nav-link text-sm font-medium">Lawyers</Link>
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
                <div className="max-w-7xl mx-auto">
                    {/* Back Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-8"
                    >
                        <Link
                            href={`/user/visas/${resolvedParams.subclass}`}
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Visa Details
                        </Link>
                    </motion.div>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                                <Star className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="px-2 py-1 rounded-lg bg-amber-500/20 text-amber-400 text-xs font-medium">
                                        PREMIUM
                                    </span>
                                </div>
                                <h1 className="text-2xl md:text-3xl font-bold text-white">
                                    Subclass {resolvedParams.subclass} Application Guide
                                </h1>
                            </div>
                        </div>
                        <button className="glass-button flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4" />
                            Talk to a Lawyer
                        </button>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Left Column - Document Vault */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="lg:col-span-2 space-y-4"
                        >
                            {/* Document Folders */}
                            <div className="glass-card p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                                            <FolderOpen className="w-5 h-5 text-indigo-400" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-semibold text-white">Document Vault</h2>
                                            <p className="text-sm text-slate-400">Organize your application documents</p>
                                        </div>
                                    </div>
                                    <button className="glass-button-secondary flex items-center gap-2 text-sm py-2 px-4">
                                        <Upload className="w-4 h-4" />
                                        Upload
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {documentFolders.map((folder, index) => (
                                        <motion.div
                                            key={folder.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 + index * 0.05 }}
                                        >
                                            <div
                                                onClick={() => setActiveFolder(activeFolder === folder.id ? null : folder.id)}
                                                className={`p-4 rounded-2xl cursor-pointer transition-all ${activeFolder === folder.id
                                                        ? "bg-indigo-500/10 border border-indigo-500/30"
                                                        : "bg-white/5 hover:bg-white/10"
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-2xl">{folder.icon}</span>
                                                        <div>
                                                            <h3 className="text-white font-medium">{folder.name}</h3>
                                                            <p className="text-sm text-slate-400">{folder.description}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="hidden sm:flex items-center gap-2">
                                                            <span className="text-xs text-emerald-400">
                                                                {folder.documents.filter(d => d.status === "uploaded").length}/{folder.documents.length}
                                                            </span>
                                                            <div className="w-16 h-2 rounded-full bg-white/10">
                                                                <div
                                                                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-500"
                                                                    style={{
                                                                        width: `${(folder.documents.filter(d => d.status === "uploaded").length / folder.documents.length) * 100}%`
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <ChevronRight
                                                            className={`w-5 h-5 text-slate-400 transition-transform ${activeFolder === folder.id ? "rotate-90" : ""
                                                                }`}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Expanded Documents List */}
                                            <AnimatePresence>
                                                {activeFolder === folder.id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="pl-12 py-3 space-y-2">
                                                            {folder.documents.map((doc, docIndex) => {
                                                                const StatusIcon = getStatusIcon(doc.status);
                                                                return (
                                                                    <div
                                                                        key={docIndex}
                                                                        className="flex items-center justify-between p-3 rounded-xl bg-white/5 group"
                                                                    >
                                                                        <div className="flex items-center gap-3">
                                                                            <FileText className="w-5 h-5 text-slate-400" />
                                                                            <span className="text-sm text-slate-300">{doc.name}</span>
                                                                            <button
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    setShowHelpModal({ title: doc.name, content: doc.helpText });
                                                                                }}
                                                                                className="opacity-0 group-hover:opacity-100 transition"
                                                                            >
                                                                                <HelpCircle className="w-4 h-4 text-indigo-400" />
                                                                            </button>
                                                                        </div>
                                                                        <div className="flex items-center gap-2">
                                                                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(doc.status)}`}>
                                                                                <StatusIcon className="w-3 h-3 inline mr-1" />
                                                                                {doc.status}
                                                                            </span>
                                                                            {doc.status === "uploaded" ? (
                                                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                                                                                    <button className="p-1.5 rounded-lg hover:bg-white/10">
                                                                                        <Eye className="w-4 h-4 text-slate-400" />
                                                                                    </button>
                                                                                    <button className="p-1.5 rounded-lg hover:bg-white/10">
                                                                                        <Download className="w-4 h-4 text-slate-400" />
                                                                                    </button>
                                                                                </div>
                                                                            ) : (
                                                                                <button className="p-1.5 rounded-lg hover:bg-indigo-500/20 opacity-0 group-hover:opacity-100 transition">
                                                                                    <Plus className="w-4 h-4 text-indigo-400" />
                                                                                </button>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Tips Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="glass-card p-6"
                            >
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-amber-400" />
                                    Common Mistakes to Avoid
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        "Ensure all documents are certified copies where required",
                                        "Translations must be by NAATI accredited translators",
                                        "Employment references should be on company letterhead",
                                        "Police clearances must be less than 12 months old",
                                        "All pages of your passport should be scanned"
                                    ].map((tip, index) => (
                                        <li key={index} className="flex items-start gap-3 text-sm text-slate-300">
                                            <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-xs text-amber-400">{index + 1}</span>
                                            </span>
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </motion.div>

                        {/* Right Column - Progress & Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6"
                        >
                            {/* Application Progress */}
                            <div className="glass-card p-6">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-indigo-400" />
                                    Application Progress
                                </h3>
                                <div className="space-y-3">
                                    {applicationSteps.map((step) => (
                                        <div
                                            key={step.step}
                                            className={`flex items-center gap-3 p-3 rounded-xl ${step.current ? "bg-indigo-500/10 border border-indigo-500/30" : ""
                                                }`}
                                        >
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.completed
                                                    ? "bg-emerald-500/20"
                                                    : step.current
                                                        ? "bg-indigo-500/20"
                                                        : "bg-white/5"
                                                }`}>
                                                {step.completed ? (
                                                    <Check className="w-4 h-4 text-emerald-400" />
                                                ) : (
                                                    <span className={`text-sm ${step.current ? "text-indigo-400" : "text-slate-500"}`}>
                                                        {step.step}
                                                    </span>
                                                )}
                                            </div>
                                            <span className={`text-sm ${step.completed ? "text-slate-300" : step.current ? "text-white font-medium" : "text-slate-500"
                                                }`}>
                                                {step.title}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Document Stats */}
                            <div className="glass-card p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Document Summary</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-400">Uploaded</span>
                                        <span className="text-emerald-400 font-medium">5 documents</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-400">Required</span>
                                        <span className="text-red-400 font-medium">6 remaining</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-400">Pending</span>
                                        <span className="text-amber-400 font-medium">2 items</span>
                                    </div>
                                    <div className="pt-3 border-t border-white/10">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-white font-medium">Overall Progress</span>
                                            <span className="text-indigo-400">38%</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-white/10">
                                            <div className="w-[38%] h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Lawyer CTA */}
                            <div className="glass-card p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-full blur-2xl" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                            <Phone className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold">Need Help?</h3>
                                            <p className="text-xs text-slate-400">Expert lawyers available</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-300 mb-4">
                                        Get personalized guidance on your document preparation.
                                    </p>
                                    <button className="w-full glass-button text-sm py-3">
                                        Book Consultation - $200
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>

            {/* Help Modal */}
            <AnimatePresence>
                {showHelpModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
                        onClick={() => setShowHelpModal(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="glass-card p-6 max-w-md w-full"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <HelpCircle className="w-5 h-5 text-indigo-400" />
                                    {showHelpModal.title}
                                </h3>
                                <button
                                    onClick={() => setShowHelpModal(null)}
                                    className="p-2 rounded-lg hover:bg-white/10 transition"
                                >
                                    <X className="w-5 h-5 text-slate-400" />
                                </button>
                            </div>
                            <p className="text-slate-300 leading-relaxed mb-4">{showHelpModal.content}</p>
                            <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                                <p className="text-sm text-indigo-300">
                                    💡 <strong>Tip:</strong> Click the upload button next to this document to add your file.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
