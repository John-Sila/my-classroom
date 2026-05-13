import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  Moon,
  Sun,
  LogOut,
  Menu,
  X,
  GraduationCap
} from 'lucide-react';
import { motion } from 'motion/react';
import { useAuthStore, useThemeStore } from '../store/useStore';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { cn } from '../lib/utils';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const teacherNav = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/teacher' },
    { name: 'Create Test', icon: FileText, path: '/teacher/create-test' },
    { name: 'Manage Users', icon: Users, path: '/teacher/users' },
    { name: 'Analytics', icon: BarChart3, path: '/teacher/analytics' },
  ];

  const learnerNav = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/learner' },
    { name: 'Available Tests', icon: FileText, path: '/learner/tests' },
    { name: 'My Results', icon: BarChart3, path: '/learner/results' },
  ];

  const navItems = user?.rank === 'teacher' ? teacherNav : learnerNav;

  return (
    <div className={cn("min-h-screen", theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900')}>
      {/* Topbar — sets CSS variable --topbar-height so main & aside align */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6",
          // glass effect: light and dark variants
          "backdrop-blur-sm",
          theme === 'dark'
            ? "bg-slate-900/60 text-slate-100 border-b border-slate-800"
            : "bg-white/70 text-slate-900 border-b border-slate-200"
        )}
        style={{ height: 64, /* px */ } as React.CSSProperties}
      >
        {/* CSS variable for consumers */}
        <div style={{ '--topbar-height': '64px' } as React.CSSProperties} />

        {/* LEFT: hamburger + brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={cn(
              "p-2 rounded-md transition-colors",
              theme === 'dark' ? "hover:bg-slate-800/60" : "hover:bg-slate-100"
            )}
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex items-center gap-2 font-semibold text-lg md:text-xl text-blue-600 dark:text-blue-400">
            <GraduationCap size={26} />
            <span className="hidden sm:inline">Teacher Sila’s Classroom</span>
          </div>
        </div>

        {/* RIGHT: user info + theme + avatar */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium">{user ? `Welcome back, ${user.userName}` : 'Welcome'}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {user?.rank === 'teacher' ? 'Instructor' : `Class ${user?.className}`}
            </p>
          </div>

          <button
            onClick={toggleTheme}
            className={cn(
              "p-2 rounded-md transition-colors",
              theme === 'dark' ? "hover:bg-slate-800/60" : "hover:bg-slate-100"
            )}
            aria-label="Toggle theme"
            title={theme === 'light' ? 'Switch to dark' : 'Switch to light'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold border-2 border-white dark:border-slate-800 shadow-sm">
            {user?.userName?.[0]?.toUpperCase()}
          </div>

          <button
            onClick={handleLogout}
            className={cn(
              "ml-1 p-2 rounded-md transition-colors",
              theme === 'dark' ? "hover:bg-red-900/20 text-red-400" : "hover:bg-red-50 text-red-600"
            )}
            aria-label="Logout"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {/* Sidebar — top aligned to header via top: var(--topbar-height) with fallback */}
      <aside
        className={cn(
          "fixed bottom-0 left-0 transition-all duration-300 shadow-soft overflow-hidden z-40",
          isSidebarOpen ? "w-64" : "w-0 md:w-20"
        )}
        style={{ top: 'var(--topbar-height, 64px)' }}
      >
        <nav className={cn("p-4 flex flex-col h-full", theme === 'dark' ? "bg-transparent" : "bg-transparent")}>
          <ul className="space-y-2 flex-grow">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl transition-all group",
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                        : "hover:bg-blue-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                    )}
                  >
                    <item.icon size={22} className={cn("shrink-0", isActive ? "" : "group-hover:scale-110 transition-transform")} />
                    <span className={cn("font-medium whitespace-nowrap transition-opacity", !isSidebarOpen && "md:opacity-0")}>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={toggleTheme}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all"
              )}
            >
              {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
              <span className={cn("font-medium whitespace-nowrap", !isSidebarOpen && "md:opacity-0")}>
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 transition-all"
            >
              <LogOut size={22} />
              <span className={cn("font-medium whitespace-nowrap", !isSidebarOpen && "md:opacity-0")}>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content — uses the same variable for paddingTop; fallback 64px */}
      <main
        className={cn(
          "transition-all duration-300 p-6 min-h-screen",
          isSidebarOpen ? "pl-72" : "pl-6 md:pl-26"
        )}
        style={{ paddingTop: 'var(--topbar-height, 96px)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          key={location.pathname}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}