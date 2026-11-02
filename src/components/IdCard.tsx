import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FileDown, Mail, QrCode, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './shared/SocialIcons';
import profileData from '../data/profile.json';

interface IdCardProps {
  onPlayClick: () => void;
  onPlayWhoosh: () => void;
}

export function IdCard({ onPlayClick, onPlayWhoosh }: IdCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion physics for drag & cursor swing
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const springConfig = { damping: 14, stiffness: 100 };
  const smoothX = useSpring(dragX, springConfig);
  const smoothY = useSpring(dragY, springConfig);

  const rotateZ = useTransform(smoothX, [-150, 150], [-18, 18]);

  const handleFlip = () => {
    onPlayWhoosh();
    setIsFlipped((prev) => !prev);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const distanceX = e.clientX - (rect.left + rect.width / 2);
    // Gentle sway when cursor passes near
    if (Math.abs(distanceX) < 250) {
      dragX.set(distanceX * 0.12);
    }
  };

  const handleMouseLeave = () => {
    dragX.set(0);
    dragY.set(0);
  };

  return (
    <section
      id="id-card"
      className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Narrative & Action Links */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-[#1A1816]/70 border border-[#1B1F3B]/10 dark:border-white/10 text-xs font-mono text-[#E4645A] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>IDENTITY PASS &bull; VEE-2028</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-[#1B1F3B] dark:text-[#F4EFE6] mb-6 leading-tight">
            Hi, I&apos;m <span className="font-serif-italic font-normal text-[#E4645A]">Vaishnavi.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#5A5D73] dark:text-[#9B9AA8] leading-relaxed mb-8 max-w-xl">
            {profileData.bio}
          </p>

          {/* Quick Buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <a
              href={profileData.resumePath}
              download="Veera_Vaishnavi_K_Resume.pdf"
              onClick={onPlayClick}
              className="px-5 py-2.5 rounded-full bg-[#1B1F3B] dark:bg-[#F4EFE6] text-[#F5F1E3] dark:text-[#0E0C0A] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <FileDown className="w-4 h-4 text-[#C9A24B]" />
              <span>Official Résumé</span>
            </a>

            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onPlayClick}
              className="px-4 py-2.5 rounded-full border border-[#1B1F3B]/20 dark:border-white/20 text-[#1B1F3B] dark:text-[#F4EFE6] font-mono text-xs flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onPlayClick}
              className="px-4 py-2.5 rounded-full border border-[#1B1F3B]/20 dark:border-white/20 text-[#1B1F3B] dark:text-[#F4EFE6] font-mono text-xs flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4 text-[#2F4B8F]" />
              <span>LinkedIn</span>
            </a>

            <a
              href={`mailto:${profileData.email}`}
              onClick={onPlayClick}
              className="px-4 py-2.5 rounded-full border border-[#1B1F3B]/20 dark:border-white/20 text-[#1B1F3B] dark:text-[#F4EFE6] font-mono text-xs flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <Mail className="w-4 h-4 text-[#7FA283]" />
              <span>Say hello</span>
            </a>
          </div>

          <div className="pt-6 border-t border-[#1B1F3B]/10 dark:border-white/10 flex items-center gap-4 text-xs font-mono text-[#5A5D73] dark:text-[#9B9AA8]">
            <span>Saveetha School of Engineering</span>
            <span>&bull;</span>
            <span className="text-[#C9A24B] font-bold">Graduation May 2028</span>
          </div>
        </div>

        {/* Right Column: Swinging Lanyard ID Card */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[560px] pt-8"
        >
          {/* Lanyard Ribbon hanging from top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none">
            {/* Dark woven ribbon */}
            <div className="w-5 h-20 bg-gradient-to-b from-[#111428] via-[#1B1F3B] to-[#111428] border-x border-[#C9A24B]/30 shadow-md flex items-center justify-center">
              <span className="text-[7px] font-mono text-[#C9A24B] font-bold tracking-widest rotate-90 uppercase">
                SAVEETHA
              </span>
            </div>
            {/* Metallic clip */}
            <div className="w-8 h-4 rounded-sm bg-gradient-to-r from-neutral-400 via-neutral-200 to-neutral-400 border border-neutral-500 shadow-sm" />
            <div className="w-3 h-5 border-2 border-neutral-400 rounded-full -mt-1" />
          </div>

          {/* Draggable & Swinging Card Stage */}
          <motion.div
            drag
            dragConstraints={{ left: -60, right: 60, top: -20, bottom: 40 }}
            dragElastic={0.2}
            style={{ x: smoothX, y: smoothY, rotateZ }}
            className="relative cursor-grab active:cursor-grabbing perspective-1000 mt-14"
          >
            {/* Card Shell */}
            <motion.div
              onClick={handleFlip}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-72 sm:w-80 h-[460px] preserve-3d shadow-2xl rounded-3xl"
            >
              {/* ================= CARD FRONT ================= */}
              <div className="absolute inset-0 backface-hidden rounded-3xl bg-white dark:bg-[#171821] border-2 border-[#1B1F3B]/15 dark:border-white/15 p-6 flex flex-col justify-between overflow-hidden shadow-xl">
                {/* Header Strip */}
                <div className="pb-3 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
                  <span className="font-mono text-[10px] font-extrabold tracking-widest uppercase text-[#E4645A]">
                    SAVEETHA &times; LIN&apos;S INFOTECH
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#7FA283]/20 text-[#7FA283] font-mono text-[9px] font-bold">
                    ACTIVE
                  </span>
                </div>

                {/* Portrait Photo */}
                <div className="my-auto flex flex-col items-center text-center">
                  <div className="w-32 h-40 rounded-2xl overflow-hidden border-2 border-[#C9A24B] shadow-md relative mb-3">
                    <img
                      src={profileData.profilePhoto}
                      alt={profileData.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <h3 className="font-display font-black text-xl text-[#1B1F3B] dark:text-white uppercase tracking-wider">
                    {profileData.name}
                  </h3>
                  <p className="text-xs font-mono text-[#E4645A] font-semibold">
                    {profileData.roleHeadline}
                  </p>
                  <p className="text-[10px] text-[#5A5D73] dark:text-[#9B9AA8] mt-0.5">
                    {profileData.education.degree}
                  </p>
                </div>

                {/* Footer Strip with Barcode */}
                <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] font-mono text-[#5A5D73] dark:text-[#9B9AA8]">PASS ID</div>
                    <div className="text-xs font-mono font-bold text-[#1B1F3B] dark:text-white">
                      {profileData.idCardNumber}
                    </div>
                  </div>

                  {/* Faux Barcode */}
                  <div className="flex items-center gap-0.5 h-6">
                    {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2].map((w, i) => (
                      <span
                        key={i}
                        className="h-full bg-[#1B1F3B] dark:bg-white inline-block"
                        style={{ width: `${w}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* ================= CARD BACK ================= */}
              <div
                className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-[#1B1F3B] text-[#F5F1E3] border-2 border-[#C9A24B]/40 p-6 flex flex-col justify-between overflow-hidden shadow-2xl"
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.closest('a') || target.closest('button')) {
                    e.stopPropagation();
                  }
                }}
              >
                {/* Header */}
                <div className="pb-3 border-b border-white/10 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#C9A24B]">
                    OFFICIAL CREDENTIAL
                  </span>
                  <span className="text-[10px] font-mono text-[#9B9AA8]">Issued {profileData.issuedYear}</span>
                </div>

                {/* Center QR Code & Coordinates */}
                <div className="flex flex-col items-center text-center my-auto">
                  <div className="w-24 h-24 p-2 rounded-2xl bg-white text-black flex items-center justify-center mb-3 shadow-lg">
                    <QrCode className="w-20 h-20" />
                  </div>

                  <div className="text-xs font-mono font-bold text-white mb-0.5">
                    {profileData.email}
                  </div>
                  <div className="text-[11px] text-[#9B9AA8]">{profileData.location}</div>
                  <div className="text-[10px] font-mono text-[#7FA283] mt-2">
                    CGPA 9.22 / 10 &bull; Saveetha Engineering
                  </div>
                </div>

                {/* Big Résumé Download Button */}
                <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                  <a
                    href={profileData.resumePath}
                    download="Veera_Vaishnavi_K_Resume.pdf"
                    onClick={onPlayClick}
                    className="w-full py-2.5 rounded-full bg-[#E4645A] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#C94F45] shadow-lg transition-colors"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Download Résumé</span>
                  </a>

                  <p className="text-[9px] font-mono text-center text-white/50">
                    Click anywhere to flip back
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hint */}
          <div className="mt-4 flex items-center gap-1.5 text-xs font-mono text-[#5A5D73] dark:text-[#9B9AA8] animate-pulse">
            <span>👆 Drag lanyard &bull; Click card to flip</span>
          </div>
        </div>
      </div>
    </section>
  );
}
