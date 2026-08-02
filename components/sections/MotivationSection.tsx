"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MotivationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Dual approach: ScrollTrigger + direct scroll listener
    const ctx = gsap.context(() => {
      // ScrollTrigger animations
      // Line 1 - moves from right to left on scroll
      gsap.fromTo(
        line1Ref.current,
        { x: "30%" },
        {
          x: "-30%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            refreshPriority: -1,
          },
        }
      );

      // Line 2 - moves from left to right on scroll
      gsap.fromTo(
        line2Ref.current,
        { x: "-30%" },
        {
          x: "30%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            refreshPriority: -1,
          },
        }
      );

      // Line 3 - moves from right to left on scroll
      gsap.fromTo(
        line3Ref.current,
        { x: "30%" },
        {
          x: "-30%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            refreshPriority: -1,
          },
        }
      );
    });

    // Direct scroll listener as fallback
    const handleScroll = () => {
      if (!sectionRef.current || !line1Ref.current || !line2Ref.current || !line3Ref.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress through the section
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)));

      // Apply transforms based on scroll progress
      const line1Movement = 30 - (60 * progress); // 30% to -30% (moves left)
      const line2Movement = -30 + (60 * progress); // -30% to 30% (moves right)
      const line3Movement = 30 - (60 * progress); // 30% to -30% (moves left)

      gsap.set(line1Ref.current, { x: `${line1Movement}%` });
      gsap.set(line2Ref.current, { x: `${line2Movement}%` });
      gsap.set(line3Ref.current, { x: `${line3Movement}%` });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#121212] py-24 md:py-32 overflow-hidden">
      <div className="container-edge">
        <div className="flex flex-col gap-8 md:gap-12">
          {/* Line 1 - Center aligned, moves right */}
          <div ref={line1Ref} className="text-center">
            <h2 
              className="text-[#f5f5f5] leading-none"
              style={{
                fontFamily: '"Pilat Condensed", sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(36px, 6vw, 75px)',
              }}
            >
              YOUR COUCH IS VERY
            </h2>
          </div>

          {/* Line 2 - Center aligned, moves left */}
          <div ref={line2Ref} className="text-center">
            <h2 
              className="text-[#f5f5f5] leading-none whitespace-nowrap"
              style={{
                fontFamily: '"Pilat Condensed", sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(36px, 6vw, 75px)',
              }}
            >
              TASTIER IF YOU ADD IT
            </h2>
          </div>

          {/* Line 3 - Center aligned, moves right */}
          <div ref={line3Ref} className="text-center">
            <h2 
              className="text-[#f5f5f5] leading-none"
              style={{
                fontFamily: '"Pilat Condensed", sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(36px, 6vw, 75px)',
              }}
            >
              EXHAUSTED LIES
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
