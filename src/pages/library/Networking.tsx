import React from "react";
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
} from "lucide-react";

export default function NetworkingTechnology() {
  const networkTypes = [
    {
      icon: <Network className="h-5 w-5" />,
      title: "LAN",
      short: "Local Area Network",
      desc: "Connects devices within a small, confined physical area.",
      example: "Example: Computers in a school lab connected together.",
    },
    {
      icon: <Wifi className="h-5 w-5" />,
      title: "WLAN",
      short: "Wireless Local Area Network",
      desc: "A local area network that links devices using wireless signals instead of cables.",
      example: "Example: A home Wi‑Fi network connecting your phones and smart TV.",
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "WAN",
      short: "Wide Area Network",
      desc: "Connects smaller networks across massive geographic distances like countries or continents.",
      example: "Example: The global Internet itself, or a bank linking branches countrywide.",
    },
    {
      icon: <Router className="h-5 w-5" />,
      title: "Wi‑Fi",
      short: "Wireless Fidelity",
      desc: "The underlying wireless radio technology that allows devices to interface with a local network.",
      example: "Example: Connecting your tablet to a school campus hotspot.",
    },
  ];

  const browserExamples = ["Google Chrome", "Mozilla Firefox", "Brave", "Maxthon", "Microsoft Edge", "Safari", "Opera", "Vivaldi", "Tor Browser", "DuckDuckGo Privacy Browser", "Chromium"];
  const searchExamples = ["Google", "Bing", "Yahoo", "DuckDuckGo", "Brave Search", "QuadSearch", "Ask.com", "Ecosia", "Qwant", "Startpage", "Yandex", "Swisscows"];
  const kenyanISPs = ["Safaricom (Home Fibre/5G)", "Airtel Kenya", "Jamii Telecommunications (Faiba)", "Zuku Fiber"];
  const espExamples = ["Gmail (Google)", "Outlook (Microsoft)", "Yahoo Mail", "iCloud Mail", "Zoho Mail", "ProtonMail", "GMX Mail", "Yandex Mail", "AOL Mail", "Mail.com", "Fastmail"];

  const safetyTips = [
    {
      icon: <Lock className="h-5 w-5" />,
      title: "Use strong passwords",
      desc: "Create long, unique passwords and avoid reusing them across accounts.",
    },
    {
      icon: <GlobeLock className="h-5 w-5" />,
      title: "Check for HTTPS",
      desc: "Ensure the URL padlocks are active before entering sensitive or billing credentials.",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Keep software updated",
      desc: "Frequently update browsers and operating systems to patch security flaws.",
    },
    {
      icon: <AlertTriangle className="h-5 w-5" />,
      title: "Avoid suspicious links",
      desc: "Do not open unverified attachments or click weirdly compressed URLs.",
    },
    {
      icon: <Fingerprint className="h-5 w-5" />,
      title: "Protect personal data",
      desc: "Never dispatch private profiles, PINs, or confidential tokens to unknown parties.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Use antivirus protection",
      desc: "Employ automated firewall systems to monitor downloads and quarantine malware.",
    },
  ];

  const glossaryDefinitions = [
    {
      icon: <Router className="h-5 w-5 text-indigo-500" />,
      term: "Router",
      definition: "A hardware device that acts as a traffic controller between different networks. It forwards data packets from your local devices to the internet and ensures it routes to the correct destination.",
    },
    {
      icon: <Radio className="h-5 w-5 text-indigo-500" />,
      term: "ISP (Internet Service Provider)",
      definition: "The company that provides you with access to the internet. They manage the physical infrastructure and gateway access to the wider web.",
    },
    {
      icon: <Mail className="h-5 w-5 text-indigo-500" />,
      term: "ESP (Email Service Provider)",
      definition: "A specialized platform or software company that enables users to construct, host, send, and receive digital email communications across the internet.",
    },
    {
      icon: <MonitorSmartphone className="h-5 w-5 text-indigo-500" />,
      term: "IP Address",
      definition: "Internet Protocol Address. A unique sequence of numbers assigned to every device connected to a computer network, allowing it to be located and safely identified.",
    },
    {
      icon: <Database className="h-5 w-5 text-indigo-500" />,
      term: "Domain Name",
      definition: "The human-readable, easy-to-remember alias used to access websites without having to memorize raw numbers or complex IP configurations.",
    },
    {
      icon: <Server className="h-5 w-5 text-indigo-500" />,
      term: "Servers",
      definition: "High-powered computers engineered exclusively to host, handle, and dish out data, resources, or specific services instantly to requesting devices over a network.",
    },
    {
      icon: <Link2 className="h-5 w-5 text-indigo-500" />,
      term: "URL",
      definition: "Uniform Resource Locator. The complete structural web address architecture deployed by your browser to locate exact files, directories, or assets online.",
    },
    {
      icon: <Signal className="h-5 w-5 text-indigo-500" />,
      term: "Bandwidth",
      definition: "The maximum capacity or rate threshold of data that can be successfully transferred over a specific network communication line during a fixed span of time.",
    },
    {
      icon: <CloudCog className="h-5 w-5 text-indigo-500" />,
      term: "Cloud Computing",
      definition: "The delivery of active computing resources—including data storage, raw processing power, and modular tools—on-demand over the internet on hosted infrastructure.",
    },
  ];

  return (
    <div className="w-full space-y-16 text-slate-600 dark:text-slate-300 leading-relaxed max-w-5xl mx-auto px-4 md:px-6 my-10 box-border">
      {/* HERO SECTION */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30">
            <Network className="h-3 w-3" /> Networking Technology
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
            <Globe className="h-3 w-3" /> Internet Basics
          </span>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Networking Technology
          </h1>
          <p className="text-base md:text-xl text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
            Networking technology connects devices, people, and backend servers so they can
            seamlessly communicate, share structural data, and gain access to the global web infrastructure.
          </p>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
                className="rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900/40 dark:to-slate-950/20 p-5 shadow-sm hover:border-indigo-500/40 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-500 shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-slate-900 dark:text-white text-sm md:text-base">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-6">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CORE WEB STRUCTURES */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            What the Internet Means
          </h2>
          <p className="text-sm text-slate-400 max-w-3xl">
            Internet stands for <span className="text-indigo-500 font-medium">interconnected network</span>.
          </p>
        </div>

        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
          <div className="p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900/40 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Globe className="h-5 w-5 text-indigo-500 shrink-0" />
              The Internet
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              The Internet is the colossal, physical hardware highway—a worldwide system of interconnected 
              computer networks that allows devices globally to exchange digital data packets.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900/40 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Globe2 className="h-5 w-5 text-indigo-500 shrink-0" />
              WWW (World Wide Web)
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              The World Wide Web represents the virtual collection of document pages, media assets, and interactive websites 
              stored on servers that you explore using web addresses.
            </p>
          </div>
        </div>
      </section>

      {/* NETWORK ARCHITECTURES */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Network Classifications
          </h2>
          <p className="text-sm text-slate-400">
            Common network configurations based on geographical layout and media constraints.
          </p>
        </div>

        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
          {networkTypes.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900/40 hover:border-indigo-500/30 transition-all duration-300 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-indigo-600 dark:text-indigo-400 shrink-0">
                  {item.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                    {item.short}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                  <p className="mt-3 text-xs md:text-sm font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-lg inline-block break-words max-w-full">
                    {item.example}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* UTILITY CAPABILITIES: BROWSERS, SEARCH ENGINES, ISPS & ESPS */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Web Ecosystem & Gateways
          </h2>
          <p className="text-sm text-slate-400">
            The software, infrastructure providers, and services that facilitate internet operations.
          </p>
        </div>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
          {/* BROWSERS CARD */}
          <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white dark:bg-slate-900/40 p-6 shadow-sm flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Chrome className="h-5 w-5 text-indigo-500 shrink-0" />
                <h3 className="font-bold text-slate-900 dark:text-white">Web Browsers</h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                The actual software interfaces rendering HTML, graphics, and online apps.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {browserExamples.map((item) => (
                <span key={item} className="rounded-full border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* SEARCH ENGINES CARD */}
          <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white dark:bg-slate-900/40 p-6 shadow-sm flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Search className="h-5 w-5 text-indigo-500 shrink-0" />
                <h3 className="font-bold text-slate-900 dark:text-white">Search Engines</h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Web tools indexing public servers to uncover precise contents through keywords.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {searchExamples.map((item) => (
                <span key={item} className="rounded-full border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* ISPs CARD (KENYAN EXAMPLES) */}
          <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white dark:bg-slate-900/40 p-6 shadow-sm flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Radio className="h-5 w-5 text-indigo-500 shrink-0" />
                <h3 className="font-bold text-slate-900 dark:text-white">ISPs (In Kenya)</h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                The utility companies providing data pipelines, optical fiber links, and 5G connections.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {kenyanISPs.map((item) => (
                <span key={item} className="rounded-full border border-teal-100 dark:border-teal-950 bg-teal-50/60 dark:bg-teal-950/30 px-2.5 py-1 text-xs font-semibold text-teal-700 dark:text-teal-400">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* ESPs CARD */}
          <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white dark:bg-slate-900/40 p-6 shadow-sm flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Mail className="h-5 w-5 text-indigo-500 shrink-0" />
                <h3 className="font-bold text-slate-900 dark:text-white">ESPs (Email Providers)</h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Specialized cloud engines delivering email synchronization, inbox routing, and storage.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {espExamples.map((item) => (
                <span key={item} className="rounded-full border border-sky-100 dark:border-sky-950 bg-sky-50/60 dark:bg-sky-950/30 px-2.5 py-1 text-xs font-semibold text-sky-700 dark:text-sky-400">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPREHENSIVE FLOW OF ACCESS (FLUID GRIDS - NO ROW OVERFLOW) */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Flow of Data Access
          </h2>
          <p className="text-sm text-slate-400">
            The logical layout path of communication from you to global networks.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900/50 p-4 sm:p-5 md:p-6 shadow-sm overflow-hidden">
        
        {/* Responsive flow container */}
        <div className="flex flex-wrap gap-3 justify-center">
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
                
                {/* Node */}
                <div
                    className={`min-w-[120px] sm:min-w-[140px] rounded-2xl border border-slate-200 dark:border-slate-800 px-3 py-3 text-center font-semibold ${item.color} flex flex-col items-center gap-2`}
                >
                    <div className="p-2 rounded-xl bg-white/70 dark:bg-black/20">
                    <Icon className="h-4 w-4" />
                    </div>

                    <span className="text-[11px] sm:text-xs leading-tight">
                    {item.label}
                    </span>
                </div>

                {/* Arrow (only between items) */}
                {index !== arr.length - 1 && (
                    <div className="text-slate-400 text-lg sm:text-xl px-1">
                    →
                    </div>
                )}
                </div>
            );
            })}
        </div>
        </div>
      </section>

      {/* SAFETY LOOP */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Safety Measures on the Internet
          </h2>
          <p className="text-sm text-slate-400">
            Vital protocols protecting user identification, endpoints, and communications.
          </p>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {safetyTips.map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900/40 flex gap-4 items-start shadow-xs"
            >
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-indigo-500 shrink-0">
                {item.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-6">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DEDICATED SEGMENT: GLOSSARY DEFINITIONS */}
      <section className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <BookOpen className="h-5 w-5 shrink-0" />
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Glossary Definitions Segment
            </h2>
          </div>
          <p className="text-sm text-slate-400">
            A precise, dedicated compendium of foundational internet terms and device architectural roles.
          </p>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {glossaryDefinitions.map((item) => (
            <div 
              key={item.term}
              className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/20 hover:bg-white dark:hover:bg-slate-900 shadow-xs transition-all duration-200 flex flex-col justify-between"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 shrink-0">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm truncate">
                    {item.term}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.definition}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO EXPLANATION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Watch: Computer Networks
        </h2>

        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-3xl">
          This video breaks down how computer networks work and how they are used
          to communicate with devices at different abstraction levels.
        </p>

        <div className="relative w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-black shadow-sm aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/tSodBEAJz9Y"
            title="Computer Networks Explained"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      {/* SUMMARY */}
      <section className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800/60 bg-gradient-to-br from-indigo-50/40 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900/40 dark:to-slate-950 relative overflow-hidden shadow-xs">
        <div className="absolute top-0 right-0 p-6 text-indigo-100 dark:text-slate-900/40 pointer-events-none hidden sm:block">
          <Info className="h-20 w-20 stroke-[1.5]" />
        </div>

        <div className="max-w-3xl relative z-10 space-y-3">
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
            Lesson Summary
          </h3>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Data packets leave modern smart devices, move across structural hardware like <span className="text-slate-900 dark:text-white font-medium">Routers</span>, pass through 
            local access pipelines provided by <span className="text-slate-900 dark:text-white font-medium">ISPs (like Safaricom or Faiba)</span>, and use web browsers to render 
            resources hosted on public servers. Using services like <span className="text-slate-900 dark:text-white font-medium">ESPs</span> requires strong safety 
            protocols to keep your internal identities secure from threats.
          </p>
        </div>
      </section>
    </div>
  );
}