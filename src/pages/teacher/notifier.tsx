import React, { useEffect, useState } from 'react';
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  doc, 
  deleteDoc, 
  Timestamp, 
  addDoc, 
  setDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { cn } from '../../lib/utils';
import { Bell, Send, Sparkles, Type, MessageSquare, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NotificationCreator: React.FC = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

    useEffect(() => {
        const cleanupExpiredNotifications = async () => {
            try {
                const cutoff = Timestamp.fromMillis(Date.now() - ONE_WEEK_MS);

                const q = query(
                    collection(db, 'notifications'),
                    where('createdAt', '<=', cutoff),
                    orderBy('createdAt', 'asc'),
                    limit(200)
                );

                const snap = await getDocs(q);

                const deletes = snap.docs
                    .filter((d) => d.id !== 'latestNotification')
                    .map((d) => deleteDoc(doc(db, 'notifications', d.id)));

                await Promise.all(deletes);
            } catch (error) {
                console.error('Failed to clean expired notifications:', error);
            }
        };

        cleanupExpiredNotifications();
    }, []);

    // Intercept form submission to show the confirmation dialog
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !message.trim()) return;
        setShowConfirm(true);
    };

    // Actual execution block after confirming
    const handleConfirmPublish = async () => {
        setShowConfirm(false);
        setIsSaving(true);

        try {
            const notificationData = {
                title: title.trim(),
                message: message.trim(),
                createdAt: serverTimestamp(),
            };

            await addDoc(collection(db, 'notifications'), notificationData);

            await setDoc(
                doc(db, 'notifications', 'latestNotification'),
                {
                    timestamp: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                },
                { merge: true }
            );

            setTitle('');
            setMessage('');
        } catch (error) {
            console.error('Failed to create notification:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 transition-colors">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                    <div className="mb-8 flex items-center gap-4">
                        <div className="rounded-2xl bg-indigo-600 p-3 shadow-lg shadow-indigo-200 dark:shadow-none">
                            <Bell className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                                Create Notification
                            </h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Write a title and message for users.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-5">
                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                <Type className="h-4 w-4 text-indigo-500" />
                                Title
                            </label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Exam timetable updated"
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                <MessageSquare className="h-4 w-4 text-indigo-500" />
                                Message
                            </label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Write the full notification message..."
                                rows={6}
                                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
                            />
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                <Sparkles className="h-4 w-4 text-amber-500" />
                                Each submit creates one document in notifications/.
                            </div>

                            <button
                                type="submit"
                                disabled={isSaving || !title.trim() || !message.trim()}
                                className={cn(
                                    'inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white transition',
                                    isSaving || !title.trim() || !message.trim()
                                        ? 'cursor-not-allowed bg-slate-400'
                                        : 'bg-indigo-600 hover:bg-indigo-700'
                                )}
                            >
                                <Send className="h-4 w-4" />
                                {isSaving ? 'Saving...' : 'Publish Notification'}
                            </button>
                        </div>
                    </form>
                </motion.div>

                <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white/60 p-5 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
                    Latest notification timestamp is stored in
                    <span className="font-semibold text-slate-900 dark:text-white">
                        {' '}
                        notifications/latestNotification/timestamp
                    </span>
                    .
                </div>
            </div>

            {/* Confirmation Dialog Overlay */}
            <AnimatePresence>
                {showConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowConfirm(false)}
                            className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs"
                        />

                        {/* Modal Surface */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 8 }}
                            transition={{ type: 'spring', duration: 0.3 }}
                            className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
                                    <AlertTriangle className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                        Confirm Publication
                                    </h3>
                                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                        Are you sure you want to broadcast this notification? This action instantly makes it live for all students and platform users.
                                    </p>
                                    <div className="mt-4 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Preview Title</p>
                                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{title}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(false)}
                                    className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleConfirmPublish}
                                    className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition"
                                >
                                    Confirm & Send
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};