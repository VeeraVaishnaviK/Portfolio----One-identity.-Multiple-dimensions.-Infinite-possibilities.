import { Briefcase, ExternalLink, CheckCircle2, Layers } from 'lucide-react';
import { EXPERIENCE_DATA } from '../../data/portfolioData';

export function ExperienceSection() {
  const exp = EXPERIENCE_DATA[0];

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171821] border border-[#2A2C38] mb-4">
            <Briefcase className="w-3.5 h-3.5 text-[#10B981]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#D9CEFF]">
              Section 03 • Production Impact
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Engineering Experience<span className="text-[#9275FF]">.</span>
          </h2>
        </div>
        <p className="text-sm text-[#8E8E93] max-w-md mt-4 md:mt-0">
          Direct ownership of production systems, architecture decisions, microservices isolation, and AI integrations.
        </p>
      </div>

      {/* Main Experience Card */}
      <div className="rounded-3xl bg-[#171821] border border-[#2A2C38] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Top ambient accent glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#9275FF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-8 border-b border-[#2A2C38]">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#9275FF]/20 border border-[#9275FF]/40 text-[#D9CEFF] text-xs font-mono font-semibold">
                CURRENT ROLE
              </span>
              <span className="text-xs font-mono text-[#8E8E93]">{exp.period}</span>
              <span className="text-xs text-[#686868]">• {exp.location}</span>
            </div>

            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mb-1">
              {exp.role}
            </h3>

            <div className="flex items-center gap-2 text-sm text-[#C7A66A] font-medium">
              <span>{exp.company}</span>
              <a
                href={exp.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#9275FF] hover:underline"
              >
                <span>linsinfotech.in</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <p className="text-sm text-[#8E8E93] max-w-xl leading-relaxed">
            &ldquo;{exp.description}&rdquo;
          </p>
        </div>

        {/* 3-Layer Microservices Callout Diagram */}
        <div className="my-8 p-5 sm:p-6 rounded-2xl bg-[#101116] border border-[#2A2C38]">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-[#C7A66A]" />
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Three-Layer Decoupled Microservices Architecture
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#171821] border border-[#2A2C38]/80 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono text-[#3B82F6] font-semibold mb-1">LAYER 01: CLIENT</div>
                <div className="text-sm font-bold text-white mb-1">Next.js App Router</div>
                <div className="text-[#8E8E93] leading-relaxed">
                  Statically generated edge routes with surgical interactive component hydration.
                </div>
              </div>
              <div className="mt-3 text-[10px] font-mono text-[#686868]">Deploy: Vercel Edge</div>
            </div>

            <div className="p-4 rounded-xl bg-[#171821] border border-[#2A2C38]/80 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono text-[#9275FF] font-semibold mb-1">LAYER 02: GATEWAY & REST</div>
                <div className="text-sm font-bold text-white mb-1">Node.js + Express.js</div>
                <div className="text-[#8E8E93] leading-relaxed">
                  Mongoose schemas, auth sessions, Helmet, scoped CORS, rate limiting, and AI request proxying.
                </div>
              </div>
              <div className="mt-3 text-[10px] font-mono text-[#686868]">Security: Zero public LLM surface</div>
            </div>

            <div className="p-4 rounded-xl bg-[#171821] border border-[#2A2C38]/80 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono text-[#10B981] font-semibold mb-1">LAYER 03: AI ENGINE</div>
                <div className="text-sm font-bold text-white mb-1">Python + FastAPI</div>
                <div className="text-[#8E8E93] leading-relaxed">
                  LangChain orchestration + Google Gemini streaming API and async document generator.
                </div>
              </div>
              <div className="mt-3 text-[10px] font-mono text-[#686868]">Service: Isolated Compute</div>
            </div>
          </div>
        </div>

        {/* Detailed Responsibilities List */}
        <div className="space-y-3 mb-8">
          <div className="text-xs font-mono uppercase tracking-widest text-[#8E8E93] mb-4">
            Key Engineering Responsibilities & Shipped Features:
          </div>
          {exp.responsibilities.map((resp, idx) => (
            <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#F5F1E9]/80 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-[#9275FF] shrink-0 mt-0.5" />
              <span>{resp}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack Pills */}
        <div className="pt-6 border-t border-[#2A2C38] flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-[#8E8E93] mr-2">Production Stack:</span>
          {exp.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-lg bg-[#101116] border border-[#2A2C38] text-xs font-mono text-[#D9CEFF]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
