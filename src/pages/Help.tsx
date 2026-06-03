import React, { useState, useMemo } from "react";
import { 
  Search, 
  BookOpen, 
  LifeBuoy, 
  MessageCircle, 
  Settings, 
  GraduationCap, 
  ChevronDown, 
  HelpCircle, 
  ArrowRight,
  Sparkles,
  Inbox
} from "lucide-react";
import { motion } from "motion/react";

export default function HelpCenter() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Resources", icon: LifeBuoy, color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40" },
    { id: "teacher", label: "Educator Toolkit", icon: GraduationCap, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/40" },
    { id: "learner", label: "Learner Support", icon: BookOpen, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40" },
    { id: "config", label: "System Config", icon: Settings, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40" }
  ];

  const faqs = [
    {
      category: "config",
      question: "How do I sync my virtual classroom schedule?",
      answer: "Navigate to your Dashboard Settings, select 'Calendar Integration', and link your Google Workspace or Zoom account. Changes will update in real-time for all enrolled learners."
    },
    {
      category: "learner",
      question: "Where can learners submit late assignments?",
      answer: "Learners can upload assignments directly through their student portal interface. Teachers can toggle 'Allow Late Submissions' within the specific assignment criteria."
    },
    {
      category: "config",
      question: "Why am I not receiving platform email notifications?",
      answer: "Check your 'Account Settings' under 'Notifications'. Ensure your institutional email is verified and that automated emails aren't flagged as spam."
    },
    {
      category: "teacher",
      question: "How can I import student rosters from CSV sheets?",
      answer: "Head to the Educator Toolkit dashboard, click 'Manage Students', select 'Add Members' and choose 'Batch Upload via CSV'. Ensure your spreadsheet columns match Name, Email, and Identifier."
    },
    {
      category: "learner",
      question: "Can I access downloaded course handouts offline?",
      answer: "Yes. When using our progressive application frame on mobile or desktop web platforms, downloaded learning items cache directly inside secure sandbox registers for local browser reading."
    }
  ];

  // Dynamic Multi-tier filtering engine
  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
      const matchesSearch = 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12 text-slate-700 dark:text-slate-300 font-sans antialiased">
      
      {/* Header Banner */}
      <section className="text-center space-y-4 max-w-3xl mx-auto pb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30">
          <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
          Intelligent Operation Assistance
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          Operational Support Hub
        </h1>

        <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-medium">
          Whether you are building custom school hierarchies, managing student portfolios, or tuning terminal parameters, query our structural framework indices below.
        </p>
      </section>

      {/* Interactive Search Bar Component */}
      <section className="max-w-2xl mx-auto">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-10 group-focus-within:opacity-25 transition duration-300"></div>
          <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all overflow-hidden px-4">
            <Search className="h-5 w-5 text-slate-400 flex-shrink-0" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, resolutions, configuration keywords..." 
              className="w-full bg-transparent border-0 py-4 px-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-sm sm:text-base font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="text-xs font-bold text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 mr-2 uppercase tracking-wider"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="flex flex-wrap justify-center items-center gap-2.5 max-w-4xl mx-auto p-2 bg-slate-100/60 dark:bg-slate-900/40 rounded-2xl border border-slate-200/60 dark:border-slate-800/60">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;

          return (
            <motion.button
              key={cat.id}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.id);
                setActiveFaq?.(null);
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative flex items-center gap-2 px-4 py-2.5 rounded-xl
                text-xs font-black uppercase tracking-wider
                transition-colors duration-200
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-indigo-500/40
                overflow-visible
                ${
                  isActive
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                }
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 rounded-xl bg-white dark:bg-indigo-600 border border-slate-200/80 dark:border-transparent shadow-sm dark:shadow-lg dark:shadow-indigo-500/10"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                  }}
                />
              )}

              <motion.div
                className={`relative z-10 ${
                  isActive
                    ? "text-indigo-600 dark:text-white"
                    : "text-slate-400 dark:text-slate-500"
                }`}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  rotate: isActive ? [0, -8, 8, 0] : 0,
                }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                }}
              >
                <Icon className="h-4 w-4 stroke-[2.5]" />
              </motion.div>

              <span className="relative z-10">
                {cat.label}
              </span>
            </motion.button>
          );
        })}
      </section>

      {/* Interactive FAQ Section */}
      <section className="space-y-4 max-w-4xl mx-auto pt-2">
        <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div className="flex items-center gap-2 text-base uppercase tracking-wider text-slate-400 font-black">
            <HelpCircle className="h-4 w-4 text-indigo-500" />
            Matching Matrix Solutions
          </div>
          <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full text-slate-500 dark:text-slate-400">
            {filteredFaqs.length} Result{filteredFaqs.length !== 1 ? 's' : ''}
          </span>
        </div>

        {filteredFaqs.length > 0 ? (
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl divide-y divide-slate-200 dark:divide-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
            {filteredFaqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              
              return (
                <div key={index} className="transition-colors duration-150">
                  <button 
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 dark:text-white text-sm sm:text-base hover:bg-slate-50/60 dark:hover:bg-slate-800/20 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="pr-4">{faq.question}</span>
                    <ChevronDown 
                      className={`h-4 w-4 text-slate-400 transition-transform duration-300 ease-in-out flex-shrink-0 ${
                        isOpen ? "transform rotate-180 text-indigo-500" : ""
                      }`} 
                    />
                  </button>

                  <div 
                    className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "grid-template-rows-[1fr] opacity-100" : "grid-template-rows-[0fr] opacity-0"
                    }`}
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr"
                    }}
                  >
                    <div className="overflow-hidden">
                      <div className="p-5 bg-slate-50/50 dark:bg-slate-950/20 text-sm leading-relaxed text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 space-y-3">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-full flex items-center justify-center mx-auto">
              <Inbox className="h-5 w-5" />
            </div>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">No matching guides found</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 max-w-sm mx-auto">
              We couldn't locate documentation matching "{searchQuery}". Try modifying your parameters or resetting category flags.
            </p>
          </div>
        )}
      </section>

      {/* Escalation Path / Help Desk Call-to-action */}
      <section className="p-8 max-w-4xl mx-auto rounded-2xl border border-indigo-100 dark:border-slate-800 bg-gradient-to-r from-indigo-50/40 to-purple-50/40 dark:from-indigo-950/10 dark:to-purple-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 font-black uppercase tracking-wide text-xs text-indigo-600 dark:text-indigo-400">
            <MessageCircle className="h-4 w-4" />
            Technical Resolution Desk
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Still experiencing unexpected platform discrepancies?</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl font-medium">
            If our index modules and structural diagnostics don't answer your constraints, open an explicit engineering ticket directly inside our operations dashboard.
          </p>
        </div>
        <button className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl shadow-lg shadow-indigo-500/10 transition duration-150">
          Open Support Ticket
        </button>
      </section>

    </div>
  );
}