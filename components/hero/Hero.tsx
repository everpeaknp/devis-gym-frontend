"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { AnimatedLayerButton } from "@/components/ui/AnimatedLayerButton";
import { businessData } from "@/data/business";
import HeroScrollSequence from "./HeroScrollSequence";

// Hero media data
const heroMedia = [
  { type: 'video', src: '/hero/135161-761273563_medium.mp4' },
  { type: 'image', src: '/hero/Untitled-design-2026-04-02T110204.155.jpg' },
  { type: 'video', src: '/hero/143431-782373969_medium.mp4' },
  { type: 'image', src: '/hero/Untitled-design-2026-04-02T110712.060.jpg' },
  { type: 'video', src: '/hero/200657-913478674_medium.mp4' },
  { type: 'image', src: '/hero/Untitled-design-2026-04-02T111150.046.jpg' },
  { type: 'video', src: '/hero/27088-361827441_medium.mp4' },
  { type: 'image', src: '/hero/Untitled-design-2026-04-02T113009.615.jpg' },
  { type: 'video', src: '/hero/293079_medium.mp4' },
  { type: 'image', src: '/hero/Untitled-design-2026-04-02T113302.665.jpg' },
];

export default function Hero() {
  const heroSectionRef = useRef<HTMLElement>(null);
  const logoCircleRef = useRef<HTMLDivElement>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMediaIndex((prev) => (prev + 1) % heroMedia.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

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
      className="relative flex w-full flex-col justify-center bg-background pt-[60px] sm:pt-[80px] md:pt-[92px]"
      style={{ 
        minHeight: '100dvh', // Dynamic viewport height for mobile
        overflow: 'hidden',
        zIndex: 50
      }}
    >
      {/* Background Media Slider */}
      <div className="absolute inset-0">
        {heroMedia.map((media, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentMediaIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {media.type === 'video' ? (
              <video
                src={media.src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                preload="metadata"
              />
            ) : (
              <Image
                src={media.src}
                alt="Devi's Gym"
                fill
                className="object-cover"
                sizes="100vw"
                quality={85}
                priority={index === 0}
              />
            )}
          </div>
        ))}
      </div>
      
      {/* Dark overlay for text readability */}
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

      {/* Content Container */}
      <div className="container-edge relative flex flex-col justify-center min-h-[calc(100vh-60px)] sm:min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-92px)]" style={{ zIndex: 30 }}>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column - Title and Buttons */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            <h1 className="font-display flex flex-col text-[clamp(3rem,15vw,8rem)] font-extrabold uppercase leading-[0.8] tracking-tight relative mb-8">
              {/* Devi's in pure white */}
              <span className="overflow-hidden">
                <span className="hero-line block text-white">Devi&apos;s</span>
              </span>

              {/* Gym with yellow accent */}
              <span className="overflow-hidden">
                <span className="hero-line block text-accent">Gym</span>
              </span>
            </h1>

            {/* Tagline */}
            <p className="hero-line text-muted text-sm uppercase tracking-[0.2em] font-bold mb-8">
              Train. Fuel. Repeat.
            </p>

            {/* Hero Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <span className="hero-cta">
                <button className="bg-accent text-black px-8 py-4 text-base font-semibold uppercase tracking-wide hover:bg-accent/90 transition-colors rounded-sm w-full sm:w-auto">
                  Join the Gym
                </button>
              </span>
              <span className="hero-cta">
                <button className="bg-transparent border border-white text-white px-8 py-4 text-base font-semibold uppercase tracking-wide hover:bg-white hover:text-black transition-colors rounded-sm w-full sm:w-auto">
                  See the Gym
                </button>
              </span>
            </div>
          </div>

          {/* Right Column - Slider Indicators */}
          <div className="flex justify-center lg:justify-end">
            <div className="flex flex-col gap-2">
              <p className="text-white/60 text-xs uppercase tracking-wider mb-4 text-center lg:text-right">
                Media {currentMediaIndex + 1} of {heroMedia.length}
              </p>
              <div className="flex flex-row lg:flex-col gap-2">
                {heroMedia.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMediaIndex(index)}
                    className={`w-2 h-8 lg:w-8 lg:h-2 rounded-full transition-all duration-300 ${
                      index === currentMediaIndex 
                        ? 'bg-accent' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2" style={{ zIndex: 30 }}>
        <a
          href="#frames"
          aria-label="Scroll to next section"
          className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-bounce text-muted-dim transition-colors hover:text-accent hover:bg-white/20 motion-reduce:animate-none"
        >
          <ChevronDown size={16} />
        </a>
      </div>
    </section>
  );
}