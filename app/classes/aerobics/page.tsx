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

const AEROBICS_IMAGES = [
  "https://res.cloudinary.com/ufiebboc/image/upload/v1786269568/devis-gym/people/DSC07627-3.JPG.webp",
  "https://res.cloudinary.com/ufiebboc/image/upload/v1786269270/devis-gym/people/DSC07567.JPG.webp",
  "https://res.cloudinary.com/ufiebboc/image/upload/v1786268875/devis-gym/people/DSC07385.JPG.webp",
  "https://res.cloudinary.com/ufiebboc/image/upload/v1786269260/devis-gym/people/DSC07563.JPG.webp",
];

export default function AerobicsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <Breadcrumb 
        items={[
          { label: "Home", href: "/" },
          { label: "Classes", href: "/classes" }
        ]}
        currentPage="Aerobics"
        eyebrow="Group Fitness"
      />

      <div className="container-edge py-24">
        <BackButton />

        {/* Hero CTA Section with Gallery */}
        <section className="mb-20">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-8 py-12 md:grid-cols-2">
            <ContainerStagger>
              <ContainerAnimated className="mb-4 block font-gotham text-accent font-bold uppercase tracking-wider" style={{ fontWeight: 700, fontSize: '17px', lineHeight: '24px' }}>
                Get Moving
              </ContainerAnimated>
              <ContainerAnimated className="font-gotham-condensed font-bold uppercase leading-[0.9] tracking-tight text-white" style={{ fontSize: '81px', lineHeight: '81px', fontWeight: 700 }}>
                Energetic Aerobics
              </ContainerAnimated>
              <ContainerAnimated className="my-4 font-gotham text-white max-w-lg" style={{ fontWeight: 500, fontSize: '13px', lineHeight: '19px' }}>
                Fun and energetic group classes that improve cardiovascular fitness 
                through rhythmic exercises and dance movements. Enjoy step aerobics, 
                dance fitness, and low-impact options for all fitness levels.
              </ContainerAnimated>
              <ContainerAnimated>
                <Button asChild className="bg-accent hover:bg-accent/90">
                  <a href="/contact" className="flex items-center gap-2">
                    Join Aerobics
                    <ArrowRight size={16} />
                  </a>
                </Button>
              </ContainerAnimated>
            </ContainerStagger>

            <GalleryGrid>
              {AEROBICS_IMAGES.map((imageUrl, index) => (
                <GalleryGridCell index={index} key={index}>
                  <Image
                    className="size-full object-cover object-center"
                    src={imageUrl}
                    alt={`Aerobics class ${index + 1}`}
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
