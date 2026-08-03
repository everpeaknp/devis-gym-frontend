import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const pages = [
  {
    leftBgImage: '/gym/gym-interior-1.webp',
    rightBgImage: null,
    leftContent: null,
    rightContent: {
      heading: "Devi's Gym",
      description: 'Welcome to our fitness journey. Hold on tight, things are about to get exciting!',
    },
  },
  {
    leftBgImage: null,
    rightBgImage: '/about/background.jpg',
    leftContent: {
      heading: 'Introduction',
      description: 'Discover what makes us different and why functional training is at the heart of everything we do.',
    },
    rightContent: null,
  },
  {
    leftBgImage: '/gym/gym-interior-2.webp',
    rightBgImage: null,
    leftContent: null,
    rightContent: {
      heading: 'Mission',
      description: 'Our purpose is to pass on empowering knowledge and training guidance in order to have a positive impact on the health and fitness of everyone we work with. To provide a personalised health and fitness service that unlocks every individual\'s true potential so they can achieve their desired goals.',
    },
  },
  {
    leftBgImage: null,
    rightBgImage: '/gym/training-floor.jpeg',
    leftContent: {
      heading: 'Story',
      description: 'Our main focus at Devi\'s Gym is functional training because of the proven benefits. With an emphasis on mobility, strength and conditioning, the benefits of functional training differ from other workouts because of the way it targets your body.',
    },
    rightContent: null,
  },
];

export default function ScrollAdventure() {
  const [currentPage, setCurrentPage] = useState(1);
  const numOfPages = pages.length;
  const animTime = 1000;
  const scrolling = useRef(false);

  const navigateUp = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  const navigateDown = () => {
    if (currentPage < numOfPages) setCurrentPage(p => p + 1);
  };

  const handleWheel = (e: WheelEvent) => {
    if (scrolling.current) return;

    scrolling.current = true;
    e.deltaY > 0 ? navigateDown() : navigateUp();
    setTimeout(() => (scrolling.current = false), animTime);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (scrolling.current) return;

    if (e.key === 'ArrowUp') {
      scrolling.current = true;
      navigateUp();
      setTimeout(() => (scrolling.current = false), animTime);
    } else if (e.key === 'ArrowDown') {
      scrolling.current = true;
      navigateDown();
      setTimeout(() => (scrolling.current = false), animTime);
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage]);

  return (
    <div className="relative overflow-hidden h-screen bg-black">
      {pages.map((page, i) => {
        const idx = i + 1;
        const isActive = currentPage === idx;
        const upOff = 'translateY(-100%)';
        const downOff = 'translateY(100%)';
        const leftTrans = isActive ? 'translateY(0)' : downOff;
        const rightTrans = isActive ? 'translateY(0)' : upOff;

        return (
          <div key={idx} className="absolute inset-0">
            {/* Left Half */}
            <div
              className="absolute top-0 left-0 w-1/2 h-full transition-transform duration-[1000ms] overflow-hidden"
              style={{ transform: leftTrans }}
            >
              {page.leftBgImage ? (
                <div className="relative w-full h-full">
                  <Image
                    src={page.leftBgImage}
                    alt=""
                    fill
                    sizes="50vw"
                    className="object-cover"
                    loading="lazy"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-8">
                    {page.leftContent && (
                      <>
                        <h2 className="font-oswald text-3xl md:text-4xl lg:text-5xl uppercase mb-6 text-center font-bold tracking-tight">
                          {page.leftContent.heading}
                        </h2>
                        <p className="text-base md:text-lg lg:text-xl text-center max-w-md leading-relaxed">
                          {page.leftContent.description}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center text-white p-8">
                  {page.leftContent && (
                    <>
                      <h2 className="font-oswald text-3xl md:text-4xl lg:text-5xl uppercase mb-6 text-center font-bold tracking-tight">
                        {page.leftContent.heading}
                      </h2>
                      <p className="text-base md:text-lg lg:text-xl text-center max-w-md leading-relaxed">
                        {page.leftContent.description}
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Right Half */}
            <div
              className="absolute top-0 left-1/2 w-1/2 h-full transition-transform duration-[1000ms] overflow-hidden"
              style={{ transform: rightTrans }}
            >
              {page.rightBgImage ? (
                <div className="relative w-full h-full">
                  <Image
                    src={page.rightBgImage}
                    alt=""
                    fill
                    sizes="50vw"
                    className="object-cover"
                    loading="lazy"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-8">
                    {page.rightContent && (
                      <>
                        <h2 className="font-oswald text-3xl md:text-4xl lg:text-5xl uppercase mb-6 text-center font-bold tracking-tight">
                          {page.rightContent.heading}
                        </h2>
                        {typeof page.rightContent.description === 'string' ? (
                          <p className="text-base md:text-lg lg:text-xl text-center max-w-md leading-relaxed">
                            {page.rightContent.description}
                          </p>
                        ) : (
                          <div className="text-base md:text-lg lg:text-xl text-center max-w-md leading-relaxed">
                            {page.rightContent.description}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center text-white p-8">
                  {page.rightContent && (
                    <>
                      <h2 className="font-oswald text-3xl md:text-4xl lg:text-5xl uppercase mb-6 text-center font-bold tracking-tight">
                        {page.rightContent.heading}
                      </h2>
                      {typeof page.rightContent.description === 'string' ? (
                        <p className="text-base md:text-lg lg:text-xl text-center max-w-md leading-relaxed">
                          {page.rightContent.description}
                        </p>
                      ) : (
                        <div className="text-base md:text-lg lg:text-xl text-center max-w-md leading-relaxed">
                          {page.rightContent.description}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
      
      {/* Navigation Dots */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2 z-10">
        {pages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`w-3 h-3 rounded-full border-2 border-white transition-all duration-300 ${
              currentPage === index + 1 ? 'bg-white' : 'bg-transparent hover:bg-white/50'
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center z-10">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm uppercase tracking-wide">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
}