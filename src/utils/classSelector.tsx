import { useState, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { TooltipProps } from 'recharts';

const classOptions = ['5A', '5B', '5D', '6C', '6D', 'Admin'];
const roleOptions = ['learner', 'teacher'];

export function ClassSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    if (!open && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      // If remaining height below the button is less than 220px, drop up instead
      setDropUp(spaceBelow < 220);
    }
    setOpen((v) => !v);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition hover:bg-slate-100 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:hover:bg-slate-800"
      >
        <span className={cn(!value && 'text-slate-400 dark:text-slate-500')}>
          {value || 'Class'}
        </span>
        <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div 
          className={cn(
            "absolute z-20 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900",
            dropUp ? "bottom-full mb-2 animate-slide-up" : "top-full mt-2 animate-slide-down"
          )}
        >
          {classOptions.map((option) => {
            const selected = option === value;

            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={cn(
                  'flex w-full items-center justify-between px-4 py-3 text-left text-sm transition',
                  selected
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                )}
              >
                <span>{option}</span>
                {selected && <Check className="h-4 w-4" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function RoleSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    if (!open && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      // If remaining height below the button is less than 150px (smaller menu), drop up instead
      setDropUp(spaceBelow < 150);
    }
    setOpen((v) => !v);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition hover:bg-slate-100 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:hover:bg-slate-800"
      >
        <span className={cn(!value && 'text-slate-400 dark:text-slate-500')}>
          {value || 'Role'}
        </span>
        <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div 
          className={cn(
            "absolute z-20 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900",
            dropUp ? "bottom-full mb-2" : "top-full mt-2"
          )}
        >
          {roleOptions.map((option) => {
            const selected = option === value;

            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={cn(
                  'flex w-full items-center justify-between px-4 py-3 text-left text-sm transition',
                  selected
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                )}
              >
                <span>{option}</span>
                {selected && <Check className="h-4 w-4" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function TestSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { testId: string; testName: string; className: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((t) => t.testId === value);

  const toggleDropdown = () => {
    if (!open && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setDropUp(spaceBelow < 220);
    }
    setOpen((v) => !v);
  };

  return (
    <div ref={containerRef} className="relative w-full min-w-[260px]">
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-sm text-slate-900 outline-none transition hover:bg-slate-100 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:hover:bg-slate-800"
      >
        <span className={cn(!value && "text-slate-400 dark:text-slate-500")}>
          {selected ? `${selected.testName} (${selected.className})` : "Select test"}
        </span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div
          className={cn(
            "absolute z-20 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900",
            dropUp ? "bottom-full mb-2" : "top-full mt-2"
          )}
        >
          {options.length > 0 ? (
            options.map((t) => {
              const isSelected = t.testId === value;

              return (
                <button
                  key={t.testId}
                  type="button"
                  onClick={() => {
                    onChange(t.testId);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between px-4 py-3 text-left text-sm transition",
                    isSelected
                      ? "bg-indigo-600 text-white"
                      : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                  )}
                >
                  <span className="truncate">
                    {t.testName} ({t.className})
                  </span>
                  {isSelected && <Check className="h-4 w-4 shrink-0" />}
                </button>
              );
            })
          ) : (
            <div className="px-4 py-3 text-sm text-slate-400">No tests available</div>
          )}
        </div>
      )}
    </div>
  );
}

export const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-2xl border-0 bg-white p-3 shadow-xl dark:bg-slate-800">
        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
          Success Rate: <span className="font-semibold">{Math.round(Number(payload[0].value))}%</span>
        </p>
      </div>
    );
  }
  return null;
};

export const CustomPieTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length && payload[0].value !== undefined) {
    const data = payload[0].payload;
    const roundedValue = Math.round(Number(payload[0].value));

    return (
      <div className="rounded-xl border-0 bg-white p-3 shadow-xl ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/10 transition-colors duration-200">
        <div className="flex items-center gap-2 mb-0.5">
          <span 
            className="w-2.5 h-2.5 rounded-full" 
            style={{ backgroundColor: payload[0].color }} 
          />
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
            {data.name}
          </p>
        </div>
        <p className="text-sm font-bold text-slate-900 dark:text-slate-50 pl-4.5">
          Value: <span className="text-indigo-500 dark:text-indigo-400">{roundedValue}</span>
        </p>
      </div>
    );
  }
  return null;
};