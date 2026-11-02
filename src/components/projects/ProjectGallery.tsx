import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderGit2, 
  ExternalLink, 
  Sparkles, 
  X, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { FEATURED_PROJECTS } from '../../data/portfolioData';
import type { Project } from '../../types/portfolio';

export function ProjectGallery() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171821] border border-[#2A2C38] mb-4">
            <FolderGit2 className="w-3.5 h-3.5 text-[#9275FF]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#D9CEFF]">
              Section 04 • Production Systems
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Featured Engineering<span className="text-[#9275FF]">.</span>
          </h2>
        </div>
        <p className="text-sm text-[#8E8E93] max-w-md mt-4 md:mt-0">
          Selected production web applications, machine learning computer vision systems, and full-stack services engineered for real-world impact.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {FEATURED_PROJECTS.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative rounded-3xl bg-[#171821] border border-[#2A2C38] hover:border-[#9275FF]/40 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between overflow-hidden"
          >
            {/* Top ambient glow */}
            <div 
              className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-15 group-hover:opacity-35 transition-opacity pointer-events-none"
              style={{ backgroundColor: project.accentColor }}
            />

            <div>
              {/* Category Pill & Live Link */}
              <div className="flex items-center justify-between mb-4">
                <span 
                  className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold"
                  style={{
                    backgroundColor: `${project.accentColor}18`,
                    color: project.accentColor,
                    border: `1px solid ${project.accentColor}35`
                  }}
                >
                  {project.subtitle}
                </span>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-[#101116] border border-[#2A2C38] text-[#8E8E93] hover:text-white transition-colors"
                    title="Open live URL"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Title & Tagline */}
              <h3 className="font-heading font-black text-2xl text-white mb-2 group-hover:text-[#D9CEFF] transition-colors">
                {project.title}
              </h3>
              <p className="text-xs text-[#C7A66A] font-medium mb-4 leading-relaxed">
                {project.tagline}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#8E8E93] leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Key Highlights */}
              <div className="space-y-2 mb-6">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#F5F1E9]/80">
                    <CheckCircle2 
                      className="w-3.5 h-3.5 shrink-0 mt-0.5" 
                      style={{ color: project.accentColor }}
                    />
                    <span className="line-clamp-2">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#2A2C38]/60 mb-5">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md bg-[#101116] border border-[#2A2C38] text-[10px] font-mono text-[#D9CEFF]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex-1 py-2.5 rounded-xl bg-[#101116] hover:bg-white/5 border border-[#2A2C38] text-xs font-semibold text-white transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Architecture Deep Dive</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2.5 rounded-xl bg-[#9275FF]/20 hover:bg-[#9275FF]/30 border border-[#9275FF]/40 text-xs font-semibold text-[#D9CEFF] transition-colors flex items-center gap-1"
                  >
                    <span>Live</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Deep Dive Architecture Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#171821] border border-[#9275FF]/40 p-6 sm:p-8 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-[#101116] border border-[#2A2C38] text-[#8E8E93] hover:text-white"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-[#9275FF] mb-2 uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Engineering Case Study</span>
              </div>

              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mb-1">
                {selectedProject.title}
              </h3>
              <p className="text-xs text-[#C7A66A] font-medium mb-6">
                {selectedProject.subtitle}
              </p>

              {/* Problem Solved */}
              <div className="p-4 rounded-2xl bg-[#101116] border border-[#2A2C38] mb-6">
                <div className="text-xs font-mono text-[#8E8E93] uppercase tracking-wider mb-1">
                  The Problem Solved
                </div>
                <p className="text-xs sm:text-sm text-[#F5F1E9] leading-relaxed">
                  {selectedProject.problemSolved}
                </p>
              </div>

              {/* Shipped Engineering Features */}
              <div className="space-y-3 mb-6">
                <div className="text-xs font-mono text-[#8E8E93] uppercase tracking-wider mb-2">
                  Key Technical Architectural Features:
                </div>
                {selectedProject.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F5F1E9]/90">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <div className="text-xs font-mono text-[#8E8E93] uppercase tracking-wider mb-2">
                  Implemented Technology Stack:
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-xl bg-[#101116] border border-[#2A2C38] text-xs font-mono text-[#D9CEFF]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live URL Link */}
              {selectedProject.liveUrl && (
                <div className="pt-4 border-t border-[#2A2C38] flex justify-end">
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9275FF] to-[#7B5BFA] text-white text-xs font-semibold shadow-lg shadow-[#9275FF]/30"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
