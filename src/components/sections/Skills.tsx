"use client";

import React, { useState } from "react";
import { SKILL_ITEMS, SKILL_FAMILIES, SkillItem } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechLogo, isBrand } from "@/components/ui/TechLogo";

export function Skills() {
  const [selectedFamily, setSelectedFamily] = useState<string>("All");
  const [activeSkill, setActiveSkill] = useState<SkillItem>(SKILL_ITEMS[0]);

  return (
    <section id="skills" className="py-24 md:py-32 bg-[var(--paper)] text-[var(--ink)] transition-colors duration-500 relative">
      <div className="max-w-[1320px] mx-auto px-[clamp(18px,4vw,64px)]">
        <SectionHeader
          index="02"
          tag="Skills"
          title="Periodic Table of My"
          accentWord="Stack."
        />

        {/* Filter chips */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {SKILL_FAMILIES.map((family) => {
            const isSelected = selectedFamily === family;
            return (
              <button
                key={family}
                onClick={() => setSelectedFamily(family)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                  isSelected
                    ? "bg-[var(--ink)] text-[var(--paper)] shadow-sm"
                    : "bg-[var(--card)] text-[var(--mute)] hover:text-[var(--ink)] border border-[var(--line)]"
                }`}
              >
                {family}
              </button>
            );
          })}
        </div>

        {/* Two-column layout: Periodic Table Grid (8 cols desktop / 4 cols mobile) + Inspector Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Periodic Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2.5 sm:gap-3">
            {SKILL_ITEMS.map((skill, idx) => {
              const isSelected = activeSkill.id === skill.id;
              const matchesFamily =
                selectedFamily === "All" || skill.family === selectedFamily;

              // Row and col for diagonal wave delay
              const cols = 8;
              const row = Math.floor(idx / cols);
              const col = idx % cols;
              const delayMs = (row + col) * 40;

              return (
                <button
                  key={skill.id}
                  onMouseEnter={() => setActiveSkill(skill)}
                  onFocus={() => setActiveSkill(skill)}
                  onClick={() => setActiveSkill(skill)}
                  aria-label={`${skill.name} (${skill.symbol}) - ${skill.family}`}
                  style={{
                    animationDelay: `${delayMs}ms`,
                  }}
                  className={`rv group relative aspect-square p-2 sm:p-2.5 rounded-xl text-left flex flex-col justify-between transition-all duration-300 ${
                    matchesFamily ? "opacity-100 scale-100" : "opacity-25 scale-95 pointer-events-none"
                  } ${
                    isSelected
                      ? "bg-[var(--card)] shadow-[0_8px_24px_rgba(0,0,0,0.15)] ring-2 ring-[var(--ink)]"
                      : "bg-[var(--card)]/90 hover:bg-[var(--card)] border border-[var(--line)] hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  {/* Top: Atomic Number */}
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-[9px] sm:text-[10px] text-[var(--mute)]">
                      {skill.atomicNumber.toString().padStart(2, "0")}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--line)] group-hover:bg-[var(--ink)] transition-colors" />
                  </div>

                  {/* Center: 2-Letter Symbol */}
                  <div className="font-bold text-lg sm:text-xl lg:text-2xl text-[var(--ink)] tracking-tighter text-center my-auto">
                    {skill.symbol}
                  </div>

                  {/* Bottom: Name (truncated if long) */}
                  <div className="font-mono text-[9px] sm:text-[10px] text-[var(--ink-2)] truncate text-center w-full">
                    {skill.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sticky Inspector Panel (320px desktop, below grid on mobile) */}
          <div className="card-surface p-6 sticky top-24 w-full">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-4 mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--mute)]">
                Element Inspector
              </span>
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[var(--paper)] text-[var(--ink)]">
                No. {activeSkill.atomicNumber.toString().padStart(2, "0")}
              </span>
            </div>

            {/* 150px Logo with soft glow and pop animation */}
            <div className="flex flex-col items-center justify-center py-6 bg-[var(--paper)] rounded-2xl border border-[var(--line)] relative overflow-hidden mb-6">
              <div
                key={activeSkill.id}
                className="animate-[scaleIn_0.35s_cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center"
              >
                <TechLogo
                  slug={activeSkill.brandSlug || activeSkill.id}
                  name={activeSkill.name}
                  size={120}
                  showGlow={isBrand(activeSkill.brandSlug || activeSkill.id)}
                />
              </div>
            </div>

            {/* Element Info */}
            <div className="space-y-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold tracking-tight text-[var(--ink)]">
                    {activeSkill.name}
                  </h3>
                  <span className="font-mono text-sm text-[var(--mute)]">
                    [{activeSkill.symbol}]
                  </span>
                </div>
                <span className="inline-block mt-1 font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-[var(--paper)] text-[var(--ink-2)] border border-[var(--line)]">
                  {activeSkill.family}
                </span>
              </div>

              {/* Projects/Implementations from Résumé */}
              <div className="border-t border-[var(--line)] pt-4">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--mute)] block mb-2">
                  Implemented In
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeSkill.projects.map((proj, pIdx) => (
                    <span
                      key={pIdx}
                      className="text-xs px-2.5 py-1 rounded-md bg-[var(--paper)] border border-[var(--line)] text-[var(--ink)] font-medium"
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
