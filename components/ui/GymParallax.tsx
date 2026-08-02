"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

const SECTION_HEIGHT = 1500;

export const GymParallax = () => {
  return (
    <div style={{ backgroundColor: '#0a0a0a' }}>
      <Hero />
      <Description />
    </div>
  );
};

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );

  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage:
          "url(/gym/gym-interior-1.webp)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="/gym/gym-interior-2.webp"
        alt="Gym equipment"
        start={-200}
        end={200}
        className="w-1/3 rounded-lg"
      />
      <ParallaxImg
        src="/gym/gym-interior-3.webp"
        alt="Gym training"
        start={200}
        end={-250}
        className="mx-auto w-2/3 rounded-lg"
      />
      <ParallaxImg
        src="/gym/gym-interior-4.webp"
        alt="Weight training"
        start={-200}
        end={200}
        className="ml-auto w-1/3 rounded-lg"
      />
      <ParallaxImg
        src="/gym/gym-interior-5.webp"
        alt="Gym interior"
        start={0}
        end={-500}
        className="ml-24 w-5/12 rounded-lg"
      />
    </div>
  );
};

interface ParallaxImgProps {
  className: string;
  alt: string;
  src: string;
  start: number;
  end: number;
}

const ParallaxImg = ({ className, alt, src, start, end }: ParallaxImgProps) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 1], [start, end]);

  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

const Description = () => {
  return (
    <section className="mx-auto max-w-5xl px-4 py-48 text-white">
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-8 font-oswald text-6xl font-bold uppercase text-white"
      >
        The <span className="text-accent">Gym</span>
      </motion.h1>
      
      <motion.p
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75, delay: 0.2 }}
        className="mb-12 text-xl leading-relaxed text-zinc-400"
      >
        A place built to train in. No gimmicks, no distractions—just the tools you need 
        to get stronger, faster, and better. Every piece of equipment chosen for one reason: 
        it works.
      </motion.p>

      <FeatureItem 
        title="Olympic Platforms"
        description="Dedicated lifting platforms with quality bumper plates and competition-grade bars."
      />
      <FeatureItem 
        title="Free Weights"
        description="Complete dumbbell sets from 5kg to 50kg, kettlebells, and everything in between."
      />
      <FeatureItem 
        title="Squat Racks"
        description="Power racks with safety bars and spotter arms for safe, heavy training."
      />
      <FeatureItem 
        title="Cardio Equipment"
        description="Assault bikes, rowing machines, and battle ropes for conditioning work."
      />
    </section>
  );
};

interface FeatureItemProps {
  title: string;
  description: string;
}

const FeatureItem = ({ title, description }: FeatureItemProps) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-9 flex items-start justify-between border-b border-zinc-800 px-3 pb-9"
    >
      <div className="flex-1">
        <p className="mb-1.5 font-oswald text-2xl font-bold uppercase text-white">{title}</p>
        <p className="text-sm text-zinc-500">{description}</p>
      </div>
    </motion.div>
  );
};
