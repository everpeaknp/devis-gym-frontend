"use client";

import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import Image from "next/image";

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
  const imageRef = useRef<HTMLImageElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Swipe/drag state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

  useEffect(() => {
    // Prevent body scroll
    document.body.style.overflow = "hidden";

    // Animate in
    if (overlayRef.current && imageRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(
        imageRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" }
      );
    }

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onNext, onPrev]);

  // Animate image change
  useEffect(() => {
    if (imageRef.current) {
      // Reset any drag transform first
      setDragDistance(0);
      
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [currentIndex]);

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
        ref={imageContainerRef}
        className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center select-none"
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
        <Image
          ref={imageRef}
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          width={1200}
          height={800}
          className="max-w-full max-h-[90vh] object-contain pointer-events-none"
          style={{
            transform: isDragging ? `translateX(${dragDistance}px)` : "translateX(0px)",
            transition: isDragging ? "none" : "transform 0.2s ease-out",
            opacity: isDragging ? Math.max(0.7, 1 - Math.abs(dragDistance) / 300) : 1,
          }}
          sizes="90vw"
          quality={85}
          loading="lazy"
        />
      </div>
    </div>
  );
}
