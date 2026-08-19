'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(' ');
}

export interface FlowSectionProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  'aria-label'?: string;
}

export const FlowSection: React.FC<FlowSectionProps> = ({
  className,
  style = {},
  children,
  'aria-label': ariaLabel,
}) => (
  <section
    data-flow-section
    aria-label={ariaLabel}
    className={cx('relative min-h-screen w-full overflow-hidden', className)}
  >
    <div
      data-flow-inner
      className={cx(
        'flow-art-container relative flex min-h-screen w-full flex-col justify-between gap-6 px-[4vw] pt-[clamp(2rem,8vw,4vw)] pb-[4vw]',
        'will-change-transform',
      )}
      style={{ transformOrigin: 'bottom left', ...style }}
    >
      {children}
    </div>
  </section>
);

export interface FlowArtProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

const childCount = (children: React.ReactNode) => React.Children.count(children);

const FlowArt: React.FC<FlowArtProps> = ({
  children,
  className,
  'aria-label': ariaLabel = 'Story scroll',
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || reducedMotion) return;

      const sections = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>('[data-flow-section]'),
      );

      if (sections.length === 0) return;

      let triggers: ScrollTrigger[] = [];

      // Rebuilt (not just re-measured) on resize: on mobile the address bar
      // collapsing after the first scroll changes window.innerHeight after
      // mount, which can flip whether a section "fits" the viewport. Since
      // that decides pin vs. no-pin per section, a stale call here desyncs
      // the pinning from the rotate-in scrub on the next section.
      const build = () => {
        triggers.forEach((t) => t.kill());
        triggers = [];

        const viewportHeight = window.visualViewport?.height ?? window.innerHeight;

        sections.forEach((section, i) => {
          gsap.set(section, { zIndex: i + 1 });

          const inner = section.querySelector<HTMLElement>('.flow-art-container');
          if (!inner) return;

          if (i > 0) {
            gsap.set(inner, { rotation: 30, transformOrigin: 'bottom left' });

            const tween = gsap.to(inner, {
              rotation: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top 25%',
                scrub: true,
                // Without this, scroll can come to rest at any point in the
                // rotation (a mouse wheel or trackpad has no obligation to stop
                // exactly at a boundary), leaving a section visibly frozen
                // mid-tilt — which reads as broken even though the animation
                // itself is working. Snap to whichever end of the transition is
                // closer once scrolling stops, so it only ever rests flat or
                // fully rotated.
                snap: {
                  snapTo: [0, 1],
                  duration: 0.3,
                  ease: 'power1.inOut',
                },
              },
            });

            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
          }

          if (i < sections.length - 1) {
            const sectionFitsViewport = section.scrollHeight <= viewportHeight * 1.05;

            if (!sectionFitsViewport) {
              return;
            }

            triggers.push(
              ScrollTrigger.create({
                trigger: section,
                start: 'bottom bottom',
                end: 'bottom top',
                pin: true,
                pinSpacing: false,
              }),
            );
          }
        });

        ScrollTrigger.refresh();
      };

      build();

      // Refresh after images load
      const images = containerRef.current.querySelectorAll('img');
      let loadedCount = 0;
      const totalImages = images.length;

      const onImageLoad = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setTimeout(() => {
            build();
          }, 100);
        }
      };

      images.forEach((img) => {
        if (img.complete) {
          onImageLoad();
        } else {
          img.addEventListener('load', onImageLoad);
          img.addEventListener('error', onImageLoad);
        }
      });

      let resizeTimeout: number | undefined;
      const onResize = () => {
        window.clearTimeout(resizeTimeout);
        resizeTimeout = window.setTimeout(build, 200);
      };
      window.addEventListener('resize', onResize);
      window.visualViewport?.addEventListener('resize', onResize);

      return () => {
        window.clearTimeout(resizeTimeout);
        window.removeEventListener('resize', onResize);
        window.visualViewport?.removeEventListener('resize', onResize);
        images.forEach((img) => {
          img.removeEventListener('load', onImageLoad);
          img.removeEventListener('error', onImageLoad);
        });
        triggers.forEach((t) => t.kill());
      };
    },
    { scope: containerRef, dependencies: [childCount(children), reducedMotion] },
  );

  return (
    <main
      ref={containerRef}
      aria-label={ariaLabel}
      className={cx('w-full overflow-x-hidden', className)}
    >
      {children}
    </main>
  );
};

export default FlowArt;
