import React, { useState } from "react";
import {
  Keyboard,
  Type,
  Terminal,
  Compass,
  Sliders,
  Cpu,
  ChevronRight,
  Layers,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function KeyboardTopic() {
  const [activeTab, setActiveTab] = useState<"overview" | "keys" | "mechanics">("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: Keyboard, color: "emerald" },
    { id: "keys", label: "Key Systems", icon: Layers, color: "indigo" },
    { id: "mechanics", label: "Mechanics", icon: Cpu, color: "sky" },
  ] as const;

  const overviewBlocks = [
    {
      title: "Data Entry",
      desc: "Streams alphanumeric input into structured system buffers.",
      icon: Type,
    },
    {
      title: "Command Execution",
      desc: "Triggers system-level shortcuts and operational macros.",
      icon: Terminal,
    },
    {
      title: "Navigation Control",
      desc: "Moves cursor, viewport, and interface focus states.",
      icon: Compass,
    },
    {
      title: "System Control",
      desc: "Interfaces directly with OS-level input handling layers.",
      icon: Sliders,
    },
  ];

  const keyGroups = [
    {
      title: "Character Keys",
      mono: "A-Z",
      items: ["Alphabet input", "Numbers 0–9", "Symbols & punctuation"],
    },
    {
      title: "Function Keys",
      mono: "F1–F12",
      items: ["System shortcuts", "Application commands", "Context actions"],
    },
    {
      title: "Navigation Keys",
      mono: "NAV",
      items: ["Arrows", "Page Up/Down", "Home/End", "Insert/Delete"],
    },
    {
      title: "Modifier Keys",
      mono: "CTRL",
      items: ["Shift", "Ctrl", "Alt", "Meta/Win/Cmd"],
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 space-y-8 antialiased selection:bg-emerald-500/10 text-slate-600 dark:text-slate-300">
      
      {/* Header */}
      <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-xs tracking-widest uppercase">
          <Keyboard className="w-4 h-4" />
          Input Architecture Layer
        </div>
        
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight sm:text-4xl">
          The Keyboard
        </h1>
        <p className="text-sm text-slate-400 dark:text-slate-500 max-w-2xl leading-relaxed">
          A hardware input subsystem translating physical keystrokes into structured system commands, data streams, and navigation events.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 pt-4">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            
            const colorClasses = {
              emerald: active ? "bg-emerald-600 dark:bg-emerald-500" : "",
              indigo: active ? "bg-indigo-600 dark:bg-indigo-500" : "",
              sky: active ? "bg-sky-600 dark:bg-sky-500" : "",
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
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid md:grid-cols-2 gap-4"
          >
            {overviewBlocks.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-emerald-500">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-slate-950 dark:text-white text-sm">{b.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* TAB 2: KEYS */}
        {activeTab === "keys" && (
          <motion.div
            key="keys"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid md:grid-cols-2 gap-4"
          >
            {keyGroups.map((g) => (
              <div
                key={g.title}
                className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 text-xs font-mono bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md">
                    {g.mono}
                  </span>
                  <h3 className="font-bold text-slate-950 dark:text-white text-sm">{g.title}</h3>
                </div>

                <ul className="mt-3 space-y-2 text-xs">
                  {g.items.map((i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        )}

        {/* TAB 3: MECHANICS */}
        {activeTab === "mechanics" && (
          <motion.div
            key="mechanics"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-6 shadow-sm">
              <h3 className="font-bold text-slate-950 dark:text-white text-sm flex items-center gap-2">
                <Cpu className="w-4 h-4 text-sky-500" />
                Input Signal Pipeline
              </h3>

              <div className="flex items-center gap-3 mt-4 text-xs font-mono text-slate-400 overflow-x-auto">
                {["Press", "Scan", "Encode", "Transmit", "Render"].map((s, i) => (
                  <div key={s} className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      {s}
                    </span>
                    {i < 4 && <ChevronRight className="w-4 h-4 text-slate-500" />}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary */}
      <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950/50 p-6 shadow-sm">
        <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">
          System Summary
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          The keyboard operates as a deterministic input translation layer, converting mechanical events into structured digital instructions consumed by the operating system kernel.
        </p>
      </div>

      {/* Footer */}
      <footer className="flex items-center gap-1 text-xs font-mono text-slate-400 dark:text-slate-600 pt-4 border-t border-slate-200 dark:border-slate-800">
        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
        TYPING HARDWARE
      </footer>
    </div>
  );
}