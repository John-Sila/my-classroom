import React from "react";
import {
  ArrowRight,
  LogIn,
  Cpu,
  Database,
  LogOut,
  Network,
  MousePointer2,
  HardDrive,
  Layers,
  Monitor,
  Speaker,
  Printer,
  Headphones,
  Projector,
} from "lucide-react";

export default function DataFlowTopic() {
  return (
    <div className="space-y-14 text-slate-700 dark:text-slate-300 leading-7">

      {/* HERO */}
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-950/40 px-4 py-1 text-sm font-medium text-emerald-700 dark:text-emerald-400">
          <Network className="h-4 w-4" />
          Computer Architecture Model
        </div>

        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          Data Flow in a Computer System
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-4xl">
          A computer operates as a deterministic pipeline: Input → Processing → Storage → Output.
          Each stage maps to dedicated hardware layers working in synchronized execution cycles.
        </p>

        <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition">
          <img
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop"
            className="w-full h-[340px] md:h-[420px] object-cover hover:scale-[1.02] transition duration-700"
            alt="Computer architecture flow"
          />
        </div>
      </section>

      {/* FLOW PIPELINE */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="h-5 w-5 text-emerald-500" />
          Execution Pipeline
        </h2>

        <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
          {[
            { label: "INPUT", color: "blue", icon: LogIn },
            { label: "PROCESSING", color: "purple", icon: Cpu },
            { label: "STORAGE", color: "amber", icon: Database },
            { label: "OUTPUT", color: "emerald", icon: LogOut },
          ].map((item, i, arr) => (
            <React.Fragment key={item.label}>
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full border bg-white dark:bg-slate-900
                hover:scale-105 transition cursor-default
                text-${item.color}-700 dark:text-${item.color}-300
                border-${item.color}-200 dark:border-${item.color}-900/40`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </div>

              {i < arr.length - 1 && (
                <ArrowRight className="h-4 w-4 text-slate-400 dark:text-slate-600" />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* INPUT */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
          <MousePointer2 className="h-5 w-5 text-blue-500" />
          Input Layer
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="p-6 rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800 hover:-translate-y-1 transition">
            <h3 className="font-bold mb-2">System Role</h3>
            <p>Captures raw external signals and converts them into machine-readable binary streams.</p>
          </div>

          <div className="p-6 rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800">
            <h3 className="font-bold mb-2">Hardware Assets</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {["Keyboard", "Mouse", "Scanner", "Mic", "Camera", "Touchscreen", "Sensors", "Barcode Reader"].map((x) => (
                <span key={x} className="flex items-center gap-2">
                  <span className="text-blue-500">•</span> {x}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESSING */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
          <Cpu className="h-5 w-5 text-purple-500" />
          Processing Core (CPU)
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: "CU", desc: "Controls execution flow and instruction routing." },
            { title: "ALU", desc: "Handles arithmetic and logical computation." },
            { title: "MU", desc: "Temporary working memory during execution." },
          ].map((b) => (
            <div
              key={b.title}
              className="p-5 rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800 hover:shadow-md hover:-translate-y-1 transition"
            >
              <h3 className="font-bold">{b.title}</h3>
              <p className="text-sm text-slate-500">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STORAGE */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
          <HardDrive className="h-5 w-5 text-amber-500" />
          Storage Architecture
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="p-6 rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800">
            <h3 className="font-bold">Primary Memory</h3>
            <p className="text-sm">Fast, CPU-adjacent, volatile execution memory.</p>
          </div>

          <div className="p-6 rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800">
            <h3 className="font-bold">Secondary Storage</h3>
            <p className="text-sm">Persistent long-term data retention layer.</p>
          </div>
        </div>
      </section>

        {/* OUTPUT */}
        <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
            <Monitor className="h-5 w-5 text-emerald-500" />
            Output Layer (Output Devices)
        </h2>

        <p className="text-slate-600 dark:text-slate-400 max-w-3xl">
            Output devices convert processed digital signals into human-perceivable formats such as visuals, sound, or physical prints.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
            { icon: Monitor, label: "Monitor / Display", desc: "Visual output of processed data" },
            { icon: Printer, label: "Printer", desc: "Produces hard copy documents" },
            { icon: Speaker, label: "Speakers", desc: "Audio output generation" },
            { icon: Headphones, label: "Headphones", desc: "Private audio output" },
            { icon: Projector, label: "Projector", desc: "Large-scale visual display" },
            { icon: MousePointer2, label: "Plotter", desc: "High precision graphical printing" },
            ].map((device) => (
            <div
                key={device.label}
                className="p-5 rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800
                        hover:-translate-y-1 hover:shadow-md transition"
            >
                <div className="flex items-center gap-3 mb-2">
                <device.icon className="h-5 w-5 text-emerald-500" />
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                    {device.label}
                </h3>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                {device.desc}
                </p>
            </div>
            ))}
        </div>
        </section>

        {/* VIDEO */}
        <section className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
            <Network className="h-5 w-5 text-slate-500" />
            Visual Explanation
            </h2>

            <div className="aspect-video rounded-3xl overflow-hidden border hover:shadow-md transition">
            <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/CBf-jIn44X0"
                allowFullScreen
            />
            </div>
        </section>

    </div>
  );
}