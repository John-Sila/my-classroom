import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell
} from 'recharts';
import { 
  collection, 
  query, 
  getDocs, 
  where,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Test, TestAttempt, Question } from '../../types';
import { 
  Filter, 
  CheckCircle2,
  XCircle,
  HelpCircle,
  TrendingUp,
  Loader2
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const ResultsAnalytics: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [selectedTestId, setSelectedTestId] = useState<string>('');
  const [attempts, setAttempts] = useState<TestAttempt[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'tests'), (snap) => {
      const testsData = snap.docs.map(doc => ({ ...doc.data(), testId: doc.id } as Test));
      setTests(testsData);
      if (testsData.length > 0 && !selectedTestId) {
        setSelectedTestId(testsData[0].testId);
      }
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!selectedTestId) return;

    const fetchDetails = async () => {
      const attemptsQ = query(collection(db, 'testAttempts'), where('testId', '==', selectedTestId));
      const attemptsSnap = await getDocs(attemptsQ);
      setAttempts(attemptsSnap.docs.map(doc => doc.data() as TestAttempt));

      const questionsSnap = await getDocs(collection(db, `tests/${selectedTestId}/questions`));
      setQuestions(questionsSnap.docs.map(doc => doc.data() as Question));
    };

    fetchDetails();
  }, [selectedTestId]);

  // Data for question difficulty analysis
  const questionDifficultyData = questions.map((q, idx) => {
    const totalAnswered = attempts.filter(a => !!a.answers[q.questionId]).length;
    const correctCount = attempts.filter(a => a.answers[q.questionId]?.isCorrect).length;
    const successRate = totalAnswered > 0 ? (correctCount / totalAnswered) * 100 : 0;

    return {
      name: `Q${idx + 1}`,
      successRate,
      fullText: q.questionText
    };
  });

  const COLORS = ['#10B981', '#F59E0B', '#EF4444'];
  const distributionData = [
    { name: 'Excellent', value: attempts.filter(a => a.percentage >= 80).length },
    { name: 'Good', value: attempts.filter(a => a.percentage >= 50 && a.percentage < 80).length },
    { name: 'Needs Work', value: attempts.filter(a => a.percentage < 50).length },
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Results Analytics</h1>
           <p className="text-slate-500 dark:text-slate-400 font-medium">Deep dive into test performance and question insights</p>
        </div>

        <div className="flex items-center gap-3">
           <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select 
                value={selectedTestId}
                onChange={(e) => setSelectedTestId(e.target.value)}
                className="pl-9 pr-8 py-2.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 outline-none shadow-sm"
              >
                {tests.map(t => (
                  <option key={t.testId} value={t.testId}>{t.testName} ({t.className})</option>
                ))}
              </select>
           </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
           <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Summary Graphs */}
           <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white">Question Success Rate (%)</h3>
                 <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/40 rounded-xl">
                    <TrendingUp className="w-5 h-5 text-indigo-500" />
                 </div>
              </div>
              <div className="h-80 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={questionDifficultyData}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                       <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                       <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                       <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                       />
                       <Bar dataKey="successRate">
                          {questionDifficultyData.map((entry, index) => (
                             <Cell key={index} fill={entry.successRate > 70 ? '#10B981' : entry.successRate > 40 ? '#F59E0B' : '#EF4444'} radius={[6, 6, 0, 0]} />
                          ))}
                       </Bar>
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>

           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Score Distribution</h3>
              <div className="h-64 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie
                         data={distributionData}
                         cx="50%"
                         cy="50%"
                         innerRadius={60}
                         outerRadius={80}
                         paddingAngle={5}
                         dataKey="value"
                       >
                         {distributionData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                         ))}
                       </Pie>
                       <Tooltip />
                    </PieChart>
                 </ResponsiveContainer>
              </div>
              <div className="mt-4 flex flex-col gap-3">
                 {distributionData.map((d, index) => (
                    <div key={d.name} className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <div className={cn("w-3 h-3 rounded-md", index === 0 ? "bg-emerald-500" : index === 1 ? "bg-amber-500" : "bg-red-500")} />
                          <span className="text-sm font-medium text-slate-500">{d.name}</span>
                       </div>
                       <span className="text-sm font-bold text-slate-900 dark:text-white">{d.value} Learners</span>
                    </div>
                 ))}
              </div>
           </div>

           {/* Question by Question Detailed Performance */}
           <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
                 <HelpCircle className="w-5 h-5 text-indigo-500" />
                 Question Detailed Performance
              </h3>

              <div className="space-y-4">
                 {questions.map((q, idx) => {
                    const totalAnswered = attempts.filter(a => !!a.answers[q.questionId]).length;
                    const correctCount = attempts.filter(a => a.answers[q.questionId]?.isCorrect).length;
                    const rate = totalAnswered > 0 ? (correctCount / totalAnswered) * 100 : 0;
                    
                    return (
                       <div key={q.questionId} className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div className="flex gap-4">
                             <div className="w-10 h-10 shrink-0 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 shadow-sm">
                                {idx + 1}
                             </div>
                             <div>
                                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug">{q.questionText}</h4>
                                <div className="flex items-center gap-4 mt-2">
                                   <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                                      <CheckCircle2 className="w-3.5 h-3.5" /> {correctCount} Correct
                                   </span>
                                   <span className="flex items-center gap-1.5 text-xs font-semibold text-red-500">
                                      <XCircle className="w-3.5 h-3.5" /> {totalAnswered - correctCount} Wrong
                                   </span>
                                </div>
                             </div>
                          </div>

                          <div className="flex flex-col items-end gap-2 shrink-0">
                             <div className="text-right">
                                <span className={cn(
                                   "text-lg font-bold",
                                   rate > 70 ? "text-emerald-500" : rate > 40 ? "text-amber-500" : "text-red-500"
                                )}>{Math.round(rate)}% Success Rate</span>
                             </div>
                             <div className="w-40 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div 
                                  className={cn(
                                    "h-full rounded-full transition-all duration-1000",
                                    rate > 70 ? "bg-emerald-500" : rate > 40 ? "bg-amber-500" : "bg-red-500"
                                  )} 
                                  style={{ width: `${rate}%` }} 
                                />
                             </div>
                          </div>
                       </div>
                    );
                 })}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
