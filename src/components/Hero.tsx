import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown, ArrowDown, Sparkles } from 'lucide-react';
import { VeeCharacter } from './VeeCharacter';
import profileData from '../data/profile.json';

interface HeroProps {
  onPlayClick: () => void;
  onExploreWork: () => void;
}

export function Hero({ onPlayClick, onExploreWork }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = profileData.rotatingRoles;

  // Rotating sticker flip-card every 2.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Giant Faded Watermark "VEE" (350px+, 6% opacity) */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none font-display font-black text-[30vw] tracking-tighter text-[#1B1F3B]/[0.05] dark:text-white/[0.04] leading-none z-0"
      >
        VEE
      </div>

      {/* Main Grid: Left Typography & Narrative, Right Character */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-auto">
        {/* Left Column: Heading, Rotating Label, Bio */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Greeting */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-[#1A1816]/70 border border-[#1B1F3B]/10 dark:border-white/10 text-xs font-mono text-[#5A5D73] dark:text-[#9B9AA8] mb-6 backdrop-blur-sm">
            <span>Hi, I&apos;m Vaishnavi 👋</span>
          </div>

          {/* Huge Two-Line Heading */}
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[0.95] text-[#1B1F3B] dark:text-[#F4EFE6] mb-5">
            Founding Software <br />
            Engineer<span className="text-[#E4645A]">.</span>
          </h1>

          {/* Reel A Rotating Sticker Pill */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono text-[#5A5D73] dark:text-[#9B9AA8] uppercase tracking-wider">
              Discipline:
            </span>
            <div className="relative h-10 px-4 py-1.5 rounded-full bg-white dark:bg-[#1A1816] border border-[#1B1F3B]/15 dark:border-white/15 shadow-md -rotate-2 flex items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roles[roleIndex]}
                  initial={{ y: 20, opacity: 0, rotateX: 60 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: -20, opacity: 0, rotateX: -60 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="font-mono text-xs sm:text-sm font-bold text-[#E4645A] tracking-wide"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Short Narrative */}
          <p className="text-base sm:text-lg text-[#5A5D73] dark:text-[#9B9AA8] max-w-xl leading-relaxed mb-8">
            {profileData.shortIntro}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                onPlayClick();
                onExploreWork();
              }}
              className="px-7 py-3.5 rounded-full bg-[#1B1F3B] dark:bg-[#F4EFE6] text-[#F5F1E3] dark:text-[#0E0C0A] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider hover:opacity-90 shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <span>View my work</span>
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            </button>

            <a
              href={profileData.resumePath}
              download="Veera_Vaishnavi_K_Resume.pdf"
              onClick={onPlayClick}
              className="px-6 py-3.5 rounded-full border border-[#1B1F3B]/25 dark:border-white/20 text-[#1B1F3B] dark:text-[#F4EFE6] font-mono text-xs sm:text-sm font-medium tracking-wider hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center gap-2"
            >
              <FileDown className="w-4 h-4 text-[#E4645A]" />
              <span>Download résumé</span>
            </a>
          </div>
        </div>

        {/* Right Column: Full-Body Animated Character VEE */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative mt-8 lg:mt-0">
          <div className="relative">
            {/* Subtle warm pedestal blur */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-8 rounded-full bg-black/10 dark:bg-white/5 blur-md pointer-events-none" />

            <VeeCharacter
              state="idle"
              speechText="Hey! Welcome to my studio. Pick a door to explore."
              onClick={onPlayClick}
            />
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-10 pt-8 flex items-center justify-between border-t border-[#1B1F3B]/10 dark:border-white/10 text-xs font-mono text-[#5A5D73] dark:text-[#9B9AA8]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#7FA283] animate-pulse" />
          <span>Saveetha School of Engineering &bull; CGPA 9.22/10</span>
        </div>

        <a
          href="#id-card"
          onClick={(e) => {
            e.preventDefault();
            const el = document.querySelector('#id-card');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="hover:text-[#E4645A] transition-colors flex items-center gap-1"
        >
          <span>Scroll to open the doors</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}

