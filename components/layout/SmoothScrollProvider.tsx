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
  const tickerCallbackRef = useRef<((time: number) => void) | null>(null);
  const cleanedUpRef = useRef(false);

  useEffect(() => {
    // Prevent multiple instances
    if (lenisRef.current) {
      console.warn("[SmoothScroll] Instance already exists, skipping");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    cleanedUpRef.current = false;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Skip smooth scroll on mobile Safari for better performance
    const isMobileSafari = /iPhone|iPad|iPod/.test(navigator.userAgent) && !/(CriOS|FxiOS|OPiOS|mercury)/i.test(navigator.userAgent);
    
    if (prefersReducedMotion || isMobileSafari) {
      console.log("[SmoothScroll] Skipped - reduced motion or mobile Safari");
      return;
    }

    console.log("[SmoothScroll] Initializing");

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
      syncTouch: false,
    });
    lenisRef.current = lenis;

    // Expose lenis globally
    (window as unknown as { lenis: Lenis }).lenis = lenis;
    window.dispatchEvent(new Event("lenis:ready"));

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      if (lenisRef.current && !cleanedUpRef.current) {
        lenisRef.current.raf(time * 1000);
      }
    };
    tickerCallbackRef.current = tickerCallback;
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Delayed refresh for initial layout
    const refreshTimeout = window.setTimeout(() => {
      if (!cleanedUpRef.current) {
        ScrollTrigger.refresh();
      }
    }, 300);

    const onLoad = () => {
      if (!cleanedUpRef.current) {
        ScrollTrigger.refresh();
      }
    };
    window.addEventListener("load", onLoad);

    console.log("[SmoothScroll] Initialized");

    return () => {
      console.log("[SmoothScroll] Cleanup started");
      cleanedUpRef.current = true;

      window.clearTimeout(refreshTimeout);
      window.removeEventListener("load", onLoad);

      if (tickerCallbackRef.current) {
        gsap.ticker.remove(tickerCallbackRef.current);
        tickerCallbackRef.current = null;
      }

      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }

      (window as unknown as { lenis: Lenis | null }).lenis = null;
      console.log("[SmoothScroll] Cleanup complete");
    };
  }, []);

  return <>{children}</>;
}
