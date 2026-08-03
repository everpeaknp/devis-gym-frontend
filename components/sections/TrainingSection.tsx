"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { services } from "@/data/services";

export default function TrainingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const classesRef = useRef<HTMLSpanElement>(null);
  const forYouRef = useRef<HTMLSpanElement>(null);
  const scrollTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register plugin on client only
    gsap.registerPlugin(ScrollTrigger);
    
    if (!sectionRef.current || !classesRef.current || !forYouRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // Title animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
          refreshPriority: -1,
        }
      });
      
      if (!prefersReducedMotion) {
        // First show "Classes Designed"
        tl.fromTo(
          classesRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        )
        // Then zoom in "For You" (from small to normal)
        .fromTo(
          forYouRef.current,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
          "-=0.3" // Slight overlap
        );
      } else {
        // Show immediately if reduced motion
        gsap.set([classesRef.current, forYouRef.current], { opacity: 1 });
      }

      // Infinite scroll animation for the scrolling text - Direct scroll listener
      let scrollCleanup;
      if (scrollTextRef.current && !prefersReducedMotion) {
        
        // Clear any existing animations on this element
        gsap.killTweensOf(scrollTextRef.current);
        
        // Create scroll-based animation with different approach
        const scrollElement = scrollTextRef.current;
        
        // Method 1: Direct ScrollTrigger with scrub
        const scrollTrigger = ScrollTrigger.create({
          trigger: scrollElement,
          start: "top bottom",
          end: "bottom top", 
          scrub: true,
          animation: gsap.fromTo(scrollElement, 
            { x: "0%" },
            { x: "-50%", ease: "none" }
          ),
          invalidateOnRefresh: true,
        });
        
        // Method 2: Fallback - Direct scroll listener
        const handleScroll = () => {
          if (!scrollElement) return;
          
          const rect = scrollElement.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const elementTop = rect.top;
          const elementHeight = rect.height;
          
          // Calculate progress (0 to 1) as element moves through viewport
          const progress = Math.max(0, Math.min(1, 
            (windowHeight - elementTop) / (windowHeight + elementHeight)
          ));
          
          // Move from 0% to -50% based on scroll progress
          const xValue = progress * -50;
          gsap.set(scrollElement, { x: `${xValue}%` });
        };
        
        // Add scroll listener as backup
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial call
        handleScroll();
        
        // Store cleanup function
        scrollCleanup = () => {
          scrollTrigger.kill();
          window.removeEventListener('scroll', handleScroll);
        };
      }
      
      return scrollCleanup;
    }, sectionRef);

    // Force ScrollTrigger refresh after mount
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
      console.log("TrainingSection ScrollTrigger refreshed");
    }, 100);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-background-elevated overflow-hidden">
      <div className="container-edge pt-8 md:pt-12 pb-16 md:pb-20">
        {/* Centered Heading with Animation */}
        <div className="text-center mb-14">
          <h2 className="font-oswald uppercase text-white">
            <span 
              ref={classesRef}
              className="block text-2xl md:text-3xl font-normal tracking-wide opacity-0"
            >
              Classes Designed
            </span>
            <span 
              ref={forYouRef}
              className="block text-6xl md:text-7xl font-bold mt-2 opacity-0"
            >
              For You
            </span>
          </h2>
        </div>

        {/* Start fast. Finish faster. - Scroll-triggered animation */}
        <div className="w-full mb-16 overflow-hidden relative">
          <div 
            ref={scrollTextRef}
            className="whitespace-nowrap flex"
            style={{
              fontFamily: '"Pilat Condensed", sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(60px, 8vw, 95px)',
              lineHeight: '95px',
              color: 'rgb(206, 249, 82)',
              transform: 'translate3d(0, 0, 0)', // Hardware acceleration
            }}
          >
            {/* Repeat text many times for seamless infinite loop */}
            {Array.from({ length: 40 }).map((_, i) => (
              <span key={i} className="inline-block px-8">START FAST • FINISH FASTER • PUSH HARDER • GET STRONGER • NEVER QUIT • BREAK LIMITS</span>
            ))}
          </div>
        </div>

        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.1}>
              <div className="group">
                {/* Background Image with Zoom on Hover */}
                <div className="h-[300px] md:h-[450px] overflow-hidden relative">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw"
                    loading="lazy"
                    quality={80}
                  />
                </div>

                {/* Text Below Image */}
                <div className="bg-background-elevated py-6 relative">
                  <h3 
                    className="font-oswald uppercase text-white whitespace-pre-line pr-12"
                    style={{ 
                      fontWeight: 700,
                      fontSize: '30px',
                      lineHeight: '38px'
                    }}
                  >
                    {service.name}
                  </h3>
                  
                  {/* Yellow Bold Hero Arrow Icon - Bottom Right */}
                  <Image
                    src="/icons/arrow-right.svg"
                    alt=""
                    width={36}
                    height={36}
                    className="absolute bottom-6 right-0 w-9 h-9 transition-transform group-hover:translate-x-1"
                    style={{ filter: 'brightness(0) saturate(100%) invert(88%) sepia(85%) saturate(4447%) hue-rotate(358deg) brightness(102%) contrast(101%)' }}
                    loading="lazy"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}