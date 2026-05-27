import React, { useState, useEffect } from "react";
import {
  Computer,
  Brain,
  Globe,
  Smartphone,
  Database,
  Code,
  Rocket,
  Box,
  MessageSquare,
  Video,
  Lock,
  Cpu,
  Zap,
  Info,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Sparkles,
  Clock3,
  Orbit,
  Layers3,
  ShieldCheck,
  Stars,
  Binary,
  Gauge,
  Activity,
} from "lucide-react";

import { motion, AnimatePresence } from "motion/react";
import { funFacts } from "./components/FunFacts";

// motion
const slideVariants = {
  enter: (direction: "next" | "prev") => ({
    x: direction === "next" ? 120 : -120,
    opacity: 0,
    scale: 0.96,
    filter: "blur(10px)",
  }),

  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },

  exit: (direction: "next" | "prev") => ({
    x: direction === "next" ? -120 : 120,
    opacity: 0,
    scale: 0.96,
    filter: "blur(10px)",
  }),
};

// ============================================================================
// COMPONENT
// ============================================================================

export default function FunFactsTopic() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [direction, setDirection] = useState<"next" | "prev">("next");

  const currentFact = funFacts[currentIndex];

  const Icon = currentFact.icon;

  const nextFact = () => {
    setDirection("next");

    setCurrentIndex((prev) => (prev + 1) % funFacts.length);
  };

  const prevFact = () => {
    setDirection("prev");

    setCurrentIndex(
      (prev) => (prev - 1 + funFacts.length) % funFacts.length
    );
  };

  const randomFact = () => {
    let newIndex;

    do {
      newIndex = Math.floor(Math.random() * funFacts.length);
    } while (newIndex === currentIndex);

    setDirection(newIndex > currentIndex ? "next" : "prev");

    setCurrentIndex(newIndex);
  };

  // Auto play
  useEffect(() => {
    const interval = setInterval(() => {
      nextFact();
    }, 7000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative overflow-hidden min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-800 dark:text-slate-100 px-4 py-8 md:px-6 selection:bg-indigo-500/20">

      {/* ========================================================================= */}
      {/* GLOBAL AMBIENT FX */}
      {/* ========================================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10rem] left-[-8rem] w-[32rem] h-[32rem] rounded-full bg-indigo-500/[0.06] blur-[140px]" />

        <div className="absolute bottom-[-12rem] right-[-10rem] w-[34rem] h-[34rem] rounded-full bg-sky-500/[0.06] blur-[160px]" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full bg-fuchsia-500/[0.03] blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-10">

        {/* ========================================================================= */}
        {/* HERO */}
        {/* ========================================================================= */}

        <section className="relative overflow-hidden rounded-[2rem] border border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl shadow-[0_10px_60px_-15px_rgba(0,0,0,0.15)]">

          {/* Mesh */}
          <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] bg-[radial-gradient(circle_at_top_right,_white,_transparent_25%),radial-gradient(circle_at_bottom_left,_white,_transparent_20%)]" />

          <div className="relative z-10 p-6 md:p-10 lg:p-12">

            <div className="flex flex-wrap items-center gap-3 mb-6">

              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50 dark:bg-indigo-950/40 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-700 dark:text-indigo-300">
                <Sparkles className="w-3.5 h-3.5" />
                ICT Trivia Engine
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                <Orbit className="w-3.5 h-3.5" />
                Interactive Knowledge Feed
              </div>

            </div>

            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">

              <div className="space-y-6">

                <div className="space-y-4">

                  <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none">

                    <span className="bg-gradient-to-r from-slate-950 via-slate-700 to-indigo-600 dark:from-white dark:via-slate-200 dark:to-indigo-400 bg-clip-text text-transparent">
                      ICT Fun Facts
                    </span>

                    <br />

                    <span className="text-slate-400 dark:text-slate-600">
                      & Tech Trivia
                    </span>
                  </h1>

                  <p className="max-w-2xl text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400">
                    Explore bizarre, historical, and genuinely impressive
                    discoveries from computing, programming, AI,
                    cybersecurity, storage engineering, and internet culture.
                    Built as a cinematic knowledge carousel with immersive
                    interaction patterns and animated transitions.
                  </p>

                </div>

                {/* Stats */}

                <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">

                  {[
                    {
                      icon: Layers3,
                      label: "Fact Modules",
                      value: funFacts.length,
                    },

                    {
                      icon: Globe,
                      label: "Topics",
                      value: "Global",
                    },

                  ].map(({ icon: StatIcon, label, value }) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-950/40 p-4 backdrop-blur-sm"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400">
                          <StatIcon className="w-4 h-4" />
                        </div>

                        <Binary className="w-4 h-4 text-slate-300 dark:text-slate-700" />
                      </div>

                      <p className="text-lg font-black text-slate-900 dark:text-white">
                        {value}
                      </p>

                      <p className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating visual */}

              <div className="relative">

                <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/10 to-sky-500/20 rounded-full scale-110" />

                <div className="relative rounded-[2rem] border border-slate-200/70 dark:border-slate-800/70 bg-gradient-to-br from-white to-slate-100 dark:from-slate-900 dark:to-slate-950 p-8 overflow-hidden shadow-2xl">

                  <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#64748b_1px,transparent_1px),linear-gradient(to_bottom,#64748b_1px,transparent_1px)] bg-[size:24px_24px]" />

                  <div className="relative z-10 flex flex-col items-center text-center space-y-6">

                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-2xl animate-pulse" />

                      <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center shadow-2xl shadow-indigo-500/30">
                        <Rocket className="w-10 h-10 text-white" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-black text-slate-900 dark:text-white">
                        Knowledge Stream
                      </h3>

                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        Swipe through curated technology trivia with animated
                        storytelling and modern UI transitions.
                      </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                      {[
                        "AI",
                        "History",
                        "Internet",
                        "Programming",
                        "Hardware",
                        "Cybersecurity",
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-xl text-[11px] font-semibold border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 text-slate-600 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MAIN FACT CARD */}
        {/* ========================================================================= */}

        <div className="relative max-w-5xl mx-auto">

          {/* Side glow */}
          <div
            className={`absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br ${currentFact.accent} blur-3xl opacity-80`}
          />

          <AnimatePresence mode="wait" initial={false} custom={direction}>

            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: {
                  type: "spring",
                  stiffness: 280,
                  damping: 26,
                },
                opacity: { duration: 0.25 },
              }}
              className="relative overflow-hidden rounded-[2rem] border border-slate-200/70 dark:border-slate-800/70 bg-white/90 dark:bg-slate-900/50 backdrop-blur-xl shadow-[0_25px_80px_-25px_rgba(0,0,0,0.35)]"
            >

              {/* IMAGE */}

              <div className="relative h-64 md:h-[26rem] overflow-hidden">

                <img
                  src={currentFact.image}
                  alt={currentFact.category}
                  className="w-full h-full object-cover scale-[1.02]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_25%)]" />

                {/* Floating Badge */}

                <div className="absolute top-6 left-6 flex items-center gap-3">

                  <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/30 dark:border-slate-800 shadow-xl">
                    <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>

                  <div className="rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/30 dark:border-slate-800 px-4 py-3 shadow-xl">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400 font-bold">
                      Category
                    </p>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {currentFact.category}
                    </h3>
                  </div>

                </div>

                {/* Fact ID */}

                <div className="absolute bottom-6 right-6">

                  <div className="rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl px-5 py-3 shadow-2xl">

                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-300 font-bold mb-1">
                      Trivia Unit
                    </p>

                    <p className="text-white font-black text-xl">
                      #{currentFact.id}
                    </p>

                  </div>
                </div>

              </div>

              {/* CONTENT */}

              <div className="p-6 md:p-8 lg:p-10 space-y-6">

                {/* Top meta */}

                <div className="flex flex-wrap items-center gap-3">

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300">
                    <Clock3 className="w-3.5 h-3.5 text-indigo-500" />
                    Rotating Fact Stream
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300">
                    <Stars className="w-3.5 h-3.5 text-amber-500" />
                    Curated Knowledge
                  </div>

                </div>

                {/* Main fact */}

                <div className="space-y-4">

                  <p className="text-xl md:text-2xl font-semibold leading-relaxed text-slate-800 dark:text-slate-100">
                    {currentFact.fact}
                  </p>

                  <div className="relative overflow-hidden rounded-2xl border border-amber-200 dark:border-amber-900/40 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/10 p-5">

                    <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-amber-400/10 blur-2xl" />

                    <div className="relative flex items-start gap-3">

                      <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300">
                        <Info className="w-4 h-4" />
                      </div>

                      <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-amber-600 dark:text-amber-300 font-bold mb-2">
                          Did You Know?
                        </p>

                        <p className="text-sm md:text-base leading-relaxed text-amber-800 dark:text-amber-200 font-medium">
                          {currentFact.extra}
                        </p>
                      </div>

                    </div>
                  </div>
                </div>

                {/* CONTROLS */}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">

                  <button
                    onClick={prevFact}
                    className="group flex items-center gap-2 px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />

                    <span className="text-xs font-bold uppercase tracking-widest">
                      Previous
                    </span>
                  </button>

                  <div className="flex items-center gap-3">

                    <button
                      onClick={randomFact}
                      className="group relative overflow-hidden px-7 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-500 text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-indigo-500/20"
                    >
                      <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

                      <span className="relative flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Random Fact
                      </span>
                    </button>

                  </div>

                  <button
                    onClick={nextFact}
                    className="group flex items-center gap-2 px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                  >
                    <span className="text-xs font-bold uppercase tracking-widest">
                      Next
                    </span>

                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========================================================================= */}
        {/* PROGRESS */}
        {/* ========================================================================= */}

        <div className="max-w-5xl mx-auto space-y-4">

          <div className="flex flex-wrap justify-center gap-2">

            {funFacts.map((fact, index) => (
              <button
                key={fact.id}
                onClick={() => {
                  setDirection(index > currentIndex ? "next" : "prev");
                  setCurrentIndex(index);
                }}
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                  index === currentIndex
                    ? "border-indigo-500 bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-2 px-4 py-2.5">

                  <span className="text-[11px] font-black tracking-widest uppercase">
                    {fact.id}
                  </span>

                  <div
                    className={`h-1.5 w-1.5 rounded-full ${
                      index === currentIndex
                        ? "bg-white"
                        : "bg-slate-400 dark:bg-slate-600"
                    }`}
                  />

                  <span className="hidden sm:block text-[11px] font-semibold">
                    {fact.category}
                  </span>

                </div>
              </button>
            ))}
          </div>

          <div className="text-center">

            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <Activity className="w-3.5 h-3.5 text-indigo-500" />
              Fact {currentIndex + 1} of {funFacts.length}
            </p>

          </div>
        </div>

        {/* category cloud */}

        <section className="max-w-5xl mx-auto">

          <div className="rounded-[2rem] border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/30 backdrop-blur-xl p-6">

            <div className="flex items-center gap-2 mb-5">
              <Layers3 className="w-4 h-4 text-indigo-500" />

              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-700 dark:text-slate-200">
                Topic Categories
              </h3>
            </div>

            <div className="flex flex-wrap gap-3">

              {[...new Set(funFacts.map((f) => f.category))].map(
                (category) => (
                  <div
                    key={category}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 px-4 py-3 transition-all hover:-translate-y-0.5"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-indigo-500/5 via-sky-500/5 to-fuchsia-500/5" />

                    <span className="relative text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
                      {category}
                    </span>
                  </div>
                )
              )}

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SUMMARY */}
        {/* ========================================================================= */}

        <section className="relative overflow-hidden max-w-6xl mx-auto rounded-[2rem] border border-slate-200/70 dark:border-slate-800/70 bg-gradient-to-br from-white to-slate-100 dark:from-slate-900 dark:to-slate-950 p-8 md:p-10 shadow-sm">

          <div className="absolute top-0 right-0 translate-x-10 -translate-y-10 opacity-[0.05] dark:opacity-[0.08]">
            <Rocket className="w-64 h-64" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-5">

            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50 dark:bg-indigo-950/30 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-indigo-700 dark:text-indigo-300">
              <Zap className="w-3.5 h-3.5" />
              Knowledge Recap
            </div>

            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Technology History Is Wild
            </h2>

            <p className="text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400">
              Computing evolved from room-sized machines into pocket-scale
              supercomputers within a few decades. Behind every operating
              system, browser, AI model, and application stack lies a history
              filled with strange inventions, engineering breakthroughs,
              accidental discoveries, and rapid innovation cycles.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">

              {[
                "Computing",
                "Innovation",
                "AI",
                "Cybersecurity",
                "Internet",
                "Programming",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300"
                >
                  {tag}
                </span>
              ))}

            </div>
          </div>
        </section>
        <div className="aspect-video max-w-4xl mx-auto rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl relative group bg-black">
          <iframe
            className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-300"
            src="https://www.youtube.com/embed/Ow1BLT29p9w"
            title="DHistory Of Computer | Full History And Evolution Of Computers Till Date"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}