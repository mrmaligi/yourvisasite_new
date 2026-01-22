"use client";
import Link from "next/link";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    CheckCircle,
    XCircle,
    FileText,
    Download,
    Eye,
    Shield,
    Briefcase,
    MapPin,
    Mail,
    Phone,
    ArrowLeft,
    AlertTriangle,
} from "lucide-react";

export default function LawyerVerificationPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [status, setStatus] = useState<"pending" | "approved" | "rejected">("pending");

    // Mock Lawyer Application Data
    const lawyer = {
        id: resolvedParams.id,
        name: "Sarah Jenkins",
        email: "sarah.jenkins@lawfirm.com",
        phone: "+61 400 123 456",
        firm: "Jenkins & Associates",
        location: "Melbourne, VIC",
        licenseNumber: "MARN 1234567",
        experience: "Senior Associate (8 years)",
        joined: "20 Jan 2026",
        documents: [
            { name: "Practicing Certificate 2026", type: "PDF", size: "2.4 MB" },
            { name: "Professional Indemnity Insurance", type: "PDF", size: "1.8 MB" },
            { name: "Identity Document (Passport)", type: "JPG", size: "3.2 MB" },
        ]
    };

    const handleApprove = () => {
        setStatus("approved");
        setShowApproveModal(false);
    };

    const handleReject = () => {
        setStatus("rejected");
        setShowRejectModal(false);
    };

    return (
        <div className="min-h-screen bg-[#0a0a12]">
            <div className="mesh-background" />

            {/* Sidebar (Simplified Admin) */}
            <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-white/5 z-40 hidden lg:flex flex-col">
                <div className="p-6 flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold text-white">AdminPanel</span>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition">
                        <Shield className="w-5 h-5" />
                        Dashboard
                    </Link>
                    <Link href="/admin/lawyers" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-500/10 text-indigo-400 font-medium">
                        <Briefcase className="w-5 h-5" />
                        Verifications
                    </Link>
                </nav>
            </aside>

            <main className="lg:ml-64 p-8 pt-24 lg:pt-8 min-h-screen">
                <Link href="/admin/lawyers" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition mb-8">
                    <ArrowLeft className="w-5 h-5" />
                    Back to Pending List
                </Link>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
                            {lawyer.name}
                            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${status === "pending" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                                    status === "approved" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                        "bg-red-500/10 text-red-400 border-red-500/20"
                                }`}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </span>
                        </h1>
                        <p className="text-slate-400">Application submitted on {lawyer.joined}</p>
                    </div>

                    {status === "pending" && (
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowRejectModal(true)}
                                className="btn-secondary text-red-400 hover:border-red-400/50 hover:bg-red-400/10 flex items-center gap-2"
                            >
                                <XCircle className="w-5 h-5" />
                                Reject
                            </button>
                            <button
                                onClick={() => setShowApproveModal(true)}
                                className="btn-primary flex items-center gap-2"
                            >
                                <CheckCircle className="w-5 h-5" />
                                Approve Application
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Applicant Profile */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card p-6"
                    >
                        <h2 className="text-xl font-semibold text-white mb-6">Applicant Details</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-white/5">
                                    <Briefcase className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">Firm Name</p>
                                    <p className="text-white font-medium">{lawyer.firm}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-white/5">
                                    <Shield className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">License Number</p>
                                    <p className="text-white font-medium">{lawyer.licenseNumber}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-white/5">
                                    <MapPin className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">Location</p>
                                    <p className="text-white font-medium">{lawyer.location}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-white/5">
                                    <Mail className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">Email Address</p>
                                    <p className="text-white font-medium">{lawyer.email}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-white/5">
                                    <Phone className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">Phone Number</p>
                                    <p className="text-white font-medium">{lawyer.phone}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Document Verification */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-2 card p-6"
                    >
                        <h2 className="text-xl font-semibold text-white mb-6">Submitted Documents</h2>
                        <div className="space-y-4">
                            {lawyer.documents.map((doc, index) => (
                                <div
                                    key={index}
                                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                                            <FileText className="w-6 h-6 text-indigo-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-white">{doc.name}</h3>
                                            <p className="text-sm text-slate-400">{doc.type} • {doc.size}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition" title="Preview">
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        <button className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition" title="Download">
                                            <Download className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-3">
                            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                            <div>
                                <h4 className="font-medium text-amber-400 text-sm mb-1">Verification Required</h4>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    Please verify the MARN license number against the OMARA register before approving.
                                    Ensure Professional Indemnity Insurance is current.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Approval Modal */}
            <AnimatePresence>
                {showApproveModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="card p-8 max-w-md w-full text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-8 h-8 text-emerald-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Approve Lawyer?</h2>
                            <p className="text-slate-400 mb-8">
                                This will grant {lawyer.name} full access to the Lawyer Portal and list them publicly. A welcome email will be sent.
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowApproveModal(false)}
                                    className="flex-1 btn-secondary py-3"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleApprove}
                                    className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition"
                                >
                                    Confirm Approval
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Reject Modal */}
            <AnimatePresence>
                {showRejectModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="card p-8 max-w-md w-full text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
                                <XCircle className="w-8 h-8 text-red-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Reject Application?</h2>
                            <p className="text-slate-400 mb-6">
                                Please provide a reason for rejection. This will be sent to the applicant.
                            </p>
                            <textarea
                                className="w-full input-field h-32 mb-6"
                                placeholder="Reason for rejection..."
                            ></textarea>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowRejectModal(false)}
                                    className="flex-1 btn-secondary py-3"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleReject}
                                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition"
                                >
                                    Confirm Rejection
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
