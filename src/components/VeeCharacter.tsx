import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export type VeeState = 'idle' | 'wave' | 'talk' | 'point' | 'celebrate' | 'thinking' | 'walk';

interface VeeCharacterProps {
  state?: VeeState;
  speechText?: string;
  onClick?: () => void;
  scale?: number;
  interactive?: boolean;
}

export function VeeCharacter({
  state = 'idle',
  speechText,
  onClick,
  scale = 1,
  interactive = true,
}: VeeCharacterProps) {
  const [internalState, setInternalState] = useState<VeeState>(state);
  const [cursorAngle, setCursorAngle] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInternalState(state);
  }, [state]);

  // Periodic natural blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  // Eye & Head cursor tracking (within ±10 degrees)
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 3;

      const deltaX = (e.clientX - centerX) / window.innerWidth;
      const deltaY = (e.clientY - centerY) / window.innerHeight;

      setCursorAngle({
        x: Math.max(-10, Math.min(10, deltaX * 20)),
        y: Math.max(-8, Math.min(8, deltaY * 16)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  const handleClick = () => {
    setInternalState('wave');
    if (onClick) onClick();
    setTimeout(() => {
      setInternalState('idle');
    }, 2000);
  };

  const isWaving = internalState === 'wave';
  const isTalking = internalState === 'talk';
  const isCelebrating = internalState === 'celebrate';
  const isPointing = internalState === 'point';

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center select-none cursor-pointer group"
      onClick={handleClick}
      style={{ transform: `scale(${scale})` }}
    >
      {/* Dynamic Speech Bubble */}
      {speechText && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute -top-16 z-30 px-4 py-2 rounded-2xl bg-white dark:bg-[#1A1816] border border-[#1B1F3B]/10 dark:border-white/10 shadow-lg text-xs font-mono text-[#1B1F3B] dark:text-[#F4EFE6] whitespace-nowrap flex items-center gap-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E4645A] animate-ping" />
          <span>{speechText}</span>
          {/* Arrow */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-[#1A1816] rotate-45 border-r border-b border-[#1B1F3B]/10 dark:border-white/10" />
        </motion.div>
      )}

      {/* Full-Body Vector Character SVG */}
      <motion.svg
        viewBox="0 0 240 440"
        className="w-52 h-96 sm:w-60 sm:h-[420px] drop-shadow-xl"
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: 'easeInOut',
        }}
      >
        <defs>
          <linearGradient id="hairGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1C1412" />
            <stop offset="100%" stopColor="#0F0A09" />
          </linearGradient>
          <linearGradient id="shirtGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E4645A" />
            <stop offset="100%" stopColor="#C94F45" />
          </linearGradient>
          <linearGradient id="trousersGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1B1F3B" />
            <stop offset="100%" stopColor="#111428" />
          </linearGradient>
        </defs>

        {/* ================= BACK HAIR ================= */}
        <motion.path
          d="M75 110C75 40 165 40 165 110C165 180 185 240 180 270C165 280 150 280 140 240C130 200 110 200 100 240C90 280 75 280 60 270C55 240 75 180 75 110Z"
          fill="url(#hairGradient)"
          animate={{
            d: [
              "M75 110C75 40 165 40 165 110C165 180 185 240 180 270C165 280 150 280 140 240C130 200 110 200 100 240C90 280 75 280 60 270C55 240 75 180 75 110Z",
              "M75 110C75 40 165 40 165 110C165 180 187 242 182 272C167 282 152 280 142 242C132 202 110 200 100 240C88 278 73 282 58 268C53 238 75 180 75 110Z",
              "M75 110C75 40 165 40 165 110C165 180 185 240 180 270C165 280 150 280 140 240C130 200 110 200 100 240C90 280 75 280 60 270C55 240 75 180 75 110Z"
            ]
          }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        />

        {/* ================= LEGS & TROUSERS ================= */}
        <g id="legs">
          {/* Left Leg */}
          <rect x="94" y="270" width="22" height="135" rx="8" fill="url(#trousersGradient)" />
          {/* Right Leg */}
          <rect x="124" y="270" width="22" height="135" rx="8" fill="url(#trousersGradient)" />

          {/* Shoes */}
          <path d="M88 400C88 395 116 395 118 400L122 410H84L88 400Z" fill="#1B1F3B" stroke="#0E0C0A" strokeWidth="2" />
          <path d="M124 400C124 395 152 395 154 400L158 410H120L124 400Z" fill="#1B1F3B" stroke="#0E0C0A" strokeWidth="2" />
        </g>

        {/* ================= TORSO & CORAL SHIRT ================= */}
        <g id="torso">
          {/* Main Shirt Body */}
          <path d="M80 180C85 160 155 160 160 180L168 280H72L80 180Z" fill="url(#shirtGradient)" />
          {/* Shirt Placket (Buttons line) */}
          <line x1="120" y1="180" x2="120" y2="280" stroke="#B8443B" strokeWidth="2" strokeDasharray="1 8" />

          {/* Open Shirt Collar */}
          <path d="M102 165L120 188L138 165L120 174Z" fill="#B8443B" />
          {/* Gold Pendant Necklace */}
          <path d="M110 165C114 175 126 175 130 165" stroke="#C9A24B" strokeWidth="1.5" fill="none" />
          <circle cx="120" cy="177" r="3" fill="#C9A24B" stroke="#DFCA9B" strokeWidth="0.8" />
        </g>

        {/* ================= LEFT ARM ================= */}
        <g id="left-arm">
          <motion.path
            d="M80 180C65 200 60 230 65 260L75 260C72 235 78 205 88 185Z"
            fill="url(#shirtGradient)"
          />
          {/* Left Hand */}
          <circle cx="68" cy="265" r="9" fill="#C99175" />
        </g>

        {/* ================= RIGHT ARM (Animated wave/point) ================= */}
        <motion.g
          id="right-arm"
          style={{ originX: '160px', originY: '180px' }}
          animate={
            isWaving
              ? { rotate: [-10, -50, -10, -50, -10] }
              : isCelebrating
              ? { rotate: -120 }
              : isPointing
              ? { rotate: -45 }
              : { rotate: 0 }
          }
          transition={{ duration: isWaving ? 1.4 : 0.4 }}
        >
          {isWaving || isCelebrating ? (
            <>
              {/* Arm raised up */}
              <path d="M160 180L185 140L195 145L168 190Z" fill="url(#shirtGradient)" />
              {/* Hand waving */}
              <circle cx="192" cy="135" r="9" fill="#C99175" />
            </>
          ) : (
            <>
              {/* Natural resting arm */}
              <path d="M160 180C175 200 180 230 175 260L165 260C168 235 162 205 152 185Z" fill="url(#shirtGradient)" />
              <circle cx="172" cy="265" r="9" fill="#C99175" />
            </>
          )}
        </motion.g>

        {/* ================= HEAD & FACE (Follows Cursor) ================= */}
        <motion.g
          id="head-group"
          style={{
            originX: '120px',
            originY: '130px',
            transform: `translate(${cursorAngle.x}px, ${cursorAngle.y}px)`,
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          {/* Neck */}
          <rect x="109" y="145" width="22" height="24" rx="4" fill="#C99175" />

          {/* Face Base */}
          <path d="M88 95C88 65 152 65 152 95C152 130 142 152 120 152C98 152 88 130 88 95Z" fill="#C99175" />

          {/* Ears with Gold Studs */}
          <circle cx="86" cy="108" r="6" fill="#C99175" />
          <circle cx="86" cy="110" r="1.5" fill="#C9A24B" />
          <circle cx="154" cy="108" r="6" fill="#C99175" />
          <circle cx="154" cy="110" r="1.5" fill="#C9A24B" />

          {/* Front Hair Framing & Parting */}
          <path d="M85 85C85 55 155 55 155 85C155 95 145 110 140 120C140 90 130 75 115 75C100 75 92 90 94 125C88 110 85 95 85 85Z" fill="url(#hairGradient)" />

          {/* Eyebrows */}
          <path d="M96 93C100 91 106 91 110 93" stroke="#1C1412" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M130 93C134 91 140 91 144 93" stroke="#1C1412" strokeWidth="2.2" strokeLinecap="round" />

          {/* Eyes (With Blinking) */}
          {isBlinking ? (
            <>
              <line x1="97" y1="102" x2="109" y2="102" stroke="#1C1412" strokeWidth="2" strokeLinecap="round" />
              <line x1="131" y1="102" x2="143" y2="102" stroke="#1C1412" strokeWidth="2" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Left Eye */}
              <ellipse cx="103" cy="102" rx="6" ry="4.5" fill="#FFFFFF" />
              <circle cx="103" cy="102" r="3" fill="#1A110D" />
              <circle cx="104.5" cy="100.5" r="1" fill="#FFFFFF" />

              {/* Right Eye */}
              <ellipse cx="137" cy="102" rx="6" ry="4.5" fill="#FFFFFF" />
              <circle cx="137" cy="102" r="3" fill="#1A110D" />
              <circle cx="138.5" cy="100.5" r="1" fill="#FFFFFF" />
            </>
          )}

          {/* Thin Round Gold-Rimmed Glasses (Matching Photo) */}
          <g id="glasses">
            {/* Left Frame */}
            <circle cx="103" cy="102" r="11" stroke="#C9A24B" strokeWidth="1.8" fill="rgba(255,255,255,0.18)" />
            {/* Right Frame */}
            <circle cx="137" cy="102" r="11" stroke="#C9A24B" strokeWidth="1.8" fill="rgba(255,255,255,0.18)" />
            {/* Bridge */}
            <path d="M114 100C118 97 122 97 126 100" stroke="#C9A24B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            {/* Temples */}
            <line x1="92" y1="101" x2="86" y2="99" stroke="#C9A24B" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="148" y1="101" x2="154" y2="99" stroke="#C9A24B" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Nose */}
          <path d="M118 107C120 113 121 113 123 113" stroke="#A86E56" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* Mouth (Speech / Smile) */}
          {isTalking ? (
            <motion.ellipse
              cx="120"
              cy="126"
              rx="6"
              ry="4"
              fill="#9C3A42"
              animate={{ ry: [2, 5, 2] }}
              transition={{ repeat: Infinity, duration: 0.25 }}
            />
          ) : (
            <path d="M114 125C117 129 123 129 126 125" stroke="#9C3A42" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          )}
        </motion.g>
      </motion.svg>
    </div>
  );
}

