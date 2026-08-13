"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  aboutTeam,
  aboutStats,
} from "@/data/about";
import { galleryImages } from "@/data/gallery";
import InstagramFeed from "@/components/ui/InstagramFeed";
import Reveal from "@/components/ui/Reveal";
import Footer from "@/components/layout/Footer";
import ScrollExpandMedia from "@/components/unused-components/ui/scroll-expansion-hero";
import BackButton from "@/components/ui/BackButton";

// Counter component with animation
function StatCounter({ stat }: { stat: { id: string; value: string; label: string } }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Extract number from value (e.g., "5+" -> 5, "500+" -> 500)
  const targetNumber = parseInt(stat.value.replace(/\D/g, '')) || 0;
  const suffix = stat.value.replace(/[0-9]/g, '');
  
  // Check if the value contains any numbers - if not, it's a text-only stat
  const isNumericStat = /\d/.test(stat.value);

  useEffect(() => {
    if (!isNumericStat) {
      // For non-numeric stats, don't animate
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // Animate counter
          const duration = 2000; // 2 seconds
          const steps = 60;
          const increment = targetNumber / steps;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            if (currentStep <= steps) {
              setCount(Math.min(Math.ceil(increment * currentStep), targetNumber));
            } else {
              clearInterval(timer);
            }
          }, duration / steps);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [targetNumber, hasAnimated, isNumericStat]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-oswald text-[48px] leading-[56px] md:text-[64px] md:leading-[72px] font-bold mb-2" style={{ color: '#c7ff3d', fontFamily: 'Oswald, Arial, sans-serif' }}>
        {isNumericStat ? `${count}${suffix}` : stat.value}
      </div>
      <div className="text-muted text-sm uppercase tracking-wide font-bold">
        {stat.label}
      </div>
    </div>
  );
}

// About Content Component
const AboutContent = () => {
  return (
    <div className="bg-background">
      {/* Stats Section - Above Team Section */}
      <section className="bg-background">
        <div className="container-edge py-16 md:py-20">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {aboutStats.map((stat) => (
                <StatCounter key={stat.id} stat={stat} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-background">
        <div className="container-edge py-16 md:py-20">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-oswald text-[48px] leading-[56px] font-bold uppercase tracking-tight mb-6 text-white">
                {aboutTeam.heading}
              </h2>
              <p className="text-muted leading-relaxed max-w-2xl mx-auto">{aboutTeam.body}</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {aboutTeam.members.map((member, index) => (
                <div 
                  key={member.id} 
                  className="group"
                  style={{ 
                    marginTop: index % 2 === 0 ? '0' : '3rem'
                  }}
                >
                  {/* Photo with Hover Effect */}
                  <div className="relative h-[360px] w-full max-w-[285px] mx-auto overflow-hidden bg-background-elevated">
                    <Image
                      src={member.image || "/about/background.jpg"}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="285px"
                      loading="lazy"
                      quality={75}
                    />
                    
                    {/* Social Icons Bar - Show on Hover */}
                    <div className="absolute bottom-0 left-0 right-0 bg-[#d4ff00] py-3 px-6 flex gap-3 justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                      <a href="#" className="w-6 h-6 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors cursor-pointer">
                        <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                      <a href="#" className="w-6 h-6 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors cursor-pointer">
                        <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                      <a href="#" className="w-6 h-6 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors cursor-pointer">
                        <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Text Below Photo */}
                  <div className="bg-background-elevated py-6 px-6 w-full max-w-[285px] mx-auto">
                    <h3 className="font-oswald text-[24px] leading-[32px] font-bold uppercase tracking-tight mb-1 text-white">
                      {member.name}
                    </h3>
                    <p className="text-accent text-xs uppercase tracking-wide font-bold">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>



      {/* CTA Section - Full Width */}
      <section className="w-full bg-background-elevated">
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
                  className="inline-block px-8 py-4 bg-accent text-black font-bold uppercase tracking-wide rounded-none"
                >
                  Contact Us
                </a>
                <a
                  href="/#membership"
                  className="inline-block px-8 py-4 bg-transparent border border-zinc-700 text-white font-bold uppercase tracking-wide rounded-none"
                >
                  View Membership
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Instagram Gallery - Full Viewport Width */}
      <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-background border-y border-zinc-800">
        <div className="flex w-full">
          {/* Vertical Instagram Bar */}
          <div className="bg-[#d4ff00] flex flex-col items-center justify-center py-8 px-4 min-w-[60px] flex-shrink-0 z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-black/10">
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div className="text-black font-bold text-xs tracking-wide" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                @devisgym_pokhara
              </div>
            </div>
          </div>

          {/* Images - Full Width */}
          <div className="flex-1">
            <InstagramFeed />
          </div>
        </div>
      </section>
    </div>
  );
};

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <BackButton />
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="https://res.cloudinary.com/ufiebboc/video/upload/f_auto,q_auto/hfjpk00y9fqeznekhrh9"
        posterSrc="https://res.cloudinary.com/ufiebboc/image/upload/v1786268716/devis-gym/devis/IMG_7361.JPG.jpg"
        bgImageSrc="https://res.cloudinary.com/ufiebboc/image/upload/v1786268716/devis-gym/devis/IMG_7361.JPG.jpg"
        title="Devi's Gym Experience"
        date="In Pokhara since 2018"
       
        scrollToExpand="Scroll to Explore Our Gym"
        textBlend
      >
        {/* About Hero Content - All in One Horizontal Row */}
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="font-gotham font-bold uppercase tracking-wider mb-1 lg:mb-1" 
               style={{ 
                 fontWeight: 700,
                 fontSize: '17px',
                 lineHeight: '24px',
                 color: 'rgb(255, 255, 255)'
               }}>
              About Devi&apos;s Gym
            </p>
            
            <h1 className="font-gotham-condensed font-bold uppercase leading-[0.9] tracking-tight relative mb-3 lg:mb-4"
                style={{ 
                  fontSize: '81px',
                  lineHeight: '81px',
                  fontWeight: 700,
                  color: 'rgb(255, 255, 255)'
                }}>
              <span className="block" style={{ color: 'rgb(255, 255, 255)' }}>More Than</span>
              <span className="block" style={{ color: '#c7ff3d' }}>Just A Gym.</span>
            </h1>
            
            <p className="font-gotham max-w-4xl mx-auto"
               style={{ 
                 fontWeight: 500,
                 fontSize: '13px',
                 lineHeight: '19px',
                 color: 'rgb(255, 255, 255)'
               }}>
              Devi&apos;s Gym provides a unique way to engage with our fitness community through interactive experiences. Located in the heart of Pokhara, we&apos;ve been transforming lives for over {new Date().getFullYear() - 2018} years with our commitment to functional training and personalized fitness solutions. Our state-of-the-art facility combines modern equipment with expert guidance from 6+ certified trainers who are passionate about helping you achieve your goals. Open Sunday through Friday from 5:00 AM to 10:00 PM, we offer flexible hours to fit your schedule. With a supportive community of 500+ active members, we offer more than just a workout space - we provide a complete fitness ecosystem designed to unlock your true potential. Discover what makes our gym different with this innovative presentation of our facilities and services.
            </p>
          </div>

          {/* All Content in Single Horizontal Row */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Column 1: Our Facilities */}
            <div className="flex-1 space-y-4">
              <h3 className="font-gotham font-bold uppercase tracking-wider"
                  style={{ 
                    fontWeight: 700,
                    fontSize: '17px',
                    lineHeight: '24px',
                    color: 'rgb(255, 255, 255)'
                  }}>
                Our Facilities
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  <span className="font-gotham"
                        style={{ 
                          fontWeight: 500,
                          fontSize: '13px',
                          lineHeight: '19px',
                          color: 'rgb(255, 255, 255)'
                        }}>
                    Modern cardio equipment
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  <span className="font-gotham"
                        style={{ 
                          fontWeight: 500,
                          fontSize: '13px',
                          lineHeight: '19px',
                          color: 'rgb(255, 255, 255)'
                        }}>
                    Comprehensive free weight area
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  <span className="font-gotham"
                        style={{ 
                          fontWeight: 500,
                          fontSize: '13px',
                          lineHeight: '19px',
                          color: 'rgb(255, 255, 255)'
                        }}>
                    Functional training space
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  <span className="font-gotham"
                        style={{ 
                          fontWeight: 500,
                          fontSize: '13px',
                          lineHeight: '19px',
                          color: 'rgb(255, 255, 255)'
                        }}>
                    Professional coaching available
                  </span>
                </li>
              </ul>
            </div>
            
            {/* Column 2: Why Choose Us */}
            <div className="flex-1 space-y-4">
              <h3 className="font-gotham font-bold uppercase tracking-wider"
                  style={{ 
                    fontWeight: 700,
                    fontSize: '17px',
                    lineHeight: '24px',
                    color: 'rgb(255, 255, 255)'
                  }}>
                Why Choose Us
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  <span className="font-gotham"
                        style={{ 
                          fontWeight: 500,
                          fontSize: '13px',
                          lineHeight: '19px',
                          color: 'rgb(255, 255, 255)'
                        }}>
                    Located in the heart of Pokhara
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  <span className="font-gotham"
                        style={{ 
                          fontWeight: 500,
                          fontSize: '13px',
                          lineHeight: '19px',
                          color: 'rgb(255, 255, 255)'
                        }}>
                    Supportive fitness community
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  <span className="font-gotham"
                        style={{ 
                          fontWeight: 500,
                          fontSize: '13px',
                          lineHeight: '19px',
                          color: 'rgb(255, 255, 255)'
                        }}>
                    Flexible membership options
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  <span className="font-gotham"
                        style={{ 
                          fontWeight: 500,
                          fontSize: '13px',
                          lineHeight: '19px',
                          color: 'rgb(255, 255, 255)'
                        }}>
                    Clean and well-maintained facility
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 3: Mission */}
            <div className="flex-1 space-y-4">
              <h3 className="font-gotham font-bold uppercase tracking-wider"
                  style={{ 
                    fontWeight: 700,
                    fontSize: '17px',
                    lineHeight: '24px',
                    color: 'rgb(255, 255, 255)'
                  }}>
                Mission
              </h3>
              <p className="font-gotham"
                 style={{ 
                   fontWeight: 500,
                   fontSize: '13px',
                   lineHeight: '19px',
                   color: 'rgb(255, 255, 255)'
                 }}>
                Our purpose is to pass on empowering knowledge and training guidance in order to have a positive impact on the health and fitness of everyone we work with.
              </p>
              <p className="font-gotham"
                 style={{ 
                   fontWeight: 500,
                   fontSize: '13px',
                   lineHeight: '19px',
                   color: 'rgb(255, 255, 255)'
                 }}>
                To provide a personalised health and fitness service that unlocks every individual&apos;s true potential so they can achieve their desired goals.
              </p>
            </div>

            {/* Column 4: Story */}
            <div className="flex-1 space-y-4">
              <h3 className="font-gotham font-bold uppercase tracking-wider"
                  style={{ 
                    fontWeight: 700,
                    fontSize: '17px',
                    lineHeight: '24px',
                    color: 'rgb(255, 255, 255)'
                  }}>
                Story
              </h3>
              <p className="font-gotham"
                 style={{ 
                   fontWeight: 500,
                   fontSize: '13px',
                   lineHeight: '19px',
                   color: 'rgb(255, 255, 255)'
                 }}>
                Our main focus at Devi&apos;s Gym is functional training because of the proven benefits. With an emphasis on mobility, strength and conditioning, the benefits of functional training differ from other workouts because of the way it targets your body.
              </p>
            </div>
          </div>
        </div>
        
        <AboutContent />
      </ScrollExpandMedia>
      
      <Footer />
    </div>
  );
}