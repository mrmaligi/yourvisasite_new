"use client";

import { Globe, use, useState } from "react";
import { Globe, motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Globe,
    Sparkles,
    Bell,
    User,
    ArrowLeft,
    FolderOpen,
    FileText,
    Upload,
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
            case "uploaded": return "bg-emerald-50 text-emerald-600 border-emerald-200";
            case "required": return "bg-red-50 text-red-600 border-red-200";
            case "pending": return "bg-amber-50 text-amber-600 border-amber-200";
            case "optional": return "bg-slate-50 text-slate-500 border-slate-200";
            default: return "bg-slate-50 text-slate-500 border-slate-200";
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
                <div className="max-w-7xl mx-auto">
                    {/* Back Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-8"
                    >
                        <Link
                            href={`/user/visas/${resolvedParams.subclass}`}
                            className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-700 transition font-medium"
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
                            <div className="w-16 h-16 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-lg">
                                <Sparkles className="w-8 h-8" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="px-2 py-1 rounded-md bg-amber-100 text-amber-700 text-xs font-bold border border-amber-200">
                                        PREMIUM
                                    </span>
                                </div>
                                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 font-serif">
                                    Subclass {resolvedParams.subclass} Application Guide
                                </h1>
                            </div>
                        </div>
                        <button className="btn-primary flex items-center gap-2 text-sm shadow-sm">
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
                            <div className="card p-6 bg-white border-slate-200">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                                            <FolderOpen className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold text-slate-900 font-serif">Document Vault</h2>
                                            <p className="text-sm text-slate-500 font-medium">Organize your application documents</p>
                                        </div>
                                    </div>
                                    <button className="btn-secondary flex items-center gap-2 text-sm py-2 px-4 bg-white">
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
                                                className={`p-4 rounded-xl cursor-pointer transition-all border ${activeFolder === folder.id
                                                        ? "bg-indigo-50 border-indigo-200"
                                                        : "bg-white border-slate-100 hover:bg-slate-50"
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-2xl">{folder.icon}</span>
                                                        <div>
                                                            <h3 className="text-slate-900 font-bold">{folder.name}</h3>
                                                            <p className="text-sm text-slate-500 font-medium">{folder.description}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="hidden sm:flex items-center gap-2">
                                                            <span className="text-xs text-emerald-600 font-bold">
                                                                {folder.documents.filter(d => d.status === "uploaded").length}/{folder.documents.length}
                                                            </span>
                                                            <div className="w-16 h-2 rounded-full bg-slate-100 overflow-hidden">
                                                                <div
                                                                    className="h-full rounded-full bg-emerald-500"
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
                                                        <div className="pl-4 md:pl-12 py-3 space-y-2">
                                                            {folder.documents.map((doc, docIndex) => {
                                                                const StatusIcon = getStatusIcon(doc.status);
                                                                return (
                                                                    <div
                                                                        key={docIndex}
                                                                        className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 group"
                                                                    >
                                                                        <div className="flex items-center gap-3">
                                                                            <FileText className="w-5 h-5 text-slate-400" />
                                                                            <span className="text-sm text-slate-700 font-medium">{doc.name}</span>
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
                                                                            <span className={`px-2 py-1 rounded-md text-xs font-bold border ${getStatusColor(doc.status)}`}>
                                                                                <StatusIcon className="w-3 h-3 inline mr-1" />
                                                                                {doc.status}
                                                                            </span>
                                                                            {doc.status === "uploaded" ? (
                                                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                                                                                    <button className="p-1.5 rounded-lg hover:bg-white text-slate-400 hover:text-indigo-600 transition">
                                                                                        <Eye className="w-4 h-4" />
                                                                                    </button>
                                                                                    <button className="p-1.5 rounded-lg hover:bg-white text-slate-400 hover:text-indigo-600 transition">
                                                                                        <Download className="w-4 h-4" />
                                                                                    </button>
                                                                                </div>
                                                                            ) : (
                                                                                <button className="p-1.5 rounded-lg hover:bg-indigo-100 text-indigo-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition">
                                                                                    <Plus className="w-4 h-4" />
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
                                className="card p-6 bg-white border-slate-200"
                            >
                                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 font-serif">
                                    <AlertCircle className="w-5 h-5 text-amber-500" />
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
                                        <li key={index} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                                            <span className="w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5 border border-amber-100">
                                                <span className="text-xs text-amber-600 font-bold">{index + 1}</span>
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
                            <div className="card p-6 bg-white border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 font-serif">
                                    <Shield className="w-5 h-5 text-indigo-600" />
                                    Application Progress
                                </h3>
                                <div className="space-y-3">
                                    {applicationSteps.map((step) => (
                                        <div
                                            key={step.step}
                                            className={`flex items-center gap-3 p-3 rounded-lg ${step.current ? "bg-indigo-50 border border-indigo-100" : ""
                                                }`}
                                        >
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${step.completed
                                                    ? "bg-emerald-50 border-emerald-100"
                                                    : step.current
                                                        ? "bg-indigo-100 border-indigo-200"
                                                        : "bg-slate-50 border-slate-100"
                                                }`}>
                                                {step.completed ? (
                                                    <Check className="w-4 h-4 text-emerald-600" />
                                                ) : (
                                                    <span className={`text-sm font-bold ${step.current ? "text-indigo-700" : "text-slate-400"}`}>
                                                        {step.step}
                                                    </span>
                                                )}
                                            </div>
                                            <span className={`text-sm font-medium ${step.completed ? "text-slate-500" : step.current ? "text-slate-900" : "text-slate-400"
                                                }`}>
                                                {step.title}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Document Stats */}
                            <div className="card p-6 bg-white border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4 font-serif">Document Summary</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-500 font-medium">Uploaded</span>
                                        <span className="text-emerald-600 font-bold">5 documents</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-500 font-medium">Required</span>
                                        <span className="text-red-500 font-bold">6 remaining</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-500 font-medium">Pending</span>
                                        <span className="text-amber-500 font-bold">2 items</span>
                                    </div>
                                    <div className="pt-3 border-t border-slate-100">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-slate-900 font-bold">Overall Progress</span>
                                            <span className="text-indigo-600 font-bold">38%</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                                            <div className="w-[38%] h-full rounded-full bg-indigo-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Lawyer CTA */}
                            <div className="card p-6 bg-white border-slate-200">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-slate-900 font-bold">Need Help?</h3>
                                        <p className="text-xs text-slate-500 font-medium">Expert lawyers available</p>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-600 mb-4 font-medium">
                                    Get personalized guidance on your document preparation.
                                </p>
                                <button className="w-full btn-primary text-sm py-3 shadow-sm">
                                    Book Consultation - $200
                                </button>
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
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
                        onClick={() => setShowHelpModal(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full border border-slate-200"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 font-serif">
                                    <HelpCircle className="w-5 h-5 text-indigo-600" />
                                    {showHelpModal.title}
                                </h3>
                                <button
                                    onClick={() => setShowHelpModal(null)}
                                    className="p-2 rounded-lg hover:bg-slate-100 transition"
                                >
                                    <X className="w-5 h-5 text-slate-400" />
                                </button>
                            </div>
                            <p className="text-slate-600 leading-relaxed mb-4 font-medium">{showHelpModal.content}</p>
                            <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-100">
                                <p className="text-sm text-indigo-700 font-medium">
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
