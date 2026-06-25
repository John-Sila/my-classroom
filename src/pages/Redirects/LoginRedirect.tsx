import { useAuthStore } from "@/src/store/authStore";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export function LoginRedirect({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthStore();
  const location = useLocation();

  if (loading) return null; // or your loader

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}