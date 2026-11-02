import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/navigation/Navbar';
import { CustomCursor } from './components/shared/CustomCursor';
import { CinematicIntro } from './components/intro/CinematicIntro';
import { MeetVeeScene } from './components/character/MeetVeeScene';
import { DigitalIDCard } from './components/identity-card/DigitalIDCard';
import { NavigationDoors } from './components/doors/NavigationDoors';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ProjectGallery } from './components/projects/ProjectGallery';
import { AiPipelineSection } from './components/sections/AiPipelineSection';
import { ResearchSection } from './components/sections/ResearchSection';
import { LeadershipSection } from './components/sections/LeadershipSection';
import { AwardsSection } from './components/sections/AwardsSection';
import { LearningSection } from './components/sections/LearningSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/shared/Footer';
import { BackToTop } from './components/shared/BackToTop';
import { useSoundEffects } from './hooks/useSoundEffects';
import { useActiveSection } from './hooks/useActiveSection';

export default function App() {
  const [experienceStage, setExperienceStage] = useState<'intro' | 'vee' | 'id-card' | 'full'>('intro');
  const lenisRef = useRef<Lenis | null>(null);

  const {
    soundEnabled,
    toggleSound,
    playTypeClick,
    playWhoosh,
    playClick
  } = useSoundEffects();

  const sectionIds = [
    'home',
    'about',
    'skills',
    'experience',
    'projects',
    'ai-engineering',
    'research',
    'leadership',
    'contact'
  ];

  const activeSection = useActiveSection(sectionIds);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const scrollToElement = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnterExperience = () => {
    setExperienceStage('vee');
    setTimeout(() => scrollToElement('#meet-vee'), 100);
  };

  const handleSkipIntro = () => {
    setExperienceStage('full');
    setTimeout(() => scrollToElement('#about'), 100);
  };

  const handleContinueFromVee = () => {
    setExperienceStage('id-card');
    setTimeout(() => scrollToElement('#id-card-scene'), 100);
  };

  const handleExplorePortfolio = () => {
    setExperienceStage('full');
    setTimeout(() => scrollToElement('#doors'), 100);
  };

  const handleDoorNavigate = (targetSection: string) => {
    setExperienceStage('full');
    setTimeout(() => scrollToElement(targetSection), 100);
  };

  return (
    <div className="relative min-h-screen bg-[#101116] text-[#F5F1E9] selection:bg-[#9275FF]/30 selection:text-white">
      {/* Subtle Custom Kinetic Cursor (Desktop fine-pointer only) */}
      <CustomCursor />

      {/* Floating Glassmorphic Header */}
      <Navbar
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onPlayClick={playClick}
        activeSection={activeSection}
      />

      {/* Main Experience Stream */}
      <main id="home" className="relative z-10 pt-16">
        {/* Scene 01: Cinematic Opening */}
        <CinematicIntro
          onEnterExperience={handleEnterExperience}
          onSkipIntro={handleSkipIntro}
          onPlayClick={playClick}
        />

        {/* Scene 02: Meet VEE (Interactive Guide) */}
        {(experienceStage === 'vee' || experienceStage === 'id-card' || experienceStage === 'full') && (
          <MeetVeeScene
            onContinue={handleContinueFromVee}
            onSkip={handleSkipIntro}
            soundEnabled={soundEnabled}
            onToggleSound={toggleSound}
            onPlayTypeClick={playTypeClick}
            onPlayClick={playClick}
          />
        )}

        {/* Scene 03: Interactive 3D Digital Identity Card */}
        {(experienceStage === 'id-card' || experienceStage === 'full') && (
          <div id="id-card-scene" className="w-full py-12">
            <DigitalIDCard
              onExplorePortfolio={handleExplorePortfolio}
              onPlayClick={playClick}
              onPlayWhoosh={playWhoosh}
            />
          </div>
        )}

        {/* Scene 04: The Four Navigation Doors */}
        <NavigationDoors
          onNavigate={handleDoorNavigate}
          onPlayClick={playClick}
          onPlayWhoosh={playWhoosh}
        />

        {/* Section A: About Me */}
        <AboutSection />

        {/* Section B: Technical Skills */}
        <SkillsSection />

        {/* Section C: Experience */}
        <ExperienceSection />

        {/* Section D: Featured Projects */}
        <ProjectGallery />

        {/* Section E: AI and Engineering */}
        <AiPipelineSection />

        {/* Section F: Research and Publications */}
        <ResearchSection />

        {/* Section G: Leadership and Community */}
        <LeadershipSection />

        {/* Section H: Achievements and Awards */}
        <AwardsSection />

        {/* Section I: Current Learning Journey */}
        <LearningSection />

        {/* Section J: Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Back to Top Button */}
      <BackToTop onPlayClick={playClick} />
    </div>
  );
}
