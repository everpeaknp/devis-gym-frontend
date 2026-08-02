"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { AnimatedLayerButton } from "@/components/ui/AnimatedLayerButton";
import { businessData } from "@/data/business";
import HeroScrollSequence from "./HeroScrollSequence";

export default function Hero() {
  const heroSectionRef = useRef<HTMLElement>(null);
  const logoCircleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top on mount to ensure first frame is visible
    window.scrollTo(0, 0);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
          ".hero-line",
          { yPercent: 110 },
          { yPercent: 0, duration: 1, stagger: 0.12 }
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          "-=0.4"
        )
        // Add arrow SVG animation first
        .fromTo(
          ".hero-arrow",
          { x: -300, opacity: 0 },
          { 
            x: 0, 
            opacity: 1,
            duration: 1.2,
            ease: "power3.out" 
          },
          "-=0.2"
        )
        // Add hero image animation after arrow
        .fromTo(
          ".hero-image",
          { x: -400, opacity: 0 },
          { 
            x: 0, 
            opacity: (i) => [1, 0.7, 0.4, 0.2][i], // Set proper opacity for each image
            duration: 1.5, 
            stagger: 0.15, // Animate from left to right with stagger
            ease: "power3.out" 
          },
          "-=0.5" // Start images 0.5s before arrow finishes
        );
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  // Rotate logo circle on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (logoCircleRef.current) {
        const scrollY = window.scrollY;
        const rotation = scrollY * 0.15; // Rotation speed
        logoCircleRef.current.style.transform = `rotate(${rotation}deg)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={heroSectionRef}
      id="home"
      className="relative flex w-full flex-col justify-end bg-background pt-[60px] sm:pt-[80px] md:pt-[92px]"
      style={{ 
        minHeight: '100dvh', // Dynamic viewport height for mobile
        overflow: 'visible',
        zIndex: 50
      }}
    >
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/equipment/main.jpg"
          alt="Devi's Gym interior"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
      </div>
      
      {/* Dark overlay for text readability - stronger on mobile */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50 sm:from-black/80 sm:via-black/60 sm:to-black/40"
        style={{ zIndex: 2 }}
      />
      
      {/* Bottom black opacity gradient */}
      <div 
        className="absolute inset-0"
        style={{
          zIndex: 3,
          background: 'linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.7) 85%, rgba(0,0,0,0.95) 100%)'
        }}
      />

      <div className="container-edge relative pb-6 pt-4 xs:pb-8 xs:pt-6 sm:pb-12 sm:pt-16 md:pb-16 md:pt-24 lg:pb-20 lg:pt-32 xl:pt-40" style={{ zIndex: 30 }}>
        <div className="grid gap-6 xs:gap-8 sm:gap-8 lg:grid-cols-2 lg:gap-8 items-center -mt-32 xs:-mt-36 sm:-mt-32 md:-mt-40 lg:-mt-48 xl:-mt-56">
          {/* Mobile Layout - Logo and Title at top left */}
          <div className="flex flex-col lg:hidden order-1">
            <h1 className="font-display flex flex-col text-[clamp(3rem,15vw,4rem)] font-extrabold uppercase leading-[0.8] tracking-tight relative mb-6">
              {/* Devi's in pure white */}
              <span className="overflow-hidden">
                <span className="hero-line block text-white">Devi&apos;s</span>
              </span>

              {/* Gym with yellow accent */}
              <span className="overflow-hidden">
                <span className="hero-line block text-accent">Gym</span>
              </span>
            </h1>
          </div>

          {/* Mobile Layout - Training Image */}
          <div className="relative h-[300px] w-full overflow-visible order-2 lg:hidden">
            <div className="hero-image absolute top-0 left-1/2 -translate-x-1/2 h-full w-[250px]">
              <Image
                src="/hero/training-person.webp"
                alt="Training at Devi's Gym"
                fill
                priority
                className="object-contain pointer-events-none"
                sizes="250px"
              />
            </div>
          </div>

          {/* Mobile Layout - Buttons */}
          <div className="flex flex-col gap-4 order-3 lg:hidden">
            <div className="flex flex-row gap-3 justify-center">
              <span className="hero-cta">
                <button className="bg-accent text-black px-5 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-accent/90 transition-colors rounded-sm">
                  Join the Gym
                </button>
              </span>
              <span className="hero-cta">
                <button className="bg-transparent border border-white text-white px-5 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-white hover:text-black transition-colors rounded-sm">
                  See the Gym
                </button>
              </span>
            </div>
          </div>

          {/* Mobile Layout - Tagline */}
          <div className="flex justify-center order-4 lg:hidden mt-4">
            <p className="hero-line text-muted text-xs uppercase tracking-[0.2em] font-bold text-center">
              Train. Fuel. Repeat.
            </p>
          </div>

          {/* Desktop Layout - Left Column - Title and Buttons */}
          <div className="hidden lg:flex flex-col justify-center order-2 lg:order-1 px-2 xs:px-0">
            <h1 className="font-display flex flex-col text-[clamp(2rem,11vw,12rem)] xs:text-[clamp(2.3rem,11.5vw,12rem)] sm:text-[clamp(3rem,14vw,12rem)] md:text-[clamp(4rem,16vw,12rem)] font-extrabold uppercase leading-[0.82] xs:leading-[0.84] sm:leading-[0.85] tracking-tight relative mb-4 xs:mb-5 sm:mb-6 md:mb-8">
              {/* Devi's in pure white */}
              <span className="overflow-hidden">
                <span className="hero-line block text-white">Devi&apos;s</span>
              </span>

              {/* Gym with yellow accent */}
              <span className="overflow-hidden">
                <span className="hero-line block text-accent">Gym</span>
              </span>
            </h1>

            {/* Hero Buttons */}
            <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-center md:gap-8">
              <div className="flex flex-row gap-3 sm:gap-4 xs:ml-0 sm:ml-0 md:ml-16">
                <span className="hero-cta">
                  <button className="bg-accent text-black px-4 py-2.5 xs:px-5 xs:py-3 sm:px-6 text-sm xs:text-sm sm:text-base font-semibold uppercase tracking-wide hover:bg-accent/90 transition-colors rounded-sm">
                    Join the Gym
                  </button>
                </span>
                <span className="hero-cta">
                  <button className="bg-transparent border border-white text-white px-4 py-2.5 xs:px-5 xs:py-3 sm:px-6 text-sm xs:text-sm sm:text-base font-semibold uppercase tracking-wide hover:bg-white hover:text-black transition-colors rounded-sm">
                    See the Gym
                  </button>
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Right Column - Person Training Image */}
          <div className="hidden lg:block relative h-[150px] xs:h-[180px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full overflow-visible order-1 lg:order-2">
            {/* Arrow SVG behind images on the right - hidden on mobile and tablet */}
            <div className="hero-arrow absolute right-[2%] top-1/2 -translate-y-1/2 translate-y-4 w-[60%] h-auto pointer-events-none -z-10 hidden lg:block">
              <Image
                src="/icons/arrow-right.svg"
                alt=""
                width={400}
                height={100}
                className="w-full h-auto opacity-15"
                loading="lazy"
              />
            </div>

            {/* 4 copies of the same image with decreasing size and opacity from right to left - hidden on small screens */}
            {[0, 1, 2, 3].map((index) => {
              const sizes = [
                'w-[200px] xs:w-[240px] sm:w-[350px] md:w-[420px] lg:w-[520px] h-full', // Biggest
                'w-[160px] xs:w-[190px] sm:w-[280px] md:w-[340px] lg:w-[420px] h-[85%]', // Medium
                'w-[120px] xs:w-[140px] sm:w-[200px] md:w-[260px] lg:w-[320px] h-[70%]', // Small
                'w-[80px] xs:w-[100px] sm:w-[150px] md:w-[200px] lg:w-[250px] h-[55%]'  // Smallest
              ];
              const opacities = [1, 0.7, 0.4, 0.2];
              
              return (
                <div
                  key={index}
                  className={`hero-image absolute top-0 ${sizes[index]} hidden xs:block`}
                  style={{
                    left: `${15 - (index * 12)}%`, // Adjusted positioning for mobile
                    top: index === 1 ? '7.5%' : index === 2 ? '15%' : index === 3 ? '22.5%' : '0%',
                    zIndex: 10 - index,
                    opacity: opacities[index]
                  }}
                >
                  <Image
                    src="/hero/training-person.webp"
                    alt="Training at Devi's Gym"
                    fill
                    priority={index === 0} // Only prioritize the main/largest image
                    className="object-contain pointer-events-none"
                    sizes={`(min-width: 1024px) ${520 - (index * 100)}px, (min-width: 768px) ${420 - (index * 80)}px, (min-width: 640px) ${350 - (index * 70)}px, ${240 - (index * 50)}px`}
                  />
                </div>
              );
            })}
            
            {/* Single image for very small screens */}
            <div className="hero-image absolute top-0 h-full w-[140px] xs:w-[180px] right-2 xs:hidden">
              <Image
                src="/hero/training-person.webp"
                alt="Training at Devi's Gym"
                fill
                priority
                className="object-contain pointer-events-none"
                sizes="180px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tagline above down arrow - Desktop only */}
      <div className="relative z-10 hidden lg:flex justify-center pb-4 xs:pb-5 sm:pb-6 md:pb-8 -mt-8 xs:-mt-10 sm:-mt-8 md:-mt-12 lg:-mt-16 xl:-mt-20" style={{ zIndex: 30 }}>
        <p className="hero-line text-muted text-[10px] xs:text-xs sm:text-sm md:text-base uppercase tracking-[0.15em] xs:tracking-[0.2em] sm:tracking-[0.3em] font-bold text-center px-4">
          Train. Fuel. Repeat.
        </p>
      </div>

      <div className="relative z-10 flex justify-center pb-4 xs:pb-6 sm:pb-8 md:pb-12 -mt-2 xs:-mt-3 sm:-mt-2 md:-mt-4 lg:-mt-6" style={{ zIndex: 30 }}>
        <a
          href="#frames"
          aria-label="Scroll to next section"
          className="relative flex items-center justify-center w-6 h-6 xs:w-7 xs:h-7 sm:w-4 sm:h-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-bounce text-muted-dim transition-colors hover:text-accent hover:bg-white/20 motion-reduce:animate-none"
        >
          <ChevronDown size={14} className="xs:w-4 xs:h-4 sm:w-4 sm:h-4" />
        </a>
      </div>
    </section>
  );
}