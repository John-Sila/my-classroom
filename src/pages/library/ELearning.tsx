import React from "react";
import {
  Laptop,
  Globe,
  GraduationCap,
  BookOpen,
  Video,
  Users,
  ShieldAlert,
  Wifi,
  Cloud,
  Database,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  Computer,
} from "lucide-react";

export default function ELearningTopic() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-20 text-slate-600 dark:text-slate-300 leading-relaxed font-sans selection:bg-indigo-500 selection:text-white">

      {/* HERO SECTION */}
      <section className="space-y-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 dark:bg-indigo-950/30 dark:border-indigo-900/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          <Globe className="h-3.5 w-3.5 animate-spin-slow" />
          Digital Education Ecosystem
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-950 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-slate-950 via-slate-800 to-indigo-900 dark:from-white dark:via-slate-200 dark:to-indigo-400">
            E-Learning Systems
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl font-normal leading-relaxed">
            The structured delivery of education through digital systems, where teaching,
            assessment, and collaboration occur over networked platforms instead of physical classrooms.
          </p>
        </div>

        <div className="group relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-900 aspect-[21/9] max-h-[450px]">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent z-10 pointer-events-none" />
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop"
            className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
            alt="E-learning environment"
          />
        </div>
      </section>

      {/* CORE PILLARS */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3 text-slate-950 dark:text-white tracking-tight">
            <span className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-500"><BookOpen className="h-6 w-6" /></span>
            What E-Learning Actually Means
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
            The “E” stands for <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">Electronic</strong>. At its core, it replaces physical proximity with high-speed networked accessibility.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Content Delivery",
              desc: "Lessons delivered through high-definition videos, slides, interactive simulations, and modular nodes.",
              icon: Video,
              color: "indigo"
            },
            {
              title: "Interaction Layer",
              desc: "Instant message streams, collaborative community boards, and real-time virtual breakout sessions.",
              icon: Users,
              color: "sky"
            },
            {
              title: "Assessment Systems",
              desc: "Dynamic testing matrices, direct file-drop assignments, and automated grading pipelines.",
              icon: GraduationCap,
              color: "emerald"
            },
          ].map((b) => (
            <div
              key={b.title}
              className="group p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-900/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out"
            >
              <div className="p-2.5 w-fit rounded-xl bg-slate-50 dark:bg-slate-800 group-hover:scale-110 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/50 transition-all duration-300">
                <b.icon className="h-5 w-5 text-slate-600 dark:text-slate-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mt-4 mb-2 flex items-center gap-1.5">
                {b.title}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3 text-slate-950 dark:text-white tracking-tight">
            <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-500"><Laptop className="h-6 w-6" /></span>
            Platforms & Learning Environments
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Operating on layered infrastructures ranging from internal institutional portals to global marketplaces.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              name: "Google Classroom",
              img: "https://gdm-catalog-fmapi-prod.imgix.net/ProductScreenshot/1bc27c73-86b9-4b1f-bdeb-99d5b72cadd4.webp?q=80&w=600&auto=format&fit=crop",
              desc: "School-centered assignment workflows and document management pipelines.",
            },
            {
              name: "Moodle",
              img: "https://www.dodwellsolutions.com/wp-content/uploads/2020/05/moodle-e-learning.png?q=80&w=600&auto=format&fit=crop",
              desc: "Robust open-source LMS frameworks designed for high-structure academic environments.",
            },
            {
              name: "Coursera / Udemy",
              img: "https://media.apptunix.com/wp-content/uploads/sites/3/2022/07/29112006/banner-22.png?q=80&w=600&auto=format&fit=crop",
              desc: "Massive scale, commercial self-paced catalogs serving millions globally.",
            },
            {
              name: "Zoom / Teams",
              img: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Tel_Aviv_-_Wikipedia%27s_20th_Birthday_celebration_-_ZOOM_meeting_due_to_COVID-19_5.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original?q=80&w=600&auto=format&fit=crop",
              desc: "High-concurrency synchronous audio, video, and live screen interaction spaces.",
            },
          ].map((p) => (
            <div
              key={p.name}
              className="group rounded-2xl border border-slate-200 dark:border-slate-800/80 overflow-hidden bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="h-32 w-full overflow-hidden relative">
                <img src={p.img} className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out" />
              </div>
              <div className="p-4 space-y-1">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white tracking-tight">{p.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROS & CONS SPLIT */}
      <section className="grid md:grid-cols-2 gap-10 pt-4">
        {/* ADVANTAGES */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2.5 text-slate-950 dark:text-white">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
            Core Structural Advantages
          </h2>
          <div className="space-y-3">
            {[
              "Global accessibility detached from physical geolocation constraints.",
              "Highly granular, self-paced learning timelines.",
              "Drastic reductions in brick-and-mortar overhead costs.",
              "Elastic scalability capable of serving massive student volumes.",
            ].map((x, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200/70 dark:border-slate-800/60 bg-white dark:bg-slate-900 text-sm border-l-4 border-l-emerald-500 shadow-2xs hover:pl-5 transition-all duration-200">
                {x}
              </div>
            ))}
          </div>
        </div>

        {/* DISADVANTAGES */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2.5 text-slate-950 dark:text-white">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
            Limitations & Systemic Tradeoffs
          </h2>
          <div className="space-y-3">
            {[
              "Diluted contextual nuances compared to face-to-face social integration.",
              "Strict absolute dependence on localized network access.",
              "Significantly higher intrinsic baseline requirements for self-regulation.",
              "Elevated cognitive fatigue and fractured user attention spans.",
            ].map((x, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200/70 dark:border-slate-800/60 bg-white dark:bg-slate-900 text-sm border-l-4 border-l-amber-500 shadow-2xs hover:pl-5 transition-all duration-200">
                {x}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY RISKS */}
      <section className="space-y-6 bg-red-50/30 dark:bg-red-950/10 border border-red-100 dark:border-red-950/40 p-6 md:p-8 rounded-3xl">
        <div className="space-y-1">
          <h2 className="text-xl font-bold flex items-center gap-2.5 text-red-600 dark:text-red-400">
            <ShieldAlert className="h-5 w-5" />
            Security Configurations & Risk Vectors
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            Transitioning architecture to cloud environments natively introduces common internet ecosystem vulnerabilities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 pt-2">
          {[
            { title: "Data Privacy Exposure", desc: "Encryption weaknesses exposing student data matrices and behavioral analytics tracking hooks." },
            { title: "Platform Monopolies", desc: "Heavy architectural lock-in dependencies tied to external third-party core software vendors." },
            { title: "Integrity Enforcement", desc: "Complex identity validation and mitigation structures to guard against automated credential cheating." }
          ].map((r, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-red-200/40 dark:border-red-900/30 bg-white dark:bg-slate-900/80 shadow-2xs">
              <h4 className="text-sm font-semibold text-slate-950 dark:text-white mb-1">{r.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MEDIA REFERENCE SECTION */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Computer className="h-5 w-5 text-slate-500" />
          Interactive Visual Walkthrough
        </h2>
        <p className="text-sm">
          Watch this video demonstrating the inner workings of a modern e-learning platform, showcasing content delivery and interaction layers in action.
        </p>

        <div className="aspect-video rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/ZPs3URGs0KQ"
            title="Data flow explanation guide video"
            allowFullScreen
          />
        </div>
      </section>

      {/* FUTURE DIRECTION */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-950 dark:text-white tracking-tight">
          <span className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-sky-500"><Cloud className="h-6 w-6" /></span>
          Future System Architecture
        </h2>

        <p className="max-w-3xl">
          Modern infrastructure setups are continuously shifting away from fixed, pre-rendered static paths toward live,
          <span className="text-indigo-600 dark:text-indigo-400 font-medium"> AI-driven adaptive learning layers</span>. These ecosystems balance real-time user performance metrics against structural patterns to rebuild paths on the fly.
        </p>

        <div className="group relative p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-linear-to-br from-white via-white to-slate-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/30 overflow-hidden shadow-xs">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 dark:bg-indigo-400/5 rounded-bl-full transform transition-all duration-500 group-hover:scale-150" />
          <div className="flex items-center gap-2.5 mb-2 font-bold text-slate-900 dark:text-white text-sm">
            <Clock className="h-4 w-4 text-indigo-500 animate-pulse" />
            Paradigm Realignment
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="line-through opacity-60">Static individual course delivery packages</span>
            <span className="hidden sm:inline text-indigo-500 font-bold">➔</span>
            <span className="font-semibold text-slate-900 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md w-fit">
              Predictive, telemetry-driven micro-learning instances
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}