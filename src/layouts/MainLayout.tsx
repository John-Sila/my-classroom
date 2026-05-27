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
  LibraryBig,
  MessageCircleCode,
} from 'lucide-react';

import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { cn } from '../lib/utils';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { motion, AnimatePresence } from 'motion/react';
import { doc, updateDoc, Timestamp, onSnapshot } from 'firebase/firestore';
import { notify } from '../utils/toast';
import { Footer } from '../pages/footer';
import { useIsMobile } from '../utils/isMobile';

export const MainLayout: React.FC = () => {
  const { user } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const isMobile = useIsMobile();
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

  // Real-time unread notification listener
  useEffect(() => {
    const latestNotifRef = doc(db, 'notifications', 'latestNotification');

    const unsubscribe = onSnapshot(
      latestNotifRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          const latestGlobalTimestamp: Timestamp | null = data.updatedAt || data.timestamp;
          const userReadTimestamp: Timestamp | null = user?.lastNotificationRead;

          if (latestGlobalTimestamp && (!userReadTimestamp || latestGlobalTimestamp.toMillis() > userReadTimestamp.toMillis())) {
            setHasUnread(true);
            return;
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
    { name: 'Notifier', icon: BellElectric, path: '/notifier' },
    { name: 'Notifications', icon: Bell, path: '/notifications' },
    !isMobile && { name: 'Library', icon: LibraryBig, path: '/library' },
    !isMobile && { name: 'Chatroom', icon: MessageCircleCode, path: '/chatroom' },
    { name: 'Settings', icon: Settings, path: '/profile_settings' },
  ].filter(Boolean);

  const learnerNav = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Available Tests', icon: ClipboardList, path: '/tests' },
    { name: 'My Results', icon: BarChart3, path: '/results' },
    { name: 'Notifications', icon: Bell, path: '/notifications' },
    !isMobile && { name: 'Library', icon: LibraryBig, path: '/library' },
    !isMobile && { name: 'Chatroom', icon: MessageCircleCode, path: '/chatroom' },
    { name: 'Settings', icon: Settings, path: '/profile_settings' },
  ].filter(Boolean);

  const navItems = user?.rank === 'teacher' ? teacherNav : learnerNav;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Ambient background glow */}
      <div className="fixed top-0 left-1/3 w-96 h-96 bg-indigo-500/[0.03] dark:bg-indigo-500/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/[0.03] dark:bg-sky-500/[0.05] rounded-full blur-[140px] pointer-events-none" />

      {/* Mobile Topbar */}
      <header className="lg:hidden sticky top-0 z-50 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-4 py-3">
        <div className="flex items-center gap-2">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Avatar"
              className="h-8 w-8 rounded-full border-2 border-indigo-500 object-cover"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
          )}

          <span className="text-base font-bold text-slate-900 dark:text-white">
            {user?.fullName
              ? user.fullName.length > 14
                ? `${user.fullName.slice(0, 14)}...`
                : user.fullName
              : 'Teacher Sila'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/notifications')}
            className="relative rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {hasUnread && (
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600 dark:bg-indigo-500" />
              </span>
            )}
          </button>

          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            'fixed left-0 top-0 h-dvh w-64 overflow-hidden border-r border-slate-200/80 dark:border-slate-800/80',
            'bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl',
            'transform transition-transform duration-300 ease-out lg:translate-x-0',
            'z-10',
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="flex h-full flex-col">
            {/* Desktop header */}
            <div className="hidden items-center gap-3 p-6 lg:flex">
              <div className="rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-500 p-2.5 shadow-lg shadow-indigo-500/20">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                  Classroom
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Learning OS
                </div>
              </div>
            </div>

            {/* Mobile header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 p-4 lg:hidden">
              <div className="flex min-w-0 items-center gap-3">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-indigo-600 flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <span className="min-w-0 truncate text-base font-bold tracking-tight text-slate-900 dark:text-white">
                  Teacher Sila
                </span>
              </div>

              <button
                onClick={() => setIsSidebarOpen(false)}
                className="shrink-0 rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto space-y-1 px-3 py-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                      isActive
                        ? 'bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 shadow-sm dark:from-indigo-950/40 dark:to-indigo-900/20 dark:text-indigo-300'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-white'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <item.icon
                          className={cn(
                            'h-5 w-5 transition-colors',
                            isActive
                              ? 'text-indigo-600 dark:text-indigo-400'
                              : 'opacity-60 group-hover:opacity-100'
                          )}
                        />
                      </motion.div>

                      <span className="truncate">{item.name}</span>

                      {item.path === '/notifications' && hasUnread && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2">
                          <span className="flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600 dark:bg-indigo-500" />
                          </span>
                        </span>
                      )}

                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 rounded-xl border border-indigo-200 dark:border-indigo-900"
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Footer actions */}
            <div className="border-t border-slate-100 dark:border-slate-800 p-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </motion.button>
            </div>
          </div>
        </aside>

        {/* Backdrop */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Main Workspace */}
        <main className="relative flex min-h-dvh flex-1 flex-col lg:ml-64">
          {/* Desktop Header */}
          <header className="sticky top-0 z-40 hidden items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-8 py-4 lg:flex">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-400 shadow-lg shadow-indigo-500/20 overflow-hidden">
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
                  Welcome back, @{user?.userName || 'User'}
                </p>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-3">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ rotate: -90, scale: 0.8, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="flex items-center justify-center"
                  >
                    {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>

              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/notifications')}
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                aria-label="View notifications"
              >
                <Bell className="h-5 w-5" />
                {hasUnread && (
                  <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600 dark:bg-indigo-500" />
                  </span>
                )}
              </motion.button>

              {/* User info */}
              <div className="mr-2 text-right">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {user?.fullName}
                </p>
                <p className="text-xs capitalize text-slate-500 dark:text-slate-400">
                  {user?.rank} - {user?.className}
                </p>
              </div>

              {user?.photoURL ? (
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={user.photoURL}
                  alt="Avatar"
                  className="h-10 w-10 rounded-full border-2 border-indigo-500 object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-indigo-500 font-bold text-white shadow-lg shadow-indigo-500/20">
                  {user?.userName?.[0]?.toUpperCase()}
                </div>
              )}
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 w-full min-w-0 p-4 lg:p-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-sm"
            >
              <Outlet />
            </motion.div>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
};