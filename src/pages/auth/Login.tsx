import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { auth, db } from '../../firebase/config';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { getAuthErrorMessage } from '@/src/utils/authErrors';
import { notify } from '@/src/utils/toast';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine fallback routes dynamically based on where they tried to access
  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || isLoading) return;
    
    setIsLoading(true);
    const loader = notify.loading('Signing in...');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 1. Update metadata. 
      // If this fails frequently on first logins, ensure your Firestore Rules allow it!
      try {
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, {
          lastLogin: Timestamp.now(),
          updatedAt: Timestamp.now()
        });
      } catch (err) {
        notify.info('Logged in, but failed to sync meta data.');
      }

      
      // 2. Fallback to '/dashboard' instead of '/' if from is not explicitly set.
      // This prevents landing on a ambiguous root route that might trigger a re-route loop.
      const destination = location.state?.from?.pathname || '/dashboard';
      
      // 3. Navigate immediately. React Router v6 handle state updates gracefully 
      // without needing arbitrary setTimeout macro-tasks.
      navigate(destination, { replace: true });
      notify.updateSuccess(loader, 'Successfully logged in!');

    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error.code) || 'Authentication failed';
      notify.updateError(loader, errorMessage);
    } finally {
      // Only set loading to false if we are actually staying on this page.
      // If we are navigating away, leaving it true avoids flashing the form inputs again.
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 transition-colors duration-300">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none mb-4 transform hover:rotate-12 transition-transform cursor-pointer">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Teacher Sila's</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Modern Classroom Platform</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none p-8 border border-slate-100 dark:border-slate-800 transition-colors">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Welcome Back</h2>
          
          <form onSubmit={handleLogin} className="space-y-5 text-left">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all sm:text-sm"
                  placeholder="name@example.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all sm:text-sm"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-xl shadow-lg shadow-indigo-100 dark:shadow-none transition-all duration-200 group cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-4 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
               Teacher access: Use your admin credentials.<br/>
               Learner access: Contact your teacher for account details.
            </p>
          </div>
        </div>
        
        <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-500">
          © {new Date().getFullYear()} Teacher Sila’s Classroom. All rights reserved.
        </p>
      </div>
    </div>
  );
};