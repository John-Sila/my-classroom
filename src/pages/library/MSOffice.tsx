import React from 'react';
import { 
  Briefcase, 
  History, 
  Layers, 
  FileText, 
  Grid, 
  Tv, 
  Compass, 
  Info,
  AlignLeft,
  RotateCcw,
  Save,
  Type,
  BookOpen,
  MousePointerClick,
  Sliders,
  Sparkles
} from 'lucide-react';

export default function MSOfficeTopic() {
  return (
    <div className="space-y-16 text-slate-600 dark:text-slate-300 leading-relaxed max-w-5xl mx-auto">

      {/* HERO SECTION */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30">
            <Briefcase className="h-3 w-3" /> Productivity Suite
          </span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Microsoft Office Suite
          </h1>
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-4xl leading-relaxed">
            The global benchmark ecosystem for business computing. A completely unified environment engineering document management, multi-variable analytical spreadsheets, presentation channels, and secure workflow databases.
          </p>
        </div>

        <div className="relative group overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 shadow-md">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop"
            alt="Corporate workspace utilizing enterprise applications"
            className="w-full h-[320px] md:h-[400px] object-cover object-center transform group-hover:scale-[1.01] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent" />
        </div>
      </section>

      {/* TIMELINE BRIEF */}
      <section className="p-6 md:p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900/40 grid md:grid-cols-3 gap-6 items-center">
        <div className="flex items-center gap-4 col-span-1">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            <History className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">Origins & Unification</h3>
            <p className="text-xs text-slate-400">Ecosystem Architecture History</p>
          </div>
        </div>
        <div className="md:col-span-2 text-sm space-y-3 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 md:pl-6 pt-4 md:pt-0">
          <p>
            Developed by <strong className="text-slate-900 dark:text-white font-semibold">Microsoft Corporation</strong>, the suite debuted initially in <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">1989 on Macintosh systems</strong> before breaking into the Windows platform space in 1990.
          </p>
          <p className="text-slate-400 text-xs">
            Its core purpose was structural: turning isolated, scattered terminal tools into an entirely cohesive, inter-compatible workspace pipeline.
          </p>
        </div>
      </section>

      {/* CORE SYSTEM PACK SUBSYSTEM TABLE */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Ecosystem Component Matrices
          </h2>
          <p className="text-sm text-slate-400">Mapping the specialized cross-functional software engines.</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm bg-white dark:bg-slate-900/20">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800/80 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <th className="px-6 py-4">Software Application</th>
                  <th className="px-6 py-4">Classification</th>
                  <th className="px-6 py-4">Primary Purpose Scope</th>
                  <th className="px-6 py-4">Identity Theme</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-800/60">
                <tr>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500" /> MS Word
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">Document Processing</td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Corporate reports and document engineering.</td>
                  <td className="px-6 py-4 text-blue-600 dark:text-blue-400 font-medium text-xs">Classic Blue</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" /> MS Excel
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">Data Analytics</td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Algorithmic matrices, charting, and multi-variable logic.</td>
                  <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400 font-medium text-xs">Emerald Green</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-orange-500" /> MS PowerPoint
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">Media Presentation</td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Visual deck sequencing and transition management.</td>
                  <td className="px-6 py-4 text-orange-500 dark:text-orange-400 font-medium text-xs">Vibrant Orange</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-sky-500" /> MS Outlook</td>
                  <td className="px-6 py-4 text-xs text-slate-400">Communication Node</td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Enterprise asynchronous mail routing and calendaring.</td>
                  <td className="px-6 py-4 text-sky-500 dark:text-sky-400 font-medium text-xs">Sky Blue</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500" /> MS Access</td>
                  <td className="px-6 py-4 text-xs text-slate-400">Relational Database</td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Local desktop relational tables and entry tracking.</td>
                  <td className="px-6 py-4 text-red-500 dark:text-red-400 font-medium text-xs">Crimson Red</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-purple-500" /> MS OneNote</td>
                  <td className="px-6 py-4 text-xs text-slate-400">Information Capture</td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Unstructured digital logs and shared project notes.</td>
                  <td className="px-6 py-4 text-purple-600 dark:text-purple-400 font-medium text-xs">Deep Purple</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-indigo-500" /> MS Teams</td>
                  <td className="px-6 py-4 text-xs text-slate-400">Collaboration Hub</td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Synchronous voice conferencing, chat channels, and spaces.</td>
                  <td className="px-6 py-4 text-indigo-600 dark:text-indigo-400 font-medium text-xs">Indigo</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-500" /> MS OneDrive</td>
                  <td className="px-6 py-4 text-xs text-slate-400">Cloud Repository</td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Distributed multi-tenant synchronization and online assets.</td>
                  <td className="px-6 py-4 text-cyan-600 dark:text-cyan-400 font-medium text-xs">Cyan Blue</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CORE SUITE PILLARS BREAKDOWNS */}
      
      {/* WORD MODULE */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"><FileText className="h-5 w-5" /></div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Microsoft Word Architecture</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 bg-white dark:bg-slate-900/20 flex gap-4 items-start">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400"><AlignLeft className="h-4 w-4" /></div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">Typographical Alignment</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Arranges continuous layout strings natively across margins via left, right, centered, or justified spacing rules.</p>
            </div>
          </div>
          <div className="p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 bg-white dark:bg-slate-900/20 flex gap-4 items-start">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400"><Compass className="h-4 w-4" /></div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">Canvas Orientation</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Alters the printing engine canvas bounds programmatically between standard vertical portrait and wide horizontal landscape views.</p>
            </div>
          </div>
          <div className="p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 bg-white dark:bg-slate-900/20 flex gap-4 items-start">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400"><Save className="h-4 w-4" /></div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">Serialization Storage</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Encodes deep markup models cleanly into production files such as optimized XML `.docx` packages or static shared `.pdf` formats.</p>
            </div>
          </div>
          <div className="p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 bg-white dark:bg-slate-900/20 flex gap-4 items-start">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400"><Type className="h-4 w-4" /></div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">Vector Formatting Engines</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Applies style tags instantly including absolute text heights, emphasis weights, font variants, and fine line tracking rules.</p>
            </div>
          </div>
        </div>
      </section>

      {/* EXCEL MODULE */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"><Grid className="h-5 w-5" /></div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Microsoft Excel Architecture</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 bg-white dark:bg-slate-900/20 flex gap-4 items-start">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400"><BookOpen className="h-4 w-4" /></div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">Data Workbooks</h4>
              <p className="text-xs text-slate-400 leading-relaxed">High-level repository container packaging multiple discrete grid layers into single data assets.</p>
            </div>
          </div>
          <div className="p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 bg-white dark:bg-slate-900/20 flex gap-4 items-start">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400"><Layers className="h-4 w-4" /></div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">Coordinate Cell Blocks</h4>
              <p className="text-xs text-slate-400 leading-relaxed">The atomic intersecting coordinates mapping alpha columns to numerical array index rows.</p>
            </div>
          </div>
          <div className="p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 bg-white dark:bg-slate-900/20 flex gap-4 items-start">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400"><Info className="h-4 w-4" /></div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">The Equation Formula Bar</h4>
              <p className="text-xs text-slate-400 leading-relaxed">The main workspace interface box used to parse, correct, and input custom functional code loops.</p>
            </div>
          </div>
          <div className="p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 bg-white dark:bg-slate-900/20 flex gap-4 items-start">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400"><MousePointerClick className="h-4 w-4" /></div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">Macro Fill Handles</h4>
              <p className="text-xs text-slate-400 leading-relaxed">A rapid-action mouse cursor target pixel engineered to replicate data sequences automatically.</p>
            </div>
          </div>
        </div>

        <div className="relative group overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 shadow-inner">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop"
            alt="Data analytical reporting visualization dashboard panel"
            className="w-full h-[260px] object-cover object-center transform group-hover:scale-[1.005] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
        </div>
      </section>

      {/* POWERPOINT MODULE */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="p-2 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400"><Tv className="h-5 w-5" /></div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Microsoft PowerPoint Architecture</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 bg-white dark:bg-slate-900/20 flex gap-4 items-start">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400"><FileText className="h-4 w-4" /></div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">Presentation Slides</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Discrete coordinate view canvas steps engineered to host specific structural vector groupings.</p>
            </div>
          </div>
          <div className="p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 bg-white dark:bg-slate-900/20 flex gap-4 items-start">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400"><Layers className="h-4 w-4" /></div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">Sequential Presentation</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Organized media slide bundles compiled systematically to build narrative visual paths.</p>
            </div>
          </div>
          <div className="p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 bg-white dark:bg-slate-900/20 flex gap-4 items-start">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400"><Sliders className="h-4 w-4" /></div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">Canvas Transitions</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Hardware-accelerated layout animation filters bridging global slide viewport adjustments.</p>
            </div>
          </div>
          <div className="p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 bg-white dark:bg-slate-900/20 flex gap-4 items-start">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400"><Sparkles className="h-4 w-4" /></div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">Node Animations</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Dynamic vector parameters applied to individual asset items nested deep inside static pages.</p>
            </div>
          </div>
        </div>

        <div className="relative group overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 shadow-md">
          <img
            src="https://images.unsplash.com/photo-1586282391129-76a6df230234?q=80&w=1600&auto=format&fit=crop"
            alt="Corporate visual pitch presentation meeting"
            className="w-full h-[260px] object-cover object-center transform group-hover:scale-[1.005] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
        </div>
      </section>

      {/* SUMMARY BADGE SECTION CARD */}
      <section className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800/60 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900/60 dark:to-slate-900 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 p-6 text-slate-200 dark:text-slate-800/60 pointer-events-none">
          <Info className="h-20 w-20 stroke-[1]" />
        </div>
        <div className="max-w-3xl relative z-10 space-y-2">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Lesson Summary
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            The Microsoft Office ecosystem remains an essential pillar of global corporate communication and data management operations. From building simple print layouts to tracking advanced relational data variables in cloud networks, deep mastery of this suite forms the baseline foundation of professional computer literacy.
          </p>
        </div>
      </section>

    </div>
  );
}