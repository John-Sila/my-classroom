import React, { useState } from 'react';
import { 
  Layers, 
  Eye, 
  Orbit, 
  Shuffle, 
  Cpu, 
  Glasses, 
  View, 
  MapPin, 
  Sparkles,
  Zap,
  Maximize2,
  Minimize2,
  Activity,
  Compass,
  Hammer,
  Stethoscope,
  Plane,
  HeartPulse,
  Brain,
  Building,
  ShieldAlert,
  GraduationCap,
  Sparkle,
  Gamepad2,
  Users,
  Link2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types & Data Interfaces ---
interface TechFeature {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

interface RealityExample {
  id: number;
  title: string;
  domain: string;
  description: string;
  icon: React.ComponentType<any>;
}

interface RealityParadigm {
  title: string;
  tagline: string;
  icon: React.ComponentType<any>;
  accentColor: string;
  glowColor: string;
  definition: string;
  pipeline: string[];
  features: TechFeature[];
  examples: RealityExample[];
}

export const RealityManipulationDossier: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ar' | 'vr' | 'comparison'>('ar');
  const [expandedExample, setExpandedExample] = useState<number | null>(null);

  // --- Exhaustive Data Schema ---
  const paradigms: Record<'ar' | 'vr', RealityParadigm> = {
    ar: {
      title: "Augmented Reality",
      tagline: "The Spatial Overlayer",
      icon: Layers,
      accentColor: "border-cyan-500/20 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-50/50 dark:bg-cyan-950/20",
      glowColor: "shadow-[0_0_30px_rgba(6,182,212,0.08)] dark:shadow-[0_0_30px_rgba(34,211,238,0.15)]",
      definition: "The practice of layering dynamic digital geometries, optical fields, and information layers directly onto the live, un-altered physical universe. AR respects physical coordinates, anchoring persistent synthetic elements to actual structural foundations.",
      pipeline: [
        "Spatial Data Ingest via LiDAR & RGB Camera Matrices",
        "SLAM Tracking (Simultaneous Localization & Mapping)",
        "Ambient Photometry & Light-Source Direction Matching",
        "Waveguide Optical Compositing directly into the Retina"
      ],
      features: [
        { title: "Relational Geometries", description: "Digital constructs realistically bounce off actual tables, slip behind pillars, and respect physical boundaries.", icon: Orbit },
        { title: "Environmental Persistence", description: "Holograms remain anchored permanently to explicit physical GPS coordinates or surface anchors.", icon: MapPin },
        { title: "Retinal Projection", description: "Advanced diffractive waveguides draw graphics inline with human sight lines, minimizing eye strain.", icon: Eye }
      ],
      examples: [
        { id: 1, domain: "Aviation", title: "Spatial Navigation Windshields", description: "Heads-Up Displays (HUDs) projecting glowing tactical routes and hazardous boundary lines directly onto vehicle cockpits or windshields.", icon: Plane },
        { id: 2, domain: "Engineering", title: "Industrial Maintenance HUDs", description: "Real-time step-by-step diagnostic schematics layered directly onto massive physical engine components, highlighting internal flaws.", icon: Hammer },
        { id: 3, domain: "Medicine", title: "Precision Surgical Underlays", description: "Live 3D vascular maps and internal structural datasets compiled from CT scans projected directly onto a patient's physical body during operations.", icon: Stethoscope },
        { id: 4, domain: "Logistics", title: "Vision-Guided Warehousing", description: "Smart glasses painting glowing structural paths and item markers onto rows of shelves to optimize pick-and-pack routing schedules.", icon: Compass },
        { id: 5, domain: "Commerce", title: "True-Scale Spatial Retail", description: "Hyper-accurate spatial layout models rendering items directly in a residential room with real-time shadow casting and physics matching.", icon: Building },
        { id: 6, domain: "Translation", title: "Live Linguistic Overwriters", description: "Real-time context lenses scanning foreign textual signage in physical environments and repainting them locally in matching typography.", icon: View },
        { id: 7, domain: "Defense", title: "Tactical Environment Visors", description: "Military combat helmets projecting heat maps, squad structural data, and target calculations directly into the user's line of sight.", icon: ShieldAlert },
        { id: 8, domain: "Education", title: "Interactive Spatial Manuals", description: "Educational literature yielding 3D micro-machinery or planetary systems that lift right off the page when viewed through an AR engine.", icon: GraduationCap },
        { id: 9, domain: "Architecture", title: "Holographic Structural Blueprints", description: "Full-scale structural models mapped onto completely raw plots of land, allowing developers to inspect sightlines before construction.", icon: Glasses },
        { id: 10, domain: "Entertainment", title: "Contextual Tabletop Simulators", description: "Complex tactical games that utilize physical desks and floors as interactive terrain matrices for digital characters.", icon: Gamepad2 }
      ]
    },
    vr: {
      title: "Virtual Reality",
      tagline: "The Sensory Substitute",
      icon: Glasses,
      accentColor: "border-fuchsia-500/20 dark:border-fuchsia-500/30 text-fuchsia-600 dark:text-fuchsia-400 bg-fuchsia-50/50 dark:bg-fuchsia-950/20",
      glowColor: "shadow-[0_0_30px_rgba(217,70,239,0.08)] dark:shadow-[0_0_30px_rgba(217,70,239,0.15)]",
      definition: "The total isolation and subsequent replacement of biological optical and acoustic sensations. By containing the human skull inside an enclosed light-tight canopy, VR translates human nervous system inputs into synthetic realities.",
      pipeline: [
        "Light-Tight Optical Deprivation & Isolation Hull",
        "Sub-20ms Inertial Unit Rotational Polling (6DoF)",
        "Stereoscopic Dual-Panel Micro-Display Separation",
        "Binaural Soundstage Convoluted Audio Simulation"
      ],
      features: [
        { title: "Cognitive Translation", description: "The primitive brain loops register computer-generated depth vectors as genuine physical space.", icon: Brain },
        { title: "Absolute Isolation", description: "Eliminates all ambient environmental sound fields and visual streams to guarantee absolute focus.", icon: ShieldAlert },
        { title: "Kinetic Synthesis", description: "Translates human motor tracking inputs directly into virtual kinetic force, matching physical weight models.", icon: Cpu }
      ],
      examples: [
        { id: 11, domain: "Aviation", title: "Tactical Flight Simulators", description: "High-risk flight parameter cages enabling military pilots to practice complex emergency crash maneuvers under complete visual realism.", icon: Plane },
        { id: 22, domain: "Therapy", title: "Exposure Therapy Simulators", description: "Controlled clinical exposure rooms where phobia triggers or trauma scenarios are programmatically introduced under strict medical supervision.", icon: HeartPulse },
        { id: 33, domain: "Artistry", title: "Volumetric Spatial CAD Tools", description: "Infinite dimensional digital canvases where sculptors create life-size conceptual vehicles and designs using broad arm strokes.", icon: Sparkles },
        { id: 44, domain: "Enterprise", title: "Telepresence Collaboration Hubs", description: "Virtualized corporate environments grouping remote international teams together with authentic positional tracking and spatial audio.", icon: Users },
        { id: 55, domain: "Safety", title: "Hazardous Industrial Drills", description: "Interactive disaster responses for chemical fires, nuclear malfunctions, or structural collapses built completely risk-free.", icon: Zap },
        { id: 66, domain: "Astronomy", title: "Extraterrestrial Traversers", description: "Scientific visualizations translating real telemetry data from Mars rovers into a walk-able environment for astro-geologists.", icon: Orbit },
        { id: 77, domain: "Real Estate", title: "Pre-Construction Walkthroughs", description: "Immersive architectural platforms allowing stakeholders to stroll through unbuilt properties to evaluate room scale and lighting.", icon: Building },
        { id: 88, domain: "Athletics", title: "Kinetic Sports Performance Training", description: "Rhythm-heavy speed rigs designed to push athletic cardiovascular boundaries by throwing complex data tracks at the user.", icon: Activity },
        { id: 99, domain: "Gaming", title: "Immersive Action Environments", description: "Complex interactive scenarios where gamers manually duck behind covers, pull levers, reload gear, and track paths using hand controls.", icon: Gamepad2 },
        { id: 100, domain: "Medical Training", title: "Haptic Surgical Rehearsals", description: "Hyper-realistic anatomical procedures that let medical trainees manipulate complex physiological layers with physical haptic resistance.", icon: Stethoscope }
      ]
    }
  };

  const activeParadigm = activeTab !== 'comparison' ? paradigms[activeTab] : null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans p-4 md:p-8 selection:bg-cyan-500/30 overflow-x-hidden antialiased transition-colors duration-300">
      
      {/* --- Ambient Glowing Orbs --- */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/[0.03] dark:bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-fuchsia-500/[0.03] dark:bg-fuchsia-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* --- Header Section --- */}
        <header className="border border-slate-200 dark:border-slate-900 rounded-3xl p-6 md:p-8 bg-white/60 dark:bg-slate-900/20 backdrop-blur-md relative overflow-hidden shadow-sm dark:shadow-none">
          <div className="absolute top-0 right-0 p-4 opacity-[0.04] dark:opacity-10">
            <Sparkle className="w-24 h-24 text-slate-900 dark:text-slate-400 animate-spin-slow" />
          </div>
          <div className="flex items-center gap-3 text-cyan-600 dark:text-cyan-400 font-mono text-xs tracking-widest uppercase mb-3">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
            <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-mono text-xs tracking-widest uppercase mb-3">
                <Link2 className="w-4 h-4 animate-pulse" />
                Computer generated Graphics & Manipulation of Reality
            </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-500">
            Altered Perceptions
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed">
            Reality manipulation technologies do not merely display structural metrics; they reshape sensory input. 
            By blending digital constructs with physical frameworks or replacing our physical environment entirely, 
            these structures re-map how we process spatial reality.
          </p>

          {/* --- Navigation Tabs --- */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-100 dark:border-slate-900">
            <button
              onClick={() => setActiveTab('ar')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-all ${
                activeTab === 'ar' 
                  ? 'bg-cyan-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-md shadow-cyan-500/10 dark:shadow-cyan-500/20 font-bold scale-105' 
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-850'
              }`}
            >
              <Layers className="w-4 h-4" /> Augmented Reality
            </button>
            <button
              onClick={() => setActiveTab('vr')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-all ${
                activeTab === 'vr' 
                  ? 'bg-fuchsia-600 dark:bg-fuchsia-500 text-white dark:text-slate-950 shadow-md shadow-fuchsia-500/10 dark:shadow-fuchsia-500/20 font-bold scale-105' 
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-850'
              }`}
            >
              <Glasses className="w-4 h-4" /> Virtual Reality
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-all ${
                activeTab === 'comparison' 
                  ? 'bg-gradient-to-r from-cyan-600 to-fuchsia-600 dark:from-cyan-500 dark:to-fuchsia-500 text-white dark:text-slate-950 shadow-md font-bold scale-105' 
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-850'
              }`}
            >
              <Shuffle className="w-4 h-4" /> Core Matrix Comparison
            </button>
          </div>
        </header>

        {/* --- Content Area --- */}
        <AnimatePresence mode="wait">
          {activeParadigm && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Paradigm Definition & Architecture */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Core Definition Block */}
                <div className={`lg:col-span-2 border rounded-3xl p-6 md:p-8 bg-white/40 dark:bg-slate-900/10 backdrop-blur-sm flex flex-col justify-between shadow-sm dark:shadow-none ${activeParadigm.accentColor} ${activeParadigm.glowColor}`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800 shadow-sm">
                        <activeParadigm.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">{activeParadigm.title}</h2>
                        <p className="text-xs font-mono text-slate-400 opacity-80 tracking-widest uppercase">{activeParadigm.tagline}</p>
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed pt-2">
                      {activeParadigm.definition}
                    </p>
                  </div>

                  {/* Core Features Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-slate-900/50">
                    {activeParadigm.features.map((feat, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-800 dark:text-white font-bold text-sm">
                          <feat.icon className="w-4 h-4 opacity-70" />
                          {feat.title}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">{feat.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Computational Pipeline Block */}
                <div className="border border-slate-200 dark:border-slate-900 rounded-3xl p-6 bg-white dark:bg-slate-900/30 flex flex-col justify-between shadow-sm dark:shadow-none">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2 mb-4">
                      <Cpu className="w-4 h-4 text-slate-400" />
                      Data Rendering Pipeline
                    </h3>
                    <div className="space-y-3 relative before:absolute before:left-[17px] before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-900">
                      {activeParadigm.pipeline.map((step, index) => (
                        <div key={index} className="flex items-start gap-3 relative group">
                          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 flex items-center justify-center text-xs font-mono text-slate-500 dark:text-slate-400 z-10 font-bold group-hover:border-slate-400 dark:group-hover:border-slate-700 transition-colors">
                            0{index + 1}
                          </div>
                          <div className="flex-1 pt-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                            {step}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-900 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 animate-pulse" />
                    Updates continuously with absolute latency under 20ms.
                  </div>
                </div>
              </div>

              {/* Comprehensive Examples Grid */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">10 Concrete Implementations</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Exhaustive operational real-world deployments of this paradigm.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {activeParadigm.examples.map((ex) => {
                    const isExpanded = expandedExample === ex.id;
                    return (
                      <motion.div
                        layout="position"
                        key={ex.id}
                        onClick={() => setExpandedExample(isExpanded ? null : ex.id)}
                        className={`border rounded-2xl p-4 bg-white/80 dark:bg-slate-900/20 hover:bg-white dark:hover:bg-slate-900/40 cursor-pointer transition-all flex flex-col justify-between group relative overflow-hidden shadow-sm dark:shadow-none ${
                          isExpanded 
                            ? 'lg:col-span-2 border-slate-400 dark:border-slate-700 bg-white dark:bg-slate-900/60 shadow-md dark:shadow-xl' 
                            : 'border-slate-100 dark:border-slate-900 hover:border-slate-300 dark:hover:border-slate-800'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 text-slate-500 dark:text-slate-400">
                              {ex.domain}
                            </span>
                            <ex.icon className={`w-4 h-4 transition-transform ${isExpanded ? 'scale-110 text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors leading-tight">
                            {ex.title}
                          </h4>
                          <p className={`text-xs text-slate-500 dark:text-slate-400 leading-relaxed ${isExpanded ? 'block pt-1' : 'line-clamp-2'}`}>
                            {ex.description}
                          </p>
                        </div>

                        <div className="flex justify-end items-center mt-3 pt-2 border-t border-slate-50 dark:border-slate-950/40">
                          {isExpanded ? (
                            <Minimize2 className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                          ) : (
                            <Maximize2 className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-slate-500 dark:group-hover:text-slate-400" />
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'comparison' && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/10 backdrop-blur-md rounded-[2rem] overflow-hidden shadow-sm dark:shadow-2xl"
            >
              <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/20">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Structural Reality Matrix</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500">Architectural differences across physical and sensory attributes.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-900 bg-slate-50 dark:bg-slate-950 text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      <th className="p-4 md:p-5 font-semibold">Operational Vector</th>
                      <th className="p-4 md:p-5 font-semibold text-cyan-600 dark:text-cyan-400">Augmented Reality (AR)</th>
                      <th className="p-4 md:p-5 font-semibold text-fuchsia-600 dark:text-fuchsia-400">Virtual Reality (VR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
                    <tr className="bg-white dark:bg-transparent">
                      <td className="p-4 md:p-5 font-bold text-slate-900 dark:text-white">Primary Goal</td>
                      <td className="p-4 md:p-5 text-slate-600 dark:text-slate-300">Contextualize and append data tracks onto real surroundings.</td>
                      <td className="p-4 md:p-5 text-slate-600 dark:text-slate-300">Transport and isolate the user inside an alternate universe.</td>
                    </tr>
                    <tr className="bg-slate-50/30 dark:bg-transparent">
                      <td className="p-4 md:p-5 font-bold text-slate-900 dark:text-white">Hardware Core</td>
                      <td className="p-4 md:p-5 text-slate-600 dark:text-slate-300">Waveguide lenses, depth sensors (LiDAR), environmental cameras.</td>
                      <td className="p-4 md:p-5 text-slate-600 dark:text-slate-300">Stereoscopic display structures, pancake lens arrays, light-tight shells.</td>
                    </tr>
                    <tr className="bg-white dark:bg-transparent">
                      <td className="p-4 md:p-5 font-bold text-slate-900 dark:text-white">User Cognition</td>
                      <td className="p-4 md:p-5 text-slate-600 dark:text-slate-300">Dual presence—simultaneous processing of actual and virtual fields.</td>
                      <td className="p-4 md:p-5 text-slate-600 dark:text-slate-300">Total displacement—complete visual translation to synthetic coordinates.</td>
                    </tr>
                    <tr className="bg-slate-50/30 dark:bg-transparent">
                      <td className="p-4 md:p-5 font-bold text-slate-900 dark:text-white">Interaction Style</td>
                      <td className="p-4 md:p-5 text-slate-600 dark:text-slate-300">Relational—digital objects behave dynamically around actual variables.</td>
                      <td className="p-4 md:p-5 text-slate-600 dark:text-slate-300">Autonomous—interaction bound strictly to internal code limitations.</td>
                    </tr>
                    <tr className="bg-white dark:bg-transparent">
                      <td className="p-4 md:p-5 font-bold text-slate-900 dark:text-white">Tracking Dependency</td>
                      <td className="p-4 md:p-5 text-slate-600 dark:text-slate-300">Relies heavily on SLAM to continuously map changing landscapes.</td>
                      <td className="p-4 md:p-5 text-slate-600 dark:text-slate-300">Relies heavily on IMUs and tracking nodes to match physical skull angles.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-5 bg-slate-50 dark:bg-slate-950 text-xs text-center text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-900">
                Extended Reality architectures are governed by absolute timing parameters. Any discrepancy can break biological vestibular synchronization.
              </div>
            </motion.div>
          )}
        </AnimatePresence>


      </div>
    </div>
  );
};