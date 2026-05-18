import React from 'react';
import { 
  Move, 
  MousePointer, 
  Hand, 
  ChevronsUpDown, 
  Cpu, 
  Zap, 
  Sparkles, 
  ShieldAlert, 
  Radio, 
  Activity,
  Info
} from 'lucide-react';

export default function MouseTopic() {
  return (
    <div className="space-y-16 text-slate-600 dark:text-slate-300 leading-relaxed max-w-5xl mx-auto">

      {/* HERO SECTION */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30">
            <MousePointer className="h-3 w-3" /> Input Device
          </span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            The Computer Mouse
          </h1>
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
            A fundamental pointing input device designed to bridge human intent with physical graphical interfaces, enabling effortless control over items, menus, and workspace pipelines.
          </p>
        </div>

        <div className="relative group overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 shadow-md">
          <img
            src="https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1600&auto=format&fit=crop"
            alt="Computer mouse configuration"
            className="w-full h-[360px] object-cover object-center transform group-hover:scale-[1.01] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
        </div>
      </section>

      {/* CORE INTERACTIONS */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Core Interactions & Operations
          </h2>
          <p className="text-sm text-slate-400">How the OS maps physical coordinates to workspace elements.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900/40 hover:border-indigo-500/30 dark:hover:border-indigo-400/30 transition-all duration-300 group">
            <div className="p-2.5 w-fit rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
              <Move className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Pointer Control</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Translates physical hardware movement into immediate visual fluid directional cross-screen pixel tracking updates.</p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900/40 hover:border-indigo-500/30 dark:hover:border-indigo-400/30 transition-all duration-300 group">
            <div className="p-2.5 w-fit rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
              <MousePointer className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Target Selection</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Triggers logic triggers like primary left single/double clicks to confirm selections or invoke app runtime setups.</p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900/40 hover:border-indigo-500/30 dark:hover:border-indigo-400/30 transition-all duration-300 group">
            <div className="p-2.5 w-fit rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
              <Hand className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Drag & Drop</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Encapsulates object coordinates to grab, slide, and relocate continuous file node streams manually anywhere inside layouts.</p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900/40 hover:border-indigo-500/30 dark:hover:border-indigo-400/30 transition-all duration-300 group">
            <div className="p-2.5 w-fit rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
              <ChevronsUpDown className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Scroll Axis Tracking</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Enables frictionless horizontal or vertical canvas navigation through an independent, rotating wheel assembly mechanical component.</p>
          </div>
        </div>
      </section>

      {/* EVOLUTIONARY DESIGN TYPES */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Evolutionary Classifications
          </h2>
          <p className="text-sm text-slate-400">Comparing hardware architectures and tracking mechanisms.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 h-24 w-24 bg-slate-50 dark:bg-slate-800/30 rounded-bl-full -z-0 pointer-events-none" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-2">Legacy</span>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Mechanical</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Relied on an internally weighted rubber ball framework to drive interior XY tracking wheels via continuous frictional drag.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 h-24 w-24 bg-indigo-50/40 dark:bg-indigo-950/10 rounded-bl-full -z-0 pointer-events-none" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-500 block mb-2">Standard</span>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Optical</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Utilizes an optoelectronic sensor stack combining LED matrices and micro-cameras to record multi-surface location offsets.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 h-24 w-24 bg-sky-50/40 dark:bg-sky-950/10 rounded-bl-full -z-0 pointer-events-none" />
            <span className="text-xs font-bold uppercase tracking-widest text-sky-500 block mb-2">Modern</span>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Wireless</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Operates cordlessly via sub-2.4GHz RF nano dongles or native Bluetooth channels, optimizing macro mobile workspaces.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 flex justify-center items-center shadow-inner">
          <img
            src="https://www.open.edu/openlearncreate/pluginfile.php/610076/mod_book/chapter/24658/labelled%20mouse.gif"
            alt="Structural overview and breakdown of tracking sensors"
            className="max-w-full h-auto max-h-[300px] object-contain rounded-2xl dark:invert-[0.05] mix-blend-multiply dark:mix-blend-normal"
          />
        </div>
      </section>

      {/* RE-ENGINEERED ANATOMY LIST AS A TABLE */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Anatomy & Part Schematics
          </h2>
          <p className="text-sm text-slate-400">A structured breakdown of core components and internal modules.</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm bg-white dark:bg-slate-900/20">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800/80 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="px-6 py-4">Component Part</th>
                <th className="px-6 py-4">Operational Architecture Description</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-800/60">
              <tr>
                <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">Left Trigger Button</td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Acts as the universal primary interface action node to handle targeting, selecting, and execution.</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">Right Context Trigger</td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Invokes custom platform context menus, yielding alternative metadata paths relative to target nodes.</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">Central Scroll Assembly</td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Rotational potentiometer or optical encoder enabling prompt up-and-down structural document shifts.</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">Optical Imaging Engine</td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Employs coherent illumination to continuous capture surface displacement vectors.</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">RF Dongle Transceiver</td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Manages high-speed wireless packet streaming between terminal device USB ports and peripheral rigs.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* DATA FLOW INSTRUCTION INFOGRAPHIC */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            The Data Input Pipeline
          </h2>
          <p className="text-sm text-slate-400">Following tracking telemetry frames from your desk surface to the display.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-md">Step 01</span>
              <h4 className="font-bold text-slate-900 dark:text-white mt-3 mb-1">Kinetic Vector</h4>
            </div>
            <p className="text-xs text-slate-400 mt-2">Physical motion occurs over an surface area.</p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-md">Step 02</span>
              <h4 className="font-bold text-slate-900 dark:text-white mt-3 mb-1">Sensor Capture</h4>
            </div>
            <p className="text-xs text-slate-400 mt-2">Internal DSP arrays register image variations.</p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-md">Step 03</span>
              <h4 className="font-bold text-slate-900 dark:text-white mt-3 mb-1">Bus Interrupt</h4>
            </div>
            <p className="text-xs text-slate-400 mt-2">USB or BT signals pass coordinates packets to OS kernels.</p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-indigo-600 dark:bg-indigo-600 text-white flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-white bg-white/20 px-2 py-0.5 rounded-md">Step 04</span>
              <h4 className="font-bold mt-3 mb-1">Screen Render</h4>
            </div>
            <p className="text-xs text-indigo-100 mt-2">The graphics engine redraws the updated cursor layout.</p>
          </div>

        </div>
      </section>

      {/* MODERN ADVANCED FEATURE GRID */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Performance & Ergonomics
          </h2>
          <p className="text-sm text-slate-400">Features built to sustain intensive modern power-user workflows.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800/40 bg-white dark:bg-slate-900/20 flex gap-4 items-start">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-indigo-500"><Activity className="h-4 w-4" /></div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">High DPI Scalability</h4>
              <p className="text-xs text-slate-400">Adjustable dots-per-inch tracking modules engineered for ultra-fine spatial resolution.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800/40 bg-white dark:bg-slate-900/20 flex gap-4 items-start">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-indigo-500"><Cpu className="h-4 w-4" /></div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">Programmable Mapping</h4>
              <p className="text-xs text-slate-400">Integrated memory profiles allowing assignment of custom macro logic binds to side triggers.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800/40 bg-white dark:bg-slate-900/20 flex gap-4 items-start">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-indigo-500"><Sparkles className="h-4 w-4" /></div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">Anatomical Form Factor</h4>
              <p className="text-xs text-slate-400">Contoured, weighted curves crafted to limit mechanical friction and reduce hand muscle strain.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800/40 bg-white dark:bg-slate-900/20 flex gap-4 items-start">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-indigo-500"><Zap className="h-4 w-4" /></div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">Zero-Latency Polling</h4>
              <p className="text-xs text-slate-400">High-performance gaming circuits streaming reports at sub-1ms rates to minimize input lag.</p>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO PLAYER SECTION */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Video Breakdown
          </h2>
          <p className="text-sm text-slate-400">Step inside the optical engine core to witness hardware telemetry capture in real-time.</p>
        </div>

        <div className="aspect-video rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg bg-slate-950">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/laUvZsljfts"
            title="How a Mouse Works"
            allowFullScreen
          />
        </div>
      </section>

      {/* SUMMARY BADGE CARD */}
      <section className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800/60 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900/60 dark:to-slate-900 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 p-6 text-slate-200 dark:text-slate-800/60 pointer-events-none">
          <Info className="h-20 w-20 stroke-[1]" />
        </div>
        <div className="max-w-2xl relative z-10 space-y-2">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Lesson Summary
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            The computer mouse remains an essential pillar of human-computer interaction (HCI). From physical rolling balls to modern zero-latency optical sensors and cordless Bluetooth designs, its evolutionary goal stays unchanged: delivering frictionless accuracy and spatial layout command.
          </p>
        </div>
      </section>

    </div>
  );
}