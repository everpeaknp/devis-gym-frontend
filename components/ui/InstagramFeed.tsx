"use client";

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

export default function InstagramFeed() {
  return (
    <div className="flex h-[300px] touch-pan-y">
      {instagramPosts.map((post) => (
        <a
          key={post.id} 
          href="https://www.instagram.com/devisgym_pokhara/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-0 relative block"
        >
          <Image
            src={post.media_url}
            alt={post.caption}
            width={400}
            height={300}
            className="w-full h-full object-cover"
            loading="lazy"
            quality={75}
            draggable={false}
          />
        </a>
      ))}
    </div>
  );
}