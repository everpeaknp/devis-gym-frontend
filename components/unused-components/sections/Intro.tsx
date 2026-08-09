"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { businessData } from "@/data/business";

import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const imagesRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Text animation - word by word
    if (textRef.current) {
      const words = textRef.current.querySelectorAll('.word');
      
      const ctx = gsap.context(() => {
        gsap.fromTo(
          words,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      return () => ctx.revert();
    }
  }, []);

  useEffect(() => {
    // Images animation
    if (!imagesRef.current) return;

    const images = imagesRef.current.querySelectorAll(".intro-image");

    const ctx = gsap.context(() => {
      // Animate all images sliding in from right
      gsap.fromTo(
        images,
        {
          x: 200,
          opacity: 0,
        },
        {
          x: 0,
          opacity: (i) => 1 - i * 0.3, // First: 1, Second: 0.7, Third: 0.4
          duration: 1.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imagesRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="intro" className="bg-[#121212]">
      <div className="container-edge py-16 md:py-20 md:pb-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text */}
          <div>
            <p 
              ref={textRef}
              className="font-display max-w-4xl text-balance text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[1.05] tracking-tight"
            >
              <span className="word inline-block">A</span>{" "}
              <span className="word inline-block">real</span>{" "}
              <span className="word inline-block">gym,</span>{" "}
              <span className="word inline-block">built</span>{" "}
              <span className="word inline-block">for</span>{" "}
              <span className="word inline-block text-muted">people</span>{" "}
              <span className="word inline-block text-muted">who</span>{" "}
              <span className="word inline-block text-muted">actually</span>{" "}
              <span className="word inline-block text-accent">train,</span>{" "}
              <span className="word inline-block">in</span>{" "}
              <span className="word inline-block">the</span>{" "}
              <span className="word inline-block">heart</span>{" "}
              <span className="word inline-block">of</span>{" "}
              <span className="word inline-block">{businessData.location.city}.</span>
            </p>
          </div>

          {/* Right Column - Images */}
          <div ref={imagesRef} className="relative h-[600px] w-full overflow-visible cursor-grab active:cursor-grabbing">
            {/* Arrow SVG behind images on the right */}
            <div className="absolute right-[-15%] top-1/2 -translate-y-1/2 w-[60%] h-auto pointer-events-none -z-10">
              <Image
                src="/icons/arrow-right.svg"
                alt=""
                width={400}
                height={200}
                className="w-full h-auto opacity-15"
                loading="lazy"
              />
            </div>

            {/* 3 copies of the same image with decreasing opacity, stacked from right to left */}
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="intro-image absolute top-0 h-full w-[480px]"
                style={{
                  right: `${index * 70}px`,
                  zIndex: 10 - index,
                }}
              >
                <Image
                  src="https://res.cloudinary.com/ufiebboc/image/upload/v1786268837/devis-gym/hero/man.webp"
                  alt="Training at Devi's Gym"
                  width={480}
                  height={600}
                  className="w-full h-full object-contain pointer-events-none"
                  loading="lazy"
                  quality={85}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
