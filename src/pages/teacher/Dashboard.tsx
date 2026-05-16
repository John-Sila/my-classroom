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
  where
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Test, UserProfile } from '../../types';
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

type TestAttemptLite = {
  attemptId?: string;
  uid: string;
  testId: string;
  score: number;
  percentage: number;
  submittedAt?: any;
};

export const TeacherDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    tests: 0,
    learners: 0,
    submissions: 0,
    avgScore: 0
  });

  const [recentTests, setRecentTests] = useState<Test[]>([]);
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<TestAttemptLite[]>([]);
  const [allLearners, setAllLearners] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const qTests = query(
      collection(db, 'tests'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    const qUsers = query(
      collection(db, 'users'),
      where('rank', '==', 'learner')
    );

    const unsubTests = onSnapshot(
      qTests,
      (snap) => {
        const data = snap.docs.map((doc) => ({ ...doc.data(), testId: doc.id } as Test));
        setRecentTests(data);
        setStats((prev) => ({ ...prev, tests: snap.size }));
        setSelectedTestId((prev) => prev ?? data[0]?.testId ?? null);
        setIsLoading(false);
      },
      (error) => {
        console.error('Tests snapshot error:', error);
        setIsLoading(false);
      }
    );

    const unsubUsers = onSnapshot(
      qUsers,
      (snap) => {
        setAllLearners(snap.docs.map((doc) => doc.data() as UserProfile));
        setStats((prev) => ({ ...prev, learners: snap.size }));
      },
      (error) => {
        console.error('Users snapshot error:', error);
      }
    );

    return () => {
      unsubTests();
      unsubUsers();
    };
  }, []);

  useEffect(() => {
    if (!selectedTestId) {
      setAttempts([]);
      setStats((prev) => ({ ...prev, submissions: 0, avgScore: 0 }));
      return;
    }

    const qAttempts = query(
      collection(db, 'testAttempts'),
      where('testId', '==', selectedTestId),
      orderBy('score', 'desc')
    );

    const unsubAttempts = onSnapshot(
      qAttempts,
      (snap) => {
        const data = snap.docs.map((doc) => ({
          attemptId: doc.id,
          ...(doc.data() as TestAttemptLite)
        }));

        setAttempts(data);

        const avg =
          data.length > 0
            ? Math.round(data.reduce((acc, curr) => acc + (curr.percentage || 0), 0) / data.length)
            : 0;

        setStats((prev) => ({
          ...prev,
          submissions: snap.size,
          avgScore: avg
        }));
      },
      (error) => {
        console.error('Attempts snapshot error:', error);
      }
    );

    return () => unsubAttempts();
  }, [selectedTestId]);

  const selectedTest = useMemo(
    () => recentTests.find((t) => t.testId === selectedTestId),
    [recentTests, selectedTestId]
  );

  const testClass = selectedTest?.className;

  const participantsUids = useMemo(
    () => new Set(attempts.map((a) => a.uid)),
    [attempts]
  );

  const absentLearners = useMemo(() => {
    if (!testClass) return [];
    return allLearners.filter((l) => l.className === testClass && !participantsUids.has(l.uid));
  }, [allLearners, testClass, participantsUids]);

  const chartData = useMemo(
    () =>
      attempts.map((a) => ({
        name: a.uid.slice(0, 4),
        score: a.percentage || 0,
        fullName: a.uid
      })),
    [attempts]
  );

  if (isLoading) {
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
        ].map((stat) => (
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
                    {recentTests.map((t) => (
                      <option key={t.testId} value={t.testId}>
                        {t.testName} ({t.className})
                      </option>
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
                      <tr key={attempt.attemptId || `${attempt.uid}-${idx}`} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="px-8 py-5">{idx + 1}</td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 font-bold">
                              {attempt.uid.slice(0, 2).toUpperCase()}
                            </div>
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">
                              {allLearners.find((l) => l.uid === attempt.uid)?.fullName || attempt.uid}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-center">{attempt.score} pts</td>
                        <td className="px-8 py-5 text-center">{Math.round(attempt.percentage || 0)}%</td>
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

            {absentLearners.length > 0 && (
              <div className="bg-slate-50 dark:bg-slate-800/40 p-8">
                <div className="flex items-center gap-2 mb-6">
                  <UserX className="w-5 h-5 text-red-500" />
                  <h4 className="font-bold text-slate-900 dark:text-white">Absent Learners ({absentLearners.length})</h4>
                </div>
                <div className="flex flex-wrap gap-3">
                  {absentLearners.map((learner) => (
                    <div key={learner.uid} className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{learner.fullName}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

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
          </div>
        </div>
      </div>
    </div>
  );
};