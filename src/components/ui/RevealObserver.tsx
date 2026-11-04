"use client";

import { useEffect } from "react";

/**
 * Global observer that observes elements with .rv and .rv-mask.
 * Adds .is-in once when they scroll into view.
 */
export function RevealObserver() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      document.querySelectorAll(".rv, .rv-mask").forEach((el) => {
        el.classList.add("is-in");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const observeAll = () => {
      document.querySelectorAll(".rv:not(.is-in), .rv-mask:not(.is-in)").forEach((el) => {
        observer.observe(el);
      });
    };

    observeAll();

    // Re-observe if DOM nodes are added dynamically
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}

