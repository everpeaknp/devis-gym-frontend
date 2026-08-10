"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "span";
  delay?: number;
  y?: number;
};

export default function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  y = 32,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, y]);

  const Tag = as;
  return (
    <Tag ref={ref as never} className={clsx("opacity-0", className)}>
      {children}
    </Tag>
  );
}
