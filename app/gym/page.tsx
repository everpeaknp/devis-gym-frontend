"use client";

import Footer from "@/components/layout/Footer";
import FlowArt, { FlowSection } from "@/components/ui/FlowArt";
import Breadcrumb from "@/components/ui/Breadcrumb";
import HoverRevealCards from "@/components/unused-components/ui/cards";
import BackButton from "@/components/ui/BackButton";

export default function GymPage() {
  return (
    <>
      <BackButton />
      <Breadcrumb 
        items={[{ label: "Home", href: "/" }]}
        currentPage="The Gym"
        eyebrow="OUR FACILITY"
      />
      <FlowArt aria-label="Devi's Gym Experience">
        {/* Section 1 - The Space */}
        <FlowSection aria-label="The Space" className="bg-zinc-900">
          <div className="flex h-full flex-col justify-between py-8">
            <div className="flex-1 flex items-center justify-center">
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-accent text-sm font-bold uppercase tracking-wider mb-4">
                  The Space
                </p>
                <h2 className="font-oswald text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] font-bold uppercase tracking-tight text-white mb-6">
                  Built for
                  <span className="block text-accent">Real Training</span>
                </h2>
              </div>
            </div>
            
            {/* Hover Reveal Cards */}
            <div className="w-full">
              <HoverRevealCards
                items={[
                  {
                    id: 1,
                    title: 'Free Weights',
                    subtitle: 'STRENGTH',
                    imageUrl: 'https://res.cloudinary.com/ufiebboc/image/upload/w_600,h_600,c_fill,q_auto,f_auto/v1786268711/devis-gym/devis/IMG_7358.JPG.jpg'
                  },
                  {
                    id: 2,
                    title: 'Cardio Zone',
                    subtitle: 'ENDURANCE',
                    imageUrl: 'https://res.cloudinary.com/ufiebboc/image/upload/w_600,h_600,c_fill,q_auto,f_auto/v1786268712/devis-gym/devis/IMG_7359.JPG.jpg'
                  },
                  {
                    id: 3,
                    title: 'Power Racks',
                    subtitle: 'POWER',
                    imageUrl: 'https://res.cloudinary.com/ufiebboc/image/upload/w_600,h_600,c_fill,q_auto,f_auto/v1786268714/devis-gym/devis/IMG_7360.JPG.jpg'
                  },
                  {
                    id: 4,
                    title: 'Functional',
                    subtitle: 'TRAINING',
                    imageUrl: 'https://res.cloudinary.com/ufiebboc/image/upload/w_600,h_600,c_fill,q_auto,f_auto/v1786268716/devis-gym/devis/IMG_7361.JPG.jpg'
                  },
                  {
                    id: 5,
                    title: 'Olympic Lifts',
                    subtitle: 'TECHNIQUE',
                    imageUrl: 'https://res.cloudinary.com/ufiebboc/image/upload/w_600,h_600,c_fill,q_auto,f_auto/v1786268718/devis-gym/devis/IMG_7362.JPG.jpg'
                  },
                  {
                    id: 6,
                    title: 'Recovery Zone',
                    subtitle: 'MOBILITY',
                    imageUrl: 'https://res.cloudinary.com/ufiebboc/image/upload/w_600,h_600,c_fill,q_auto,f_auto/v1786268720/devis-gym/devis/IMG_7363.JPG.jpg'
                  }
                ]}
                className="grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 p-0 w-full max-w-none"
                cardClassName="h-48"
              />
            </div>
          </div>
        </FlowSection>

        {/* Section 2 - The Equipment */}
        <FlowSection aria-label="The Equipment" className="bg-zinc-800">
          <div className="flex h-full flex-col justify-center py-8">
            <div className="max-w-4xl mx-auto text-center mb-8">
              <p className="text-accent text-sm font-bold uppercase tracking-wider mb-4">
                The Equipment
              </p>
              <h2 className="font-oswald text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] font-bold uppercase tracking-tight text-white mb-6">
                Built to
                <span className="block text-accent">Last Forever</span>
              </h2>
              <p className="text-muted text-lg leading-relaxed max-w-2xl mx-auto">
                Olympic platforms. Competition bars. Bumper plates that can handle anything. Every piece of equipment chosen because it works, not because it looks good in photos.
              </p>
            </div>
            
            {/* Equipment Grid - Compact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto w-full">
              {/* Free Weights */}
              <div className="bg-zinc-900 p-4 rounded-lg text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 6h18M3 12h18M3 18h18" />
                    </svg>
                  </div>
                  <h3 className="font-oswald text-lg font-bold uppercase text-white">
                    Free Weights
                  </h3>
                </div>
                <ul className="space-y-1.5 text-muted text-sm">
                  <li>Olympic Barbells</li>
                  <li>Dumbbells 5-50kg</li>
                  <li>Kettlebells 8-32kg</li>
                  <li>Bumper Plates</li>
                </ul>
              </div>

              {/* Stations & Racks */}
              <div className="bg-zinc-900 p-4 rounded-lg text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="font-oswald text-lg font-bold uppercase text-white">
                    Stations
                  </h3>
                </div>
                <ul className="space-y-1.5 text-muted text-sm">
                  <li>4 Olympic Platforms</li>
                  <li>2 Power Racks</li>
                  <li>Benches</li>
                  <li>Pull-up & Dip Bars</li>
                </ul>
              </div>

              {/* Cardio & Accessories */}
              <div className="bg-zinc-900 p-4 rounded-lg text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-oswald text-lg font-bold uppercase text-white">
                    Cardio
                  </h3>
                </div>
                <ul className="space-y-1.5 text-muted text-sm">
                  <li>Assault Bikes</li>
                  <li>Concept2 Rowers</li>
                  <li>Battle Ropes</li>
                  <li>Mobility Tools</li>
                </ul>
              </div>
            </div>
          </div>
        </FlowSection>

        {/* Section 3 - The Atmosphere */}
        <FlowSection aria-label="The Atmosphere" className="bg-zinc-900">
          <div className="flex h-full flex-col justify-center py-8">
            <div className="max-w-4xl mx-auto text-center mb-8">
              <p className="text-accent text-sm font-bold uppercase tracking-wider mb-4">
                The Atmosphere
              </p>
              <h2 className="font-oswald text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] font-bold uppercase tracking-tight text-white mb-6">
                No Ego
                <span className="block text-accent">Just Work</span>
              </h2>
            </div>
            
            {/* Stats - Compact */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto w-full">
              <div className="text-center">
                <div className="font-oswald text-4xl font-bold text-accent mb-1">{new Date().getFullYear() - 2018}+</div>
                <div className="text-muted text-xs uppercase tracking-wide">Years</div>
              </div>
              <div className="text-center">
                <div className="font-oswald text-4xl font-bold text-accent mb-1">500+</div>
                <div className="text-muted text-xs uppercase tracking-wide">Members</div>
              </div>
              <div className="text-center">
                <div className="font-oswald text-4xl font-bold text-accent mb-1">6+</div>
                <div className="text-muted text-xs uppercase tracking-wide">Trainers</div>
              </div>
              <div className="text-center">
                <div className="font-oswald text-4xl font-bold text-accent mb-1">Sun-Fri</div>
                <div className="text-muted text-xs uppercase tracking-wide">5 AM - 9 PM</div>
              </div>
            </div>
            
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-muted text-base leading-relaxed">
                Everyone here started somewhere. Form before weight. Progress over perfection. We help each other get better because that's what real gyms do.
              </p>
            </div>
          </div>
        </FlowSection>

        {/* Section 4 - The Rules */}
        <FlowSection aria-label="The Rules" className="bg-zinc-800">
          <div className="flex h-full flex-col justify-center py-8">
            <div className="max-w-4xl mx-auto text-center mb-8">
              <p className="text-accent text-sm font-bold uppercase tracking-wider mb-4">
                The Rules
              </p>
              <h2 className="font-oswald text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] font-bold uppercase tracking-tight text-white mb-6">
                Keep It
                <span className="block text-accent">Simple</span>
              </h2>
            </div>
            
            {/* Rules - Compact */}
            <div className="space-y-4 text-muted max-w-2xl mx-auto">
              <div>
                <h3 className="text-white font-bold mb-1">1. Rerack Your Weights</h3>
                <p className="text-sm">Put everything back where you found it. Everyone lifts better without tripping over plates.</p>
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">2. Share Equipment</h3>
                <p className="text-sm">Working in between sets is normal. Ask first, be respectful.</p>
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">3. No Dropping Empty Bars</h3>
                <p className="text-sm">Load it or control it. The floor can handle weight, not carelessness.</p>
              </div>
            </div>
          </div>
        </FlowSection>

        {/* Section 5 - Join Us */}
        <FlowSection aria-label="Join Us" className="bg-zinc-900">
          <div className="flex h-full flex-col justify-center items-center text-center">
            <h2 className="font-oswald text-[clamp(3rem,10vw,8rem)] leading-[0.9] font-bold uppercase tracking-tight text-white mb-8">
              Ready to
              <span className="block text-accent">Start Training?</span>
            </h2>
            <p className="text-muted text-xl leading-relaxed max-w-2xl mb-12">
              Come see the gym. Try a session. Talk to the trainers. See if this is the place for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/contact"
                className="inline-block px-10 py-5 bg-accent hover:bg-accent-bright text-black font-bold uppercase tracking-wide transition-colors rounded-none text-lg"
              >
                Visit the Gym
              </a>
              <a
                href="/#membership"
                className="inline-block px-10 py-5 bg-transparent border-2 border-zinc-700 hover:bg-white hover:border-white text-white hover:text-black font-bold uppercase tracking-wide transition-all rounded-none text-lg"
              >
                View Membership
              </a>
            </div>
          </div>
        </FlowSection>
      </FlowArt>
      <Footer />
    </>
  );
}
