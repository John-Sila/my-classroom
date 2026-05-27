import React, { useState } from "react";
import {
  Code2,
  Brain,
  Search,
  PenTool,
  Bug,
  FileText,
  RefreshCw,
  BookOpen,
  Layers,
  Cpu,
  Globe,
  Database,
  Terminal,
  Braces,
  Binary,
  Workflow,
  Lightbulb,
  ShieldCheck,
  Activity,
  Sparkle,
  Maximize2,
  Minimize2,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- Interfaces ---
interface CodingStep {
  icon: React.ComponentType<any>;
  title: string;
  desc: string;
  phase: string;
}

interface Language {
  icon: React.ComponentType<any>;
  name: string;
  desc: string;
  paradigm: string;
  accentClass: string;
}

export default function CodingFundamentals() {
  const [activeTab, setActiveTab] = useState<'lifecycle' | 'languages' | 'media'>('lifecycle');
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const [langSearch, setLangSearch] = useState<string>("");

  // --- Complete Structural Data Matrix ---
  const codingSteps: CodingStep[] = [
    {
      icon: Brain,
      title: "Identify the Problem",
      desc: "Understand what needs to be solved. Define requirements, constraints, and expected output clearly before writing any code.",
      phase: "Analysis"
    },
    {
      icon: Lightbulb,
      title: "Design the Solution",
      desc: "Plan the logic, structure, and approach. Break the problem into smaller manageable parts and design an algorithmic strategy.",
      phase: "Architecture"
    },
    {
      icon: PenTool,
      title: "Write the Code",
      desc: "Translate the solution into a target programming language using correct syntax rules, logical operators, and state control structures.",
      phase: "Implementation"
    },
    {
      icon: Bug,
      title: "Test the Program",
      desc: "Run the program through edge-case inputs to check for compilation errors, memory leaks, and runtime anomalies.",
      phase: "Quality Assurance"
    },
    {
      icon: FileText,
      title: "Documentation",
      desc: "Write clean technical documentation detailing API specs, setup rules, architecture choices, and logic maps for future maintainers.",
      phase: "Maintenance"
    },
  ];

  const languages: Language[] = [
    { icon: Code2, name: "Python", desc: "Simple, readable, widely used in artificial intelligence, data engineering, and automation scripting.", paradigm: "Multi-paradigm", accentClass: "text-emerald-500 border-emerald-500/20 bg-emerald-500/5" },
    { icon: Braces, name: "JavaScript", desc: "The ubiquitous engine powering interactive user interfaces, single-page web applications, and server environments.", paradigm: "Event-driven", accentClass: "text-amber-500 border-amber-500/20 bg-amber-500/5" },
    { icon: Terminal, name: "C", desc: "Low-level static compiled language optimized for direct hardware control, systems, and hardware-embedded devices.", paradigm: "Procedural", accentClass: "text-blue-500 border-blue-500/20 bg-blue-500/5" },
    { icon: Cpu, name: "C++", desc: "High-performance object-oriented language critical for game engines, desktop software, and system software.", paradigm: "Object-Oriented", accentClass: "text-cyan-500 border-cyan-500/20 bg-cyan-500/5" },
    { icon: Database, name: "SQL", desc: "Domain-specific declarative query framework built exclusively to store, fetch, modify, and manage database systems.", paradigm: "Declarative", accentClass: "text-indigo-500 border-indigo-500/20 bg-indigo-500/5" },
    { icon: Globe, name: "PHP", desc: "Server-side hypertext preprocessor custom-built to serve dynamic data updates across server-driven web backends.", paradigm: "Functional/OOP", accentClass: "text-violet-500 border-violet-500/20 bg-violet-500/5" },
    { icon: Workflow, name: "Java", desc: "Class-based compile-once run-anywhere platform engineered for large enterprise backends and Android environments.", paradigm: "Object-Oriented", accentClass: "text-orange-500 border-orange-500/20 bg-orange-500/5" },
    { icon: Binary, name: "C#", desc: "Type-safe modern engine deployed widely across enterprise networks, desktop apps, and real-time interactive game platforms.", paradigm: "Component-based", accentClass: "text-fuchsia-500 border-fuchsia-500/20 bg-fuchsia-500/5" },
    { icon: Layers, name: "Kotlin", desc: "Statically typed modern language structured to provide cross-platform clean development across Android architectures.", paradigm: "Functional/OOP", accentClass: "text-purple-500 border-purple-500/20 bg-purple-500/5" },
    { icon: BookOpen, name: "Swift", desc: "Fast, safe natively compiled system framework powering responsive client applications across Apple ecosystems.", paradigm: "Protocol-oriented", accentClass: "text-rose-500 border-rose-500/20 bg-rose-500/5" },
  ];

  const filteredLanguages = languages.filter(lang => 
    lang.name.toLowerCase().includes(langSearch.toLowerCase()) || 
    lang.desc.toLowerCase().includes(langSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans p-4 md:p-8 selection:bg-indigo-500/30 overflow-x-hidden antialiased transition-colors duration-300">
      
      {/* --- Ambient Structural Glows --- */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/[0.02] dark:bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-violet-500/[0.02] dark:bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* --- Hero Branding Header --- */}
        <header className="border border-slate-200 dark:border-slate-900 rounded-3xl p-6 md:p-8 bg-white/60 dark:bg-slate-900/20 backdrop-blur-md relative overflow-hidden shadow-sm dark:shadow-none">
          <div className="absolute top-0 right-0 p-4 opacity-[0.04] dark:opacity-10">
            <Sparkle className="w-24 h-24 text-slate-900 dark:text-slate-400" />
          </div>
          
          <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-mono text-xs tracking-widest uppercase mb-3">
            <Activity className="w-4 h-4 animate-pulse" />
            Software Engineering Architecture File
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400">
            Coding Fundamentals
          </h1>
          
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed">
            Coding is the programmatic translation of real-world constraints into predictable execution routines. 
            By mapping multi-variable problems into logic-bound syntaxes, developers establish systematic patterns 
            that guide computing engines accurately.
          </p>

          {/* --- Global Segment Controller Tabs --- */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-100 dark:border-slate-900">
            <button
              onClick={() => setActiveTab('lifecycle')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-colors duration-200 ${
                activeTab === 'lifecycle'
                  ? 'bg-indigo-600 dark:bg-indigo-500 text-white dark:text-slate-950 shadow-md shadow-indigo-500/10 dark:shadow-indigo-500/20 font-bold scale-105'
                  : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <Cpu className="w-4 h-4" /> The 5-Step Lifecycle
            </button>

            <button
              onClick={() => setActiveTab('languages')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-colors duration-200 ${
                activeTab === 'languages'
                  ? 'bg-violet-600 dark:bg-violet-500 text-white dark:text-slate-950 shadow-md shadow-violet-500/10 dark:shadow-violet-500/20 font-bold scale-105'
                  : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <Terminal className="w-4 h-4" /> Syntactic Engines
            </button>

            <button
              onClick={() => setActiveTab('media')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-colors duration-200 ${
                activeTab === 'media'
                  ? 'bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 shadow-md shadow-emerald-500/10 dark:shadow-emerald-500/20 font-bold scale-105'
                  : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" /> Video Briefing
            </button>
          </div>

        </header>

        {/* --- Main Workspace Sub-Sections --- */}
        <AnimatePresence mode="wait">
          
          {/* TAB 1: CODE EXECUTABLE LIFECYCLE */}
          {activeTab === 'lifecycle' && (
            <motion.div
              key="lifecycle"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Visual Sequential Pipeline Tracker */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">Structured Logic Workflow</h3>
                      <p className="text-xs text-slate-400 dark:text-slate-500">Click sequential phase cards to load underlying architecture parameters.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {codingSteps.map((step, index) => {
                      const StepIcon = step.icon;
                      const isExpanded = expandedStep === step.title;
                      
                      return (
                        <motion.div
                          layout="position"
                          key={step.title}
                          onClick={() => setExpandedStep(isExpanded ? null : step.title)}
                          className={`border rounded-2xl p-5 bg-white/80 dark:bg-slate-900/20 hover:bg-white dark:hover:bg-slate-900/40 cursor-pointer transition-all flex flex-col justify-between group relative shadow-sm dark:shadow-none ${
                            isExpanded 
                              ? 'md:col-span-2 border-indigo-500/40 dark:border-indigo-500/40 bg-white dark:bg-slate-900/60 shadow-md' 
                              : 'border-slate-100 dark:border-slate-900 hover:border-slate-300 dark:hover:border-slate-800'
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 text-slate-500 dark:text-slate-400 font-bold tracking-wider">
                                Phase 0{index + 1} // {step.phase}
                              </span>
                              <StepIcon className={`w-4 h-4 transition-transform ${isExpanded ? 'scale-110 text-indigo-500' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-300'}`} />
                            </div>

                            <h4 className="text-sm font-black text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {step.title}
                            </h4>

                            <p className={`text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed ${isExpanded ? 'block' : 'line-clamp-2'}`}>
                              {step.desc}
                            </p>
                          </div>

                          <div className="flex justify-end items-center mt-4 pt-2 border-t border-slate-50 dark:border-slate-950/40">
                            {isExpanded ? (
                              <Minimize2 className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                            ) : (
                              <Maximize2 className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-slate-400" />
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Computational Loop State Guard Box */}
                <div className="space-y-6">
                  <div className="border border-slate-200 dark:border-slate-900 rounded-3xl p-6 bg-white dark:bg-slate-900/30 flex flex-col justify-between shadow-sm dark:shadow-none h-full">
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 text-slate-400 animate-spin-slow" />
                        Compilation Failure Routes
                      </h3>
                      
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Software loops behave predictably based on environmental metrics. If the code analyzer yields edge instabilities during runtime evaluations, logic sequences must route backward instantly.
                      </p>

                      <div className="space-y-3 pt-2">
                        <div className="p-3 bg-rose-50/50 dark:bg-rose-950/10 border border-rose-500/20 rounded-xl space-y-1">
                          <div className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wide font-mono flex items-center gap-1.5">
                            <Bug className="w-3.5 h-3.5" />
                            Branch Failure Sequence
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                            If testing metrics fail, state operations abort immediately. Developers fall back to implementation frames to refactor conditional paths.
                          </p>
                        </div>

                        <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-500/20 rounded-xl space-y-1">
                          <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide font-mono flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Branch Complete Sequence
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                            If validation logic clears execution constraints completely, metadata transitions to documentation files.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-900/50 pt-4 mt-6 space-y-2">
                      <div className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        Operational Flow Vectors:
                      </div>
                      <div className="flex flex-wrap gap-2 text-[10px] font-mono font-bold">
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/30">
                          SUCCESS <ArrowRight className="w-3 h-3" /> DOCS
                        </span>
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900/30">
                          FAILURE <ArrowRight className="w-3 h-3" /> REFACTOR
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Core Knowledge Callout Block */}
              <div className="p-6 md:p-8 rounded-3xl border border-indigo-500/10 text-indigo-600 dark:text-indigo-400 bg-indigo-50/20 dark:bg-indigo-950/10 relative overflow-hidden flex flex-col md:flex-row gap-4 items-start">
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-950 shadow-sm shrink-0">
                  <FileText className="w-6 h-6 text-indigo-500" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">The Critical Importance of Documentation</h4>
                  <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Code tells computers how to parse inputs; documentation tells engineers *why* those inputs exist. 
                    Without architecture documentation, future tracking decays, codebase upgrades trigger regressions, 
                    and multi-developer collaboration cycles encounter extreme operational bottlenecks.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: SYNTACTIC ENGINES (LANGUAGES) */}
          {activeTab === 'languages' && (
            <motion.div
              key="languages"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* Filter Interface Block */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-200 dark:border-slate-900 p-4 rounded-2xl bg-white dark:bg-slate-900/30 shadow-sm">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Syntactic Matrix Index</h3>
                  <p className="text-xs text-slate-400">Filter languages by core architecture or paradigm profiles.</p>
                </div>
                <div className="relative max-w-xs w-full">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search compiler platforms..."
                    value={langSearch}
                    onChange={(e) => setLangSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-xl text-xs font-mono focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-colors placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Languages Functional Matrix Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLanguages.map((lang) => {
                  const LangIcon = lang.icon;
                  return (
                    <div
                      key={lang.name}
                      className="p-5 rounded-2xl border border-slate-100 dark:border-slate-900 bg-white/80 dark:bg-slate-900/20 hover:bg-white dark:hover:bg-slate-900/40 hover:border-indigo-500/20 dark:hover:border-indigo-500/20 transition-all flex flex-col justify-between group shadow-sm dark:shadow-none"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className={`p-2 rounded-xl border ${lang.accentClass}`}>
                            <LangIcon className="h-4 w-4" />
                          </div>
                          <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 text-slate-400 font-bold">
                            {lang.paradigm}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="text-sm font-black text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {lang.name}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            {lang.desc}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 pt-2 border-t border-slate-50 dark:border-slate-950/40 font-mono text-[9px] text-slate-400 tracking-wider">
                        PLATFORM // ENGINE READY
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* TAB 3: VIDEO BRIEFING FRAME */}
          {activeTab === 'media' && (
            <motion.div
              key="media"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-4 max-w-4xl mx-auto"
            >
              <div className="border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/10 backdrop-blur-md rounded-[2rem] overflow-hidden shadow-sm dark:shadow-2xl p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Introduction to Programming Languages</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Visual mapping detailing structural compile variations and software layer abstraction ranks.</p>
                </div>

                <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-black shadow-md aspect-video">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/BqfPgJwlUqY"
                    title="Programming Languages Explained"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-900">
                  <span className="font-bold uppercase tracking-wider text-[10px] font-mono text-indigo-500 block mb-1">Architecture Summary Note:</span>
                  Computers operate purely on low-level binary states. Modern compilers and interpretive virtual machines serve as strategic layer translations, transforming human conceptual rules into binary processor execution sets.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Global Summary Terminal Insight Footer --- */}
        <section className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-900 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 relative overflow-hidden shadow-sm dark:shadow-none">
          <div className="absolute top-0 right-0 p-6 text-slate-100 dark:text-slate-950 pointer-events-none">
            <Code2 className="h-24 w-24 stroke-[4]" />
          </div>

          <div className="max-w-3xl space-y-2 relative z-10">
            <h3 className="text-sm font-bold tracking-wider font-mono uppercase text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Core Architectural Verdict
            </h3>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Coding extends far beyond language syntaxes. It constitutes a precise, iterative problem-solving matrix—encompassing baseline telemetry identification, engineering layouts, structural assembly tracking, validation testing, and structural documentation maps.
            </p>
          </div>
        </section>
        <div className="aspect-video max-w-4xl mx-auto rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl relative group bg-black">
          <iframe className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-300"
          src="https://www.youtube.com/embed/wRezmI9qIT8" title="How to START Coding for beginners (Even If You’re Totally Lost)" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>

        {/* --- Global Ledger Footer Signature --- */}
        <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 dark:text-slate-600 pt-4 border-t border-slate-200 dark:border-slate-900">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping mr-1" />
            CODING
          </div>
        </footer>

      </div>
    </div>
  );
}