"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Image from "next/image";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-16 items-center justify-center rounded-full bg-white shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export default function NetworkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null); // Strength Training
  const div2Ref = useRef<HTMLDivElement>(null); // Boxing
  const div3Ref = useRef<HTMLDivElement>(null); // Running
  const div4Ref = useRef<HTMLDivElement>(null); // Central Hub
  const div5Ref = useRef<HTMLDivElement>(null); // Gymnastics
  const div6Ref = useRef<HTMLDivElement>(null); // Muscles
  const div7Ref = useRef<HTMLDivElement>(null); // Strong Arm

  return (
    <section className="bg-background py-16 sm:py-20 md:py-24 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/network/4.webp"
          alt="Network background"
          fill
          className="object-cover opacity-10"
          quality={80}
          priority={false}
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="w-full px-4 relative z-10">
        <Reveal>
          <SectionHeading 
            title="Everything Works Together" 
            className="mb-16 text-center"
          />
        </Reveal>
        
        <Reveal delay={0.2}>
          <div
            className="relative flex h-[500px] w-full items-center justify-center overflow-hidden bg-background/90 backdrop-blur-sm p-10 md:shadow-xl"
            ref={containerRef}
          >
            <div className="flex size-full flex-col max-w-4xl max-h-[400px] items-stretch justify-between gap-16">
              <div className="flex flex-row items-center justify-between">
                <Circle ref={div1Ref} className="bg-accent/10">
                  <Image 
                    src="/network/man-lifting-weight-16874.svg" 
                    alt="Weight lifting" 
                    width={48} 
                    height={48}
                    className="w-full h-full object-cover rounded-full"
                  />
                </Circle>
                <Circle ref={div5Ref} className="bg-blue-500/10">
                  <Image 
                    src="/network/man-and-gymnastic-rings-16878.svg" 
                    alt="Gymnastics" 
                    width={48} 
                    height={48}
                    className="w-full h-full object-cover rounded-full"
                  />
                </Circle>
              </div>

              <div className="flex flex-row items-center justify-between">
                <Circle ref={div2Ref} className="bg-green-500/10">
                  <Image 
                    src="/network/boxing-gloves-and-man-16889.svg" 
                    alt="Boxing" 
                    width={48} 
                    height={48}
                    className="w-full h-full object-cover rounded-full"
                  />
                </Circle>
                <Circle ref={div4Ref} className="size-20 bg-accent/20 backdrop-blur-sm">
                  <Image 
                    src="/network/4.webp" 
                    alt="Fitness hub" 
                    width={80} 
                    height={80}
                    className="w-full h-full object-cover rounded-full"
                  />
                </Circle>
                <Circle ref={div6Ref} className="bg-yellow-500/10">
                  <Image 
                    src="/network/man-muscles-and-fitness-16863.svg" 
                    alt="Muscle building" 
                    width={48} 
                    height={48}
                    className="w-full h-full object-cover rounded-full"
                  />
                </Circle>
              </div>

              <div className="flex flex-row items-center justify-between">
                <Circle ref={div3Ref} className="bg-purple-500/10">
                  <Image 
                    src="/network/running-man-and-fitness-16873.svg" 
                    alt="Running" 
                    width={48} 
                    height={48}
                    className="w-full h-full object-cover rounded-full"
                  />
                </Circle>
                <Circle ref={div7Ref} className="bg-orange-500/10">
                  <Image 
                    src="/network/strong-man-arm-and-dumbbell-16869.svg" 
                    alt="Strength" 
                    width={48} 
                    height={48}
                    className="w-full h-full object-cover rounded-full"
                  />
                </Circle>
              </div>
            </div>

            {/* Animated Beams */}
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div1Ref}
              toRef={div4Ref}
              curvature={-75}
              endYOffset={-10}
              gradientStartColor="#cef952"
              gradientStopColor="#cef952"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div2Ref}
              toRef={div4Ref}
              gradientStartColor="#22c55e"
              gradientStopColor="#22c55e"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div3Ref}
              toRef={div4Ref}
              curvature={75}
              endYOffset={10}
              gradientStartColor="#a855f7"
              gradientStopColor="#a855f7"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div5Ref}
              toRef={div4Ref}
              curvature={-75}
              endYOffset={-10}
              reverse
              gradientStartColor="#3b82f6"
              gradientStopColor="#3b82f6"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div6Ref}
              toRef={div4Ref}
              reverse
              gradientStartColor="#eab308"
              gradientStopColor="#eab308"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div7Ref}
              toRef={div4Ref}
              curvature={75}
              endYOffset={10}
              reverse
              gradientStartColor="#f97316"
              gradientStopColor="#f97316"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}