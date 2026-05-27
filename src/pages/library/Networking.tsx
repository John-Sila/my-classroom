import React, { useState } from "react";
import {
  Wifi,
  Network,
  Globe,
  Search,
  ShieldCheck,
  Router,
  Cloud,
  Database,
  Compass,
  Lock,
  Fingerprint,
  AlertTriangle,
  Info,
  GlobeLock,
  Shield,
  Signal,
  CloudCog,
  Radio,
  Mail,
  Cpu,
  Layers,
  User,
  Laptop,
  Server,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function NetworkingTechnology() {
  const [activeTab, setActiveTab] = useState<"basics" | "architectures" | "safety">("basics");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState("");

  const networkTypes = [
    {
      icon: Network,
      title: "LAN",
      short: "Local Area Network",
      desc: "Connects devices within a small, confined physical area.",
      example: "Example: Computers in a school lab connected together.",
    },
    {
      icon: Wifi,
      title: "WLAN",
      short: "Wireless Local Area Network",
      desc: "A local area network that links devices using wireless signals instead of cables.",
      example: "Example: A home Wi‑Fi network connecting your phones and smart TV.",
    },
    {
      icon: Globe,
      title: "WAN",
      short: "Wide Area Network",
      desc: "Connects smaller networks across massive geographic distances like countries or continents.",
      example: "Example: The global Internet itself, or a bank linking branches countrywide.",
    },
    {
      icon: Router,
      title: "Wi‑Fi",
      short: "Wireless Fidelity",
      desc: "The underlying wireless radio technology that allows devices to interface with a local network.",
      example: "Example: Connecting your tablet to a school campus hotspot.",
    },
  ];

  const glossaryDefinitions = [
    {
      icon: Router,
      term: "Router",
      definition: "A hardware device that acts as a traffic controller between different networks. It forwards data packets from your local devices to the internet.",
      type: "Hardware",
    },
    {
      icon: Radio,
      term: "ISP (Internet Service Provider)",
      definition: "The company that provides you with access to the internet. They manage the physical infrastructure and gateway access to the wider web.",
      type: "Layer",
    },
    {
      icon: Mail,
      term: "ESP (Email Service Provider)",
      definition: "A specialized platform that enables users to construct, host, send, and receive digital email communications across the internet.",
      type: "Layer",
    },
    {
      icon: Laptop,
      term: "IP Address",
      definition: "Internet Protocol Address. A unique sequence of numbers assigned to every device connected to a network, allowing it to be located and identified.",
      type: "Layer",
    },
    {
      icon: Database,
      term: "Domain Name",
      definition: "The human-readable alias used to access websites without memorizing raw IP numbers.",
      type: "Layer",
    },
    {
      icon: Server,
      term: "Servers",
      definition: "High-powered computers engineered to host, handle, and deliver data, resources, or services to requesting devices over a network.",
      type: "Hardware",
    },
    {
      icon: "link2" as any,
      term: "URL",
      definition: "Uniform Resource Locator. The complete structural web address deployed by your browser to locate exact files or assets online.",
      type: "Layer",
    },
    {
      icon: Signal,
      term: "Bandwidth",
      definition: "The maximum capacity or rate of data that can be transferred over a network communication line during a fixed time.",
      type: "Layer",
    },
    {
      icon: CloudCog,
      term: "Cloud Computing",
      definition: "The delivery of computing resources—including storage, processing power, and tools—on-demand over the internet.",
      type: "Layer",
    },
  ];

  const filteredGlossary = glossaryDefinitions.filter(
    (def) =>
      def.term.toLowerCase().includes(searchFilter.toLowerCase()) ||
      def.definition.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const safetyTips = [
    { icon: Lock, title: "Use strong passwords", desc: "Create long, unique passwords and avoid reusing them across accounts." },
    { icon: GlobeLock, title: "Check for HTTPS", desc: "Ensure the URL padlock is active before entering sensitive or billing credentials." },
    { icon: Shield, title: "Keep software updated", desc: "Frequently update browsers and operating systems to patch security flaws." },
    { icon: AlertTriangle, title: "Avoid suspicious links", desc: "Do not open unverified attachments or click weirdly compressed URLs." },
    { icon: Fingerprint, title: "Protect personal data", desc: "Never share private profiles, PINs, or confidential tokens with unknown parties." },
    { icon: ShieldCheck, title: "Use antivirus protection", desc: "Employ automated firewall systems to monitor downloads and quarantine malware." },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 space-y-8 antialiased selection:bg-indigo-500/20 text-slate-600 dark:text-slate-300">
      
      {/* Header */}
      <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400 font-mono text-xs tracking-widest uppercase">
          <Network className="w-4 h-4 animate-pulse" />
          Computer Networking Fundamentals
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          Networking Technology
        </h1>
        <p className="text-sm md:text-base text-slate-400 dark:text-slate-500 max-w-3xl leading-relaxed">
          Networking technology connects devices, people, and backend servers so they can seamlessly communicate, share structural data, and gain access to the global web infrastructure.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 pt-4">
          {[
            { id: "basics", label: "Core Concepts", icon: Globe, color: "indigo" },
            { id: "architectures", label: "Architectures & Flows", icon: Layers, color: "sky" },
            { id: "safety", label: "Safety & Security", icon: ShieldCheck, color: "emerald" },
          ].map((t) => {
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
        {/* TAB 1: BASICS */}
        {activeTab === "basics" && (
          <motion.div
            key="basics"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {/* Pillar boxes */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Radio, title: "Connectivity", desc: "Devices communicate using physical cables or wireless airwave channels." },
                { icon: Compass, title: "Access Pathways", desc: "Users leverage software routes to request resources and run remote services." },
                { icon: Shield, title: "Defensive Habits", desc: "Clean security loops guarantee digital privacy and hardware endpoints stay safe." },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-5 shadow-sm space-y-3">
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-indigo-500 w-fit">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-950 dark:text-white tracking-tight">{item.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Glossary with search */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-200/60 dark:border-slate-800/80 p-4 rounded-2xl bg-white dark:bg-slate-900/40 shadow-sm">
                <div>
                  <h3 className="text-sm font-bold text-slate-950 dark:text-white">Network Pattern Index</h3>
                  <p className="text-xs text-slate-400">Classifying connectivity models by physical scope and medium.</p>
                </div>
                <div className="relative max-w-xs w-full">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Filter glossary..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {filteredGlossary.map((def) => {
                  const isExpanded = expandedCard === def.term;
                  const Icon = def.icon as any;
                  return (
                    <motion.div
                      layout
                      key={def.term}
                      onClick={() => setExpandedCard(isExpanded ? null : def.term)}
                      className={`rounded-2xl border p-5 cursor-pointer shadow-sm transition-all ${
                        isExpanded
                          ? "sm:col-span-2 border-indigo-500/40 bg-white dark:bg-slate-900/50 shadow-md"
                          : "border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900/60"
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-black text-sm tracking-tight text-indigo-600 dark:text-indigo-400">{def.term}</h3>
                          <span className="text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-400">
                            {def.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{def.definition}</p>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[11px] bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 mt-2"
                          >
                            <div className="font-bold text-indigo-500 uppercase tracking-wider text-[9px] font-mono">Use Case Examples</div>
                            <p className="leading-normal font-sans">Used to route traffic in labs, homes, enterprises, and cloud backbones.</p>
                          </motion.div>
                        )}
                        <div className="flex justify-end items-center pt-1 border-t border-slate-100 dark:border-slate-800/60 text-[11px] font-mono">
                          <Icon className="w-4 h-4 text-indigo-500 inline mr-1.5" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: ARCHITECTURES */}
        {activeTab === "architectures" && (
          <motion.div
            key="architectures"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {/* Network types */}
            <div className="grid gap-4 sm:grid-cols-2">
              {networkTypes.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-6 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-indigo-500 shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1 space-y-1.5">
                        <h3 className="font-bold text-sm text-slate-950 dark:text-white tracking-tight">{item.title}</h3>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{item.short}</p>
                        <p className="text-xs text-slate-400">{item.desc}</p>
                        <p className="mt-2 text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-lg inline-block">
                          {item.example}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Flow diagram */}
            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900/50 p-6 shadow-sm">
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { label: "User", icon: User, color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400" },
                  { label: "Device", icon: Laptop, color: "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400" },
                  { label: "Browser", icon: Router, color: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400" },
                  { label: "Search Engine", icon: Search, color: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400" },
                  { label: "Web & Servers", icon: Server, color: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400" },
                ].map((item, index, arr) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-2 flex-shrink-0">
                      <div className={`min-w-[110px] rounded-2xl border border-slate-200 dark:border-slate-800 px-3 py-3 text-center font-semibold ${item.color} flex flex-col items-center gap-2 shadow-sm`}>
                        <div className="p-2 rounded-xl bg-white/70 dark:bg-black/20">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-[10px] leading-tight">{item.label}</span>
                      </div>
                      {index !== arr.length - 1 && (
                        <div className="text-slate-400 text-lg px-1">
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: SAFETY */}
        {activeTab === "safety" && (
          <motion.div
            key="safety"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {/* Safety tips */}
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {safetyTips.map((tip) => {
                const Icon = tip.icon;
                return (
                  <div key={tip.title} className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-5 shadow-sm space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-emerald-500">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-950 dark:text-white tracking-tight">{tip.title}</h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{tip.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Video preview */}
            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-6 shadow-sm">
              <div>
                <h3 className="text-sm font-bold text-slate-950 dark:text-white">Technical Deep Dive</h3>
                <p className="text-xs text-slate-400">Understanding how networks operate at each layer and potential attack surfaces.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary */}
      <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950/50 p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 text-slate-100 dark:text-slate-900 pointer-events-none">
          <Info className="h-24 w-24 stroke-[3]" />
        </div>
        <div className="max-w-3xl relative z-10 space-y-2">
          <h3 className="text-sm font-bold tracking-wider font-mono uppercase text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Networking Landscape Summary
          </h3>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Networks span from physical LANs to global WANs, enabling seamless communication between devices, servers, and cloud services. Understanding routers, ISPs, DNS, and security practices is essential for safe and reliable internet use.
          </p>
        </div>
      </div>

      {/* YouTube Video */}
      <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-inner border border-slate-200/60 dark:border-slate-800/80">
        <iframe
          className="w-full h-full opacity-90"
          src="https://www.youtube.com/embed/tSodBEAJz9Y"
          title="Computer Networking Explained | Cisco CCNA 200-301"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      {/* Footer */}
      <footer className="flex items-center gap-1 text-xs font-mono text-slate-400 dark:text-slate-600 pt-4 border-t border-slate-200 dark:border-slate-800">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
        NETWORKS
      </footer>
    </div>
  );
}