import { BookOpen, Compass } from 'lucide-react';
import { LEARNING_JOURNEY } from '../../data/portfolioData';

export function LearningSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl bg-gradient-to-br from-[#171821] via-[#101116] to-[#171821] border border-[#2A2C38] p-8 sm:p-12 relative overflow-hidden">
        {/* Accent ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#9275FF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101116] border border-[#2A2C38] mb-4">
            <Compass className="w-3.5 h-3.5 text-[#9275FF]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#D9CEFF]">
              Continuous Exploration
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Always Learning. Always Building<span className="text-[#9275FF]">.</span>
          </h2>
          <p className="text-sm text-[#8E8E93] leading-relaxed">
            Active technical vectors currently being explored through hands-on system prototyping and research experiments.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LEARNING_JOURNEY.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#101116]/80 border border-[#2A2C38] hover:border-[#9275FF]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="w-7 h-7 rounded-lg bg-[#9275FF]/15 border border-[#9275FF]/30 flex items-center justify-center text-[#9275FF] mb-3">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-heading font-bold text-sm text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#8E8E93] leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#2A2C38]/40 flex items-center justify-between text-[10px] font-mono text-[#686868]">
                <span>In Progress</span>
                <span className="text-[#9275FF]">0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
