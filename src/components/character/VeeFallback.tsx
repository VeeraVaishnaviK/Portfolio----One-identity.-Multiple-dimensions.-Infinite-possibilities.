import { motion } from 'framer-motion';

export function VeeFallback({ isSpeaking }: { isSpeaking: boolean }) {
  return (
    <div className="w-full h-full min-h-[360px] sm:min-h-[460px] relative flex items-center justify-center p-6">
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-3xl bg-gradient-to-b from-[#1f212d] to-[#171821] border border-[#9275FF]/30 p-6 flex flex-col items-center justify-center shadow-2xl shadow-[#9275FF]/10"
      >
        {/* Glow halo */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-[#9275FF]/10 via-transparent to-[#C7A66A]/10 pointer-events-none" />

        {/* Vector Stylized Avatar Illustration */}
        <svg viewBox="0 0 200 240" className="w-48 h-56 relative z-10" fill="none">
          {/* Hair Back */}
          <path d="M40 70C40 20 160 20 160 70C160 130 180 180 170 210C160 215 140 220 130 190C120 150 80 150 70 190C60 220 40 215 30 210C20 180 40 130 40 70Z" fill="#140f0d" />

          {/* Shoulders / Rose Collared Shirt */}
          <path d="M45 200C50 170 85 160 100 160C115 160 150 170 155 200L165 240H35L45 200Z" fill="#b64b56" />
          {/* Collar */}
          <path d="M85 160L100 180L115 160L100 168Z" fill="#8f353f" />
          {/* Gold Pendant */}
          <circle cx="100" cy="186" r="4" fill="#C7A66A" stroke="#DFCA9B" strokeWidth="1" />

          {/* Neck */}
          <path d="M85 130H115V165H85V130Z" fill="#c99175" />

          {/* Face */}
          <path d="M60 85C60 50 140 50 140 85C140 120 130 145 100 145C70 145 60 120 60 85Z" fill="#c99175" />

          {/* Hair Front Framing */}
          <path d="M55 70C55 40 145 40 145 70C145 90 135 110 130 125C135 90 120 65 100 65C80 65 65 90 70 125C65 110 55 90 55 70Z" fill="#140f0d" />

          {/* Eyebrows */}
          <path d="M72 82C78 80 84 81 88 83" stroke="#140f0d" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M112 83C116 81 122 80 128 82" stroke="#140f0d" strokeWidth="2.5" strokeLinecap="round" />

          {/* Eyes */}
          <ellipse cx="80" cy="92" rx="6" ry="4" fill="#ffffff" />
          <circle cx="80" cy="92" r="3" fill="#1a110d" />
          <circle cx="81" cy="91" r="1" fill="#ffffff" />

          <ellipse cx="120" cy="92" rx="6" ry="4" fill="#ffffff" />
          <circle cx="120" cy="92" r="3" fill="#1a110d" />
          <circle cx="121" cy="91" r="1" fill="#ffffff" />

          {/* Glasses Frame (Gold, matching photo) */}
          <rect x="68" y="84" width="24" height="18" rx="6" stroke="#d4af37" strokeWidth="2" fill="rgba(255,255,255,0.15)" />
          <rect x="108" y="84" width="24" height="18" rx="6" stroke="#d4af37" strokeWidth="2" fill="rgba(255,255,255,0.15)" />
          <path d="M92 92H108" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" />

          {/* Nose */}
          <path d="M98 98C100 105 102 105 104 105" stroke="#a5725a" strokeWidth="1.5" strokeLinecap="round" />

          {/* Mouth / Smile (Animates if speaking) */}
          {isSpeaking ? (
            <motion.ellipse
              cx="100"
              cy="122"
              rx="6"
              ry="5"
              fill="#aa4d52"
              animate={{ ry: [2, 5, 2] }}
              transition={{ repeat: Infinity, duration: 0.25 }}
            />
          ) : (
            <path d="M92 120C96 125 104 125 108 120" stroke="#aa4d52" strokeWidth="2.5" strokeLinecap="round" />
          )}
        </svg>

        <div className="mt-3 flex items-center gap-2 px-3 py-1 rounded-full bg-[#101116]/80 border border-[#2A2C38]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9275FF]" />
          <span className="text-[11px] font-mono text-[#8E8E93]">Stylized Avatar Guide</span>
        </div>
      </motion.div>
    </div>
  );
}
