"use client";

import React, { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false); // Video interaction state

  // Video autoplay & sound handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Initial attempt to play with sound
    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch(() => {
          // Autoplay with sound was blocked by browser policy -> fall back to muted
          video.muted = true;
          video.play().then(() => {
            setIsPlaying(true);
            setIsMuted(true);
          }).catch(() => {
            setIsPlaying(false);
          });
        });
    }

    // Unlock sound on first user gesture (pointerdown, keydown, touchend)
    const unlockSound = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        setIsMuted(false);
        setUserInteracted(true);
      }
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("keydown", unlockSound);
      window.removeEventListener("touchend", unlockSound);
    };

    window.addEventListener("pointerdown", unlockSound, { once: true });
    window.addEventListener("keydown", unlockSound, { once: true });
    window.addEventListener("touchend", unlockSound, { once: true });

    return () => {
      removeListeners();
    };
  }, []);

  // IntersectionObserver to pause video when less than 35% of the hero is visible
  useEffect(() => {
    const heroEl = sectionRef.current;
    const video = videoRef.current;
    if (!heroEl || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.35) {
          if (!video.paused) {
            video.pause();
            setIsPlaying(false);
          }
        } else {
          if (video.paused) {
            video.play().then(() => {
              setIsPlaying(true);
            }).catch(() => {});
          }
        }
      },
      {
        threshold: [0, 0.35, 1.0],
      }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      setIsMuted(false);
      setUserInteracted(true);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[var(--paper)] text-[var(--ink)] transition-colors duration-500"
    >
      {/* Giant outlined ghost word behind the person */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0 flex items-center justify-center w-full"
        aria-hidden="true"
      >
        <span
          className="font-black text-[28vw] md:text-[23vw] tracking-tighter leading-none text-transparent uppercase opacity-80"
          style={{
            WebkitTextStroke: "1.5px var(--line)",
          }}
        >
          {PROFILE.firstName}
        </span>
      </div>

      {/* Main Content Area: Video in center, typography overlay */}
      <div className="relative max-w-[1320px] w-full mx-auto px-[clamp(18px,4vw,64px)] flex-1 flex flex-col md:flex-row items-center justify-center">
        {/* Center Video Container */}
        <div className="relative flex items-center justify-center w-full max-w-[540px] md:max-w-[620px] lg:max-w-[720px] my-auto">
          <div
            className="relative w-full aspect-[768/960] max-h-[62svh] md:max-h-[min(94svh,1000px)] flex items-center justify-center"
          >
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="auto"
              poster="/portrait-bust.webp"
              className="w-full h-full object-contain pointer-events-none dark:mix-blend-normal mix-blend-multiply"
            >
              <source src="/hero/hero.webm" type="video/webm" />
              <source src="/hero/hero.mp4" type="video/mp4" />
              Your browser does not support video.
            </video>
          </div>

          {/* Sound control button: 46px round, solid ink, no text */}
          <div className="absolute bottom-4 right-4 z-20">
            <button
              onClick={toggleSound}
              aria-label={isMuted ? "Unmute intro video audio" : "Mute intro video audio"}
              className="relative w-[46px] h-[46px] rounded-full bg-[var(--ink)] text-[var(--paper)] flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              {isMuted && !userInteracted && (
                <span
                  className="absolute inset-0 rounded-full border border-[var(--line)] animate-ping pointer-events-none"
                  aria-hidden="true"
                />
              )}
              {isMuted ? (
                // Play triangle (Sound off)
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                // Two bars (Sound on)
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Hero Info Bar & CTAs */}
      <div className="relative max-w-[1320px] w-full mx-auto px-[clamp(18px,4vw,64px)] mt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-[var(--line)] pt-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--mute)] mb-1">
              {PROFILE.name} · {PROFILE.location.split(",")[0]}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.045em] text-[var(--ink)]">
              {PROFILE.role.split(" ")[0]}{" "}
              <span className="font-serif italic font-normal text-[var(--mute)]">
                {PROFILE.role.split(" ").slice(1).join(" ") || "Developer"}.
              </span>
            </h1>
          </div>

          {/* Action CTAs: Explore work, Let's talk, Résumé ↓ */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollToTarget("#work", -40)}
              className="btn-primary"
            >
              Explore work
            </button>
            <button
              onClick={() => scrollToTarget("#contact", -40)}
              className="btn-secondary"
            >
              Let&apos;s talk
            </button>
            <a
              href={PROFILE.resumePath}
              download="Veera_Vaishnavi_K_Resume.pdf"
              className="btn-secondary font-mono text-xs"
              aria-label="Download résumé PDF"
            >
              Résumé ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
