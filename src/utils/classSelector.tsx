import { useState, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../lib/utils';

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
