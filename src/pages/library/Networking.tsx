import React, { useState } from "react";
import {
  Wifi,
  Server,
  Network,
  Globe,
  Link2,
  Search,
  ShieldCheck,
  ShieldAlert,
  Router,
  MonitorSmartphone,
  Laptop,
  Smartphone,
  Cloud,
  Database,
  Chrome,
  Compass,
  Lock,
  Fingerprint,
  AlertTriangle,
  CircleDot,
  ArrowRight,
  ArrowDown,
  Info,
  Globe2,
  Earth,
  Webhook,
  GlobeLock,
  Shield,
  Signal,
  CloudCog,
  FileCode2,
  User,
  Radio,
  Mail,
  BookOpen,
  Cpu,
  Layers,
  Sparkle,
  Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function NetworkingTechnology() {
  const [activeTab, setActiveTab] = useState<"basics" | "architectures" | "safety">("basics");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState<string>("");

  // --- Network classes ---
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

  const browserExamples = [
    "Google Chrome",
    "Mozilla Firefox",
    "Brave",
    "Maxthon",
    "Microsoft Edge",
    "Safari",
    "Opera",
    "Vivaldi",
    "Tor Browser",
    "DuckDuckGo Privacy Browser",
    "Chromium",
  ];

  const searchExamples = [
    "Google",
    "Bing",
    "Yahoo",
    "DuckDuckGo",
    "Brave Search",
    "QuadSearch",
    "Ask.com",
    "Ecosia",
    "Qwant",
    "Startpage",
    "Yandex",
    "Swisscows",
  ];

  const kenyanISPs = [
    "Safaricom (Home Fibre/5G)",
    "Airtel Kenya",
    "Jamii Telecommunications (Faiba)",
    "Zuku Fiber",
  ];

  const espExamples = [
    "Gmail (Google)",
    "Outlook (Microsoft)",
    "Yahoo Mail",
    "iCloud Mail",
    "Zoho Mail",
    "ProtonMail",
    "GMX Mail",
    "Yandex Mail",
    "AOL Mail",
    "Mail.com",
    "Fastmail",
  ];

  const safetyTips = [
    {
      icon: Lock,
      title: "Use strong passwords",
      desc: "Create long, unique passwords and avoid reusing them across accounts.",
    },
    {
      icon: GlobeLock,
      title: "Check for HTTPS",
      desc: "Ensure the URL padlocks are active before entering sensitive or billing credentials.",
    },
    {
      icon: Shield,
      title: "Keep software updated",
      desc: "Frequently update browsers and operating systems to patch security flaws.",
    },
    {
      icon: AlertTriangle,
      title: "Avoid suspicious links",
      desc: "Do not open unverified attachments or click weirdly compressed URLs.",
    },
    {
      icon: Fingerprint,
      title: "Protect personal data",
      desc: "Never dispatch private profiles, PINs, or confidential tokens to unknown parties.",
    },
    {
      icon: ShieldCheck,
      title: "Use antivirus protection",
      desc: "Employ automated firewall systems to monitor downloads and quarantine malware.",
    },
  ];

  const glossaryDefinitions = [
    {
      icon: Router,
      term: "Router",
      definition: "A hardware device that acts as a traffic controller between different networks. It forwards data packets from your local devices to the internet and ensures it routes to the correct destination.",
    },
    {
      icon: Radio,
      term: "ISP (Internet Service Provider)",
      definition: "The company that provides you with access to the internet. They manage the physical infrastructure and gateway access to the wider web.",
    },
    {
      icon: Mail,
      term: "ESP (Email Service Provider)",
      definition: "A specialized platform or software company that enables users to construct, host, send, and receive digital email communications across the internet.",
    },
    {
      icon: MonitorSmartphone,
      term: "IP Address",
      definition: "Internet Protocol Address. A unique sequence of numbers assigned to every device connected to a computer network, allowing it to be located and safely identified.",
    },
    {
      icon: Database,
      term: "Domain Name",
      definition: "The human-readable, easy-to-remember alias used to access websites without having to memorize raw numbers or complex IP configurations.",
    },
    {
      icon: Server,
      term: "Servers",
      definition: "High-powered computers engineered exclusively to host, handle, and dish out data, resources, or specific services instantly to requesting devices over a network.",
    },
    {
      icon: Link2,
      term: "URL",
      definition: "Uniform Resource Locator. The complete structural web address architecture deployed by your browser to locate exact files, directories, or assets online.",
    },
    {
      icon: Signal,
      term: "Bandwidth",
      definition: "The maximum capacity or rate threshold of data that can be successfully transferred over a specific network communication line during a fixed span of time.",
    },
    {
      icon: CloudCog,
      term: "Cloud Computing",
      definition: "The delivery of active computing resources—including data storage, raw processing power, and modular tools—on-demand over the internet on hosted infrastructure.",
    },
  ];

  const filteredGlossary = glossaryDefinitions.filter(
    (def) =>
      def.term.toLowerCase().includes(searchFilter.toLowerCase()) ||
      def.definition.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans p-4 md:p-8 selection:bg-indigo-500/20 overflow-x-hidden antialiased transition-colors duration-300">
      {/* --- Ambient Glows --- */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/[0.015] dark:bg-indigo-500/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-sky-500/[0.015] dark:bg-sky-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8">
        {/* --- Hero Header --- */}
        <header className="border border-slate-200 dark:border-slate-900 rounded-3xl p-6 md:p-8 bg-white/60 dark:bg-slate-900/20 backdrop-blur-md shadow-sm dark:shadow-none relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] dark:opacity-10">
            <Sparkle className="w-24 h-24 text-slate-900 dark:text-slate-400" />
          </div>

          <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400 font-mono text-xs tracking-widest uppercase mb-3">
            <Network className="w-4 h-4 animate-pulse" />
            Computer Networking Fundamentals
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400">
            Networking Technology
          </h1>

          <p className="text-slate-500 dark:text-slate-400 max-w-3xl text-sm md:text-base leading-relaxed">
            Networking technology connects devices, people, and backend servers so they can seamlessly communicate, share structural data, and gain access to the global web infrastructure.
          </p>

          {/* --- Tab Controls --- */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-100 dark:border-slate-900">
            <button
              onClick={() => setActiveTab("basics")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-colors duration-200 ${
                activeTab === "basics"
                  ? "bg-indigo-600 dark:bg-indigo-500 text-white dark:text-slate-950 shadow-md shadow-indigo-500/10 dark:shadow-indigo-500/20 font-bold scale-105"
                  : "bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              <Globe className="w-4 h-4" /> Core Concepts
            </button>

            <button
              onClick={() => setActiveTab("architectures")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-colors duration-200 ${
                activeTab === "architectures"
                  ? "bg-sky-600 dark:bg-sky-500 text-white dark:text-slate-950 shadow-md shadow-sky-500/10 dark:shadow-sky-500/20 font-bold scale-105"
                  : "bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              <Layers className="w-4 h-4" /> Architectures & Flows
            </button>

            <button
              onClick={() => setActiveTab("safety")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-colors duration-200 ${
                activeTab === "safety"
                  ? "bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 shadow-md shadow-emerald-500/10 dark:shadow-emerald-500/20 font-bold scale-105"
                  : "bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> Safety & Security
            </button>
          </div>

        </header>

        {/* --- Animated Tabs --- */}
        <AnimatePresence mode="wait">
          {/* TAB 1: CORE CONCEPTS */}
          {activeTab === "basics" && (
            <motion.div
              key="basics"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* Pillar‑boxes */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    icon: Radio,
                    title: "Connectivity",
                    desc: "Devices securely communicate using physical enterprise cables or local wireless airwave channels.",
                  },
                  {
                    icon: Compass,
                    title: "Access Pathways",
                    desc: "Users leverage software routes to request resources, search definitions, and run remote services.",
                  },
                  {
                    icon: Shield,
                    title: "Defensive Habits",
                    desc: "Implementing clean security loops guarantees your digital privacy and hardware endpoints stay safe.",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="p-5 rounded-2xl border border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-900/20 space-y-3 shadow-sm dark:shadow-none"
                    >
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 text-indigo-500 w-fit">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white tracking-tight">{item.title}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Network types grid */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-200 dark:border-slate-900 p-4 rounded-2xl bg-white dark:bg-slate-900/30 shadow-sm">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Network Pattern Index</h3>
                    <p className="text-xs text-slate-400">Classifying connectivity models by physical scope and medium.</p>
                  </div>
                  <div className="relative max-w-xs w-full">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Filter network types..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-9 pr-4 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-xl text-xs font-mono focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {filteredGlossary.map((def) => {
                    const isExpanded = expandedCard === def.term;
                    const Icon = def.icon;
                    return (
                      <motion.div
                        layout="position"
                        key={def.term}
                        onClick={() => setExpandedCard(isExpanded ? null : def.term)}
                        className={`p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 hover:bg-white dark:hover:bg-slate-900/40 transition-all cursor-pointer shadow-sm dark:shadow-none ${
                          isExpanded ? "lg:col-span-2 border-indigo-500/40 bg-white dark:bg-slate-900/50 shadow-md" : ""
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-black text-sm tracking-tight text-indigo-600 dark:text-indigo-400">
                              {def.term}
                            </h3>
                            <span className="text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 text-slate-400">
                              {def.term === "Router" || def.term === "Server" ? "Hardware" : "Layer"}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            {def.definition}
                          </p>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-[11px] bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-900/60 text-slate-600 dark:text-slate-400 mt-2"
                            >
                              <div className="font-bold text-indigo-500 uppercase tracking-wider text-[9px] font-mono">Use Case Examples</div>
                              <p className="leading-normal font-sans">Used to route traffic in labs, homes, enterprises, and cloud backbones.</p>
                            </motion.div>
                          )}
                          <div className={`flex justify-end items-center mt-3 pt-1 border-t border-slate-50 dark:border-slate-950/40 text-[11px] font-mono`}>
                            <span>
                              <Icon className="w-4 h-4 text-indigo-500 inline mr-1.5" />
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: ARCHITECTURES & FLOWS */}
          {activeTab === "architectures" && (
            <motion.div
              key="architectures"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* Network types gallery */}
              <div className="grid gap-4 sm:grid-cols-2">
                {networkTypes.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="p-6 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm dark:shadow-none"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 text-indigo-500 shrink-0">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1 space-y-1.5">
                          <h3 className="font-bold text-sm text-slate-900 dark:text-white tracking-tight">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{item.short}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
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
              <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-900 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900/50 shadow-sm">
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
                        <div
                          className={`min-w-[110px] rounded-2xl border border-slate-200 dark:border-slate-900 px-3 py-3 text-center font-semibold ${item.color} flex flex-col items-center gap-2 shadow-sm`}
                        >
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

          {/* TAB 3: SAFETY & SECURITY */}
          {activeTab === "safety" && (
            <motion.div
              key="safety"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* Safety cards */}
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {safetyTips.map((tip) => {
                  const Icon = tip.icon;
                  return (
                    <div
                      key={tip.title}
                      className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 space-y-3 shadow-sm dark:shadow-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 text-emerald-500">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-slate-900 dark:text-white tracking-tight">
                            {tip.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{tip.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Video embed section */}
              <div className="border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/10 backdrop-blur-md rounded-[2rem] overflow-hidden p-6 md:p-8 space-y-4 shadow-sm dark:shadow-none">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Technical Deep Dive</h3>
                  <p className="text-xs text-slate-400">Understanding how networks operate at each layer and potential attack surfaces.</p>
                </div>
                <div className="relative w-full rounded-2xl overflow-hidden bg-black shadow-inner aspect-video border border-slate-200 dark:border-slate-900">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/tSodBEAJz9Y"
                    title="Computer Networks Explained"
                    allowFullScreen
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Global Summary --- */}
        <section className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-900 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 relative overflow-hidden shadow-sm dark:shadow-none">
          <div className="absolute top-0 right-0 p-6 text-slate-100 dark:text-slate-900 pointer-events-none">
            <Info className="h-24 w-24 stroke-[3]" />
          </div>
          <div className="max-w-3xl relative z-10 space-y-2">
            <h3 className="text-sm font-bold tracking-wider font-mono uppercase text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Networking Landscape Summary
            </h3>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Networks span from physical LANs to global WANs, enabling seamless communication between devices, servers, and cloud services. 
              Understanding routers, ISPs, DNS, and security practices is essential for safe and reliable internet use.
            </p>
          </div>
        </section>
      </div>
      <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 dark:text-slate-600 pt-4 border-t border-slate-200 dark:border-slate-900">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping mr-1" />
          NETWORKS
        </div>
      </footer>
    </div>
  );
}