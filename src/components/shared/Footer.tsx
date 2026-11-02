import { Mail, FileDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { PERSONAL_INFO } from '../../data/portfolioData';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#2A2C38] bg-[#0c0d12] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Monogram */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#9275FF]/40 to-[#C7A66A]/30 border border-[#9275FF]/40 flex items-center justify-center">
              <span className="font-heading font-black text-xs text-white">VV</span>
            </div>
            <span className="font-heading font-bold text-base tracking-wider text-white">
              BEYOND THE CODE
            </span>
          </div>
          <p className="text-xs text-[#8E8E93] max-w-sm leading-relaxed">
            Personal digital portfolio of {PERSONAL_INFO.name}. One identity. Multiple dimensions. Infinite possibilities.
          </p>
        </div>

        {/* Quick External Links */}
        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-[#171821] hover:bg-white/5 border border-[#2A2C38] text-[#8E8E93] hover:text-[#9275FF] transition-colors"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-[#171821] hover:bg-white/5 border border-[#2A2C38] text-[#8E8E93] hover:text-[#3B82F6] transition-colors"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-2.5 rounded-xl bg-[#171821] hover:bg-white/5 border border-[#2A2C38] text-[#8E8E93] hover:text-[#10B981] transition-colors"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.resumePdfPath}
            download={PERSONAL_INFO.resumeDownloadName}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#171821] hover:bg-white/5 border border-[#2A2C38] text-xs font-mono text-[#D9CEFF] transition-colors"
            title="Download Resume"
          >
            <FileDown className="w-3.5 h-3.5 text-[#9275FF]" />
            <span>Resume</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#2A2C38]/40 flex flex-col sm:flex-row items-center justify-between text-xs text-[#686868] gap-4">
        <div>
          © {currentYear} {PERSONAL_INFO.name}. Built with React, TypeScript, Three.js, &amp; Tailwind CSS.
        </div>
        <div className="flex items-center gap-1 font-mono text-[11px] text-[#8E8E93]">
          <span>Saveetha School of Engineering</span>
          <span>•</span>
          <span className="text-[#C7A66A]">CGPA 9.22 / 10</span>
        </div>
      </div>
    </footer>
  );
}
