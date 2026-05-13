import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  ChevronLeft,
  Loader2,
  Calendar,
  Clock,
  Target,
  BarChart3
} from 'lucide-react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthStore } from '../store/useStore';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import type { Test, Question, TestAttempt } from '../types';
import { format } from 'date-fns';

export default function TestResults() {
  const { attemptId } = useParams<{ attemptId: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [attempt, setAttempt] = useState<TestAttempt | null>(null);
  const [test, setTest] = useState<Test | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!attemptId) return;
      try {
        const attemptDoc = await getDoc(doc(db, 'testAttempts', attemptId));
        if (!attemptDoc.exists()) {
          navigate('/learner');
          return;
        }
        const attemptData = { ...attemptDoc.data(), id: attemptDoc.id } as TestAttempt;
        setAttempt(attemptData);

        const testDoc = await getDoc(doc(db, 'tests', attemptData.testId));
        if (testDoc.exists()) {
          setTest({ ...testDoc.data(), id: testDoc.id } as Test);
        }

        const questionsSnap = await getDocs(collection(db, `tests/${attemptData.testId}/questions`));
        setQuestions(questionsSnap.docs.map(doc => ({ ...doc.data(), questionId: doc.id })) as Question[]);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [attemptId, navigate]);

  if (loading || !attempt || !test) {
    return (
       <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  const isPass = attempt.percentage >= 50;

  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-8">
      <button 
        onClick={() => navigate('/learner')}
        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors group"
      >
        <ChevronLeft className="group-hover:-translate-x-1 transition-transform" size={20} /> Back to Dashboard
      </button>

      {/* Result Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800"
      >
        <div className={cn(
          "p-12 text-center text-white relative",
          isPass ? "bg-gradient-to-br from-emerald-500 to-teal-600" : "bg-gradient-to-br from-red-500 to-orange-600"
        )}>
          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-[2rem] flex items-center justify-center shadow-xl">
              {isPass ? <Trophy size={48} /> : <Target size={48} />}
            </div>
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Examination Finished!</h1>
              <p className="text-white/80 font-medium">You have completed the <span className="font-bold underline uppercase">{test.testName}</span></p>
            </div>
            
            <div className="flex items-end gap-1">
              <span className="text-7xl font-black">{Math.round(attempt.percentage)}</span>
              <span className="text-2xl font-bold mb-3 opacity-70">%</span>
            </div>

            <div className="flex gap-4 md:gap-8 bg-black/10 backdrop-blur-sm px-8 py-3 rounded-2xl border border-white/10">
               <div className="text-center">
                 <p className="text-[10px] uppercase font-black opacity-60 tracking-widest">Score</p>
                 <p className="text-xl font-bold">{attempt.score} / {questions.length}</p>
               </div>
               <div className="w-px h-10 bg-white/10" />
               <div className="text-center">
                 <p className="text-[10px] uppercase font-black opacity-60 tracking-widest">Result</p>
                 <p className="text-xl font-bold tracking-tight">{isPass ? 'PASSED' : 'FAILED'}</p>
               </div>
            </div>
          </div>

          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="p-8 md:p-12 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
               <Calendar className="text-blue-500" size={24} />
               <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Date</p>
                  <p className="text-sm font-bold">{attempt.submittedAt ? format(attempt.submittedAt.toDate(), 'MMMM d, yyyy') : 'N/A'}</p>
               </div>
            </div>
            <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
               <Clock className="text-blue-500" size={24} />
               <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Completed at</p>
                  <p className="text-sm font-bold">{attempt.submittedAt ? format(attempt.submittedAt.toDate(), 'h:mm a') : 'N/A'}</p>
               </div>
            </div>
            <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
               <BarChart3 className="text-blue-500" size={24} />
               <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Accuracy</p>
                  <p className="text-sm font-bold">{((attempt.score / questions.length) * 100).toFixed(1)}%</p>
               </div>
            </div>
          </div>

          {/* Question Review */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-3 italic uppercase tracking-tight">
               <CheckCircle2 className="text-blue-600" />
               Examination Review
            </h2>
            
            <div className="space-y-6">
              {questions.map((q, idx) => {
                const answer = attempt.answers[q.questionId];
                const isCorrect = answer?.isCorrect;
                
                return (
                  <div 
                    key={q.questionId} 
                    className={cn(
                      "p-8 rounded-[2rem] border-2 transition-all",
                      isCorrect ? "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/30" : "bg-red-50/50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30"
                    )}
                  >
                    <div className="flex justify-between items-start gap-4 mb-6">
                      <div className="flex gap-4">
                         <span className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500 shadow-sm shrink-0">
                           {idx + 1}
                         </span>
                         <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 items-center gap-2">
                           {q.questionText}
                         </h3>
                      </div>
                      {isCorrect ? (
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-emerald-500/20">
                          <CheckCircle2 size={14} /> Correct
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-red-500 text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-red-500/20">
                          <XCircle size={14} /> Incorrect
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {q.options.map((option, optIdx) => {
                        const isStudentAnswer = answer?.selectedAnswer === optIdx;
                        const isCorrectAnswer = q.correctAnswerIndex === optIdx;
                        
                        return (
                          <div 
                            key={optIdx}
                            className={cn(
                              "p-4 rounded-2xl border-2 flex items-center gap-3",
                              isCorrectAnswer 
                                ? "bg-emerald-100 dark:bg-emerald-900/40 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold" 
                                : isStudentAnswer && !isCorrectAnswer
                                ? "bg-red-100 dark:bg-red-900/40 border-red-500 text-red-900 dark:text-red-100 font-bold"
                                : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500 opacity-60"
                            )}
                          >
                            <div className={cn(
                               "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0",
                               isCorrectAnswer ? "bg-emerald-600 text-white" : isStudentAnswer ? "bg-red-600 text-white" : "bg-slate-100 dark:bg-slate-700"
                            )}>
                              {String.fromCharCode(65 + optIdx)}
                            </div>
                            <span className="flex-grow">{option}</span>
                            {isCorrectAnswer && <CheckCircle2 size={16} />}
                            {isStudentAnswer && !isCorrectAnswer && <XCircle size={16} />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
