import React, { useEffect, useState } from 'react';
import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp, 
  Timestamp 
} from 'firebase/firestore';
import { db, auth } from '../../firebase/config';
import { cn } from '../../lib/utils';
import { Bell, Calendar, Inbox, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuthStore } from '@/src/store/authStore';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  createdAt: Timestamp | null;
}

export const NotificationViewer: React.FC = () => {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [lastReadTime, setLastReadTime] = useState<Timestamp | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const { user } = useAuthStore();

    useEffect(() => {
        const fetchNotificationsAndStatus = async () => {
        if (!user) {
            setIsLoading(false);
            return;
        }

        try {
            // 1. Fetch user's history configuration metadata
            const userDocRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userDocRef);
            
            if (userSnap.exists() && userSnap.data().lastNotificationRead) {
            setLastReadTime(userSnap.data().lastNotificationRead);
            }

            // 2. Fetch latest broadcast feeds (excluding config tracking docs)
            const q = query(
            collection(db, 'notifications'),
            orderBy('createdAt', 'desc'),
            limit(50)
            );
            const querySnapshot = await getDocs(q);
            
            const fetchedList: NotificationItem[] = querySnapshot.docs
            .filter(d => d.id !== 'latestNotification')
            .map(d => ({
                id: d.id,
                ...d.data()
            } as NotificationItem));

            setNotifications(fetchedList);

            // 3. Automatically flush updates to indicate user has acknowledged this sweep
            await setDoc(userDocRef, {
            lastNotificationRead: serverTimestamp()
            }, { merge: true });

        } catch (error) {
            console.error("Error shifting notification payloads:", error);
        } finally {
            setIsLoading(false);
        }
        };

        fetchNotificationsAndStatus();
    }, []);

    if (isLoading) {
        return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        </div>
        );
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 transition-colors">
      <div className="mx-auto w-full max-w-3xl flex flex-col gap-6">
        
        {/* Header Summary Panel */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <Bell className="w-6 h-6 text-indigo-600" />
              Class Announcements
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Stay up to date with updates from your instructor.
            </p>
          </div>
        </div>

        {/* Stream Stack Container */}
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-12 text-center"
            >
              <Inbox className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400 font-medium">All caught up! No notifications found.</p>
            </motion.div>
          ) : (
            notifications.map((notif, idx) => {
              // Determine if notification is newer than user's last tracking bookmark checkpoint
              const isNew = !lastReadTime || (notif.createdAt && notif.createdAt.toMillis() > lastReadTime.toMillis());

              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(idx * 0.05, 0.3) }}
                  className={cn(
                    "relative overflow-hidden rounded-3xl border p-6 transition-all shadow-xs",
                    isNew 
                      ? "bg-white dark:bg-slate-900 border-indigo-100 dark:border-indigo-950 ring-2 ring-indigo-500/5" 
                      : "bg-slate-50/60 dark:bg-slate-900/40 border-slate-100 dark:border-slate-800/80 opacity-85"
                  )}
                >
                  {/* Visual Left Edge Anchor Strip for Unread Items */}
                  {isNew && (
                    <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-indigo-600" />
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className={cn(
                          "text-base font-bold tracking-tight",
                          isNew ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"
                        )}>
                          {notif.title}
                        </h3>
                        
                        {isNew && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                            <Sparkles className="w-3 h-3" /> New
                          </span>
                        )}
                      </div>

                      <p className={cn(
                        "text-sm leading-relaxed whitespace-pre-wrap",
                        isNew ? "text-slate-600 dark:text-slate-300" : "text-slate-500 dark:text-slate-400"
                      )}>
                        {notif.message}
                      </p>
                    </div>
                  </div>

                  {/* Timestamp Footer line */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {notif.createdAt 
                        ? notif.createdAt.toDate().toLocaleString(undefined, { 
                            dateStyle: 'medium', 
                            timeStyle: 'short' 
                          })
                        : 'Just now'
                      }
                    </span>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};