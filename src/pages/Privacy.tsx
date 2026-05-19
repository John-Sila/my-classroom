import React, { useState } from "react";
import { Shield, Lock, Eye, Database, CheckCircle, FileDown, Trash2, HelpCircle, ChevronDown } from "lucide-react";

export default function Privacy() {
  const [activeSection, setActiveSection] = useState(null);

  const dataBreakdown = [
    { type: "Account Data", item: "Names, emails, profile roles (Learner/Teacher)", purpose: "To authenticate identities and customize the workspace dashboard." },
    { type: "Academic Progress", item: "Quiz results, lesson completion times, assignments", purpose: "To provide performance analytics and class progression maps." },
    { type: "Session Metadata", item: "IP addresses, browser types, interaction logs", purpose: "To optimize platform speed and prevent fraudulent account sharing." }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12 text-slate-700 dark:text-slate-300 font-sans">
      
      {/* Header Banner */}
      <section className="text-center space-y-4 max-w-3xl mx-auto pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
          <Shield className="h-3.5 w-3.5" />
          Your Privacy & Data Trust Hub
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white bg-gradient-to-r from-slate-950 to-slate-700 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
          Privacy Policy
        </h1>

        <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400">
          We believe educational spaces require absolute transparency. This charter outlines exactly how we manage, filter, and safeguard your academic footprints under a strict data-minimization architecture.
        </p>
      </section>

      {/* Core Security Pillars Grid */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Card 1: Data Collection */}
        <div className="group p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center gap-3 font-bold text-slate-900 dark:text-white mb-3">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40">
              <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            Minimalist Collection
          </div>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            We only catalog essential metrics: registration credentials, class assignments, and active classroom metrics. We never track activity outside our platform boundaries.
          </p>
        </div>

        {/* Card 2: Data Usage */}
        <div className="group p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center gap-3 font-bold text-slate-900 dark:text-white mb-3">
            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/40">
              <Eye className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            Zero Data Resale
          </div>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            Your telemetry data exists solely to enhance personalized milestones and curriculum generation tools. No behavioral broker profiling or external ad targeting is permitted.
          </p>
        </div>

        {/* Card 3: Security Model */}
        <div className="group p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center gap-3 font-bold text-slate-900 dark:text-white mb-3">
            <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40">
              <Lock className="h-5 w-5 text-rose-600 dark:text-rose-400" />
            </div>
            Enterprise Shielding
          </div>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            All records are encrypted end-to-end at rest and during live database relays. Access keys are strictly distributed via localized, monitored, role-based protocols.
          </p>
        </div>

        {/* Card 4: User Control */}
        <div className="group p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center gap-3 font-bold text-slate-900 dark:text-white mb-3">
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40">
              <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            Absolute Ownership
          </div>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            Whether you are a student or instructor, your data belongs to you. You maintain absolute jurisdiction over seamless account deletions, session termination, and archiving.
          </p>
        </div>

      </div>

      {/* Exhaustive Transparency Table */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
          <CheckCircle className="h-5 w-5 text-emerald-500" />
          Granular Data Breakdown
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <th className="p-4 sm:p-5">Data Category</th>
                <th className="p-4 sm:p-5">Identified Metrics</th>
                <th className="p-4 sm:p-5">Functional Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 dark:divide-slate-800 text-sm">
              {dataBreakdown.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/20 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900 dark:text-white">{row.type}</td>
                  <td className="p-4 sm:p-5 text-slate-600 dark:text-slate-400">{row.item}</td>
                  <td className="p-4 sm:p-5 text-slate-500 dark:text-slate-400 leading-relaxed">{row.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* User Controls Panel / Smooth Animation Accordion */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
          <HelpCircle className="h-5 w-5 text-amber-500" />
          Exercising Your Digital Rights
        </div>
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
          {[
            { title: "How can I request a backup export of my student portfolio?", body: "Navigate directly to your Account Control panel and select 'Request Archive'. The core framework will assemble an encrypted JSON file containing your complete learning matrix within 24 hours." },
            { title: "What happens when an educator purges a virtual classroom environment?", body: "When a classroom space is decommissioned, user metrics linked specifically to that class are anonymized immediately. Comprehensive systemic purging settles across redundant cloud nodes within 14 business days." }
          ].map((item, index) => {
            const isOpen = activeSection === index;
            return (
              <div key={index} className="border-b last:border-b-0 border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setActiveSection(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-medium text-slate-900 dark:text-white text-sm sm:text-base hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <span>{item.title}</span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ease-in-out ${isOpen ? "transform rotate-180 text-amber-500" : ""}`} />
                </button>
                <div 
                  className="grid transition-all duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
                >
                  <div className="overflow-hidden">
                    <div className="p-5 bg-slate-50/50 dark:bg-slate-950/20 text-sm leading-relaxed text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
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
      <section className="p-8 rounded-2xl border border-emerald-100 dark:border-slate-800 bg-gradient-to-r from-emerald-50/60 to-teal-50/60 dark:from-emerald-950/10 dark:to-teal-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
            <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Looking to modify your data profile?
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            You can automatically trigger a data audit right from the system console at any time.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 flex-shrink-0">
          <button className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 font-semibold text-sm px-4 py-2.5 rounded-xl shadow-sm transition duration-150">
            <FileDown className="h-4 w-4 text-slate-500" /> Export Data
          </button>
          {/* <button className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-sm transition duration-150">
            <Trash2 className="h-4 w-4" /> Purge Account
          </button> */}
        </div>
      </section>

    </div>
  );
}