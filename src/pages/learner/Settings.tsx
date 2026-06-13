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

  // others
  { id: 'avatar-41', url: 'https://static.vecteezy.com/system/resources/previews/072/335/469/non_2x/spiderman-hero-pose-image-without-background-in-good-quality-free-png.png' },
  { id: 'avatar-42', url: 'https://purepng.com/public/uploads/large/purepng.com-spidermanspider-manspidermansuperherocomic-bookmarvel-comicscharacterstan-lee-1701528655675wjtla.png' },
  { id: 'avatar-43', url: 'https://images.seeklogo.com/logo-png/42/2/spiderman-face-logo-png_seeklogo-426612.png' },
  { id: 'avatar-44', url: 'https://i.pinimg.com/originals/1e/ca/95/1eca95a9e9c9edd1a1a331a5917a024b.png' },
  { id: 'avatar-45', url: 'https://www.pngarts.com/files/5/User-Avatar-Free-PNG-Image.png' },
  { id: 'avatar-46', url: 'https://cdn-icons-png.flaticon.com/512/9192/9192877.png' },
  { id: 'avatar-47', url: 'https://s.namemc.com/3d/skin/body.png?id=c30c62bce523c062&model=classic&width=308&height=308' },
  { id: 'avatar-48', url: 'https://i.pinimg.com/originals/4f/7a/68/4f7a6834b3b7fb57349499c5c9efd87b.png' },
  { id: 'avatar-49', url: 'https://www.pngall.com/wp-content/uploads/13/Roblox-Avatar-No-Background.png' },
  { id: 'avatar-50', url: 'https://png.pngtree.com/png-clipart/20221222/ourmid/pngtree-flat-style-winter-sports-characters-png-image_6491759.png' },
  { id: 'avatar-51', url: 'https://png.pngtree.com/png-vector/20241228/ourmid/pngtree-sports-avatar-bright-red-and-white-outfit-holding-basketball-wearing-sporty-png-image_14855385.png' },
  { id: 'avatar-52', url: 'https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-sports-boy-png-image_6514641.png' },
  { id: 'avatar-53', url: 'https://static.vecteezy.com/system/resources/thumbnails/059/627/973/small/dramatic-abstract-concentrated-chess-player-making-a-move-exclusive-free-png.png' },
  { id: 'avatar-54', url: 'https://static.vecteezy.com/system/resources/thumbnails/060/548/261/small/serene-unforgettable-ultra-detailed-isolated-cutout-of-a-single-stylized-chess-piece-king-made-of-carved-ivory-professional-render-with-transparent-background-free-png.png' },
  { id: 'avatar-55', url: 'https://static.vecteezy.com/system/resources/thumbnails/048/096/269/small/3d-chess-knight-piece-isolated-on-transparent-background-png.png' },
  { id: 'avatar-56', url: 'https://png.pngtree.com/png-vector/20240202/ourmid/pngtree-bussinesman-cartoon-avatar-png-image_11591523.png' },
  { id: 'avatar-57', url: 'https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Transparent-Background.png' },
  { id: 'avatar-58', url: 'https://png.pngtree.com/png-vector/20250512/ourmid/pngtree-default-avatar-profile-icon-gray-placeholder-vector-png-image_16213764.png' },
  { id: 'avatar-59', url: 'https://png.pngtree.com/png-vector/20240613/ourmid/pngtree-cute-cartoon-robot-face-avatar-with-new-normal-life-png-image_12710973.png' },
  { id: 'avatar-60', url: 'https://png.pngtree.com/png-vector/20250404/ourmid/pngtree-a-cool-robot-avatar-stylized-vector-art-humanoid-design-sleek-metallic-png-image_15927651.png' },
  { id: 'avatar-61', url: 'https://png.pngtree.com/png-vector/20250408/ourmid/pngtree-a-beautiful-cool-robot-avatar-vector-png-image_15952925.png' },
  { id: 'avatar-62', url: 'https://png.pngtree.com/png-vector/20250709/ourmid/pngtree-focused-vr-user-with-neon-glowing-high-tech-headset-png-image_16619207.webp' },
  { id: 'avatar-63', url: 'https://png.pngtree.com/png-vector/20250709/ourmid/pngtree-futuristic-avatar-with-high-tech-headset-and-mechanical-gloves-png-image_16619245.webp' },
  { id: 'avatar-64', url: 'https://png.pngtree.com/png-vector/20250709/ourmid/pngtree-futuristic-cartoon-avatar-in-action-using-vr-technology-png-image_16619246.webp' },
  { id: 'avatar-65', url: 'https://png.pngtree.com/png-vector/20230830/ourmid/pngtree-3d-character-metaverse-virtual-flying-png-image_9189986.png' },
  { id: 'avatar-66', url: 'https://static.vecteezy.com/system/resources/previews/022/484/111/non_2x/sneaky-3d-burglar-girl-lovable-and-engaging-character-for-kids-games-and-stories-transparent-background-free-png.png' },
  { id: 'avatar-67', url: 'https://static.vecteezy.com/system/resources/thumbnails/070/221/009/small/cartoon-character-enthusiastically-working-on-laptop-while-comfortably-seated-in-gaming-chair-with-png.png' },
  { id: 'avatar-68', url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/df300794-5331-494c-a6b7-42e05c98059a/dghwo43-104a0691-5a6f-445b-8357-db3123e30972.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiIvZi9kZjMwMDc5NC01MzMxLTQ5NGMtYTZiNy00MmUwNWM5ODA1OWEvZGdod280My0xMDRhMDY5MS01YTZmLTQ0NWItODM1Ny1kYjMxMjNlMzA5NzIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.swze-WJaglmkHE9m2hOQ0uTYQGV8M4dUyA2w4milels' },
  { id: 'avatar-69', url: 'https://png.pngtree.com/png-vector/20250128/ourmid/pngtree-skater-in-motion-image-white-background-png-image_15361635.png' },
  { id: 'avatar-70', url: 'https://static.vecteezy.com/system/resources/thumbnails/053/488/709/small_2x/silhouette-of-balerina-isolated-on-transparent-background-png.png' },
  { id: 'avatar-71', url: 'https://png.pngtree.com/png-vector/20240605/ourmid/pngtree-elegant-ballerina-gracefully-performing-a-pirouette-with-arms-extended-png-image_12514062.png' },
  { id: 'avatar-72', url: 'https://static.vecteezy.com/system/resources/previews/033/983/885/non_2x/pose-of-karate-silhouette-with-transparent-background-free-png.png' },
  { id: 'avatar-73', url: 'https://static.vecteezy.com/system/resources/previews/038/265/056/non_2x/ai-generated-karate-fighter-in-cartoon-style-on-transparent-background-free-png.png' },
  { id: 'avatar-74', url: 'https://cdn.pixabay.com/photo/2025/02/25/19/51/ai-generated-9431491_1280.png' },
  { id: 'avatar-75', url: 'https://png.pngtree.com/png-vector/20240314/ourmid/pngtree-cartoon-rugby-players-action-male-player-png-image_11954236.png' },
  { id: 'avatar-76', url: 'https://png.pngtree.com/png-vector/20250408/ourmid/pngtree-colorful-silhouette-of-a-football-player-kicking-soccer-ball-png-image_15950149.png' },
  { id: 'avatar-77', url: 'https://static.vecteezy.com/system/resources/thumbnails/066/118/641/small_2x/manchester-city-fc-badge-logo-transparent-background-football-club-icon-digital-download-free-png.png' },
  { id: 'avatar-78', url: 'https://png.pngtree.com/png-vector/20250702/ourmid/pngtree-badminton-player-in-action-clipart-png-image_16596992.webp' },
  { id: 'avatar-79', url: 'https://png.pngtree.com/png-vector/20230918/ourmid/pngtree-badminton-player-png-png-image_10125216.png' },
  { id: 'avatar-80', url: 'https://png.pngtree.com/png-clipart/20220826/ourmid/pngtree-volleyball-player-red-custom-png-image_6124936.png' },
  { id: 'avatar-81', url: 'https://png.pngtree.com/png-vector/20240423/ourmid/pngtree-volleyball-player-serving-a-ball-creative-art-png-image_12310523.png' },
  { id: 'avatar-82', url: 'https://upload.wikimedia.org/wikipedia/sco/thumb/7/7a/Manchester_United_FC_crest.svg/3840px-Manchester_United_FC_crest.svg.png' },
  { id: 'avatar-83', url: 'https://png.pngtree.com/png-vector/20250429/ourmid/pngtree-young-male-chef-3d-avatar-png-image_16049539.png' },
  { id: 'avatar-84', url: 'https://png.pngtree.com/png-vector/20250429/ourmid/pngtree-young-3d-female-chef-avatar-png-image_16049521.png' },
  { id: 'avatar-85', url: 'https://png.pngtree.com/png-vector/20240613/ourmid/pngtree-innocent-penguins-of-madagascar-character-png-image_12736971.png' },
  { id: 'avatar-86', url: 'https://lh5.googleusercontent.com/proxy/YGE4rw9BEibfBxBAQ7cRVe9yEckccwpCQg3xmSe-5Mb8l3Y64-NFVXGcZFy8sF66O4f9dcbEBdpYZRHkWx6afGQJo_DVckFqIxvK8w2YmNw8' },
  { id: 'avatar-87', url: 'https://www.pngplay.com/wp-content/uploads/14/Tom-And-Jerry-Friends-Transparent-Background.png' },
  { id: 'avatar-88', url: 'https://png.pngtree.com/png-vector/20231213/ourmid/pngtree-table-tennis-players-feel-strong-and-strong-exercise-games-png-image_11330816.png' },
  { id: 'avatar-89', url: 'https://cdn3d.iconscout.com/3d/premium/thumb/pilot-avatar-3d-icon-png-download-12341367.png' },
  { id: 'avatar-90', url: 'https://png.pngtree.com/png-vector/20250911/ourmid/pngtree-d-female-pilot-character-with-flight-suit-hat-and-bright-smile-png-image_17406524.webp' },
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
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
        >
          <div className="relative h-5 w-5 overflow-hidden">
            <Eye
              className={`absolute h-5 w-5 transition-all duration-300 ease-out ${
                visible ? "translate-y-5 opacity-0" : "translate-y-0 opacity-100"
              }`}
            />
            <EyeOff
              className={`absolute h-5 w-5 transition-all duration-300 ease-out ${
                visible ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"
              }`}
            />
          </div>
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

    const loadingToast = notify.loading(
      'Updating password...'
    );
    try {
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

      notify.error('Password updated successfully.', {
        id: loadingToast,
      });
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
