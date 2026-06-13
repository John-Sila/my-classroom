import { motion } from "motion/react";
import { useState } from "react";

type StorageItem = {
  type: string;
  img: string;
  tech: string;
  desc: string;
};

export default function StorageCard({ st }: { st: StorageItem }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative h-24 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        {!loaded && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-slate-200/70 dark:bg-slate-700/70" />
            <div className="absolute inset-y-0 left-[-40%] w-[40%] rotate-12 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-shimmer dark:via-white/10" />
          </div>
        )}

        <img
          src={st.img}
          alt={st.type}
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-opacity duration-3000 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="p-4 space-y-1">
        <h4 className="font-bold text-slate-900 dark:text-white text-xs md:text-sm truncate">
          {st.type}
        </h4>
        <span className="text-[9px] uppercase font-bold text-amber-500 tracking-wider block">
          {st.tech}
        </span>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
          {st.desc}
        </p>
      </div>
    </div>
  );
}
