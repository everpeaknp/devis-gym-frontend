"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { services } from "@/data/services";

export default function TrainingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const classesRef = useRef<HTMLSpanElement>(null);
  const forYouRef = useRef<HTMLSpanElement>(null);
  const scrollTextRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

      // 3D Flip Animation for Service Cards
      if (!prefersReducedMotion) {
        cardRefs.current.forEach((cardRef, index) => {
          if (cardRef) {
            // Set initial state
            gsap.set(cardRef, {
              transformStyle: "preserve-3d",
              perspective: 1000,
              rotationY: -15,
              rotationX: 10,
              scale: 0.9,
              opacity: 0.8,
            });

            // Create scroll-triggered animation
            ScrollTrigger.create({
              trigger: cardRef,
              start: "top 85%",
              end: "bottom 20%",
              scrub: 1,
              animation: gsap.timeline()
                .to(cardRef, {
                  rotationY: 0,
                  rotationX: 0,
                  scale: 1,
                  opacity: 1,
                  duration: 1,
                  ease: "power2.out",
                })
                .to(cardRef, {
                  rotationY: 15,
                  rotationX: -5,
                  scale: 0.95,
                  duration: 1,
                  ease: "power2.inOut",
                }, 0.5),
              onToggle: (self) => {
                // Add extra animation when card comes into view
                if (self.isActive && !cardRef.classList.contains('flip-animated')) {
                  cardRef.classList.add('flip-animated');
                  
                  gsap.timeline()
                    .to(cardRef, {
                      rotationY: 360,
                      duration: 0.8,
                      ease: "power2.inOut",
                      delay: index * 0.1,
                    })
                    .set(cardRef, { rotationY: 0 });
                }
              }
            });

            // Hover effect with 3D tilt
            const handleMouseEnter = (e: MouseEvent) => {
              const rect = cardRef.getBoundingClientRect();
              const centerX = rect.left + rect.width / 2;
              const centerY = rect.top + rect.height / 2;
              
              gsap.to(cardRef, {
                rotationY: (e.clientX - centerX) * 0.05,
                rotationX: (centerY - e.clientY) * 0.05,
                scale: 1.05,
                z: 50,
                duration: 0.3,
                ease: "power2.out",
              });
            };

            const handleMouseMove = (e: MouseEvent) => {
              const rect = cardRef.getBoundingClientRect();
              const centerX = rect.left + rect.width / 2;
              const centerY = rect.top + rect.height / 2;
              
              gsap.to(cardRef, {
                rotationY: (e.clientX - centerX) * 0.02,
                rotationX: (centerY - e.clientY) * 0.02,
                duration: 0.1,
                ease: "none",
              });
            };

            const handleMouseLeave = () => {
              gsap.to(cardRef, {
                rotationY: 0,
                rotationX: 0,
                scale: 1,
                z: 0,
                duration: 0.5,
                ease: "power2.out",
              });
            };

            cardRef.addEventListener('mouseenter', handleMouseEnter);
            cardRef.addEventListener('mousemove', handleMouseMove);
            cardRef.addEventListener('mouseleave', handleMouseLeave);

            // Store cleanup functions
            cardRef.setAttribute('data-cleanup', 'true');
          }
        });
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
      
      // Clean up card event listeners
      cardRefs.current.forEach((cardRef) => {
        if (cardRef && cardRef.getAttribute('data-cleanup')) {
          const events = ['mouseenter', 'mousemove', 'mouseleave'];
          events.forEach(event => {
            cardRef.removeEventListener(event, () => {});
          });
        }
      });
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
          {services.map((service, i) => {
            // Map service IDs to class paths
            const getServicePath = (id: string) => {
              switch(id) {
                case 'outdoor': return '/classes/outdoor';
                case 'personal-training': return '/classes/personal';
                case 'group-training': return '/classes/group';
                case 'digital-coaching': return '/classes/digital';
                default: return '#';
              }
            };

            return (
              <Reveal key={service.id} delay={i * 0.1}>
                <Link href={getServicePath(service.id)} className="block">
                  <div 
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    className="group flip-card-container cursor-pointer"
                    style={{
                      perspective: '1000px',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Card Inner Container for 3D Effect */}
                    <div className="flip-card-inner relative w-full h-full">
                      {/* Background Image with 3D Depth */}
                      <div className="h-[300px] md:h-[450px] overflow-hidden relative rounded-lg shadow-2xl">
                        <Image
                          src={service.image}
                          alt={service.name}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw"
                          loading="lazy"
                          quality={80}
                        />
                        
                        {/* 3D Depth Layer */}
                        <div 
                          className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            transform: 'translateZ(10px)',
                          }}
                        />
                        
                        {/* Hover Overlay with 3D Effect */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Text Below Image with Enhanced 3D Styling */}
                      <div className="bg-background-elevated py-6 relative rounded-b-lg shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                        <h3 
                          className="font-oswald uppercase text-white whitespace-pre-line pr-12 transition-all duration-300 group-hover:text-[#c7ff3d]"
                          style={{ 
                            fontWeight: 700,
                            fontSize: '30px',
                            lineHeight: '38px',
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                          }}
                        >
                          {service.name}
                        </h3>
                        
                        {/* Enhanced Arrow Icon with 3D Transform */}
                        <Image
                          src="/icons/arrow-right.svg"
                          alt=""
                          width={36}
                          height={36}
                          className="absolute bottom-6 right-0 w-9 h-9 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110"
                          style={{ 
                            filter: 'brightness(0) saturate(100%) invert(88%) sepia(85%) saturate(4447%) hue-rotate(358deg) brightness(102%) contrast(101%)',
                          }}
                          loading="lazy"
                        />
                        
                        {/* 3D Accent Line */}
                        <div 
                          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#c7ff3d] to-transparent w-0 group-hover:w-full transition-all duration-500"
                          style={{
                            transform: 'translateZ(5px)',
                          }}
                        />
                      </div>
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