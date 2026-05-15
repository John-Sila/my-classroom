import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { UserRank } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRanks?: UserRank[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRanks }) => {
  const { user, loading } = useAuthStore();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-indigo-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRanks && !allowedRanks.includes(user.rank)) {
    // Redirect to dashboard of their own rank if unauthorized
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
