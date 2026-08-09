'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import Image from 'next/image';

export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');

    if (triggerElement) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0
        }
      });

      const layers = [
        { layer: "1", yPercent: 70 },
        { layer: "2", yPercent: 55 },
        { layer: "3", yPercent: 40 },
        { layer: "4", yPercent: 10 }
      ];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: "none"
          },
          idx === 0 ? undefined : "<"
        );
      });
    }

    // Only initialize Lenis on desktop (width > 1024px)
    const isMobile = window.innerWidth <= 1024;
    let lenis: Lenis | null = null;

    if (!isMobile) {
      lenis = new Lenis();
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => { 
        if (lenis) {
          lenis.raf(time * 1000); 
        }
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      // On mobile, just use ScrollTrigger update on scroll
      const handleScroll = () => ScrollTrigger.update();
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        ScrollTrigger.getAll().forEach(st => st.kill());
        if (triggerElement) {
          gsap.killTweensOf(triggerElement);
        }
      };
    }

    return () => {
      // Clean up GSAP and ScrollTrigger instances
      ScrollTrigger.getAll().forEach(st => st.kill());
      if (triggerElement) {
        gsap.killTweensOf(triggerElement);
      }
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return (
    <div className="parallax" ref={parallaxRef}>
      <section className="parallax__header">
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow"></div>
          <div data-parallax-layers className="parallax__layers">
            <Image 
              src="/bg.jpg" 
              alt=""
              width={800}
              height={600}
              data-parallax-layer="1" 
              className="parallax__layer-img" 
              loading="lazy"
            />
            <video 
              src="/bg.mp4" 
              autoPlay 
              muted 
              loop 
              playsInline 
              data-parallax-layer="2" 
              className="parallax__layer-img"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0
              }}
            />
            <div data-parallax-layer="3" className="parallax__layer-title">
              <h2 className="parallax__title">Join Our Elite Membership</h2>
            </div>
            <Image 
              src="https://res.cloudinary.com/ufiebboc/image/upload/v1786268785/devis-gym/backgrounds/parallax-layer.webp" 
              alt=""
              width={800}
              height={600}
              data-parallax-layer="4" 
              className="parallax__layer-img" 
              loading="lazy"
              quality={85}
            />
          </div>
          <div className="parallax__fade"></div>
        </div>
      </section>

      <section className="parallax__content">
      </section>
    </div>
  );
}