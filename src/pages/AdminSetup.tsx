import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { FirestoreService } from '../services/firestore';
import { GraduationCap, Shield, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AdminSetup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await FirestoreService.createUserProfile({
        uid: userCredential.user.uid,
        email,
        userName: email.split('@')[0],
        fullName,
        rank: 'teacher',
        className: 'ADMIN',
        photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=admin`
      });
      toast.success('Admin teacher created! You are now logged in.');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-soft border">
        <div className="flex flex-col items-center gap-4 mb-8">
           <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-white">
            <Shield size={40} />
          </div>
          <h1 className="text-2xl font-bold">Initial Admin Setup</h1>
          <p className="text-slate-500 text-sm text-center">No accounts found. Create the first Teacher account to get started.</p>
        </div>

        <form onSubmit={handleSetup} className="space-y-4">
          <input 
            type="text" 
            placeholder="Full Name" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-4 bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none"
            required
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none"
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none"
            required
          />
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold flex items-center justify-center gap-2"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Create Teacher Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
