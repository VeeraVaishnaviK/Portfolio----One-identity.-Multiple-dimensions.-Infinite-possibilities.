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
    title: "Projects",
    subtitle: "PRODUCTION PLATFORMS & FULL-STACK SYSTEMS",
    targetId: "work",
    accentColor: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.6)",
    floorSpillColor: "rgba(56, 189, 248, 0.35)",
    bullets: [
      "Apex Engineering: 62 edge pre-rendered routes on Vercel Edge network",
      "Lin's InfoTech: 3-tier microservices with Next.js, FastAPI & LangChain",
      "Laundex: Mobile-first full-stack booking and order tracking platform",
      "Selective React hydration, dynamic XML sitemaps & sub-100ms TTFB",
    ],
    doorBgDark: "#152438",
    doorBgLight: "#1b2c44",
    frameBgDark: "#23334d",
    frameBgLight: "#f0ece1",
    iconSvg: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
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
    glowColor: "rgba(192, 132, 252, 0.6)",
    floorSpillColor: "rgba(192, 132, 252, 0.35)",
    bullets: [
      "IEEE Xplore published conference paper (ICFTS 2025 proceedings)",
      "92% Parkinson's screening accuracy with MobileNet & KNN classifier",
      "Nexacro: Automated AI acrosome intactness classification platform",
      "Unified ML inference API serving Android Studio client & web app",
    ],
    doorBgDark: "#321d30",
    doorBgLight: "#3c223a",
    frameBgDark: "#452943",
    frameBgLight: "#f0ece1",
    iconSvg: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    id: "achievements",
    number: "03",
    category: "Honors & Awards",
    plaqueTitle: "ACHIEVEMENTS",
    title: "Achievements",
    subtitle: "HACKATHONS, ACADEMIC EXCELLENCE & AWARDS",
    targetId: "achievements",
    accentColor: "#34d399",
    glowColor: "rgba(52, 211, 153, 0.6)",
    floorSpillColor: "rgba(52, 211, 153, 0.35)",
    bullets: [
      "1st Prize Winner: 12-Hour Hackathon (Tutor–Student Matching Platform)",
      "3rd Prize Winner: 24-Hour Hackathon (Fake News Classification System)",
      "9.22 / 10 CGPA in B.E. Computer Science (Artificial Intelligence)",
      "Torch Bearer Award 2025 & Best Poster Award at Tech Star Summit",
    ],
    doorBgDark: "#1c3327",
    doorBgLight: "#546e5a",
    frameBgDark: "#264234",
    frameBgLight: "#f0ece1",
    iconSvg: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.004-6.75V3.75h-7v4.5a3.5 3.5 0 003.5 3.5h0a3.5 3.5 0 003.5-3.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 5.25H3.75A2.25 2.25 0 001.5 7.5v.75A3.75 3.75 0 005.25 12h.75m12-6.75h2.25A2.25 2.25 0 0122.5 7.5v.75A3.75 3.75 0 0118.75 12h-.75" />
      </svg>
    ),
  },
  {
    id: "leadership",
    number: "04",
    category: "Leadership & Community",
    plaqueTitle: "LEADERSHIP",
    title: "Leadership",
    subtitle: "STUDENT MENTORSHIP & CAMPUS INNOVATION",
    targetId: "experience",
    accentColor: "#fbbf24",
    glowColor: "rgba(251, 191, 36, 0.6)",
    floorSpillColor: "rgba(251, 191, 36, 0.35)",
    bullets: [
      "Innovative Student Ambassador: Institution's Innovation Council (IIC 2026)",
      "Vice President: Google Developer Group SIMATS (GDG)",
      "Research & Innovation Lead: Hackathon Club SIMATS",
      "Hands-on student mentorship & technical workshops across campus",
    ],
    doorBgDark: "#3a1e14",
    doorBgLight: "#8c4a2a",
    frameBgDark: "#4d291b",
    frameBgLight: "#f0ece1",
    iconSvg: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
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
  const [cordPulled, setCordPulled] = useState(false);
  const [ambientLight, setAmbientLight] = useState(false);
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

  // Keyboard shortcut: Escape to close door
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openedDoorId) {
        setOpenedDoorId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openedDoorId]);

  // Handle clicking a door to open realistically and navigate
  const handleDoorClick = (door: DoorData) => {
    setSelectedDoorId(door.id);
    setOpenedDoorId(door.id);

    if (prefersReduced) {
      scrollToTarget(`#${door.targetId}`, -30);
      return;
    }

    // Realistic door swing delay (500ms) then camera glide
    setTimeout(() => {
      scrollToTarget(`#${door.targetId}`, -30);
    }, 500);
  };

  // Pull cord interactive toggle
  const handlePullCord = () => {
    setCordPulled(true);
    setAmbientLight((prev) => !prev);
    setTimeout(() => setCordPulled(false), 600);
  };

  // Handle "Back to the doors" click
  const handleBackToDoors = () => {
    setOpenedDoorId(null);
    scrollToTarget("#doors", -20);
  };

  return (
    <>
      <section
        id="doors"
        ref={sectionRef}
        aria-label="Interactive Doors — Explore My World"
        className="relative pt-24 pb-0 overflow-hidden bg-[var(--paper)] text-[var(--ink)] transition-colors duration-500 select-none"
      >
        {/* ========================================================= */}
        {/* HANGING CEILING LIGHT PULL CORD (TOP RIGHT)               */}
        {/* Matches reference video exactly                           */}
        {/* ========================================================= */}
        <div
          onClick={handlePullCord}
          role="button"
          tabIndex={0}
          aria-label="Pull lamp cord to toggle room light"
          className="hidden sm:flex absolute right-6 md:right-16 lg:right-24 top-0 z-30 cursor-pointer group flex-col items-center select-none"
        >
          {/* Ceiling mount fixture */}
          <div className="w-3.5 h-1.5 bg-gradient-to-r from-stone-400 via-stone-300 to-stone-400 dark:from-stone-600 dark:via-stone-500 dark:to-stone-600 rounded-b shadow-sm" />

          {/* Hanging twisted rope/cord */}
          <div
            className={`w-[2px] h-32 md:h-44 bg-gradient-to-b from-stone-400/80 via-stone-400/60 to-stone-500 dark:from-stone-600 dark:to-stone-400 transition-transform duration-500 origin-top ${
              cordPulled ? "scale-y-110" : "group-hover:scale-y-105"
            }`}
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 6px)",
            }}
          />

          {/* Wooden / Brass Acorn Drop Pendant */}
          <div
            className={`-mt-1 flex flex-col items-center transition-transform duration-500 ${
              cordPulled
                ? "translate-y-3 rotate-6"
                : "group-hover:translate-y-1.5 group-hover:rotate-3"
            }`}
          >
            {/* Brass Ferrule */}
            <div className="w-2.5 h-2 rounded-t-sm bg-gradient-to-r from-amber-600 via-amber-300 to-amber-700 shadow-xs" />
            {/* Wooden Acorn Body */}
            <div className="w-4 h-6 rounded-full bg-gradient-to-br from-[#804627] via-[#5c3017] to-[#361a0b] shadow-[0_4px_10px_rgba(0,0,0,0.4)] border border-amber-900/50" />
          </div>
        </div>

        {/* Ambient room lamp flare when pulled */}
        <div
          className={`absolute top-0 right-16 w-96 h-96 rounded-full pointer-events-none transition-opacity duration-700 blur-3xl -z-0 ${
            ambientLight ? "opacity-70" : "opacity-0"
          }`}
          style={{
            background: "radial-gradient(circle, rgba(251,191,36,0.25) 0%, transparent 70%)",
          }}
        />

        {/* ========================================================= */}
        {/* SECTION HEADER                                            */}
        {/* Exactly matching reference video:                         */}
        {/* "Magic happens behind the doors"                          */}
        {/* ========================================================= */}
        <div className="mb-12 md:mb-16 text-center max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--ink)] leading-tight">
            Magic happens{" "}
            <span className="font-serif italic font-normal text-[var(--mute)]">
              behind the doors
            </span>
          </h2>
        </div>

        {/* ========================================================= */}
        {/* MOBILE & TABLET DOOR SELECTOR TABS (< 1024px)              */}
        {/* ========================================================= */}
        <div className="lg:hidden flex items-center justify-start sm:justify-center gap-2 overflow-x-auto px-4 pb-4 mb-4 no-scrollbar relative z-20">
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
                    ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] shadow-md scale-105"
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
        {/* ARCHITECTURAL ROOM WALL CONTAINER                         */}
        {/* Open wall room with baseboard and wood floor at bottom     */}
        {/* ========================================================= */}
        <div className="relative w-full overflow-hidden">
          
          {/* Smooth Plaster Wall Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#f8f6f0] via-[#f1eee6] to-[#e7e3d8] dark:from-[#111217] dark:via-[#15171e] dark:to-[#0d0e12] transition-colors duration-700" />

          {/* Subtle Ambient Spotlight from Top */}
          <div
            className="absolute inset-0 pointer-events-none opacity-80 dark:opacity-20"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,255,255,0.7) 0%, transparent 80%)",
            }}
          />

          {/* ========================================================= */}
          {/* DESKTOP VIEW: 4 DOORS STANDING ON THE WALL (lg+)          */}
          {/* ========================================================= */}
          <div className="hidden lg:block relative z-10 max-w-[1320px] mx-auto px-8 pt-8 pb-0 min-h-[520px]">
            
            {/* The 4 Doors in a Row */}
            <div className="flex justify-between items-end gap-6 xl:gap-8 w-full max-w-[1180px] mx-auto">
              {DOORS.map((door) => {
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
                    rotationY = -24;
                    translateZ = 8;
                  }
                }

                return (
                  <div
                    key={door.id}
                    data-door-index={door.number}
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
                    className={`relative flex flex-col items-center cursor-pointer select-none outline-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isFaded ? "opacity-10 blur-[0.8px] scale-[0.98]" : "opacity-100 scale-100"
                    }`}
                  >
                    {/* Arched Door Frame (White / Ivory Trim Casing) */}
                    <div
                      className="relative w-[185px] xl:w-[215px] h-[440px] xl:h-[470px] rounded-t-full p-[10px] xl:p-[12px] bg-gradient-to-b from-[#f7f5ee] to-[#ded9cd] dark:from-[#252833] dark:to-[#17181f] shadow-[0_16px_36px_rgba(0,0,0,0.12),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.2)] dark:shadow-[0_22px_48px_rgba(0,0,0,0.7),inset_0_2px_4px_rgba(255,255,255,0.08),inset_0_-3px_6px_rgba(0,0,0,0.9)]"
                      style={{
                        perspective: "1300px",
                      }}
                    >
                      {/* Inner Doorway Cavity (Dark Depth) */}
                      <div className="relative w-full h-full rounded-t-full overflow-hidden bg-[#08090d] shadow-[inset_0_0_22px_rgba(0,0,0,0.95)]">
                        
                        {/* Interior Portal Glow behind the swinging door leaf */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 overflow-hidden">
                          <div
                            className={`absolute inset-0 transition-opacity duration-500 ${
                              isAjar || isOpened ? "opacity-100" : "opacity-25"
                            }`}
                            style={{
                              background: `radial-gradient(circle at 50% 60%, ${door.glowColor} 0%, rgba(0,0,0,0.95) 75%)`,
                            }}
                          />
                        </div>

                        {/* =================================================== */}
                        {/* THE 3D SWINGING DOOR PANEL                          */}
                        {/* =================================================== */}
                        <div
                          className="absolute inset-0 w-full h-full rounded-t-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] [backface-visibility:hidden] origin-left border-r border-black/50 shadow-2xl"
                          style={{
                            transform: `rotateY(${rotationY}deg) translateZ(${translateZ}px)`,
                            backgroundColor: isDark ? door.doorBgDark : door.doorBgLight,
                          }}
                        >
                          {/* Fluted Vertical Wood Slat Texture (Fine ribs) */}
                          <div
                            className="absolute inset-0 rounded-t-full opacity-90"
                            style={{
                              backgroundImage:
                                "repeating-linear-gradient(90deg, transparent, transparent 7px, rgba(255,255,255,0.045) 7px, rgba(255,255,255,0.045) 8.5px, rgba(0,0,0,0.35) 8.5px, rgba(0,0,0,0.35) 10px)",
                            }}
                          />

                          {/* Architectural Bevel Highlight */}
                          <div className="absolute inset-0 rounded-t-full shadow-[inset_0_2px_8px_rgba(255,255,255,0.18),inset_0_-4px_12px_rgba(0,0,0,0.8)]" />

                          {/* ================================================= */}
                          {/* POLISHED BRASS PLAQUE                             */}
                          {/* ================================================= */}
                          <div
                            className={`absolute top-[28%] left-1/2 -translate-x-1/2 w-[82%] max-w-[155px] py-2 px-2.5 rounded-[2px] bg-gradient-to-br from-[#dfbc60] via-[#faeb9c] via-[#cf9e33] to-[#99711c] shadow-[0_4px_10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.95)] border border-[#865e15] flex flex-col items-center justify-center text-center transition-opacity duration-300 ${
                              isFaded ? "opacity-0" : "opacity-100"
                            }`}
                          >
                            {/* 4 Corner Screws */}
                            <span className="w-1 h-1 rounded-full bg-[#523707] shadow-inner absolute top-0.5 left-0.5" />
                            <span className="w-1 h-1 rounded-full bg-[#523707] shadow-inner absolute top-0.5 right-0.5" />
                            <span className="w-1 h-1 rounded-full bg-[#523707] shadow-inner absolute bottom-0.5 left-0.5" />
                            <span className="w-1 h-1 rounded-full bg-[#523707] shadow-inner absolute bottom-0.5 right-0.5" />

                            <span className="font-sans text-[10px] xl:text-[11px] font-extrabold tracking-[0.14em] text-[#241703] uppercase leading-none [text-shadow:0_1px_0_rgba(255,255,255,0.6)] truncate max-w-full">
                              {door.plaqueTitle}
                            </span>
                          </div>

                          {/* ================================================= */}
                          {/* "Click to enter" PILL OVER THE DOOR (When ajar)   */}
                          {/* Exactly matching reference video                  */}
                          {/* ================================================= */}
                          {isAjar && (
                            <div className="absolute top-[38%] left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                              <div className="px-3.5 py-1.5 rounded-full bg-black/95 text-white dark:bg-stone-100 dark:text-stone-900 shadow-[0_8px_25px_rgba(0,0,0,0.45)] border border-white/10 dark:border-black/10 flex items-center gap-1.5 whitespace-nowrap animate-[pulse_2s_infinite]">
                                <span className="font-sans text-[11px] font-bold tracking-wide">
                                  Click to enter
                                </span>
                              </div>
                            </div>
                          )}

                          {/* ================================================= */}
                          {/* POLISHED BRASS LEVER HANDLE & KEYHOLE             */}
                          {/* ================================================= */}
                          <div
                            className={`absolute top-[56%] right-3 flex flex-col items-end pointer-events-none transition-opacity duration-300 ${
                              isFaded ? "opacity-0" : "opacity-100"
                            }`}
                          >
                            <div className="flex items-center">
                              {/* Rosette */}
                              <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#fff2b0] via-[#cfa33e] to-[#7b5413] shadow-md border border-[#865e15]" />
                              {/* Lever */}
                              <div className="w-8 h-2 rounded-r-md -ml-1 bg-gradient-to-b from-[#fff6c2] via-[#d6a943] to-[#7e5513] shadow-[0_4px_8px_rgba(0,0,0,0.5)]" />
                            </div>
                            {/* Keyhole Escutcheon */}
                            <div className="w-2.5 h-4.5 mt-1 mr-1 rounded-xs bg-gradient-to-b from-[#e3c473] to-[#7e5716] shadow-xs border border-[#6b470c] flex items-center justify-center">
                              <div className="w-0.5 h-1.5 bg-[#1a1204] rounded-full" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floor Light Spill */}
                    <div
                      className={`w-full h-8 -mt-1 rounded-b-xl transition-all duration-500 pointer-events-none ${
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

            {/* ========================================================= */}
            {/* ON-WALL TYPOGRAPHY (NO MODAL BOX, PRINTED ON THE WALL)    */}
            {/* Exactly matching reference video frame 010 and 004        */}
            {/* ========================================================= */}
            {hoveredDoorId && (
              <div
                className={`absolute top-1/2 -translate-y-1/2 z-20 w-[420px] xl:w-[460px] pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isTextOnRight ? "right-12 xl:right-20" : "left-12 xl:left-20"
                }`}
              >
                {/* Big Bold Clean Section Title */}
                <h3 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-[var(--ink)] mb-1">
                  {activeDoor.title}
                </h3>

                {/* Subtitle / Category */}
                <p className="font-mono text-[11px] xl:text-xs font-semibold uppercase tracking-wider text-[var(--mute)] mb-5">
                  {activeDoor.subtitle}
                </p>

                {/* Clean Bullets with Circled Checkmarks directly on the wall */}
                <div className="space-y-3.5">
                  {activeDoor.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center text-[10px] bg-stone-900/10 dark:bg-white/15 text-[var(--ink)] font-bold">
                        ✓
                      </div>
                      <span className="text-sm font-medium text-[var(--ink)] leading-snug">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* MOBILE & TABLET VIEW: FOCUSED ARCHITECTURAL DOOR (< 1024px)*/}
          {/* ========================================================= */}
          <div className="lg:hidden relative z-10 px-4 pt-4 pb-8 flex flex-col items-center">
            
            {/* Focused Active Door */}
            <div
              onClick={() => handleDoorClick(activeDoor)}
              tabIndex={0}
              role="button"
              aria-label={`Open door ${activeDoor.number}: ${activeDoor.title}`}
              className="relative flex flex-col items-center cursor-pointer select-none outline-none"
            >
              {/* Arched Door Frame */}
              <div
                className="relative w-[190px] sm:w-[220px] h-[370px] sm:h-[420px] rounded-t-full p-[10px] sm:p-[12px] bg-gradient-to-b from-[#f7f5ee] to-[#ded9cd] dark:from-[#252833] dark:to-[#17181f] shadow-[0_18px_40px_rgba(0,0,0,0.14)] dark:shadow-[0_24px_50px_rgba(0,0,0,0.8)]"
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
                        background: `radial-gradient(circle at 50% 60%, ${activeDoor.glowColor} 0%, rgba(0,0,0,0.95) 75%)`,
                      }}
                    />
                  </div>

                  {/* Door Leaf (Ajar 3D Angle) */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-t-full transition-transform duration-500 [transform-style:preserve-3d] [backface-visibility:hidden] origin-left border-r border-black/50"
                    style={{
                      transform: prefersReduced
                        ? "none"
                        : openedDoorId === activeDoor.id
                        ? "rotateY(-84deg) translateZ(16px)"
                        : "rotateY(-24deg) translateZ(6px)",
                      backgroundColor: isDark ? activeDoor.doorBgDark : activeDoor.doorBgLight,
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-t-full opacity-90"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(90deg, transparent, transparent 7px, rgba(255,255,255,0.045) 7px, rgba(255,255,255,0.045) 8.5px, rgba(0,0,0,0.35) 8.5px, rgba(0,0,0,0.35) 10px)",
                      }}
                    />

                    {/* Brass Nameplate */}
                    <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-[82%] max-w-[155px] py-2 px-2 rounded-[2px] bg-gradient-to-br from-[#dfbc60] via-[#faeb9c] via-[#cf9e33] to-[#99711c] shadow-[0_4px_10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.95)] border border-[#865e15] flex flex-col items-center justify-center text-center">
                      <span className="font-sans text-[10px] font-extrabold tracking-[0.14em] text-[#241703] uppercase leading-none [text-shadow:0_1px_0_rgba(255,255,255,0.6)] truncate max-w-full">
                        {activeDoor.plaqueTitle}
                      </span>
                    </div>

                    {/* "Click to enter" pill */}
                    <div className="absolute top-[40%] left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                      <div className="px-3 py-1.5 rounded-full bg-black/95 text-white shadow-md border border-white/10 flex items-center gap-1.5 whitespace-nowrap">
                        <span className="font-sans text-[10px] font-bold tracking-wide">
                          Click to enter
                        </span>
                      </div>
                    </div>

                    {/* Brass Lever Handle */}
                    <div className="absolute top-[56%] right-3 flex flex-col items-end pointer-events-none">
                      <div className="flex items-center">
                        <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#fff2b0] via-[#cfa33e] to-[#7b5413] shadow-md border border-[#865e15]" />
                        <div className="w-8 h-2 rounded-r-md -ml-1 bg-gradient-to-b from-[#fff6c2] via-[#d6a943] to-[#7e5513] shadow-[0_4px_8px_rgba(0,0,0,0.5)]" />
                      </div>
                      <div className="w-2.5 h-4.5 mt-1 mr-1 rounded-xs bg-gradient-to-b from-[#e3c473] to-[#7e5716] shadow-xs border border-[#6b470c] flex items-center justify-center">
                        <div className="w-0.5 h-1.5 bg-[#1a1204] rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile On-Wall Description */}
            <div className="mt-8 text-center max-w-md mx-auto px-4">
              <h3 className="text-2xl font-bold tracking-tight text-[var(--ink)] mb-1">
                {activeDoor.title}
              </h3>
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--mute)] mb-4">
                {activeDoor.subtitle}
              </p>
              <div className="space-y-2.5 text-left bg-[var(--paper)]/60 dark:bg-[var(--card)]/60 p-4 rounded-xl border border-[var(--line)]">
                {activeDoor.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div
                      className="w-4 h-4 rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center text-[10px] text-white shadow-xs"
                      style={{ backgroundColor: activeDoor.accentColor }}
                    >
                      ✓
                    </div>
                    <span className="text-xs text-[var(--ink)] leading-snug">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleDoorClick(activeDoor)}
                className="btn-primary mt-5 w-full py-2.5 text-xs font-mono justify-center"
              >
                <span>Enter {activeDoor.title}</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* ARCHITECTURAL BASEBOARD MOLDING                           */}
          {/* Runs across full room width under the doors               */}
          {/* ========================================================= */}
          <div className="relative z-10 w-full">
            {/* Top Shadow Line */}
            <div className="h-[2px] bg-black/10 dark:bg-black/50" />
            {/* Baseboard Face */}
            <div className="h-6 sm:h-8 bg-[#f2efe6] dark:bg-[#1a1c23] border-t border-white/60 dark:border-white/10 shadow-[0_-3px_8px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_12px_rgba(0,0,0,0.5)]" />
            {/* Floor Surface in Perspective */}
            <div className="h-10 sm:h-14 w-full bg-gradient-to-b from-[#edd2be] to-[#e0bfa7] dark:from-[#1b1715] dark:to-[#100e0d] transition-colors duration-500" />
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
