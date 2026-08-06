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
 * Using actual photos from /devis folder
 */
export const galleryImages: GalleryImage[] = [
  // Gym - Equipment and facilities
  { 
    id: "g1", 
    category: "Gym", 
    src: "/devis/IMG_7358.JPG.jpeg", 
    alt: "Modern gym equipment at Devi's Gym", 
    available: true 
  },
  { 
    id: "g2", 
    category: "Gym", 
    src: "/devis/IMG_7359.JPG.jpeg", 
    alt: "Professional gym facilities", 
    available: true 
  },
  { 
    id: "g3", 
    category: "Gym", 
    src: "/devis/IMG_7360.JPG.jpeg", 
    alt: "State-of-the-art gym equipment", 
    available: true 
  },
  { 
    id: "g4", 
    category: "Gym", 
    src: "/devis/IMG_7361.JPG.jpeg", 
    alt: "Gym interior at Devi's Gym", 
    available: true 
  },
  { 
    id: "g5", 
    category: "Gym", 
    src: "/devis/IMG_7362.JPG.jpeg", 
    alt: "Weight training area", 
    available: true 
  },
  
  // Training - Workouts and exercises
  { 
    id: "t1", 
    category: "Training", 
    src: "/devis/IMG_7363.JPG.jpeg", 
    alt: "Intense training session", 
    available: true 
  },
  { 
    id: "t2", 
    category: "Training", 
    src: "/devis/IMG_7364.JPG.jpeg", 
    alt: "Personal training guidance", 
    available: true 
  },
  { 
    id: "t3", 
    category: "Training", 
    src: "/devis/IMG_7365.JPG.jpeg", 
    alt: "Strength training exercises", 
    available: true 
  },
  { 
    id: "t4", 
    category: "Training", 
    src: "/devis/IMG_7366.JPG.jpeg", 
    alt: "Workout session at Devi's Gym", 
    available: true 
  },
  { 
    id: "t5", 
    category: "Training", 
    src: "/devis/IMG_7367.JPG.jpeg", 
    alt: "Dedicated training", 
    available: true 
  },
  
  // People - Group photos and community
  { 
    id: "p1", 
    category: "People", 
    src: "/devis/IMG_7368.JPG.jpeg", 
    alt: "Community at Devi's Gym", 
    available: true 
  },
  { 
    id: "p2", 
    category: "People", 
    src: "/devis/IMG_7369.JPG.jpeg", 
    alt: "Training together", 
    available: true 
  },
  { 
    id: "p3", 
    category: "People", 
    src: "/devis/IMG_7370.JPG.jpeg", 
    alt: "Gym community members", 
    available: true 
  },
  { 
    id: "p4", 
    category: "People", 
    src: "/devis/IMG_7371.JPG.jpeg", 
    alt: "Fitness community", 
    available: true 
  },
  
  // Lifestyle - Fitness lifestyle
  { 
    id: "l1", 
    category: "Lifestyle", 
    src: "/devis/IMG_7372.JPG.jpeg", 
    alt: "Active fitness lifestyle", 
    available: true 
  },
  { 
    id: "l2", 
    category: "Lifestyle", 
    src: "/devis/IMG_7373.JPG.jpeg", 
    alt: "Fitness journey at Devi's Gym", 
    available: true 
  },
  { 
    id: "l3", 
    category: "Lifestyle", 
    src: "/devis/IMG_7374.JPG.jpeg", 
    alt: "Healthy lifestyle", 
    available: true 
  },
  { 
    id: "l4", 
    category: "Lifestyle", 
    src: "/devis/IMG_7375.JPG.jpeg", 
    alt: "Gym lifestyle", 
    available: true 
  },
  { 
    id: "l5", 
    category: "Lifestyle", 
    src: "/devis/IMG_7376.JPG.jpeg", 
    alt: "Training lifestyle", 
    available: true 
  },
  { 
    id: "l6", 
    category: "Lifestyle", 
    src: "/devis/IMG_7377.JPG.jpeg", 
    alt: "Fitness culture at Devi's Gym", 
    available: true 
  },
];

export const galleryCategories: GalleryCategory[] = [
  "Gym",
  "People",
  "Training",
  "Lifestyle",
];
