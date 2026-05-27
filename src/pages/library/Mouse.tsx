import React, { useState } from "react";
import {
  Move,
  MousePointer,
  Hand,
  ChevronsUpDown,
  Cpu,
  Zap,
  Sparkles,
  Radio,
  Activity,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function MouseTopic() {
  const [activeTab, setActiveTab] = useState("overview");

  const sections = {
    overview: [
      {
        title: "Pointer Control",
        desc: "Translates physical movement into pixel-precise cursor tracking across the display surface.",
        icon: Move
      },
      {
        title: "Target Selection",
        desc: "Executes selection logic via primary and secondary click operations.",
        icon: MousePointer
      },
      {
        title: "Drag & Drop",
        desc: "Maintains object state while relocating UI elements across spatial layouts.",
        icon: Hand
      },
      {
        title: "Scroll Navigation",
        desc: "Enables vertical and horizontal viewport traversal via scroll wheel encoding.",
        icon: ChevronsUpDown
      }
    ],
    types: [
      {
        title: "Mechanical Mouse",
        tier: "Legacy",
        desc: "Ball-driven motion tracking system using friction-based coordinate sensing."
      },
      {
        title: "Optical Mouse",
        tier: "Standard",
        desc: "LED-based surface imaging system enabling high-precision movement detection."
      },
      {
        title: "Wireless Mouse",
        tier: "Modern",
        desc: "RF or Bluetooth-based pointer systems removing physical tether constraints."
      }
    ],
    pipeline: [
      {
        step: "01",
        title: "Motion Capture",
        desc: "Physical displacement detected on surface plane."
      },
      {
        step: "02",
        title: "Sensor Processing",
        desc: "Optical or mechanical encoder translates movement into signals."
      },
      {
        step: "03",
        title: "System Transmission",
        desc: "USB or wireless protocol sends data packets to OS input stack."
      },
      {
        step: "04",
        title: "UI Rendering",
        desc: "Graphical subsystem updates pointer position in real time."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans p-4 md:p-8 space-y-12">

      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-900 bg-white/60 dark:bg-slate-900/20 backdrop-blur-md shadow-sm p-6 md:p-8 space-y-6">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-500/[0.02] dark:bg-indigo-500/[0.04] blur-[140px] pointer-events-none" />

        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/30">
          <MousePointer className="h-3.5 w-3.5" />
          Input Device
        </span>

        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            The Computer Mouse
          </h1>
          <p className="max-w-3xl text-lg text-slate-500 dark:text-slate-400">
            A spatial input interface translating human motion into deterministic system-level pointer execution.
          </p>
        </div>

        <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950">
          <img
            src="https://i.pcmag.com/imagery/reviews/04hwDTKJZZzjX1jLPkwU9QW-1.fit_lim.size_1050x591.v1743187064.jpg"
            alt="Mouse device"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent" />
        </div>
      </section>

      {/* TAB CONTROLS */}
      <section className="flex flex-wrap gap-2 border-t border-slate-100 dark:border-slate-900 pt-6">
        {[
          { id: "overview", label: "Overview", icon: Info },
          { id: "types", label: "Architecture Types", icon: Cpu },
          { id: "pipeline", label: "Input Pipeline", icon: Activity }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium uppercase tracking-wider transition-all ${
              activeTab === id
                ? "bg-indigo-600 dark:bg-indigo-500 text-white font-bold scale-105 shadow-md"
                : "bg-slate-100 dark:bg-slate-900 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </section>

      {/* CONTENT */}
      <AnimatePresence mode="wait">

        {activeTab === "overview" && (
          <motion.section
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {sections.overview.map(({ title, desc, icon: Icon }) => (
              <div
                key={title}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20"
              >
                <div className="flex gap-3 items-start">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 text-indigo-500">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">{title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.section>
        )}

        {activeTab === "types" && (
          <motion.section
            key="types"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid md:grid-cols-3 gap-4"
          >
            {sections.types.map((t) => (
              <div
                key={t.title}
                className="p-6 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  {t.tier}
                </span>
                <h3 className="font-bold text-slate-900 dark:text-white mt-2">
                  {t.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2">{t.desc}</p>
              </div>
            ))}
          </motion.section>
        )}

        {activeTab === "pipeline" && (
          <motion.section
            key="pipeline"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {sections.pipeline.map((p) => (
              <div
                key={p.step}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20"
              >
                <span className="text-xs font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md">
                  Step {p.step}
                </span>
                <h3 className="font-bold text-slate-900 dark:text-white mt-3">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2">{p.desc}</p>
              </div>
            ))}
          </motion.section>
        )}

      </AnimatePresence>

      {/* SUMMARY */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-900 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 p-6 md:p-8">
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-200/20 dark:bg-slate-800/30 blur-2xl pointer-events-none" />
        <div className="space-y-2 max-w-3xl">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            System Summary
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            The mouse remains a core deterministic input subsystem translating spatial motion into real-time system interaction events.
          </p>
        </div>
      </section>

                      
      <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 dark:text-slate-600 pt-4 border-t border-slate-200 dark:border-slate-900">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping mr-1" />
          CLICKING HARDWARE
        </div>
      </footer>

    </div>
  );
}