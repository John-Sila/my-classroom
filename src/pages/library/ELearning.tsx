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
  Layers
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ELearningTopic() {
  const [activeTab, setActiveTab] = useState<"concepts" | "platforms" | "future">("concepts");

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 space-y-8 antialiased selection:bg-indigo-500/20 text-slate-600 dark:text-slate-300">
      
      {/* Header */}
      <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400 font-mono text-xs tracking-widest uppercase">
          <Globe className="w-4 h-4 animate-pulse" />
          Digital Education Ecosystem
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-950 dark:text-white">
          E-Learning Systems
        </h1>
        <p className="text-sm md:text-base text-slate-400 dark:text-slate-500 max-w-3xl leading-relaxed">
          The structured delivery of education through digital systems, where teaching, assessment, and collaboration occur over networked platforms instead of physical classrooms.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 pt-4">
          {[
            { id: "concepts", label: "Core Concepts", icon: BookOpen, color: "indigo" },
            { id: "platforms", label: "Platforms & Flows", icon: Laptop, color: "sky" },
            { id: "future", label: "Safety & Future", icon: Cloud, color: "emerald" }
          ].map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-medium transition-all ${
                  active
                    ? `bg-${t.color}-600 dark:bg-${t.color}-500 text-white shadow-md shadow-${t.color}-500/20 font-bold scale-105`
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* TAB 1: CORE CONCEPTS */}
        {activeTab === "concepts" && (
          <motion.div
            key="concepts"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* Intro */}
            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-indigo-500" />
                What "E-Learning" Actually Means
              </h2>
              <p className="text-sm text-slate-400 dark:text-slate-500">
                The "E" stands for <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">Electronic</strong>. At its core, it replaces physical proximity with high-speed networked accessibility.
              </p>
            </div>

            {/* Pillars */}
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: Video,
                  title: "Content Delivery",
                  desc: "Lessons delivered through high-definition videos, slides, interactive simulations, and modular nodes."
                },
                {
                  icon: Users,
                  title: "Interaction Layer",
                  desc: "Instant message streams, collaborative community boards, and real-time virtual breakout sessions."
                },
                {
                  icon: GraduationCap,
                  title: "Assessment Systems",
                  desc: "Dynamic testing matrices, direct file-drop assignments, and automated grading pipelines."
                }
              ].map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.title}
                    className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-5 shadow-sm space-y-3 hover:bg-white dark:hover:bg-slate-900/60 transition-colors"
                  >
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-indigo-500 w-fit">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-950 dark:text-white tracking-tight">{b.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Hero Image */}
            <div className="group relative rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent z-10 pointer-events-none" />
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&auto=format&fit=crop&q=80"
                className="w-full h-60 md:h-80 object-cover rounded-[inherit]"
                alt="E-learning environment"
              />
            </div>
          </motion.div>
        )}

        {/* TAB 2: PLATFORMS */}
        {activeTab === "platforms" && (
          <motion.div
            key="platforms"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                <Laptop className="w-5 h-5 text-blue-500" />
                Platforms & Learning Environments
              </h2>
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                Operating on layered infrastructures ranging from internal institutional portals to global marketplaces.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  name: "Google Classroom",
                  img: "https://gdm-catalog-fmapi-prod.imgix.net/ProductScreenshot/1bc27c73-86b9-4b1f-bdeb-99d5b72cadd4.webp?w=600&auto=format&fit=crop&q=80",
                  desc: "School-centered assignment workflows and document management pipelines."
                },
                {
                  name: "Moodle",
                  img: "https://www.dodwellsolutions.com/wp-content/uploads/2020/05/moodle-e-learning.png?w=600&auto=format&fit=crop&q=80",
                  desc: "Robust open-source LMS frameworks designed for high-structure academic environments."
                },
                {
                  name: "Coursera / Udemy",
                  img: "https://media.apptunix.com/wp-content/uploads/sites/3/2022/07/29112006/banner-22.png?w=600&auto=format&fit=crop&q=80",
                  desc: "Massive scale, commercial self-paced catalogs serving millions globally."
                },
                {
                  name: "Zoom / Teams",
                  img: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Tel_Aviv_-_Wikipedia%27s_20th_Birthday_celebration_-_ZOOM_meeting_due_to_COVID-19_5.png?w=600&auto=format&fit=crop&q=80",
                  desc: "High-concurrency synchronous audio, video, and live screen interaction spaces."
                }
              ].map((p) => (
                <div
                  key={p.name}
                  className="group rounded-2xl border border-slate-200/60 dark:border-slate-800/80 overflow-hidden bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="h-28 w-full overflow-hidden">
                    <img
                      src={p.img}
                      className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                      alt={p.name}
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <h4 className="font-bold text-sm text-slate-950 dark:text-white tracking-tight">{p.name}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 3: FUTURE & SAFETY */}
        {activeTab === "future" && (
          <motion.div
            key="future"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* Pros & Cons */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  Core Structural Advantages
                </h2>
                {[
                  "Global accessibility detached from physical geolocation constraints.",
                  "Highly granular, self-paced learning timelines.",
                  "Drastic reductions in brick-and-mortar overhead costs.",
                  "Elastic scalability capable of serving massive student volumes."
                ].map((x, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/80 text-sm border-l-4 border-l-emerald-500 bg-white dark:bg-slate-900/40 hover:pl-5 transition-all duration-200"
                  >
                    {x}
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Limitations & Systemic Tradeoffs
                </h2>
                {[
                  "Diluted contextual nuances compared to face-to-face social integration.",
                  "Strict absolute dependence on localized network access.",
                  "Significantly higher intrinsic baseline requirements for self-regulation.",
                  "Elevated cognitive fatigue and fragmented user attention spans."
                ].map((x, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/80 text-sm border-l-4 border-l-amber-500 bg-white dark:bg-slate-900/40 hover:pl-5 transition-all duration-200"
                  >
                    {x}
                  </div>
                ))}
              </div>
            </div>

            {/* Security Risks */}
            <div className="rounded-3xl border border-red-200/40 dark:border-red-900/30 bg-red-50/30 dark:bg-red-950/10 p-6 shadow-sm">
              <div className="space-y-1">
                <h2 className="text-sm font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5" />
                  Security Configurations & Risk Vectors
                </h2>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Transitioning architecture to cloud environments natively introduces common internet ecosystem vulnerabilities.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-3 pt-3">
                {[
                  {
                    title: "Data Privacy Exposure",
                    desc: "Encryption weaknesses exposing student data matrices and behavioral analytics tracking hooks."
                  },
                  {
                    title: "Platform Monopolies",
                    desc: "Heavy architectural lock-in dependencies tied to external third-party core software vendors."
                  },
                  {
                    title: "Integrity Enforcement",
                    desc: "Complex identity validation and mitigation structures to guard against automated credential cheating."
                  }
                ].map((r, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-red-200/40 dark:border-red-900/30 bg-white dark:bg-slate-900/80 shadow-sm"
                  >
                    <h4 className="text-sm font-semibold text-slate-950 dark:text-white mb-1">{r.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Future Direction */}
            <div className="rounded-3xl border border-slate-200/60 dark:border-slate-800/80 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950/50 p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2 mb-2">
                <Cloud className="w-4 h-4 text-sky-500" />
                Future System Architecture
              </h2>
              <p className="text-sm text-slate-400 dark:text-slate-500 mb-4 leading-relaxed">
                Modern infrastructure setups are continuously shifting away from fixed, pre-rendered static paths toward live,{" "}
                <span className="text-indigo-600 dark:text-indigo-400 font-medium">AI-driven adaptive learning layers</span>. These ecosystems balance real-time user performance metrics against structural patterns to rebuild paths on the fly.
              </p>

              <div className="mb-4 text-[11px] font-mono">
                <span className="text-slate-400 line-through">Static individual course delivery packages</span>
                <span className="text-indigo-500 mx-2 font-bold">→</span>
                <span className="bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md text-slate-950 dark:text-indigo-400 font-semibold">
                  Predictive, telemetry-driven micro-learning instances
                </span>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <Computer className="w-4 h-4 text-slate-500" />
                  Interactive Visual Walkthrough
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Watch this video demonstrating the inner workings of a modern e-learning platform, showcasing content delivery and interaction layers in action.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary */}
      <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950/50 p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 text-slate-100 dark:text-slate-900 pointer-events-none">
          <Layers className="h-24 w-24 stroke-[3]" />
        </div>
        <div className="max-w-3xl relative z-10 space-y-2">
          <h3 className="text-sm font-bold tracking-wider font-mono uppercase text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            E-Learning Landscape Summary
          </h3>
          <p className="text-xs md:text-sm text-slate-400 dark:text-slate-500 leading-relaxed">
            E-learning platforms replace physical classrooms with networked digital environments, enabling flexible, scalable, and data-rich education at the cost of higher dependency on connectivity and self-discipline.
          </p>
        </div>
      </div>

      {/* YouTube Video */}
      <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-inner border border-slate-200/60 dark:border-slate-800/80">
        <iframe
          className="w-full h-full opacity-90"
          src="https://www.youtube.com/embed/ZPs3URGs0KQ"
          title="What is eLearning?"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      {/* Footer */}
      <footer className="flex items-center gap-1 text-xs font-mono text-slate-400 dark:text-slate-600 pt-4 border-t border-slate-200 dark:border-slate-800">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
        E-LEARNING
      </footer>
    </div>
  );
}