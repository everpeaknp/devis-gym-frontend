import {   
  ContainerAnimated,
  ContainerStagger,
  GalleryGrid,
  GalleryGridCell,
} from "@/components/ui/cta-section-with-gallery"
import Button from "@/components/ui/Button"
import Image from "next/image"

// Local gym images instead of external URLs
const GYM_IMAGES = [
  "/gallery/gym-1.jpeg", // Gym equipment
  "/gallery/gym-2.jpeg", // Gym workout
  "/gallery/training-1.jpeg", // Personal training
  "/gallery/gym-3.jpeg", // Gym interior
]

export const GymCTASection = () => {
  return (
    <section className="bg-background-elevated py-16 md:py-20">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-8 md:grid-cols-2">
        <ContainerStagger>
          <ContainerAnimated className="mb-4 block text-xs font-medium text-accent md:text-sm uppercase tracking-wider">
            Transform Your Body
          </ContainerAnimated>
          <ContainerAnimated className="text-4xl font-bold md:text-[2.8rem] tracking-tight text-white font-oswald uppercase">
            Achieve Your
            <br />
            <span className="text-accent">Fitness Goals</span>
          </ContainerAnimated>
          <ContainerAnimated className="my-6 text-base text-foreground/80 md:my-8 md:text-lg leading-relaxed">
            Join Devis Gym and unlock your potential with state-of-the-art equipment, 
            expert personal trainers, and a supportive community that will push you 
            to reach new heights in your fitness journey.
          </ContainerAnimated>
          <ContainerAnimated className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="bg-accent text-background hover:bg-accent/90 font-semibold px-8 py-6 text-base uppercase tracking-wide"
              size="lg"
            >
              Start Your Journey
            </Button>
            <Button 
              variant="outline" 
              className="border-accent text-accent hover:bg-accent hover:text-background font-semibold px-8 py-6 text-base uppercase tracking-wide"
              size="lg"
            >
              View Classes
            </Button>
          </ContainerAnimated>
        </ContainerStagger>

        <GalleryGrid className="min-h-[400px] md:min-h-[500px]">
          {GYM_IMAGES.map((imageUrl, index) => (
            <GalleryGridCell index={index} key={index}>
              <Image
                className="size-full object-cover object-center hover:scale-110 transition-transform duration-700"
                src={imageUrl}
                alt={`Gym image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
                quality={85}
              />
              {/* Overlay gradient for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </GalleryGridCell>
          ))}
        </GalleryGrid>
      </div>
    </section>
  )
}