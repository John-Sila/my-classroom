import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  collection,
  query,
  getDocs,
  where,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { Test, TestAttempt, Question } from "../../types";
import {
  Filter,
  CheckCircle2,
  XCircle,
  HelpCircle,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { CustomPieTooltip, CustomTooltip, TestSelect } from "@/src/utils/classSelector";

type HoverCategory = {
  questionId: string;
  kind: "correct" | "wrong";
  x: number;
  y: number;
  users: { uid: string; fullName: string }[];
  title: string;
};

type HoverTarget = {
  questionId: string;
  kind: "correct" | "wrong";
  x: number;
  y: number;
  title: string;
  users: { uid: string; fullName: string }[];
};

function HoverUserPopover({
  data,
  onEnter,
  onLeave,
}: {
  data: HoverCategory | null;
  onEnter: () => void;
  onLeave: () => void;
}) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      <div
        className="absolute z-50 w-fit max-w-[22rem] min-w-[12rem] max-h-80 overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-[0_18px_60px_rgba(15,23,42,0.18)] ring-1 ring-black/5 dark:ring-white/5 pointer-events-auto"
        style={{
          left: Math.min(data.x + 14, window.innerWidth - 360),
          top: Math.min(data.y + 14, window.innerHeight - 340),
        }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <div className="border-b border-slate-100 dark:border-slate-800 px-4 py-3">
          <div className="text-sm font-semibold text-slate-900 dark:text-white tracking-tight">
            {data.title}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {data.users.length} user{data.users.length === 1 ? "" : "s"}
          </div>
        </div>

        <div className="max-h-64 overflow-auto p-3 space-y-2">
          {data.users.length > 0 ? (
            data.users.map((user) => (
              <div
                key={user.uid}
                className="rounded-xl bg-slate-50 dark:bg-slate-800/60 px-3 py-2 border border-slate-100 dark:border-slate-700/60"
              >
                <span className="block text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                  {user.fullName}
                </span>
              </div>
            ))
          ) : (
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 px-3 py-4 text-sm text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-700/60">
              No users in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const ResultsAnalytics: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [selectedTestId, setSelectedTestId] = useState<string>("");
  const [attempts, setAttempts] = useState<TestAttempt[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeQuestionId, setActiveQuestionId] = useState<string>("");
  const [hoverData, setHoverData] = useState<HoverCategory | null>(null);
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const hoverCloseTimer = useRef<number | null>(null);
  const userCache = useRef<Record<string, string>>({});
  const pendingHover = useRef<HoverTarget | null>(null);

  const isDarkMode = document.documentElement.classList.contains("dark");

  const MODERN_COLORS = isDarkMode
    ? ["#6366f1", "#10b981", "#f59e0b", "#f43f5e"]
    : ["#4f46e5", "#059669", "#d97706", "#e11d48"];

  const clearHoverTimer = () => {
    if (hoverCloseTimer.current) {
      window.clearTimeout(hoverCloseTimer.current);
      hoverCloseTimer.current = null;
    }
  };

  const closeHover = () => {
    clearHoverTimer();
    setHoverData(null);
    pendingHover.current = null;
  };

  const openHover = (next: HoverTarget) => {
    clearHoverTimer();
    pendingHover.current = next;
    setHoverData((current) => {
      if (!current) return next;
      if (current.questionId === next.questionId && current.kind === next.kind) return next;
      return next;
    });
  };

  const scheduleClose = () => {
    clearHoverTimer();
    hoverCloseTimer.current = window.setTimeout(() => {
      setHoverData((current) => {
        if (!current) return null;
        const next = pendingHover.current;
        if (next && current.questionId === next.questionId && current.kind === next.kind) {
          return current;
        }
        return null;
      });
    }, 120);
  };

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tests"), (snap) => {
      const testsData = snap.docs.map((doc) => ({ ...doc.data(), testId: doc.id } as Test));
      setTests(testsData);
      if (testsData.length > 0 && !selectedTestId) {
        setSelectedTestId(testsData[0].testId);
      }
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!selectedTestId) return;

    const fetchDetails = async () => {
      const attemptsQ = query(
        collection(db, "testAttempts"),
        where("testId", "==", selectedTestId)
      );
      const attemptsSnap = await getDocs(attemptsQ);
      const attemptsData = attemptsSnap.docs.map((doc) => doc.data() as TestAttempt);
      setAttempts(attemptsData);

      const questionsSnap = await getDocs(collection(db, `tests/${selectedTestId}/questions`));
      const questionData = questionsSnap.docs.map((doc) => doc.data() as Question);
      setQuestions(questionData);

      const uids = Array.from(
        new Set(
          attemptsData.flatMap((a) => {
            const uid = a.userId || a.uid;
            return uid ? [uid] : [];
          })
        )
      );

      const missingUids = uids.filter((uid) => !userCache.current[uid]);

      await Promise.all(
        missingUids.map(async (uid) => {
          try {
            const snap = await getDoc(doc(db, "users", uid));
            if (snap.exists()) {
              const data = snap.data() as { fullName?: string; displayName?: string; name?: string };
              userCache.current[uid] = data.fullName || data.displayName || data.name || uid;
            } else {
              userCache.current[uid] = uid;
            }
          } catch {
            userCache.current[uid] = uid;
          }
        })
      );

      setActiveQuestionId("");
      setHoverData(null);
    };

    fetchDetails();
  }, [selectedTestId]);

  const questionDifficultyData = useMemo(() => {
    return questions.map((q, idx) => {
      const totalAnswered = attempts.filter((a) => !!a.answers[q.questionId]).length;
      const correctCount = attempts.filter((a) => a.answers[q.questionId]?.isCorrect).length;
      const successRate = totalAnswered > 0 ? (correctCount / totalAnswered) * 100 : 0;

      return {
        name: `Q${idx + 1}`,
        successRate,
        fullText: q.questionText,
        questionId: q.questionId,
      };
    });
  }, [questions, attempts]);

  const distributionData = [
    { name: "Excellent", value: attempts.filter((a) => a.percentage >= 80).length },
    { name: "Good", value: attempts.filter((a) => a.percentage >= 50 && a.percentage < 80).length },
    { name: "Needs Work", value: attempts.filter((a) => a.percentage < 50).length },
  ].filter((d) => d.value > 0);

  const handleBarClick = (questionId: string) => {
    setActiveQuestionId(questionId);
    const el = questionRefs.current[questionId];
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const getUsersForQuestion = (questionId: string, kind: "correct" | "wrong") => {
    return attempts
      .filter((a) => {
        const ans = a.answers[questionId];
        if (!ans) return false;
        return kind === "correct" ? !!ans.isCorrect : !ans.isCorrect;
      })
      .map((a) => {
        const uid = a.userId || a.uid || "unknown";
        const name =
          userCache.current[uid] ||
          a.fullName ||
          a.userName ||
          a.displayName ||
          uid;
        return {
          uid,
          fullName: name,
        };
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="h-full"
    >
      <div className="space-y-8 pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Results Analytics
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Deep dive into test performance and question insights
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex items-center">
              <Filter className="absolute left-3.5 z-10 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
              <TestSelect
                value={selectedTestId}
                onChange={(val) => setSelectedTestId(val)}
                options={tests}
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Question Success Rate (%)
                </h3>
                <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/40 rounded-xl">
                  <TrendingUp className="w-5 h-5 text-indigo-500" />
                </div>
              </div>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={questionDifficultyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#94A3B8" }}
                    />
                    <YAxis
                      domain={[0, 100]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#94A3B8" }}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99,102,241,0.08)" }} />
                    <Bar
                      dataKey="successRate"
                      radius={[6, 6, 0, 0]}
                      onClick={(data) => {
                        const clicked = data?.payload?.questionId;
                        if (clicked) handleBarClick(clicked);
                      }}
                      className="cursor-pointer"
                    >
                      {questionDifficultyData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={
                            entry.successRate > 70
                              ? "#10B981"
                              : entry.successRate > 40
                              ? "#F59E0B"
                              : "#EF4444"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">
                Score Distribution
              </h3>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip content={<CustomPieTooltip />} />
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={6}
                      cornerRadius={5}
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={MODERN_COLORS[index % MODERN_COLORS.length]}
                          stroke={0}
                          strokeWidth={2}
                          className="focus:outline-none transition-all duration-200 hover:opacity-90 cursor-pointer"
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                {distributionData.map((d, index) => (
                  <div key={d.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "w-3 h-3 rounded-md",
                          index === 0 ? "bg-emerald-500" : index === 1 ? "bg-amber-500" : "bg-red-500"
                        )}
                      />
                      <span className="text-sm font-medium text-slate-500">{d.name}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {d.value} Learners
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-500" />
                Question Detailed Performance
              </h3>

              <div className="space-y-4">
                {questions.map((q, idx) => {
                  const totalAnswered = attempts.filter((a) => !!a.answers[q.questionId]).length;
                  const correctCount = attempts.filter((a) => a.answers[q.questionId]?.isCorrect).length;
                  const wrongCount = totalAnswered - correctCount;
                  const rate = totalAnswered > 0 ? (correctCount / totalAnswered) * 100 : 0;
                  const isActive = activeQuestionId === q.questionId;
                  const correctUsers = getUsersForQuestion(q.questionId, "correct");
                  const wrongUsers = getUsersForQuestion(q.questionId, "wrong");

                  return (
                    <div
                      key={q.questionId}
                      ref={(el) => {
                        questionRefs.current[q.questionId] = el;
                      }}
                      className={cn(
                        "p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300",
                        isActive
                          ? "border-indigo-500 ring-4 ring-indigo-500/10 shadow-md"
                          : "border-slate-100 dark:border-slate-800"
                      )}
                    >
                      <div className="flex gap-4">
                        <div className="w-10 h-10 shrink-0 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 shadow-sm">
                          {idx + 1}
                        </div>

                        <div className="space-y-3">
                          {q.imageUrl && (
                            <div className="w-full max-w-md h-48 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                              <img
                                src={q.imageUrl}
                                alt={q.questionText}
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                          )}

                          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug">
                            {q.questionText}
                          </h4>

                          <div className="flex items-center gap-4 mt-2">
                            <button
                              type="button"
                              className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 cursor-help"
                              onMouseEnter={(e) => {
                                const r = e.currentTarget.getBoundingClientRect();
                                openHover({
                                  questionId: q.questionId,
                                  kind: "correct",
                                  x: r.left,
                                  y: r.top,
                                  users: correctUsers,
                                  title: "Correct Users",
                                });
                              }}
                              onMouseLeave={scheduleClose}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {correctCount} Correct
                            </button>

                            <button
                              type="button"
                              className="flex items-center gap-1.5 text-xs font-semibold text-red-500 cursor-help"
                              onMouseEnter={(e) => {
                                const r = e.currentTarget.getBoundingClientRect();
                                openHover({
                                  questionId: q.questionId,
                                  kind: "wrong",
                                  x: r.left,
                                  y: r.top,
                                  users: wrongUsers,
                                  title: "Wrong Users",
                                });
                              }}
                              onMouseLeave={scheduleClose}
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              {wrongCount} Wrong
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <div className="text-right">
                          <span
                            className={cn(
                              "text-lg font-bold",
                              rate > 70 ? "text-emerald-500" : rate > 40 ? "text-amber-500" : "text-red-500"
                            )}
                          >
                            {Math.round(rate)}% Success Rate
                          </span>
                        </div>

                        <div className="w-40 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all duration-1000",
                              rate > 70 ? "bg-emerald-500" : rate > 40 ? "bg-amber-500" : "bg-red-500"
                            )}
                            style={{ width: `${rate}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {hoverData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <HoverUserPopover
              data={hoverData}
              onEnter={clearHoverTimer}
              onLeave={closeHover}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};