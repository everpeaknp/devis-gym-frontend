import React from 'react';
// Adjust the import path according to your project structure.
import HoverRevealCards, { CardItem } from '@/components/ui/cards';

// Sample data for the demo, matching the structure of the CardItem interface.
const demoItems: CardItem[] = [
  {
    id: 1,
    title: 'Echoes',
    subtitle: 'Grand Canyon',
    imageUrl: '/backgrounds/canyon.jpg',
  },
  {
    id: 2,
    title: 'Highest Mountain',
    subtitle: 'Yosemite',
    imageUrl: '/backgrounds/mountain.jpg',
  },
  {
    id: 3,
    title: 'Deep Desert',
    subtitle: 'Sahara',
    imageUrl: '/backgrounds/desert.jpg',
  },
  {
    id: 4,
    title: 'Breath-taking',
    subtitle: 'Landscape',
    imageUrl: '/backgrounds/landscape.jpg',
  },
];

/**
 * A demo page to showcase the HoverRevealCards component.
 */
const HoverRevealCardsDemo = () => {
  return (
    // Centering the component for a clean preview.
    // `bg-background` ensures it adapts to the current theme (light/dark).
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <HoverRevealCards items={demoItems} />
    </div>
  );
};

export default HoverRevealCardsDemo;