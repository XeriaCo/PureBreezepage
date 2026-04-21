import React, { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const current = window.scrollY / (max || 1);
      setPct(Math.min(100, Math.max(0, current * 100)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none"
      data-testid="scroll-progress"
    >
      <div
        className="h-full bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500 shadow-[0_0_12px_rgba(14,165,233,0.8)] transition-[width] duration-75"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
