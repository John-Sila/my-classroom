import React from 'react';
import { 
  Network, 
  ArrowRight, 
  LogIn, 
  Cpu, 
  Database, 
  LogOut, 
  HardDrive, 
  Layers, 
  Info,
  Laptop
} from 'lucide-react';

export default function DataFlowTopic() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-16 text-slate-700 dark:text-slate-300 leading-relaxed overflow-x-hidden">

      {/* HERO SECTION */}
      <section className="space-y-6 rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50 p-6 shadow-sm dark:border-slate-800 dark:from-slate-950 dark:to-slate-900 md:p-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
          <Network className="h-3.5 w-3.5" /> Computer Fundamentals
        </span>

        <div className="space-y-3">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Data Flow in a Computer System
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-4xl leading-relaxed">
            Data in a computer follows a highly structured architectural cycle: Input → Processing → Storage → Output. 
            Each distinctive stage is driven by distinct physical hardware micro-architectures processing instructions in tandem.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 aspect-[16/9] md:aspect-[21/9]">
          <img
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop"
            className="w-full h-full object-cover transform hover:scale-[1.01] transition-transform duration-500"
            alt="Data center trace circuitry matrix concept layout"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
        </div>
      </section>

      {/* FLOW DIAGRAM — OVERFLOW PROTECTED LINE */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          The Data Flow Cycle
        </h2>

        {/* Container safely isolates horizontal overflow scrolling locally */}
        <div className="w-full overflow-x-auto pb-2 scrollbar-thin">
          <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 min-w-[768px]">
            
            {[
              { label: "INPUT", color: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border-blue-100 dark:border-blue-900/30", desc: "Raw item ingestion", icon: LogIn },
              { label: "PROCESSING", color: "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 border-purple-100 dark:border-purple-900/30", desc: "ALU/CU Execution", icon: Cpu },
              { label: "STORAGE", color: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-100 dark:border-amber-900/30", desc: "RAM / ROM / NVMe Volts", icon: Database },
              { label: "OUTPUT", color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30", desc: "Human readable conversion", icon: LogOut }
            ].map((node, idx, arr) => (
              <React.Fragment key={node.label}>
                <div className={`flex items-center gap-3 p-3 rounded-xl border flex-1 bg-white dark:bg-slate-950 ${node.color.split(' ')[2]}`}>
                  <div className={`p-2 rounded-lg shrink-0 ${node.color.split(' ')[0]} ${node.color.split(' ')[1]}`}>
                    <node.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-xs tracking-wide text-slate-900 dark:text-white">{node.label}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{node.desc}</p>
                  </div>
                </div>
                {idx < arr.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-slate-300 dark:text-slate-700 shrink-0 mx-1" />
                )}
              </React.Fragment>
            ))}

          </div>
        </div>
      </section>

      {/* INPUT */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            1. Input (Input Devices)
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-3xl">
            Input refers to the mechanical or digital ingestion of raw signals into a live machine loop, converting physical user states into low-level binary matrices.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div className="p-5 border border-slate-200/60 rounded-2xl bg-white dark:bg-slate-900/40 dark:border-slate-800/80 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Operational Role
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              They actively sense external variants (keystroke pressures, optic reflections, acoustic waves) and marshal them upstream to bus controllers.
            </p>
          </div>

          <div className="p-5 border border-slate-200/60 rounded-2xl bg-white dark:bg-slate-900/40 dark:border-slate-800/80 space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Hardware Array Examples</h3>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              {["Keyboard", "Mouse peripheral", "Optic Scanner", "Microphone array", "Capacitive Screen", "Biometric Reader", "Webcam Node", "Sensors"].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <span className="text-blue-500 font-bold">•</span> {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 aspect-[21/9]">
          <img
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1600&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt="Mechanical typing input terminal arrays"
          />
        </div>
      </section>

      {/* PROCESSING */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            2. Processing (CPU Core)
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-3xl">
            Processing steps occur directly within the Central Processing Unit silicon core, acting as the fundamental tactical coordinator execution machine.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { title: "Control Unit (CU)", desc: "Directs internal operations, coordinates pipeline cycles, and controls global bus lines." },
            { title: "Arithmetic Logic Unit (ALU)", desc: "Executes mathematical additions, binary shifts, and fast logic matrix evaluations." },
            { title: "Internal Memory Unit (MU)", desc: "Sits inside execution rings to handle active register contexts and cache hierarchies." }
          ].map((block) => (
            <div key={block.title} className="p-5 border border-slate-200/60 rounded-2xl bg-white dark:bg-slate-900/40 dark:border-slate-800/80 space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">{block.title}</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{block.desc}</p>
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 aspect-[21/9]">
          <img
            src="https://images.unsplash.com/photo-1591453089816-0fbb971b454c?q=80&w=1600&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt="Silicon processor architecture trace micro-matrix"
          />
        </div>
      </section>

      {/* STORAGE */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            3. Storage Architecture
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-3xl">
            Preserves active program loops and structural system files across distinct memory tiers to ensure instant accessibility.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {/* PRIMARY */}
          <div className="p-5 border border-slate-200/60 rounded-2xl bg-white dark:bg-slate-900/40 dark:border-slate-800/80 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
              <Layers className="h-4 w-4 text-amber-500" />
              <h3 className="text-sm">Primary Memory (Volatile Working Matrix)</h3>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 leading-normal">
              Directly accessed by the CPU cache layout pipelines over ultra-fast bus frameworks.
            </p>
            <ul className="text-xs space-y-2 text-slate-500 dark:text-slate-400 pt-1">
              <li className="flex items-start gap-1.5">
                <strong className="text-slate-800 dark:text-slate-200 shrink-0 font-semibold">RAM:</strong> Temp run space erased instantly during power cuts.
              </li>
              <li className="flex items-start gap-1.5">
                <strong className="text-slate-800 dark:text-slate-200 shrink-0 font-semibold">ROM:</strong> Permanent core instructions keeping BIOS/UEFI secure.
              </li>
            </ul>
          </div>

          {/* SECONDARY */}
          <div className="p-5 border border-slate-200/60 rounded-2xl bg-white dark:bg-slate-900/40 dark:border-slate-800/80 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
              <HardDrive className="h-4 w-4 text-amber-500" />
              <h3 className="text-sm">Secondary Memory (Non-Volatile Base)</h3>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 leading-normal">
              Sits safely outside processor clock rings to hold systemic storage blocks indefinitely.
            </p>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              {["NVMe/SATA SSDs", "Legacy HDDs", "USB Flash Blocks", "SD Memory Arrays", "Optical Media Disks", "Network Attached NAS"].map((item) => (
                <span key={item} className="block">• {item}</span>
              ))}
            </div>
          </div>
        </div>

        {/* REFACTORED STORAGE UNIT MATRIX TABLE */}
        <div className="p-5 border border-amber-200 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/10 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400 font-bold text-xs tracking-wider uppercase">
            <Info className="h-4 w-4" /> Memory Scale Metrics (SI Decimal Standard)
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs border-t border-amber-200/40 dark:border-amber-900/20 pt-3">
            {[
              { unit: "1 Byte", val: "8 Bits" },
              { unit: "1 KB (Kilobyte)", val: "1,000 Bytes" },
              { unit: "1 MB (Megabyte)", val: "1,000 KB" },
              { unit: "1 GB (Gigabyte)", val: "1,000 MB" },
              { unit: "1 TB (Terabyte)", val: "1,000 GB" },
              { unit: "1 PB (Petabyte)", val: "1,000 TB" },
              { unit: "1 EB (Exabyte)", val: "1,000 PB" },
              { unit: "1 ZB (Zettabyte)", val: "1,000 EB" }
            ].map((row) => (
              <div key={row.unit} className="flex justify-between items-center bg-white/50 dark:bg-slate-950/40 px-2.5 py-1.5 rounded-lg border border-amber-200/30 dark:border-amber-900/20">
                <span className="font-semibold text-slate-900 dark:text-white font-mono">{row.unit}</span>
                <span className="text-slate-400 dark:text-slate-500 text-[11px] font-mono">{row.val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTPUT */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            4. Output (Output Devices)
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-3xl">
            The termination stage where parsed structural metrics map back directly to human sensory receptors.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div className="p-5 border border-slate-200/60 rounded-2xl bg-white dark:bg-slate-900/40 dark:border-slate-800/80 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Sensor Target Pipeline</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
              Converts calculation blocks into spatial photon layouts, moving mechanics, audio waves, or material printing layers.
            </p>
          </div>

          <div className="p-5 border border-slate-200/60 rounded-2xl bg-white dark:bg-slate-900/40 dark:border-slate-800/80 space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Ingested Format Output Components</h3>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400">
              {["OLED/LCD Screens", "Laser/Inkjet Printers", "Acoustic Speakers", "Studio Headphones", "Light Projectors", "Precision Plotters"].map((device) => (
                <span key={device} className="block">• {device}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 aspect-[21/9]">
          <img
            src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=1600&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt="High definition desktop visual monitor matrix systems"
          />
        </div>
      </section>

      {/* VIDEO FLOW */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          Watch: Data Flow Architecture Analysis
        </h2>
        <div className="aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-950">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/CBf-jIn44X0"
            title="Data Flow in Computer System"
            allowFullScreen
          />
        </div>
      </section>

      {/* SUMMARY REVIEW */}
      <section className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex gap-4 items-start">
        <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 hidden sm:block shadow-sm shrink-0">
          <Laptop className="h-6 w-6" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Architecture Summary
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            The classic ingestion cycle transforms completely raw data arrays directly into human-actionable insights. 
            Understanding the precise paths through the CPU, memory lanes, and output channels ensures optimized hardware interactions when debugging data flow boundaries or building software solutions.
          </p>
        </div>
      </section>

    </div>
  );
}