"use client";

import Reveal from "@/components/ui/Reveal";
import { membershipPlans } from "@/data/membership";
import { Check, X, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

interface MembershipSectionProps {
  maxPlans?: number;
}

export default function MembershipSection({ maxPlans }: MembershipSectionProps) {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Filter plans: if maxPlans is set, show 1-month, 3-months, 1-year
  const filteredPlans = maxPlans 
    ? membershipPlans.filter(plan => 
        plan.id === "1-month" || plan.id === "3-months" || plan.id === "1-year"
      )
    : membershipPlans;

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Show cards immediately without animation
      cardsRef.current.forEach(card => {
        if (card) {
          gsap.set(card, { opacity: 1, x: 0, y: 0 });
        }
      });
      return;
    }

    // Animate each card
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      let animationProps = {};

      // Left card (index 0) - from left
      if (index === 0) {
        animationProps = {
          x: -100,
          opacity: 0,
        };
      }
      // Middle card (index 1) - from below
      else if (index === 1) {
        animationProps = {
          y: 100,
          opacity: 0,
        };
      }
      // Right card (index 2) - from right
      else if (index === 2) {
        animationProps = {
          x: 100,
          opacity: 0,
        };
      }

      gsap.fromTo(
        card,
        animationProps,
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [filteredPlans]);

  return (
    <section id="membership" className="bg-background">
      <div className="container-edge py-16 md:py-20 md:pb-16">
        {/* Eyebrow */}
        <Reveal>
          <div className="text-center mb-6">
            <h2 className="font-oswald text-[12px] leading-[16px] font-bold uppercase tracking-[0.2em] text-[rgb(225,255,0)]">
              Pricing Plans
            </h2>
          </div>
        </Reveal>

        {/* Title */}
        <Reveal delay={0.1}>
          <div className="text-center mb-10">
            <h3 className="font-oswald text-[60px] leading-[75px] font-bold uppercase text-white">
              Choose Your <span className="text-[rgb(225,255,0)]">Plan</span>
            </h3>
          </div>
        </Reveal>

        {/* Pricing Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {filteredPlans.map((plan, i) => (
            <div
              key={plan.id}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className={`relative bg-zinc-950 px-8 py-10 flex flex-col ${
                plan.popular
                  ? "border-2 border-[rgb(225,255,0)] md:scale-105 md:z-10"
                  : "border border-zinc-800"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-accent px-4 py-1 font-oswald text-xs font-bold uppercase tracking-tight text-black rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="font-oswald text-[20px] leading-[28px] font-bold uppercase text-white">
                {plan.name}
              </h3>

              {/* Subtitle */}
              <p className="mt-1 text-[12px] leading-[16px] font-normal text-zinc-500">
                {plan.subtitle}
              </p>

              {/* Price */}
              <div className="mt-8 mb-8">
                <div className="flex items-baseline gap-1">
                  <span
                    className="font-oswald text-[48px] leading-[48px] font-bold"
                    style={{ color: plan.popular ? "rgb(225, 255, 0)" : "rgb(255, 255, 255)" }}
                  >
                    {plan.currencySymbol}{plan.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[14px] leading-[20px] font-normal text-zinc-500">
                    {plan.duration}
                  </span>
                </div>
                {/* Admission Fee Note */}
                {plan.admissionFee && (
                  <p className="mt-2 text-[12px] leading-[16px] font-normal text-zinc-400">
                    {plan.admissionFee.note}
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-accent/20 flex items-center justify-center">
                      <Check
                        className="h-3 w-3"
                        style={{ color: "rgb(225, 255, 0)" }}
                        strokeWidth={3}
                      />
                    </div>
                    <span className="text-[14px] leading-[20px] font-normal text-zinc-400">
                      {feature}
                    </span>
                  </li>
                ))}
                {plan.excluded?.map((feature, idx) => (
                  <li key={`excluded-${idx}`} className="flex items-start gap-3">
                    <div className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-red-500/20 flex items-center justify-center">
                      <X
                        className="h-3 w-3"
                        style={{ color: "rgb(239, 68, 68)" }}
                        strokeWidth={3}
                      />
                    </div>
                    <span className="text-[14px] leading-[20px] font-normal text-zinc-600 line-through">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <Link
                href="/contact"
                className={`w-full py-4 font-oswald text-[14px] leading-[20px] font-bold uppercase tracking-tight transition-colors cursor-pointer mt-auto text-center block ${
                  plan.popular
                    ? "bg-accent text-black hover:bg-accent-dim"
                    : "bg-transparent border border-zinc-700 text-white hover:border-zinc-500"
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>

        {/* See More Button - Only show when maxPlans is set */}
        {maxPlans && (
          <Reveal delay={0.3}>
            <div className="text-center mt-12">
              <Link
                href="/membership"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-accent text-accent px-8 py-3 font-oswald text-[14px] leading-[20px] font-bold uppercase tracking-tight hover:bg-accent hover:text-black transition-all duration-300 group"
              >
                See More Plans
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
