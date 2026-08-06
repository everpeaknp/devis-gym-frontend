"use client";

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

export default function FinalCTASection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const x = useTransform(scrollYProgress, [0, 1], ['-100%', '100%']);

  return (
    <section ref={containerRef} className="bg-background-elevated relative overflow-hidden">
      {/* Equipment image moving from left to right on right side */}
      <motion.div
        style={{ x }}
        className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 opacity-10 pointer-events-none z-0"
      >
        <Image
          src="/equipment/7.webp"
          alt="Equipment background"
          width={384}
          height={384}
          className="w-full h-full object-contain"
          loading="lazy"
          quality={75}
        />
      </motion.div>

      <div className="container-edge py-16 md:py-20 relative z-10">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-oswald text-[48px] leading-[56px] md:text-[64px] md:leading-[72px] font-bold uppercase tracking-tight mb-6 text-white">
              Ready to <span className="text-accent">Start Training?</span>
            </h2>
            <p className="text-muted text-base leading-relaxed mb-8">
              Join our community and experience what real training feels like.
              No commitments, no pressure - just results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-accent hover:bg-accent-bright text-black font-bold uppercase tracking-wide transition-colors rounded-none"
              >
                Contact Us
              </a>
              <a
                href="/#membership"
                className="inline-block px-8 py-4 bg-transparent border border-zinc-700 hover:bg-white hover:border-white text-white hover:text-black font-bold uppercase tracking-wide transition-all rounded-none"
              >
                View Membership
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
