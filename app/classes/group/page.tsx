import BackButton from "@/components/ui/BackButton";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Clock, Users, Zap, Calendar } from "lucide-react";
import Image from "next/image";
import {
  ContainerAnimated,
  ContainerStagger,
  GalleryGrid,
  GalleryGridCell,
} from "@/components/ui/cta-section-with-gallery";

const GROUP_IMAGES = [
  "/gallery/gym-3.jpeg",
  "/gallery/training-1.jpeg",
  "/gallery/gym-1.jpeg",
  "/gallery/people-1.jpeg",
];

const groupClasses = [
  {
    name: "HIIT Intensity",
    time: "6:00 AM, 6:30 PM",
    duration: "30 minutes",
    capacity: "12 participants",
    level: "All Levels",
    description: "High-intensity interval training for maximum calorie burn and cardiovascular fitness."
  },
  {
    name: "Strength Circuit",
    time: "7:00 AM, 5:30 PM", 
    duration: "45 minutes",
    capacity: "10 participants",
    level: "Intermediate",
    description: "Circuit-based strength training using various equipment for full-body conditioning."
  },
  {
    name: "Cardio Blast",
    time: "8:00 AM, 7:00 PM",
    duration: "40 minutes", 
    capacity: "15 participants",
    level: "Beginner",
    description: "Fun, energetic cardio workout combining dance moves and traditional exercises."
  },
  {
    name: "Functional Fitness",
    time: "12:00 PM, 6:00 PM",
    duration: "50 minutes",
    capacity: "8 participants",
    level: "All Levels", 
    description: "Real-world movement patterns to improve daily activities and athletic performance."
  },
  {
    name: "Core & Conditioning",
    time: "1:00 PM, 7:30 PM",
    duration: "35 minutes",
    capacity: "12 participants",
    level: "All Levels",
    description: "Focused core strengthening and overall body conditioning for stability and power."
  }
];

const benefits = [
  "Motivation from group energy",
  "Cost-effective training option",
  "Social connections and friendships",
  "Variety in workout routines", 
  "Accountability from peers",
  "Professional instruction and safety",
  "Structured progression system",
  "Fun and engaging atmosphere"
];

const schedule = [
  { day: "Monday", classes: ["HIIT Intensity 6:00 AM", "Strength Circuit 7:00 AM", "Functional Fitness 12:00 PM", "Cardio Blast 7:00 PM"] },
  { day: "Tuesday", classes: ["Cardio Blast 8:00 AM", "Core & Conditioning 1:00 PM", "Strength Circuit 5:30 PM", "HIIT Intensity 6:30 PM"] },
  { day: "Wednesday", classes: ["HIIT Intensity 6:00 AM", "Functional Fitness 12:00 PM", "Cardio Blast 7:00 PM"] },
  { day: "Thursday", classes: ["Strength Circuit 7:00 AM", "Core & Conditioning 1:00 PM", "Functional Fitness 6:00 PM", "Core & Conditioning 7:30 PM"] },
  { day: "Friday", classes: ["HIIT Intensity 6:00 AM", "Cardio Blast 8:00 AM", "Strength Circuit 5:30 PM"] },
  { day: "Saturday", classes: ["Group Sessions 9:00 AM", "Open Training 11:00 AM"] }
];

export default function GroupTrainingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <Breadcrumb 
        items={[
          { label: "Home", href: "/" },
          { label: "Classes", href: "/#classes" }
        ]}
        currentPage="Group Training"
        eyebrow="Team Fitness"
      />

      <div className="container-edge py-24">
        <BackButton />
{/*         
        <div className="mt-8 mb-16">
          <SectionHeading 
            eyebrow="Group Fitness"
            title="Group Training"
            className="text-center"
          />
        </div> */}

        {/* Hero CTA Section with Gallery */}
        <section className="mb-20">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-8 py-12 md:grid-cols-2">
            <ContainerStagger>
              <ContainerAnimated className="mb-4 block font-gotham text-accent font-bold uppercase tracking-wider" style={{ fontWeight: 700, fontSize: '17px', lineHeight: '24px' }}>
                Power in Numbers
              </ContainerAnimated>
              <ContainerAnimated className="font-gotham-condensed font-bold uppercase leading-[0.9] tracking-tight text-white" style={{ fontSize: '81px', lineHeight: '81px', fontWeight: 700 }}>
                Train Together, Achieve More
              </ContainerAnimated>
              <ContainerAnimated className="my-4 font-gotham text-white max-w-lg" style={{ fontWeight: 500, fontSize: '13px', lineHeight: '19px' }}>
                Join our energetic group classes and experience the motivation, 
                camaraderie, and fun that comes from training with others who 
                share your fitness passion. Push your limits together.
              </ContainerAnimated>
              <ContainerAnimated>
                <Button asChild className="bg-accent hover:bg-accent/90">
                  <a href="/contact" className="flex items-center gap-2">
                    Join Group Classes
                    <ArrowRight size={16} />
                  </a>
                </Button>
              </ContainerAnimated>
            </ContainerStagger>

            <GalleryGrid>
              {GROUP_IMAGES.map((imageUrl, index) => (
                <GalleryGridCell index={index} key={index}>
                  <Image
                    className="size-full object-cover object-center"
                    src={imageUrl}
                    alt={`Group training session ${index + 1}`}
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