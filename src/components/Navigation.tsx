"use client";

import React, { useState, useEffect, useRef } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu drawer toggle
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  // Track scroll position for header transformation and top progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        setScrollProgress(Math.min(scrollY / maxScroll, 1));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via IntersectionObserver with rootMargin: -45% 0px -50% 0px
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -50% 0px",
      }
    );

    NAV.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Update sliding indicator position under active link
  useEffect(() => {
    if (!navContainerRef.current) return;
    const activeBtn = navContainerRef.current.querySelector<HTMLButtonElement>(
      `[data-nav-id="${activeSection}"]`
    );
    if (activeBtn) {
      setIndicatorStyle({
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
      });
    }
  }, [activeSection, scrolled]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (id: string) => {
    scrollToTarget(`#${id}`, -40);
    setMenuOpen(false);
  };

  return (
    <>
      {/* 2px ink scroll-progress bar along the very top */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--ink)] z-50 pointer-events-none origin-left transition-transform duration-75"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {/* Main navigation header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-[clamp(18px,4vw,64px)] flex items-center justify-between">
          {/* Left: Initials mark + Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToTarget(document.body, 0)}
              aria-label="Back to top"
              className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-semibold tracking-wider transition-all duration-500 transform hover:rotate-[360deg] ${
                scrolled
                  ? "bg-[var(--ink)] text-[var(--paper)] shadow-sm"
                  : "border border-[var(--line)] text-[var(--ink)] bg-transparent"
              }`}
            >
              {PROFILE.initials}
            </button>
            <span
              className={`font-semibold tracking-tight text-sm text-[var(--ink)] hidden sm:inline-block transition-all duration-300 ${
                scrolled ? "opacity-0 -translate-x-2 pointer-events-none" : "opacity-100 translate-x-0"
              }`}
            >
              {PROFILE.name}
            </span>
          </div>

          {/* Desktop Nav: Centered Pill */}
          <nav
            ref={navContainerRef}
            className={`hidden md:flex items-center md:absolute md:left-1/2 md:-translate-x-1/2 relative p-1 rounded-full transition-all duration-400 ${
              scrolled
                ? "bg-[var(--card)]/80 backdrop-blur-md border border-[var(--line)] shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
                : "bg-transparent border border-transparent"
            }`}
          >
            {/* Sliding ink indicator */}
            <div
              className="absolute h-[calc(100%-8px)] top-1 rounded-full bg-[var(--ink)] transition-all duration-300 pointer-events-none"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.width > 0 ? 1 : 0,
              }}
            />

            {NAV.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  data-nav-id={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative z-10 px-4 py-2 text-xs font-medium tracking-wide transition-colors duration-200 rounded-full ${
                    isActive ? "text-[var(--paper)]" : "text-[var(--mute)] hover:text-[var(--ink)]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Pill Button (spaced to leave room for the pull cord on mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden mr-12 sm:mr-14 px-4 py-2 rounded-full border border-[var(--line)] bg-[var(--card)]/80 backdrop-blur-md text-xs font-medium tracking-wide text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-all duration-200"
            aria-label="Toggle Navigation Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Paper Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-[var(--paper)] text-[var(--ink)] flex flex-col justify-between p-8 md:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen
            ? "pointer-events-auto [clip-path:circle(150%_at_calc(100%-32px)_32px)]"
            : "pointer-events-none [clip-path:circle(0%_at_calc(100%-32px)_32px)]"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--mute)]">Navigation</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-10 h-10 rounded-full border border-[var(--line)] flex items-center justify-center font-mono text-xs text-[var(--ink)]"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-6 my-auto">
          {NAV.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="group flex items-baseline gap-4 text-left"
              style={{
                transitionDelay: `${idx * 60}ms`,
                transform: menuOpen ? "translateY(0)" : "translateY(24px)",
                opacity: menuOpen ? 1 : 0,
                transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <span className="font-mono text-xs text-[var(--mute)] group-hover:text-[var(--ink)] transition-colors">
                0{idx + 1}
              </span>
              <span className="text-3xl font-bold tracking-tight text-[var(--ink)] group-hover:translate-x-2 transition-transform">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="border-t border-[var(--line)] pt-6 flex flex-col gap-2">
          <p className="font-mono text-[11px] text-[var(--mute)] uppercase">{PROFILE.role}</p>
          <a href={`mailto:${PROFILE.email}`} className="text-xs font-mono text-[var(--ink)] underline">
            {PROFILE.email}
          </a>
        </div>
      </div>
    </>
  );
}
