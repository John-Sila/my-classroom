import React, { useEffect, useMemo, useState } from 'react';
import {
  User,
  Shield,
  Moon,
  Sun,
  Bell,
  KeyRound,
  Mail,
  School,
  BadgeCheck,
  Smartphone,
  Monitor,
  Eye,
  EyeOff,
  UserCheck,
  Palette,
  Check,
} from 'lucide-react';

import {
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';

import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';

import { AnimatePresence, motion } from 'motion/react';

import { db, auth } from '../../firebase/config';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import { cn } from '../../lib/utils';
import { notify } from '@/src/utils/toast';

// config

const avatars = [
  // --- Original Space / Cosmic Theme ---
  { id: 'avatar-1', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Nova' },
  { id: 'avatar-2', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Orion' },
  { id: 'avatar-3', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Vega' },
  { id: 'avatar-4', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Luna' },
  { id: 'avatar-5', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Atlas' },
  { id: 'avatar-6', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Echo' },

  // --- Cosmic Expansion ---
  { id: 'avatar-7', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Cosmo' },
  { id: 'avatar-8', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Astro' },
  { id: 'avatar-9', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Nebula' },
  { id: 'avatar-10', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Solaris' },
  { id: 'avatar-11', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Comet' },
  { id: 'avatar-12', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Polaris' },

  // --- Adventure & Exploration ---
  { id: 'avatar-13', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Hunter' },
  { id: 'avatar-14', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Scout' },
  { id: 'avatar-15', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Ranger' },
  { id: 'avatar-16', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Ryder' },
  { id: 'avatar-17', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Chase' },
  { id: 'avatar-18', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Maverick' },
  { id: 'avatar-19', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Wilder' },
  { id: 'avatar-20', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Blaze' },

  // --- Tech & Cyberspace ---
  { id: 'avatar-21', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Pixel' },
  { id: 'avatar-22', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Vector' },
  { id: 'avatar-23', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Cyber' },
  { id: 'avatar-24', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Matrix' },
  { id: 'avatar-25', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Byte' },
  { id: 'avatar-26', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Glitch' },

  // --- Mythology & Legends ---
  { id: 'avatar-27', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Zeus' },
  { id: 'avatar-28', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Athena' },
  { id: 'avatar-29', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Odin' },
  { id: 'avatar-30', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Thor' },
  { id: 'avatar-31', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Loki' },
  { id: 'avatar-32', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Freya' },

  // --- Nature & Elements ---
  { id: 'avatar-33', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Willow' },
  { id: 'avatar-34', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=River' },
  { id: 'avatar-35', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Forest' },
  { id: 'avatar-36', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Storm' },
  { id: 'avatar-37', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Phoenix' },
  { id: 'avatar-38', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Shadow' },
  { id: 'avatar-39', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Ember' },
  { id: 'avatar-40', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Frost' },
];

// styling

const sectionClass =
  'rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900';

const toggleClass =
  'flex h-7 w-14 items-center rounded-full px-1 transition-all';

const inputClass =
  'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white';

/* -------------------------------------------------------------------------- */
/* REUSABLES */
/* -------------------------------------------------------------------------- */

function SectionHeader({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <div className={cn('rounded-2xl p-3', color)}>
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          {title}
        </h3>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

function ToggleRow({
  icon: Icon,
  label,
  value,
  onToggle,
}: {
  icon: React.ComponentType<any>;
  label: string;
  value: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-800/50">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-white p-2 shadow-sm dark:bg-slate-900">
          <Icon className="h-5 w-5 text-indigo-500" />
        </div>

        <span className="font-medium text-slate-900 dark:text-white">
          {label}
        </span>
      </div>

      <button
        onClick={onToggle}
        className={cn(
          toggleClass,
          value ? 'bg-indigo-600' : 'bg-slate-300'
        )}
      >
        <div
          className={cn(
            'h-5 w-5 rounded-full bg-white transition-all',
            value ? 'translate-x-7' : 'translate-x-0'
          )}
        />
      </button>
    </div>
  );
}

function InfoField({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<any>;
  label: string;
  value: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
        {label}
      </label>

      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
        <Icon className="h-4 w-4 text-slate-400" />

        <span className="text-sm text-slate-600 dark:text-slate-300">
          {value}
        </span>
      </div>
    </div>
  );
}

function PasswordField({
  label,
  value,
  visible,
  onToggle,
  onChange,
}: {
  label: string;
  value: string;
  visible: boolean;
  onToggle: () => void;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
        {label}
      </label>

      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
        >
          {visible ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
}

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
  variant?: "primary" | "destructive";
}

export default function ConfirmModal({
  open,
  title,
  description,
  onCancel,
  onConfirm,
  variant = "primary",
}: ConfirmModalProps) {
  
  // Prevent background scrolling when the modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const isDestructive = variant === "destructive";

  return (
    // AnimatePresence MUST wrap the conditional block for the exit animation to work
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          // Backdrop
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm dark:bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel} // Clicking backdrop cancels out
        >
          <motion.div
            // Modal Card
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0,
              transition: { type: "spring", duration: 0.4, bounce: 0.15 } 
            }}
            exit={{ 
              scale: 0.97, 
              opacity: 0, 
              y: 8,
              transition: { duration: 0.2 } 
            }}
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the card
          >
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {title}
            </h3>

            <p className="mt-2.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {description}
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors active:scale-98 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={onConfirm}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all active:scale-98 shadow-sm ${
                  isDestructive
                    ? "bg-rose-600 hover:bg-rose-700 shadow-rose-500/10"
                    : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/10"
                }`}
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// main

export const SettingsPage: React.FC = () => {
  const { user } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  const [showAvatars, setShowAvatars] = useState(false);

  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const [showAvatarConfirm, setShowAvatarConfirm] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    email: '',
    className: '',
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    desktopNotifications: true,
    leaderboardVisibility: true,
    examReminders: true,
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
  });

  useEffect(() => {
    if (!user) return;

    setFormData({
      fullName: user.fullName || '',
      userName: user.userName || '',
      email: user.email || '',
      className: user.className || '',
    });
  }, [user]);

  const profileImage = useMemo(() => {
    if (user?.photoURL) return user.photoURL;

    return null;
  }, [user]);

  const handleAvatarSelect = (url: string) => {
    setSelectedAvatar(url);
    setShowAvatarConfirm(true);
  };

  const handleConfirmAvatar = async () => {
    if (!user || !selectedAvatar) return;

    try {
      const loadingToast = notify.loading(
        'Updating avatar...'
      );

      await updateDoc(doc(db, 'users', user.uid), {
        photoURL: selectedAvatar,
        updatedAt: serverTimestamp(),
      });

      notify.success('Avatar updated successfully.', {
        id: loadingToast,
      });

      setShowAvatarConfirm(false);
      window.location.reload(); // Refresh to show new avatar immediately
    } catch (error) {
      console.error(error);
      notify.error('Failed to update avatar.');
    }
  };

  const handleChangePassword = async () => {
    if (!auth.currentUser || !user?.email) return;

    if (
      !passwords.currentPassword ||
      !passwords.newPassword
    ) {
      notify.error('Please complete all password fields.');
      return;
    }

    try {
      const loadingToast = notify.loading(
        'Updating password...'
      );

      const credential = EmailAuthProvider.credential(
        user.email,
        passwords.currentPassword
      );

      await reauthenticateWithCredential(
        auth.currentUser,
        credential
      );

      await updatePassword(
        auth.currentUser,
        passwords.newPassword
      );

      setPasswords({
        currentPassword: '',
        newPassword: '',
      });

      notify.success('Password updated successfully.', {
        id: loadingToast,
      });
    } catch (error) {
      console.error(error);

      notify.error('Password update failed.');
    }
  };

  const notificationItems = [
    {
      key: 'emailNotifications',
      label: 'Email Notifications',
      icon: Mail,
    },
    {
      key: 'desktopNotifications',
      label: 'Desktop Notifications',
      icon: Monitor,
    },
    {
      key: 'examReminders',
      label: 'Exam Reminders',
      icon: Smartphone,
    },
    {
      key: 'leaderboardVisibility',
      label: 'Leaderboard Visibility',
      icon: BadgeCheck,
    },
  ];

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
      <div className="space-y-8 pb-10">
        {/* HEADER */}

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Settings
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Manage your account preferences, security,
            notifications and profile.
          </p>
        </div>

        {/* LAYOUT */}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* PROFILE */}

          <div className={sectionClass}>
            <div className="flex flex-col items-center text-center">
              {/* PROFILE IMAGE */}

              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-28 w-28 rounded-full border-4 border-indigo-500 object-cover"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-indigo-600 text-4xl font-bold text-white">
                  {user?.userName?.[0]?.toUpperCase()}
                </div>
              )}

              <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                {user?.fullName}
              </h2>

              <p className="mt-1 text-sm capitalize text-slate-500 dark:text-slate-400">
                {user?.rank}
              </p>

              {/* AVATARS */}

              <button
                onClick={() =>
                  setShowAvatars((prev) => !prev)
                }
                className="mt-6 flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >
                <Palette className="h-4 w-4" />
                Choose Avatar
              </button>

              <AnimatePresence>
                {showAvatars && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: 1,
                      height: 'auto',
                    }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 grid grid-cols-3 gap-3 overflow-hidden"
                  >
                    {avatars.map((avatar) => (
                      <button
                        key={avatar.id}
                        onClick={() =>
                          handleAvatarSelect(avatar.url)
                        }
                        className="group relative"
                      >
                        <img
                          src={avatar.url}
                          alt={avatar.id}
                          className="h-20 w-20 rounded-2xl border-2 border-transparent object-cover transition-all duration-200 group-hover:border-indigo-500 group-hover:scale-105"
                        />

                        {user?.photoURL === avatar.url && (
                          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40">
                            <Check className="h-6 w-6 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* GUIDELINES */}

              <div className="mt-6 w-full rounded-2xl bg-indigo-50 p-4 text-left dark:bg-indigo-900/20">
                <p className="text-xs font-semibold uppercase tracking-widest text-indigo-700 dark:text-indigo-300">
                  Avatar System
                </p>

                <p className="mt-2 text-sm leading-relaxed text-indigo-800 dark:text-indigo-200">
                  Select a predefined avatar for a cleaner,
                  safer and more consistent profile experience.
                </p>
              </div>
            </div>
          </div>

          {/* MAIN SETTINGS */}

          <div className="space-y-8 lg:col-span-2">
            {/* PERSONAL */}

            <div className={sectionClass}>
              <SectionHeader
                icon={User}
                title="Personal Information"
                description="Your public profile details"
                color="bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <InfoField
                  icon={UserCheck}
                  label="Full Name"
                  value={formData.fullName}
                />

                <InfoField
                  icon={UserCheck}
                  label="Username"
                  value={formData.userName}
                />

                <InfoField
                  icon={Mail}
                  label="Email"
                  value={formData.email}
                />

                <InfoField
                  icon={School}
                  label="Class"
                  value={formData.className}
                />
              </div>
            </div>

            {/* APPEARANCE */}

            <div className={sectionClass}>
              <SectionHeader
                icon={theme === 'dark' ? Moon : Sun}
                title="Appearance"
                description="Customize the application interface"
                color="bg-amber-50 text-amber-500 dark:bg-amber-900/30"
              />

              <button
                onClick={toggleTheme}
                className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 transition hover:border-indigo-500 dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-white p-2 shadow-sm dark:bg-slate-900">
                    {theme === 'dark' ? (
                      <Moon className="h-5 w-5 text-indigo-500" />
                    ) : (
                      <Sun className="h-5 w-5 text-amber-500" />
                    )}
                  </div>

                  <div className="text-left">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Theme Mode
                    </p>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Current: {theme}
                    </p>
                  </div>
                </div>

                <div
                  className={cn(
                    toggleClass,
                    theme === 'dark'
                      ? 'bg-indigo-600'
                      : 'bg-slate-300'
                  )}
                >
                  <div
                    className={cn(
                      'h-5 w-5 rounded-full bg-white transition-all',
                      theme === 'dark'
                        ? 'translate-x-7'
                        : 'translate-x-0'
                    )}
                  />
                </div>
              </button>
            </div>

            {/* NOTIFICATIONS */}

            <div className={sectionClass}>
              <SectionHeader
                icon={Bell}
                title="Notifications"
                description="Control alerts and reminders"
                color="bg-emerald-50 text-emerald-500 dark:bg-emerald-900/30"
              />

              <div className="space-y-4">
                {notificationItems.map((item) => (
                  <ToggleRow
                    key={item.key}
                    icon={item.icon}
                    label={item.label}
                    value={
                      preferences[
                        item.key as keyof typeof preferences
                      ]
                    }
                    onToggle={() =>
                      setPreferences((prev) => ({
                        ...prev,
                        [item.key]:
                          !prev[
                            item.key as keyof typeof preferences
                          ],
                      }))
                    }
                  />
                ))}
              </div>
            </div>

            {/* SECURITY */}

            <div className={sectionClass}>
              <SectionHeader
                icon={Shield}
                title="Security"
                description="Manage your account credentials"
                color="bg-red-50 text-red-500 dark:bg-red-900/30"
              />

              <div className="space-y-6">
                <PasswordField
                  label="Current Password"
                  value={passwords.currentPassword}
                  visible={showCurrentPassword}
                  onToggle={() =>
                    setShowCurrentPassword((prev) => !prev)
                  }
                  onChange={(value) =>
                    setPasswords((prev) => ({
                      ...prev,
                      currentPassword: value,
                    }))
                  }
                />

                <PasswordField
                  label="New Password"
                  value={passwords.newPassword}
                  visible={showNewPassword}
                  onToggle={() =>
                    setShowNewPassword((prev) => !prev)
                  }
                  onChange={(value) =>
                    setPasswords((prev) => ({
                      ...prev,
                      newPassword: value,
                    }))
                  }
                />

                <button
                  onClick={handleChangePassword}
                  className="flex items-center gap-2 rounded-2xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                  <KeyRound className="h-5 w-5" />
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL */}

        <ConfirmModal
          open={showAvatarConfirm}
          title="Use this avatar?"
          description="This avatar will become your new profile picture."
          onCancel={() => setShowAvatarConfirm(false)}
          onConfirm={handleConfirmAvatar}
        />
      </div>

    </motion.div>
    
  );
};