"use client";

import { useEffect, useRef } from "react";

export default function SoundManager() {
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const musicStartedRef = useRef(false);
  const isMusicMutedRef = useRef(false);
  const isSoundMutedRef = useRef(false);

  useEffect(() => {
    // Get user preferences from localStorage
    const musicEnabled = localStorage.getItem('musicEnabled') !== 'false';
    const soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
    
    isMusicMutedRef.current = !musicEnabled;
    isSoundMutedRef.current = !soundEnabled;

    // Create audio elements
    const bgMusic = new Audio("/music.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    bgMusic.muted = !musicEnabled;
    bgMusicRef.current = bgMusic;

    const clickSound = new Audio("https://res.cloudinary.com/ufiebboc/raw/upload/v1786268708/devis-gym/click.mp3");
    clickSound.volume = 0.5;
    clickSoundRef.current = clickSound;

    // Function to start background music
    const startMusic = () => {
      if (bgMusicRef.current && !musicStartedRef.current && musicEnabled) {
        bgMusicRef.current.play()
          .then(() => {
            musicStartedRef.current = true;
            console.log("✓ Background music started");
          })
          .catch((error) => {
            // Handle AbortError and other autoplay issues silently
            if (error.name !== 'AbortError') {
              console.log("Music autoplay prevented:", error);
            }
          });
      }
    };

    // Try to start music on first user interaction
    const handleFirstInteraction = () => {
      startMusic();
    };

    // Listen for any user interaction
    document.addEventListener("click", handleFirstInteraction, { once: true });
    document.addEventListener("keydown", handleFirstInteraction, { once: true });
    document.addEventListener("touchstart", handleFirstInteraction, { once: true });

    // Listen for toggle events from navigation
    const handleToggleMusic = () => {
      isMusicMutedRef.current = !isMusicMutedRef.current;
      if (bgMusicRef.current) {
        bgMusicRef.current.muted = isMusicMutedRef.current;
        // Save preference
        localStorage.setItem('musicEnabled', String(!isMusicMutedRef.current));
        console.log("Music muted:", isMusicMutedRef.current);
      }
    };

    const handleToggleSound = () => {
      isSoundMutedRef.current = !isSoundMutedRef.current;
      // Save preference
      localStorage.setItem('soundEnabled', String(!isSoundMutedRef.current));
      console.log("Sound muted:", isSoundMutedRef.current);
    };

    window.addEventListener("toggleMusic", handleToggleMusic);
    window.addEventListener("toggleSound", handleToggleSound);

    // Click sound handler
    const playClickSound = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Don't play on sound control buttons
      if (target.closest('.sound-control-btn')) {
        return;
      }

      // Check if it's a clickable element
      const clickableSelector = 'a, button, [role="button"], .clickable';
      if (target.closest(clickableSelector) && !isSoundMutedRef.current) {
        const sound = clickSoundRef.current?.cloneNode() as HTMLAudioElement;
        if (sound) {
          sound.volume = 0.5;
          sound.play().catch(() => {
            // Silently fail
          });
        }
      }
    };

    document.addEventListener("click", playClickSound);

    // Cleanup
    return () => {
      document.removeEventListener("click", playClickSound);
      window.removeEventListener("toggleMusic", handleToggleMusic);
      window.removeEventListener("toggleSound", handleToggleSound);
      
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
      if (clickSoundRef.current) {
        clickSoundRef.current = null;
      }
    };
  }, []);

  // This component doesn't render anything - it's just for audio management
  return null;
}
