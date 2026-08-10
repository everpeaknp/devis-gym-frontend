"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.5,
      touchMultiplier: 2,
      infinite: false,
    });
    lenisRef.current = lenis;

    // Expose lenis globally so other components (e.g. anchor links) can call lenis.scrollTo
    (window as unknown as { lenis: Lenis }).lenis = lenis;
    // Effects in child components can run before this one (React fires effects
    // bottom-up), so anything that needs window.lenis on its own first mount
    // can't rely on it existing yet — this event lets them react once it does.
    window.dispatchEvent(new Event("lenis:ready"));

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Let pinned/scrubbed sections (e.g. HeroScrollSequence) recalc against Lenis-driven scroll
    const refreshTimeout = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.clearTimeout(refreshTimeout);
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      (window as unknown as { lenis: Lenis | null }).lenis = null;
    };
  }, []);

  return <>{children}</>;
}
