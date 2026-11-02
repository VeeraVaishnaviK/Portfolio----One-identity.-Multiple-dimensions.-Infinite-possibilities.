import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, FileDown, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface NavbarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onPlayClick: () => void;
  activeSection: string;
}

export function Navbar({ soundEnabled, onToggleSound, onPlayClick, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'AI & Eng', href: '#ai-engineering', id: 'ai-engineering' },
    { label: 'Research', href: '#research', id: 'research' },
    { label: 'Leadership', href: '#leadership', id: 'leadership' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    onPlayClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#101116]/85 backdrop-blur-md border-b border-[#2A2C38]/60 shadow-lg shadow-black/20'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="group flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9275FF]/30 to-[#C7A66A]/30 border border-[#9275FF]/40 flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="font-heading font-bold text-sm tracking-wider text-white">VV</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-heading font-bold text-sm tracking-wider text-[#F5F1E9] group-hover:text-[#9275FF] transition-colors">
                BEYOND THE CODE
              </span>
              <span className="text-[10px] tracking-widest text-[#8E8E93] uppercase">
                {PERSONAL_INFO.name}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-[#171821]/80 border border-[#2A2C38] backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#9275FF] text-white shadow-sm shadow-[#9275FF]/40'
                      : 'text-[#8E8E93] hover:text-[#F5F1E9] hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons (Sound, Resume, Mobile Menu) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sound Toggle */}
            <button
              onClick={() => {
                onPlayClick();
                onToggleSound();
              }}
              title={soundEnabled ? 'Mute ambient sound' : 'Enable ambient sound'}
              className={`p-2 rounded-xl border transition-all ${
                soundEnabled
                  ? 'bg-[#9275FF]/20 border-[#9275FF] text-[#D9CEFF]'
                  : 'bg-[#171821] border-[#2A2C38] text-[#8E8E93] hover:text-white'
              }`}
              aria-label="Toggle sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Resume Download Button */}
            <a
              href={PERSONAL_INFO.resumePdfPath}
              download={PERSONAL_INFO.resumeDownloadName}
              onClick={onPlayClick}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#9275FF] to-[#7B5BFA] text-white text-xs font-semibold hover:shadow-lg hover:shadow-[#9275FF]/30 hover:scale-[1.02] transition-all"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => {
                onPlayClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded-xl bg-[#171821] border border-[#2A2C38] text-[#F5F1E9]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-[#101116]/95 backdrop-blur-2xl flex flex-col pt-24 px-6 pb-8">
          <div className="flex items-center gap-2 pb-6 border-b border-[#2A2C38]">
            <Sparkles className="w-5 h-5 text-[#C7A66A]" />
            <span className="font-heading font-semibold text-sm tracking-wider text-white">
              NAVIGATION PORTAL
            </span>
          </div>

          <nav className="flex flex-col gap-2 py-6 overflow-y-auto flex-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`px-4 py-3 rounded-xl font-heading text-base font-medium flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-[#9275FF]/20 text-[#D9CEFF] border border-[#9275FF]/40'
                      : 'text-[#8E8E93] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-[#686868]">0{navItems.indexOf(item) + 1}</span>
                </a>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-[#2A2C38] flex flex-col gap-3">
            <a
              href={PERSONAL_INFO.resumePdfPath}
              download={PERSONAL_INFO.resumeDownloadName}
              onClick={() => {
                onPlayClick();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#9275FF] to-[#7B5BFA] text-white font-medium text-sm shadow-md shadow-[#9275FF]/30"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Official Resume (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
