"use client";

import { useEffect, useState, useRef, RefObject } from "react";

/**
 * Hook to detect whether the user prefers reduced motion.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return prefersReduced;
}

interface UseInViewOptions {
  threshold?: number | number[];
  rootMargin?: string;
  once?: boolean;
}

/**
 * IntersectionObserver hook to detect when an element is in view.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.15, rootMargin = "0px", once = true } = options;
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.unobserve(el);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isInView];
}

/**
 * Hook to track scroll progress (0 to 1) across a specific container element.
 */
export function useScrollProgress<T extends HTMLElement = HTMLElement>(): [
  RefObject<T | null>,
  number
] {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const el = ref.current;
          if (!el) {
            ticking = false;
            return;
          }

          const rect = el.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const totalHeight = rect.height;

          // Compute how far the element has progressed through the viewport
          const current = windowHeight - rect.top;
          const range = totalHeight + windowHeight;
          const p = Math.min(Math.max(current / range, 0), 1);

          setProgress(p);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return [ref, progress];
}
