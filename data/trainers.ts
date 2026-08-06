export type Trainer = {
  id: string;
  name: string;
  role: string;
  specialization?: string[];
  certified: boolean;
  image?: string;
};

export const trainers: Trainer[] = [
  {
    id: "anup-grg",
    name: "Anup Grg",
    role: "Certified Trainer",
    specialization: ["Strength Training", "CrossFit"],
    certified: true,
  },
  {
    id: "aditya-grg",
    name: "Aditya Grg",
    role: "Certified Trainer",
    specialization: ["Weightlifting", "Cardio"],
    certified: true,
  },
  {
    id: "abhishek-mishra",
    name: "Abhishek Mishra",
    role: "Certified Trainer",
    specialization: ["General Fitness", "Aerobics"],
    certified: true,
  },
  {
    id: "bijay-grg",
    name: "Bijay Grg",
    role: "Certified Trainer",
    specialization: ["Strength Training", "Cardio"],
    certified: true,
  },
  {
    id: "barsha-grg",
    name: "Barsha Grg",
    role: "Zumba Trainer",
    specialization: ["Zumba", "Aerobics", "Dance Fitness"],
    certified: true,
  },
];

export type ClassSchedule = {
  id: string;
  activity: string;
  time: string;
  days: string;
  trainer?: string;
  available: boolean;
};

export const classSchedule: ClassSchedule[] = [
  {
    id: "cardio-daily",
    activity: "Cardio",
    time: "6:00 AM - 7:00 AM",
    days: "Daily (except Saturday)",
    available: true,
  },
  {
    id: "zumba",
    activity: "Zumba",
    time: "6:00 AM - 7:00 AM",
    days: "Tuesday & Friday",
    trainer: "Barsha Grg",
    available: true,
  },
  {
    id: "gym-training",
    activity: "Gym Training (Weights, CrossFit, Aerobics)",
    time: "Throughout the day",
    days: "Daily (except Saturday)",
    available: true,
  },
];

export const trainersInfo = {
  heading: "Meet Our Trainers",
  description: "Our certified trainers are here to guide you on your fitness journey. Each trainer brings expertise, dedication, and personalized attention to help you achieve your goals.",
};
