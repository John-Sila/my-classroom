import React, { useEffect, useState } from 'react';
import { 
  collection, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  orderBy
} from 'firebase/firestore';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  ClipboardList,
  Filter,
  ChevronDown,
  ArrowLeftRight,
  GraduationCap
} from 'lucide-react';
import { db } from '@/src/firebase/config';
import { useAuthStore } from '@/src/store/authStore';
import { cn } from '@/src/lib/utils';

interface HomeworkTest {
  id: string;
  title: string;
  questions: string[];
  dueDate: string;      
  markingDate: string;  
  targetClasses: string[];
  className?: string;   
  postedOn: any;
}

export default function LearnerTestsView() {
  const { user } = useAuthStore();
  
  const [tests, setTests] = useState<HomeworkTest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showOnlyMyClass, setShowOnlyMyClass] = useState(true);
  const [expandedTests, setExpandedTests] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchAndFilterTests();
  }, []);

  const fetchAndFilterTests = async () => {
    try {
      setLoading(true);
      const testsRef = collection(db, 'writing_tests');
      const q = query(testsRef, orderBy('postedOn', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const activeTests: HomeworkTest[] = [];
      const now = new Date();

      for (const document of querySnapshot.docs) {
        const data = document.data() as Omit<HomeworkTest, 'id'>;
        const testId = document.id;
        const dueDateObj = new Date(data.dueDate);
        
        const differenceInMs = now.getTime() - dueDateObj.getTime();
        const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

        if (differenceInDays > 21) {
          await deleteDoc(doc(db, 'writing_tests', testId));
          continue; 
        }

        activeTests.push({ id: testId, ...data });
      }

      setTests(activeTests);
    } catch (error) {
      console.error("Error processing learner dashboard tests: ", error);
    } finally {
      setLoading(false);
    }
  };

  const formatClassroomDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayName = days[date.getDay()];
    const dayOfMonth = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();

    let suffix = 'th';
    if (dayOfMonth < 11 || dayOfMonth > 13) {
      switch (dayOfMonth % 10) {
        case 1: suffix = 'st'; break;
        case 2: suffix = 'nd'; break;
        case 3: suffix = 'rd'; break;
      }
    }

    return `${dayName} ${dayOfMonth}${suffix} ${monthName} ${year}`;
  };

  const getTestTimelineStatus = (dueDateString: string): 'active' | 'overdue' | 'archive-warning' => {
    const now = new Date();
    const dueDateObj = new Date(dueDateString);
    const differenceInMs = now.getTime() - dueDateObj.getTime();
    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

    if (differenceInDays > 7) return 'archive-warning';
    if (differenceInDays > 0) return 'overdue';
    return 'active';
  };

  const isTestForCurrentUser = (test: HomeworkTest): boolean => {
    if (!user?.className) return false;
    if (test.targetClasses && test.targetClasses.length > 0) {
      return test.targetClasses.includes(user.className);
    }
    return test.className === user.className;
  };

  const toggleTestExpansion = (testId: string) => {
    setExpandedTests(prev => {
      const newSet = new Set(prev);
      if (newSet.has(testId)) {
        newSet.delete(testId);
      } else {
        newSet.add(testId);
      }
      return newSet;
    });
  };

  const getTestClasses = (test: HomeworkTest): string[] => {
    if (test.targetClasses && test.targetClasses.length > 0) return test.targetClasses;
    if (test.className) return [test.className];
    return [];
  };

  const displayedTests = showOnlyMyClass ? tests.filter(isTestForCurrentUser) : tests;

  const sortedTests = [...displayedTests].sort((a, b) => {
    const statusA = getTestTimelineStatus(a.dueDate);
    const statusB = getTestTimelineStatus(b.dueDate);
    const statusOrder = { 'active': 0, 'overdue': 1, 'archive-warning': 2 };
    return statusOrder[statusA] - statusOrder[statusB];
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-slate-500 dark:text-slate-400 font-medium">
        <div className="animate-pulse flex items-center gap-3 bg-white dark:bg-slate-800 px-6 py-4 rounded-xl shadow-sm">
          <BookOpen className="animate-spin text-indigo-500" size={28} />
          <span className="text-sm font-semibold">Loading classroom exercises...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.25s ease-out; }
        .test-card { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .test-card:hover { transform: translateY(-2px); }
        .question-item { transition: all 0.2s ease; }
        .question-item:hover { transform: translateX(4px); }
        .expand-btn { transition: transform 0.2s ease; }
        .expand-btn.rotated { transform: rotate(180deg); }
      `}</style>

      {/* Expanded grid envelope to utilize desktop real estate beautifully */}
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
        
        {/* Modern Premium Glossy Hero Card Banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-800 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-white/10 mb-8 animate-slideDown">
          {/* Decorative ambient background flares */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative flex flex-col sm:flex-row items-start gap-5">
            <div className="flex items-center justify-center bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/20 shadow-inner shrink-0">
              <BookOpen size={28} className="text-sky-300" />
            </div>
            <div className="space-y-2">
              <p className="text-slate-200 text-sm font-medium leading-relaxed max-w-3xl">
                Hi {user?.fullName.split(" ")[0]}, copy these questions neatly into your <span className="underline decoration-amber-400 decoration-wavy decoration-2 font-semibold text-amber-300">exercise book</span> and write down your answers before the deadline. Ensure to keep your handwriting clean and organized!
              </p>
            </div>
          </div>
        </div>

        {/* Header Control Row with Integrated Counter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 px-1 animate-slideUp">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-200/60 dark:bg-slate-800 rounded-lg">
              <ClipboardList className="text-slate-700 dark:text-slate-300" size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">Your Active Writing Tasks</h1>
              <p className="text-xs text-slate-400 dark:text-slate-500">Transcribe assignment prompts to paper logs</p>
            </div>
            <span className="text-xs bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-extrabold px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/60 shadow-sm">
              {sortedTests.length} Active
            </span>
          </div>
          
          <button
            onClick={() => setShowOnlyMyClass(!showOnlyMyClass)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl border transition-all duration-300 cursor-pointer select-none whitespace-nowrap shadow-sm hover:scale-[1.01] active:scale-[0.99]",
              showOnlyMyClass
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100 dark:shadow-none hover:bg-indigo-700"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/50"
            )}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Just My Class</span>
          </button>
        </div>

        {/* Current Class Info Banner */}
        {user?.className && showOnlyMyClass && (
          <div className="bg-emerald-50/60 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/40 rounded-xl p-4 mb-6 flex items-center gap-3.5 animate-slideUp">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg text-emerald-600 dark:text-emerald-400">
              <GraduationCap size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                Viewing filtered results for <span className="font-extrabold text-emerald-900 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded text-xs">Grade {user.className}</span>
              </p>
              <p className="text-xs text-emerald-600/90 dark:text-emerald-400/80 mt-0.5">
                Hidden secondary assignments are suppressed from the grid workspace view.
              </p>
            </div>
          </div>
        )}

        {/* Assessments Card Stack */}
        <div className="space-y-4">
          {sortedTests.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 shadow-sm animate-slideUp">
              <CheckCircle size={44} className="mx-auto mb-3 text-emerald-500" />
              <p className="font-bold text-slate-700 dark:text-slate-300">All caught up!</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-sm mx-auto">
                {showOnlyMyClass 
                  ? `No pending writing assignments are explicitly addressed to ${user?.className} right now.`
                  : 'There are no active custom assignments posted on the system database.'}
              </p>
            </div>
          ) : (
            sortedTests.map((test, index) => {
              const status = getTestTimelineStatus(test.dueDate);
              const isForCurrentUser = isTestForCurrentUser(test);
              const isExpanded = expandedTests.has(test.id);
              const testClasses = getTestClasses(test);

              const cardStyles = {
                'active': 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md',
                'overdue': 'bg-rose-50/40 dark:bg-rose-950/10 border-rose-200 dark:border-rose-900 shadow-sm hover:shadow-md',
                'archive-warning': 'bg-amber-50/40 dark:bg-amber-950/10 border-amber-200 dark:border-amber-900/60 opacity-85 shadow-xs'
              }[status];

              const ribbonStyles = {
                'active': 'bg-indigo-600 text-white',
                'overdue': 'bg-rose-600 text-white',
                'archive-warning': 'bg-amber-500 text-white'
              }[status];

              const statusLabel = {
                'active': 'Active',
                'overdue': 'Overdue',
                'archive-warning': 'Old Task'
              }[status];

              return (
                <div 
                  key={test.id} 
                  className={cn(
                    "test-card rounded-xl border overflow-hidden flex flex-col animate-slideUp",
                    cardStyles
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Card Main Interactive Workspace Panel */}
                  <div className="p-5 sm:p-6 relative">
                    
                    {/* Compact Badge Anchor */}
                    <div className="absolute top-5 right-5 flex items-center gap-2">
                      <span className={cn(
                        "px-2.5 py-1 text-[11px] font-extrabold rounded-md uppercase tracking-wider shadow-xs",
                        ribbonStyles
                      )}>
                        {statusLabel}
                      </span>
                    </div>

                    <div className="pr-24 space-y-1">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight leading-snug">
                        {test.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                          Ref: ID-{test.id.substring(0,6)}
                        </span>
                        {!isForCurrentUser && testClasses.length > 0 && (
                          <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[11px] font-bold px-2 py-0.5 rounded border border-slate-200 dark:border-slate-600">
                            <ArrowLeftRight size={10} />
                            <span>Grade {testClasses.join(', ')}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Meta Timelines Matrix Block */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-3.5 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-800/80 text-xs font-medium">
                      <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
                        <Clock size={15} className={cn(
                          status === 'archive-warning' ? 'text-amber-500' : 
                          status === 'overdue' ? 'text-rose-500' : 'text-indigo-500 dark:text-indigo-400'
                        )} />
                        <span>Should be done before <strong className="text-slate-900 dark:text-slate-200 font-bold">{formatClassroomDate(test.dueDate)}</strong></span>
                      </div>
                      <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
                        <Calendar size={15} className="text-emerald-500 dark:text-emerald-400" />
                        <span>To be marked on <strong className="text-slate-900 dark:text-slate-200 font-bold">{formatClassroomDate(test.markingDate)}</strong></span>
                      </div>
                    </div>

                    {/* Expand Click Action Strip */}
                    <button
                      onClick={() => toggleTestExpansion(test.id)}
                      className="mt-4 w-full flex items-center justify-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/30"
                    >
                      <span>{isExpanded ? 'Hide Questions Deck' : 'View Question Checklist'}</span>
                      <div className={cn("expand-btn", isExpanded && "rotated")}>
                        <ChevronDown size={14} />
                      </div>
                    </button>
                  </div>

                  {/* Fully Fluid Accordion Panel Wrapper */}
                  <div className={cn(
                    "transition-all duration-300 ease-in-out overflow-hidden border-t border-slate-100 dark:border-slate-700/80",
                    isExpanded ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                  )}>
                    <div className="p-5 sm:p-6 bg-slate-50/50 dark:bg-slate-900/10">
                      <p className="text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                        Questions:
                      </p>
                      
                      <div className="space-y-2.5">
                        {test.questions.map((question, qIndex) => (
                          <div 
                            key={qIndex} 
                            className="question-item flex items-start gap-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl hover:shadow-xs transition-all"
                          >
                            <div className={cn(
                              "w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-extrabold text-xs shadow-xs",
                              ribbonStyles
                            )}>
                              {qIndex + 1}
                            </div>
                            <p className="text-slate-800 dark:text-slate-100 text-sm font-medium pt-0.5 leading-relaxed">
                              {question}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Micro Base Badge Footer Info */}
                  <div className="bg-slate-50 dark:bg-slate-800/40 px-5 py-2.5 text-[11px] text-slate-400 dark:text-slate-500 flex justify-between items-center border-t border-slate-100 dark:border-slate-700/60 font-medium">
                    <span>Stay neat.</span>
                    <span className="font-bold tracking-wider uppercase text-[9px] text-slate-300 dark:text-slate-600">Notebook Desk Grid</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}