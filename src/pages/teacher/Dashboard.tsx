import React, { useState, useEffect, useMemo } from 'react';
import {
  Users,
  ClipboardList,
  CheckCircle2,
  TrendingUp,
  Activity,
  Filter,
  UserX
} from 'lucide-react';

import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
  where,
  getDocs
} from 'firebase/firestore';

import { db } from '../../firebase/config';
import { Test, TestAttempt, UserProfile } from '../../types';
import { cn } from '../../lib/utils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

import { format } from 'date-fns';

export const TeacherDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    tests: 0,
    learners: 0,
    submissions: 0,
    avgScore: 0
  });

  const [recentTests, setRecentTests] = useState<Test[]>([]);
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<TestAttempt[]>([]);
  const [allLearners, setAllLearners] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * 1. Tests + Learners (single stable subscription layer)
   */
  useEffect(() => {
    let mounted = true;

    const qTests = query(
      collection(db, 'tests'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    const unsubTests = onSnapshot(qTests, (snap) => {
      if (!mounted) return;

      const data = snap.docs.map(
        doc => ({ ...doc.data(), testId: doc.id } as Test)
      );

      setRecentTests(data);

      setStats(prev => ({ ...prev, tests: snap.size }));

      /**
       * CRITICAL FIX:
       * only initialize once, never override user selection
       */
      setSelectedTestId(prev => {
        if (prev && data.some(t => t.testId === prev)) return prev;
        return data[0]?.testId ?? null;
      });

      setIsLoading(false);
    });

    const qUsers = query(
      collection(db, 'users'),
      where('rank', '==', 'learner')
    );

    const unsubUsers = onSnapshot(qUsers, (snap) => {
      if (!mounted) return;

      setAllLearners(
        snap.docs.map(doc => doc.data() as UserProfile)
      );

      setStats(prev => ({ ...prev, learners: snap.size }));
    });

    return () => {
      mounted = false;
      unsubTests();
      unsubUsers();
    };
  }, []);

  /**
   * 2. Attempts stream (fully reactive, no navigation dependency)
   */
  useEffect(() => {
    if (!selectedTestId) return;

    const qAttempts = query(
      collection(db, 'testAttempts'),
      where('testId', '==', selectedTestId),
      orderBy('score', 'desc')
    );

    const unsubAttempts = onSnapshot(qAttempts, (snap) => {
      const data = snap.docs.map(doc => doc.data() as TestAttempt);

      setAttempts(data);

      setStats(prev => {
        const avg =
          data.length > 0
            ? Math.round(
                data.reduce((acc, curr) => acc + curr.percentage, 0) /
                  data.length
              )
            : 0;

        return {
          ...prev,
          submissions: snap.size,
          avgScore: avg
        };
      });
    });

    return () => unsubAttempts();
  }, [selectedTestId]);

  /**
   * Derived state (keeps render stable)
   */
  const selectedTest = useMemo(
    () => recentTests.find(t => t.testId === selectedTestId),
    [recentTests, selectedTestId]
  );

  const testClass = selectedTest?.className;

  const participantsUids = useMemo(
    () => new Set(attempts.map(a => a.uid)),
    [attempts]
  );

  const absentLearners = useMemo(() => {
    if (!testClass) return [];

    return allLearners.filter(
      l => l.className === testClass && !participantsUids.has(l.uid)
    );
  }, [allLearners, testClass, participantsUids]);

  const chartData = useMemo(
    () =>
      attempts.map(a => ({
        name: a.uid.slice(0, 4),
        score: a.percentage,
        fullName: a.uid
      })),
    [attempts]
  );

  /**
   * Loading gate (prevents empty flash on first render)
   */
  if (isLoading || !selectedTestId) {
    return (
      <div className="space-y-8 pb-10">
        <div className="flex justify-center py-20">
          <Activity className="w-10 h-10 animate-spin text-slate-400" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Tests', value: stats.tests, icon: ClipboardList, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/30' },
          { label: 'Total Learners', value: stats.learners, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/30' },
          { label: 'Submissions', value: stats.submissions, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/30' },
          { label: 'Average Score', value: `${stats.avgScore}%`, icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/30' },
        ].map(stat => (
          <div key={stat.label} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-transform hover:-translate-y-1">
            <div className={cn("p-3 rounded-2xl w-fit mb-4", stat.bg)}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.label}</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Leaderboard */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Real-time Leaderboard</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Rankings for the selected test</p>
              </div>
              
              <div className="flex items-center gap-3">
                 <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select 
                      value={selectedTestId || ''} 
                      onChange={(e) => setSelectedTestId(e.target.value)}
                      className="pl-9 pr-8 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500/20"
                    >
                      {recentTests.map(t => (
                        <option key={t.testId} value={t.testId}>{t.testName} ({t.className})</option>
                      ))}
                      {recentTests.length === 0 && <option value="">No tests available</option>}
                    </select>
                 </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-widest">
                  <tr>
                    <th className="px-8 py-4 font-bold">Rank</th>
                    <th className="px-8 py-4 font-bold">Learner</th>
                    <th className="px-8 py-4 font-bold text-center">Score</th>
                    <th className="px-8 py-4 font-bold text-center">Percentage</th>
                    <th className="px-8 py-4 font-bold text-right">Submitted Info</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {attempts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center">
                        <Activity className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                        <p className="text-slate-500">No submissions yet for this test.</p>
                      </td>
                    </tr>
                  ) : (
                    attempts.map((attempt, idx) => (
                      <tr key={attempt.uid} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="px-8 py-5">
                           <div className={cn(
                             "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm",
                             idx === 0 ? "bg-amber-100 text-amber-700" : 
                             idx === 1 ? "bg-slate-100 text-slate-600" :
                             idx === 2 ? "bg-orange-100 text-orange-700" :
                             "bg-slate-50 dark:bg-slate-800 text-slate-500"
                           )}>
                              {idx + 1}
                           </div>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 font-bold">
                                {attempt.uid.slice(0, 2).toUpperCase()}
                             </div>
                             <span className="text-sm font-semibold text-slate-900 dark:text-white">
                                {allLearners.find(l => l.uid === attempt.uid)?.fullName || 'Loading...'}
                             </span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-center">
                           <span className="text-sm font-mono font-bold text-slate-700 dark:text-slate-300">{attempt.score} pts</span>
                        </td>
                        <td className="px-8 py-5 text-center">
                           <div className="flex flex-col items-center gap-1">
                              <span className={cn(
                                "text-sm font-bold",
                                attempt.percentage >= 80 ? "text-emerald-500" : 
                                attempt.percentage >= 50 ? "text-amber-500" : "text-red-500"
                              )}>{Math.round(attempt.percentage)}%</span>
                              <div className="w-16 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                 <div className={cn(
                                   "h-full rounded-full transition-all duration-1000",
                                   attempt.percentage >= 80 ? "bg-emerald-500" : 
                                   attempt.percentage >= 50 ? "bg-amber-500" : "bg-red-500"
                                 )} style={{ width: `${attempt.percentage}%` }} />
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                           <p className="text-xs text-slate-500 dark:text-slate-400">
                             {attempt.submittedAt ? format(attempt.submittedAt.toDate(), 'h:mm a, MMM d') : 'N/A'}
                           </p>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Absent List */}
            {absentLearners.length > 0 && (
              <div className="bg-slate-50 dark:bg-slate-800/40 p-8">
                 <div className="flex items-center gap-2 mb-6">
                    <UserX className="w-5 h-5 text-red-500" />
                    <h4 className="font-bold text-slate-900 dark:text-white">Absent Learners ({absentLearners.length})</h4>
                 </div>
                 <div className="flex flex-wrap gap-3">
                    {absentLearners.map(learner => (
                       <div key={learner.uid} className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm animate-fade-in">
                          <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400 uppercase">
                             {learner.userName[0]}
                          </div>
                          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{learner.fullName}</span>
                       </div>
                    ))}
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Mini Charts & Stats */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm h-fit">
             <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Distribution</h3>
             <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="name" hide />
                      <YAxis domain={[0, 100]} hide />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        cursor={{ fill: 'transparent' }}
                      />
                      <Bar dataKey="score" radius={[4, 4, 4, 4]}>
                         {chartData.map((entry, index) => (
                           <Cell key={index} fill={entry.score >= 80 ? '#10B981' : entry.score >= 50 ? '#F59E0B' : '#EF4444'} />
                         ))}
                      </Bar>
                   </BarChart>
                </ResponsiveContainer>
             </div>
             <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-xs text-slate-500">Excellent (80-100)</span>
                   </div>
                   <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {attempts.filter(a => a.percentage >= 80).length}
                   </span>
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="text-xs text-slate-500">Good (50-79)</span>
                   </div>
                   <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {attempts.filter(a => a.percentage >= 50 && a.percentage < 80).length}
                   </span>
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="text-xs text-slate-500">Needs Effort (0-49)</span>
                   </div>
                   <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {attempts.filter(a => a.percentage < 50).length}
                   </span>
                </div>
             </div>
          </div>
          
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2">Create More Content</h3>
                <p className="text-indigo-100 text-sm mb-6">Create new examinations or add learners to your classroom.</p>
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-6 py-3 rounded-2xl font-bold transition-all">
                   Manage Access
                </button>
             </div>
             <Activity className="absolute -right-10 -bottom-10 w-40 h-40 text-white/10 rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
};
