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
import { motion, AnimatePresence } from 'motion/react';
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
      {/* Topbar */}
      <header className="fixed top-0 left-0 right-0 h-16 glass z-50 flex items-center justify-between px-6 shadow-soft">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-blue-400">
            <GraduationCap size={28} />
            <span className="hidden sm:inline">Teacher Sila’s Classroom</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium">Welcome back, {user?.userName}</p>
            <p className="text-xs text-slate-500">{user?.rank === 'teacher' ? 'Instructor' : `Class ${user?.className}`}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold border-2 border-white dark:border-slate-800 shadow-sm">
            {user?.userName?.[0]?.toUpperCase()}
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-16 bottom-0 left-0 glass z-40 transition-all duration-300 shadow-soft overflow-hidden",
          isSidebarOpen ? "w-64" : "w-0 md:w-20"
        )}
      >
        <nav className="p-4 flex flex-col h-full">
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
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all"
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

      {/* Main Content */}
      <main 
        className={cn(
          "transition-all duration-300 pt-24 p-6 min-h-screen",
          isSidebarOpen ? "pl-72" : "pl-6 md:pl-26"
        )}
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
