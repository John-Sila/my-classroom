import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { UserRank } from '../types';
import {
  GraduationCap,
  UserCheck,
  BookOpen,
  CalendarDays,
  NotebookPen,
} from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRanks?: UserRank[];
}

function ClassroomLoader() {
  const steps = [
    { icon: UserCheck,    label: 'Auth',     color: 'text-indigo-500 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950/40' },
    { icon: GraduationCap,label: 'Classes',  color: 'text-indigo-500 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950/40' },
    { icon: NotebookPen,  label: 'Grades',   color: 'text-emerald-500 dark:text-emerald-400',bg: 'bg-emerald-50 dark:bg-emerald-950/40'},
    { icon: CalendarDays, label: 'Schedule', color: 'text-amber-500 dark:text-amber-400',   bg: 'bg-amber-50 dark:bg-amber-950/40'   },
  ];

  return (
    <div className="min-h-dvh flex items-center justify-center
      bg-slate-50 dark:bg-slate-950 font-sans">
      <div className="flex flex-col items-center gap-8">

        {/* Icon + spinner ring */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50
              flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="absolute -inset-1.5 rounded-[20px]
              border-2 border-transparent
              border-t-indigo-500 border-r-indigo-300/40
              animate-spin" />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight">
              Preparing your classroom
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              Verifying your access credentials
            </p>
          </div>
        </div>

        {/* Step indicators */}
        <div className="grid grid-cols-4 gap-2">
          {steps.map(({ icon: Icon, label, color, bg }, i) => (
            <div
              key={label}
              className={`flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl
                border border-slate-200/70 dark:border-slate-800/70
                bg-white dark:bg-slate-900
                animate-[fadeUp_0.3s_ease_both]`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`p-1.5 rounded-lg ${bg}`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider
                text-slate-400 dark:text-slate-500">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Sliding progress bar */}
        <div className="w-48 h-0.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div className="h-full w-2/5 rounded-full bg-indigo-500
            animate-[loaderSlide_1.6s_ease-in-out_infinite]" />
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-600 animate-pulse tracking-wide">
          Loading your workspace…
        </p>
      </div>

      <style>{`
        @keyframes loaderSlide {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(320%); }
          100% { transform: translateX(320%); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRanks }) => {
  const { user, loading } = useAuthStore();
  const location = useLocation();

  if (loading) return <ClassroomLoader />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRanks && !allowedRanks.includes(user.rank)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};