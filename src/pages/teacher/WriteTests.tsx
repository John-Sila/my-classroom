import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Calendar, 
  FileText, 
  ListOrdered, 
  CheckCircle, 
  ArrowUp, 
  ArrowDown, 
  Clock,
  LayoutGrid,
  Send,
  X,
  AlertTriangle
} from 'lucide-react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '@/src/firebase/config';
import { notify } from '@/src/utils/toast';
import { cn } from '@/src/lib/utils';

// Define available class streams
const AVAILABLE_CLASSES = ['5A', '5B', '5D', '6C', '6D'];

// Define the structure of a Test Document
interface HomeworkTest {
  id?: string;
  title: string;
  questions: string[];
  dueDate: string;
  markingDate: string;
  targetClasses: string[];
  postedOn: any;
}

// Confirmation Dialog Component
interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDangerous?: boolean;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  isDangerous = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with animation */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={onCancel}
      />
      
      {/* Dialog with animation */}
      <div 
        className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-scaleIn border border-slate-200 dark:border-slate-700"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 
              id="dialog-title"
              className="text-xl font-bold text-slate-900 dark:text-white"
            >
              {title}
            </h3>
            <button
              onClick={onCancel}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>
          </div>
          
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            {message}
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors ${
                isDangerous 
                  ? 'bg-rose-600 hover:bg-rose-700 text-white' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function WritingTestsManager() {
  // Navigation View State: 'write' or 'existing'
  const [activeTab, setActiveTab] = useState<'write' | 'existing'>('write');
  
  // Form States
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [markingDate, setMarkingDate] = useState('');
  const [targetClasses, setTargetClasses] = useState<string[]>([]);
  const [questions, setQuestions] = useState<string[]>(['']);
  const [loading, setLoading] = useState(false);

  // Existing Tests State
  const [existingTests, setExistingTests] = useState<HomeworkTest[]>([]);
    const [submitDialog, setSubmitDialog] = useState({
    isOpen: false,
    title: '',
    questions: [] as string[],
    dueDate: '',
    markingDate: '',
    targetClasses: [] as string[]
    });

  // Confirmation Dialog State
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: '',
    cancelText: '',
    onConfirm: () => {},
    isDangerous: false
  });

  // Fetch tests when viewing the "Existing Tests" tab
  useEffect(() => {
    if (activeTab === 'existing') {
      fetchTests();
    }
  }, [activeTab]);

  const fetchTests = async () => {
    const loader = notify.loading('Loading existing tests...');
    try {
      const testsRef = collection(db, 'writing_tests');
      // Sorting by postedOn descending so newest appears first
      const q = query(testsRef, orderBy('postedOn', 'desc'));
      const querySnapshot = await getDocs(q);

      const tests: HomeworkTest[] = [];
      querySnapshot.forEach((doc) => {
        tests.push({ id: doc.id, ...doc.data() } as HomeworkTest);
      });
      notify.updateSuccess(loader, 'Tests loaded successfully!');
      setExistingTests(tests);
    } catch (error) {
      console.error("Error fetching tests: ", error);
      notify.updateError(loader, "Failed to load tests. Check your Firestore Security Rules.");
    }
  };

  // Handle class toggle for target classes
  const handleClassToggle = (cls: string) => {
    setTargetClasses(prev => {
      if (prev.includes(cls)) {
        return prev.filter(c => c !== cls);
      } else {
        return [...prev, cls];
      }
    });
  };

  // Question Array Handlers
  const handleQuestionChange = (index: number, value: string) => {
    const updated = [...questions];
    updated[index] = value;
    setQuestions(updated);
  };

  const addQuestionField = () => {
    setQuestions([...questions, '']);
  };

  const removeQuestionField = (index: number) => {
    if (questions.length === 1) {
      setQuestions(['']); // Keep at least one empty field
    } else {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  // Question Ordering (Array manipulation)
  const moveQuestion = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === questions.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...questions];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setQuestions(updated);
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

    // Update handleSubmitTest to open dialog instead of submitting directly
    const handleSubmitTest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clean up empty questions
    const cleanQuestions = questions.filter(q => q.trim() !== '');
    if (!title || cleanQuestions.length === 0 || !dueDate || !markingDate || targetClasses.length === 0) {
        notify.updateError(null, "Please fill in all fields, add at least one question, and select target classes.");
        return;
    }

    // Open confirmation dialog instead of submitting
    setSubmitDialog({
        isOpen: true,
        title,
        questions: cleanQuestions,
        dueDate,
        markingDate,
        targetClasses
    });
    };

    // New function to handle confirmed submission
    const handleConfirmedSubmit = async () => {
    const loader = notify.loading('Publishing test...');
    
    setSubmitDialog(prev => ({ ...prev, isOpen: false }));
    setLoading(true);
    
    try {
        await addDoc(collection(db, 'writing_tests'), {
        title: submitDialog.title,
        questions: submitDialog.questions,
        dueDate: submitDialog.dueDate,
        markingDate: submitDialog.markingDate,
        targetClasses: submitDialog.targetClasses,
        postedOn: serverTimestamp()
        });

        // Reset form
        setTitle('');
        setQuestions(['']);
        setDueDate('');
        setMarkingDate('');
        setTargetClasses([]);
        notify.updateSuccess(loader, "Test successfully posted for learners!");
        setActiveTab('existing');
    } catch (error) {
        console.error("Error adding test: ", error);
        notify.updateError(loader, "Error saving test. Ensure you have the correct permissions.");
    } finally {
        setLoading(false);
    }
    };

    // Close dialog handler
    const closeSubmitDialog = () => {
    setSubmitDialog(prev => ({ ...prev, isOpen: false }));
    };

  // Delete an existing test with confirmation dialog
  const handleDeleteTest = async (id: string) => {
    setDialog({
      isOpen: true,
      title: 'Delete Test',
      message: 'Are you sure you want to delete this test permanently? This action cannot be undone.',
      confirmText: 'Delete Permanently',
      cancelText: 'Cancel',
      onConfirm: () => {
        setDialog(prev => ({ ...prev, isOpen: false }));
        executeDelete(id);
      },
      isDangerous: true
    });
  };

  const executeDelete = async (id: string) => {
    const loader = notify.loading('Deleting test...');
    try {
      await deleteDoc(doc(db, 'writing_tests', id));
      setExistingTests(existingTests.filter(test => test.id !== id));
      notify.updateSuccess(loader, 'Test deleted successfully!');
    } catch (error) {
      console.error("Error deleting document: ", error);
      notify.updateError(loader, "Could not delete document.");
    }
  };

  const closeDialog = () => {
    setDialog(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes ripple {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(4); opacity: 0; }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
        
        .tab-button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .tab-button.active {
          transform: translateY(-2px);
        }
        .question-item {
          transition: all 0.2s ease;
        }
        .question-item:hover {
          transform: translateX(4px);
        }
        .test-card {
          transition: all 0.3s ease;
        }
        .test-card:hover {
          transform: translateY(-4px);
        }
        .class-btn {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .class-btn:hover {
          transform: scale(1.05);
        }
      `}</style>

      <div className="max-w-4xl mx-auto p-6 bg-slate-50 dark:bg-slate-900 min-h-screen rounded-xl shadow-sm dark:shadow-slate-800/50">
        
        {/* Dynamic Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-slate-200 dark:border-slate-700 pb-5 gap-4">
          <div className="animate-slideUp">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <FileText className="text-indigo-600 dark:text-indigo-400" size={28} /> 
              Classroom Test Hub
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Manage, construct, and coordinate your classroom assessments.
            </p>
          </div>

          {/* Creative Top Slider Tab with animation */}
          <div className="relative flex bg-slate-200 dark:bg-slate-700 p-1 rounded-full w-72 shadow-inner animate-slideUp">
            <button
              onClick={() => setActiveTab('write')}
              className={`tab-button flex-1 flex items-center justify-center gap-2 text-sm font-medium py-2 px-4 rounded-full ${
                activeTab === 'write' 
                  ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-400 shadow-sm active' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              } transition-all duration-200`}
            >
              <Plus size={16} /> Write Test
            </button>
            <button
              onClick={() => setActiveTab('existing')}
              className={`tab-button flex-1 flex items-center justify-center gap-2 text-sm font-medium py-2 px-4 rounded-full ${
                activeTab === 'existing' 
                  ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-400 shadow-sm active' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              } transition-all duration-200`}
            >
              <LayoutGrid size={16} /> Existing Tests
            </button>
          </div>
        </div>

        {/* --- WRITE TEST TAB --- */}
        {activeTab === 'write' && (
          <form onSubmit={handleSubmitTest} className="space-y-6 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm animate-slideUp">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Test Title / Topic
              </label>
              <input 
                type="text"
                placeholder="e.g., Weekly Creative Writing, Algebra Assignment 1"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white transition-colors"
              />
            </div>

            {/* Dates Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800 animate-slideUp">
                <label className="flex items-center gap-2 text-sm font-semibold text-amber-800 dark:text-amber-300 mb-2">
                  <Clock size={16} /> Should be done before (Due Date)
                </label>
                <input 
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 border border-amber-200 dark:border-amber-700 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 text-slate-900 dark:text-white"
                />
              </div>
              <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800 animate-slideUp">
                <label className="flex items-center gap-2 text-sm font-semibold text-indigo-800 dark:text-indigo-300 mb-2">
                  <CheckCircle size={16} /> To be marked on (Grading Date)
                </label>
                <input 
                  type="date"
                  value={markingDate}
                  onChange={(e) => setMarkingDate(e.target.value)}
                  className="w-full px-3 py-2 border border-indigo-200 dark:border-indigo-700 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Updated Target Streams Section */}
            <div className="animate-slideUp">
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
                        "class-btn px-3 py-1.5 text-xs font-bold rounded-lg transition-all border",
                        isSelected 
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-sm" 
                          : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                      )}
                      aria-pressed={isSelected}
                    >
                      {cls}
                    </button>
                  );
                })}
              </div>
              {targetClasses.length > 0 && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  {targetClasses.length} class{targetClasses.length > 1 ? 's' : ''} selected: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{targetClasses.join(', ')}</span>
                </p>
              )}
            </div>

            {/* Dynamic Orderable Questions Array */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <ListOrdered size={18} className="text-indigo-600 dark:text-indigo-400" /> 
                Loopable Question Sequence
              </label>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Rearrange item sequences using up/down toggles before publication.
              </p>
              
              {questions.map((question, index) => (
                <div 
                  key={index} 
                  className="question-item flex items-center gap-2 group bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg border border-slate-200 dark:border-slate-600 animate-slideUp"
                >
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 w-6 text-center">
                    {index + 1}.
                  </span>
                  <input 
                    type="text"
                    placeholder={`Type question details here...`}
                    value={question}
                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-slate-900 dark:text-white"
                  />
                  
                  {/* Ordering Array Buttons */}
                  <div className="flex flex-col md:flex-row gap-1">
                    <button 
                      type="button"
                      onClick={() => moveQuestion(index, 'up')}
                      disabled={index === 0}
                      className="p-1 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-30 transition-colors rounded hover:bg-slate-100 dark:hover:bg-slate-600"
                      aria-label="Move question up"
                    >
                      <ArrowUp size={16} />
                    </button>
                    <button 
                      type="button"
                      onClick={() => moveQuestion(index, 'down')}
                      disabled={index === questions.length - 1}
                      className="p-1 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-30 transition-colors rounded hover:bg-slate-100 dark:hover:bg-slate-600"
                      aria-label="Move question down"
                    >
                      <ArrowDown size={16} />
                    </button>
                  </div>

                  <button 
                    type="button"
                    onClick={() => removeQuestionField(index)}
                    className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 rounded transition-colors hover:bg-rose-50 dark:hover:bg-rose-900/20"
                    aria-label="Delete question"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addQuestionField}
                className="mt-2 flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-2 py-1 rounded"
              >
                <Plus size={14} /> Append New Question Row
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50 hover:shadow-lg active:scale-95"
            >
              <Send size={16} /> {loading ? 'Publishing Task...' : 'Publish Test Assignment'}
            </button>
          </form>
        )}

        {/* Submission Confirmation Dialog */}
        {submitDialog.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-4">
            {/* Backdrop with animation */}
            <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
            onClick={closeSubmitDialog}
            />
            
            {/* Dialog with animation - responsive sizing */}
            <div 
            className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg animate-scaleIn border border-slate-200 dark:border-slate-700 overflow-y-auto max-h-[90vh]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="submit-dialog-title"
            >
            <div className="p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
                    <CheckCircle className="text-indigo-600 dark:text-indigo-400" size={20} />
                    </div>
                    <h3 
                    id="submit-dialog-title"
                    className="text-lg font-bold text-slate-900 dark:text-white"
                    >
                    Confirm Submission
                    </h3>
                </div>
                <button
                    onClick={closeSubmitDialog}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                    aria-label="Close dialog"
                >
                    <X size={18} />
                </button>
                </div>

                {/* Test Details - Compact */}
                <div className="space-y-3 mb-4">
                {/* Title */}
                <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg border border-slate-200 dark:border-slate-600">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Test
                    </p>
                    <p className="text-base font-bold text-slate-900 dark:text-white line-clamp-2">
                    {submitDialog.title}
                    </p>
                </div>

                {/* Dates - Inline */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-amber-50/50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-100 dark:border-amber-800">
                    <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Clock size={10} /> Due
                    </p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {formatClassroomDate(submitDialog.dueDate)}
                    </p>
                    </div>
                    <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-3 rounded-lg border border-indigo-100 dark:border-indigo-800">
                    <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <CheckCircle size={10} /> Mark
                    </p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {formatClassroomDate(submitDialog.markingDate)}
                    </p>
                    </div>
                </div>

                {/* Target Classes - Compact */}
                <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg border border-slate-200 dark:border-slate-600">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Classes ({submitDialog.targetClasses.length})
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                    {submitDialog.targetClasses.slice(0, 4).map((cls, idx) => (
                        <span 
                        key={cls}
                        className="px-2 py-0.5 text-xs font-bold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-md border border-indigo-200 dark:border-indigo-800"
                        >
                        {cls}
                        </span>
                    ))}
                    {submitDialog.targetClasses.length > 4 && (
                        <span className="px-2 py-0.5 text-xs font-bold bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-md">
                        +{submitDialog.targetClasses.length - 4} more
                        </span>
                    )}
                    </div>
                </div>

                {/* Questions Count Only */}
                <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg border border-slate-200 dark:border-slate-600">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <ListOrdered size={10} /> Questions
                    </p>
                    <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
                    {submitDialog.questions.length} question{submitDialog.questions.length > 1 ? 's' : ''}
                    </p>
                </div>
                </div>

                {/* Warning Message - Compact */}
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-2.5 mb-4">
                <p className="text-xs text-amber-800 dark:text-amber-300 flex items-start gap-1.5">
                    <AlertTriangle size={12} className="shrink-0 mt-0.5" />
                    <span>
                    This will be visible to all learners in selected classes.
                    </span>
                </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2.5">
                <button
                    onClick={closeSubmitDialog}
                    className="flex-1 px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleConfirmedSubmit}
                    disabled={loading}
                    className="flex-1 px-3 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    <Send size={14} />
                    {loading ? 'Publishing...' : 'Confirm'}
                </button>
                </div>
            </div>
            </div>
        </div>
        )}

        {/* --- EXISTING TESTS TAB --- */}
        {activeTab === 'existing' && (
          <div className="space-y-4 animate-slideUp">
            {existingTests.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 text-slate-400 dark:text-slate-500 animate-slideUp">
                <FileText size={48} className="mx-auto mb-2 opacity-50" />
                <p>No test assets currently active in writing_tests/ collection.</p>
              </div>
            ) : (
              existingTests.map((test, index) => (
                <div 
                  key={test.id} 
                  className="test-card bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm hover:shadow-xl transition animate-slideUp"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                        {test.title}
                      </h3>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                        ID Ref: {test.id}
                      </p>
                    </div>
                    <button
                      onClick={() => test.id && handleDeleteTest(test.id)}
                      className="text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 p-2 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition"
                      title="Delete Test Document"
                      aria-label={`Delete ${test.title}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Target Classes Meta */}
                  {test.targetClasses && test.targetClasses.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 my-3">
                      {test.targetClasses.map((cls) => (
                        <span 
                          key={cls}
                          className="px-2 py-0.5 text-xs font-bold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-md border border-indigo-200 dark:border-indigo-800"
                        >
                          {cls}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Deadlines Meta */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4 bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-amber-500 dark:text-amber-400" />
                      <span>Complete Before: <strong className="text-slate-800 dark:text-slate-200">{test.dueDate}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-emerald-500 dark:text-emerald-400" />
                      <span>Marking Schedule: <strong className="text-slate-800 dark:text-slate-200">{test.markingDate}</strong></span>
                    </div>
                  </div>

                  {/* Output for Learners to Loop / Transcribe */}
                  <div className="border-t border-slate-100 dark:border-slate-700 pt-3">
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">
                      Questions List ({test.questions.length})
                    </span>
                    <ol className="list-decimal list-inside space-y-1.5 text-sm text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-700/30 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                      {test.questions.map((q, idx) => (
                        <li key={idx} className="pl-1 py-0.5">
                          <span className="text-slate-800 dark:text-slate-200">{q}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Confirmation Dialog */}
        <ConfirmationDialog
          isOpen={dialog.isOpen}
          title={dialog.title}
          message={dialog.message}
          confirmText={dialog.confirmText}
          cancelText={dialog.cancelText}
          onConfirm={dialog.onConfirm}
          onCancel={closeDialog}
          isDangerous={dialog.isDangerous}
        />
      </div>
    </>
  );
}