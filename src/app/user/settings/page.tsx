"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Sparkles,
    Bell,
    User,
    Shield,
    Globe,
    Moon,
    Smartphone,
    Mail,
    Eye,
    EyeOff,
    Download,
    Trash2,
    ChevronRight,
    Check,
    X,
    LogOut,
} from "lucide-react";

// Toggle component for settings
function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
    return (
        <button
            onClick={onChange}
            className={`relative w-12 h-6 rounded-full transition-colors ${enabled ? "bg-indigo-500" : "bg-slate-600"
                }`}
        >
            <motion.div
                animate={{ x: enabled ? 24 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 w-4 h-4 rounded-full bg-white"
            />
        </button>
    );
}

export default function UserSettings() {
    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        sms: false,
        marketing: false,
    });
    const [privacy, setPrivacy] = useState({
        profileVisible: true,
        showActivity: false,
    });
    const [theme, setTheme] = useState("dark");
    const [language, setLanguage] = useState("en");

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
                        <a href="/user/applications" className="nav-link text-sm font-medium">Applications</a>
                        <a href="/user/profile" className="nav-link text-sm font-medium">Profile</a>
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
                        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                        <p className="text-slate-400">Manage your account preferences and settings</p>
                    </motion.div>

                    <div className="space-y-6">
                        {/* Notifications Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="glass-card p-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                                    <Bell className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Notifications</h2>
                                    <p className="text-sm text-slate-400">Choose how you want to be notified</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5 text-slate-400" />
                                        <div>
                                            <p className="text-white font-medium">Email Notifications</p>
                                            <p className="text-sm text-slate-500">Important updates about your applications</p>
                                        </div>
                                    </div>
                                    <Toggle
                                        enabled={notifications.email}
                                        onChange={() => setNotifications({ ...notifications, email: !notifications.email })}
                                    />
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                                    <div className="flex items-center gap-3">
                                        <Bell className="w-5 h-5 text-slate-400" />
                                        <div>
                                            <p className="text-white font-medium">Push Notifications</p>
                                            <p className="text-sm text-slate-500">Real-time updates on your device</p>
                                        </div>
                                    </div>
                                    <Toggle
                                        enabled={notifications.push}
                                        onChange={() => setNotifications({ ...notifications, push: !notifications.push })}
                                    />
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                                    <div className="flex items-center gap-3">
                                        <Smartphone className="w-5 h-5 text-slate-400" />
                                        <div>
                                            <p className="text-white font-medium">SMS Notifications</p>
                                            <p className="text-sm text-slate-500">Critical alerts via text message</p>
                                        </div>
                                    </div>
                                    <Toggle
                                        enabled={notifications.sms}
                                        onChange={() => setNotifications({ ...notifications, sms: !notifications.sms })}
                                    />
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                                    <div className="flex items-center gap-3">
                                        <Sparkles className="w-5 h-5 text-slate-400" />
                                        <div>
                                            <p className="text-white font-medium">Marketing Updates</p>
                                            <p className="text-sm text-slate-500">News, tips, and promotional content</p>
                                        </div>
                                    </div>
                                    <Toggle
                                        enabled={notifications.marketing}
                                        onChange={() => setNotifications({ ...notifications, marketing: !notifications.marketing })}
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Privacy & Security Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="glass-card p-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Privacy & Security</h2>
                                    <p className="text-sm text-slate-400">Control your privacy settings</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                                    <div className="flex items-center gap-3">
                                        <Eye className="w-5 h-5 text-slate-400" />
                                        <div>
                                            <p className="text-white font-medium">Profile Visibility</p>
                                            <p className="text-sm text-slate-500">Allow lawyers to view your profile</p>
                                        </div>
                                    </div>
                                    <Toggle
                                        enabled={privacy.profileVisible}
                                        onChange={() => setPrivacy({ ...privacy, profileVisible: !privacy.profileVisible })}
                                    />
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                                    <div className="flex items-center gap-3">
                                        <EyeOff className="w-5 h-5 text-slate-400" />
                                        <div>
                                            <p className="text-white font-medium">Activity Status</p>
                                            <p className="text-sm text-slate-500">Show when you&apos;re online</p>
                                        </div>
                                    </div>
                                    <Toggle
                                        enabled={privacy.showActivity}
                                        onChange={() => setPrivacy({ ...privacy, showActivity: !privacy.showActivity })}
                                    />
                                </div>

                                <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition group">
                                    <div className="flex items-center gap-3">
                                        <Shield className="w-5 h-5 text-slate-400" />
                                        <div className="text-left">
                                            <p className="text-white font-medium">Two-Factor Authentication</p>
                                            <p className="text-sm text-slate-500">Add an extra layer of security</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs px-2 py-1 rounded-lg bg-amber-500/20 text-amber-400">Not Enabled</span>
                                        <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition" />
                                    </div>
                                </button>

                                <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition group">
                                    <div className="flex items-center gap-3">
                                        <User className="w-5 h-5 text-slate-400" />
                                        <div className="text-left">
                                            <p className="text-white font-medium">Connected Accounts</p>
                                            <p className="text-sm text-slate-500">Manage Google and other connections</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center gap-1">
                                            <Check className="w-3 h-3" />
                                            Google
                                        </span>
                                        <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition" />
                                    </div>
                                </button>
                            </div>
                        </motion.div>

                        {/* Appearance Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="glass-card p-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                    <Moon className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Appearance</h2>
                                    <p className="text-sm text-slate-400">Customize how VisaIQ looks</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-slate-400 mb-3">Theme</p>
                                    <div className="flex gap-3">
                                        {[
                                            { id: "dark", label: "Dark", icon: Moon },
                                            { id: "light", label: "Light", icon: Globe },
                                            { id: "system", label: "System", icon: Smartphone },
                                        ].map((option) => (
                                            <button
                                                key={option.id}
                                                onClick={() => setTheme(option.id)}
                                                className={`flex-1 p-4 rounded-xl border transition flex flex-col items-center gap-2 ${theme === option.id
                                                        ? "bg-indigo-500/20 border-indigo-500/50 text-white"
                                                        : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                                                    }`}
                                            >
                                                <option.icon className="w-5 h-5" />
                                                <span className="text-sm">{option.label}</span>
                                                {theme === option.id && (
                                                    <Check className="w-4 h-4 text-indigo-400" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-slate-400 mb-3">Language</p>
                                    <select
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition appearance-none cursor-pointer"
                                    >
                                        <option value="en" className="bg-slate-800">English</option>
                                        <option value="zh" className="bg-slate-800">中文</option>
                                        <option value="hi" className="bg-slate-800">हिंदी</option>
                                        <option value="es" className="bg-slate-800">Español</option>
                                        <option value="ar" className="bg-slate-800">العربية</option>
                                    </select>
                                </div>
                            </div>
                        </motion.div>

                        {/* Data & Storage Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="glass-card p-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                                    <Download className="w-5 h-5 text-cyan-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Data & Storage</h2>
                                    <p className="text-sm text-slate-400">Manage your data and exports</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition group">
                                    <div className="flex items-center gap-3">
                                        <Download className="w-5 h-5 text-slate-400" />
                                        <div className="text-left">
                                            <p className="text-white font-medium">Export Your Data</p>
                                            <p className="text-sm text-slate-500">Download all your documents and information</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition" />
                                </button>

                                <button className="w-full flex items-center justify-between p-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 transition group border border-red-500/20">
                                    <div className="flex items-center gap-3">
                                        <Trash2 className="w-5 h-5 text-red-400" />
                                        <div className="text-left">
                                            <p className="text-red-400 font-medium">Delete Account</p>
                                            <p className="text-sm text-slate-500">Permanently remove your account and data</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-red-400 group-hover:text-red-300 transition" />
                                </button>
                            </div>
                        </motion.div>

                        {/* Sign Out */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex justify-between items-center"
                        >
                            <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition">
                                <LogOut className="w-5 h-5" />
                                Sign Out
                            </button>
                            <button className="glass-button">
                                Save Changes
                            </button>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
