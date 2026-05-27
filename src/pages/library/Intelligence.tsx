import React, { useState } from "react";
import {
  Brain,
  Cpu,
  Zap,
  Layers2,
  Activity,
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
  MessageCircle,
  Eye,
  Mic,
  Smartphone,
  Home,
  Network,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function IntelligenceTopic() {
  const [activeTab, setActiveTab] = useState<"overview" | "smart-vs-intelligent" | "ann">("overview");

  const aiTypes = [
    {
      name: "Artificial Narrow Intelligence (ANI)",
      short: "Weak AI",
      desc: "AI designed to perform a specific task or solve a particular problem, often faster and better than humans. Examples: voice assistants, image classifiers, recommendation systems, chess engines.",
    },
    {
      name: "Artificial General Intelligence (AGI)",
      short: "Strong AI",
      desc: "Theoretical AI that can understand, learn, and apply knowledge across a broad range of tasks, similar to human cognitive abilities. Not yet achieved.",
    },
    {
      name: "Artificial Superintelligence (ASI)",
      short: "Super AI",
      desc: "Hypothetical AI that surpasses human intelligence in all aspects: academically, creatively, emotionally, and socially. Purely theoretical at this point.",
    },
  ];

  const smartDevices = [
    {
      name: "Smartphone",
      desc: "Connected device with apps, sensors, and internet access; responds to commands but doesn't inherently learn user preferences.",
    },
    {
      name: "Smart Speaker (e.g., Alexa)",
      desc: "Voice-activated device that follows commands and connects to other smart home devices; limited learning of user habits.",
    },
    {
      name: "Smart Thermostat (basic)",
      desc: "Remotely controllable thermostat; can be scheduled but may not adapt to user behavior without explicit programming.",
    },
    {
      name: "Smart TV",
      desc: "Internet-connected TV with streaming apps; responsive to commands but doesn't proactively suggest content based on deep learning.",
    },
    {
      name: "Smart Lock",
      desc: "Remote-access door lock controllable via app; responds to commands but doesn't learn user patterns autonomously.",
    },
    {
      name: "Smart Watch (basic)",
      desc: "Tracks fitness and notifications; displays data but doesn't deeply adapt to user behavior or make complex recommendations.",
    },
  ];

  const intelligentDevices = [
    {
      name: "Intelligent Thermostat (e.g., Nest)",
      desc: "Learns your schedule and preferences, automatically adjusts temperature, and provides energy-saving recommendations.",
    },
    {
      name: "Intelligent Fridge",
      desc: "Tracks inventory, monitors expiration dates, automatically orders groceries when low, suggests recipes based on contents and preferences.",
    },
    {
      name: "Self-Driving Car",
      desc: "Perceives environment, makes real-time driving decisions, learns from millions of miles of data, adapts to new road conditions.",
    },
    {
      name: "Intelligent Virtual Assistant (Advanced)",
      desc: "Understands context, learns preferences over time, proactively suggests actions, manages schedules, and makes decisions on your behalf.",
    },
    {
      name: "Robot Vacuum with AI",
      desc: "Maps your home, learns traffic patterns, avoids obstacles intelligently, and optimizes cleaning schedules automatically.",
    },
    {
      name: "Health Monitoring System",
      desc: "Analyzes health data, detects anomalies, predicts potential issues, and provides personalized health recommendations.",
    },
  ];

  const differences = [
    {
      category: "Connectivity",
      smart: "Must be connected or have ability to connect to networks/devices.",
      intelligent: "Already connected and smart; connectivity is foundational.",
    },
    {
      category: "Data Capture",
      smart: "Captures useful data and produces some insight.",
      intelligent: "Captures data and produces deeper insights with context.",
    },
    {
      category: "Learning",
      smart: "Limited or no learning; follows predefined rules or simple automation.",
      intelligent: "Learns user preferences and adapts behavior over time.",
    },
    {
      category: "Decision-Making",
      smart: "Responds to commands or triggers; reactive behavior.",
      intelligent: "Makes autonomous decisions, provides recommendations, augments choices.",
    },
    {
      category: "Proactivity",
      smart: "Typically waits for user input or predefined triggers.",
      intelligent: "Proactively anticipates needs and acts without explicit commands.",
    },
    {
      category: "Examples",
      smart: "Smartphone, basic smart speaker, smart lock.",
      intelligent: "Self-driving car, intelligent fridge, advanced AI assistant.",
    },
  ];

  const annLayers = [
    {
      name: "Input Layer",
      desc: "Receives raw input signals from the external world (e.g., pixels, audio samples, sensor readings). Analogous to optic nerves in human visual processing.",
    },
    {
      name: "Hidden Layers",
      desc: "Intermediate layers that process and transform inputs through weighted connections and activation functions. Multiple hidden layers enable deep learning.",
    },
    {
      name: "Output Layer",
      desc: "Produces the final output (e.g., classification label, prediction value). The last tier of the network.",
    },
  ];

  const humanInteractions = [
    {
      mode: "Voice Interaction",
      icon: Mic,
      desc: "Users interact with AI through natural language (e.g., Siri, Alexa). ANNs enable speech recognition and natural language understanding.",
    },
    {
      mode: "Visual Recognition",
      icon: Eye,
      desc: "AI interprets images and video (e.g., facial recognition, object detection). CNNs (Convolutional Neural Networks) excel at this.",
    },
    {
      mode: "Text & Chat",
      icon: MessageCircle,
      desc: "AI understands and generates human text (e.g., ChatGPT, chatbots). Transformers and RNNs power language models.",
    },
    {
      mode: "Touch & Gesture",
      icon: Smartphone,
      desc: "AI interprets touch inputs, gestures, and body language for more natural interaction.",
    },
    {
      mode: "Personalization",
      icon: UserCheck,
      desc: "AI learns preferences and adapts content, recommendations, and behavior to individual users.",
    },
    {
      mode: "Haptic & Physical",
      icon: Heart,
      desc: "Robots and intelligent devices provide physical feedback and interact through touch and movement.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans p-4 md:p-8 selection:bg-indigo-500/20 overflow-x-hidden antialiased transition-colors duration-300">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-500/[0.015] dark:bg-indigo-500/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/[0.015] dark:bg-sky-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="border border-slate-200 dark:border-slate-900 rounded-3xl p-6 md:p-8 bg-white/60 dark:bg-slate-900/20 backdrop-blur-md shadow-sm dark:shadow-none relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-[0.03] dark:opacity-10">
            <Brain className="w-24 h-24 text-slate-900 dark:text-slate-400" />
          </div>

          <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400 font-mono text-xs tracking-widest uppercase mb-3">
            <Cpu className="w-4 h-4" />
            Artificial Intelligence
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400">
            Intelligence: AI, Smart Devices & Intelligent Systems
          </h1>

          <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
            <p>
              Artificial Intelligence (AI) is the field of creating machines and software that can perform tasks requiring human-like intelligence: learning, reasoning, perception, and decision-making.
            </p>
            <p>
              A <strong>smart device</strong> is connected, context-aware, and can respond to commands, while an <strong>intelligent device</strong> goes further: it learns, adapts, makes autonomous decisions, and proactively enhances user experience. Artificial Neural Networks (ANNs) are the mathematical models that power much of modern AI, enabling systems to learn patterns from data and interact more naturally with humans.
            </p>
          </div>

          {/* Tabs */}
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
              onClick={() => setActiveTab("smart-vs-intelligent")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-all ${
                activeTab === "smart-vs-intelligent"
                  ? "bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 shadow-md shadow-emerald-500/10 dark:shadow-emerald-500/20 font-bold scale-105"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Scale className="w-4 h-4" /> Smart vs Intelligent
            </button>
            <button
              onClick={() => setActiveTab("ann")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-all ${
                activeTab === "ann"
                  ? "bg-amber-600 dark:bg-amber-500 text-white dark:text-slate-950 shadow-md shadow-amber-500/10 dark:shadow-amber-500/20 font-bold scale-105"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Brain className="w-4 h-4" /> Neural Networks & HCI
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* What is AI */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm space-y-3">
                <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <Brain className="w-4 h-4 text-indigo-500" />
                  What Is Artificial Intelligence (AI)?
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong>AI</strong> is the science and engineering of making machines that can perform tasks requiring intelligence when done by humans. These tasks include learning from experience, recognizing patterns, understanding language, solving problems, making decisions, and perceiving the environment.
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Modern AI relies heavily on <strong>machine learning</strong> (algorithms that improve through data) and <strong>deep learning</strong> (neural networks with many layers). AI systems are used in voice assistants, recommendation engines, autonomous vehicles, medical diagnosis, fraud detection, and much more.
                </p>
              </div>

              {/* Types of AI */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm space-y-3">
                <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <Layers2 className="w-4 h-4 text-emerald-500" />
                  Types of Artificial Intelligence
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {aiTypes.map((ai) => (
                    <div key={ai.name} className="p-4 rounded-xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 space-y-1">
                      <h3 className="text-xs font-bold text-slate-950 dark:text-white">{ai.name}</h3>
                      <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 tracking-wider block">
                        {ai.short}
                      </span>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{ai.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What is a smart device */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm space-y-3">
                <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-sky-500" />
                  What Is a Smart Device?
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  A <strong>smart device</strong> is an electronic device that is:
                </p>
                <ul className="text-xs text-slate-400 list-disc pl-5 space-y-1">
                  <li><strong>Connected</strong> to networks or other devices (Wi‑Fi, Bluetooth, cellular).</li>
                  <li><strong>Context-aware</strong>: it can sense its environment and react.</li>
                  <li><strong>Autonomous</strong> to some degree: it can execute tasks without constant human intervention.</li>
                  <li><strong>Data-capturing</strong>: it collects useful data and produces some insight.</li>
                </ul>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Examples: smartphones, smart speakers, smart TVs, smart locks, basic smart thermostats, smartwatches.
                </p>
              </div>

              {/* What is an intelligent device */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm space-y-3">
                <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-500" />
                  What Is an Intelligent Device?
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  An <strong>intelligent device</strong> is already <strong>connected and smart</strong>, but goes further:
                </p>
                <ul className="text-xs text-slate-400 list-disc pl-5 space-y-1">
                  <li>It <strong>learns</strong> user preferences and adapts behavior over time.</li>
                  <li>It <strong>produces deeper insights</strong> and provides recommendations.</li>
                  <li>It <strong>augments decisions</strong> by suggesting actions or acting autonomously.</li>
                  <li>It is <strong>proactive</strong>, anticipating needs rather than just reacting to commands.</li>
                </ul>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Example: An intelligent fridge tracks inventory, monitors expiration dates, automatically orders groceries, and suggests recipes based on your preferences and what's in stock.
                </p>
              </div>
            </motion.div>
          )}

          {/* TAB 2: SMART VS INTELLIGENT */}
          {activeTab === "smart-vs-intelligent" && (
            <motion.div
              key="smart-vs-intelligent"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <p className="text-sm text-slate-500">
                Smart and intelligent devices are not the same. What differentiates them is <strong>what actions are taken with data after capture</strong>. Intelligent devices go beyond data capture and insight to learning, recommendation, and autonomous decision-making.
              </p>

              {/* Differences table */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm space-y-3">
                <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <Scale className="w-4 h-4 text-indigo-500" />
                  Smart vs Intelligent: Key Differences
                </h2>
                <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-900">
                  <table className="w-full text-left text-xs bg-white dark:bg-slate-900">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-semibold border-b border-slate-200 dark:border-slate-900">
                        <th className="p-3">Category</th>
                        <th className="p-3 text-indigo-600 dark:text-indigo-400">Smart Device</th>
                        <th className="p-3 text-emerald-600 dark:text-emerald-400">Intelligent Device</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-900 text-slate-600 dark:text-slate-400">
                      {differences.map((d) => (
                        <tr key={d.category} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                          <td className="p-3 font-bold text-slate-900 dark:text-white">{d.category}</td>
                          <td className="p-3">{d.smart}</td>
                          <td className="p-3">{d.intelligent}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Smart devices examples */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm space-y-3">
                <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-indigo-500" />
                  Examples of Smart Devices
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {smartDevices.map((d) => (
                    <div key={d.name} className="p-4 rounded-xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 space-y-1">
                      <h3 className="text-xs font-bold text-slate-950 dark:text-white">{d.name}</h3>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{d.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Intelligent devices examples */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm space-y-3">
                <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-500" />
                  Examples of Intelligent Devices
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {intelligentDevices.map((d) => (
                    <div key={d.name} className="p-4 rounded-xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 space-y-1">
                      <h3 className="text-xs font-bold text-slate-950 dark:text-white">{d.name}</h3>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{d.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Superiority of intelligent devices */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm space-y-3">
                <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  Superiority of Intelligent Devices
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Intelligent devices are superior to smart devices because they:
                </p>
                <ul className="text-xs text-slate-400 list-disc pl-5 space-y-1">
                  <li><strong>Learn and adapt</strong> to user behavior, improving over time.</li>
                  <li><strong>Make autonomous decisions</strong> rather than just following commands.</li>
                  <li><strong>Proactively anticipate needs</strong> and act before being asked.</li>
                  <li><strong>Provide personalized recommendations</strong> based on deep understanding of context and preferences.</li>
                  <li><strong>Augment human decision-making</strong> by suggesting optimal actions and automation.</li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* TAB 3: ANN & HCI */}
          {activeTab === "ann" && (
            <motion.div
              key="ann"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* What is ANN */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm space-y-3">
                <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <Brain className="w-4 h-4 text-indigo-500" />
                  What Is an Artificial Neural Network (ANN)?
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  An <strong>Artificial Neural Network (ANN)</strong> is a computing model inspired by the structure and functioning of the human brain. It consists of interconnected nodes (artificial neurons) organized in layers that process information and learn patterns from data.
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  During training, the network adjusts <strong>connection weights</strong> between neurons to minimize the difference between desired output and actual output, using optimization algorithms like <strong>gradient descent</strong>.
                </p>
              </div>

              {/* ANN layers */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm space-y-3">
                <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <Layers2 className="w-4 h-4 text-emerald-500" />
                  Structure of an ANN
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {annLayers.map((layer) => (
                    <div key={layer.name} className="p-4 rounded-xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 space-y-1">
                      <h3 className="text-xs font-bold text-slate-950 dark:text-white">{layer.name}</h3>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{layer.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* How ANN works */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm space-y-3">
                <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-sky-500" />
                  How ANNs Enable AI & Intelligent Devices
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  ANNs are the mathematical foundation for much of modern AI:
                </p>
                <ul className="text-xs text-slate-400 list-disc pl-5 space-y-1">
                  <li><strong>Pattern recognition:</strong> ANNs learn to recognize patterns in images, audio, text, and sensor data.</li>
                  <li><strong>Prediction:</strong> They predict future outcomes based on historical data (e.g., weather, stock prices, user behavior).</li>
                  <li><strong>Classification:</strong> They categorize data (e.g., spam vs. not spam, cat vs. dog in images).</li>
                  <li><strong>Decision-making:</strong> Deep neural networks enable autonomous systems to make complex decisions (e.g., self-driving cars).</li>
                  <li><strong>Personalization:</strong> ANNs learn user preferences and adapt recommendations over time.</li>
                </ul>
              </div>

              {/* Human-computer interaction */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm space-y-3">
                <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-500" />
                  How AI & Intelligent Devices Interact with Humans
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  AI and intelligent devices interact with humans through multiple modalities, making technology more natural, intuitive, and personalized.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {humanInteractions.map((mode) => {
                    const Icon = mode.icon;
                    return (
                      <div key={mode.mode} className="p-4 rounded-xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 text-indigo-600">
                            <Icon className="w-4 h-4" />
                          </div>
                          <h3 className="text-xs font-bold text-slate-950 dark:text-white">{mode.mode}</h3>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{mode.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI ethics & concerns */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm space-y-3">
                <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  AI Ethics & Concerns
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  As AI and intelligent devices become more powerful, ethical concerns arise:
                </p>
                <ul className="text-xs text-slate-400 list-disc pl-5 space-y-1">
                  <li><strong>Privacy:</strong> Intelligent devices collect vast amounts of personal data.</li>
                  <li><strong>Bias:</strong> ANNs can learn and amplify biases in training data.</li>
                  <li><strong>Transparency:</strong> Many AI models are "black boxes" with unclear decision logic.</li>
                  <li><strong>Accountability:</strong> Who is responsible when AI makes harmful decisions?</li>
                  <li><strong>Security:</strong> AI systems can be vulnerable to adversarial attacks and manipulation.</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="aspect-video max-w-4xl mx-auto rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl relative group bg-black">
            <iframe className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-300" src="https://www.youtube.com/embed/JcXKbUIebrU" title="What Is AI? | Learn all about artificial intelligence" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>

        {/* Summary banner */}
        <section className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-900 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950/50 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 p-6 text-slate-100 dark:text-slate-900 pointer-events-none">
            <Brain className="h-24 w-24 stroke-[3]" />
          </div>
          <div className="max-w-3xl relative z-10 space-y-2">
            <h3 className="text-sm font-bold tracking-wider font-mono uppercase text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
              <Layers2 className="w-4 h-4" />
              Intelligence Summary
            </h3>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              AI is the field of creating machines that can learn, reason, perceive, and decide. Smart devices are connected and context-aware, while intelligent devices go further by learning, adapting, and making autonomous decisions. Artificial Neural Networks power modern AI, enabling systems to recognize patterns, make predictions, and interact with humans through voice, vision, text, and personalization.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}