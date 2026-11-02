import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Trophy 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import projectsData from '../data/projects.json';

interface DoorsProps {
  onPlayClick: () => void;
  onPlayWhoosh: () => void;
}

export function Doors({ onPlayClick, onPlayWhoosh }: DoorsProps) {
  const [activeDoor, setActiveDoor] = useState<number | null>(null);
  const [hoveredDoor, setHoveredDoor] = useState<number | null>(null);

  const doors = [
    {
      id: 1,
      title: 'Builder',
      subtitle: 'System Architecture & Microservices',
      color: '#7FA283', // Sage Green
      tag: '01 / ARCHITECTURE',
      roomTitle: 'Behind the Green Door: The Builder',
    },
    {
      id: 2,
      title: 'Products',
      subtitle: 'Shipped Web & Mobile Applications',
      color: '#2F4B8F', // Blue
      tag: '02 / PRODUCTION',
      roomTitle: 'Behind the Blue Door: The Products',
    },
    {
      id: 3,
      title: 'Researcher',
      subtitle: 'IEEE Published Bio-Medical AI',
      color: '#C8663A', // Burnt Orange
      tag: '03 / RESEARCH',
      roomTitle: 'Behind the Orange Door: The Researcher',
    },
    {
      id: 4,
      title: 'Leader',
      subtitle: 'GDG VP & Hackathon Mentorship',
      color: '#6B6A85', // Slate/Purple
      tag: '04 / COMMUNITY',
      roomTitle: 'Behind the Slate Door: The Leader',
    },
  ];

  const handleOpenDoor = (id: number) => {
    onPlayWhoosh();
    setActiveDoor(id);
  };

  const handleCloseDoor = () => {
    onPlayClick();
    setActiveDoor(null);
  };

  const triggerTrophyConfetti = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x, y },
      colors: ['#C9A24B', '#E4645A', '#7FA283', '#2F4B8F'],
    });
  };

  return (
    <section id="doors" className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-[#1A1816]/70 border border-[#1B1F3B]/10 dark:border-white/10 text-xs font-mono text-[#E4645A] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>REEL A SIGNATURE &bull; DISCIPLINE PORTALS</span>
        </div>

        <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-[#1B1F3B] dark:text-[#F4EFE6] mb-4">
          Magic happens <span className="font-serif-italic font-normal text-[#E4645A]">behind the doors.</span>
        </h2>
        <p className="text-base text-[#5A5D73] dark:text-[#9B9AA8] font-mono">
          Pick a door to step into each discipline.
        </p>
      </div>

      {/* Four Tall Arched Doors in a Row */}
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {doors.map((door) => {
            const isHovered = hoveredDoor === door.id;

            return (
              <div
                key={door.id}
                onMouseEnter={() => setHoveredDoor(door.id)}
                onMouseLeave={() => setHoveredDoor(null)}
                onClick={() => handleOpenDoor(door.id)}
                className="group relative flex flex-col items-center cursor-pointer select-none"
              >
                {/* Door Frame Arch */}
                <div
                  className="relative w-full h-[460px] sm:h-[500px] rounded-t-full border-4 border-[#1B1F3B]/30 dark:border-white/20 p-2 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 perspective-1500"
                  style={{ backgroundColor: `${door.color}15` }}
                >
                  {/* Warm light spilling from behind on hover */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#FFE9B8]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  />

                  {/* Arched Swinging Door Leaf (hinge on left) */}
                  <motion.div
                    animate={{
                      rotateY: isHovered ? -15 : 0,
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    style={{
                      transformOrigin: 'left center',
                      backgroundColor: door.color,
                    }}
                    className="relative w-full h-full rounded-t-full border-2 border-white/20 p-6 flex flex-col justify-between shadow-inner preserve-3d"
                  >
                    {/* Arch detailing & woodgrain grooves */}
                    <div className="absolute inset-x-4 top-6 bottom-6 rounded-t-full border border-white/20 pointer-events-none" />

                    {/* Brass Plaque (Discipline Name) */}
                    <div className="relative z-10 pt-16 flex flex-col items-center text-center">
                      <div className="px-3 py-1 rounded bg-[#C9A24B] text-[#1B1F3B] font-mono text-[9px] font-extrabold tracking-widest uppercase shadow-md mb-2">
                        {door.tag}
                      </div>
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-wide uppercase drop-shadow">
                        {door.title}
                      </h3>
                      <p className="text-[11px] font-mono text-white/80 max-w-[150px] mt-1">
                        {door.subtitle}
                      </p>
                    </div>

                    {/* Gold Door Knob (Right edge) */}
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-1 z-20">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#FFE39B] via-[#C9A24B] to-[#8C6920] border border-[#FFE39B] shadow-md group-hover:scale-110 transition-transform" />
                    </div>

                    {/* Bottom Vent / Panel */}
                    <div className="relative z-10 pb-4 flex justify-center">
                      <span className="font-mono text-xs text-white/60 tracking-widest">
                        OPEN &rarr;
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Soft Floor Shadow */}
                <div className="w-3/4 h-4 bg-black/20 dark:bg-black/60 rounded-full blur-md mt-2 transition-transform duration-500 group-hover:scale-110" />
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= REVEALED ROOM MODAL (WALK-IN EXPERIENCE) ================= */}
      <AnimatePresence>
        {activeDoor !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-[#F5F1E3]/95 dark:bg-[#0E0C0A]/95 backdrop-blur-2xl p-4 sm:p-8 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl rounded-3xl bg-white dark:bg-[#171821] border border-[#1B1F3B]/10 dark:border-white/10 p-6 sm:p-10 shadow-2xl my-auto"
            >
              {/* Top Navigation: "<- Back to the doors" Pill Button */}
              <div className="flex items-center justify-between pb-6 border-b border-black/10 dark:border-white/10 mb-8">
                <button
                  onClick={handleCloseDoor}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1B1F3B] dark:bg-[#F4EFE6] text-[#F5F1E3] dark:text-[#0E0C0A] font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 shadow-md transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>&larr; Back to the doors</span>
                </button>

                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E4645A]">
                  PORTAL 0{activeDoor} REVEALED
                </span>
              </div>

              {/* ROOM 1: BUILDER (3-Layer Architecture & Lin's InfoTech) */}
              {activeDoor === 1 && (
                <div>
                  <div className="mb-6">
                    <span className="text-xs font-mono text-[#7FA283] font-bold uppercase tracking-wider">
                      DECIPHERING THE STACK
                    </span>
                    <h3 className="font-display font-black text-3xl sm:text-4xl text-[#1B1F3B] dark:text-white mt-1">
                      Three-Layer Decoupled Architecture
                    </h3>
                    <p className="text-sm text-[#5A5D73] dark:text-[#9B9AA8] mt-2 leading-relaxed">
                      Shipped as Founding Software Engineer at Lin&apos;s InfoTech. Isolates the Next.js client, Express REST gateway, and FastAPI LLM service so each layer deploys independently with zero credential leaks.
                    </p>
                  </div>

                  {/* Architecture Diagram */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="p-5 rounded-2xl bg-[#F5F1E3] dark:bg-[#101116] border border-[#7FA283]/40">
                      <div className="text-[10px] font-mono text-[#7FA283] font-bold uppercase mb-1">
                        LAYER 01: CLIENT
                      </div>
                      <div className="font-display font-bold text-lg text-[#1B1F3B] dark:text-white mb-2">
                        Next.js App Router
                      </div>
                      <p className="text-xs text-[#5A5D73] dark:text-[#9B9AA8] leading-relaxed">
                        Statically generated edge routes with surgical hydration only where user components are interactive.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#F5F1E3] dark:bg-[#101116] border border-[#2F4B8F]/40">
                      <div className="text-[10px] font-mono text-[#2F4B8F] font-bold uppercase mb-1">
                        LAYER 02: GATEWAY
                      </div>
                      <div className="font-display font-bold text-lg text-[#1B1F3B] dark:text-white mb-2">
                        Express REST &amp; Auth
                      </div>
                      <p className="text-xs text-[#5A5D73] dark:text-[#9B9AA8] leading-relaxed">
                        Hardened with Helmet, scoped CORS, Mongoose schemas, and authenticated proxies for LLM calls.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#F5F1E3] dark:bg-[#101116] border border-[#C8663A]/40">
                      <div className="text-[10px] font-mono text-[#C8663A] font-bold uppercase mb-1">
                        LAYER 03: AI ENGINE
                      </div>
                      <div className="font-display font-bold text-lg text-[#1B1F3B] dark:text-white mb-2">
                        Python / FastAPI
                      </div>
                      <p className="text-xs text-[#5A5D73] dark:text-[#9B9AA8] leading-relaxed">
                        LangChain + Google Gemini API for streaming chatbot responses and async document generation.
                      </p>
                    </div>
                  </div>

                  {/* Checklist List (Reel A style) */}
                  <div className="space-y-3">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#5A5D73] dark:text-[#9B9AA8]">
                      Production Milestones at Lin&apos;s InfoTech:
                    </div>
                    {[
                      'Implemented an Express API gateway keeping Gemini API credentials off the public client bundle.',
                      'Built Mongoose modules for authentication, session handling, and lead capture.',
                      'Configured dynamic XML sitemap and server-side metadata generation on Vercel.',
                      'Integrated LangChain token buffers for resilient long-context streaming completions.'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1B1F3B] dark:text-white">
                        <CheckCircle2 className="w-4 h-4 text-[#7FA283] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ROOM 2: PRODUCTS (Apex, Nexacro, Laundex) */}
              {activeDoor === 2 && (
                <div>
                  <div className="mb-6">
                    <span className="text-xs font-mono text-[#2F4B8F] font-bold uppercase tracking-wider">
                      PRODUCTION CATALOG
                    </span>
                    <h3 className="font-display font-black text-3xl sm:text-4xl text-[#1B1F3B] dark:text-white mt-1">
                      Shipped Software Products
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {projectsData.slice(1, 4).map((p) => (
                      <div
                        key={p.id}
                        className="p-5 rounded-2xl bg-[#F5F1E3] dark:bg-[#101116] border border-black/10 dark:border-white/10 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#2F4B8F]/15 text-[#2F4B8F] text-[10px] font-mono font-bold">
                              {p.metric}
                            </span>
                            {p.liveUrl && (
                              <a
                                href={p.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#5A5D73] dark:text-[#9B9AA8] hover:text-[#2F4B8F]"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                          <h4 className="font-display font-bold text-lg text-[#1B1F3B] dark:text-white mb-1">
                            {p.title}
                          </h4>
                          <p className="text-xs text-[#5A5D73] dark:text-[#9B9AA8] leading-relaxed mb-4">
                            {p.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-black/10 dark:border-white/10 flex flex-wrap gap-1">
                          {p.technologies.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded bg-white dark:bg-[#1A1816] text-[9px] font-mono text-[#5A5D73] dark:text-[#9B9AA8]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ROOM 3: RESEARCHER (IEEE Paper & 92%+ Counter) */}
              {activeDoor === 3 && (
                <div>
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono text-[#C8663A] font-bold uppercase tracking-wider">
                        PEER-REVIEWED PUBLICATION
                      </span>
                      <h3 className="font-display font-black text-3xl sm:text-4xl text-[#1B1F3B] dark:text-white mt-1">
                        Parkinson&apos;s Disease Screening
                      </h3>
                      <p className="text-xs font-mono text-[#5A5D73] dark:text-[#9B9AA8] mt-1">
                        IEEE Conference Paper, ICFTS 2025 &bull; Published in IEEE Xplore
                      </p>
                    </div>

                    {/* Animated Counter 92%+ */}
                    <div className="p-4 rounded-2xl bg-[#C8663A]/15 border border-[#C8663A]/40 flex items-center gap-3">
                      <div className="text-4xl font-display font-black text-[#C8663A]">
                        92%+
                      </div>
                      <div className="text-xs font-mono uppercase tracking-wider text-[#5A5D73] dark:text-[#9B9AA8]">
                        Screening <br />Accuracy
                      </div>
                    </div>
                  </div>

                  {/* Architecture Diagram for MobileNet + KNN */}
                  <div className="p-6 rounded-2xl bg-[#F5F1E3] dark:bg-[#101116] border border-black/10 dark:border-white/10 mb-6">
                    <div className="font-mono text-xs uppercase tracking-wider text-[#C8663A] mb-3">
                      Computational Pipeline Architecture:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                      <div className="p-3 rounded-xl bg-white dark:bg-[#1A1816] border border-black/5 dark:border-white/5">
                        <strong className="text-[#1B1F3B] dark:text-white">1. Archimedean Spirals</strong>
                        <p className="text-[11px] text-[#5A5D73] dark:text-[#9B9AA8] mt-1">
                          Digitized spiral hand sketches capture micro-tremors in pen trajectory.
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-white dark:bg-[#1A1816] border border-black/5 dark:border-white/5">
                        <strong className="text-[#C8663A]">2. MobileNet Backbone</strong>
                        <p className="text-[11px] text-[#5A5D73] dark:text-[#9B9AA8] mt-1">
                          Deep spatial feature extraction with lightweight edge inference parameters.
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-white dark:bg-[#1A1816] border border-black/5 dark:border-white/5">
                        <strong className="text-[#7FA283]">3. KNN Classifier</strong>
                        <p className="text-[11px] text-[#5A5D73] dark:text-[#9B9AA8] mt-1">
                          Non-parametric distance discrimination achieving verified &gt;92% accuracy.
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#5A5D73] dark:text-[#9B9AA8] leading-relaxed">
                    Published in IEEE Xplore proceedings (ICFTS 2025). Focuses on non-invasive preliminary screening methods for neuromuscular anomalies.
                  </p>
                </div>
              )}

              {/* ROOM 4: LEADER (GDG VP, Hackathons, Trophy Shelf) */}
              {activeDoor === 4 && (
                <div>
                  <div className="mb-6">
                    <span className="text-xs font-mono text-[#6B6A85] font-bold uppercase tracking-wider">
                      LEADERSHIP &amp; COMMUNITY
                    </span>
                    <h3 className="font-display font-black text-3xl sm:text-4xl text-[#1B1F3B] dark:text-white mt-1">
                      Developer Leadership &amp; Honors
                    </h3>
                  </div>

                  {/* Trophy Shelf with Confetti */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {[
                      { title: '1st Prize Winner', subtitle: '12-Hour Hackathon (TutorMatch)', badge: '1st Prize' },
                      { title: '3rd Prize Winner', subtitle: '24-Hour Hackathon (Fake News AI)', badge: '3rd Prize' },
                      { title: 'Best Poster Award', subtitle: 'Tech Star Summit', badge: 'Best Poster' },
                      { title: 'Torch Bearer Award', subtitle: 'SIMATS University 2025', badge: 'Excellence' },
                    ].map((trophy, i) => (
                      <div
                        key={i}
                        onClick={triggerTrophyConfetti}
                        className="p-4 rounded-2xl bg-[#F5F1E3] dark:bg-[#101116] border border-[#C9A24B]/30 hover:border-[#C9A24B] transition-all cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-[#C9A24B]/20 text-[#C9A24B] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                          <Trophy className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] font-mono text-[#C9A24B] font-bold uppercase">
                          {trophy.badge}
                        </span>
                        <div className="font-display font-bold text-sm text-[#1B1F3B] dark:text-white">
                          {trophy.title}
                        </div>
                        <div className="text-[10px] text-[#5A5D73] dark:text-[#9B9AA8] mt-0.5">
                          {trophy.subtitle}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Leadership Roles */}
                  <div className="space-y-3 pt-4 border-t border-black/10 dark:border-white/10 text-xs text-[#5A5D73] dark:text-[#9B9AA8]">
                    <div>
                      <strong className="text-[#1B1F3B] dark:text-white">Vice President — Google Developer Group SIMATS (2025–Present): </strong>
                      Conducted technical workshops on Cloud, Flutter, and TensorFlow; mentored student hackathon teams.
                    </div>
                    <div>
                      <strong className="text-[#1B1F3B] dark:text-white">Research &amp; Innovation Lead — Hackathon Club SIMATS (2025–Present): </strong>
                      Designed real-world problem statements and guided project engineering.
                    </div>
                    <div>
                      <strong className="text-[#1B1F3B] dark:text-white">Innovative Student Ambassador — IIC (March 2026–Present): </strong>
                      Promoted institutional student startup and innovation culture.
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
