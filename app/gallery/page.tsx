"use client";

import Breadcrumb from "@/components/ui/Breadcrumb";
import Gallery from "@/components/sections/Gallery";
import Footer from "@/components/layout/Footer";
import BackButton from "@/components/ui/BackButton";

export default function GalleryPage() {
  return (
    <>
      <BackButton />
      {/* Hero Breadcrumb Section - matches gym page style */}
      <Breadcrumb 
        items={[{ label: "Home", href: "/" }]}
        currentPage="Gallery"
        eyebrow="OUR MOMENTS"
      />

      {/* Interactive Gallery Section - shows ALL images with filters */}
      <Gallery />

      {/* Footer */}
      <Footer />
    </>
  );
}
