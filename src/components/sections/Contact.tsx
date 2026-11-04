"use client";

import React, { useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

function HoppingText({ text }: { text: string }) {
  return (
    <span className="inline-block">
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block transition-transform duration-200 hover:-translate-y-3 cursor-default"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(PROFILE.email)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2200);
        })
        .catch(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2200);
        });
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section id="contact" className="pt-24 pb-12 bg-[var(--paper)] text-[var(--ink)] transition-colors duration-500 relative">
      <div className="max-w-[1320px] mx-auto px-[clamp(18px,4vw,64px)]">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-widest text-[var(--mute)]">
          <span>06</span>
          <span>—</span>
          <span>Initiate</span>
        </div>

        {/* Huge Heading with letter hop */}
        <div className="mb-14">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.045em] leading-[1.05] text-[var(--ink)]">
            <div>
              <HoppingText text="Let's build" />
            </div>
            <div>
              <HoppingText text="something together." />
            </div>
          </h2>
        </div>

        {/* Contact Links & Circular Badge */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center border-t border-[var(--line)] pt-12 pb-16">
          <div className="space-y-8">
            {/* Email link with Copy Chip */}
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--mute)] block mb-2">
                Direct Email
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="text-2xl sm:text-3xl md:text-4xl font-mono text-[var(--ink)] underline hover:text-[var(--mute)] transition-colors break-all"
                >
                  {PROFILE.email}
                </a>

                {/* Copy Chip with aria-live */}
                <button
                  onClick={handleCopy}
                  aria-label="Copy email address"
                  className="px-3.5 py-1.5 rounded-full text-xs font-mono border border-[var(--line)] bg-[var(--card)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-all shadow-sm active:scale-95"
                >
                  <span aria-live="polite">
                    {copied ? "Copied ✓" : "Copy"}
                  </span>
                </button>
              </div>
            </div>

            {/* Phone, GitHub, LinkedIn */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[var(--line)]">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--mute)] block mb-1">
                  Phone
                </span>
                <a
                  href={PROFILE.phoneHref}
                  className="text-sm font-mono text-[var(--ink)] underline hover:text-[var(--mute)]"
                >
                  {PROFILE.phone}
                </a>
              </div>

              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--mute)] block mb-1">
                  GitHub
                </span>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-[var(--ink)] underline hover:text-[var(--mute)]"
                >
                  github.com/VeeraVaishnaviK ↗
                </a>
              </div>

              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--mute)] block mb-1">
                  LinkedIn
                </span>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-[var(--ink)] underline hover:text-[var(--mute)]"
                >
                  veera-vaishnavi ↗
                </a>
              </div>
            </div>
          </div>

          {/* Circular Spinning "Say Hello" Badge */}
          <div className="flex items-center justify-center">
            <div className="relative w-36 h-36 flex items-center justify-center select-none">
              {/* Rotating Circular SVG Text */}
              <svg
                viewBox="0 0 160 160"
                className="w-full h-full animate-[spin_20s_linear_infinite]"
              >
                <path
                  id="textCircle"
                  d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
                  fill="none"
                />
                <text className="font-mono text-[10px] tracking-[0.22em] uppercase fill-[var(--ink)]">
                  <textPath href="#textCircle" startOffset="0%">
                    SAY HELLO · GET IN TOUCH · COLLABORATE ·
                  </textPath>
                </text>
              </svg>

              {/* Center Dot or Arrow */}
              <div className="absolute w-10 h-10 rounded-full bg-[var(--ink)] text-[var(--paper)] flex items-center justify-center text-xs">
                ↗
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-[var(--line)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--mute)]">
          <div>
            © {new Date().getFullYear()} {PROFILE.name}. Verified from résumé.
          </div>

          <div className="flex items-center gap-6">
            <span>Built with Next.js 15 &amp; React 19</span>
            <button
              onClick={() => scrollToTarget(document.body, 0)}
              className="text-[var(--ink)] underline hover:text-[var(--mute)]"
            >
              Back to top ↑
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
