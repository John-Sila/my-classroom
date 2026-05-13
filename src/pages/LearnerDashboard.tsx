import React, { useEffect, useState } from 'react';
import { 
  Trophy, 
  FileText, 
  Clock, 
  ChevronRight, 
  Calendar,
  AlertCircle,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { FirestoreService } from '../services/firestore';
import { useAuthStore } from '../store/useStore';
import type { Test, TestAttempt } from '../types';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function LearnerDashboard() {
  const { user } = useAuthStore();
  const [tests, setTests] = useState<Test[]>([]);
  const [attempts, setAttempts] = useState<TestAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      // Fetch tests for user's class
      const testsQ = query(collection(db, 'tests'), where('className', '==', user.className));
      const testsSnap = await getDocs(testsQ);
      const testsData = testsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Test[];
      setTests(testsData);

      // Fetch user's attempts
      const attemptsQ = query(collection(db, 'testAttempts'), where('uid', '==', user.uid), orderBy('submittedAt', 'asc'));
      const attemptsSnap = await getDocs(attemptsQ);
      const attemptsData = attemptsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })) as TestAttempt[];
      setAttempts(attemptsData);
      
      setIsLoading(false);
    };
    fetchData();
  }, [user]);

  const activeTests = tests.filter(t => {
    const now = new Date();
    const endTime = t.endTime?.toDate ? t.endTime.toDate() : new Date(t.endTime);
    return t.isActive && now < endTime;
  });

  const completedAttempts = attempts.filter(a => a.isSubmitted);
  const avgScore = completedAttempts.length > 0 
    ? (completedAttempts.reduce((acc, curr) => acc + curr.percentage, 0) / completedAttempts.length).toFixed(1)
    : 0;

  const chartData = completedAttempts.map(a => ({
    date: a.submittedAt?.toDate ? format(a.submittedAt.toDate(), 'MMM d') : 'Unknown',
    score: a.percentage,
    name: a.testName
  }));

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-32 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-3xl" />
          <div className="h-64 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-blue-500/20">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">Welcome back, {user?.userName}! 👋</h1>
          <p className="text-blue-100 text-lg opacity-90 leading-relaxed font-medium">
            You've completed <span className="text-white font-bold">{completedAttempts.length}</span> tests so far with an average score of <span className="text-white font-bold">{avgScore}%</span>. Keep up the great work!
          </p>
        </div>
        <div className="absolute top-0 right-0 p-8 hidden lg:block opacity-20">
          <Trophy size={160} />
        </div>
        {/* Background decorations */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-10 -right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Active Tests */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <AlertCircle className="text-blue-500" />
              Available Tests
            </h2>
            <button 
              onClick={() => navigate('/learner/tests')} 
              className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              See all <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeTests.length === 0 ? (
              <div className="col-span-full bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 p-12 rounded-3xl text-center">
                <FileText className="mx-auto text-slate-300 mb-4" size={48} />
                <p className="text-slate-500 font-medium">No tests currently available for your class.</p>
              </div>
            ) : (
              activeTests.map((test, index) => {
                const attempt = attempts.find(a => a.testId === test.id);
                const isCompleted = attempt?.isSubmitted;

                return (
                  <motion.div
                    key={test.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-soft border group transition-all h-full flex flex-col justify-between",
                      isCompleted ? "border-slate-100 dark:border-slate-800 opacity-80" : "border-blue-100 dark:border-blue-900 ring-offset-4 ring-offset-slate-50 hover:ring-2 hover:ring-blue-500/20"
                    )}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className={cn("p-2.5 rounded-2xl", isCompleted ? "bg-slate-100 text-slate-500" : "bg-blue-100 text-blue-600")}>
                          <FileText size={20} />
                        </div>
                        {isCompleted && (
                          <span className="flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-600 text-[10px] font-bold uppercase tracking-wider rounded-lg">
                            <CheckCircle2 size={12} />
                            Completed
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{test.testName}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-medium mb-6">
                        <span className="flex items-center gap-1.5"><Clock size={16} /> {test.durationMinutes}m</span>
                        <span className="flex items-center gap-1.5"><Calendar size={16} /> {format(test.endTime.toDate(), 'MMMM d, h:mm a')}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => !isCompleted && navigate(`/learner/take-test/${test.id}`)}
                      disabled={isCompleted}
                      className={cn(
                        "w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all",
                        isCompleted 
                          ? "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed" 
                          : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 active:scale-95"
                      )}
                    >
                      {isCompleted ? "Already Submitted" : "Start Examination"}
                      {!isCompleted && <ChevronRight size={18} />}
                    </button>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Analytics */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 px-2">
            <TrendingUp className="text-indigo-500" />
            Performance
          </h2>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-soft border border-slate-100 dark:border-slate-800">
            <div className="h-56 w-full">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                     <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="date" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis fontSize={10} axisLine={false} tickLine={false} unit="%" />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    />
                    <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                  <TrendingUp size={32} />
                  <p className="text-sm font-medium">No results to show yet.</p>
                </div>
              )}
            </div>
            <p className="text-xs text-center text-slate-500 mt-4 font-medium uppercase tracking-wider">Score Trend (Last {completedAttempts.length} tests)</p>
          </div>

          <div className="bg-indigo-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-900/40">
            <h3 className="font-bold text-indigo-900 dark:text-indigo-300 mb-4 uppercase text-xs tracking-widest">Recent Success</h3>
            <div className="space-y-3">
              {completedAttempts.slice(-3).reverse().map((attempt) => (
                <div key={attempt.id} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">{attempt.testName}</p>
                    <p className="text-lg font-bold">{attempt.percentage}%</p>
                  </div>
                  <div className={cn("p-2 rounded-full", attempt.percentage >= 80 ? "bg-emerald-100 text-emerald-600" : attempt.percentage >= 50 ? "bg-blue-100 text-blue-600" : "bg-red-100 text-red-600")}>
                    <CheckCircle2 size={18} />
                  </div>
                </div>
              ))}
              {completedAttempts.length === 0 && (
                <p className="text-sm text-indigo-400 font-medium text-center py-4 italic">Finish your first test to see rankings! 🚀</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
