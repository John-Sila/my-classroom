import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { XCircle } from 'lucide-react';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from './lib/firebase';
import { useAuth } from './hooks/useAuth';
import { useAuthStore } from './store/useStore';
import { ProtectedRoute, RoleGuard } from './components/ProtectedRoute';
import { MainLayout } from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import AdminSetup from './pages/AdminSetup';
import { FirestoreService } from './services/firestore';
import { useEffect, useState } from 'react';
import type { UserProfile } from './types';

import TeacherDashboard from './pages/TeacherDashboard';
import LearnerDashboard from './pages/LearnerDashboard';
import CreateTest from './pages/CreateTest';
import ManageUsers from './pages/ManageUsers';
import TakeTest from './pages/TakeTest';
import TestResults from './pages/TestResults';
import AnalyticsPage from './pages/AnalyticsPage';
import AvailableTests from './pages/AvailableTests';
import MyResults from './pages/MyResults';

const Unauthorized = () => <div className="flex flex-col items-center justify-center h-full text-center p-12 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-soft">
  <XCircle className="text-red-500 mb-4" size={64} />
  <h2 className="text-3xl font-black uppercase tracking-tight mb-2">Access Denied!</h2>
  <p className="text-slate-500 font-medium">You do not have permission to access this educational resource.</p>
</div>;

export default function App() {
  useAuth();
  const { user, loading } = useAuthStore();
  const [hasNoUsers, setHasNoUsers] = useState<boolean | null>(null);

  useEffect(() => {
    const checkUsers = async () => {
      try {
        // Attempt to fetch learners and teachers. 
        // If we get a permission error, it means the app is already secured and likely has users.
        const learners = await FirestoreService.getAllLearners();
        const teachersQ = query(collection(db, 'users'), where('rank', '==', 'teacher'));
        const teachersSnap = await getDocs(teachersQ);
        
        setHasNoUsers(learners.length === 0 && teachersSnap.empty);
      } catch (error: any) {
        // "Missing or insufficient permissions" usually means rules are active and we are unauthenticated.
        // In this case, we assume the app is already set up.
        console.log('Database secured/already setup:', error.message);
        setHasNoUsers(false);
      }
    };
    
    // Only perform check if we aren't loading and don't already have a user
    if (!loading && !user) {
      checkUsers();
    } else if (user) {
      setHasNoUsers(false);
    }
  }, [loading, user]);

  if (loading || hasNoUsers === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (hasNoUsers) {
    return <AdminSetup />;
  }

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            {user?.rank === 'teacher' ? <Navigate to="/teacher" replace /> : <Navigate to="/learner" replace />}
          </ProtectedRoute>
        } />

        {/* Teacher Routes */}
        <Route path="/teacher" element={
          <ProtectedRoute>
            <RoleGuard allowedRank="teacher">
              <MainLayout><TeacherDashboard /></MainLayout>
            </RoleGuard>
          </ProtectedRoute>
        } />
        <Route path="/teacher/create-test" element={
          <ProtectedRoute>
            <RoleGuard allowedRank="teacher">
              <MainLayout><CreateTest /></MainLayout>
            </RoleGuard>
          </ProtectedRoute>
        } />
        <Route path="/teacher/users" element={
          <ProtectedRoute>
            <RoleGuard allowedRank="teacher">
              <MainLayout><ManageUsers /></MainLayout>
            </RoleGuard>
          </ProtectedRoute>
        } />
        <Route path="/teacher/analytics" element={
          <ProtectedRoute>
            <RoleGuard allowedRank="teacher">
              <MainLayout><AnalyticsPage /></MainLayout>
            </RoleGuard>
          </ProtectedRoute>
        } />

        {/* Learner Routes */}
        <Route path="/learner" element={
          <ProtectedRoute>
            <RoleGuard allowedRank="learner">
              <MainLayout><LearnerDashboard /></MainLayout>
            </RoleGuard>
          </ProtectedRoute>
        } />
        <Route path="/learner/tests" element={
          <ProtectedRoute>
            <RoleGuard allowedRank="learner">
              <MainLayout><AvailableTests /></MainLayout>
            </RoleGuard>
          </ProtectedRoute>
        } />
        <Route path="/learner/take-test/:testId" element={
          <ProtectedRoute>
            <RoleGuard allowedRank="learner">
              <MainLayout><TakeTest /></MainLayout>
            </RoleGuard>
          </ProtectedRoute>
        } />
        <Route path="/learner/results/:attemptId" element={
          <ProtectedRoute>
            <RoleGuard allowedRank="learner">
              <MainLayout><TestResults /></MainLayout>
            </RoleGuard>
          </ProtectedRoute>
        } />
        <Route path="/learner/results" element={
          <ProtectedRoute>
            <RoleGuard allowedRank="learner">
              <MainLayout><MyResults /></MainLayout>
            </RoleGuard>
          </ProtectedRoute>
        } />

        <Route path="/unauthorized" element={<MainLayout><Unauthorized /></MainLayout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
