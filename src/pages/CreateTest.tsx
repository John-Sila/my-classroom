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
    setQuestions([...questions, newQuestion]);
    setActiveQuestionIndex(questions.length);
  };

  const handleQuestionChange = (id: string, field: string, value: any) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const handleOptionChange = (qId: string, optIndex: number, value: string) => {
    setQuestions(questions.map(q => {
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
        markingScheme[`question_${idx + 1}`] = 1; // Basic marking
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
          <h1 className="text-3xl font-bold tracking-tight">Create New Test</h1>
          <p className="text-slate-500 font-medium">Design your examination questions</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/teacher')}
            className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-soft"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : <><Save size={20} /> Publish Test</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Test Settings */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-soft border border-slate-100 dark:border-slate-800 space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2 text-blue-600">
              <Calendar size={20} /> General Settings
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Examination Name</label>
                <input 
                  type="text" 
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  placeholder="e.g. Mathematics Mid-Term"
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Target Class</label>
                  <select 
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option value="5D">5D</option>
                    <option value="4A">4A</option>
                    <option value="3B">3B</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Duration (Min)</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="number" 
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Start Time</label>
                <input 
                  type="datetime-local" 
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">End Time</label>
                <input 
                  type="datetime-local" 
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-3xl border border-blue-100 dark:border-blue-900/30">
            <h4 className="font-bold text-blue-900 dark:text-blue-300 text-sm mb-2">Question Summary</h4>
            <div className="flex flex-wrap gap-2">
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveQuestionIndex(i)}
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all",
                    activeQuestionIndex === i 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" 
                      : "bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700 hover:border-blue-300"
                  )}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                onClick={handleAddQuestion}
                className="w-10 h-10 rounded-xl bg-dashed bg-white dark:bg-slate-800 border-2 border-dashed border-blue-300 dark:border-blue-900 text-blue-500 flex items-center justify-center hover:bg-blue-50 transition-colors"
              >
                <Plus size={20} />
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
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-soft border border-slate-100 dark:border-slate-800 space-y-8"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-3">
                  <span className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-500">
                    {activeQuestionIndex + 1}
                  </span>
                  Edit Question
                </h3>
                {questions.length > 1 && (
                  <button 
                    onClick={() => {
                      const newQs = questions.filter(q => q.id !== activeQ.id);
                      setQuestions(newQs);
                      setActiveQuestionIndex(Math.max(0, activeQuestionIndex - 1));
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Question Prompt</label>
                  <textarea 
                    value={activeQ.questionText}
                    onChange={(e) => handleQuestionChange(activeQ.id, 'questionText', e.target.value)}
                    rows={3}
                    placeholder="Enter the question text here..."
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Image Upload Area */}
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Reference Image (Optional)</label>
                    {activeQ.imageUrl ? (
                      <div className="relative rounded-2xl overflow-hidden group">
                        <img src={activeQ.imageUrl} alt="Question" className="w-full h-48 object-cover" />
                        <button 
                          onClick={() => handleQuestionChange(activeQ.id, 'imageUrl', '')}
                          className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <ImageIcon className="text-slate-400 mb-2" size={32} />
                          <p className="text-sm text-slate-500 font-medium">Upload question image</p>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleImageUpload(activeQ.id, e.target.files[0])} />
                      </label>
                    )}
                  </div>

                  {/* Options Selector */}
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Options & Correct Answer</label>
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
                                ? "border-emerald-500 ring-2 ring-emerald-500/10 focus:ring-emerald-500" 
                                : "border-slate-200 dark:border-slate-700 focus:ring-blue-500"
                            )}
                          />
                          <button
                            type="button"
                            onClick={() => handleQuestionChange(activeQ.id, 'correctAnswerIndex', idx)}
                            className={cn(
                              "absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs transition-colors",
                              activeQ.correctAnswerIndex === idx 
                                ? "bg-emerald-500 text-white" 
                                : "bg-slate-200 dark:bg-slate-700 text-slate-500 hover:bg-slate-300"
                            )}
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

              <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                <button
                  disabled={activeQuestionIndex === 0}
                  onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
                  className="flex items-center gap-2 px-6 py-2 text-slate-500 hover:text-blue-600 disabled:opacity-30 transition-all font-bold"
                >
                  <ChevronLeft size={20} /> Previous
                </button>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                  Question {activeQuestionIndex + 1} of {questions.length}
                </div>
                <button
                  disabled={activeQuestionIndex === questions.length - 1}
                  onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
                  className="flex items-center gap-2 px-6 py-2 text-slate-500 hover:text-blue-600 disabled:opacity-30 transition-all font-bold"
                >
                  Next <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
