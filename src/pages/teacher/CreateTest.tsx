import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  CheckCircle2, 
  Save, 
  Calendar, 
  Clock, 
  ClipboardList,
  ChevronRight,
  ChevronLeft,
  Loader2,
  X
} from 'lucide-react';
import { collection, doc, addDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase/config';
import { cn } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';
import { notify } from '@/src/utils/toast';
import { motion } from 'motion/react';

// Define the available classes for the checklist selection
const AVAILABLE_CLASSES = ['5A', '5B', '5D', '6C', '6D'];

interface QuestionDraft {
  questionText: string;
  imageUrl?: string;
  options: string[];
  correctAnswerIndex: number;
}

export const CreateTest: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Test Details
  const [testName, setTestName] = useState('');
  // Changed from string to string[] to hold multiple target streams
  const [targetClasses, setTargetClasses] = useState<string[]>(['5D']);
  const [duration, setDuration] = useState(30);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // Questions
  const [questions, setQuestions] = useState<QuestionDraft[]>([
    { questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 }
  ]);
  const [activeQuestion, setActiveQuestion] = useState(0);

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 }]);
    setActiveQuestion(questions.length);
  };

  const removeQuestion = (index: number) => {
    if (questions.length === 1) return;
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
    if (activeQuestion >= newQuestions.length) {
      setActiveQuestion(newQuestions.length - 1);
    }
  };

  const updateQuestion = (index: number, field: keyof QuestionDraft, value: any) => {
    const newQuestions = [...questions];
    (newQuestions[index] as any)[field] = value;
    setQuestions(newQuestions);
  };

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  // Toggle selection function for managing classes array
  const handleClassToggle = (cls: string) => {
    if (targetClasses.includes(cls)) {
      // Keep at least one class checked to avoid submitting empty targets
      if (targetClasses.length > 1) {
        setTargetClasses(targetClasses.filter(c => c !== cls));
      } else {
        notify.error("Please select at least one target class.");
      }
    } else {
      setTargetClasses([...targetClasses, cls]);
    }
  };

  const d = new Date(endTime);
  const formattedDate =
    `${d.getDate().toString().padStart(2, '0')} ` +
    `${d.toLocaleString('en-GB', { month: 'short' })}, ` +
    `${d.getFullYear()} at ` +
    `${d.getHours().toString().padStart(2, '0')}:` +
    `${d.getMinutes().toString().padStart(2, '0')}`;

  const handleSubmit = async () => {
    const loader = notify.loading('Creating tests...');
    if (!testName || !startTime || !endTime) {
      notify.updateError(loader, 'Please fill in all test details.');
      return;
    }

    if (targetClasses.length === 0) {
      notify.updateError(loader, 'Please select at least one target class.');
      return;
    }

    if (questions.some(q => !q.questionText || q.options.some(o => !o))) {
      notify.updateError(loader, 'Please complete all questions and options.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Loop through each selected class stream and deploy a dedicated instance of the test
      for (const targetClass of targetClasses) {
        
        // 1. Create unique base configuration per stream
        const testRef = await addDoc(collection(db, 'tests'), {
          testName,
          className: targetClass,
          durationMinutes: Number(duration),
          createdBy: auth.currentUser?.uid,
          createdAt: serverTimestamp(),
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          isActive: true,
          timestamp: serverTimestamp(),
          submittedUIDs: [],
          markingScheme: questions.reduce((acc, q, idx) => {
            acc[`question_${idx}`] = 1;
            return acc;
          }, {} as Record<string, number>)
        });

        // 2. Add individual questions to subcollections for this specific test document
        for (let i = 0; i < questions.length; i++) {
          const q = questions[i];
          const imageUrl = q.imageUrl || '';

          const questionRef = doc(collection(db, `tests/${testRef.id}/questions`));
          await setDoc(questionRef, {
            questionId: questionRef.id,
            questionText: q.questionText,
            imageUrl,
            options: q.options,
            correctAnswerIndex: q.correctAnswerIndex,
            answeredUsers: []
          });
        }

        // 3. Dispatch separate system notifications tailored to each stream
        await addDoc(collection(db, 'notifications'), {
          title: `New test for ${targetClass}`,
          message: `A new multiple choice test "${testName}" has been created for Grade ${targetClass}. Attempt it before ${formattedDate}!`,
          createdAt: serverTimestamp(),
        });
      }

      // Update the structural timestamp metadata once after entire batch ends
      await setDoc(
        doc(db, 'notifications', 'latestNotification'),
        {
          timestamp: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      
      notify.updateSuccess(loader, `Successfully published tests to ${targetClasses.join(', ')}!`);
      navigate('/');
    } catch (error: any) {
      console.error('Error creating batch tests:', error);
      notify.updateError(loader, 'Failed to create tests: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
   <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        ease: 'easeOut',
      }}
      className="h-full"
    >
      <div className="w-full pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Create New Test</h1>
            <p className="text-slate-500 dark:text-slate-400">Design your examination questions and settings</p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            <span>{isSubmitting ? 'Publishing...' : 'Publish Test'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Test Configuration */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-indigo-500" />
                Test Configuration
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Test Name</label>
                  <input
                    type="text"
                    value={testName}
                    onChange={e => setTestName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none dark:text-white text-sm"
                    placeholder="Final Term Examination"
                  />
                </div>

                {/* Updated Target Streams Section */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                    Target Streams (Select multiple)
                  </label>
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl">
                    {AVAILABLE_CLASSES.map((cls) => {
                      const isSelected = targetClasses.includes(cls);
                      return (
                        <button
                          key={cls}
                          type="button"
                          onClick={() => handleClassToggle(cls)}
                          className={cn(
                            "px-3 py-1.5 text-xs font-bold rounded-lg transition-all border",
                            isSelected 
                              ? "bg-indigo-600 text-white border-indigo-600" 
                              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                          )}
                        >
                          {cls}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Duration (Min)</label>
                  <input
                    type="number"
                    value={duration}
                    onChange={e => setDuration(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none dark:text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Start Time
                  </label>
                  <input
                    type="datetime-local"
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none dark:text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                    <Clock className="w-3 h-3" /> End Time
                  </label>
                  <input
                    type="datetime-local"
                    value={endTime}
                    onChange={e => setEndTime(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none dark:text-white text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Question Navigator</h3>
              <div className="grid grid-cols-5 gap-2">
                  {questions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveQuestion(i)}
                      className={cn(
                        "aspect-square flex items-center justify-center rounded-xl font-bold text-sm transition-all",
                        activeQuestion === i 
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none"
                          : "bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-slate-100"
                      )}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={addQuestion}
                    className="aspect-square flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-indigo-600 border-2 border-dashed border-indigo-300 dark:border-indigo-900 hover:bg-indigo-50 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
              </div>
            </div>
          </div>

          {/* Right Column: Question Editor */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm min-h-[600px] flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div className="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-bold uppercase tracking-widest">
                      Question {activeQuestion + 1} of {questions.length}
                  </div>
                  {questions.length > 1 && (
                      <button 
                        onClick={() => removeQuestion(activeQuestion)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                  )}
                </div>

                <div className="space-y-6 flex-1">
                  <div>
                      <textarea
                        value={questions[activeQuestion].questionText}
                        onChange={e => updateQuestion(activeQuestion, 'questionText', e.target.value)}
                        placeholder="Enter your question text here..."
                        className="w-full text-xl font-medium bg-transparent border-none focus:ring-0 outline-none placeholder-slate-300 dark:text-white resize-none min-h-[100px]"
                      />
                  </div>

                    {/* Optional Image URL */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                          Optional Image URL
                        </label>

                        <input
                          type="url"
                          value={questions[activeQuestion].imageUrl || ''}
                          onChange={(e) =>
                            updateQuestion(activeQuestion, 'imageUrl', e.target.value)
                          }
                          placeholder="https://example.com/image.jpg"
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none dark:text-white text-sm"
                        />
                      </div>

                      {questions[activeQuestion].imageUrl && (
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          <img
                            src={questions[activeQuestion].imageUrl}
                            alt="Question Preview"
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />

                          <button
                            onClick={() =>
                              updateQuestion(activeQuestion, 'imageUrl', '')
                            }
                            className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {questions[activeQuestion].options.map((option, oIndex) => (
                          <div 
                            key={oIndex}
                            className={cn(
                              "flex items-center gap-3 p-4 rounded-2xl border transition-all",
                              questions[activeQuestion].correctAnswerIndex === oIndex 
                                ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500" 
                                : "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700"
                            )}
                          >
                            <button
                              onClick={() => updateQuestion(activeQuestion, 'correctAnswerIndex', oIndex)}
                              className={cn(
                                "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                                questions[activeQuestion].correctAnswerIndex === oIndex
                                  ? "bg-emerald-500 border-emerald-500 text-white"
                                  : "border-slate-300 hover:border-emerald-400"
                              )}
                            >
                              {questions[activeQuestion].correctAnswerIndex === oIndex && <CheckCircle2 className="w-4 h-4" />}
                            </button>
                            <input
                              type="text"
                              value={option}
                              onChange={e => updateOption(activeQuestion, oIndex, e.target.value)}
                              className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-sm dark:text-white"
                              placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                            />
                          </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-8 border-t border-slate-50 dark:border-slate-800">
                  <button
                    disabled={activeQuestion === 0}
                    onClick={() => setActiveQuestion(activeQuestion - 1)}
                    className="flex items-center gap-2 px-6 py-2.5 text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl disabled:opacity-30 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                  </button>
                  <button
                    disabled={activeQuestion === questions.length - 1}
                    onClick={() => setActiveQuestion(activeQuestion + 1)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium hover:scale-105 rounded-xl disabled:opacity-30 transition-all"
                  >
                    Next Question
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
