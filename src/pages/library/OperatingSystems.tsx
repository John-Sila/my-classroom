import React, { useState } from "react";
import {
  Cpu,
  Layers,
  Terminal,
  ShieldCheck,
  Monitor,
  Smartphone,
  HardDrive,
  Server,
  Compass,
  Info,
  Youtube,
  Fingerprint,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function OperatingSystemsTopic() {
  const [activeTab, setActiveTab] = useState<
    "concepts" | "platforms" | "kernel"
  >("concepts");

  const distros = [
    {
      name: "Ubuntu",
      family: "Debian-Based",
      color: "from-orange-500/20 to-red-500/10",
      border: "border-orange-500/20",
      glow: "group-hover:shadow-orange-500/10",
    },
    {
      name: "Debian",
      family: "Universal GNU/Linux",
      color: "from-pink-500/20 to-rose-500/10",
      border: "border-pink-500/20",
      glow: "group-hover:shadow-pink-500/10",
    },
    {
      name: "Fedora",
      family: "Red Hat Ecosystem",
      color: "from-blue-500/20 to-cyan-500/10",
      border: "border-blue-500/20",
      glow: "group-hover:shadow-blue-500/10",
    },
    {
      name: "Arch Linux",
      family: "Rolling Release",
      color: "from-cyan-500/20 to-sky-500/10",
      border: "border-cyan-500/20",
      glow: "group-hover:shadow-cyan-500/10",
    },
    {
      name: "Linux Mint",
      family: "Beginner Friendly",
      color: "from-emerald-500/20 to-green-500/10",
      border: "border-emerald-500/20",
      glow: "group-hover:shadow-emerald-500/10",
    },
    {
      name: "Kali Linux",
      family: "Security Research",
      color: "from-indigo-500/20 to-violet-500/10",
      border: "border-indigo-500/20",
      glow: "group-hover:shadow-indigo-500/10",
    },
    {
      name: "openSUSE",
      family: "Enterprise Linux",
      color: "from-lime-500/20 to-green-500/10",
      border: "border-lime-500/20",
      glow: "group-hover:shadow-lime-500/10",
    },
    {
      name: "Gentoo",
      family: "Source-Based",
      color: "from-violet-500/20 to-fuchsia-500/10",
      border: "border-violet-500/20",
      glow: "group-hover:shadow-violet-500/10",
    },
    {
      name: "Slackware",
      family: "Classic UNIX Style",
      color: "from-slate-500/20 to-slate-700/10",
      border: "border-slate-500/20",
      glow: "group-hover:shadow-slate-500/10",
    },
    {
      name: "NixOS",
      family: "Declarative OS",
      color: "from-sky-500/20 to-blue-500/10",
      border: "border-sky-500/20",
      glow: "group-hover:shadow-sky-500/10",
    },
    {
      name: "ChromeOS",
      family: "Cloud-Centric",
      color: "from-yellow-500/20 to-orange-500/10",
      border: "border-yellow-500/20",
      glow: "group-hover:shadow-yellow-500/10",
    },
    {
      name: "Android-x86",
      family: "Mobile Hybrid",
      color: "from-green-500/20 to-emerald-500/10",
      border: "border-green-500/20",
      glow: "group-hover:shadow-green-500/10",
    },
    {
      name: "FreeBSD",
      family: "BSD UNIX",
      color: "from-red-500/20 to-rose-500/10",
      border: "border-red-500/20",
      glow: "group-hover:shadow-red-500/10",
    },
    {
      name: "Haiku OS",
      family: "BeOS Inspired",
      color: "from-amber-500/20 to-yellow-500/10",
      border: "border-amber-500/20",
      glow: "group-hover:shadow-amber-500/10",
    },
  ];

  const tabs = [
    {
      id: "concepts",
      label: "Core Systems",
      icon: Cpu,
      color: "indigo",
    },
    {
      id: "platforms",
      label: "Platforms",
      icon: Monitor,
      color: "sky",
    },
    {
      id: "kernel",
      label: "Linux as a Kernel",
      icon: Layers,
      color: "emerald",
    },
  ] as const;

  const conceptBlocks = [
    {
      title: "Hardware Resource Allocation",
      desc: "Schedules CPU threads, manages memory paging, and coordinates storage I/O throughput.",
      icon: HardDrive,
      tone: "indigo",
    },
    {
      title: "I/O & Interrupt Handling",
      desc: "Manages device drivers, peripheral input streams, and system interrupt arbitration.",
      icon: Layers,
      tone: "emerald",
    },
    {
      title: "Execution Interfaces",
      desc: "Provides CLI and GUI abstraction layers for application execution environments.",
      icon: Terminal,
      tone: "sky",
    },
    {
      title: "Security Boundaries",
      desc: "Enforces privilege separation, sandboxing, and system-level access control policies.",
      icon: ShieldCheck,
      tone: "red",
    },
  ];

  const platforms = [
    ["Windows", "Desktop Ecosystem", "Microsoft"],
    ["macOS", "Unix Desktop Stack", "Apple"],
    ["Linux", "Server Infrastructure", "Open Source"],
    ["Android", "Mobile Runtime", "Google"],
    ["iOS", "Closed Mobile Stack", "Apple"],
    ["ChromeOS", "Web-first OS", "Google"],
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 p-6 md:p-10 antialiased relative overflow-x-hidden">

      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-indigo-500/10 blur-[160px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 blur-[160px]" />

      <div className="max-w-6xl mx-auto space-y-10">

        {/* HEADER */}
        <header className="relative rounded-3xl border border-slate-200 dark:border-slate-900 bg-white/60 dark:bg-slate-900/30 backdrop-blur-xl p-8 overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <Cpu className="w-28 h-28" />
          </div>

          <div className="flex items-center gap-2 text-indigo-500 text-xs font-mono uppercase tracking-widest">
            <Cpu className="w-4 h-4" />
            System Architecture Layer
          </div>

          <h1 className="text-4xl md:text-5xl font-black mt-3">
            Operating Systems
          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-3xl text-sm leading-relaxed">
            Operating systems function as the orchestration layer between hardware
            execution units and application-level workloads, governing scheduling,
            memory, I/O, and security domains.
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
                      : "bg-slate-100 dark:bg-slate-900 text-slate-500 hover:text-white hover:bg-slate-800"
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

          {/* CONCEPTS */}
          {activeTab === "concepts" && (
            <motion.section
              key="concepts"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid md:grid-cols-2 gap-4"
            >
              {conceptBlocks.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white/80 dark:bg-slate-900/20 backdrop-blur"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-950">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-semibold text-sm">{c.title}</h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                );
              })}
            </motion.section>
          )}

          {/* PLATFORMS */}
          {activeTab === "platforms" && (
            <motion.section
              key="platforms"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid md:grid-cols-3 gap-4"
            >
              {platforms.map(([name, scope, vendor]) => (
                <div
                  key={name}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white/80 dark:bg-slate-900/20"
                >
                  <div className="font-semibold">{name}</div>
                  <div className="text-xs text-slate-500">{scope}</div>
                  <div className="text-xs text-slate-400 mt-2">{vendor}</div>
                </div>
              ))}
            </motion.section>
          )}

          {/* KERNEL */}
          {activeTab === "kernel" && (
            <motion.section
              key="kernel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white/80 dark:bg-slate-900/20">
                <h3 className="font-semibold flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  Kernel Abstraction Layer
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  The kernel operates in privileged execution space, mediating
                  hardware access, process scheduling, and system calls. Below are some distros under the Linux kernel.
                </p>
              </div>

              <div className="space-y-5">

                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                      Distribution Ecosystem Matrix
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Modern Linux and UNIX-like operating environments engineered for different deployment pipelines.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Active Distros
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {distros.map((d) => (
                    <div
                      key={d.name}
                      className={`
                        group relative overflow-hidden rounded-2xl border
                        ${d.border}
                        bg-white/80 dark:bg-slate-900/30
                        backdrop-blur-sm
                        p-4
                        transition-all duration-300
                        hover:-translate-y-1
                        hover:shadow-xl
                        ${d.glow}
                      `}
                    >

                      {/* Ambient Gradient */}
                      <div
                        className={`
                          absolute inset-0 opacity-0 group-hover:opacity-100
                          transition-opacity duration-500
                          bg-gradient-to-br ${d.color}
                        `}
                      />

                      {/* Top Glow Orb */}
                      <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-white/10 blur-3xl pointer-events-none" />

                      <div className="relative z-10 space-y-3">

                        {/* Header */}
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4 className="text-sm font-black tracking-tight text-slate-900 dark:text-white">
                              {d.name}
                            </h4>

                            <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-slate-400 mt-1">
                              {d.family}
                            </p>
                          </div>

                          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-lg shadow-cyan-500/20 mt-1 shrink-0" />
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />

                        {/* Footer Meta */}
                        <div className="flex items-center justify-between text-[10px] font-medium text-slate-400">

                          <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                            OS
                          </span>

                          <span className="group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                            Kernel-Based
                          </span>

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

        </AnimatePresence>

        {/* MEDIA */}
        <section className="rounded-3xl border border-slate-200 dark:border-slate-900 overflow-hidden">

          <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-black shadow-md aspect-video">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/26QPDBe-NB8"
              title="Programming Languages Explained"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>

        {/* SUMMARY */}
        <section className="p-8 rounded-3xl border border-slate-200 dark:border-slate-900 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 relative">
          <div className="absolute top-0 right-0 opacity-10">
            <Info className="w-20 h-20" />
          </div>

          <h3 className="font-semibold text-sm uppercase tracking-widest text-indigo-500">
            System Summary
          </h3>

          <p className="text-xs text-slate-500 mt-3 leading-relaxed max-w-3xl">
            Operating systems translate hardware capability into controlled,
            schedulable compute resources, enforcing deterministic execution
            across multi-layered digital environments.
          </p>
        </section>

        
        <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 dark:text-slate-600 pt-4 border-t border-slate-200 dark:border-slate-900">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping mr-1" />
            OPERATING SYSTEMS
          </div>
        </footer>



      </div>
    </div>
  );
}