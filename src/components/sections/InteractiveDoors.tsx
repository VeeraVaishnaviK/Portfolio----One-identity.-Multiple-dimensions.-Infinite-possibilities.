"use client";

import React, { useState, useEffect, useRef } from "react";
import { scrollToTarget } from "@/lib/scroll";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { useTheme } from "@/lib/theme";

interface DoorData {
  id: string;
  number: string;
  category: string;
  plaqueTitle: string;
  title: string;
  subtitle: string;
  targetId: string;
  accentColor: string;
  glowColor: string;
  floorSpillColor: string;
  badgeClass: string;
  bullets: string[];
  doorBgDark: string;
  doorBgLight: string;
  frameBgDark: string;
  frameBgLight: string;
  iconSvg: React.ReactNode;
}

const DOORS: DoorData[] = [
  {
    id: "projects",
    number: "01",
    category: "Production Platforms",
    plaqueTitle: "PROJECTS",
    title: "Featured Projects",
    subtitle: "PRODUCTION PLATFORMS & FULL-STACK SYSTEMS",
    targetId: "work",
    accentColor: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.55)",
    floorSpillColor: "rgba(56, 189, 248, 0.28)",
    badgeClass: "text-sky-500 dark:text-sky-400 bg-sky-500/10 border-sky-500/30",
    bullets: [
      "Apex Engineering: 62 edge pre-rendered routes on Vercel Edge network",
      "Lin's InfoTech: 3-tier microservices with Next.js, FastAPI & LangChain",
      "Laundex: Mobile-first full-stack booking and order tracking platform",
      "Selective React hydration, dynamic XML sitemaps & sub-100ms TTFB",
    ],
    doorBgDark: "#13233a",
    doorBgLight: "#223956",
    frameBgDark: "#1a2f4c",
    frameBgLight: "#2f4d73",
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    id: "research",
    number: "02",
    category: "AI Research",
    plaqueTitle: "RESEARCH & PUB",
    title: "Research & Publications",
    subtitle: "CLINICAL AI & APPLIED MACHINE LEARNING",
    targetId: "work",
    accentColor: "#c084fc",
    glowColor: "rgba(192, 132, 252, 0.55)",
    floorSpillColor: "rgba(192, 132, 252, 0.28)",
    badgeClass: "text-purple-500 dark:text-purple-400 bg-purple-500/10 border-purple-500/30",
    bullets: [
      "IEEE Xplore published conference paper (ICFTS 2025 proceedings)",
      "92% Parkinson's screening accuracy with MobileNet & KNN classifier",
      "Nexacro: Automated AI acrosome intactness classification platform",
      "Unified ML inference API serving Android Studio client & web app",
    ],
    doorBgDark: "#301932",
    doorBgLight: "#48264b",
    frameBgDark: "#3e2040",
    frameBgLight: "#5d3261",
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    id: "achievements",
    number: "03",
    category: "Honors & Awards",
    plaqueTitle: "ACHIEVEMENTS",
    title: "Achievements & Honors",
    subtitle: "HACKATHONS, ACADEMIC EXCELLENCE & AWARDS",
    targetId: "achievements",
    accentColor: "#34d399",
    glowColor: "rgba(52, 211, 153, 0.55)",
    floorSpillColor: "rgba(52, 211, 153, 0.28)",
    badgeClass: "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    bullets: [
      "1st Prize Winner: 12-Hour Hackathon (Tutor–Student Matching Platform)",
      "3rd Prize Winner: 24-Hour Hackathon (Fake News Classification System)",
      "9.22 / 10 CGPA in B.E. Computer Science (Artificial Intelligence)",
      "Torch Bearer Award 2025 & Best Poster Award at Tech Star Summit",
    ],
    doorBgDark: "#183225",
    doorBgLight: "#264a38",
    frameBgDark: "#204231",
    frameBgLight: "#35644c",
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.004-6.75V3.75h-7v4.5a3.5 3.5 0 003.5 3.5h0a3.5 3.5 0 003.5-3.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 5.25H3.75A2.25 2.25 0 001.5 7.5v.75A3.75 3.75 0 005.25 12h.75m12-6.75h2.25A2.25 2.25 0 0122.5 7.5v.75A3.75 3.75 0 0118.75 12h-.75" />
      </svg>
    ),
  },
  {
    id: "leadership",
    number: "04",
    category: "Community & Mentorship",
    plaqueTitle: "LEADERSHIP",
    title: "Leadership & Community",
    subtitle: "STUDENT MENTORSHIP & CAMPUS INNOVATION",
    targetId: "experience",
    accentColor: "#fbbf24",
    glowColor: "rgba(251, 191, 36, 0.55)",
    floorSpillColor: "rgba(251, 191, 36, 0.28)",
    badgeClass: "text-amber-500 dark:text-amber-400 bg-amber-500/10 border-amber-500/30",
    bullets: [
      "Innovative Student Ambassador: Institution's Innovation Council (IIC 2026)",
      "Vice President: Google Developer Group SIMATS (GDG)",
      "Research & Innovation Lead: Hackathon Club SIMATS",
      "Hands-on student mentorship & workshops in Cloud, Flutter & ML",
    ],
    doorBgDark: "#3b2014",
    doorBgLight: "#5a311f",
    frameBgDark: "#4b2819",
    frameBgLight: "#713e27",
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
];

export function InteractiveDoors() {
  const prefersReduced = usePrefersReducedMotion();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [hoveredDoorId, setHoveredDoorId] = useState<string | null>(null);
  const [selectedDoorId, setSelectedDoorId] = useState<string>("projects");
  const [openedDoorId, setOpenedDoorId] = useState<string | null>(null);
  const [isEntering, setIsEntering] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Active door data
  const activeDoor = DOORS.find((d) => d.id === (hoveredDoorId || selectedDoorId)) || DOORS[0];
  const activeDoorIndex = DOORS.findIndex((d) => d.id === activeDoor.id);
  // Text position: if door 0 or 1 is active, text appears on right; if door 2 or 3 is active, text appears on left
  const isTextOnRight = activeDoorIndex <= 1;

  // Track scroll position to surface the floating "Back to the doors" button
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      // Show when scrolled past the doors section
      const isPastDoors = rect.bottom < 100;
      setShowBackButton(isPastDoors);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut: Escape to close door and reset
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openedDoorId) {
        setOpenedDoorId(null);
        setIsEntering(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openedDoorId]);

  // Handle clicking a door to open and navigate smoothly
  const handleDoorClick = (door: DoorData) => {
    setSelectedDoorId(door.id);
    setOpenedDoorId(door.id);
    setIsEntering(true);

    if (prefersReduced) {
      scrollToTarget(`#${door.targetId}`, -30);
      setTimeout(() => {
        setIsEntering(false);
      }, 300);
      return;
    }

    // Realistic door swing delay (480ms) then camera navigation
    setTimeout(() => {
      scrollToTarget(`#${door.targetId}`, -30);
      setTimeout(() => {
        setIsEntering(false);
      }, 750);
    }, 480);
  };

  // Handle "Back to the doors" click
  const handleBackToDoors = () => {
    setOpenedDoorId(null);
    setIsEntering(false);
    scrollToTarget("#doors", -20);
  };

  return (
    <>
      <section
        id="doors"
        ref={sectionRef}
        aria-label="Interactive Doors — Explore My World"
        className="relative py-20 sm:py-24 md:py-32 overflow-hidden bg-[var(--paper)] text-[var(--ink)] transition-colors duration-500"
      >
        <div className="max-w-[1360px] mx-auto px-[clamp(18px,4vw,64px)] relative z-10">
          
          {/* ========================================================= */}
          {/* SECTION HEADER                                            */}
          {/* ========================================================= */}
          <div className="mb-10 md:mb-14 text-center max-w-3xl mx-auto">
            {/* Tagline Badge */}
            <div className="rv inline-flex items-center gap-2 mb-4 px-3.5 py-1 rounded-full bg-[var(--card)] border border-[var(--line)] shadow-sm font-mono text-[11px] md:text-xs tracking-widest uppercase text-[var(--mute)]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 animate-pulse" />
              <span>SPATIAL DIRECTORY // 04 DOORS</span>
            </div>

            {/* Title */}
            <h2 className="rv text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--ink)] leading-[1.1] mb-4">
              Magic happens{" "}
              <span className="font-serif italic font-normal text-[var(--mute)]">
                behind the doors.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="rv text-sm sm:text-base md:text-lg text-[var(--ink-2)] leading-relaxed max-w-2xl mx-auto">
              Behind each architectural door lies a distinct dimension of my work.
              <span className="hidden sm:inline"> Hover over a door to illuminate and peek inside; click to step through directly.</span>
            </p>
          </div>

          {/* ========================================================= */}
          {/* MOBILE TAB CONTROLS (Screen < 1024px)                     */}
          {/* ========================================================= */}
          <div className="lg:hidden flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
            {DOORS.map((door) => {
              const isSelected = selectedDoorId === door.id;
              return (
                <button
                  key={door.id}
                  onClick={() => {
                    setSelectedDoorId(door.id);
                    setHoveredDoorId(door.id);
                  }}
                  className={`px-3.5 py-2 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-300 flex items-center gap-2 border ${
                    isSelected
                      ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] shadow-md"
                      : "bg-[var(--card)] text-[var(--mute)] hover:text-[var(--ink)] border-[var(--line)]"
                  }`}
                >
                  <span className="opacity-60">{door.number}</span>
                  <span className="font-semibold">{door.plaqueTitle}</span>
                </button>
              );
            })}
          </div>

          {/* ========================================================= */}
          {/* ARCHITECTURAL ROOM WALL                                   */}
          {/* ========================================================= */}
          <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden border border-[var(--line)] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.18)] dark:shadow-[0_30px_90px_-20px_rgba(0,0,0,0.85)] transition-all duration-700">
            
            {/* Wall Plaster Texture & Color */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#f9f7f3] via-[#efebe2] to-[#e2dbce] dark:from-[#111116] dark:via-[#16161c] dark:to-[#0a0a0d] transition-colors duration-700" />
            
            {/* Overhead Gallery Spotlight Beam */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-90 dark:opacity-0"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.85) 0%, transparent 80%)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-700"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.07) 0%, transparent 80%)",
              }}
            />

            {/* Wall Top Molding Line */}
            <div className="relative z-10 w-full h-[2px] bg-gradient-to-r from-transparent via-black/[0.08] dark:via-white/[0.12] to-transparent" />

            {/* Watermark Title inside the Room */}
            <div className="relative z-10 pt-7 pb-3 text-center">
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[var(--mute)] opacity-60 font-semibold">
                — ARCHITECTURAL PASSAGEWAYS —
              </span>
            </div>

            {/* ========================================================= */}
            {/* DESKTOP VIEW: 4 DOORS STANDING ON THE WALL (lg+)          */}
            {/* ========================================================= */}
            <div className="hidden lg:block relative z-10 px-8 xl:px-14 pt-4 pb-14 min-h-[560px]">
              
              {/* The 4 Doors in a Row */}
              <div className="flex justify-between items-end gap-6 xl:gap-8 w-full max-w-[1180px] mx-auto h-[480px]">
                {DOORS.map((door, idx) => {
                  const isHovered = hoveredDoorId === door.id;
                  const isOpened = openedDoorId === door.id;
                  const isAnyHovered = Boolean(hoveredDoorId);
                  const isAjar = isHovered;
                  const isFaded = isAnyHovered && !isHovered && !isOpened;

                  // 3D rotation angle
                  let rotationY = 0;
                  let translateZ = 0;
                  if (!prefersReduced) {
                    if (isOpened) {
                      rotationY = -84;
                      translateZ = 16;
                    } else if (isAjar) {
                      rotationY = -28;
                      translateZ = 6;
                    }
                  }

                  return (
                    <div
                      key={door.id}
                      onMouseEnter={() => {
                        setHoveredDoorId(door.id);
                        setSelectedDoorId(door.id);
                      }}
                      onMouseLeave={() => setHoveredDoorId(null)}
                      onClick={() => handleDoorClick(door)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleDoorClick(door);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Open door ${door.number}: ${door.title}`}
                      className={`relative flex flex-col items-center cursor-pointer select-none outline-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isFaded
                          ? "opacity-20 scale-[0.97] blur-[0.4px]"
                          : "opacity-100 scale-100"
                      }`}
                    >
                      {/* Top Door Identification Indicator */}
                      <div className="mb-3 flex flex-col items-center">
                        <span className="font-mono text-xs font-bold tracking-widest text-[var(--mute)] group-hover:text-[var(--ink)] transition-colors">
                          {door.number}
                        </span>
                        <div
                          className={`w-1.5 h-1.5 rounded-full mt-1 transition-all duration-300 ${
                            isAjar ? "scale-150" : "scale-75 opacity-40"
                          }`}
                          style={{ backgroundColor: door.accentColor }}
                        />
                      </div>

                      {/* Arched Door Frame */}
                      <div
                        className="relative w-[180px] xl:w-[210px] h-[440px] xl:h-[470px] rounded-t-full p-[10px] xl:p-[12px] bg-gradient-to-b from-[#e1dcd1] to-[#c7c0b0] dark:from-[#212128] dark:to-[#131317] shadow-[0_18px_40px_rgba(0,0,0,0.14),inset_0_2px_4px_rgba(255,255,255,0.7),inset_0_-2px_4px_rgba(0,0,0,0.2)] dark:shadow-[0_24px_50px_rgba(0,0,0,0.75),inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-3px_6px_rgba(0,0,0,0.9)] transition-transform duration-500"
                        style={{
                          perspective: "1400px",
                        }}
                      >
                        {/* Inner Cavity (Dark Depth) */}
                        <div className="relative w-full h-full rounded-t-full overflow-hidden bg-[#07070a] shadow-[inset_0_0_20px_rgba(0,0,0,0.95)]">
                          
                          {/* Interior Portal Glow behind Door Leaf */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 overflow-hidden">
                            <div
                              className={`absolute inset-0 transition-opacity duration-700 ${
                                isAjar || isOpened ? "opacity-100" : "opacity-30"
                              }`}
                              style={{
                                background: `radial-gradient(circle at 50% 60%, ${door.glowColor} 0%, rgba(0,0,0,0.9) 75%)`,
                              }}
                            />

                            {/* Floating Light Particles */}
                            <div
                              className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                                isAjar ? "opacity-90" : "opacity-0"
                              }`}
                            >
                              <div
                                className="w-1.5 h-1.5 rounded-full absolute top-1/4 left-1/3 animate-ping"
                                style={{ backgroundColor: door.accentColor }}
                              />
                              <div
                                className="w-1 h-1 rounded-full absolute top-1/2 right-1/4 animate-pulse"
                                style={{ backgroundColor: door.accentColor }}
                              />
                            </div>

                            {/* Portal Glyphs */}
                            <div
                              className={`relative z-10 transition-all duration-700 flex flex-col items-center ${
                                isOpened
                                  ? "scale-125 opacity-100"
                                  : isAjar
                                  ? "scale-100 opacity-90"
                                  : "scale-75 opacity-25"
                              }`}
                              style={{ color: door.accentColor }}
                            >
                              {door.iconSvg}
                              <span className="mt-2 font-mono text-[9px] uppercase tracking-widest text-white/90 font-bold">
                                Enter
                              </span>
                            </div>
                          </div>

                          {/* Door Leaf (The 3D Swinging Panel) */}
                          <div
                            className="absolute inset-0 w-full h-full rounded-t-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] [backface-visibility:hidden] origin-left border-r border-black/50 shadow-2xl"
                            style={{
                              transform: `rotateY(${rotationY}deg) translateZ(${translateZ}px)`,
                              backgroundColor: isDark ? door.doorBgDark : door.doorBgLight,
                            }}
                          >
                            {/* Reeded / Fluted Vertical Texture */}
                            <div
                              className="absolute inset-0 rounded-t-full opacity-90"
                              style={{
                                backgroundImage:
                                  "repeating-linear-gradient(90deg, transparent, transparent 9px, rgba(255,255,255,0.038) 9px, rgba(255,255,255,0.038) 10.5px, rgba(0,0,0,0.32) 10.5px, rgba(0,0,0,0.32) 12px)",
                              }}
                            />

                            {/* Architectural Bevel Highlight & Shadow */}
                            <div className="absolute inset-0 rounded-t-full shadow-[inset_0_2px_8px_rgba(255,255,255,0.18),inset_0_-4px_12px_rgba(0,0,0,0.8)]" />

                            {/* Specular Ambient Rim Lighting */}
                            <div
                              className={`absolute inset-0 rounded-t-full transition-opacity duration-500 pointer-events-none ${
                                isAjar ? "opacity-100" : "opacity-0"
                              }`}
                              style={{
                                boxShadow: `inset 2px 0 14px ${door.glowColor}`,
                              }}
                            />

                            {/* Brass Nameplate */}
                            <div className="absolute top-[26%] left-1/2 -translate-x-1/2 w-[84%] max-w-[155px] py-2 px-2 rounded-[2.5px] bg-gradient-to-br from-[#dfbc60] via-[#faeb9c] via-[#cf9e33] to-[#99711c] shadow-[0_4px_10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.95)] border border-[#865e15] flex flex-col items-center justify-center text-center">
                              {/* 4 Corner Rivets */}
                              <span className="w-1 h-1 rounded-full bg-[#523707] shadow-inner absolute top-0.5 left-0.5" />
                              <span className="w-1 h-1 rounded-full bg-[#523707] shadow-inner absolute top-0.5 right-0.5" />
                              <span className="w-1 h-1 rounded-full bg-[#523707] shadow-inner absolute bottom-0.5 left-0.5" />
                              <span className="w-1 h-1 rounded-full bg-[#523707] shadow-inner absolute bottom-0.5 right-0.5" />

                              <span className="font-mono text-[8px] font-bold tracking-[0.2em] text-[#4b3309] leading-none mb-0.5">
                                № {door.number}
                              </span>
                              <span className="font-sans text-[10px] font-extrabold tracking-[0.14em] text-[#241703] uppercase leading-none [text-shadow:0_1px_0_rgba(255,255,255,0.6)] truncate max-w-full">
                                {door.plaqueTitle}
                              </span>
                            </div>

                            {/* Brass Lever Handle & Escutcheon */}
                            <div className="absolute top-[54%] right-3 flex flex-col items-end pointer-events-none">
                              <div className="flex items-center">
                                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#fff2b0] via-[#cfa33e] to-[#7b5413] shadow-md border border-[#865e15]" />
                                <div className="w-8 h-2 rounded-r-md -ml-1 bg-gradient-to-b from-[#fff6c2] via-[#d6a943] to-[#7e5513] shadow-[0_4px_8px_rgba(0,0,0,0.5)]" />
                              </div>
                              <div className="w-2.5 h-4.5 mt-1 mr-1 rounded-sm bg-gradient-to-b from-[#e3c473] to-[#7e5716] shadow-sm border border-[#6b470c] flex items-center justify-center">
                                <div className="w-0.5 h-1.5 bg-[#1a1204] rounded-full" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* "Click to enter ↗" Floating Pill */}
                      {isAjar && (
                        <div
                          className="flex absolute -right-4 top-[54%] -translate-y-1/2 z-30 items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--card)]/95 text-[var(--ink)] shadow-[0_10px_25px_rgba(0,0,0,0.25)] border border-[var(--line)] backdrop-blur-md animate-[bounce_2s_infinite] pointer-events-none"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full animate-ping"
                            style={{ backgroundColor: door.accentColor }}
                          />
                          <span className="font-mono text-[10px] font-semibold tracking-wider whitespace-nowrap">
                            Click to enter ↗
                          </span>
                        </div>
                      )}

                      {/* Floor Light Spill */}
                      <div
                        className={`w-full h-12 -mt-1 rounded-b-xl transition-all duration-700 pointer-events-none ${
                          isAjar ? "opacity-100 scale-105" : "opacity-0 scale-95"
                        }`}
                        style={{
                          background: `radial-gradient(ellipse at 50% 0%, ${door.floorSpillColor} 0%, transparent 75%)`,
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Dynamic On-Wall Section Typography HUD (matching reference video) */}
              {hoveredDoorId && (
                <div
                  className={`absolute top-1/2 -translate-y-1/2 z-20 w-[440px] xl:w-[480px] p-6 rounded-2xl bg-[var(--paper)]/90 dark:bg-[#0c0d11]/85 backdrop-blur-md border border-[var(--line)] shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isTextOnRight
                      ? "right-8 xl:right-16 animate-[fadeInRight_0.4s_ease-out]"
                      : "left-8 xl:left-16 animate-[fadeInLeft_0.4s_ease-out]"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase border ${activeDoor.badgeClass}`}>
                      PORTAL {activeDoor.number} // {activeDoor.category}
                    </span>
                    <span className="font-mono text-xs text-[var(--mute)]">
                      Target: #{activeDoor.targetId}
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold tracking-tight text-[var(--ink)] mb-1">
                    {activeDoor.title}
                  </h3>

                  <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--mute)] mb-4">
                    {activeDoor.subtitle}
                  </p>

                  <div className="space-y-2.5 mb-6">
                    {activeDoor.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <div
                          className="w-4 h-4 rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center text-[10px] text-white shadow-xs"
                          style={{ backgroundColor: activeDoor.accentColor }}
                        >
                          ✓
                        </div>
                        <span className="text-xs text-[var(--ink-2)] leading-snug">
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleDoorClick(activeDoor)}
                    className="btn-primary w-full py-2.5 text-xs font-mono"
                    aria-label={`Enter portal for ${activeDoor.title}`}
                  >
                    <span>Enter Portal № {activeDoor.number}</span>
                    <span>→</span>
                  </button>
                </div>
              )}
            </div>

            {/* ========================================================= */}
            {/* MOBILE & TABLET VIEW: FOCUSED ARCHITECTURAL DOOR (< 1024px)*/}
            {/* ========================================================= */}
            <div className="lg:hidden relative z-10 px-4 pt-4 pb-10 flex flex-col items-center">
              
              {/* Focused Active Door */}
              <div
                onClick={() => handleDoorClick(activeDoor)}
                tabIndex={0}
                role="button"
                aria-label={`Open door ${activeDoor.number}: ${activeDoor.title}`}
                className="relative flex flex-col items-center cursor-pointer select-none outline-none"
              >
                {/* Top Number */}
                <div className="mb-2 flex flex-col items-center">
                  <span className="font-mono text-xs font-bold tracking-widest text-[var(--mute)]">
                    PORTAL {activeDoor.number}
                  </span>
                  <div
                    className="w-2 h-2 rounded-full mt-1 animate-pulse"
                    style={{ backgroundColor: activeDoor.accentColor }}
                  />
                </div>

                {/* Arched Door Frame */}
                <div
                  className="relative w-[190px] sm:w-[230px] h-[370px] sm:h-[430px] rounded-t-full p-[10px] sm:p-[12px] bg-gradient-to-b from-[#e1dcd1] to-[#c7c0b0] dark:from-[#212128] dark:to-[#131317] shadow-[0_18px_40px_rgba(0,0,0,0.14)] dark:shadow-[0_24px_50px_rgba(0,0,0,0.8)]"
                  style={{
                    perspective: "1200px",
                  }}
                >
                  <div className="relative w-full h-full rounded-t-full overflow-hidden bg-[#07070a] shadow-[inset_0_0_20px_rgba(0,0,0,0.95)]">
                    {/* Interior Room */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                      <div
                        className="absolute inset-0 opacity-100"
                        style={{
                          background: `radial-gradient(circle at 50% 60%, ${activeDoor.glowColor} 0%, rgba(0,0,0,0.9) 75%)`,
                        }}
                      />
                      <div
                        className="relative z-10 flex flex-col items-center text-white"
                        style={{ color: activeDoor.accentColor }}
                      >
                        {activeDoor.iconSvg}
                        <span className="mt-2 font-mono text-[9px] uppercase tracking-widest text-white/90 font-bold">
                          Tap to enter
                        </span>
                      </div>
                    </div>

                    {/* Door Leaf (Ajar 3D Angle) */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-t-full transition-transform duration-700 [transform-style:preserve-3d] [backface-visibility:hidden] origin-left border-r border-black/50"
                      style={{
                        transform: prefersReduced
                          ? "none"
                          : openedDoorId === activeDoor.id
                          ? "rotateY(-84deg) translateZ(16px)"
                          : "rotateY(-28deg) translateZ(6px)",
                        backgroundColor: isDark ? activeDoor.doorBgDark : activeDoor.doorBgLight,
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-t-full opacity-90"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(90deg, transparent, transparent 9px, rgba(255,255,255,0.038) 9px, rgba(255,255,255,0.038) 10.5px, rgba(0,0,0,0.32) 10.5px, rgba(0,0,0,0.32) 12px)",
                        }}
                      />

                      {/* Brass Nameplate */}
                      <div className="absolute top-[26%] left-1/2 -translate-x-1/2 w-[84%] max-w-[155px] py-2 px-2 rounded-[2.5px] bg-gradient-to-br from-[#dfbc60] via-[#faeb9c] via-[#cf9e33] to-[#99711c] shadow-[0_4px_10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.95)] border border-[#865e15] flex flex-col items-center justify-center text-center">
                        <span className="font-mono text-[8px] font-bold tracking-[0.2em] text-[#4b3309] leading-none mb-0.5">
                          № {activeDoor.number}
                        </span>
                        <span className="font-sans text-[10px] font-extrabold tracking-[0.14em] text-[#241703] uppercase leading-none [text-shadow:0_1px_0_rgba(255,255,255,0.6)] truncate max-w-full">
                          {activeDoor.plaqueTitle}
                        </span>
                      </div>

                      {/* Brass Lever Handle */}
                      <div className="absolute top-[54%] right-3 flex flex-col items-end pointer-events-none">
                        <div className="flex items-center">
                          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#fff2b0] via-[#cfa33e] to-[#7b5413] shadow-md border border-[#865e15]" />
                          <div className="w-8 h-2 rounded-r-md -ml-1 bg-gradient-to-b from-[#fff6c2] via-[#d6a943] to-[#7e5513] shadow-[0_4px_8px_rgba(0,0,0,0.5)]" />
                        </div>
                        <div className="w-2.5 h-4.5 mt-1 mr-1 rounded-sm bg-gradient-to-b from-[#e3c473] to-[#7e5716] shadow-sm border border-[#6b470c] flex items-center justify-center">
                          <div className="w-0.5 h-1.5 bg-[#1a1204] rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* "Tap to enter ↗" Floating Pill */}
                <div className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--card)]/95 text-[var(--ink)] shadow-md border border-[var(--line)]">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-ping"
                    style={{ backgroundColor: activeDoor.accentColor }}
                  />
                  <span className="font-mono text-[10px] font-semibold tracking-wider">
                    Tap door to enter ↗
                  </span>
                </div>
              </div>
            </div>

            {/* Architectural Baseboard Molding */}
            <div className="relative z-10 w-full">
              <div className="h-[2px] bg-black/15 dark:bg-black/60 shadow-inner" />
              <div className="h-4 sm:h-5 bg-[#dad3c3] dark:bg-[#15161b] border-t border-black/[0.08] dark:border-white/[0.08] shadow-[0_-4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_-6px_20px_rgba(0,0,0,0.7)]" />
              <div className="h-6 sm:h-8 bg-gradient-to-b from-[#cfc7b5] to-[#c2b9a5] dark:from-[#0d0e12] dark:to-[#08080a] flex items-center justify-center">
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--mute)] opacity-50">
                  GALLERY PORTAL FLOOR
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* INSPECTION DETAILS PANEL (Visible on all devices)        */}
          {/* ========================================================= */}
          <div className="mt-8 sm:mt-10 card-surface p-6 sm:p-8 md:p-10 relative overflow-hidden transition-all duration-500">
            {/* Background Ambient Blur */}
            <div
              className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-700"
              style={{ backgroundColor: activeDoor.accentColor }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-center relative z-10">
              {/* Left Column: Heading, Subtitle & Action */}
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase border ${activeDoor.badgeClass}`}>
                    PORTAL {activeDoor.number} // {activeDoor.category}
                  </span>
                  <span className="font-mono text-xs text-[var(--mute)]">
                    Target: #{activeDoor.targetId}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--ink)] mb-2">
                  {activeDoor.title}
                </h3>

                <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-[var(--mute)] mb-6">
                  {activeDoor.subtitle}
                </p>

                {/* Primary Button to Step Through */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleDoorClick(activeDoor)}
                    className="btn-primary"
                    aria-label={`Enter portal for ${activeDoor.title}`}
                  >
                    <span>Enter Portal</span>
                    <span className="font-mono text-xs">№ {activeDoor.number}</span>
                    <span>→</span>
                  </button>

                  <span className="text-xs font-mono text-[var(--mute)]">
                    {isEntering ? "Unlocking doorway..." : "Direct jump with smooth glide"}
                  </span>
                </div>
              </div>

              {/* Right Column: Key Highlights Bullet Checklist */}
              <div className="bg-[var(--paper)]/60 dark:bg-[var(--paper)]/40 p-5 sm:p-6 rounded-2xl border border-[var(--line)] backdrop-blur-sm space-y-3">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--mute)] font-semibold block mb-2">
                  What is behind this door:
                </span>
                
                {activeDoor.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div
                      className="w-4 h-4 rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center text-[10px] text-white shadow-xs"
                      style={{ backgroundColor: activeDoor.accentColor }}
                    >
                      ✓
                    </div>
                    <span className="text-xs sm:text-sm text-[var(--ink-2)] leading-snug">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* FLOATING "← BACK TO THE DOORS" PILL BUTTON                    */}
      {/* Appears when user scrolls past doors or enters a section      */}
      {/* Matches reference video UX                                    */}
      {/* ============================================================= */}
      <div
        className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          showBackButton
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <button
          onClick={handleBackToDoors}
          aria-label="Return to the Interactive Doors selection"
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[var(--card)]/90 text-[var(--ink)] border border-[var(--line)] shadow-[0_10px_35px_rgba(0,0,0,0.2)] backdrop-blur-md hover:bg-[var(--ink)] hover:text-[var(--paper)] hover:shadow-2xl transition-all duration-300 font-mono text-xs font-medium cursor-pointer"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>
          <span>Back to the doors</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 group-hover:bg-[var(--paper)] transition-colors" />
        </button>
      </div>
    </>
  );
}
