"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ProgressSection() {
  // Section refs
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Text refs for each phase
  const phase1TextRef = useRef<HTMLDivElement>(null);
  const phase2TextRef = useRef<HTMLDivElement>(null);
  const phase3TextRef = useRef<HTMLDivElement>(null);
  const phase4TextRef = useRef<HTMLDivElement>(null);
  const phase5TextRef = useRef<HTMLDivElement>(null);
  
  // Equipment refs
  const weightPlateRef = useRef<HTMLImageElement>(null);
  const dumbbellRef = useRef<HTMLImageElement>(null);
  const barbellRef = useRef<HTMLImageElement>(null);
  const extraPlateRef = useRef<HTMLImageElement>(null);
  
  // Athlete transformation refs
  const athleteContainerRef = useRef<HTMLDivElement>(null);
  const skinnyAthleteRef = useRef<HTMLImageElement>(null);
  const athleticAthleteRef = useRef<HTMLImageElement>(null);
  const muscularAthleteRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    
    if (!section) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([phase1TextRef.current, phase2TextRef.current, phase3TextRef.current, phase4TextRef.current, phase5TextRef.current], {
        opacity: 0,
        y: 50
      });

      gsap.set([weightPlateRef.current, dumbbellRef.current, barbellRef.current, extraPlateRef.current], {
        opacity: 0,
        x: -300,
        scale: 0.8
      });

      // Set athlete initial states
      gsap.set(skinnyAthleteRef.current, { opacity: 1 });
      gsap.set([athleticAthleteRef.current, muscularAthleteRef.current], { opacity: 0 });

      // Main ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=500%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Phase-based athlete transformation
            if (progress < 0.2) {
              // Phase 1: Pure skinny
              gsap.set(skinnyAthleteRef.current, { opacity: 1 });
              gsap.set([athleticAthleteRef.current, muscularAthleteRef.current], { opacity: 0 });
            } else if (progress < 0.6) {
              // Phase 2-3: Transition to athletic
              const transitionProgress = (progress - 0.2) / 0.4;
              gsap.set(skinnyAthleteRef.current, { opacity: 1 - transitionProgress });
              gsap.set(athleticAthleteRef.current, { opacity: transitionProgress });
              gsap.set(muscularAthleteRef.current, { opacity: 0 });
            } else {
              // Phase 4-5: Transition to muscular
              const finalProgress = (progress - 0.6) / 0.4;
              gsap.set(skinnyAthleteRef.current, { opacity: 0 });
              gsap.set(athleticAthleteRef.current, { opacity: 1 - finalProgress });
              gsap.set(muscularAthleteRef.current, { opacity: finalProgress });
            }
          }
        }
      });

      // Phase 1: ZERO (0-15%)
      tl.to(phase1TextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, 0)
      .to(phase1TextRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.3,
        ease: "power2.in"
      }, 0.12);

      // Phase 2: FIRST WEIGHT (15-35%)
      tl.to(phase2TextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, 0.15)
      .to(weightPlateRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out"
      }, 0.18)
      .to(phase2TextRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.3
      }, 0.32);

      // Phase 3: PROGRESS (35-55%)
      tl.to(phase3TextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, 0.35)
      .to(dumbbellRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out"
      }, 0.38)
      .to(barbellRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out"
      }, 0.45)
      .to(phase3TextRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.3
      }, 0.52);

      // Phase 4: THE WEIGHT BUILDS (55-80%)
      tl.to(phase4TextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, 0.55)
      .to(extraPlateRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out"
      }, 0.58)
      .to(phase4TextRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.3
      }, 0.77);

      // Phase 5: BUILT (80-100%)
      tl.to(phase5TextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, 0.8)
      .to([weightPlateRef.current, dumbbellRef.current, barbellRef.current], {
        opacity: 0.3,
        scale: 0.9,
        duration: 0.6,
        ease: "power2.out"
      }, 0.85)
      .to(extraPlateRef.current, {
        opacity: 0.6,
        duration: 0.4
      }, 0.9);

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full bg-black overflow-hidden" style={{ minHeight: "100vh" }}>
      {/* Central Composition */}
      <div className="absolute inset-0 flex items-center justify-center">
        
        {/* Left Side Equipment */}
        <div className="absolute left-[10%] top-1/2 -translate-y-1/2 flex flex-col items-center space-y-8">
          {/* Weight Plate */}
          <img
            ref={weightPlateRef}
            src="/equipment/plate.png"
            alt="Weight Plate"
            className="w-20 h-20 md:w-32 md:h-32 object-contain"
          />
          
          {/* Extra Plate */}
          <img
            ref={extraPlateRef}
            src="/equipment/plate.png"
            alt="Extra Weight Plate"
            className="w-16 h-16 md:w-24 md:h-24 object-contain"
          />
        </div>

        {/* Right Side Equipment */}
        <div className="absolute right-[10%] top-1/2 -translate-y-1/2 flex flex-col items-center space-y-8">
          {/* Dumbbell */}
          <img
            ref={dumbbellRef}
            src="/equipment/3.png"
            alt="Dumbbell"
            className="w-24 h-24 md:w-36 md:h-36 object-contain"
          />
          
          {/* Barbell */}
          <img
            ref={barbellRef}
            src="/equipment/4.png"
            alt="Barbell"
            className="w-28 h-28 md:w-40 md:h-40 object-contain"
          />
        </div>

        {/* Central Athlete */}
        <div ref={athleteContainerRef} className="relative flex items-center justify-center">
          {/* Skinny Athlete (placeholder - you'll need to replace with actual transformation images) */}
          <img
            ref={skinnyAthleteRef}
            src="/hero/training-person.webp"
            alt="Skinny Athlete"
            className="absolute w-48 h-64 md:w-64 md:h-80 object-contain"
          />
          
          {/* Athletic Athlete (placeholder - you'll need to replace with actual transformation images) */}
          <img
            ref={athleticAthleteRef}
            src="/hero/training-person.webp"
            alt="Athletic Athlete"
            className="absolute w-48 h-64 md:w-64 md:h-80 object-contain"
            style={{ filter: 'contrast(1.2) saturate(1.1)' }}
          />
          
          {/* Muscular Athlete (placeholder - you'll need to replace with actual transformation images) */}
          <img
            ref={muscularAthleteRef}
            src="/hero/training-person.webp"
            alt="Muscular Athlete"
            className="absolute w-48 h-64 md:w-64 md:h-80 object-contain"
            style={{ filter: 'contrast(1.4) saturate(1.3) brightness(1.1)' }}
          />
        </div>

        {/* Typography Phases */}
        {/* Phase 1: ZERO */}
        <div ref={phase1TextRef} className="absolute top-[15%] left-1/2 -translate-x-1/2 text-center">
          <h2 className="font-oswald text-6xl md:text-8xl font-bold text-white uppercase tracking-wider">
            Zero
          </h2>
          <p className="font-oswald text-lg md:text-xl text-white/80 uppercase tracking-widest mt-4">
            Every Journey Starts Somewhere
          </p>
        </div>

        {/* Phase 2: FIRST REP */}
        <div ref={phase2TextRef} className="absolute top-[20%] left-1/2 -translate-x-1/2 text-center">
          <h3 className="font-oswald text-4xl md:text-6xl font-bold text-accent uppercase tracking-wider">
            01
          </h3>
          <p className="font-oswald text-lg md:text-xl text-white uppercase tracking-widest mt-2">
            The First Rep
          </p>
        </div>

        {/* Phase 3: PROGRESS */}
        <div ref={phase3TextRef} className="absolute top-[25%] left-1/2 -translate-x-1/2 text-center">
          <h3 className="font-oswald text-4xl md:text-6xl font-bold text-accent uppercase tracking-wider">
            02
          </h3>
          <p className="font-oswald text-lg md:text-xl text-white uppercase tracking-widest mt-2">
            Built Rep By Rep
          </p>
        </div>

        {/* Phase 4: THE WEIGHT BUILDS */}
        <div ref={phase4TextRef} className="absolute top-[30%] left-1/2 -translate-x-1/2 text-center">
          <h3 className="font-oswald text-4xl md:text-6xl font-bold text-accent uppercase tracking-wider">
            03
          </h3>
          <p className="font-oswald text-lg md:text-xl text-white uppercase tracking-widest mt-2">
            More Weight, More Growth
          </p>
        </div>

        {/* Phase 5: BUILT */}
        <div ref={phase5TextRef} className="absolute bottom-[15%] left-1/2 -translate-x-1/2 text-center max-w-4xl">
          <h2 className="font-oswald text-7xl md:text-9xl font-bold text-white uppercase tracking-wider mb-8">
            Built
          </h2>
          <div className="space-y-4">
            <p className="font-oswald text-2xl md:text-3xl text-white uppercase tracking-widest">
              Progress Isn't Given
            </p>
            <p className="font-oswald text-2xl md:text-3xl text-accent uppercase tracking-widest font-bold">
              It's Built
            </p>
          </div>
        </div>

      </div>

      {/* Cinematic Lighting Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Center spotlight */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.8) 100%)'
          }}
        />
        
        {/* Bottom fade */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 30%)'
          }}
        />
        
        {/* Top fade */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 25%)'
          }}
        />
      </div>
    </div>
  );
}