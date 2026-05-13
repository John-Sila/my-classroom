import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  Calendar,
  Clock,
  ChevronRight,
  ChevronLeft,
  Save,
  CheckCircle2
} from 'lucide-react';
import { FirestoreService } from '../services/firestore';
import { useAuthStore } from '../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../lib/firebase';
import { cn } from '../lib/utils';

interface QuestionDraft {
  id: string;
  questionText: string;
  imageUrl?: string;
  options: string[];
  correctAnswerIndex: number;
}

export default function CreateTest() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [testName, setTestName] = useState('');
  const [className, setClassName] = useState('5D');
  const [duration, setDuration] = useState(30);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const [questions, setQuestions] = useState<QuestionDraft[]>([
    { id: crypto.randomUUID(), questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 }
  ]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddQuestion = () => {
    const newQuestion = { id: crypto.randomUUID(), questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 };
    setQuestions(prev => [...prev, newQuestion]);
    setActiveQuestionIndex(questions.length);
  };

  const handleQuestionChange = (id: string, field: string, value: any) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const handleOptionChange = (qId: string, optIndex: number, value: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === qId) {
        const newOptions = [...q.options];
        newOptions[optIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const handleImageUpload = async (qId: string, file: File) => {
    const storageRef = ref(storage, `questions/${qId}/${file.name}`);
    try {
      toast.loading('Uploading image...', { id: 'upload' });
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      handleQuestionChange(qId, 'imageUrl', url);
      toast.success('Image uploaded!', { id: 'upload' });
    } catch (error) {
      toast.error('Image upload failed', { id: 'upload' });
    }
  };

  const handleSubmit = async () => {
    if (!testName || !startTime || !endTime) {
      toast.error('Please fill in test details');
      return;
    }

    if (questions.some(q => !q.questionText || q.options.some(o => !o))) {
      toast.error('Please complete all questions and options');
      return;
    }

    setIsSubmitting(true);
    try {
      const markingScheme: Record<string, number> = {};
      questions.forEach((q, idx) => {
        markingScheme[`question_${idx + 1}`] = 1;
      });

      const testData = {
        testName,
        className,
        durationMinutes: duration,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        createdBy: user?.uid,
        markingScheme
      };

      await FirestoreService.createTest(testData, questions);
      toast.success('Test created successfully!');
      navigate('/teacher');
    } catch (error) {
      toast.error('Failed to create test');
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeQ = questions[activeQuestionIndex];

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Create New Test</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Design your examination questions</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/teacher')}
            className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all shadow-sm text-slate-700 dark:text-slate-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : <><Save size={18} /> Publish Test</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Test Settings */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <Calendar size={18} className="text-slate-600 dark:text-slate-300" /> General Settings
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Examination Name</label>
                <input
                  type="text"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  placeholder="e.g. Mathematics Mid-Term"
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Target Class</label>
                  <select
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 dark:text-slate-100"
                  >
                    <option value="5D">5D</option>
                    <option value="4A">4A</option>
                    <option value="3B">3B</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Duration (Min)</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={16} />
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 dark:text-slate-100"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Start Time</label>
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">End Time</label>
                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-neutral-50 dark:bg-transparent">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm mb-2">Question Summary</h4>
            <div className="flex flex-wrap gap-2">
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveQuestionIndex(i)}
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all",
                    activeQuestionIndex === i
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white dark:bg-slate-800 text-slate-600 border border-slate-200 dark:border-slate-700 hover:border-blue-300"
                  )}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={handleAddQuestion}
                className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                title="Add question"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Question Editor */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeQ.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-3 text-slate-900 dark:text-slate-100">
                  <span className="w-9 h-9 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold">
                    {activeQuestionIndex + 1}
                  </span>
                  Edit Question
                </h3>
                {questions.length > 1 && (
                  <button
                    onClick={() => {
                      const newQs = questions.filter(q => q.id !== activeQ.id);
                      setQuestions(newQs);
                      setActiveQuestionIndex(prev => Math.max(0, prev - 1));
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Remove question"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Question Prompt</label>
                  <textarea
                    value={activeQ.questionText}
                    onChange={(e) => handleQuestionChange(activeQ.id, 'questionText', e.target.value)}
                    rows={3}
                    placeholder="Enter the question text here..."
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Image Upload Area */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Reference Image (Optional)</label>
                    {activeQ.imageUrl ? (
                      <div className="relative rounded-xl overflow-hidden group">
                        <img src={activeQ.imageUrl} alt="Question" className="w-full h-48 object-cover" />
                        <button
                          onClick={() => handleQuestionChange(activeQ.id, 'imageUrl', '')}
                          className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Remove image"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ) : (
                      <label
                        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <ImageIcon className="text-slate-400 dark:text-slate-500 mb-2" size={28} />
                          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Upload question image (optional)</p>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleImageUpload(activeQ.id, e.target.files[0])} />
                      </label>
                    )}
                  </div>

                  {/* Options Selector */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Options & Correct Answer</label> 

                    <div className="space-y-3">
                      {activeQ.options.map((option, idx) => (
                        <div key={idx} className="relative">
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(activeQ.id, idx, e.target.value)}
                            placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                            className={cn(
                              "w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none transition-all",
                              activeQ.correctAnswerIndex === idx
                                ? "border-emerald-500 ring-2 ring-emerald-500/10 focus:ring-emerald-500 text-slate-900 dark:text-slate-100"
                                : "border-slate-200 dark:border-slate-700 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
                            )}
                          />
                          <button
                            type="button"
                            onClick={() => handleQuestionChange(activeQ.id, 'correctAnswerIndex', idx)}
                            className={cn(
                              "absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md flex items-center justify-center font-semibold text-xs transition-colors",
                              activeQ.correctAnswerIndex === idx
                                ? "bg-emerald-500 text-white"
                                : "bg-slate-200 dark:bg-slate-700 text-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600"
                            )}
                            title={activeQ.correctAnswerIndex === idx ? 'Correct answer' : `Mark ${String.fromCharCode(65 + idx)} as correct`}
                          >
                            {String.fromCharCode(65 + idx)}
                          </button>

                          {activeQ.correctAnswerIndex === idx && (
                            <CheckCircle2 size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  disabled={activeQuestionIndex === 0}
                  onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
                  className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 disabled:opacity-30 transition-all font-semibold"
                >
                  <ChevronLeft size={16} /> Previous
                </button>

                <div className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-widest">
                  Question {activeQuestionIndex + 1} of {questions.length}
                </div>

                <button
                  disabled={activeQuestionIndex === questions.length - 1}
                  onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
                  className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 disabled:opacity-30 transition-all font-semibold"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}