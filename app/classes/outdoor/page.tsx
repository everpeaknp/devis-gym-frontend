import BackButton from "@/components/ui/BackButton";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Footer from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import {
  ContainerAnimated,
  ContainerStagger,
  GalleryGrid,
  GalleryGridCell,
} from "@/components/ui/cta-section-with-gallery";

const OUTDOOR_IMAGES = [
  "/gallery/lifestyle-1.jpeg",
  "/gallery/gym-2.jpeg", 
  "/gallery/training-1.jpeg",
  "/gallery/gym-3.jpeg",
];

const outdoorPrograms = [
  {
    name: "Morning Boot Camp",
    time: "6:00 AM - 7:00 AM",
    duration: "60 minutes",
    difficulty: "Intermediate",
    description: "High-intensity outdoor workout to kickstart your day with energy and motivation."
  },
  {
    name: "Trail Running Group",
    time: "5:30 PM - 6:30 PM", 
    duration: "60 minutes",
    difficulty: "All Levels",
    description: "Explore scenic trails while building endurance and connecting with nature."
  },
  {
    name: "Outdoor Yoga Sessions",
    time: "7:00 AM - 8:00 AM",
    duration: "60 minutes", 
    difficulty: "Beginner",
    description: "Find your zen with peaceful yoga sessions in beautiful outdoor settings."
  },
  {
    name: "Park Workouts",
    time: "6:00 PM - 7:00 PM",
    duration: "45 minutes",
    difficulty: "All Levels", 
    description: "Functional fitness using park equipment and natural environments."
  }
];

const benefits = [
  "Fresh air and natural vitamin D",
  "Improved mental health and mood", 
  "Enhanced creativity and focus",
  "Community building in natural settings",
  "Varied terrain challenges",
  "Weather adaptation training"
];

export default function OutdoorClassesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <Breadcrumb 
        items={[
          { label: "Home", href: "/" },
          { label: "Classes", href: "/classes" }
        ]}
        currentPage="Outdoor Classes"
        eyebrow="Nature Training"
      />

      <div className="container-edge py-24">
        <BackButton />
{/*         
        <div className="mt-8 mb-16">
          <SectionHeading 
            eyebrow="Outdoor Training"
            title="Outdoor Classes"
            className="text-center"
          />
        </div> */}

        {/* Hero CTA Section with Gallery */}
        <section className="mb-20">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-8 py-12 md:grid-cols-2">
            <ContainerStagger>
              <ContainerAnimated className="mb-4 block font-gotham text-accent font-bold uppercase tracking-wider" style={{ fontWeight: 700, fontSize: '17px', lineHeight: '24px' }}>
                Breathe Fresh Air
              </ContainerAnimated>
              <ContainerAnimated className="font-gotham-condensed font-bold uppercase leading-[0.9] tracking-tight text-white" style={{ fontSize: '81px', lineHeight: '81px', fontWeight: 700 }}>
                Train in Nature&apos;s Gym
              </ContainerAnimated>
              <ContainerAnimated className="my-4 font-gotham text-white max-w-lg" style={{ fontWeight: 500, fontSize: '13px', lineHeight: '19px' }}>
                Break free from traditional gym walls and experience fitness in the fresh air. 
                Our outdoor classes combine physical training with the healing power of nature 
                for a truly transformative fitness experience.
              </ContainerAnimated>
              <ContainerAnimated>
                <Button asChild className="bg-accent hover:bg-accent/90">
                  <a href="/contact" className="flex items-center gap-2">
                    Join Outdoor Classes
                    <ArrowRight size={16} />
                  </a>
                </Button>
              </ContainerAnimated>
            </ContainerStagger>

            <GalleryGrid>
              {OUTDOOR_IMAGES.map((imageUrl, index) => (
                <GalleryGridCell index={index} key={index}>
                  <Image
                    className="size-full object-cover object-center"
                    src={imageUrl}
                    alt={`Outdoor fitness training ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                    quality={85}
                  />
                </GalleryGridCell>
              ))}
            </GalleryGrid>
          </div>
        </section>

     
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}