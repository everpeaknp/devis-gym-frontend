export type GalleryCategory = "Gym" | "People" | "Training" | "Lifestyle";

export type GalleryImage = {
  id: string;
  category: GalleryCategory;
  src: string;
  alt: string;
  available: boolean;
};

/**
 * Gallery images from Devi's Gym
 * Images categorized by: Gym, People, Training, Lifestyle
 */
export const galleryImages: GalleryImage[] = [
  // Training - Workouts and exercises
  { 
    id: "t1", 
    category: "Training", 
    src: "/gallery/training-1.jpeg", 
    alt: "Intense training session at Devi's Gym", 
    available: true 
  },
  { 
    id: "t2", 
    category: "Training", 
    src: "/gallery/training-2.jpeg", 
    alt: "Personal training and workout guidance", 
    available: true 
  },
  { 
    id: "t3", 
    category: "Training", 
    src: "/gallery/training-1.jpeg", 
    alt: "Strength training exercises", 
    available: true 
  },
  { 
    id: "t4", 
    category: "Training", 
    src: "/gallery/training-2.jpeg", 
    alt: "Dedicated workout sessions", 
    available: true 
  },
  // Gym - Equipment and facilities
  { 
    id: "g1", 
    category: "Gym", 
    src: "/gallery/gym-1.jpeg", 
    alt: "Modern gym equipment and facilities", 
    available: true 
  },
  { 
    id: "g2", 
    category: "Gym", 
    src: "/gallery/gym-2.jpeg", 
    alt: "Professional gym interior at Devi's Gym", 
    available: true 
  },
  { 
    id: "g3", 
    category: "Gym", 
    src: "/gallery/gym-3.jpeg", 
    alt: "State-of-the-art gym equipment", 
    available: true 
  },
  // People - Group photos and community
  { 
    id: "p1", 
    category: "People", 
    src: "/gallery/people-1.jpeg", 
    alt: "Community training together at Devi's Gym", 
    available: true 
  },
  // Lifestyle - Fitness lifestyle
  { 
    id: "l1", 
    category: "Lifestyle", 
    src: "/gallery/lifestyle-1.jpeg", 
    alt: "Active fitness lifestyle at Devi's Gym", 
    available: true 
  },
];

export const galleryCategories: GalleryCategory[] = [
  "Gym",
  "People",
  "Training",
  "Lifestyle",
];
