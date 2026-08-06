/**
 * Devi's Gym - Complete Business Configuration
 * Central source of truth for all gym information
 */

export const businessConfig = {
  // Basic Information
  basic: {
    name: "Devi's Gym",
    established: 2018,
    tagline: "TRAIN. FUEL. REPEAT.",
  },

  // Brand Colors
  brand: {
    colors: {
      primary: "Gray",
      secondary: "Black",
      accent: "White",
      highlight: "rgb(225, 255, 0)", // Neon Yellow
    },
  },

  // Contact Information
  contact: {
    phone: "9806641537",
    whatsapp: "9806641537",
    email: "devisgym@gmail.com",
  },

  // Location
  location: {
    street: "Near Davidfall, Street No: 18",
    area: "Davidfall-17",
    city: "Pokhara",
    state: "Gandaki Province",
    zip: "33700",
    country: "Nepal",
    coordinates: {
      latitude: 28.1894062,
      longitude: 83.9592543,
    },
    mapUrl: "https://maps.app.goo.gl/X1WJEYrXmdEHGc4K7",
  },

  // Operating Hours
  hours: {
    weekdays: "5:00 AM - 9:00 PM",
    sunday: "5:00 AM - 9:00 PM",
    saturday: "Closed",
    display: "Mon-Fri, Sun: 5:00 AM - 9:00 PM | Sat: Closed",
  },

  // Membership Fees (NPR)
  membership: {
    currency: "NPR",
    currencySymbol: "₹",
    plans: [
      {
        type: "Admission Fee",
        price: 500,
        duration: "one-time",
        description: "One-time registration fee",
      },
      {
        type: "Per Day",
        price: 300,
        duration: "day",
        description: "Daily access pass",
      },
      {
        type: "15 Days",
        price: 2000,
        duration: "15 days",
        description: "Short term membership",
      },
      {
        type: "1 Month",
        price: 2500,
        duration: "month",
        description: "Monthly membership",
        popular: true,
      },
      {
        type: "3 Months",
        price: 6000,
        duration: "3 months",
        description: "Quarterly membership",
      },
      {
        type: "6 Months",
        price: 11000,
        duration: "6 months",
        description: "Half-yearly membership",
      },
      {
        type: "1 Year",
        price: 18000,
        duration: "year",
        description: "Annual membership - Best value",
      },
    ],
  },

  // Staff & Trainers
  staff: {
    certifiedTrainers: [
      {
        name: "Anup Grg",
        role: "Certified Trainer",
        specialization: ["Strength Training", "CrossFit"],
      },
      {
        name: "Aditya Grg",
        role: "Certified Trainer",
        specialization: ["Weightlifting", "Cardio"],
      },
      {
        name: "Abhishek Mishra",
        role: "Certified Trainer",
        specialization: ["General Fitness", "Aerobics"],
      },
      {
        name: "Bijay Grg",
        role: "Certified Trainer",
        specialization: ["Strength Training", "Cardio"],
      },
    ],
    zumbaTrainer: {
      name: "Barsha Grg",
      role: "Zumba Trainer",
      specialization: ["Zumba", "Aerobics", "Dance Fitness"],
    },
  },

  // Programs & Services
  programs: {
    gymTraining: [
      "Weightlifting",
      "Cardio",
      "CrossFit",
      "Aerobics",
    ],
    groupClasses: [
      "Zumba",
      "Aerobics",
    ],
    other: [
      "Outdoor Activities",
    ],
  },

  // Class Schedule
  schedule: [
    {
      activity: "Cardio",
      time: "6:00 AM – 7:00 AM",
      days: "Daily",
    },
    {
      activity: "Zumba",
      time: "6:00 AM – 7:00 AM",
      days: "Tuesday & Friday",
      trainer: "Barsha Grg",
    },
    {
      activity: "Other Gym Activities",
      time: "Throughout the day",
      days: "Daily",
    },
    {
      activity: "Closed",
      time: "—",
      days: "Saturday",
    },
  ],

  // Social Media
  social: {
    facebook: "https://www.facebook.com/DevisGym",
    instagram: "https://www.instagram.com/devisgym_pokhara/",
    tiktok: "https://www.tiktok.com/@devisgymcafepokhara",
  },
} as const;

export type BusinessConfig = typeof businessConfig;
