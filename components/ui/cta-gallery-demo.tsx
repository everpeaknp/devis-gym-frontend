"use client"

import {
  ContainerAnimated,
  ContainerStagger,
  GalleryGrid,
  GalleryGridCell,
} from "@/components/ui/cta-section-with-gallery"
import Button from "@/components/ui/Button"
import Image from "next/image"

const IMAGES = [
  "/gallery/gallery-1.jpeg",
  "/gallery/gallery-2.jpeg", 
  "/gallery/gallery-3.jpeg",
  "/gallery/gallery-4.jpeg",
]

export const AboutDemo = () => {
  return (
    <section>
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-8 py-12 md:grid-cols-2">
        <ContainerStagger>
          <ContainerAnimated className="mb-4 block text-xs font-medium text-rose-500 md:text-sm">
            Innovate & Grow
          </ContainerAnimated>
          <ContainerAnimated className="text-4xl font-semibold md:text-[2.4rem] tracking-tight">
            Scale Your Business Through Innovation
          </ContainerAnimated>
          <ContainerAnimated className="my-4 text-base text-slate-700 md:my-6 md:text-lg">
            Transform your startup&apos;s potential through innovative solutions
            and strategic growth. We help businesses adapt, evolve, and thrive
            in today&apos;s competitive marketplace.
          </ContainerAnimated>
          <ContainerAnimated>
            <Button className="bg-rose-500 hover:bg-rose-600">Start Scaling Today</Button>
          </ContainerAnimated>
        </ContainerStagger>

        <GalleryGrid>
          {IMAGES.map((imageUrl, index) => (
            <GalleryGridCell index={index} key={index}>
              <Image
                src={imageUrl}
                alt={`Gallery image ${index + 1}`}
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