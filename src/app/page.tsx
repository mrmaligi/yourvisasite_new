"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Phone,
  FileText,
  Youtube,
  ArrowRight,
  Sparkles,
  Shield,
  Users,
  TrendingUp,
  Star,
  ChevronRight,
} from "lucide-react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const floatAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      {/* Mesh Background */}
      <div className="mesh-background" />

      {/* Navigation */}
      <nav className="nav-glass fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">VisaIQ</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center gap-8"
          >
            <Link href="/user/dashboard" className="nav-link text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/user/visas" className="nav-link text-sm font-medium">
              Visas
            </Link>
            <Link href="/tracker" className="nav-link text-sm font-medium">
              Tracker
            </Link>
            <Link href="/lawyers" className="nav-link text-sm font-medium">
              Lawyers
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <button
              onClick={() => router.push('/login')}
              className="glass-button-secondary text-sm py-3 px-6"
            >
              Sign In
            </button>
            <button
              onClick={() => router.push('/login')} // Redirect to login to get started
              className="glass-button text-sm py-3 px-6"
            >
              Get Started
            </button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        {/* Floating Orbs */}
        <motion.div
          animate={floatAnimation}
          className="absolute top-32 left-20 w-72 h-72 rounded-full bg-indigo-600/20 blur-3xl"
        />
        <motion.div
          animate={{ ...floatAnimation, transition: { ...floatAnimation.transition, delay: 2 } }}
          className="absolute top-64 right-20 w-96 h-96 rounded-full bg-purple-600/15 blur-3xl"
        />
        <motion.div
          animate={{ ...floatAnimation, transition: { ...floatAnimation.transition, delay: 4 } }}
          className="absolute bottom-20 left-1/3 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl"
        />

        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-slate-300">
                Trusted by 10,000+ Visa Applicants
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8"
            >
              <span className="text-white">Navigate Your</span>
              <br />
              <span className="gradient-text glow-text">Australian Visa</span>
              <br />
              <span className="text-white">Journey</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Real-time tracking, expert lawyer consultations, and intelligent
              document guidance — all in one premium platform.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={() => router.push('/user/visas')}
                className="glass-button flex items-center gap-2 text-lg px-8 py-4"
              >
                <Search className="w-5 h-5" />
                Explore Visas
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => router.push('/lawyers')}
                className="glass-button-secondary flex items-center gap-2 text-lg px-8 py-4"
              >
                <Phone className="w-5 h-5" />
                Quick Consult
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 md:p-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "200+", label: "Visa Categories", icon: FileText },
                { value: "5,000+", label: "Cases Tracked", icon: TrendingUp },
                { value: "150+", label: "Expert Lawyers", icon: Users },
                { value: "4.9", label: "User Rating", icon: Star },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 mb-4">
                    <stat.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything You Need
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A complete visa intelligence platform designed for the modern applicant
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Search,
                title: "Smart Visa Search",
                description:
                  "AI-powered search with keyword and subclass prediction to find your perfect visa category instantly.",
                gradient: "from-indigo-500 to-blue-600",
                link: "/user/visas"
              },
              {
                icon: TrendingUp,
                title: "Live Tracker",
                description:
                  "Real-time processing times crowdsourced from the community with verified lawyer data.",
                gradient: "from-purple-500 to-pink-600",
                link: "/tracker"
              },
              {
                icon: FileText,
                title: "Document Vault",
                description:
                  "Secure cloud storage for your visa documents with intelligent folder organization.",
                gradient: "from-cyan-500 to-teal-600",
                link: "/user/documents"
              },
              {
                icon: Phone,
                title: "Quick Consult",
                description:
                  "Book video consultations with verified immigration lawyers in just one click.",
                gradient: "from-orange-500 to-amber-600",
                link: "/lawyers"
              },
              {
                icon: Youtube,
                title: "Expert Insights",
                description:
                  "Curated feed of the latest visa news and lawyer YouTube updates.",
                gradient: "from-red-500 to-rose-600",
                link: "/news"
              },
              {
                icon: Shield,
                title: "Premium Access",
                description:
                  "Unlock detailed application guides with document examples for $49 per visa.",
                gradient: "from-emerald-500 to-green-600",
                link: "/user/visas"
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => router.push(feature.link)}
                className="glass-card p-8 group cursor-pointer"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center text-indigo-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-12 md:p-16 text-center relative overflow-hidden"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Start Your Visa Journey Today
              </h2>
              <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                Join thousands of successful visa applicants who trusted VisaIQ to
                guide them through the process.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => router.push('/login')}
                  className="glass-button text-lg px-10 py-5"
                >
                  Get Started Free
                </button>
                <button
                  onClick={() => router.push('/user/visas')}
                  className="glass-button-secondary text-lg px-10 py-5"
                >
                  View Demo
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-white">VisaIQ</span>
          </div>
          <p className="text-sm text-slate-500">
            © 2026 VisaIQ. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-slate-400 hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="text-sm text-slate-400 hover:text-white transition">
              Terms
            </a>
            <a href="#" className="text-sm text-slate-400 hover:text-white transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
