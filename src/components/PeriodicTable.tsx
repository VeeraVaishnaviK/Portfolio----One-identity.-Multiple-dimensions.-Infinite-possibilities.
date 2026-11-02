import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Layers } from 'lucide-react';
import skillsData from '../data/skills.json';

interface SkillItem {
  number: number;
  symbol: string;
  name: string;
  category: string;
  group: string;
  description: string;
  usedIn: string[];
  level: string;
}

export function PeriodicTable({ onPlayClick }: { onPlayClick: () => void }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedTile, setSelectedTile] = useState<SkillItem | null>(null);

  const categories = ['All', 'Languages', 'Frontend', 'Backend', 'Databases', 'Cloud', 'AI/ML'];

  const getTileTheme = (category: string) => {
    switch (category) {
      case 'Languages':
        return { border: 'border-[#1B1F3B]/30 dark:border-white/20', text: 'text-[#1B1F3B] dark:text-[#F4EFE6]', bg: 'bg-[#1B1F3B]/10 dark:bg-white/10' };
      case 'Frontend':
        return { border: 'border-[#2F4B8F]/40', text: 'text-[#2F4B8F] dark:text-[#88A4E6]', bg: 'bg-[#2F4B8F]/10' };
      case 'Backend':
        return { border: 'border-[#7FA283]/40', text: 'text-[#7FA283] dark:text-[#A8CCAC]', bg: 'bg-[#7FA283]/10' };
      case 'Databases':
        return { border: 'border-[#C9A24B]/40', text: 'text-[#C9A24B]', bg: 'bg-[#C9A24B]/10' };
      case 'AI/ML':
        return { border: 'border-[#E4645A]/40', text: 'text-[#E4645A]', bg: 'bg-[#E4645A]/10' };
      case 'Cloud':
        return { border: 'border-[#6B6A85]/40', text: 'text-[#6B6A85] dark:text-[#B0AFCC]', bg: 'bg-[#6B6A85]/10' };
      default:
        return { border: 'border-black/10 dark:border-white/10', text: 'text-current', bg: 'bg-black/5' };
    }
  };

  return (
    <section id="stack" className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-[#1A1816]/70 border border-[#1B1F3B]/10 dark:border-white/10 text-xs font-mono text-[#E4645A] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>REEL B SIGNATURE &bull; ELEMENTAL STACK</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-[#1B1F3B] dark:text-[#F4EFE6]">
            The periodic table <br className="hidden sm:inline" />
            <span className="font-serif-italic font-normal text-[#E4645A]">of my stack.</span>
          </h2>
        </div>

        <p className="text-sm text-[#5A5D73] dark:text-[#9B9AA8] font-mono max-w-sm mt-4 md:mt-0">
          Atomic elements of production architecture, machine learning algorithms, and full-stack systems.
        </p>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2">
        {categories.map((cat) => {
          const isActive = activeFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                onPlayClick();
                setActiveFilter(cat);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#1B1F3B] dark:bg-[#F4EFE6] text-[#F5F1E3] dark:text-[#0E0C0A] font-bold shadow-sm'
                  : 'bg-white/60 dark:bg-[#1A1816] text-[#5A5D73] dark:text-[#9B9AA8] border border-[#1B1F3B]/10 dark:border-white/10 hover:border-[#E4645A]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid of Element Tiles */}
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-3">
        {skillsData.map((tile) => {
          const matches = activeFilter === 'All' || tile.category === activeFilter;
          const theme = getTileTheme(tile.category);
          const isSelected = selectedTile?.symbol === tile.symbol;

          return (
            <motion.div
              key={tile.number}
              layout
              animate={{ opacity: matches ? 1 : 0.15, scale: matches ? 1 : 0.96 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onPlayClick();
                setSelectedTile(tile);
              }}
              className={`relative h-24 sm:h-28 rounded-2xl border ${theme.border} p-2.5 flex flex-col justify-between cursor-pointer select-none transition-shadow ${
                isSelected ? 'ring-2 ring-[#E4645A] shadow-lg' : 'hover:shadow-md'
              } ${matches ? 'bg-white/80 dark:bg-[#171821]/80' : 'bg-transparent'}`}
            >
              {/* Atomic Number */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#5A5D73] dark:text-[#9B9AA8]">
                  {tile.number}
                </span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.text.includes('#') ? theme.text : '#C9A24B' }} />
              </div>

              {/* Big 2-Letter Symbol */}
              <div className={`font-display font-black text-2xl sm:text-3xl text-center leading-none ${theme.text}`}>
                {tile.symbol}
              </div>

              {/* Element Name */}
              <div className="text-[10px] font-mono text-center text-[#5A5D73] dark:text-[#9B9AA8] truncate">
                {tile.name}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ================= DETAIL SLIDE-IN PANEL (REEL B STYLE) ================= */}
      <AnimatePresence>
        {selectedTile && (
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-24 right-4 sm:right-8 z-40 w-full max-w-sm rounded-3xl bg-white dark:bg-[#1A1816] border-2 border-[#1B1F3B]/15 dark:border-white/15 p-6 shadow-2xl backdrop-blur-xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedTile(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#5A5D73] dark:text-[#9B9AA8]"
              aria-label="Close detail panel"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Big Atomic Symbol Badge */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-[#E4645A]/15 border border-[#E4645A]/40 flex flex-col items-center justify-center">
                <span className="text-[9px] font-mono text-[#E4645A] font-bold">#{selectedTile.number}</span>
                <span className="font-display font-black text-2xl text-[#E4645A] leading-none">
                  {selectedTile.symbol}
                </span>
              </div>

              <div>
                <h3 className="font-display font-black text-2xl text-[#1B1F3B] dark:text-white">
                  {selectedTile.name}
                </h3>
                <span className="text-xs font-mono text-[#5A5D73] dark:text-[#9B9AA8]">
                  Category: {selectedTile.category}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-[#5A5D73] dark:text-[#9B9AA8] leading-relaxed mb-4">
              {selectedTile.description}
            </p>

            {/* Proficiency Tag */}
            <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 mb-4">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#5A5D73] dark:text-[#9B9AA8] mb-1">
                Capability Level
              </div>
              <div className="text-xs font-mono font-bold text-[#E4645A]">
                {selectedTile.level}
              </div>
            </div>

            {/* "Used in:" Project Links (Reel B signature) */}
            <div className="pt-3 border-t border-black/10 dark:border-white/10">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#5A5D73] dark:text-[#9B9AA8] mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Used in Real-World Projects:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedTile.usedIn.map((proj) => (
                  <span
                    key={proj}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#101116] border border-black/10 dark:border-white/10 text-xs font-mono text-[#1B1F3B] dark:text-white"
                  >
                    {proj}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
