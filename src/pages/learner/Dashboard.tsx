import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Target, 
  BarChart2, 
  Clock, 
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  GraduationCap,
  ChevronRight
} from 'lucide-react';
import { collection, query, onSnapshot, where, orderBy, limit } from 'firebase/firestore';
import { db, auth } from '../../firebase/config';
import { useAuthStore } from '../../store/authStore';
import { TestAttempt, Test } from '../../types';
import { cn } from '../../lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export const LearnerDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState<TestAttempt[]>([]);
  const [recentTests, setRecentTests] = useState<Test[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Fetch personal attempts for analytics
    const qAttempts = query(
      collection(db, 'testAttempts'),
      where('uid', '==', user.uid),
      where('isSubmitted', '==', true),
      orderBy('submittedAt', 'desc'),
      limit(20)
    );

    const unsubAttempts = onSnapshot(qAttempts, (snap) => {
      const data = snap.docs.map(doc => doc.data() as TestAttempt);
      setAttempts(data);
      setIsLoading(false);
    });

    // Fetch tests for their class
    const qTests = query(
      collection(db, 'tests'),
      where('className', '==', user.className),
      where('isActive', '==', true),
      limit(3)
    );

    const unsubTests = onSnapshot(qTests, (snap) => {
      setRecentTests(snap.docs.map(doc => ({ ...doc.data(), testId: doc.id } as Test)));
    });

    return () => {
      unsubAttempts();
      unsubTests();
    };
  }, [user]);

  const stats = {
    avgScore: attempts.length > 0 ? Math.round(attempts.reduce((a, b) => a + b.percentage, 0) / attempts.length) : 0,
    testsTaken: attempts.length,
    topScore: attempts.length > 0 ? Math.max(...attempts.map(a => a.percentage)) : 0,
  };

  const chartData = [...attempts].reverse().map(a => ({
    date: a.submittedAt ? format(a.submittedAt.toDate(), 'MMM d') : '',
    score: a.percentage,
    name: a.testName
  }));

  return (
    <div className="space-y-8 pb-10">
      {/* Intro Section */}
      <div className="relative bg-indigo-600 rounded-[2.5rem] p-8 md:p-12 text-white overflow-hidden shadow-xl shadow-indigo-200 dark:shadow-none">
         <div className="relative z-10 max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight leading-tight">
               Hello, {user?.fullName}! 👋
            </h1>
            <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
               You're doing great! You've completed {stats.testsTaken} examinations so far with an average score of {stats.avgScore}%. Keep up the good work.
            </p>
            <div className="flex flex-wrap gap-4">
               <button 
                 onClick={() => navigate('/tests')}
                 className="px-8 py-3.5 bg-white text-indigo-600 font-bold rounded-[2rem] hover:bg-slate-50 transition-all flex items-center gap-2"
               >
                 View My Tests <ArrowRight className="w-5 h-5" />
               </button>
               <div className="flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-md rounded-[2rem] text-sm font-bold">
                  <GraduationCap className="w-5 h-5" />
                  <span>Class {user?.className}</span>
               </div>
            </div>
         </div>
         <BrainCircuit className="absolute -right-10 -bottom-10 w-64 h-64 text-white/10 rotate-12" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Analytics Section */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-10 border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between mb-10">
                 <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Performance Overview</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Score trends for the last {attempts.length} attempts</p>
                 </div>
                 <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                    <TrendingUp className="w-5 h-5 text-indigo-500" />
                 </div>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                    <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      labelClassName="font-bold text-slate-800"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#6366f1" 
                      strokeWidth={4} 
                      fillOpacity={1} 
                      fill="url(#colorScore)" 
                      dot={{ r: 6, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 8, strokeWidth: 0 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-500 rounded-[2rem] p-8 text-white">
                 <h4 className="text-lg font-bold opacity-80 mb-1">Top Score</h4>
                 <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold">{stats.topScore}</span>
                    <span className="text-xl font-bold opacity-80">%</span>
                 </div>
                 <p className="mt-4 text-emerald-100 text-sm font-medium">Your highest achievement to date across all modules.</p>
              </div>
              <div className="bg-amber-500 rounded-[2rem] p-8 text-white">
                 <h4 className="text-lg font-bold opacity-80 mb-1">Total Exams</h4>
                 <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold">{stats.testsTaken}</span>
                    <span className="text-xl font-bold opacity-80">Passed</span>
                 </div>
                 <p className="mt-4 text-amber-100 text-sm font-medium">You've successfully completed everything assigned so far.</p>
              </div>
           </div>
        </div>

        {/* Right Column: Mini List */}
        <div className="space-y-8">
           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Upcoming Tests</h3>
              <div className="space-y-4">
                 {recentTests.map((t) => (
                   <div 
                     key={t.testId} 
                     onClick={() => navigate('/tests')}
                     className="group cursor-pointer p-1 ring-0 hover:ring-2 hover:ring-indigo-100 dark:hover:ring-indigo-900/40 rounded-2xl transition-all"
                   >
                     <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl flex items-center gap-4">
                        <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center text-indigo-500 border border-slate-100 dark:border-slate-700">
                           <Target className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                           <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{t.testName}</h4>
                           <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">{format(t.startTime.toDate(), 'EEE, h:mm a')}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                     </div>
                   </div>
                 ))}
                 {recentTests.length === 0 && (
                   <p className="text-center text-sm text-slate-400 py-4">No upcoming tests assigned.</p>
                 )}
              </div>
           </div>

           <div className="bg-slate-900 dark:bg-indigo-950 rounded-[2.5rem] p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-3 bg-white/10 rounded-2xl">
                    <Trophy className="w-6 h-6 text-amber-400" />
                 </div>
                 <h3 className="text-lg font-bold leading-tight">Achievement Corner</h3>
              </div>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                 You are currently in the top 10% of your class. Complete 2 more exams with {'>'}80% to earn the "Exam Guru" badge.
              </p>
              <div className="flex -space-x-2">
                 {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 dark:border-indigo-950 bg-slate-800 flex items-center justify-center text-xs font-bold ring-2 ring-indigo-500/20">
                       🏅
                    </div>
                 ))}
                 <div className="w-10 h-10 rounded-full border-2 border-slate-900 dark:border-indigo-950 bg-indigo-600 flex items-center justify-center text-xs font-bold">
                    +3
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
