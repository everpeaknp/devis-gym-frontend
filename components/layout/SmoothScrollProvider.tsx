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
    // TEMPORARILY DISABLED TO TEST CLICKING
    return;
    
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    
    // Expose lenis globally for other components to access
    (window as any).lenis = lenis;

    lenis.on("scroll", (e) => {
      ScrollTrigger.update();
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    // Additional ScrollTrigger refresh for better integration
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      lenis.destroy();
      (window as any).lenis = null;
      gsap.ticker.remove(() => {});
    };
  }, []);

  return <>{children}</>;
}
