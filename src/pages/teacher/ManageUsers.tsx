import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical, 
  Shield, 
  Loader2,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { UserProfile } from '../../types';
import { cn } from '../../lib/utils';
import { notify } from '@/src/utils/toast';
import { AnimatePresence, motion } from 'motion/react';

export const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // New User Form State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userName: '',
    fullName: '',
    rank: 'learner' as 'teacher' | 'learner',
    className: ''
  });
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({ ...doc.data() } as UserProfile));
      setUsers(usersData);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    const loader = notify.loading('Creating user...');
    e.preventDefault();
    setIsCreating(true);

    try {
      // In a real production app without a backend, we'd use a secondary Firebase app 
      // instance to avoid signing out the current teacher.
      // For this implementation, we'll demonstrate the direct database update 
      // for the profile while alerting that password-auth creation usually 
      // requires a secondary instance or Firebase Functions.
      
      // I'll import initializeApp and getAuth dynamically or use a secondary instance helper
      const { initializeApp, deleteApp } = await import('firebase/app');
      const { getAuth, createUserWithEmailAndPassword } = await import('firebase/auth');
      const { setDoc, doc, Timestamp } = await import('firebase/firestore');
      const firebaseConfig = (await import('../../../firebase-applet-config.json')).default;

      // 1. Create a secondary app instance
      const secondaryApp = initializeApp(firebaseConfig, "secondary");
      const secondaryAuth = getAuth(secondaryApp);

      // 2. Create the user in Auth
      const userCredential = await createUserWithEmailAndPassword(secondaryAuth, formData.email, formData.password);
      const uid = userCredential.user.uid;

      // 3. Create the profile in Firestore
      const userDocRef = doc(db, 'users', uid);
      const newProfile: UserProfile = {
        uid,
        email: formData.email,
        userName: formData.userName,
        fullName: formData.fullName,
        rank: formData.rank,
        className: formData.className,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        lastLogin: Timestamp.now(),
        photoURL: '',
        isActive: true,
        scores: {}
      };

      await setDoc(userDocRef, newProfile);

      // 4. Cleanup secondary app
      await deleteApp(secondaryApp);

      notify.updateSuccess(loader, `User ${formData.userName} created successfully!`);
      setFormData({
        email: '',
        password: '',
        userName: '',
        fullName: '',
        rank: 'learner',
        className: ''
      });
    } catch (error: any) {
      notify.updateError(loader, error.message);
    } finally {
      setIsCreating(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.className.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">User Management</h1>
          <p className="text-slate-500 dark:text-slate-400">Create and manage learner accounts</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-full md:w-64"
            />
          </div>
          <button className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-400">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create User Form */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm sticky top-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                <UserPlus className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Create New Learner</h2>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Username</label>
                <input
                  type="text"
                  required
                  value={formData.userName}
                  onChange={e => setFormData({ ...formData, userName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none dark:text-white text-sm"
                  placeholder="sila_learner"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none dark:text-white text-sm"
                  placeholder="Sila Jane Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none dark:text-white text-sm"
                  placeholder="learner@school.com"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Password</label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none dark:text-white text-sm"
                  placeholder="Minimum 6 characters"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Class</label>
                  <select
                    value={formData.className}
                    onChange={e => setFormData({ ...formData, className: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none dark:text-white text-sm"
                  >
                    <option value="">Select Class</option>
                    <option value="5D">5D</option>
                    <option value="4A">4A</option>
                    <option value="3B">3B</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Role</label>
                  <select
                    value={formData.rank}
                    onChange={e => setFormData({ ...formData, rank: e.target.value as any })}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none dark:text-white text-sm"
                  >
                    <option value="learner">Learner</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isCreating}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-xl transition-all"
              >
                {isCreating ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Add User</span>}
              </button>
            </form>
          </div>
        </div>

        {/* User List */}
        <div className="lg:col-span-2">
           <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
             <div className="p-6 border-b border-slate-50 dark:border-slate-800">
               <h3 className="font-semibold text-slate-900 dark:text-white">Active Users ({filteredUsers.length})</h3>
             </div>
             
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                   <tr>
                     <th className="px-6 py-4 font-medium">User</th>
                     <th className="px-6 py-4 font-medium">Class</th>
                     <th className="px-6 py-4 font-medium">Status</th>
                     <th className="px-6 py-4 font-medium">Role</th>
                     <th className="px-6 py-4 font-medium text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                   {isLoading ? (
                     <tr>
                       <td colSpan={5} className="px-6 py-12 text-center">
                         <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mx-auto mb-2" />
                         <span className="text-slate-500">Loading users...</span>
                       </td>
                     </tr>
                   ) : filteredUsers.length === 0 ? (
                     <tr>
                       <td colSpan={5} className="px-6 py-12 text-center">
                         <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                         <p className="text-slate-500">No users found.</p>
                       </td>
                     </tr>
                   ) : (
                     filteredUsers.map((user) => (
                       <tr key={user.uid} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => setSelectedUser(user)}
                                className="h-full w-full"
                              >
                                {user.photoURL ? (
                                  <img
                                    src={user.photoURL}
                                    alt={user.fullName}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                ) : (
                                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                                    {user.userName?.[0]?.toUpperCase() || '?'}
                                  </span>
                                )}
                              </button>
                            </div>

                            <div>
                              <p className="text-sm font-medium text-slate-900 dark:text-white">
                                {user.fullName}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                            </div>
                          </div>
                        </td>


                         <td className="px-6 py-4">
                           <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-xs font-medium">
                             {user.className}
                           </span>
                         </td>
                         <td className="px-6 py-4">
                           {user.isActive ? (
                             <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                               <CheckCircle2 className="w-3.5 h-3.5" />
                               <span className="text-xs font-medium">Active</span>
                             </div>
                           ) : (
                             <div className="flex items-center gap-1.5 text-slate-400">
                               <XCircle className="w-3.5 h-3.5" />
                               <span className="text-xs font-medium">Inactive</span>
                             </div>
                           )}
                         </td>
                         <td className="px-6 py-4">
                           <div className={cn(
                             "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                             user.rank === 'teacher' 
                               ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" 
                               : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                           )}>
                             <Shield className="w-3 h-3" />
                             {user.rank}
                           </div>
                         </td>
                         <td className="px-6 py-4 text-right">
                           <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                             <MoreVertical className="w-5 h-5" />
                           </button>
                         </td>
                       </tr>
                     ))
                   )}
                 </tbody>
               </table>
             </div>
           </div>
        </div>
      </div>


      <AnimatePresence>
        {selectedUser && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedUser(null)}
          >
            <motion.div
              className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedUser.photoURL || '/logo.png'}
                  alt={selectedUser.fullName}
                  className="h-80 w-full object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedUser.fullName}
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  @{selectedUser.userName}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50">
                    <p className="text-slate-500">Role</p>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {selectedUser.rank}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50">
                    <p className="text-slate-500">Class</p>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {selectedUser.className || 'N/A'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedUser(null)}
                  className="mt-6 rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
};
