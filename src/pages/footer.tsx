import { Link } from "react-router-dom";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="shrink-0 border-t border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-4 md:flex-row">

        {/* Brand Layer */}
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium text-slate-700 dark:text-slate-300">
            Managed by Teacher Sila
          </span>
          <span className="text-slate-400 dark:text-slate-500">• v1.0.0</span>
          <span className="hidden sm:inline text-slate-400 dark:text-slate-500">
            • © {year}
          </span>
        </div>

        {/* Navigation Layer (Independent Routes) */}
        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400"
        >
          <Link
            to="/help"
            className="transition hover:text-slate-700 dark:hover:text-slate-200"
          >
            Help Center
          </Link>

          <span className="opacity-40">|</span>

          <Link
            to="/privacy"
            className="transition hover:text-slate-700 dark:hover:text-slate-200"
          >
            Privacy
          </Link>

          <span className="opacity-40">|</span>

          <Link
            to="/terms"
            className="transition hover:text-slate-700 dark:hover:text-slate-200"
          >
            Terms
          </Link>
        </nav>

        {/* Status Layer */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="hidden sm:inline">System Status:</span>
          <span className="flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active
          </span>
        </div>

      </div>
    </footer>
  );
};