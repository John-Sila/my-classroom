import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Send,
  AlertTriangle,
  Loader2,
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { doc, getDoc, getDocs, collection, setDoc, updateDoc, serverTimestamp, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthStore } from '../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'react-hot-toast';
import { cn } from '../lib/utils';
import type { Test, Question, TestAttempt } from '../types';
import { differenceInSeconds } from 'date-fns';

export default function TakeTest() {
  const { testId } = useParams<{ testId: string }>();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [test, setTest] = useState<Test | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [attempt, setAttempt] = useState<TestAttempt | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (!testId || !user) return;

    const initTest = async () => {
      try {
        const testDoc = await getDoc(doc(db, 'tests', testId));
        if (!testDoc.exists()) {
          toast.error('Test not found');
          navigate('/learner');
          return;
        }
        const testData = { ...testDoc.data(), id: testDoc.id } as Test;
        setTest(testData);

        const questionsSnap = await getDocs(collection(db, `tests/${testId}/questions`));
        setQuestions(questionsSnap.docs.map(doc => ({ ...doc.data(), questionId: doc.id })) as Question[]);

        // Check for existing attempt
        const attemptsQ = query(collection(db, 'testAttempts'), where('testId', '==', testId), where('uid', '==', user.uid));
        const attemptsSnap = await getDocs(attemptsQ);
        
        let currentAttempt: TestAttempt;
        if (attemptsSnap.empty) {
          // Create new attempt
          const newAttempt: Partial<TestAttempt> = {
            uid: user.uid,
            testId,
            testName: testData.testName,
            className: testData.className,
            startedAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            isSubmitted: false,
            score: 0,
            percentage: 0,
            answers: {}
          };
          const attemptRef = doc(collection(db, 'testAttempts'));
          await setDoc(attemptRef, newAttempt);
          currentAttempt = { ...newAttempt, id: attemptRef.id } as TestAttempt;
        } else {
          currentAttempt = { ...attemptsSnap.docs[0].data(), id: attemptsSnap.docs[0].id } as TestAttempt;
          if (currentAttempt.isSubmitted) {
            navigate(`/learner/results/${currentAttempt.id}`);
            return;
          }
        }
        setAttempt(currentAttempt);

        // Timer logic
        const startedAt = currentAttempt.startedAt?.toDate?.() || new Date();
        const totalSeconds = testData.durationMinutes * 60;
        const elapsedSeconds = differenceInSeconds(new Date(), startedAt);
        const remaining = Math.max(0, totalSeconds - elapsedSeconds);
        setTimeLeft(remaining);

      } catch (error) {
        console.error(error);
        toast.error('Failed to load test');
      } finally {
        setIsLoading(false);
      }
    };

    initTest();
  }, [testId, user, navigate]);

  useEffect(() => {
    if (timeLeft > 0 && !attempt?.isSubmitted) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, attempt?.isSubmitted]);

  const handleAutoSubmit = () => {
    toast.error('Time is up! Submitting your test...');
    submitTest();
  };

  const saveAnswer = async (qId: string, answerIdx: number) => {
    if (!attempt || attempt.isSubmitted) return;

    const isCorrect = questions.find(q => q.questionId === qId)?.correctAnswerIndex === answerIdx;
    
    const newAnswers = {
      ...attempt.answers,
      [qId]: {
        selectedAnswer: answerIdx,
        isCorrect,
        updatedAt: new Date()
      }
    };

    setAttempt({ ...attempt, answers: newAnswers });

    try {
      await updateDoc(doc(db, 'testAttempts', attempt.id), {
        answers: newAnswers,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Failed to save answer', error);
    }
  };

  const submitTest = async () => {
    if (!attempt || isSubmitting) return;

    setIsSubmitting(true);
    try {
      let score = 0;
      Object.keys(attempt.answers).forEach(qId => {
        if (attempt.answers[qId].isCorrect) score++;
      });
      
      const percentage = (score / questions.length) * 100;

      await updateDoc(doc(db, 'testAttempts', attempt.id), {
        isSubmitted: true,
        score,
        percentage,
        submittedAt: serverTimestamp()
      });

      // Update user overall scores
      if (user) {
        await updateDoc(doc(db, 'users', user.uid), {
          [`scores.${test?.testName}`]: percentage
        });
      }

      toast.success('Test submitted successfully!');
      navigate(`/learner/results/${attempt.id}`);
    } catch (error) {
      toast.error('Failed to submit test');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading || !test || !attempt) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-blue-600" size={48} />
        <p className="text-slate-500 font-medium italic">Preparing your examination...</p>
      </div>
    );
  }

  const activeQ = questions[activeIdx];
  const isAnswered = (idx: number) => attempt.answers[questions[idx]?.questionId] !== undefined;

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 pb-20">
      {/* Question Navigation Sidebar */}
      <div className="lg:w-72 shrink-0 space-y-6 order-2 lg:order-1">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-soft border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
            <Clock className={cn(timeLeft < 60 ? "text-red-500 animate-pulse" : "text-blue-600")} size={24} />
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Time Remaining</p>
              <p className="text-2xl font-bold font-mono">{formatTime(timeLeft)}</p>
            </div>
          </div>

          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Questions</h3>
          <div className="grid grid-cols-4 gap-3">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={cn(
                  "w-10 h-10 rounded-xl font-bold text-sm transition-all relative",
                  activeIdx === i ? "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900" : "",
                  isAnswered(i) 
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                )}
              >
                {i + 1}
                {isAnswered(i) && (
                  <div className="absolute -top-1 -right-1 bg-white dark:bg-slate-700 rounded-full text-emerald-500 border border-emerald-500">
                    <CheckCircle2 size={12} />
                  </div>
                )}
              </button>
            ))}
          </div>

          <button 
            onClick={() => {
              if (window.confirm('Are you sure you want to submit your test?')) {
                submitTest();
              }
            }}
            className="w-full mt-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group"
          >
            Submit Test <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/10 p-5 rounded-3xl border border-amber-100 dark:border-amber-900/30 flex gap-3">
          <AlertTriangle className="text-amber-500 shrink-0" size={20} />
          <p className="text-xs text-amber-700 dark:text-amber-400 font-medium leading-relaxed">
            Your progress is saved automatically. If you lose connection, your answers will persist.
          </p>
        </div>
      </div>

      {/* Main Question Area */}
      <div className="flex-grow order-1 lg:order-2 space-y-6">
        <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] shadow-soft border border-slate-100 dark:border-slate-800 min-h-[500px] flex flex-col">
          <div className="flex items-center justify-between mb-10">
            <span className="px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest">
              Question {activeIdx + 1} of {questions.length}
            </span>
            <div className="text-slate-400">
              <HelpCircle size={24} />
            </div>
          </div>

          <div className="flex-grow space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold leading-tight uppercase tracking-tight">
              {activeQ.questionText}
            </h2>

            {activeQ.imageUrl && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-lg"
              >
                <img src={activeQ.imageUrl} alt="Question Reference" className="w-full max-h-[300px] object-contain bg-slate-50 dark:bg-slate-800" />
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeQ.options.map((option, idx) => {
                const selected = attempt.answers[activeQ.questionId]?.selectedAnswer === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => saveAnswer(activeQ.questionId, idx)}
                    className={cn(
                      "group p-5 rounded-[1.5rem] border-2 text-left transition-all flex items-center gap-4 relative",
                      selected 
                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 shadow-lg shadow-blue-500/5" 
                        : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-slate-700"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-all",
                      selected ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600"
                    )}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className={cn("font-bold", selected ? "text-blue-900 dark:text-blue-100" : "text-slate-600 dark:text-slate-400")}>
                      {option}
                    </span>
                    {selected && (
                      <div className="absolute right-4">
                        <CheckCircle2 className="text-blue-600" size={20} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              disabled={activeIdx === 0}
              onClick={() => setActiveIdx(activeIdx - 1)}
              className="flex items-center gap-2 px-6 py-3 bg-slate-50 dark:bg-slate-800 text-slate-500 rounded-2xl font-bold hover:bg-slate-100 transition-all disabled:opacity-30"
            >
              <ChevronLeft size={20} /> Previous
            </button>
            
            <div className="hidden md:flex gap-1.5">
              {questions.map((_, i) => (
                <div key={i} className={cn("w-2 h-2 rounded-full", activeIdx === i ? "bg-blue-500 w-6" : "bg-slate-200 dark:bg-slate-800")} />
              ))}
            </div>

            <button
               disabled={activeIdx === questions.length - 1}
               onClick={() => setActiveIdx(activeIdx + 1)}
               className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all disabled:opacity-30"
            >
              Next <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
