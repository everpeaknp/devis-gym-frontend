export type Service = {
  id: string;
  name: string;
  description: string;
  image: string;
  available: boolean; // only render as confirmed when true
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
    image: "/classes/GymTraining.jpg",
    available: true,
  },
  {
    id: "weightlifting",
    name: "Weight\nlifting",
    description: "Professional weightlifting training with certified trainers. Build strength with proper form and technique.",
    image: "/classes/weightlifting.jpg",
    available: true,
  },
  {
    id: "cardio",
    name: "Cardio",
    description: "Daily morning cardio sessions from 6:00 AM to 7:00 AM. Perfect way to start your day.",
    image: "/classes/cardio.jpg",
    available: true,
  },
  {
    id: "crossfit",
    name: "Cross\nFit",
    description: "High-intensity CrossFit training for functional fitness and athletic performance.",
    image: "/classes/crossfit.jpg",
    available: true,
  },
  {
    id: "aerobics",
    name: "Aerobics",
    description: "Energetic aerobics classes throughout the week. Fun group fitness sessions.",
    image: "/classes/airobics.jpg",
    available: true,
  },
  {
    id: "zumba",
    name: "Zumba",
    description: "High-energy Zumba classes on Tuesday & Friday at 6:00 AM with certified Zumba trainer Barsha Grg.",
    image: "/classes/zumba.jpg",
    available: true,
  },
  {
    id: "outdoor-activities",
    name: "Outdoor\nActivities",
    description: "Take your training outside with our outdoor activity programs and sessions.",
    image: "/classes/OutdoorActivities.jpg",
    available: true,
  },
];
