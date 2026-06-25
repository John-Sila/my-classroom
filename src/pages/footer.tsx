import { Link } from "react-router-dom";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/70 bg-white/75 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/70">
      <div className="mx-auto max-w-7xl px-6 py-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)] animate-pulse" />
              <span className="font-medium text-slate-800 dark:text-slate-200">
                Managed by Teacher Sila
              </span>
            </div>

            <span className="hidden sm:inline text-slate-300 dark:text-slate-600">•</span>

            <span className="text-slate-500 dark:text-slate-400">v1.8.3</span>

            <span className="hidden sm:inline text-slate-300 dark:text-slate-600">•</span>

            <span className="text-slate-500 dark:text-slate-400">© {year}</span>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400"
          >
            <Link
              to="/help"
              className="rounded-full px-3 py-1.5 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              Help Center
            </Link>

            <Link
              to="/privacy"
              className="rounded-full px-3 py-1.5 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="rounded-full px-3 py-1.5 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              Terms
            </Link>
          </nav>

          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="hidden sm:inline">System Status:</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50 px-3 py-1 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};