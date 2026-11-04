"use client";

import React, { useRef, useState, useEffect } from "react";
import { ACHIEVEMENTS, AchievementItem } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechLogo, isBrand } from "@/components/ui/TechLogo";

function CountUpMetric({
  targetNumber,
  suffix = "",
  start,
}: {
  targetNumber?: number;
  suffix?: string;
  start: boolean;
}) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!start || targetNumber === undefined) return;

    let startTime: number | null = null;
    const duration = 1400; // 1.4s

    const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

    const step = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = easeOutQuart(progress);
      setVal(eased * targetNumber);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setVal(targetNumber);
      }
    };

    requestAnimationFrame(step);
  }, [start, targetNumber]);

  if (targetNumber === undefined) {
    return <span>{suffix}</span>;
  }

  const isFloat = targetNumber % 1 !== 0;
  const displayVal = isFloat ? val.toFixed(2) : Math.round(val).toString();

  return (
    <span>
      {displayVal}
      {suffix}
    </span>
  );
}

export function Achievements() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [centeredCardIndex, setCenteredCardIndex] = useState(0);
  const [hasStartedMap, setHasStartedMap] = useState<Record<number, boolean>>({});

  // Calculate track distance and handle sticky horizontal translation
  useEffect(() => {
    const calculateDistance = () => {
      if (trackRef.current) {
        const fullWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const dist = Math.max(fullWidth - viewportWidth + 120, 0);
        setTrackWidth(dist);
      }
    };

    calculateDistance();
    window.addEventListener("resize", calculateDistance);
    return () => window.removeEventListener("resize", calculateDistance);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const outer = outerRef.current;
      if (!outer) return;

      const rect = outer.getBoundingClientRect();
      const totalScrollable = outer.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
      setScrollProgress(progress);

      // Determine centered card
      if (trackRef.current) {
        const cards = trackRef.current.querySelectorAll<HTMLDivElement>("[data-card-idx]");
        const centerScreen = window.innerWidth / 2;
        let closestIdx = 0;
        let minDiff = Infinity;

        cards.forEach((card) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const diff = Math.abs(cardCenter - centerScreen);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = parseInt(card.getAttribute("data-card-idx") || "0", 10);
          }
        });

        setCenteredCardIndex(closestIdx);
        setHasStartedMap((prev) => ({ ...prev, [closestIdx]: true, 0: true }));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [trackWidth]);

  return (
    <div
      ref={outerRef}
      id="achievements"
      className="relative bg-[var(--paper)] text-[var(--ink)] transition-colors duration-500"
      style={{
        // Height = 100vh + horizontal travel distance
        height: `calc(100vh + ${trackWidth}px)`,
      }}
    >
      {/* Pinned Sticky Viewport Container */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-between py-10 md:py-14">
        {/* Header with thin horizontal progress bar */}
        <div className="max-w-[1320px] w-full mx-auto px-[clamp(18px,4vw,64px)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--line)] pb-6 mb-2">
            <div>
              <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-[var(--mute)]">
                <span>05</span>
                <span>—</span>
                <span>Honors & Metrics</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--ink)]">
                Achievements &{" "}
                <span className="font-serif italic font-normal text-[var(--mute)]">
                  Records.
                </span>
              </h2>
            </div>

            {/* Horizontal gallery progress indicator */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[var(--mute)]">Scroll to pan</span>
              <div className="w-24 md:w-32 h-[2px] bg-[var(--line)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--ink)] origin-left transition-transform duration-75"
                  style={{ transform: `scaleX(${scrollProgress})` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sliding Horizontal Card Track */}
        <div className="w-full overflow-visible my-auto">
          <div
            ref={trackRef}
            className="flex items-center gap-6 md:gap-8 px-[clamp(18px,4vw,64px)] will-change-transform transition-transform duration-75"
            style={{
              transform: `translateX(-${scrollProgress * trackWidth}px)`,
            }}
          >
            {ACHIEVEMENTS.map((item, idx) => {
              const isCenter = centeredCardIndex === idx;
              const hasStarted = hasStartedMap[idx] || isCenter;

              return (
                <div
                  key={item.id}
                  data-card-idx={idx}
                  className={`w-[clamp(340px,40vw,540px)] h-[clamp(260px,36vh,310px)] rounded-[28px] bg-[var(--card)] p-7 sm:p-8 flex flex-col justify-between flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isCenter
                      ? "-translate-y-3 shadow-[0_24px_48px_rgba(0,0,0,0.18),inset_0_0_0_1px_var(--line)] ring-1 ring-[var(--ink)]/10"
                      : "translate-y-0 shadow-[0_8px_24px_rgba(0,0,0,0.06),inset_0_0_0_1px_var(--line)] opacity-90"
                  }`}
                >
                  {/* Top: 72px Logo Tile + Index */}
                  <div className="flex items-center justify-between">
                    <div className="relative w-[72px] h-[72px] rounded-2xl bg-[var(--paper)] border border-[var(--line)] flex items-center justify-center overflow-hidden">
                      {item.brandSlug ? (
                        <TechLogo
                          slug={item.brandSlug}
                          name={item.title}
                          size={40}
                          showGlow={isCenter && isBrand(item.brandSlug)}
                        />
                      ) : (
                        <div className="font-mono text-sm font-bold text-[var(--ink)]">
                          {item.index.split(" ")[0]}
                        </div>
                      )}
                    </div>
                    <span className="font-mono text-xs text-[var(--mute)]">
                      {item.index}
                    </span>
                  </div>

                  {/* Bottom: Left Info & Right Count-up Metric */}
                  <div className="flex items-end justify-between gap-4 pt-4 border-t border-[var(--line)]">
                    <div className="max-w-[62%]">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] block">
                        {item.category}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-[var(--ink)] tracking-tight leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[var(--mute)] truncate mt-0.5">
                        {item.detail}
                      </p>
                    </div>

                    {/* Huge Number with easeOutQuart count-up */}
                    <div className="text-right">
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--ink)] whitespace-nowrap">
                        <CountUpMetric
                          targetNumber={item.metricNumber}
                          suffix={item.metricSuffix || ""}
                          start={hasStarted}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Ending Card: "and counting →" */}
            <div className="w-[clamp(260px,28vw,360px)] h-[clamp(260px,36vh,310px)] rounded-[28px] border-2 border-dashed border-[var(--line)] flex flex-col items-center justify-center p-8 flex-shrink-0 text-center">
              <span className="font-serif italic text-2xl text-[var(--mute)] mb-2">
                and counting →
              </span>
              <p className="text-xs font-mono text-[var(--mute)] opacity-70">
                Continuous learning, real-world deployment & research.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom spacer for balance */}
        <div className="max-w-[1320px] w-full mx-auto px-[clamp(18px,4vw,64px)]">
          <div className="flex justify-between items-center text-[11px] font-mono text-[var(--mute)]">
            <span>Saveetha School of Engineering & Lin&apos;s InfoTech</span>
            <span>Verified in Résumé</span>
          </div>
        </div>
      </div>
    </div>
  );
}
