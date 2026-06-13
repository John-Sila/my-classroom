import React, { useMemo, useState, useEffect } from 'react';
import {
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  MousePointer2,
  Keyboard,
  ShieldAlert,
  Monitor,
  Library,
  X,
  GitGraph,
  Cpu,
  Wifi,
  Code2,
  Logs,
  MonitorCloud,
  RectangleGoggles,
  Link,
  Cable,
  BookLock,
  Origami,
  Binary,
  BookA,
  PersonStandingIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import MouseTopic from '../library/Mouse';
import KeyboardTopic from '../library/Keyboard';
import MSOfficeTopic from '../library/MSOffice';
import MalwareTopic from '../library/Malware';
import { cn } from '@/src/lib/utils';
import DataFlowTopic from '../library/DataFlow';
import OperatingSystemsTopic from '../library/OperatingSystems';
import NetworkingTechnology from '../library/Networking';
import CodingFundamentals from '../library/Coding';
import ShortFormsReference from '../library/ShortForms';
import { useIsCompactView } from '@/src/utils/isMobile';
import ELearningTopic from '../library/ELearning';
import { RealityManipulationDossier } from '../library/RealityManipulation';
import { URLArchitectureDossier } from '../library/URLs';
import PortsAndCablesTopic from '../library/PortsAndCables';
import CyberLawTopic from '../library/Law';
import RoboticsTopic from '../library/Robotics';
import IntelligenceTopic from '../library/Intelligence';
import FunFactsTopic from '../library/FunFacts';
import ITPioneers from '../library/ITPioneers';

type Topic = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType;
  group: 'foundations' | 'systems' | 'networks' | 'intelligence' | 'culture';
};

const topics: Topic[] = [
  { id: 'mouse', title: 'Input: Mouse Systems', icon: MousePointer2, component: MouseTopic, group: 'foundations' },
  { id: 'keyboard', title: 'Input: Keyboard Architecture', icon: Keyboard, component: KeyboardTopic, group: 'foundations' },
  { id: 'data_flow', title: 'Data Flow', icon: GitGraph, component: DataFlowTopic, group: 'systems' },
  { id: 'operating-systems', title: 'Operating Systems', icon: Cpu, component: OperatingSystemsTopic, group: 'systems' },
  { id: 'ms-office', title: 'Microsoft Office', icon: Monitor, component: MSOfficeTopic, group: 'systems' },
  { id: 'networking', title: 'Networking Technology', icon: Wifi, component: NetworkingTechnology, group: 'networks' },
  { id: 'ports_cables', title: 'Physical Connectivity', icon: Cable, component: PortsAndCablesTopic, group: 'networks' },
  { id: 'uniform_resource', title: 'URL & Web Routing', icon: Link, component: URLArchitectureDossier, group: 'networks' },
  { id: 'malware', title: 'Threat Systems (Cybersecurity)', icon: ShieldAlert, component: MalwareTopic, group: 'intelligence' },
  { id: 'intelligence', title: 'Artificial Intelligence', icon: Binary, component: IntelligenceTopic, group: 'intelligence' },
  { id: 'coding', title: 'Programming Fundamentals', icon: Code2, component: CodingFundamentals, group: 'intelligence' },
  { id: 'robotics', title: 'Robotics & Embedded Systems', icon: Origami, component: RoboticsTopic, group: 'intelligence' },
  { id: 'reality', title: 'Reality Simulation & CGI', icon: RectangleGoggles, component: RealityManipulationDossier, group: 'culture' },
  { id: 'e_learning', title: 'E-Learning Systems', icon: MonitorCloud, component: ELearningTopic, group: 'culture' },
  { id: 'law', title: 'Cyber Law', icon: BookLock, component: CyberLawTopic, group: 'culture' },
  { id: 'persons', title: 'IT Pioneers', icon: PersonStandingIcon, component: ITPioneers, group: 'intelligence' },
  { id: 'fun_facts', title: 'System Trivia Engine', icon: BookA, component: FunFactsTopic, group: 'culture' },
  { id: 'short_forms', title: 'Abbreviation Index', icon: Logs, component: ShortFormsReference, group: 'culture' },
];

const groupLabels: Record<Topic['group'], string> = {
  foundations: 'Foundations',
  systems: 'System Architecture',
  networks: 'Networks & Infrastructure',
  intelligence: 'Compute & Intelligence',
  culture: 'Knowledge & Context',
};

export default function LibraryWidget() {
  const [selectedTopic, setSelectedTopic] = useState('mouse');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isCompact = useIsCompactView();

  const [tooltip, setTooltip] = useState<null | { text: string; x: number; y: number }>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let hideTimeout: NodeJS.Timeout;
    const show = (e: any) => {
      clearTimeout(hideTimeout);
      setTooltip(e.detail);
      requestAnimationFrame(() => setVisible(true));
    };
    const hide = () => {
      setVisible(false);
      hideTimeout = setTimeout(() => setTooltip(null), 150);
    };
    window.addEventListener("tooltip-show", show);
    window.addEventListener("tooltip-hide", hide);
    return () => {
      window.removeEventListener("tooltip-show", show);
      window.removeEventListener("tooltip-hide", hide);
      clearTimeout(hideTimeout);
    };
  }, []);

  const activeTopic = useMemo(() => topics.find((t) => t.id === selectedTopic), [selectedTopic]);
  const ActiveComponent = activeTopic?.component;

  const groupedTopics = useMemo(() => {
    return topics.reduce((acc, topic) => {
      acc[topic.group] ??= [];
      acc[topic.group].push(topic);
      return acc;
    }, {} as Record<string, Topic[]>);
  }, []);

  return (
   <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        ease: 'easeOut',
      }}
      className="h-full"
    >
      <div className="flex h-dvh w-full overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        
        {/* MOBILE TRIGGER ACTION BAR */}
        {isCompact && (
          <div className="fixed top-4 left-4 z-40">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md text-slate-700 dark:text-slate-300"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* SIDEBAR WRAPPER COMPONENT */}
        <motion.aside
          animate={{ width: collapsed ? 80 : 288 }}
          transition={{ type: "spring", stiffness: 300, damping: 32 }}
          className={cn(
            "fixed lg:static top-0 left-0 h-dvh flex flex-col shrink-0",
            "border-r border-slate-200/80 dark:border-slate-800/80",
            "bg-white/95 dark:bg-slate-950/90 backdrop-blur-xl z-30 lg:z-10",
            "overflow-hidden select-none",
            isCompact && (mobileOpen ? "translate-x-0 w-72" : "-translate-x-full")
          )}
        >
          {/* HEADER BRANDING LAYER */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 dark:border-slate-900 shrink-0">
            <div className="flex items-center gap-3 overflow-hidden min-w-0">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 shrink-0">
                <Library className="w-4 h-4" />
              </div>
              {!collapsed && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="truncate"
                >
                  <div className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">Library</div>
                  <div className="text-[10px] opacity-60 font-mono tracking-wider uppercase">Digital Architecture</div>
                </motion.div>
              )}
            </div>

            {!isCompact && (
              <button 
                onClick={() => setCollapsed(v => !v)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 transition-colors"
              >
                {collapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
              </button>
            )}

            {isCompact && (
              <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* SCROLLABLE INNER MENU NAVIGATION */}
          <nav className="flex-1 overflow-y-auto p-2 space-y-4 scrollbar-none">
            {Object.entries(groupedTopics).map(([group, items]) => (
              <div key={group} className="space-y-1">
                {!collapsed && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="px-3 pt-3 text-[10px] font-black uppercase tracking-widest opacity-50 text-slate-500 dark:text-slate-400"
                  >
                    {groupLabels[group as keyof typeof groupLabels]}
                  </motion.div>
                )}

                {items.map((topic) => {
                  const isActive = selectedTopic === topic.id;
                  const Icon = topic.icon;

                  return (
                    <button
                      key={topic.id}
                      onClick={() => {
                        setSelectedTopic(topic.id);
                        if (isCompact) setMobileOpen(false);
                      }}
                      onMouseEnter={(e) => {
                        if (!collapsed) return;

                        const topicTitle = topic.title;

                        // Fixed horizontal position: center of the viewport
                        const viewportWidth = window.innerWidth;
                        const x = viewportWidth / 2;
                        const isMobileViewport = window.innerWidth < 1024;
                        const topOffset = isMobileViewport ? 64 : 0;

                        const y = topOffset;

                        window.dispatchEvent(new CustomEvent("tooltip-show", {
                          detail: {
                            text: topicTitle,
                            x,
                            y,
                          }
                        }));
                      }}

                      onMouseLeave={() => {
                        window.dispatchEvent(new CustomEvent("tooltip-hide"));
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-xl px-3 py-2.5 relative group outline-none transition-all border",
                        isActive 
                          ? "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400" 
                          : "border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      <Icon className={cn(
                        "w-5 h-5 transition-transform group-hover:scale-105",
                        isActive ? "text-indigo-500" : "opacity-60"
                      )} />

                      {!collapsed && (
                        <motion.span 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }}
                          className="text-sm font-medium truncate relative z-10"
                        >
                          {topic.title}
                        </motion.span>
                      )}

                      {isActive && (
                        <motion.div
                          layoutId="activeLibraryNavBg"
                          className="absolute inset-0 bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100/50 dark:border-indigo-900/40 rounded-xl z-0"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
        </motion.aside>

        {/* MAIN VIEW CONTENT CONTAINER */}
        <main className="flex-1 min-w-0 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTopic}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-full overflow-y-auto p-4 lg:p-6"
            >
              <div className="min-h-full w-full rounded-3xl border border-slate-200/60 dark:border-slate-900 bg-white dark:bg-slate-900/40 backdrop-blur-md shadow-sm p-4 lg:p-6">
                {ActiveComponent ? <ActiveComponent /> : null}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* ACCURATE INDEPENDENT FLOATING TOOLTIP - FIXED TOP POSITION */}
        <AnimatePresence>
          {tooltip && visible && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="fixed z-50 pointer-events-none"
              style={{
                left: "50%",
                top: tooltip.y,
                transform: "translateX(-50%)",
              }}
            >
              <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 whitespace-nowrap">
                {tooltip.text}
              </div>
            </motion.div>
          )}
        </AnimatePresence>


      </div>

    </motion.div>
  );
}