import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar } from 'lucide-react';
import timelineData from '../data/timeline.json';

export function Journey({ onPlayClick }: { onPlayClick: () => void }) {
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);

  const activeGroup = timelineData[selectedYearIndex];

  return (
    <section id="journey" className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-[#1A1816]/70 border border-[#1B1F3B]/10 dark:border-white/10 text-xs font-mono text-[#E4645A] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>REEL A SIGNATURE &bull; REVERSE CHRONOLOGY</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-[#1B1F3B] dark:text-[#F4EFE6]">
            Let&apos;s go back <span className="font-serif-italic font-normal text-[#E4645A]">in time.</span>
          </h2>
        </div>

        <p className="text-sm text-[#5A5D73] dark:text-[#9B9AA8] font-mono max-w-sm mt-4 md:mt-0">
          Tracking milestones backward from current innovations to foundational startup architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Giant Odometer Year Display & Buttons */}
        <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-28">
          {/* Year Buttons */}
          <div className="flex items-center gap-2 mb-6">
            {timelineData.map((group, idx) => {
              const isSelected = selectedYearIndex === idx;
              return (
                <button
                  key={group.year}
                  onClick={() => {
                    onPlayClick();
                    setSelectedYearIndex(idx);
                  }}
                  className={`px-4 py-1.5 rounded-full font-mono text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1B1F3B] dark:bg-[#F4EFE6] text-[#F5F1E3] dark:text-[#0E0C0A] shadow-md'
                      : 'bg-white/60 dark:bg-[#1A1816] text-[#5A5D73] dark:text-[#9B9AA8] border border-black/10 dark:border-white/10'
                  }`}
                >
                  {group.year}
                </button>
              );
            })}
          </div>

          {/* Giant Ticking Year Odometer Display */}
          <div className="relative overflow-hidden h-36 sm:h-44">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGroup.year}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -80, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-black text-7xl sm:text-9xl text-[#1B1F3B] dark:text-white leading-none tracking-tight select-none"
              >
                {activeGroup.year}
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="font-serif-italic text-lg text-[#E4645A] mt-2 mb-4">
            {activeGroup.subtitle}
          </p>

          <div className="text-xs font-mono text-[#5A5D73] dark:text-[#9B9AA8]">
            Click a year above to rewind the milestone reels.
          </div>
        </div>

        {/* Right Column: Stacked Entry Cards */}
        <div className="lg:col-span-7 space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGroup.year}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="space-y-4"
            >
              {activeGroup.entries.map((entry, i) => (
                <div
                  key={i}
                  className="p-6 rounded-3xl bg-white dark:bg-[#171821] border border-black/10 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-[#E4645A]/15 text-[#E4645A] font-mono text-[10px] font-bold uppercase tracking-wider">
                      {entry.badge}
                    </span>
                    <span className="text-xs font-mono text-[#5A5D73] dark:text-[#9B9AA8] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#C9A24B]" />
                      <span>{entry.month}</span>
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-[#1B1F3B] dark:text-white mb-1">
                    {entry.title}
                  </h3>
                  <div className="text-xs font-mono text-[#7FA283] font-semibold mb-3">
                    {entry.organization}
                  </div>

                  <p className="text-xs sm:text-sm text-[#5A5D73] dark:text-[#9B9AA8] leading-relaxed">
                    {entry.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Walking Dotted Line with VEE Sprite (Reel A signature) */}
      <div className="mt-16 pt-8 border-t border-dashed border-[#1B1F3B]/20 dark:border-white/20 relative">
        <div className="flex items-center justify-between text-[10px] font-mono text-[#5A5D73] dark:text-[#9B9AA8]">
          <span>STARTUP INCEPTION (2024)</span>
          <span>RESEARCH &amp; HONORS (2025)</span>
          <span>CAMPUS AMBASSADOR (2026)</span>
        </div>

        {/* Animated Walker Marker */}
        <motion.div
          animate={{
            left: selectedYearIndex === 0 ? '90%' : selectedYearIndex === 1 ? '50%' : '10%',
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 120 }}
          className="absolute -top-3 w-6 h-6 rounded-full bg-[#E4645A] border-2 border-white dark:border-[#0E0C0A] flex items-center justify-center text-[10px] text-white shadow-md -translate-x-1/2"
        >
          &bull;
        </motion.div>
      </div>
    </section>
  );
}
