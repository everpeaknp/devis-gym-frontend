"use client"

import {
  ContainerAnimated,
  ContainerStagger,
  GalleryGrid,
  GalleryGridCell,
} from "@/components/ui/cta-section-with-gallery"
import Button from "@/components/ui/Button"
import Image from "next/image"

const GYM_IMAGES = [
  "/gallery/gallery-1.jpeg", // Gym equipment
  "/gallery/gallery-2.jpeg", // Workout session
  "/gallery/gallery-3.jpeg", // Group fitness
  "/gallery/gallery-4.jpeg", // Modern gym interior
]

export const GymCTAGallery = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-8 py-12 md:grid-cols-2">
        <ContainerStagger>
          <ContainerAnimated className="mb-4 block text-xs font-medium text-red-600 md:text-sm">
            Transform Your Body
          </ContainerAnimated>
          <ContainerAnimated className="text-4xl font-bold md:text-[2.4rem] tracking-tight text-slate-900">
            Join Devis Gym Today
          </ContainerAnimated>
          <ContainerAnimated className="my-4 text-base text-slate-700 md:my-6 md:text-lg">
            Experience state-of-the-art equipment, expert trainers, and a community 
            that will push you to achieve your fitness goals. Your transformation starts here.
          </ContainerAnimated>
          <ContainerAnimated className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Start Your Journey
            </Button>
            <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              View Membership Plans
            </Button>
          </ContainerAnimated>
        </ContainerStagger>

        <GalleryGrid>
          {GYM_IMAGES.map((imageUrl, index) => (
            <GalleryGridCell index={index} key={index}>
              <Image
                src={imageUrl}
                alt={`Gym facility ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center"
                loading="lazy"
                quality={85}
              />
            </GalleryGridCell>
          ))}
        </GalleryGrid>
      </div>
    </section>
  )
}