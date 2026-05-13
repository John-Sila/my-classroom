import React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Lock, 
  Users,
  GraduationCap,
  Shield,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { FirestoreService } from '../services/firestore';
import { db, auth } from '../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'react-hot-toast';
import { cn } from '../lib/utils';
import type { UserProfile, UserRank } from '../types';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

export default function ManageUsers() {
  const [learners, setLearners] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userName: '',
    fullName: '',
    className: '5D',
    rank: 'learner' as UserRank
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchLearners();
  }, []);

  const fetchLearners = async () => {
    setIsLoading(true);
    const data = await FirestoreService.getAllLearners();
    setLearners(data);
    setIsLoading(false);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Secondary App for creating users without logging out the current teacher
      const secondaryApp = initializeApp(firebaseConfig, 'Secondary');
      const secondaryAuth = getAuth(secondaryApp);
      
      const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth, 
        formData.email, 
        formData.password
      );
      
      const newUid = userCredential.user.uid;
      
      await FirestoreService.createUserProfile({
        uid: newUid,
        email: formData.email,
        userName: formData.userName,
        fullName: formData.fullName,
        className: formData.className,
        rank: formData.rank,
        photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.userName}`
      });

      // Cleanup secondary auth session
      await signOut(secondaryAuth);
      
      toast.success('User created successfully!');
      setIsModalOpen(false);
      setFormData({ email: '', password: '', userName: '', fullName: '', className: '5D', rank: 'learner' });
      fetchLearners();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Failed to create user');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredLearners = learners.filter(l => 
    l.fullName.toLowerCase().includes(search.toLowerCase()) || 
    l.userName.toLowerCase().includes(search.toLowerCase()) ||
    l.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
          <p className="text-slate-500 font-medium">Create and manage learner accounts</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
        >
          <UserPlus size={20} /> Add Learner
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-soft border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by name, username or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            />
          </div>
          <button className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-500 hover:text-blue-600 transition-colors">
            <Filter size={20} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-slate-800/30">
              <tr>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-slate-500">Learner</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-slate-500">Class</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-slate-500">Role</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-slate-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-8 py-6">
                      <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-xl" />
                    </td>
                  </tr>
                ))
              ) : filteredLearners.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-500">
                    <div className="flex flex-col items-center gap-2">
                       <Users size={48} className="opacity-20 mb-2" />
                       <p className="text-lg font-bold">No learners found</p>
                       <p className="text-sm">Try adjusting your search or add a new learner.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLearners.map((learner) => (
                  <tr key={learner.uid} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={learner.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${learner.userName}`} 
                          className="w-12 h-12 rounded-2xl bg-blue-50 border border-slate-100 dark:border-slate-800" 
                          alt=""
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-slate-100">{learner.fullName}</p>
                          <p className="text-sm text-slate-500">@{learner.userName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-bold uppercase tracking-wider border border-blue-100 dark:border-blue-900/50">
                        Class {learner.className}
                      </span>
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                         <GraduationCap size={16} />
                         <span className="text-sm font-medium capitalize">{learner.rank}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30">
                        <CheckCircle2 size={12} />
                        Active
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                       <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all shadow-sm opacity-0 group-hover:opacity-100">
                         <MoreVertical size={18} />
                       </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-2xl font-bold">Register New Learner</h2>
                    <p className="text-slate-500">Add a student to your digital classroom</p>
                  </div>
                  <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/20">
                    <UserPlus size={24} />
                  </div>
                </div>

                <form onSubmit={handleCreateUser} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
                       <input 
                        type="text" 
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Username</label>
                       <input 
                        type="text" 
                        required
                        value={formData.userName}
                        onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                        placeholder="johndoe24"
                        className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                       />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                       <div className="relative">
                         <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                         <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="learner@school.com"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                         />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Temporary Password</label>
                       <div className="relative">
                         <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                         <input 
                          type="password" 
                          required
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          placeholder="••••••••"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                         />
                       </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Assign Class</label>
                       <select 
                        value={formData.className}
                        onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                        className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                       >
                         <option value="5D">Class 5D</option>
                         <option value="4A">Class 4A</option>
                         <option value="3B">Class 3B</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Account Role</label>
                       <div className="flex gap-2">
                         <button
                          type="button"
                          onClick={() => setFormData({ ...formData, rank: 'learner' })}
                          className={cn(
                            "flex-1 p-4 rounded-2xl font-bold flex items-center justify-center gap-2 border-2 transition-all",
                            formData.rank === 'learner' ? "bg-blue-50 border-blue-600 text-blue-600" : "border-slate-100 dark:border-slate-800 text-slate-400"
                          )}
                         >
                            <GraduationCap size={18} /> Learner
                         </button>
                         <button
                          type="button"
                          onClick={() => setFormData({ ...formData, rank: 'teacher' })}
                          className={cn(
                            "flex-1 p-4 rounded-2xl font-bold flex items-center justify-center gap-2 border-2 transition-all text-sm",
                            formData.rank === 'teacher' ? "bg-purple-50 border-purple-600 text-purple-600" : "border-slate-100 dark:border-slate-800 text-slate-400"
                          )}
                         >
                            <Shield size={18} /> Teacher
                         </button>
                       </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-bold transition-all hover:bg-slate-200"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/20 transition-all hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Create Account"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
