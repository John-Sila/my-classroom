import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthStore } from '../store/useStore';
import { 
  FileText, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Search,
  Lock,
  Globe,
  Info
} from 'lucide-react';
import { motion } from 'motion/react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import type { Test, TestAttempt } from '../types';

export default function AvailableTests() {
  const { user } = useAuthStore();
  const [tests, setTests] = useState<Test[]>([]);
  const [attempts, setAttempts] = useState<TestAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      if (!user) return;
      try {
        const testsSnap = await getDocs(collection(db, 'tests'));
        const testsData = testsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Test[];
        setTests(testsData);

        const attemptsQ = query(collection(db, 'testAttempts'), where('uid', '==', user.uid));
        const attemptsSnap = await getDocs(attemptsQ);
        setAttempts(attemptsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })) as TestAttempt[]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTests();
  }, [user]);

  const filteredTests = tests.filter(t => 
    t.testName.toLowerCase().includes(search.toLowerCase()) ||
    t.className.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Test Inventory</h1>
          <p className="text-slate-500 font-medium">Browse and search for examinations</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search examinations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-soft"
          />
        </div>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-950/20 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-900/30 flex gap-4">
        <div className="p-3 bg-indigo-600 text-white rounded-2xl shrink-0">
          <Info />
        </div>
        <div>
           <p className="font-bold text-indigo-900 dark:text-indigo-300">Class Policy Enforcement</p>
           <p className="text-sm text-indigo-700 dark:text-indigo-400/80 mt-1">
             You are only permitted to attempt examinations assigned to <strong>Class {user?.className}</strong>. Other tests will remain locked 🔒.
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array(6).fill(0).map((_, i) => <div key={i} className="h-64 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-[2rem]" />)
        ) : filteredTests.map((test, index) => {
          const isMyClass = test.className === user?.className;
          const attempt = attempts.find(a => a.testId === test.id);
          const isSubmitted = attempt?.isSubmitted;
          const isLocked = !isMyClass || isSubmitted;

          return (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-soft border transition-all flex flex-col justify-between group h-full",
                isLocked ? "bg-slate-50/50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 opacity-60" : "border-blue-100 dark:border-blue-900 hover:ring-4 hover:ring-blue-500/10"
              )}
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className={cn(
                    "p-3 rounded-2xl shadow-sm transition-transform group-hover:scale-110",
                    isMyClass ? "bg-blue-600 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-400"
                  )}>
                    {isMyClass ? <Globe size={20} /> : <Lock size={20} />}
                  </div>
                  <span className={cn(
                    "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
                    isMyClass ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"
                  )}>
                    Class {test.className}
                  </span>
                </div>

                <h3 className="text-xl font-black uppercase tracking-tight mb-2 group-hover:text-blue-600 transition-colors leading-tight">
                  {test.testName}
                </h3>
                
                <div className="space-y-3 mt-6">
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
                    <Clock size={16} className="text-blue-500" />
                    <span>{test.durationMinutes} Minutes</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
                    <Calendar size={16} className="text-blue-500" />
                    <span>Ends: {format(test.endTime.toDate(), 'MMM d, h:mm a')}</span>
                  </div>
                </div>
              </div>

              <button
                disabled={isLocked}
                onClick={() => navigate(`/learner/take-test/${test.id}`)}
                className={cn(
                  "w-full mt-8 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md group-hover:shadow-lg",
                  isLocked 
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed" 
                    : "bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-1 active:translate-y-0"
                )}
              >
                {isSubmitted ? "Submitted" : !isMyClass ? "Locked" : "Start Test"}
                {!isLocked && <ChevronRight size={20} />}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
