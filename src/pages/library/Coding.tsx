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
  Maximize2,
  Minimize2,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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
      desc: "Plan the logic, structure, and approach. Break the problem into smaller parts and design an algorithmic strategy.",
      phase: "Architecture"
    },
    {
      icon: PenTool,
      title: "Write the Code",
      desc: "Translate the solution into a target language using correct syntax, logical operators, and state control structures.",
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
      desc: "Write clean technical documentation detailing API specs, setup rules, architecture choices, and logic maps.",
      phase: "Maintenance"
    }
  ];

  const languages: Language[] = [
    { icon: Code2, name: "Python", desc: "Simple, readable, widely used in AI, data engineering, and automation scripting.", paradigm: "Multi-paradigm", accentClass: "text-emerald-500 border-emerald-500/20 bg-emerald-500/5" },
    { icon: Braces, name: "JavaScript", desc: "Ubiquitous engine powering interactive UIs, single-page apps, and server environments.", paradigm: "Event-driven", accentClass: "text-amber-500 border-amber-500/20 bg-amber-500/5" },
    { icon: Terminal, name: "C", desc: "Low-level static compiled language for direct hardware control, systems, and embedded devices.", paradigm: "Procedural", accentClass: "text-blue-500 border-blue-500/20 bg-blue-500/5" },
    { icon: Cpu, name: "C++", desc: "High-performance object-oriented language for game engines, desktop software, and system software.", paradigm: "Object-Oriented", accentClass: "text-cyan-500 border-cyan-500/20 bg-cyan-500/5" },
    { icon: Database, name: "SQL", desc: "Declarative query framework built to store, fetch, modify, and manage database systems.", paradigm: "Declarative", accentClass: "text-indigo-500 border-indigo-500/20 bg-indigo-500/5" },
    { icon: Globe, name: "PHP", desc: "Server-side preprocessor for dynamic data updates across server-driven web backends.", paradigm: "Functional/OOP", accentClass: "text-violet-500 border-violet-500/20 bg-violet-500/5" },
    { icon: Workflow, name: "Java", desc: "Class-based compile-once run-anywhere platform for enterprise backends and Android.", paradigm: "Object-Oriented", accentClass: "text-orange-500 border-orange-500/20 bg-orange-500/5" },
    { icon: Binary, name: "C#", desc: "Type-safe modern engine for enterprise networks, desktop apps, and real-time game platforms.", paradigm: "Component-based", accentClass: "text-fuchsia-500 border-fuchsia-500/20 bg-fuchsia-500/5" },
    { icon: Layers, name: "Kotlin", desc: "Statically typed language for cross-platform clean development across Android.", paradigm: "Functional/OOP", accentClass: "text-purple-500 border-purple-500/20 bg-purple-500/5" },
    { icon: BookOpen, name: "Swift", desc: "Fast, safe natively compiled framework powering responsive apps across Apple ecosystems.", paradigm: "Protocol-oriented", accentClass: "text-rose-500 border-rose-500/20 bg-rose-500/5" }
  ];

  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(langSearch.toLowerCase()) ||
    lang.desc.toLowerCase().includes(langSearch.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 space-y-8 antialiased selection:bg-indigo-500/30 text-slate-600 dark:text-slate-300">
      
      {/* Header */}
      <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-mono text-xs tracking-widest uppercase">
          <Activity className="w-4 h-4 animate-pulse" />
          Software Engineering Architecture File
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-950 dark:text-white">
          Coding Fundamentals
        </h1>
        <p className="text-sm md:text-base text-slate-400 dark:text-slate-500 max-w-2xl leading-relaxed">
          Coding is the programmatic translation of real-world constraints into predictable execution routines. By mapping problems into logic-bound syntaxes, developers establish systematic patterns that guide computing engines accurately.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 pt-4">
          {[
            { id: 'lifecycle', label: 'The 5-Step Lifecycle', icon: Cpu, color: 'indigo' },
            { id: 'languages', label: 'Syntactic Engines', icon: Terminal, color: 'violet' },
            { id: 'media', label: 'Video Briefing', icon: BookOpen, color: 'emerald' }
          ].map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            const colorClasses: Record<string, string> = {
              indigo: active ? "bg-indigo-600 dark:bg-indigo-500" : "",
              violet: active ? "bg-violet-600 dark:bg-violet-500" : "",
              emerald: active ? "bg-emerald-600 dark:bg-emerald-500" : ""
            };

            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-medium transition-all ${
                  active
                    ? `${colorClasses[t.color]} text-white shadow-md shadow-${t.color}-500/20 font-bold`
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
        {/* TAB 1: LIFECYCLE */}
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
              
              {/* 5 Steps */}
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <h3 className="text-lg font-black tracking-tight text-slate-950 dark:text-white">Structured Logic Workflow</h3>
                  <p className="text-xs text-slate-400">Click sequential phase cards to load underlying architecture parameters.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {codingSteps.map((step, index) => {
                    const StepIcon = step.icon;
                    const isExpanded = expandedStep === step.title;
                    
                    return (
                      <motion.div
                        layout
                        key={step.title}
                        onClick={() => setExpandedStep(isExpanded ? null : step.title)}
                        className={`rounded-2xl border p-5 bg-white/80 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900/60 cursor-pointer transition-all flex flex-col justify-between shadow-sm ${
                          isExpanded
                            ? 'md:col-span-2 border-indigo-500/40 bg-white dark:bg-slate-900/60 shadow-md'
                            : 'border-slate-100 dark:border-slate-900/80 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-500 font-bold tracking-wider">
                              Phase 0{index + 1} // {step.phase}
                            </span>
                            <StepIcon className={`w-4 h-4 transition-transform ${isExpanded ? 'scale-110 text-indigo-500' : 'text-slate-400 group-hover:text-slate-300'}`} />
                          </div>

                          <h4 className="text-sm font-black text-slate-950 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {step.title}
                          </h4>

                          <p className={`text-xs md:text-sm text-slate-400 leading-relaxed ${isExpanded ? 'block' : 'line-clamp-2'}`}>
                            {step.desc}
                          </p>
                        </div>

                        <div className="flex justify-end items-center mt-4 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                          {isExpanded ? (
                            <Minimize2 className="w-3.5 h-3.5 text-slate-400" />
                          ) : (
                            <Maximize2 className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-400" />
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Compilation Failure Routes */}
              <div className="space-y-6">
                <div className="rounded-3xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-6 shadow-sm flex flex-col h-full">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-slate-400 animate-spin" />
                      Compilation Failure Routes
                    </h3>
                    
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Software loops behave predictably based on environmental metrics. If code analyzer yields edge instabilities, logic sequences must route backward instantly.
                    </p>

                    <div className="space-y-3 pt-2">
                      <div className="p-3 bg-rose-50/50 dark:bg-rose-950/10 border border-rose-500/20 rounded-xl space-y-1">
                        <div className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wide font-mono flex items-center gap-1.5">
                          <Bug className="w-3.5 h-3.5" />
                          Branch Failure Sequence
                        </div>
                        <p className="text-[11px] text-slate-400 leading-normal">
                          If testing metrics fail, state operations abort. Developers fall back to implementation frames to refactor conditional paths.
                        </p>
                      </div>

                      <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-500/20 rounded-xl space-y-1">
                        <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide font-mono flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Branch Complete Sequence
                        </div>
                        <p className="text-[11px] text-slate-400 leading-normal">
                          If validation logic clears execution constraints, metadata transitions to documentation files.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-800/50 pt-4 mt-6 space-y-2">
                    <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                      Operational Flow in Program Testing (Step 4):
                    </div>
                    <div className="flex flex-wrap gap-2 text-[10px] font-mono font-bold">
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/30">
                        SUCCESS <ArrowRight className="w-3 h-3" /> DOCS (Step 5)
                      </span>
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900/30">
                        FAILURE <ArrowRight className="w-3 h-3" /> REWRITE (Step 3)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Documentation Callout */}
            <div className="rounded-3xl border border-indigo-500/10 bg-indigo-50/20 dark:bg-indigo-950/10 p-6 flex flex-col md:flex-row gap-4 items-start">
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-950 shadow-sm shrink-0">
                <FileText className="w-6 h-6 text-indigo-500" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-950 dark:text-white text-base">The Critical Importance of Documentation</h4>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                  Code tells computers how to parse inputs; documentation tells engineers *why* those inputs exist. Without architecture documentation, future tracking decays, upgrades trigger regressions, and multi-developer collaboration encounters bottlenecks.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: LANGUAGES */}
        {activeTab === 'languages' && (
          <motion.div
            key="languages"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Search Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 p-4 bg-white dark:bg-slate-900/40 shadow-sm">
              <div>
                <h3 className="text-sm font-bold text-slate-950 dark:text-white">Syntactic Matrix Index</h3>
                <p className="text-xs text-slate-400">Filter languages by core architecture or paradigm profiles.</p>
              </div>
              <div className="relative max-w-xs w-full">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search compiler platforms..."
                  value={langSearch}
                  onChange={(e) => setLangSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Languages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLanguages.map((lang) => {
                const LangIcon = lang.icon;
                return (
                  <div
                    key={lang.name}
                    className="rounded-2xl border border-slate-100 dark:border-slate-900/80 bg-white/80 dark:bg-slate-900/40 p-5 hover:bg-white dark:hover:bg-slate-900/60 hover:border-indigo-500/20 transition-all flex flex-col justify-between group shadow-sm"
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
                        <h4 className="text-sm font-black text-slate-950 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {lang.name}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {lang.desc}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-2 border-t border-slate-100 dark:border-slate-800/60 font-mono text-[9px] text-slate-400 tracking-wider">
                      PLATFORM // ENGINE READY
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* TAB 3: MEDIA */}
        {activeTab === 'media' && (
          <motion.div
            key="media"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-4 max-w-4xl mx-auto"
          >
            <div className="rounded-[2rem] border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-6 shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-slate-950 dark:text-white">Introduction to Programming Languages</h3>
                <p className="text-xs text-slate-400">Visual mapping detailing structural compile variations and software layer abstraction ranks.</p>
              </div>

              <div className="aspect-video rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800/80 bg-black shadow-md mt-4">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/BqfPgJwlUqY"
                  title="Programming Languages Explained"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="text-xs text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800 mt-4">
                <span className="font-bold uppercase tracking-wider text-[10px] font-mono text-indigo-500 block mb-1">Architecture Summary Note:</span>
                Computers operate purely on low-level binary states. Modern compilers and interpretive virtual machines serve as strategic layer translations, transforming human conceptual rules into binary processor execution sets.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary */}
      <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950/50 p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 text-slate-100 dark:text-slate-950 pointer-events-none">
          <Code2 className="h-24 w-24 stroke-[4]" />
        </div>
        <div className="max-w-3xl space-y-2 relative z-10">
          <h3 className="text-sm font-bold tracking-wider font-mono uppercase text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            Core Architectural Verdict
          </h3>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Coding extends far beyond language syntaxes. It constitutes a precise, iterative problem-solving matrix—encompassing problem identification, engineering layouts, structural assembly, validation testing, and documentation maps.
          </p>
        </div>
      </div>

      {/* YouTube Video */}
      <div className="aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-200/60 dark:border-slate-800/80">
        <iframe
          className="w-full h-full opacity-90"
          src="https://www.youtube.com/embed/wRezmI9qIT8"
          title="How to START Coding for beginners (Even If You're Totally Lost)"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      {/* Footer */}
      <footer className="flex items-center gap-1 text-xs font-mono text-slate-400 dark:text-slate-600 pt-4 border-t border-slate-200 dark:border-slate-800">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
        CODING
      </footer>
    </div>
  );
}