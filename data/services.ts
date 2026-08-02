export type Service = {
  id: string;
  name: string;
  description: string;
  image: string;
  available: boolean; // only render as confirmed when true
};

/**
 * No specific service (strength / cardio / personal training / classes) has
 * been publicly confirmed yet for Devi's Gym. Rather than list services
 * that may not exist, every entry is flagged `available: false` until
 * verified — the UI renders this as an honest "to be confirmed" state.
 */
export const services: Service[] = [
  {
    id: "outdoor",
    name: "Outdoor\nClasses",
    description: "Details to be confirmed with the gym.",
    image: "/services/outdoor-classes.jpg",
    available: false,
  },
  {
    id: "personal-training",
    name: "Personal\nTraining",
    description: "Details to be confirmed with the gym.",
    image: "/services/personal-training.jpg",
    available: false,
  },
  {
    id: "group-training",
    name: "Group\nTraining",
    description: "Details to be confirmed with the gym.",
    image: "/services/group-training.jpg",
    available: false,
  },
  {
    id: "digital-coaching",
    name: "Digital\nCoaching",
    description: "Details to be confirmed with the gym.",
    image: "/services/digital-coaching.jpg",
    available: false,
  },
];
