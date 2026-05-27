import React, { useState, useEffect } from "react";
import {
  Computer,
  Brain,
  Network,
  Cpu,
  Zap,
  Globe,
  Smartphone,
  Database,
  Code,
  Rocket,
  History,
  Moon,
  Box,
  MessageSquare,
  Video,
  Lock,
  Shield,
  Activity,
  Info,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// ============================================================================
// LOOPABLE FACTS ARRAY (OOP-friendly, easy to extend)
// ============================================================================
const funFacts = [
  {
    id: 1,
    category: "Computers & History",
    icon: Computer,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
    fact: "The first electronic computer ENIAC weighed more than 27 tons and took up 1,800 square feet of floor space.",
    extra: "That's roughly the size of a large bedroom!",
  },
  {
    id: 2,
    category: "Internet & Adoption",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
    fact: "The internet reached 50 million users in just 4 years. The radio took 38 years, and television took 13 years.",
    extra: "Internet adoption was 9.5× faster than radio!",
  },
  {
    id: 3,
    category: "Programming & Debugging",
    icon: Code,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
    fact: "The term 'bug' for a computer error came from a real moth found inside a computer in 1947. Admiral Grace Hopper removed it and taped it in her logbook.",
    extra: "This is where 'debugging' got its name!",
  },
  {
    id: 4,
    category: "Smartphones & Space",
    icon: Smartphone,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
    fact: "The computing power in today's cell phones is much higher than the processing power of all computers in the Apollo 11 Lunar Lander that put humans on the moon.",
    extra: "Your phone is more powerful than the mission that landed on the moon!",
  },
  {
    id: 5,
    category: "Storage Evolution",
    icon: Database,
    image: "https://images.unsplash.com/photo-1558494949-ef2bb6db8744?q=80&w=600&auto=format&fit=crop",
    fact: "Early hard disks in personal computers held only 20 MB and cost around $800. In 2010, you could get a 2 GB flash drive for about $8.",
    extra: "That's a 100-fold reduction in price and 100-fold increase in capacity!",
  },
  {
    id: 6,
    category: "First Hard Drive",
    icon: Box,
    image: "https://images.unsplash.com/photo-1558494949-ef2bb6db8744?q=80&w=600&auto=format&fit=crop",
    fact: "The first hard disk drive was created in 1979 by Seagate. Its capacity was a whopping 5 MB.",
    extra: "A single high-resolution photo today is larger than that!",
  },
  {
    id: 7,
    category: "Tech Giants",
    icon: Rocket,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop",
    fact: "HP, Google, Microsoft, and Apple all started in garages. Four of the world's biggest tech companies began in home garages.",
    extra: "Great ideas can start anywhere!",
  },
  {
    id: 8,
    category: "Domain Names",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
    fact: "The first and oldest domain name is Symbolics.com, registered on March 15, 1985. It's still active today!",
    extra: "Over 39 years old and still online!",
  },
  {
    id: 9,
    category: "CPU Overclocking",
    icon: Cpu,
    image: "https://images.unsplash.com/photo-1591405351990-4726e331f141?q=80&w=600&auto=format&fit=crop",
    fact: "Most CPUs are sold as a bit slower than they actually run. By overclocking them, you can get them to run faster—for free!",
    extra: "Your CPU might be hiding extra power!",
  },
  {
    id: 10,
    category: "Programming Languages",
    icon: Code,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
    fact: "The first computer programmer was a woman: Ada Lovelace, who wrote the first algorithm for Charles Babbage's Analytical Engine in the 1840s.",
    extra: "Programming is older than computers themselves!",
  },
  {
    id: 11,
    category: "AI History",
    icon: Brain,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop",
    fact: "AI has been around for decades. The term 'Artificial Intelligence' was coined in 1956 at the Dartmouth Conference.",
    extra: "AI is older than most people think!",
  },
  {
    id: 12,
    category: "Email & Spam",
    icon: MessageSquare,
    image: "https://images.unsplash.com/photo-1557200130-4b774fc4082a?q=80&w=600&auto=format&fit=crop",
    fact: "Over 80% of the total emails that an average person receives daily are spam.",
    extra: "Only 1 in 5 emails is actually legitimate!",
  },
  {
    id: 13,
    category: "YouTube & Video",
    icon: Video,
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop",
    fact: "Every minute, 10 hours of video are uploaded to YouTube. That's 600 hours every hour!",
    extra: "You'd need 41 years to watch all videos uploaded in a single day!",
  },
  {
    id: 14,
    category: "Facebook Population",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format@format=crop",
    fact: "Facebook has over 1 billion registered users. If it were a country, it would have the 3rd largest population in the world.",
    extra: "Only China and India are more populous!",
  },
  {
    id: 15,
    category: "Internet Users & Language",
    icon: MessageSquare,
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=600&auto=format&fit=crop",
    fact: "About 1.8 billion people connect to the Internet, but only 450 million of them speak English.",
    extra: "Most internet users speak other languages!",
  },
  {
    id: 16,
    category: "Computer Mouse",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=600&auto=format&fit=crop",
    fact: "The computer mouse was invented by Doug Engelbart in 1963. It was made out of wood!",
    extra: "The first mouse was a literal wooden block!",
  },
  {
    id: 17,
    category: "Digital Currency",
    icon: Database,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
    fact: "90% of the total currency of the world population exists in databases. Only 10% is physical cash.",
    extra: "Most money is digital, not paper!",
  },
  {
    id: 18,
    category: "Cybersecurity",
    icon: Lock,
    image: "https://images.unsplash.com/photo-1563206767-5b1d972b9fb1?q=80&w=600&auto=format&fit=crop",
    fact: "70% of virus writers actually work under contract for an organization.",
    extra: "Many 'hackers' are working for companies or governments!",
  },
  {
    id: 19,
    category: "First Web Browser",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
    fact: "Mosaic was the first popular web browser, released in 1993. It paved the way for modern browsers like Chrome and Firefox.",
    extra: "Before Mosaic, the web was mostly text-only!",
  },
  {
    id: 20,
    category: "Gaming & Screen Time",
    icon: Smartphone,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop",
    fact: "The average 21-year-old has spent 5,000 hours playing video games, exchanged 250,000 messages, and spent 10,000 hours on their mobile phone.",
    extra: "That's over 1 year of total screen time!",
  },
];

export default function FunFactsTopic() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const currentFact = funFacts[currentIndex];

  const nextFact = () => {
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % funFacts.length);
  };

  const prevFact = () => {
    setDirection("prev");
    setCurrentIndex((prev) => (prev - 1 + funFacts.length) % funFacts.length);
  };

  const randomFact = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * funFacts.length);
    } while (newIndex === currentIndex);
    setDirection("next");
    setCurrentIndex(newIndex);
  };

  const slideVariants = {
    enter: (direction: "next" | "prev") => ({
      x: direction === "next" ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: "next" | "prev") => ({
      x: direction === "next" ? -300 : 300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const Icon = currentFact.icon;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans p-4 md:p-8 selection:bg-indigo-500/20 overflow-x-hidden antialiased transition-colors duration-300">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-500/[0.015] dark:bg-indigo-500/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/[0.015] dark:bg-sky-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="border border-slate-200 dark:border-slate-900 rounded-3xl p-6 md:p-8 bg-white/60 dark:bg-slate-900/20 backdrop-blur-md shadow-sm dark:shadow-none relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-[0.03] dark:opacity-10">
            <Rocket className="w-24 h-24 text-slate-900 dark:text-slate-400" />
          </div>

          <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400 font-mono text-xs tracking-widest uppercase mb-3">
            <Zap className="w-4 h-4" />
            Fun & Trivia
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400">
            ICT Fun Facts & Tech Trivia
          </h1>

          <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
            <p>
              Discover fascinating, surprising, and sometimes hilarious facts about computers, the internet, programming, AI, and technology. Each fact is hand-picked to make you go "wow!"
            </p>
            <p>
              Use the navigation below to cycle through the facts. The array is loopable and OOP-friendly, so you can easily add more facts on demand.
            </p>
          </div>
        </header>

        {/* Fact Card */}
        <div className="relative">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="rounded-3xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-xl overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 md:h-64 overflow-hidden">
                  <img
                    src={currentFact.image}
                    alt={currentFact.category}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-lg">
                      <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span className="text-xs font-bold tracking-wider uppercase text-slate-900 dark:text-white">
                        {currentFact.category}
                      </span>
                    </div>
                  </div>

                  {/* Fact Number */}
                  <div className="absolute bottom-4 right-4">
                    <div className="px-4 py-2 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white font-bold text-sm shadow-lg">
                      Fact #{currentFact.id}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 space-y-4">
                  <p className="text-base md:text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                    {currentFact.fact}
                  </p>
                  
                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/50">
                    <p className="text-xs md:text-sm text-amber-700 dark:text-amber-300 leading-relaxed flex items-start gap-2">
                      <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="font-semibold">{currentFact.extra}</span>
                    </p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="px-6 md:px-8 pb-6 flex items-center justify-between gap-4">
                  <button
                    onClick={prevFact}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <button
                    onClick={randomFact}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs tracking-wider uppercase bg-indigo-600 dark:bg-indigo-500 text-white dark:text-slate-950 shadow-lg shadow-indigo-500/20 dark:shadow-indigo-500/30 hover:bg-indigo-700 dark:hover:bg-indigo-400 transition-all scale-105"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Random Fact
                  </button>

                  <button
                    onClick={nextFact}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            {funFacts.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? "next" : "prev");
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-indigo-600 dark:bg-indigo-500"
                    : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
                }`}
              />
            ))}
          </div>
          <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-3">
            Fact {currentIndex + 1} of {funFacts.length}
          </p>
        </div>

        {/* Quick category chips */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {[
              ...new Set(funFacts.map((f) => f.category)),
            ].map((category) => (
              <span
                key={category}
                className="px-4 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Summary banner */}
        <section className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-900 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950/50 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 p-6 text-slate-100 dark:text-slate-900 pointer-events-none">
            <Rocket className="h-24 w-24 stroke-[3]" />
          </div>
          <div className="max-w-3xl relative z-10 space-y-2">
            <h3 className="text-sm font-bold tracking-wider font-mono uppercase text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Fun Facts Summary
            </h3>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              ICT is full of surprising facts: from the wooden computer mouse to ENIAC's 27-ton weight, from Grace Hopper's moth to your phone being more powerful than the Apollo 11 Lunar Lander. Technology progresses faster than you think, and the fun doesn't stop here—add more facts to the array and keep exploring!
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}