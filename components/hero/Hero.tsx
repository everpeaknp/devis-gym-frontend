"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { AnimatedLayerButton } from "@/components/ui/AnimatedLayerButton";
import { businessData } from "@/data/business";
import HeroScrollSequence from "./HeroScrollSequence";
import HeroProgress from "@/components/unused-components/ui/hero-progress";

// Hero media data - 2 videos first, then 1 image (3 slides total)
const heroMedia = [
  { type: 'video', src: '/hero/135161-761273563_medium.mp4' },
  { type: 'video', src: '/hero/293079_medium.mp4' },
  { type: 'image', src: '/hero/Untitled-design-2026-04-02T110712.060.jpg' },
];

export default function Hero() {
  const heroSectionRef = useRef<HTMLElement>(null);
  const logoCircleRef = useRef<HTMLDivElement>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Mouse drag/swipe functionality
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragCurrentX, setDragCurrentX] = useState(0);
  const dragThreshold = 30; // Reduced threshold for easier triggering

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
            // Better error handling for autoplay
            video.play().catch((error) => {
              // Handle AbortError and other autoplay issues silently
              if (error.name !== 'AbortError') {
                console.warn('Video autoplay prevented:', error);
              }
            });
          }
        });
      }
    });
  }, []);

  // Handle video playback when slide changes or pause state changes
  useEffect(() => {
    const videos = videoRefs.current;
    
    videos.forEach((video, index) => {
      if (video && heroMedia[index]?.type === 'video') {
        if (index === currentMediaIndex) {
          // Play current video only if not paused
          if (isPaused) {
            video.pause();
          } else {
            video.currentTime = 0;
            video.play().catch((error) => {
              // Handle AbortError and other autoplay issues silently
              if (error.name !== 'AbortError') {
                console.warn('Video play failed:', error);
              }
            });
          }
        } else {
          // Pause other videos
          video.pause();
        }
      }
    });
  }, [currentMediaIndex, isPaused]);

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
            setIsTransitioning(true);
            setTimeout(() => {
              setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % heroMedia.length);
              setIsTransitioning(false);
            }, 200); // Brief delay for smooth transition
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
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
    setIsHovering(false);
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragCurrentX(e.clientX);
    // Pause auto-advance during drag
    setIsPaused(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    setDragCurrentX(e.clientX);
  };

  const handleMouseUp = (e?: React.MouseEvent) => {
    if (!isDragging) return;
    
    const dragDistance = dragCurrentX - dragStartX;
    
    // Check if drag distance meets threshold
    if (Math.abs(dragDistance) > dragThreshold) {
      setIsTransitioning(true);
      setTimeout(() => {
        if (dragDistance > 0) {
          // Dragged right - go to previous slide
          setCurrentMediaIndex((prev) => (prev - 1 + heroMedia.length) % heroMedia.length);
        } else {
          // Dragged left - go to next slide  
          setCurrentMediaIndex((prev) => (prev + 1) % heroMedia.length);
        }
        setIsTransitioning(false);
        // Reset progress for new slide
        setElapsedTime(0);
        setProgress(0);
      }, 200);
    }
    
    setIsDragging(false);
    setDragStartX(0);
    setDragCurrentX(0);
    // Resume auto-advance after a delay
    setTimeout(() => setIsPaused(false), 500);
  };

  // Global mouse events for better drag handling
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setDragCurrentX(e.clientX);
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragCurrentX, dragStartX]);

  const handleProgressClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering drag
    console.log('Progress clicked, current paused state:', isPaused); // Debug log
    
    const newPausedState = !isPaused;
    setIsPaused(newPausedState);
    
    console.log('New paused state:', newPausedState); // Debug log
    
    // Also control video playback immediately
    const videos = videoRefs.current;
    const currentVideo = videos[currentMediaIndex];
    
    if (currentVideo && heroMedia[currentMediaIndex]?.type === 'video') {
      if (newPausedState) {
        currentVideo.pause();
      } else {
        currentVideo.play().catch((error) => {
          // Handle AbortError and other autoplay issues silently
          if (error.name !== 'AbortError') {
            console.warn('Video play failed on click:', error);
          }
        });
      }
    }
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
      className="relative flex w-full flex-col justify-center bg-background select-none"
      style={{ 
        minHeight: '100dvh', // Dynamic viewport height for mobile
        overflow: 'hidden',
        zIndex: 50,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none'
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* Background Media Slider */}
      <div className="absolute inset-0 overflow-hidden">
        {heroMedia.map((media, index) => {
          const isActive = index === currentMediaIndex;
          const isPrev = index === (currentMediaIndex - 1 + heroMedia.length) % heroMedia.length;
          const isNext = index === (currentMediaIndex + 1) % heroMedia.length;
          
          // Calculate proper positioning based on relative position to current slide
          let positionClass = '';
          if (isActive) {
            positionClass = 'translate-x-0 z-10';
          } else if (isPrev) {
            positionClass = '-translate-x-full z-0';
          } else if (isNext) {
            positionClass = 'translate-x-full z-0';
          } else {
            // For slides that are not adjacent, position them off-screen based on their relative position
            const distance = (index - currentMediaIndex + heroMedia.length) % heroMedia.length;
            if (distance > heroMedia.length / 2) {
              positionClass = '-translate-x-full z-0'; // Position to the left
            } else {
              positionClass = 'translate-x-full z-0'; // Position to the right
            }
          }
          
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-transform duration-700 ease-in-out ${positionClass}`}
              style={{
                willChange: 'transform'
              }}
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
                  loading="lazy"
                />
              )}
            </div>
          );
        })}
      </div>
      
      {/* Gradient overlay - darker left, lighter right */}
      <div 
        className="absolute inset-0"
        style={{ 
          zIndex: 10,
          background: 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.1) 100%)'
        }}
      />

      {/* Content Container */}
      <div className="container-edge relative flex flex-col justify-center min-h-[calc(100vh-60px)] sm:min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-92px)] px-4 sm:px-6 md:px-8" style={{ zIndex: 30 }}>
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column - Title and Buttons */}
          <div className="flex flex-col justify-center text-center lg:text-left space-y-3 sm:space-y-4">
            {/* Welcome text - Show for all slides with animation */}
            <div 
              className={`transition-all duration-500 ease-in-out ${
                isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
            >
              {currentMediaIndex === 0 && (
                <p className="font-gotham text-white font-bold uppercase tracking-wider mb-2 sm:mb-1 lg:mb-1" 
                   style={{ 
                     fontWeight: 700,
                     fontSize: 'clamp(14px, 3.5vw, 17px)',
                     lineHeight: 'clamp(18px, 4.5vw, 24px)',
                     color: 'rgb(255, 255, 255)'
                   }}>
                  Experience The Devi's Difference
                </p>
              )}
              {currentMediaIndex === 1 && (
                <p className="font-gotham text-white font-bold uppercase tracking-wider mb-2 sm:mb-1 lg:mb-1" 
                   style={{ 
                     fontWeight: 700,
                     fontSize: 'clamp(14px, 3.5vw, 17px)',
                     lineHeight: 'clamp(18px, 4.5vw, 24px)',
                     color: 'rgb(255, 255, 255)'
                   }}>
                  More Than A Gym
                </p>
              )}
              {currentMediaIndex === 2 && (
                <p className="font-gotham text-white font-bold uppercase tracking-wider mb-2 sm:mb-1 lg:mb-1" 
                   style={{ 
                     fontWeight: 700,
                     fontSize: 'clamp(14px, 3.5vw, 17px)',
                     lineHeight: 'clamp(18px, 4.5vw, 24px)',
                     color: 'rgb(255, 255, 255)'
                   }}>
                  Built For Every Goal
                </p>
              )}
            </div>

            {/* Main heading - Changes based on slide with animation */}
            <div 
              className={`transition-all duration-500 ease-in-out ${
                isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
              }`}
            >
              <h1 className="font-gotham-condensed flex flex-col font-bold uppercase leading-[0.9] tracking-tight relative mb-3 sm:mb-3 lg:mb-4"
                  style={{ 
                    fontSize: 'clamp(48px, 12vw, 81px)',
                    lineHeight: 'clamp(48px, 12vw, 81px)',
                    fontWeight: 700,
                    color: 'rgb(255, 255, 255)'
                  }}>
                {currentMediaIndex === 0 ? (
                  // First slide content
                  <>
                    <span className="overflow-hidden">
                      <span className="hero-line block text-white">Start</span>
                    </span>
                    <span className="overflow-hidden">
                      <span className="hero-line block text-white">Your Fitness</span>
                    </span>
                    <span className="overflow-hidden">
                      <span className="hero-line block text-white">Journey.</span>
                    </span>
                  </>
                ) : currentMediaIndex === 1 ? (
                  // Second slide content
                  <>
                    <span className="overflow-hidden">
                      <span className="hero-line block text-white">Discover</span>
                    </span>
                    <span className="overflow-hidden">
                      <span className="hero-line block text-white">Your</span>
                    </span>
                    <span className="overflow-hidden">
                      <span className="hero-line block text-white">Strength.</span>
                    </span>
                  </>
                ) : (
                  // Third slide content
                  <>
                    <span className="overflow-hidden">
                      <span className="hero-line block text-white">Feel</span>
                    </span>
                    <span className="overflow-hidden">
                      <span className="hero-line block text-white">Stronger.</span>
                    </span>
                    <span className="overflow-hidden">
                      <span className="hero-line block text-white">Every Day.</span>
                    </span>
                  </>
                )}
              </h1>
            </div>

            {/* Description text - Show for all slides with animation */}
            <div 
              className={`transition-all duration-500 ease-in-out ${
                isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
            >
              {currentMediaIndex === 0 && (
                <p className="font-gotham text-white mb-3 sm:mb-4 lg:mb-5 max-w-lg mx-auto lg:mx-0"
                   style={{ 
                     fontWeight: 500,
                     fontSize: 'clamp(12px, 2.8vw, 13px)',
                     lineHeight: 'clamp(17px, 3.8vw, 19px)',
                     color: 'rgb(255, 255, 255)'
                   }}>
                  Devi's Training is group training with the effectiveness and attention of a certified personal trainer.
                </p>
              )}
              {currentMediaIndex === 1 && (
                <p className="font-gotham text-white mb-3 sm:mb-4 lg:mb-5 max-w-lg mx-auto lg:mx-0"
                   style={{ 
                     fontWeight: 500,
                     fontSize: 'clamp(12px, 2.8vw, 13px)',
                     lineHeight: 'clamp(17px, 3.8vw, 19px)',
                     color: 'rgb(255, 255, 255)'
                   }}>
                  Fitness is easier when you're surrounded by people who encourage you. At Devi's Gym, you'll train alongside a welcoming community, learn from experienced coaches, and celebrate every milestone, big or small, together.
                </p>
              )}
              {currentMediaIndex === 2 && (
                <p className="font-gotham text-white mb-3 sm:mb-4 lg:mb-5 max-w-lg mx-auto lg:mx-0"
                   style={{ 
                     fontWeight: 500,
                     fontSize: 'clamp(12px, 2.8vw, 13px)',
                     lineHeight: 'clamp(17px, 3.8vw, 19px)',
                     color: 'rgb(255, 255, 255)'
                   }}>
                  Whether your goal is to lose weight, build muscle, improve your fitness, or simply feel healthier, Devi's Gym gives you the right environment to keep moving forward. Progress doesn't happen overnight, but every workout brings you one step closer.
                </p>
              )}
            </div>

            {/* Hero Buttons with animation */}
            <div 
              className={`flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center lg:justify-start relative z-10 transition-all duration-500 ease-in-out ${
                isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
            >
              <span className="hero-cta">
                <a 
                  href={currentMediaIndex === 0 ? '/membership' : currentMediaIndex === 1 ? '/gym' : '/contact'}
                  className="bg-accent text-black px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-wide hover:bg-accent/90 transition-colors rounded-full w-full sm:w-auto inline-block text-center"
                  style={{ 
                    fontFamily: 'Gotham, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', 
                    fontWeight: 700
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  {currentMediaIndex === 0 ? 'Start A Trial' : currentMediaIndex === 1 ? 'Join Our Community' : 'Contact Us'}
                </a>
              </span>
              {currentMediaIndex === 0 && (
                <span className="hero-cta">
                  <a 
                    href="/gym"
                    className="bg-transparent border border-white text-white px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-wide hover:bg-white hover:text-black transition-colors rounded-full w-full sm:w-auto inline-block text-center"
                    style={{ 
                      fontFamily: 'Gotham, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', 
                      fontWeight: 700
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    Find The Gym
                  </a>
                </span>
              )}
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
        onClick={handleProgressClick}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="relative group">
          {/* Progress Circle */}
          <HeroProgress value={progress} size={32}>
            {isPaused ? (
              // Play icon when paused
              <div className="flex items-center justify-center">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" className="text-white/80">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            ) : (
              // Show slide numbers when playing
              <span className="text-white/80 text-xs font-medium leading-none">
                {currentMediaIndex + 1}/{heroMedia.length}
              </span>
            )}
          </HeroProgress>
        </div>
      </div>

      {/* Hero Down Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-black/20" style={{ zIndex: 25 }} />

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center" style={{ zIndex: 30 }}>
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