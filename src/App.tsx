import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import confetti from 'canvas-confetti';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { IdCard } from './components/IdCard';
import { Doors } from './components/Doors';
import { PeriodicTable } from './components/PeriodicTable';
import { Projects } from './components/Projects';
import { Journey } from './components/Journey';
import { AlwaysLearning } from './components/AlwaysLearning';
import { Contact } from './components/Contact';
import { ChatWidget } from './components/ChatWidget';
import { CommandPalette } from './components/CommandPalette';
import { useSoundEffects } from './hooks/useSoundEffects';
import { useActiveSection } from './hooks/useActiveSection';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const keyBuffer = useRef('');

  const {
    soundEnabled,
    toggleSound,
    playWhoosh,
    playClick,
  } = useSoundEffects();

  const sectionIds = ['hero', 'id-card', 'doors', 'stack', 'built', 'journey', 'contact'];
  const activeSection = useActiveSection(sectionIds, 250);

  // Initialize theme from system or localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('vee_theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('vee_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('vee_theme', 'light');
      }
      return next;
    });
  };

  // Lenis Smooth Scroll
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Easter Egg: Type "vee" to trigger celebratory confetti!
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger when user is typing in form inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      keyBuffer.current = (keyBuffer.current + e.key.toLowerCase()).slice(-3);
      if (keyBuffer.current === 'vee') {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#E4645A', '#C9A24B', '#7FA283', '#2F4B8F', '#1B1F3B'],
        });
        playWhoosh();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [playWhoosh]);

  const scrollToDoors = () => {
    const el = document.querySelector('#doors');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#F5F1E3] dark:bg-[#0E0C0A] text-[#1B1F3B] dark:text-[#F4EFE6] selection:bg-[#E4645A]/30 selection:text-current font-body">
      {/* 4.0 Preloader */}
      <Preloader onComplete={() => {}} />

      {/* 4.1 Fixed Navbar */}
      <Navbar
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onPlayClick={playClick}
        activeSection={activeSection}
      />

      {/* Main Page Flow */}
      <main className="relative z-10">
        {/* 4.2 Hero Section */}
        <Hero
          onPlayClick={playClick}
          onExploreWork={scrollToDoors}
        />

        {/* 4.3 Swinging Lanyard ID Card Section */}
        <IdCard
          onPlayClick={playClick}
          onPlayWhoosh={playWhoosh}
        />

        {/* 4.4 Four Doors (Reel A Signature) */}
        <Doors
          onPlayClick={playClick}
          onPlayWhoosh={playWhoosh}
        />

        {/* 4.5 Periodic Table of My Stack (Reel B Signature) */}
        <PeriodicTable
          onPlayClick={playClick}
        />

        {/* 4.6 Things I've Built (Reel B Case Studies) */}
        <Projects
          onPlayClick={playClick}
        />

        {/* 4.7 Journey — "Let's go back in time." (Reel A Signature) */}
        <Journey
          onPlayClick={playClick}
        />

        {/* 4.8 Always Learning Marquee (Reel B Closing) */}
        <AlwaysLearning />

        {/* 4.9 Contact & Footer */}
        <Contact
          onPlayClick={playClick}
        />
      </main>

      {/* Floating Ask VEE AI Assistant */}
      <ChatWidget onPlayClick={playClick} />

      {/* Command Palette (Ctrl+K / Cmd+K) */}
      <CommandPalette
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onPlayClick={playClick}
      />
    </div>
  );
}
