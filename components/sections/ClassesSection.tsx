"use client";

import { useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const classTypes = [
  {
    id: 'outdoor',
    title: 'Outdoor Classes',
    description: 'Train in fresh air with boot camps, trail running, and outdoor yoga sessions.',
    icon: '🌳',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: 'personal',
    title: 'Personal Training',
    description: 'One-on-one sessions with certified trainers tailored to your goals.',
    icon: '🎯',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: 'group',
    title: 'Group Training',
    description: 'High-energy group classes including HIIT, strength, and functional fitness.',
    icon: '👥',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: 'digital',
    title: 'Digital Coaching',
    description: 'Virtual training sessions and online coaching programs from anywhere.',
    icon: '💻',
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3'
  }
];

export default function ClassesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // DEBUG: Log to verify component is loading
  console.log("ClassesSection component loaded at", new Date().toISOString());

  return (
    <section ref={sectionRef} id="classes" className="bg-background-elevated relative z-50">
      <div className="container-edge py-24 md:py-32">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end mb-16">
          <SectionHeading
            eyebrow="Training Programs"
            title="Find Your Perfect Class"
            className="max-w-2xl"
          />
          <Button 
            asChild 
            variant="outline" 
            className="w-fit border-accent text-accent hover:bg-accent hover:text-background"
          >
            <a href="/classes" className="flex items-center gap-2">
              View All Classes
              <ArrowRight size={16} />
            </a>
          </Button>
        </div>

        {/* Simple test - plain HTML links */}
        <div className="mb-8 space-x-4">
          <a 
            href="/classes/outdoor" 
            className="inline-block bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition-colors"
            style={{ pointerEvents: 'all', zIndex: 9999, position: 'relative' }}
          >
            TEST → OUTDOOR CLASSES
          </a>
          <a 
            href="/classes/personal" 
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors"
            style={{ pointerEvents: 'all', zIndex: 9999, position: 'relative' }}
          >
            TEST → PERSONAL TRAINING
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {classTypes.map((classType, index) => (
            <a 
              key={classType.id}
              href={`/classes/${classType.id}`}
              className="group bg-background border border-border rounded-lg overflow-hidden hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer block"
              style={{
                pointerEvents: 'all',
                position: 'relative',
                zIndex: 100,
              }}
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={classType.image}
                  alt={classType.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-2xl">{classType.icon}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-display text-lg font-bold uppercase tracking-tight text-white mb-3">
                  {classType.title}
                </h3>
                
                <p className="text-muted text-sm leading-relaxed mb-4">
                  {classType.description}
                </p>
                
                <div className="flex items-center gap-2 text-accent text-sm font-medium group-hover:text-background transition-colors">
                  Learn More
                  <ArrowRight size={14} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}