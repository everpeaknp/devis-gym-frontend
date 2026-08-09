"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cldOptimize } from "@/lib/cloudinary";

gsap.registerPlugin(ScrollTrigger);

export default function KickstartSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const outlineTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !imageContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Full image container moves from left to right
      gsap.fromTo(
        imageContainerRef.current,
        { 
          x: "-100%",
        },
        {
          x: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        }
      );

      // Subtle outline fade during scroll
      if (outlineTextRef.current) {
        gsap.fromTo(
          outlineTextRef.current,
          { opacity: 0 },
          {
            opacity: 0.6,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "top 30%",
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const textStyles = {
    fontFamily: "Trimpostercompressed, Arial, sans-serif",
    fontStyle: "normal" as const,
    fontWeight: 900,
    fontSize: "clamp(60px, 12vw, 282px)",
    lineHeight: "0.85",
    letterSpacing: "-0.05em",
  };

  return (
    <section 
      ref={sectionRef} 
      className="hidden md:block relative bg-black pt-20 md:pt-32 pb-12 md:pb-16 overflow-hidden min-h-[120vh]"
    >
      <div className="container-edge relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left: Typography with image knockout */}
          <div className="relative max-w-none min-h-[600px]">
            
            <div className="relative">
              
              {/* Base Layer: Solid Filled Text */}
              <div className="relative z-20">
                <h2 
                  className="font-bold uppercase"
                  style={textStyles}
                >
                  <span className="block text-white whitespace-nowrap">READY TO</span>
                  <span className="block text-white">KICKSTART</span>
                  <span className="block whitespace-nowrap" style={{ color: "#c7ff3d" }}>YOUR FITNESS</span>
                  <span className="block" style={{ color: "#c7ff3d" }}>JOURNEY?</span>
                </h2>
              </div>

              {/* Moving Image Container - cuts through text */}
              <div 
                ref={imageContainerRef}
                className="absolute inset-0 z-30 pointer-events-none"
                style={{
                  willChange: "transform",
                  transform: "translate3d(0, 0, 0)",
                }}
              >
                {/* Full visible image */}
                <div className="absolute inset-0 flex items-center justify-center pl-64 md:pl-80 lg:pl-96">
                  <Image
                    src={cldOptimize("https://res.cloudinary.com/ufiebboc/image/upload/v1786268837/devis-gym/hero/man.webp", 1400)}
                    alt=""
                    width={1600}
                    height={2400}
                    className="object-contain"
                    style={{
                      height: "140%",
                      width: "auto",
                      maxWidth: "none",
                      transform: "scale(1.4)",
                    }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                    quality={75}
                    aria-hidden="true"
                  />
                </div>

                {/* Text mask that makes text transparent where image is */}
                <div 
                  className="absolute inset-0"
                  style={{
                    WebkitMaskImage: "url('#text-mask')",
                    maskImage: "url('#text-mask')",
                    WebkitMaskSize: "100% 100%",
                    maskSize: "100% 100%",
                    backgroundColor: "black",
                    mixBlendMode: "destination-out" as any,
                  }}
                >
                  <h2 
                    className="font-bold uppercase"
                    style={{
                      ...textStyles,
                      color: "white",
                    }}
                    aria-hidden="true"
                  >
                    <span className="block whitespace-nowrap">READY TO</span>
                    <span className="block">KICKSTART</span>
                    <span className="block whitespace-nowrap">YOUR FITNESS</span>
                    <span className="block">JOURNEY?</span>
                  </h2>
                </div>
              </div>

              {/* Fixed Text Stroke Border - stays in place */}
              <div className="absolute inset-0 z-35 pointer-events-none">
                <h2 
                  className="font-bold uppercase"
                  style={{
                    ...textStyles,
                    WebkitTextStroke: "2px rgba(255, 255, 255, 0.8)",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                    textShadow: "0 0 30px rgba(255, 255, 255, 0.3)",
                  }}
                  aria-hidden="true"
                >
                  <span className="block whitespace-nowrap">READY TO</span>
                  <span className="block">KICKSTART</span>
                  <span 
                    className="block whitespace-nowrap"
                    style={{ 
                      WebkitTextStroke: "2px rgba(199, 255, 61, 0.9)",
                      textShadow: "0 0 30px rgba(199, 255, 61, 0.4)",
                    }}
                  >
                    YOUR FITNESS
                  </span>
                  <span 
                    className="block"
                    style={{ 
                      WebkitTextStroke: "2px rgba(199, 255, 61, 0.9)",
                      textShadow: "0 0 30px rgba(199, 255, 61, 0.4)",
                    }}
                  >
                    JOURNEY?
                  </span>
                </h2>
              </div>

              {/* Outline Layer */}
              <div 
                ref={outlineTextRef}
                className="absolute inset-0 z-40 pointer-events-none opacity-0"
              >
                <h2 
                  className="font-bold uppercase"
                  style={{
                    ...textStyles,
                    WebkitTextStroke: "1px rgba(255, 255, 255, 0.4)",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                  aria-hidden="true"
                >
                  <span className="block whitespace-nowrap">READY TO</span>
                  <span className="block">KICKSTART</span>
                  <span 
                    className="block whitespace-nowrap" 
                    style={{ WebkitTextStroke: "1px rgba(199, 255, 61, 0.4)" }}
                  >
                    YOUR FITNESS
                  </span>
                  <span style={{ WebkitTextStroke: "1px rgba(199, 255, 61, 0.4)" }} className="block">
                    JOURNEY?
                  </span>
                </h2>
              </div>

            </div>

            <h2 className="sr-only">Ready to Kickstart Your Fitness Journey?</h2>
          </div>

          {/* Right: Empty */}
          <div className="hidden lg:block" />

        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
