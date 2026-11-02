import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  FileDown, 
  ExternalLink, 
  Mail, 
  Rotate3d, 
  GraduationCap, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../shared/SocialIcons';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface DigitalIDCardProps {
  onExplorePortfolio: () => void;
  onPlayClick: () => void;
  onPlayWhoosh: () => void;
}

export function DigitalIDCard({ onExplorePortfolio, onPlayClick, onPlayWhoosh }: DigitalIDCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Smooth 3D tilt angle
    setRotateX(-(y / (rect.height / 2)) * 10);
    setRotateY((x / (rect.width / 2)) * 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleFlip = () => {
    onPlayWhoosh();
    setIsFlipped(prev => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip();
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-4 sm:px-6">
      {/* Interaction Hint */}
      <div className="flex items-center gap-2 mb-6 text-xs text-[#8E8E93] animate-pulse">
        <Rotate3d className="w-4 h-4 text-[#9275FF]" />
        <span>Click, tap or press space to flip the 3D identity card</span>
      </div>

      {/* Perspective Container */}
      <div 
        className="w-full max-w-[340px] sm:max-w-[400px] h-[520px] sm:h-[550px] perspective-1000 cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          ref={cardRef}
          role="button"
          tabIndex={0}
          aria-label="Interactive 3D Digital Identity Card"
          onClick={handleFlip}
          onKeyDown={handleKeyDown}
          animate={{
            rotateY: isFlipped ? 180 + rotateY : rotateY,
            rotateX: isFlipped ? -rotateX : rotateX,
          }}
          transition={{
            rotateY: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
            rotateX: { duration: 0.15, ease: 'easeOut' }
          }}
          className="relative w-full h-full preserve-3d transition-shadow duration-300 rounded-3xl"
        >
          {/* ==================== CARD FRONT ==================== */}
          <div className="absolute inset-0 backface-hidden rounded-3xl bg-[#171821] border border-[#C7A66A]/35 shadow-2xl shadow-[#9275FF]/15 p-6 sm:p-7 flex flex-col justify-between overflow-hidden">
            {/* Holographic Iridescent Shimmer */}
            <div className="absolute inset-0 hologram-shimmer opacity-40 pointer-events-none" />

            {/* Glowing Accent Ring */}
            <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#9275FF]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-[#C7A66A]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Card Header */}
            <div className="relative z-10 flex items-center justify-between pb-4 border-b border-[#2A2C38]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#9275FF]/20 border border-[#9275FF]/40 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#C7A66A]" />
                </div>
                <div>
                  <div className="font-heading font-bold text-xs tracking-widest text-[#F5F1E9] uppercase">
                    DIGITAL ID PASS
                  </div>
                  <div className="text-[10px] font-mono text-[#8E8E93]">VERIFIED IDENTITY • 2026</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] text-[10px] font-mono font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                ACTIVE
              </div>
            </div>

            {/* Center Profile Photo & Identity */}
            <div className="relative z-10 flex flex-col items-center text-center my-auto">
              {/* Real Profile Image Container */}
              <div className="relative mb-5 group">
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-[#C7A66A] shadow-xl shadow-black/40 relative">
                  <img
                    src={PERSONAL_INFO.profileImagePath}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle glass reflection highlight */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                </div>
                {/* Official Shield Badge */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#101116] border border-[#C7A66A] flex items-center justify-center shadow-lg">
                  <ShieldCheck className="w-4 h-4 text-[#C7A66A]" />
                </div>
              </div>

              {/* Name */}
              <h2 className="font-heading font-black text-xl sm:text-2xl tracking-wider text-white mb-1">
                {PERSONAL_INFO.name}
              </h2>

              {/* Title & Degree */}
              <p className="text-xs sm:text-sm font-medium text-[#9275FF] mb-1">
                {PERSONAL_INFO.title}
              </p>
              <p className="text-[11px] text-[#8E8E93] max-w-xs mb-3">
                {PERSONAL_INFO.subtitle}
              </p>

              {/* Institution Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#101116]/80 border border-[#2A2C38] text-[11px] text-[#F5F1E9]">
                <GraduationCap className="w-3.5 h-3.5 text-[#C7A66A]" />
                <span>{PERSONAL_INFO.institution}</span>
              </div>
            </div>

            {/* Card Footer / Flip trigger hint */}
            <div className="relative z-10 pt-4 border-t border-[#2A2C38] flex items-center justify-between text-[11px]">
              <span className="font-mono text-[#8E8E93]">Graduation: 2028</span>
              <span className="font-mono text-[#C7A66A] font-semibold">CGPA: {PERSONAL_INFO.cgpa}</span>
              <span className="text-[#9275FF] font-medium flex items-center gap-1">
                Flip card <Rotate3d className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* ==================== CARD BACK ==================== */}
          <div 
            className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-[#171821] border border-[#9275FF]/40 shadow-2xl shadow-[#9275FF]/20 p-6 sm:p-7 flex flex-col justify-between overflow-hidden"
            onClick={(e) => {
              // Prevent flipping when clicking internal links/buttons
              const target = e.target as HTMLElement;
              if (target.closest('a') || target.closest('button')) {
                e.stopPropagation();
              }
            }}
          >
            {/* Holographic Iridescent Shimmer */}
            <div className="absolute inset-0 hologram-shimmer opacity-30 pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[#2A2C38]">
              <div>
                <h3 className="font-heading font-bold text-sm tracking-wider text-white">
                  VERIFIED CHANNELS & ACCESS
                </h3>
                <p className="text-[10px] font-mono text-[#8E8E93]">DIRECT CONNECT PROTOCOLS</p>
              </div>
              <div className="p-1.5 rounded-lg bg-[#9275FF]/20 text-[#D9CEFF]">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            {/* Technical Focus Areas */}
            <div className="relative z-10 my-3">
              <div className="text-[10px] font-mono text-[#8E8E93] uppercase tracking-wider mb-2">
                Specialized Competencies
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Artificial Intelligence', 'Microservices', 'LangChain', 'FastAPI', 'Next.js Edge', 'Computer Vision'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-[#101116] border border-[#2A2C38] text-[10px] text-[#D9CEFF]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Verified External Links */}
            <div className="relative z-10 flex flex-col gap-2 my-auto">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onPlayClick}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#101116]/80 hover:bg-[#101116] border border-[#2A2C38] hover:border-[#9275FF]/60 transition-all text-xs text-[#F5F1E9] group"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-4 h-4 text-[#9275FF]" />
                  <span>GitHub Profile</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#8E8E93] group-hover:text-white transition-colors" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onPlayClick}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#101116]/80 hover:bg-[#101116] border border-[#2A2C38] hover:border-[#3B82F6]/60 transition-all text-xs text-[#F5F1E9] group"
              >
                <div className="flex items-center gap-2.5">
                  <LinkedinIcon className="w-4 h-4 text-[#3B82F6]" />
                  <span>LinkedIn Network</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#8E8E93] group-hover:text-white transition-colors" />
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                onClick={onPlayClick}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#101116]/80 hover:bg-[#101116] border border-[#2A2C38] hover:border-[#10B981]/60 transition-all text-xs text-[#F5F1E9] group"
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#10B981]" />
                  <span className="truncate max-w-[200px]">{PERSONAL_INFO.email}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#8E8E93] group-hover:text-white transition-colors" />
              </a>
            </div>

            {/* Action Buttons: Resume & Portfolio */}
            <div className="relative z-10 pt-3 border-t border-[#2A2C38] flex flex-col gap-2">
              <a
                href={PERSONAL_INFO.resumePdfPath}
                download={PERSONAL_INFO.resumeDownloadName}
                onClick={onPlayClick}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#9275FF] to-[#7B5BFA] text-white text-xs font-semibold shadow-md shadow-[#9275FF]/30 hover:scale-[1.02] transition-transform"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Official Resume (PDF)</span>
              </a>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayClick();
                  onExplorePortfolio();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-[#101116] hover:bg-white/5 border border-[#2A2C38] text-xs text-[#C7A66A] font-medium transition-colors"
              >
                <span>Explore Dimensions (Scene 04)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
