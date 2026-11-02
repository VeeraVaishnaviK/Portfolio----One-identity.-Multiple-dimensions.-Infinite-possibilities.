import { Users, ChevronRight } from 'lucide-react';
import { LEADERSHIP_DATA } from '../../data/portfolioData';

export function LeadershipSection() {
  return (
    <section id="leadership" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171821] border border-[#2A2C38] mb-4">
            <Users className="w-3.5 h-3.5 text-[#C7A66A]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#D9CEFF]">
              Section 07 • Community & Mentorship
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Leadership & Impact<span className="text-[#9275FF]">.</span>
          </h2>
        </div>
        <p className="text-sm text-[#8E8E93] max-w-md mt-4 md:mt-0">
          Empowering developer cohorts, conducting technical workshops on Cloud and AI, and mentoring student hackathon builders.
        </p>
      </div>

      {/* Leadership Timeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {LEADERSHIP_DATA.map((item) => (
          <div
            key={item.id}
            className="group rounded-3xl bg-[#171821] border border-[#2A2C38] hover:border-[#C7A66A]/50 transition-all p-6 sm:p-7 flex flex-col justify-between"
          >
            <div>
              {/* Badge & Period */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-[#C7A66A]/15 border border-[#C7A66A]/30 text-[#C7A66A] text-[11px] font-mono font-semibold">
                  {item.tag}
                </span>
                <span className="text-[11px] font-mono text-[#8E8E93]">
                  {item.period}
                </span>
              </div>

              {/* Role & Org */}
              <h3 className="font-heading font-black text-xl text-white mb-1 group-hover:text-[#DFCA9B] transition-colors">
                {item.role}
              </h3>
              <div className="text-xs text-[#9275FF] font-medium mb-4">
                {item.organization}
              </div>

              {/* Description */}
              <p className="text-xs text-[#8E8E93] leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Initiatives */}
              <div className="space-y-2 mb-4">
                {item.initiatives.map((init, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#F5F1E9]/80">
                    <ChevronRight className="w-3.5 h-3.5 text-[#C7A66A] shrink-0 mt-0.5" />
                    <span>{init}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#2A2C38]/60 flex items-center justify-between text-[11px] text-[#686868]">
              <span>Active Term</span>
              <span className="font-mono text-[#C7A66A]">SIMATS University</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
