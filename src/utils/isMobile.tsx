import { useEffect, useState } from "react";

export function useIsCompactView() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const check = () => {
      const isSmallWidth = window.innerWidth < 1024;
      const isTouchOnly = window.matchMedia("(pointer: coarse)").matches;

      setIsCompact(isSmallWidth && isTouchOnly);
    };

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  return isCompact;
}