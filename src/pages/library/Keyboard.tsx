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
  Wifi,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function KeyboardTopic() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "keys" | "mechanics"
  >("overview");

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 p-6 md:p-10 antialiased">

      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-emerald-500/10 blur-[160px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[160px]" />

      <div className="max-w-6xl mx-auto space-y-10">

        {/* HEADER */}
        <header className="relative rounded-3xl border border-slate-200 dark:border-slate-900 bg-white/60 dark:bg-slate-900/30 backdrop-blur-xl p-8 overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <Keyboard className="w-28 h-28" />
          </div>

          <div className="flex items-center gap-2 text-emerald-500 text-xs font-mono uppercase tracking-widest">
            <Keyboard className="w-4 h-4" />
            Input Architecture Layer
          </div>

          <h1 className="text-4xl md:text-5xl font-black mt-3">
            The Keyboard
          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-3xl text-sm leading-relaxed">
            A hardware input subsystem translating physical keystrokes into structured system commands, data streams, and navigation events.
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-200 dark:border-slate-900">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = activeTab === t.id;

              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-medium transition-all ${
                    active
                      ? `bg-${t.color}-600 text-white shadow-lg scale-105`
                      : "bg-slate-100 dark:bg-slate-900 text-slate-500 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </header>

        {/* CONTENT */}
        <AnimatePresence mode="wait">

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <motion.section
              key="overview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid md:grid-cols-2 gap-4"
            >
              {overviewBlocks.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.title}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white/80 dark:bg-slate-900/20 backdrop-blur"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-950">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-semibold text-sm">{b.title}</h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                );
              })}
            </motion.section>
          )}

          {/* KEYS */}
          {activeTab === "keys" && (
            <motion.section
              key="keys"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid md:grid-cols-2 gap-4"
            >
              {keyGroups.map((g) => (
                <div
                  key={g.title}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white/80 dark:bg-slate-900/20"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 text-xs font-mono bg-slate-100 dark:bg-slate-900 rounded-md">
                      {g.mono}
                    </span>
                    <h3 className="font-semibold text-sm">{g.title}</h3>
                  </div>

                  <ul className="mt-3 space-y-2 text-xs text-slate-500">
                    {g.items.map((i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.section>
          )}

          {/* MECHANICS */}
          {activeTab === "mechanics" && (
            <motion.section
              key="mechanics"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white/80 dark:bg-slate-900/20">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  Input Signal Pipeline
                </h3>

                <div className="flex items-center gap-3 mt-4 text-xs font-mono text-slate-500 overflow-x-auto">
                  {["Press", "Scan", "Encode", "Transmit", "Render"].map(
                    (s, i) => (
                      <div key={s} className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900">
                          {s}
                        </span>
                        {i < 4 && (
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* SUMMARY */}
        <section className="p-8 rounded-3xl border border-slate-200 dark:border-slate-900 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 relative">
          <div className="absolute top-0 right-0 opacity-10">
            <FileText className="w-20 h-20" />
          </div>

          <h3 className="text-sm font-mono uppercase tracking-widest text-emerald-500">
            System Summary
          </h3>

          <p className="text-xs text-slate-500 mt-3 leading-relaxed max-w-3xl">
            The keyboard operates as a deterministic input translation layer,
            converting mechanical events into structured digital instructions
            consumed by the operating system kernel.
          </p>
        </section>

                
        <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 dark:text-slate-600 pt-4 border-t border-slate-200 dark:border-slate-900">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping mr-1" />
            TYPING HARDWARE
          </div>
        </footer>

      </div>
    </div>
  );
}