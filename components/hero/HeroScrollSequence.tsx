"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { scrollTriggerManager } from "@/lib/scrollTriggerManager";

interface HeroScrollSequenceProps {
  heroSectionRef?: React.RefObject<HTMLElement | null>;
}

export default function HeroScrollSequence({ heroSectionRef }: HeroScrollSequenceProps) {
  const framesRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentDay, setCurrentDay] = useState(1);

  // Define day values for each frame - 365 days total over 31 frames
  const getDayValue = (frameIndex: number) => {
    if (frameIndex === 0) return 1; // First frame = Day 1
    // Distribute 365 days across 31 frames: approximately 12 days per frame
    return Math.min(Math.round((frameIndex * 365) / 30), 365);
  };

  useEffect(() => {
    // Register plugin on client only
    gsap.registerPlugin(ScrollTrigger);
    
    const framesContainer = framesRef.current;
    const section = sectionRef.current;
    
    if (!framesContainer || !section) {
      console.error("HeroScrollSequence: Missing refs");
      return;
    }

    console.log("HeroScrollSequence: Initializing");

    // Aggressive mobile optimization - reduce frames dramatically
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const frames = Array.from(framesContainer.querySelectorAll<HTMLImageElement>(".hero-frame"));
    
    // On mobile: use only every 4th frame (8 frames total) for 75% memory reduction
    // On desktop: use every 2nd frame (16 frames) for smoother animation with less memory
    const activeFrames = isMobile 
      ? frames.filter((_, index) => index % 4 === 0) // Every 4th frame = 8 frames on mobile
      : frames.filter((_, index) => index % 2 === 0); // Every 2nd frame = 16 frames on desktop
    
    if (activeFrames.length === 0) {
      console.error("No .hero-frame elements found!");
      return;
    }

    console.log(`Using ${activeFrames.length} frames (mobile: ${isMobile}, total available: ${frames.length})`);

    // Set initial state for all frames with GSAP - no will-change on mobile
    frames.forEach((frame) => {
      gsap.set(frame, { 
        opacity: 0,
        visibility: "visible",
        scale: 1.8,
        transformOrigin: "center center",
        force3D: true
      });
    });
    
    // Set first active frame visible
    if (activeFrames[0]) {
      gsap.set(activeFrames[0], { opacity: 1 });
    }

    // Throttle frame updates for better mobile performance
    let currentFrameIndex = 0;
    let ticking = false;

    const updateFrames = (newIndex: number) => {
      if (newIndex === currentFrameIndex || newIndex < 0 || newIndex >= activeFrames.length) return;
      
      activeFrames[currentFrameIndex].style.opacity = '0';
      activeFrames[newIndex].style.opacity = '1';
      currentFrameIndex = newIndex;
      
      const dayValue = getDayValue(newIndex * (isMobile ? 4 : 2)); // Adjust for skipped frames
      setCurrentDay(dayValue);
    };

    // Create scroll trigger
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=1200",
      pin: true,
      scrub: 0.2,
      pinSpacing: true,
      anticipatePin: 1,
      refreshPriority: -1,
      onUpdate: (self) => {
        if (ticking) return;
        
        ticking = true;
        requestAnimationFrame(() => {
          const progress = self.progress;
          const exactFrame = progress * (activeFrames.length - 1);
          const frameIndex = Math.floor(exactFrame);
          const clampedIndex = Math.min(Math.max(frameIndex, 0), activeFrames.length - 1);
          
          updateFrames(clampedIndex);
          ticking = false;
        });
      },
      onEnter: () => console.log("ScrollTrigger Entered"),
      onLeave: () => console.log("ScrollTrigger Left"),
    });

    console.log("GSAP ScrollTrigger created");

    // Initial refresh using manager
    const initialRefresh = setTimeout(() => {
      scrollTriggerManager.debouncedRefresh(150);
    }, 100);

    // Resize handler with debounce - desktop only
    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        scrollTriggerManager.debouncedRefresh(250);
      }, 300);
    };

    if (!isMobile) {
      window.addEventListener('resize', handleResize);
    }

    // Cleanup
    return () => {
      console.log("HeroScrollSequence: Cleanup");
      clearTimeout(initialRefresh);
      if (resizeTimeout) clearTimeout(resizeTimeout);
      if (!isMobile) {
        window.removeEventListener('resize', handleResize);
      }
      st.kill();
    };
  }, []); // Remove heroSectionRef dependency to prevent recreation

  return (
    <div ref={sectionRef} className="relative w-full min-h-screen bg-background">
      {/* Split Layout Container */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 w-full min-h-screen">
        {/* Left Side - Text */}
        <div className="flex items-center justify-center lg:justify-start px-4 py-8 lg:px-16 lg:py-0 order-2 lg:order-1">
          <div className="max-w-xl text-center lg:text-left">
            <p className="font-display text-balance text-[clamp(1.5rem,8vw,4rem)] font-bold uppercase leading-[1.1] lg:leading-[1.05] tracking-tight text-white">
              <span className="inline-block">Built</span>{" "}
              <span className="inline-block">for</span>{" "}
              <span className="inline-block">those</span>{" "}
              <span className="inline-block">who</span>{" "}
              <span className="inline-block text-accent">choose</span>{" "}
              <span className="inline-block text-accent">progress</span>{" "}
              <span className="inline-block">every</span>{" "}
              <span className="inline-block">single</span>{" "}
              <span className="inline-block">day</span>
            </p>
          </div>
        </div>

        {/* Right Side - Frame Animation */}
        <div className="relative flex-1 min-h-[50vh] lg:min-h-full overflow-hidden order-1 lg:order-2">
          <div 
            ref={framesRef}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 1 }}
          >
            {Array.from({ length: 31 }, (_, i) => (
              <Image
                key={`frame-${i}`}
                src={`https://res.cloudinary.com/ufiebboc/image/upload/v${1786268786 + i * 2}/devis-gym/frame/frame_${String(i + 1).padStart(3, "0")}.webp`}
                alt=""
                width={600}
                height={450}
                priority={i < 2}
                loading={i < 2 ? "eager" : "lazy"}
                className="hero-frame absolute inset-0 w-full h-full object-contain"
                style={{ 
                  zIndex: 1,
                  pointerEvents: 'none',
                  transition: 'none' // Force no transitions
                }}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                quality={60}
              />
            ))}

            {/* Left border blend - fade to background */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: 2,
                background: 'linear-gradient(to right, #0a0a0a 0%, transparent 15%)'
              }}
            />
            
            {/* Top border blend - extensive fade to background */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: 2,
                background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(10,10,10,0.95) 3%, rgba(10,10,10,0.8) 8%, rgba(10,10,10,0.6) 15%, rgba(10,10,10,0.3) 25%, rgba(10,10,10,0.1) 35%, transparent 45%)'
              }}
            />
            
            {/* Bottom border blend - extensive fade to background */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: 2,
                background: 'linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.95) 3%, rgba(10,10,10,0.8) 8%, rgba(10,10,10,0.6) 15%, rgba(10,10,10,0.3) 25%, rgba(10,10,10,0.1) 35%, transparent 45%)'
              }}
            />
            
            {/* Right border blend - fade to background */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: 2,
                background: 'linear-gradient(to left, #0a0a0a 0%, transparent 15%)'
              }}
            />
            
            {/* Center radial fade for depth */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: 2,
                background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.1) 60%, rgba(10,10,10,0.3) 85%)'
              }}
            />
          </div>
          
          {/* Day Counter - Mobile: top left of frame, Desktop: hidden here */}
          <div className="lg:hidden absolute top-4 left-4 text-left pointer-events-none" style={{ zIndex: 10 }}>
            <div className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-1">
              Day
            </div>
            <div className="text-white text-xl font-bold font-oswald">
              {currentDay}
            </div>
          </div>
        </div>
      </div>
      
      {/* Day Counter - Desktop only (bottom right) */}
      <div 
        className="hidden lg:block absolute bottom-8 right-8 text-right pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <div className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-1">
          Day
        </div>
        <div className="text-white text-2xl font-bold font-oswald">
          {currentDay}
        </div>
      </div>
    </div>
  );
}