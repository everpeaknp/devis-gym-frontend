export type GymFeature = {
  id: string;
  title: string;
  description: string;
  image: string;
  verified: boolean;
};

/**
 * Verified gym features and facilities at Devi's Gym.
 * Established in 2018, offering comprehensive training facilities.
 */
export const gymFeatures: GymFeature[] = [
  {
    id: "the-floor",
    title: "The Training Floor",
    description:
      "A complete training facility equipped for weightlifting, cardio, CrossFit, and aerobics. Our gym provides all the equipment you need for a comprehensive workout.",
    image: "/gym/training-floor.jpeg",
    verified: true,
  },
  {
    id: "the-space",
    title: "Explore the Space",
    description:
      "From free weights to machines, cardio equipment to CrossFit zones, Devi's Gym is designed for serious training. Open daily (except Saturday) from 5:00 AM to 9:00 PM.",
    image: "/gym/space.jpeg",
    verified: true,
  },
];

export const gymIntro = {
  eyebrow: "The Gym",
  heading: "A place built to train in.",
  body:
    "Established in 2018, Devi's Gym is a comprehensive fitness facility in Pokhara offering weightlifting, cardio, CrossFit, aerobics, and Zumba classes. Certified trainers are available to guide you through your fitness journey.",
};
