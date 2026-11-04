"use client";

import React, { useState } from "react";
import { PROJECTS, ProjectItem } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechLogo } from "@/components/ui/TechLogo";

function IllustrativeUI({ project }: { project: ProjectItem }) {
  if (project.uiType === "b2b-platform") {
    return (
      <div className="w-full h-full bg-[#141414] text-[#f4f2ee] p-5 rounded-2xl flex flex-col justify-between font-mono text-xs border border-[rgba(255,255,255,0.1)] overflow-hidden shadow-inner">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.12)] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3a3a3a]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#3a3a3a]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#3a3a3a]" />
            <span className="text-[11px] text-[#a9a6a0] ml-2">apexengineering.org.in/edge</span>
          </div>
          <span className="text-[10px] bg-[#222222] px-2 py-0.5 rounded text-[#a9a6a0]">
            EDGE CACHE: HIT
          </span>
        </div>

        {/* Route Graph Matrix */}
        <div className="my-4 space-y-2">
          <div className="flex justify-between text-[11px] text-[#a9a6a0]">
            <span>STATIC ROUTE MANIFEST</span>
            <span className="text-white font-bold">62 / 62 COMPILED</span>
          </div>

          <div className="grid grid-cols-6 gap-1.5 py-2">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="h-6 rounded bg-[#262626] border border-[#3a3a3a] flex items-center justify-center text-[9px] text-[#a9a6a0]"
              >
                r{i + 1}
              </div>
            ))}
          </div>

          <div className="bg-[#1f1f1f] p-2.5 rounded-lg border border-[#2d2d2d] space-y-1 text-[10px]">
            <div className="flex justify-between">
              <span className="text-[#a9a6a0]">Client Hydration Mode:</span>
              <span className="text-white">Selective Islands</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#a9a6a0]">Dynamic FAQ Filter:</span>
              <span className="text-white">20+ Records Instant</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#a9a6a0]">Sitemap Status:</span>
              <span className="text-white">XML Dynamic Generated</span>
            </div>
          </div>
        </div>

        {/* Footer label */}
        <div className="pt-2 border-t border-[rgba(255,255,255,0.08)] flex justify-between items-center text-[9px] text-[#77756f]">
          <span>VERCEL EDGE NETWORK</span>
          <span className="uppercase tracking-widest text-[#a9a6a0] font-bold">Illustrative UI</span>
        </div>
      </div>
    );
  }

  if (project.uiType === "ai-analysis") {
    return (
      <div className="w-full h-full bg-[#141414] text-[#f4f2ee] p-5 rounded-2xl flex flex-col justify-between font-mono text-xs border border-[rgba(255,255,255,0.1)] overflow-hidden shadow-inner">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.12)] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3a3a3a]" />
            <span className="text-[11px] text-[#a9a6a0]">nexacro.in/ai-analyzer</span>
          </div>
          <span className="text-[10px] bg-[#222222] px-2 py-0.5 rounded text-white">
            MOBILE + WEB SYNC
          </span>
        </div>

        {/* Analyzer Visualization */}
        <div className="my-4 space-y-3">
          <div className="border border-[#2d2d2d] rounded-xl p-3 bg-[#1c1c1c] flex items-center justify-between">
            <div>
              <div className="text-[10px] text-[#a9a6a0]">SPECIMEN CLASSIFICATION</div>
              <div className="text-sm font-bold text-white mt-0.5">Acrosome-Intact</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-[#a9a6a0]">CONFIDENCE</div>
              <div className="text-sm font-bold text-white mt-0.5">94.8%</div>
            </div>
          </div>

          <div className="space-y-1.5 text-[10px]">
            <div className="flex justify-between text-[#a9a6a0]">
              <span>Sample Feature Extraction</span>
              <span className="text-white">Active</span>
            </div>
            <div className="w-full h-1.5 bg-[#2d2d2d] rounded-full overflow-hidden">
              <div className="w-[85%] h-full bg-[#ffffff] rounded-full" />
            </div>
            <div className="flex justify-between text-[#a9a6a0] pt-1">
              <span>Android Studio Client API</span>
              <span className="text-white">Connected</span>
            </div>
          </div>
        </div>

        {/* Footer label */}
        <div className="pt-2 border-t border-[rgba(255,255,255,0.08)] flex justify-between items-center text-[9px] text-[#77756f]">
          <span>PYTHON · REACT · ANDROID</span>
          <span className="uppercase tracking-widest text-[#a9a6a0] font-bold">Illustrative UI</span>
        </div>
      </div>
    );
  }

  // Laundex
  return (
    <div className="w-full h-full bg-[#141414] text-[#f4f2ee] p-5 rounded-2xl flex flex-col justify-between font-mono text-xs border border-[rgba(255,255,255,0.1)] overflow-hidden shadow-inner">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.12)] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3a3a3a]" />
          <span className="text-[11px] text-[#a9a6a0]">laundex.in/dispatch</span>
        </div>
        <span className="text-[10px] bg-[#222222] px-2 py-0.5 rounded text-white">
          HOSTEL OPERATIONS
        </span>
      </div>

      {/* Booking Console */}
      <div className="my-4 space-y-2.5">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#1c1c1c] p-2.5 rounded-lg border border-[#2d2d2d]">
            <div className="text-[10px] text-[#a9a6a0]">ACTIVE SLOTS</div>
            <div className="text-base font-bold text-white mt-1">14:00 – 15:30</div>
          </div>
          <div className="bg-[#1c1c1c] p-2.5 rounded-lg border border-[#2d2d2d]">
            <div className="text-[10px] text-[#a9a6a0]">BATCH STATUS</div>
            <div className="text-base font-bold text-white mt-1">Washing Cycle</div>
          </div>
        </div>

        <div className="bg-[#1f1f1f] p-2.5 rounded-lg border border-[#2d2d2d] text-[10px] space-y-1">
          <div className="flex justify-between">
            <span className="text-[#a9a6a0]">Real-time Tracking:</span>
            <span className="text-white">Active</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#a9a6a0]">Mobile-first UI:</span>
            <span className="text-white">Responsive 360px+</span>
          </div>
        </div>
      </div>

      {/* Footer label */}
      <div className="pt-2 border-t border-[rgba(255,255,255,0.08)] flex justify-between items-center text-[9px] text-[#77756f]">
        <span>REACT · NODE · MONGODB</span>
        <span className="uppercase tracking-widest text-[#a9a6a0] font-bold">Illustrative UI</span>
      </div>
    </div>
  );
}

export function Work() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  return (
    <section id="work" className="py-24 md:py-32 bg-[var(--paper)] text-[var(--ink)] transition-colors duration-500 relative">
      <div className="max-w-[1320px] mx-auto px-[clamp(18px,4vw,64px)]">
        <SectionHeader
          index="03"
          tag="Work"
          title="Engineered &"
          accentWord="Shipped."
        />

        {/* Desktop Expanding Accordion Gallery (side-by-side) / Mobile Vertical Accordion */}
        <div className="hidden lg:flex gap-4 h-[min(78svh,620px)] items-stretch">
          {PROJECTS.map((project, idx) => {
            const isOpen = activeProjectIndex === idx;

            return (
              <div
                key={project.id}
                onClick={() => setActiveProjectIndex(idx)}
                onFocus={() => setActiveProjectIndex(idx)}
                tabIndex={0}
                role="region"
                aria-label={`Project: ${project.title}`}
                className={`card-surface overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between ${
                  isOpen
                    ? "flex-[8] p-8 bg-[var(--card)] cursor-default"
                    : "flex-[1] p-5 bg-[var(--card)]/60 hover:bg-[var(--card)] text-center items-center justify-between"
                }`}
              >
                {/* Closed Spine View */}
                {!isOpen && (
                  <div className="w-full h-full flex flex-col items-center justify-between py-2">
                    <span className="font-mono text-xs text-[var(--mute)]">{project.index}</span>

                    <div className="[writing-mode:vertical-rl] rotate-180 font-bold tracking-tight text-lg text-[var(--ink)] whitespace-nowrap">
                      {project.title}
                    </div>

                    <div className="w-9 h-9 rounded-full border border-[var(--line)] flex items-center justify-center text-sm font-mono text-[var(--ink)] group-hover:rotate-90 transition-transform">
                      +
                    </div>
                  </div>
                )}

                {/* Open Panel View */}
                {isOpen && (
                  <div className="w-full h-full grid grid-cols-[1.1fr_0.9fr] gap-8 items-stretch animate-[fadeIn_0.5s_cubic-bezier(0.16,1,0.3,1)]">
                    {/* Left: Info, Features & Links */}
                    <div className="flex flex-col justify-between">
                      <div>
                        {/* Number + Kicker */}
                        <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-[var(--mute)]">
                          <span>{project.index}</span>
                          <span>—</span>
                          <span>{project.kicker}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-3xl font-bold tracking-tight text-[var(--ink)] mb-4">
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-[var(--ink-2)] leading-relaxed mb-6">
                          {project.description}
                        </p>

                        {/* 2-column feature list */}
                        <div className="border-t border-[var(--line)] pt-4 mb-6">
                          <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--mute)] block mb-2">
                            Key Architectural Highlights
                          </span>
                          <ul className="space-y-2 text-xs text-[var(--ink)]">
                            {project.features.map((feat, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-2">
                                <span className="text-[var(--mute)] font-mono text-[10px] mt-0.5">●</span>
                                <span className="leading-snug">{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Tech chips & Action Links */}
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5 mb-6">
                          {project.tech.map((t, tIdx) => (
                            <span
                              key={tIdx}
                              className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-[var(--paper)] text-[var(--ink)] font-mono border border-[var(--line)]"
                            >
                              <TechLogo slug={t.toLowerCase().replace(/[^a-z0-9]/g, "")} name={t} size={12} />
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-3">
                          {project.url && (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-primary text-xs"
                            >
                              Visit Platform ↗
                            </a>
                          )}
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-secondary text-xs"
                            >
                              View on GitHub ↗
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Pure CSS/JSX Illustrative Mini UI */}
                    <div className="h-full flex items-center justify-center">
                      <IllustrativeUI project={project} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Vertical Accordion */}
        <div className="lg:hidden space-y-4">
          {PROJECTS.map((project, idx) => {
            const isOpen = activeProjectIndex === idx;

            return (
              <div
                key={project.id}
                className="card-surface overflow-hidden"
              >
                <button
                  onClick={() => setActiveProjectIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 flex items-center justify-between text-left border-b border-transparent"
                >
                  <div>
                    <span className="font-mono text-xs text-[var(--mute)] block mb-1">
                      {project.index} — {project.kicker}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-[var(--ink)]">
                      {project.title}
                    </h3>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full border border-[var(--line)] flex items-center justify-center text-xs font-mono transition-transform duration-300 text-[var(--ink)] ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </div>
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 space-y-5 border-t border-[var(--line)]">
                    <p className="text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed pt-4">
                      {project.description}
                    </p>

                    <div className="space-y-2">
                      <span className="font-mono text-[10px] uppercase text-[var(--mute)] block">
                        Features
                      </span>
                      <ul className="space-y-1.5 text-xs text-[var(--ink)]">
                        {project.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <span className="text-[var(--mute)] font-mono text-[9px]">●</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Mobile Illustrative UI */}
                    <div className="h-56">
                      <IllustrativeUI project={project} />
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tech.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--paper)] text-[var(--ink)] border border-[var(--line)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary text-xs w-full justify-center"
                      >
                        Visit Platform ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
