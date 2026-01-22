"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Phone,
  FileText,
  Youtube,
  Shield,
  Users,
  TrendingUp,
  Star,
  ChevronRight,
  Globe,
} from "lucide-react";

// Animation variants - simplified and faster
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="nav-sticky px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-900 flex items-center justify-center text-white">
              <Globe className="w-6 h-6" />
            </div>
            <span className="text-2xl font-serif font-bold text-slate-900">YourVisaSite</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
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
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/login')}
              className="text-slate-600 font-medium hover:text-indigo-900 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => router.push('/login')}
              className="btn-primary"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-900 border border-blue-100 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-sm font-semibold">
                Trusted by 10,000+ Visa Applicants
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold leading-tight mb-8 text-slate-900 font-serif"
            >
              Navigate Your <br />
              <span className="text-indigo-800">Australian Visa</span> Journey
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed"
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
                className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl"
              >
                <Search className="w-5 h-5" />
                Explore Visas
              </button>
              <button
                onClick={() => router.push('/lawyers')}
                className="btn-secondary text-lg px-8 py-4 bg-white"
              >
                <Phone className="w-5 h-5 text-indigo-900" />
                Quick Consult
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
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
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 mb-4 text-indigo-900">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 font-serif">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-6 font-serif">
              Everything You Need
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              A complete visa intelligence platform designed for the modern applicant
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "Smart Visa Search",
                description:
                  "AI-powered search with keyword and subclass prediction to find your perfect visa category instantly.",
                color: "text-blue-600",
                bg: "bg-blue-50",
                link: "/user/visas"
              },
              {
                icon: TrendingUp,
                title: "Live Tracker",
                description:
                  "Real-time processing times crowdsourced from the community with verified lawyer data.",
                color: "text-emerald-600",
                bg: "bg-emerald-50",
                link: "/tracker"
              },
              {
                icon: FileText,
                title: "Document Vault",
                description:
                  "Secure cloud storage for your visa documents with intelligent folder organization.",
                color: "text-amber-600",
                bg: "bg-amber-50",
                link: "/user/documents"
              },
              {
                icon: Phone,
                title: "Quick Consult",
                description:
                  "Book video consultations with verified immigration lawyers in just one click.",
                color: "text-indigo-600",
                bg: "bg-indigo-50",
                link: "/lawyers"
              },
              {
                icon: Youtube,
                title: "Expert Insights",
                description:
                  "Curated feed of the latest visa news and lawyer YouTube updates.",
                color: "text-rose-600",
                bg: "bg-rose-50",
                link: "/news"
              },
              {
                icon: Shield,
                title: "Premium Access",
                description:
                  "Unlock detailed application guides with document examples for $49 per visa.",
                color: "text-violet-600",
                bg: "bg-violet-50",
                link: "/user/visas"
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => router.push(feature.link)}
                className="card p-8 group cursor-pointer hover:-translate-y-1 bg-white"
              >
                <div
                  className={`w-14 h-14 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}
                >
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-serif">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center text-indigo-700 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-indigo-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif">
              Start Your Visa Journey Today
            </h2>
            <p className="text-xl text-indigo-200 mb-10 max-w-2xl mx-auto">
              Join thousands of successful visa applicants who trusted YourVisaSite to
              guide them through the process.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => router.push('/login')}
                className="bg-white text-indigo-900 px-10 py-5 rounded-lg font-bold hover:bg-indigo-50 transition-colors shadow-lg"
              >
                Get Started Free
              </button>
              <button
                onClick={() => router.push('/user/visas')}
                className="bg-transparent border border-indigo-400 text-white px-10 py-5 rounded-lg font-bold hover:bg-indigo-800 transition-colors"
              >
                View Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-800 flex items-center justify-center text-white">
              <Globe className="w-4 h-4" />
            </div>
            <span className="text-lg font-serif font-bold text-white">YourVisaSite</span>
          </div>
          <p className="text-sm">
            © 2026 YourVisaSite. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm hover:text-white transition">
              Privacy
            </Link>
            <Link href="#" className="text-sm hover:text-white transition">
              Terms
            </Link>
            <Link href="#" className="text-sm hover:text-white transition">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
