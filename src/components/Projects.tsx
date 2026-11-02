import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle2, Sparkles, Laptop } from 'lucide-react';
import { GithubIcon } from './shared/SocialIcons';
import projectsData from '../data/projects.json';

export function Projects({ onPlayClick }: { onPlayClick: () => void }) {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <section id="built" className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-[#1A1816]/70 border border-[#1B1F3B]/10 dark:border-white/10 text-xs font-mono text-[#E4645A] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>REEL B SIGNATURE &bull; SELECTED CASE STUDIES</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-[#1B1F3B] dark:text-[#F4EFE6]">
            Things I&apos;ve <span className="font-serif-italic font-normal text-[#E4645A]">built.</span>
          </h2>
        </div>

        <p className="text-sm text-[#5A5D73] dark:text-[#9B9AA8] font-mono max-w-sm mt-4 md:mt-0">
          Production systems, edge-routed platforms, and bio-medical machine learning tools.
        </p>
      </div>

      {/* Project Switcher Bar */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {projectsData.map((p, idx) => {
          const isActive = activeProject === idx;
          return (
            <button
              key={p.id}
              onClick={() => {
                onPlayClick();
                setActiveProject(idx);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#1B1F3B] dark:bg-[#F4EFE6] text-[#F5F1E3] dark:text-[#0E0C0A] shadow-md'
                  : 'bg-white/60 dark:bg-[#1A1816] text-[#5A5D73] dark:text-[#9B9AA8] border border-[#1B1F3B]/10 dark:border-white/10 hover:border-[#E4645A]'
              }`}
            >
              0{idx + 1}. {p.title}
            </button>
          );
        })}
      </div>

      {/* Active Project Card (Reel B Layout with Vertical Rotated Label & Device Mockup) */}
      {(() => {
        const project = projectsData[activeProject];

        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-white dark:bg-[#171821] border-2 border-[#1B1F3B]/10 dark:border-white/10 p-6 sm:p-10 shadow-xl relative overflow-hidden flex flex-col lg:flex-row gap-8 items-stretch"
          >
            {/* Left Edge: Vertical Rotated Label (Reel B signature) */}
            <div className="hidden lg:flex items-center justify-center w-12 border-r border-black/10 dark:border-white/10 pr-6">
              <span className="font-mono text-xs font-black tracking-widest text-[#5A5D73] dark:text-[#9B9AA8] -rotate-90 whitespace-nowrap uppercase">
                {project.category}
              </span>
            </div>

            {/* Middle: Content & Engineering Details */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-mono font-bold"
                    style={{
                      backgroundColor: `${project.accentColor}18`,
                      color: project.accentColor,
                    }}
                  >
                    {project.metric}
                  </span>
                  <span className="text-xs font-mono text-[#5A5D73] dark:text-[#9B9AA8]">
                    {project.subtitle}
                  </span>
                </div>

                <h3 className="font-display font-black text-3xl sm:text-4xl text-[#1B1F3B] dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-sm font-serif-italic text-[#E4645A] mb-4">
                  &ldquo;{project.tagline}&rdquo;
                </p>

                <p className="text-sm text-[#5A5D73] dark:text-[#9B9AA8] leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-2 mb-6">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#5A5D73] dark:text-[#9B9AA8]">
                    Key Technical Architectural Highlights:
                  </div>
                  {project.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#1B1F3B] dark:text-white">
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: project.accentColor }}
                      />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack Chips & Action CTAs */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-black/10 dark:border-white/10">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 text-xs font-mono text-[#5A5D73] dark:text-[#9B9AA8]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onPlayClick}
                      className="px-5 py-2.5 rounded-full bg-[#1B1F3B] dark:bg-[#F4EFE6] text-[#F5F1E3] dark:text-[#0E0C0A] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-90 transition-opacity"
                    >
                      <span>View Live Site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <a
                    href="https://github.com/VeeraVaishnaviK"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onPlayClick}
                    className="px-4 py-2.5 rounded-full border border-[#1B1F3B]/20 dark:border-white/20 text-[#1B1F3B] dark:text-[#F4EFE6] font-mono text-xs flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View on GitHub</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Device Mockup Frame (Reel B style) */}
            <div className="lg:w-80 sm:w-96 flex flex-col items-center justify-center self-center bg-[#F5F1E3] dark:bg-[#101116] rounded-2xl border border-black/10 dark:border-white/10 p-5 shadow-inner">
              <div className="w-full flex items-center gap-1.5 pb-3 border-b border-black/10 dark:border-white/10 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 font-mono text-[10px] text-[#5A5D73] dark:text-[#9B9AA8] truncate">
                  {project.liveUrl ? project.liveUrl.replace('https://', '') : 'internal://architecture'}
                </span>
              </div>

              {/* Abstract Representation */}
              <div className="w-full h-48 rounded-xl bg-gradient-to-br from-[#1B1F3B]/10 to-[#E4645A]/10 dark:from-white/5 dark:to-[#E4645A]/10 border border-black/5 dark:border-white/5 flex flex-col items-center justify-center p-4 text-center">
                <Laptop className="w-12 h-12 text-[#E4645A] mb-2" />
                <div className="font-display font-bold text-sm text-[#1B1F3B] dark:text-white">
                  {project.title}
                </div>
                <div className="text-[11px] font-mono text-[#5A5D73] dark:text-[#9B9AA8]">
                  {project.metric} &bull; Production Ready
                </div>
              </div>
            </div>
          </motion.div>
        );
      })()}
    </section>
  );
}
