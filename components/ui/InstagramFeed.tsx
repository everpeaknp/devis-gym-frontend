"use client";

import { useState } from "react";
import Image from "next/image";

// Static Instagram-style posts using images from public/people
const instagramPosts = [
  { id: "1", media_url: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269232/devis-gym/people/DSC07536.JPG.webp", caption: "Training hard at Devi's Gym", likes: 142, comments: 8 },
  { id: "2", media_url: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269554/devis-gym/people/DSC07700-2.JPG.webp", caption: "Fitness community vibes", likes: 198, comments: 12 },
  { id: "3", media_url: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269666/devis-gym/people/DSC07641-3.JPG.webp", caption: "Morning workout session", likes: 156, comments: 9 },
  { id: "4", media_url: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269586/devis-gym/people/DSC07732.JPG.webp", caption: "Strength training goals", likes: 173, comments: 11 },
  { id: "5", media_url: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269120/devis-gym/people/DSC07450.JPG.webp", caption: "Zumba class energy", likes: 189, comments: 15 },
  { id: "6", media_url: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269374/devis-gym/people/DSC07590-3.JPG.webp", caption: "CrossFit intensity", likes: 167, comments: 10 },
  { id: "7", media_url: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269532/devis-gym/people/DSC07624-3.JPG.webp", caption: "Outdoor fitness lifestyle", likes: 145, comments: 7 },
];

// These were being served at their raw Cloudinary size (2.5MB+ originals) into a
// 300px-tall grid cell — decoding that much data at once for images already lazy
// loading is exactly what produces the blank/black boxes while scrolling into
// view. Cloudinary can crop + compress on the fly via URL params, so ask for a
// size that actually matches the display instead of shipping the original.
function toThumbnail(url: string) {
  return url.replace("/image/upload/", "/image/upload/w_600,h_600,c_fill,q_auto,f_auto/");
}

export default function InstagramFeed() {
  const [loadedIds, setLoadedIds] = useState<Set<string>>(new Set());

  return (
    <div className="flex h-[300px] touch-pan-y">
      {instagramPosts.map((post) => {
        const isLoaded = loadedIds.has(post.id);
        return (
          <div
            key={post.id}
            className="flex-1 min-w-0 relative bg-zinc-800"
          >
            <Image
              src={toThumbnail(post.media_url)}
              alt={post.caption}
              fill
              sizes="(max-width: 768px) 33vw, 15vw"
              className={`object-cover transition-opacity duration-500 ease-out ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              quality={75}
              draggable={false}
              onLoad={() =>
                setLoadedIds((prev) => {
                  const next = new Set(prev);
                  next.add(post.id);
                  return next;
                })
              }
            />
          </div>
        );
      })}
    </div>
  );
}
