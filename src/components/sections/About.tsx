"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { PROFILE } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function About() {
  const prefersReduced = usePrefersReducedMotion();
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const lanyardRef = useRef<HTMLDivElement>(null);

  // Pendulum swing state
  // Swing pendulum tracking
  const swingAngle = useRef(0);
  const targetAngle = useRef(0);
  const velocity = useRef(0);
  const lastPointerX = useRef(0);
  const isPointerMoving = useRef(false);

  useEffect(() => {
    if (prefersReduced) return;

    let animFrame: number;
    let startTime = performance.now();

    const handlePointerMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPointerX.current;
      lastPointerX.current = e.clientX;
      isPointerMoving.current = true;

      // Small nudge to angle based on pointer speed, clamped to -8 to 8 degrees
      targetAngle.current = Math.min(Math.max(dx * 0.35, -7), 7);
      clearTimeout((handlePointerMove as any).timer);
      (handlePointerMove as any).timer = setTimeout(() => {
        isPointerMoving.current = false;
      }, 120);
    };

    window.addEventListener("mousemove", handlePointerMove);

    const updatePhysics = (now: number) => {
      if (!isPointerMoving.current) {
        // Natural subtle idle sway
        const elapsed = (now - startTime) / 1000;
        targetAngle.current = Math.sin(elapsed * 1.5) * 1.2;
      }

      // Spring physics: acceleration = springConstant * (target - current) - damping * velocity
      const spring = 0.08;
      const damping = 0.88;
      const force = (targetAngle.current - swingAngle.current) * spring;
      velocity.current = velocity.current * damping + force;
      swingAngle.current += velocity.current;

      if (lanyardRef.current) {
        lanyardRef.current.style.transform = `rotate(${swingAngle.current.toFixed(2)}deg)`;
      }

      animFrame = requestAnimationFrame(updatePhysics);
    };

    animFrame = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      cancelAnimationFrame(animFrame);
    };
  }, [prefersReduced]);

  const handleCardKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <section id="about" className="py-24 md:py-32 bg-[var(--paper)] text-[var(--ink)] transition-colors duration-500 relative">
      <div className="max-w-[1320px] mx-auto px-[clamp(18px,4vw,64px)]">
        <SectionHeader
          index="01"
          tag="About"
          title="Background &"
          accentWord="Identity."
        />

        {/* Three-column grid: minmax(0,1fr) 320px minmax(0,1fr) */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] gap-8 items-stretch">
          {/* Left Column: Intro & Summary */}
          <div className="card-surface p-8 md:p-10 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--mute)] block mb-2">
                Overview
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] mb-6">
                Hi, I&apos;m {PROFILE.name.split(" ")[0]} {PROFILE.name.split(" ")[1]}.
              </h3>
              <p className="text-[var(--ink-2)] text-sm md:text-base leading-relaxed mb-4">
                {PROFILE.resumeSummary}
              </p>
              <p className="text-[var(--mute)] text-sm leading-relaxed">
                {PROFILE.resumeShortLine}
              </p>
            </div>

            {/* Resume, GitHub, LinkedIn CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-8 border-t border-[var(--line)] mt-8">
              <a
                href={PROFILE.resumePath}
                download="Veera_Vaishnavi_K_Resume.pdf"
                className="btn-primary text-xs"
              >
                Résumé ↓
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-xs"
              >
                GitHub ↗
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-xs"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* Centre Column: Hanging Lanyard ID Card */}
          <div className="flex flex-col items-center justify-start min-h-[500px]">
            {/* Lanyard Strap & Clip */}
            <div
              ref={lanyardRef}
              className="origin-top flex flex-col items-center transition-transform duration-75 will-change-transform"
            >
              {/* Strap: 30x56 px with scrolling text */}
              <div className="w-[30px] h-[56px] bg-[#111111] rounded-t-sm overflow-hidden relative shadow-md flex items-center justify-center">
                <div className="text-[7px] font-mono uppercase tracking-widest text-[#a9a6a0] [writing-mode:vertical-rl] whitespace-nowrap animate-[marquee_6s_linear_infinite]">
                  {PROFILE.name} · {PROFILE.role} ·
                </div>
              </div>

              {/* Metal clip */}
              <div className="w-8 h-4 bg-gradient-to-b from-[#e0deda] to-[#a9a6a0] rounded-sm shadow-inner -mt-1 flex items-center justify-center z-10 border border-[#77756f]/30">
                <div className="w-3 h-1 bg-[#111111] rounded-full" />
              </div>

              {/* ID Card 300x404 px */}
              <div
                ref={cardRef}
                tabIndex={0}
                role="button"
                aria-label="Interactive developer ID card. Tap, hover, or press Enter to flip."
                aria-expanded={isFlipped}
                onClick={() => setIsFlipped(!isFlipped)}
                onKeyDown={handleCardKeyDown}
                onMouseEnter={() => setIsFlipped(true)}
                onMouseLeave={() => setIsFlipped(false)}
                className="w-[300px] h-[404px] mt-2 cursor-pointer perspective-[1000px] select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] rounded-[24px]"
              >
                <div
                  className={`relative w-full h-full duration-700 transition-transform [transform-style:preserve-3d] ${
                    isFlipped ? "[transform:rotateY(180deg)]" : ""
                  }`}
                >
                  {/* FRONT FACE */}
                  <div className="absolute inset-0 w-full h-full bg-[var(--card)] text-[var(--ink)] rounded-[24px] p-5 shadow-[0_12px_36px_rgba(0,0,0,0.12),inset_0_0_0_1px_var(--line)] flex flex-col justify-between [backface-visibility:hidden] transition-colors duration-500">
                    {/* Top band */}
                    <div className="bg-[var(--ink)] text-[var(--paper)] rounded-xl px-4 py-2 flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-widest uppercase font-bold">
                        DEVELOPER ID
                      </span>
                      <span className="font-mono text-[10px] opacity-75">
                        {PROFILE.idCard.idNo}
                      </span>
                    </div>

                    {/* Portrait Frame: 128x156 */}
                    <div className="flex flex-col items-center my-auto">
                      <div className="relative w-[128px] h-[156px] rounded-xl overflow-hidden p-[2px] bg-gradient-to-b from-[var(--soft)] to-[var(--mute)] shadow-sm group">
                        <div className="relative w-full h-full rounded-[10px] overflow-hidden bg-[var(--paper)]">
                          <Image
                            src="/portrait-bust.webp"
                            alt={PROFILE.name}
                            fill
                            sizes="128px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      </div>

                      {/* Name & Role */}
                      <h4 className="mt-3 font-bold text-sm text-[var(--ink)] tracking-tight text-center">
                        {PROFILE.name}
                      </h4>
                      <p className="font-mono text-[11px] text-[var(--mute)] text-center">
                        {PROFILE.role}
                      </p>
                    </div>

                    {/* ID Metadata rows */}
                    <div className="border-t border-[var(--line)] pt-2 space-y-1 font-mono text-[10px] text-[var(--ink-2)]">
                      <div className="flex justify-between">
                        <span className="text-[var(--mute)]">Dept.</span>
                        <span className="font-medium">{PROFILE.idCard.dept}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--mute)]">Valid Till</span>
                        <span className="font-medium">{PROFILE.idCard.validTill}</span>
                      </div>
                    </div>

                    {/* Barcode and hologram */}
                    <div className="flex items-center justify-between pt-2 border-t border-[var(--line)]">
                      {/* Barcode illustration */}
                      <div className="flex items-end gap-[2px] h-6">
                        {[4, 2, 6, 3, 5, 2, 7, 3, 4, 2, 5, 2, 6, 4, 3].map((h, i) => (
                          <div
                            key={i}
                            style={{ height: `${h * 3}px` }}
                            className="w-[2px] bg-[var(--ink)]"
                          />
                        ))}
                      </div>

                      {/* Holographic sticker in gray tones */}
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--soft)] via-[var(--card)] to-[var(--mute)] border border-[var(--line)] flex items-center justify-center shadow-inner">
                        <span className="font-mono text-[7px] text-[var(--ink)] font-bold tracking-tighter">
                          PASS
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div className="absolute inset-0 w-full h-full bg-[var(--card)] text-[var(--ink)] rounded-[24px] p-6 shadow-[0_12px_36px_rgba(0,0,0,0.12),inset_0_0_0_1px_var(--line)] flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden] transition-colors duration-500">
                    <div>
                      <div className="border-b border-[var(--line)] pb-2 mb-3">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--mute)]">
                          What I Am
                        </span>
                      </div>
                      <ul className="space-y-2 text-xs text-[var(--ink)]">
                        {PROFILE.idCard.whatIAm.map((line, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[var(--mute)] font-mono text-[10px]">0{idx + 1}</span>
                            <span className="leading-snug">{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-[var(--line)] pt-4 mt-auto">
                      <div className="font-serif italic text-sm text-[var(--ink-2)] mb-2">
                        {PROFILE.name}
                      </div>
                      <p className="font-mono text-[10px] text-[var(--mute)]">
                        If found, say hello · {PROFILE.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Facts & Quote */}
          <div className="card-surface p-8 md:p-10 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--mute)] block mb-2">
                Quick Facts
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)] mb-6">
                Snapshot & Philosophy.
              </h3>

              <div className="space-y-4">
                <div className="border-b border-[var(--line)] pb-3">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--mute)] block">
                    Location
                  </span>
                  <p className="text-sm font-medium text-[var(--ink)] mt-1">
                    {PROFILE.quickFacts.location}
                  </p>
                </div>

                <div className="border-b border-[var(--line)] pb-3">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--mute)] block">
                    Education
                  </span>
                  <p className="text-sm font-medium text-[var(--ink)] mt-1">
                    {PROFILE.quickFacts.education}
                  </p>
                </div>

                <div className="border-b border-[var(--line)] pb-3">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--mute)] block">
                    Current Role
                  </span>
                  <p className="text-sm font-medium text-[var(--ink)] mt-1">
                    {PROFILE.quickFacts.currentRole}
                  </p>
                </div>

                <div className="border-b border-[var(--line)] pb-3">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--mute)] block">
                    Email
                  </span>
                  <a
                    href={`mailto:${PROFILE.quickFacts.email}`}
                    className="text-sm font-mono text-[var(--ink)] underline mt-1 block hover:text-[var(--mute)] transition-colors"
                  >
                    {PROFILE.quickFacts.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Paraphrased Quote */}
            <div className="pt-6 border-t border-[var(--line)] mt-6">
              <blockquote className="text-xs md:text-sm italic font-serif text-[var(--ink-2)] leading-relaxed">
                &ldquo;{PROFILE.quickFacts.quote}&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
