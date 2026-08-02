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
      ? galleryImages
      : galleryImages.filter((img) => img.category === active);

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
      <div className="container-edge pt-0 pb-8 -mb-24 -mt-72 sm:py-12 sm:mb-0 sm:mt-0 md:pt-0 md:pb-16 md:-mt-[30rem]">
        <SectionHeading eyebrow="Gallery" title="A look inside" />

        <div className="mt-6 sm:mt-8 md:mt-10 flex flex-wrap gap-2">
          {["All", ...galleryCategories].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={clsx(
                "rounded-full border px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold uppercase tracking-[0.1em] transition-colors duration-200 cursor-pointer",
                active === cat
                  ? "border-accent bg-accent text-[#0a0a0a]"
                  : "border-border-strong text-muted hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
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
