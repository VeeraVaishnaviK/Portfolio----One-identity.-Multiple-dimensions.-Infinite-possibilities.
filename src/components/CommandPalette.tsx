import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import profileData from '../data/profile.json';

interface CommandPaletteProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onPlayClick: () => void;
}

export function CommandPalette({
  darkMode,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
  onPlayClick,
}: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  // Listen for Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onPlayClick();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onPlayClick]);

  const actions = [
    { label: 'Jump to Hero', section: '#hero', category: 'Navigation' },
    { label: 'Jump to ID Card Pass', section: '#id-card', category: 'Navigation' },
    { label: 'Open The Four Doors', section: '#doors', category: 'Navigation' },
    { label: 'Explore Periodic Table of Stack', section: '#stack', category: 'Navigation' },
    { label: 'View Case Studies (Things I\'ve Built)', section: '#built', category: 'Navigation' },
    { label: 'Let\'s Go Back in Time (Journey Timeline)', section: '#journey', category: 'Navigation' },
    { label: 'Contact & Collaboration', section: '#contact', category: 'Navigation' },
    {
      label: darkMode ? 'Switch to Warm Cream Mode' : 'Switch to Dark Mode',
      action: onToggleTheme,
      category: 'Preferences',
    },
    {
      label: soundEnabled ? 'Mute Ambient Sound' : 'Enable Ambient Sound',
      action: onToggleSound,
      category: 'Preferences',
    },
    {
      label: 'Download Official Résumé (PDF)',
      action: () => {
        window.open(profileData.resumePath, '_blank');
      },
      category: 'Action',
    },
  ];

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item: (typeof actions)[0]) => {
    onPlayClick();
    setIsOpen(false);
    setQuery('');
    if (item.section) {
      const el = document.querySelector(item.section);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (item.action) {
      item.action();
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-md flex items-start justify-center pt-24 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-[#171821] border-2 border-[#1B1F3B]/15 dark:border-white/15 p-4 shadow-2xl overflow-hidden"
            >
              {/* Search Header */}
              <div className="flex items-center gap-3 px-3 py-2 border-b border-black/10 dark:border-white/10">
                <Search className="w-5 h-5 text-[#E4645A]" />
                <input
                  type="text"
                  placeholder="Type a command or jump to a section..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                  className="flex-1 bg-transparent text-sm text-[#1B1F3B] dark:text-white placeholder-[#9B9AA8] focus:outline-none font-mono"
                />
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[#5A5D73] dark:text-[#9B9AA8]">
                  ESC to close
                </span>
              </div>

              {/* Action List */}
              <div className="max-h-72 overflow-y-auto py-2 space-y-1">
                {filtered.length === 0 ? (
                  <div className="p-4 text-center text-xs font-mono text-[#5A5D73] dark:text-[#9B9AA8]">
                    No matching commands found.
                  </div>
                ) : (
                  filtered.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(item)}
                      className="w-full px-4 py-2.5 rounded-2xl text-left text-xs font-mono text-[#1B1F3B] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#E4645A] font-bold uppercase">
                          [{item.category}]
                        </span>
                        <span>{item.label}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
