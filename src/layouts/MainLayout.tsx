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
  Settings,
  BellElectric,
  Bell,
} from 'lucide-react';

import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { cn } from '../lib/utils';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { motion } from 'motion/react';
import { doc, updateDoc, Timestamp, onSnapshot } from 'firebase/firestore';
import { notify } from '../utils/toast';

export const MainLayout: React.FC = () => {
  const { user } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [photoURL, setPhotoURL] = useState<string | null>(user?.photoURL ?? null);
  const [hasUnread, setHasUnread] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setPhotoURL(user?.photoURL ?? null);
  }, [user?.photoURL]);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  // Real-time unread notification listener implementation
  useEffect(() => {
    const latestNotifRef = doc(db, 'notifications', 'latestNotification');

    const unsubscribe = onSnapshot(
      latestNotifRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          // Fallback check matching both common platform field name mappings
          const latestGlobalTimestamp: Timestamp | null = data.updatedAt || data.timestamp;
          const userReadTimestamp: Timestamp | null = user?.lastNotificationRead;

          if (latestGlobalTimestamp) {
            if (!userReadTimestamp || latestGlobalTimestamp.toMillis() > userReadTimestamp.toMillis()) {
              setHasUnread(true);
              return;
            }
          }
        }
        setHasUnread(false);
      },
      (error) => {
        console.error('Error listening to global notification channel checkpoint:', error);
      }
    );

    return () => unsubscribe();
  }, [user?.lastNotificationRead]);

  const handleLogout = async () => {
    const loader = notify.loading('Logging out...');
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await updateDoc(doc(db, 'users', currentUser.uid), {
          lastLogout: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });
      } else {
        notify.updateError(loader, 'No user is currently logged in.');
      }

      await signOut(auth);
      notify.updateSuccess(loader, 'Logged out successfully!');
      navigate('/login');
    } catch (error) {
      notify.updateError(loader, 'Logout failed:');
    }
  };

  const teacherNav = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Create Test', icon: PlusCircle, path: '/create-test' },
    { name: 'Manage Users', icon: Users, path: '/manage-users' },
    { name: 'Results Analytics', icon: BarChart3, path: '/results-analytics' },
    { name: 'Test Analytics', icon: BookOpen, path: '/test-analytics' },
    { name: 'Notifier', icon: BellElectric, path: '/notifier' },
    { name: 'Notifications', icon: Bell, path: '/notifications' },
    { name: 'Settings', icon: Settings, path: '/admin_settings' },
  ];

  const learnerNav = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Available Tests', icon: ClipboardList, path: '/tests' },
    { name: 'My Results', icon: BarChart3, path: '/results' },
    { name: 'Notifications', icon: Bell, path: '/notifications' },
    { name: 'Settings', icon: Settings, path: '/personal_settings' },
  ];

  const navItems = user?.rank === 'teacher' ? teacherNav : learnerNav;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
      {/* Mobile Topbar */}
      <header className="lg:hidden sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3">
        <div className="flex items-center gap-2">
          {/* Profile Photo with Icon Fallback */}
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Avatar"
              className="h-8 w-8 rounded-full border border-indigo-500 object-cover"
            />
          ) : (
            <GraduationCap className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          )}

          <span className="text-lg font-bold text-slate-900 dark:text-white">
            {user?.fullName 
              ? user.fullName.length > 14 
                ? `${user.fullName.slice(0, 14)}...` 
                : user.fullName
              : 'Teacher Sila'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Notification Bell Icon Trigger Link */}
          <button
            onClick={() => navigate('/notifications')}
            className="relative rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Notifications"
          >
            <Bell className="h-6 w-6" />
            {hasUnread && (
              <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600 dark:bg-indigo-500"></span>
              </span>
            )}
          </button>

          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
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

            {/* Mobile Sidebar Close Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-4 dark:border-slate-800 lg:hidden">
              <span className="font-bold text-slate-900 dark:text-white">
                Teacher Sila
              </span>

              <button
                onClick={() => setIsSidebarOpen(false)}
                className="rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-6 w-6 text-slate-500" />
              </button>
            </div>

            {/* Nav Menu Lists */}
            <nav className="flex-1 space-y-1 px-4 py-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all',
                      isActive
                        ? 'bg-indigo-50 text-indigo-600 shadow-sm dark:bg-indigo-900/40 dark:text-indigo-400'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-white'
                    )
                  }
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                  
                  {/* Inline indicator badge inside the sidebar links item list view stack */}
                  {item.path === '/notifications' && hasUnread && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Footer Action Blocks */}
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

        {/* Backdrop Element overlay layer */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Workspace Frame container */}
        <main className="relative min-h-screen flex-1 lg:ml-64">
          {/* Desktop Header panel view */}
          <header className="sticky top-0 z-30 hidden items-center justify-between border-b border-slate-200 bg-white/80 px-8 py-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 lg:flex">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-7 w-7 object-contain"
                />
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
              {/* Theme Toggle Button CTA */}
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
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </motion.span>
              </button>

              {/* Desktop Notification Action Gateway Item Node link */}
              <button
                onClick={() => navigate('/notifications')}
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                aria-label="View notifications"
              >
                <Bell className="h-5 w-5" />
                {hasUnread && (
                  <span className="absolute top-2.5 right-2.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600 dark:bg-indigo-500"></span>
                  </span>
                )}
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

          {/* Page Content Injection Target */}
          <div className="p-4 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};