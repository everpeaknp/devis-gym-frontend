"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  currentPage: string;
  eyebrow?: string;
}

export default function Breadcrumb({ items, currentPage, eyebrow }: BreadcrumbProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate background text
      tl.from(".breadcrumb-bg-text", {
        opacity: 0,
        scale: 1.2,
        duration: 1,
      });

      // Animate eyebrow
      if (eyebrow) {
        tl.from(
          ".breadcrumb-eyebrow",
          {
            opacity: 0,
            y: -20,
            duration: 0.6,
          },
          "-=0.7"
        );
      }

      // Animate title
      tl.from(
        ".breadcrumb-title",
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
        },
        "-=0.4"
      );

      // Animate breadcrumb items with stagger
      tl.from(
        ".breadcrumb-item",
        {
          opacity: 0,
          x: -10,
          duration: 0.5,
          stagger: 0.1,
        },
        "-=0.3"
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative bg-black overflow-hidden">
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <span className="breadcrumb-bg-text font-oswald text-[clamp(8rem,20vw,16rem)] leading-none font-bold uppercase tracking-tight text-white whitespace-nowrap">
          {currentPage}
        </span>
      </div>

      <div className="container-edge py-16 md:py-20 relative z-10">
        <div className="text-center">
          {/* Eyebrow - Yellow background with black text */}
          {eyebrow && (
            <div className="breadcrumb-eyebrow inline-block bg-accent px-4 py-1 mb-6">
              <span className="font-oswald text-xs font-bold uppercase tracking-wider text-black">
                {eyebrow}
              </span>
            </div>
          )}

          {/* Page Title - Large White Text */}
          <h1 className="breadcrumb-title font-oswald text-[clamp(3rem,10vw,4.5rem)] leading-[1.25] font-bold uppercase tracking-tight text-white mb-6">
            {currentPage}
          </h1>

          {/* Breadcrumb Navigation - Small gray text with yellow current page */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-sm">
            {items.map((item, index) => (
              <span key={index} className="breadcrumb-item flex items-center gap-2">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-zinc-400">{item.label}</span>
                )}
                {index < items.length - 1 && (
                  <span className="text-zinc-600">›</span>
                )}
              </span>
            ))}
            <span className="breadcrumb-item text-zinc-600">›</span>
            <span className="breadcrumb-item text-accent font-normal">{currentPage}</span>
          </nav>
        </div>
      </div>
    </section>
  );
}
