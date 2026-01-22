"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    Sparkles,
    Bell,
    User,
    FileText,
    Upload,
    Download,
    Trash2,
    Eye,
    Search,
    Filter,
    Clock,
    CheckCircle,
    AlertCircle,
    X,
    Plus,
    ChevronRight,
    Calendar,
    Loader2,
} from "lucide-react";
import { getDocuments, uploadDocument } from "@/app/actions/documents";


// Categories config (static display info)
const CATEGORY_CONFIG: Record<string, { name: string; icon: string; color: string }> = {
    identity: { name: "Identity Documents", icon: "🪪", color: "from-blue-500 to-cyan-500" },
    character: { name: "Character Documents", icon: "📋", color: "from-purple-500 to-indigo-500" },
    health: { name: "Health Documents", icon: "🏥", color: "from-emerald-500 to-teal-500" },
    employment: { name: "Employment Records", icon: "💼", color: "from-amber-500 to-orange-500" },
    skills: { name: "Skills Assessment", icon: "🎓", color: "from-pink-500 to-rose-500" },
};

type DocumentType = {
    id: number;
    category: string;
    file_name: string;
    file_size: string;
    uploaded_at: string;
    expiry_date?: string;
    status: "verified" | "pending" | "required";
};

export default function UserDocuments() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [documents, setDocuments] = useState<DocumentType[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    // Fetch documents on mount
    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const docs = await getDocuments();
                setDocuments((docs as unknown as DocumentType[]) || []);
            } catch (error) {
                console.error("Failed to fetch documents", error);
            }
        };
        fetchDocs();
    }, []);

    // Compute categories based on fetched documents
    const documentCategories = Object.entries(CATEGORY_CONFIG).map(([id, config]) => {
        const categoryDocs = documents.filter(doc => doc.category === id);
        return {
            id,
            ...config,
            documents: categoryDocs.map(doc => ({
                ...doc,
                name: doc.file_name,
                uploadedAt: new Date(doc.uploaded_at).toLocaleDateString(),
                size: doc.file_size,
                expiry: doc.expiry_date ? new Date(doc.expiry_date).toLocaleDateString() : null
            }))
        };
    });

    const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUploading(true);
        const formData = new FormData(e.currentTarget);

        try {
            const result = await uploadDocument(formData);
            if (result.error) {
                alert(result.error);
            } else {
                setShowUploadModal(false);
                // Refresh list
                const docs = await getDocuments();
                setDocuments(docs || []);
            }
        } catch (error) {
            console.error(error);
            alert("Upload failed");
        } finally {
            setIsUploading(false);
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "verified":
                return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
            case "pending":
                return "bg-amber-500/20 text-amber-400 border-amber-500/30";
            case "required":
                return "bg-red-500/20 text-red-400 border-red-500/30";
            default:
                return "bg-slate-500/20 text-slate-400 border-slate-500/30";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "verified":
                return <CheckCircle className="w-4 h-4" />;
            case "pending":
                return <Clock className="w-4 h-4" />;
            case "required":
                return <AlertCircle className="w-4 h-4" />;
            default:
                return null;
        }
    };

    const totalDocuments = documentCategories.reduce((acc, cat) => acc + cat.documents.length, 0);
    const verifiedDocuments = documentCategories.reduce(
        (acc, cat) => acc + cat.documents.filter((d) => d.status === "verified").length,
        0
    );

    return (
        <div className="min-h-screen">
            {/* Mesh Background */}
            <div className="mesh-background" />

            {/* Navigation */}
            <nav className="nav-sticky fixed top-0 left-0 right-0 z-50 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">YourVisaSite</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/user/dashboard" className="nav-link text-sm font-medium">Dashboard</Link>
                        <Link href="/user/visas" className="nav-link text-sm font-medium">Visas</Link>
                        <Link href="/user/applications" className="nav-link text-sm font-medium">Applications</Link>
                        <Link href="/user/documents" className="nav-link text-sm font-medium text-white">Documents</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 rounded-xl card hover:bg-white/10 transition">
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
                        className="mb-8"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">My Documents</h1>
                                <p className="text-slate-400">Manage all your visa documents in one place</p>
                            </div>
                            <button
                                onClick={() => setShowUploadModal(true)}
                                className="btn-primary flex items-center gap-2"
                            >
                                <Upload className="w-4 h-4" />
                                Upload Document
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="card p-4 text-center">
                                <p className="text-2xl font-bold text-white">{totalDocuments}</p>
                                <p className="text-sm text-slate-400">Total Documents</p>
                            </div>
                            <div className="card p-4 text-center">
                                <p className="text-2xl font-bold text-emerald-400">{verifiedDocuments}</p>
                                <p className="text-sm text-slate-400">Verified</p>
                            </div>
                            <div className="card p-4 text-center">
                                <p className="text-2xl font-bold text-amber-400">
                                    {totalDocuments - verifiedDocuments}
                                </p>
                                <p className="text-sm text-slate-400">Pending/Required</p>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="flex items-center gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search documents..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 input-field rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                                />
                            </div>
                            <button className="p-3 card rounded-xl hover:bg-white/10 transition">
                                <Filter className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Document Categories */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {documentCategories.map((category, index) => (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                                className={`card p-5 cursor-pointer transition-all ${selectedCategory === category.id ? "ring-2 ring-indigo-500/50" : ""
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl`}>
                                            {category.icon}
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{category.name}</p>
                                            <p className="text-sm text-slate-500">{category.documents.length} documents</p>
                                        </div>
                                    </div>
                                    <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${selectedCategory === category.id ? "rotate-90" : ""
                                        }`} />
                                </div>

                                {/* Progress bar */}
                                <div className="mb-3">
                                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: `${(category.documents.filter((d) => d.status === "verified").length / category.documents.length) * 100}%`,
                                            }}
                                            className={`h-full bg-gradient-to-r ${category.color}`}
                                        />
                                    </div>
                                </div>

                                {/* Document list (expanded) */}
                                <AnimatePresence>
                                    {selectedCategory === category.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-4 border-t border-white/10 space-y-2">
                                                {category.documents.map((doc, docIndex) => (
                                                    <div
                                                        key={docIndex}
                                                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition group"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <FileText className="w-5 h-5 text-slate-400" />
                                                            <div>
                                                                <p className="text-sm text-white">{doc.name}</p>
                                                                {doc.uploadedAt && (
                                                                    <p className="text-xs text-slate-500">{doc.size} • {doc.uploadedAt}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className={`px-2 py-1 rounded-lg text-xs flex items-center gap-1 border ${getStatusStyle(doc.status)}`}>
                                                                {getStatusIcon(doc.status)}
                                                                {doc.status}
                                                            </span>
                                                            {doc.status !== "required" && (
                                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                                                                    <button className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white">
                                                                        <Eye className="w-4 h-4" />
                                                                    </button>
                                                                    <button className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white">
                                                                        <Download className="w-4 h-4" />
                                                                    </button>
                                                                    <button className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400">
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            )}
                                                            {doc.status === "required" && (
                                                                <button className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition">
                                                                    <Plus className="w-4 h-4" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                                <button className="w-full p-3 rounded-lg border border-dashed border-white/20 text-slate-400 hover:border-indigo-500/50 hover:text-indigo-400 transition flex items-center justify-center gap-2">
                                                    <Plus className="w-4 h-4" />
                                                    Add Document
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>

                    {/* Expiring Soon Alert */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-8 card p-5 border border-amber-500/30 bg-amber-500/5"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                <Calendar className="w-5 h-5 text-amber-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white mb-2">Documents Expiring Soon</h3>
                                <p className="text-sm text-slate-400 mb-3">
                                    The following documents will expire within the next 12 months and may need renewal.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 text-sm">
                                        Health Insurance (Dec 2026)
                                    </span>
                                    <span className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 text-sm">
                                        Police Clearance (Jan 2027)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Upload Modal */}
            <AnimatePresence>
                {showUploadModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
                        onClick={() => setShowUploadModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="card p-6 max-w-md w-full"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">Upload Document</h2>
                                <button
                                    onClick={() => setShowUploadModal(false)}
                                    className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Upload Form */}
                            <form onSubmit={handleFileUpload}>
                                {/* Category Selection */}
                                <div className="mb-4">
                                    <label className="text-sm text-slate-400 mb-2 block">Category</label>
                                    <select name="category" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition appearance-none">
                                        {Object.entries(CATEGORY_CONFIG).map(([id, config]) => (
                                            <option key={id} value={id} className="bg-slate-800">
                                                {config.icon} {config.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* File Input */}
                                <div className="mb-6">
                                    <label className="text-sm text-slate-400 mb-2 block">File</label>
                                    <input
                                        type="file"
                                        name="file"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none"
                                    />
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowUploadModal(false)}
                                        className="flex-1 py-3 rounded-xl card hover:bg-white/10 text-slate-300 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isUploading}
                                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {isUploading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Uploading...
                                            </>
                                        ) : (
                                            "Upload"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
