import React, { useState, useEffect } from 'react';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  BarChart3,
  Calendar,
  Loader2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  doc,
  getDoc,
  collection,
  getDocs,
  orderBy,
  query
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuthStore } from '../../store/authStore';
import { Question, Test, TestAttempt } from '../../types';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

type ResultDoc = {
  id: string;
  attemptId: string;
  uid: string;
  testId: string;
  testName: string;
  className: string;
  score: number;
  percentage: number;
  totalQuestions: number;
  answers: Record<
    string,
    {
      selectedAnswer: number;
      isCorrect: boolean;
    }
  >;
  submittedAt?: any;
  createdAt?: any;
};

export const MyResults: React.FC = () => {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [expandedResult, setExpandedResult] = useState<string | null>(null);
  const [questionsMap, setQuestionsMap] = useState<Record<string, Question[]>>({});
  const [testMap, setTestMap] = useState<Record<string, Test>>({});
  const [results, setResults] = useState<ResultDoc[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const testsRoot = collection(db, 'testResults', user.uid, 'tests');
        const testsSnap = await getDocs(testsRoot);

        const allResults: any[] = [];

        for (const testDoc of testsSnap.docs) {
          const testId = testDoc.id;
          const resultsRef = collection(db, 'testResults', user.uid, 'tests', testId, 'results');
          const resultsSnap = await getDocs(query(resultsRef, orderBy('submittedAt', 'desc')));

          resultsSnap.docs.forEach((docSnap) => {
            allResults.push({
              id: docSnap.id,
              ...docSnap.data()
            });
          });
        }

        allResults.sort((a, b) => {
          const aTime = a.submittedAt?.toDate?.()?.getTime?.() ?? 0;
          const bTime = b.submittedAt?.toDate?.()?.getTime?.() ?? 0;
          return bTime - aTime;
        });

        setResults(allResults as TestAttempt[]);
      } catch (error) {
        console.error('Error fetching results:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [user]);

  const loadReview = async (result: ResultDoc) => {
    const testId = result.testId;

    if (!questionsMap[testId]) {
      const [qSnapshot, testSnap] = await Promise.all([
        getDocs(collection(db, `tests/${testId}/questions`)),
        testMap[testId] ? Promise.resolve(null) : getDoc(doc(db, 'tests', testId))
      ]);

      const qData = qSnapshot.docs.map((docSnap) => ({
        ...docSnap.data(),
        questionId: docSnap.id
      } as Question));

      setQuestionsMap((prev) => ({ ...prev, [testId]: qData }));

      if (testSnap && testSnap.exists()) {
        setTestMap((prev) => ({
          ...prev,
          [testId]: { ...testSnap.data(), testId: testSnap.id } as Test
        }));
      }
    }

    setExpandedResult((prev) => (prev === result.id ? null : result.id));
  };

  const getCorrectAnswerText = (q: Question) => q.options?.[q.correctAnswerIndex] ?? 'N/A';

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
        <p className="text-slate-500">Retrieving your performance records...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          My Test Results
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Review your history and performance analytics
        </p>
      </div>

      {results.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-100 dark:border-slate-800 shadow-sm">
          <BarChart3 className="w-16 h-16 text-slate-200 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">No results yet</h3>
          <p className="text-slate-500">Complete a test to see your performance here.</p>
          <button
            onClick={() => navigate('/tests')}
            className="mt-6 px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all"
          >
            Go to Tests
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((result) => (
            <div
              key={result.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden"
            >
              <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      'w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl transition-colors',
                      result.percentage >= 80
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : result.percentage >= 50
                        ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                        : 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                    )}
                  >
                    {Math.round(result.percentage)}%
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white capitalize">
                      {result.testName}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {result.submittedAt ? format(result.submittedAt.toDate(), 'PPP') : 'N/A'}
                      </span>
                      <span className="w-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full" />
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        Score: {result.score}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => loadReview(result)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                  >
                    {expandedResult === result.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                    Review Questions
                  </button>
                  <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
                    <Trophy className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {expandedResult === result.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 px-6 py-8"
                  >
                    {!questionsMap[result.testId] ? (
                      <div className="flex justify-center p-8">
                        <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {questionsMap[result.testId].map((q, idx) => {
                          const userAns = result.answers?.[q.questionId];
                          const selectedIndex = userAns?.selectedAnswer;
                          const isCorrect = userAns?.isCorrect;
                          const correctAnswerText = getCorrectAnswerText(q);

                          return (
                            <div
                              key={q.questionId}
                              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm"
                            >
                              <div className="flex items-start gap-4">
                                <div
                                  className={cn(
                                    'w-8 h-8 shrink-0 rounded-lg flex items-center justify-center font-bold text-sm',
                                    isCorrect ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                                  )}
                                >
                                  {idx + 1}
                                </div>

                                <div className="flex-1 space-y-4">
                                  <div>
                                    <h4 className="text-slate-900 dark:text-white font-semibold mb-2 leading-snug">
                                      {q.questionText}
                                    </h4>

                                    {typeof selectedIndex === 'number' ? (
                                      <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Your answer:{' '}
                                        <span className={cn(isCorrect ? 'text-emerald-600' : 'text-red-600')}>
                                          {String.fromCharCode(65 + selectedIndex)}. {q.options[selectedIndex]}
                                        </span>
                                      </p>
                                    ) : (
                                      <p className="text-sm text-slate-500 dark:text-slate-400">
                                        You did not answer this question.
                                      </p>
                                    )}

                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                      Correct answer:{' '}
                                      <span className="text-emerald-600">
                                        {String.fromCharCode(65 + q.correctAnswerIndex)}. {correctAnswerText}
                                      </span>
                                    </p>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {q.options.map((opt, oIdx) => {
                                      const isSelected = selectedIndex === oIdx;
                                      const isCorrectAnswer = q.correctAnswerIndex === oIdx;

                                      return (
                                        <div
                                          key={oIdx}
                                          className={cn(
                                            'p-3 rounded-xl border-2 text-sm font-medium flex items-center gap-3 transition-colors',
                                            isCorrectAnswer
                                              ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-700 dark:text-emerald-400'
                                              : isSelected && !isCorrectAnswer
                                              ? 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-400'
                                              : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500'
                                          )}
                                        >
                                          <div
                                            className={cn(
                                              'w-6 h-6 rounded-full flex items-center justify-center shrink-0 border',
                                              isCorrectAnswer
                                                ? 'bg-emerald-500 border-emerald-500 text-white'
                                                : isSelected && !isCorrectAnswer
                                                ? 'bg-red-500 border-red-500 text-white'
                                                : 'bg-slate-100 border-slate-200 text-slate-400'
                                            )}
                                          >
                                            {String.fromCharCode(65 + oIdx)}
                                          </div>
                                          <span>{opt}</span>
                                          {isCorrectAnswer && <CheckCircle2 className="w-4 h-4 ml-auto" />}
                                          {isSelected && !isCorrectAnswer && (
                                            <XCircle className="w-4 h-4 ml-auto" />
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};