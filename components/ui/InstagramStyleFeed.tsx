"use client";

import { useState } from "react";
import Image from "next/image";
import { instagramPosts } from "@/data/instagram-posts";

export default function InstagramStyleFeed() {
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  return (
    <div className="flex h-[300px]">
      {instagramPosts.map((post) => (
        <div 
          key={post.id} 
          className="flex-1 min-w-0 relative group cursor-pointer"
          onMouseEnter={() => setHoveredPost(post.id)}
          onMouseLeave={() => setHoveredPost(null)}
          onClick={() => {
            if (post.instagramUrl) {
              window.open(post.instagramUrl, '_blank');
            }
          }}
        >
          <Image
            src={post.imageUrl}
            alt={post.caption}
            width={400}
            height={300}
            className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-90"
            loading="lazy"
            quality={75}
          />
          
          {/* Instagram Overlay on Hover */}
          {hoveredPost === post.id && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center transition-all duration-300">
              <div className="text-white text-center px-4">
                {/* Instagram Stats */}
                <div className="flex items-center justify-center gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span className="font-bold">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.99 4c0-1.1-.89-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                    </svg>
                    <span className="font-bold">{post.comments}</span>
                  </div>
                </div>
                
                {/* Instagram Icon */}
                <div className="flex items-center justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                
                <p className="text-sm mt-2 opacity-90">View on Instagram</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}