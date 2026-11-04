"use client";

import React from "react";
import { CERTIFICATIONS } from "@/lib/data";

export function Certifications() {
  // Enforce Rule 1: "If a section has no data, remove the section and its nav link."
  if (!CERTIFICATIONS || CERTIFICATIONS.length === 0) {
    return null;
  }

  return (
    <section
      id="certifications"
      className="relative w-full bg-white border-y border-[#0d0d0d]/10 py-24 px-[var(--gutter)]"
      aria-label="Certifications Index"
    >
      <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Sticky Heading */}
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <div className="tag-mono mb-2">04 — Verified Credentials</div>
          <h2 className="heading-hero text-3xl sm:text-4xl text-[#0d0d0d]">
            Always <span className="heading-serif-mute">learning.</span>
          </h2>
          <p className="text-sm font-mono text-[#77756f] mt-3">
            {CERTIFICATIONS.length} accredited certifications
          </p>
        </div>

        {/* Right: Numbered Ink-Flood Rows */}
        <div className="lg:col-span-8 divide-y divide-[#0d0d0d]/10 border-y border-[#0d0d0d]/10">
          {CERTIFICATIONS.map((cert, idx) => (
            <div
              key={cert.id || idx}
              tabIndex={0}
              className="group relative p-6 sm:p-8 flex items-center justify-between cursor-pointer overflow-hidden transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-[#0d0d0d]"
            >
              {/* Flood with ink animation scaleX 0 -> 1 on ::before */}
              <span
                className="absolute inset-0 bg-[#0d0d0d] origin-left -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-focus:translate-x-0 -z-0"
              />

              <div className="relative z-10 flex items-baseline gap-4 sm:gap-8">
                <span className="font-mono text-xs sm:text-sm text-[#a9a6a0] group-hover:text-white/60 transition-colors">
                  0{idx + 1}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0d0d0d] group-hover:text-white transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-[#77756f] group-hover:text-white/80 transition-colors mt-0.5">
                    {cert.issuer}
                  </p>
                </div>
              </div>

              <span className="relative z-10 text-lg text-[#0d0d0d] group-hover:text-white transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0">
                ↗
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
