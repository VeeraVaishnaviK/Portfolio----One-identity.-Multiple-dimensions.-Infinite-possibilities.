import { motion } from 'framer-motion';
import { ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface CinematicIntroProps {
  onEnterExperience: () => void;
  onSkipIntro: () => void;
  onPlayClick: () => void;
}

export function CinematicIntro({ onEnterExperience, onSkipIntro, onPlayClick }: CinematicIntroProps) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Cinematic Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial glow orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9275FF]/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#C7A66A]/10 rounded-full blur-[120px]" />
        
        {/* Subtle grid mesh overlay */}
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{
            backgroundImage: `linear-gradient(to right, #2A2C38 1px, transparent 1px), linear-gradient(to bottom, #2A2C38 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171821]/90 border border-[#9275FF]/30 backdrop-blur-md mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-xs font-mono tracking-widest text-[#D9CEFF] uppercase">
            Interactive Digital Portfolio • 2026 Edition
          </span>
        </motion.div>

        {/* Cinematic Title Reveal */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-[#F5F1E9] to-[#8E8E93] mb-6"
        >
          BEYOND THE CODE<span className="text-[#9275FF]">.</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
          className="font-editorial italic text-xl sm:text-2xl md:text-3xl text-[#C7A66A] max-w-2xl font-normal mb-6"
        >
          &ldquo;{PERSONAL_INFO.tagline}&rdquo;
        </motion.p>

        {/* Identity Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="text-sm sm:text-base text-[#8E8E93] max-w-xl mb-12 leading-relaxed"
        >
          The digital identity and engineering universe of <strong className="text-white font-medium">{PERSONAL_INFO.name}</strong> — Computer Science (Artificial Intelligence) student, software engineer, AI developer, and researcher.
        </motion.p>

        {/* Interactive Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {/* Enter Experience Button */}
          <button
            onClick={() => {
              onPlayClick();
              onEnterExperience();
            }}
            className="w-full sm:w-auto group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-[#9275FF] via-[#8563FA] to-[#7B5BFA] text-white font-heading font-semibold text-base shadow-xl shadow-[#9275FF]/25 hover:shadow-[#9275FF]/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <Compass className="w-5 h-5 text-[#D9CEFF] group-hover:rotate-45 transition-transform duration-300" />
            <span>Enter Experience</span>
            <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#9275FF] to-[#C7A66A] opacity-0 group-hover:opacity-40 blur-md transition-opacity -z-10" />
          </button>

          {/* Skip Intro Direct Button */}
          <button
            onClick={() => {
              onPlayClick();
              onSkipIntro();
            }}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#171821]/80 hover:bg-[#1f212d] border border-[#2A2C38] text-[#8E8E93] hover:text-[#F5F1E9] font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Skip to Portfolio</span>
          </button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 text-xs text-[#686868]"
        >
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C7A66A]" />
            <span>Saveetha School of Engineering</span>
          </div>
          <span className="text-[#2A2C38]">•</span>
          <div>CGPA 9.22 / 10</div>
          <span className="text-[#2A2C38]">•</span>
          <div>Lin&apos;s InfoTech Founding Engineer</div>
          <span className="text-[#2A2C38]">•</span>
          <div>IEEE Published (ICFTS 2025)</div>
        </motion.div>
      </div>
    </div>
  );
}

