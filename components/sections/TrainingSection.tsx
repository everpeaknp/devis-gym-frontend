"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { services } from "@/data/services";
import { cldOptimize } from "@/lib/cloudinary";
import { scrollTriggerManager } from "@/lib/scrollTriggerManager";

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
      if (!prefersReducedMotion) {
        // Simple title animation - combined in one timeline
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          }
        })
        .fromTo(
          classesRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        )
        .fromTo(
          forYouRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        );

        // Marquee animation with proper cleanup
        if (scrollTextRef.current) {
          const scrollElement = scrollTextRef.current;
          const speed = 0.5;

          let half = scrollElement.scrollWidth / 2;
          const remeasure = () => { 
            half = scrollElement.scrollWidth / 2; 
          };

          const scrollTrigger = ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {
              if (!half) return;
              let x = -((self.scroll() * speed) % half);
              if (x > 0) x -= half;
              scrollElement.style.transform = `translate3d(${x}px, 0, 0)`;
            },
            onRefresh: remeasure,
            invalidateOnRefresh: true,
          });

          // Debounced resize handler
          let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
          const handleResize = () => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
              remeasure();
              // Don't call ScrollTrigger.refresh here - let the manager handle it globally
            }, 250);
          };

          window.addEventListener("resize", handleResize);

          // Store cleanup function
          return () => {
            window.removeEventListener("resize", handleResize);
            if (resizeTimeout) clearTimeout(resizeTimeout);
            scrollTrigger.kill();
          };
        }
      } else {
        // Show immediately if reduced motion
        gsap.set([classesRef.current, forYouRef.current], { opacity: 1 });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-background-elevated overflow-hidden">
      <div className="container-edge pt-6 sm:pt-8 md:pt-12 pb-12 sm:pb-16 md:pb-20">
        {/* Centered Heading with Animation - More compact on mobile */}
        <div className="text-center mb-8 sm:mb-12 md:mb-14">
          <h2 className="font-oswald uppercase text-white">
            <span 
              ref={classesRef}
              className="block text-xl sm:text-2xl md:text-3xl font-normal tracking-wide opacity-0"
            >
              Classes Designed
            </span>
            <span 
              ref={forYouRef}
              className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-1 sm:mt-2 opacity-0"
            >
              For You
            </span>
          </h2>
        </div>

        {/* Start fast. Finish faster. - Scroll-triggered animation - Smaller on mobile */}
        <div className="w-full mb-8 sm:mb-12 md:mb-16 overflow-hidden relative">
          <div 
            ref={scrollTextRef}
            className="whitespace-nowrap flex"
            style={{
              fontFamily: '"Pilat Condensed", sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(40px, 8vw, 95px)',
              lineHeight: '1.1',
              color: 'rgb(206, 249, 82)',
              transform: 'translate3d(0, 0, 0)',
              willChange: 'transform',
            }}
          >
            {/* Reduced from 40 to 10 for better performance */}
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="inline-block px-8">START FAST • FINISH FASTER • PUSH HARDER • GET STRONGER • NEVER QUIT • BREAK LIMITS</span>
            ))}
          </div>
        </div>

        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            // Special handling for "View All Classes" card
            const servicePath = service.isViewAll ? '/classes' : (() => {
              // Map service IDs to class paths
              switch(service.id) {
                case 'gym-training': return '/classes/gym-training';
                case 'weightlifting': return '/classes/weightlifting';
                case 'cardio': return '/classes/cardio';
                case 'crossfit': return '/classes/crossfit';
                case 'aerobics': return '/classes/aerobics';
                case 'zumba': return '/classes/zumba';
                case 'outdoor-activities': return '/classes/outdoor';
                default: return '/classes';
              }
            })();

            return (
              <Reveal key={service.id} delay={i * 0.1}>
                <Link href={servicePath} className="block">
                  <div className="group cursor-pointer">
                      {/* Background Image - Reduced height on mobile */}
                      <div className="h-[220px] sm:h-[280px] md:h-[350px] lg:h-[450px] overflow-hidden relative rounded-lg shadow-xl">
                        <Image
                          src={cldOptimize(service.image, 700)}
                          alt={service.name}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw"
                          loading={i < 4 ? "eager" : "lazy"}
                          priority={i < 2}
                          quality={80}
                        />
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Text Below Image - Compact on mobile */}
                      <div className="bg-background-elevated py-4 sm:py-5 md:py-6 relative rounded-b-lg shadow-xl transition-shadow duration-300">
                        <h3 
                          className="font-oswald uppercase text-white whitespace-pre-line pr-10 sm:pr-12 transition-all duration-300 group-hover:text-[#c7ff3d]"
                          style={{ 
                            fontWeight: 700,
                            fontSize: 'clamp(20px, 5vw, 30px)',
                            lineHeight: 'clamp(26px, 5.5vw, 38px)',
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                          }}
                        >
                          {service.name}
                        </h3>
                        
                        {/* Arrow Icon - Smaller on mobile */}
                        <Image
                          src="https://res.cloudinary.com/ufiebboc/image/upload/v1786268854/devis-gym/icons/arrow-right.svg"
                          alt=""
                          width={36}
                          height={36}
                          className="absolute bottom-4 sm:bottom-5 md:bottom-6 right-0 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110"
                          style={{ 
                            filter: 'brightness(0) saturate(100%) invert(88%) sepia(85%) saturate(4447%) hue-rotate(358deg) brightness(102%) contrast(101%)',
                          }}
                          loading="lazy"
                        />
                        
                        {/* Accent Line */}
                        <div 
                          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#c7ff3d] to-transparent w-0 group-hover:w-full transition-all duration-500"
                        />
                      </div>
                    </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
