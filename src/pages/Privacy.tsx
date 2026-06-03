import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  CheckCircle, 
  FileDown, 
  HelpCircle, 
  ChevronDown, 
  User, 
  Sparkles, 
  Terminal, 
  Binary
} from "lucide-react";

export default function Privacy() {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [activeView, setActiveView] = useState<string>("all");

  const views = [
    { id: "all", label: "Full Manifest", icon: Binary },
    { id: "account", label: "Identity Matrix", icon: User },
    { id: "academic", label: "Academic Telemetry", icon: Sparkles },
    { id: "metadata", label: "System Nodes", icon: Terminal }
  ];

  const dataBreakdown = [
    { 
      id: "account",
      type: "Account Data", 
      item: "Names, emails, profile roles (Learner/Teacher)", 
      purpose: "To authenticate identities and customize the workspace dashboard.",
      badge: "Identity",
      badgeColor: "text-blue-700 bg-blue-50 border-blue-100 dark:text-blue-400 dark:bg-blue-950/40 dark:border-blue-900/30"
    },
    { 
      id: "academic",
      type: "Academic Progress", 
      item: "Quiz results, lesson completion times, assignments", 
      purpose: "To provide performance analytics and class progression maps.",
      badge: "Telemetry",
      badgeColor: "text-purple-700 bg-purple-50 border-purple-100 dark:text-purple-400 dark:bg-purple-950/40 dark:border-purple-900/30"
    },
    { 
      id: "metadata",
      type: "Session Metadata", 
      item: "IP addresses, browser types, interaction logs", 
      purpose: "To optimize platform speed and prevent fraudulent account sharing.",
      badge: "Node Logs",
      badgeColor: "text-amber-700 bg-amber-50 border-amber-100 dark:text-amber-400 dark:bg-amber-950/40 dark:border-amber-900/30"
    }
  ];

  const filteredData = useMemo(() => {
    if (activeView === "all") return dataBreakdown;
    return dataBreakdown.filter(item => item.id === activeView);
  }, [activeView]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-16 text-slate-600 dark:text-slate-300 font-sans antialiased">
      
      {/* Header Banner */}
      <section className="text-center space-y-4 max-w-3xl mx-auto pb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/20">
          <Shield className="h-3.5 w-3.5 stroke-[2.5]" />
          Autonomous Privacy Layer
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          Data Integrity Charter
        </h1>

        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
          Educational sandboxes require uncompromised structural transparency. This ledger catalogs exactly how we segment, audit, and isolate your academic fingerprints under zero-retention parameters.
        </p>
      </section>

      {/* Core Security Pillars Grid */}
      <section className="grid sm:grid-cols-2 gap-5">
        {[
          {
            title: "Data Minimization",
            desc: "We only stream baseline metrics: registration state vectors, assignments, and structural logs. We contain no external background trackers.",
            icon: Database,
            color: "text-blue-600 bg-blue-50 border-blue-100 dark:text-blue-400 dark:bg-blue-950/30 dark:border-blue-900/20"
          },
          {
            title: "Zero Broker Pipeline",
            desc: "Telemetry pipelines exist solely to compute real-time learning maps. Third-party ad tracking, profiling, and monetization systems are physically barred.",
            icon: Eye,
            color: "text-purple-600 bg-purple-50 border-purple-100 dark:text-purple-400 dark:bg-purple-950/30 dark:border-purple-900/20"
          },
          {
            title: "Cryptographic Shielding",
            desc: "Records sit behind AES-256 state arrays at rest and inside TLS 1.3 tunnels during relational propagation. Key vectors cycle continuously.",
            icon: Lock,
            color: "text-rose-600 bg-rose-50 border-rose-100 dark:text-rose-400 dark:bg-rose-950/30 dark:border-rose-900/20"
          },
          {
            title: "Absolute Jurisdiction",
            desc: "Your records belong strictly to you. Complete database purges, snapshot archival exports, and account decommissioning can be executed on-demand.",
            icon: Shield,
            color: "text-emerald-600 bg-emerald-50 border-emerald-100 dark:text-emerald-400 dark:bg-emerald-950/30 dark:border-emerald-900/20"
          }
        ].map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <div 
              key={index} 
              className="p-6 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl bg-white dark:bg-slate-900 transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm"
            >
              <div className="flex items-center gap-3 font-bold text-slate-900 dark:text-white mb-3">
                <div className={`p-2 rounded-xl border ${pillar.color}`}>
                  <Icon className="h-4 w-4 stroke-[2.5]" />
                </div>
                {pillar.title}
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {pillar.desc}
              </p>
            </div>
          );
        })}
      </section>

      {/* Interactive Manifest Grid & Controller */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-4">
          <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider text-slate-400">
            <CheckCircle className="h-4 w-4 text-emerald-500 stroke-[2.5]" />
            Granular Data Breakdown
          </div>

          {/* Premium Shared Layout Filters */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/80 dark:bg-slate-900/60 rounded-xl border border-slate-200/40 dark:border-slate-800/60">
            {views.map((v) => {
              const FilterIcon = v.icon;
              const isSelected = activeView === v.id;

              return (
                <motion.button
                  key={v.id}
                  onClick={() => setActiveView(v.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                    text-xs font-black uppercase tracking-wider
                    transition-colors duration-200
                    overflow-visible
                    ${
                      isSelected
                        ? "text-slate-900 dark:text-white"
                        : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                    }
                  `}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activePrivacyView"
                      className="absolute inset-0 rounded-lg bg-white dark:bg-indigo-600 border border-slate-200/80 dark:border-transparent shadow-sm dark:shadow-lg dark:shadow-indigo-500/10"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}

                  <motion.div
                    className={`relative z-10 ${
                      isSelected
                        ? "text-indigo-600 dark:text-white"
                        : "text-slate-400 dark:text-slate-500"
                    }`}
                    animate={{
                      scale: isSelected ? 1.1 : 1,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                    }}
                  >
                    <FilterIcon className="h-3.5 w-3.5" />
                  </motion.div>

                  <span className="relative z-10">
                    {v.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

        </div>

        {/* Beautiful Modern Structured List replacing plain tables */}
        <div className="border border-slate-200/80 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden shadow-sm divide-y divide-slate-100 dark:divide-slate-800">
          <AnimatePresence mode="popLayout">
            {filteredData.map((row) => (
              <motion.div
                key={row.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="p-5 sm:p-6 grid md:grid-cols-12 gap-4 items-start hover:bg-slate-50/40 dark:hover:bg-slate-800/10 transition-colors"
              >
                <div className="md:col-span-3 flex md:flex-col items-start gap-2">
                  <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">{row.type}</span>
                  <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold border uppercase tracking-wider ${row.badgeColor}`}>
                    {row.badge}
                  </span>
                </div>
                <div className="md:col-span-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                  {row.item}
                </div>
                <div className="md:col-span-5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed md:pl-4 border-l-0 md:border-l border-slate-100 dark:border-slate-800">
                  {row.purpose}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Digital Rights Accordion Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider text-slate-400">
          <HelpCircle className="h-4 w-4 text-amber-500 stroke-[2.5]" />
          Exercising Your Digital Rights
        </div>
        
        <div className="border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
          {[
            { title: "How can I request a backup export of my student portfolio?", body: "Navigate directly to your Account Control panel and select 'Request Archive'. The core framework will assemble an encrypted JSON file containing your complete learning matrix within 24 hours." },
            { title: "What happens when an educator purges a virtual classroom environment?", body: "When a classroom space is decommissioned, user metrics linked specifically to that class are anonymized immediately. Comprehensive systemic purging settles across redundant cloud nodes within 14 business days." }
          ].map((item, index) => {
            const isOpen = activeSection === index;
            return (
              <div key={index} className="border-b last:border-b-0 border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveSection(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 dark:text-white text-sm sm:text-base hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-colors outline-none"
                >
                  <span>{item.title}</span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ease-in-out flex-shrink-0 ${isOpen ? "transform rotate-180 text-amber-500" : ""}`} />
                </button>
                <div 
                  className="grid transition-all duration-300 ease-in-out overflow-hidden"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
                >
                  <div className="overflow-hidden">
                    <div className="p-5 bg-slate-50/40 dark:bg-slate-950/20 text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/60">
                      {item.body}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Actionable Data Requests Footer */}
      <section className="p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-slate-800/60 bg-gradient-to-r from-emerald-50/40 to-teal-50/40 dark:from-emerald-950/10 dark:to-teal-950/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Shield className="h-4 w-4 stroke-[2.5]" />
            Data Autonomy Panel
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Looking to audit your records profile?</h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl font-medium">
            You can programmatically pull down snapshot compliance archives directly from your dashboard core console at any time.
          </p>
        </div>
        <div className="flex-shrink-0">
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-5 py-3 rounded-xl shadow-sm text-xs font-black uppercase tracking-wider transition duration-150">
            <FileDown className="h-4 w-4 text-slate-400" /> Export Data Vault
          </button>
        </div>
      </section>

    </div>
  );
}