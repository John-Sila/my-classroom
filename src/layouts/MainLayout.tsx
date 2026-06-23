import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Outlet, useLocation } from 'react-router-dom';
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
  Bell,
  LibraryBig,
  BookOpenCheck,
} from 'lucide-react';

import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { cn } from '../lib/utils';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { motion } from 'motion/react';
import { doc, updateDoc, Timestamp, onSnapshot } from 'firebase/firestore';
import { notify } from '../utils/toast';
import { Footer } from '../pages/footer';
import { useIsMobile } from '../utils/isMobile';

// Maps routes to friendly page titles for the desktop header.
// Falls back to "Home" when a route isn't listed.
const routeTitles: Record<string, string> = {
  '/': "Home",
  '/create-test': 'Create a New Test',
  '/write-test': 'Write Test',
  '/manage-users': 'Manage Users',
  '/results-analytics': 'Results Analytics',
  '/notifier': 'Notifier',
  '/notifications': 'Notifications',
  '/library': 'Library',
  '/profile_settings': 'Settings',
  '/tests': 'Multiple Choice Tests',
  '/written_tests': 'Written Tests',
  '/results': 'My Results',
};

export const MainLayout: React.FC = () => {
  const { user } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [photoURL, setPhotoURL] = useState<string | null>(user?.photoURL ?? null);
  const [hasUnread, setHasUnread] = useState(false);
  const isMobile = useIsMobile();

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
    { name: 'Create Test (MCQs)', icon: PlusCircle, path: '/create-test' },
    { name: 'Write Test', icon: BookOpenCheck, path: '/write-test' },
    { name: 'Manage Users', icon: Users, path: '/manage-users' },
    { name: 'Results Analytics', icon: BarChart3, path: '/results-analytics' },
    { name: 'Notifier', icon: Bell, path: '/notifier' },
    !isMobile && { name: 'Library', icon: LibraryBig, path: '/library' },
    { name: 'Settings', icon: Settings, path: '/profile_settings' },
  ].filter(Boolean) as { name: string; icon: any; path: string }[];

  const learnerNav = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Multiple Choice Tests', icon: ClipboardList, path: '/tests' },
    { name: 'Written Tests', icon: BookOpenCheck, path: '/written_tests' },
    { name: 'My Results', icon: BarChart3, path: '/results' },
    !isMobile && { name: 'Library', icon: LibraryBig, path: '/library' },
    { name: 'Settings', icon: Settings, path: '/profile_settings' },
  ].filter(Boolean) as { name: string; icon: any; path: string }[];

  const navItems = user?.rank === 'teacher' ? teacherNav : learnerNav;

  const pageTitle = routeTitles[location.pathname] ?? "Teacher Sila's Classroom";

  const displayName = user?.fullName
    ? user.fullName.length > 14
      ? `${user.fullName.slice(0, 14)}...`
      : user.fullName
    : 'Teacher Sila';
    const webName = 'Teacher Sila';

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
      {/* Mobile Topbar */}
      <header className="lg:hidden sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Profile Graphic Container */}
          <div className="relative shrink-0 select-none">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="h-9 w-9 rounded-full border border-slate-200 dark:border-slate-800 object-cover shadow-sm bg-slate-50 dark:bg-slate-900"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-indigo-100 dark:border-indigo-950/50 bg-indigo-50/60 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 shadow-sm">
                <GraduationCap className="h-4 w-4" />
              </div>
            )}
            
            {/* Optional: Subtle Online Status Indicator Badge */}
            <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
          </div>

          {/* Display Name Container */}
          <div className="flex flex-col min-w-0">
            <span className="truncate text-md font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {displayName}
            </span>
            {user?.rank && (
              <span className="text-[11px] font-medium font-mono text-slate-400 dark:text-slate-500 capitalize leading-none pt-0.5">
                {user.rank}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/notifications')}
            className="relative rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Notifications"
          >
            <Bell className="h-6 w-6" />
            {hasUnread && (
              <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
            )}
          </button>

          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            'fixed left-0 top-0 z-50 h-dvh w-64 overflow-hidden border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transform transition-transform duration-300 lg:translate-x-0',
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="flex h-full flex-col">
            {/* Desktop logo lockup */}
            <div className="hidden items-center gap-3 p-6 lg:flex">
              <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 p-2 shadow-lg shadow-indigo-500/20">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Classroom
                </span>
                <div className="h-0.5 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-amber-400 mt-0.5" />
              </div>
            </div>

            {/* Mobile sidebar header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-4 dark:border-slate-800 lg:hidden">
              <div className="flex min-w-0 items-center gap-3">
                <div className="h-10 w-10 shrink-0 overflow-hidden bg-transparent">
                  <img src="/logo.png" alt="Classroom logo" className="h-full w-full object-contain" />
                </div>
                <span className="min-w-0 truncate text-base font-bold tracking-tight text-slate-900 dark:text-white">
                  {webName}
                </span>
              </div>

              <button
                onClick={() => setIsSidebarOpen(false)}
                className="shrink-0 rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-slate-500" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto space-y-1 px-4 py-4">
              {navItems.map((item) => (
                <NavLink key={item.path} to={item.path} onClick={() => setIsSidebarOpen(false)}>
                  {({ isActive }) => (
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200 overflow-visible"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeSidebarNav"
                          className="absolute inset-0 rounded-xl bg-white dark:bg-indigo-600 border border-slate-200/80 dark:border-transparent shadow-sm dark:shadow-lg dark:shadow-indigo-500/10"
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      )}

                      <div
                        className={cn(
                          'relative z-10 flex items-center justify-center transition-transform duration-200 group-hover:scale-110',
                          isActive
                            ? 'text-indigo-600 dark:text-white'
                            : 'text-slate-400 dark:text-slate-500'
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                      </div>

                      <span
                        className={cn(
                          'relative z-10',
                          isActive
                            ? 'text-slate-900 dark:text-white'
                            : 'text-slate-600 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-white'
                        )}
                      >
                        {item.name}
                      </span>

                      {item.path === '/notifications' && hasUnread && (
                        <span
                          className={cn(
                            'absolute right-4 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full z-20',
                            isActive ? 'bg-white' : 'bg-amber-500'
                          )}
                        />
                      )}
                    </motion.div>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="border-t border-slate-100 p-4 dark:border-slate-800">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Backdrop overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Workspace */}
        <main className="relative flex min-h-dvh flex-1 flex-col lg:ml-64">
          {/* Desktop Header */}
          <header className="sticky top-0 z-40 hidden items-center justify-between border-b border-slate-200 bg-white/80 px-8 py-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 lg:flex">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden ring-1 ring-slate-200 dark:ring-slate-700">
                <img src="/logo.png" alt="Logo" className="h-7 w-7 object-contain" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm font-medium tracking-tight">
                  <span className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 transition-colors cursor-pointer">
                    Teacher Sila's Classroom
                  </span>
                  <span className="text-slate-300 dark:text-slate-700 font-normal select-none">/</span>
                  <span className="text-slate-900 dark:text-white font-semibold">
                    {pageTitle}
                  </span>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Welcome back, <span className="text-indigo-500 font-mono dark:text-indigo-400 font-medium">@{user?.userName || 'User'}</span>
                </p>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-700"
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

              {/* Notifications */}
              <button
                onClick={() => navigate('/notifications')}
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-700"
                aria-label="View notifications"
              >
                <Bell className="h-5 w-5" />
                {hasUnread && (
                  <span className="absolute top-2.5 right-2.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
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
                  className="h-10 w-10 rounded-full border-2 border-indigo-500 object-cover ring-2 ring-indigo-500/10"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 font-bold text-white shadow-md shadow-indigo-500/20">
                  {user?.userName?.[0]?.toUpperCase()}
                </div>
              )}
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 w-full min-w-0 p-4 lg:p-8">
            <Outlet />
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
};