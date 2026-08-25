"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/navigation";

// Register GSAP Plugins safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

export function Component() {
  const pathname = usePathname();
  // We need a ref for the parent container to scope GSAP
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMusicMuted, setIsMusicMuted] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  // Sync with localStorage on mount
  useEffect(() => {
    const musicEnabled = localStorage.getItem('musicEnabled') !== 'false';
    const soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
    setIsMusicMuted(!musicEnabled);
    setIsSoundMuted(!soundEnabled);
  }, []);

  // Initial Setup & Hover Effects
  useEffect(() => {
    if (!containerRef.current) return;

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
      // Shape Hover
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
    
    const ctx = gsap.context(() => {
      const navWrap = containerRef.current!.querySelector(".nav-overlay-wrapper");
      const menu = containerRef.current!.querySelector(".menu-content");
      const overlay = containerRef.current!.querySelector(".overlay");
      const bgPanels = containerRef.current!.querySelectorAll(".backdrop-layer");
      const menuLinks = containerRef.current!.querySelectorAll(".nav-link");
      const fadeTargets = containerRef.current!.querySelectorAll("[data-menu-fade]");
      
      const menuButton = containerRef.current!.querySelector(".nav-close-btn");
      const menuButtonTexts = menuButton?.querySelectorAll("p");
      const menuButtonIcon = menuButton?.querySelector(".menu-button-icon");
      const tl = gsap.timeline();
      
      if (isMenuOpen) {
        // OPEN
        if (navWrap) navWrap.setAttribute("data-nav", "open");
        
        tl.set(navWrap, { display: "block" })
          .set(menu, { xPercent: 0 }, "<");
          
        // Animate Button Text Swapping if it exists
        if (menuButtonTexts && menuButtonTexts.length > 0) {
          tl.fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.2 });
        }
        if (menuButtonIcon) {
          tl.fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315 }, "<");
        }
          
        tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
          .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, "<")
          .fromTo(menuLinks, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, "<+=0.35");
          
        if (fadeTargets.length) {
          tl.fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: "all" }, "<+=0.2");
        }
      } else {
        // CLOSE
        if (navWrap) navWrap.setAttribute("data-nav", "closed");
        tl.to(overlay, { autoAlpha: 0 })
          .to(menu, { xPercent: 120 }, "<");
          
        if (menuButtonTexts && menuButtonTexts.length > 0) {
          tl.to(menuButtonTexts, { yPercent: 0 }, "<");
        }
        if (menuButtonIcon) {
          tl.to(menuButtonIcon, { rotate: 0 }, "<");
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

  // Scroll handler to hide menu text
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleMusic = () => {
    setIsMusicMuted(prev => !prev);
    // Dispatch custom event for SoundManager
    window.dispatchEvent(new CustomEvent('toggleMusic'));
  };
  const toggleSound = () => {
    setIsSoundMuted(prev => !prev);
    // Dispatch custom event for SoundManager
    window.dispatchEvent(new CustomEvent('toggleSound'));
  };

  return (
    <div ref={containerRef}>
      <div className="site-header-wrapper">
        <header className="header">
          <div className="container is--full">
            <nav className="nav-row">
              <Link 
                href="/" 
                aria-label="home" 
                className={`nav-logo-row w-inline-block block transition-opacity duration-300 ${isMenuOpen ? 'xl:block opacity-0 pointer-events-none' : 'opacity-100'}`}
              >
                <div className="logo-container">
                  <img src="/logo/logo.jpg" alt="Devi's Gym Logo" className="logo-image" />
                  <span className="logo-text">DEVI'S GYM</span>
                </div>
              </Link>

              {/* Spacer for mobile to push hamburger to right */}
              <div className="xl:hidden flex-1"></div>

              {/* Desktop Horizontal Navigation */}
              <div className="desktop-nav hidden xl:flex">
                <ul className="desktop-nav-list">
                  {navigation.filter(item => item.href !== '/embroidery-demo').map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    return (
                      <li key={item.href} className="desktop-nav-item">
                        <Link 
                          href={item.href} 
                          className={`desktop-nav-link ${isActive ? 'active' : ''}`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* Desktop Sound Controls */}
                <div className="desktop-sound-controls">
                  {/* Music Control */}
                  <button 
                    role="button" 
                    className={`sound-control-btn cursor-pointer ${isMusicMuted ? 'muted' : ''}`}
                    onClick={toggleMusic}
                    aria-label="Toggle music"
                    title={isMusicMuted ? "Unmute background music" : "Mute background music"}
                  >
                    <div className="icon-wrap">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
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
                  </button>

                  {/* Sound Effects Control */}
                  <button 
                    role="button" 
                    className={`sound-control-btn cursor-pointer ${isSoundMuted ? 'muted' : ''}`}
                    onClick={toggleSound}
                    aria-label="Toggle sound effects"
                    title={isSoundMuted ? "Unmute click sounds" : "Mute click sounds"}
                  >
                    <div className="icon-wrap">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
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
                  </button>
                </div>
              </div>

              {/* Mobile Navigation Controls - Show on mobile and tablet */}
              <div className="nav-row__right xl:hidden">
                {/* Menu Button */}
                <button 
                  role="button" 
                  className={`nav-close-btn cursor-pointer ${isScrolled ? 'scrolled' : ''}`}
                  onClick={toggleMenu} 
                  style={{ pointerEvents: 'auto' }}
                >
                  <div className="icon-wrap">
                    {isMenuOpen ? (
                      // Cross/X icon when menu is open
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
                        className="menu-button-icon cross-icon"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    ) : (
                      // Hamburger icon when menu is closed
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
                        className="menu-button-icon hamburger-icon"
                      >
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                      </svg>
                    )}
                  </div>
                </button>
              </div>
            </nav>
          </div>
        </header>
      </div>

      {/* Mobile Fullscreen Menu - Show on mobile and tablet, hide only on desktop */}
      <section className="fullscreen-menu-container xl:hidden">
        <div data-nav="closed" className="nav-overlay-wrapper">
          <div className="overlay" onClick={closeMenu}></div>
          <nav className="menu-content">
            <div className="menu-bg">
              <div className="backdrop-layer first"></div>
              <div className="backdrop-layer second"></div>
              <div className="backdrop-layer"></div>
              
              {/* Abstract shapes container - Using gym accent color */}
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
              {/* Logo at top of sidebar */}
              <div className="sidebar-logo-container">
                <Link href="/" onClick={closeMenu} className="sidebar-logo-link">
                  <div className="sidebar-logo-content">
                    <img src="/logo/logo.jpg" alt="Devi's Gym Logo" className="sidebar-logo-image" />
                    <span className="sidebar-logo-text">DEVI'S GYM</span>
                  </div>
                </Link>
              </div>

              <ul className="menu-list">
                {navigation.filter(item => item.href !== '/embroidery-demo').map((item, index) => {
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  return (
                    <li key={item.href} className="menu-list-item" data-shape={index + 1}>
                      <Link href={item.href} className={`nav-link w-inline-block ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                        <p className="nav-link-text">{item.label}</p>
                        <div className="nav-link-hover-bg"></div>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Sound Controls at bottom of sidebar */}
              <div className="sidebar-sound-controls">
                {/* Music Control */}
                <button 
                  role="button" 
                  className={`sidebar-sound-btn cursor-pointer ${isMusicMuted ? 'muted' : ''}`}
                  onClick={toggleMusic}
                  aria-label="Toggle music"
                  title={isMusicMuted ? "Unmute background music" : "Mute background music"}
                >
                  <div className="sidebar-sound-icon-wrap">
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
                  <span className="sidebar-sound-label">
                    {isMusicMuted ? "Music Off" : "Music On"}
                  </span>
                </button>

                {/* Sound Effects Control */}
                <button 
                  role="button" 
                  className={`sidebar-sound-btn cursor-pointer ${isSoundMuted ? 'muted' : ''}`}
                  onClick={toggleSound}
                  aria-label="Toggle sound effects"
                  title={isSoundMuted ? "Unmute click sounds" : "Mute click sounds"}
                >
                  <div className="sidebar-sound-icon-wrap">
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
                  <span className="sidebar-sound-label">
                    {isSoundMuted ? "Sound Off" : "Sound On"}
                  </span>
                </button>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}
