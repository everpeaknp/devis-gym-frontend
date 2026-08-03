"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import ImageReveal from "@/components/ui/ImageReveal";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { gymFeatures, gymIntro } from "@/data/gym";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function GymSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Infinite scroll animation - moves horizontally based on page scroll
    if (scrollTextRef.current && sectionRef.current) {
      // Start from beginning and scroll faster (right to left)
      gsap.fromTo(
        scrollTextRef.current,
        { x: "0%" },
        {
          x: "-50%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5, // Lower value = faster scroll
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-background overflow-hidden">
      <div className="container-edge pt-2 md:pt-4 pb-8 md:pb-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow={gymIntro.eyebrow}
            title={gymIntro.heading}
            className="max-w-2xl"
          />
          <Reveal>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              {gymIntro.body}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {gymFeatures.map((feature, i) => (
            <Reveal key={feature.id} delay={i * 0.1}>
              <article className="group">
                <ImageReveal className="aspect-[4/3] rounded-none relative">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/20" />
                </ImageReveal>
                <h3 className="font-display mt-6 text-xl font-bold uppercase tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <div className="flex flex-col items-start gap-6 border border-border p-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Full equipment list and facility breakdown coming soon. In the
              meantime, come see the space in person.
            </p>
            <Button asChild variant="secondary">
              <a href="#location">Visit the Gym</a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
