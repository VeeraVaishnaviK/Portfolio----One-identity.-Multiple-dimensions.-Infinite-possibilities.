import confetti from 'canvas-confetti';
import { Trophy, Award as AwardIcon, Sparkles } from 'lucide-react';
import { AWARDS_DATA } from '../../data/portfolioData';

export function AwardsSection() {
  const triggerConfetti = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 45,
      spread: 60,
      origin: { x, y },
      colors: ['#9275FF', '#C7A66A', '#3B82F6', '#10B981']
    });
  };

  return (
    <section id="awards" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171821] border border-[#2A2C38] mb-4">
            <Trophy className="w-3.5 h-3.5 text-[#C7A66A]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#D9CEFF]">
              Section 08 • Honors & Recognition
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Honors & Accolades<span className="text-[#9275FF]">.</span>
          </h2>
        </div>
        <p className="text-sm text-[#8E8E93] max-w-md mt-4 md:mt-0">
          Recognized across competitive hackathons, academic summits, and institutional excellence awards.
        </p>
      </div>

      {/* Awards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {AWARDS_DATA.map((award) => (
          <div
            key={award.id}
            onClick={triggerConfetti}
            className="group relative rounded-3xl bg-[#171821] border border-[#2A2C38] hover:border-[#C7A66A]/50 transition-all duration-300 p-6 flex flex-col justify-between cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#C7A66A]/10"
          >
            {/* Top ambient glow */}
            <div 
              className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-2xl opacity-15 group-hover:opacity-30 transition-opacity pointer-events-none"
              style={{ backgroundColor: award.highlightColor }}
            />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: `${award.highlightColor}20`,
                    color: award.highlightColor
                  }}
                >
                  <AwardIcon className="w-5 h-5" />
                </div>
                <span 
                  className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase"
                  style={{
                    backgroundColor: `${award.highlightColor}15`,
                    color: award.highlightColor,
                    border: `1px solid ${award.highlightColor}35`
                  }}
                >
                  {award.badge}
                </span>
              </div>

              <div className="text-[11px] font-mono text-[#8E8E93] mb-1">
                {award.event}
              </div>
              <h3 className="font-heading font-black text-xl text-white mb-3 group-hover:text-[#DFCA9B] transition-colors">
                {award.title}
              </h3>
              <p className="text-xs text-[#8E8E93] leading-relaxed mb-4">
                {award.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#2A2C38]/60 flex items-center justify-between text-[11px] text-[#686868]">
              <span className="font-mono">Year {award.year}</span>
              <span className="text-[#9275FF] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                Tap to celebrate <Sparkles className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
