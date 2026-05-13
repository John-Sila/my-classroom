import React, { useEffect, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Award, 
  AlertCircle,
  Filter,
  Download
} from 'lucide-react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { cn } from '../lib/utils';
import type { Test, TestAttempt, UserProfile } from '../types';

export default function AnalyticsPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [attempts, setAttempts] = useState<TestAttempt[]>([]);
  const [learners, setLearners] = useState<UserProfile[]>([]);
  const [selectedClass, setSelectedClass] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const testsSnap = await getDocs(collection(db, 'tests'));
      const attemptsSnap = await getDocs(collection(db, 'testAttempts'));
      const learnersSnap = await getDocs(collection(db, 'users'));
      
      setTests(testsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Test[]);
      setAttempts(attemptsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })) as TestAttempt[]);
      setLearners(learnersSnap.docs.map(doc => ({ ...doc.data(), uid: doc.id })) as UserProfile[]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const filteredAttempts = attempts.filter(a => selectedClass === 'All' || a.className === selectedClass);
  
  // Class Averages Data
  const classes = ['All', '5D', '4A', '3B'];
  const classAverages = classes.filter(c => c !== 'All').map(c => {
    const classAttempts = attempts.filter(a => a.className === c);
    const avg = classAttempts.length > 0 
      ? classAttempts.reduce((acc, curr) => acc + curr.percentage, 0) / classAttempts.length 
      : 0;
    return { name: c, average: Math.round(avg) };
  });

  // Score Distribution
  const distribution = [
    { range: '0-20', count: filteredAttempts.filter(a => a.percentage <= 20).length },
    { range: '21-40', count: filteredAttempts.filter(a => a.percentage > 20 && a.percentage <= 40).length },
    { range: '41-60', count: filteredAttempts.filter(a => a.percentage > 40 && a.percentage <= 60).length },
    { range: '61-80', count: filteredAttempts.filter(a => a.percentage > 60 && a.percentage <= 80).length },
    { range: '81-100', count: filteredAttempts.filter(a => a.percentage > 80).length },
  ];

  const COLORS = ['#ef4444', '#f97316', '#eab308', '#3b82f6', '#10b981'];

  if (isLoading) return <div className="animate-pulse space-y-8"><div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-3xl" /><div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-3xl" /></div>;

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Advanced Analytics</h1>
          <p className="text-slate-500 font-medium">Deep dive into classroom performance metrics</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl shadow-soft border border-slate-100 dark:border-slate-800">
            {classes.map(c => (
              <button
                key={c}
                onClick={() => setSelectedClass(c)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                  selectedClass === c ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "text-slate-500 hover:text-blue-600"
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <button className="p-3 bg-white dark:bg-slate-900 rounded-xl text-slate-500 hover:text-blue-600 border border-slate-100 dark:border-slate-800 shadow-soft">
            <Download size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Class Averages Bar Chart */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-soft border border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
            < Award className="text-yellow-500" />
            Class Average Comparison
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classAverages}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} domain={[0, 100]} unit="%" />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none' }} />
                <Bar dataKey="average" radius={[10, 10, 0, 0]}>
                  {classAverages.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Score Distribution Pie Chart */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-soft border border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
             < TrendingUp className="text-blue-500" />
             Score Range Distribution
          </h3>
          <div className="h-80 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="count"
                >
                  {distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 pr-8">
              {distribution.map((d, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-xs font-bold text-slate-500">{d.range}% ({d.count})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Difficult Tests Table */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-soft border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-bold flex items-center gap-3">
            <AlertCircle className="text-red-500" />
            Test Difficulty Analysis
          </h3>
          <p className="text-sm text-slate-500 mt-1">Tests ranked by average learner performance</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-8 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Test Name</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Participants</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Avg. Score</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Difficulty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {tests.map(test => {
                const testAttempts = attempts.filter(a => a.testId === test.id);
                const avg = testAttempts.length > 0 
                  ? testAttempts.reduce((acc, curr) => acc + curr.percentage, 0) / testAttempts.length 
                  : 0;
                
                return (
                  <tr key={test.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-8 py-6 font-bold">{test.testName}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-slate-400" />
                        <span className="font-medium">{testAttempts.length} students</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <span className={cn(
                         "font-black text-lg",
                         avg >= 80 ? "text-emerald-500" : avg >= 50 ? "text-blue-500" : "text-red-500"
                       )}>
                         {avg.toFixed(1)}%
                       </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest",
                        avg >= 80 ? "bg-emerald-100 text-emerald-600" : avg >= 60 ? "bg-blue-100 text-blue-600" : "bg-red-100 text-red-600"
                      )}>
                        {avg >= 80 ? 'Easy' : avg >= 60 ? 'Moderate' : 'Hard'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
