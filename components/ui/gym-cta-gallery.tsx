"use client"

import {
  ContainerAnimated,
  ContainerStagger,
  GalleryGrid,
  GalleryGridCell,
} from "@/components/ui/cta-section-with-gallery"
import Button from "@/components/ui/Button"

const GYM_IMAGES = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Gym equipment
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Workout session
  "https://images.unsplash.com/photo-1590556409324-aa1d726e5c3c?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Group fitness
  "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Modern gym interior
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
              <img
                className="size-full object-cover object-center"
                width="100%"
                height="100%"
                src={imageUrl}
                alt={`Gym facility ${index + 1}`}
              />
            </GalleryGridCell>
          ))}
        </GalleryGrid>
      </div>
    </section>
  )
}