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
} from 'lucide-react';
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

// types
type Topic = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType;
};

// topics config
const topics: Topic[] = [
  { id: 'mouse', title: 'The Mouse', icon: MousePointer2, component: MouseTopic },
  { id: 'keyboard', title: 'The Keyboard', icon: Keyboard, component: KeyboardTopic },
  { id: 'data_flow', title: 'Data Flow', icon: GitGraph, component: DataFlowTopic },
  { id: 'operating-systems', title: 'Operating Systems', icon: Cpu, component: OperatingSystemsTopic },
  { id: 'ms-office', title: 'Microsoft Office', icon: Monitor, component: MSOfficeTopic },
  { id: 'networking', title: 'Networking', icon: Wifi, component: NetworkingTechnology },
  { id: 'malware', title: 'Malware', icon: ShieldAlert, component: MalwareTopic },
  { id: 'coding', title: 'Coding', icon: Code2, component: CodingFundamentals },
  { id: 'short_forms', title: 'Short Forms', icon: Logs, component: ShortFormsReference },
];

export default function LibraryWidget() {
  const [selectedTopic, setSelectedTopic] = useState('mouse');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const isCompact = useIsCompactView();
  const [showNotice, setShowNotice] = useState(true);

  useEffect(() => {
    setIsAnimating(false);
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
    <div className="flex min-h-dvh w-full overflow-x-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* Mobile Drawer Overlay: Keeps blur restricted to background behind sidebar */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={cn(
          "fixed lg:static top-0 left-0 z-50 lg:z-30 h-dvh lg:h-auto",
          collapsed ? "lg:w-20 w-64" : "lg:w-72 w-64",
          "max-w-[100dvw] overflow-hidden",
          "border-r border-slate-200/80 dark:border-slate-800/80",
          "shadow-xl shadow-slate-200/40 dark:shadow-black/20",
          "flex flex-col transition-transform duration-300 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        onClick={(e) => {if (!collapsed) setCollapsed(true)}}
      >
        {/* Isolated Background Layer: Prevents full-screen blur bleeding */}
        <div className="absolute inset-0 -z-10 bg-white/95 dark:bg-slate-950/90 backdrop-blur-xl pointer-events-none" />

        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 px-4 shrink-0">
          {!collapsed ? (
            <div className="flex items-center gap-3 px-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/20">
                <Library className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <span className="block truncate font-bold text-base tracking-tight text-slate-900 dark:text-white">
                  Course Library
                </span>
                <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  Explore learning topics
                </span>
              </div>
            </div>
          ) : (
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/20">
              <Library className="h-5 w-5" />
            </div>
          )}

          {/* Collapse Toggle Action (Desktop Only) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCollapsed((prev) => !prev);
            }}
            className="hidden lg:inline-flex items-center justify-center rounded-xl p-2 text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
          </button>

          {/* Close Trigger Action (Mobile Open View Drawer Only) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMobileOpen(false);
            }}
            className="inline-flex lg:hidden items-center justify-center rounded-xl p-2 text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
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
                  "group relative w-full rounded-2xl border transition-all duration-300 ease-in-out",
                  "focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950",
                  collapsed
                    ? "flex items-center justify-center p-3"
                    : "flex items-center gap-3 px-4 py-3",
                  isActive
                    ? "border-indigo-200 bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 shadow-sm shadow-indigo-100/40 dark:border-indigo-900/40 dark:from-indigo-950/50 dark:to-violet-950/30 dark:text-indigo-300"
                    : "border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:border-slate-800 dark:hover:bg-slate-800/50 dark:hover:text-white"
                )}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r-full bg-indigo-500 dark:bg-indigo-400" />
                )}

                <Icon
                  className={cn(
                    "h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-105",
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"
                  )}
                />

                <span
                  className={cn(
                    "overflow-hidden whitespace-nowrap text-sm font-medium tracking-wide transition-all duration-300 ease-in-out",
                    collapsed
                      ? "max-w-0 opacity-0 translate-x-[-8px]"
                      : "max-w-[180px] opacity-100 translate-x-0"
                  )}
                >
                  {topic.title}
                </span>
              </button>

            );
          })}
        </nav>
      </aside>

      {/* Main Workspace Terminal Display Content Wrapper */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {isCompact && showNotice && (
          <div className="fixed top-0 left-0 right-0 z-[100] bg-amber-50 dark:bg-amber-900/30 border-b border-amber-200 dark:border-amber-800 px-4 py-3 flex items-center justify-between">
            <p className="text-xs md:text-sm text-amber-800 dark:text-amber-200 font-medium">
              Library experience is optimized for tablets and desktop devices for better layout stability and readability.
            </p>

            <button
              onClick={() => setShowNotice(false)}
              className="text-amber-700 dark:text-amber-300 font-bold text-sm px-3 py-1 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-800"
            >
              Dismiss
            </button>
          </div>
        )}
        
        {/* Mobile Navbar Control Element Container Header */}
        <div className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800/80 flex items-center px-4 lg:hidden justify-between shrink-0">
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
        <div className="flex-1 w-full min-w-0 max-w-full overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8 bg-slate-50/50 dark:bg-slate-950/40">
          <div
            className={cn(
              "bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80",
              "shadow-sm shadow-slate-100/50 dark:shadow-none min-h-full transition-all duration-200",
              isAnimating 
                ? "animate-in fade-in-0 zoom-in-[0.99] slide-in-from-bottom-3 duration-300 ease-out" 
                : "opacity-0"
            )}
          >
            <div className="p-6 md:p-8 w-full min-w-0 max-w-full overflow-x-hidden">
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
