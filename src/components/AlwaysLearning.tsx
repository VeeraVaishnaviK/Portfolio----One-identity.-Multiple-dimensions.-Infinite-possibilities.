import { motion } from 'framer-motion';
import { Sparkles, Activity } from 'lucide-react';

export function AlwaysLearning() {
  const topics = [
    'Microservices',
    'LLM Agents',
    'RAG Architectures',
    'System Design',
    'Edge Rendering',
    'TensorFlow',
    'Flutter',
    'Vector Databases',
    'LangChain',
    'Biomedical AI',
    'FastAPI Microservices',
    'Vercel Edge Network',
  ];

  return (
    <section className="py-20 overflow-hidden bg-black/5 dark:bg-white/[0.02] border-y border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-[#1A1816]/70 border border-[#1B1F3B]/10 dark:border-white/10 text-xs font-mono text-[#E4645A] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>REEL B CLOSING &bull; KNOWLEDGE VECTORS</span>
        </div>

        <h2 className="font-display font-black text-4xl sm:text-5xl tracking-tight text-[#1B1F3B] dark:text-[#F4EFE6]">
          Always <span className="font-serif-italic font-normal text-[#E4645A]">learning.</span>
        </h2>
      </div>

      {/* Infinite Smooth Marquee */}
      <div className="relative w-full overflow-hidden flex mb-12">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          className="flex items-center gap-6 whitespace-nowrap"
        >
          {[...topics, ...topics].map((item, idx) => (
            <div
              key={idx}
              className="px-6 py-3 rounded-full bg-white dark:bg-[#171821] border border-black/10 dark:border-white/10 shadow-sm flex items-center gap-2 font-display font-bold text-sm text-[#1B1F3B] dark:text-white"
            >
              <span className="w-2 h-2 rounded-full bg-[#E4645A]" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* "Currently Building" Live Status Card with Pulsing Dot */}
      <div className="max-w-2xl mx-auto px-4">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#171821] border border-black/10 dark:border-white/10 shadow-md flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-[#7FA283]/15 text-[#7FA283] shrink-0 mt-0.5">
            <Activity className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#7FA283] animate-ping" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#7FA283]">
                CURRENTLY BUILDING &bull; ACTIVE SPRINT
              </span>
            </div>

            <div className="font-display font-bold text-base text-[#1B1F3B] dark:text-white mb-1">
              Multi-Agent Orchestration &amp; Low-Latency Edge Inference
            </div>

            <p className="text-xs text-[#5A5D73] dark:text-[#9B9AA8] leading-relaxed">
              Investigating distributed asynchronous task queues for LangChain agents and optimising time-to-first-token across serverless runtimes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
