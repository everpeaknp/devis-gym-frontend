import BackButton from "@/components/ui/BackButton";
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

const ZUMBA_IMAGES = [
  "/classes/zumba.jpg",
  "/gallery/people-1.jpeg",
  "/gallery/lifestyle-1.jpeg",
  "/gallery/gym-2.jpeg",
];

export default function ZumbaPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <Breadcrumb 
        items={[
          { label: "Home", href: "/" },
          { label: "Classes", href: "/classes" }
        ]}
        currentPage="Zumba"
        eyebrow="Dance Fitness"
      />

      <div className="container-edge py-24">
        <BackButton />

        {/* Hero CTA Section with Gallery */}
        <section className="mb-20">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-8 py-12 md:grid-cols-2">
            <ContainerStagger>
              <ContainerAnimated className="mb-4 block font-gotham text-accent font-bold uppercase tracking-wider" style={{ fontWeight: 700, fontSize: '17px', lineHeight: '24px' }}>
                Dance Your Way
              </ContainerAnimated>
              <ContainerAnimated className="font-gotham-condensed font-bold uppercase leading-[0.9] tracking-tight text-white" style={{ fontSize: '81px', lineHeight: '81px', fontWeight: 700 }}>
                Zumba Fitness
              </ContainerAnimated>
              <ContainerAnimated className="my-4 font-gotham text-white max-w-lg" style={{ fontWeight: 500, fontSize: '13px', lineHeight: '19px' }}>
                Dance your way to fitness with high-energy Zumba classes led by Barsha Grg. 
                Burn calories while having fun with Latin-inspired dance moves including 
                Latin dance, cardio party, and group fitness with a certified instructor.
              </ContainerAnimated>
              <ContainerAnimated>
                <Button asChild className="bg-accent hover:bg-accent/90">
                  <a href="/contact" className="flex items-center gap-2">
                    Join Zumba
                    <ArrowRight size={16} />
                  </a>
                </Button>
              </ContainerAnimated>
            </ContainerStagger>

            <GalleryGrid>
              {ZUMBA_IMAGES.map((imageUrl, index) => (
                <GalleryGridCell index={index} key={index}>
                  <Image
                    className="size-full object-cover object-center"
                    src={imageUrl}
                    alt={`Zumba class ${index + 1}`}
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

        {/* Schedule Section */}
        <section className="mb-20">
          <div className="mx-auto max-w-4xl px-8">
            <h2 className="font-gotham-condensed text-4xl md:text-5xl font-bold uppercase mb-8 text-center">Class Schedule</h2>
            <div className="bg-zinc-900/50 rounded-lg p-8 border border-zinc-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-accent font-gotham font-bold text-sm uppercase tracking-wider mb-2">Activity</div>
                  <div className="text-white font-gotham text-lg">Zumba</div>
                </div>
                <div className="text-center">
                  <div className="text-accent font-gotham font-bold text-sm uppercase tracking-wider mb-2">Time</div>
                  <div className="text-white font-gotham text-lg">6:00 AM – 7:00 AM</div>
                </div>
                <div className="text-center">
                  <div className="text-accent font-gotham font-bold text-sm uppercase tracking-wider mb-2">Days</div>
                  <div className="text-white font-gotham text-lg">Tuesday & Friday</div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-zinc-800">
                <div className="text-center mb-4">
                  <div className="text-accent font-gotham font-bold text-sm uppercase tracking-wider mb-2">Instructor</div>
                  <div className="text-white font-gotham text-lg">Barsha Grg</div>
                </div>
                <p className="text-zinc-400 font-gotham text-sm text-center">
                  Certified Zumba instructor specializing in Latin dance and cardio fitness
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
