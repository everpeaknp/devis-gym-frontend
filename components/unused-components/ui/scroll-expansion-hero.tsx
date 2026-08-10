'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  TouchEvent,
  WheelEvent,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  subtitle?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  subtitle,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [horizontalExpansionComplete, setHorizontalExpansionComplete] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 1200, height: 800 });
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const shouldHandleScroll = useRef<boolean>(true);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
    setHorizontalExpansionComplete(false);
  }, [mediaType]);

  // Prevent body scroll during horizontal expansion
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // This component drives its own wheel-based expansion progress and manually
    // locks body scroll during that phase. Lenis (the site-wide smooth-scroll
    // driver) isn't aware of that lock and keeps processing the same wheel
    // events, so the two fight over scroll input. Pausing Lenis for the
    // duration of the hijacked phase — and only that phase — resolves the
    // conflict without touching this component's own animation/design.
    type LenisLike = { stop: () => void; start: () => void };
    const getLenis = () => (window as unknown as { lenis?: LenisLike }).lenis;

    const applyLenisState = () => {
      if (!horizontalExpansionComplete) {
        getLenis()?.stop();
      } else {
        getLenis()?.start();
      }
    };

    if (!horizontalExpansionComplete) {
      // Lock body scroll during expansion
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      // Restore body scroll after expansion
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    applyLenisState();

    // React runs child effects before parent effects, so on first mount Lenis
    // (created by a provider higher up the tree) may not exist yet when this
    // runs. Retry once it announces itself.
    window.addEventListener('lenis:ready', applyLenisState);

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      window.removeEventListener('lenis:ready', applyLenisState);
      getLenis()?.start();
    };
  }, [horizontalExpansionComplete]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (typeof window === 'undefined') return;
      
      // If fully expanded, never interfere with scroll
      if (!shouldHandleScroll.current) {
        return;
      }
      
      // Only handle wheel events when we're at the top of the page
      const atTop = window.scrollY <= 5;
      
      if (!atTop) {
        return; // Allow normal scrolling when not at top
      }
      
      if (mediaFullyExpanded && e.deltaY < 0) {
        setMediaFullyExpanded(false);
        setShowContent(false);
        setHorizontalExpansionComplete(false);
        shouldHandleScroll.current = true;
        e.preventDefault();
        e.stopPropagation();
      } else if (!horizontalExpansionComplete) {
        // Phase 1: Horizontal expansion ONLY
        e.preventDefault();
        e.stopPropagation();
        
        const scrollDelta = e.deltaY * 0.002;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setHorizontalExpansionComplete(true);
          setShowContent(true);
          // Small delay to ensure smooth transition to scroll phase
          setTimeout(() => {
            setMediaFullyExpanded(true);
            shouldHandleScroll.current = false; // Stop handling scroll events
          }, 100);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!shouldHandleScroll.current) return;
      const atTop = window.scrollY <= 5;
      if (!atTop) return; // Allow normal touch when not at top
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (typeof window === 'undefined' || !touchStartY || !shouldHandleScroll.current) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      const atTop = window.scrollY <= 5;

      if (!atTop) {
        return; // Allow normal scrolling when not at top
      }

      if (mediaFullyExpanded && deltaY < -20) {
        setMediaFullyExpanded(false);
        setHorizontalExpansionComplete(false);
        setShowContent(false);
        shouldHandleScroll.current = true;
        e.preventDefault();
        e.stopPropagation();
      } else if (!horizontalExpansionComplete) {
        // Phase 1: Horizontal expansion ONLY
        e.preventDefault();
        e.stopPropagation();
        
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setHorizontalExpansionComplete(true);
          setShowContent(true);
          // Small delay to ensure smooth transition to scroll phase
          setTimeout(() => {
            setMediaFullyExpanded(true);
            shouldHandleScroll.current = false; // Stop handling scroll events
          }, 100);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
    };

    const handleScroll = (): void => {
      if (typeof window === 'undefined') return;
      
      if (!horizontalExpansionComplete && window.scrollY > 0) {
        window.scrollTo(0, 0);
      }
    };

    if (typeof window === 'undefined') return;

    window.addEventListener('wheel', handleWheel as unknown as EventListener, {
      passive: false,
    });
    window.addEventListener('scroll', handleScroll as EventListener);
    window.addEventListener(
      'touchstart',
      handleTouchStart as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener(
      'touchmove',
      handleTouchMove as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener('touchend', handleTouchEnd as EventListener);

    return () => {
      if (typeof window === 'undefined') return;
      
      window.removeEventListener(
        'wheel',
        handleWheel as unknown as EventListener
      );
      window.removeEventListener('scroll', handleScroll as EventListener);
      window.removeEventListener(
        'touchstart',
        handleTouchStart as unknown as EventListener
      );
      window.removeEventListener(
        'touchmove',
        handleTouchMove as unknown as EventListener
      );
      window.removeEventListener('touchend', handleTouchEnd as EventListener);
    };
  }, [scrollProgress, mediaFullyExpanded, horizontalExpansionComplete, touchStartY]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      if (typeof window === 'undefined') return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowDimensions({ width, height });
      setIsMobileState(width < 768);
    };

    checkIfMobile();
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkIfMobile);
      return () => window.removeEventListener('resize', checkIfMobile);
    }
  }, []);

  const mediaWidth = horizontalExpansionComplete 
    ? (isMobileState ? windowDimensions.width : windowDimensions.width)
    : 300 + scrollProgress * (isMobileState ? windowDimensions.width - 300 : windowDimensions.width - 300);
  const mediaHeight = horizontalExpansionComplete
    ? (isMobileState ? windowDimensions.height : windowDimensions.height)
    : 400 + scrollProgress * (isMobileState ? windowDimensions.height - 400 : windowDimensions.height - 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div
      ref={sectionRef}
      className='transition-colors duration-700 ease-in-out overflow-x-hidden'
    >
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>
          <motion.div
            className='absolute inset-0 z-0 h-full'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={bgImageSrc}
              alt='Background'
              width={1920}
              height={1080}
              className='w-screen h-screen'
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              loading='lazy'
            />
            <div className='absolute inset-0 bg-black/10' />
          </motion.div>

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>
              <div
                className='absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl'
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: horizontalExpansionComplete ? '100vw' : '95vw',
                  maxHeight: horizontalExpansionComplete ? '100vh' : '85vh',
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                }}
              >
                {mediaType === 'video' ? (
                  mediaSrc.includes('youtube.com') ? (
                    <div className='relative w-full h-full pointer-events-none'>
                      <iframe
                        width='100%'
                        height='100%'
                        src={
                          mediaSrc.includes('embed')
                            ? mediaSrc +
                              (mediaSrc.includes('?') ? '&' : '?') +
                              'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                            : mediaSrc.replace('watch?v=', 'embed/') +
                              '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                              mediaSrc.split('v=')[1]
                        }
                        className={`w-full h-full rounded-xl ${horizontalExpansionComplete ? 'rounded-none' : 'rounded-xl'}`}
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                      />
                      <div
                        className='absolute inset-0 z-10'
                        style={{ pointerEvents: 'none' }}
                      ></div>
                      <motion.div
                        className='absolute inset-0 bg-black/30 rounded-xl'
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  ) : (
                    <div className='relative w-full h-full pointer-events-none'>
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload='auto'
                        className={`w-full h-full object-cover ${horizontalExpansionComplete ? 'rounded-none' : 'rounded-xl'}`}
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <div
                        className='absolute inset-0 z-10'
                        style={{ pointerEvents: 'none' }}
                      ></div>
                      <motion.div
                        className={`absolute inset-0 bg-black/30 ${horizontalExpansionComplete ? 'rounded-none' : 'rounded-xl'}`}
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  )
                ) : (
                  <div className='relative w-full h-full'>
                    <Image
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      width={1280}
                      height={720}
                      className={`w-full h-full object-cover ${horizontalExpansionComplete ? 'rounded-none' : 'rounded-xl'}`}
                      loading='lazy'
                    />
                    <motion.div
                      className={`absolute inset-0 bg-black/50 ${horizontalExpansionComplete ? 'rounded-none' : 'rounded-xl'}`}
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                <div className='flex flex-col items-center text-center relative z-10 mt-4 transition-none'>
                  {date && (
                    <p
                      className='font-gotham text-white font-bold uppercase tracking-wider'
                      style={{ 
                        transform: `translateX(-${textTranslateX}vw)`,
                        fontWeight: 700,
                        fontSize: '17px',
                        lineHeight: '24px',
                        color: 'rgb(255, 255, 255)'
                      }}
                    >
                      {date}
                    </p>
                  )}
                  {subtitle && (
                    <p
                      className='font-gotham text-white font-medium uppercase tracking-wider mt-1'
                      style={{ 
                        transform: `translateX(-${textTranslateX}vw)`,
                        fontWeight: 500,
                        fontSize: '13px',
                        lineHeight: '19px',
                        color: 'rgb(255, 255, 255)'
                      }}
                    >
                      {subtitle}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className='font-gotham text-white font-medium text-center'
                      style={{ 
                        transform: `translateX(${textTranslateX}vw)`,
                        fontWeight: 500,
                        fontSize: '13px',
                        lineHeight: '19px',
                        color: 'rgb(255, 255, 255)'
                      }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col ${
                  textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                }`}
              >
                <motion.h2
                  className='font-gotham-condensed font-bold uppercase leading-[0.9] tracking-tight text-white transition-none'
                  style={{ 
                    transform: `translateX(-${textTranslateX}vw)`,
                    fontSize: '81px',
                    lineHeight: '81px',
                    fontWeight: 700,
                    color: 'rgb(255, 255, 255)'
                  }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className='font-gotham-condensed font-bold uppercase leading-[0.9] tracking-tight text-center text-white transition-none'
                  style={{ 
                    transform: `translateX(${textTranslateX}vw)`,
                    fontSize: '81px',
                    lineHeight: '81px',
                    fontWeight: 700,
                    color: 'rgb(255, 255, 255)'
                  }}
                >
                  {restOfTitle}
                </motion.h2>
              </div>
            </div>

            <motion.section
              className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20'
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;