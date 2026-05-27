import React, { useState } from "react";
import {
  Bot,
  Cpu,
  Activity,
  Layers2,
  Zap,
  UserCheck,
  Globe,
  Info,
  Scale,
  Code,
  AlertTriangle,
  Settings,
  Heart,
  Shield,
  Command,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const ROBOT_TYPES = [
  {
    name: "Industrial Robots",
    desc: "Robotic arms and automated systems used in manufacturing, welding, assembly, painting, and packaging.",
  },
  {
    name: "Mobile Robots",
    desc: "Autonomous or semi-autonomous robots that move, such as AGVs, drones, self-driving cars, and service robots.",
  },
  {
    name: "Humanoid Robots",
    desc: "Robots with human-like form and behavior, designed to interact in human environments and use human tools.",
  },
  {
    name: "Medical Robots",
    desc: "Robots used in surgery, rehabilitation, prosthetics, and care, such as surgical robots and exoskeletons.",
  },
  {
    name: "Service Robots",
    desc: "Robots that perform useful tasks for humans, including cleaning, delivery, security, and hospitality.",
  },
  {
    name: "Educational Robots",
    desc: "Simple robots used for teaching programming, electronics, and engineering concepts in schools and universities.",
  },
];

const CORE_COMPONENTS = [
  {
    title: "Sensors (Perception)",
    desc: "Devices that measure physical quantities and convert them into signals the robot can process.",
    examples: "Encoders, IMUs, LiDAR, cameras, ultrasonic sensors, force/torque sensors, temperature sensors.",
  },
  {
    title: "Actuators (Action)",
    desc: "Components that convert electrical signals into physical motion or force.",
    examples: "DC motors, stepper motors, servo motors, hydraulic actuators, pneumatic actuators.",
  },
  {
    title: "Controllers (Processing)",
    desc: "Embedded systems that process sensor data, make decisions, and command actuators.",
    examples: "Microcontrollers (Arduino, STM32), microprocessors (Raspberry Pi, NVIDIA Jetson), FPGAs.",
  },
  {
    title: "Power System",
    desc: "Provides energy to all robot components, often with regulators and protection circuits.",
    examples: "Lithium-ion batteries, power supplies, DC-DC converters, voltage regulators.",
  },
  {
    title: "Mechanical Structure",
    desc: "The physical frame, joints, links, and end-effectors that define the robot's form and motion.",
    examples: "Robotic arms, chassis, wheels, tracks, legs, grippers, end-effectors.",
  },
  {
    title: "Communication",
    desc: "Interfaces that allow the robot to communicate with other systems or users.",
    examples: "Wi-Fi, Bluetooth, Zigbee, CAN bus, UART, SPI, I2C, Ethernet.",
  },
];

const ROBOTICS_LAWS = [
  {
    number: "Zeroth",
    icon: Shield,
    accentClass: "bg-emerald-50 dark:bg-slate-950 border-emerald-200 dark:border-emerald-900 text-emerald-600",
    law: "A robot may not harm humanity, or, by inaction, allow humanity to come to harm.",
    desc: "Added later by Asimov to address scenarios where robots govern entire civilizations; it supersedes the other laws.",
  },
  {
    number: "First",
    icon: Heart,
    accentClass: "bg-rose-50 dark:bg-slate-950 border-rose-200 dark:border-rose-900 text-rose-600",
    law: "A robot may not injure a human being or, through inaction, allow a human being to come to harm.",
    desc: "Primary ethical rule: protect human safety above all else.",
  },
  {
    number: "Second",
    icon: Command,
    accentClass: "bg-amber-50 dark:bg-slate-950 border-amber-200 dark:border-amber-900 text-amber-600",
    law: "A robot must obey the orders given to it by human beings, except where such orders would conflict with the First Law.",
    desc: "Robots must follow human commands unless they endanger humans.",
  },
  {
    number: "Third",
    icon: Shield,
    accentClass: "bg-sky-50 dark:bg-slate-950 border-sky-200 dark:border-sky-900 text-sky-600",
    law: "A robot must protect its own existence as long as such protection does not conflict with the First or Second Law.",
    desc: "Self-preservation is important, but only if it doesn't harm humans or disobey orders.",
  },
];

const LANGUAGES_BY_ABSTRACTION = [
  {
    level: "Low-Level (Close to Hardware)",
    icon: Zap,
    colorClass: "text-rose-500",
    languages: [
      { name: "C", desc: "Used for bare-metal firmware on microcontrollers; direct hardware access, minimal abstraction." },
      { name: "Assembly", desc: "Machine-level language for specific CPUs; maximum control, hardest to write and maintain." },
      { name: "C (with RTOS)", desc: "Real-time operating systems for deterministic timing in embedded controllers." },
    ],
  },
  {
    level: "Mid-Level (Hardware + Logic)",
    icon: Activity,
    colorClass: "text-amber-500",
    languages: [
      { name: "C++", desc: "Most widely used language in robotics; high performance, object-oriented, used in ROS, drivers, and control loops." },
      { name: "C (Advanced)", desc: "Used in embedded systems for sensors, actuators, and low-level device drivers." },
      { name: "Python (for embedded)", desc: "Used on more powerful microcontrollers (e.g., MicroPython on ESP32, Raspberry Pi)." },
    ],
  },
  {
    level: "High-Level (Abstraction & AI)",
    icon: UserCheck,
    colorClass: "text-emerald-500",
    languages: [
      { name: "Python", desc: "Dominant for high-level logic, AI, machine learning, vision, and prototyping; used heavily with ROS." },
      { name: "MATLAB / Simulink", desc: "Used for modeling, simulation, control design, and algorithm development in robotics." },
      { name: "Java", desc: "Used in some robotics frameworks and educational environments." },
      { name: "C#", desc: "Used with Unity and other simulation environments for robotics." },
    ],
  },
  {
    level: "Middleware & Frameworks",
    icon: Globe,
    colorClass: "text-indigo-500",
    languages: [
      { name: "ROS / ROS 2 (C++ & Python)", desc: "Robot Operating System: middleware that abstracts hardware, provides message-passing, drivers, and tools. Not a language, but a framework that allows different languages to communicate." },
      { name: "ROS Nodes (C++ / Python)", desc: "Individual programs (nodes) that handle specific tasks like perception, planning, or control." },
      { name: "Specialized Languages", desc: "URScript (Universal Robots), KRL (KUKA), APT (industrial robots) for specific robot brands." },
    ],
  },
];

const EMBEDDED_SYSTEMS = [
  {
    title: "Microcontrollers",
    desc: "Small, low-power computers on a chip (e.g., Arduino, STM32, ESP32) used for real-time control of motors and sensors.",
  },
  {
    title: "Microprocessors",
    desc: "More powerful CPUs (e.g., Raspberry Pi, NVIDIA Jetson) used for high-level processing, vision, and AI.",
  },
  {
    title: "Real-Time Constraints",
    desc: "Embedded systems in robots often must respond within strict time limits (e.g., motor control loops at 1 kHz).",
  },
  {
    title: "Sensors & Actuators Interface",
    desc: "Embedded systems read sensor data via ADC/I2C/SPI and send control signals to actuators via PWM, UART, or CAN.",
  },
  {
    title: "Power Management",
    desc: "Embedded systems manage power budgets, battery levels, and safe shutdown procedures.",
  },
  {
    title: "Safety & Reliability",
    desc: "Embedded systems implement fail-safes, watchdogs, and error handling to prevent dangerous robot behavior.",
  },
];

// ==========================================
// MAIN COMPONENT EXPORT
// ==========================================

type TabType = "overview" | "laws" | "engineering";

export default function RoboticsTopic() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans p-4 md:p-8 selection:bg-indigo-500/20 overflow-x-hidden antialiased transition-colors duration-300 relative">
      
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-500/[0.015] dark:bg-indigo-500/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/[0.015] dark:bg-sky-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Module Header Segment */}
        <header className="border border-slate-200 dark:border-slate-900 rounded-3xl p-6 md:p-8 bg-white/60 dark:bg-slate-900/20 backdrop-blur-md shadow-sm dark:shadow-none relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-[0.03] dark:opacity-10">
            <Bot className="w-24 h-24 text-slate-900 dark:text-slate-400" />
          </div>

          <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400 font-mono text-xs tracking-widest uppercase mb-3">
            <Cpu className="w-4 h-4" />
            Robotics & Embedded Systems
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400">
            Robotics: Engineering Intelligent Machines
          </h1>

          <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
            <p>
              Robotics is the interdisciplinary field that designs, builds, and programs machines—robots—that can sense, decide, and act in the physical world. It combines mechanical engineering, electrical engineering, computer science, and embedded systems to create autonomous or semi-autonomous systems.
            </p>
            <p>
              Robots rely on sensors to perceive their environment, actuators to move and interact, and embedded controllers to process data and make decisions. They are governed by ethical principles (such as Asimov's Three Laws of Robotics) and implemented using programming languages at various levels of abstraction, from bare-metal C to high-level Python with ROS.
            </p>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-100 dark:border-slate-900">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-all ${
                activeTab === "overview"
                  ? "bg-indigo-600 dark:bg-indigo-500 text-white dark:text-slate-950 shadow-md shadow-indigo-500/10 dark:shadow-indigo-500/20 font-bold scale-105"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Info className="w-4 h-4" /> Overview
            </button>
            <button
              onClick={() => setActiveTab("laws")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-all ${
                activeTab === "laws"
                  ? "bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 shadow-md shadow-emerald-500/10 dark:shadow-emerald-500/20 font-bold scale-105"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Scale className="w-4 h-4" /> Laws & Ethics
            </button>
            <button
              onClick={() => setActiveTab("engineering")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-all ${
                activeTab === "engineering"
                  ? "bg-amber-600 dark:bg-amber-500 text-white dark:text-slate-950 shadow-md shadow-amber-500/10 dark:shadow-amber-500/20 font-bold scale-105"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Settings className="w-4 h-4" /> Engineering & Languages
            </button>
          </div>
        </header>

        {/* Dynamic Route/Tab Display Handler */}
        <AnimatePresence mode="wait">
          
          {/* TAB: OVERVIEW CONTAINER */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm space-y-3">
                <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <Bot className="w-4 h-4 text-indigo-500" />
                  What Is Robotics?
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Robotics is the science and technology of designing, constructing, operating, and applying robots—programmable machines capable of performing tasks in the physical world. Robots can be autonomous (acting independently) or teleoperated (controlled by humans), and they span from simple line-following bots to complex humanoid systems.
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  At its core, robotics follows a cycle:
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-semibold text-slate-900 dark:text-white">Sense</span>
                  <span>→</span>
                  <span className="font-semibold text-slate-900 dark:text-white">Think</span>
                  <span>→</span>
                  <span className="font-semibold text-slate-900 dark:text-white">Act</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm space-y-3">
                <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <Layers2 className="w-4 h-4 text-emerald-500" />
                  Types of Robots
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ROBOT_TYPES.map((r) => (
                    <div key={r.name} className="p-4 rounded-xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 space-y-1">
                      <h3 className="text-xs font-bold text-slate-950 dark:text-white">{r.name}</h3>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{r.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm space-y-3">
                <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-sky-500" />
                  Core Robot Components
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {CORE_COMPONENTS.map((c) => (
                    <div key={c.title} className="p-4 rounded-xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 space-y-1">
                      <h3 className="text-xs font-bold text-slate-950 dark:text-white">{c.title}</h3>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{c.desc}</p>
                      <p className="text-[10px] text-slate-500 italic">{c.examples}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB: LAWS & ETHICS CONTAINER */}
          {activeTab === "laws" && (
            <motion.div
              key="laws"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <p className="text-sm text-slate-500">
                Asimov's Laws of Robotics are a set of ethical rules that govern robot behavior in fiction and serve as a conceptual foundation for real-world discussions on robot ethics and safety.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                {ROBOTICS_LAWS.map((law) => {
                  const IconComponent = law.icon;
                  return (
                    <div
                      key={law.number}
                      className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-xl border ${law.accentClass}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <h3 className="text-sm font-bold text-slate-950 dark:text-white">
                          {law.number} Law
                        </h3>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed italic">
                        "{law.law}"
                      </p>
                      <p className="text-[11px] text-slate-500">{law.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm space-y-3">
                <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  Modern Robotics Ethics & Safety
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  In real-world robotics, ethical considerations extend beyond Asimov's laws to include:
                </p>
                <ul className="text-xs text-slate-400 list-disc pl-5 space-y-1">
                  <li>Safety: Ensuring robots do not harm humans in shared workspaces (e.g., cobots).</li>
                  <li>Autonomy: Deciding how much independent decision-making robots should have.</li>
                  <li>Transparency: Making robot behavior predictable and understandable to users.</li>
                  <li>Privacy: Protecting data collected by robots with cameras and positional trackers.</li>
                  <li>Accountability: Determining responsibility when an autonomous engine errors.</li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* TAB: ENGINEERING & LANGUAGES CONTAINER */}
          {activeTab === "engineering" && (
            <motion.div
              key="engineering"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm space-y-3">
                <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-indigo-500" />
                  Embedded Systems in Robotics
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Embedded systems are specialized computers designed to perform dedicated functions. In robotics, they are the "brains" that read sensors, run control algorithms, and command actuators in real time.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {EMBEDDED_SYSTEMS.map((e) => (
                    <div key={e.title} className="p-4 rounded-xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 space-y-1">
                      <h3 className="text-xs font-bold text-slate-950 dark:text-white">{e.title}</h3>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{e.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm space-y-3">
                <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <Code className="w-4 h-4 text-emerald-500" />
                  Robot Programming Languages by Abstraction Level
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Robotics uses programming languages at different levels of abstraction, from low-level hardware control to high-level AI and decision-making.
                </p>

                <div className="space-y-4">
                  {LANGUAGES_BY_ABSTRACTION.map((levelGroup) => {
                    const GroupIcon = levelGroup.icon;
                    return (
                      <div key={levelGroup.level} className="space-y-2">
                        <h3 className="text-xs font-bold text-slate-950 dark:text-white flex items-center gap-2">
                          <GroupIcon className={`w-4 h-4 ${levelGroup.colorClass}`} />
                          {levelGroup.level}
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {levelGroup.languages.map((lang) => (
                            <div key={lang.name} className="p-3 rounded-xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 space-y-1">
                              <h4 className="text-[11px] font-bold text-slate-950 dark:text-white">{lang.name}</h4>
                              <p className="text-[10px] text-slate-400 leading-relaxed">{lang.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm space-y-3">
                <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-indigo-500" />
                  ROS & Robotics Frameworks
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  ROS (Robot Operating System) and ROS 2 are middleware frameworks that provide hardware abstraction, device drivers, message-passing, and tools for building robot software. They allow developers to write "nodes" in C++ or Python that communicate with each other, regardless of the underlying hardware.
                </p>
                <ul className="text-xs text-slate-400 list-disc pl-5 space-y-1">
                  <li>ROS provides libraries and tools for perception, planning, control, and simulation.</li>
                  <li>ROS 2 improves real-time performance, scalability, and safety for production systems.</li>
                  <li>Specialized languages like URScript (Universal Robots), KRL (KUKA), and APT are used for industrial robot programming.</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Embedding Segment */}
        <div className="aspect-video max-w-4xl mx-auto rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl relative group bg-black">
          <iframe 
            className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-300" 
            src="https://www.youtube.com/embed/NlOcSPDFnk0" 
            title="What exactly is Robotics Engineering?" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          />
        </div>

        {/* Static Module Footer Summary Card */}
        <section className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-900 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950/50 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 p-6 text-slate-100 dark:text-slate-900 pointer-events-none">
            <Bot className="h-24 w-24 stroke-[3]" />
          </div>
          <div className="max-w-3xl relative z-10 space-y-2">
            <h3 className="text-sm font-bold tracking-wider font-mono uppercase text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
              <Layers2 className="w-4 h-4" />
              Robotics Summary
            </h3>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Robotics combines mechanical design, electronics, embedded systems, and software to create machines that sense, decide, and act. Robots are governed by ethical principles (Asimov's Three Laws and modern safety standards), implemented using programming languages from low-level C to high-level Python with ROS, and embedded in controllers that manage real-time perception and action.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}