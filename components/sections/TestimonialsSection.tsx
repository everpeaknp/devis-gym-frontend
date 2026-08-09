"use client";

import { useState, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { testimonials, testimonialsIntro } from "@/data/testimonials";
import Reveal from "@/components/ui/Reveal";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const animateToIndex = (newIndex: number) => {
    if (isAnimating || !contentRef.current) return;
    
    setIsAnimating(true);

    const tl = gsap.timeline();

    // Animate out
    tl.to(contentRef.current, {
      opacity: 0,
      y: 80,
      duration: 0.4,
      ease: "power3.in"
    })
    // Update index in the middle
    .call(() => {
      setCurrentIndex(newIndex);
    })
    // Reset position
    .set(contentRef.current, {
      y: -80
    })
    // Animate in
    .to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power3.out",
      onComplete: () => {
        setIsAnimating(false);
      }
    });
  };

  const nextTestimonial = () => {
    const next = (currentIndex + 1) % testimonials.length;
    animateToIndex(next);
  };

  const prevTestimonial = () => {
    const prev = (currentIndex - 1 + testimonials.length) % testimonials.length;
    animateToIndex(prev);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="bg-background">
      <div className="container-edge py-12 sm:py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Left Column - Heading */}
          <Reveal>
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="h-px w-8 sm:w-12 bg-accent"></div>
                <span className="text-accent uppercase tracking-widest text-xs font-bold font-display">
                  {testimonialsIntro.eyebrow}
                </span>
              </div>
              
              <h2 className="font-oswald text-[32px] sm:text-[40px] md:text-[48px] leading-[40px] sm:leading-[50px] md:leading-[60px] font-bold uppercase tracking-tight mb-4 sm:mb-6 text-white">
                What Our Members <span style={{ color: 'rgb(225, 255, 0)' }}>Say</span>
              </h2>
              
              <p className="text-muted text-sm leading-relaxed mb-6 sm:mb-8">
                {testimonialsIntro.body}
              </p>

              {/* Navigation Arrows - Desktop */}
              <div className="hidden lg:flex gap-3">
                <button
                  onClick={prevTestimonial}
                  className="w-12 h-12 rounded-none bg-transparent border border-zinc-700 hover:bg-accent active:bg-accent text-zinc-400 hover:text-black active:text-black transition-all flex items-center justify-center cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-12 h-12 rounded-none bg-transparent border border-zinc-700 hover:bg-accent active:bg-accent text-zinc-400 hover:text-black active:text-black transition-all flex items-center justify-center cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </Reveal>

          {/* Right Column - Testimonial Card */}
          <Reveal delay={0.2}>
            <div className="bg-background-elevated rounded-none p-6 sm:p-8 md:p-10 relative overflow-hidden">
              <div ref={contentRef} style={{ opacity: 1, transform: 'translateY(0)' }}>
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4 sm:mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-accent fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-oswald text-[16px] sm:text-[18px] leading-[22px] sm:leading-[25px] font-normal text-white mb-6 sm:mb-8">
                  "{currentTestimonial.quote}"
                </blockquote>

                {/* Member Info */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background flex items-center justify-center relative overflow-hidden">
                    {currentTestimonial.image ? (
                      <Image
                        src={currentTestimonial.image}
                        alt={currentTestimonial.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                        loading="lazy"
                        quality={75}
                      />
                    ) : (
                      <span className="text-accent font-bold text-base sm:text-lg font-display">
                        {currentTestimonial.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="font-oswald text-[12px] sm:text-[14px] leading-[18px] sm:leading-[20px] font-bold text-white uppercase tracking-tight">
                      {currentTestimonial.name}
                    </div>
                    <div className="text-muted-dim text-xs">
                      Member since {currentTestimonial.memberSince}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows - Mobile */}
            <div className="flex lg:hidden gap-3 mt-6 justify-center">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-none bg-transparent border border-zinc-700 hover:bg-accent active:bg-accent text-zinc-400 hover:text-black active:text-black transition-all flex items-center justify-center cursor-pointer"
                aria-label="Previous testimonial"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-none bg-transparent border border-zinc-700 hover:bg-accent active:bg-accent text-zinc-400 hover:text-black active:text-black transition-all flex items-center justify-center cursor-pointer"
                aria-label="Next testimonial"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
