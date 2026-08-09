"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function VelocityText() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scrollVelocity = useVelocity(scrollYProgress);

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  const skewVelocity = useTransform(smoothVelocity, [-1, 1], ["45deg", "-45deg"]);

  const translateX = useTransform(scrollYProgress, [0, 1], [0, -3000]);

  const smoothTranslateX = useSpring(translateX, {
    mass: 3,
    stiffness: 400,
    damping: 50
  });

  return (
    <section 
      ref={containerRef} 
      className={cn(
        "h-[100vh] bg-background text-foreground",
        "transition-colors duration-300"
      )}
    >
      <div className="sticky top-0 left-0 right-0 w-screen flex h-screen flex-col justify-between overflow-hidden">
        <Header />
        <Title />
        <motion.p
          style={{
            skewX: skewVelocity,
            x: smoothTranslateX
          }}
          className={cn(
            "origin-bottom-left whitespace-nowrap text-7xl font-black uppercase leading-[0.85] md:text-9xl md:leading-[0.85]",
            "text-foreground font-oswald"
          )}
        >
          Nothing in this world can take the place of persistence. Talent will not; nothing is more common than unsuccessful men with talent. Genius will not; unrewarded genius is almost a proverb. Education will not; the world is full of educated derelicts. Persistence and determination alone are omnipotent. The slogan 'Press On!' has solved and always will solve the problems of the human race.
        </motion.p>
        <ScrollIndicators />
      </div>
    </section>
  );
}

const Header = () => (
  <div className="relative mb-1 flex w-full justify-between p-6">
    <p className={cn(
      "hidden text-xs md:block font-oswald",
      "text-muted-foreground"
    )}>
      GET IN TOUCH
      <br />
    </p>
    <Logo />
    <nav className="flex gap-3 text-sm font-oswald uppercase tracking-tight">
      <a 
        href="/#membership" 
        className={cn(
          "transition-colors duration-200",
          "text-muted-foreground hover:text-accent"
        )}
      >
        Join
      </a>
      <a 
        href="/gym" 
        className={cn(
          "transition-colors duration-200",
          "text-muted-foreground hover:text-accent"
        )}
      >
        Facility
      </a>
      <a 
        href="/about" 
        className={cn(
          "transition-colors duration-200",
          "text-muted-foreground hover:text-accent"
        )}
      >
        About
      </a>
    </nav>
  </div>
);

const Logo = () => (
  <div className={cn(
    "absolute right-4 top-1/2 h-fit -translate-y-1/2 translate-x-0 md:right-1/2 md:translate-x-1/2",
    "text-accent font-oswald text-2xl font-bold"
  )}>
    DEVI'S GYM
  </div>
);

const Title = () => (
  <div className="flex items-center justify-center px-4">
    <div className={cn(
      "mr-6 h-24 w-24 bg-muted rounded-sm overflow-hidden",
      "transition-colors duration-300"
    )}>
      <Image
        src="https://res.cloudinary.com/ufiebboc/image/upload/v1786268742/devis-gym/devis/IMG_7374.JPG.jpg"
        alt="Gym equipment"
        width={96}
        height={96}
        className="object-cover"
        loading="lazy"
        quality={85}
      />
    </div>
    <h1 className="text-3xl font-bold sm:text-5xl md:text-7xl font-oswald">
      <span className="text-muted-foreground">
        Ready to <br />
        Transform? <br />
        Time to{" "}
      </span>
      <span className={cn(
        "inline-block -skew-x-[18deg] font-black",
        "text-accent"
      )}>
        CONNECT.
      </span>
    </h1>
  </div>
);

const ScrollIndicators = () => (
  <>
    <div className={cn(
      "absolute left-4 top-1/2 hidden -translate-y-1/2 text-xs lg:block font-oswald",
      "text-muted-foreground"
    )}>
      <span style={{ writingMode: "vertical-lr" }}>SCROLL</span>
      <ScrollIcon />
    </div>
    <div className={cn(
      "absolute right-4 top-1/2 hidden -translate-y-1/2 text-xs lg:block font-oswald",
      "text-muted-foreground"
    )}>
      <span style={{ writingMode: "vertical-lr" }}>SCROLL</span>
      <ScrollIcon />
    </div>
  </>
);

const ScrollIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mx-auto"
  >
    <path d="M12 5v14" />
    <path d="m19 12-7 7-7-7" />
  </svg>
);
