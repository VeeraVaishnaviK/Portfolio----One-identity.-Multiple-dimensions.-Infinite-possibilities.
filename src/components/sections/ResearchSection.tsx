import { Microscope, Award, FileText, CheckCircle2, BookOpen } from 'lucide-react';
import { RESEARCH_DATA } from '../../data/portfolioData';

export function ResearchSection() {
  return (
    <section id="research" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171821] border border-[#2A2C38] mb-4">
            <Microscope className="w-3.5 h-3.5 text-[#10B981]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#D9CEFF]">
              Section 06 • Academic Inquiry
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Researching Beyond the Obvious<span className="text-[#9275FF]">.</span>
          </h2>
        </div>
        <p className="text-sm text-[#8E8E93] max-w-md mt-4 md:mt-0">
          Published computational biomedical research focusing on non-invasive screening models for neuromuscular pathology.
        </p>
      </div>

      {/* Research Paper Showcase Card */}
      <div className="rounded-3xl bg-[#171821] border border-[#10B981]/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Paper Publication Meta Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#2A2C38]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 flex items-center justify-center text-[#10B981]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-[#10B981] uppercase tracking-wider">
                {RESEARCH_DATA.publication}
              </div>
              <div className="text-[11px] text-[#8E8E93]">
                Published in {RESEARCH_DATA.venue} • Year {RESEARCH_DATA.year}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] font-mono text-xs font-bold">
            <Award className="w-4 h-4" />
            <span>Reported Accuracy: {RESEARCH_DATA.reportedAccuracy}</span>
          </div>
        </div>

        {/* Paper Title & Abstract */}
        <div className="my-8">
          <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mb-4 leading-snug">
            {RESEARCH_DATA.title}
          </h3>

          <div className="p-5 rounded-2xl bg-[#101116] border border-[#2A2C38] mb-6">
            <div className="text-xs font-mono uppercase tracking-wider text-[#C7A66A] mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Research Objective & Clinical Significance</span>
            </div>
            <p className="text-xs sm:text-sm text-[#F5F1E9]/90 leading-relaxed font-sans">
              {RESEARCH_DATA.objective}
            </p>
          </div>
        </div>

        {/* Methodology Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-5 rounded-2xl bg-[#101116]/80 border border-[#2A2C38]">
            <div className="text-xs font-mono text-[#3B82F6] uppercase tracking-wider mb-2">
              Deep Feature Extraction
            </div>
            <div className="text-base font-bold text-white mb-1">MobileNet Convolutional Architecture</div>
            <p className="text-xs text-[#8E8E93] leading-relaxed">
              Trained deep convolutional layers to distill high-dimensional spatial trajectories from digital Archimedean spiral sketches without excessive inference latency.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#101116]/80 border border-[#2A2C38]">
            <div className="text-xs font-mono text-[#9275FF] uppercase tracking-wider mb-2">
              Decision Boundary Classifier
            </div>
            <div className="text-base font-bold text-white mb-1">K-Nearest Neighbours (KNN)</div>
            <p className="text-xs text-[#8E8E93] leading-relaxed">
              Utilized non-parametric spatial distance clustering over MobileNet feature vectors to discriminate subtle microscopic micro-tremors from healthy baseline drawings.
            </p>
          </div>
        </div>

        {/* Key Findings List */}
        <div className="space-y-2.5 mb-6">
          <div className="text-xs font-mono uppercase tracking-wider text-[#8E8E93] mb-3">
            Peer-Reviewed Key Findings:
          </div>
          {RESEARCH_DATA.keyFindings.map((finding, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F5F1E9]/80">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
              <span>{finding}</span>
            </div>
          ))}
        </div>

        {/* Integrity Note */}
        <div className="pt-4 border-t border-[#2A2C38] flex items-center justify-between text-[11px] text-[#8E8E93] font-mono">
          <span>{RESEARCH_DATA.verificationNote}</span>
          <span className="text-[#C7A66A]">Peer-Reviewed Validation</span>
        </div>
      </div>
    </section>
  );
}
