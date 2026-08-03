import {   
  ContainerAnimated,
  ContainerStagger,
  GalleryGrid,
  GalleryGridCell,
} from "@/components/ui/cta-section-with-gallery"
import Button from "@/components/ui/Button" 
import Image from "next/image"

// Gym-themed images from local gallery
const IMAGES = [
  "/gallery/gallery-1.jpeg", // Modern gym equipment
  "/gallery/gallery-2.jpeg", // Gym workout session  
  "/gallery/gallery-3.jpeg", // Personal training
  "/gallery/gallery-4.jpeg", // Gym interior space
]

export const GymCTADemo = () => {
  return (
    <section className="bg-background-elevated py-16 md:py-20">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-8 md:grid-cols-2">
        <ContainerStagger>
          <ContainerAnimated className="mb-4 block text-xs font-medium text-accent md:text-sm uppercase tracking-wider">
            Transform Your Body
          </ContainerAnimated>
          <ContainerAnimated className="text-4xl font-bold md:text-[2.8rem] tracking-tight text-white font-oswald uppercase leading-tight">
            Unlock Your
            <br />
            <span className="text-accent">Fitness Potential</span>
          </ContainerAnimated>
          <ContainerAnimated className="my-6 text-base text-foreground/80 md:my-8 md:text-lg leading-relaxed">
            Join Devis Gym and transform your fitness journey with state-of-the-art equipment, 
            expert personal trainers, and a supportive community that will push you 
            to reach new heights and achieve your goals.
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
          {IMAGES.map((imageUrl, index) => (
            <GalleryGridCell index={index} key={index}>
              <Image
                src={imageUrl}
                alt={`Devis Gym - Training ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center hover:scale-110 transition-transform duration-700"
                loading="lazy"
                quality={85}
              />
              {/* Overlay gradient for better visual depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </GalleryGridCell>
          ))}
        </GalleryGrid>
      </div>
    </section>
  )
}