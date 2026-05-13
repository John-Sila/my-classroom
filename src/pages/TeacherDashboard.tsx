import React, { useEffect, useState } from 'react';
import { FileText, Trophy, Users, Clock, ChevronRight, Search, Filter, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';
import { FirestoreService } from '../services/firestore';
import { useAuthStore } from '../store/useStore';
import type { Test, TestAttempt, UserProfile } from '../types';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

import { useNavigate } from 'react-router-dom';

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [tests, setTests] = useState<Test[]>([]);
  const [selectedTestId, setSelectedTestId] = useState<string>('');
  const [attempts, setAttempts] = useState<TestAttempt[]>([]);
  const [learners, setLearners] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTests = await FirestoreService.getTests();
      const allLearners = await FirestoreService.getAllLearners();
      setTests(fetchedTests);
      setLearners(allLearners);
      if (fetchedTests.length > 0) {
        setSelectedTestId(fetchedTests[0].id);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedTestId) {
      const unsubscribe = FirestoreService.listenToTestAttempts(selectedTestId, (updatedAttempts) => {
        setAttempts(updatedAttempts);
      });
      return () => unsubscribe();
    }
  }, [selectedTestId]);

  const selectedTest = tests.find(t => t.id === selectedTestId);
  const participants = attempts.map(a => a.uid);
  const absentLearners = learners.filter(l => 
    !participants.includes(l.uid) && 
    (selectedTest?.className ? l.className === selectedTest.className : true)
  );

  const chartData = attempts.map(a => ({
    name: a.testName.substring(0, 10),
    score: a.percentage,
  }));

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-32 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-64 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-3xl col-span-2" />
          <div className="h-64 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Tests', value: tests.length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
          { label: 'Total Learners', value: learners.length, icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
          { label: 'Avg. Score', value: attempts.length > 0 ? (attempts.reduce((acc, curr) => acc + curr.percentage, 0) / attempts.length).toFixed(1) + '%' : '0%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100' },
          { label: 'Active Tests', value: tests.filter(t => t.isActive).length, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-soft border border-slate-100 dark:border-slate-800 flex items-center gap-4">
            <div className={cn("p-3 rounded-2xl", stat.bg)}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Leaderboard Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Trophy className="text-yellow-500" />
                Live Leaderboard
              </h2>
              <p className="text-slate-500 text-sm">Real-time performance tracking</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search test..." 
                  className="pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all shadow-soft"
                />
              </div>
              <select 
                value={selectedTestId} 
                onChange={(e) => setSelectedTestId(e.target.value)}
                className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all shadow-soft cursor-pointer"
              >
                {tests.map(test => (
                  <option key={test.id} value={test.id}>{test.testName} ({test.className})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-soft border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Rank</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Learner</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Score</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {attempts.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                        No submissions yet for this test.
                      </td>
                    </tr>
                  ) : (
                    attempts.map((attempt, index) => {
                      const learner = learners.find(l => l.uid === attempt.uid);
                      return (
                        <motion.tr 
                          key={attempt.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <span className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                              index === 0 ? "bg-yellow-100 text-yellow-600 shadow-sm" : 
                              index === 1 ? "bg-slate-200 text-slate-600" : 
                              index === 2 ? "bg-orange-100 text-orange-600" : "bg-slate-100 dark:bg-slate-800"
                            )}>
                              {index + 1}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400">
                                {learner?.userName?.[0]?.toUpperCase() || 'U'}
                              </div>
                              <div>
                                <p className="font-semibold">{learner?.fullName || 'Unknown'}</p>
                                <p className="text-xs text-slate-500">{learner?.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                  className={cn("h-full rounded-full transition-all duration-500", 
                                    attempt.percentage >= 80 ? 'bg-emerald-500' : 
                                    attempt.percentage >= 50 ? 'bg-blue-500' : 'bg-red-500'
                                  )}
                                  style={{ width: `${attempt.percentage}%` }}
                                />
                              </div>
                              <span className="font-bold text-sm">{attempt.percentage}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30">
                              <CheckCircle2 size={14} />
                              Submitted
                            </span>
                          </td>
                        </motion.tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Absent Learners */}
          {absentLearners.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2 text-slate-500">
                <XCircle size={20} />
                Absent Learners ({absentLearners.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {absentLearners.map((learner) => (
                  <div key={learner.uid} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                      {learner.userName?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{learner.fullName}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{learner.className}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Charts & Sidebar */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-soft border border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="text-blue-500" />
              Score Distribution
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis fontSize={10} axisLine={false} tickLine={false} unit="%" />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    cursor={{ fill: '#f1f5f9' }}
                  />
                  <Bar dataKey="score" radius={[8, 8, 0, 0]} fill="url(#barGradient)">
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.score >= 80 ? '#10b981' : entry.score >= 50 ? '#3b82f6' : '#ef4444'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-center text-slate-500 mt-4">Percentage score across submissions</p>
          </div>

          <div className="bg-blue-600 rounded-3xl p-6 text-white overflow-hidden relative group">
             <div className="relative z-10">
               <h4 className="text-xl font-bold mb-2">Create New Test</h4>
               <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                 Design interactive tests with images and dynamic questions for your students.
               </p>
               <button 
                onClick={() => navigate('/teacher/create-test')}
                className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
               >
                 Go to Creator <ChevronRight size={18} />
               </button>
             </div>
             {/* Decorative circles */}
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500" />
             <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
