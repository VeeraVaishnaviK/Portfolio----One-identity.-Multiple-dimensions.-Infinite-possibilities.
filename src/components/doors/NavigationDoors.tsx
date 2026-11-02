import { useState } from 'react';
import { motion } from 'framer-motion';
import { Hammer, Cpu, Microscope, Crown, ArrowUpRight, Sparkles } from 'lucide-react';
import { NAVIGATION_DOORS } from '../../data/portfolioData';
import type { NavigationDoor } from '../../types/portfolio';

interface NavigationDoorsProps {
  onNavigate: (targetSection: string) => void;
  onPlayClick: () => void;
  onPlayWhoosh: () => void;
}

export function NavigationDoors({ onNavigate, onPlayClick, onPlayWhoosh }: NavigationDoorsProps) {
  const [activeDoor, setActiveDoor] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Hammer': return <Hammer className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      case 'Microscope': return <Microscope className="w-6 h-6" />;
      case 'Crown': return <Crown className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  const handleDoorClick = (door: NavigationDoor) => {
    onPlayClick();
    onPlayWhoosh();
    setActiveDoor(door.id);
    setTimeout(() => {
      onNavigate(door.targetSection);
      setActiveDoor(null);
    }, 450);
  };

  return (
    <div id="doors" className="w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171821] border border-[#9275FF]/30 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#C7A66A]" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#D9CEFF]">
            Scene 04 • Four Cinematic Dimensions
          </span>
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Choose Your Portal<span className="text-[#9275FF]">.</span>
        </h2>
        <p className="text-sm sm:text-base text-[#8E8E93] leading-relaxed">
          One identity expressed across four engineering dimensions. Select any portal to step directly into that domain.
        </p>
      </div>

      {/* The 4 Doors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {NAVIGATION_DOORS.map((door) => {
          const isSelected = activeDoor === door.id;
          return (
            <motion.div
              key={door.id}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleDoorClick(door)}
              className="group relative h-[420px] rounded-3xl bg-[#171821] border border-[#2A2C38] hover:border-transparent transition-all duration-300 p-6 flex flex-col justify-between overflow-hidden cursor-pointer"
              style={{
                boxShadow: isSelected ? `0 0 40px ${door.glowColor}` : 'none'
              }}
            >
              {/* Glowing Dynamic Border Gradient on Hover */}
              <div 
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  border: `2px solid ${door.accentColor}`,
                  boxShadow: `inset 0 0 30px ${door.glowColor}, 0 10px 40px ${door.glowColor}`
                }}
              />

              {/* Background Portal Glow Aura */}
              <div 
                className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: door.accentColor }}
              />

              {/* Door Visual Arch Architecture */}
              <div className="absolute inset-x-8 top-12 bottom-28 rounded-t-full border border-dashed border-[#2A2C38] group-hover:border-[#9275FF]/40 transition-colors pointer-events-none flex items-center justify-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-125"
                  style={{
                    backgroundColor: `${door.accentColor}18`,
                    color: door.accentColor,
                    boxShadow: `0 0 20px ${door.glowColor}`
                  }}
                >
                  {getIcon(door.icon)}
                </div>
              </div>

              {/* Top Door Identification */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-mono text-2xl font-black text-[#686868] group-hover:text-white transition-colors">
                  {door.number}
                </span>
                <div 
                  className="w-8 h-8 rounded-full bg-[#101116] border border-[#2A2C38] flex items-center justify-center transition-transform group-hover:rotate-45"
                  style={{ color: door.accentColor }}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Door Content */}
              <div className="relative z-10 pt-4">
                <div 
                  className="text-[11px] font-mono uppercase tracking-widest mb-1.5 font-bold"
                  style={{ color: door.accentColor }}
                >
                  {door.theme} DIMENSION
                </div>
                <h3 className="font-heading font-black text-xl text-white mb-2 group-hover:translate-x-1 transition-transform">
                  {door.title}
                </h3>
                <p className="text-xs text-[#8E8E93] line-clamp-2 leading-relaxed mb-4">
                  {door.subtitle}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#2A2C38]/60">
                  {door.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-[#101116] border border-[#2A2C38] text-[10px] text-[#8E8E93] group-hover:text-[#D9CEFF] transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
