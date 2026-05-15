import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  Loader2,
  AlertCircle,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { 
  doc, 
  getDoc, 
  collection, 
  getDocs, 
  setDoc, 
  updateDoc, 
  serverTimestamp, 
  increment,
  Timestamp,
  arrayUnion,
  addDoc
} from 'firebase/firestore';
import { db, auth } from '../../firebase/config';
import { useAuthStore } from '../../store/authStore';
import { Test, Question, TestAttempt, OperationType } from '../../types';
import { cn } from '../../lib/utils';
import { handleFirestoreError } from '../../utils/firebaseErrors';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'motion/react';

export const TakeTest: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  
  const [test, setTest] = useState<Test | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [attempt, setAttempt] = useState<TestAttempt | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null); // in seconds
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Fetch data
  useEffect(() => {
    const fetchData = async () => {
      if (!testId || !user) return;

      try {
        // Fetch test
        const testDoc = await getDoc(doc(db, 'tests', testId));
        if (!testDoc.exists()) {
          toast.error('Test not found');
          navigate('/');
          return;
        }
        const testData = { ...testDoc.data(), testId: testDoc.id } as Test;
        setTest(testData);

        // Fetch questions
        const questionsSnapshot = await getDocs(collection(db, `tests/${testId}/questions`));
        const questionsData = questionsSnapshot.docs.map(doc => ({ ...doc.data(), questionId: doc.id } as Question));
        setQuestions(questionsData);

        // Fetch or Create Attempt
        const attemptId = `${user.uid}_${testId}`;
        const attemptDoc = await getDoc(doc(db, 'testAttempts', attemptId));

        if (attemptDoc.exists()) {
          const attemptData = attemptDoc.data() as TestAttempt;
          if (attemptData.isSubmitted) {
            toast.error('You have already submitted this test.');
            navigate('/results');
            return;
          }
          setAttempt(attemptData);

          // Calculate remaining time
          const startedAt = attemptData.startedAt.toDate();
          const elapsedSeconds = Math.floor((new Date().getTime() - startedAt.getTime()) / 1000);
          const totalSeconds = testData.durationMinutes * 60;
          const remaining = Math.max(0, totalSeconds - elapsedSeconds);
          setTimeLeft(remaining);
        } else {
          // Create new attempt
          const newAttempt: TestAttempt = {
            attemptId,
            uid: user.uid,
            testId,
            testName: testData.testName,
            className: testData.className,
            startedAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
            isSubmitted: false,
            score: 0,
            percentage: 0,
            answers: {}
          };
          await setDoc(doc(db, 'testAttempts', attemptId), newAttempt);
          setAttempt(newAttempt);
          setTimeLeft(testData.durationMinutes * 60);
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `tests/${testId}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [testId, user, navigate]);

  // 2. Timer Loop
  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0 && !isSubmitting) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev !== null && prev <= 1) {
            clearInterval(timerRef.current!);
            handleFinalSubmit(); // Auto-submit
            return 0;
          }
          return (prev || 0) - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, isSubmitting]);

  const saveAnswer = async (qId: string, answerIndex: number) => {
    if (!attempt || !test || isSubmitting) return;

    const question = questions.find(q => q.questionId === qId);
    if (!question) return;

    const isCorrect = question.correctAnswerIndex === answerIndex;

    // 1. UI STATE (fast access snapshot)
    const updatedAnswers = {
      ...attempt.answers,
      [qId]: {
        selectedAnswer: answerIndex,
        isCorrect,
        updatedAt: Timestamp.now()
      }
    };

    setAttempt({ ...attempt, answers: updatedAnswers });

    try {
      const attemptRef = doc(db, 'testAttempts', attempt.attemptId);

      // 2. Snapshot update (current state only)
      await updateDoc(attemptRef, {
        [`answers.${qId}`]: {
          selectedAnswer: answerIndex,
          isCorrect,
          updatedAt: serverTimestamp()
        },
        updatedAt: serverTimestamp()
      });

      // 3. IMMUTABLE HISTORY LOG (this is the fix)
      await addDoc(
        collection(db, `testAttempts/${attempt.attemptId}/answerEvents`),
        {
          qId,
          selectedAnswer: answerIndex,
          isCorrect,
          timestamp: serverTimestamp()
        }
      );

    } catch (error) {
      console.error('Failed to save answer:', error);
    }
  };

const handleFinalSubmit = async () => {
  if (!attempt || !test || !user || isSubmitting) return;

  setIsSubmitting(true);
  setShowConfirmModal(false);

  try {
    const attemptRef = doc(db, 'testAttempts', attempt.attemptId);
    const testRef = doc(db, 'tests', test.testId);

    // Always fetch latest attempt from Firestore
    // avoids stale React state issues
    const latestAttemptSnap = await getDoc(attemptRef);

    if (!latestAttemptSnap.exists()) {
      throw new Error('Attempt record not found.');
    }

    const latestAttempt = latestAttemptSnap.data();

    const answers = latestAttempt.answers || {};

    const correctCount = Object.values(answers)
      .filter((ans: any) => ans?.isCorrect)
      .length;

    const percentage =
      questions.length > 0
        ? Math.round((correctCount / questions.length) * 100)
        : 0;

    // Lock and finalize attempt
    await updateDoc(attemptRef, {
      isSubmitted: true,
      submittedAt: serverTimestamp(),
      score: correctCount,
      percentage,
      updatedAt: serverTimestamp(),
      locked: true
    });

    // Update test metadata
    await updateDoc(testRef, {
      submittedUIDs: arrayUnion(user.uid),
      updatedAt: serverTimestamp()
    });

    // IMPORTANT:
    // create parent test document so it can be queried later
    await setDoc(
      doc(db, 'testResults', user.uid, 'tests', test.testId),
      {
        testId: test.testId,
        testName: test.testName,
        className: test.className,
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );

    // Store immutable result snapshot
    await addDoc(
      collection(
        db,
        'testResults',
        user.uid,
        'tests',
        test.testId,
        'results'
      ),
      {
        attemptId: attempt.attemptId,
        uid: user.uid,
        testId: test.testId,
        testName: test.testName,
        className: test.className,

        score: correctCount,
        percentage,
        totalQuestions: questions.length,

        answers,

        submittedAt: serverTimestamp(),
        createdAt: serverTimestamp()
      }
    );

    toast.success('Test submitted successfully!');
    navigate('/results');

  } catch (error) {
    console.error('Submission error:', error);
    toast.error('Failed to submit test.');
  } finally {
    setIsSubmitting(false);
  }
};

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (isLoading || !test || !attempt) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Preparing your examination...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIdx];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white capitalize">{test.testName}</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Class {test.className} • {questions.length} Questions</p>
        </div>

        <div className={cn(
          "flex items-center gap-3 px-5 py-2.5 rounded-2xl border-2 transition-colors",
          (timeLeft || 0) < 60 
            ? "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-600 dark:text-red-400 animate-pulse" 
            : "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300"
        )}>
          <Clock className="w-5 h-5" />
          <span className="text-xl font-mono font-bold tracking-wider">{timeLeft !== null ? formatTime(timeLeft) : '--:--'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                 <HelpCircle className="w-4 h-4 text-indigo-500" />
                 Progress
              </h3>
              <div className="grid grid-cols-5 gap-2">
                 {questions.map((q, idx) => {
                    const isAnswered = !!attempt.answers[q.questionId];
                    return (
                      <button
                        key={q.questionId}
                        onClick={() => setCurrentQuestionIdx(idx)}
                        className={cn(
                          "aspect-square rounded-xl flex items-center justify-center font-bold text-xs transition-all",
                          currentQuestionIdx === idx 
                            ? "ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-950" 
                            : "",
                          isAnswered
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        )}
                      >
                         {idx + 1}
                      </button>
                    );
                 })}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-50 dark:border-slate-800">
                 <button
                   onClick={() => setShowConfirmModal(true)}
                   className="w-full flex items-center justify-center gap-2 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 dark:shadow-none transition-all active:scale-95"
                 >
                   <Send className="w-4 h-4" />
                   Submit Test
                 </button>
              </div>
           </div>
           
           <div className="hidden lg:block bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-800">
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">Instructions</p>
              <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-2">
                 <li className="flex gap-2"><span>•</span> Do not refresh the page during the exam.</li>
                 <li className="flex gap-2"><span>•</span> Answers are saved automatically.</li>
                 <li className="flex gap-2"><span>•</span> The test will auto-submit when time is up.</li>
              </ul>
           </div>
        </div>

        {/* Question Area */}
        <div className="lg:col-span-3">
           <AnimatePresence mode="wait">
             <motion.div
               key={currentQuestionIdx}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-sm min-h-[500px] flex flex-col"
             >
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                      {currentQuestionIdx + 1}
                   </div>
                   <div className="h-0.5 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full" />
                   <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Question Information</span>
                </div>

                <div className="flex-1 space-y-8">
                   <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                     {currentQuestion.questionText}
                   </h2>

                   {currentQuestion.imageUrl && (
                     <div className="rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 max-h-[300px]">
                        <img src={currentQuestion.imageUrl} alt="Context" className="w-full h-full object-contain bg-slate-50 dark:bg-slate-800/50" />
                     </div>
                   )}

                   <div className="grid grid-cols-1 gap-4">
                      {currentQuestion.options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => saveAnswer(currentQuestion.questionId, idx)}
                          className={cn(
                            "group flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left",
                            attempt.answers[currentQuestion.questionId]?.selectedAnswer === idx
                              ? "bg-indigo-50 dark:bg-indigo-900/40 border-indigo-500 ring-2 ring-indigo-500/10"
                              : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-slate-700"
                          )}
                        >
                          <div className={cn(
                            "w-8 h-8 rounded-xl border flex items-center justify-center font-bold text-sm transition-colors",
                            attempt.answers[currentQuestion.questionId]?.selectedAnswer === idx
                              ? "bg-indigo-600 border-indigo-600 text-white"
                              : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                          )}>
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <span className={cn(
                            "flex-1 text-base font-medium",
                            attempt.answers[currentQuestion.questionId]?.selectedAnswer === idx
                              ? "text-indigo-900 dark:text-white"
                              : "text-slate-600 dark:text-slate-400"
                          )}>
                            {option}
                          </span>
                        </button>
                      ))}
                   </div>
                </div>

                <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-50 dark:border-slate-800">
                   <button
                     disabled={currentQuestionIdx === 0}
                     onClick={() => setCurrentQuestionIdx(currentQuestionIdx - 1)}
                     className="flex items-center gap-2 px-6 py-3 text-slate-500 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-all disabled:opacity-30"
                   >
                      <ChevronLeft className="w-5 h-5" />
                      Previous
                   </button>
                   
                   {currentQuestionIdx === questions.length - 1 ? (
                     <button
                       onClick={() => setShowConfirmModal(true)}
                       className="flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-100 dark:shadow-none transition-all active:scale-95"
                     >
                        Finish Test
                        <CheckCircle2 className="w-5 h-5" />
                     </button>
                   ) : (
                     <button
                       onClick={() => setCurrentQuestionIdx(currentQuestionIdx + 1)}
                       className="flex items-center gap-2 px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl shadow-lg shadow-slate-200 dark:shadow-none hover:scale-105 transition-all"
                     >
                        Next Question
                        <ChevronRight className="w-5 h-5" />
                     </button>
                   )}
                </div>
             </motion.div>
           </AnimatePresence>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] p-8 text-center border border-slate-100 dark:border-slate-800 shadow-2xl"
           >
              <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
                 <AlertCircle className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Ready to submit?</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8">
                You've answered {Object.keys(attempt.answers).length} out of {questions.length} questions. You cannot change your answers after submitting.
              </p>
              
              <div className="flex flex-col gap-3">
                 <button
                   onClick={handleFinalSubmit}
                   disabled={isSubmitting}
                   className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 dark:shadow-none transition-all disabled:opacity-50"
                 >
                   {isSubmitting ? (
                     <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                     </span>
                   ) : "Yes, Submit My Test"}
                 </button>
                 <button
                   onClick={() => setShowConfirmModal(false)}
                   disabled={isSubmitting}
                   className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold rounded-2xl hover:bg-slate-200 transition-all disabled:opacity-50"
                 >
                    Cancel
                 </button>
              </div>
           </motion.div>
        </div>
      )}
    </div>
  );
};
