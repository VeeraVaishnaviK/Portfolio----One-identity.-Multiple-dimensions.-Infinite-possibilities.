import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Database, 
  BrainCircuit, 
  Cog, 
  Smartphone, 
  Sparkles 
} from 'lucide-react';

export function AiPipelineSection() {
  const [activeStep, setActiveStep] = useState(2); // Default on Intelligence

  const steps = [
    {
      num: '01',
      title: 'Problem',
      subtitle: 'Identification & Domain Formulation',
      icon: <Cpu className="w-5 h-5 text-[#9275FF]" />,
      summary: 'Distilling real-world biomedical and operational bottlenecks into crisp computational objectives.',
      details: 'Formulating clear hypothesis and classification boundaries—such as distinguishing Parkinsonian motor tremor artifacts or automating sperm cytological integrity analysis.'
    },
    {
      num: '02',
      title: 'Data',
      subtitle: 'Preprocessing & Feature Normalization',
      icon: <Database className="w-5 h-5 text-[#3B82F6]" />,
      summary: 'Curating, cleaning, and augmenting high-dimensional image matrices and relational records.',
      details: 'Handling microscopic sample variations, Archimedean spiral line trajectory extractions, and structuring Mongoose persistence schemas.'
    },
    {
      num: '03',
      title: 'Intelligence',
      subtitle: 'Model Architecture & Deep Inference',
      icon: <BrainCircuit className="w-5 h-5 text-[#10B981]" />,
      summary: 'Employing MobileNet spatial representations, KNN classification, and LangChain LLM orchestration.',
      details: 'Achieved >92% screening accuracy on Parkinson spiral datasets; orchestrating Google Gemini API for streaming conversational responses.'
    },
    {
      num: '04',
      title: 'Engineering',
      subtitle: 'Microservices & Gateway Hardening',
      icon: <Cog className="w-5 h-5 text-[#C7A66A]" />,
      summary: 'Packaging models behind isolated FastAPI microservices guarded by Express authentication gateways.',
      details: 'Enforcing Helmet security headers, scoped CORS policies, request rate limiting, and zero exposure of sensitive LLM API keys to the client.'
    },
    {
      num: '05',
      title: 'Application',
      subtitle: 'Production Edge Delivery & Clients',
      icon: <Smartphone className="w-5 h-5 text-[#EC4899]" />,
      summary: 'Delivering low-latency experiences across Next.js statically generated edge routes and Android native clients.',
      details: 'Serving 62 static edge routes with partial React hydration, providing seamless real-time web and mobile client interfaces.'
    }
  ];

  return (
    <section id="ai-engineering" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171821] border border-[#2A2C38] mb-4">
            <Cpu className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#D9CEFF]">
              Section 05 • AI Architecture
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Building Intelligence.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9275FF] via-[#3B82F6] to-[#C7A66A]">
              Engineering Possibilities.
            </span>
          </h2>
        </div>
        <p className="text-sm text-[#8E8E93] max-w-md mt-4 md:mt-0">
          Bridging research-level machine learning and high-throughput full-stack engineering into reliable, user-facing software.
        </p>
      </div>

      {/* Visual Workflow Steps Bar */}
      <div className="relative rounded-3xl bg-[#171821] border border-[#2A2C38] p-6 sm:p-8 mb-8 overflow-hidden">
        {/* Workflow Title */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#C7A66A] uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>End-to-End Operationalization Flow</span>
        </div>

        {/* Stepper Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {steps.map((step, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <button
                key={step.title}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isCurrent
                    ? 'bg-[#101116] border-[#9275FF] shadow-lg shadow-[#9275FF]/20 scale-[1.02]'
                    : 'bg-[#101116]/60 border-[#2A2C38] hover:border-[#8E8E93]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold text-[#8E8E93]">
                    {step.num}
                  </span>
                  {step.icon}
                </div>
                <div className="font-heading font-bold text-sm text-white mb-1">
                  {step.title}
                </div>
                <div className="text-[10px] text-[#8E8E93] line-clamp-1">
                  {step.subtitle}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Step Focus Card */}
      <motion.div
        key={activeStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="p-6 sm:p-8 rounded-3xl bg-[#171821] border border-[#9275FF]/30 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#9275FF] mb-2 uppercase">
            <span>Stage {steps[activeStep].num} Breakdown</span>
            <span>•</span>
            <span className="text-white font-bold">{steps[activeStep].title}</span>
          </div>
          <h4 className="font-heading font-black text-xl sm:text-2xl text-white mb-2">
            {steps[activeStep].subtitle}
          </h4>
          <p className="text-sm text-[#F5F1E9]/90 mb-4 leading-relaxed font-sans">
            {steps[activeStep].summary}
          </p>
          <div className="text-xs text-[#8E8E93] p-3.5 rounded-xl bg-[#101116] border border-[#2A2C38]">
            <strong className="text-[#C7A66A] font-semibold">Implementation Evidence: </strong>
            {steps[activeStep].details}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveStep(prev => (prev > 0 ? prev - 1 : steps.length - 1))}
            className="px-4 py-2 rounded-xl bg-[#101116] border border-[#2A2C38] text-xs text-[#8E8E93] hover:text-white"
          >
            Previous
          </button>
          <button
            onClick={() => setActiveStep(prev => (prev < steps.length - 1 ? prev + 1 : 0))}
            className="px-4 py-2 rounded-xl bg-[#9275FF] text-white text-xs font-semibold hover:bg-[#8563FA] shadow-md shadow-[#9275FF]/30"
          >
            Next Stage
          </button>
        </div>
      </motion.div>
    </section>
  );
}
