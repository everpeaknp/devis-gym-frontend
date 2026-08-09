"use client";

import { useState } from "react";
import BackButton from "@/components/ui/BackButton";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Lightbox from "@/components/ui/Lightbox";
import Footer from "@/components/layout/Footer";
import { EmbroideredWordPatches } from "@/components/unused-components/ui/embroidered-word-patches";

const classesData = {
  gym: {
    slug: "gym-training",
    title: "Gym Training",
    description: "State-of-the-art equipment and facilities for all your training needs. From cardio to strength training, we have everything you need to reach your fitness goals.",
    image: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269602/devis-gym/people/DSC07734.JPG.webp",
    details: "Free weights, machines, cardio equipment, and dedicated training zones for every fitness level.",
  },
  weightlifting: {
    slug: "weightlifting",
    title: "Weightlifting",
    description: "Professional weightlifting programs with expert coaching. Build strength, power, and muscle with proper technique and progressive training.",
    image: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269452/devis-gym/people/DSC07615-4.JPG.webp",
    details: "Olympic lifting, powerlifting, and strength training with certified coaches.",
  },
  cardio: {
    slug: "cardio",
    title: "Cardio",
    description: "High-intensity cardio workouts to improve your cardiovascular health and endurance. Burn calories and boost your stamina.",
    image: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269591/devis-gym/people/DSC07629-3.JPG.webp",
    details: "Treadmills, bikes, rowing machines, and group cardio classes.",
  },
  crossfit: {
    slug: "crossfit",
    title: "CrossFit",
    description: "Functional fitness training that combines strength, cardio, and gymnastics. Push your limits with varied, high-intensity workouts.",
    image: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269637/devis-gym/people/DSC07636-3.JPG.webp",
    details: "WODs, functional movements, and community-driven training sessions.",
  },
  aerobics: {
    slug: "aerobics",
    title: "Aerobics",
    description: "Fun and energetic group classes that improve cardiovascular fitness through rhythmic exercises and dance movements.",
    image: "https://res.cloudinary.com/ufiebboc/image/upload/v1786268875/devis-gym/people/DSC07385.JPG.webp",
    details: "Step aerobics, dance fitness, and low-impact options for all fitness levels.",
  },
  zumba: {
    slug: "zumba",
    title: "Zumba",
    description: "Dance your way to fitness with high-energy Zumba classes led by Barsha Grg. Burn calories while having fun with Latin-inspired dance moves.",
    image: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269241/devis-gym/people/DSC07541.JPG.webp",
    details: "Latin dance, cardio party, and group fitness classes with certified Zumba instructor.",
  },
  outdoor: {
    slug: "outdoor",
    title: "Outdoor Activities",
    description: "Take your training outside with our outdoor fitness programs. Experience nature while achieving your fitness goals.",
    image: "https://res.cloudinary.com/ufiebboc/image/upload/v1786268706/devis-gym/classes/OutdoorActivities.webp",
    details: "Boot camps, trail running, outdoor yoga, and park workouts.",
  },
};

const galleryImages = [
  { src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269602/devis-gym/people/DSC07734.JPG.webp", alt: "Gym Training" },
  { src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269452/devis-gym/people/DSC07615-4.JPG.webp", alt: "Weightlifting" },
  { src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269591/devis-gym/people/DSC07629-3.JPG.webp", alt: "Cardio Training" },
  { src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269637/devis-gym/people/DSC07636-3.JPG.webp", alt: "CrossFit" },
  { src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786268875/devis-gym/people/DSC07385.JPG.webp", alt: "Aerobics" },
  { src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269241/devis-gym/people/DSC07541.JPG.webp", alt: "Zumba" },
  { src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786268706/devis-gym/classes/OutdoorActivities.webp", alt: "Outdoor Activities" },
];

export default function ClassesPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isHorizontalSwipe, setIsHorizontalSwipe] = useState(false);

  const lightboxImageSrcs = galleryImages.map(img => img.src);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

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
      prev < lightboxImageSrcs.length - 1 ? prev + 1 : prev
    );
  };

  const prevLightboxImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

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
    const threshold = window.innerWidth < 768 ? 30 : 50;
    if (Math.abs(dragDistance) < 5) {
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
      e.preventDefault();
      handleDragMove(touch.clientX);
    }
  };

  const onTouchEnd = () => {
    handleDragEnd();
    setIsHorizontalSwipe(false);
  };

  return (
    <>
      <BackButton />
      <Breadcrumb 
        items={[{ label: "Home", href: "/" }]}
        currentPage="Classes"
        eyebrow="TRAINING PROGRAMS"
      />

      <main className="relative bg-background">
        <section className="bg-background overflow-hidden relative">
          <div className="absolute inset-0">
            <Image
              src="https://res.cloudinary.com/ufiebboc/image/upload/v1786269693/devis-gym/wallbg.webp"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              loading="lazy"
              quality={80}
            />
          </div>
          <div className="absolute inset-0 bg-black/50 z-0"></div>

          <div className="container-edge pt-4 sm:pt-6 md:pt-8 lg:pt-12 pb-6 sm:pb-8 md:pb-12 relative z-10">
            {/* Row 1: Header + Gym Training + Weightlifting */}
            <div className="flex flex-col gap-3 sm:gap-4 md:grid md:grid-cols-2 xl:grid-cols-12 xl:gap-6 mb-4 sm:mb-6 md:mb-8">
              {/* Header with Arrow */}
              <div className="xl:col-span-4 group order-1">
                <div className="relative min-h-[160px] xs:min-h-[180px] sm:min-h-[220px] md:min-h-[280px] lg:min-h-[320px] flex items-center justify-center cursor-pointer">
                  <div className="absolute left-1/2 -translate-x-1/2 top-[60%] -translate-y-1/2 -z-20 pointer-events-none hidden sm:block">
                    <EmbroideredWordPatches 
                      width={400} 
                      height={180} 
                      className="opacity-60 hover:opacity-70 transition-opacity duration-300" 
                    />
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 top-[20%] sm:top-[25%] md:top-[30%] w-[60%] sm:w-[70%] md:w-[80%] lg:w-[90%] xl:w-[100%] h-auto pointer-events-none -z-10 transition-all duration-500 group-hover:brightness-125 group-hover:drop-shadow-[0_0_15px_rgba(225,255,0,0.5)] group-hover:translate-y-2 sm:group-hover:translate-y-4 md:group-hover:translate-y-6 lg:group-hover:translate-y-10 rotate-90 hidden sm:block">
                    <Image
                      src="https://res.cloudinary.com/ufiebboc/image/upload/v1786268854/devis-gym/icons/arrow-right.svg"
                      alt=""
                      width={200}
                      height={50}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                  </div>
                  <div className="relative text-center mt-0 sm:-mt-24 sm:sm:-mt-30 md:-mt-36 lg:-mt-42 xl:-mt-48 px-2">
                    <h2 className="font-oswald uppercase text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-[0.9] mb-1 sm:mb-2 md:mb-4 break-words">
                      Our Classes
                    </h2>
                  </div>
                </div>
              </div>

              {/* Gym Training Image */}
              <div className="xl:col-span-4 order-2">
                <a href={`/classes/${classesData.gym.slug}`} className="block">
                  <Image
                    src={classesData.gym.image}
                    alt={classesData.gym.title}
                    width={400}
                    height={460}
                    className="w-full h-[280px] xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[460px] xl:h-[320px] object-cover rounded-sm transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                    quality={80}
                  />
                </a>
              </div>

              {/* Gym Training Text - Mobile Only */}
              <div className="xl:col-span-4 order-3 md:hidden px-1 sm:px-0">
                <h3 className="font-oswald uppercase text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4">{classesData.gym.title}</h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-3 md:mb-4">
                  {classesData.gym.description}
                </p>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-3">
                  {classesData.gym.details}
                </p>
                <a href={`/classes/${classesData.gym.slug}`} className="group inline-flex items-center gap-2 text-[rgb(225,255,0)] transition-transform hover:translate-x-1 cursor-pointer">
                  <span className="font-oswald uppercase text-xs tracking-wider">Read More</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 flex-shrink-0" />
                </a>
              </div>

              {/* Weightlifting Image */}
              <div className="xl:col-span-4 order-4 md:order-3">
                <a href={`/classes/${classesData.weightlifting.slug}`} className="block">
                  <Image
                    src={classesData.weightlifting.image}
                    alt={classesData.weightlifting.title}
                    width={400}
                    height={460}
                    className="w-full h-[280px] xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[460px] xl:h-[320px] object-cover rounded-sm transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                    quality={80}
                  />
                </a>
              </div>
            </div>

            {/* Row 2: Gym Training Text + Weightlifting Text */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
              {/* Gym Training Text - Desktop Only */}
              <div className="md:col-start-1 xl:col-span-4 xl:col-start-5 px-1 sm:px-0 hidden md:block">
                <h3 className="font-oswald uppercase text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4">{classesData.gym.title}</h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-3 md:mb-4">
                  {classesData.gym.description}
                </p>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-3">
                  {classesData.gym.details}
                </p>
                <a href={`/classes/${classesData.gym.slug}`} className="group inline-flex items-center gap-2 text-[rgb(225,255,0)] transition-transform hover:translate-x-1 cursor-pointer">
                  <span className="font-oswald uppercase text-xs tracking-wider">Read More</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 flex-shrink-0" />
                </a>
              </div>

              {/* Weightlifting Text */}
              <div className="xl:col-span-4 px-1 sm:px-0">
                <h3 className="font-oswald uppercase text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4">{classesData.weightlifting.title}</h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-3">
                  {classesData.weightlifting.description}
                </p>
                <a href={`/classes/${classesData.weightlifting.slug}`} className="group inline-flex items-center gap-2 text-[rgb(225,255,0)] transition-transform hover:translate-x-1 cursor-pointer">
                  <span className="font-oswald uppercase text-xs tracking-wider">Read More</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 flex-shrink-0" />
                </a>
              </div>
            </div>

            {/* Row 3: Gallery Image (large) + Cardio Image */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
              {/* Gallery Large Image */}
              <div className="xl:col-span-8">
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
                    touchAction: 'pan-y',
                  }}
                >
                  <Image
                    key={currentImageIndex}
                    src={galleryImages[currentImageIndex].src}
                    alt={galleryImages[currentImageIndex].alt}
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
                      className="pointer-events-auto text-[rgb(225,255,0)] p-2 transition-all hover:scale-125 hover:brightness-125 cursor-pointer bg-black/30 rounded-full backdrop-blur-sm min-w-[36px] min-h-[36px] flex items-center justify-center"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={18} className="sm:w-6 sm:h-6 md:w-8 md:h-8" strokeWidth={3} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="pointer-events-auto text-[rgb(225,255,0)] p-2 transition-all hover:scale-125 hover:brightness-125 cursor-pointer bg-black/30 rounded-full backdrop-blur-sm min-w-[36px] min-h-[36px] flex items-center justify-center"
                      aria-label="Next image"
                    >
                      <ChevronRight size={18} className="sm:w-6 sm:h-6 md:w-8 md:h-8" strokeWidth={3} />
                    </button>
                  </div>

                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 gap-1.5 sm:gap-2 pointer-events-none hidden sm:flex">
                    {galleryImages.map((_, index) => (
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
                </div>
              </div>

              {/* Cardio Image */}
              <div className="xl:col-span-4">
                <a href={`/classes/${classesData.cardio.slug}`} className="block">
                  <Image
                    src={classesData.cardio.image}
                    alt={classesData.cardio.title}
                    width={400}
                    height={460}
                    className="w-full h-[280px] xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[460px] object-cover rounded-sm transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 1280px) 100vw, 33vw"
                    loading="lazy"
                    quality={80}
                  />
                </a>
              </div>
            </div>

            {/* Row 4: Weightlifting Details + Cardio Text */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
              {/* Weightlifting Details */}
              <div className="xl:col-span-8 px-1 sm:px-0">
                <h3 className="font-oswald uppercase text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4">Professional Training</h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-none xl:max-w-2xl">
                  {classesData.weightlifting.details}
                </p>
              </div>

              {/* Cardio Text */}
              <div className="xl:col-span-4 px-1 sm:px-0">
                <h3 className="font-oswald uppercase text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4">{classesData.cardio.title}</h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-3">
                  {classesData.cardio.description}
                </p>
                <a href={`/classes/${classesData.cardio.slug}`} className="group inline-flex items-center gap-2 text-[rgb(225,255,0)] transition-transform hover:translate-x-1 cursor-pointer">
                  <span className="font-oswald uppercase text-xs tracking-wider">Read More</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 flex-shrink-0" />
                </a>
              </div>
            </div>

            {/* Row 5: CrossFit + Aerobics + Zumba */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
              {/* CrossFit */}
              <div className="xl:col-span-4">
                <a href={`/classes/${classesData.crossfit.slug}`} className="block">
                  <Image
                    src={classesData.crossfit.image}
                    alt={classesData.crossfit.title}
                    width={400}
                    height={460}
                    className="w-full h-[280px] xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[460px] xl:h-[320px] object-cover rounded-sm mb-3 sm:mb-4 transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                    quality={80}
                  />
                </a>
                <h3 className="font-oswald uppercase text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 px-1 sm:px-0">{classesData.crossfit.title}</h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed px-1 sm:px-0 mb-3">
                  {classesData.crossfit.description}
                </p>
                <a href={`/classes/${classesData.crossfit.slug}`} className="group inline-flex items-center gap-2 text-[rgb(225,255,0)] transition-transform hover:translate-x-1 cursor-pointer px-1 sm:px-0">
                  <span className="font-oswald uppercase text-xs tracking-wider">Read More</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 flex-shrink-0" />
                </a>
              </div>

              {/* Aerobics */}
              <div className="xl:col-span-4">
                <a href={`/classes/${classesData.aerobics.slug}`} className="block">
                  <Image
                    src={classesData.aerobics.image}
                    alt={classesData.aerobics.title}
                    width={400}
                    height={460}
                    className="w-full h-[280px] xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[460px] xl:h-[320px] object-cover rounded-sm mb-3 sm:mb-4 transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                    quality={80}
                  />
                </a>
                <h3 className="font-oswald uppercase text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 px-1 sm:px-0">{classesData.aerobics.title}</h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed px-1 sm:px-0 mb-3">
                  {classesData.aerobics.description}
                </p>
                <a href={`/classes/${classesData.aerobics.slug}`} className="group inline-flex items-center gap-2 text-[rgb(225,255,0)] transition-transform hover:translate-x-1 cursor-pointer px-1 sm:px-0">
                  <span className="font-oswald uppercase text-xs tracking-wider">Read More</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 flex-shrink-0" />
                </a>
              </div>

              {/* Zumba */}
              <div className="xl:col-span-4">
                <a href={`/classes/${classesData.zumba.slug}`} className="block">
                  <Image
                    src={classesData.zumba.image}
                    alt={classesData.zumba.title}
                    width={400}
                    height={460}
                    className="w-full h-[280px] xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[460px] xl:h-[320px] object-cover rounded-sm mb-3 sm:mb-4 transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                    quality={80}
                  />
                </a>
                <h3 className="font-oswald uppercase text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 px-1 sm:px-0">{classesData.zumba.title}</h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed px-1 sm:px-0 mb-3">
                  {classesData.zumba.description}
                </p>
                <a href={`/classes/${classesData.zumba.slug}`} className="group inline-flex items-center gap-2 text-[rgb(225,255,0)] transition-transform hover:translate-x-1 cursor-pointer px-1 sm:px-0">
                  <span className="font-oswald uppercase text-xs tracking-wider">Read More</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 flex-shrink-0" />
                </a>
              </div>
            </div>

            {/* Row 6: Outdoor Activities (Full Width) */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 sm:gap-4 md:gap-6">
              <div className="xl:col-span-8">
                <a href={`/classes/${classesData.outdoor.slug}`} className="block">
                  <Image
                    src={classesData.outdoor.image}
                    alt={classesData.outdoor.title}
                    width={800}
                    height={460}
                    className="w-full h-[280px] xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[460px] object-cover rounded-sm mb-3 sm:mb-4 transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                    quality={80}
                  />
                </a>
                <h3 className="font-oswald uppercase text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 px-1 sm:px-0">{classesData.outdoor.title}</h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-3 md:mb-4 px-1 sm:px-0">
                  {classesData.outdoor.description}
                </p>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed px-1 sm:px-0 mb-3">
                  {classesData.outdoor.details}
                </p>
                <a href={`/classes/${classesData.outdoor.slug}`} className="group inline-flex items-center gap-2 text-[rgb(225,255,0)] transition-transform hover:translate-x-1 cursor-pointer px-1 sm:px-0">
                  <span className="font-oswald uppercase text-xs tracking-wider">Read More</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 flex-shrink-0" />
                </a>
              </div>

              {/* Call to Action */}
              <div className="xl:col-span-4 px-1 sm:px-0 flex flex-col justify-center">
                <h3 className="font-oswald uppercase text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 md:mb-3">Ready to Start?</h3>
                <h4 className="font-oswald uppercase text-[11px] sm:text-sm tracking-wide mb-2 sm:mb-3 md:mb-4 text-zinc-300">
                  Join Our Training Programs
                </h4>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 md:mb-6">
                  Choose from our wide range of training programs and start your fitness journey today. Expert trainers, modern equipment, and a supportive community await you.
                </p>

                {/* More About Button */}
                <a href="/membership" className="group inline-flex items-center gap-2 text-[rgb(225,255,0)] transition-transform hover:translate-x-1 sm:hover:translate-x-2 cursor-pointer active:scale-95 py-2 -my-2">
                  <ArrowRight size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1 flex-shrink-0" />
                  <span className="font-oswald uppercase text-xs sm:text-sm tracking-wider">View Membership Plans</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={lightboxImageSrcs}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onNext={nextLightboxImage}
          onPrev={prevLightboxImage}
        />
      )}

      <Footer />
    </>
  );
}
