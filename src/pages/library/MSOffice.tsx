import React, { useState } from "react";
import { 
  Briefcase, 
  History, 
  Layers, 
  FileText, 
  Grid, 
  Tv, 
  Compass, 
  Info,
  AlignLeft,
  RotateCcw,
  Save,
  Type,
  BookOpen,
  MousePointerClick,
  Sliders,
  Sparkles,
  Layers2,
  Cpu,
  Sparkle,
  AlertTriangle,
  ShieldAlert,
} from 'lucide-react';
import { motion, AnimatePresence } from "motion/react";

export default function MSOfficeTopic() {
  const [activeTab, setActiveTab] = useState<"concepts" | "suite" | "future">("concepts");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans p-4 md:p-8 selection:bg-indigo-500/20 overflow-x-hidden antialiased transition-colors duration-300">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-500/[0.015] dark:bg-indigo-500/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/[0.015] dark:bg-sky-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero header */}
        <header className="border border-slate-200 dark:border-slate-900 rounded-3xl p-6 md:p-8 bg-white/60 dark:bg-slate-900/20 backdrop-blur-md shadow-sm dark:shadow-none relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] dark:opacity-10">
            <Sparkle className="w-24 h-24 text-slate-900 dark:text-slate-400" />
          </div>

          <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400 font-mono text-xs tracking-widest uppercase mb-3">
            <Briefcase className="w-4 h-4 animate-pulse" />
            Productivity Suite
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400">
            Microsoft Office Suite
          </h1>

          <p className="text-slate-500 dark:text-slate-400 max-w-3xl text-sm md:text-base leading-relaxed">
            The global benchmark ecosystem for business computing. A completely unified environment engineering document management, multi‑variable analytical spreadsheets, presentation channels, and secure workflow databases.
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-100 dark:border-slate-900">
            <button
              onClick={() => setActiveTab("concepts")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-colors duration-200 ${
                activeTab === "concepts"
                  ? "bg-indigo-600 dark:bg-indigo-500 text-white dark:text-slate-950 shadow-md shadow-indigo-500/10 dark:shadow-indigo-500/20 font-bold scale-105"
                  : "bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              <Layers className="w-4 h-4" /> Core Concepts
            </button>

            <button
              onClick={() => setActiveTab("suite")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-colors duration-200 ${
                activeTab === "suite"
                  ? "bg-sky-600 dark:bg-sky-500 text-white dark:text-slate-950 shadow-md shadow-sky-500/10 dark:shadow-sky-500/20 font-bold scale-105"
                  : "bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              <Cpu className="w-4 h-4" /> Suite Components
            </button>

            <button
              onClick={() => setActiveTab("future")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-colors duration-200 ${
                activeTab === "future"
                  ? "bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 shadow-md shadow-emerald-500/10 dark:shadow-emerald-500/20 font-bold scale-105"
                  : "bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              <Sparkles className="w-4 h-4" /> Safety & Future
            </button>
          </div>

        </header>

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
              {/* Hero workspace image */}
              <div className="rounded-3xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent z-10 pointer-events-none" />
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&auto=format&fit=crop&q=80"
                  alt="Corporate workspace utilizing enterprise applications"
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>

              {/* Timeline block */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 text-slate-600">
                    <History className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-950 dark:text-white">Origins & Unification</h3>
                    <p className="text-xs text-slate-400">Ecosystem Architecture History</p>
                  </div>
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400 space-y-2">
                  <p>
                    Developed by <strong className="text-slate-900 dark:text-white">Microsoft Corporation</strong>, the suite debuted initially in <strong className="text-indigo-600 dark:text-indigo-400">1989 on Macintosh systems</strong> before entering the Windows platform space in 1990.
                  </p>
                  <p className="text-xs text-slate-400">
                    Its core purpose was structural: turning isolated, scattered terminal tools into an entirely cohesive, inter‑compatible workspace pipeline.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: SUITE COMPONENTS */}
          {activeTab === "suite" && (
            <motion.div
              key="suite"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* Component matrix table */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Ecosystem Component Matrices</h2>
                <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-900/80 bg-white dark:bg-slate-900/20">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 dark:bg-slate-900/60">
                        <tr className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-900/60">Application</th>
                          <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-900/60">Type</th>
                          <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-900/60">Purpose</th>
                          <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-900/60">Theme</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-900/40">
                        <tr>
                          <td className="px-4 py-3 text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-blue-500" /> MS Word
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-400">Document Processing</td>
                          <td className="px-4 py-3 text-slate-500 dark:text-slate-400">Corporate reports and document engineering.</td>
                          <td className="px-4 py-3 text-blue-600 dark:text-blue-400 text-xs">Classic Blue</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" /> MS Excel
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-400">Data Analytics</td>
                          <td className="px-4 py-3 text-slate-500 dark:text-slate-400">Algorithmic matrices, charting, and multi‑variable logic.</td>
                          <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 text-xs">Emerald Green</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-orange-500" /> MS PowerPoint
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-400">Media Presentation</td>
                          <td className="px-4 py-3 text-slate-500 dark:text-slate-400">Visual deck sequencing and transition management.</td>
                          <td className="px-4 py-3 text-orange-500 dark:text-orange-400 text-xs">Vibrant Orange</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-sky-500" /> MS Outlook
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-400">Communication Node</td>
                          <td className="px-4 py-3 text-slate-500 dark:text-slate-400">Enterprise asynchronous mail routing and calendaring.</td>
                          <td className="px-4 py-3 text-sky-500 dark:text-sky-400 text-xs">Sky Blue</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-red-500" /> MS Access
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-400">Relational Database</td>
                          <td className="px-4 py-3 text-slate-500 dark:text-slate-400">Local desktop relational tables and entry tracking.</td>
                          <td className="px-4 py-3 text-red-500 dark:text-red-400 text-xs">Crimson Red</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-purple-500" /> MS OneNote
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-400">Information Capture</td>
                          <td className="px-4 py-3 text-slate-500 dark:text-slate-400">Unstructured digital logs and shared project notes.</td>
                          <td className="px-4 py-3 text-purple-600 dark:text-purple-400 text-xs">Deep Purple</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-indigo-500" /> MS Teams
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-400">Collaboration Hub</td>
                          <td className="px-4 py-3 text-slate-500 dark:text-slate-400">Synchronous voice conferencing, chat channels, and spaces.</td>
                          <td className="px-4 py-3 text-indigo-600 dark:text-indigo-400 text-xs">Indigo</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-cyan-500" /> MS OneDrive
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-400">Cloud Repository</td>
                          <td className="px-4 py-3 text-slate-500 dark:text-slate-400">Distributed multi‑tenant synchronization and online assets.</td>
                          <td className="px-4 py-3 text-cyan-600 dark:text-cyan-400 text-xs">Cyan Blue</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Word features grid */}
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { icon: AlignLeft, title: "Typographical Alignment", desc: "Arranges continuous layout strings across margins via left, right, centered, or justified spacing rules." },
                  { icon: Compass, title: "Canvas Orientation", desc: "Alters printing engine canvas bounds between standard vertical portrait and wide horizontal landscape views." },
                  { icon: Save, title: "Serialization Storage", desc: "Encodes deep markup models into `.docx` packages and static shared `.pdf` formats." },
                  { icon: Type, title: "Vector Formatting Engines", desc: "Applies style tags including absolute text heights, emphasis weights, and fine line tracking rules." },
                ].map((f) => {
                  const Icon = f.icon;
                  return (
                    <div
                      key={f.title}
                      className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 text-blue-500">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white">{f.title}</h3>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">{f.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Excel features grid */}
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { icon: BookOpen, title: "Data Workbooks", desc: "High‑level repository container packaging multiple discrete grid layers into single data assets." },
                  { icon: Layers, title: "Coordinate Cell Blocks", desc: "Atomic intersection mapping alpha columns to numerical array index rows." },
                  { icon: Info, title: "Equation Formula Bar", desc: "Interface box used to parse, correct, and input custom functional code loops." },
                  { icon: MousePointerClick, title: "Macro Fill Handles", desc: "Rapid‑action mouse cursor target designed to replicate data sequences automatically." },
                ].map((f) => {
                  const Icon = f.icon;
                  return (
                    <div
                      key={f.title}
                      className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 text-emerald-500">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white">{f.title}</h3>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">{f.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* PowerPoint features grid */}
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { icon: FileText, title: "Presentation Slides", desc: "Discrete canvas steps hosting specific structural vector groupings per slide." },
                  { icon: Layers, title: "Sequential Presentation", desc: "Organized slide bundles compiled systematically to build narrative visual paths." },
                  { icon: Sliders, title: "Canvas Transitions", desc: "Hardware‑accelerated layout animations bridging slide viewport adjustments." },
                  { icon: Sparkles, title: "Node Animations", desc: "Dynamic vector effects applied to individual assets nested inside static pages." },
                ].map((f) => {
                  const Icon = f.icon;
                  return (
                    <div
                      key={f.title}
                      className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 text-orange-500">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white">{f.title}</h3>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">{f.desc}</p>
                    </div>
                  );
                })}
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
              {/* Advantages & limitations */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm space-y-3">
                  <h3 className="text-sm font-bold text-emerald-500 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Core Advantages
                  </h3>
                  <ul className="text-xs text-slate-400 space-y-2 list-inside">
                    <li>• Rapid document creation and revision workflows.</li>
                    <li>• Inter‑app data sharing between Word, Excel, and PowerPoint.</li>
                    <li>• Deep integration with cloud services (OneDrive, Teams, SharePoint).</li>
                    <li>• Industry‑standard formats ensuring global compatibility.</li>
                  </ul>
                </div>
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm space-y-3">
                  <h3 className="text-sm font-bold text-amber-500 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Main Limitations
                  </h3>
                  <ul className="text-xs text-slate-400 space-y-2 list-inside">
                    <li>• High‑learning curve for advanced Excel and VBA patterns.</li>
                    <li>• Licensing and version‑specific behavior differences.</li>
                    <li>• Cloud‑reliant workflows may suffer without strong connectivity.</li>
                    <li>• Template‑heavy workflows can reduce creative flexibility.</li>
                  </ul>
                </div>
              </div>

              {/* Security & architecture card */}
              <div className="rounded-3xl border border-red-100 dark:border-red-950/40 bg-red-50/30 dark:bg-red-950/10 p-6 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5" />
                  Security Configurations
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Modern Office 365/Microsoft 365 environments introduce shared cloud folders, real‑time collaboration, and conditional‑access policies, which require tight data‑class labels and authentication hygiene.
                </p>
              </div>

              {/* Video section */}
              <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Info className="w-4 h-4 text-slate-500" />
                  Watch: Microsoft Office Suite Overview
                </h3>
                <p className="text-xs text-slate-400">
                  This video breaks down how the Microsoft Office Suite works and how it is used to create and manage documents, spreadsheets, and presentations.
                </p>
                <div className="aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-slate-900 shadow-inner">
                  <iframe
                    className="w-full h-full rounded-[inherit]"
                    src="https://www.youtube.com/embed/ZXAPCy2c33o"
                    title="Microsoft Office Suite overview"
                    allowFullScreen
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global summary banner */}
        <section className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-900 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950/50 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 p-6 text-slate-100 dark:text-slate-900 pointer-events-none">
            <Layers2 className="h-24 w-24 stroke-[3]" />
          </div>
          <div className="max-w-3xl relative z-10 space-y-2">
            <h3 className="text-sm font-bold tracking-wider font-mono uppercase text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
              <Layers2 className="w-4 h-4" />
              Office Ecosystem Summary
            </h3>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              The Microsoft Office ecosystem remains an essential pillar of global corporate communication and data management operations. From building simple print layouts to tracking advanced relational data variables in cloud networks, deep mastery of this suite forms the baseline foundation of professional computer literacy.
            </p>
          </div>
        </section>

        <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 dark:text-slate-600 pt-4 border-t border-slate-200 dark:border-slate-900">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-ping mr-1" />
            MICROSOFT OFFICE SUITE
          </div>
        </footer>
      </div>
    </div>
  );
}