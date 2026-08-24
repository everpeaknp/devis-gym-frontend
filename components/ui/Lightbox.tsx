"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import Image from "next/image";
import { cldOptimize } from "@/lib/cloudinary";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const incomingRef = useRef<HTMLImageElement>(null);
  const outgoingRef = useRef<HTMLImageElement>(null);

  // Swipe/drag state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

  // Two-layer slide transition: the outgoing image keeps its own <img> element
  // (no src mutation) and slides out while a freshly-mounted incoming image
  // slides in from the opposite side, so neither layer ever shows stale pixels.
  const prevIndexRef = useRef(currentIndex);
  const [outgoing, setOutgoing] = useState<{ index: number; direction: 1 | -1 } | null>(null);

  useEffect(() => {
    // Prevent body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Animate in
    if (overlayRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    }
    if (incomingRef.current) {
      gsap.fromTo(incomingRef.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" });
    }

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // Restore original overflow value, not "auto"
      document.body.style.overflow = originalOverflow || "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onNext, onPrev]);

  // Detect index changes and kick off the slide transition
  useEffect(() => {
    const prev = prevIndexRef.current;
    if (prev === currentIndex) return;

    const direction: 1 | -1 = currentIndex > prev ? 1 : -1;
    prevIndexRef.current = currentIndex;
    setDragDistance(0);
    setOutgoing({ index: prev, direction });
  }, [currentIndex]);

  // Preload neighboring images so the slide-in layer is already warm by the time it mounts
  useEffect(() => {
    [currentIndex - 1, currentIndex + 1].forEach((i) => {
      if (i < 0 || i >= images.length) return;
      const img = new window.Image();
      img.src = cldOptimize(images[i], 1600);
    });
  }, [currentIndex, images]);

  // Run the slide once both layers exist. useLayoutEffect (not useEffect) so the
  // incoming image is positioned off-screen before the browser paints — otherwise
  // it would flash centered for one frame before GSAP moves it into place.
  useLayoutEffect(() => {
    if (!outgoing || !incomingRef.current || !outgoingRef.current) return;

    const { direction } = outgoing;
    const tl = gsap.timeline({
      onComplete: () => setOutgoing(null),
    });

    gsap.set(outgoingRef.current, { xPercent: 0, opacity: 1 });
    gsap.set(incomingRef.current, { xPercent: direction * 100, opacity: 1 });

    tl.to(outgoingRef.current, { xPercent: direction * -100, duration: 0.5, ease: "power2.inOut" }, 0)
      .to(incomingRef.current, { xPercent: 0, duration: 0.5, ease: "power2.inOut" }, 0);

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outgoing]);

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragDistance(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const distance = e.clientX - startX;
    setDragDistance(distance);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    // Swipe threshold: 50px
    if (Math.abs(dragDistance) > 50) {
      if (dragDistance < 0 && currentIndex < images.length - 1) {
        onNext();
      } else if (dragDistance > 0 && currentIndex > 0) {
        onPrev();
      }
    }

    // Smooth snap back
    setIsDragging(false);
    setDragDistance(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragDistance(0);
    }
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setDragDistance(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const distance = e.touches[0].clientX - startX;
    setDragDistance(distance);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    // Swipe threshold: 50px
    if (Math.abs(dragDistance) > 50) {
      if (dragDistance < 0 && currentIndex < images.length - 1) {
        onNext();
      } else if (dragDistance > 0 && currentIndex > 0) {
        onPrev();
      }
    }

    // Smooth snap back
    setIsDragging(false);
    setDragDistance(0);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={(e) => {
        // Only close if not dragging (small movement allowed for click)
        if (Math.abs(dragDistance) < 5) {
          onClose();
        }
      }}
    >
      {/* Close Button - Top Right, left of menu */}
      <button
        onClick={onClose}
        className="absolute top-6 right-24 w-12 h-12 flex items-center justify-center bg-transparent border border-zinc-700 text-white hover:bg-accent hover:text-black hover:border-accent transition-all z-50 cursor-pointer"
        aria-label="Close lightbox"
      >
        <X size={24} />
      </button>

      {/* Image Counter - To the left of close button */}
      <div className="absolute top-6 right-40 font-oswald text-sm font-bold text-white z-50 flex items-center h-12">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous Button */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-transparent border border-zinc-700 text-white hover:bg-accent hover:text-black hover:border-accent transition-all z-50 cursor-pointer"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Next Button */}
      {currentIndex < images.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-transparent border border-zinc-700 text-white hover:bg-accent hover:text-black hover:border-accent transition-all z-50 cursor-pointer"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Main Image */}
      <div
        className="relative w-[90vw] h-[90vh] select-none overflow-hidden"
        style={{
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {outgoing && (
          <Image
            ref={outgoingRef}
            src={cldOptimize(images[outgoing.index], 1600)}
            alt={`Gallery image ${outgoing.index + 1}`}
            fill
            className="object-contain pointer-events-none absolute inset-0"
            sizes="90vw"
            quality={85}
          />
        )}
        <Image
          ref={incomingRef}
          src={cldOptimize(images[currentIndex], 1600)}
          alt={`Gallery image ${currentIndex + 1}`}
          fill
          className="object-contain pointer-events-none absolute inset-0"
          style={
            !outgoing
              ? {
                  transform: isDragging ? `translateX(${dragDistance}px)` : "translateX(0px)",
                  transition: isDragging ? "none" : "transform 0.2s ease-out",
                  opacity: isDragging ? Math.max(0.7, 1 - Math.abs(dragDistance) / 300) : 1,
                }
              : undefined
          }
          sizes="90vw"
          quality={85}
          priority
        />
      </div>
    </div>
  );
}
