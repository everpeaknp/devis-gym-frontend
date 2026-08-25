import { MapPin, Clock, Car } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { businessData } from "@/data/business";

export default function LocationSection() {
  const { latitude, longitude } = businessData.location;
  const mapEmbedSrc = `https://www.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`;

  return (
    <section id="location" className="bg-background-elevated">
      <div className="container-edge py-16 sm:py-20 md:py-24 lg:py-32 md:pb-12">
        <SectionHeading eyebrow="Location" title="Find us in Pokhara" />

        <div className="mt-8 sm:mt-10 md:mt-14 grid gap-4 sm:gap-6 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <div className="flex h-full flex-col justify-between border border-border p-6 sm:p-8">
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  <MapPin size={14} className="text-white" />
                  {businessData.location.city}, {businessData.location.country}
                </p>
                <p className="font-display mt-3 sm:mt-4 text-2xl sm:text-3xl font-extrabold uppercase leading-tight">
                  Devi&apos;s Gym
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {businessData.location.address.value ??
                    "Exact street address to be confirmed — use the map link for precise directions."}
                </p>
                <p className="mt-4 font-mono text-xs text-muted-dim">
                  {latitude}, {longitude}
                </p>

                {/* Opening Hours */}
                <div className="mt-6">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white mb-2">
                    <Clock size={14} className="text-white" />
                    Opening Hours
                  </p>
                  <p className="text-sm text-muted leading-relaxed">
                    {businessData.hours.value?.display ?? "Hours to be confirmed"}
                  </p>
                </div>

                {/* Parking */}
                <div className="mt-4">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white mb-2">
                    <Car size={14} className="text-white" />
                    Parking
                  </p>
                  <p className="text-sm text-muted leading-relaxed">
                    {businessData.parking?.value?.description ?? "Parking information to be confirmed"}
                  </p>
                </div>
              </div>

              <Button
                asChild
                variant="default"
                className="mt-6 sm:mt-8 md:mt-10 w-fit"
              >
                <a 
                  href={businessData.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-[360px] w-full overflow-hidden border border-border grayscale-0 sm:h-[420px] lg:h-full">
              <iframe
                title="Devi's Gym location map"
                src={mapEmbedSrc}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 360 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
