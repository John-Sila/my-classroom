import React, { useState } from "react";
import { Scale, CheckCircle, AlertTriangle, FileText, ChevronDown, Compass, ShieldAlert, HeartHandshake } from "lucide-react";

export default function Terms() {
  const [activeTab, setActiveTab] = useState("conduct");
  const [openSection, setOpenSection] = useState(null);

  const sections = {
    conduct: {
      title: "Community Guidelines",
      icon: <Compass className="h-5 w-5 text-amber-500" />,
      clauses: [
        {
          id: "use",
          title: "1. Acceptable Learning Environment",
          icon: <CheckCircle className="h-4 w-4 text-emerald-500" />,
          summary: "Educational intent must remain primary across all platform interactions.",
          details: "Users are expected to communicate respectfully within peer review threads, message boards, and virtual classrooms. Modifying, exploiting, or attempting to reverse-engineer course software layers or running unauthorized automated scraping tools is explicitly prohibited."
        },
        {
          id: "integrity",
          title: "2. Academic Integrity Commitments",
          icon: <HeartHandshake className="h-4 w-4 text-blue-500" />,
          summary: "Work submitted must be the honest product of the student's own efforts.",
          details: "Plagiarism, unauthorized collaboration on supervised evaluations, or utilizing external automated engines to generate answers where authentic critical thinking is evaluated degrades the learning curve and is subject to structural review."
        }
      ]
    },
    enforcement: {
      title: "Compliance & Safety",
      icon: <ShieldAlert className="h-5 w-5 text-rose-500" />,
      clauses: [
        {
          id: "abuse",
          title: "3. Abuse Detection & Interventions",
          icon: <AlertTriangle className="h-4 w-4 text-rose-500" />,
          summary: "Violations can trigger progressive administrative actions.",
          details: "Our moderation layers flag systematic spamming, toxic speech, or system overloading. Account interventions scale from temporary API rate-limiting and temporary workshop suspension up to permanent credential revocation for repeated safety violations."
        },
        {
          id: "appeals",
          title: "4. Review & Appeal Pipelines",
          icon: <FileText className="h-4 w-4 text-purple-500" />,
          summary: "Automated enforcement actions are reviewable by humans.",
          details: "If your profile receives an algorithmic restriction, you possess the right to launch an appeal within 14 calendar days. Human content managers audit logged exceptions manually to prevent false positives."
        }
      ]
    },
    liability: {
      title: "Legal & Liability",
      icon: <Scale className="h-5 w-5 text-indigo-500" />,
      clauses: [
        {
          id: "disclaimer",
          title: "5. Platform Performance Parameters",
          icon: <FileText className="h-4 w-4 text-indigo-500" />,
          summary: "The platform environment is provided on an 'as-is' and 'as-available' framework.",
          details: "While we push for absolute server continuity and regular daily cloud snapshots, we cannot legally guarantee uninterrupted uptime during sudden infrastructure disruptions or cloud dependency updates."
        }
      ]
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12 text-slate-700 dark:text-slate-300 font-sans">
      
      {/* Header Banner */}
      <section className="text-center space-y-4 max-w-3xl mx-auto pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30">
          <Scale className="h-3.5 w-3.5" />
          Platform Charter & Commitments
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white bg-gradient-to-r from-slate-950 to-slate-700 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
          Terms of Service
        </h1>

        <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400">
          Welcome to our shared digital classroom. These rules outline mutual responsibilities, behavioral limits, and legal boundaries to keep learning safe and structured for everyone.
        </p>
      </section>

      {/* Main Interactive Workspace Layout */}
      <div className="grid md:grid-cols-[240px_1fr] gap-8 items-start">
        
        {/* Left Sticky Navigation Tabs */}
        <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 sticky top-6 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md md:bg-transparent p-2 md:p-0 rounded-xl border border-slate-200/60 md:border-0">
          {Object.entries(sections).map(([key, value]) => (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key);
                setOpenSection(null); // Reset open sub-accordions on tab switch
              }}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl whitespace-nowrap transition-all duration-150 w-full text-left ${
                activeTab === key
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-800"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-900/40"
              }`}
            >
              {value.icon}
              {value.title}
            </button>
          ))}
        </nav>

        {/* Right Active Content Panel */}
        <div className="space-y-4">
          <div className="p-1 mb-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {sections[activeTab].title}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Click a clause below to view specific platform guidelines and definitions.
            </p>
          </div>

        {sections[activeTab].clauses.map((clause) => {
        const isOpen = openSection === clause.id;
        return (
            <div 
            key={clause.id} 
            className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm transition-all duration-150"
            >
            {/* Header Accordion Button */}
            <button
                onClick={() => setOpenSection(isOpen ? null : clause.id)}
                className="w-full p-5 text-left flex items-start gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
            >
                <div className="mt-1 flex-shrink-0">{clause.icon}</div>
                <div className="flex-1 space-y-1">
                <div className="font-bold text-slate-900 dark:text-white text-base flex items-center justify-between">
                    {clause.title}
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ease-in-out ${isOpen ? "transform rotate-180 text-amber-500" : ""}`} />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {clause.summary}
                </p>
                </div>
            </button>

            {/* Smooth Animated Collapsible Content Container */}
            <div 
                className="grid transition-all duration-300 ease-in-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
            >
                <div className="overflow-hidden">
                <div className="p-5 bg-slate-50/50 dark:bg-slate-950/20 text-sm leading-relaxed text-slate-600 dark:text-slate-400 border-t border-slate-150 dark:border-slate-800">
                    {clause.details}
                </div>
                </div>
            </div>
            </div>
        );
        })}

        </div>
      </div>

      {/* Actionable Agreement Callout Footer */}
      <section className="p-8 rounded-2xl border border-amber-100 dark:border-slate-800 bg-gradient-to-r from-amber-50/60 to-orange-50/60 dark:from-amber-950/10 dark:to-orange-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
            <Scale className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            Continued access implies agreement
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            By interacting with lessons or setting up classrooms on this platform, you affirm that you have reviewed, understood, and agreed to follow these operational standards.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-mono italic bg-white dark:bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
          Last Revised: May 2026
        </div>
      </section>

    </div>
  );
}