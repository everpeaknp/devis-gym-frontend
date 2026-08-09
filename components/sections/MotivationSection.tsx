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

    const ctx = gsap.context(() => {
      // Single shared ScrollTrigger driving all three lines in lockstep, no scrub lag
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          refreshPriority: -1,
        },
      });

      tl.fromTo(line1Ref.current, { x: "30%" }, { x: "-30%", ease: "none" }, 0)
        .fromTo(line2Ref.current, { x: "-30%" }, { x: "30%", ease: "none" }, 0)
        .fromTo(line3Ref.current, { x: "30%" }, { x: "-30%", ease: "none" }, 0);
    });

    return () => {
      ctx.revert();
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
