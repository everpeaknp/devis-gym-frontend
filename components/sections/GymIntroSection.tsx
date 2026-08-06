"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { galleryImages } from "@/data/gallery";
import Lightbox from "@/components/ui/Lightbox";
import { EmbroideredWordPatches } from "@/components/unused-components/ui/embroidered-word-patches";

export default function GymIntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Track vertical start + swipe-direction lock so mobile page scroll isn't hijacked
  const [touchStartY, setTouchStartY] = useState(0);
  const [isHorizontalSwipe, setIsHorizontalSwipe] = useState(false);

  // Filter gym category images
  const gymImages = galleryImages.filter(img => img.category === "Gym" && img.available);
  const lightboxImages = gymImages.map(img => img.src);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? gymImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === gymImages.length - 1 ? 0 : prev + 1));
  };

  // Lightbox handlers
  const openLightbox = () => {
    if (!isDragging) {
      setLightboxOpen(true);
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextLightboxImage = () => {
    setCurrentImageIndex((prev) =>
      prev < lightboxImages.length - 1 ? prev + 1 : prev
    );
  };

  const prevLightboxImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Mouse/Touch drag handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setDragDistance(0);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const distance = clientX - startX;
    setDragDistance(distance);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    // Reduced threshold for mobile - smaller swipes trigger image change
    const threshold = window.innerWidth < 768 ? 30 : 50; // 30px on mobile, 50px on desktop

    if (Math.abs(dragDistance) < 5) {
      // Small movement = click, open lightbox
      openLightbox();
    } else if (dragDistance > threshold) {
      handlePrevImage();
    } else if (dragDistance < -threshold) {
      handleNextImage();
    }

    setIsDragging(false);
    setStartX(0);
    setDragDistance(0);
  };

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const onMouseUp = () => {
    handleDragEnd();
  };

  const onMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  // Touch events — direction-locked so vertical page scroll still works on mobile.
  // We only hijack the touch (preventDefault) once a horizontal intent is detected.
  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleDragStart(touch.clientX);
    setTouchStartY(touch.clientY);
    setIsHorizontalSwipe(false);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - touchStartY;

    if (!isHorizontalSwipe && Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8) {
      setIsHorizontalSwipe(true);
    }

    if (isHorizontalSwipe) {
      e.preventDefault(); // only block scroll once we know it's a horizontal drag
      handleDragMove(touch.clientX);
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    handleDragEnd();
    setIsHorizontalSwipe(false);
  };

  // Removed all scroll animations

  return (
    <section
      ref={sectionRef}
      className="bg-background overflow-hidden relative"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/wallbg.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          loading="lazy"
          quality={80}
        />
      </div>
      {/* Black opacity overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      <div className="container-edge pt-4 sm:pt-6 md:pt-8 lg:pt-12 pb-6 sm:pb-8 md:pb-12 relative z-10">
        {/* Row 1: Yellow Arrow Header (left) + Mission Image (center) + Story Image (right) */}
        <div className="flex flex-col gap-3 sm:gap-4 md:grid md:grid-cols-2 xl:grid-cols-12 xl:gap-6 mb-4 sm:mb-6 md:mb-8">
          {/* Introduction/The Gym with Arrow */}
          <div className="xl:col-span-4 card-intro group order-1">
            <div ref={containerRef} className="relative min-h-[160px] xs:min-h-[180px] sm:min-h-[220px] md:min-h-[280px] lg:min-h-[320px] flex items-center justify-center cursor-pointer">
              {/* Embroidered Patches - background layer behind everything, hidden on mobile */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[60%] -translate-y-1/2 -z-20 pointer-events-none hidden sm:block">
                <EmbroideredWordPatches 
                  width={400} 
                  height={180} 
                  className="opacity-60 hover:opacity-70 transition-opacity duration-300" 
                />
              </div>

              {/* Arrow SVG behind text - hidden on mobile */}
              <div
                ref={arrowRef}
                className="absolute left-1/2 -translate-x-1/2 top-[20%] sm:top-[25%] md:top-[30%] w-[60%] sm:w-[70%] md:w-[80%] lg:w-[90%] xl:w-[100%] h-auto pointer-events-none -z-10 transition-all duration-500 group-hover:brightness-125 group-hover:drop-shadow-[0_0_15px_rgba(225,255,0,0.5)] group-hover:translate-y-2 sm:group-hover:translate-y-4 md:group-hover:translate-y-6 lg:group-hover:translate-y-10 rotate-90 hidden sm:block"
              >
                <Image
                  src="/icons/arrow-right.svg"
                  alt=""
                  width={200}
                  height={50}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>

              {/* Text - mobile centered, desktop with negative margin */}
              <div className="relative text-center mt-0 sm:-mt-24 sm:sm:-mt-30 md:-mt-36 lg:-mt-42 xl:-mt-48 px-2">
                <h2 className="font-oswald uppercase text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-[0.9] mb-1 sm:mb-2 md:mb-4 break-words">
                  Devi's Gym
                </h2>
              </div>
            </div>
          </div>

          {/* Mission Image */}
          <div className="xl:col-span-4 card-mission order-2">
            <Image
              src="/devis/IMG_7358.JPG.jpeg"
              alt="Mission"
              width={400}
              height={460}
              className="w-full h-[280px] xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[460px] xl:h-[320px] object-cover rounded-sm"
              loading="lazy"
              quality={80}
            />
          </div>

          {/* Mission Text - Mobile Only */}
          <div className="xl:col-span-4 card-mission order-3 md:hidden px-1 sm:px-0">
            <h3 className="font-oswald uppercase text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4">Mission</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-3 md:mb-4">
              Our purpose is to pass on empowering knowledge and training guidance in order to have a positive impact on the health and fitness of everyone we work with.
            </p>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              To provide a personalised health and fitness service that unlocks every individual's true potential so they can achieve their desired goals.
            </p>
          </div>

          {/* Story Image */}
          <div className="xl:col-span-4 card-story order-4 md:order-3">
            <Image
              src="/devis/IMG_7375.JPG.jpeg"
              alt="Story"
              width={400}
              height={460}
              className="w-full h-[280px] xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[460px] xl:h-[320px] object-cover rounded-sm"
              loading="lazy"
              quality={80}
            />
          </div>
        </div>

        {/* Row 2: Mission Text (left/center) + Story Text (right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
          {/* Mission Text - Desktop Only */}
          <div className="md:col-start-1 xl:col-span-4 xl:col-start-5 card-mission px-1 sm:px-0 hidden md:block">
            <h3 className="font-oswald uppercase text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4">Mission</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-3 md:mb-4">
              Our purpose is to pass on empowering knowledge and training guidance in order to have a positive impact on the health and fitness of everyone we work with.
            </p>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              To provide a personalised health and fitness service that unlocks every individual's true potential so they can achieve their desired goals.
            </p>
          </div>

          {/* Story Text */}
          <div className="xl:col-span-4 card-story px-1 sm:px-0">
            <h3 className="font-oswald uppercase text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4">Story</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Our main focus at Devi's Gym is functional training because of the proven benefits. With an emphasis on mobility, strength, and conditioning, the benefits of functional training differ from other workouts because of the way it targets your body.
            </p>
          </div>
        </div>

        {/* Row 3: Equipment Image (large, left/center) + Approach Image (right) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
          {/* Equipment Large Image with Yellow Banner */}
          <div className="xl:col-span-8 card-equipment">
            <div
              className="relative cursor-grab active:cursor-grabbing select-none"
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseLeave}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              style={{
                userSelect: 'none',
                WebkitUserSelect: 'none',
                msUserSelect: 'none',
                WebkitTouchCallout: 'none',
                touchAction: 'pan-y', // let the browser handle vertical scroll natively
              }}
            >
              <Image
                key={currentImageIndex}
                src={gymImages[currentImageIndex]?.src}
                alt={gymImages[currentImageIndex]?.alt}
                width={800}
                height={460}
                className="w-full h-[280px] xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[460px] object-cover pointer-events-none transition-transform duration-200 rounded-sm"
                style={{
                  transform: isDragging && isHorizontalSwipe ? `translateX(${dragDistance}px)` : 'translateX(0)',
                }}
                sizes="(max-width: 1280px) 100vw, 67vw"
                loading="lazy"
                quality={80}
              />

              {/* Navigation Arrows */}
              <div className="absolute top-1/2 -translate-y-1/2 left-1 sm:left-2 md:left-4 right-1 sm:right-2 md:right-4 flex justify-between pointer-events-none">
                <button
                  onClick={handlePrevImage}
                  className="pointer-events-auto text-[rgb(225,255,0)] p-2 sm:p-2 transition-all hover:scale-125 hover:brightness-125 cursor-pointer bg-black/30 rounded-full backdrop-blur-sm min-w-[36px] min-h-[36px] flex items-center justify-center"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} className="sm:w-6 sm:h-6 md:w-8 md:h-8" strokeWidth={3} />
                </button>
                <button
                  onClick={handleNextImage}
                  className="pointer-events-auto text-[rgb(225,255,0)] p-2 sm:p-2 transition-all hover:scale-125 hover:brightness-125 cursor-pointer bg-black/30 rounded-full backdrop-blur-sm min-w-[36px] min-h-[36px] flex items-center justify-center"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} className="sm:w-6 sm:h-6 md:w-8 md:h-8" strokeWidth={3} />
                </button>
              </div>

              {/* Image Indicators - Hidden on Mobile */}
              <div className="absolute bottom-12 sm:bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 gap-1.5 sm:gap-2 pointer-events-none hidden sm:flex">
                {gymImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`pointer-events-auto w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 p-2 -m-2 bg-clip-content ${
                      index === currentImageIndex
                        ? 'bg-[rgb(225,255,0)] scale-125'
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>

              {/* Yellow COVID Banner */}
              <div className="absolute bottom-0 left-0 right-0 bg-[rgb(225,255,0)] py-1.5 sm:py-2 md:py-4 px-2 sm:px-3 md:px-6">
                <p className="text-black text-[11px] sm:text-sm font-bold uppercase tracking-wide flex items-center gap-1 sm:gap-2 md:gap-3">
                  <ShieldCheck size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5 text-black flex-shrink-0" />
                  <span className="leading-tight">Clean + Airy Space = Stay Safe in COVID 19 Pandemic.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Approach Image */}
          <div className="xl:col-span-4 card-approach">
            <Image
              src="/devis/IMG_7374.JPG.jpeg"
              alt="Approach"
              width={400}
              height={460}
              className="w-full h-[280px] xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[460px] object-cover rounded-sm"
              sizes="(max-width: 1280px) 100vw, 33vw"
              loading="lazy"
              quality={80}
            />
          </div>
        </div>

        {/* Row 4: Equipment Text (left/center) + Approach Text (right) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 sm:gap-4 md:gap-6">
          {/* Equipment Text */}
          <div className="xl:col-span-8 card-equipment px-1 sm:px-0">
            <h3 className="font-oswald uppercase text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4">Equipment</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-none xl:max-w-2xl">
              Give your workout more variety than ever with our accessories, from warmup to cooldown. Increase your body's capacities every day, from stability to mobility, from power to speed.
            </p>
          </div>

          {/* Approach Text + Button */}
          <div className="xl:col-span-4 card-approach px-1 sm:px-0">
            <h3 className="font-oswald uppercase text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 md:mb-3">Approach</h3>
            <h4 className="font-oswald uppercase text-[11px] sm:text-sm tracking-wide mb-2 sm:mb-3 md:mb-4 text-zinc-300">
              Innovation + Motivation = Results
            </h4>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 md:mb-6">
              We are a hybrid gym and training facility. We have clean, state of the art facilities with the most knowledgeable staff and cutting-edge training methods. We offer open gym, team training, group classes, boxing, cycle and personal training.
            </p>

            {/* More About Us Button */}
            <button className="group inline-flex items-center gap-2 text-[rgb(225,255,0)] transition-transform hover:translate-x-1 sm:hover:translate-x-2 cursor-pointer active:scale-95 py-2 -my-2">
              <ArrowRight size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1 flex-shrink-0" />
              <span className="font-oswald uppercase text-xs sm:text-sm tracking-wider">More About Us</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={lightboxImages}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onNext={nextLightboxImage}
          onPrev={prevLightboxImage}
        />
      )}
    </section>
  );
}