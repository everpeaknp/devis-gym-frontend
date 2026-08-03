import Footer from "@/components/layout/Footer";
import Hero from "@/components/hero/Hero";
import MotivationSection from "@/components/sections/MotivationSection";
import HeroScrollSequence from "@/components/hero/HeroScrollSequence";
import GymIntroSection from "@/components/sections/GymIntroSection";
import TrainingSection from "@/components/sections/TrainingSection";
import MembershipSection from "@/components/sections/MembershipSection";
import Gallery from "@/components/sections/Gallery";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import SocialSection from "@/components/sections/SocialSection";
import LocationSection from "@/components/sections/LocationSection";
import ContactSection from "@/components/sections/ContactSection";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { GymCTASection } from "@/components/blocks/gym-cta-section";
import ClassesSection from "@/components/sections/ClassesSection";

export default function Home() {
  // Local gym equipment images for ZoomParallax
  const gymInsideImages = [
    {
      src: '/equipment/main.jpg',
      alt: 'Main gym equipment view',
    },
    {
      src: '/equipment/1.webp',
      alt: 'Gym equipment 1',
    },
    {
      src: '/equipment/2.webp', 
      alt: 'Gym equipment 2',
    },
    {
      src: '/equipment/3.png',
      alt: 'Gym equipment 3',
    },
    {
      src: '/equipment/4.png',
      alt: 'Gym equipment 4',
    },
    {
      src: '/equipment/6.webp',
      alt: 'Gym equipment 6',
    },
    {
      src: '/equipment/7.webp',
      alt: 'Gym equipment 7',
    },
    {
      src: '/equipment/9.png',
      alt: 'Gym equipment 9',
    },
  ];

  return (
    <>
      <main id="about">
        <Hero />
        {/* Frame Animation Section - Moved from Hero */}
        <section id="frames" className="relative bg-background z-50" style={{ minHeight: '100vh' }}>
          <HeroScrollSequence />
        </section>
        <GymIntroSection />
        <TrainingSection />
        {/* <NetworkSection /> */}
        <Gallery />
        {/* <GymCTASection /> */}
        <LocationSection />
        <MembershipSection />
        <MotivationSection />
        <TestimonialsSection />
        <FinalCTASection />
        <ContactSection />
        {/* <ClassesSection /> */}
      </main>
      <Footer />
    </>
  );
}
