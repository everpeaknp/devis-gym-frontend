"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

interface HeroScrollSequenceProps {
  heroSectionRef?: React.RefObject<HTMLElement | null>;
}

export default function HeroScrollSequence({ heroSectionRef }: HeroScrollSequenceProps) {
  const framesRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentDay, setCurrentDay] = useState(1);

  // Define day values for each frame
  const getDayValue = (frameIndex: number) => {
    if (frameIndex === 0) return 1; // First frame = Day 1
    return frameIndex * 30; // 2nd frame = 30, 3rd = 60, 4th = 90, etc.
  };

  useEffect(() => {
    // Register plugin on client only
    gsap.registerPlugin(ScrollTrigger);
    
    const framesContainer = framesRef.current;
    const section = sectionRef.current;
    
    if (!framesContainer || !section) {
      console.error("HeroScrollSequence: Missing refs", { 
        framesContainer: !!framesContainer, 
        section: !!section 
      });
      return;
    }

    console.log("HeroScrollSequence: Refs found");

    const frameCount = 31; // Using all available frames 001-031
    const frames = Array.from(framesContainer.querySelectorAll<HTMLImageElement>(".hero-frame"));
    
    console.log(`Found ${frames.length} frame elements`);
    
    if (frames.length === 0) {
      console.error("No .hero-frame elements found!");
      return;
    }

    // Set initial state for all frames with GSAP
    frames.forEach((frame, i) => {
      gsap.set(frame, { 
        opacity: i === 0 ? 1 : 0,
        visibility: "visible",
        scale: 1.8, // Increased from 1.6 to 1.8 to make images bigger
        transformOrigin: "center center",
        force3D: true // Hardware acceleration
      });
    });
    
    console.log("Initial frame visibility set with GSAP");

    // Create scroll trigger with manual frame control (NO ANIMATION PROPERTY to prevent flickering)
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=4000", // Increased scroll distance for 31 frames
      pin: true,
      scrub: 1.5, // Smoother scrub with more lag
      pinSpacing: true, // Proper spacing to prevent overlap
      anticipatePin: 1, // Better mobile performance
      refreshPriority: -1, // Refresh after other elements
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Calculate which frame should be visible (0 to frameCount-1)
        const exactFrame = progress * (frameCount - 1);
        const frameIndex = Math.floor(exactFrame);
        const clampedIndex = Math.min(Math.max(frameIndex, 0), frameCount - 1);
        
        // Hide all frames instantly with direct DOM manipulation (NO GSAP)
        frames.forEach((frame, i) => {
          frame.style.opacity = i === clampedIndex ? '1' : '0';
        });
        
        // Update day counter with specific values
        setCurrentDay(getDayValue(clampedIndex));
        
        console.log(`Frame: ${clampedIndex + 1}/${frameCount} | Day: ${getDayValue(clampedIndex)} | Progress: ${(progress * 100).toFixed(1)}%`);
      },
      onEnter: () => console.log("ScrollTrigger Entered - Section Pinned"),
      onLeave: () => console.log("ScrollTrigger Left - Section Unpinned"),
      onRefresh: () => console.log("ScrollTrigger Refreshed")
    });

    console.log(`GSAP ScrollTrigger created with PROPER PINNING (no overlap)`);

    // Force refresh after creation and on resize for mobile
    const refreshTrigger = () => {
      ScrollTrigger.refresh();
      console.log("ScrollTrigger force refreshed");
    };
    
    setTimeout(refreshTrigger, 100);
    
    // Handle mobile orientation changes and viewport updates
    window.addEventListener('resize', refreshTrigger);
    window.addEventListener('orientationchange', () => {
      setTimeout(refreshTrigger, 200); // Delay for orientation change
    });

    // Cleanup
    return () => {
      console.log("Cleanup ScrollTrigger");
      window.removeEventListener('resize', refreshTrigger);
      window.removeEventListener('orientationchange', refreshTrigger);
      st.kill();
    };
  }, [heroSectionRef]);

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
                src={`/frame/frame_${String(i + 1).padStart(3, "0")}.png`}
                alt=""
                width={800}
                height={600}
                priority={i === 0}
                loading={i === 0 ? "eager" : "lazy"}
                className="hero-frame absolute inset-0 w-full h-full object-contain"
                style={{ 
                  zIndex: 1,
                  willChange: 'opacity',
                  pointerEvents: 'none',
                  transition: 'none' // Force no transitions
                }}
                sizes="50vw"
                quality={85}
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