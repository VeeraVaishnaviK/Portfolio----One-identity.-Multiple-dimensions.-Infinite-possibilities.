"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme";

export function InteractiveLamp() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState({
    timeStr: "",
    dateStr: "",
  });

  // Pull physics state
  const [pullY, setPullY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [swayAngle, setSwayAngle] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [isAnimatingSpring, setIsAnimatingSpring] = useState(false);

  const startPointerY = useRef(0);
  const startPointerX = useRef(0);
  const currentPullY = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  const isLight = theme === "light";
  const THRESHOLD = 48; // pixels required to trigger switch

  // Check if user is scrolled into the doors section or inside a door view
  const [inDoorSection, setInDoorSection] = useState(false);

  useEffect(() => {
    const checkDoorsSection = () => {
      if (typeof document !== "undefined" && document.documentElement.getAttribute("data-in-doors") === "true") {
        setInDoorSection(true);
        return;
      }
      const doorsEl = document.getElementById("doors");
      if (!doorsEl) {
        setInDoorSection(false);
        return;
      }
      const rect = doorsEl.getBoundingClientRect();
      const isIn = rect.top < window.innerHeight && rect.bottom > 0;
      setInDoorSection(isIn);
    };

    window.addEventListener("scroll", checkDoorsSection, { passive: true });
    window.addEventListener("resize", checkDoorsSection, { passive: true });
    window.addEventListener("doorStateChange", checkDoorsSection);
    checkDoorsSection();

    return () => {
      window.removeEventListener("scroll", checkDoorsSection);
      window.removeEventListener("resize", checkDoorsSection);
      window.removeEventListener("doorStateChange", checkDoorsSection);
    };
  }, []);

  // 1. Live Time & Date updater
  useEffect(() => {
    setMounted(true);

    const updateClock = () => {
      const now = new Date();

      // Format time e.g. "2:31pm"
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // '0' should be '12'
      const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const timeFormatted = `${hours}:${minutesStr}${ampm}`;

      // Format date e.g. "3 November, 2026"
      const day = now.getDate();
      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      const dateFormatted = `${day} ${month}, ${year}`;

      setCurrentTime({
        timeStr: timeFormatted,
        dateStr: dateFormatted,
      });
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);

    // Trigger popup entrance animation on mount
    const entranceTimer = setTimeout(() => {
      setHasEntered(true);
    }, 100);

    return () => {
      clearInterval(timer);
      clearTimeout(entranceTimer);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Spring release animation loop using damped oscillation
  const animateSpringRelease = (fromY: number, switched: boolean) => {
    setIsAnimatingSpring(true);
    let y = fromY;
    let velocity = -18; // initial upward snap impulse
    const tension = 0.22;
    const friction = 0.72;

    const step = () => {
      const force = -tension * y;
      velocity = (velocity + force) * friction;
      y += velocity;

      if (Math.abs(y) < 0.5 && Math.abs(velocity) < 0.5) {
        setPullY(0);
        currentPullY.current = 0;
        setSwayAngle(0);
        setIsAnimatingSpring(false);
        return;
      }

      setPullY(y);
      currentPullY.current = y;
      setSwayAngle(y * 0.08);
      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);
  };

  // Automated pull down & spring back (for click / keyboard trigger)
  const triggerAutomatedPull = () => {
    if (isDragging || isAnimatingSpring) return;
    setIsAnimatingSpring(true);

    let startTime = performance.now();
    const duration = 260; // 260ms pull down
    const targetPull = 56;

    const animateDown = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const curY = ease * targetPull;
      setPullY(curY);
      currentPullY.current = curY;

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animateDown);
      } else {
        // Switch theme at the bottom of the pull
        toggleTheme();
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate(15);
        }
        // Spring back up
        animateSpringRelease(targetPull, true);
      }
    };

    animFrameRef.current = requestAnimationFrame(animateDown);
  };

  // Pointer drag handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isAnimatingSpring) return;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (_) {}

    setIsDragging(true);
    startPointerY.current = e.clientY;
    startPointerX.current = e.clientX;
    currentPullY.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const deltaY = e.clientY - startPointerY.current;
    const deltaX = e.clientX - startPointerX.current;

    // Only allow pulling downwards
    if (deltaY > 0) {
      // Elastic resistance formula
      const resistedY = deltaY < 60 ? deltaY : 60 + (deltaY - 60) * 0.45;
      const clampedY = Math.min(resistedY, 100);
      setPullY(clampedY);
      currentPullY.current = clampedY;

      // Gentle lateral tilt
      const clampedAngle = Math.min(Math.max(deltaX * 0.12, -7), 7);
      setSwayAngle(clampedAngle);
    } else {
      setPullY(0);
      currentPullY.current = 0;
      setSwayAngle(0);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}

    const distance = currentPullY.current;
    const movedTotal = Math.abs(e.clientY - startPointerY.current);

    if (distance >= THRESHOLD) {
      // Pulled past threshold -> Switch theme & spring back
      toggleTheme();
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(15);
      }
      animateSpringRelease(distance, true);
    } else if (movedTotal < 6) {
      // Quick tap or click without dragging -> trigger full animated pull
      triggerAutomatedPull();
    } else {
      // Released before threshold -> spring back without switching
      animateSpringRelease(distance, false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      triggerAutomatedPull();
    }
  };

  // Dimensions
  const baseRopeLength = 170; // resting rope height in px
  const currentRopeLength = Math.max(baseRopeLength + pullY, 20);
  const thresholdPassed = pullY >= THRESHOLD;

  return (
    <div
      className="fixed top-0 right-4 sm:right-8 md:right-14 z-50 flex items-start gap-3 sm:gap-5 select-none pointer-events-none"
      style={{ isolation: "isolate" }}
    >
      {/* 1. Pill Badge: Local Time and Date (as in 2nd photo, visible on sm/desktop) */}
      <div
        className={`hidden sm:flex pointer-events-auto mt-4 sm:mt-5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl border backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          hasEntered
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4"
        } ${
          isLight
            ? "bg-[#ffffff]/80 text-[#0d0d0d] border-[rgba(13,13,13,0.08)] shadow-[0_4px_16px_rgba(13,13,13,0.05)]"
            : "bg-[#171719]/80 text-[#f4f2ee] border-[rgba(244,242,238,0.12)] shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
        }`}
        style={{
          boxShadow: isLight
            ? "0 4px 20px -2px rgba(13, 13, 13, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.6)"
            : "0 4px 20px -2px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.06)",
        }}
      >
        <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs whitespace-nowrap">
          <span className="text-[var(--mute)] font-normal">
            Local time
          </span>
          <span className="font-semibold text-[var(--ink)] tracking-tight">
            {currentTime.timeStr || "2:31pm"}
          </span>
          <span className="text-[var(--mute)] opacity-60">·</span>
          <span className="text-[var(--ink-2)] font-medium">
            {currentTime.dateStr || "3 November, 2026"}
          </span>
        </div>
      </div>

      {/* 2. Interactive Pull Cord Container (Pops down on load, hidden in door sections) */}
      <div
        className={`pointer-events-auto flex flex-col items-center origin-top transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          hasEntered && !inDoorSection
            ? "opacity-100 translate-y-0"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        style={{
          transformOrigin: "top center",
        }}
      >
        {/* Ambient Top Ceiling Anchor */}
        <div className="w-5 h-2 bg-[#2a2723] dark:bg-[#3d3a36] rounded-b-sm shadow-sm z-10" />

        {/* Rope + Handle Assembly (Interactive Drag Area) */}
        <div
          role="switch"
          tabIndex={0}
          aria-checked={isLight}
          aria-label={
            isLight
              ? "Light mode is ON. Drag rope down to switch to dark mode."
              : "Dark mode is ON. Drag rope down to switch to light mode."
          }
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onClick={(e) => {
            // Support standard click/tap when not dragging
            if (!isDragging && !isAnimatingSpring) {
              triggerAutomatedPull();
            }
          }}
          onKeyDown={handleKeyDown}
          className="group relative flex flex-col items-center cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] focus-visible:ring-offset-2 rounded-full will-change-transform"
          style={{
            touchAction: "none",
            transform: `rotate(${swayAngle}deg)`,
            transformOrigin: "top center",
            transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* SVG Rope with Braided Helical Fiber Texture matching Image 2 */}
          <svg
            width="20"
            height={currentRopeLength}
            className="overflow-visible pointer-events-none drop-shadow-[2px_2px_4px_rgba(0,0,0,0.18)]"
            style={{
              transition: isDragging ? "none" : "height 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <defs>
              {/* Pattern for realistic twisted rope braid */}
              <pattern
                id="braided-cord-pattern"
                width="6"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                {/* Diagonal light fiber stripe */}
                <path
                  d="M0,0 L6,5 M-2,5 L4,10"
                  stroke={isLight ? "#e8dec8" : "#9e9380"}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                {/* Diagonal dark fiber shadow twist */}
                <path
                  d="M6,0 L0,5 M8,5 L2,10"
                  stroke={isLight ? "#9c876c" : "#5a4f40"}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                {/* Center twist highlight */}
                <line
                  x1="2"
                  y1="0"
                  x2="2"
                  y2="10"
                  stroke="#ffffff"
                  strokeWidth="0.8"
                  opacity={isLight ? "0.35" : "0.15"}
                />
              </pattern>
            </defs>

            {/* Background shadow stroke */}
            <line
              x1="10"
              y1="0"
              x2="10"
              y2={currentRopeLength}
              stroke="rgba(0,0,0,0.25)"
              strokeWidth="5"
            />

            {/* Braided Cord fill */}
            <rect
              x="7.5"
              y="0"
              width="5"
              height={currentRopeLength}
              fill="url(#braided-cord-pattern)"
            />
          </svg>

          {/* Brass Collar / Ferrule at bottom of rope */}
          <div
            className="w-3.5 h-2.5 -mt-0.5 rounded-xs shadow-xs z-10 pointer-events-none transition-transform"
            style={{
              background:
                "linear-gradient(90deg, #6e5421 0%, #ba9440 25%, #fce9a2 50%, #ba9440 75%, #5a4214 100%)",
              borderTop: "1px solid rgba(255,255,255,0.4)",
              borderBottom: "1px solid rgba(0,0,0,0.4)",
            }}
          />

          {/* Wooden / Brass Acorn Teardrop Pull Handle matching Image 2 */}
          <div
            className={`relative flex items-center justify-center transition-transform ${
              thresholdPassed ? "scale-110" : "group-hover:scale-105"
            }`}
            style={{
              transition: isDragging ? "transform 0.1s ease-out" : "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Soft tension glow when pulled close to threshold */}
            <div
              className={`absolute inset-0 rounded-full blur-md transition-opacity duration-200 pointer-events-none ${
                thresholdPassed ? "opacity-100 bg-[#ffd778]/50 scale-125" : "opacity-0"
              }`}
            />

            {/* Teardrop Acorn Knob SVG */}
            <svg
              width="26"
              height="40"
              viewBox="0 0 26 40"
              className="drop-shadow-[0_8px_16px_rgba(0,0,0,0.32)] pointer-events-none"
            >
              <defs>
                {/* Rich polished wood grain gradient */}
                <radialGradient id="wood-body" cx="40%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#9e5d31" />
                  <stop offset="45%" stopColor="#693b1b" />
                  <stop offset="85%" stopColor="#3d1f0d" />
                  <stop offset="100%" stopColor="#241107" />
                </radialGradient>

                {/* Vertical cylindrical specular sheen */}
                <linearGradient id="specular-sheen" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="35%" stopColor="#ffffff" stopOpacity="0.45" />
                  <stop offset="70%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Main Teardrop Acorn Shape */}
              <path
                d="M13,1 C16.5,1 24,12 24,25 C24,33.5 19,39 13,39 C7,39 2,33.5 2,25 C2,12 9.5,1 13,1 Z"
                fill="url(#wood-body)"
                stroke="rgba(0,0,0,0.2)"
                strokeWidth="0.8"
              />

              {/* Polished light reflection curve along left shoulder */}
              <path
                d="M13,2 C10,3 5,14 5,25 C5,32 8,36 12,37"
                fill="none"
                stroke="url(#specular-sheen)"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.85"
              />

              {/* Subtle wood grain texture curves */}
              <path
                d="M6,22 Q13,24 20,22 M7,28 Q13,30 19,28 M9,16 Q13,17 17,16"
                fill="none"
                stroke="rgba(0,0,0,0.22)"
                strokeWidth="0.75"
              />

              {/* Golden metallic bottom accent ring */}
              <circle
                cx="13"
                cy="37"
                r="1.8"
                fill="#d4af37"
                opacity="0.9"
              />
            </svg>
          </div>

          {/* Interactive Drag Hint Tooltip (shows on hover or active pull) */}
          <div
            className={`absolute top-full mt-3 whitespace-nowrap font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-md border shadow-md transition-all duration-200 pointer-events-none ${
              isDragging || pullY > 5
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 -translate-y-1 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100"
            } ${
              thresholdPassed
                ? "bg-[#0d0d0d] text-[#ffffff] border-[#ffd778] ring-2 ring-[#ffd778]/50"
                : isLight
                ? "bg-[#0d0d0d] text-[#f4f2ee] border-black/20"
                : "bg-[#f4f2ee] text-[#0d0d0d] border-white/20"
            }`}
          >
            {thresholdPassed
              ? "Release to switch!"
              : isDragging
              ? "Pull down..."
              : isLight
              ? "Drag rope for Dark"
              : "Drag rope for Light"}
          </div>
        </div>
      </div>

      {/* Global CSS for entrance drop animation */}
      <style jsx global>{`
        @keyframes ropeDropIn {
          0% {
            transform: translateY(-170px) rotate(0deg);
            opacity: 0;
          }
          40% {
            opacity: 1;
          }
          65% {
            transform: translateY(16px) rotate(3deg);
          }
          80% {
            transform: translateY(-8px) rotate(-2deg);
          }
          90% {
            transform: translateY(3px) rotate(1deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
}
