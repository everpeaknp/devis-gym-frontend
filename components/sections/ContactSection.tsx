import { MapPinned, Phone } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { businessData } from "@/data/business";
import { socialLinks } from "@/data/social";
import { InstagramIcon, FacebookIcon, TikTokIcon } from "@/components/ui/SocialIcons";

const socialIcons = { instagram: InstagramIcon, tiktok: TikTokIcon, facebook: FacebookIcon };

export default function ContactSection() {
  const actions = [
    ...(businessData.contact.phone.value
      ? [
          {
            key: "call",
            label: "Call",
            sub: businessData.contact.phone.value,
            href: `tel:${businessData.contact.phone.value}`,
            icon: Phone,
          },
        ]
      : []),
    {
      key: "directions",
      label: "Get Directions",
      sub: "Open in Google Maps",
      href: businessData.location.mapsUrl,
      icon: MapPinned,
    },
    ...socialLinks.map((s) => ({
      key: s.key,
      label: s.label,
      sub: s.handle,
      href: s.url,
      icon: socialIcons[s.key],
    })),
  ];

  return (
    <section id="contact" className="bg-background overflow-hidden">
      <div className="container-edge py-24 md:py-32 relative">
        <SectionHeading
          eyebrow="Contact"
          title="Get in touch"
          description={
            businessData.contact.phone.value || businessData.contact.email.value
              ? undefined
              : "A direct phone number and email are being confirmed. For now, the fastest ways to reach Devi's Gym are below."
          }
        />

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Reveal key={action.key}>
                <a
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col justify-between gap-14 bg-background p-8 transition-colors duration-300 hover:bg-background-elevated cursor-pointer"
                >
                  <Icon
                    size={24}
                    strokeWidth={1.5}
                    className="text-muted transition-colors duration-300 group-hover:text-accent"
                  />
                  <div>
                    <h3 className="font-display text-lg font-bold uppercase tracking-tight">
                      {action.label}
                    </h3>
                    <p className="mt-1 text-sm text-muted-dim">{action.sub}</p>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
