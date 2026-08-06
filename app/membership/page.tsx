"use client";

import { ParallaxComponent } from "@/components/unused-components/ui/parallax-scrolling";
import MembershipSection from "@/components/sections/MembershipSection";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import BackButton from "@/components/ui/BackButton";

export default function MembershipPage() {
  return (
    <>
      <BackButton />
      {/* Parallax Section */}
      <ParallaxComponent />

      {/* Membership Section from Homepage */}
      <MembershipSection />

      {/* CTA Section */}
      <section className="bg-background-elevated">
        <div className="container-edge py-16 md:py-20">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-oswald text-[48px] leading-[56px] md:text-[64px] md:leading-[72px] font-bold uppercase tracking-tight mb-6 text-white">
                Ready to <span className="text-accent">Start Training?</span>
              </h2>
              <p className="text-muted text-base leading-relaxed mb-8">
                Join our community and experience what real training feels like.
                No commitments, no pressure - just results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-block px-8 py-4 bg-accent hover:bg-accent-bright text-black font-bold uppercase tracking-wide transition-colors rounded-none"
                >
                  Contact Us
                </a>
                <a
                  href="/"
                  className="inline-block px-8 py-4 bg-transparent border border-zinc-700 hover:bg-white hover:border-white text-white hover:text-black font-bold uppercase tracking-wide transition-all rounded-none"
                >
                  View Gym
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}
