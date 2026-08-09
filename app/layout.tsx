import type { Metadata } from "next";
import "./globals.css";
import { businessData } from "@/data/business";
import { socialLinks } from "@/data/social";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import { Component as KineticNavigation } from "@/components/ui/sterling-gate-kinetic-navigation";
import SoundManager from "@/components/ui/SoundManager";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { Oswald, Kanit } from "next/font/google";

const oswald = Oswald({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-oswald",
});

const kanit = Kanit({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-kanit",
});

const siteUrl = "https://devisgym.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Devi's Gym | Gym in Pokhara, Nepal",
    template: "%s | Devi's Gym",
  },
  description:
    "Devi's Gym is a gym in Pokhara, Nepal. Find us on the map and follow along on Instagram and TikTok.",
  keywords: [
    "Devi's Gym",
    "gym Pokhara",
    "fitness Pokhara Nepal",
    "gym near Phewa Lake",
  ],
  icons: {
    icon: "/logo/logo.jpg",
    shortcut: "/logo/logo.jpg",
    apple: "/logo/logo.jpg",
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Devi's Gym",
    title: "Devi's Gym | Gym in Pokhara, Nepal",
    description: "A gym in Pokhara, Nepal.",
    images: [{ url: "/images/hero/hero-gym.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devi's Gym | Pokhara, Nepal",
    description: "A gym in Pokhara, Nepal.",
    images: ["/images/hero/hero-gym.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    name: businessData.name,
    address: {
      "@type": "PostalAddress",
      addressLocality: businessData.location.city,
      addressCountry: businessData.location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: businessData.location.latitude,
      longitude: businessData.location.longitude,
    },
    url: siteUrl,
    hasMap: businessData.location.mapsUrlFull,
    sameAs: socialLinks.map((s) => s.url),
  };

  return (
    <html lang="en" className={`h-full antialiased ${oswald.variable} ${kanit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Handle unhandled promise rejections for video AbortError
              window.addEventListener('unhandledrejection', function(event) {
                if (event.reason && event.reason.name === 'AbortError') {
                  event.preventDefault();
                }
              });
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LoadingScreen />
        <div className="grain" aria-hidden="true" />
        <KineticNavigation />
        <SoundManager />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
