"use client";

import React from "react";
import { Navigation } from "@/components/Navigation";
import { InteractiveLamp } from "@/components/ui/InteractiveLamp";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { InteractiveDoors } from "@/components/sections/InteractiveDoors";
import { Skills } from "@/components/sections/Skills";
import { Work } from "@/components/sections/Work";
import { Certifications } from "@/components/sections/Certifications";
import { Experience } from "@/components/sections/Experience";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { RevealObserver } from "@/components/ui/RevealObserver";

export function App() {
  return (
    <div className="relative min-h-screen bg-[var(--paper)] text-[var(--ink)] overflow-x-clip transition-colors duration-500">
      <RevealObserver />
      <InteractiveLamp />
      <Navigation />
      <main>
        <Hero />
        <About />
        <InteractiveDoors />
        <Skills />
        <Work />
        <Certifications />
        <Experience />
        <Achievements />
        <Contact />
      </main>
    </div>
  );
}
