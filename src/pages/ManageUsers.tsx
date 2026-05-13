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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Manage Users</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Create and manage learner accounts</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 md:px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md transition-all flex items-center gap-2"
        >
          <UserPlus size={18} /> Add Learner
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search by name, username or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-900 dark:text-slate-100"
            />
          </div>
          <button className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <Filter size={18} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/30">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Learner</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Class</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Role</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-6 py-6">
                      <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-xl" />
                    </td>
                  </tr>
                ))
              ) : filteredLearners.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-slate-500 dark:text-slate-400">
                    <div className="flex flex-col items-center gap-3">
                      <Users size={52} className="text-slate-300 dark:text-slate-700" />
                      <p className="text-lg font-bold text-slate-900 dark:text-slate-100">No learners found</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Try adjusting your search or add a new learner.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLearners.map((learner) => (
                  <tr key={learner.uid} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={learner.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${learner.userName}`}
                          className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-800"
                          alt=""
                        />
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-slate-100">{learner.fullName}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">@{learner.userName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                        Class {learner.className}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <GraduationCap size={16} className="text-slate-600 dark:text-slate-300" />
                        <span className="text-sm font-medium capitalize">{learner.rank}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/40">
                        <CheckCircle2 size={14} /> Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 rounded-lg transition-opacity opacity-0 group-hover:opacity-100">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 12 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Register New Learner</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Add a student to your digital classroom</p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-600 text-white shadow-md">
                    <UserPlus size={20} />
                  </div>
                </div>

                <form onSubmit={handleCreateUser} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full name</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full mt-2 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Username</label>
                      <input
                        type="text"
                        required
                        value={formData.userName}
                        onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                        placeholder="johndoe24"
                        className="w-full mt-2 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email address</label>
                      <div className="relative mt-2">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={16} />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="learner@school.com"
                          className="w-full pl-10 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Temporary password</label>
                      <div className="relative mt-2">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={16} />
                        <input
                          type="password"
                          required
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          placeholder="••••••••"
                          className="w-full pl-10 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Assign class</label>
                      <select
                        value={formData.className}
                        onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                        className="w-full mt-2 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
                      >
                        <option value="5D">Class 5D</option>
                        <option value="4A">Class 4A</option>
                        <option value="3B">Class 3B</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Account role</label>
                      <div className="mt-2 flex gap-2">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, rank: 'learner' })}
                          className={cn(
                            "flex-1 p-3 rounded-xl font-semibold border-2 transition-all",
                            formData.rank === 'learner'
                              ? "bg-blue-50 border-blue-600 text-blue-700 dark:bg-blue-900/10 dark:text-blue-300"
                              : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                          )}
                        >
                          <GraduationCap size={16} /> Learner
                        </button>

                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, rank: 'teacher' })}
                          className={cn(
                            "flex-1 p-3 rounded-xl font-semibold border-2 transition-all",
                            formData.rank === 'teacher'
                              ? "bg-purple-50 border-purple-600 text-purple-700 dark:bg-purple-900/10 dark:text-purple-300"
                              : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                          )}
                        >
                          <Shield size={16} /> Teacher
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-200 transition-all"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" /> : 'Create account'}
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