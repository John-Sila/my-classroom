import React, { useState } from "react";
import {
  Move,
  MousePointer,
  Hand,
  ChevronsUpDown,
  Cpu,
  Activity,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function MouseTopic() {
  const [activeTab, setActiveTab] = useState("overview");

  const sections = {
    overview: [
      {
        title: "Pointer Control",
        desc: "Translates physical movement into pixel-precise cursor tracking across the display surface.",
        icon: Move,
      },
      {
        title: "Target Selection",
        desc: "Executes selection logic via primary and secondary click operations.",
        icon: MousePointer,
      },
      {
        title: "Drag & Drop",
        desc: "Maintains object state while relocating UI elements across spatial layouts.",
        icon: Hand,
      },
      {
        title: "Scroll Navigation",
        desc: "Enables vertical and horizontal viewport traversal via scroll wheel encoding.",
        icon: ChevronsUpDown,
      },
    ],
    types: [
      {
        title: "Mechanical Mouse",
        tier: "Legacy",
        desc: "Ball-driven motion tracking system using friction-based coordinate sensing.",
      },
      {
        title: "Optical Mouse",
        tier: "Standard",
        desc: "LED-based surface imaging system enabling high-precision movement detection.",
      },
      {
        title: "Wireless Mouse",
        tier: "Modern",
        desc: "RF or Bluetooth-based pointer systems removing physical tether constraints.",
      },
    ],
    pipeline: [
      {
        step: "01",
        title: "Motion Capture",
        desc: "Physical displacement detected on surface plane.",
      },
      {
        step: "02",
        title: "Sensor Processing",
        desc: "Optical or mechanical encoder translates movement into signals.",
      },
      {
        step: "03",
        title: "System Transmission",
        desc: "USB or wireless protocol sends data packets to OS input stack.",
      },
      {
        step: "04",
        title: "UI Rendering",
        desc: "Graphical subsystem updates pointer position in real time.",
      },
    ],
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 space-y-8 antialiased selection:bg-indigo-500/10 text-slate-600 dark:text-slate-300">
      
      {/* Header */}
      <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/30">
          <MousePointer className="w-3.5 h-3.5" />
          Input Device
        </div>
        
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight sm:text-4xl">
          The Computer Mouse
        </h1>
        <p className="text-sm text-slate-400 dark:text-slate-500 max-w-2xl leading-relaxed">
          A spatial input interface translating human motion into deterministic system-level pointer execution.
        </p>

        {/* Image */}
        <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 max-w-3xl">
          <img
            src="https://i.pcmag.com/imagery/reviews/04hwDTKJZZzjX1jLPkwU9QW-1.fit_lim.size_1050x591.v1743187064.jpg"
            alt="Mouse device"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 pt-4">
          {[
            { id: "overview", label: "Overview", icon: Info },
            { id: "types", label: "Architecture Types", icon: Cpu },
            { id: "pipeline", label: "Input Pipeline", icon: Activity },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium uppercase tracking-wider transition-all ${
                activeTab === id
                  ? "bg-indigo-600 dark:bg-indigo-500 text-white font-bold shadow-md shadow-indigo-500/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {sections.overview.map(({ title, desc, icon: Icon }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-5 shadow-sm"
              >
                <div className="flex gap-3 items-start">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-indigo-500">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-950 dark:text-white text-sm">{title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* TAB 2: TYPES */}
        {activeTab === "types" && (
          <motion.div
            key="types"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid md:grid-cols-3 gap-4"
          >
            {sections.types.map((t) => (
              <div
                key={t.title}
                className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-6 shadow-sm"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  {t.tier}
                </span>
                <h3 className="font-bold text-slate-950 dark:text-white mt-2">{t.title}</h3>
                <p className="text-xs text-slate-400 mt-2">{t.desc}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* TAB 3: PIPELINE */}
        {activeTab === "pipeline" && (
          <motion.div
            key="pipeline"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {sections.pipeline.map((p) => (
              <div
                key={p.step}
                className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-5 shadow-sm"
              >
                <span className="text-xs font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md">
                  Step {p.step}
                </span>
                <h3 className="font-bold text-slate-950 dark:text-white mt-3">{p.title}</h3>
                <p className="text-xs text-slate-400 mt-2">{p.desc}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary */}
      <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950/50 p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-950 dark:text-white mb-2">System Summary</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          The mouse remains a core deterministic input subsystem translating spatial motion into real-time system interaction events.
        </p>
      </div>

      {/* Footer */}
      <footer className="flex items-center gap-1 text-xs font-mono text-slate-400 dark:text-slate-600 pt-4 border-t border-slate-200 dark:border-slate-800">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
        CLICKING HARDWARE
      </footer>
    </div>
  );
}