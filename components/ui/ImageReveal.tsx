"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

type ImageRevealProps = {
  children: React.ReactNode;
  className?: string;
  parallax?: boolean;
};

export default function ImageReveal({
  children,
  className,
  parallax = false,
}: ImageRevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(wrap, { clipPath: "inset(0% 0% 0% 0%)" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrap,
        { clipPath: "inset(8% 8% 8% 8%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: wrap,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        inner,
        { scale: 1.25 },
        {
          scale: 1,
          duration: 1.6,
          ease: "power4.out",
          scrollTrigger: {
            trigger: wrap,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      if (parallax) {
        gsap.to(inner, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }
    }, wrap);

    return () => ctx.revert();
  }, [parallax]);

  return (
    <div ref={wrapRef} className={clsx("overflow-hidden", className)}>
      <div ref={innerRef} className="h-full w-full">
        {children}
      </div>
    </div>
  );
}
