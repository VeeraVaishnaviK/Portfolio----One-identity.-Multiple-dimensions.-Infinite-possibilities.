import React from "react";

interface SectionHeaderProps {
  index: string;
  tag: string;
  title: string;
  accentWord: string;
  className?: string;
}

export function SectionHeader({
  index,
  tag,
  title,
  accentWord,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 md:mb-16 ${className}`}>
      {/* Mono tag */}
      <div className="rv flex items-center gap-2 mb-4 font-mono text-[11px] md:text-xs tracking-wider uppercase text-[var(--mute)]">
        <span>{index}</span>
        <span className="opacity-40">—</span>
        <span>{tag}</span>
      </div>

      {/* Heading */}
      <h2 className="rv text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.045em] leading-none text-[var(--ink)]">
        {title}{" "}
        <span className="font-serif italic font-normal text-[var(--mute)]">
          {accentWord}
        </span>
      </h2>
    </div>
  );
}

