import React, { useState, useEffect } from 'react';
import { 
  ClipboardList, 
  Clock, 
  Calendar, 
  ChevronRight, 
  Search,
  BookOpen,
  CheckCircle2,
  Lock,
  Loader2
} from 'lucide-react';
import { collection, query, onSnapshot, where, orderBy, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase/config';
import { useAuthStore } from '../../store/authStore';
import { Test, TestAttempt } from '../../types';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export const AvailableTests: React.FC = () => {
  const { user } = useAuthStore();
  const [tests, setTests] = useState<Test[]>([]);
  const [attempts, setAttempts] = useState<Record<string, TestAttempt>>({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    setIsLoading(true);

    // TESTS
    const testsQuery = query(
      collection(db, 'tests'),
      orderBy('startTime', 'desc')
    );

    const unsubscribeTests = onSnapshot(
      testsQuery,
      (snapshot) => {
        try {
          const testsData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            testId: doc.id,
          })) as Test[];

          console.log('TESTS:', testsData);

          setTests(testsData);
          setIsLoading(false);
        } catch (err) {
          console.error(err);
          setIsLoading(false);
        }
      },
      (error) => {
        console.error('Tests snapshot error:', error);
        setIsLoading(false);
      }
    );

    // ATTEMPTS
    const attemptsQuery = query(
      collection(db, 'testAttempts'),
      where('uid', '==', user.uid)
    );

    const unsubscribeAttempts = onSnapshot(
      attemptsQuery,
      (snapshot) => {
        const attemptsData: Record<string, TestAttempt> = {};

        snapshot.docs.forEach((doc) => {
          const data = doc.data() as TestAttempt;

          attemptsData[data.testId] = {
            ...data,
            attemptId: doc.id,
          };
        });

        setAttempts(attemptsData);
      },
      (error) => {
        console.error('Attempts snapshot error:', error);
      }
    );

    return () => {
      unsubscribeTests();
      unsubscribeAttempts();
    };
  }, [user]);

  const handleStartTest = (test: Test) => {
    if (test.className !== user?.className) return;
    
    const now = new Date();
    const startTime = test.startTime.toDate();
    const endTime = test.endTime.toDate();

    if (now < startTime) {
      alert(`This test starts at ${format(startTime, 'PPp')}`);
      return;
    }

    if (now > endTime) {
      alert('This test has ended.');
      return;
    }

    navigate(`/take-test/${test.testId}`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
        <p className="text-slate-500">Loading available tests...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Available Tests</h1>
          <p className="text-slate-500 dark:text-slate-400">View and participate in scheduled examinations</p>
        </div>
        
        <div className="bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
           <Search className="w-4 h-4 text-slate-400" />
           <input type="text" placeholder="Search tests..." className="bg-transparent border-none outline-none text-sm text-slate-900 dark:text-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => {
          const isForUserClass = test.className === user?.className;
          const attempt = attempts[test.testId];
          const isSubmitted = attempt?.isSubmitted;
          const now = new Date();
          const startTime = test.startTime.toDate();
          const endTime = test.endTime.toDate();
          const isUpcoming = now < startTime;
          const isExpired = now > endTime;
          const canTake = isForUserClass && !isSubmitted && !isExpired && !isUpcoming;

          return (
            <div 
              key={test.testId}
              className={cn(
                "group relative bg-white dark:bg-slate-900 rounded-[2rem] p-6 border transition-all duration-300",
                isForUserClass 
                  ? "border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-indigo-100 dark:hover:shadow-none hover:-translate-y-1"
                  : "border-slate-50 dark:border-slate-900 opacity-60 grayscale"
              )}
            >
              <div className="flex justify-between items-start mb-6">
                <div className={cn(
                  "p-3 rounded-2xl",
                  isForUserClass ? "bg-indigo-50 dark:bg-indigo-900/30" : "bg-slate-100 dark:bg-slate-800"
                )}>
                  <BookOpen className={cn("w-6 h-6", isForUserClass ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400")} />
                </div>
                <div className="flex flex-col items-end">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-1",
                    isForUserClass 
                      ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300"
                      : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                  )}>
                    Class {test.className}
                  </span>
                  {isSubmitted && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                      <CheckCircle2 className="w-3 h-3" /> Submitted
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">{test.testName}</h3>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                   <Clock className="w-4 h-4" />
                   <span>{test.durationMinutes} Minutes</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                   <Calendar className="w-4 h-4" />
                   <span>{format(startTime, 'MMM d, h:mm a')}</span>
                </div>
              </div>

              {!isForUserClass ? (
                <div className="flex items-center gap-2 text-slate-400 text-xs font-medium py-3 border-t border-slate-50 dark:border-slate-800 mt-4">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Not for your class</span>
                </div>
              ) : isSubmitted ? (
                <button 
                  onClick={() => navigate('/results')}
                  className="w-full py-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-bold rounded-xl text-sm border border-emerald-100 dark:border-emerald-900/50 hover:bg-emerald-100 transition-colors"
                >
                  View Result
                </button>
              ) : isExpired ? (
                <div className="w-full py-3 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold rounded-xl text-sm text-center border border-slate-200 dark:border-slate-700">
                  Ended
                </div>
              ) : isUpcoming ? (
                <div className="w-full py-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 font-bold rounded-xl text-sm text-center border border-amber-100 dark:border-amber-900/50">
                  Starts {format(startTime, 'p')}
                </div>
              ) : (
                <button 
                  onClick={() => handleStartTest(test)}
                  className="w-full group/btn flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 dark:shadow-none transition-all"
                >
                  <span>Start Test</span>
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          );
        })}

        {tests.length === 0 && (
          <div className="col-span-full bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-100 dark:border-slate-800">
             <ClipboardList className="w-16 h-16 text-slate-200 mx-auto mb-4" />
             <h3 className="text-xl font-bold text-slate-900 dark:text-white">No active tests</h3>
             <p className="text-slate-500">Scheduled tests will appear here when they are active.</p>
          </div>
        )}
      </div>
    </div>
  );
};
