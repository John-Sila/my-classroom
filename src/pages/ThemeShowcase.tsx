import React from 'react';
import { motion } from 'motion/react';
import { 
  Palette, 
  Layout, 
  Type, 
  MousePointer2, 
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  Compass
} from 'lucide-react';

const themes = [
  {
    id: 'tech-grid',
    name: 'Technical / Mission Control',
    description: 'Professional, precise, information-dense. Visible structures and monospace typography.',
    recipe: 'Recipe 1',
    colors: ['#E4E3E0', '#141414', '#94A3B8'],
    font: 'JetBrains Mono + Georgia Italic'
  },
  {
    id: 'dark-luxury',
    name: 'Dark Luxury / Premium',
    description: 'Sophisticated, minimal, and immersive. Pure black backgrounds with ultra-light typography.',
    recipe: 'Recipe 4',
    colors: ['#000000', '#FFFFFF', '#F27D26'],
    font: 'Inter (Light 300)'
  },
  {
    id: 'warm-organic',
    name: 'Warm Organic / Human',
    description: 'Approachable and refined. Serif fonts with muted earth tones and soft rounded corners.',
    recipe: 'Recipe 6',
    colors: ['#F5F5F0', '#5A5A40', '#FFFFFF'],
    font: 'Cormorant Garamond'
  },
  {
    id: 'clean-utility',
    name: 'Clean Utility / Fintech',
    description: 'Trustworthy and functional. Modern system fonts with subtle card structures.',
    recipe: 'Recipe 8',
    colors: ['#F5F5F5', '#FFFFFF', '#4A4A4A'],
    font: 'SF Pro / Inter'
  },
  {
    id: 'saas-modern',
    name: 'SaaS / Split Modern',
    description: 'Confident and bold. Massive headlines with high-contrast split layouts.',
    recipe: 'Recipe 11',
    colors: ['#0A0A0A', '#F5F5F4', '#000000'],
    font: 'Inter (Semi-Bold)'
  }
];

export const ThemeShowcase: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-3 bg-indigo-500 text-white rounded-2xl mb-6 shadow-lg shadow-indigo-500/20"
          >
            <Palette className="w-8 h-8" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Design Theme Slides</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Choose the aesthetic direction for your Quiz App. Each theme provides a unique mood and user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {themes.map((theme, idx) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest">{theme.recipe}</span>
                <div className="flex -space-x-2">
                  {theme.colors.map((c, i) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 transition-colors">{theme.name}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex-grow">{theme.description}</p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                  <Type className="w-4 h-4" />
                  <span>{theme.font}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                  <Layout className="w-4 h-4" />
                  <span>Custom Layout Pattern</span>
                </div>
              </div>

              <button className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-600 dark:hover:bg-indigo-500 dark:hover:text-white transition-all">
                Preview Selection <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}

          {/* Custom Option */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="group bg-indigo-600 rounded-[2.5rem] p-8 text-white flex flex-col justify-center items-center text-center border-4 border-dashed border-indigo-400/50"
          >
            <Sparkles className="w-12 h-12 mb-4 opacity-50" />
            <h3 className="text-2xl font-bold mb-2">Mix & Match?</h3>
            <p className="text-indigo-100 text-sm mb-6">
              Tell me if you want parts of one theme and parts of another!
            </p>
            <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:scale-105 transition-transform">
              Hybrid Design
            </button>
          </motion.div>
        </div>

        <div className="mt-20 p-8 bg-indigo-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-indigo-100 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                <MousePointer2 className="w-6 h-6 text-indigo-500" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Micro-Interactions</h4>
              <p className="text-xs text-slate-500">Smooth hover states & active feedback</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                <Compass className="w-6 h-6 text-emerald-500" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Clear Navigation</h4>
              <p className="text-xs text-slate-500">Intuitive hierarchy for all pages</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                <Zap className="w-6 h-6 text-amber-500" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Reactive Layout</h4>
              <p className="text-xs text-slate-500">Works perfectly on any screen size</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                <Globe className="w-6 h-6 text-blue-500" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Accessible Design</h4>
              <p className="text-xs text-slate-500">High contrast and readable type</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
