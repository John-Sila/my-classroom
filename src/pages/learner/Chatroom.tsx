import { useEffect, useMemo, useRef, useState } from 'react';
import {
  collection,
  query,
  orderBy,
  limitToLast,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  Timestamp,
  where,
  writeBatch,
  getDocs,
  limit,
} from 'firebase/firestore';
import {
  ShieldAlert,
  SendHorizonal,
  Users,
  Search,
  Crown,
  GraduationCap,
  MessageCircle,
  Ban,
  CheckCircle2,
  Clock3,
} from 'lucide-react';
import { db } from '@/src/firebase/config';
import { useAuthStore } from '@/src/store/authStore';
import { cn } from '@/src/lib/utils';

interface ChatMessage {
  id: string;
  uid: string;
  fullName: string;
  photoURL?: string | null;
  text: string;
  createdAt?: Timestamp;
  expiresAt?: Timestamp;
}

interface ClassroomUser {
  uid: string;
  fullName: string;
  rank: 'teacher' | 'learner';
  photoURL?: string | null;
  canChat?: boolean;
  online?: boolean;
  lastSeen?: Timestamp;
  currentPage?: string | null;
}

export default function Chatroom() {
    const { user } = useAuthStore();

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [sending, setSending] = useState(false);
    const [users, setUsers] = useState<ClassroomUser[]>([]);
    const [search, setSearch] = useState('');
    const [canChat, setCanChat] = useState(true);

    const bottomRef = useRef<HTMLDivElement | null>(null);
    const isTeacher = user?.rank === 'teacher';
    const lastCleanupRef = useRef<number>(0);

    useEffect(() => {
        if (!user?.uid) return;

        const userRef = doc(db, 'users', user.uid);

        updateDoc(userRef, {
        online: true,
        currentPage: '/chatroom',
        lastSeen: serverTimestamp(),
        }).catch(console.error);

        const handleUnload = async () => {
        try {
            await updateDoc(userRef, {
            online: false,
            currentPage: null,
            lastSeen: serverTimestamp(),
            });
        } catch {}
        };

        window.addEventListener('beforeunload', handleUnload);

        return () => {
        window.removeEventListener('beforeunload', handleUnload);
        updateDoc(userRef, {
            online: false,
            currentPage: null,
            lastSeen: serverTimestamp(),
        }).catch(console.error);
        };
    }, [user?.uid]);

    useEffect(() => {
        if (!user?.uid) return;

        const unsub = onSnapshot(doc(db, 'users', user.uid), (snap) => {
        if (!snap.exists()) return;
        const data = snap.data();
        setCanChat(data.canChat !== false);
        });

        return () => unsub();
    }, [user?.uid]);

    useEffect(() => {
        const q = query(
        collection(db, 'classroomChats/global/messages'),
        orderBy('createdAt'),
        limitToLast(50)
        );

        const unsub = onSnapshot(q, (snapshot) => {
        const data: ChatMessage[] = snapshot.docs.map((item) => ({
            id: item.id,
            ...(item.data() as Omit<ChatMessage, 'id'>),
        }));
        setMessages(data);
        });

        return () => unsub();
    }, []);

    useEffect(() => {
        const q = query(collection(db, 'users'));

        const unsub = onSnapshot(q, (snapshot) => {
        const data: ClassroomUser[] = snapshot.docs.map((item) => ({
            uid: item.id,
            ...(item.data() as Omit<ClassroomUser, 'uid'>),
        }));

        const ordered = data.sort((a, b) => {
            if (a.rank === 'teacher' && b.rank !== 'teacher') return -1;
            if (a.rank !== 'teacher' && b.rank === 'teacher') return 1;
            if (a.online && !b.online) return -1;
            if (!a.online && b.online) return 1;
            return a.fullName.localeCompare(b.fullName);
        });

        setUsers(ordered);
        });

        return () => unsub();
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (user?.rank !== "teacher") return;

        const runCleanup = async () => {
            const now = Date.now();

            // execution throttle (30 min window)
            if (now - lastCleanupRef.current < 30 * 60 * 1000) return;

            lastCleanupRef.current = now;

            await cleanupOldMessages();
        };

        runCleanup();
    }, [user?.uid]);

    const cleanupOldMessages = async () => {
        if (user?.rank !== "teacher") return;

        try {
            const cutoff = Timestamp.fromMillis(Date.now() - 1 * 60 * 60 * 1000);

            const q = query(
                collection(db, "classroomChats/global/messages"),
                where("createdAt", "<", cutoff),
                orderBy("createdAt"),
                limit(18)
            );

            const snapshot = await getDocs(q);

            if (snapshot.empty) return;

            const batch = writeBatch(db);

            snapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
            });

            await batch.commit();

            console.log(`Client cleanup deleted ${snapshot.size} messages`);
        } catch (err) {
            console.error("Cleanup failed:", err);
        }
    };

    const sendMessage = async () => {
        if (!input.trim() || !user || !canChat) return;

        try {
        setSending(true);

        await addDoc(collection(db, 'classroomChats/global/messages'), {
            uid: user.uid,
            fullName: user.fullName,
            photoURL: user.photoURL || null,
            text: input.trim().slice(0, 500),
            createdAt: serverTimestamp(),
            expiresAt: Timestamp.fromDate(new Date(Date.now() + 12 * 60 * 60 * 1000)),
        });

        setInput('');
        } catch (err) {
        console.error(err);
        } finally {
        setSending(false);
        }
    };

    const filteredUsers = useMemo(() => {
        return users.filter((u) =>
        u.fullName?.toLowerCase().includes(search.toLowerCase())
        );
    }, [users, search]);

    const toggleChatAccess = async (target: ClassroomUser) => {
        if (!isTeacher) return;

        try {
        await updateDoc(doc(db, 'users', target.uid), {
            canChat: target.canChat === false ? true : false,
        });
        } catch (err) {
        console.error(err);
        }
    };

    const getInitials = (name?: string) => {
        if (!name) return '?';
        return name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
    };

    return (
    <div className="h-dvh w-full overflow-hidden bg-slate-100 p-3 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
        <div className="flex h-full w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">

        {/* LEFT CHAT COLUMN */}
        <section className="flex min-w-0 flex-1 flex-col overflow-hidden border-r border-slate-200 dark:border-slate-800">

            {/* HEADER */}
            <header className="shrink-0 border-b border-slate-200 bg-white/90 px-5 py-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="min-w-0">
                <div className="mb-1 flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-indigo-500" />

                    <h1 className="truncate text-xl font-black tracking-tight text-slate-900 dark:text-white">
                    Classroom Communication Hub
                    </h1>
                </div>

                <p className="max-w-4xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    Messages are broadcast to every learner and teacher currently inside the classroom ecosystem. Professional conduct is mandatory.
                </p>
                </div>

                <div className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] font-semibold text-amber-700 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-300">
                <ShieldAlert className="h-4 w-4 shrink-0" />
                Auto-deletion after 1 hour
                </div>
            </div>
            </header>

            {/* CHAT BODY */}
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">

            {/* MESSAGES */}
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
                <div className="space-y-5">
                {messages.map((msg) => {
                    const mine = msg.uid === user?.uid;

                    return (
                    <div
                        key={msg.id}
                        className={cn(
                        'flex w-full',
                        mine ? 'justify-end' : 'justify-start'
                        )}
                    >
                        <div
                        className={cn(
                            'group flex max-w-[88%] gap-3 xl:max-w-[72%]',
                            mine ? 'flex-row-reverse' : 'flex-row'
                        )}
                        >
                        {/* AVATAR */}
                        <div className="shrink-0">
                            {msg.photoURL ? (
                            <img
                                src={msg.photoURL}
                                alt={msg.fullName}
                                className="h-10 w-10 rounded-2xl border border-slate-200 object-cover shadow-sm dark:border-slate-700"
                            />
                            ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-xs font-bold text-white shadow-md">
                                {getInitials(msg.fullName)}
                            </div>
                            )}
                        </div>

                        {/* BUBBLE */}
                        <div
                            className={cn(
                            'rounded-3xl border px-5 py-4 shadow-sm',
                            mine
                                ? 'rounded-br-md border-indigo-500 bg-indigo-600 text-white'
                                : 'rounded-bl-md border-slate-200 bg-white/95 text-slate-800 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100'
                            )}
                        >
                            <div className="mb-2 flex items-center gap-2">
                            <span
                                className={cn(
                                'text-[11px] font-bold tracking-wide',
                                mine
                                    ? 'text-indigo-100'
                                    : 'text-slate-500 dark:text-slate-400'
                                )}
                            >
                                {msg.fullName}
                            </span>

                            <span
                                className={cn(
                                'text-[10px]',
                                mine
                                    ? 'text-indigo-200'
                                    : 'text-slate-400 dark:text-slate-500'
                                )}
                            >
                                {msg.createdAt?.toDate?.().toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                })}
                            </span>
                            </div>

                            <p
                            className={cn(
                                'whitespace-pre-wrap break-words text-sm leading-relaxed',
                                mine
                                ? 'text-white'
                                : 'text-slate-700 dark:text-slate-300'
                            )}
                            >
                            {msg.text}
                            </p>
                        </div>
                        </div>
                    </div>
                    );
                })}

                <div ref={bottomRef} />
                </div>
            </div>

            {/* STICKY INPUT */}
            <footer className="sticky bottom-0 shrink-0 border-t border-slate-200 bg-white/95 px-5 py-4 backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-900/95">
                {!canChat && (
                <div className="mb-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-300">
                    Messaging privileges disabled by a teacher.
                </div>
                )}

                <div className="flex items-end gap-3">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={!canChat}
                    rows={1}
                    maxLength={500}
                    placeholder="Broadcast a classroom message..."
                    className={cn(
                    'min-h-[54px] max-h-40 flex-1 resize-none rounded-2xl border px-5 py-4 text-sm outline-none transition',
                    'border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400',
                    'focus:border-indigo-400 focus:bg-white',
                    'dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500',
                    'dark:focus:border-indigo-500 dark:focus:bg-slate-900',
                    'disabled:cursor-not-allowed disabled:opacity-60'
                    )}
                    onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                    }
                    }}
                />

                <button
                    onClick={sendMessage}
                    disabled={!canChat || sending || !input.trim()}
                    className={cn(
                    'flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg transition',
                    'bg-gradient-to-br from-indigo-500 to-violet-500 shadow-indigo-500/20',
                    'hover:scale-[1.03]',
                    'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100'
                    )}
                >
                    <SendHorizonal className="h-5 w-5" />
                </button>
                </div>
            </footer>
            </div>
        </section>

        {/* RIGHT USERS COLUMN */}
        <aside className="hidden w-[300px] shrink-0 flex-col overflow-hidden bg-slate-50/80 dark:bg-slate-950/60 xl:flex">

            {/* USERS HEADER */}
            <header className="shrink-0 border-b border-slate-200 p-4 dark:border-slate-800">
            <div className="mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-indigo-500" />

                <h2 className="text-base font-black tracking-tight text-slate-900 dark:text-white">
                Classroom Directory
                </h2>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />

                <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search members..."
                className={cn(
                    'w-full rounded-xl border py-2.5 pl-10 pr-4 text-xs outline-none transition',
                    'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400',
                    'focus:border-indigo-400',
                    'dark:border-slate-700 dark:bg-slate-900 dark:text-white'
                )}
                />
            </div>
            </header>

            {/* USERS LIST */}
            <div className="min-h-0 flex-1 overflow-y-auto p-3 space-y-2">
            {filteredUsers.map((u) => {
                const onlineInChat =
                u.online && u.currentPage === '/chatroom';

                return (
                <div
                    key={u.uid}
                    className={cn(
                    'group rounded-2xl border p-3 transition-all duration-200',
                    'border-slate-200 bg-white hover:border-indigo-200 hover:shadow-sm',
                    'dark:border-slate-800 dark:bg-slate-900'
                    )}
                >
                    <div className="flex items-start gap-3">

                    {u.photoURL ? (
                        <img
                        src={u.photoURL}
                        alt={u.fullName}
                        className="h-10 w-10 rounded-xl border border-slate-200 object-cover dark:border-slate-700"
                        />
                    ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-[11px] font-bold text-white">
                        {getInitials(u.fullName)}
                        </div>
                    )}

                    <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-bold text-slate-900 dark:text-white">
                        {u.fullName}
                        </div>

                        <div className="mt-1 flex flex-wrap items-center gap-2">
                        {u.rank === 'teacher' ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                            <Crown className="h-3 w-3" />
                            Teacher
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
                            <GraduationCap className="h-3 w-3" />
                            Learner
                            </span>
                        )}

                        <span
                            className={cn(
                            'text-[10px] font-medium',
                            onlineInChat
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-slate-400'
                            )}
                        >
                            {onlineInChat ? 'Online' : 'Offline'}
                        </span>
                        </div>

                        {u.canChat === false && (
                        <div className="mt-1 text-[10px] font-bold uppercase tracking-wide text-red-500">
                            Muted
                        </div>
                        )}
                    </div>
                    </div>

                    {isTeacher && u.rank !== 'teacher' && (
                    <button
                        onClick={() => toggleChatAccess(u)}
                        className={cn(
                        'mt-3 w-full rounded-xl px-3 py-2 text-[11px] font-bold transition',
                        u.canChat === false
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300'
                            : 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950/30 dark:text-red-300'
                        )}
                    >
                        {u.canChat === false ? 'Restore Access' : 'Disable Chat'}
                    </button>
                    )}
                </div>
                );
            })}
            </div>
        </aside>
        </div>
    </div>
    );

}