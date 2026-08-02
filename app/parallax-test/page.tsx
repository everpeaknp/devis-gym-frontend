'use client';

import { ParallaxComponent } from '@/components/ui/parallax-scrolling';
import ParallaxDemo from '@/components/ui/parallax-demo';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';

export default function ParallaxTestPage() {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb 
        items={[{ label: "Home", href: "/" }]}
        currentPage="Parallax Test"
        eyebrow="DEMO"
      />
      
      {/* Parallax Demo */}
      <ParallaxDemo />
      
      {/* Additional Content */}
      <section className="bg-background py-16 md:py-24">
        <div className="container-edge">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-6">
              Parallax Integration <span className="text-accent">Complete</span>
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-8">
              The parallax scrolling component has been successfully integrated into your project. 
              It uses GSAP for smooth animations and Lenis for enhanced scrolling performance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              <div className="bg-background-elevated p-6 rounded-lg">
                <h3 className="font-oswald text-xl font-bold text-accent mb-3">GSAP Powered</h3>
                <p className="text-muted text-sm">High-performance animations with ScrollTrigger integration</p>
              </div>
              <div className="bg-background-elevated p-6 rounded-lg">
                <h3 className="font-oswald text-xl font-bold text-accent mb-3">Responsive</h3>
                <p className="text-muted text-sm">Optimized for all screen sizes and devices</p>
              </div>
              <div className="bg-background-elevated p-6 rounded-lg">
                <h3 className="font-oswald text-xl font-bold text-accent mb-3">Lenis Smooth</h3>
                <p className="text-muted text-sm">Enhanced scroll experience with momentum-based scrolling</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}