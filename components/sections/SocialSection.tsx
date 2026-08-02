import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { socialLinks } from "@/data/social";
import { InstagramIcon, FacebookIcon, TikTokIcon } from "@/components/ui/SocialIcons";

const icons = { instagram: InstagramIcon, tiktok: TikTokIcon, facebook: FacebookIcon };

export default function SocialSection() {
  return (
    <section className="bg-background">
      <div className="container-edge py-24 md:py-32">
        <SectionHeading
          eyebrow="Social"
          title="Follow the movement"
        />

        <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
          {socialLinks.map((s, i) => {
            const Icon = icons[s.key];
            return (
              <Reveal key={s.key} delay={i * 0.08}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col justify-between gap-16 bg-background p-8 transition-colors duration-300 hover:bg-background-elevated"
                >
                  <Icon
                    size={28}
                    strokeWidth={1.5}
                    className="text-muted transition-colors duration-300 group-hover:text-accent"
                  />
                  <div>
                    <h3 className="font-display text-xl font-bold uppercase tracking-tight">
                      {s.label}
                    </h3>
                    <p className="mt-1 text-sm text-muted-dim">{s.handle}</p>
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
