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

const PERSONAL_IMAGES = [
  "/gallery/training-2.jpeg",
  "/gallery/gym-1.jpeg",
  "/gallery/people-1.jpeg",
  "/gallery/gym-2.jpeg",
];

const trainingOptions = [
  {
    name: "Beginner Foundation",
    sessions: "2-3 sessions/week",
    duration: "45 minutes",
    focus: "Form & Technique",
    description: "Perfect introduction to fitness with focus on proper form, basic movements, and building confidence."
  },
  {
    name: "Strength & Conditioning",
    sessions: "3-4 sessions/week", 
    duration: "60 minutes",
    focus: "Muscle Building",
    description: "Advanced strength training with progressive overload for serious muscle and strength gains."
  },
  {
    name: "Weight Loss Program",
    sessions: "4-5 sessions/week",
    duration: "50 minutes", 
    focus: "Fat Loss",
    description: "Combination of cardio and strength training designed for maximum calorie burn and fat loss."
  },
  {
    name: "Athletic Performance",
    sessions: "4-6 sessions/week",
    duration: "60-90 minutes",
    focus: "Sport-Specific", 
    description: "Elite training for athletes looking to improve performance in their specific sport."
  }
];

const services = [
  "Comprehensive fitness assessment",
  "Customized workout programming", 
  "Nutrition guidance and meal planning",
  "Progress tracking and adjustments",
  "Injury prevention strategies",
  "Flexible scheduling options"
];

export default function PersonalTrainingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <Breadcrumb 
        items={[
          { label: "Home", href: "/" },
          { label: "Classes", href: "/#classes" }
        ]}
        currentPage="Personal Training"
        eyebrow="One-on-One"
      />

      <div className="container-edge py-24">
        <BackButton />
        
        {/* <div className="mt-8 mb-16">
          <SectionHeading 
            eyebrow="One-on-One Training"
            title="Personal Training"
            className="text-center"
          />
        </div> */}

        {/* Hero CTA Section with Gallery */}
        <section className="mb-20">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-8 py-12 md:grid-cols-2">
            <ContainerStagger>
              <ContainerAnimated className="mb-4 block font-gotham text-accent font-bold uppercase tracking-wider" style={{ fontWeight: 700, fontSize: '17px', lineHeight: '24px' }}>
                Personalized Excellence
              </ContainerAnimated>
              <ContainerAnimated className="font-gotham-condensed font-bold uppercase leading-[0.9] tracking-tight text-white" style={{ fontSize: '81px', lineHeight: '81px', fontWeight: 700 }}>
                Your Dedicated Fitness Journey
              </ContainerAnimated>
              <ContainerAnimated className="my-4 font-gotham text-white max-w-lg" style={{ fontWeight: 500, fontSize: '13px', lineHeight: '19px' }}>
                Experience the power of personalized attention with our certified trainers. 
                Every session is tailored to your goals, fitness level, and preferences 
                for maximum results and sustainable progress.
              </ContainerAnimated>
              <ContainerAnimated>
                <Button asChild className="bg-accent hover:bg-accent/90">
                  <a href="/contact" className="flex items-center gap-2">
                    Book Personal Training
                    <ArrowRight size={16} />
                  </a>
                </Button>
              </ContainerAnimated>
            </ContainerStagger>

            <GalleryGrid>
              {PERSONAL_IMAGES.map((imageUrl, index) => (
                <GalleryGridCell index={index} key={index}>
                  <Image
                    className="size-full object-cover object-center"
                    src={imageUrl}
                    alt={`Personal training session ${index + 1}`}
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

        {/* Schedule Information */}
        <section className="mb-20">
          <div className="mx-auto max-w-5xl px-8">
            <h2 className="font-gotham-condensed text-4xl md:text-5xl font-bold uppercase mb-8 text-center">Gym Schedule</h2>
            <div className="bg-zinc-900/50 rounded-lg overflow-hidden border border-zinc-800">
              <table className="w-full">
                <thead className="bg-zinc-800">
                  <tr>
                    <th className="px-6 py-4 text-left font-gotham text-accent font-bold text-sm uppercase tracking-wider">Activity</th>
                    <th className="px-6 py-4 text-left font-gotham text-accent font-bold text-sm uppercase tracking-wider">Time</th>
                    <th className="px-6 py-4 text-left font-gotham text-accent font-bold text-sm uppercase tracking-wider">Days</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  <tr>
                    <td className="px-6 py-4 font-gotham text-white">Cardio</td>
                    <td className="px-6 py-4 font-gotham text-white">6:00 AM – 7:00 AM</td>
                    <td className="px-6 py-4 font-gotham text-white">Daily</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-gotham text-white">Zumba</td>
                    <td className="px-6 py-4 font-gotham text-white">6:00 AM – 7:00 AM</td>
                    <td className="px-6 py-4 font-gotham text-white">Tuesday & Friday</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-gotham text-white">Other Gym Activities</td>
                    <td className="px-6 py-4 font-gotham text-white">Throughout the day</td>
                    <td className="px-6 py-4 font-gotham text-white">Daily</td>
                  </tr>
                  <tr className="bg-zinc-800/50">
                    <td className="px-6 py-4 font-gotham text-white font-bold">Closed</td>
                    <td className="px-6 py-4 font-gotham text-white">—</td>
                    <td className="px-6 py-4 font-gotham text-white">Saturday</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

       
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}