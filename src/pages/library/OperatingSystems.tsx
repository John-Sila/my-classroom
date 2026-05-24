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
    "Ubuntu", "Debian", "Fedora", "Arch Linux", "Linux Mint",
    "Kali Linux", "openSUSE", "Gentoo", "Slackware", "NixOS",
    "ChromeOS", "Android-x86", "FreeBSD", "Haiku OS",
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
      label: "Kernel Layer",
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
                  hardware access, process scheduling, and system calls.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {distros.map((d) => (
                  <span
                    key={d}
                    className="px-3 py-1.5 rounded-xl text-xs border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20"
                  >
                    {d}
                  </span>
                ))}
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