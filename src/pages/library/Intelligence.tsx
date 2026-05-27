import React, { useState } from "react";
import {
  Brain,
  Cpu,
  Zap,
  Layers2,
  UserCheck,
  Info,
  Scale,
  AlertTriangle,
  Heart,
  Mic,
  Smartphone,
  Eye,
  MessageCircle,
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
    { name: "Smartphone", desc: "Connected device with apps, sensors, and internet access; responds to commands but doesn't inherently learn user preferences." },
    { name: "Smart Speaker (Alexa)", desc: "Voice-activated device that follows commands and connects to other smart home devices; limited learning of user habits." },
    { name: "Smart Thermostat (basic)", desc: "Remotely controllable thermostat; can be scheduled but may not adapt to user behavior without explicit programming." },
    { name: "Smart TV", desc: "Internet-connected TV with streaming apps; responsive to commands but doesn't proactively suggest content based on deep learning." },
    { name: "Smart Lock", desc: "Remote-access door lock controllable via app; responds to commands but doesn't learn user patterns autonomously." },
    { name: "Smart Watch (basic)", desc: "Tracks fitness and notifications; displays data but doesn't deeply adapt to user behavior or make complex recommendations." },
  ];

  const intelligentDevices = [
    { name: "Intelligent Thermostat (Nest)", desc: "Learns your schedule and preferences, automatically adjusts temperature, and provides energy-saving recommendations." },
    { name: "Intelligent Fridge", desc: "Tracks inventory, monitors expiration dates, automatically orders groceries when low, suggests recipes based on contents and preferences." },
    { name: "Self-Driving Car", desc: "Perceives environment, makes real-time driving decisions, learns from millions of miles of data, adapts to new road conditions." },
    { name: "Advanced AI Assistant", desc: "Understands context, learns preferences over time, proactively suggests actions, manages schedules, and makes decisions on your behalf." },
    { name: "Robot Vacuum with AI", desc: "Maps your home, learns traffic patterns, avoids obstacles intelligently, and optimizes cleaning schedules automatically." },
    { name: "Health Monitoring System", desc: "Analyzes health data, detects anomalies, predicts potential issues, and provides personalized health recommendations." },
  ];

  const differences = [
    { category: "Connectivity", smart: "Must be connected or have ability to connect", intelligent: "Already connected and smart; connectivity is foundational" },
    { category: "Data Capture", smart: "Captures useful data and produces some insight", intelligent: "Captures data and produces deeper insights with context" },
    { category: "Learning", smart: "Limited or no learning; follows predefined rules", intelligent: "Learns user preferences and adapts behavior over time" },
    { category: "Decision-Making", smart: "Responds to commands; reactive behavior", intelligent: "Makes autonomous decisions, provides recommendations" },
    { category: "Proactivity", smart: "Typically waits for user input", intelligent: "Proactively anticipates needs and acts without explicit commands" },
    { category: "Examples", smart: "Smartphone, basic smart speaker, smart lock", intelligent: "Self-driving car, intelligent fridge, advanced AI assistant" },
  ];

  const annLayers = [
    { name: "Input Layer", desc: "Receives raw input signals from the external world (pixels, audio samples, sensor readings)." },
    { name: "Hidden Layers", desc: "Intermediate layers that process and transform inputs through weighted connections and activation functions." },
    { name: "Output Layer", desc: "Produces the final output (classification label, prediction value). The last tier of the network." },
  ];

  const humanInteractions = [
    { mode: "Voice Interaction", icon: Mic, desc: "Users interact with AI through natural language (Siri, Alexa). ANNs enable speech recognition and NLU." },
    { mode: "Visual Recognition", icon: Eye, desc: "AI interprets images/video (facial recognition, object detection). CNNs excel at this." },
    { mode: "Text & Chat", icon: MessageCircle, desc: "AI understands and generates human text (ChatGPT, chatbots). Transformers power language models." },
    { mode: "Touch & Gesture", icon: Smartphone, desc: "AI interprets touch inputs, gestures, and body language for more natural interaction." },
    { mode: "Personalization", icon: UserCheck, desc: "AI learns preferences and adapts content, recommendations, and behavior to individual users." },
    { mode: "Haptic & Physical", icon: Heart, desc: "Robots and intelligent devices provide physical feedback and interact through touch and movement." },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 space-y-8 antialiased selection:bg-indigo-500/10 text-slate-600 dark:text-slate-300">
      
      {/* Header */}
      <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400 font-mono text-xs tracking-widest uppercase">
          <Cpu className="w-4 h-4" />
          Artificial Intelligence
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight sm:text-4xl">
          Intelligence: AI, Smart & Intelligent Devices
        </h1>
        <p className="text-sm text-slate-400 dark:text-slate-500 max-w-2xl leading-relaxed">
          AI creates machines that learn, reason, and decide. Smart devices are connected and responsive; intelligent devices learn, adapt, and act proactively. Artificial Neural Networks power modern AI.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 pt-4">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-all ${
              activeTab === "overview"
                ? "bg-indigo-600 dark:bg-indigo-500 text-white shadow-md shadow-indigo-500/20 font-bold"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <Info className="w-4 h-4" /> Overview
          </button>
          <button
            onClick={() => setActiveTab("smart-vs-intelligent")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-all ${
              activeTab === "smart-vs-intelligent"
                ? "bg-emerald-600 dark:bg-emerald-500 text-white shadow-md shadow-emerald-500/20 font-bold"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <Scale className="w-4 h-4" /> Smart vs Intelligent
          </button>
          <button
            onClick={() => setActiveTab("ann")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-all ${
              activeTab === "ann"
                ? "bg-amber-600 dark:bg-amber-500 text-white shadow-md shadow-amber-500/20 font-bold"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <Brain className="w-4 h-4" /> Neural Networks
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2 mb-3">
                <Brain className="w-4 h-4 text-indigo-500" />
                What Is Artificial Intelligence?
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                <strong>AI</strong> is the science of making machines that can perform tasks requiring intelligence when done by humans: learning, reasoning, recognizing patterns, understanding language, solving problems, making decisions, and perceiving the environment.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Modern AI relies heavily on <strong>machine learning</strong> (algorithms that improve through data) and <strong>deep learning</strong> (neural networks with many layers).
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2 mb-4">
                <Layers2 className="w-4 h-4 text-emerald-500" />
                Types of AI
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {aiTypes.map((ai) => (
                  <div key={ai.name} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30">
                    <h3 className="text-xs font-bold text-slate-950 dark:text-white mb-1">{ai.name}</h3>
                    <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 tracking-wider block mb-2">
                      {ai.short}
                    </span>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{ai.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2 mb-3">
                <Smartphone className="w-4 h-4 text-sky-500" />
                What Is a Smart Device?
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                A <strong>smart device</strong> is:
              </p>
              <ul className="text-xs text-slate-400 list-disc pl-5 space-y-1 mb-3">
                <li><strong>Connected</strong> to networks or other devices</li>
                <li><strong>Context-aware</strong>: senses environment and reacts</li>
                <li><strong>Autonomous</strong> to some degree</li>
                <li><strong>Data-capturing</strong>: collects data, produces insight</li>
              </ul>
              <p className="text-xs text-slate-400 leading-relaxed">Examples: smartphones, smart speakers, smart TVs, smart locks, basic thermostats, smartwatches.</p>
            </div>

            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2 mb-3">
                <Cpu className="w-4 h-4 text-emerald-500" />
                What Is an Intelligent Device?
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                An <strong>intelligent device</strong> is already connected and smart, but goes further:
              </p>
              <ul className="text-xs text-slate-400 list-disc pl-5 space-y-1 mb-3">
                <li><strong>Learns</strong> preferences and adapts over time</li>
                <li><strong>Produces deeper insights</strong> and recommendations</li>
                <li><strong>Augments decisions</strong> by suggesting or acting autonomously</li>
                <li><strong>Proactive</strong>: anticipates needs instead of just reacting</li>
              </ul>
              <p className="text-xs text-slate-400 leading-relaxed">Example: Intelligent fridge tracks inventory, orders groceries, suggests recipes.</p>
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
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <p className="text-sm text-slate-500">
              Smart and intelligent devices differ in <strong>what actions are taken with data after capture</strong>. Intelligent devices learn, recommend, and make autonomous decisions.
            </p>

            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2 mb-4">
                <Scale className="w-4 h-4 text-indigo-500" />
                Smart vs Intelligent: Key Differences
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
                      <th className="px-4 py-3 font-bold text-slate-900 dark:text-white">Category</th>
                      <th className="px-4 py-3 font-bold text-indigo-600 dark:text-indigo-400">Smart</th>
                      <th className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">Intelligent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {differences.map((d) => (
                      <tr key={d.category} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                        <td className="px-4 py-2.5 font-bold text-slate-900 dark:text-white">{d.category}</td>
                        <td className="px-4 py-2.5">{d.smart}</td>
                        <td className="px-4 py-2.5">{d.intelligent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2 mb-4">
                <Smartphone className="w-4 h-4 text-indigo-500" />
                Smart Devices
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {smartDevices.map((d) => (
                  <div key={d.name} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/20">
                    <h3 className="text-xs font-bold text-slate-950 dark:text-white mb-1">{d.name}</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{d.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2 mb-4">
                <Cpu className="w-4 h-4 text-emerald-500" />
                Intelligent Devices
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {intelligentDevices.map((d) => (
                  <div key={d.name} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/20">
                    <h3 className="text-xs font-bold text-slate-950 dark:text-white mb-1">{d.name}</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{d.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-amber-500" />
                Why Intelligent Devices Are Superior
              </h2>
              <ul className="text-xs text-slate-400 list-disc pl-5 space-y-1">
                <li><strong>Learn and adapt</strong> to user behavior</li>
                <li><strong>Make autonomous decisions</strong></li>
                <li><strong>Proactively anticipate needs</strong></li>
                <li><strong>Provide personalized recommendations</strong></li>
                <li><strong>Augment human decision-making</strong></li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* TAB 3: ANN */}
        {activeTab === "ann" && (
          <motion.div
            key="ann"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2 mb-3">
                <Brain className="w-4 h-4 text-indigo-500" />
                What Is an Artificial Neural Network?
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                An <strong>ANN</strong> is a computing model inspired by the human brain. It consists of interconnected nodes (artificial neurons) organized in layers that process information and learn patterns from data.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                During training, the network adjusts <strong>connection weights</strong> to minimize error using optimization like <strong>gradient descent</strong>.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2 mb-4">
                <Layers2 className="w-4 h-4 text-emerald-500" />
                ANN Structure
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {annLayers.map((layer) => (
                  <div key={layer.name} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/20">
                    <h3 className="text-xs font-bold text-slate-950 dark:text-white mb-1">{layer.name}</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{layer.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2 mb-3">
                <Cpu className="w-4 h-4 text-sky-500" />
                How ANNs Enable AI
              </h2>
              <ul className="text-xs text-slate-400 list-disc pl-5 space-y-1">
                <li><strong>Pattern recognition:</strong> images, audio, text, sensor data</li>
                <li><strong>Prediction:</strong> future outcomes from historical data</li>
                <li><strong>Classification:</strong> spam vs not spam, cat vs dog</li>
                <li><strong>Decision-making:</strong> autonomous systems (self-driving cars)</li>
                <li><strong>Personalization:</strong> learn preferences, adapt recommendations</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2 mb-4">
                <UserCheck className="w-4 h-4 text-emerald-500" />
                Human-AI Interaction Modes
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {humanInteractions.map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <div key={mode.mode} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/20">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-indigo-600">
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

            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                AI Ethics & Concerns
              </h2>
              <ul className="text-xs text-slate-400 list-disc pl-5 space-y-1">
                <li><strong>Privacy:</strong> vast personal data collection</li>
                <li><strong>Bias:</strong> ANNs can learn and amplify biases</li>
                <li><strong>Transparency:</strong> many models are black boxes</li>
                <li><strong>Accountability:</strong> who's responsible for AI decisions?</li>
                <li><strong>Security:</strong> vulnerability to adversarial attacks</li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* YouTube Video */}
      <div className="aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg bg-black">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/JcXKbUIebrU"
          title="What Is AI?"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      {/* Summary */}
      <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950/50 p-6 shadow-sm">
        <h3 className="text-xs font-bold tracking-wider font-mono uppercase text-indigo-600 dark:text-indigo-400 flex items-center gap-2 mb-2">
          <Layers2 className="w-4 h-4" />
          Summary
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          AI creates machines that learn, reason, perceive, and decide. Smart devices are connected and context-aware; intelligent devices learn, adapt, and make autonomous decisions. ANNs power modern AI, enabling pattern recognition, predictions, and natural human interaction.
        </p>
      </div>
    </div>
  );
}