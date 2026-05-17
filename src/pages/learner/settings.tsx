import React, { useEffect, useRef, useState } from 'react';
import {
  Camera,
  Save,
  User,
  Shield,
  Moon,
  Sun,
  Bell,
  KeyRound,
  Loader2,
  Mail,
  School,
  BadgeCheck,
  LogOut,
  Trash2,
  Smartphone,
  Monitor,
  Eye,
  EyeOff,
  UserCheck,
} from 'lucide-react';

import {
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';

import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';


import { db, auth, storage } from '../../firebase/config';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import { cn } from '../../lib/utils';
import { notify } from '@/src/utils/toast';

export const SettingsPage: React.FC = () => {
    const { user } = useAuthStore();
    const { theme, toggleTheme } = useThemeStore();

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [isSaving, setIsSaving] = useState(false);
    const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

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

    const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

    const handleUploadPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!user) return;

      const file = event.target.files?.[0];
      if (!file) return;

      const loadingToast = notify.loading("Uploading profile photo...");
      setIsUploadingPhoto(true);

      try {
        // 1. Fetch user doc for rate limiting
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          throw new Error("User profile not found");
        }

        const userData = userSnap.data();
        const lastUpdate = userData?.lastPhotoUpdate?.toDate?.();

        if (lastUpdate && Date.now() - lastUpdate.getTime() < ONE_WEEK_MS) {
          throw new Error("You can only update your profile photo once every 7 days.");
        }

        // 2. Upload to Cloudinary (unsigned)
        const formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();

        if (!res.ok) {
          console.error("Cloudinary error:", data);
          throw new Error(data?.error?.message || "Cloudinary upload failed");
        }

        // 3. Update Firestore
        await updateDoc(userRef, {
          photoURL: data.secure_url,
          lastPhotoUpdate: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        notify.updateSuccess(loadingToast, "Profile photo updated.");
        window.location.reload();
      } catch (err) {
        console.error(err);

        notify.updateError(
          loadingToast,
          err instanceof Error ? err.message : "Failed to upload image"
        );
      } finally {
        setIsUploadingPhoto(false);
      }
    };

    const handleChangePassword = async () => {
      if (!auth.currentUser || !user?.email) return;

      if (!passwords.currentPassword || !passwords.newPassword) {
        notify.error('Please complete all password fields.');
        return;
      }

      try {
        const loadingToast = notify.loading('Updating password...');

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

    return (
      <div className="space-y-8 pb-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Settings
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Manage your account preferences, security, notifications and profile.
          </p>
        </div>

        {/* Profile Section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="h-28 w-28 rounded-full border-4 border-indigo-500 object-cover"
                  />
                ) : (
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-indigo-600 text-4xl font-bold text-white">
                    {user?.userName?.[0]?.toUpperCase()}
                  </div>
                )}

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-1 right-1 rounded-full bg-indigo-600 p-2 text-white shadow-lg transition hover:bg-indigo-700"
                >
                  {isUploadingPhoto ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Camera className="h-4 w-4" />
                  )}
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleUploadPhoto}
                />
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                {user?.fullName}
              </h2>

              <p className="mt-1 text-sm capitalize text-slate-500 dark:text-slate-400">
                {user?.rank}
              </p>

              <div className="mt-6 w-full rounded-2xl bg-amber-50 p-4 text-left dark:bg-amber-900/20">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-300">
                  Profile Image Guidelines
                </p>

                <p className="mt-2 text-sm leading-relaxed text-amber-800 dark:text-amber-200">
                  Use a clear and professional image. Avoid inappropriate,
                  heavily filtered, blurry or misleading photos.
                </p>
              </div>
            </div>
          </div>

          {/* Editable Settings */}
          <div className="space-y-8 lg:col-span-2">
            {/* Personal Info */}
            <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-8 flex items-center gap-3">
                <div className="rounded-2xl bg-indigo-50 p-3 dark:bg-indigo-900/30">
                  <User className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Personal Information
                  </h3>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Your public profile details
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Full Name
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                    <UserCheck className="h-4 w-4 text-slate-400" />

                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {formData.fullName}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Username
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                    <UserCheck className="h-4 w-4 text-slate-400" />

                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {formData.userName}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Email
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                    <Mail className="h-4 w-4 text-slate-400" />

                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {formData.email}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Class
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                    <School className="h-4 w-4 text-slate-400" />

                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {formData.className}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Appearance */}
            <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-8 flex items-center gap-3">
                <div className="rounded-2xl bg-amber-50 p-3 dark:bg-amber-900/30">
                  {theme === 'dark' ? (
                    <Moon className="h-5 w-5 text-amber-500" />
                  ) : (
                    <Sun className="h-5 w-5 text-amber-500" />
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Appearance
                  </h3>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Customize the application interface
                  </p>
                </div>
              </div>

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
                    'h-7 w-14 rounded-full transition-all',
                    theme === 'dark'
                      ? 'bg-indigo-600'
                      : 'bg-slate-300'
                  )}
                >
                  <div
                    className={cn(
                      'mt-1 h-5 w-5 rounded-full bg-white transition-all',
                      theme === 'dark'
                        ? 'translate-x-8'
                        : 'translate-x-1'
                    )}
                  />
                </div>
              </button>
            </div>

            {/* Notifications */}
            <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-8 flex items-center gap-3">
                <div className="rounded-2xl bg-emerald-50 p-3 dark:bg-emerald-900/30">
                  <Bell className="h-5 w-5 text-emerald-500" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Notifications
                  </h3>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Control alerts and reminders
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
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
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-800/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-xl bg-white p-2 shadow-sm dark:bg-slate-900">
                        <item.icon className="h-5 w-5 text-indigo-500" />
                      </div>

                      <span className="font-medium text-slate-900 dark:text-white">
                        {item.label}
                      </span>
                    </div>
                  <button
                    onClick={() =>
                      setPreferences((prev) => ({
                        ...prev,
                        [item.key]: !prev[item.key as keyof typeof preferences],
                      }))
                    }
                    className={cn(
                      'flex h-7 w-14 items-center rounded-full px-1 transition-all',
                      preferences[item.key as keyof typeof preferences]
                        ? 'bg-indigo-600'
                        : 'bg-slate-300'
                    )}
                  >
                    <div
                      className={cn(
                        'h-5 w-5 rounded-full bg-white transition-all',
                        preferences[item.key as keyof typeof preferences]
                          ? 'translate-x-7'
                          : 'translate-x-0'
                      )}
                    />
                  </button>

                  </div>
                ))}
              </div>
            </div>

            {/* Security */}
            <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-8 flex items-center gap-3">
                <div className="rounded-2xl bg-red-50 p-3 dark:bg-red-900/30">
                  <Shield className="h-5 w-5 text-red-500" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Security
                  </h3>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Manage your account credentials
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Current Password
                  </label>

                  <div className="relative">
                    <input
                      type={
                        showCurrentPassword ? 'text' : 'password'
                      }
                      value={passwords.currentPassword}
                      onChange={(e) =>
                        setPasswords((prev) => ({
                          ...prev,
                          currentPassword: e.target.value,
                        }))
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword((prev) => !prev)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    New Password
                  </label>

                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwords.newPassword}
                      onChange={(e) =>
                        setPasswords((prev) => ({
                          ...prev,
                          newPassword: e.target.value,
                        }))
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowNewPassword((prev) => !prev)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

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
      </div>
    );
};