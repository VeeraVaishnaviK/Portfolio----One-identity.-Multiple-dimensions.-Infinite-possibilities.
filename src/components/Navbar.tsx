import { useState, useEffect } from 'react';
import { Sun, Moon, Volume2, VolumeX, FileDown, Menu, X, Sparkles } from 'lucide-react';
import profileData from '../data/profile.json';

interface NavbarProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onPlayClick: () => void;
  activeSection: string;
}

export function Navbar({
  darkMode,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
  onPlayClick,
  activeSection,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'Doors', href: '#doors', id: 'doors' },
    { label: 'Stack', href: '#stack', id: 'stack' },
    { label: 'Built', href: '#built', id: 'built' },
    { label: 'Journey', href: '#journey', id: 'journey' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    onPlayClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3.5 bg-[#F5F1E3]/85 dark:bg-[#0E0C0A]/85 backdrop-blur-md border-b border-[#1B1F3B]/10 dark:border-white/10 shadow-sm'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Tiny round VEE monogram button */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="group flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-[#1B1F3B] dark:bg-[#F4EFE6] text-[#F5F1E3] dark:text-[#0E0C0A] flex items-center justify-center font-display font-extrabold text-xs tracking-wider transition-transform group-hover:scale-105">
              VEE
            </div>
            <span className="hidden sm:inline font-mono text-xs tracking-widest uppercase text-[#1B1F3B] dark:text-[#F4EFE6] font-medium">
              STUDIO
            </span>
          </a>

          {/* Center: Desktop Nav Links with Scrollspy */}
          <div className="hidden md:flex items-center gap-1 sm:gap-2 px-3 py-1.5 rounded-full bg-white/70 dark:bg-[#1A1816]/70 border border-[#1B1F3B]/10 dark:border-white/10 backdrop-blur-md">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`relative px-3.5 py-1 text-xs font-mono tracking-wider transition-colors ${
                    isActive
                      ? 'text-[#E4645A] font-bold'
                      : 'text-[#5A5D73] dark:text-[#9B9AA8] hover:text-[#1B1F3B] dark:hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#E4645A] rounded-full" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right: Theme Toggle, Sound Toggle, Résumé Pill, Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle (Light switch) */}
            <button
              onClick={() => {
                onPlayClick();
                onToggleTheme();
              }}
              title={darkMode ? 'Switch to warm cream mode' : 'Switch to dark mode'}
              aria-label="Toggle theme"
              className="p-2 rounded-full border border-[#1B1F3B]/15 dark:border-white/15 bg-white/60 dark:bg-[#1A1816] text-[#1B1F3B] dark:text-[#F4EFE6] hover:scale-105 transition-all cursor-pointer"
            >
              {darkMode ? <Sun className="w-4 h-4 text-[#C9A24B]" /> : <Moon className="w-4 h-4 text-[#1B1F3B]" />}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                onPlayClick();
                onToggleSound();
              }}
              title={soundEnabled ? 'Mute ambient SFX' : 'Enable ambient SFX'}
              aria-label="Toggle sound"
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                soundEnabled
                  ? 'border-[#E4645A] bg-[#E4645A]/15 text-[#E4645A]'
                  : 'border-[#1B1F3B]/15 dark:border-white/15 bg-white/60 dark:bg-[#1A1816] text-[#5A5D73] dark:text-[#9B9AA8]'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Résumé Pill */}
            <a
              href={profileData.resumePath}
              download="Veera_Vaishnavi_K_Resume.pdf"
              onClick={onPlayClick}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1B1F3B] dark:bg-[#F4EFE6] text-[#F5F1E3] dark:text-[#0E0C0A] text-xs font-mono font-semibold tracking-wider hover:opacity-90 transition-opacity"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Résumé</span>
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => {
                onPlayClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 rounded-full border border-[#1B1F3B]/15 dark:border-white/15 bg-white/60 dark:bg-[#1A1816] text-[#1B1F3B] dark:text-[#F4EFE6]"
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-[#F5F1E3]/95 dark:bg-[#0E0C0A]/95 backdrop-blur-2xl flex flex-col pt-24 px-6 pb-8">
          <div className="flex items-center gap-2 pb-6 border-b border-[#1B1F3B]/10 dark:border-white/10">
            <Sparkles className="w-4 h-4 text-[#C9A24B]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#5A5D73] dark:text-[#9B9AA8]">
              NAVIGATION &bull; VEE STUDIO
            </span>
          </div>

          <div className="flex flex-col gap-3 py-6 flex-1 overflow-y-auto">
            {navLinks.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="py-3 px-4 rounded-2xl font-display font-bold text-2xl text-[#1B1F3B] dark:text-[#F4EFE6] hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-xs font-mono text-[#E4645A]">0{navLinks.indexOf(item) + 1}</span>
              </a>
            ))}
          </div>

          <a
            href={profileData.resumePath}
            download="Veera_Vaishnavi_K_Resume.pdf"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#1B1F3B] dark:bg-[#F4EFE6] text-[#F5F1E3] dark:text-[#0E0C0A] font-mono text-xs font-bold uppercase tracking-wider"
          >
            <FileDown className="w-4 h-4" />
            <span>Download Résumé (PDF)</span>
          </a>
        </div>
      )}
    </>
  );
}

