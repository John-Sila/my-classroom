import React, { useState } from "react";
import {
  Cpu,
  Layers,
  Terminal,
  ShieldCheck,
  Monitor,
  HardDrive,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function OperatingSystemsTopic() {
  const [activeTab, setActiveTab] = useState<"concepts" | "platforms" | "kernel">("concepts");

  const distros = [
    { name: "Ubuntu", family: "Debian-Based", color: "from-orange-500/20 to-red-500/10", border: "border-orange-500/30", glow: "group-hover:shadow-orange-500/20" },
    { name: "Debian", family: "Universal GNU/Linux", color: "from-pink-500/20 to-rose-500/10", border: "border-pink-500/30", glow: "group-hover:shadow-pink-500/20" },
    { name: "Fedora", family: "Red Hat Ecosystem", color: "from-blue-500/20 to-cyan-500/10", border: "border-blue-500/30", glow: "group-hover:shadow-blue-500/20" },
    { name: "Arch Linux", family: "Rolling Release", color: "from-cyan-500/20 to-sky-500/10", border: "border-cyan-500/30", glow: "group-hover:shadow-cyan-500/20" },
    { name: "Linux Mint", family: "Beginner Friendly", color: "from-emerald-500/20 to-green-500/10", border: "border-emerald-500/30", glow: "group-hover:shadow-emerald-500/20" },
    { name: "Kali Linux", family: "Security Research", color: "from-indigo-500/20 to-violet-500/10", border: "border-indigo-500/30", glow: "group-hover:shadow-indigo-500/20" },
    { name: "openSUSE", family: "Enterprise Linux", color: "from-lime-500/20 to-green-500/10", border: "border-lime-500/30", glow: "group-hover:shadow-lime-500/20" },
    { name: "Gentoo", family: "Source-Based", color: "from-violet-500/20 to-fuchsia-500/10", border: "border-violet-500/30", glow: "group-hover:shadow-violet-500/20" },
    { name: "Slackware", family: "Classic UNIX Style", color: "from-slate-500/20 to-slate-700/10", border: "border-slate-500/30", glow: "group-hover:shadow-slate-500/20" },
    { name: "NixOS", family: "Declarative OS", color: "from-sky-500/20 to-blue-500/10", border: "border-sky-500/30", glow: "group-hover:shadow-sky-500/20" },
    { name: "ChromeOS", family: "Cloud-Centric", color: "from-yellow-500/20 to-orange-500/10", border: "border-yellow-500/30", glow: "group-hover:shadow-yellow-500/20" },
    { name: "Android-x86", family: "Mobile Hybrid", color: "from-green-500/20 to-emerald-500/10", border: "border-green-500/30", glow: "group-hover:shadow-green-500/20" },
    { name: "FreeBSD", family: "BSD UNIX", color: "from-red-500/20 to-rose-500/10", border: "border-red-500/30", glow: "group-hover:shadow-red-500/20" },
    { name: "Haiku OS", family: "BeOS Inspired", color: "from-amber-500/20 to-yellow-500/10", border: "border-amber-500/30", glow: "group-hover:shadow-amber-500/20" },
    { name: "Rocky Linux", family: "Enterprise RHEL", color: "from-emerald-600/20 to-teal-600/10", border: "border-emerald-600/30", glow: "group-hover:shadow-emerald-600/20" },
    { name: "AlmaLinux", family: "Enterprise RHEL", color: "from-orange-600/20 to-amber-500/10", border: "border-orange-600/30", glow: "group-hover:shadow-orange-600/20" },
    { name: "Alpine Linux", family: "Ultra Lightweight", color: "from-blue-400/20 to-slate-400/10", border: "border-blue-400/30", glow: "group-hover:shadow-blue-400/20" },
    { name: "Manjaro", family: "Arch-Based", color: "from-teal-500/20 to-emerald-500/10", border: "border-teal-500/30", glow: "group-hover:shadow-teal-500/20" },
    { name: "EndeavourOS", family: "Arch-Based", color: "from-purple-600/20 to-pink-600/10", border: "border-purple-600/30", glow: "group-hover:shadow-purple-600/20" },
    { name: "Pop!_OS", family: "System76 Ubuntu", color: "from-cyan-400/20 to-teal-500/10", border: "border-cyan-400/30", glow: "group-hover:shadow-cyan-400/20" },
    { name: "Zorin OS", family: "Windows Alternative", color: "from-blue-600/20 to-sky-400/10", border: "border-blue-600/30", glow: "group-hover:shadow-blue-600/20" },
    { name: "Elementary OS", family: "Design-Centric", color: "from-sky-400/20 to-indigo-400/10", border: "border-sky-400/30", glow: "group-hover:shadow-sky-400/20" },
    { name: "MX Linux", family: "Midweight Debian", color: "from-neutral-600/20 to-slate-500/10", border: "border-neutral-600/30", glow: "group-hover:shadow-neutral-600/20" },
    { name: "Void Linux", family: "Independent", color: "from-lime-600/20 to-emerald-600/10", border: "border-lime-600/30", glow: "group-hover:shadow-lime-600/20" },
    { name: "Solus", family: "Independent Curated", color: "from-slate-400/20 to-blue-900/10", border: "border-slate-400/30", glow: "group-hover:shadow-slate-400/20" },
    { name: "Qubes OS", family: "Security-Focused", color: "from-blue-700/20 to-indigo-900/10", border: "border-blue-700/30", glow: "group-hover:shadow-blue-700/20" },
    { name: "Tails", family: "Amnesic Incognito", color: "from-purple-500/20 to-indigo-600/10", border: "border-purple-500/30", glow: "group-hover:shadow-purple-500/20" },
    { name: "Parrot OS", family: "Security & Dev", color: "from-cyan-500/20 to-emerald-400/10", border: "border-cyan-500/30", glow: "group-hover:shadow-cyan-500/20" },
    { name: "Puppy Linux", family: "Ultra Portable Tiny", color: "from-yellow-600/20 to-amber-700/10", border: "border-yellow-600/30", glow: "group-hover:shadow-yellow-600/20" },
    { name: "OpenBSD", family: "Secure BSD Fork", color: "from-amber-500/20 to-orange-600/10", border: "border-amber-500/30", glow: "group-hover:shadow-amber-500/20" },
    { name: "NetBSD", family: "Highly Portable BSD", color: "from-orange-500/20 to-yellow-600/10", border: "border-orange-500/30", glow: "group-hover:shadow-orange-500/20" },
    { name: "DragonFly BSD", family: "Clustered BSD", color: "from-red-600/20 to-amber-600/10", border: "border-red-600/30", glow: "group-hover:shadow-red-600/20" },
    { name: "Garuda Linux", family: "Performance Gaming", color: "from-fuchsia-600/20 to-violet-600/10", border: "border-fuchsia-600/30", glow: "group-hover:shadow-fuchsia-600/20" },
    { name: "RHEL", family: "Commercial Enterprise", color: "from-red-700/20 to-neutral-900/20", border: "border-red-700/30", glow: "group-hover:shadow-red-700/20" },
    { name: "SUSE LE", family: "Global Business", color: "from-green-600/20 to-emerald-700/10", border: "border-green-600/30", glow: "group-hover:shadow-green-600/20" },
    { name: "Oracle Linux", family: "RHEL Database", color: "from-red-600/20 to-orange-600/10", border: "border-red-600/30", glow: "group-hover:shadow-red-600/20" },
    { name: "Clear Linux", family: "Intel Optimized", color: "from-blue-400/20 to-indigo-500/10", border: "border-blue-400/30", glow: "group-hover:shadow-blue-400/20" },
    { name: "Deepin", family: "Aesthetic Desktop", color: "from-sky-500/20 to-indigo-500/10", border: "border-sky-500/30", glow: "group-hover:shadow-sky-500/20" },
    { name: "Bodhi Linux", family: "Minimalist", color: "from-lime-500/20 to-neutral-700/10", border: "border-lime-500/30", glow: "group-hover:shadow-lime-500/20" },
    { name: "Lubuntu", family: "Lightweight LXQt", color: "from-blue-500/20 to-sky-400/10", border: "border-blue-500/30", glow: "group-hover:shadow-blue-500/20" },
    { name: "Xubuntu", family: "Stable XFCE", color: "from-blue-400/20 to-slate-400/10", border: "border-blue-400/30", glow: "group-hover:shadow-blue-400/20" },
    { name: "Kubuntu", family: "KDE Ubuntu", color: "from-indigo-600/20 to-blue-500/10", border: "border-indigo-600/30", glow: "group-hover:shadow-indigo-600/20" },
    { name: "CentOS Stream", family: "Upstream RHEL", color: "from-purple-500/20 to-red-500/10", border: "border-purple-500/30", glow: "group-hover:shadow-purple-500/20" },
    { name: "Mageia", family: "Mandriva Successor", color: "from-cyan-400/20 to-blue-600/10", border: "border-cyan-400/30", glow: "group-hover:shadow-cyan-400/20" },
    { name: "ReactOS", family: "Windows NT Clone", color: "from-slate-400/20 to-zinc-600/10", border: "border-slate-400/30", glow: "group-hover:shadow-slate-400/20" },
    { name: "Illumos", family: "OpenSolaris Fork", color: "from-orange-600/20 to-amber-500/10", border: "border-orange-600/30", glow: "group-hover:shadow-orange-600/20" },
    { name: "SmartOS", family: "Hypervisor Specialized", color: "from-purple-700/20 to-fuchsia-800/10", border: "border-purple-700/30", glow: "group-hover:shadow-purple-700/20" },
    { name: "Guix System", family: "Functional Config", color: "from-pink-600/20 to-yellow-600/10", border: "border-pink-600/30", glow: "group-hover:shadow-pink-600/20" },
    { name: "Devuan", family: "Systemd-Free Debian", color: "from-purple-800/20 to-indigo-950/20", border: "border-purple-800/30", glow: "group-hover:shadow-purple-800/20" },
  ];

  const tabs = [
    { id: "concepts", label: "Core Systems", icon: Cpu, color: "indigo" },
    { id: "platforms", label: "Platforms", icon: Monitor, color: "sky" },
    { id: "kernel", label: "Linux as Kernel", icon: Layers, color: "emerald" },
  ] as const;

  const conceptBlocks = [
    { title: "Hardware Resource Allocation", desc: "Schedules CPU threads, manages memory paging, coordinates storage I/O.", icon: HardDrive, tone: "indigo" },
    { title: "I/O & Interrupt Handling", desc: "Manages device drivers, peripheral input streams, system interrupt arbitration.", icon: Layers, tone: "emerald" },
    { title: "Execution Interfaces", desc: "Provides CLI and GUI abstraction layers for application execution.", icon: Terminal, tone: "sky" },
    { title: "Security Boundaries", desc: "Enforces privilege separation, sandboxing, system-level access control.", icon: ShieldCheck, tone: "red" },
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
    <div className="w-full max-w-6xl mx-auto px-4 py-10 space-y-8 antialiased selection:bg-indigo-500/10 text-slate-600 dark:text-slate-300">
      
      {/* Header */}
      <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-mono text-xs tracking-widest uppercase">
          <Cpu className="w-4 h-4" />
          System Architecture Layer
        </div>
        
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight sm:text-4xl">
          Operating Systems
        </h1>
        <p className="text-sm text-slate-400 dark:text-slate-500 max-w-2xl leading-relaxed">
          Operating systems function as the orchestration layer between hardware execution units and application-level workloads, governing scheduling, memory, I/O, and security domains.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 pt-4">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            const colorClasses: Record<string, string> = {
              indigo: active ? "bg-indigo-600 dark:bg-indigo-500" : "",
              sky: active ? "bg-sky-600 dark:bg-sky-500" : "",
              emerald: active ? "bg-emerald-600 dark:bg-emerald-500" : "",
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
        {/* TAB 1: CONCEPTS */}
        {activeTab === "concepts" && (
          <motion.div
            key="concepts"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid md:grid-cols-2 gap-4"
          >
            {conceptBlocks.map((c) => {
              const Icon = c.icon;
              const toneColors: Record<string, string> = {
                indigo: "text-indigo-500",
                emerald: "text-emerald-500",
                sky: "text-sky-500",
                red: "text-red-500",
              };

              return (
                <div
                  key={c.title}
                  className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      <Icon className={`w-4 h-4 ${toneColors[c.tone]}`} />
                    </div>
                    <h3 className="font-bold text-slate-950 dark:text-white text-sm">{c.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* TAB 2: PLATFORMS */}
        {activeTab === "platforms" && (
          <motion.div
            key="platforms"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid md:grid-cols-3 gap-4"
          >
            {platforms.map(([name, scope, vendor]) => (
              <div
                key={name}
                className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-5 shadow-sm"
              >
                <h3 className="font-bold text-slate-950 dark:text-white text-sm">{name}</h3>
                <p className="text-xs text-slate-400 mt-1">{scope}</p>
                <p className="text-xs text-slate-500 mt-2">{vendor}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* TAB 3: KERNEL */}
        {activeTab === "kernel" && (
          <motion.div
            key="kernel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-6 shadow-sm">
              <h3 className="font-bold text-slate-950 dark:text-white text-sm flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-500" />
                Kernel Abstraction Layer
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                The kernel operates in privileged execution space, mediating hardware access, process scheduling, and system calls. Below are Linux/UNIX-like distributions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white mb-2">
                Distribution Ecosystem
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Modern Linux and UNIX-like operating environments engineered for different deployment pipelines.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {distros.map((d) => (
                  <div
                    key={d.name}
                    className={`group relative overflow-hidden rounded-2xl border ${d.border} bg-white dark:bg-slate-900/40 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${d.glow}`}
                  >
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${d.color}`} />
                    
                    <div className="relative z-10 space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">{d.name}</h4>
                          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-0.5">{d.family}</p>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 shrink-0" />
                      </div>

                      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />

                      <div className="flex items-center justify-between text-[10px] font-medium text-slate-400">
                        <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">OS</span>
                        <span className="group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">Kernel-Based</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* YouTube Video */}
      <div className="aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-black shadow-lg">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/kK7L2ISGucM"
          title="Every Operating System Explained in 8 Minutes"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      {/* Summary */}
      <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950/50 p-6 shadow-sm">
        <h3 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">System Summary</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Operating systems translate hardware capability into controlled, schedulable compute resources, enforcing deterministic execution across multi-layered digital environments.
        </p>
      </div>

      {/* Footer */}
      <footer className="flex items-center gap-1 text-xs font-mono text-slate-400 dark:text-slate-600 pt-4 border-t border-slate-200 dark:border-slate-800">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
        OPERATING SYSTEMS
      </footer>
    </div>
  );
}