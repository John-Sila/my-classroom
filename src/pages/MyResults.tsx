import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthStore } from '../store/useStore';
import { 
  FileText, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Search,
  CheckCircle2,
  Trophy,
  History
} from 'lucide-react';
import { motion } from 'motion/react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import type { TestAttempt } from '../types';

export default function MyResults() {
  const { user } = useAuthStore();
  const [attempts, setAttempts] = useState<TestAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttempts = async () => {
      if (!user) return;
      try {
        const q = query(
          collection(db, 'testAttempts'), 
          where('uid', '==', user.uid),
          where('isSubmitted', '==', true),
          orderBy('submittedAt', 'desc')
        );
        const snap = await getDocs(q);
        setAttempts(snap.docs.map(doc => ({ ...doc.data(), id: doc.id })) as TestAttempt[]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAttempts();
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Examination History</h1>
          <p className="text-slate-500 font-medium">Review your performance across all completed tests</p>
        </div>
        <div className="bg-blue-600 px-6 py-4 rounded-[1.5rem] text-white flex items-center gap-4 shadow-lg shadow-blue-500/20">
          <Trophy size={24} className="text-yellow-400" />
          <div>
            <p className="text-[10px] uppercase font-black opacity-80">Total tests</p>
            <p className="text-xl font-black">{attempts.length}</p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array(3).fill(0).map((_, i) => <div key={i} className="h-32 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-3xl" />)}
        </div>
      ) : attempts.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-16 text-center border-2 border-dashed border-slate-200 dark:border-slate-800">
           <History size={64} className="mx-auto text-slate-300 mb-4" />
           <h2 className="text-xl font-bold mb-2">No History Found</h2>
           <p className="text-slate-500 max-w-sm mx-auto">You haven't completed any examinations yet. Head over to the dashboard to see available tests.</p>
           <button 
            onClick={() => navigate('/learner')}
            className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
           >
             Go to Dashboard
           </button>
        </div>
      ) : (
        <div className="space-y-4">
          {attempts.map((attempt, index) => (
            <motion.div
              key={attempt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/learner/results/${attempt.id}`)}
              className="group bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-soft border border-slate-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-600 transition-all cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className={cn(
                  "w-16 h-16 rounded-[1.2rem] flex items-center justify-center font-black text-xl",
                  attempt.percentage >= 80 ? "bg-emerald-100 text-emerald-600" : attempt.percentage >= 50 ? "bg-blue-100 text-blue-600" : "bg-red-100 text-red-600"
                )}>
                  {Math.round(attempt.percentage)}%
                </div>
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight group-hover:text-blue-600 transition-colors">{attempt.testName}</h3>
                  <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {attempt.submittedAt ? format(attempt.submittedAt.toDate(), 'MMM d, yyyy') : 'N/A'}</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-500" /> Score: {attempt.score} points</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-black text-slate-400 uppercase">Performance</p>
                  <p className={cn(
                    "font-bold",
                    attempt.percentage >= 80 ? "text-emerald-500" : attempt.percentage >= 50 ? "text-blue-500" : "text-red-500"
                  )}>
                    {attempt.percentage >= 80 ? 'EXCELLENT' : attempt.percentage >= 50 ? 'SATISFACTORY' : 'IMPROVEMENT NEEDED'}
                  </p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <ChevronRight size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
