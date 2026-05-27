// ============================================================================
// FACT MODULE SYSTEM
// Move this into: data/funFacts.ts
// Highly extensible + category scalable
// ============================================================================

import {
  Brain,
  Globe,
  Smartphone,
  Database,
  Code,
  Rocket,
  Lock,
  Cpu,
  Zap,
  Shield,
  Network,
  Activity,
  Box,
  Computer,
  Video,
  MessageSquare,
  Moon,
  History,
  Radio,
  Sparkles,
  Binary,
  Server,
  Cloud,
  Bot,
  Orbit,
  HardDrive,
  Monitor,
  Wifi,
  Search,
  Terminal,
  Fingerprint,
  Webcam,
  Gamepad2,
  Satellite,
  Bug,
  KeyRound,
  Microchip,
  AudioWaveform,
} from "lucide-react";

export const funFacts = [
  // =========================================================================
  // COMPUTING HISTORY
  // =========================================================================

  {
    id: 1,
    category: "Computers & History",
    icon: Computer,
    accent:
      "from-indigo-500/20 via-violet-500/10 to-sky-500/20",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1400&auto=format&fit=crop",
    fact:
      "The first electronic computer ENIAC weighed over 27 tons and consumed enormous amounts of electricity.",
    extra:
      "Modern smartphones outperform ENIAC while fitting in your pocket.",
  },

  {
    id: 2,
    category: "Computers & History",
    icon: History,
    accent:
      "from-slate-500/20 via-zinc-500/10 to-stone-500/20",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop",
    fact:
      "The first computer programmer was Ada Lovelace in the 1840s.",
    extra:
      "She wrote algorithms decades before modern computers existed.",
  },

  {
    id: 3,
    category: "Computers & History",
    icon: Box,
    accent:
      "from-orange-500/20 via-amber-500/10 to-yellow-500/20",
    image:
      "https://images.unsplash.com/photo-1558494949-ef2bb6db8744?q=80&w=1400&auto=format&fit=crop",
    fact:
      "The first hard drive by IBM stored only 5MB of data.",
    extra:
      "It weighed over one ton.",
  },

  {
    id: 4,
    category: "Computers & History",
    icon: Monitor,
    accent:
      "from-cyan-500/20 via-sky-500/10 to-blue-500/20",
    image:
      "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1400&auto=format&fit=crop",
    fact:
      "Early computer monitors displayed only green text.",
    extra:
      "Color displays became common years later.",
  },

  // =========================================================================
  // INTERNET
  // =========================================================================

  {
    id: 5,
    category: "Internet & Web",
    icon: Globe,
    accent:
      "from-sky-500/20 via-cyan-500/10 to-indigo-500/20",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1400&auto=format&fit=crop",
    fact:
      "The internet reached 50 million users faster than radio or television.",
    extra:
      "It became one of humanity's fastest adopted technologies.",
  },

  {
    id: 6,
    category: "Internet & Web",
    icon: Search,
    accent:
      "from-blue-500/20 via-indigo-500/10 to-violet-500/20",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop",
    fact:
      "Google processes billions of searches every single day.",
    extra:
      "Search engines operate at planetary scale.",
  },

  {
    id: 7,
    category: "Internet & Web",
    icon: Wifi,
    accent:
      "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
    image:
      "https://images.unsplash.com/photo-1520869562399-e772f042f422?q=80&w=1400&auto=format&fit=crop",
    fact:
      "Wi-Fi does not actually stand for Wireless Fidelity.",
    extra:
      "The name was created mainly for branding purposes.",
  },

  {
    id: 8,
    category: "Internet & Web",
    icon: Cloud,
    accent:
      "from-indigo-500/20 via-sky-500/10 to-cyan-500/20",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1400&auto=format&fit=crop",
    fact:
      "Cloud computing powers most major apps people use daily.",
    extra:
      "Many users rely on cloud systems without realizing it.",
  },

  // =========================================================================
  // PROGRAMMING
  // =========================================================================

  {
    id: 9,
    category: "Programming",
    icon: Code,
    accent:
      "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1400&auto=format&fit=crop",
    fact:
      "The term 'bug' came from a real moth found inside a computer.",
    extra:
      "Grace Hopper taped the moth into a logbook.",
  },

  {
    id: 10,
    category: "Programming",
    icon: Terminal,
    accent:
      "from-slate-500/20 via-zinc-500/10 to-black/20",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1400&auto=format&fit=crop",
    fact:
      "Some programmers prefer keyboard-only workflows.",
    extra:
      "Terminal-centric workflows can dramatically improve efficiency.",
  },

  {
    id: 11,
    category: "Programming",
    icon: Bug,
    accent:
      "from-red-500/20 via-rose-500/10 to-pink-500/20",
    image:
      "https://images.unsplash.com/photo-1516321310764-8d8f8f8c1f7c?q=80&w=1400&auto=format&fit=crop",
    fact:
      "Software can contain millions of lines of code.",
    extra:
      "Large enterprise systems are extraordinarily complex.",
  },

  {
    id: 12,
    category: "Programming",
    icon: Binary,
    accent:
      "from-slate-600/20 via-slate-500/10 to-slate-700/20",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1400&auto=format&fit=crop",
    fact:
      "All software eventually becomes binary instructions.",
    extra:
      "Computers fundamentally understand only electrical states.",
  },

  // =========================================================================
  // AI
  // =========================================================================

  {
    id: 13,
    category: "Artificial Intelligence",
    icon: Brain,
    accent:
      "from-fuchsia-500/20 via-violet-500/10 to-pink-500/20",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1400&auto=format&fit=crop",
    fact:
      "Artificial Intelligence became a formal research field in 1956.",
    extra:
      "AI is much older than most people assume.",
  },

  {
    id: 14,
    category: "Artificial Intelligence",
    icon: Bot,
    accent:
      "from-violet-500/20 via-purple-500/10 to-fuchsia-500/20",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1400&auto=format&fit=crop",
    fact:
      "Modern AI models train on massive GPU clusters.",
    extra:
      "Training large models can consume enormous energy resources.",
  },

  {
    id: 15,
    category: "Artificial Intelligence",
    icon: Cpu,
    accent:
      "from-indigo-500/20 via-violet-500/10 to-fuchsia-500/20",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop",
    fact:
      "Neural networks are inspired loosely by biological brains.",
    extra:
      "The math is simplified, but the inspiration came from neuroscience.",
  },

  // =========================================================================
  // CYBERSECURITY
  // =========================================================================

  {
    id: 16,
    category: "Cybersecurity",
    icon: Lock,
    accent:
      "from-red-500/20 via-orange-500/10 to-yellow-500/20",
    image:
      "https://images.unsplash.com/photo-1563206767-5b1d972b9fb1?q=80&w=1400&auto=format&fit=crop",
    fact:
      "Most cyberattacks target humans rather than machines.",
    extra:
      "Social engineering is often more effective than hacking code.",
  },

  {
    id: 17,
    category: "Cybersecurity",
    icon: Shield,
    accent:
      "from-blue-500/20 via-cyan-500/10 to-teal-500/20",
    image:
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=1400&auto=format&fit=crop",
    fact:
      "Weak passwords remain one of the biggest security risks.",
    extra:
      "Password reuse dramatically increases breach exposure.",
  },

  {
    id: 18,
    category: "Cybersecurity",
    icon: Fingerprint,
    accent:
      "from-indigo-500/20 via-blue-500/10 to-sky-500/20",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1400&auto=format&fit=crop",
    fact:
      "Biometric authentication is increasingly replacing passwords.",
    extra:
      "Fingerprints and face scans are now mainstream login systems.",
  },

  // =========================================================================
  // MOBILE & DEVICES
  // =========================================================================

  {
    id: 19,
    category: "Mobile Technology",
    icon: Smartphone,
    accent:
      "from-pink-500/20 via-rose-500/10 to-red-500/20",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1400&auto=format&fit=crop",
    fact:
      "Modern smartphones are more powerful than Apollo mission computers.",
    extra:
      "Your phone exceeds the processing power used to reach the moon.",
  },

  {
    id: 20,
    category: "Mobile Technology",
    icon: Activity,
    accent:
      "from-lime-500/20 via-green-500/10 to-emerald-500/20",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1400&auto=format&fit=crop",
    fact:
      "Phone sensors can track motion, orientation, light, and altitude.",
    extra:
      "Modern phones contain surprisingly advanced hardware stacks.",
  },

  {
    id: 21,
    category: "Mobile Technology",
    icon: Webcam,
    accent:
      "from-cyan-500/20 via-blue-500/10 to-indigo-500/20",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop",
    fact:
      "Phone cameras use computational photography techniques.",
    extra:
      "AI processing improves photos before you even see them.",
  },

  // =========================================================================
  // SPACE & SCIENCE
  // =========================================================================

  {
    id: 22,
    category: "Space & Technology",
    icon: Rocket,
    accent:
      "from-violet-500/20 via-indigo-500/10 to-blue-500/20",
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1400&auto=format&fit=crop",
    fact:
      "Spacecraft computers prioritize reliability over raw speed.",
    extra:
      "Radiation-resistant hardware is critical in space missions.",
  },

  {
    id: 23,
    category: "Space & Technology",
    icon: Satellite,
    accent:
      "from-sky-500/20 via-indigo-500/10 to-violet-500/20",
    image:
      "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?q=80&w=1400&auto=format&fit=crop",
    fact:
      "GPS works through synchronized satellite atomic clocks.",
    extra:
      "Even tiny timing errors would break navigation accuracy.",
  },

  // =========================================================================
  // GAMING
  // =========================================================================

  {
    id: 24,
    category: "Gaming & Graphics",
    icon: Gamepad2,
    accent:
      "from-fuchsia-500/20 via-pink-500/10 to-rose-500/20",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1400&auto=format&fit=crop",
    fact:
      "Modern game engines render millions of polygons every second.",
    extra:
      "Real-time graphics are among the most demanding computing tasks.",
  },

  {
    id: 25,
    category: "Gaming & Graphics",
    icon: Video,
    accent:
      "from-red-500/20 via-pink-500/10 to-fuchsia-500/20",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1400&auto=format&fit=crop",
    fact:
      "Competitive gaming monitors can refresh over 360 times per second.",
    extra:
      "Higher refresh rates improve motion clarity and responsiveness.",
  },

  // =========================================================================
  // NETWORKING
  // =========================================================================

  {
    id: 26,
    category: "Networking",
    icon: Network,
    accent:
      "from-teal-500/20 via-cyan-500/10 to-blue-500/20",
    image:
      "https://images.unsplash.com/photo-1558494949-ef2bb6db8744?q=80&w=1400&auto=format&fit=crop",
    fact:
      "The internet is built from countless interconnected networks.",
    extra:
      "No single company owns the entire internet.",
  },

  {
    id: 27,
    category: "Networking",
    icon: Server,
    accent:
      "from-slate-500/20 via-zinc-500/10 to-indigo-500/20",
    image:
      "https://images.unsplash.com/photo-1558494949-ef2bb6db8744?q=80&w=1400&auto=format&fit=crop",
    fact:
      "Massive data centers power modern streaming and cloud platforms.",
    extra:
      "Some facilities contain hundreds of thousands of servers.",
  },

  // =========================================================================
  // RANDOM COOL TECH
  // =========================================================================

  {
    id: 28,
    category: "Cool Tech",
    icon: Moon,
    accent:
      "from-slate-500/20 via-indigo-500/10 to-violet-500/20",
    image:
      "https://images.unsplash.com/photo-1539721972319-f0e80a00d424?q=80&w=1400&auto=format&fit=crop",
    fact:
      "A smartphone contains more transistors than early supercomputers.",
    extra:
      "Miniaturization changed everything.",
  },

  {
    id: 29,
    category: "Cool Tech",
    icon: AudioWaveform,
    accent:
      "from-emerald-500/20 via-lime-500/10 to-green-500/20",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1400&auto=format&fit=crop",
    fact:
      "Digital audio converts sound waves into numerical samples.",
    extra:
      "Music streaming depends entirely on signal processing.",
  },

  {
    id: 30,
    category: "Cool Tech",
    icon: Microchip,
    accent:
      "from-indigo-500/20 via-blue-500/10 to-cyan-500/20",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop",
    fact:
      "Modern CPUs contain billions of microscopic transistors.",
    extra:
      "Transistors are measured in nanometers.",
  },
];