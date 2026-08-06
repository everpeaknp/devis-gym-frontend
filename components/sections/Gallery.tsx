"use client";

import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import Reveal from "@/components/ui/Reveal";
import Lightbox from "@/components/ui/Lightbox";
import { galleryImages, galleryCategories } from "@/data/gallery";

export default function Gallery() {
  const [active, setActive] = useState<string>("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filtered =
    active === "All"
      ? galleryImages.slice(0, 9) // Show only first 9 images (3x3 grid)
      : galleryImages.filter((img) => img.category === active).slice(0, 9);

  // Only available images for lightbox
  const availableImages = filtered.filter((img) => img.available);
  const lightboxImages = availableImages.map((img) => img.src);

  const openLightbox = (imageId: string) => {
    const index = availableImages.findIndex((img) => img.id === imageId);
    if (index !== -1) {
      setCurrentImageIndex(index);
      setLightboxOpen(true);
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev < lightboxImages.length - 1 ? prev + 1 : prev
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <section className="bg-background relative z-20">
      <div className="container-edge pt-16 pb-16 sm:pt-20 sm:pb-20 md:pt-24 md:pb-24">
        <SectionHeading eyebrow="Gallery" title="A look inside" />

        <div className="mt-6 sm:mt-8 md:mt-10 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 sm:gap-3 pb-2 min-w-max">
            {["All", ...galleryCategories].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={clsx(
                  "rounded-full border px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.1em] transition-colors duration-200 cursor-pointer touch-manipulation min-h-[44px] flex items-center justify-center whitespace-nowrap flex-shrink-0",
                  active === cat
                    ? "border-accent bg-accent text-[#0a0a0a]"
                    : "border-border-strong text-muted hover:text-foreground active:bg-accent/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filtered.map((img, i) => (
            <Reveal
              key={img.id}
              delay={(i % 3) * 0.08}
              className=""
            >
              {img.available ? (
                <div 
                  className="relative overflow-hidden group cursor-pointer h-48 sm:h-56 md:h-64"
                  onClick={() => openLightbox(img.id)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-all duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw"
                    loading="lazy"
                    quality={80}
                    onError={(e) => {
                      console.error('Image failed to load:', img.src);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/40" />
                </div>
              ) : (
                <PlaceholderImage
                  label={`${img.category} — photo coming soon`}
                  ratio="landscape"
                  className="transition-opacity duration-300 hover:opacity-90 h-48 sm:h-56 md:h-64"
                />
              )}
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={lightboxImages}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </section>
  );
}
