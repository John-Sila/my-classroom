import React, { useState } from "react";
import {
  Laptop,
  Globe,
  GraduationCap,
  BookOpen,
  Video,
  Users,
  ShieldAlert,
  Wifi,
  Cloud,
  Database,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  Computer,
  Cpu,
  Layers,
  Sparkle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ELearningTopic() {
  const [activeTab, setActiveTab] = useState<"concepts" | "platforms" | "future">("concepts");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans p-4 md:p-8 selection:bg-indigo-500/20 overflow-x-hidden antialiased transition-colors duration-300">
      {/* --- Ambient glows --- */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-500/[0.015] dark:bg-indigo-500/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/[0.015] dark:bg-sky-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* --- Main wrapper --- */}
      <div className="max-w-6xl mx-auto space-y-8">
        {/* --- Hero header --- */}
        <header className="border border-slate-200 dark:border-slate-900 rounded-3xl p-6 md:p-8 bg-white/60 dark:bg-slate-900/20 backdrop-blur-md shadow-sm dark:shadow-none relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] dark:opacity-10">
            <Sparkle className="w-24 h-24 text-slate-900 dark:text-slate-400" />
          </div>

          <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400 font-mono text-xs tracking-widest uppercase mb-3">
            <Globe className="w-4 h-4 animate-pulse" />
            Digital Education Ecosystem
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400">
            E-Learning Systems
          </h1>

          <p className="text-slate-500 dark:text-slate-400 max-w-3xl text-sm md:text-base leading-relaxed">
            The structured delivery of education through digital systems, where teaching,
            assessment, and collaboration occur over networked platforms instead of physical classrooms.
          </p>

          {/* --- Tabs --- */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-100 dark:border-slate-900">
            <button
              onClick={() => setActiveTab("concepts")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-colors duration-200 ${
                activeTab === "concepts"
                  ? "bg-indigo-600 dark:bg-indigo-500 text-white dark:text-slate-950 shadow-md shadow-indigo-500/10 dark:shadow-indigo-500/20 font-bold scale-105"
                  : "bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              <BookOpen className="w-4 h-4" /> Core Concepts
            </button>

            <button
              onClick={() => setActiveTab("platforms")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-colors duration-200 ${
                activeTab === "platforms"
                  ? "bg-sky-600 dark:bg-sky-500 text-white dark:text-slate-950 shadow-md shadow-sky-500/10 dark:shadow-sky-500/20 font-bold scale-105"
                  : "bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              <Laptop className="w-4 h-4" /> Platforms & Flows
            </button>

            <button
              onClick={() => setActiveTab("future")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-colors duration-200 ${
                activeTab === "future"
                  ? "bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 shadow-md shadow-emerald-500/10 dark:shadow-emerald-500/20 font-bold scale-105"
                  : "bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              <Cloud className="w-4 h-4" /> Safety & Future
            </button>
          </div>

        </header>

        {/* --- Animated tabs --- */}
        <AnimatePresence mode="wait">
          {/* TAB 1: CORE CONCEPTS */}
          {activeTab === "concepts" && (
            <motion.div
              key="concepts"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* Intro card */}
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm dark:shadow-none">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-indigo-500" />
                  What “E‑Learning” Actually Means
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  The “E” stands for <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">Electronic</strong>. At its core, it replaces physical proximity with high-speed networked accessibility.
                </p>
              </div>

              {/* Pillar boxes */}
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: Video,
                    title: "Content Delivery",
                    desc: "Lessons delivered through high‑definition videos, slides, interactive simulations, and modular nodes.",
                  },
                  {
                    icon: Users,
                    title: "Interaction Layer",
                    desc: "Instant message streams, collaborative community boards, and real-time virtual breakout sessions.",
                  },
                  {
                    icon: GraduationCap,
                    title: "Assessment Systems",
                    desc: "Dynamic testing matrices, direct file‑drop assignments, and automated grading pipelines.",
                  },
                ].map((b) => {
                  const Icon = b.icon;
                  return (
                    <div
                      key={b.title}
                      className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 space-y-3 shadow-sm dark:shadow-none hover:bg-white dark:hover:bg-slate-900/40 transition-colors"
                    >
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 text-indigo-500 w-fit">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-950 dark:text-white tracking-tight">{b.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Hero image block */}
              <div className="group relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900 shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent z-10 pointer-events-none" />
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&auto=format&fit=crop&q=80"
                  className="w-full h-60 md:h-80 object-cover rounded-[inherit]"
                  alt="E-learning environment"
                />
              </div>
            </motion.div>
          )}

          {/* TAB 2: PLATFORMS & FLOWS */}
          {activeTab === "platforms" && (
            <motion.div
              key="platforms"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Laptop className="w-5 h-5 text-blue-500" />
                  Platforms & Learning Environments
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Operating on layered infrastructures ranging from internal institutional portals to global marketplaces.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  {
                    name: "Google Classroom",
                    img: "https://gdm-catalog-fmapi-prod.imgix.net/ProductScreenshot/1bc27c73-86b9-4b1f-bdeb-99d5b72cadd4.webp?w=600&auto=format&fit=crop&q=80",
                    desc: "School‑centered assignment workflows and document management pipelines.",
                  },
                  {
                    name: "Moodle",
                    img: "https://www.dodwellsolutions.com/wp-content/uploads/2020/05/moodle-e-learning.png?w=600&auto=format&fit=crop&q=80",
                    desc: "Robust open‑source LMS frameworks designed for high‑structure academic environments.",
                  },
                  {
                    name: "Coursera / Udemy",
                    img: "https://media.apptunix.com/wp-content/uploads/sites/3/2022/07/29112006/banner-22.png?w=600&auto=format&fit=crop&q=80",
                    desc: "Massive scale, commercial self‑paced catalogs serving millions globally.",
                  },
                  {
                    name: "Zoom / Teams",
                    img: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Tel_Aviv_-_Wikipedia%27s_20th_Birthday_celebration_-_ZOOM_meeting_due_to_COVID-19_5.png?w=600&auto=format&fit=crop&q=80",
                    desc: "High‑concurrency synchronous audio, video, and live screen interaction spaces.",
                  },
                ].map((p) => (
                  <div
                    key={p.name}
                    className="group rounded-2xl border border-slate-200 dark:border-slate-900/80 overflow-hidden bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="h-28 w-full overflow-hidden">
                      <img
                        src={p.img}
                        className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                        alt={p.name}
                      />
                    </div>
                    <div className="p-4 space-y-1">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white tracking-tight">{p.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: SAFETY & FUTURE */}
          {activeTab === "future" && (
            <motion.div
              key="future"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* Pros & cons */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    Core Structural Advantages
                  </h2>
                  {[
                    "Global accessibility detached from physical geolocation constraints.",
                    "Highly granular, self‑paced learning timelines.",
                    "Drastic reductions in brick‑and‑mortar overhead costs.",
                    "Elastic scalability capable of serving massive student volumes.",
                  ].map((x, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-900 text-sm border-l-4 border-l-emerald-500 bg-white dark:bg-slate-900/20 shadow-2xs hover:pl-5 transition-all duration-200"
                    >
                      {x}
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    Limitations & Systemic Tradeoffs
                  </h2>
                  {[
                    "Diluted contextual nuances compared to face‑to‑face social integration.",
                    "Strict absolute dependence on localized network access.",
                    "Significantly higher intrinsic baseline requirements for self‑regulation.",
                    "Elevated cognitive fatigue and fragmented user attention spans.",
                  ].map((x, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-900 text-sm border-l-4 border-l-amber-500 bg-white dark:bg-slate-900/20 shadow-2xs hover:pl-5 transition-all duration-200"
                    >
                      {x}
                    </div>
                  ))}
                </div>
              </div>

              {/* Security risks card */}
              <div className="rounded-3xl border border-red-100 dark:border-red-950/40 bg-red-50/30 dark:bg-red-950/10 p-6 shadow-sm">
                <div className="space-y-1">
                  <h2 className="text-sm font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5" />
                    Security Configurations & Risk Vectors
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Transitioning architecture to cloud environments natively introduces common internet ecosystem vulnerabilities.
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-3 pt-3">
                  {[
                    {
                      title: "Data Privacy Exposure",
                      desc: "Encryption weaknesses exposing student data matrices and behavioral analytics tracking hooks.",
                    },
                    {
                      title: "Platform Monopolies",
                      desc: "Heavy architectural lock‑in dependencies tied to external third‑party core software vendors.",
                    },
                    {
                      title: "Integrity Enforcement",
                      desc: "Complex identity validation and mitigation structures to guard against automated credential cheating.",
                    },
                  ].map((r, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-red-200/40 dark:border-red-900/30 bg-white dark:bg-slate-900/80 shadow-2xs"
                    >
                      <h4 className="text-sm font-semibold text-slate-950 dark:text-white mb-1">{r.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{r.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Future direction + video */}
              <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-900 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950/50 shadow-sm">
                <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2 mb-2">
                  <Cloud className="w-4 h-4 text-sky-500" />
                  Future System Architecture
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                  Modern infrastructure setups are continuously shifting away from fixed, pre‑rendered static paths toward live,{" "}
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">AI‑driven adaptive learning layers</span>. These ecosystems balance real‑time user performance metrics against structural patterns to rebuild paths on the fly.
                </p>

                <div className="mb-4 text-[11px] font-mono">
                  <span className="text-slate-400 line-through">Static individual course delivery packages</span>
                  <span className="text-indigo-500 mx-2 font-bold">→</span>
                  <span className="bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md text-slate-900 dark:text-indigo-400 font-semibold">
                    Predictive, telemetry‑driven micro‑learning instances
                  </span>
                </div>

                {/* Video card */}
                <div className="space-y-3">
                  <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Computer className="w-4 h-4 text-slate-500" />
                    Interactive Visual Walkthrough
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Watch this video demonstrating the inner workings of a modern e‑learning platform, showcasing content delivery and interaction layers in action.
                  </p>
                  <div className="aspect-video rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-900 shadow-inner">
                    <iframe
                      className="w-full h-full rounded-[inherit]"
                      src="https://www.youtube.com/embed/ZPs3URGs0KQ"
                      title="Data flow explanation guide video"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Global summary --- */}
        <section className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-900 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 relative overflow-hidden shadow-sm dark:shadow-none">
          <div className="absolute top-0 right-0 p-6 text-slate-100 dark:text-slate-900 pointer-events-none">
            <Layers className="h-24 w-24 stroke-3" />
          </div>
          <div className="max-w-3xl relative z-10 space-y-2">
            <h3 className="text-sm font-bold tracking-wider font-mono uppercase text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              E‑Learning Landscape Summary
            </h3>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              E‑learning platforms replace physical classrooms with networked digital environments, enabling flexible, scalable, and data‑rich education at the cost of higher dependency on connectivity and self‑discipline.
            </p>
          </div>
        </section>

        <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 dark:text-slate-600 pt-4 border-t border-slate-200 dark:border-slate-900">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping mr-1" />
            E‑LEARNING
          </div>
        </footer>

      </div>
    </div>
  );
}