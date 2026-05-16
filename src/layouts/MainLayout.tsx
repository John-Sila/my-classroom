import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  BarChart3,
  Users,
  PlusCircle,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  GraduationCap,
} from 'lucide-react';

import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { cn } from '../lib/utils';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { motion } from 'motion/react';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { notify } from '../utils/toast';

export const MainLayout: React.FC = () => {
  const { user } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);


  const handleLogout = async () => {
    try {
      notify.info('Logging out...');
      const currentUser = auth.currentUser;
      if (currentUser) {
        await updateDoc(doc(db, 'users', currentUser.uid), {
          lastLogout: Timestamp.now(),
          updatedAt: Timestamp.now()
        });
      } else {
        notify.info('No user is currently logged in.');
      }

      await signOut(auth);
      navigate('/login');
    } catch (error) {
      notify.error('Logout failed:');
    }
  };

  const teacherNav = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Create Test', icon: PlusCircle, path: '/create-test' },
    { name: 'Manage Users', icon: Users, path: '/manage-users' },
    { name: 'Results Analytics', icon: BarChart3, path: '/results-analytics' },
    { name: 'Test Analytics', icon: BookOpen, path: '/test-analytics' },
  ];

  const learnerNav = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Available Tests', icon: ClipboardList, path: '/tests' },
    { name: 'My Results', icon: BarChart3, path: '/results' },
    { name: 'Analytics', icon: BookOpen, path: '/analytics' },
  ];

  const navItems =
    user?.rank === 'teacher' ? teacherNav : learnerNav;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
      {/* Mobile Topbar */}
      <header className="lg:hidden sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />

          <span className="text-lg font-bold text-slate-900 dark:text-white">
            Teacher Sila&apos;s
          </span>
        </div>

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            'fixed left-0 top-0 z-50 h-screen w-64 overflow-y-auto border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transform transition-transform duration-300 lg:translate-x-0',
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="flex h-full flex-col">
            {/* Desktop Logo */}
            <div className="hidden items-center gap-3 p-6 lg:flex">
              <div className="rounded-xl bg-indigo-600 p-2">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>

              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Classroom
              </span>
            </div>

            {/* Mobile Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-4 dark:border-slate-800 lg:hidden">
              <span className="font-bold text-slate-900 dark:text-white">
                Navigation
              </span>

              <button
                onClick={() => setIsSidebarOpen(false)}
                className="rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-6 w-6 text-slate-500" />
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 space-y-1 px-4 py-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all',
                      isActive
                        ? 'bg-indigo-50 text-indigo-600 shadow-sm dark:bg-indigo-900/40 dark:text-indigo-400'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-white'
                    )
                  }
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Footer Buttons */}
            <div className="space-y-2 border-t border-slate-100 p-4 dark:border-slate-800">

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Backdrop */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="relative min-h-screen flex-1 lg:ml-64">
          {/* Desktop Header */}
          <header className="sticky top-0 z-30 hidden items-center justify-between border-b border-slate-200 bg-white/80 px-8 py-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 lg:flex">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                <Users className="h-5 w-5 text-slate-500" />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  Teacher Sila&apos;s Classroom
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Welcome back, {user?.userName || 'User'}
                </p>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              aria-label="Toggle theme"
            >
              <motion.span
                key={theme}
                initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
                animate={{ rotate: 360, scale: 1, opacity: 1 }}
                exit={{ rotate: -360, scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                className="flex items-center justify-center"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </motion.span>
            </button>

              <div className="mr-2 text-right">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {user?.fullName}
                </p>

                <p className="text-xs capitalize text-slate-500 dark:text-slate-400">
                  {user?.rank} - {user?.className}
                </p>
              </div>

              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Avatar"
                  className="h-10 w-10 rounded-full border-2 border-indigo-500 object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
                  {user?.userName?.[0]?.toUpperCase()}
                </div>
              )}
            </div>
          </header>

          {/* Page Content */}
          <div className="p-4 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};