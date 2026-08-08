export type Service = {
  id: string;
  name: string;
  description: string;
  image: string;
  available: boolean; // only render as confirmed when true
  isViewAll?: boolean; // special card that links to all classes
};

/**
 * Services and programs available at Devi's Gym.
 * All programs are verified and actively available.
 */
export const services: Service[] = [
  {
    id: "gym-training",
    name: "Gym\nTraining",
    description: "Comprehensive gym training including weightlifting, cardio, and CrossFit. Certified trainers available to guide you.",
    image: "/people/DSC07734.JPG",
    available: true,
  },
  {
    id: "weightlifting",
    name: "Weight\nlifting",
    description: "Professional weightlifting training with certified trainers. Build strength with proper form and technique.",
    image: "/people/DSC07615-4.JPG",
    available: true,
  },
  {
    id: "cardio",
    name: "Cardio",
    description: "Daily morning cardio sessions from 6:00 AM to 7:00 AM. Perfect way to start your day.",
    image: "/people/DSC07629-3.JPG",
    available: true,
  },
  {
    id: "crossfit",
    name: "Cross\nFit",
    description: "High-intensity CrossFit training for functional fitness and athletic performance.",
    image: "/people/DSC07636-3.JPG",
    available: true,
  },
  {
    id: "aerobics",
    name: "Aerobics",
    description: "Energetic aerobics classes throughout the week. Fun group fitness sessions.",
    image: "/people/DSC07385.JPG",
    available: true,
  },
  {
    id: "zumba",
    name: "Zumba",
    description: "High-energy Zumba classes on Tuesday & Friday at 6:00 AM with certified Zumba trainer Barsha Grg.",
    image: "/people/DSC07541.JPG",
    available: true,
  },
  {
    id: "outdoor-activities",
    name: "Outdoor\nActivities",
    description: "Take your training outside with our outdoor activity programs and sessions.",
    image: "/classes/OutdoorActivities.jpg",
    available: true,
  },
  {
    id: "view-all-classes",
    name: "View All\nClasses",
    description: "Explore all our classes and training programs in one place.",
    image: "/people/DSC07643-3.JPG",
    available: true,
    isViewAll: true,
  },
];
