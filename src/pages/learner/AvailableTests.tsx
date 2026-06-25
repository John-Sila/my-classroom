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
  Loader2,
  Filter 
} from 'lucide-react';
import { collection, query, onSnapshot, orderBy, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuthStore } from '../../store/authStore';
import { Test, TestAttempt } from '../../types';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { notify } from '@/src/utils/toast';

export const AvailableTests: React.FC = () => {
  const { user } = useAuthStore();
  const [tests, setTests] = useState<Test[]>([]);
  const [attempts, setAttempts] = useState<Record<string, TestAttempt>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [showOnlyMyClass, setShowOnlyMyClass] = useState(true); 
  
  // 1. ADD STATE TRACKER FOR SEARCH
  const [searchQuery, setSearchQuery] = useState(''); 
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    setIsLoading(true);

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
      notify.error(`This test starts at ${format(startTime, 'PPp')}`);
      return;
    }

    if (now > endTime) {
      notify.error('This test has ended.');
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

  // 2. RE-ENGINEERED DYNAMIC FILTER INDEX PIPELINE
  const displayedTests = tests.filter(test => {
    // Stage A: Class verification checks
    const matchesClass = !showOnlyMyClass || test.className === user?.className;
    
    // Stage B: Multi-field fuzzy text search indexing
    const cleanQuery = searchQuery.toLowerCase().trim();
    const matchesSearch = !cleanQuery || 
      test.testName.toLowerCase().includes(cleanQuery) || 
      test.className.toLowerCase().includes(cleanQuery);

    return matchesClass && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="h-full"
    >
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Available Tests</h1>
            <p className="text-slate-500 dark:text-slate-400">View and participate in scheduled examinations</p>
          </div>
          
          <div className="flex items-center gap-3 self-start md:self-auto w-full md:w-auto">
            <button
              onClick={() => setShowOnlyMyClass(!showOnlyMyClass)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-2xl border transition-all duration-300 cursor-pointer select-none whitespace-nowrap",
                showOnlyMyClass
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100 dark:shadow-none"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              )}
            >
              <Filter className="w-4 h-4" />
              <span>Just my class</span>
            </button>

            <div className="bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3 flex-1 md:flex-initial">
              <Search className="w-4 h-4 text-slate-400" />
              {/* 3. CONTROLLED INPUT STATE REPLACEMENT */}
              <input 
                type="text" 
                placeholder="Search tests..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-slate-900 dark:text-white w-full md:w-80" 
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTests.map((test) => {
            const isForUserClass = test.className === user?.className;
            const attempt = attempts[test.testId];
            const isSubmitted = attempt?.isSubmitted;
            const now = new Date();
            const startTime = test.startTime.toDate();
            const endTime = test.endTime.toDate();
            const isUpcoming = now < startTime;
            const isExpired = now > endTime;

            const statusType = !isForUserClass
              ? "wrong-class"
              : isSubmitted
              ? "submitted"
              : isExpired
              ? "expired"
              : isUpcoming
              ? "upcoming"
              : "active";

            const cardStyles: Record<typeof statusType, string> = {
              "wrong-class": "border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950/20 opacity-65 grayscale select-none",
              "submitted": "border-emerald-100 dark:border-emerald-950/40 bg-white dark:bg-slate-900 shadow-sm",
              "expired": "border-slate-200/60 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/10 opacity-75",
              "upcoming": "border-amber-100/70 dark:border-amber-950/30 bg-white dark:bg-slate-900 shadow-sm",
              "active": "border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-md shadow-indigo-500/[0.02] hover:shadow-xl hover:shadow-indigo-500/[0.05] dark:hover:shadow-none hover:-translate-y-1"
            };

            const iconBoxStyles: Record<typeof statusType, string> = {
              "wrong-class": "bg-slate-100 dark:bg-slate-800 text-slate-400",
              "submitted": "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400",
              "expired": "bg-slate-100 dark:bg-slate-800 text-slate-400",
              "upcoming": "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-500",
              "active": "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400"
            };

            return (
              <div 
                key={test.testId}
                className={cn(
                  "group relative rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between",
                  cardStyles[statusType]
                )}
              >
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <div className={cn("p-2.5 rounded-xl transition-colors", iconBoxStyles[statusType])}>
                      <BookOpen className="w-5 h-5" />
                    </div>
                    
                    <div className="flex flex-col items-end gap-1.5">
                      <span className={cn(
                        "px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border",
                        isForUserClass 
                          ? "bg-indigo-50/60 text-indigo-600 border-indigo-100 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-900/30"
                          : "bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
                      )}>
                        Grade {test.className}
                      </span>
                      
                      {isSubmitted && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-mono">
                          <CheckCircle2 className="w-3 h-3 stroke-[2.5]" /> Done
                        </span>
                      )}
                      {isExpired && !isSubmitted && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                          <Lock className="w-3 h-3" /> Closed
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 tracking-tight line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {test.testName}
                  </h3>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-medium">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>Duration: <strong className="text-slate-600 dark:text-slate-300 font-semibold">{test.durationMinutes} Mins</strong></span>
                    </div>
                    
                    <div className="flex items-start gap-2 text-slate-400 dark:text-slate-500 text-xs font-medium">
                      <Calendar className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <div className="flex flex-col gap-0.5">
                        <div className="flex flex-wrap items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium">
                          <span className="bg-slate-100 dark:bg-slate-800/80 px-1.5 py-0.5 rounded text-[11px] font-semibold text-slate-500">
                            {format(startTime, 'MMM d, h:mm a')}
                          </span>
                          <span className="text-slate-300 dark:text-slate-700 font-normal">&rarr;</span>
                          <span className="bg-slate-50 dark:bg-slate-800/40 px-1.5 py-0.5 rounded text-[11px] font-semibold text-slate-500 border border-slate-100 dark:border-transparent">
                            {format(endTime, 'MMM d, h:mm a')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 mt-auto">
                  {statusType === "wrong-class" && (
                    <div className="flex items-center justify-center gap-1.5 text-slate-400 dark:text-slate-500 text-xs font-medium py-2 bg-slate-100/50 dark:bg-slate-800/30 rounded-xl">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Grade {test.className} only</span>
                    </div>
                  )}

                  {statusType === "submitted" && (
                    <button 
                      onClick={() => navigate('/results')}
                      className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:hover:bg-emerald-900/30 dark:text-emerald-400 font-semibold rounded-xl text-sm border border-emerald-200/50 dark:border-emerald-900/30 transition-colors"
                    >
                      Review Results
                    </button>
                  )}

                  {statusType === "expired" && (
                    <div className="w-full py-2.5 bg-slate-100 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500 font-medium rounded-xl text-sm text-center border border-slate-200/40 dark:border-slate-700/40 cursor-not-allowed">
                      Assessment Window Ended
                    </div>
                  )}

                  {statusType === "upcoming" && (
                    <div className="w-full py-2.5 bg-amber-50/60 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 font-medium rounded-xl text-sm text-center border border-amber-200/40 dark:border-amber-900/20 font-mono text-xs cursor-wait">
                      Unlocks at {format(startTime, 'h:mm a')}
                    </div>
                  )}

                  {statusType === "active" && (
                    <button 
                      onClick={() => handleStartTest(test)}
                      className="w-full group/btn flex items-center justify-center gap-1.5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md shadow-indigo-500/10 dark:shadow-none transition-all hover:shadow-lg hover:shadow-indigo-500/20 cursor-pointer"
                    >
                      <span>Begin Assessment</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {displayedTests.length === 0 && (
            <div className="col-span-full bg-white dark:bg-slate-900 rounded-[2rem] p-12 text-center border border-slate-100 dark:border-slate-800">
              <ClipboardList className="w-12 h-12 text-slate-200 dark:text-slate-700 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No Assessments Found</h3>
              <p className="text-sm text-slate-400 dark:text-slate-500 max-w-sm mx-auto">
                {searchQuery 
                  ? `No tests matched your query "${searchQuery}". Try searching for something else.` 
                  : showOnlyMyClass 
                  ? "There are no active tests scheduled for your class right now." 
                  : "Scheduled tests will appear here when they are configured."}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};