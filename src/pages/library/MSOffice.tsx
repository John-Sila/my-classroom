import React, { useState } from "react";
import {
  Briefcase,
  History,
  Layers,
  FileText,
  Compass,
  Info,
  AlignLeft,
  Save,
  Type,
  BookOpen,
  MousePointerClick,
  Sliders,
  Sparkles,
  Layers2,
  Cpu,
  AlertTriangle,
  ShieldAlert,
} from 'lucide-react';
import { motion, AnimatePresence } from "motion/react";
import WorkspaceHeroSlider from "./components/WorkspaceHeroSlider";

export default function MSOfficeTopic() {
  const [activeTab, setActiveTab] = useState<"concepts" | "suite" | "future">("concepts");
  
  const heroImages = [
    "https://framerusercontent.com/images/YbNcsAudo7Vo7NycWEhEMyDf4I.png?width=1833&height=816",
    "https://store-images.s-microsoft.com/image/apps.36093.14374512070697751.25968c71-506c-4ac6-a02b-fe78a2531693.7546e29f-df1b-48ac-bd54-c5179c99acd6",
    "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Meet-from-anywhere_1920x1240?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1920&qlt=100&fit=constrain",
    "https://gdm-catalog-fmapi-prod.imgix.net/ProductScreenshot/c708eac9-157f-4691-82bb-b330bee12496.png?auto=format&q=50",
    "https://www.lifewire.com/thmb/wQinT8sOFaGie1JnBLv4EZy_YO0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/publisher-built-in-birthday-templates-f5c8d5b23ed146c4bdfcaabd3ba1f31f.png",
    "https://crestwood.com/wp-content/uploads/2025/03/PPT-Tip1-Pic1.png",
    "https://media.clipchamp.com/powerpoint/2048/5XIoCDafPm51gGsRD4EHAL",
    "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Communicate-in-real-time_1920x1240?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1920&qlt=100&fit=constrain",
  ];

  const officeApps = [
    { name: "MS Word", type: "Document Processing", desc: "Corporate reports and document engineering.", color: "blue", dot: "bg-blue-500", text: "text-blue-600 dark:text-blue-400" },
    { name: "MS Excel", type: "Data Analytics", desc: "Algorithmic matrices, charting, multi-variable logic.", color: "emerald", dot: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400" },
    { name: "MS PowerPoint", type: "Media Presentation", desc: "Visual deck sequencing and transition management.", color: "orange", dot: "bg-orange-500", text: "text-orange-500 dark:text-orange-400" },
    { name: "MS Outlook", type: "Communication Node", desc: "Enterprise mail routing and calendaring.", color: "sky", dot: "bg-sky-500", text: "text-sky-500 dark:text-sky-400" },
    { name: "MS Access", type: "Relational Database", desc: "Local desktop relational tables and entry tracking.", color: "red", dot: "bg-red-500", text: "text-red-500 dark:text-red-400" },
    { name: "MS OneNote", type: "Information Capture", desc: "Unstructured digital logs and shared project notes.", color: "purple", dot: "bg-purple-500", text: "text-purple-600 dark:text-purple-400" },
    { name: "MS Teams", type: "Collaboration Hub", desc: "Voice conferencing, chat channels, and spaces.", color: "indigo", dot: "bg-indigo-500", text: "text-indigo-600 dark:text-indigo-400" },
    { name: "MS OneDrive", type: "Cloud Repository", desc: "Distributed sync and online assets.", color: "cyan", dot: "bg-cyan-500", text: "text-cyan-600 dark:text-cyan-400" },
  ];

  const wordFeatures = [
    { icon: AlignLeft, title: "Typographical Alignment", desc: "Arranges layout strings across margins via left, right, centered, or justified rules.", color: "text-blue-500" },
    { icon: Compass, title: "Canvas Orientation", desc: "Alters canvas bounds between portrait and landscape views.", color: "text-blue-500" },
    { icon: Save, title: "Serialization Storage", desc: "Encodes markup into `.docx` packages and `.pdf` formats.", color: "text-blue-500" },
    { icon: Type, title: "Vector Formatting Engines", desc: "Applies style tags including text heights, emphasis weights, tracking.", color: "text-blue-500" },
  ];

  const excelFeatures = [
    { icon: BookOpen, title: "Data Workbooks", desc: "Repository packaging multiple discrete grid layers.", color: "text-emerald-500" },
    { icon: Layers, title: "Coordinate Cell Blocks", desc: "Mapping alpha columns to numerical index rows.", color: "text-emerald-500" },
    { icon: Info, title: "Equation Formula Bar", desc: "Interface to parse, correct, and input functional code loops.", color: "text-emerald-500" },
    { icon: MousePointerClick, title: "Macro Fill Handles", desc: "Replicate data sequences automatically.", color: "text-emerald-500" },
  ];

  const pptFeatures = [
    { icon: FileText, title: "Presentation Slides", desc: "Discrete canvas hosting structural vector groupings.", color: "text-orange-500" },
    { icon: Layers, title: "Sequential Presentation", desc: "Slide bundles compiled for narrative visual paths.", color: "text-orange-500" },
    { icon: Sliders, title: "Canvas Transitions", desc: "Hardware-accelerated layout animations between slides.", color: "text-orange-500" },
    { icon: Sparkles, title: "Node Animations", desc: "Dynamic vector effects on individual assets.", color: "text-orange-500" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 space-y-8 antialiased selection:bg-indigo-500/20 text-slate-600 dark:text-slate-300">
      
      {/* Header */}
      <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400 font-mono text-xs tracking-widest uppercase">
          <Briefcase className="w-4 h-4 animate-pulse" />
          Productivity Suite
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          Microsoft Office Suite
        </h1>
        <p className="text-sm md:text-base text-slate-400 dark:text-slate-500 max-w-3xl leading-relaxed">
          The global benchmark ecosystem for business computing. A completely unified environment engineering document management, multi‑variable analytical spreadsheets, presentation channels, and secure workflow databases.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 pt-4">
          {[
            { id: "concepts", label: "Core Concepts", icon: Layers, color: "indigo" },
            { id: "suite", label: "Suite Components", icon: Cpu, color: "sky" },
            { id: "future", label: "Safety & Future", icon: Sparkles, color: "emerald" },
          ].map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            const colorClasses: Record<string, string> = {
              indigo: active ? "bg-indigo-600 dark:bg-indigo-500" : "",
              sky: active ? "bg-sky-600 dark:bg-sky-500" : "",
              emerald: active ? "bg-emerald-600 dark:bg-emerald-500" : "",
            };

            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-medium transition-all ${
                  active
                    ? `${colorClasses[t.color]} text-white shadow-md shadow-${t.color}-500/20 font-bold`
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* TAB 1: CONCEPTS */}
        {activeTab === "concepts" && (
          <motion.div
            key="concepts"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            <WorkspaceHeroSlider images={heroImages} />

            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-950 dark:text-white">Origins & Unification</h3>
                  <p className="text-xs text-slate-400">Ecosystem Architecture History</p>
                </div>
              </div>
              <div className="text-sm text-slate-400 space-y-2">
                <p>
                  Developed by <strong className="text-slate-900 dark:text-white">Microsoft Corporation</strong>, the suite debuted initially in <strong className="text-indigo-600 dark:text-indigo-400">1989 on Macintosh systems</strong> before entering Windows in 1990.
                </p>
                <p className="text-xs text-slate-500">
                  Its core purpose was structural: turning isolated terminal tools into an entirely cohesive, inter‑compatible workspace pipeline.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: SUITE COMPONENTS */}
        {activeTab === "suite" && (
          <motion.div
            key="suite"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {/* Component table */}
            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-5 shadow-sm">
              <h2 className="text-sm font-bold text-slate-950 dark:text-white mb-3">Ecosystem Component Matrices</h2>
              <div className="overflow-hidden rounded-xl border border-slate-200/60 dark:border-slate-800/80">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-900/60">
                      <tr className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">Application</th>
                        <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">Type</th>
                        <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">Purpose</th>
                        <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">Theme</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-800">
                      {officeApps.map((app) => (
                        <tr key={app.name}>
                          <td className="px-4 py-3 text-slate-900 dark:text-white flex items-center gap-2">
                            <span className={`h-2 w-2 rounded-full ${app.dot}`} />
                            {app.name}
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-400">{app.type}</td>
                          <td className="px-4 py-3 text-slate-400">{app.desc}</td>
                          <td className={`px-4 py-3 text-xs ${app.text}`}>{app.color === "emerald" ? "Emerald Green" : app.color === "orange" ? "Vibrant Orange" : app.color === "sky" ? "Sky Blue" : app.color === "red" ? "Crimson Red" : app.color === "purple" ? "Deep Purple" : app.color === "indigo" ? "Indigo" : app.color === "cyan" ? "Cyan Blue" : "Classic Blue"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Word features */}
            <div className="grid gap-4 md:grid-cols-2">
              {wordFeatures.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                        <Icon className={`w-4 h-4 ${f.color}`} />
                      </div>
                      <h3 className="text-sm font-bold text-slate-950 dark:text-white">{f.title}</h3>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">{f.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Excel features */}
            <div className="grid gap-4 md:grid-cols-2">
              {excelFeatures.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                        <Icon className={`w-4 h-4 ${f.color}`} />
                      </div>
                      <h3 className="text-sm font-bold text-slate-950 dark:text-white">{f.title}</h3>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">{f.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* PowerPoint features */}
            <div className="grid gap-4 md:grid-cols-2">
              {pptFeatures.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                        <Icon className={`w-4 h-4 ${f.color}`} />
                      </div>
                      <h3 className="text-sm font-bold text-slate-950 dark:text-white">{f.title}</h3>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* TAB 3: FUTURE */}
        {activeTab === "future" && (
          <motion.div
            key="future"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {/* Advantages & Limitations */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-5 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Core Advantages
                </h3>
                <ul className="text-xs text-slate-400 space-y-2">
                  <li>• Rapid document creation and revision workflows.</li>
                  <li>• Inter‑app data sharing between Word, Excel, PowerPoint.</li>
                  <li>• Deep integration with cloud services (OneDrive, Teams, SharePoint).</li>
                  <li>• Industry‑standard formats ensuring global compatibility.</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-5 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-amber-500 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Main Limitations
                </h3>
                <ul className="text-xs text-slate-400 space-y-2">
                  <li>• High learning curve for advanced Excel and VBA patterns.</li>
                  <li>• Licensing and version‑specific behavior differences.</li>
                  <li>• Cloud‑reliant workflows may suffer without strong connectivity.</li>
                  <li>• Template‑heavy workflows can reduce creative flexibility.</li>
                </ul>
              </div>
            </div>

            {/* Security */}
            <div className="rounded-2xl border border-red-200/60 dark:border-red-900/40 bg-red-50/30 dark:bg-red-950/10 p-6 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" />
                Security Configurations
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Modern Office 365/Microsoft 365 environments introduce shared cloud folders, real‑time collaboration, and conditional‑access policies, requiring tight data‑class labels and authentication hygiene.
              </p>
            </div>

            {/* Video preview */}
            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-6 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-slate-500" />
                Watch: Microsoft Office Suite Overview
              </h3>
              <p className="text-xs text-slate-400">
                This video breaks down how the Microsoft Office Suite works and how it is used to create and manage documents, spreadsheets, and presentations.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary */}
      <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950/50 p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 text-slate-100 dark:text-slate-900 pointer-events-none">
          <Layers2 className="h-24 w-24 stroke-[3]" />
        </div>
        <div className="max-w-3xl relative z-10 space-y-2">
          <h3 className="text-sm font-bold tracking-wider font-mono uppercase text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <Layers2 className="w-4 h-4" />
            Office Ecosystem Summary
          </h3>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            The Microsoft Office ecosystem remains an essential pillar of global corporate communication and data management operations. From building simple print layouts to tracking advanced relational data variables in cloud networks, deep mastery of this suite forms the baseline foundation of professional computer literacy.
          </p>
        </div>
      </div>

      {/* YouTube Video */}
      <div className="aspect-video rounded-xl overflow-hidden border border-slate-200/60 dark:border-slate-800/80 shadow-inner">
        <iframe
          className="w-full h-full opacity-90"
          src="https://www.youtube.com/embed/ZXAPCy2c33o"
          title="INTRODUCTION TO MS-OFFICE || MS-OFFICE"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      {/* Footer */}
      <footer className="flex items-center gap-1 text-xs font-mono text-slate-400 dark:text-slate-600 pt-4 border-t border-slate-200 dark:border-slate-800">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-ping" />
        MICROSOFT OFFICE SUITE
      </footer>
    </div>
  );
}