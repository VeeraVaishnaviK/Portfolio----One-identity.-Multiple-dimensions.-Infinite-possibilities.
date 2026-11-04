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
      const delta = Math.abs(currentScroll - lastScrollY.current);
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
        
        {/* Main Two-Column Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_48px_1.3fr] items-start relative">
          
          {/* ========================================================= */}
          {/* LEFT SIDE: CONSTANT / STICKY PINNED TIME MACHINE          */}
          {/* Stays completely fixed while the right timeline scrolls   */}
          {/* ========================================================= */}
          <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] flex flex-col justify-between py-4 lg:py-6 z-20">
            
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
            {/* CENTER: TIME MACHINE CHRONOMETER & GIANT ROLLING YEAR   */}
            {/* With dynamic amber/golden glow responding to scrolling   */}
            {/* ======================================================= */}
            <div className="relative my-6 lg:my-auto flex items-center justify-start overflow-visible py-4">
              
              {/* Dynamic Amber / Golden Volumetric Glow Effect */}
              <div
                className="absolute -left-12 sm:-left-20 -top-16 sm:-top-24 w-[360px] sm:w-[520px] lg:w-[600px] h-[360px] sm:h-[520px] lg:h-[600px] rounded-full pointer-events-none -z-0 transition-all duration-500 ease-out"
                style={{
                  background: isDark
                    ? `radial-gradient(circle at 45% 48%, rgba(245, 158, 11, ${dynamicGlow}) 0%, rgba(217, 119, 6, ${dynamicGlow * 0.45}) 40%, transparent 75%)`
                    : `radial-gradient(circle at 45% 48%, rgba(245, 158, 11, ${dynamicGlow * 0.85}) 0%, rgba(251, 191, 36, ${dynamicGlow * 0.35}) 45%, transparent 75%)`,
                  filter: "blur(45px)",
                  transform: `scale(${glowScale})`,
                }}
              />

              {/* Secondary Pulsing Ambient Core */}
              <div
                className="absolute left-12 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full pointer-events-none -z-0 transition-opacity duration-300"
                style={{
                  background: isDark
                    ? `radial-gradient(circle, rgba(251, 191, 36, ${isScrolling ? 0.35 : 0.15}) 0%, transparent 70%)`
                    : `radial-gradient(circle, rgba(245, 158, 11, ${isScrolling ? 0.25 : 0.1}) 0%, transparent 70%)`,
                  filter: "blur(25px)",
                }}
              />

              {/* Concentric Chronometer Radar Dial (Rotates smoothly on scroll) */}
              <div className="absolute -left-6 sm:-left-12 -top-12 w-[340px] sm:w-[480px] lg:w-[540px] h-[340px] sm:h-[480px] lg:h-[540px] pointer-events-none -z-0 select-none">
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-full text-[var(--line)] transition-transform duration-100 ease-out"
                  style={{
                    transform: `rotate(${rotationDegrees}deg)`,
                  }}
                >
                  {/* Concentric orbital rings with subtle amber touch */}
                  <circle
                    cx="200"
                    cy="200"
                    r="192"
                    fill="none"
                    stroke={isDark ? "rgba(245, 158, 11, 0.2)" : "rgba(245, 158, 11, 0.25)"}
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
                    stroke={isDark ? "rgba(245, 158, 11, 0.3)" : "rgba(245, 158, 11, 0.3)"}
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

                  {/* Radiating chronometer dial ticks */}
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

              {/* Giant Year with Mechanical Odometer Rolling Digits */}
              <div
                className="relative z-10 text-7xl sm:text-8xl md:text-9xl lg:text-[11.5rem] text-[var(--ink)] select-none transition-all duration-300"
                style={{
                  filter: isDark && isScrolling ? "drop-shadow(0 0 35px rgba(245, 158, 11, 0.45))" : "none",
                }}
              >
                <OdometerYear year={currentYear} />
              </div>
            </div>

            {/* Bottom Sub-Metadata: Active Period & Progress Track */}
            <div className="pt-2 relative z-10">
              {/* Active Item's Date Period */}
              <div className="font-mono text-xs sm:text-sm uppercase tracking-wider text-[var(--mute)] mb-3 h-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="transition-all duration-300 font-medium">{currentItem.period}</span>
              </div>

              {/* Progress counter & horizontal progress line */}
              <div className="flex items-center gap-4">
                {/* Clock / Timer icon */}
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

                {/* Horizontal Progress Track */}
                <div className="w-32 sm:w-48 h-[2.5px] bg-[var(--line)] rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-[var(--ink)] rounded-full transition-all duration-500 ease-out"
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
          {/* Stays pinned at the center crosshair of the screen        */}
          {/* ========================================================= */}
          <div className="hidden lg:block relative self-stretch w-12 flex justify-center">
            {/* Full Height Vertical Hairline Guide */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-[var(--line)] to-transparent" />

            {/* Pinned Stationary Center Bead (Sticky at 50% viewport) */}
            <div className="sticky top-1/2 -translate-y-1/2 flex items-center justify-center z-30">
              {/* Outer Pulsing Radial Glow */}
              <div
                className={`absolute w-8 h-8 rounded-full transition-opacity duration-300 ${
                  isScrolling ? "opacity-100 scale-125" : "opacity-40 scale-100"
                }`}
                style={{
                  background: "radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, transparent 70%)",
                }}
              />

              {/* The Concentric Bead Ring (Matching reference video) */}
              <div className="w-4 h-4 rounded-full border-2 border-[var(--ink)] bg-[var(--card)] shadow-[0_0_12px_rgba(245,158,11,0.5)] flex items-center justify-center transition-transform duration-300">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--ink)]" />
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT SIDE: SCROLLABLE TIMELINE FEED                      */}
          {/* Only this side moves while the left time machine is fixed */}
          {/* ========================================================= */}
          <div className="pt-[20vh] sm:pt-[28vh] pb-[32vh] sm:pb-[40vh] space-y-24 sm:space-y-36 lg:space-y-48">
            {EXPERIENCE.map((item, idx) => {
              const isActive = activeIndex === idx;

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    itemsRef.current[idx] = el;
                  }}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
                    isActive
                      ? "opacity-100 scale-100 translate-x-0"
                      : "opacity-30 hover:opacity-75 scale-[0.98] lg:translate-x-1 blur-[0.2px]"
                  }`}
                >
                  {/* Period Tag & Category Pill */}
                  <div className="font-mono text-xs uppercase tracking-widest text-[var(--mute)] mb-2.5 flex items-center gap-2.5">
                    <span className={isActive ? "text-[var(--ink)] font-semibold" : ""}>{item.period}</span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[var(--card)] border border-[var(--line)] text-[var(--ink-2)] uppercase">
                      {item.type}
                    </span>
                  </div>

                  {/* Title & Role */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--ink)] leading-snug">
                    {item.title}
                  </h3>

                  {/* Company / Organization & Link */}
                  <div className="flex items-center gap-2 mt-1.5 mb-5 text-sm sm:text-base text-[var(--mute)] font-medium">
                    <span className={isActive ? "text-[var(--ink-2)]" : ""}>{item.company}</span>
                    {item.website && (
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono text-[var(--ink)] underline hover:text-[var(--mute)] transition-colors ml-1"
                      >
                        website ↗
                      </a>
                    )}
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed mb-6 max-w-xl">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5">
                        <span className="text-[var(--mute)] font-mono text-xs mt-0.5 select-none">—</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack pills */}
                  {item.tech && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {item.tech.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="inline-flex items-center gap-1.5 text-[11px] font-mono px-3 py-1 rounded-md bg-[var(--card)] border border-[var(--line)] text-[var(--ink)] shadow-xs"
                        >
                          <TechLogo slug={t.toLowerCase().replace(/[^a-z0-9]/g, "")} name={t} size={12} />
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Ending Card: Next Chapter — Your team? */}
            <div className="rounded-[24px] border-2 border-dashed border-[var(--line)] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[var(--card)]/40 hover:border-[var(--ink)] transition-colors mt-16">
              <div>
                <span className="font-mono text-xs text-[var(--mute)] uppercase tracking-wider block mb-1">
                  Next Chapter
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-[var(--ink)] tracking-tight">
                  Your team?
                </h4>
                <p className="text-xs sm:text-sm text-[var(--mute)] mt-1 max-w-md">
                  Available for high-impact software engineering roles and visionary collaborations.
                </p>
              </div>
              <a
                href={`mailto:${PROFILE.email}`}
                className="btn-primary text-xs whitespace-nowrap"
              >
                Start Conversation →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
