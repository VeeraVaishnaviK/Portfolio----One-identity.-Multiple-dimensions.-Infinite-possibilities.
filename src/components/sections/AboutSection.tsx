import { GraduationCap, Award, BookOpen, Compass, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Editorial Portrait & Stats */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative group w-full max-w-sm">
            {/* Ambient Back Glow */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#9275FF]/20 to-[#C7A66A]/20 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />

            {/* Framed Image Container */}
            <div className="relative rounded-3xl overflow-hidden border border-[#2A2C38] bg-[#171821] shadow-2xl">
              <img
                src={PERSONAL_INFO.profileImagePath}
                alt={PERSONAL_INFO.name}
                className="w-full h-auto object-cover object-top aspect-[4/5] filter grayscale hover:grayscale-0 transition-all duration-700"
              />
              {/* Luxury gold corner marks */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#C7A66A]" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#9275FF]" />

              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#101116] via-[#101116]/80 to-transparent flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-[#F5F1E9]">
                  <MapPin className="w-3.5 h-3.5 text-[#9275FF]" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
                <span className="font-mono text-[#C7A66A] font-semibold">B.E. CSE (AI)</span>
              </div>
            </div>

            {/* Floating Metric Card */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 p-4 rounded-2xl bg-[#171821]/95 border border-[#C7A66A]/40 shadow-xl backdrop-blur-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C7A66A]/20 flex items-center justify-center">
                <Award className="w-5 h-5 text-[#C7A66A]" />
              </div>
              <div>
                <div className="text-xl font-heading font-black text-white">{PERSONAL_INFO.cgpa}</div>
                <div className="text-[10px] font-mono text-[#8E8E93] uppercase tracking-wider">Cumulative GPA</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Narrative & Credentials */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171821] border border-[#2A2C38] w-fit mb-4">
            <Compass className="w-3.5 h-3.5 text-[#9275FF]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#D9CEFF]">
              Section 01 • Philosophy & Identity
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            More than a developer.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9275FF] via-[#D9CEFF] to-[#C7A66A]">
              A problem solver.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#F5F1E9]/90 leading-relaxed font-sans mb-8">
            &ldquo;{PERSONAL_INFO.bio}&rdquo;
          </p>

          {/* Academic Snapshot Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-[#171821]/80 border border-[#2A2C38]">
              <div className="flex items-center gap-2.5 text-[#C7A66A] mb-1.5">
                <GraduationCap className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-wider">Academic Program</span>
              </div>
              <div className="text-sm font-semibold text-white">B.E. Computer Science (AI)</div>
              <div className="text-xs text-[#8E8E93] mt-0.5">{PERSONAL_INFO.institution}</div>
              <div className="text-[11px] font-mono text-[#9275FF] mt-2">Expected Graduation: May 2028</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#171821]/80 border border-[#2A2C38]">
              <div className="flex items-center gap-2.5 text-[#9275FF] mb-1.5">
                <BookOpen className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-wider">Foundational Coursework</span>
              </div>
              <div className="text-xs text-[#8E8E93] leading-relaxed">
                Data Structures & Algorithms, OOP, DBMS, Operating Systems, AI Architecture.
              </div>
              <div className="text-[11px] font-mono text-[#10B981] mt-2">Rigorous Theoretical Baseline</div>
            </div>
          </div>

          {/* Core Principles Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#2A2C38]">
            <span className="text-xs text-[#8E8E93] font-mono mr-2">Focus Domains:</span>
            {[
              'Production Microservices',
              'AI/ML System Integrations',
              'Edge Architecture',
              'Bio-Medical ML Screening',
              'Developer Leadership'
            ].map((focus) => (
              <span
                key={focus}
                className="px-3 py-1 rounded-full bg-[#171821] border border-[#2A2C38] text-xs text-[#D9CEFF]"
              >
                {focus}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

