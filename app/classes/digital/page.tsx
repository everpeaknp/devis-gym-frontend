import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Footer from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";
import {
  ContainerAnimated,
  ContainerStagger,
  GalleryGrid,
  GalleryGridCell,
} from "@/components/ui/cta-section-with-gallery";

const DIGITAL_IMAGES = [
  "/gallery/training-1.jpeg",
  "/gallery/training-2.jpeg",
  "/gallery/gym-1.jpeg",
  "/gallery/people-1.jpeg",
];

export default function DigitalCoachingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <Breadcrumb 
        items={[
          { label: "Home", href: "/" },
          { label: "Classes", href: "/#classes" }
        ]}
        currentPage="Digital Coaching"
        eyebrow="Virtual Training"
      />

      {/* Hero CTA Section with Gallery */}
      <section className="py-16">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-8 py-12 md:grid-cols-2">
          <ContainerStagger>
            <ContainerAnimated className="mb-4 block font-gotham text-accent font-bold uppercase tracking-wider" style={{ fontWeight: 700, fontSize: '17px', lineHeight: '24px' }}>
              Train From Anywhere
            </ContainerAnimated>
            <ContainerAnimated className="font-gotham-condensed font-bold uppercase leading-[0.9] tracking-tight text-white" style={{ fontSize: '81px', lineHeight: '81px', fontWeight: 700 }}>
              Your Gym in Your Pocket
            </ContainerAnimated>
            <ContainerAnimated className="my-4 font-gotham text-white max-w-lg" style={{ fontWeight: 500, fontSize: '13px', lineHeight: '19px' }}>
              Get professional fitness guidance from anywhere with our digital coaching programs. 
              Combine the convenience of home workouts with expert instruction, personalized support, 
              and cutting-edge technology.
            </ContainerAnimated>
            <ContainerAnimated>
              <Button asChild className="bg-accent hover:bg-accent/90">
                <a href="/contact" className="flex items-center gap-2">
                  Start Digital Coaching
                  <ArrowRight size={16} />
                </a>
              </Button>
            </ContainerAnimated>
          </ContainerStagger>

          <GalleryGrid>
            {DIGITAL_IMAGES.map((imageUrl, index) => (
              <GalleryGridCell index={index} key={index}>
                <img
                  className="size-full object-cover object-center"
                  width="100%"
                  height="100%"
                  src={imageUrl}
                  alt={`Digital coaching session ${index + 1}`}
                />
              </GalleryGridCell>
            ))}
          </GalleryGrid>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}