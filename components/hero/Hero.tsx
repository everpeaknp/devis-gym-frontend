"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { AnimatedLayerButton } from "@/components/ui/AnimatedLayerButton";
import { businessData } from "@/data/business";
import HeroScrollSequence from "./HeroScrollSequence";
import { Gauge } from "@/components/ui/gauge-1";

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
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef<number>();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Preload and prepare videos for smooth playback
  useEffect(() => {
    const videos = videoRefs.current;
    
    // Preload all videos
    videos.forEach((video, index) => {
      if (video && heroMedia[index]?.type === 'video') {
        video.load(); // Reload to ensure it's properly loaded
        
        // Set video to ready state
        video.addEventListener('canplaythrough', () => {
          if (index === currentMediaIndex && video.paused) {
            video.currentTime = 0;
            video.play().catch(console.warn);
          }
        });
      }
    });
  }, []);

  // Handle video playback when slide changes
  useEffect(() => {
    const videos = videoRefs.current;
    
    videos.forEach((video, index) => {
      if (video && heroMedia[index]?.type === 'video') {
        if (index === currentMediaIndex) {
          // Play current video
          video.currentTime = 0;
          video.play().catch(console.warn);
        } else {
          // Pause other videos
          video.pause();
        }
      }
    });
  }, [currentMediaIndex]);

  // Auto-advance slider with progress
  useEffect(() => {
    const slideInterval = 5000; // 5 seconds per slide
    
    const updateProgress = () => {
      if (!isPaused) {
        setElapsedTime(prev => {
          const newElapsed = prev + 100; // Add 100ms
          const newProgress = Math.min((newElapsed / slideInterval) * 100, 100);
          setProgress(newProgress);
          
          if (newElapsed >= slideInterval) {
            setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % heroMedia.length);
            return 0; // Reset elapsed time
          }
          
          return newElapsed;
        });
      }
    };

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Start new interval
    intervalRef.current = setInterval(updateProgress, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

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
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentMediaIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {media.type === 'video' ? (
              <video
                ref={(el) => {
                  if (el) videoRefs.current[index] = el;
                }}
                src={media.src}
                autoPlay={index === currentMediaIndex}
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                preload="auto"
                style={{
                  objectFit: 'cover',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)' // Hardware acceleration
                }}
              />
            ) : (
              <Image
                src={media.src}
                alt="Devi's Gym"
                fill
                className="object-cover"
                sizes="100vw"
                quality={85}
                priority={index <= 2} // Preload first 3 images
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

            {/* Tagline - Mobile/Tablet only */}
            <p className="hero-line text-muted text-sm uppercase tracking-[0.2em] font-bold mb-8 lg:hidden">
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

          {/* Right Column - Empty space for balance */}
          <div className="hidden lg:block">
            {/* Empty space to balance the layout */}
          </div>
        </div>
      </div>

      {/* Current Slide Indicator with Progress - Bottom Right Corner */}
      <div 
        className="absolute bottom-4 right-2 sm:right-3 lg:right-4 z-40 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative group">
          {/* Progress Gauge */}
          <Gauge
            value={progress}
            size={32}
            primary="#c7ff3d"
            showValue={false}
            showPercentage={false}
            gradient={true}
            glowEffect={true}
            transition={{ length: 100, delay: 0 }}
            className="text-white"
          />
          
          {/* Slide Number / Pause Icon - Centered over gauge */}
          <div className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-bold">
            {isPaused ? (
              // Small pause icon (two vertical lines)
              <div className="flex gap-0.5">
                <div className="w-0.5 h-1 bg-white/80"></div>
                <div className="w-0.5 h-1 bg-white/80"></div>
              </div>
            ) : (
              // Slide number - smaller size
              <span className="leading-none">{currentMediaIndex + 1}</span>
            )}
          </div>
          
          {/* Hover tooltip */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {isPaused ? 'Paused' : 'Hover to pause'}
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center" style={{ zIndex: 30 }}>
        {/* Desktop tagline above arrow */}
        <div className="hidden lg:block mb-2">
          <p className="text-muted text-sm uppercase tracking-[0.2em] font-bold text-center">
            Train. Fuel. Repeat.
          </p>
        </div>
        
        <a
          href="#frames"
          aria-label="Scroll to next section"
          className="relative flex items-center justify-center animate-bounce text-muted-dim transition-colors hover:text-accent motion-reduce:animate-none"
        >
          <ChevronDown size={12} />
        </a>
      </div>
    </section>
  );
}