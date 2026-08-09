"use client";

import { useState } from "react";
import { contactInfo, contactIntro, socialLinks } from "@/data/contact";
import Reveal from "@/components/ui/Reveal";
import Footer from "@/components/layout/Footer";
import SocialSection from "@/components/sections/SocialSection";
import LocationSection from "@/components/sections/LocationSection";
import Breadcrumb from "@/components/ui/Breadcrumb";
import VelocityText from "@/components/unused-components/ui/VelocityText";
import BackButton from "@/components/ui/BackButton";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <BackButton />
      {/* Breadcrumb right after navigation */}
      {/* <Breadcrumb 
        items={[{ label: "Home", href: "/" }]}
        currentPage="Contact"
        eyebrow="GET IN TOUCH"
      /> */}


      {/* Velocity Text Hero - Full Screen Scroll Effect */}
      <div className="relative">
        <VelocityText />

      </div>
 {/* Location Section */}
      <LocationSection />
      <main className="relative bg-background">
     

      {/* Contact Content */}
      <section className="bg-background">
        <div className="container-edge py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Information - Left */}
            <Reveal delay={0.2}>
              <div className="space-y-10">
                {/* Address and Contact Details - Side by Side */}
                <div className="grid sm:grid-cols-2 gap-8">
                  {/* Address */}
                  <div>
                    <h3 className="font-oswald text-[20px] leading-[28px] font-bold uppercase tracking-tight mb-4 text-white">
                      Visit Us
                    </h3>
                    <div className="text-muted space-y-1">
                      <p>{contactInfo.address.street}</p>
                      <p>
                        {contactInfo.address.city}, {contactInfo.address.state}
                      </p>
                      <p>
                        {contactInfo.address.zip}, {contactInfo.address.country}
                      </p>
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div>
                    <h3 className="font-oswald text-[20px] leading-[28px] font-bold uppercase tracking-tight mb-4 text-white">
                      Get in Touch
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-dim uppercase tracking-wide font-bold mb-1">
                          Phone
                        </p>
                        <a
                          href={`tel:${contactInfo.phone}`}
                          className="text-white hover:text-accent transition-colors"
                        >
                          {contactInfo.phone}
                        </a>
                      </div>
                      <div>
                        <p className="text-xs text-muted-dim uppercase tracking-wide font-bold mb-1">
                          Email
                        </p>
                        <a
                          href={`mailto:${contactInfo.email}`}
                          className="text-white hover:text-accent transition-colors"
                        >
                          {contactInfo.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Parking Details */}
                <div>
                  <h3 className="font-oswald text-[20px] leading-[28px] font-bold uppercase tracking-tight mb-4 text-white">
                    Parking
                  </h3>
                  <div className="text-muted space-y-2">
                    <p>✓ Free parking available on-site</p>
                    <p>✓ 24/7 secure parking area</p>
                    <p>✓ Motorcycle & car parking spaces</p>
                    <p>✓ Well-lit parking with CCTV monitoring</p>
                    <p className="text-sm text-muted-dim mt-3">
                      Entrance via main gate - follow parking signs
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div>
                  <h3 className="font-oswald text-[20px] leading-[28px] font-bold uppercase tracking-tight mb-4 text-white">
                    Opening Hours
                  </h3>
                  <div className="space-y-2 text-muted">
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="text-white">5:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monday</span>
                      <span className="text-white">5:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tuesday</span>
                      <span className="text-white">5:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Wednesday</span>
                      <span className="text-white">5:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Thursday</span>
                      <span className="text-white">5:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Friday</span>
                      <span className="text-white">5:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="text-white">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Contact Form - Right */}
            <Reveal>
              <div>
                <h2 className="font-oswald text-[32px] leading-[40px] font-bold uppercase tracking-tight mb-6 text-white">
                  Send Us a <span className="text-accent">Message</span>
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-bold text-white mb-2 uppercase tracking-wide font-display"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background-elevated border border-zinc-700 rounded-none text-white focus:outline-none focus:border-accent transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold text-white mb-2 uppercase tracking-wide font-display"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background-elevated border border-zinc-700 rounded-none text-white focus:outline-none focus:border-accent transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-bold text-white mb-2 uppercase tracking-wide font-display"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background-elevated border border-zinc-700 rounded-none text-white focus:outline-none focus:border-accent transition-colors"
                      placeholder="+977 98-1234567"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-bold text-white mb-2 uppercase tracking-wide font-display"
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-background-elevated border border-zinc-700 rounded-none text-white focus:outline-none focus:border-accent transition-colors resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2.5 rounded-none px-8 py-4 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 ease-out bg-accent text-black hover:bg-accent-bright focus-visible:outline-offset-4"
                    >
                    <span>Send Message</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

     
      </main>
   {/* Social Section - Above */}
        <SocialSection />
      <Footer />
    </>
  );
}
