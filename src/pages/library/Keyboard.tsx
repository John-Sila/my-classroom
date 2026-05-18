import React from 'react';
import { 
  Keyboard, 
  Type, 
  Terminal, 
  Compass, 
  Sliders, 
  Cpu, 
  ChevronRight, 
  HelpCircle, 
  RefreshCw, 
  Maximize, 
  Layers, 
  Wifi, 
  FileText 
} from 'lucide-react';

export default function KeyboardTopic() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-16 text-slate-700 dark:text-slate-300 leading-relaxed overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="space-y-6 rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50 p-6 shadow-sm dark:border-slate-800 dark:from-slate-950 dark:to-slate-900 md:p-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
          <Keyboard className="h-3.5 w-3.5" /> Input Device
        </span>

        <div className="space-y-3">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">
            The Keyboard
          </h1>
          <p className="max-w-3xl text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            A fundamental human-to-computer input peripheral engineered to translate physical keystroke activations into alphanumeric data streams, navigation commands, and low-level system execution parameters.
          </p>
        </div>

        {/* Replaced fixed heights with responsive aspect scaling to protect 100dvh boundaries */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 aspect-[16/9] md:aspect-[21/9]">
          <img
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1600&auto=format&fit=crop"
            alt="Mechanical keyboard layout with custom tactile caps"
            className="w-full h-full object-cover transform hover:scale-[1.01] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
        </div>
      </section>

      {/* WHAT IT DOES */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            What a Keyboard Does
          </h2>
          <p className="max-w-2xl text-slate-500 dark:text-slate-400 text-sm">
            Beyond standard typography tasks, a keyboard manages complex system navigation routing, programmatic micro-operations, and system operational parameters.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Data Entry",
              desc: "Streams individual alphanumeric matrices, numeric series, and special symbols into text fields.",
              icon: Type,
            },
            {
              title: "Command Input",
              desc: "Executes instant program operations and functional system macro bindings cleanly.",
              icon: Terminal,
            },
            {
              title: "Navigation",
              desc: "Offsets workspace cursors, page boundaries, and viewport views without mouse tracking.",
              icon: Compass,
            },
            {
              title: "System Control",
              desc: "Interacts directly with shell host states, active applications, and window layers.",
              icon: Sliders,
            },
          ].map(({ title, desc, icon: Icon }) => (
            <div
              key={title}
              className="flex gap-4 p-5 rounded-2xl border border-slate-200/60 bg-white shadow-sm transition hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900/40"
            >
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500 shrink-0 h-fit">
                <Icon className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-normal">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* KEY GROUPS */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Main Key Categories
          </h2>
          <p className="max-w-2xl text-slate-500 dark:text-slate-400 text-sm">
            Physical layout structures are grouped cleanly according to their low-level runtime operation logic profiles.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {[
            {
              title: "Character Keys",
              text: "The fundamental layout block managing text inputs.",
              mono: "A-Z",
              items: [
                "Alphabet keys (A–Z)",
                "Numeric rows (0–9)",
                "Punctuation marks (. , ; :)",
                "Symbol keys (@ # $ %)",
              ],
            },
            {
              title: "Function Keys",
              text: "Top-mounted buttons providing instant task maps.",
              mono: "F1-F12",
              items: [
                "F1 — System Help Context",
                "F2 — Focus Name Mod",
                "F5 — Page Refresh Core",
                "F11 — Toggle Fullscreen",
              ],
            },
            {
              title: "Navigation Keys",
              text: "Controls viewport tracking points and editing coordinates.",
              mono: "← ↓ →",
              items: [
                "Arrow Clusters (↑ ↓ ← →)",
                "Home / End Row Caps",
                "Page Up / Page Down",
                "Insert / Delete Triggers",
              ],
            },
            {
              title: "Modifier Keys",
              text: "Alters code signals when pressed concurrently.",
              mono: "Ctrl",
              items: [
                "Shift — Case Alteration",
                "Ctrl — Utility Shortcuts",
                "Alt — Option Execution Paths",
                "Win / Cmd — Global Shell OS",
              ],
            },
          ].map((group) => (
            <div
              key={group.title}
              className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/30 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                    {group.mono}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {group.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  {group.text}
                </p>
                <ul className="space-y-2 pt-2 text-sm text-slate-600 dark:text-slate-400">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TYPES */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Types of Keyboards
          </h2>
          <p className="max-w-2xl text-slate-500 dark:text-slate-400 text-sm">
            Varying physical tracking engineering designs balance sound, travel depth, and data connections differently.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[
            { title: "Membrane Layout", desc: "Uses unified tactile pressure sheets. Extremely silent, light, and common across office units.", icon: Layers },
            { title: "Mechanical Switches", desc: "Uses independent spring switch units under each cap. High precision and extreme durability.", icon: Cpu },
            { title: "Wireless Radios", desc: "Connects across 2.4GHz USB components or Bluetooth nodes to clean workspace clutter.", icon: Wifi },
          ].map(({ title, desc, icon: Icon }) => (
            <div
              key={title}
              className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/30 space-y-3"
            >
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 w-fit">
                <Icon className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  {title}
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS — PROTECTED HORIZONTAL FLOW MATRIX */}
      <section className="space-y-5">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            How a Keyboard Works
          </h2>
          <p className="max-w-3xl text-sm text-slate-500 dark:text-slate-400">
            Pressing down keys bridges gaps across an internal circuitry wire layout matrix, instantly flashing specific voltage metrics upstream to controllers.
          </p>
        </div>

        {/* Container safely isolates horizontal overflow scrolling locally */}
        <div className="w-full overflow-x-auto pb-2 scrollbar-thin">
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 min-w-[640px] text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
            
            <div className="flex items-center gap-3 bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200/40 dark:border-slate-800/60 flex-1">
              <span className="h-5 w-5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400 text-[10px]">01</span>
              <div>
                <p className="text-slate-900 dark:text-white font-bold text-[11px]">Key Pressed</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Closes switch trace path.</p>
              </div>
            </div>

            <ChevronRight className="h-4 w-4 text-slate-300 dark:text-slate-700 shrink-0" />

            <div className="flex items-center gap-3 bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200/40 dark:border-slate-800/60 flex-1">
              <span className="h-5 w-5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center font-bold text-emerald-600 dark:text-emerald-400 text-[10px]">02</span>
              <div>
                <p className="text-slate-900 dark:text-white font-bold text-[11px]">Signal Sent</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Dispatches key code byte streams.</p>
              </div>
            </div>

            <ChevronRight className="h-4 w-4 text-slate-300 dark:text-slate-700 shrink-0" />

            <div className="flex items-center gap-3 bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200/40 dark:border-slate-800/60 flex-1">
              <span className="h-5 w-5 rounded-md bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400 text-[10px]">03</span>
              <div>
                <p className="text-slate-900 dark:text-white font-bold text-[11px]">CPU Process</p>
                <p className="text-[10px] text-slate-400 mt-0.5">OS parses active language map.</p>
              </div>
            </div>

            <ChevronRight className="h-4 w-4 text-slate-300 dark:text-slate-700 shrink-0" />

            <div className="flex items-center gap-3 bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200/40 dark:border-slate-800/60 flex-1">
              <span className="h-5 w-5 rounded-md bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center font-bold text-purple-600 dark:text-purple-400 text-[10px]">04</span>
              <div>
                <p className="text-slate-900 dark:text-white font-bold text-[11px]">UI Displayed</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Renders active screen font glyph.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SUMMARY */}
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:to-slate-950 md:p-8 flex gap-4 items-start">
        <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hidden sm:block shrink-0">
          <FileText className="h-6 w-6" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Summary Review
          </h2>
          <p className="max-w-3xl text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            The keyboard stands as an absolute foundational gateway component linking user intent straight to internal hardware environments. Organizing its mechanical switches systematically by functional category ensures optimal data processing throughput and workflow speed across all computer management workflows.
          </p>
        </div>
      </section>
    </div>
  );
}