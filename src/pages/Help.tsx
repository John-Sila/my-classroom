import React, { useState } from "react";
import { 
  Search, 
  BookOpen, 
  LifeBuoy, 
  MessageCircle, 
  Settings, 
  GraduationCap, 
  ChevronDown, 
  HelpCircle, 
  ArrowRight 
} from "lucide-react";

export default function HelpCenter() {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      question: "How do I sync my virtual classroom schedule?",
      answer: "Navigate to your Dashboard Settings, select 'Calendar Integration', and link your Google Workspace or Zoom account. Changes will update in real-time for all enrolled learners."
    },
    {
      question: "Where can learners submit late assignments?",
      answer: "Learners can upload assignments directly through their student portal interface. Teachers can toggle 'Allow Late Submissions' within the specific assignment criteria."
    },
    {
      question: "Why am I not receiving platform email notifications?",
      answer: "Check your 'Account Settings' under 'Notifications'. Ensure your institutional email is verified and that automated emails aren't flagged as spam."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12 text-slate-700 dark:text-slate-300 font-sans">
      
      {/* Header Banner */}
      <section className="text-center space-y-4 max-w-3xl mx-auto pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30">
          <LifeBuoy className="h-3.5 w-3.5 animate-pulse" />
          Knowledge Base & Support
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white bg-gradient-to-r from-slate-950 to-slate-700 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
          How can we help you today?
        </h1>

        <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400">
          Welcome to your operational support hub. Whether you are building custom curricula or managing your student portfolio, we’re here to help you navigate smoothly.
        </p>
      </section>

      {/* Interactive Search Bar Component */}
      <section className="max-w-2xl mx-auto">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-300"></div>
          <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all overflow-hidden px-4">
            <Search className="h-5 w-5 text-slate-400 flex-shrink-0" />
            <input 
              type="text" 
              placeholder="Search guides, video tutorials, or error codes..." 
              className="w-full bg-transparent border-0 py-4 px-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-0 text-sm sm:text-base"
            />
            <button className="bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white text-xs font-medium px-4 py-2 rounded-xl transition duration-150">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Core Tailored Framework Sections */}
      <div className="grid md:grid-cols-3 gap-6 pt-4">

        {/* Card 1: For Teachers */}
        <div className="group p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center gap-3 font-bold text-slate-900 dark:text-white mb-3">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40">
              <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            Educator Toolkit
          </div>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 mb-4">
            Manage student enrollments, set adaptive grading weights, export course syllabi, and deploy instant virtual quizzes.
          </p>
          <a href="#educators" className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:underline">
            Browse teacher guides <ArrowRight className="h-3 w-3" />
          </a>
        </div>

        {/* Card 2: For Learners */}
        <div className="group p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center gap-3 font-bold text-slate-900 dark:text-white mb-3">
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40">
              <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            Learner Support
          </div>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 mb-4">
            Track your personalized milestones, learn how peer-review threads function, and download study modules for offline access.
          </p>
          <a href="#learners" className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:underline">
            Explore learner wiki <ArrowRight className="h-3 w-3" />
          </a>
        </div>

        {/* Card 3: Platform Settings */}
        <div className="group p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center gap-3 font-bold text-slate-900 dark:text-white mb-3">
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40">
              <Settings className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            Configuration Layer
          </div>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 mb-4">
            Troubleshoot localized rendering issues, audit active webhooks, reset OAuth tokens, and adjust contrast configurations.
          </p>
          <a href="#config" className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 group-hover:underline">
            View system configurations <ArrowRight className="h-3 w-3" />
          </a>
        </div>

      </div>

        {/* Interactive FAQ Section */}
        <section className="space-y-4 pt-4">
        <div className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
            <HelpCircle className="h-5 w-5 text-purple-500" />
            Frequently Asked Questions
        </div>
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl divide-y divide-slate-200 dark:divide-slate-800 overflow-hidden bg-white dark:bg-slate-900">
            {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            
            return (
                <div key={index} className="transition-colors duration-150">
                <button 
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left font-medium text-slate-900 dark:text-white text-sm sm:text-base hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                    aria-expanded={isOpen}
                >
                    <span>{faq.question}</span>
                    <ChevronDown 
                    className={`h-4 w-4 text-slate-400 transition-transform duration-300 ease-in-out ${
                        isOpen ? "transform rotate-180 text-purple-500" : ""
                    }`} 
                    />
                </button>

                {/* Animated Wrapper Container */}
                <div 
                    className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-template-rows-[1fr] opacity-100" : "grid-template-rows-[0fr] opacity-0"
                    }`}
                    style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr"
                    }}
                >
                    {/* Inner Content Wrapper (Must have overflow-hidden) */}
                    <div className="overflow-hidden">
                    <div className="p-5 bg-slate-50/50 dark:bg-slate-950/20 text-sm leading-relaxed text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                        {faq.answer}
                    </div>
                    </div>
                </div>
                </div>
            );
            })}
        </div>
        </section>

        {/* Escalation Path / Help Desk Call-to-action */}
        <section className="p-8 rounded-2xl border border-indigo-100 dark:border-slate-800 bg-gradient-to-r from-indigo-50/60 to-purple-50/60 dark:from-indigo-950/20 dark:to-purple-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <MessageCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                Still locked out or experiencing unexpected behaviors?
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
                If our interactive logs and guide modules do not solve the discrepancy, route an optimization ticket directly to our technical resolution desk. 
            </p>
            </div>
            <button className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-sm transition duration-150">
            Open Support Ticket
            </button>
        </section>

    </div>
  );
}