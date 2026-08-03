"use client"

import { useState, useEffect } from "react"
import UniqueLoading from "@/components/unused-components/ui/morph-loading"

interface LoadingScreenProps {
  onComplete?: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [showPreferences, setShowPreferences] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Hide navigation while loading
    document.body.classList.add('loading-screen-active')
    
    // Check if user has already seen the loading screen
    const hasSeenLoading = sessionStorage.getItem('hasSeenLoading')
    
    if (hasSeenLoading) {
      // Skip loading screen and go straight to content
      const timer = setTimeout(() => {
        handleComplete()
      }, 1000)
      
      return () => clearTimeout(timer)
    } else {
      // Show "ENTER GYM" button after initial loading
      const timer = setTimeout(() => {
        setShowPreferences(true)
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  const handleComplete = () => {
    // Mark as seen
    sessionStorage.setItem('hasSeenLoading', 'true')
    
    // Trigger fade out
    setFadeOut(true)
    
    // Wait for fade out animation then hide and show navigation
    setTimeout(() => {
      setIsLoading(false)
      document.body.classList.remove('loading-screen-active')
      onComplete?.()
    }, 500)
  }

  const handleContinue = () => {
    handleComplete()
  }

  if (!isLoading) return null

  return (
    <div 
      className={`fixed inset-0 z-[99999] bg-black flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-8">
        {/* Loading Animation */}
        <UniqueLoading variant="morph" size="lg" className="w-32 h-32" />
        
        {/* Gym Name */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-oswald font-bold text-white tracking-wider">
            DEVI'S
          </h1>
          <h2 className="text-4xl md:text-6xl font-oswald font-bold text-[#c7ff3d] tracking-wider">
            GYM
          </h2>
        </div>

        {/* Audio Preferences */}
        {showPreferences && (
          <div className="flex flex-col items-center gap-6 mt-8 animate-fadeIn">
            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="px-8 py-3 bg-[#c7ff3d] text-black font-oswald font-bold tracking-wider hover:bg-[#d4ff6b] transition-colors duration-300"
            >
              ENTER GYM
            </button>
          </div>
        )}

        {/* Loading Text */}
        {!showPreferences && (
          <p className="text-white/50 text-sm font-oswald tracking-wider animate-pulse">
            LOADING...
          </p>
        )}
      </div>
    </div>
  )
}
