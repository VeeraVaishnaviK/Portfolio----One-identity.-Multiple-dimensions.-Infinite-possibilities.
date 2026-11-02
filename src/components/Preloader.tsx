import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Check if user already saw the preloader in this session
    if (sessionStorage.getItem('vee_preloader_seen')) {
      setVisible(false);
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      handleFinish();
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleFinish = () => {
    sessionStorage.setItem('vee_preloader_seen', 'true');
    setVisible(false);
    setTimeout(onComplete, 400);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[99999] bg-[#0E0C0A] flex flex-col items-center justify-center p-4 select-none"
        >
          {/* Skip Button */}
          <button
            onClick={handleFinish}
            className="absolute top-6 right-6 px-3.5 py-1.5 rounded-full border border-white/20 text-white/50 hover:text-white hover:border-white/40 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          >
            Skip ✕
          </button>

          <div className="flex flex-col items-center">
            {/* Round Gold-Rimmed Glasses SVG Stroke Reveal */}
            <svg
              viewBox="0 0 160 80"
              className="w-32 h-16 sm:w-40 sm:h-20 mb-6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Left Lens */}
              <motion.circle
                cx="42"
                cy="40"
                r="28"
                stroke="#C9A24B"
                strokeWidth="3.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
              />
              {/* Right Lens */}
              <motion.circle
                cx="118"
                cy="40"
                r="28"
                stroke="#C9A24B"
                strokeWidth="3.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.15 }}
              />
              {/* Bridge */}
              <motion.path
                d="M70 38C76 34 84 34 90 38"
                stroke="#C9A24B"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              />
              {/* Left & Right Temples */}
              <motion.path
                d="M14 38H6"
                stroke="#C9A24B"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              />
              <motion.path
                d="M146 38H154"
                stroke="#C9A24B"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              />
            </svg>

            {/* VEE Letters Stagger In */}
            <div className="flex items-center gap-2 overflow-hidden">
              {['V', 'E', 'E'].map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.7 + i * 0.12,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="font-display font-black text-4xl sm:text-5xl tracking-widest text-[#F4EFE6]"
                >
                  {letter}
                </motion.span>
              ))}
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 1.1 }}
                className="w-3 h-3 rounded-full bg-[#E4645A] ml-1 self-end mb-2"
              />
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="text-xs font-mono text-[#9B9AA8] mt-3 tracking-widest uppercase"
            >
              STUDIO &bull; PORTFOLIO
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

