"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AnimatedLayerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  smoothScroll?: boolean;
}

const AnimatedLayerButton = React.forwardRef<
  HTMLButtonElement,
  AnimatedLayerButtonProps
>(({ className, children, href, smoothScroll = false, ...props }, ref) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (href) {
      e.preventDefault();
      
      // Check if it's a hash link for smooth scrolling
      if (smoothScroll && href.startsWith('#')) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      } else {
        // Regular navigation
        window.location.href = href;
      }
    }
    props.onClick?.(e);
  };

  return (
    <button
      className={cn(
        // Base styles for the button
        "group relative flex h-[50px] w-[180px] items-center justify-center overflow-hidden rounded-[30px] border-none",
        "cursor-pointer bg-accent shadow-[8px_8px_0px_rgba(199,255,61,0.3)] transition-all duration-300 ease-in-out",
        // Push-down effect on hover
        "hover:translate-y-[5px] hover:shadow-[3px_3px_0px_rgba(199,255,61,0.5)]",
        // Accessibility focus styles
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      ref={ref}
      onClick={handleClick}
      {...props}
    >
      {/* Animated shimmer gradient overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </div>

      {/* Pulse ring effect on hover */}
      <div className="absolute inset-0 rounded-[30px] opacity-0 group-hover:opacity-100 group-hover:animate-ping-slow">
        <div className="absolute inset-0 rounded-[30px] bg-accent/30" />
      </div>

      {/* Text layer with scale effect */}
      <span className="relative z-10 font-semibold text-[#0a0a0a] transition-transform duration-300 text-[1.1em] uppercase tracking-wide group-hover:scale-105">
        {children}
      </span>
    </button>
  );
});

AnimatedLayerButton.displayName = "AnimatedLayerButton";

export { AnimatedLayerButton };
