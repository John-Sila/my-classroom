import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define the shape of the parameters (Props) the component expects
interface WorkspaceHeroSliderProps {
  images: string[];
  interval?: number; // Optional: defaults to 6000 if not provided
}

export default function WorkspaceHeroSlider({ 
  images, 
  interval = 6000 
}: WorkspaceHeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // If there's only 1 image or no images, don't start a timer
    if (!images || images.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]); // Reset timer if images or interval settings change

  // Safety check if an empty array is passed
  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4">
      {/* Hero Container */}
      <div className="relative rounded-[2rem] border border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950 shadow-xl overflow-hidden aspect-video max-h-[450px]">
        
        {/* Ambient Overlay Layer */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/40 via-transparent to-slate-950/10 z-20 pointer-events-none" />

        {/* Dynamic Image Canvas */}
        <div className="relative w-full h-full overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <motion.img
                src={images[activeIndex]}
                alt={`Workspace dashboard presentation view ${activeIndex + 1}`}
                initial={{ scale: 1.01 }}
                animate={{ scale: 1.05 }}
                // Dynamically syncs the zoom speed to your custom interval parameter
                transition={{ duration: interval / 1000, ease: "linear" }}
                className="w-full h-full object-cover object-top"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subtle Bottom Glow Ring */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[70%] h-32 bg-indigo-500/15 dark:bg-indigo-500/10 blur-3xl rounded-full pointer-events-none z-20" />
      </div>

      {/* Synchronized Progress Navigation Controls */}
      <div className="flex items-center justify-center gap-3">
        {images.map((_, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="group relative py-2 cursor-pointer focus:outline-hidden"
              aria-label={`Maps directly to system slide position ${index + 1}`}
            >
              {/* Outer Track pill wrapper */}
              <div
                className={`h-1.5 rounded-full overflow-hidden transition-all duration-500 ${
                  isActive 
                    ? "w-12 bg-indigo-100 dark:bg-indigo-950/40" 
                    : "w-3 bg-slate-200 dark:bg-slate-800 group-hover:bg-slate-300 dark:group-hover:bg-slate-700"
                }`}
              >
                {/* Active Inner Micro Bar Progress Tracker */}
                {isActive && (
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    // Dynamically syncs the loading bar speed to your custom interval parameter
                    transition={{ duration: interval / 1000, ease: "linear" }}
                    className="h-full w-full bg-indigo-600 dark:bg-indigo-400 rounded-full"
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}