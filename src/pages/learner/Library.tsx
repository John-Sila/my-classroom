// File: src/widgets/LibraryWidget.tsx

import React, { useMemo, useState, useEffect } from 'react';
import {
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  MousePointer2,
  Keyboard,
  FileText,
  ShieldAlert,
  Monitor,
  Library,
  X,
  GitGraph,
  Cpu,
} from 'lucide-react';
import MouseTopic from '../library/Mouse';
import KeyboardTopic from '../library/Keyboard';
import MSOfficeTopic from '../library/MSOffice';
import MSWordTopic from '../library/OperatingSystems';
import MalwareTopic from '../library/Malware';
import { cn } from '@/src/lib/utils';
import DataFlowTopic from '../library/DataFlow';
import OperatingSystemsTopic from '../library/OperatingSystems';

// types
type Topic = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType;
};

// topics config
const topics: Topic[] = [
  {
    id: 'mouse',
    title: 'The Mouse',
    icon: MousePointer2,
    component: MouseTopic,
  },
  {
    id: 'keyboard',
    title: 'The Keyboard',
    icon: Keyboard,
    component: KeyboardTopic,
  },
  {
    id: 'ms-office',
    title: 'Microsoft Office',
    icon: Monitor,
    component: MSOfficeTopic,
  },
  {
    id: 'operating-systems',
    title: 'Operating Systems',
    icon: Cpu,
    component: OperatingSystemsTopic,
  },
  {
    id: 'malware',
    title: 'Malware',
    icon: ShieldAlert,
    component: MalwareTopic,
  },
  {
    id: 'data_flow',
    title: 'Data Flow',
    icon: GitGraph,
    component: DataFlowTopic,
  },
];

export default function LibraryWidget() {
  const [selectedTopic, setSelectedTopic] = useState('mouse');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Track animation frames
  const [isAnimating, setIsAnimating] = useState(false);

  // Trigger frame reset when topic changes
  useEffect(() => {
    setIsAnimating(false);
    
    // Request animation frame gives the browser a microscopic breather 
    // to cleanly tear down the CSS classes before painting the entry frame
    const frame = requestAnimationFrame(() => {
      setIsAnimating(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [selectedTopic]);

  const activeTopic = useMemo(
    () => topics.find((t) => t.id === selectedTopic),
    [selectedTopic]
  );

  const ActiveComponent = activeTopic?.component;

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
      
      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={cn(
          "fixed lg:static z-30 top-0 left-0 h-full",
          "bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800/80",
          "transition-all duration-300 ease-in-out flex flex-col shadow-sm lg:shadow-none",
          collapsed ? "w-20" : "w-72",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        onClick={() => {if (!collapsed) setCollapsed(true)}}
      >
        {/* Sidebar Header */}
        <div className="h-16 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between px-4">
          {!collapsed ? (
            <div className="flex items-center gap-2.5 px-2">
              <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                <Library className="h-5 w-5" />
              </div>
              <span className="font-bold text-base tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Course Library
              </span>
            </div>
          ) : (
            <div className="mx-auto p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              <Library className="h-5 w-5" />
            </div>
          )}

          {/* Collapse Trigger Action (Desktop Only) */}
          <button
            onClick={() => setCollapsed((prev) => !prev)}
            className="hidden lg:flex p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
          </button>

          {/* Close Trigger Action (Mobile Open View Drawer Only) */}
          <button
            onClick={() => setMobileOpen(false)}
            className="flex lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Dynamic Topic Option List Views */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {topics.map((topic) => {
            const isActive = selectedTopic === topic.id;
            const Icon = topic.icon;

            return (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopic(topic.id);
                  setMobileOpen(false);
                }}
                className={cn(
                  "w-full flex items-center rounded-xl transition-all duration-200 group relative",
                  collapsed ? "justify-center p-3" : "gap-3 px-4 py-3",
                  isActive
                    ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold shadow-sm shadow-indigo-100/10"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/3 bottom-1/3 w-1 rounded-r-full bg-indigo-600 dark:bg-indigo-400" />
                )}

                <Icon className={cn(
                  "h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-105",
                  isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                )} />

                {!collapsed && (
                  <span className="text-sm tracking-wide truncate">
                    {topic.title}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Workspace Terminal Display Content Wrapper */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Mobile Navbar Control Element Container Header */}
        <div className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800/80 flex items-center px-4 lg:hidden justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h2 className="font-bold text-slate-800 dark:text-white text-base tracking-wide">
              {activeTopic?.title}
            </h2>
          </div>
        </div>

        {/* Main Fluid Container Content Box Grid View */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-slate-50/50 dark:bg-slate-950/40">
          <div
            className={cn(
              "bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80",
              "shadow-sm shadow-slate-100/50 dark:shadow-none min-h-full transition-all duration-200",
              
              // Conditional evaluation lets Tailwind catch and paint 
              // the frame change transition with 100% precision
              isAnimating 
                ? "animate-in fade-in-0 zoom-in-[0.99] slide-in-from-bottom-3 duration-300 ease-out" 
                : "opacity-0"
            )}
          >
            <div className="p-6 md:p-8">
              {ActiveComponent ? (
                <ActiveComponent />
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400 dark:text-slate-500">
                  <Library className="h-12 w-12 stroke-[1.5] mb-3" />
                  <p className="text-sm font-medium">No course topic selected.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}