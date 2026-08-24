"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import Link from "next/link";
import Image from "next/image";
import SoundManager from "@/components/ui/SoundManager";
import { motion, useScroll, useTransform } from "framer-motion";

// Register GSAP Plugins safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

export default function KineticNavigation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMusicMuted, setIsMusicMuted] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  
  const { scrollY } = useScroll();
  const menuOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const musicOpacity = useTransform(scrollY, [100, 300], [0, 1]);
  const muteOpacity = useTransform(scrollY, [300, 500], [0, 1]);

  // Initial Setup & Hover Effects
  useEffect(() => {
    if (!containerRef.current) return;

    // Skip shape animations on mobile for better performance
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      console.log('[Navigation] Mobile detected - shape animations disabled');
      return;
    }

    // Create custom easing
    try {
      if (!gsap.parseEase("main")) {
        CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
        gsap.defaults({ ease: "main", duration: 0.7 });
      }
    } catch (e) {
      console.warn("CustomEase failed to load, falling back to default.", e);
      gsap.defaults({ ease: "power2.out", duration: 0.7 });
    }

    const ctx = gsap.context(() => {
      // Shape Hover - Desktop only
      const menuItems = containerRef.current!.querySelectorAll(".menu-list-item[data-shape]");
      const shapesContainer = containerRef.current!.querySelector(".ambient-background-shapes");
      
      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute("data-shape");
        const shape = shapesContainer ? shapesContainer.querySelector(`.bg-shape-${shapeIndex}`) : null;
        
        if (!shape) return;
        
        const shapeEls = shape.querySelectorAll(".shape-element");
        const onEnter = () => {
          if (shapesContainer) {
            shapesContainer.querySelectorAll(".bg-shape").forEach((s) => s.classList.remove("active"));
          }
          shape.classList.add("active");
          
          gsap.fromTo(shapeEls, 
            { scale: 0.5, opacity: 0, rotation: -10 },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)", overwrite: "auto" }
          );
        };
        
        const onLeave = () => {
          gsap.to(shapeEls, {
            scale: 0.8, opacity: 0, duration: 0.3, ease: "power2.in",
            onComplete: () => shape.classList.remove("active"),
            overwrite: "auto"
          });
        };
        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);
        
        (item as any)._cleanup = () => {
          item.removeEventListener("mouseenter", onEnter);
          item.removeEventListener("mouseleave", onLeave);
        };
      });
    }, containerRef);

    return () => {
      ctx.revert();
      if (containerRef.current) {
        const items = containerRef.current.querySelectorAll(".menu-list-item[data-shape]");
        items.forEach((item: any) => item._cleanup && item._cleanup());
      }
    };
  }, []);

  // Menu Open/Close Animation Effect
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Detect mobile for simpler animations
    const isMobile = window.innerWidth < 1024;
    
    const ctx = gsap.context(() => {
      const navWrap = containerRef.current!.querySelector(".nav-overlay-wrapper");
      const menu = containerRef.current!.querySelector(".menu-content");
      const overlay = containerRef.current!.querySelector(".overlay");
      const bgPanels = containerRef.current!.querySelectorAll(".backdrop-layer");
      const menuLinks = containerRef.current!.querySelectorAll(".nav-link");
      const fadeTargets = containerRef.current!.querySelectorAll("[data-menu-fade]");
      
      const menuButton = containerRef.current!.querySelector(".nav-close-btn");
      const menuButtonTexts = menuButton?.querySelectorAll("p");
      const tl = gsap.timeline();
      
      if (isMenuOpen) {
        // OPEN - Simplified for mobile, full animations for desktop
        if (navWrap) navWrap.setAttribute("data-nav", "open");
        
        tl.set(navWrap, { display: "block" })
          .set(menu, { xPercent: 100 });
          
        // Animate Button Text Swapping if it exists
        if (menuButtonTexts && menuButtonTexts.length > 0) {
          tl.fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.2 });
        }
          
        tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<");
        
        if (isMobile) {
          // Mobile: Fast, simple slide-in without backdrop animation
          tl.to(menu, { xPercent: 0, duration: 0.35, ease: "power2.out" }, "<")
            .fromTo(menuLinks, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.03, duration: 0.3 }, "<+=0.15");
        } else {
          // Desktop: Full animation with backdrops
          tl.to(menu, { xPercent: 0, duration: 0.6, ease: "power3.out" }, "<")
            .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, "<+=0.1")
            .fromTo(menuLinks, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, "<+=0.35");
        }
          
        if (fadeTargets.length) {
          tl.fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: "all" }, "<+=0.1");
        }
      } else {
        // CLOSE - Simplified for mobile
        if (navWrap) navWrap.setAttribute("data-nav", "closed");
        
        if (isMobile) {
          // Mobile: Fast close
          tl.to(menuLinks, { opacity: 0, y: -10, stagger: 0.02, duration: 0.2 })
            .to(overlay, { autoAlpha: 0, duration: 0.25 }, "<")
            .to(menu, { xPercent: 100, duration: 0.3, ease: "power2.in" }, "<");
        } else {
          // Desktop: Full animation
          tl.to(menuLinks, { yPercent: 140, rotate: 10, stagger: 0.03, duration: 0.3 })
            .to(overlay, { autoAlpha: 0, duration: 0.4 }, "<")
            .to(menu, { xPercent: 100, duration: 0.5, ease: "power3.in" }, "<");
        }
          
        if (menuButtonTexts && menuButtonTexts.length > 0) {
          tl.to(menuButtonTexts, { yPercent: 0 }, "<");
        }
        
        tl.set(navWrap, { display: "none" });
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, [isMenuOpen]);

  // keydown Escape handling
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleMusic = () => {
    setIsMusicMuted(prev => !prev);
    window.dispatchEvent(new CustomEvent('toggleMusic'));
  };
  const toggleSound = () => {
    setIsSoundMuted(prev => !prev);
    window.dispatchEvent(new CustomEvent('toggleSound'));
  };

  return (
    <div ref={containerRef}>
      <div className="site-header-wrapper">
        <header className="header">
          <div className="container is--full">
            <nav className="nav-row">
              <Link href="/" aria-label="home" className="nav-logo-row cursor-pointer flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center p-1.5 overflow-hidden relative">
                  <Image 
                    src="/logo/logo.jpg" 
                    alt="Devi's Gym Logo" 
                    fill
                    priority
                    className="object-contain p-0.5"
                    sizes="40px"
                  />
                </div>
                <span className="logo-text">DEVI'S GYM</span>
              </Link>

              {/* Desktop Horizontal Navigation - Hidden on mobile/tablet */}
              <div className="hidden xl:flex items-center gap-8 flex-1 justify-center">
                <Link href="/" className="nav-desktop-link text-white hover:text-accent transition-colors duration-300 font-medium">
                  Home
                </Link>
                <Link href="/classes" className="nav-desktop-link text-white hover:text-accent transition-colors duration-300 font-medium">
                  Classes
                </Link>
                <Link href="/gym" className="nav-desktop-link text-white hover:text-accent transition-colors duration-300 font-medium">
                  Our Gym
                </Link>
                <Link href="/gallery" className="nav-desktop-link text-white hover:text-accent transition-colors duration-300 font-medium">
                  Gallery
                </Link>
                <Link href="/about" className="nav-desktop-link text-white hover:text-accent transition-colors duration-300 font-medium">
                  About Us
                </Link>
                <Link href="/contact" className="nav-desktop-link text-white hover:text-accent transition-colors duration-300 font-medium">
                  Contact
                </Link>
                <Link href="/#membership" className="nav-desktop-link text-white hover:text-accent transition-colors duration-300 font-medium">
                  Membership
                </Link>
              </div>

              <div className="nav-row__right">
                {/* Menu Button - Visible on mobile/tablet, hidden on desktop */}
                <motion.button 
                  role="button" 
                  className="nav-close-btn xl:hidden flex flex-col items-center gap-1 cursor-pointer" 
                  onClick={toggleMenu} 
                  style={{ pointerEvents: 'auto', opacity: isMenuOpen ? 1 : menuOpacity }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  data-menu-state={isMenuOpen ? "open" : "closed"}
                >
                  <div className="text-xs text-accent mb-1">{isMenuOpen ? "CLOSE" : "MENU"}</div>
                  
                  <div className="icon-wrap">
                    {isMenuOpen ? (
                      // Cross icon when menu is open
                      <div className="w-6 h-6 relative flex items-center justify-center">
                        <div className="absolute w-6 h-0.5 bg-accent rotate-45"></div>
                        <div className="absolute w-6 h-0.5 bg-accent -rotate-45"></div>
                      </div>
                    ) : (
                      // Hamburger icon when menu is closed
                      <div className="w-6 h-6 flex flex-col justify-center gap-1">
                        <div className="w-6 h-0.5 bg-white"></div>
                        <div className="w-6 h-0.5 bg-white"></div>
                        <div className="w-6 h-0.5 bg-white"></div>
                      </div>
                    )}
                  </div>
                </motion.button>
                
                {/* Music Control Button */}
                <motion.button 
                  role="button" 
                  className={`sound-control-btn flex flex-col items-center gap-1 cursor-pointer ${isMusicMuted ? 'muted' : ''}`}
                  onClick={toggleMusic}
                  aria-label="Toggle music"
                  title={isMusicMuted ? "Unmute background music" : "Mute background music"}
                  style={{ pointerEvents: 'auto', opacity: musicOpacity }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                >
                  <div className="icon-wrap">
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
                      className="sound-icon"
                    >
                      {isMusicMuted ? (
                        <>
                          <path d="M9 18V5l12-2v13"></path>
                          <circle cx="6" cy="18" r="3"></circle>
                          <circle cx="18" cy="16" r="3"></circle>
                          <line x1="2" y1="2" x2="22" y2="22"></line>
                        </>
                      ) : (
                        <>
                          <path d="M9 18V5l12-2v13"></path>
                          <circle cx="6" cy="18" r="3"></circle>
                          <circle cx="18" cy="16" r="3"></circle>
                        </>
                      )}
                    </svg>
                  </div>
                </motion.button>

                {/* Sound Effects Control Button */}
                <motion.button 
                  role="button" 
                  className={`sound-control-btn flex flex-col items-center gap-1 cursor-pointer ${isSoundMuted ? 'muted' : ''}`}
                  onClick={toggleSound}
                  aria-label="Toggle sound effects"
                  title={isSoundMuted ? "Unmute click sounds" : "Mute click sounds"}
                  style={{ pointerEvents: 'auto', opacity: muteOpacity }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                >
                  <div className="icon-wrap">
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
                      className="sound-icon"
                    >
                      {isSoundMuted ? (
                        <>
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                          <line x1="23" y1="9" x2="17" y2="15"></line>
                          <line x1="17" y1="9" x2="23" y2="15"></line>
                        </>
                      ) : (
                        <>
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                        </>
                      )}
                    </svg>
                  </div>
                </motion.button>
              </div>
            </nav>
          </div>
        </header>
      </div>

      <section className="fullscreen-menu-container">
        <div data-nav="closed" className="nav-overlay-wrapper">
          <div className="overlay" onClick={closeMenu}></div>
          <nav className="menu-content">
            <div className="menu-bg">
              <div className="backdrop-layer first"></div>
              <div className="backdrop-layer second"></div>
              <div className="backdrop-layer"></div>
              
              {/* Abstract shapes container */}
              <div className="ambient-background-shapes">
                {/* Shape 1: Floating circles */}
                <svg className="bg-shape bg-shape-1" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="80" cy="120" r="40" fill="rgba(199,255,61,0.15)" />
                  <circle className="shape-element" cx="300" cy="80" r="60" fill="rgba(199,255,61,0.12)" />
                  <circle className="shape-element" cx="200" cy="300" r="80" fill="rgba(199,255,61,0.1)" />
                  <circle className="shape-element" cx="350" cy="280" r="30" fill="rgba(199,255,61,0.15)" />
                </svg>

                {/* Shape 2: Wave pattern */}
                <svg className="bg-shape bg-shape-2" viewBox="0 0 400 400" fill="none">
                  <path
                    className="shape-element"
                    d="M0 200 Q100 100, 200 200 T 400 200"
                    stroke="rgba(199,255,61,0.2)"
                    strokeWidth="60"
                    fill="none"
                  />
                  <path
                    className="shape-element"
                    d="M0 280 Q100 180, 200 280 T 400 280"
                    stroke="rgba(199,255,61,0.15)"
                    strokeWidth="40"
                    fill="none"
                  />
                </svg>

                {/* Shape 3: Grid dots */}
                <svg className="bg-shape bg-shape-3" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="50" cy="50" r="8" fill="rgba(199,255,61,0.3)" />
                  <circle className="shape-element" cx="150" cy="50" r="8" fill="rgba(199,255,61,0.3)" />
                  <circle className="shape-element" cx="250" cy="50" r="8" fill="rgba(199,255,61,0.3)" />
                  <circle className="shape-element" cx="350" cy="50" r="8" fill="rgba(199,255,61,0.3)" />
                  <circle className="shape-element" cx="100" cy="150" r="12" fill="rgba(199,255,61,0.25)" />
                  <circle className="shape-element" cx="200" cy="150" r="12" fill="rgba(199,255,61,0.25)" />
                  <circle className="shape-element" cx="300" cy="150" r="12" fill="rgba(199,255,61,0.25)" />
                  <circle className="shape-element" cx="50" cy="250" r="10" fill="rgba(199,255,61,0.3)" />
                  <circle className="shape-element" cx="150" cy="250" r="10" fill="rgba(199,255,61,0.3)" />
                  <circle className="shape-element" cx="250" cy="250" r="10" fill="rgba(199,255,61,0.3)" />
                  <circle className="shape-element" cx="350" cy="250" r="10" fill="rgba(199,255,61,0.3)" />
                  <circle className="shape-element" cx="100" cy="350" r="6" fill="rgba(199,255,61,0.3)" />
                  <circle className="shape-element" cx="200" cy="350" r="6" fill="rgba(199,255,61,0.3)" />
                  <circle className="shape-element" cx="300" cy="350" r="6" fill="rgba(199,255,61,0.3)" />
                </svg>

                {/* Shape 4: Organic blobs */}
                <svg className="bg-shape bg-shape-4" viewBox="0 0 400 400" fill="none">
                  <path
                    className="shape-element"
                    d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100"
                    fill="rgba(199,255,61,0.12)"
                  />
                  <path
                    className="shape-element"
                    d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200"
                    fill="rgba(199,255,61,0.1)"
                  />
                </svg>

                {/* Shape 5: Diagonal lines */}
                <svg className="bg-shape bg-shape-5" viewBox="0 0 400 400" fill="none">
                  <line className="shape-element" x1="0" y1="100" x2="300" y2="400" stroke="rgba(199,255,61,0.15)" strokeWidth="30" />
                  <line className="shape-element" x1="100" y1="0" x2="400" y2="300" stroke="rgba(199,255,61,0.12)" strokeWidth="25" />
                  <line className="shape-element" x1="200" y1="0" x2="400" y2="200" stroke="rgba(199,255,61,0.1)" strokeWidth="20" />
                </svg>
              </div>
            </div>

            <div className="menu-content-wrapper">
              {/* Close button at top of menu */}
              <div className="absolute top-6 right-6 z-10">
                <button 
                  onClick={closeMenu}
                  className="w-12 h-12 flex items-center justify-center bg-black/20 rounded-full backdrop-blur-sm hover:bg-accent hover:text-black transition-all duration-300"
                  aria-label="Close menu"
                >
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
                    className="w-6 h-6"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <ul className="menu-list">
                <li className="menu-list-item" data-shape="1">
                  <Link href="/" className="nav-link cursor-pointer" onClick={closeMenu}>
                    <p className="nav-link-text">Home</p>
                    <div className="nav-link-hover-bg"></div>
                  </Link>
                </li>
                <li className="menu-list-item" data-shape="2">
                  <Link href="/classes" className="nav-link cursor-pointer" onClick={closeMenu}>
                    <p className="nav-link-text">Classes</p>
                    <div className="nav-link-hover-bg"></div>
                  </Link>
                </li>
                <li className="menu-list-item" data-shape="3">
                  <Link href="/gym" className="nav-link cursor-pointer" onClick={closeMenu}>
                    <p className="nav-link-text">Our Gym</p>
                    <div className="nav-link-hover-bg"></div>
                  </Link>
                </li>
                <li className="menu-list-item" data-shape="4">
                  <Link href="/gallery" className="nav-link cursor-pointer" onClick={closeMenu}>
                    <p className="nav-link-text">Gallery</p>
                    <div className="nav-link-hover-bg"></div>
                  </Link>
                </li>
                <li className="menu-list-item" data-shape="5">
                  <Link href="/about" className="nav-link cursor-pointer" onClick={closeMenu}>
                    <p className="nav-link-text">About Us</p>
                    <div className="nav-link-hover-bg"></div>
                  </Link>
                </li>
                <li className="menu-list-item" data-shape="1">
                  <Link href="/contact" className="nav-link cursor-pointer" onClick={closeMenu}>
                    <p className="nav-link-text">Contact</p>
                    <div className="nav-link-hover-bg"></div>
                  </Link>
                </li>
                <li className="menu-list-item" data-shape="2">
                  <Link href="/#membership" className="nav-link cursor-pointer" onClick={closeMenu}>
                    <p className="nav-link-text">Membership</p>
                    <div className="nav-link-hover-bg"></div>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}
