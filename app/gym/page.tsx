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
          <div className="flex h-full flex-col justify-between">
            <div className="flex-1 flex items-center">
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
            <div className="w-full mt-16">
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
                className="grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-0 w-full max-w-none"
                cardClassName="h-64"
              />
            </div>
          </div>
        </FlowSection>

        {/* Section 2 - The Equipment */}
        <FlowSection aria-label="The Equipment" className="bg-zinc-800">
          <div className="flex h-full flex-col justify-between">
            <div className="flex-1 flex items-center">
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-accent text-sm font-bold uppercase tracking-wider mb-4">
                  The Equipment
                </p>
                <h2 className="font-oswald text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] font-bold uppercase tracking-tight text-white mb-6">
                  Built to
                  <span className="block text-accent">Last Forever</span>
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-8 mx-auto">
                  Olympic platforms. Competition bars. Bumper plates that can handle anything. Every piece of equipment chosen because it works, not because it looks good in photos.
                </p>
              </div>
            </div>
            
            {/* Equipment Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-auto">
              {/* Free Weights */}
              <div className="bg-zinc-900 p-6 rounded-lg text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 6h18M3 12h18M3 18h18" />
                    </svg>
                  </div>
                  <h3 className="font-oswald text-xl font-bold uppercase text-white">
                    Free Weights
                  </h3>
                </div>
                <ul className="space-y-2.5 text-muted">
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-accent">•</span>
                    <span>Olympic Barbells (20kg Men's / 15kg Women's)</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-accent">•</span>
                    <span>Dumbbells 5kg - 50kg (Full Set)</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-accent">•</span>
                    <span>Kettlebells 8kg - 32kg</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-accent">•</span>
                    <span>Competition Bumper Plates (5kg - 25kg)</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-accent">•</span>
                    <span>Iron Plates (1.25kg - 20kg)</span>
                  </li>
                </ul>
              </div>

              {/* Stations & Racks */}
              <div className="bg-zinc-900 p-6 rounded-lg text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="font-oswald text-xl font-bold uppercase text-white">
                    Stations
                  </h3>
                </div>
                <ul className="space-y-2.5 text-muted">
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-accent">•</span>
                    <span>4 Olympic Lifting Platforms</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-accent">•</span>
                    <span>2 Power Squat Racks with Spotter Arms</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-accent">•</span>
                    <span>Flat & Adjustable Benches</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-accent">•</span>
                    <span>Pull-up Bars & Dip Station</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-accent">•</span>
                    <span>Deadlift Platform</span>
                  </li>
                </ul>
              </div>

              {/* Cardio & Accessories */}
              <div className="bg-zinc-900 p-6 rounded-lg text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-oswald text-xl font-bold uppercase text-white">
                    Cardio & More
                  </h3>
                </div>
                <ul className="space-y-2.5 text-muted">
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-accent">•</span>
                    <span>Assault Bikes (Air Bikes)</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-accent">•</span>
                    <span>Concept2 Rowing Machines</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-accent">•</span>
                    <span>Battle Ropes & Slam Balls</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-accent">•</span>
                    <span>Resistance Bands & Lifting Straps</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-accent">•</span>
                    <span>Foam Rollers & Mobility Tools</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </FlowSection>

        {/* Section 3 - The Atmosphere */}
        <FlowSection aria-label="The Atmosphere" className="bg-zinc-900">
          <div className="flex h-full flex-col justify-between">
            <div className="flex-1 flex items-center">
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-accent text-sm font-bold uppercase tracking-wider mb-4">
                  The Atmosphere
                </p>
                <h2 className="font-oswald text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] font-bold uppercase tracking-tight text-white mb-6">
                  No Ego
                  <span className="block text-accent">Just Work</span>
                </h2>
              </div>
            </div>
            
            {/* Stats with spacing */}
            <div className="mt-12">
              <div className="grid grid-cols-4 gap-6 mb-16">
                <div className="text-center">
                  <div className="font-oswald text-5xl font-bold text-accent mb-2">{new Date().getFullYear() - 2018}+</div>
                  <div className="text-muted text-sm uppercase tracking-wide">Years Serving Pokhara</div>
                </div>
                <div className="text-center">
                  <div className="font-oswald text-5xl font-bold text-accent mb-2">500+</div>
                  <div className="text-muted text-sm uppercase tracking-wide">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="font-oswald text-5xl font-bold text-accent mb-2">6+</div>
                  <div className="text-muted text-sm uppercase tracking-wide">Certified Trainers</div>
                </div>
                <div className="text-center">
                  <div className="font-oswald text-5xl font-bold text-accent mb-2">Sun-Fri</div>
                  <div className="text-muted text-sm uppercase tracking-wide">5 AM - 10 PM</div>
                </div>
              </div>
              
              {/* Description with spacing */}
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-muted text-lg leading-relaxed">
                  Everyone here started somewhere. Form before weight. Progress over perfection. We help each other get better because that's what real gyms do.
                </p>
              </div>
            </div>
          </div>
        </FlowSection>

        {/* Section 4 - The Rules */}
        <FlowSection aria-label="The Rules" className="bg-zinc-800">
          <div className="flex h-full flex-col justify-between">
            <div className="flex-1 flex items-center">
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-accent text-sm font-bold uppercase tracking-wider mb-4">
                  The Rules
                </p>
                <h2 className="font-oswald text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] font-bold uppercase tracking-tight text-white mb-6">
                  Keep It
                  <span className="block text-accent">Simple</span>
                </h2>
              </div>
            </div>
            
            {/* Rules with spacing */}
            <div className="mt-16">
              <div className="space-y-6 text-muted text-lg max-w-2xl mx-auto">
                <div>
                  <h3 className="text-white font-bold mb-2">1. Rerack Your Weights</h3>
                  <p>Put everything back where you found it. Everyone lifts better without tripping over plates.</p>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2">2. Share Equipment</h3>
                  <p>Working in between sets is normal. Ask first, be respectful.</p>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2">3. No Dropping Empty Bars</h3>
                  <p>Load it or control it. The floor can handle weight, not carelessness.</p>
                </div>
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
