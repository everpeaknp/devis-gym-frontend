"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { FooterBackgroundGradient } from "@/components/ui/hover-footer";
import { TextHoverEffect } from "@/components/ui/hover-footer";
import { InstagramIcon, FacebookIcon, TikTokIcon } from "@/components/ui/SocialIcons";
import { businessData } from "@/data/business";
import { navigation } from "@/data/navigation";
import { socialLinks as socialData } from "@/data/social";
import { contactInfo } from "@/data/contact";

export default function Footer() {
  const plateRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: false, amount: 0.2 });

  // Rotate plate on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (plateRef.current) {
        const scrollY = window.scrollY;
        const rotation = scrollY * 0.1; // Adjust rotation speed
        plateRef.current.style.transform = `rotate(${rotation}deg)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Footer link sections
  const footerSections = [
    {
      title: "Quick Links",
      links: navigation.map((item) => ({
        label: item.label,
        href: item.href,
      })),
    },
    {
      title: "Information",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Membership Plans", href: "/#membership" },
        { label: "Training Programs", href: "/gym" },
        { label: "Gallery", href: "/gallery" },
      ],
    },
  ];

  // Contact info data
  const contactData = [
    {
      icon: <Mail size={18} className="text-white" />,
      text: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
    },
    {
      icon: <Phone size={18} className="text-white" />,
      text: contactInfo.phone,
      href: `tel:${contactInfo.phone}`,
    },
    {
      icon: <MapPin size={18} className="text-white" />,
      text: `${businessData.location.city}, ${businessData.location.country}`,
      href: businessData.location.mapsUrl,
    },
  ];

  // Social media icons
  const socialLinks = [
    {
      icon: <InstagramIcon size={20} />,
      label: "Instagram",
      href: socialData[0].url,
    },
    {
      icon: <FacebookIcon size={20} />,
      label: "Facebook",
      href: socialData[2].url,
    },
    {
      icon: <TikTokIcon size={20} />,
      label: "TikTok",
      href: socialData[1].url,
    },
  ];

  return (
    <footer className="bg-[#0F0F11]/10 relative h-fit rounded-3xl overflow-hidden m-8">
      {/* Rotating Weight Plate Background */}
      <div className="absolute inset-0 flex items-end justify-center pb-0 opacity-10 pointer-events-none overflow-hidden -ml-8">
        <svg 
          ref={plateRef}
          width="800" 
          height="800" 
          viewBox="0 0 500 500" 
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-75 ease-linear translate-y-48"
        >
          <defs>
            <radialGradient id="plate" cx="50%" cy="45%">
              <stop offset="0%" stopColor="#555"/>
              <stop offset="35%" stopColor="#333"/>
              <stop offset="75%" stopColor="#1b1b1b"/>
              <stop offset="100%" stopColor="#0d0d0d"/>
            </radialGradient>
            <linearGradient id="chrome" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#666"/>
              <stop offset="30%" stopColor="#ddd"/>
              <stop offset="60%" stopColor="#999"/>
              <stop offset="100%" stopColor="#444"/>
            </linearGradient>
          </defs>
          {/* Outer Plate */}
          <circle cx="250" cy="250" r="220"
                  fill="url(#plate)"
                  stroke="#444"
                  strokeWidth="8"/>
          {/* Ring */}
          <circle cx="250" cy="250" r="185"
                  fill="none"
                  stroke="#2f2f2f"
                  strokeWidth="22"/>
          {/* Inner Ring */}
          <circle cx="250" cy="250" r="120"
                  fill="#181818"
                  stroke="#444"
                  strokeWidth="10"/>
          {/* Center */}
          <circle cx="250" cy="250" r="55"
                  fill="#111"
                  stroke="url(#chrome)"
                  strokeWidth="8"/>
          {/* Grip holes */}
          <g fill="#101010" stroke="#444" strokeWidth="4">
            <circle cx="250" cy="95" r="22"/>
            <circle cx="250" cy="405" r="22"/>
            <circle cx="95" cy="250" r="22"/>
            <circle cx="405" cy="250" r="22"/>
          </g>
          {/* 20KG Labels */}
          <g fill="#666"
             fontSize="22"
             fontFamily="Arial"
             fontWeight="700">
            <text x="250" y="55" textAnchor="middle">20KG</text>
            <text x="250" y="470" textAnchor="middle">20KG</text>
            <text x="55" y="255"
                  transform="rotate(-90 55 255)"
                  textAnchor="middle">Devi's GYM</text>
            <text x="445" y="255"
                  transform="rotate(90 445 255)"
                  textAnchor="middle">20KG</text>
          </g>
        </svg>
      </div>

      {/* Copyright positioned absolutely at bottom right of entire footer */}
      <div className="hidden lg:block absolute bottom-2 right-4 z-[70]">
        <p className="text-[10px] text-gray-400">
          © {new Date().getFullYear()} {businessData.name}. All rights reserved.
        </p>
      </div>

      <div className="max-w-7xl mx-auto p-14 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center p-2">
                <img 
                  src="/logo.png" 
                  alt="Devi's Gym Logo" 
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-white text-3xl font-bold font-oswald uppercase">
                Devi&apos;s Gym
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              {businessData.tagline}
              <br />
              A gym built for people who actually train.
            </p>
          </div>

          {/* Footer link sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-lg font-semibold mb-6 font-oswald uppercase tracking-wide">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-accent transition-colors cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6 font-oswald uppercase tracking-wide">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {contactData.map((item, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <span className="mt-0.5">{item.icon}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? "_blank" : undefined}
                      rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                      className="text-gray-400 hover:text-accent transition-colors text-sm cursor-pointer"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-gray-400 hover:text-accent transition-colors text-sm">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-start text-sm space-y-4 md:space-y-0 mt-8">
          {/* Social icons */}
          <div className="flex flex-col space-y-4 text-gray-400">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="hover:text-accent transition-colors cursor-pointer"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright - visible on mobile, hidden on large screens where it appears in DEVI'S */}
          <p className="lg:hidden text-right text-gray-400">
            © {new Date().getFullYear()} {businessData.name}. All rights reserved.
          </p>
        </div>
      </div>

      {/* Text hover effect */}
      <motion.div 
        ref={textRef}
        className="lg:flex hidden h-[30rem] -mt-60 -mb-36 relative"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <TextHoverEffect text="DEVI'S" className="z-50" />
      </motion.div>

      <FooterBackgroundGradient />
    </footer>
  );
}
