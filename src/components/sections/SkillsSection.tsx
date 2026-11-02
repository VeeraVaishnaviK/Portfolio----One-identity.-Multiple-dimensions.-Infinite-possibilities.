import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Sparkles, Terminal } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...SKILL_CATEGORIES.map(c => c.category)];

  const filteredCategories = selectedCategory === 'All' 
    ? SKILL_CATEGORIES 
    : SKILL_CATEGORIES.filter(c => c.category === selectedCategory);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171821] border border-[#2A2C38] mb-4">
            <Code2 className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#D9CEFF]">
              Section 02 • Technical Architecture
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Engineering Arsenal<span className="text-[#9275FF]">.</span>
          </h2>
        </div>
        <p className="text-sm text-[#8E8E93] max-w-md mt-4 md:mt-0">
          A verified inventory of programming languages, modern frameworks, system architectures, and AI libraries applied across production systems.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#9275FF] text-white shadow-md shadow-[#9275FF]/30'
                  : 'bg-[#171821] text-[#8E8E93] hover:text-white border border-[#2A2C38]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((group) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-[#171821] border border-[#2A2C38] p-6 hover:border-[#9275FF]/40 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#C7A66A]" />
                  <span>{group.category}</span>
                </h3>
                <span 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: group.color }} 
                />
              </div>

              <p className="text-xs text-[#8E8E93] leading-relaxed mb-6">
                {group.description}
              </p>
            </div>

            {/* Skills Badges (No fake percentages) */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-[#2A2C38]/60">
              {group.skills.map((skill) => (
                <div
                  key={skill}
                  className="group/badge px-3 py-1.5 rounded-xl bg-[#101116] border border-[#2A2C38] hover:border-[#9275FF]/50 text-xs font-mono text-[#F5F1E9] flex items-center gap-1.5 transition-all"
                >
                  <Sparkles className="w-2.5 h-2.5 text-[#9275FF] opacity-0 group-hover/badge:opacity-100 transition-opacity" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

