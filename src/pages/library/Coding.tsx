import React from "react";
import {
  Code2,
  Brain,
  Search,
  PenTool,
  Bug,
  FileText,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  BookOpen,
  Layers,
  Cpu,
  Globe,
  Database,
  Terminal,
  Braces,
  Binary,
  Workflow,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";

export default function CodingFundamentals() {
  const codingSteps = [
    {
      icon: Brain,
      title: "1. Identify the Problem",
      desc: "Understand what needs to be solved. Define requirements, constraints, and expected output clearly before writing any code.",
    },
    {
      icon: Lightbulb,
      title: "2. Design the Solution",
      desc: "Plan the logic, structure, and approach. Break the problem into smaller manageable parts and design a strategy.",
    },
    {
      icon: PenTool,
      title: "3. Write the Code",
      desc: "Translate the solution into a programming language using correct syntax, logic, and structure.",
    },
    {
      icon: Bug,
      title: "4. Test the Program",
      desc: "Run the program to check for errors, bugs, and unexpected behavior. Validate that it works as intended.",
    },
    {
      icon: FileText,
      title: "5. Documentation",
      desc: "Document how the program works, how to use it, and how it was built. This helps future developers and maintenance.",
    },
  ];

  const languages = [
    { icon: Code2, name: "Python", desc: "Simple, readable, widely used in AI and automation." },
    { icon: Braces, name: "JavaScript", desc: "Powering interactive websites and web apps." },
    { icon: Terminal, name: "C", desc: "Low-level language used in systems and embedded devices." },
    { icon: Cpu, name: "C++", desc: "High-performance applications, games, and systems." },
    { icon: Database, name: "SQL", desc: "Used to manage and query databases." },
    { icon: Globe, name: "PHP", desc: "Backend web development language." },
    { icon: Workflow, name: "Java", desc: "Enterprise applications and Android development." },
    { icon: Binary, name: "C#", desc: "Microsoft ecosystem and game development (Unity)." },
    { icon: Layers, name: "Kotlin", desc: "Modern Android development language." },
    { icon: BookOpen, name: "Swift", desc: "Apple ecosystem applications (iOS/macOS)." },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-16 text-slate-600 dark:text-slate-300 leading-relaxed">

      {/* HERO */}
      <section className="space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30">
          <Code2 className="h-3 w-3" />
          Programming Fundamentals
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
          What is Coding?
        </h1>

        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-3xl">
          Coding is the process of solving real-world problems using programming languages.
          It involves breaking down problems into logical steps and instructing a computer to execute them.
        </p>
      </section>

      {/* 5 STEPS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          The 5 Steps of Coding
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          {codingSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-indigo-500">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FLOW LOGIC */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-white">
            How the Process Works
          </h3>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            If testing (Step 4) fails, developers return to Step 3 (Writing Code) to fix errors and improve logic.
            If testing succeeds, they proceed to Step 5 (Documentation).
          </p>

          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
              Success → Documentation
            </span>
            <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400">
              Failure → Back to Code
            </span>
          </div>
        </div>
      </section>

      {/* WHY DOCUMENTATION MATTERS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Why Documentation Matters
        </h2>

        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Documentation explains how software works, how it should be used, and how it was built.
            It improves collaboration, reduces confusion, and makes future updates easier and safer.
          </p>
        </div>
      </section>

      {/* PROGRAMMING LANGUAGES */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Common Programming Languages
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {languages.map((lang) => {
            const Icon = lang.icon;

            return (
              <div
                key={lang.name}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-indigo-500/30 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-indigo-500">
                    <Icon className="h-4 w-4" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {lang.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {lang.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* VIDEO EXPLANATION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Watch: Introduction to Programming Languages
        </h2>

        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-3xl">
          This video breaks down how programming languages work and how they are used
          to communicate with computers at different abstraction levels.
        </p>

        <div className="relative w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-black shadow-sm aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/BqfPgJwlUqY"
            title="Programming Languages Explained"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      {/* SUMMARY */}
      <section className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 text-slate-200 dark:text-slate-800">
          <Code2 className="h-20 w-20" />
        </div>

        <div className="max-w-3xl space-y-2">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Key Insight
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Coding is not just writing instructions. It is a structured cycle of thinking, designing,
            building, testing, and refining solutions to real-world problems.
          </p>
        </div>
      </section>

    </div>
  );
}