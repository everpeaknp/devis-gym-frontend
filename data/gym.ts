export type GymFeature = {
  id: string;
  title: string;
  description: string;
  image: string;
  verified: boolean;
};

/**
 * No verified equipment/facility inventory exists yet. Rather than invent
 * machine lists, square footage, or zone counts, we present the space at a
 * high level and mark it clearly as pending an on-site content update.
 */
export const gymFeatures: GymFeature[] = [
  {
    id: "the-floor",
    title: "The Training Floor",
    description:
      "The main workout space at Devi's Gym in Pokhara. A full facility walkthrough and equipment list will be added here soon.",
    image: "/gym/training-floor.jpeg",
    verified: true,
  },
  {
    id: "the-space",
    title: "Explore the Space",
    description:
      "From free weights to machines, the gym is set up for a real training session, not a photo op. Detailed facility info is coming soon.",
    image: "/gym/space.jpeg",
    verified: true,
  },
];

export const gymIntro = {
  eyebrow: "The Gym",
  heading: "A place built to train in.",
  body:
    "Devi's Gym is a working gym in Pokhara — this section will be updated with a full facility overview, equipment breakdown, and training zones as soon as that information is confirmed.",
};
