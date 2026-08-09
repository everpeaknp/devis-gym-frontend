import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
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
import KickstartSection from "@/components/sections/KickstartSection";

export default function Home() {
  // Local gym equipment images for ZoomParallax
  const gymInsideImages = [
    {
      src: 'https://res.cloudinary.com/ufiebboc/image/upload/v1786268779/devis-gym/equipment/main.webp',
      alt: 'Main gym equipment view',
    },
    {
      src: 'https://res.cloudinary.com/ufiebboc/image/upload/v1786268749/devis-gym/equipment/1.webp',
      alt: 'Gym equipment 1',
    },
    {
      src: 'https://res.cloudinary.com/ufiebboc/image/upload/v1786268751/devis-gym/equipment/2.webp', 
      alt: 'Gym equipment 2',
    },
    {
      src: 'https://res.cloudinary.com/ufiebboc/image/upload/v1786268752/devis-gym/equipment/3.webp',
      alt: 'Gym equipment 3',
    },
    {
      src: '/equipment/4.png',
      alt: 'Gym equipment 4',
    },
    {
      src: 'https://res.cloudinary.com/ufiebboc/image/upload/v1786268758/devis-gym/equipment/6.webp',
      alt: 'Gym equipment 6',
    },
    {
      src: 'https://res.cloudinary.com/ufiebboc/image/upload/v1786268760/devis-gym/equipment/7.webp',
      alt: 'Gym equipment 7',
    },
    {
      src: 'https://res.cloudinary.com/ufiebboc/image/upload/v1786268763/devis-gym/equipment/9.webp',
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
        <Reveal><GymIntroSection /></Reveal>
        <TrainingSection />

        <LocationSection />
          <Gallery maxImages={9} />
        <MotivationSection />

        <MembershipSection maxPlans={3} />
        <KickstartSection />

        <TestimonialsSection />
        <FinalCTASection />
      
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
