"use client";

import React, { useRef, useState, useEffect } from "react";
import { EXPERIENCE, PROFILE } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { useTheme } from "@/lib/theme";

// Odometer single digit roller
function OdometerDigit({ digit }: { digit: string }) {
  const num = parseInt(digit, 10);
  const isNum = !isNaN(num);

  if (!isNum) {
    return <span>{digit}</span>;
  }

  return (
    <span className="inline-block h-[1.05em] overflow-hidden align-top relative">
      <span
        className="inline-flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none"
        style={{
          transform: `translateY(-${num * 10}%)`,
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} className="h-[1.05em] flex items-center justify-center leading-none">
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

// Full 4-digit odometer year
function OdometerYear({ year }: { year: string }) {
  const digits = year.split("");

  return (
    <div className="inline-flex items-center font-black tracking-tighter leading-none select-none">
      {digits.map((d, i) => (
        <OdometerDigit key={i} digit={d} />
      ))}
    </div>
  );
}

export function Experience() {
  const prefersReduced = usePrefersReducedMotion();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [rotationDegrees, setRotationDegrees] = useState(0);

  const totalItems = EXPERIENCE.length;
  const currentItem = EXPERIENCE[activeIndex] || EXPERIENCE[0];
  const currentYear = currentItem.year || "2026";

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const currentScroll = window.scrollY;
      lastScrollY.current = currentScroll;

      // Mark scrolling state for dynamic glow reaction
      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 160);

      // Section progress calculation
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Progress from 0 (section enters) to 1 (section exits)
      const scrolledInto = -rect.top;
      const totalScrollable = containerHeight - viewportHeight;
      const progress = totalScrollable > 0 ? Math.min(Math.max(scrolledInto / totalScrollable, 0), 1) : 0;
      setScrollProgress(progress);

      // Rotate the chronometer radar dial continuously as the user scrolls
      if (!prefersReduced) {
        setRotationDegrees(scrolledInto * 0.35);
      }

      // Pinpoint which item is currently crossing the center of the viewport
      const viewportCenter = viewportHeight * 0.5;
      let closestIdx = 0;
      let minDistance = Infinity;

      itemsRef.current.forEach((el, idx) => {
        if (!el) return;
        const itemRect = el.getBoundingClientRect();
        const itemCenter = itemRect.top + itemRect.height * 0.45;
        const distance = Math.abs(itemCenter - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      setActiveIndex(closestIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [totalItems, prefersReduced]);

  // Dynamic glow calculation:
  // Base intensity + progress boost as you travel deeper in time + active scrolling burst
  const baseGlow = isDark ? 0.22 : 0.16;
  const dynamicGlow = isScrolling ? (isDark ? 0.48 : 0.32) : baseGlow + scrollProgress * 0.12;
  const glowScale = isScrolling ? 1.15 : 1.0;

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-16 md:py-24 bg-[var(--paper)] text-[var(--ink)] transition-colors duration-500"
    >
      <div className="max-w-[1360px] mx-auto px-[clamp(18px,4vw,64px)] relative">
        
        {/* ========================================================= */}
        {/* MOBILE VIEW: EXACTLY LIKE THE ATTACHED REFERENCE VIDEO    */}
        {/* Sticky compact Time Machine banner at top + scrolling     */}
        {/* timeline with vertical line & bead on the left (< 1024px) */}
        {/* ========================================================= */}
        <div className="lg:hidden">
          {/* Pinned Sticky Mobile Time Machine Header */}
          <div className="sticky top-16 z-30 -mx-[clamp(18px,4vw,64px)] px-[clamp(18px,4vw,64px)] py-4 bg-[var(--paper)]/95 backdrop-blur-md border-b border-[var(--line)] shadow-xs">
            {/* Ambient Mobile Glow */}
            <div
              className="absolute left-1/4 top-1/2 -translate-y-1/2 w-48 h-24 rounded-full pointer-events-none -z-0 opacity-40 blur-2xl"
              style={{
                background: "radial-gradient(circle, rgba(245, 158, 11, 0.5) 0%, transparent 70%)",
              }}
            />

            <div className="relative z-10 flex flex-col gap-1">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)] leading-none">
                Let&apos;s go back{" "}
                <span className="font-serif italic font-normal text-[var(--mute)]">
                  in time.
                </span>
              </h2>

              {/* Giant Year in Mobile */}
              <div className="text-5xl sm:text-6xl font-black text-[var(--ink)] tracking-tighter my-1">
                <OdometerYear year={currentYear} />
              </div>

              {/* Active Period & Progress */}
              <div className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[var(--mute)]">
                {currentItem.period}
              </div>

              {/* Counter & Progress bar */}
              <div className="flex items-center gap-3 mt-1.5">
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-[var(--ink)]">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[var(--mute)]"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>
                    0{activeIndex + 1} / 0{totalItems}
                  </span>
                </div>

                <div className="flex-1 max-w-[200px] h-[2px] bg-[var(--line)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-[var(--ink)] rounded-full transition-all duration-300"
                    style={{
                      width: `${((activeIndex + 1) / totalItems) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Timeline Feed with Left-hand Vertical Line & Traveling Bead */}
          <div className="relative pt-8 pb-20 pl-7 sm:pl-8 mt-4">
            {/* Vertical Timeline Guide Line */}
            <div className="absolute top-0 bottom-0 left-[11px] sm:left-[13px] w-[1px] bg-[var(--line)]" />

            {/* Mobile Sticky Bead */}
            <div className="sticky top-64 -ml-7 sm:-ml-8 mb-6 flex items-center z-20 pointer-events-none">
              <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full border-2 border-[var(--ink)] bg-[var(--card)] shadow-[0_0_10px_rgba(245,158,11,0.5)] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[var(--ink)]" />
              </div>
            </div>

            {/* Milestone Cards on Mobile */}
            <div className="space-y-16">
              {EXPERIENCE.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={item.id}
                    ref={(el) => {
                      itemsRef.current[idx] = el;
                    }}
                    className={`transition-all duration-500 ${
                      isActive ? "opacity-100 scale-100" : "opacity-40 scale-[0.98]"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2 font-mono text-[11px] uppercase tracking-wider text-[var(--mute)]">
                      <span>{item.period}</span>
                      <span>·</span>
                      <span className="px-2 py-0.5 rounded-full bg-[var(--card)] border border-[var(--line)] text-[10px]">
                        {item.type}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)] mb-1">
                      {item.title}
                    </h3>

                    <div className="font-sans text-sm text-[var(--mute)] mb-4 font-medium">
                      {item.company}
                    </div>

                    {item.details && item.details.length > 0 && (
                      <ul className="space-y-2 mb-5">
                        {item.details.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="text-xs text-[var(--ink-2)] leading-relaxed flex items-start gap-2"
                          >
                            <span className="text-[var(--mute)] mt-1 select-none">–</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {item.tech && item.tech.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.tech.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-[var(--card)] text-[var(--ink-2)] border border-[var(--line)]"
                          >
                            <TechLogo slug={t.toLowerCase().replace(/[^a-z0-9]/g, "")} name={t} size={10} />
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP VIEW: CONSTANT PINNED TIME MACHINE (lg+)          */}
        {/* ========================================================= */}
        <div className="hidden lg:grid grid-cols-[1.1fr_48px_1.3fr] items-start relative">
          
          {/* ========================================================= */}
          {/* LEFT SIDE: TIME MACHINE COLUMN (100% CONSTANT)            */}
          {/* ========================================================= */}
          <div className="sticky top-24 h-[calc(100vh-6rem)] flex flex-col justify-between py-4 lg:py-6 z-20">
            
            {/* Top Tag & Main Heading */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3 font-mono text-xs uppercase tracking-widest text-[var(--mute)]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse inline-block" />
                <span>My story</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--ink)] leading-none">
                Let&apos;s go back{" "}
                <span className="font-serif italic font-normal text-[var(--mute)]">
                  in time.
                </span>
              </h2>
            </div>

            {/* ======================================================= */}
            {/* CENTER: TIME MACHINE CHRONOMETER CIRCLE & CENTERED YEAR */}
            {/* The year is precisely dead-centered in the circle        */}
            {/* ======================================================= */}
            <div className="relative my-auto flex items-center justify-center w-full min-h-[460px] lg:min-h-[520px]">
              
              {/* Dynamic Amber/Golden Volumetric Glow */}
              <div
                className="absolute inset-0 m-auto w-[420px] lg:w-[500px] h-[420px] lg:h-[500px] rounded-full pointer-events-none -z-0 transition-all duration-500 ease-out"
                style={{
                  background: isDark
                    ? `radial-gradient(circle at 50% 50%, rgba(245, 158, 11, ${dynamicGlow}) 0%, rgba(217, 119, 6, ${dynamicGlow * 0.45}) 40%, transparent 72%)`
                    : `radial-gradient(circle at 50% 50%, rgba(245, 158, 11, ${dynamicGlow * 0.85}) 0%, rgba(251, 191, 36, ${dynamicGlow * 0.35}) 45%, transparent 72%)`,
                  filter: "blur(45px)",
                  transform: `scale(${glowScale})`,
                }}
              />

              {/* Concentric Chronometer Radar Dial (Rotates smoothly on scroll) */}
              <div className="absolute inset-0 m-auto w-[420px] lg:w-[500px] h-[420px] lg:h-[500px] pointer-events-none -z-0 select-none flex items-center justify-center">
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-full text-[var(--line)] transition-transform duration-100 ease-out"
                  style={{
                    transform: `rotate(${rotationDegrees}deg)`,
                  }}
                >
                  {/* Outer Concentric orbital ring with tick marks */}
                  <circle
                    cx="200"
                    cy="200"
                    r="192"
                    fill="none"
                    stroke={isDark ? "rgba(245, 158, 11, 0.22)" : "rgba(245, 158, 11, 0.25)"}
                    strokeWidth="1"
                    strokeDasharray="4 8"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="150"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity="0.35"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="105"
                    fill="none"
                    stroke={isDark ? "rgba(245, 158, 11, 0.32)" : "rgba(245, 158, 11, 0.3)"}
                    strokeWidth="1"
                    strokeDasharray="2 5"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity="0.25"
                  />

                  {/* Radiating dial ticks */}
                  {Array.from({ length: 48 }).map((_, i) => (
                    <line
                      key={i}
                      x1="200"
                      y1="8"
                      x2="200"
                      y2={i % 4 === 0 ? "26" : "16"}
                      stroke={i % 4 === 0 && isScrolling ? "#f59e0b" : "currentColor"}
                      strokeWidth={i % 4 === 0 ? "1.5" : "0.75"}
                      opacity={i % 4 === 0 ? "0.85" : "0.35"}
                      transform={`rotate(${i * 7.5} 200 200)`}
                    />
                  ))}
                </svg>
              </div>

              {/* Giant Year PRECISELY IN THE DEAD-CENTER OF THE CIRCLE */}
              <div
                className="relative z-10 text-7xl sm:text-8xl md:text-9xl lg:text-[11.5rem] text-[var(--ink)] select-none transition-all duration-300 text-center flex items-center justify-center"
                style={{
                  filter: isDark && isScrolling ? "drop-shadow(0 0 35px rgba(245, 158, 11, 0.45))" : "none",
                }}
              >
                <OdometerYear year={currentYear} />
              </div>
            </div>

            {/* Bottom Sub-Metadata: Active Period & Progress Track */}
            <div className="pt-2 relative z-10">
              <div className="font-mono text-xs sm:text-sm uppercase tracking-wider text-[var(--mute)] mb-3 h-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="transition-all duration-300 font-medium">{currentItem.period}</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[var(--mute)]"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="font-mono text-xs font-semibold text-[var(--ink)]">
                    0{activeIndex + 1} / 0{totalItems}
                  </span>
                </div>

                <div className="flex-1 max-w-[260px] h-[2px] bg-[var(--line)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-[var(--ink)] rounded-full transition-all duration-300"
                    style={{
                      width: `${((activeIndex + 1) / totalItems) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* CENTER DIVIDER LINE WITH LOCKED STICKY BEAD               */}
          {/* ========================================================= */}
          <div className="relative self-stretch w-12 flex justify-center">
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-[var(--line)] to-transparent" />

            <div className="sticky top-1/2 -translate-y-1/2 flex items-center justify-center z-30">
              <div
                className={`absolute w-8 h-8 rounded-full transition-opacity duration-300 ${
                  isScrolling ? "opacity-100 scale-125" : "opacity-40 scale-100"
                }`}
                style={{
                  background: "radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, transparent 70%)",
                }}
              />

              <div className="w-4 h-4 rounded-full border-2 border-[var(--ink)] bg-[var(--card)] shadow-[0_0_12px_rgba(245,158,11,0.5)] flex items-center justify-center transition-transform duration-300">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--ink)]" />
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT SIDE: SCROLLING TIMELINE FEED                       */}
          {/* ========================================================= */}
          <div className="py-12 lg:py-20 pl-4 lg:pl-10 space-y-32">
            {EXPERIENCE.map((item, idx) => {
              const isActive = idx === activeIndex;

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    itemsRef.current[idx] = el;
                  }}
                  className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? "opacity-100 scale-100" : "opacity-25 scale-[0.97]"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3 font-mono text-xs uppercase tracking-wider text-[var(--mute)]">
                    <span>{item.period}</span>
                    <span>·</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[var(--card)] border border-[var(--line)] text-[11px]">
                      {item.type}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--ink)] mb-1">
                    {item.title}
                  </h3>

                  <div className="font-sans text-base text-[var(--mute)] mb-6 font-medium">
                    {item.company}
                  </div>

                  {item.details && item.details.length > 0 && (
                    <ul className="space-y-3 mb-6">
                      {item.details.map((detail, bIdx) => (
                        <li
                          key={bIdx}
                          className="text-sm text-[var(--ink-2)] leading-relaxed flex items-start gap-2.5"
                        >
                          <span className="text-[var(--mute)] mt-1 select-none">–</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.tech && item.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.tech.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono bg-[var(--card)] text-[var(--ink-2)] border border-[var(--line)] shadow-xs"
                        >
                          <TechLogo slug={t.toLowerCase().replace(/[^a-z0-9]/g, "")} name={t} size={11} />
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
